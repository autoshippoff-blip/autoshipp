---
title: "Column Reference"
type: "reference"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - reference
---

# Column Reference

## `fit.core_integration_credentials`

| Column               | Type                       | Nullable | Default                     | Identity/Gen | Description |
| -------------------- | -------------------------- | -------- | --------------------------- | ------------ | ----------- |
| `id`                 | `uuid`                     | NO       | `uuid_generate_v4()`        | No           | —           |
| `integration_id`     | `uuid`                     | NO       | `—`                         | No           | —           |
| `encrypted_payload`  | `text`                     | NO       | `—`                         | No           | —           |
| `encryption_version` | `character varying`        | NO       | `—`                         | No           | —           |
| `scopes`             | `ARRAY`                    | NO       | `'{}'::character varying[]` | No           | —           |
| `expires_at`         | `timestamp with time zone` | YES      | `—`                         | No           | —           |
| `connected_at`       | `timestamp with time zone` | NO       | `now()`                     | No           | —           |

## `fit.core_integrations`

| Column        | Type                       | Nullable | Default                                        | Identity/Gen | Description |
| ------------- | -------------------------- | -------- | ---------------------------------------------- | ------------ | ----------- |
| `id`          | `uuid`                     | NO       | `uuid_generate_v4()`                           | No           | —           |
| `account_id`  | `uuid`                     | NO       | `—`                                            | No           | —           |
| `provider`    | `USER-DEFINED`             | NO       | `—`                                            | No           | —           |
| `status`      | `USER-DEFINED`             | NO       | `'PENDING'::fit.core_integrations_status_enum` | No           | —           |
| `external_id` | `character varying`        | NO       | `—`                                            | No           | —           |
| `metadata`    | `jsonb`                    | NO       | `'{}'::jsonb`                                  | No           | —           |
| `created_at`  | `timestamp with time zone` | NO       | `now()`                                        | No           | —           |
| `updated_at`  | `timestamp with time zone` | NO       | `now()`                                        | No           | —           |
| `deleted_at`  | `timestamp with time zone` | YES      | `—`                                            | No           | —           |

## `fit.fit_admins`

| Column       | Type                          | Nullable | Default              | Identity/Gen | Description |
| ------------ | ----------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`         | `uuid`                        | NO       | `uuid_generate_v4()` | No           | —           |
| `email`      | `character varying`           | NO       | `—`                  | No           | —           |
| `password`   | `character varying`           | NO       | `—`                  | No           | —           |
| `created_at` | `timestamp without time zone` | NO       | `now()`              | No           | —           |
| `updated_at` | `timestamp without time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_analytics_events`

| Column       | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------ | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`         | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `event_type` | `text`                     | NO       | `—`                  | No           | —           |
| `payload`    | `jsonb`                    | NO       | `—`                  | No           | —           |
| `created_at` | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_audit_logs`

| Column        | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`          | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `actor`       | `character varying`        | NO       | `—`                  | No           | —           |
| `action`      | `character varying`        | NO       | `—`                  | No           | —           |
| `entity_type` | `character varying`        | NO       | `—`                  | No           | —           |
| `entity_id`   | `character varying`        | YES      | `—`                  | No           | —           |
| `metadata`    | `jsonb`                    | NO       | `'{}'::jsonb`        | No           | —           |
| `created_at`  | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_automation_reviews`

| Column                 | Type                       | Nullable | Default              | Identity/Gen | Description |
| ---------------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                   | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`           | `uuid`                     | NO       | `—`                  | No           | —           |
| `external_product_id`  | `text`                     | NO       | `—`                  | No           | —           |
| `fingerprint_id`       | `uuid`                     | YES      | `—`                  | No           | —           |
| `status`               | `text`                     | NO       | `'pending'::text`    | No           | —           |
| `priority`             | `text`                     | NO       | `'normal'::text`     | No           | —           |
| `confidence`           | `numeric`                  | NO       | `—`                  | No           | —           |
| `conflict_description` | `text`                     | YES      | `—`                  | No           | —           |
| `explanation`          | `jsonb`                    | YES      | `—`                  | No           | —           |
| `reviewer_id`          | `text`                     | YES      | `—`                  | No           | —           |
| `reviewed_at`          | `timestamp with time zone` | YES      | `—`                  | No           | —           |
| `review_notes`         | `text`                     | YES      | `—`                  | No           | —           |
| `governance_reason`    | `text`                     | YES      | `—`                  | No           | —           |
| `requires_recovery`    | `boolean`                  | NO       | `false`              | No           | —           |
| `created_at`           | `timestamp with time zone` | NO       | `now()`              | No           | —           |
| `updated_at`           | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_experiment_assignments`

| Column            | Type                       | Nullable | Default              | Identity/Gen | Description |
| ----------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`              | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `experiment_id`   | `uuid`                     | NO       | `—`                  | No           | —           |
| `profile_id`      | `uuid`                     | YES      | `—`                  | No           | —           |
| `account_id`      | `uuid`                     | YES      | `—`                  | No           | —           |
| `variant`         | `character varying`        | NO       | `—`                  | No           | —           |
| `assignment_hash` | `character varying`        | NO       | `—`                  | No           | —           |
| `created_at`      | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_experiments`

| Column               | Type                       | Nullable | Default                      | Identity/Gen | Description |
| -------------------- | -------------------------- | -------- | ---------------------------- | ------------ | ----------- |
| `id`                 | `uuid`                     | NO       | `uuid_generate_v4()`         | No           | —           |
| `name`               | `character varying`        | NO       | `—`                          | No           | —           |
| `description`        | `text`                     | YES      | `—`                          | No           | —           |
| `status`             | `character varying`        | NO       | `'draft'::character varying` | No           | —           |
| `traffic_percentage` | `integer`                  | NO       | `0`                          | No           | —           |
| `variant_config`     | `jsonb`                    | NO       | `'{}'::jsonb`                | No           | —           |
| `start_at`           | `timestamp with time zone` | NO       | `now()`                      | No           | —           |
| `end_at`             | `timestamp with time zone` | YES      | `—`                          | No           | —           |
| `account_id`         | `uuid`                     | YES      | `—`                          | No           | —           |
| `created_at`         | `timestamp with time zone` | NO       | `now()`                      | No           | —           |
| `updated_at`         | `timestamp with time zone` | NO       | `now()`                      | No           | —           |

## `fit.fit_feature_flags`

| Column               | Type                       | Nullable | Default                       | Identity/Gen | Description |
| -------------------- | -------------------------- | -------- | ----------------------------- | ------------ | ----------- |
| `id`                 | `uuid`                     | NO       | `uuid_generate_v4()`          | No           | —           |
| `key`                | `character varying`        | NO       | `—`                           | No           | —           |
| `description`        | `text`                     | YES      | `—`                           | No           | —           |
| `enabled`            | `boolean`                  | NO       | `false`                       | No           | —           |
| `rollout_percentage` | `integer`                  | NO       | `100`                         | No           | —           |
| `scope`              | `character varying`        | NO       | `'global'::character varying` | No           | —           |
| `account_id`         | `uuid`                     | YES      | `—`                           | No           | —           |
| `config`             | `jsonb`                    | YES      | `—`                           | No           | —           |
| `created_at`         | `timestamp with time zone` | NO       | `now()`                       | No           | —           |
| `updated_at`         | `timestamp with time zone` | NO       | `now()`                       | No           | —           |

## `fit.fit_feedback_events`

| Column              | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `recommendation_id` | `uuid`                     | NO       | `—`                  | No           | —           |
| `account_id`        | `uuid`                     | NO       | `—`                  | No           | —           |
| `product_id`        | `uuid`                     | NO       | `—`                  | No           | —           |
| `purchased`         | `boolean`                  | NO       | `false`              | No           | —           |
| `returned`          | `boolean`                  | NO       | `false`              | No           | —           |
| `exchanged`         | `boolean`                  | NO       | `false`              | No           | —           |
| `fit_feedback`      | `text`                     | YES      | `—`                  | No           | —           |
| `created_at`        | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_feedback_hooks`

