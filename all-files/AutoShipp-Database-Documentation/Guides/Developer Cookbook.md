---
title: "Developer Cookbook"
type: "guide"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - guide
---

# Developer Cookbook

A practical guide to common engineering tasks.

## 1. How to onboard a new Tenant manually (for local dev)

Do not write raw SQL. Use the internal CLI or the Admin API:

```bash
# Good
npm run cli -- tenant create "Brand Name" --admin-email "dev@local.host"
```

_Why?_ The CLI ensures `fit_tenant_configs`, `identity_roles`, and `core_accounts` are all bootstrapped atomically.

## 2. How to write Tenant-Safe SQL

Always pass the tenant ID via your ORM context.

**Bad (Prisma):**

```typescript
const products = await prisma.fit_products.findMany({
  where: { category: "shirts" }, // LEAKS DATA!
});
```

**Good (Prisma):**

```typescript
const products = await prisma.fit_products.findMany({
  where: {
    category: "shirts",
    account_id: currentTenant.id, // SAFE
  },
});
```

## 3. How to investigate a failed recommendation

If a customer complains that the widget didn't load:

1. Find the `account_id` and `customer_id`.
2. Query `fit_profiles` to ensure their profile isn't corrupted (e.g., height is 0).
3. Query `fit_recommendations` ordered by `created_at DESC` to find the specific failed inference payload.

## 4. How to identify Legacy Tables

Run this query. If a table appears here, **do not touch it**:

```sql
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
AND tablename LIKE 'fit_%';
```

## 5. How to add a new Table

1. Determine the schema: Is it platform infrastructure (`public`) or ML intelligence (`fit`)?
2. Always add `created_at` and `updated_at` triggers.
3. If it contains tenant data, you **MUST** add an `account_id` column.
4. Use Prisma for `public` schema migrations, and TypeORM for `fit` schema migrations (see Architecture Decisions).
