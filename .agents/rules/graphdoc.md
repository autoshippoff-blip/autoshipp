---
trigger: model_decision
description: Verify the current project's Graphify outputs are up to date, initialize or refresh them if needed, then synchronize the latest Graphify documentation files to an external documentation folder while preserving the project outputs.
---

\# Rule: graphdoc

\## Purpose

Synchronize the latest Graphify documentation from the current project to an external documentation folder.

This rule is reusable for every project.

Before copying any files, always verify that the project's Graphify outputs are current. Never copy outdated Graphify data.

\---

\## Workflow

\### 1. Verify project

Verify that:

\- The current directory is a Git repository.

\- Graphify is installed and available.

If Graphify is unavailable:

\- Explain the problem.

\- Recommend following `@rule:graphinit`.

\- Stop.

\---

\### 2. Verify Graphify status

Determine whether the current project's Graphify outputs are up to date.

Inspect:

\- `graphify-out/`

\- `graphify-out/graph.json`

\- `graphify-out/GRAPH\_REPORT.md`

\- `.graphify\_labels.json`

\- Git hook status

If Graphify outputs are missing, incomplete, stale, or require regeneration:

Run:

```text

Follow @rule:graphinit

```

Wait for `graphinit` to complete successfully.

After it finishes, verify again that the Graphify outputs are current.

Only continue once verification succeeds.

Never copy outdated Graphify files.

\---

\### 3. Ask for destination

If the destination folder has not been provided, ask:

> Where should I store the Graphify documentation?

Example:

```

D:\\DEV-ENV\\document-files\\Shipping-Automation

```

Wait for the user's response.

\---

\### 4. Prepare destination

Inside the destination folder, ensure the following exists:

```

<destination>\\

└── graphify-out\\

```

Create the `graphify-out` folder if it does not already exist.

\---

\### 5. Synchronize documentation

Copy the following files from the project's `graphify-out` folder:

```

graph.json

GRAPH\_REPORT.md

.graphify\_labels.json

```

into:

```

<destination>\\graphify-out\\

```

If the files already exist in the destination:

\- Replace them with the newly generated versions.

\- Do not prompt for confirmation.

Never copy any other Graphify files unless explicitly requested.

\---

\### 6. Verify synchronization

Verify that the destination now contains:

```

graphify-out/

├── graph.json

├── GRAPH\_REPORT.md

└── .graphify\_labels.json

```

Confirm that the copied files are the latest versions from the current project.

\---

\### 7. Report

Provide a summary including:

\- Source project

\- Destination folder

\- Whether `graphinit` was required

\- Whether Graphify outputs were regenerated or already current

\- Files copied

\- Files replaced

\- Any warnings or errors

\---

\## Rules

\- Never copy outdated Graphify outputs.

\- Always verify Graphify status before copying.

\- If Graphify outputs are missing or stale, execute `@rule:graphinit` first.

\- Continue only after Graphify outputs have been verified as current.

\- Always create the destination `graphify-out` folder if it does not exist.

\- Always replace older copies in the destination with the latest versions.

\- Never modify the project's Graphify outputs.

\- Never move files; always copy them.

\- Never delete unrelated files in the destination.

\- Synchronize only:

&#x20; - `graph.json`

&#x20; - `GRAPH\_REPORT.md`

&#x20; - `.graphify\_labels.json`

\- If the destination is not provided, ask the user before continuing.