| Column              | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `recommendation_id` | `uuid`                     | NO       | `—`                  | No           | —           |
| `account_id`        | `uuid`                     | NO       | `—`                  | No           | —           |
| `product_id`        | `uuid`                     | NO       | `—`                  | No           | —           |
| `fingerprint_id`    | `uuid`                     | YES      | `—`                  | No           | —           |
| `event_type`        | `text`                     | NO       | `—`                  | No           | —           |
| `recommended_size`  | `text`                     | NO       | `—`                  | No           | —           |
| `actual_outcome`    | `text`                     | YES      | `—`                  | No           | —           |
| `signal_strength`   | `text`                     | NO       | `'weak'::text`       | No           | —           |
| `occurred_at`       | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_fingerprint_versions`

| Column                | Type                          | Nullable | Default              | Identity/Gen | Description |
| --------------------- | ----------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                  | `uuid`                        | NO       | `uuid_generate_v4()` | No           | —           |
| `fingerprint_id`      | `uuid`                        | NO       | `—`                  | No           | —           |
| `account_id`          | `uuid`                        | NO       | `—`                  | No           | —           |
| `product_id`          | `uuid`                        | YES      | `—`                  | No           | —           |
| `external_product_id` | `text`                        | NO       | `—`                  | No           | —           |
| `version`             | `text`                        | NO       | `—`                  | No           | —           |
| `fingerprint_data`    | `jsonb`                       | NO       | `—`                  | No           | —           |
| `classifier_version`  | `text`                        | NO       | `—`                  | No           | —           |
| `lineage_reason`      | `text`                        | NO       | `—`                  | No           | —           |
| `severity`            | `text`                        | NO       | `—`                  | No           | —           |
| `generated_at`        | `timestamp without time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_governance_audit_events`

| Column                 | Type                       | Nullable | Default                    | Identity/Gen | Description |
| ---------------------- | -------------------------- | -------- | -------------------------- | ------------ | ----------- |
| `id`                   | `uuid`                     | NO       | `uuid_generate_v4()`       | No           | —           |
| `account_id`           | `uuid`                     | NO       | `—`                        | No           | —           |
| `product_id`           | `uuid`                     | YES      | `—`                        | No           | —           |
| `entity_id`            | `text`                     | NO       | `—`                        | No           | —           |
| `entity_type`          | `character varying`        | NO       | `—`                        | No           | —           |
| `event_type`           | `character varying`        | NO       | `—`                        | No           | —           |
| `event_schema_version` | `character varying`        | NO       | `'v1'::character varying`  | No           | —           |
| `governance_reason`    | `text`                     | YES      | `—`                        | No           | —           |
| `actor`                | `text`                     | YES      | `—`                        | No           | —           |
| `correlation_id`       | `uuid`                     | YES      | `—`                        | No           | —           |
| `causation_id`         | `uuid`                     | YES      | `—`                        | No           | —           |
| `source_service`       | `character varying`        | NO       | `'api'::character varying` | No           | —           |
| `metadata`             | `jsonb`                    | YES      | `—`                        | No           | —           |
| `occurred_at`          | `timestamp with time zone` | NO       | `—`                        | No           | —           |

## `fit.fit_governance_incidents`

| Column              | Type                       | Nullable | Default                     | Identity/Gen | Description |
| ------------------- | -------------------------- | -------- | --------------------------- | ------------ | ----------- |
| `id`                | `uuid`                     | NO       | `uuid_generate_v4()`        | No           | —           |
| `account_id`        | `uuid`                     | NO       | `—`                         | No           | —           |
| `product_id`        | `uuid`                     | YES      | `—`                         | No           | —           |
| `incident_type`     | `character varying`        | NO       | `—`                         | No           | —           |
| `severity`          | `character varying`        | NO       | `—`                         | No           | —           |
| `title`             | `character varying`        | NO       | `—`                         | No           | —           |
| `description`       | `text`                     | NO       | `—`                         | No           | —           |
| `status`            | `character varying`        | NO       | `'OPEN'::character varying` | No           | —           |
| `correlation_id`    | `uuid`                     | YES      | `—`                         | No           | —           |
| `metadata`          | `jsonb`                    | YES      | `—`                         | No           | —           |
| `occurred_at`       | `timestamp with time zone` | NO       | `now()`                     | No           | —           |
| `resolved_at`       | `timestamp with time zone` | YES      | `—`                         | No           | —           |
| `resolved_by`       | `text`                     | YES      | `—`                         | No           | —           |
| `resolution_reason` | `text`                     | YES      | `—`                         | No           | —           |

## `fit.fit_lineage_snapshot_pointers`

| Column                | Type                          | Nullable | Default | Identity/Gen | Description |
| --------------------- | ----------------------------- | -------- | ------- | ------------ | ----------- |
| `account_id`          | `uuid`                        | NO       | `—`     | No           | —           |
| `external_product_id` | `text`                        | NO       | `—`     | No           | —           |
| `active_version_id`   | `uuid`                        | NO       | `—`     | No           | —           |
| `is_quarantined`      | `boolean`                     | NO       | `false` | No           | —           |
| `governance_reason`   | `text`                        | YES      | `—`     | No           | —           |
| `updated_at`          | `timestamp without time zone` | NO       | `now()` | No           | —           |

## `fit.fit_operator_roles`

| Column       | Type                       | Nullable | Default                       | Identity/Gen | Description |
| ------------ | -------------------------- | -------- | ----------------------------- | ------------ | ----------- |
| `id`         | `uuid`                     | NO       | `uuid_generate_v4()`          | No           | —           |
| `admin_id`   | `uuid`                     | NO       | `—`                           | No           | —           |
| `role`       | `character varying`        | NO       | `'VIEWER'::character varying` | No           | —           |
| `created_at` | `timestamp with time zone` | NO       | `now()`                       | No           | —           |
| `updated_at` | `timestamp with time zone` | NO       | `now()`                       | No           | —           |

## `fit.fit_processed_webhooks`

| Column         | Type                          | Nullable | Default | Identity/Gen | Description |
| -------------- | ----------------------------- | -------- | ------- | ------------ | ----------- |
| `webhook_id`   | `text`                        | NO       | `—`     | No           | —           |
| `topic`        | `text`                        | NO       | `—`     | No           | —           |
| `shop_domain`  | `text`                        | NO       | `—`     | No           | —           |
| `processed_at` | `timestamp without time zone` | NO       | `now()` | No           | —           |

## `fit.fit_products`

| Column                | Type                       | Nullable | Default              | Identity/Gen | Description |
| --------------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                  | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`          | `uuid`                     | NO       | `—`                  | No           | —           |
| `name`                | `text`                     | NO       | `—`                  | No           | —           |
| `category`            | `text`                     | NO       | `—`                  | No           | —           |
| `fit_type`            | `text`                     | NO       | `—`                  | No           | —           |
| `stretch_level`       | `text`                     | NO       | `—`                  | No           | —           |
| `override_size_chart` | `jsonb`                    | YES      | `—`                  | No           | —           |
| `metadata`            | `jsonb`                    | YES      | `'{}'::jsonb`        | No           | —           |
| `created_at`          | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_profile_learning_states`

| Column                 | Type                       | Nullable | Default              | Identity/Gen | Description |
| ---------------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                   | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `profile_id`           | `uuid`                     | NO       | `—`                  | No           | —           |
| `account_id`           | `uuid`                     | YES      | `—`                  | No           | —           |
| `successful_purchases` | `integer`                  | NO       | `0`                  | No           | —           |
| `returns_count`        | `integer`                  | NO       | `0`                  | No           | —           |
| `exchanges_count`      | `integer`                  | NO       | `0`                  | No           | —           |
| `perfect_fit_count`    | `integer`                  | NO       | `0`                  | No           | —           |
| `too_small_count`      | `integer`                  | NO       | `0`                  | No           | —           |
| `too_large_count`      | `integer`                  | NO       | `0`                  | No           | —           |
| `preferred_fit_bias`   | `integer`                  | NO       | `0`                  | No           | —           |
| `confidence_modifier`  | `integer`                  | NO       | `0`                  | No           | —           |
| `last_aggregated_at`   | `timestamp with time zone` | NO       | `now()`              | No           | —           |
| `created_at`           | `timestamp with time zone` | NO       | `now()`              | No           | —           |
| `updated_at`           | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_profiles`

| Column                   | Type                          | Nullable | Default                        | Identity/Gen | Description |
| ------------------------ | ----------------------------- | -------- | ------------------------------ | ------------ | ----------- |
| `id`                     | `uuid`                        | NO       | `uuid_generate_v4()`           | No           | —           |
| `default_height`         | `numeric`                     | YES      | `—`                            | No           | —           |
| `default_weight`         | `numeric`                     | YES      | `—`                            | No           | —           |
| `default_fit_preference` | `character varying`           | NO       | `'regular'::character varying` | No           | —           |
| `default_gender`         | `character varying`           | NO       | `'unisex'::character varying`  | No           | —           |
| `profile_version`        | `integer`                     | NO       | `1`                            | No           | —           |
| `consent_version`        | `integer`                     | NO       | `1`                            | No           | —           |
| `last_used_at`           | `timestamp without time zone` | YES      | `—`                            | No           | —           |
| `created_at`             | `timestamp without time zone` | NO       | `now()`                        | No           | —           |
| `updated_at`             | `timestamp without time zone` | NO       | `now()`                        | No           | —           |

## `fit.fit_raw_catalog_products`

