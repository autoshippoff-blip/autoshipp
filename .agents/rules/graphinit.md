---
trigger: model_decision
description: Safely initializes Graphify for the current project. Audits the repository, installs only missing Graphify components, updates or creates the graph as needed, verifies hooks and integrations, and reports the final project status.
---

# Rule: graphinit

## Purpose

Safely initialize Graphify for the current project.

This rule is **idempotent** and safe to execute multiple times. Never assume the project is new. Always inspect the project first, then perform **only** the missing setup.

If Graphify or its prerequisites are missing, do not simply fail. Detect the problem, explain it, guide the user through fixing it, and continue only after the prerequisite has been resolved.

---

## Workflow

### 1. Verify prerequisites

Before making any changes:

1. Verify the current directory is a Git repository.
2. Verify `graphify` is available.
3. Verify Graphify prerequisites.

---

### If Graphify is unavailable

If `graphify` cannot be executed:

Determine the cause before stopping.

#### Case 1 — Graphify is not installed

Recommend installing Graphify using the official installation method.

For Windows:

```powershell
winget install astral-sh.uv
```

Then:

```bash
uv tool install graphifyy
```

#### Case 2 — uv is not installed

Explain that Graphify requires uv.

Recommend:

```powershell
winget install astral-sh.uv
```

Then:

```bash
uv tool install graphifyy
```

#### Case 3 — Graphify is installed but not on PATH

Recommend:

```powershell
uv tool update-shell
```

If necessary, explain how to manually add:

```
C:\Users\<username>\.local\bin
```

to PATH.

Do not continue until `graphify --version` succeeds.

---

### 2. Inspect the project

Audit the project before making changes.

Determine whether the following already exist:

- `graphify-out/`
- `graphify-out/graph.json`
- Existing Graphify configuration
- Existing Antigravity integration
- Existing Git hooks
- Existing Graphify reports
- Existing Graphify-generated files

Never assume Graphify has not already been configured.

---

### 3. Install only what is missing

#### Antigravity Integration

If Antigravity integration is missing:

```bash
graphify antigravity install
```

Otherwise:

- Skip installation.
- Report that Antigravity integration is already configured.

Do **not** run:

```bash
graphify antigravity --help
```

Never reinstall unless explicitly requested.

---

#### Git Hooks

Check whether Graphify hooks are already installed.

If hooks are missing:

```bash
graphify hook install
```

Otherwise:

- Skip installation.
- Report that hooks are already installed.

Never reinstall unless explicitly requested.

---

### 4. Build or refresh the graph

If:

```
graphify-out/graph.json
```

does not exist:

```bash
graphify extract .
```

Otherwise:

```bash
graphify update .
```

Prefer incremental updates whenever possible.

Never perform a full extraction unless required.

---

### 5. Verify

Run:

```bash
graphify hook status
```

Verify:

- Graphify hooks are installed.
- Graph exists.
- Antigravity integration exists.
- No setup errors occurred.

---

### 6. Report

Provide a concise summary including:

- Graphify version
- Repository status
- Existing Graphify components detected
- Components installed during this run
- Components skipped because they already existed
- Graph action performed (`extract` or `update`)
- Hook status
- Warnings
- Errors
- Recommended next steps (if any)

---

## Rules

- Always inspect before modifying.
- Never assume this is a new project.
- Never reinstall existing Graphify components.
- Never overwrite existing Graphify configuration.
- Never duplicate installations.
- Install only missing components.
- Skip completed work.
- Prefer `graphify update .` whenever a graph already exists.
- Prefer `graphify extract .` only when no graph exists.
- Explain each action before executing it.
- Report every action taken.
- Report every action skipped.
- If everything is already configured, explicitly state:

> "Graphify is already configured for this project. No installation was required."

- If Graphify is missing, explain how to install it.
- If uv is missing, explain how to install it.
- If Graphify is not on PATH, explain how to fix PATH.
- Stop only when user intervention is required.

---

## Expected Behaviour

This rule should be safe to execute at the beginning of **every** project.

It should never:

- Duplicate Graphify setup.
- Reinstall integrations unnecessarily.
- Reinstall Git hooks unnecessarily.
- Overwrite existing Graphify configuration.
- Perform unnecessary full graph extraction.

Instead, it should:

- Inspect.
- Decide.
- Execute only missing steps.
- Verify the result.
- Produce a clear report describing exactly what happened.
