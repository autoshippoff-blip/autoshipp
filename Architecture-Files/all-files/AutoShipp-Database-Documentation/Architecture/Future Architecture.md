---
title: "Future Architecture"
type: "architecture"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - architecture
---

# Future Architecture Roadmap

## 1. Known Technical Debt

- **Legacy Duplicate Tables:** The `public.fit_*` tables (13 in total) are deprecated relics from the V1 to V2 migration. They represent massive storage bloat and developer confusion.
- **Application-Layer Tenant Isolation:** Relying on developers to remember to append `WHERE account_id = ?` is prone to human error.
- **Dual ORMs:** Maintaining Prisma (`_prisma_migrations`) and TypeORM (`typeorm_migrations`) complicates local setup and CI/CD pipelines.

## 2. Migration & Cleanup Plan (Next 12 Months)

1. **Q3 Cleanup:** Hard drop all `public.fit_*` legacy tables. This will reclaim significant disk space and index overhead.
2. **Q4 Security:** Implement PostgreSQL Row-Level Security (RLS) on all `fit` schema tables. This will enforce tenant isolation at the database kernel level, neutralizing ORM bypass bugs.
3. **Q1 Unification:** Migrate the `fit` schema away from TypeORM to Prisma, unifying the entire codebase under a single migration strategy.

## 3. Future Product Expansion

- **Global Fit Profiles:** Currently, a `fit_profiles` record is scoped strictly to a tenant (`account_id`). In the future, we plan to extract this to a global `public.global_shoppers` table, allowing a user who buys a Medium shirt at Store A to automatically receive a tailored recommendation at Store B.
- **External Data Warehousing:** The Replay Engine currently bloats the OLTP database. We plan to migrate historical `commerce_orders` and `fit_recommendations` out of Postgres into Snowflake/BigQuery via logical replication (CDC).
