# Handover Rule

## Purpose

This rule is executed only when explicitly referenced by the user or by another rule (for example, `@handover-rule`).

Its sole responsibility is to maintain the project's handover document so that future development sessions can continue without requiring previous chat history.

This rule is responsible only for the handover document.

This rule does not perform workspace cleanup.

This rule does not perform project refactoring.

This rule does not define Git workflow beyond delegating to `@github-rules`.

---

# Primary Objective

The handover is the project's memory.

Its purpose is to accurately represent the current state of the project after the work completed during this development session.

A future coding agent should be able to read only the handover document and immediately understand:

- what the project currently does
- what was completed
- what is currently in progress
- what remains to be done
- where development should continue

without requiring access to previous conversations.

---

# Guiding Principles

The handover must always be:

- Accurate
- Complete
- Up to date
- Easy to understand
- Easy to continue from
- Focused on the project rather than the conversation

Never invent information.

Never make assumptions.

Never claim work that was not completed.

---

# Step 1 - Locate the Handover

Search only the project root directory.

Do not search:

- parent directories
- child directories
- documentation folders
- workspace folders
- sibling repositories

The filename search must be case-insensitive.

Examples include:

- HANDOVER.md
- handover.md
- Handover.md
- HandOver.md
- HANDover.md

Any capitalization is considered valid.

Only Markdown files are valid handover files.

Ignore all other file extensions.

---

# Step 2 - Handle Multiple Handover Files

If multiple handover files exist in the project root:

Use the first discovered file as the canonical handover.

Inform the user that duplicate handover files exist.

Ask for confirmation before removing the duplicates.

Never merge multiple handover files automatically.

Never guess which duplicate contains the correct information.

---

# Step 3 - Create the Handover if Missing

If no handover file exists:

Create a new file named:

HANDOVER.md

Immediately populate it.

Do not create an empty template.

The new handover should describe the current project state based on everything achieved during the current development session.

---

# Step 4 - Inspect the Existing Handover

If a handover already exists:

Read the entire document.

Determine whether:

- the document is empty
- the document contains content

Never overwrite the file before reading it.

---

# Step 5 - Determine Update Strategy

## Case A

If the handover file is empty:

Generate a complete handover describing the current project state.

Replace the empty contents.

---

## Case B

If the handover contains content:

Determine whether the handover has uncommitted modifications.

Use the Git working tree to determine this.

---

### Uncommitted Handover

If the handover contains uncommitted modifications:

Append the latest session information.

Do not overwrite the document.

This prevents losing handover updates that have not yet been committed.

---

### Clean Working Tree

If the handover contains no uncommitted modifications:

Generate a completely new handover.

Replace the previous contents entirely.

The handover should now represent the latest project state.

Do not attempt to preserve previous content.

The previous version already exists in Git history.

---

# Step 6 - Build the Handover

The handover should describe the project.

It should not describe the conversation.

Include all information necessary for another coding agent to continue development without needing previous chat history.

When applicable, include:

## Project Overview

A short description of the project's current purpose.

---

## Current Status

Describe the current implementation status.

Examples include:

- implemented features
- completed modules
- partially completed work

---

## Work Completed During This Session

Summarize everything successfully completed.

Examples include:

- bug fixes
- new features
- refactoring
- infrastructure updates
- configuration updates
- API changes
- database updates
- documentation updates

---

## Important Discoveries

Record findings that are useful for future work.

Examples include:

- behavior discovered
- limitations found
- external dependency behavior
- framework quirks
- implementation details

---

## Current Project State

Describe the current state after all work has been completed.

This should reflect the repository as it exists now.

---

## Outstanding Work

Document everything still remaining.

Include:

- incomplete features
- pending validation
- TODOs
- known limitations
- future improvements

---

## Known Issues

Document unresolved problems.

Never mark issues as resolved unless they actually are.

---

## Important Files

When helpful, identify important files or directories modified during this session.

Avoid listing every single file.

Focus on the ones that matter.

---

## Next Starting Point

Clearly explain where the next development session should begin.

The next coding agent should not have to guess.

---

# Step 7 - Verify Accuracy

Before saving the handover verify that:

Every completed task was actually completed.

Every pending task is still pending.

Every bug marked fixed is actually fixed.

No speculative information has been added.

No work has been omitted.

The document accurately represents the repository.

---

# Step 8 - Git Workflow

After updating the handover:

Strictly follow:

@github-rules

Do not duplicate Git logic in this rule.

---

# Exception

If this rule was invoked by:

@session_ended

Do not create a separate commit.

Instead:

Return control to `@session_ended`.

The final commit will occur after:

- cleanup
- handover update

following `@github-rules`.

---

# Never Do These Things

Never:

- invent accomplishments
- invent bug fixes
- invent validation
- invent testing
- invent deployments
- invent completed features
- overwrite uncommitted handover work
- remove documentation unrelated to the handover
- create multiple handover files
- search outside the project root
- store unnecessary conversation history

---

# Success Criteria

The rule is complete only when:

- Exactly one canonical handover file exists.
- The handover accurately represents the current project state.
- The document contains enough information for future development.
- No speculative information has been added.
- The Git workflow has been completed through `@github-rules`, unless execution was initiated by `@session_ended`.