| Column                | Type                          | Nullable | Default              | Identity/Gen | Description |
| --------------------- | ----------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                  | `uuid`                        | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`          | `uuid`                        | NO       | `—`                  | No           | —           |
| `external_product_id` | `text`                        | NO       | `—`                  | No           | —           |
| `shop_domain`         | `text`                        | NO       | `—`                  | No           | —           |
| `raw_payload`         | `jsonb`                       | NO       | `—`                  | No           | —           |
| `payload_hash`        | `text`                        | NO       | `—`                  | No           | —           |
| `source`              | `text`                        | NO       | `'webhook'::text`    | No           | —           |
| `received_at`         | `timestamp without time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_recommendation_evaluations`

| Column                         | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------------------------ | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                           | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `recommendation_id`            | `uuid`                     | NO       | `—`                  | No           | —           |
| `profile_id`                   | `uuid`                     | YES      | `—`                  | No           | —           |
| `experiment_id`                | `uuid`                     | YES      | `—`                  | No           | —           |
| `variant`                      | `character varying`        | YES      | `—`                  | No           | —           |
| `confidence_at_recommendation` | `integer`                  | NO       | `—`                  | No           | —           |
| `recommendation_accepted`      | `boolean`                  | YES      | `—`                  | No           | —           |
| `returned`                     | `boolean`                  | YES      | `—`                  | No           | —           |
| `exchanged`                    | `boolean`                  | YES      | `—`                  | No           | —           |
| `fit_feedback`                 | `character varying`        | YES      | `—`                  | No           | —           |
| `evaluation_score`             | `numeric`                  | YES      | `—`                  | No           | —           |
| `created_at`                   | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_recommendations`

| Column             | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------------ | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`               | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`       | `uuid`                     | NO       | `—`                  | No           | —           |
| `product_id`       | `uuid`                     | NO       | `—`                  | No           | —           |
| `profile_id`       | `uuid`                     | YES      | `—`                  | No           | —           |
| `user_inputs`      | `jsonb`                    | NO       | `—`                  | No           | —           |
| `recommended_size` | `text`                     | NO       | `—`                  | No           | —           |
| `alternative_size` | `text`                     | YES      | `—`                  | No           | —           |
| `confidence`       | `numeric`                  | NO       | `—`                  | No           | —           |
| `boundary_case`    | `boolean`                  | NO       | `false`              | No           | —           |
| `engine_version`   | `text`                     | NO       | `—`                  | No           | —           |
| `created_at`       | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_replay_integrity_incidents`

| Column               | Type                          | Nullable | Default                 | Identity/Gen | Description |
| -------------------- | ----------------------------- | -------- | ----------------------- | ------------ | ----------- |
| `id`                 | `uuid`                        | NO       | `uuid_generate_v4()`    | No           | —           |
| `product_id`         | `text`                        | NO       | `—`                     | No           | —           |
| `fingerprint_id`     | `uuid`                        | NO       | `—`                     | No           | —           |
| `expected_hash`      | `text`                        | NO       | `—`                     | No           | —           |
| `actual_hash`        | `text`                        | NO       | `—`                     | No           | —           |
| `ontology_version`   | `text`                        | NO       | `—`                     | No           | —           |
| `classifier_version` | `text`                        | NO       | `—`                     | No           | —           |
| `governance_reason`  | `text`                        | NO       | `'HASH_MISMATCH'::text` | No           | —           |
| `occurred_at`        | `timestamp without time zone` | NO       | `now()`                 | No           | —           |

## `fit.fit_replay_jobs`

| Column                | Type                       | Nullable | Default                                | Identity/Gen | Description |
| --------------------- | -------------------------- | -------- | -------------------------------------- | ------------ | ----------- |
| `id`                  | `uuid`                     | NO       | `uuid_generate_v4()`                   | No           | —           |
| `account_id`          | `uuid`                     | NO       | `—`                                    | No           | —           |
| `scope`               | `character varying`        | NO       | `—`                                    | No           | —           |
| `target_id`           | `text`                     | NO       | `—`                                    | No           | —           |
| `status`              | `character varying`        | NO       | `'pending'::character varying`         | No           | —           |
| `priority`            | `character varying`        | NO       | `'STANDARD_REPLAY'::character varying` | No           | —           |
| `is_dry_run`          | `boolean`                  | NO       | `false`                                | No           | —           |
| `total_products`      | `integer`                  | NO       | `0`                                    | No           | —           |
| `processed_products`  | `integer`                  | NO       | `0`                                    | No           | —           |
| `failed_products`     | `integer`                  | NO       | `0`                                    | No           | —           |
| `execution_manifest`  | `jsonb`                    | NO       | `—`                                    | No           | —           |
| `replay_request_hash` | `character varying`        | NO       | `—`                                    | No           | —           |
| `triggered_by`        | `text`                     | NO       | `—`                                    | No           | —           |
| `correlation_id`      | `uuid`                     | NO       | `—`                                    | No           | —           |
| `created_at`          | `timestamp with time zone` | NO       | `now()`                                | No           | —           |
| `updated_at`          | `timestamp with time zone` | NO       | `now()`                                | No           | —           |

## `fit.fit_replay_partition_jobs`

| Column               | Type                       | Nullable | Default                        | Identity/Gen | Description |
| -------------------- | -------------------------- | -------- | ------------------------------ | ------------ | ----------- |
| `id`                 | `uuid`                     | NO       | `uuid_generate_v4()`           | No           | —           |
| `replay_job_id`      | `uuid`                     | NO       | `—`                            | No           | —           |
| `partition_index`    | `integer`                  | NO       | `—`                            | No           | —           |
| `status`             | `character varying`        | NO       | `'pending'::character varying` | No           | —           |
| `total_products`     | `integer`                  | NO       | `0`                            | No           | —           |
| `processed_products` | `integer`                  | NO       | `0`                            | No           | —           |
| `failed_products`    | `integer`                  | NO       | `0`                            | No           | —           |
| `product_ids`        | `jsonb`                    | YES      | `—`                            | No           | —           |
| `start_index`        | `integer`                  | YES      | `—`                            | No           | —           |
| `end_index`          | `integer`                  | YES      | `—`                            | No           | —           |
| `retry_after`        | `timestamp with time zone` | YES      | `—`                            | No           | —           |
| `checksum_hash`      | `character varying`        | YES      | `—`                            | No           | —           |
| `count_hash`         | `character varying`        | YES      | `—`                            | No           | —           |
| `error_message`      | `text`                     | YES      | `—`                            | No           | —           |
| `retry_count`        | `integer`                  | NO       | `0`                            | No           | —           |
| `correlation_id`     | `uuid`                     | NO       | `—`                            | No           | —           |
| `shard_affinity`     | `character varying`        | YES      | `—`                            | No           | —           |
| `heartbeat_at`       | `timestamp with time zone` | YES      | `—`                            | No           | —           |
| `lease_expires_at`   | `timestamp with time zone` | YES      | `—`                            | No           | —           |
| `created_at`         | `timestamp with time zone` | NO       | `now()`                        | No           | —           |
| `updated_at`         | `timestamp with time zone` | NO       | `now()`                        | No           | —           |

## `fit.fit_shopify_connections`

| Column           | Type                          | Nullable | Default              | Identity/Gen | Description |
| ---------------- | ----------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`             | `uuid`                        | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`     | `uuid`                        | NO       | `—`                  | No           | —           |
| `shop_domain`    | `text`                        | NO       | `—`                  | No           | —           |
| `access_token`   | `text`                        | NO       | `—`                  | No           | —           |
| `scope`          | `text`                        | NO       | `''::text`           | No           | —           |
| `webhook_secret` | `text`                        | NO       | `''::text`           | No           | —           |
| `api_version`    | `text`                        | NO       | `'2025-01'::text`    | No           | —           |
| `connected_at`   | `timestamp with time zone`    | NO       | `now()`              | No           | —           |
| `last_synced_at` | `timestamp with time zone`    | YES      | `—`                  | No           | —           |
| `created_at`     | `timestamp without time zone` | NO       | `now()`              | No           | —           |
| `updated_at`     | `timestamp without time zone` | NO       | `now()`              | No           | —           |

## `fit.fit_size_charts`

| Column       | Type      | Nullable | Default              | Identity/Gen | Description |
| ------------ | --------- | -------- | -------------------- | ------------ | ----------- |
| `id`         | `uuid`    | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id` | `uuid`    | NO       | `—`                  | No           | —           |
| `category`   | `text`    | NO       | `—`                  | No           | —           |
| `gender`     | `text`    | NO       | `—`                  | No           | —           |
| `size_label` | `text`    | NO       | `—`                  | No           | —           |
| `min_height` | `numeric` | YES      | `—`                  | No           | —           |
| `max_height` | `numeric` | YES      | `—`                  | No           | —           |
| `min_weight` | `numeric` | YES      | `—`                  | No           | —           |
| `max_weight` | `numeric` | YES      | `—`                  | No           | —           |
| `min_bmi`    | `numeric` | YES      | `—`                  | No           | —           |
| `max_bmi`    | `numeric` | YES      | `—`                  | No           | —           |
| `sort_order` | `integer` | NO       | `0`                  | No           | —           |

## `fit.fit_tenant_configs`

