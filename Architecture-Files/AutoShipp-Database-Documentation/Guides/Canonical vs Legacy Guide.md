---
title: "Canonical vs Legacy Guide"
type: "guide"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - guide
---
# Canonical vs Legacy Guide

## 1. The Migration Debt
During a major architectural refactor (V1 to V2), the team decided to move all intelligence and ML tables out of the `public` schema and into a dedicated `fit` schema.

However, to support zero-downtime deployments, the old tables were left in the `public` schema.

## 2. Legacy Tables (DO NOT USE)
If you see a table in the `public` schema that starts with `fit_`, **it is deprecated**. 

Examples:
- `public.fit_profiles` -> Use `fit.fit_profiles`
- `public.fit_recommendations` -> Use `fit.fit_recommendations`
- `public.fit_products` -> Use `fit.fit_products`

## 3. The Danger
Querying `public.fit_profiles` will yield stale, outdated data. The application code writes exclusively to the `fit.*` schema.

## 4. Cleanup Strategy
These tables are slated for deletion in the upcoming Q4 Database Cleanup Epic. Do not build new features relying on them.