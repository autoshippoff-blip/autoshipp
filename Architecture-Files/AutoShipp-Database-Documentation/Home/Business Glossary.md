---
title: "Business Glossary"
type: "general"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - general
---
# Business Glossary & Data Dictionary

Before writing any SQL, you must understand the business language of AutoShipp.

## 1. Core Business Concepts

### **Account (Tenant)**
- **What it is:** The top-level billing and isolation boundary for a business using AutoShipp.
- **Why it exists:** AutoShipp is multi-tenant. All data belongs to an Account.
- **Implemented in:** `public.core_accounts`

### **Store**
- **What it is:** A specific Shopify storefront belonging to an Account. An Account can have multiple Stores (e.g., US store, EU store).
- **Implemented in:** `public.commerce_stores`

### **Customer**
- **What it is:** The end-shopper buying clothes on the Store.
- **Implemented in:** `public.customers_customers`

### **Product & Variant**
- **What it is:** A Product (Parent, e.g., "T-Shirt") has multiple Variants (Child, e.g., "T-Shirt - Blue - Large").
- **Why it matters:** Recommendations are mapped to *Products*, but inventory and purchases are tracked at the *Variant* level.

### **Fit Profile & Learning State**
- **What it is:** A 3D/mathematical representation of a Customer's body and their historical fit preferences (e.g., they prefer shirts slightly loose).
- **Implemented in:** `fit.fit_profiles`, `fit.fit_profile_learning_states`

### **Recommendation**
- **What it is:** The exact size the ML model told the shopper to buy.
- **Lifecycle:** Created -> Served -> Converted (Purchased) -> Feedback Received.

### **Fingerprint Version**
- **What it is:** An immutable snapshot of a size chart's physical dimensions. If a brand changes the physical cut of a Large shirt, a new Fingerprint is generated so historical ML replays remain accurate.

### **Governance Incident**
- **What it is:** A manual override when the ML engine is consistently wrong and a human intervenes.

### **Replay Job**
- **What it is:** A backtesting run. We take 100,000 historical orders and run them through a *new* ML model version to see if it would have reduced return rates.

---

## 2. Data Dictionary (Important Columns)

The following column naming conventions apply globally across the database:

- **`account_id`**: The most important column. It dictates tenant ownership. Must be included in the `WHERE` clause of almost every query.
- **`metadata` (JSONB)**: Used for storing non-indexable, highly volatile data synced from third-party systems (like raw Shopify tags). *Do not use `metadata` for fields you need to query or filter on.*
- **`payload` (JSONB)**: Used in webhooks and queues to store the raw incoming HTTP request body.
- **`config` (JSONB)**: Used in tenant configurations to avoid creating 50 boolean columns for feature toggles.
- **`status` (Enum/String)**: Represents the state machine of an entity (e.g., `pending`, `active`, `failed`).
- **`deleted_at` (Timestamp)**: We use **Soft Deletes** almost everywhere. If this is not null, the record is considered deleted. Never query records where `deleted_at IS NOT NULL` unless explicitly building an audit tool.