| Column           | Type                       | Nullable | Default              | Identity/Gen | Description |
| ---------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`             | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`     | `uuid`                     | NO       | `—`                  | No           | —           |
| `settings`       | `jsonb`                    | YES      | `'{}'::jsonb`        | No           | —           |
| `widgetSettings` | `jsonb`                    | YES      | `'{}'::jsonb`        | No           | —           |
| `created_at`     | `timestamp with time zone` | NO       | `now()`              | No           | —           |
| `updated_at`     | `timestamp with time zone` | NO       | `now()`              | No           | —           |
| `deleted_at`     | `timestamp with time zone` | YES      | `—`                  | No           | —           |

## `fit.fit_unmapped_signals`

| Column          | Type                          | Nullable | Default              | Identity/Gen | Description |
| --------------- | ----------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`            | `uuid`                        | NO       | `uuid_generate_v4()` | No           | —           |
| `raw_value`     | `text`                        | NO       | `—`                  | No           | —           |
| `source`        | `text`                        | NO       | `—`                  | No           | —           |
| `frequency`     | `integer`                     | NO       | `1`                  | No           | —           |
| `account_id`    | `uuid`                        | NO       | `—`                  | No           | —           |
| `first_seen_at` | `timestamp without time zone` | NO       | `now()`              | No           | —           |
| `last_seen_at`  | `timestamp without time zone` | NO       | `now()`              | No           | —           |

## `fit.typeorm_migrations`

| Column      | Type                | Nullable | Default                                              | Identity/Gen | Description |
| ----------- | ------------------- | -------- | ---------------------------------------------------- | ------------ | ----------- |
| `id`        | `integer`           | NO       | `nextval('fit.typeorm_migrations_id_seq'::regclass)` | No           | —           |
| `timestamp` | `bigint`            | NO       | `—`                                                  | No           | —           |
| `name`      | `character varying` | NO       | `—`                                                  | No           | —           |

## `public._prisma_migrations`

| Column                | Type                       | Nullable | Default | Identity/Gen | Description |
| --------------------- | -------------------------- | -------- | ------- | ------------ | ----------- |
| `id`                  | `character varying`        | NO       | `—`     | No           | —           |
| `checksum`            | `character varying`        | NO       | `—`     | No           | —           |
| `finished_at`         | `timestamp with time zone` | YES      | `—`     | No           | —           |
| `migration_name`      | `character varying`        | NO       | `—`     | No           | —           |
| `logs`                | `text`                     | YES      | `—`     | No           | —           |
| `rolled_back_at`      | `timestamp with time zone` | YES      | `—`     | No           | —           |
| `started_at`          | `timestamp with time zone` | NO       | `now()` | No           | —           |
| `applied_steps_count` | `integer`                  | NO       | `0`     | No           | —           |

## `public.commerce_order_items`

| Column               | Type                       | Nullable | Default             | Identity/Gen | Description |
| -------------------- | -------------------------- | -------- | ------------------- | ------------ | ----------- |
| `id`                 | `uuid`                     | NO       | `gen_random_uuid()` | No           | —           |
| `account_id`         | `uuid`                     | NO       | `—`                 | No           | —           |
| `order_id`           | `uuid`                     | NO       | `—`                 | No           | —           |
| `product_variant_id` | `uuid`                     | YES      | `—`                 | No           | —           |
| `quantity`           | `integer`                  | NO       | `—`                 | No           | —           |
| `unit_price_amount`  | `bigint`                   | NO       | `—`                 | No           | —           |
| `currency`           | `character`                | NO       | `—`                 | No           | —           |
| `metadata`           | `jsonb`                    | NO       | `'{}'::jsonb`       | No           | —           |
| `created_at`         | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |
| `updated_at`         | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |

## `public.commerce_orders`

| Column         | Type                       | Nullable | Default                        | Identity/Gen | Description |
| -------------- | -------------------------- | -------- | ------------------------------ | ------------ | ----------- |
| `id`           | `uuid`                     | NO       | `gen_random_uuid()`            | No           | —           |
| `account_id`   | `uuid`                     | NO       | `—`                            | No           | —           |
| `store_id`     | `uuid`                     | NO       | `—`                            | No           | —           |
| `customer_id`  | `uuid`                     | YES      | `—`                            | No           | —           |
| `order_number` | `character varying`        | NO       | `—`                            | No           | —           |
| `total_amount` | `bigint`                   | NO       | `—`                            | No           | —           |
| `currency`     | `character`                | NO       | `—`                            | No           | —           |
| `status`       | `character varying`        | NO       | `'pending'::character varying` | No           | —           |
| `metadata`     | `jsonb`                    | NO       | `'{}'::jsonb`                  | No           | —           |
| `created_at`   | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`            | No           | —           |
| `updated_at`   | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`            | No           | —           |
| `deleted_at`   | `timestamp with time zone` | YES      | `—`                            | No           | —           |

## `public.commerce_product_variants`

| Column         | Type                       | Nullable | Default                       | Identity/Gen | Description |
| -------------- | -------------------------- | -------- | ----------------------------- | ------------ | ----------- |
| `id`           | `uuid`                     | NO       | `gen_random_uuid()`           | No           | —           |
| `account_id`   | `uuid`                     | NO       | `—`                           | No           | —           |
| `product_id`   | `uuid`                     | NO       | `—`                           | No           | —           |
| `sku`          | `character varying`        | YES      | `—`                           | No           | —           |
| `price_amount` | `bigint`                   | NO       | `—`                           | No           | —           |
| `currency`     | `character`                | NO       | `—`                           | No           | —           |
| `status`       | `character varying`        | NO       | `'active'::character varying` | No           | —           |
| `metadata`     | `jsonb`                    | NO       | `'{}'::jsonb`                 | No           | —           |
| `created_at`   | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`           | No           | —           |
| `updated_at`   | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`           | No           | —           |
| `deleted_at`   | `timestamp with time zone` | YES      | `—`                           | No           | —           |

## `public.commerce_products`

| Column        | Type                       | Nullable | Default                       | Identity/Gen | Description |
| ------------- | -------------------------- | -------- | ----------------------------- | ------------ | ----------- |
| `id`          | `uuid`                     | NO       | `gen_random_uuid()`           | No           | —           |
| `account_id`  | `uuid`                     | NO       | `—`                           | No           | —           |
| `store_id`    | `uuid`                     | NO       | `—`                           | No           | —           |
| `name`        | `character varying`        | NO       | `—`                           | No           | —           |
| `description` | `text`                     | YES      | `—`                           | No           | —           |
| `status`      | `character varying`        | NO       | `'active'::character varying` | No           | —           |
| `metadata`    | `jsonb`                    | NO       | `'{}'::jsonb`                 | No           | —           |
| `created_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`           | No           | —           |
| `updated_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`           | No           | —           |
| `deleted_at`  | `timestamp with time zone` | YES      | `—`                           | No           | —           |

## `public.commerce_stores`

| Column       | Type                       | Nullable | Default                       | Identity/Gen | Description |
| ------------ | -------------------------- | -------- | ----------------------------- | ------------ | ----------- |
| `id`         | `uuid`                     | NO       | `gen_random_uuid()`           | No           | —           |
| `account_id` | `uuid`                     | NO       | `—`                           | No           | —           |
| `name`       | `character varying`        | NO       | `—`                           | No           | —           |
| `status`     | `character varying`        | NO       | `'active'::character varying` | No           | —           |
| `metadata`   | `jsonb`                    | NO       | `'{}'::jsonb`                 | No           | —           |
| `created_at` | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`           | No           | —           |
| `updated_at` | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`           | No           | —           |
| `deleted_at` | `timestamp with time zone` | YES      | `—`                           | No           | —           |

## `public.core_account_modules`

| Column       | Type                       | Nullable | Default             | Identity/Gen | Description |
| ------------ | -------------------------- | -------- | ------------------- | ------------ | ----------- |
| `account_id` | `uuid`                     | NO       | `—`                 | No           | —           |
| `module`     | `character varying`        | NO       | `—`                 | No           | —           |
| `enabled`    | `boolean`                  | NO       | `true`              | No           | —           |
| `created_at` | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |

## `public.core_account_types`

| Column        | Type                       | Nullable | Default             | Identity/Gen | Description |
| ------------- | -------------------------- | -------- | ------------------- | ------------ | ----------- |
| `id`          | `uuid`                     | NO       | `gen_random_uuid()` | No           | —           |
| `code`        | `character varying`        | NO       | `—`                 | No           | —           |
| `description` | `text`                     | YES      | `—`                 | No           | —           |
| `created_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |
| `updated_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |

## `public.core_accounts`

| Column       | Type                       | Nullable | Default                       | Identity/Gen | Description |
| ------------ | -------------------------- | -------- | ----------------------------- | ------------ | ----------- |
| `id`         | `uuid`                     | NO       | `gen_random_uuid()`           | No           | —           |
| `name`       | `character varying`        | NO       | `—`                           | No           | —           |
| `type`       | `character varying`        | NO       | `—`                           | No           | —           |
| `status`     | `character varying`        | NO       | `'active'::character varying` | No           | —           |
| `metadata`   | `jsonb`                    | NO       | `'{}'::jsonb`                 | No           | —           |
| `created_at` | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`           | No           | —           |
| `updated_at` | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`           | No           | —           |
| `deleted_at` | `timestamp with time zone` | YES      | `—`                           | No           | —           |

## `public.core_integration_credentials`

| Column               | Type                       | Nullable | Default                     | Identity/Gen | Description |
| -------------------- | -------------------------- | -------- | --------------------------- | ------------ | ----------- |
| `id`                 | `uuid`                     | NO       | `uuid_generate_v4()`        | No           | —           |
| `integration_id`     | `uuid`                     | NO       | `—`                         | No           | —           |
| `encrypted_payload`  | `text`                     | NO       | `—`                         | No           | —           |
| `encryption_version` | `character varying`        | NO       | `—`                         | No           | —           |
| `scopes`             | `ARRAY`                    | NO       | `'{}'::character varying[]` | No           | —           |
| `expires_at`         | `timestamp with time zone` | YES      | `—`                         | No           | —           |
| `connected_at`       | `timestamp with time zone` | NO       | `now()`                     | No           | —           |

## `public.core_integrations`

| Column        | Type                       | Nullable | Default                                    | Identity/Gen | Description |
| ------------- | -------------------------- | -------- | ------------------------------------------ | ------------ | ----------- |
| `id`          | `uuid`                     | NO       | `uuid_generate_v4()`                       | No           | —           |
| `account_id`  | `uuid`                     | NO       | `—`                                        | No           | —           |
| `provider`    | `USER-DEFINED`             | NO       | `—`                                        | No           | —           |
| `status`      | `USER-DEFINED`             | NO       | `'PENDING'::core_integrations_status_enum` | No           | —           |
| `external_id` | `character varying`        | NO       | `—`                                        | No           | —           |
| `metadata`    | `jsonb`                    | NO       | `'{}'::jsonb`                              | No           | —           |
| `created_at`  | `timestamp with time zone` | NO       | `now()`                                    | No           | —           |
| `updated_at`  | `timestamp with time zone` | NO       | `now()`                                    | No           | —           |
| `deleted_at`  | `timestamp with time zone` | YES      | `—`                                        | No           | —           |

## `public.core_notification_channels`

| Column        | Type                       | Nullable | Default             | Identity/Gen | Description |
| ------------- | -------------------------- | -------- | ------------------- | ------------ | ----------- |
| `id`          | `uuid`                     | NO       | `gen_random_uuid()` | No           | —           |
| `code`        | `character varying`        | NO       | `—`                 | No           | —           |
| `description` | `text`                     | YES      | `—`                 | No           | —           |
| `created_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |
| `updated_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |

## `public.core_system_modules`

| Column        | Type                       | Nullable | Default             | Identity/Gen | Description |
| ------------- | -------------------------- | -------- | ------------------- | ------------ | ----------- |
| `id`          | `uuid`                     | NO       | `gen_random_uuid()` | No           | —           |
| `code`        | `character varying`        | NO       | `—`                 | No           | —           |
| `description` | `text`                     | YES      | `—`                 | No           | —           |
| `created_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |
| `updated_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |

## `public.customers_customer_profiles`

| Column        | Type                       | Nullable | Default             | Identity/Gen | Description |
| ------------- | -------------------------- | -------- | ------------------- | ------------ | ----------- |
| `id`          | `uuid`                     | NO       | `gen_random_uuid()` | No           | —           |
| `account_id`  | `uuid`                     | NO       | `—`                 | No           | —           |
| `customer_id` | `uuid`                     | NO       | `—`                 | No           | —           |
| `preferences` | `jsonb`                    | NO       | `'{}'::jsonb`       | No           | —           |
| `metadata`    | `jsonb`                    | NO       | `'{}'::jsonb`       | No           | —           |
| `created_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |
| `updated_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |

## `public.customers_customers`

| Column       | Type                       | Nullable | Default                       | Identity/Gen | Description |
| ------------ | -------------------------- | -------- | ----------------------------- | ------------ | ----------- |
| `id`         | `uuid`                     | NO       | `gen_random_uuid()`           | No           | —           |
| `account_id` | `uuid`                     | NO       | `—`                           | No           | —           |
| `email`      | `USER-DEFINED`             | NO       | `—`                           | No           | —           |
| `phone`      | `character varying`        | YES      | `—`                           | No           | —           |
| `first_name` | `character varying`        | YES      | `—`                           | No           | —           |
| `last_name`  | `character varying`        | YES      | `—`                           | No           | —           |
| `status`     | `character varying`        | NO       | `'active'::character varying` | No           | —           |
| `metadata`   | `jsonb`                    | NO       | `'{}'::jsonb`                 | No           | —           |
| `created_at` | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`           | No           | —           |
| `updated_at` | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`           | No           | —           |
| `deleted_at` | `timestamp with time zone` | YES      | `—`                           | No           | —           |

## `public.fit_admins`

| Column       | Type                          | Nullable | Default              | Identity/Gen | Description |
| ------------ | ----------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`         | `uuid`                        | NO       | `uuid_generate_v4()` | No           | —           |
| `email`      | `character varying`           | NO       | `—`                  | No           | —           |
| `password`   | `character varying`           | NO       | `—`                  | No           | —           |
| `created_at` | `timestamp without time zone` | NO       | `now()`              | No           | —           |
| `updated_at` | `timestamp without time zone` | NO       | `now()`              | No           | —           |

