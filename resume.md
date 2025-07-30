---
layout: page
title: resume
permalink: /resume/
---

**Senior Infra/DevOps/Platform Engineer**  
→ [pdf](/assets/tyler-sullens-resume.pdf) | [gmail](mailto:tcsullens@gmail.com) | [github](https://github.com/tcsullens) | [linkedin](https://linkedin.com/in/tyler-sullens)

## Skills

**Programming:** Python, Go, Node.js, Ruby, Bash  
**DevOps/Platform:** AWS, Docker, Kubernetes, Helm, ArgoCD, ECS, Terraform/Terragrunt, Vault, CircleCI, GitHub Actions, Buildkite, Cloudflare, Akamai  
**Databases & Search:** PostgreSQL, MySQL, Elasticsearch/OpenSearch, DynamoDB, Redis/Valkey, RabbitMQ, SQS   
**Monitoring & Observability**: Prometheus, Grafana, DataDog, New Relic, OpenTelemetry, eBPF   
**Data:** Redshift, Airflow, DBT, Looker, Glue, Debezium, Kafka  

---

## Experience

#### Senior Platform Engineer, *Wrapbook* (Current)

Managing and scaling a Rails-based production finance platform, focusing on developer experience, infrastructure management, high volume CI/CD pipelines, and application uptime/stability.
- Completed refactor of application configuration to use the standard Rails environment configuration instead of custom implementation.
- Evaluated state of developer tooling management and recommended improvements.
- Identified oversized/under-utilized AWS resources and implemented recommended changes to right-size for use/cost.
- Evaluated alternative CI/CD platforms based on organizational requirements and facilitated migration from GitHub Actions to Buildkite for CI pipelines.
- Integrated ECR Credential Helper to GitHub Actions self-hosted runners to eliminate pipeline re-run failures and improve developer experience.


#### Senior Infrastructure Engineer II / Tech Lead, *Axios* (Jan 2022 – Aug 2024)

- Managed infrastructure and tooling for NextJs/Django/Go application services powering the Axios website and internal Content Management System.
- Led technical strategy and cross-functional collaboration for adoption of Cloud-Native security platform (Orca), Data Observability platform (MonteCarlo), and migration to GitHub Actions.
- Identified and reduced Kubernetes cluster costs by 50% through right-sizing deployment resources and optimizing EKS node types and scheduling.
- Developed automated tooling and CI/CD workflows for provisioning ephemeral development environments and production deployments, enabling rapid product iteration.
- Managed Cloudflare infrastructure and improved site resiliency to malicious attacks and bot traffic.
- Owned data platform, configuring CI/CD workflows for data infrastructure, managing Redshift clusters, building tooling and establishing standards for Airflow pipelines and DBT, and integrating MonteCarlo to improve observability across the data platform.
- Reduced Data Lake storage costs by 50% by implementing S3 lifecycle management policies.


#### Senior DevOps Engineer, *CoStar* (Mar 2021 – Jan 2022)

- Migrated CoStar's flagship service to Kubernetes blue/green deployment using Argo Rollouts, ensuring zero-downtime releases for production workloads.
- Dockerized and deployed .NET applications using Azure Pipelines and Helm, improving deployment consistency and reliability.
- Upgraded Kubernetes clusters without downtime by building Azure DevOps Pipelines and Terraform infrastructure-as-code resources.
- Identified and led optimizations of internal Azure DevOps Pipelines, reducing toil.
- Mentored junior team members on DevOps practices and operational excellence, fostering alignment with organizational goals.


#### Lead DevOps Engineer, *FiscalNote* (Sep 2019 – Mar 2021)

- Guided team transition to agile practices and developed technical strategy and roadmap for infrastructure modernization.
- Improved cross-team communication and visibility by introducing structured sprint reporting processes across engineering teams.
- Automated infrastructure deployments with Terraform/Terragrunt and Ansible, replacing manually deployed EC2 instances and improving application infrastructure stability.
- Built python tool to automated test environment data refresh process, updating 10+ RDS instances in parallel, drastically reducing time and effort involved from multiple days to hours.
- Created React-based infrastructure dashboard displaying real-time health status of 10+ microservices, improving incident response and troubleshooting capabilities.
- Supported engineering efforts to achieve and maintain SOC 2 compliance through infrastructure security improvements.
- Designed modern multi-account AWS architecture with cross-account VPC connectivity using Transit Gateway.


#### Software Engineer, *Elastic* (Feb 2019 – Sep 2019)

- Optimized and managed Jenkins workflows responsible for building and publishing Elastic Cloud platform releases for internal and enterprise customers.
- Integrated new Elastic product versions into development environments, ensuring seamless product iteration.
- Supported developer environments and tooling, resolving issues and developing new features.
- Participated in on-call rotation, investigating and resolving production issues with customer Elastic Cloud deployments.

#### Lead DevOps Engineer, *NPR* (Mar 2016 – Feb 2019)

- Led transformation of traditional operations team to agile DevOps team, expanding team personnel, capabilities and organizational impact.
- Reduced server deployment times through custom Debian package development and Chef cookbook optimization.
- Built internal infrastructure dashboard (Golang + React) for Chef server management, improving operational visibility.
- Pioneered infrastructure expansion into AWS, establishing standards best practices for highly-available application deployments.
- Architected and implemented multi-region AWS service architecture with automated failover capabilities, proven effective in production incidents.
- Mentored team members through migration from legacy deployment processes to modern containerized workflows.
- Developed initial Kubernetes environment, enabling the organization's first container-based service deployments.


---

## Education

**West Virginia University**, BSc in Computer Science, 2012
