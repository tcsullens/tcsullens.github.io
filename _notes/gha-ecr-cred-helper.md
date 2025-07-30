---
layout: post
title: "Integrating Amazon ECR Credential Helper for Self-Hosted GitHub Runners"
date: 2025-07-29
categories: github actions docker credentials devops
---

This post goes over how to integrate the Amazon ECR credential helper into self-hosted GHA runners, obviating the need to run explicit ECR Login steps and store/pass around Docker credentials in GHA workflows.

## Background

At a high level, our CI workflows produce an application (docker) image from the commit being run, and subsequently run this image in the downstream jobs doing the actual work, e.g. _rubocop_, _rspec_, etc run inside the built container image, using GHA's [Container Step](https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/run-jobs-in-a-container) and [Docker Service Containers](https://docs.github.com/en/actions/tutorials/use-containerized-services/use-docker-service-containers).

To do this, each downstream job/GHA runner needs credentials to pull the application image; docker credentials can be passed to _Container Step_, but in the case of ECR we must generate and pass these from an upstream Job (you can't run a ECR Login step _and then run the container step_). So we run a single _ECR Login_ job at the start of the workflow and pass the docker credentials to all downstream jobs.  

**Passing the credentials this way gets problematic:** the credentials expire after 24 hours, and we'd see developers (or ourselves) re-run a failed CI job the next day and encounter dubious errors like:

```bash
Error: Docker login for '701831972387.dkr.ecr.us-east-1.amazonaws.com' failed with exit code 1
Error: Value cannot be null. (Parameter 'ContainerId')
```

This is because the Job being re-run is using now-expired credentials; we'd have to re-run the complete workflow (not just the failed _rspec_ or other Job) to generate fresh credentials for the container CI Jobs to work.

### Our Solution: Amazon ECR Credential Helper

The [Amazon ECR credential helper](https://github.com/awslabs/amazon-ecr-credential-helper) is a [Docker credential helper](https://github.com/docker/docker-credential-helpers) that handles ECR authentication automatically, eliminating the need to run
```bash
aws ecr get-login-password | docker login ...
```
to generate and store credentials for private ECR registries - the credential helper does it all for you in the background whenever credentials are needed.

>This is handy for your local environment, and we sought to leverage it for our self-hosted runners to resolve the cached credentials issue.

⚠️ **Running `docker login` commands on a registry that is configured to use a credential helper will fail.**

## Implementation

### GitHub Runner Container Hooks

GitHub's runner implementation includes a built-in "hook" that performs the steps to provision and run any containers defined in the _Container Step_ or _Service Containers_ configuration. The hook will:
- docker login, using any provided `credentials`
- docker pull the image(s)
- setup docker networking
- run the images
- run each Job step in the primary container

Actions provides the ability for the runner agent to run a configured _custom_ hook, and a reference implementation, [runner-container-hooks](https://github.com/actions/runner-container-hooks) which can be used as a starting point. 

The core change we need to make is to skip any `docker login` executions from the [docker hook](https://github.com/actions/runner-container-hooks/tree/main/packages/docker) implementation, and allow the `ecr-login` credential helper to handle this for us (which we'll also install onto our runner image). 
- We configured this in a way where if a `HOOK_DOCKER_CONFIG` environment variable was present, the `login` would be skipped and the value of that environment variable would be used as our docker config location. 
- Additionally, added environment variables to the list passed to the hook's command/process execution, e.g. `AWS_` env vars are needed for the credential helper to work when the hook runs `docker pull` in a subprocess.

### Runner Image

- Add the `ecr-login` credential helper, your customized `runner-container-hook`, and an appropriate `~/.docker/config.json` file to your GHA runner image. 
- Configure the `ACTIONS_RUNNER_CONTAINER_HOOKS` environment variable on your runner containers with the path to your customized `runner-container-hook`.

Example docker config:
```json
{
  "credHelpers": {
    "<your-ecr-registry-url>": "ecr-login",
    "public.ecr.aws": "ecr-login"
  }
}
```

### Deployment

While the implementation seems simple enough, the real challenge was integrating this into our existing GHA workflows without disruptions. Our runner image needed the tooling and configuration installed but not "active" to prevent disruption to existing workflows, which couldn't be updated until the runner image had the necessary tooling/configuration.  
We also wanted to thoroughly test the implementation and ensure changes were compatible with existing workflows. To facilitate this, we:

- created a separate "test" runner group which allowed us to test different versions of our runner image without disrupting existing workflows
- added additional environment-dependent logic to our custom `runner-container-hook` to feature-flag our changes
- focused our release strategy on gradual changes that could be easily reverted if necessary
 
### Limitations and Considerations

- This solution only works with self-hosted runners, not GitHub-hosted runners, since we cannot customize the runner image for GitHub's managed infrastructure.
- Due to a bug in the GitHub runner's implementation, we had to add `--network-alias` arguments to service container configurations to ensure proper DNS resolution between containers: https://github.com/actions/runner/issues/2783
- The implementation requires careful coordination during deployment to avoid breaking existing workflows, and teams need to understand the dependency between custom hooks and workflow configurations.