## `public.fit_analytics_events`

| Column       | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------ | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`         | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `event_type` | `text`                     | NO       | `—`                  | No           | —           |
| `payload`    | `jsonb`                    | NO       | `—`                  | No           | —           |
| `created_at` | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `public.fit_audit_logs`

| Column        | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`          | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `actor`       | `character varying`        | NO       | `—`                  | No           | —           |
| `action`      | `character varying`        | NO       | `—`                  | No           | —           |
| `entity_type` | `character varying`        | NO       | `—`                  | No           | —           |
| `entity_id`   | `character varying`        | YES      | `—`                  | No           | —           |
| `metadata`    | `jsonb`                    | NO       | `'{}'::jsonb`        | No           | —           |
| `created_at`  | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `public.fit_automation_reviews`

| Column                 | Type                       | Nullable | Default              | Identity/Gen | Description |
| ---------------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                   | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`           | `uuid`                     | NO       | `—`                  | No           | —           |
| `external_product_id`  | `text`                     | NO       | `—`                  | No           | —           |
| `fingerprint_id`       | `uuid`                     | YES      | `—`                  | No           | —           |
| `status`               | `text`                     | NO       | `'pending'::text`    | No           | —           |
| `priority`             | `text`                     | NO       | `'normal'::text`     | No           | —           |
| `confidence`           | `numeric`                  | NO       | `—`                  | No           | —           |
| `conflict_description` | `text`                     | YES      | `—`                  | No           | —           |
| `explanation`          | `jsonb`                    | YES      | `—`                  | No           | —           |
| `reviewer_id`          | `text`                     | YES      | `—`                  | No           | —           |
| `reviewed_at`          | `timestamp with time zone` | YES      | `—`                  | No           | —           |
| `review_notes`         | `text`                     | YES      | `—`                  | No           | —           |
| `governance_reason`    | `text`                     | YES      | `—`                  | No           | —           |
| `requires_recovery`    | `boolean`                  | NO       | `false`              | No           | —           |
| `created_at`           | `timestamp with time zone` | NO       | `now()`              | No           | —           |
| `updated_at`           | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `public.fit_experiment_assignments`

| Column            | Type                       | Nullable | Default              | Identity/Gen | Description |
| ----------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`              | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `experiment_id`   | `uuid`                     | NO       | `—`                  | No           | —           |
| `profile_id`      | `uuid`                     | YES      | `—`                  | No           | —           |
| `account_id`      | `uuid`                     | YES      | `—`                  | No           | —           |
| `variant`         | `character varying`        | NO       | `—`                  | No           | —           |
| `assignment_hash` | `character varying`        | NO       | `—`                  | No           | —           |
| `created_at`      | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `public.fit_experiments`

| Column               | Type                       | Nullable | Default                      | Identity/Gen | Description |
| -------------------- | -------------------------- | -------- | ---------------------------- | ------------ | ----------- |
| `id`                 | `uuid`                     | NO       | `uuid_generate_v4()`         | No           | —           |
| `name`               | `character varying`        | NO       | `—`                          | No           | —           |
| `description`        | `text`                     | YES      | `—`                          | No           | —           |
| `status`             | `character varying`        | NO       | `'draft'::character varying` | No           | —           |
| `traffic_percentage` | `integer`                  | NO       | `0`                          | No           | —           |
| `variant_config`     | `jsonb`                    | NO       | `'{}'::jsonb`                | No           | —           |
| `start_at`           | `timestamp with time zone` | NO       | `now()`                      | No           | —           |
| `end_at`             | `timestamp with time zone` | YES      | `—`                          | No           | —           |
| `account_id`         | `uuid`                     | YES      | `—`                          | No           | —           |
| `created_at`         | `timestamp with time zone` | NO       | `now()`                      | No           | —           |
| `updated_at`         | `timestamp with time zone` | NO       | `now()`                      | No           | —           |

