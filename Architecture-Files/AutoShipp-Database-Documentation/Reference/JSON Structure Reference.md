---
title: "JSON Structure Reference"
type: "reference"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - reference
---
# JSON Structure Reference

Because AutoShipp handles highly dynamic catalog data from Shopify, many columns use `JSONB`.

## 1. `fit_tenant_configs.config`
```json
{
  "recommendation_strictness": "high|medium|low",
  "enable_ab_testing": boolean,
  "theme_color": "#Hex"
}
```

## 2. `fit_profiles.measurements`
```json
{
  "height_cm": float,
  "weight_kg": float,
  "body_shape": "triangle|inverted_triangle|rectangle",
  "fit_preference": "slim|regular|loose"
}
```

## 3. `commerce_products.metadata`
```json
{
  "shopify_tags": ["summer", "sale"],
  "vendor": "Nike",
  "raw_html": "..."
}
```
*Do not query against `raw_html`. It is stored purely for historical debug purposes.*