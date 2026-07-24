---
title: "Trigger Reference"
type: "reference"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - reference
---

# Trigger Reference

- **`public.core_accounts`**: `trg_core_accounts_updated` (BEFORE UPDATE) -> `EXECUTE FUNCTION set_updated_at()`
- **`public.identity_users`**: `trg_identity_users_updated` (BEFORE UPDATE) -> `EXECUTE FUNCTION set_updated_at()`
- **`public.identity_roles`**: `trg_identity_roles_updated` (BEFORE UPDATE) -> `EXECUTE FUNCTION set_updated_at()`
- **`public.identity_permissions`**: `trg_identity_permissions_updated` (BEFORE UPDATE) -> `EXECUTE FUNCTION set_updated_at()`
- **`public.commerce_stores`**: `trg_commerce_stores_updated` (BEFORE UPDATE) -> `EXECUTE FUNCTION set_updated_at()`
- **`public.commerce_products`**: `trg_commerce_products_updated` (BEFORE UPDATE) -> `EXECUTE FUNCTION set_updated_at()`
- **`public.commerce_product_variants`**: `trg_commerce_product_variants_updated` (BEFORE UPDATE) -> `EXECUTE FUNCTION set_updated_at()`
- **`public.commerce_orders`**: `trg_commerce_orders_updated` (BEFORE UPDATE) -> `EXECUTE FUNCTION set_updated_at()`
- **`public.commerce_order_items`**: `trg_commerce_order_items_updated` (BEFORE UPDATE) -> `EXECUTE FUNCTION set_updated_at()`
- **`public.customers_customers`**: `trg_customers_customers_updated` (BEFORE UPDATE) -> `EXECUTE FUNCTION set_updated_at()`
- **`public.customers_customer_profiles`**: `trg_customers_customer_profiles_updated` (BEFORE UPDATE) -> `EXECUTE FUNCTION set_updated_at()`
