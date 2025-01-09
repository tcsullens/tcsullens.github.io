Git 

- [Getting Started](#getting-started)
  - [Basic Git Setup](#basic-git-setup)
  - [Config](#config)
    - [My Config](#my-config)
    - [Pagination](#pagination)
- [Using Git](#using-git)
  - [Commits and Pull Requests](#commits-and-pull-requests)
  - [(Un)Common Commands](#uncommon-commands)
  - [Editing Previous Commits](#editing-previous-commits)
  - [Rebasing Branches onto Other Branches](#rebasing-branches-onto-other-branches)
  - [Merging Options](#merging-options)
  - [Git Archeology](#git-archeology)
- [About Git](#about-git)
  - [History](#history)
  - [Git internals](#git-internals)
  - [What is a commit?](#what-is-a-commit)
  - [Inspecting git objects](#inspecting-git-objects)
  - [How does Git deal with revision history?](#how-does-git-deal-with-revision-history)
  

# Getting Started

## Basic Git Setup
**Generate a ssh key:**

```
ssh-keygen -b 4096 -C "tcsullens_gh" -f ~/.ssh/github
```
(Add it to your GH profile)

### Config

```
git config --list
git config --global user.name "Tyler Sullens"
git config --global user.email "tyler.sullens@fiscalnote.com"
git config --global core.editor vim
```

Automatically setup remote tracking:
```
git config --global push.autoSetupRemote true
```

set a global gitignore in your home directory — prevents committing e.g. `.idea/` to all `.gitignores`
```
git config --global core.excludesFile '~/.gitignore'
```

**Popular settings:** https://jvns.ca/blog/2024/02/16/popular-git-config-options/  
**Config Reference:** https://git-scm.com/docs/git-config


#### My Config
`~/.git/config`
```
[user]
        name = Tyler Sullens
        email = tsullens@wrapbook.com
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
[init]
        templateDir = /Users/tsullens/.git-template

[alias]
    # diffstastic - https://difftastic.wilfred.me.uk/
    # Difftastic aliases, so `git dlog` is `git log` with difftastic and so on.
    dlog = -c diff.external=difft log --ext-diff
    dshow = -c diff.external=difft show --ext-diff
    ddiff = -c diff.external=difft diff

    # `git log` with patches shown with difftastic.
    dl = -c diff.external=difft log -p --ext-diff

    # Show the most recent commit with difftastic.
    ds = -c diff.external=difft show --ext-diff

    # `git diff` with difftastic.
    dft = -c diff.external=difft diff
```

#### Pagination

By default git sends all stdout to `less` so it's paginated by default.
We can turn this off in two ways (I find it helpful to not have this sometimes)

1. The `--no-pager` option: 
git --no-pager config --list

2. Switch the pager from `less` to `cat` (since `cat` doesn't paginate!):
git config --global core.pager cat


## Using Git

### Commits and Pull Requests

What makes a good Commit, Pull Request?

- [How to write the perfect pull request](https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/)
- [A Note About Git Commit Messages](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- [89 things I know about Git commits](https://www.jvt.me/posts/2024/07/12/things-know-commits/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)

**Pull Requests**

1. A PR should be limited to solving a _single_ problem or achieving a singular goal.
2. A PR should be comprimised of properly formatted commits representing single units of work
   within the PR.
3. A PR should contain all of the information neccessary for a reviewer with no prior knowledge 
   about the work to properly review it.
   - A short, descriptive title: "Fix issue with function foo"
   - Jira numbers in PR titles
     Use the imperative mood ("Fix" vs "(This) Fixes...")
   - An explanation of the work being done
   - An explanation to *why* this work is being done
   - Links to any relevant issues, PRs
   - What is the extent of the review needed? 
     - Just a quick :eyes:?
     - Comments on any change that needs to be looked at closely, or 
       any change that requires an explanation
4. The state of the PR - e.g. a WIP tag or "[WIP]" title prefix to indicate it is not ready for review.
5. A review is requested when ready!
6. @mentions for people that should be involved in the conversation, but maybe not needed for review.
7. Don't *EVER* rebase (and force-push) PRs once you've started a review.
8. Review your own PR before you request a review from others!

**Commit**
1. A commit should be limited to a _single_ unit of work within a PR.
2. A commit message should take a form:
   "short descriptive title in the imperative mood

    an (optional) explanation of the work within the commit
    and/or why it was done"
3. Jira numbers in commit messages (if major)


### (Un)Common Commands

Bring a specific patch from one branch to another
```
git cherry-pick SHA
```

Revert a commit/change - inverse the patch respresented by SHA, and produce a new commit w/ message when doing so
```
git revert SHA
```

The reflog is an ordered list of the commits that HEAD has pointed to (the currently checked out commit is always HEAD ->)
where the log is the ordered list of commits for that tree
```
git reflog
```

Track down an offending commit (one that introduced a bug) by (binary) searching through the commit history
can have git automatically run a command (e.g. a test suite) as it searches through the commits
or manually mark each commit good or bad as bisect runs
```
git bisect
```

Get just the commit-hash of the current commit
```
git rev-parse HEAD
```

The triple dot — show me the differences in either branch, or show me the commits reachable by either master or topic but _not by both_.

```
git log master...topic
git log --oneline --left-right master...topic (add an arrow to indicate which branch each commit belongs too)
git diff master...topic
```

Show the commit history by following all commits on the left side only depending on how you do merges this can look different

```
git log --oneline --first-parent [branch]
git log --oneline --first-parent branchA branchB
```

git log is capable of taking a date range or revision range (see the man or git log --help).


### Editing Previous Commits

Edit or add to the current commit (`HEAD`)
```
git commit --amend
```

In some cases, you want to edit a commit further back in history. 
Let's say you have a history like:
```
commit e824da8 (main)
...

commit 2e3cd32
...
fileA

commit 63edfc
...
fileB
fileC

commit 2bf9bd
...
fileD
```

and you make an additional change to `fileA`, but want to keep this kind of commit history ie. you want that change included in `commit 2e3cd32`, or some new commit _in the same place in the history_. One can do this using `git rebase`:

- `git stash` any changes you currently have
- rebase interactively from the commit _before_ the one you wish to edit
  ```
  git rebase -i e824da8
  ```
- In the interactive editor, change the rebase command to `edit` for the commit you want to update, and save:
  ```
  edit 2e3cd32 ...
  pick 63edfc ...
  pick 2bf9bd ...
  ...
  ```
- When the `rebase` reaches this commit, it will pause and allow you to `git commit --amend` it. Simply `git stash pop` you changes, `git add` the file(s) you wish to amend to the commit, `git commit --amend`, and `git rebase --continue`. You can do this multiple times (to multiple commits) in a single rebase

### Rebasing Branches onto Other Branches

Let's say I started a topic branch (topicB) based on another topic branch (topicA) and realize I need
to move it to a different branch (master). 
Starting with:
```
o---o---o---o---o  master
    \
     o---o---o---o---o  topicA
                      \
                       o---o---o  topicB
```

We want to make topicB forked from branch master; for example, because the functionality on which topicB depends
was merged into the more stable master branch. We want our tree to look like this:

```
 o---o---o---o---o  master
        |            \
        |             o'--o'--o'  topicB
         \
          o---o---o---o---o  topicA
git rebase --onto master topicA topicB
```

What is actually happening here is git is looking for the common ancestor of the 
first two args (master, topicA) and rebasing our specified branch (topicB or HEAD by default)
onto that.

### Merging Options

the `ours` recursive strategy will take our side of the diff (current branch/HEAD or the branch we're merging topic into)
for any and all conflicts while still merging the changes from both. the `theirs` strategy will do the inverse,
taking the topic side of the diff for any and all conflicts while incorporating changes from both.

```
git merge -s recursive [-Xours, -Xtheirs] [master] topic
```

### Git Archeology
http://www.philandstuff.com/2014/02/09/git-pickaxe.html

git serves as a record of the changes made to data
The git log
```
git log (-p)
git log --oneline
```
search the log output (this will include patches since -p) for a string (regex accepted)
```
git log -p -S "foo"
```
Inspect a line-by-line overview of the current state (commit) of a file
Shows the commit, commiter, and timestamp of commit line-by-line
```
git blame *file*
```

list all files git knows about
```
git ls-files
```
grep through all files git knows about for a string (regex accepted)
```
git grep ".*foo"
```


## About Git

### History

https://www.linuxjournal.com/content/git-origin-story
- Original source written by Linus Torvalds
- Developed in 2005 to host Linux kernel development
- The man page describes Git as "the stupid content tracker"
- Torvalds sarcastically quipped about the name git: 
  "I'm an egotistical bastard, and I name all my projects after myself. First 'Linux', now 'git'.
- "goddamn idiotic truckload of sh*t": when it breaks (Linus' description)

### Git internals

https://xkcd.com/1597/

### What is a commit?

https://blog.thoughtram.io/git/2014/11/18/the-anatomy-of-a-git-commit.html

A commit is a SHA1 hash that is computed from several different things:
sha1(
    commit message  => "second commit"
    committer        => Christoph Burgdorf <christoph.burgdorf@gmail.com>
    commit date     => Sat Nov 8 11:13:49 2014 +0100
    author          => Christoph Burgdorf <christoph.burgdorf@gmail.com>
    author date     => Sat Nov 8 11:13:49 2014 +0100
    tree            => 9c435a86e664be00db0d973e981425e4a3ef3f8d
    parents         => [0d973e9c4353ef3f8ddb98a86e664be001425e4a]
)
Merge commits have two parents, so we could have multiple parents here.

**Inspecting git objects**

Git has three types of objects:
- commit
  - SHA1 of meta-data (reviewed above)
  - points to a tree object that is the root tree of that commit
- tree (pointer to other trees, blobs)
  - SHA1 of all content underneath it
- blob (file)
  - SHA1 of the file

```
git cat-file
```

**show what type of object a SHA is**
```
git cat-file -t SHA
```
**pretty-print the contents of a git object**
```
git cat-file -p SHA
```

```
[FN-Web-App-User-Navigator] git cat-file -p f825aa8                                                                                   master
tree 9f7d80d328f21c33413af069e6e27ffbd041b211
parent 4c9a8ce2ef5fd7379f9a165c7781e3640795e7cb
parent 1c34ba622ffdf735e29c080986c082f0fe474f6c
author Sam Esfahani <sam.esfahani@fiscalnote.com> 1570124001 -0400
committer GitHub <noreply@github.com> 1570124001 -0400
gpgsig -----BEGIN PGP SIGNATURE-----

 wsBcBAABCAAQBQJdljDhCRBK7hj4Ov3rIwAAdHIIAIJGOChTosSxE2n1+F88vFfz
 c9W9e6K9etwzvFcfdTpcLETXtcm6GkGTyA9hofmvPq6TO0GVQ/WRMoBahgEpQwJP
 Mk06B81miX66QHvj/uxsgylK6vUrkAiWzRETwe9YH8qqPOKBUUa/petFQHzw7kTS
 DBze9uIeUIcRN2e9DwhztmY7LMbek3IZ48kikW9C2B+LK7xhXIpCYv6LzSwd4zK+
 Fe89bOb+wnGnRUKi3dhdGf1D7HCV1WK0/7E2QEib8NIVp0sxsGE0rsaPteiCAEvQ
 w0682QEIiOhE0VK6CxieRJIImj/lc0bWXDRYchyzTlPV7W7eWadwaj1md14qNoA=
 =dwA/
 -----END PGP SIGNATURE-----


Merge pull request #52 from FiscalNote/samesfahani-patch-1

Update README.md%
```

### How does Git deal with revision history?

Git is a directed acyclic graph. WTF?
An explanation, taken from wikipedia: 
"Equivalently, a DAG is a directed graph..., a sequence of the vertices such that 
every edge is directed from earlier to later in the sequence"
https://medium.com/girl-writes-code/git-is-a-directed-acyclic-graph-and-what-the-heck-does-that-mean-b6c8dec65059
```
     o----o---o
    /          \
o---o---o---o---o---o---o---o--o master
         \                 /
          o---o---o---o---o
         (v)
```

```
git log --oneline --graph (it's a DAG!)
```

Here's a better representation:
```
             D <- E (topic branch)
           /
A <- B <- C <- G (master branch)
```
Every commit points to it's predecessor. Something like a rebase just updates a pointer:
rebase master (assuming we currently have topic checked out)
rebase master topic
```
                 D' <- E' (topic branch)
                /
A <- B <- C <- G (master branch)
```
So the pointer for D has changed.
Notice I reference D' and E' instead of D and E. This is b/c while D and E are effectively the same commit - 
they contain the same diff, message, etc, git is _replaying_ these on top of the new base, and this results in 
new commit SHAs b/c of the way a commit SHA is generated (remember?).