## `public.fit_feature_flags`

| Column               | Type                       | Nullable | Default                       | Identity/Gen | Description |
| -------------------- | -------------------------- | -------- | ----------------------------- | ------------ | ----------- |
| `id`                 | `uuid`                     | NO       | `uuid_generate_v4()`          | No           | —           |
| `key`                | `character varying`        | NO       | `—`                           | No           | —           |
| `description`        | `text`                     | YES      | `—`                           | No           | —           |
| `enabled`            | `boolean`                  | NO       | `false`                       | No           | —           |
| `rollout_percentage` | `integer`                  | NO       | `100`                         | No           | —           |
| `scope`              | `character varying`        | NO       | `'global'::character varying` | No           | —           |
| `account_id`         | `uuid`                     | YES      | `—`                           | No           | —           |
| `config`             | `jsonb`                    | YES      | `—`                           | No           | —           |
| `created_at`         | `timestamp with time zone` | NO       | `now()`                       | No           | —           |
| `updated_at`         | `timestamp with time zone` | NO       | `now()`                       | No           | —           |

## `public.fit_feedback_events`

| Column              | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `recommendation_id` | `uuid`                     | NO       | `—`                  | No           | —           |
| `account_id`        | `uuid`                     | NO       | `—`                  | No           | —           |
| `product_id`        | `uuid`                     | NO       | `—`                  | No           | —           |
| `purchased`         | `boolean`                  | NO       | `false`              | No           | —           |
| `returned`          | `boolean`                  | NO       | `false`              | No           | —           |
| `exchanged`         | `boolean`                  | NO       | `false`              | No           | —           |
| `fit_feedback`      | `text`                     | YES      | `—`                  | No           | —           |
| `created_at`        | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `public.fit_feedback_hooks`

| Column              | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `recommendation_id` | `uuid`                     | NO       | `—`                  | No           | —           |
| `account_id`        | `uuid`                     | NO       | `—`                  | No           | —           |
| `product_id`        | `uuid`                     | NO       | `—`                  | No           | —           |
| `fingerprint_id`    | `uuid`                     | YES      | `—`                  | No           | —           |
| `event_type`        | `text`                     | NO       | `—`                  | No           | —           |
| `recommended_size`  | `text`                     | NO       | `—`                  | No           | —           |
| `actual_outcome`    | `text`                     | YES      | `—`                  | No           | —           |
| `signal_strength`   | `text`                     | NO       | `'weak'::text`       | No           | —           |
| `occurred_at`       | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `public.fit_fingerprint_versions`

| Column                | Type                          | Nullable | Default              | Identity/Gen | Description |
| --------------------- | ----------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                  | `uuid`                        | NO       | `uuid_generate_v4()` | No           | —           |
| `fingerprint_id`      | `uuid`                        | NO       | `—`                  | No           | —           |
| `account_id`          | `uuid`                        | NO       | `—`                  | No           | —           |
| `product_id`          | `uuid`                        | YES      | `—`                  | No           | —           |
| `external_product_id` | `text`                        | NO       | `—`                  | No           | —           |
| `version`             | `text`                        | NO       | `—`                  | No           | —           |
| `fingerprint_data`    | `jsonb`                       | NO       | `—`                  | No           | —           |
| `classifier_version`  | `text`                        | NO       | `—`                  | No           | —           |
| `lineage_reason`      | `text`                        | NO       | `—`                  | No           | —           |
| `severity`            | `text`                        | NO       | `—`                  | No           | —           |
| `generated_at`        | `timestamp without time zone` | NO       | `now()`              | No           | —           |

## `public.fit_governance_audit_events`

| Column                 | Type                       | Nullable | Default                    | Identity/Gen | Description |
| ---------------------- | -------------------------- | -------- | -------------------------- | ------------ | ----------- |
| `id`                   | `uuid`                     | NO       | `uuid_generate_v4()`       | No           | —           |
| `account_id`           | `uuid`                     | NO       | `—`                        | No           | —           |
| `product_id`           | `uuid`                     | YES      | `—`                        | No           | —           |
| `entity_id`            | `text`                     | NO       | `—`                        | No           | —           |
| `entity_type`          | `character varying`        | NO       | `—`                        | No           | —           |
| `event_type`           | `character varying`        | NO       | `—`                        | No           | —           |
| `event_schema_version` | `character varying`        | NO       | `'v1'::character varying`  | No           | —           |
| `governance_reason`    | `text`                     | YES      | `—`                        | No           | —           |
| `actor`                | `text`                     | YES      | `—`                        | No           | —           |
| `correlation_id`       | `uuid`                     | YES      | `—`                        | No           | —           |
| `causation_id`         | `uuid`                     | YES      | `—`                        | No           | —           |
| `source_service`       | `character varying`        | NO       | `'api'::character varying` | No           | —           |
| `metadata`             | `jsonb`                    | YES      | `—`                        | No           | —           |
| `occurred_at`          | `timestamp with time zone` | NO       | `—`                        | No           | —           |

## `public.fit_governance_incidents`

| Column              | Type                       | Nullable | Default                     | Identity/Gen | Description |
| ------------------- | -------------------------- | -------- | --------------------------- | ------------ | ----------- |
| `id`                | `uuid`                     | NO       | `uuid_generate_v4()`        | No           | —           |
| `account_id`        | `uuid`                     | NO       | `—`                         | No           | —           |
| `product_id`        | `uuid`                     | YES      | `—`                         | No           | —           |
| `incident_type`     | `character varying`        | NO       | `—`                         | No           | —           |
| `severity`          | `character varying`        | NO       | `—`                         | No           | —           |
| `title`             | `character varying`        | NO       | `—`                         | No           | —           |
| `description`       | `text`                     | NO       | `—`                         | No           | —           |
| `status`            | `character varying`        | NO       | `'OPEN'::character varying` | No           | —           |
| `correlation_id`    | `uuid`                     | YES      | `—`                         | No           | —           |
| `metadata`          | `jsonb`                    | YES      | `—`                         | No           | —           |
| `occurred_at`       | `timestamp with time zone` | NO       | `now()`                     | No           | —           |
| `resolved_at`       | `timestamp with time zone` | YES      | `—`                         | No           | —           |
| `resolved_by`       | `text`                     | YES      | `—`                         | No           | —           |
| `resolution_reason` | `text`                     | YES      | `—`                         | No           | —           |

## `public.fit_lineage_snapshot_pointers`

| Column                | Type                          | Nullable | Default | Identity/Gen | Description |
| --------------------- | ----------------------------- | -------- | ------- | ------------ | ----------- |
| `account_id`          | `uuid`                        | NO       | `—`     | No           | —           |
| `external_product_id` | `text`                        | NO       | `—`     | No           | —           |
| `active_version_id`   | `uuid`                        | NO       | `—`     | No           | —           |
| `is_quarantined`      | `boolean`                     | NO       | `false` | No           | —           |
| `governance_reason`   | `text`                        | YES      | `—`     | No           | —           |
| `updated_at`          | `timestamp without time zone` | NO       | `now()` | No           | —           |

## `public.fit_operator_roles`

| Column       | Type                       | Nullable | Default                       | Identity/Gen | Description |
| ------------ | -------------------------- | -------- | ----------------------------- | ------------ | ----------- |
| `id`         | `uuid`                     | NO       | `uuid_generate_v4()`          | No           | —           |
| `admin_id`   | `uuid`                     | NO       | `—`                           | No           | —           |
| `role`       | `character varying`        | NO       | `'VIEWER'::character varying` | No           | —           |
| `created_at` | `timestamp with time zone` | NO       | `now()`                       | No           | —           |
| `updated_at` | `timestamp with time zone` | NO       | `now()`                       | No           | —           |

## `public.fit_processed_webhooks`

| Column         | Type                          | Nullable | Default | Identity/Gen | Description |
| -------------- | ----------------------------- | -------- | ------- | ------------ | ----------- |
| `webhook_id`   | `text`                        | NO       | `—`     | No           | —           |
| `topic`        | `text`                        | NO       | `—`     | No           | —           |
| `shop_domain`  | `text`                        | NO       | `—`     | No           | —           |
| `processed_at` | `timestamp without time zone` | NO       | `now()` | No           | —           |

## `public.fit_products`

