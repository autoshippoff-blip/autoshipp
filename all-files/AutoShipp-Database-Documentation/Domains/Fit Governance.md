---
title: "Fit Governance"
type: "domain"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - domain
---

# Fit Governance Domain

## 1. What is this?

The Governance Domain (`fit_gov*` and `fit_governance_*` tables) handles auditing, manual overrides, and compliance tracking for the Machine Learning engine.

## 2. Why does it exist?

When a merchant complains that a specific t-shirt always recommends "Large" when it should recommend "Medium", the ML engine needs a way to be manually overridden by a human operator. Governance tables track these manual rules and who applied them.

## 3. Important Entities

- **`fit_governance_incidents`**: A ticket/record when a recommendation goes severely wrong and is flagged.
- **`fit_governance_audit_events`**: An append-only log of every manual override made to the system.

## 4. How new developers should use these tables

- Do not mutate `fit_governance_audit_events`. It is append-only for compliance.
- When querying for active rules, always check if an active incident override exists.
