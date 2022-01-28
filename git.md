Git

## Basic Git Setup (Mac OS / Linux)
**Generate a ssh key:**

```
ssh-keygen -b 4096 -C "tcsullens_gh" -f ~/.ssh/github
```
(Add it to your GH profile)

## Setup config

```
git config --list
git config --global user.name "Tyler Sullens"
git config --global user.email "tyler.sullens@fiscalnote.com"
git config --global core.editor vim
```

set your current branch to default for pushes — prevents *git push --set-upstream origin...*
```
git config --global push.default current
```

set a global gitignore in your home directory — prevents committing e.g. `.idea/` to all `.gitignores`
```
git config --global core.excludesFile '~/.gitignore'
```

**all config:** https://git-scm.com/docs/git-config

**Pagination**

By default git sends all stdout to `less` so it's paginated by default.
We can turn this off in two ways (I find it helpful to not have this sometimes)

1. The `--no-pager` option: 
git --no-pager config --list

2. Switch the pager from `less` to `cat` (since `cat` doesn't paginate!):
git config --global core.pager cat

--- Basic Usage
Basic intro to git: https://guides.github.com/activities/hello-world/
covers a simple repository setup, making a branch, commit, creating a Pull Request (PR) and merging.

**Run an example:**

- pull a blank repository
- open a branch
- add this file (add some bogus whitespace to fix later)
- commit
- open a PR
- review / fix whitespace
- switch to master and push a commit
- pull that commit into local branch and push to PR
- merge

-- Cover:
 - fetch
 - status
 - checkout (-b, -- path...)
 - reset (--soft vs --hard)
 - commit --amend
 - diff (--name-only)

 A B C (HEAD, master, upstream/master)
 git fetch upstream
 A B C (HEAD, master) D E F (upstream/master)
 
**Checkout PR locally**

git fetch upstream pull/1575/head:pull/1575
git checkout pull/1575

**Merging locally**

git merge --ff-only upstream/master
git pull --ff-only
- merge/pull by default tries to fast-forward, but will execute a recusrive three-way merge if neccessary, 
  and so this prevents accidental merges
- prevents merge commits being generated / incorporated into the history

## Git History

https://www.linuxjournal.com/content/git-origin-story
- Original source written by Linus Torvalds
- Developed in 2005 to host Linux kernel development
- The man page describes Git as "the stupid content tracker"
- Torvalds sarcastically quipped about the name git: 
  "I'm an egotistical bastard, and I name all my projects after myself. First 'Linux', now 'git'.
- "goddamn idiotic truckload of sh*t": when it breaks (Linus' description)

**Git internals**

https://xkcd.com/1597/

**What is a commit?**

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

**How does Git deal with revision history?**

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

--- Git Archeology
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

## Advanced git

edit or add to the previous commit
```
git commit --amend
```

bring a specific patch from one branch to another
```
git cherry-pick SHA
```

inverse the patch respresented by SHA, and produce a new commit w/ message when doing so
```
git revert SHA
```

the reflog is an ordered list of the commits that HEAD has pointed to (the currently checked out commit is always HEAD ->)
where the log is the ordered list of commits for that tree
```
git reflog
```
track down an offending commit (one that introduced a bug) by (binary) searching through the commit history
can have git automatically run a command (e.g. a test suite) as it searches through the commits
or manually mark each commit good or bad as bisect runs
```
git bisect
```

**Rebasing**

```
git rebase master topic
git rebase -i master topic
```

**Advanced rebasing**

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

**Advanced Merging**

the `ours` recursive strategy will take our side of the diff (current branch/HEAD or the branch we're merging topic into)
for any and all conflicts while still merging the changes from both. the `theirs` strategy will do the inverse,
taking the topic side of the diff for any and all conflicts while incorporating changes from both.

```
git merge -s recursive [-Xours, -Xtheirs] [master] topic
```

## Useful git-isms

**The triple dot**

Show me the differences in either branch, or show me the commits reachable by either master or topic but _not by both_.

```
git log master...topic
git log --oneline --left-right master...topic (add an arrow to indicate which branch each commit belongs too)
git diff master...topic
```

show the commit history by following all commits on the left side only
depending on how you do merges this can look different

```
git log --oneline --first-parent [branch]
git log --oneline --first-parent branchA branchB
```

**Revision and date ranges**

git log is capable of taking a date range or revision range (see the man or git log --help).

## Pull Requests

**What makes a good Commit, Pull Request**

**PR**

https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/

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

#### Getting good with git
- embrace / incorporate git workflows/standards into your job
- contribute to OSS
- test repository
