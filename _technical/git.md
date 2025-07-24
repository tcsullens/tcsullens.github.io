---
layout: post
title: "Git Workflows & Commands"
date: 2024-07-23
categories: git version-control
---

# Git Workflows & Commands

*A comprehensive reference guide developed through years of managing code across multiple teams and leading Git adoption in engineering organizations.*

## Quick Reference

### Essential Daily Commands

```bash
# Check status and see what's changed
git status
git diff
git diff --staged

# Stage and commit changes
git add <file>
git commit -m "descriptive message in imperative mood"

# Sync with remote
git pull --ff-only  # safer than regular pull
git push
```

### Branch Management

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main
git checkout feature/existing-feature

# Delete local branch (after merge)
git branch -d feature/completed-feature

# Delete remote branch
git push origin --delete feature/completed-feature
```

## Setup & Configuration

### Initial Git Setup

```bash
# Generate SSH key for GitHub
ssh-keygen -b 4096 -C "your_email@example.com" -f ~/.ssh/github

# Basic user configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global core.editor vim

# Automatically setup remote tracking
git config --global push.autoSetupRemote true

# Global gitignore (prevents committing .idea/, .DS_Store, etc.)
git config --global core.excludesFile '~/.gitignore'
```

### My Production Configuration

**From `~/.gitconfig`:**
```ini
[user]
    name = Tyler Sullens
    email = your.email@example.com
[core]
    editor = vim
    pager = delta
[interactive]
    diffFilter = delta --color-only
[merge]
    conflictstyle = zdiff3
[pull]
    ff = only
[push]
    autoSetupRemote = true
[diff]
    algorithm = histogram
    colorMoved = default

[alias]
    # Difftastic integration for better diffs
    dlog = -c diff.external=difft log --ext-diff
    dshow = -c diff.external=difft show --ext-diff
    ddiff = -c diff.external=difft diff
```

**Recommended tools:**
- [Delta](https://github.com/dandavison/delta) - Better diff viewer
- [Difftastic](https://difftastic.wilfred.me.uk/) - Structural diff tool

## Pull Requests & Code Review

### What Makes a Good Pull Request

**From leading teams through hundreds of code reviews:**

1. **Single purpose** - One problem, one solution
2. **Proper commit structure** - Each commit represents a logical unit of work
3. **Complete context** - All information needed for review without prior knowledge
4. **Clear title and description** - What and why, not just what
5. **Self-review first** - Always review your own PR before requesting others

### PR Description Template

```markdown
## What
Brief description of changes

## Why
Context for why this change is needed

## How
Any implementation details reviewers should know about

## Testing
How this was tested (unit tests, manual testing, etc.)

## Checklist
- [ ] Self-reviewed the code
- [ ] Added/updated tests
- [ ] Updated documentation if needed
- [ ] Verified no secrets or sensitive data
```

### Commit Message Best Practices

**Format:**
```
Short descriptive title in imperative mood (50 chars max)

Optional longer explanation of what and why (wrap at 72 chars)
- Can include bullet points
- Reference ticket numbers if relevant
```

**Examples from real projects:**
```bash
# Good - imperative mood, specific
git commit -m "Add health check endpoint for load balancer"

# Good - includes context
git commit -m "Fix data pipeline timeout issues

Increase timeout from 30s to 120s for large dataset processing.
This resolves issues seen in production during peak hours."

# Bad - past tense, vague
git commit -m "Fixed some bugs"
```

## Advanced Workflows

### Interactive Rebase for Clean History

**Real scenario:** You've made several commits on a feature branch but want to clean up history before merging.

```bash
# Start interactive rebase from main
git rebase -i main

# In the editor, you can:
# - `pick` to keep a commit as-is
# - `squash` to combine with previous commit
# - `edit` to modify the commit
# - `reword` to change commit message
```

**Example cleanup:**
```bash
# Before rebase - messy history
a1b2c3d Fix typo in function name
b2c3d4e Add user authentication logic
c3d4e5f Fix authentication bug
d4e5f6g Add tests for authentication
e5f6g7h Fix test assertion

# After rebase - clean history
f6g7h8i Add user authentication with tests
```

### Cherry-picking Specific Changes

**Scenario:** Need to apply a specific fix from one branch to another (common in production hotfixes).

```bash
# Apply commit from feature branch to main
git checkout main
git cherry-pick <commit-hash>

