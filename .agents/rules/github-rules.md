---
trigger: always_on
---

# GITHUB_WORKFLOW_RULES.md

# Git Workflow Rules (Mandatory)

These rules apply to every development task, bug fix, refactor, feature implementation, documentation update, test update, and configuration change.

The AI agent is authorized to create commits but is NOT authorized to push to any remote repository.

The developer performs every push manually.

The AI agent may only recommend Git commands.

Assumptions are strictly prohibited.

---

# 1. Repository Discovery (MANDATORY)

Before making ANY recommendation related to:

- commit
- push
- merge
- deployment
- release
- synchronization
- session end
- handover

The agent MUST first discover the Git topology.

Run:

```bash
git remote -v
git branch -vv
git branch -a
git status
git rev-parse --abbrev-ref HEAD
git rev-parse HEAD
git log --oneline -1
```

If required:

```bash
git fetch --all
```

The agent MUST determine:

- Current repository
- Repository path
- Current branch
- Tracking branch
- Current HEAD commit
- All configured remotes
- All long-lived branches
- Ahead/behind status
- Branch divergence

Never assume there is only one repository.

Never assume there is only one remote.

Never assume there is only one branch.

---

# 2. Repository Scope

Every Git report MUST explicitly state:

Repository Name

Repository Path

Current Branch

Tracking Branch

Current HEAD

These findings apply ONLY to this repository.

Never imply they apply to any other repository.

---

# 3. Commit After Every Completed Task

After completing a task:

1. Verify implementation is complete.
2. Verify tests pass.
3. Verify no architecture violations exist.
4. Verify AGENT.md rules are satisfied.
5. Verify tenant isolation remains intact.
6. Verify TypeScript compilation succeeds.

Only then create a Git commit.

Never leave completed work uncommitted.

---

# 4. Always Review Changes Before Commit

Before creating a commit run:

```bash
git status
git diff
```

Review:

- Modified files
- Added files
- Deleted files
- Generated files
- Temporary files

Never commit:

- node_modules
- .env
- build artifacts
- temporary files
- logs
- IDE files
- debug files

Commit only files related to the completed task.

---

# 5. Commit Messages

Forbidden:

```
fix
update
changes
done
working version
latest
misc
test
wip
```

Use:

```
<type>: <summary>

- change
- change
- change
```

Allowed types

- feat
- fix
- refactor
- docs
- test
- perf
- chore
- security

---

# 6. Commit Scope

One commit must represent one logical change.

Do not mix unrelated work.

---

# 7. Verify Before Commit

Run:

```bash
npm test

npx tsc --noEmit
```

If either fails

DO NOT COMMIT.

---

# 8. Never Push Automatically

The AI agent MUST NEVER execute:

```bash
git push
git push --force
git push -f
git push --tags
```

The developer performs every push manually.

---

# 9. Never Merge Automatically

The AI agent MUST NEVER execute:

```bash
git merge
git rebase
git cherry-pick
git reset --hard
git branch -D
```

unless the developer explicitly instructs it.

The agent may recommend these commands.

---

# 10. Commit Completion

After creating a commit provide:

Commit Hash

```bash
git rev-parse HEAD
```

Commit Summary

Repository

Branch

Commit

Commit Message

Files Included

Then STOP.

---

# 11. Repository Synchronization Report (MANDATORY)

After every successful commit produce:

Repository Synchronization Report

including

Repository

Repository Path

Current Branch

Tracking Branch

HEAD Commit

Detected Remotes

Detected Long-lived Branches

Ahead/Behind Status

Synchronization Status

Example

Repository

Universal-ChatBot

Repository Path

D:\DEV-ENV\autosipp-projects\Universal-ChatBot

Current Branch

master

Tracking Branch

main/master

HEAD

3728f727

Detected Remotes

main

origin

pre-prod

Detected Branches

master

pre-prod

---

# 12. Branch Synchronization

The agent MUST determine whether other maintained branches are missing the new commit.

Example

master contains commits not present in pre-prod.

If branches have diverged report

master and pre-prod have diverged.

Manual merge required.

Never recommend force push.

---

# 13. Multi-Repository Push Recommendation

The AI agent MUST NEVER assume there is only one repository.

If multiple remotes exist

recommend commands for EVERY maintained remote.

Example

Push upstream

```bash
git push main master
```

Push personal repository

```bash
git push origin master
```

---

# 14. Multi-Branch Recommendation

If another maintained branch should receive the same commit

recommend the required merge sequence.

Example

```bash
git checkout pre-prod

git merge master

git push pre-prod pre-prod

git checkout master
```

The agent MUST NOT execute these commands.

---

# 15. Pull Request Preparation

Provide

Changed Files

```bash
git diff --name-only HEAD~1 HEAD
```

Commit Hash

```bash
git rev-parse HEAD
```

Recommended Commands

for EVERY maintained repository and branch.

Example

```bash
# Push upstream
git push main master

# Push personal repository
git push origin master

# Update pre-prod
git checkout pre-prod
git merge master
git push pre-prod pre-prod

# Return
git checkout master
```

---

# 16. End Of Task Workflow

For every completed task

1. Discover repository topology.
2. Verify implementation.
3. Run tests.
4. Verify architecture compliance.
5. Verify AGENT.md compliance.
6. Review git diff.
7. Create commit.
8. Display commit hash.
9. Display commit summary.
10. Display Repository Synchronization Report.
11. Display Recommended Commands for ALL maintained repositories and branches.
12. Stop.
13. Wait for developer approval.

Never push automatically.

The developer retains full control over all Git operations.

---

# 17. Evidence Rule

Every Git recommendation MUST be backed by evidence collected during the current session.

If evidence is missing, state

MISSING EVIDENCE

and perform repository discovery before making recommendations.

Never guess.

Never assume.

Never invent repository structures.