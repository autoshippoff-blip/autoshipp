---
title: "Foreign Keys and Relationships"
type: "reference"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - reference
---
# Foreign Keys and Relationships

## Physical Foreign Keys
- `public.core_account_modules(account_id)` → `public.core_accounts(id)`
- `public.identity_user_accounts(user_id)` → `public.identity_users(id)`
- `public.identity_user_accounts(account_id)` → `public.core_accounts(id)`
- `public.identity_role_permissions(role_id)` → `public.identity_roles(id)`
- `public.identity_role_permissions(permission_id)` → `public.identity_permissions(id)`
- `public.identity_user_roles(user_id)` → `public.identity_users(id)`
- `public.identity_user_roles(role_id)` → `public.identity_roles(id)`
- `public.identity_user_roles(account_id)` → `public.core_accounts(id)`
- `public.commerce_stores(account_id)` → `public.core_accounts(id)`
- `public.commerce_products(account_id)` → `public.core_accounts(id)`
- `public.commerce_products(store_id)` → `public.commerce_stores(id)`
- `public.commerce_product_variants(account_id)` → `public.core_accounts(id)`
- `public.commerce_product_variants(product_id)` → `public.commerce_products(id)`
- `public.commerce_orders(account_id)` → `public.core_accounts(id)`
- `public.commerce_orders(store_id)` → `public.commerce_stores(id)`
- `public.commerce_order_items(account_id)` → `public.core_accounts(id)`
- `public.commerce_order_items(order_id)` → `public.commerce_orders(id)`
- `public.commerce_order_items(product_variant_id)` → `public.commerce_product_variants(id)`
- `public.commerce_orders(customer_id)` → `public.customers_customers(id)`
- `public.customers_customers(account_id)` → `public.core_accounts(id)`
- `public.customers_customer_profiles(account_id)` → `public.core_accounts(id)`
- `public.customers_customer_profiles(customer_id)` → `public.customers_customers(id)`
- `public.fit_feedback_events(recommendation_id)` → `public.fit_recommendations(id)`
- `public.fit_feedback_events(recommendation_id)` → `public.fit_recommendations(id)`
- `public.fit_recommendations(product_id)` → `public.fit_products(id)`
- `public.fit_recommendations(product_id)` → `public.fit_products(id)`
- `public.fit_products(account_id)` → `public.fit_tenant_configs(id)`
- `public.fit_size_charts(account_id)` → `public.fit_tenant_configs(id)`
- `public.fit_shopify_connections(account_id)` → `public.fit_tenant_configs(id)`
- `public.fit_lineage_snapshot_pointers(active_version_id)` → `public.fit_fingerprint_versions(id)`
- `public.fit_lineage_snapshot_pointers(active_version_id)` → `public.fit_fingerprint_versions(id)`
- `public.fit_replay_partition_jobs(replay_job_id)` → `public.fit_replay_jobs(id)`
- `public.fit_replay_partition_jobs(replay_job_id)` → `public.fit_replay_jobs(id)`
- `public.fit_operator_roles(admin_id)` → `public.fit_admins(id)`
- `public.fit_operator_roles(admin_id)` → `public.fit_admins(id)`
- `public.core_integration_credentials(integration_id)` → `public.core_integrations(id)`
- `public.core_integration_credentials(integration_id)` → `public.core_integrations(id)`
- `fit.fit_feedback_events(recommendation_id)` → `fit.fit_recommendations(id)`
- `fit.fit_feedback_events(recommendation_id)` → `fit.fit_recommendations(id)`
- `fit.fit_recommendations(product_id)` → `fit.fit_products(id)`
- `fit.fit_recommendations(product_id)` → `fit.fit_products(id)`
- `fit.fit_replay_partition_jobs(replay_job_id)` → `fit.fit_replay_jobs(id)`
- `fit.fit_replay_partition_jobs(replay_job_id)` → `fit.fit_replay_jobs(id)`
- `fit.fit_lineage_snapshot_pointers(active_version_id)` → `fit.fit_fingerprint_versions(id)`
- `fit.fit_lineage_snapshot_pointers(active_version_id)` → `fit.fit_fingerprint_versions(id)`
- `fit.fit_operator_roles(admin_id)` → `fit.fit_admins(id)`
- `fit.fit_operator_roles(admin_id)` → `fit.fit_admins(id)`
- `fit.core_integration_credentials(integration_id)` → `fit.core_integrations(id)`
- `fit.core_integration_credentials(integration_id)` → `fit.core_integrations(id)`

## Logical Relationships
Many tables in `fit` schema use `account_id` which logically maps to `public.core_accounts(id)`, but there is no physical Foreign Key constraint to enforce cross-schema strict isolation.