# Project Start Rule

## Purpose

This rule is executed only when explicitly referenced by the user (for example, `@project_start`).

Its purpose is to onboard the coding agent into the current project before any development work begins.

The objective is to build an accurate understanding of the project, its current state, its conventions, and the user's previous work so implementation can continue without unnecessary assumptions.

This rule is strictly read-only.

It must never modify the repository.

---

# Primary Objective

Before writing a single line of code, the coding agent must understand:

- What the project is.
- How the project is structured.
- What technologies it uses.
- What work has already been completed.
- What work is still pending.
- What rules govern the project.
- What Git state the repository is currently in.

The coding agent should behave as though it is joining an existing engineering team and is onboarding before contributing.

---

# Read-Only Rule

During execution of this rule, the coding agent must NOT:

- Create files.
- Delete files.
- Modify files.
- Rename files.
- Move files.
- Commit changes.
- Push changes.
- Install dependencies.
- Run database migrations.
- Execute cleanup tasks.
- Update documentation.
- Update the handover.
- Perform refactoring.

This rule is for understanding the project only.

---

# Step 1 - Inspect the Git Repository

Before reading project files, inspect the Git repository.

Determine:

- Current branch
- Repository status
- Modified files
- Untracked files
- Merge conflicts
- Detached HEAD state
- Ahead/behind remote status (if available)

Do not modify the repository.

This step exists only to understand the repository state.

---

# Step 2 - Load Project Rules

Search for project-specific rule files.

If a dedicated rules directory exists, read every rule file before continuing.

Examples include:

- github-rules.md
- coding-rules.md
- architecture-rules.md
- testing-rules.md
- security-rules.md
- deployment-rules.md
- session_ended.md
- handover-rule.md

Treat these rule files as project policies.

If two rules appear to conflict, stop and ask the user instead of making assumptions.

---

# Step 3 - Locate the Handover

Search the project root for the handover document.

The filename search must be case-insensitive.

Examples:

- HANDOVER.md
- handover.md
- Handover.md
- HandOver.md

Only Markdown files are considered valid.

Do not search subdirectories.

---

# Step 4 - Read the Handover

If a handover document exists:

Read the entire document.

Understand:

- Current project status
- Previously completed work
- Remaining work
- Known issues
- Current priorities
- Important implementation notes
- Recommended starting point

Do not modify the handover.

---

# Step 5 - Verify the Handover

Compare the handover against the repository.

If inconsistencies are found:

- Inform the user.
- Explain the inconsistency.
- Trust the repository's current state.

Never silently correct the handover during this rule.

The handover can be updated later through `@handover-rule`.

---

# Step 6 - Detect the Technology Stack

Determine the project's technology stack.

Examples include:

- Programming language
- Framework
- Runtime
- Package manager
- Database
- ORM
- Testing framework
- Build system
- Deployment tooling

Do not assume.

Base conclusions on project files.

---

# Step 7 - Understand the Repository Structure

Inspect the repository structure.

Identify:

- Major modules
- Feature folders
- Shared libraries
- Infrastructure
- Documentation
- Configuration
- Scripts
- Assets
- Tests

Build a mental map of the repository.

---

# Step 8 - Read Project Configuration

Inspect relevant configuration files.

Examples include:

- package.json
- tsconfig.json
- eslint configuration
- prettier configuration
- Docker configuration
- CI/CD configuration
- Environment templates

Read only what is necessary to understand the project.

---

# Step 9 - Read Project Documentation

If documentation exists:

Read the important documentation.

Examples include:

- README
- Getting Started
- Development Guide
- API documentation
- Database documentation

Do not modify documentation.

---

# Step 10 - Understand Project Architecture

Inspect the existing implementation.

Determine:

- Project organization
- Design patterns
- Folder conventions
- Naming conventions
- Dependency structure
- Module boundaries

The coding agent should continue existing conventions rather than introducing new ones.

---

# Step 11 - Understand the User's Request

Only after understanding the project should the coding agent analyze the user's request.

Determine:

- Which modules are affected.
- Which files are likely involved.
- Whether similar functionality already exists.
- Whether reusable components already exist.

Never duplicate existing functionality without good reason.

---

# Step 12 - Build Context

Before implementation, the coding agent should understand:

- What exists.
- What is missing.
- What needs to change.
- What should remain unchanged.

The goal is to minimize unnecessary modifications.

---

# Step 13 - Never Assume

If anything important cannot be determined from:

- the repository,
- the documentation,
- the handover,
- or the project rules,

stop and ask the user.

Never invent architecture.

Never invent project structure.

Never invent workflows.

Never guess.

---

# Step 14 - Provide a Startup Summary

Before beginning implementation, summarize your understanding.

The summary should include, when applicable:

- Project purpose
- Technology stack
- Current Git branch
- Repository status
- Current project state
- Previously completed work
- Remaining work
- Important project rules loaded
- Modules relevant to the requested task
- Any inconsistencies discovered
- Any questions that require clarification

Only begin implementation after this understanding has been established.

---

# Success Criteria

This rule is complete only when:

- The repository has been inspected.
- Git state is understood.
- Project rules have been loaded.
- The handover has been read.
- The handover has been verified against the repository.
- The technology stack has been identified.
- The repository structure is understood.
- Relevant documentation has been reviewed.
- Existing architecture has been understood.
- The user's request has been mapped to the project.
- A startup summary has been prepared.
- No repository changes have been made.