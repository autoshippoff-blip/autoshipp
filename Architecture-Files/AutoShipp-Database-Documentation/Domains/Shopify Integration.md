---
title: "Shopify Integration"
type: "domain"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - domain
---
# Shopify Integration Domain

## 1. What is this?
The Shopify domain handles the specific mappings and webhook tracking for Shopify storefronts.

## 2. Why does it exist?
Shopify is our primary integration target. Managing the state of Shopify webhooks (avoiding processing the same webhook twice) is critical for system stability.

## 3. Important Entities
- **`fit_shopify_connections`**: Stores Shopify specific configuration overrides.
- **`fit_processed_webhooks`**: An idempotent key table. We insert the Shopify Webhook ID here. If it exists, we drop the webhook.

## 4. Performance Considerations
- `fit_processed_webhooks` gets hit on *every* webhook. It must be vacuumed regularly or partitioned by date.