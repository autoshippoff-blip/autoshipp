---
title: "Tenant Isolation Guide"
type: "guide"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - guide
---
# Tenant Isolation Guide

## 1. The Multi-Tenancy Model
AutoShipp operates as a **Shared-Schema Multi-Tenant** SaaS application.
This means all tenants (Accounts) share the same database tables. Data is partitioned *logically* via an `account_id` column, not physically via separate databases or schemas per tenant.

## 2. Cross-Schema Boundaries
The database is divided into two primary schemas:
1. **`public`**: The foundation (Identity, Accounts, Commerce).
2. **`fit`**: The intelligence engine (ML profiles, Recommendations, Analytics).

### The Physical Constraint Rule
In PostgreSQL, creating a Foreign Key across schemas is technically possible but strongly discouraged in our architecture for the `fit` schema.

- Tables in `public` have **strict physical Foreign Keys** pointing back to `public.core_accounts(id)`.
- Tables in `fit` have an `account_id` column, but **NO physical Foreign Key** pointing back to `public.core_accounts`.

## 3. Why No Foreign Keys in the `fit` Schema?
1. **Decoupling**: The Fit Engine (`fit` schema) is designed to operate semi-independently of the core monolithic platform. It allows the data science teams to backup, restore, or migrate the `fit` schema without wrestling with `public` schema constraint violations.
2. **Performance**: Ingestion of massive amounts of anonymous fit telemetry (e.g., `fit_analytics_events`) happens at high velocity. Dropping the referential integrity check on insert yields a slight write-throughput optimization.

## 4. Developer Responsibilities
Because the database does not enforce tenant isolation in the `fit` schema, the **application layer MUST enforce it**.

**BAD:**
```sql
-- Returns recommendations for all accounts! Data breach risk.
SELECT * FROM fit.fit_recommendations WHERE product_id = '123';
```

**GOOD:**
```sql
-- Safe: Explicitly scoped by the tenant context.
SELECT * FROM fit.fit_recommendations 
WHERE product_id = '123' 
AND account_id = 'tenant-uuid-here';
```

## 5. Security & Row-Level Security (RLS)
Currently, AutoShipp relies entirely on Application-level isolation (e.g., Prisma / TypeORM middlewares injecting the `account_id` into the `WHERE` clause). 

**Future Migration Recommendation**: We strongly advise implementing Postgres Row-Level Security (RLS) policies on all tables containing `account_id` to guarantee tenant isolation at the database kernel level, neutralizing the risk of application-layer bugs leaking cross-tenant data.