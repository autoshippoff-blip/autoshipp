---
title: "Business Rules"
type: "architecture"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - architecture
---
# Business Rules

This document outlines constraints that are **NOT enforced by PostgreSQL** but MUST be enforced by the application layer.

## 1. Tenant Isolation
- **Rule:** A query to the `fit` schema MUST always include `account_id = ?`.
- **Why:** There are no physical foreign keys linking `fit` tables to `public.core_accounts`. PostgreSQL cannot prevent you from leaking Tenant A's recommendations to Tenant B.

## 2. Immutability
- **Rule:** `fit_recommendations` are immutable once generated. 
- **Why:** A recommendation represents what the engine *told the user at that exact microsecond*. If you update it later because the ML model changed, you corrupt the historical accuracy metric.

## 3. Append-Only Auditing
- **Rule:** `fit_governance_audit_events` and `fit_governance_incidents` MUST NEVER be deleted or updated.
- **Why:** These are compliance records. If an operator makes a mistake, they must issue a *new* overriding incident, rather than deleting the old one.

## 4. Soft Deletes
- **Rule:** If a table has a `deleted_at` column, you MUST NOT use the SQL `DELETE` command. You must `UPDATE table SET deleted_at = NOW()`.
- **Why:** Hard deletes destroy historical foreign keys, breaking the Replay Engine's ability to backtest.

## 5. One Store, One Account
- **Rule:** A `commerce_store` belongs to exactly one `core_account`.
- **Why:** While the DB allows moving a store to a different account (it's just an FK update), this violates billing and data isolation boundaries in the application.

## 6. Replay Partition Ownership
- **Rule:** A `fit_replay_partition_job` belongs strictly to one `fit_replay_jobs` record.
- **Why:** Replay partitions cannot be shared across jobs, even if they represent the same time slice, because the underlying ML model configuration differs per job.