| Column                | Type                       | Nullable | Default              | Identity/Gen | Description |
| --------------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                  | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`          | `uuid`                     | NO       | `—`                  | No           | —           |
| `name`                | `text`                     | NO       | `—`                  | No           | —           |
| `category`            | `text`                     | NO       | `—`                  | No           | —           |
| `fit_type`            | `text`                     | NO       | `—`                  | No           | —           |
| `stretch_level`       | `text`                     | NO       | `—`                  | No           | —           |
| `override_size_chart` | `jsonb`                    | YES      | `—`                  | No           | —           |
| `metadata`            | `jsonb`                    | YES      | `'{}'::jsonb`        | No           | —           |
| `created_at`          | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `public.fit_profile_learning_states`

| Column                 | Type                       | Nullable | Default              | Identity/Gen | Description |
| ---------------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                   | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `profile_id`           | `uuid`                     | NO       | `—`                  | No           | —           |
| `account_id`           | `uuid`                     | YES      | `—`                  | No           | —           |
| `successful_purchases` | `integer`                  | NO       | `0`                  | No           | —           |
| `returns_count`        | `integer`                  | NO       | `0`                  | No           | —           |
| `exchanges_count`      | `integer`                  | NO       | `0`                  | No           | —           |
| `perfect_fit_count`    | `integer`                  | NO       | `0`                  | No           | —           |
| `too_small_count`      | `integer`                  | NO       | `0`                  | No           | —           |
| `too_large_count`      | `integer`                  | NO       | `0`                  | No           | —           |
| `preferred_fit_bias`   | `integer`                  | NO       | `0`                  | No           | —           |
| `confidence_modifier`  | `integer`                  | NO       | `0`                  | No           | —           |
| `last_aggregated_at`   | `timestamp with time zone` | NO       | `now()`              | No           | —           |
| `created_at`           | `timestamp with time zone` | NO       | `now()`              | No           | —           |
| `updated_at`           | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `public.fit_profiles`

| Column                   | Type                          | Nullable | Default                        | Identity/Gen | Description |
| ------------------------ | ----------------------------- | -------- | ------------------------------ | ------------ | ----------- |
| `id`                     | `uuid`                        | NO       | `uuid_generate_v4()`           | No           | —           |
| `default_height`         | `numeric`                     | YES      | `—`                            | No           | —           |
| `default_weight`         | `numeric`                     | YES      | `—`                            | No           | —           |
| `default_fit_preference` | `character varying`           | NO       | `'regular'::character varying` | No           | —           |
| `default_gender`         | `character varying`           | NO       | `'unisex'::character varying`  | No           | —           |
| `profile_version`        | `integer`                     | NO       | `1`                            | No           | —           |
| `consent_version`        | `integer`                     | NO       | `1`                            | No           | —           |
| `last_used_at`           | `timestamp without time zone` | YES      | `—`                            | No           | —           |
| `created_at`             | `timestamp without time zone` | NO       | `now()`                        | No           | —           |
| `updated_at`             | `timestamp without time zone` | NO       | `now()`                        | No           | —           |

## `public.fit_raw_catalog_products`

| Column                | Type                          | Nullable | Default              | Identity/Gen | Description |
| --------------------- | ----------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                  | `uuid`                        | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`          | `uuid`                        | NO       | `—`                  | No           | —           |
| `external_product_id` | `text`                        | NO       | `—`                  | No           | —           |
| `shop_domain`         | `text`                        | NO       | `—`                  | No           | —           |
| `raw_payload`         | `jsonb`                       | NO       | `—`                  | No           | —           |
| `payload_hash`        | `text`                        | NO       | `—`                  | No           | —           |
| `source`              | `text`                        | NO       | `'webhook'::text`    | No           | —           |
| `received_at`         | `timestamp without time zone` | NO       | `now()`              | No           | —           |

## `public.fit_recommendation_evaluations`

| Column                         | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------------------------ | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`                           | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `recommendation_id`            | `uuid`                     | NO       | `—`                  | No           | —           |
| `profile_id`                   | `uuid`                     | YES      | `—`                  | No           | —           |
| `experiment_id`                | `uuid`                     | YES      | `—`                  | No           | —           |
| `variant`                      | `character varying`        | YES      | `—`                  | No           | —           |
| `confidence_at_recommendation` | `integer`                  | NO       | `—`                  | No           | —           |
| `recommendation_accepted`      | `boolean`                  | YES      | `—`                  | No           | —           |
| `returned`                     | `boolean`                  | YES      | `—`                  | No           | —           |
| `exchanged`                    | `boolean`                  | YES      | `—`                  | No           | —           |
| `fit_feedback`                 | `character varying`        | YES      | `—`                  | No           | —           |
| `evaluation_score`             | `numeric`                  | YES      | `—`                  | No           | —           |
| `created_at`                   | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `public.fit_recommendations`

| Column             | Type                       | Nullable | Default              | Identity/Gen | Description |
| ------------------ | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`               | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`       | `uuid`                     | NO       | `—`                  | No           | —           |
| `product_id`       | `uuid`                     | NO       | `—`                  | No           | —           |
| `profile_id`       | `uuid`                     | YES      | `—`                  | No           | —           |
| `user_inputs`      | `jsonb`                    | NO       | `—`                  | No           | —           |
| `recommended_size` | `text`                     | NO       | `—`                  | No           | —           |
| `alternative_size` | `text`                     | YES      | `—`                  | No           | —           |
| `confidence`       | `numeric`                  | NO       | `—`                  | No           | —           |
| `boundary_case`    | `boolean`                  | NO       | `false`              | No           | —           |
| `engine_version`   | `text`                     | NO       | `—`                  | No           | —           |
| `created_at`       | `timestamp with time zone` | NO       | `now()`              | No           | —           |

## `public.fit_replay_integrity_incidents`

| Column               | Type                          | Nullable | Default                 | Identity/Gen | Description |
| -------------------- | ----------------------------- | -------- | ----------------------- | ------------ | ----------- |
| `id`                 | `uuid`                        | NO       | `uuid_generate_v4()`    | No           | —           |
| `product_id`         | `text`                        | NO       | `—`                     | No           | —           |
| `fingerprint_id`     | `uuid`                        | NO       | `—`                     | No           | —           |
| `expected_hash`      | `text`                        | NO       | `—`                     | No           | —           |
| `actual_hash`        | `text`                        | NO       | `—`                     | No           | —           |
| `ontology_version`   | `text`                        | NO       | `—`                     | No           | —           |
| `classifier_version` | `text`                        | NO       | `—`                     | No           | —           |
| `governance_reason`  | `text`                        | NO       | `'HASH_MISMATCH'::text` | No           | —           |
| `occurred_at`        | `timestamp without time zone` | NO       | `now()`                 | No           | —           |

## `public.fit_replay_jobs`

| Column                | Type                       | Nullable | Default                                | Identity/Gen | Description |
| --------------------- | -------------------------- | -------- | -------------------------------------- | ------------ | ----------- |
| `id`                  | `uuid`                     | NO       | `uuid_generate_v4()`                   | No           | —           |
| `account_id`          | `uuid`                     | NO       | `—`                                    | No           | —           |
| `scope`               | `character varying`        | NO       | `—`                                    | No           | —           |
| `target_id`           | `text`                     | NO       | `—`                                    | No           | —           |
| `status`              | `character varying`        | NO       | `'pending'::character varying`         | No           | —           |
| `priority`            | `character varying`        | NO       | `'STANDARD_REPLAY'::character varying` | No           | —           |
| `is_dry_run`          | `boolean`                  | NO       | `false`                                | No           | —           |
| `total_products`      | `integer`                  | NO       | `0`                                    | No           | —           |
| `processed_products`  | `integer`                  | NO       | `0`                                    | No           | —           |
| `failed_products`     | `integer`                  | NO       | `0`                                    | No           | —           |
| `execution_manifest`  | `jsonb`                    | NO       | `—`                                    | No           | —           |
| `replay_request_hash` | `character varying`        | NO       | `—`                                    | No           | —           |
| `triggered_by`        | `text`                     | NO       | `—`                                    | No           | —           |
| `correlation_id`      | `uuid`                     | NO       | `—`                                    | No           | —           |
| `created_at`          | `timestamp with time zone` | NO       | `now()`                                | No           | —           |
| `updated_at`          | `timestamp with time zone` | NO       | `now()`                                | No           | —           |

## `public.fit_replay_partition_jobs`

| Column               | Type                       | Nullable | Default                        | Identity/Gen | Description |
| -------------------- | -------------------------- | -------- | ------------------------------ | ------------ | ----------- |
| `id`                 | `uuid`                     | NO       | `uuid_generate_v4()`           | No           | —           |
| `replay_job_id`      | `uuid`                     | NO       | `—`                            | No           | —           |
| `partition_index`    | `integer`                  | NO       | `—`                            | No           | —           |
| `status`             | `character varying`        | NO       | `'pending'::character varying` | No           | —           |
| `total_products`     | `integer`                  | NO       | `0`                            | No           | —           |
| `processed_products` | `integer`                  | NO       | `0`                            | No           | —           |
| `failed_products`    | `integer`                  | NO       | `0`                            | No           | —           |
| `product_ids`        | `jsonb`                    | YES      | `—`                            | No           | —           |
| `start_index`        | `integer`                  | YES      | `—`                            | No           | —           |
| `end_index`          | `integer`                  | YES      | `—`                            | No           | —           |
| `retry_after`        | `timestamp with time zone` | YES      | `—`                            | No           | —           |
| `checksum_hash`      | `character varying`        | YES      | `—`                            | No           | —           |
| `count_hash`         | `character varying`        | YES      | `—`                            | No           | —           |
| `error_message`      | `text`                     | YES      | `—`                            | No           | —           |
| `retry_count`        | `integer`                  | NO       | `0`                            | No           | —           |
| `correlation_id`     | `uuid`                     | NO       | `—`                            | No           | —           |
| `shard_affinity`     | `character varying`        | YES      | `—`                            | No           | —           |
| `heartbeat_at`       | `timestamp with time zone` | YES      | `—`                            | No           | —           |
| `lease_expires_at`   | `timestamp with time zone` | YES      | `—`                            | No           | —           |
| `created_at`         | `timestamp with time zone` | NO       | `now()`                        | No           | —           |
| `updated_at`         | `timestamp with time zone` | NO       | `now()`                        | No           | —           |

## `public.fit_shopify_connections`

| Column           | Type                          | Nullable | Default              | Identity/Gen | Description |
| ---------------- | ----------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`             | `uuid`                        | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`     | `uuid`                        | NO       | `—`                  | No           | —           |
| `shop_domain`    | `text`                        | NO       | `—`                  | No           | —           |
| `access_token`   | `text`                        | NO       | `—`                  | No           | —           |
| `scope`          | `text`                        | NO       | `''::text`           | No           | —           |
| `webhook_secret` | `text`                        | NO       | `''::text`           | No           | —           |
| `api_version`    | `text`                        | NO       | `'2025-01'::text`    | No           | —           |
| `connected_at`   | `timestamp with time zone`    | NO       | `now()`              | No           | —           |
| `last_synced_at` | `timestamp with time zone`    | YES      | `—`                  | No           | —           |
| `created_at`     | `timestamp without time zone` | NO       | `now()`              | No           | —           |
| `updated_at`     | `timestamp without time zone` | NO       | `now()`              | No           | —           |

## `public.fit_size_charts`

| Column       | Type      | Nullable | Default              | Identity/Gen | Description |
| ------------ | --------- | -------- | -------------------- | ------------ | ----------- |
| `id`         | `uuid`    | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id` | `uuid`    | NO       | `—`                  | No           | —           |
| `category`   | `text`    | NO       | `—`                  | No           | —           |
| `gender`     | `text`    | NO       | `—`                  | No           | —           |
| `size_label` | `text`    | NO       | `—`                  | No           | —           |
| `min_height` | `numeric` | YES      | `—`                  | No           | —           |
| `max_height` | `numeric` | YES      | `—`                  | No           | —           |
| `min_weight` | `numeric` | YES      | `—`                  | No           | —           |
| `max_weight` | `numeric` | YES      | `—`                  | No           | —           |
| `min_bmi`    | `numeric` | YES      | `—`                  | No           | —           |
| `max_bmi`    | `numeric` | YES      | `—`                  | No           | —           |
| `sort_order` | `integer` | NO       | `0`                  | No           | —           |

