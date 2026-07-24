---
title: "Maintenance Guide"
type: "guide"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - guide
---
# Long-Term Maintenance Guide

This documentation suite is the definitive engineering source of truth for the AutoShipp platform database. It is designed to be maintained alongside the application code.

## 1. When Documentation Must Be Updated
You MUST update this documentation when:
- A new table or schema is added.
- A column's data type, nullability, or constraint is altered.
- A physical Foreign Key is added or removed.
- A new business workflow or domain is introduced.
- A legacy table is permanently dropped (e.g., Q3 Cleanup of `public.fit_*`).

## 2. How to Regenerate Metadata (Reference Docs)
Do not manually edit `14_TABLE_REFERENCE.md`, `15_COLUMN_REFERENCE.md`, or `18_CONSTRAINT_REFERENCE.md`. These files are programmatic exports.
- **Process**: Run the internal Python extraction script (`db_extractor.py`) against the Staging/Production Neon DB URL.
- **Rule**: The script connects to Postgres `information_schema` and overwrites the reference markdown files.

## 3. How to Regenerate Diagrams
Do not manually guess relationships. 
- **Process**: The `db_extractor.py` parses `information_schema.table_constraints` to rebuild physical foreign keys, and hardcodes the logical `account_id` relationships. Run the script to automatically overwrite `28_MERMAID_DIAGRAMS.md`.

## 4. How to Update Statistics
- **Process**: Run `db_extractor.py` to overwrite `01_DATABASE_STATISTICS.md`. Note that row counts are approximate (`pg_stat_user_tables.n_live_tup`) to avoid heavy sequence locking on large tables.

## 5. Documenting Schema Changes
- Every PR that modifies `_prisma_migrations` or `typeorm_migrations` MUST be accompanied by an update to the relevant Domain document (e.g., `09_FIT_ENGINE.md`).
- If you add a complex JSON payload, you MUST update `JSON_STRUCTURE_REFERENCE.md`.

## 6. Documentation Standards
- **Tone**: Write for a senior engineer joining on Day 1. Answer *Why* and *How*, not just *What*.
- **No Orphan Tables**: Every table must belong to a defined Domain in the documentation.
- **Tenant Isolation**: Always document if a new table respects physical FKs (like `public`) or logical `account_id` scoping (like `fit`).