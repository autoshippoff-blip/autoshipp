---
title: "Experimentation"
type: "domain"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - domain
---

# Experimentation Domain

## 1. What is this?

The Experimentation Domain (`fit_exp*` and `fit_experiments`) manages A/B testing for ML models.

## 2. Why does it exist?

We frequently run Model A against Model B in production to see which yields a lower return rate.

## 3. Important Entities

- **`fit_experiments`**: Defines the parameters of the A/B test.
- **`fit_experiment_assignments`**: Maps a `customer_id` or `session_id` to a specific variant (Control vs Test) so their experience remains consistent.
- **`fit_feature_flags`**: Toggles features on/off dynamically.

## 4. Developer Guidance

- Assignments must be sticky. Do not re-assign a user mid-session. Query `fit_experiment_assignments` before hitting the ML inference endpoint.
