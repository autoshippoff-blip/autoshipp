---
title: "Entity Lifecycles"
type: "architecture"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - architecture
---

# Entity Lifecycles

Understanding how entities mutate over time is critical.

## 1. Recommendation Lifecycle

The recommendation is the heart of the Fit Engine.

1. **`served`**: The shopper viewed a product page, and the inference API generated a recommendation.
2. **`converted`**: A Shopify webhook fired indicating the shopper actually bought the recommended item.
3. **`feedback_received`**: The shopper returned the item or answered a post-purchase survey (e.g., "Too Small"). This triggers a recalculation in `fit_profile_learning_states`.

## 2. Account (Tenant) Lifecycle

1. **`provisioning`**: The user signed up, but `fit_tenant_configs` and Shopify connections are not yet established.
2. **`active`**: Fully onboarded. Traffic is flowing.
3. **`suspended`**: Billing failed or manual ban. App middlewares reject API requests.
4. **`offboarded`**: (Soft Deleted). We do not hard-delete accounts to preserve global analytics and historical replay integrity.

## 3. Product Catalog Lifecycle

1. **`raw_ingest`**: Data arrives via Shopify Webhook into `fit_raw_catalog_products`.
2. **`mapped`**: Our ML NLP pipeline parses the raw Shopify HTML/tags and extracts structured sizing rules, inserting into `fit_products`.
3. **`fingerprinted`**: A `fit_size_charts` record is generated and locked to a `fit_fingerprint_versions` record.
4. **`superseded`**: If the brand changes the product dimensions in Shopify, a new fingerprint is generated. The old one remains for historical replays.

## 4. Replay Lifecycle

1. **`planned`**: A data scientist defines a `fit_replay_jobs` record targeting specific historical orders.
2. **`partitioning`**: The system divides the job into thousands of `fit_replay_partition_jobs`.
3. **`executing`**: Workers process partitions.
4. **`completed` / `failed`**: Aggregated results are stored for analysis.