# Apply multiple commits
git cherry-pick <commit1>..<commit2>
```

### Branch Rebasing for Clean Merges

**Scenario:** Your feature branch is behind main and you want a clean merge without merge commits.

```bash
# Update your branch with latest main
git checkout feature/my-feature
git rebase main

# If there are conflicts, resolve them then:
git add <resolved-files>
git rebase --continue
```

### Advanced Branch Management

**Moving a branch to different base:**
```bash
# Move feature branch from old-base to new-base
git rebase --onto new-base old-base feature-branch

# Example: Move feature from experimental branch to main
git rebase --onto main experimental feature/new-ui
```

## Troubleshooting & Recovery

### Common "Oh No" Moments

**Accidentally committed to wrong branch:**
```bash
# Move last commit to correct branch
git reset --soft HEAD~1
git stash
git checkout correct-branch
git stash pop
git commit
```

**Need to undo last commit (but keep changes):**
```bash
git reset --soft HEAD~1
# Files remain staged, ready to re-commit
```

**Need to completely undo last commit:**
```bash
git reset --hard HEAD~1
# WARNING: This permanently deletes changes
```

**Recover "lost" commits:**
```bash
# Git keeps everything for ~90 days
git reflog
# Find your lost commit hash, then:
git checkout <commit-hash>
git checkout -b recovery-branch
```

### Merge Conflicts

**My conflict resolution workflow:**
```bash
# When merge/rebase hits conflicts
git status  # See which files have conflicts

# Edit files to resolve conflicts, then:
git add <resolved-file>

# Continue the operation
git rebase --continue  # for rebase
git commit             # for merge
```

**Understanding conflict markers:**
```
<<<<<<< HEAD
Your current change
=======
Incoming change
>>>>>>> branch-name
```

## Git Archaeology & Debugging

### Finding When Something Changed

```bash
# Search for when a specific string was added/removed
git log -p -S "function_name"

# Find when a specific line changed
git blame <file>

# Search commit messages
git log --grep="bug fix"

# See what changed in a specific commit
git show <commit-hash>
```

### Binary Search for Bugs

**Scenario:** A bug exists but you don't know which commit introduced it.

```bash
# Start bisect between known good and bad commits
git bisect start
git bisect bad          # Current commit has the bug
git bisect good v1.2.0  # This version was working

# Git will check out a commit in the middle
# Test the commit, then mark it:
git bisect good  # if this commit works
git bisect bad   # if this commit has the bug

# Continue until Git finds the exact commit
git bisect reset  # when done
```

## Team Workflows

### Feature Branch Workflow

**What I've implemented at multiple companies:**

```bash
# 1. Start feature from latest main
git checkout main
git pull
git checkout -b feature/JIRA-123-user-auth

# 2. Develop with frequent commits
git add .
git commit -m "Add login form validation"

# 3. Keep branch updated with main
git fetch origin
git rebase origin/main

# 4. Push for review
git push -u origin feature/JIRA-123-user-auth

# 5. Create pull request
# 6. After approval, squash merge to main
```

### Release Management

**Git flow for production releases:**

```bash
# Create release branch from main
git checkout -b release/v2.1.0 main

# Make any final adjustments, then tag
git tag -a v2.1.0 -m "Version 2.1.0 release"
git push origin v2.1.0

# Merge back to main and develop
git checkout main
git merge release/v2.1.0
```

## Git Internals & Understanding

### What is a Commit?

A commit is a SHA1 hash computed from:
- Commit message
- Author and committer info
- Timestamp
- Tree object (representing file state)
- Parent commit(s)

### Git as a Directed Acyclic Graph

```
     o----o---o feature-branch
    /          \
o---o---o---o---o---o---o main
         \             /
          o---o---o---o hotfix-branch
```

Each commit points to its parent(s), creating a graph of history.

### Useful Internal Commands

```bash
# See what type of object a hash represents
git cat-file -t <sha>

# Pretty-print any git object
git cat-file -p <sha>

# List all files git knows about
git ls-files

# Search through all tracked files
git grep "search-term"
```

## References & Further Reading

- [A Note About Git Commit Messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- [How to Write the Perfect Pull Request](https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/)
- [Popular Git Config Options](https://jvns.ca/blog/2024/02/16/popular-git-config-options/)
- [Git SCM Documentation](https://git-scm.com/docs)

---

*This guide reflects practices developed through managing Git workflows at NPR, FiscalNote, CoStar, and Axios. It emphasizes real-world scenarios over theoretical concepts.*

**Last updated**: July 2024