---
title: "Database Overview"
type: "architecture"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - architecture
---

# Database Overview

## General Information

- **PostgreSQL Version:** `PostgreSQL 18.4 (48c2093) on aarch64-unknown-linux-gnu, compiled by gcc (Ubuntu 13.3.0-6ubuntu2~24.04.1) 13.3.0, 64-bit`
- **Database Name:** `neondb`
- **Database Size:** `31 MB`
- **Encoding:** `UTF8`
- **Collation:** `C.UTF-8`
- **Search Path:** `"$user", public`

## Architecture & Multi-Tenancy

The database uses a shared-schema multi-tenancy model. Every tenant has a unique `account_id` referenced in `public.core_accounts`.
Data is separated logically via the `account_id` column present in almost all business tables. The `fit` schema relies on this logical isolation and does not use physical foreign keys back to `public` to decouple the products.

## Installed Extensions

- `plpgsql` (v1.0)
- `citext` (v1.8)
- `pg_trgm` (v1.6)
- `vector` (v0.8.1)
- `uuid-ossp` (v1.1)
