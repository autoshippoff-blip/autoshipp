# Session Ended Rules

## Purpose

This rule is executed **only when the user explicitly references this rule file** (for example, "follow @session_ended", "end session", "wrap up", "cleanup the project", or similar instructions).

The objective of this rule is to leave the repository in a clean, production-ready state before ending the current development session while preserving all important project artifacts and context for future sessions.

This rule is an orchestrator. It performs workspace cleanup, delegates handover updates to `@handover-rule`, and delegates Git operations to `@github-rules`.

---

# Guiding Principles

Always prioritize:

1. Production safety
2. Repository cleanliness
3. Preservation of project knowledge
4. Accurate documentation
5. No assumptions

If there is uncertainty at any point, stop and ask the user.

Never guess.

---

# Step 1 - Inspect the Repository

Before making any changes:

- Inspect the repository structure.
- Identify temporary artifacts created during the current or previous development sessions.
- Determine whether each artifact is required for the project.

Do not immediately delete anything.

Perform an inspection first.

---

# Step 2 - Clean the Workspace

The goal is to remove files that do not belong in the long-term project history.

Examples include:

- Temporary test scripts
- Scratch files
- Debug scripts
- Investigation scripts
- Experimental files
- One-time validation scripts
- Temporary helper scripts
- Generated test reports
- Coverage reports
- Benchmark output
- Profiling output
- Temporary JSON dumps
- Temporary CSV exports
- Temporary SQL dumps
- Backup files (*.bak)
- Old copied files
- Merge leftovers
- Temporary log files
- Build artifacts that should not be committed
- Temporary screenshots created for debugging
- Files created solely for debugging a specific issue

This list is intentionally not exhaustive.

Use professional judgment.

---

# Step 3 - Preserve Important Project Files

The following must NEVER be removed without explicit user permission.

## Documentation

Do not delete:

- Markdown files
- Documentation
- README files
- Design documents
- Architecture documents
- API documentation
- Database documentation
- Requirement documents
- Planning documents
- Specification documents
- ADRs
- Project notes
- Handover documents
- Release notes
- Changelogs

Documentation represents project knowledge and must be preserved.

---

## Source Code

Never remove:

- Production source code
- Shared libraries
- Utilities
- Components
- Services
- Controllers
- Models
- APIs
- Middleware
- Infrastructure code

---

## Configuration

Never remove:

- package.json
- tsconfig.json
- docker files
- docker compose
- CI/CD configuration
- GitHub workflows
- lint configuration
- formatter configuration
- build configuration
- deployment configuration
- environment templates

---

## Database

Never remove:

- migrations
- schema files
- seed files
- ORM configuration

---

## Assets

Never remove:

- images
- icons
- fonts
- localization files
- templates
- email templates
- public assets

unless the user explicitly requests it.

---

# Step 4 - Verify Every Candidate

Before deleting a file, verify:

- Is it referenced by the project?
- Is it part of the build?
- Is it used during runtime?
- Is it required by CI/CD?
- Is it required for deployment?
- Is it part of the documentation?
- Is it intentionally stored in the repository?

If the answer is yes to any of these:

Do not delete it.

---

# Step 5 - Never Assume

If there is uncertainty:

Stop.

Explain:

- why the file appears temporary
- why it might still be important

Ask the user.

Wait for confirmation.

Never delete based on assumptions.

---

# Step 6 - Preserve Repository Structure

Cleanup should never change the intended project structure.

Do not:

- reorganize folders
- rename directories
- move documentation
- change architecture
- modify module boundaries

unless the user explicitly requested those changes.

---

# Step 7 - Verify Cleanup

After cleanup, verify that:

- Production code still exists.
- Documentation is untouched.
- Repository structure is unchanged.
- Only temporary artifacts were removed.
- No accidental deletions occurred.

If any uncertainty exists:

Stop and ask the user.

---

# Step 8 - Update Project Handover

After cleanup has completed successfully,

follow:

@handover-rule

Do not implement handover logic inside this rule.

Delegate everything related to project handover to the dedicated rule.

---

# Step 9 - Git Workflow

After cleanup and handover are complete,

strictly follow:

@github-rules

Do not duplicate Git logic here.

The Git workflow is completely managed by the dedicated GitHub rule.

---

# Step 10 - Never Invent Work

Never claim that:

- cleanup was performed if it was not
- files were deleted if they were not
- tests were executed if they were not
- validation was completed if it was not
- documentation was updated if it was not
- bugs were fixed if they were not
- code was reviewed if it was not

Everything recorded must accurately represent the work completed.

---

# Step 11 - Workspace Boundary

Only operate inside the current project repository.

Never delete files:

- outside the repository
- in parent directories
- in sibling repositories
- in global folders
- in unrelated workspaces

Cleanup must never extend beyond the current project.

---

# Step 12 - Respect User Decisions

If the user instructs that a file should remain,

do not question the decision.

Do not delete it during future cleanup unless the user explicitly changes that decision.

---

# Step 13 - Completion Checklist

Before considering the session complete, verify:

✓ Repository inspected

✓ Temporary artifacts identified

✓ Only safe files removed

✓ No production code removed

✓ No documentation removed

✓ Repository structure preserved

✓ Cleanup verified

✓ @handover-rule executed

✓ @github-rules executed

---

# What This Rule Does NOT Do

This rule does not define:

- Git workflow
- Commit messages
- Branch strategy
- Push strategy
- Handover format
- Session summaries

Those responsibilities belong to their dedicated rule files.

---

# Success Criteria

A successful session completion means:

- The repository is cleaner than before.
- No production functionality has been affected.
- No project knowledge has been lost.
- Temporary development artifacts have been removed.
- The project handover has been updated through `@handover-rule`.
- The Git workflow has been completed through `@github-rules`.
- The project is ready for the next development session.

Failure to satisfy any of these conditions means the session should not be considered complete.