## `public.fit_tenant_configs`

| Column           | Type                       | Nullable | Default              | Identity/Gen | Description |
| ---------------- | -------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`             | `uuid`                     | NO       | `uuid_generate_v4()` | No           | —           |
| `account_id`     | `uuid`                     | NO       | `—`                  | No           | —           |
| `settings`       | `jsonb`                    | YES      | `'{}'::jsonb`        | No           | —           |
| `widgetSettings` | `jsonb`                    | YES      | `'{}'::jsonb`        | No           | —           |
| `created_at`     | `timestamp with time zone` | NO       | `now()`              | No           | —           |
| `updated_at`     | `timestamp with time zone` | NO       | `now()`              | No           | —           |
| `deleted_at`     | `timestamp with time zone` | YES      | `—`                  | No           | —           |

## `public.fit_unmapped_signals`

| Column          | Type                          | Nullable | Default              | Identity/Gen | Description |
| --------------- | ----------------------------- | -------- | -------------------- | ------------ | ----------- |
| `id`            | `uuid`                        | NO       | `uuid_generate_v4()` | No           | —           |
| `raw_value`     | `text`                        | NO       | `—`                  | No           | —           |
| `source`        | `text`                        | NO       | `—`                  | No           | —           |
| `frequency`     | `integer`                     | NO       | `1`                  | No           | —           |
| `account_id`    | `uuid`                        | NO       | `—`                  | No           | —           |
| `first_seen_at` | `timestamp without time zone` | NO       | `now()`              | No           | —           |
| `last_seen_at`  | `timestamp without time zone` | NO       | `now()`              | No           | —           |

## `public.identity_permissions`

| Column        | Type                       | Nullable | Default             | Identity/Gen | Description |
| ------------- | -------------------------- | -------- | ------------------- | ------------ | ----------- |
| `id`          | `uuid`                     | NO       | `gen_random_uuid()` | No           | —           |
| `code`        | `character varying`        | NO       | `—`                 | No           | —           |
| `description` | `text`                     | YES      | `—`                 | No           | —           |
| `metadata`    | `jsonb`                    | NO       | `'{}'::jsonb`       | No           | —           |
| `created_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |
| `updated_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |
| `deleted_at`  | `timestamp with time zone` | YES      | `—`                 | No           | —           |

## `public.identity_role_permissions`

| Column          | Type                       | Nullable | Default             | Identity/Gen | Description |
| --------------- | -------------------------- | -------- | ------------------- | ------------ | ----------- |
| `role_id`       | `uuid`                     | NO       | `—`                 | No           | —           |
| `permission_id` | `uuid`                     | NO       | `—`                 | No           | —           |
| `created_at`    | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |

## `public.identity_roles`

| Column        | Type                       | Nullable | Default             | Identity/Gen | Description |
| ------------- | -------------------------- | -------- | ------------------- | ------------ | ----------- |
| `id`          | `uuid`                     | NO       | `gen_random_uuid()` | No           | —           |
| `name`        | `character varying`        | NO       | `—`                 | No           | —           |
| `description` | `text`                     | YES      | `—`                 | No           | —           |
| `metadata`    | `jsonb`                    | NO       | `'{}'::jsonb`       | No           | —           |
| `created_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |
| `updated_at`  | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |
| `deleted_at`  | `timestamp with time zone` | YES      | `—`                 | No           | —           |

## `public.identity_user_accounts`

| Column       | Type                       | Nullable | Default             | Identity/Gen | Description |
| ------------ | -------------------------- | -------- | ------------------- | ------------ | ----------- |
| `user_id`    | `uuid`                     | NO       | `—`                 | No           | —           |
| `account_id` | `uuid`                     | NO       | `—`                 | No           | —           |
| `created_at` | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |

## `public.identity_user_roles`

| Column       | Type                       | Nullable | Default             | Identity/Gen | Description |
| ------------ | -------------------------- | -------- | ------------------- | ------------ | ----------- |
| `user_id`    | `uuid`                     | NO       | `—`                 | No           | —           |
| `role_id`    | `uuid`                     | NO       | `—`                 | No           | —           |
| `account_id` | `uuid`                     | NO       | `—`                 | No           | —           |
| `created_at` | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP` | No           | —           |

## `public.identity_users`

| Column                   | Type                       | Nullable | Default                            | Identity/Gen | Description |
| ------------------------ | -------------------------- | -------- | ---------------------------------- | ------------ | ----------- |
| `id`                     | `uuid`                     | NO       | `gen_random_uuid()`                | No           | —           |
| `email`                  | `USER-DEFINED`             | NO       | `—`                                | No           | —           |
| `password_hash`          | `text`                     | YES      | `—`                                | No           | —           |
| `name`                   | `character varying`        | YES      | `—`                                | No           | —           |
| `status`                 | `character varying`        | NO       | `'active'::character varying`      | No           | —           |
| `metadata`               | `jsonb`                    | NO       | `'{}'::jsonb`                      | No           | —           |
| `created_at`             | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`                | No           | —           |
| `updated_at`             | `timestamp with time zone` | NO       | `CURRENT_TIMESTAMP`                | No           | —           |
| `deleted_at`             | `timestamp with time zone` | YES      | `—`                                | No           | —           |
| `failed_login_attempts`  | `integer`                  | NO       | `0`                                | No           | —           |
| `locked_until`           | `timestamp with time zone` | YES      | `—`                                | No           | —           |
| `reset_token_expires_at` | `timestamp with time zone` | YES      | `—`                                | No           | —           |
| `reset_token_hash`       | `text`                     | YES      | `—`                                | No           | —           |
| `token_version`          | `integer`                  | NO       | `1`                                | No           | —           |
| `user_type`              | `USER-DEFINED`             | NO       | `'BRAND'::identity_user_type_enum` | No           | —           |
