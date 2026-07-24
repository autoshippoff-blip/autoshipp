---
title: "Architecture Decisions"
type: "architecture"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - architecture
---

# Architecture Decision Records (ADRs)

## ADR-001: Two Database Schemas

- **Context:** Initially, all tables lived in `public`. As the Machine Learning team grew, migrations collided with the core Platform team.
- **Decision:** Split the DB into `public` (Platform/Foundation) and `fit` (ML Engine/Intelligence).
- **Consequences:** Easier backups for Data Science, but requires managing two migration systems (Prisma for `public`, TypeORM for `fit`).

## ADR-002: Application-Level Tenant Isolation

- **Context:** To ensure strict tenant isolation, we could have used physical Foreign Keys from `fit` tables back to `public.core_accounts`.
- **Decision:** Do NOT use cross-schema foreign keys. Rely entirely on the application ORM (`account_id = currentTenant.id`) to enforce isolation.
- **Consequences:** We can drop and restore the `fit` schema without wrestling with FK constraints. The tradeoff is high risk of accidental cross-tenant data leaks if developers write raw SQL bypassing the ORM.

## ADR-003: UUIDs vs Auto-Increment

- **Decision:** Use UUIDv4 for all Primary Keys.
- **Consequences:** UUIDs prevent ID guessing attacks and make cross-region/distributed inserts easier, at the cost of larger index sizes and slower insertions due to index fragmentation.

## ADR-004: Extensive use of JSONB

- **Decision:** Use `JSONB` for Shopify metadata (`commerce_products.metadata`) and shopper measurements (`fit_profiles.measurements`).
- **Consequences:** Avoids the EAV (Entity-Attribute-Value) anti-pattern and endless schema migrations for dynamic attributes. The downside is lack of strict schema validation at the database level.

## ADR-005: Legacy Tables (`public.fit_*`)

- **Context:** During the migration of ADR-001, we could not afford downtime.
- **Decision:** Leave the old `fit` tables in the `public` schema and dual-write temporarily.
- **Consequences:** Created massive technical debt. These legacy tables are now dormant but still consume storage and confuse new developers.

## ADR-006: Replay Architecture

- **Decision:** Build a custom Replay Engine directly into the database via `fit_replay_jobs` rather than using an external data warehouse.
- **Consequences:** Allows the ML team to run backtests against exact transactional states quickly, but heavily bloats the primary OLTP database.
