---
title: "Sample Data"
type: "reference"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - reference
---

# Sample Data

## `fit.fit_admins`

```json
[
  {
    "id": "3e6abf3b-df7e-4231-a61a-02d15f1175c2",
    "email": "test-disabled-1782322198311@fitintelligence.com",
    "password": "***MASKED***",
    "created_at": "2026-06-24 17:29:59.300033",
    "updated_at": "2026-06-24 17:29:59.300033"
  },
  {
    "id": "e2211f6d-ca03-4d5a-a203-0af87a8a05c4",
    "email": "test-enabled-1782322199093@fitintelligence.com",
    "password": "***MASKED***",
    "created_at": "2026-06-24 17:30:00.087494",
    "updated_at": "2026-06-24 17:30:01.696986"
  },
  {
    "id": "c24bf9bd-99ff-455d-811b-b2583b9f8ba5",
    "email": "test-fail-1782322201572@fitintelligence.com",
    "password": "***MASKED***",
    "created_at": "2026-06-24 17:30:02.603399",
    "updated_at": "2026-06-24 17:30:02.603399"
  }
]
```

## `fit.fit_analytics_events`

```json
[
  {
    "id": "30eb7d51-2ae5-42e4-a43d-b79d4d00953f",
    "event_type": "recommendation_viewed",
    "payload": "***MASKED***",
    "created_at": "2026-06-17 15:01:46.597851+00:00"
  },
  {
    "id": "df89b4b2-86c8-4080-91bc-9579df5888d8",
    "event_type": "recommendation_viewed",
    "payload": "***MASKED***",
    "created_at": "2026-06-17 15:49:00.083697+00:00"
  },
  {
    "id": "fd5ef951-525c-4cd7-ad24-cf8d5e9ac1a2",
    "event_type": "recommendation_viewed",
    "payload": "***MASKED***",
    "created_at": "2026-06-17 15:49:21.191663+00:00"
  }
]
```

## `fit.fit_feature_flags`

```json
[
  {
    "id": "e09bcee8-cd27-4355-b6d6-71a19072d23d",
    "key": "***MASKED***",
    "description": null,
    "enabled": false,
    "rollout_percentage": 0,
    "scope": "global",
    "account_id": null,
    "config": null,
    "created_at": "2026-06-24 16:15:57.031403+00:00",
    "updated_at": "2026-06-24 16:15:57.031403+00:00"
  },
  {
    "id": "4fed025f-3262-48e8-b644-554719842741",
    "key": "***MASKED***",
    "description": null,
    "enabled": true,
    "rollout_percentage": 100,
    "scope": "global",
    "account_id": null,
    "config": null,
    "created_at": "2026-06-24 16:49:46.714393+00:00",
    "updated_at": "2026-06-24 16:49:46.714393+00:00"
  },
  {
    "id": "7fd5e227-ccff-4eb3-b412-abec9f24c7a9",
    "key": "***MASKED***",
    "description": null,
    "enabled": true,
    "rollout_percentage": 100,
    "scope": "global",
    "account_id": null,
    "config": null,
    "created_at": "2026-06-24 16:49:46.761583+00:00",
    "updated_at": "2026-06-24 16:49:46.761583+00:00"
  }
]
```

## `fit.fit_products`

```json
[
  {
    "id": "04a01c46-5fc9-4635-a982-3e757a31e5eb",
    "account_id": "53a085e2-1335-4fdc-9cc5-867365ac6a5b",
    "name": "Essential Cotton Tee",
    "category": "tshirt",
    "fit_type": "regular",
    "stretch_level": "medium",
    "override_size_chart": null,
    "metadata": {},
    "created_at": "2026-06-15 20:38:06.418882+00:00"
  },
  {
    "id": "d5d352be-aa85-4324-8bac-7057851f601b",
    "account_id": "53a085e2-1335-4fdc-9cc5-867365ac6a5b",
    "name": "Aesthetic Oversized Shirt",
    "category": "tshirt",
    "fit_type": "oversized",
    "stretch_level": "medium",
    "override_size_chart": null,
    "metadata": {},
    "created_at": "2026-06-15 20:38:06.605658+00:00"
  },
  {
    "id": "0339d40a-1352-4376-a3a8-57c9f63e4836",
    "account_id": "53a085e2-1335-4fdc-9cc5-867365ac6a5b",
    "name": "Signature Skinny Tee",
    "category": "tshirt",
    "fit_type": "slim",
    "stretch_level": "high",
    "override_size_chart": null,
    "metadata": {},
    "created_at": "2026-06-15 20:38:06.777997+00:00"
  }
]
```

## `fit.fit_shopify_connections`

```json
[
  {
    "id": "b1b2c3d4-e5f6-7890-1234-56789abcdef1",
    "account_id": "b7039ec1-edc1-4318-a6fd-cffa38719f7a",
    "shop_domain": "test.myshopify.com",
    "access_token": "***MASKED***",
    "scope": "read_products",
    "webhook_secret": "***MASKED***",
    "api_version": "2025-01",
    "connected_at": "2026-06-24 16:51:51.508799+00:00",
    "last_synced_at": null,
    "created_at": "2026-06-24 16:51:51.508799",
    "updated_at": "2026-06-24 16:51:51.508799"
  },
  {
    "id": "a0f0382b-8139-4591-ae77-53c3deee72f3",
    "account_id": "53a085e2-1335-4fdc-9cc5-867365ac6a5b",
    "shop_domain": "test-disabled-1782322198724.myshopify.com",
    "access_token": "***MASKED***",
    "scope": "",
    "webhook_secret": "***MASKED***",
    "api_version": "2025-01",
    "connected_at": "2026-06-24 17:29:59.660805+00:00",
    "last_synced_at": null,
    "created_at": "2026-06-24 17:29:59.660805",
    "updated_at": "2026-06-24 17:29:59.660805"
  },
  {
    "id": "df74d41f-09ed-4368-b751-dff2fb0a295d",
    "account_id": "53a085e2-1335-4fdc-9cc5-867365ac6a5b",
    "shop_domain": "test-enabled-1782322201080.myshopify.com",
    "access_token": "***MASKED***",
    "scope": "",
    "webhook_secret": "***MASKED***",
    "api_version": "2025-01",
    "connected_at": "2026-06-24 17:30:02.041040+00:00",
    "last_synced_at": null,
    "created_at": "2026-06-24 17:30:02.041040",
    "updated_at": "2026-06-24 17:30:02.041040"
  }
]
```

## `fit.fit_size_charts`

```json
[
  {
    "id": "dc4441ac-f65e-423a-b70b-b84601345583",
    "account_id": "53a085e2-1335-4fdc-9cc5-867365ac6a5b",
    "category": "tshirt",
    "gender": "female",
    "size_label": "XS",
    "min_height": null,
    "max_height": null,
    "min_weight": null,
    "max_weight": null,
    "min_bmi": "15",
    "max_bmi": "18.5",
    "sort_order": 1
  },
  {
    "id": "399c7c24-7def-4576-bac2-a8c4e376585b",
    "account_id": "53a085e2-1335-4fdc-9cc5-867365ac6a5b",
    "category": "tshirt",
    "gender": "female",
    "size_label": "S",
    "min_height": null,
    "max_height": null,
    "min_weight": null,
    "max_weight": null,
    "min_bmi": "18.5",
    "max_bmi": "21",
    "sort_order": 2
  },
  {
    "id": "92a0fb75-08d9-4b84-b6e3-92f41d71475b",
    "account_id": "53a085e2-1335-4fdc-9cc5-867365ac6a5b",
    "category": "tshirt",
    "gender": "female",
    "size_label": "M",
    "min_height": null,
    "max_height": null,
    "min_weight": null,
    "max_weight": null,
    "min_bmi": "21",
    "max_bmi": "24",
    "sort_order": 3
  }
]
```

## `fit.fit_tenant_configs`

```json
[
  {
    "id": "53a085e2-1335-4fdc-9cc5-867365ac6a5b",
    "account_id": "11111111-1111-1111-1111-111111111111",
    "settings": {
      "brandBias": 0
    },
    "widgetSettings": {},
    "created_at": "2026-06-15 20:38:02.775181+00:00",
    "updated_at": "2026-06-15 20:38:02.775181+00:00",
    "deleted_at": null
  },
  {
    "id": "d85a23b1-07a7-46aa-97ba-9c6340c53261",
    "account_id": "22222222-2222-2222-2222-222222222222",
    "settings": {
      "brandBias": 1
    },
    "widgetSettings": {},
    "created_at": "2026-06-15 20:38:02.954077+00:00",
    "updated_at": "2026-06-15 20:38:02.954077+00:00",
    "deleted_at": null
  }
]
```

## `fit.typeorm_migrations`

```json
[
  {
    "id": 1,
    "timestamp": 1781194179507,
    "name": "MigrateToTenantArchitecture1781194179507"
  },
  {
    "id": 2,
    "timestamp": 1781521947052,
    "name": "FitSchemaMigration1781521947052"
  },
  {
    "id": 4,
    "timestamp": 1781700262039,
    "name": "CoreIntegrationsPublic1781700262039"
  }
]
```

## `public._prisma_migrations`

```json
[
  {
    "id": "15376fc9-a0cb-4880-a6c1-e85404611b41",
    "checksum": "e8d4b565868fc83ccea3caa15284ff1c304cfa542d492dc048af7ae946035ad8",
    "finished_at": "2026-06-15 08:35:02.932428+00:00",
    "migration_name": "20260615083429_extensions",
    "logs": null,
    "rolled_back_at": null,
    "started_at": "2026-06-15 08:35:02.575521+00:00",
    "applied_steps_count": 1
  },
  {
    "id": "d32a29ee-e938-44da-8130-24a978d5b13c",
    "checksum": "c1ca4b0b194df3397e1720ff5fab77d5afbabdf7bcf9335879b66ae7aacf61cb",
    "finished_at": "2026-06-15 08:38:15.084925+00:00",
    "migration_name": "20260615083814_core_accounts",
    "logs": null,
    "rolled_back_at": null,
    "started_at": "2026-06-15 08:38:14.720643+00:00",
    "applied_steps_count": 1
  },
  {
    "id": "90a1ffbf-50e2-4152-a4e5-8c0d8438c718",
    "checksum": "6a0b5983defc51fa89b53dcccf88f6bf060de20dfcbcda3e75f16082a2255d20",
    "finished_at": "2026-06-15 08:47:59.387361+00:00",
    "migration_name": "20260615084758_identity_users",
    "logs": null,
    "rolled_back_at": null,
    "started_at": "2026-06-15 08:47:58.971890+00:00",
    "applied_steps_count": 1
  }
]
```

## `public.commerce_product_variants`

```json
[
  {
    "id": "1b80fd64-23b6-444f-8ef5-2d507eb0f75a",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "product_id": "bf40814b-a144-46ed-a822-d88f8ffb0e6d",
    "sku": "1405202101",
    "price_amount": 125000,
    "currency": "INR",
    "status": "active",
    "metadata": {
      "title": "S",
      "barcode": null,
      "externalVariantId": "43896937677020",
      "inventory_quantity": 0
    },
    "created_at": "2026-06-15 17:16:35.312283+00:00",
    "updated_at": "2026-06-15 17:16:35.312283+00:00",
    "deleted_at": null
  },
  {
    "id": "572aede3-9363-43c4-9f6e-f2a6f4ab6612",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "product_id": "bf40814b-a144-46ed-a822-d88f8ffb0e6d",
    "sku": "1405202101",
    "price_amount": 125000,
    "currency": "INR",
    "status": "active",
    "metadata": {
      "title": "M",
      "barcode": null,
      "externalVariantId": "43896308596956",
      "inventory_quantity": 0
    },
    "created_at": "2026-06-15 17:16:35.394620+00:00",
    "updated_at": "2026-06-15 17:16:35.394620+00:00",
    "deleted_at": null
  },
  {
    "id": "d96a5e6b-002e-44be-9d22-f6bb09b9863a",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "product_id": "bf40814b-a144-46ed-a822-d88f8ffb0e6d",
    "sku": "1405202101",
    "price_amount": 125000,
    "currency": "INR",
    "status": "active",
    "metadata": {
      "title": "L",
      "barcode": null,
      "externalVariantId": "43896308629724",
      "inventory_quantity": 0
    },
    "created_at": "2026-06-15 17:16:35.474374+00:00",
    "updated_at": "2026-06-15 17:16:35.474374+00:00",
    "deleted_at": null
  }
]
```

## `public.commerce_products`

```json
[
  {
    "id": "2c4c9dcd-d433-4502-ba0c-6897fda67eba",
    "account_id": "644529d7-c48a-40c4-a8b6-179d233eaf85",
    "store_id": "2e9b7bb1-9602-4384-85ca-92bbaab73cad",
    "name": "Product 3",
    "description": null,
    "status": "active",
    "metadata": {},
    "created_at": "2026-06-15 09:36:15.414000+00:00",
    "updated_at": "2026-06-15 09:36:15.414000+00:00",
    "deleted_at": null
  },
  {
    "id": "1c128646-2e55-497d-bfe7-10edd519986c",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "store_id": "25c8465d-90ce-42be-b980-fb6fdcf52e39",
    "name": "Gift Card Subscription",
    "description": null,
    "status": "draft",
    "metadata": {
      "tags": [],
      "handle": "gift-card-subscription",
      "vendor": "Thottil Maternity",
      "productType": "",
      "externalProductId": "9310439866588"
    },
    "created_at": "2026-06-15 18:11:57.032827+00:00",
    "updated_at": "2026-06-15 18:11:57.032827+00:00",
    "deleted_at": null
  },
  {
    "id": "24c90c8a-5be9-4077-a917-ccd1e6ee967c",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "store_id": "25c8465d-90ce-42be-b980-fb6fdcf52e39",
    "name": "ABUNDANCE  MAXI old",
    "description": null,
    "status": "draft",
    "metadata": {
      "tags": [],
      "handle": "abundance-maternity-feeding-georgette-maxi-dress",
      "vendor": "Thottil Maternity",
      "productType": "Maternity & Feeding Maxi",
      "externalProductId": "8030522540252"
    },
    "created_at": "2026-06-15 17:04:42.353827+00:00",
    "updated_at": "2026-06-15 17:16:40.092874+00:00",
    "deleted_at": null
  }
]
```

## `public.commerce_stores`

```json
[
  {
    "id": "2e9b7bb1-9602-4384-85ca-92bbaab73cad",
    "account_id": "644529d7-c48a-40c4-a8b6-179d233eaf85",
    "name": "Default Store",
    "status": "active",
    "metadata": {},
    "created_at": "2026-06-15 09:36:15.370000+00:00",
    "updated_at": "2026-06-15 09:36:15.370000+00:00",
    "deleted_at": null
  },
  {
    "id": "25c8465d-90ce-42be-b980-fb6fdcf52e39",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "name": "MomzCradle Shopify",
    "status": "active",
    "metadata": {
      "apiVersion": "2025-07",
      "shopDomain": "thottil-maternity.myshopify.com",
      "accessToken": "***MASKED***"
    },
    "created_at": "2026-06-15 16:55:31.763559+00:00",
    "updated_at": "2026-06-17 14:02:48.670603+00:00",
    "deleted_at": null
  }
]
```

## `public.core_account_types`

```json
[
  {
    "id": "35e51156-7d80-44b8-a4f0-fa28c835c9c0",
    "code": "PLATFORM",
    "description": "PLATFORM Account Type",
    "created_at": "2026-06-15 09:10:33.469253+00:00",
    "updated_at": "2026-06-15 09:10:33.469253+00:00"
  },
  {
    "id": "1b8a5a48-7dd4-49ce-be89-c969f52f7516",
    "code": "BRAND",
    "description": "BRAND Account Type",
    "created_at": "2026-06-15 09:10:33.533259+00:00",
    "updated_at": "2026-06-15 09:10:33.533259+00:00"
  },
  {
    "id": "7b39a86d-7f19-499d-8158-14262840c793",
    "code": "SHIPPING_PARTNER",
    "description": "SHIPPING_PARTNER Account Type",
    "created_at": "2026-06-15 09:10:33.579508+00:00",
    "updated_at": "2026-06-15 09:10:33.579508+00:00"
  }
]
```

## `public.core_accounts`

```json
[
  {
    "id": "b7039ec1-edc1-4318-a6fd-cffa38719f7a",
    "name": "Jane Shop",
    "type": "BRAND",
    "status": "active",
    "metadata": {},
    "created_at": "2026-06-15 09:31:09.035000+00:00",
    "updated_at": "2026-06-15 09:31:09.035000+00:00",
    "deleted_at": null
  },
  {
    "id": "644529d7-c48a-40c4-a8b6-179d233eaf85",
    "name": "Account 3",
    "type": "BRAND",
    "status": "active",
    "metadata": {},
    "created_at": "2026-06-15 09:36:15.098000+00:00",
    "updated_at": "2026-06-15 09:36:15.098000+00:00",
    "deleted_at": null
  },
  {
    "id": "0d4825bd-3d75-4d1d-b421-07ba079eeeed",
    "name": "Account 4",
    "type": "BRAND",
    "status": "active",
    "metadata": {},
    "created_at": "2026-06-15 09:36:25.086000+00:00",
    "updated_at": "2026-06-15 09:36:25.086000+00:00",
    "deleted_at": null
  }
]
```

## `public.core_integration_credentials`

```json
[
  {
    "id": "29b6ce01-710d-4f84-b770-1f41bbd61ab4",
    "integration_id": "b1b2c3d4-e5f6-7890-1234-56789abcdef1",
    "encrypted_payload": "***MASKED***",
    "encryption_version": "v1-aes-256-gcm",
    "scopes": ["read_products"],
    "expires_at": null,
    "connected_at": "2026-06-24 16:51:51.599080+00:00"
  },
  {
    "id": "aacd8b84-4c0e-4a31-88af-0d3801b340f5",
    "integration_id": "df74d41f-09ed-4368-b751-dff2fb0a295d",
    "encrypted_payload": "***MASKED***",
    "encryption_version": "v1-aes-256-gcm",
    "scopes": [],
    "expires_at": null,
    "connected_at": "2026-06-24 17:30:02.041000+00:00"
  }
]
```

## `public.core_integrations`

```json
[
  {
    "id": "b1b2c3d4-e5f6-7890-1234-56789abcdef1",
    "account_id": "b7039ec1-edc1-4318-a6fd-cffa38719f7a",
    "provider": "SHOPIFY",
    "status": "ACTIVE",
    "external_id": "test.myshopify.com",
    "metadata": {},
    "created_at": "2026-06-24 16:51:51.551404+00:00",
    "updated_at": "2026-06-24 16:51:51.551404+00:00",
    "deleted_at": null
  },
  {
    "id": "df74d41f-09ed-4368-b751-dff2fb0a295d",
    "account_id": "53a085e2-1335-4fdc-9cc5-867365ac6a5b",
    "provider": "SHOPIFY",
    "status": "ACTIVE",
    "external_id": "test-enabled-1782322201080.myshopify.com",
    "metadata": {
      "api_version": "2025-01"
    },
    "created_at": "2026-06-24 17:30:02.300837+00:00",
    "updated_at": "2026-06-24 17:30:02.300837+00:00",
    "deleted_at": null
  }
]
```

## `public.core_notification_channels`

```json
[
  {
    "id": "1cd2a65a-cc28-4077-be6d-23fb4bd141d7",
    "code": "EMAIL",
    "description": "EMAIL Channel",
    "created_at": "2026-06-15 09:10:33.960223+00:00",
    "updated_at": "2026-06-15 09:10:33.960223+00:00"
  },
  {
    "id": "9386a0d1-d2fc-416b-bf29-3c95da648651",
    "code": "SMS",
    "description": "SMS Channel",
    "created_at": "2026-06-15 09:10:34.007888+00:00",
    "updated_at": "2026-06-15 09:10:34.007888+00:00"
  },
  {
    "id": "bef1e0fd-a441-4b9c-bc5b-7425b5852797",
    "code": "WHATSAPP",
    "description": "WHATSAPP Channel",
    "created_at": "2026-06-15 09:10:34.047899+00:00",
    "updated_at": "2026-06-15 09:10:34.047899+00:00"
  }
]
```

## `public.core_system_modules`

```json
[
  {
    "id": "e5d13f3c-4376-4785-b882-3f3545f87328",
    "code": "ETA",
    "description": "ETA Module",
    "created_at": "2026-06-15 09:10:33.704142+00:00",
    "updated_at": "2026-06-15 09:10:33.704142+00:00"
  },
  {
    "id": "895e6bba-9deb-4ac5-b660-1715bb9b361e",
    "code": "RETURNS",
    "description": "RETURNS Module",
    "created_at": "2026-06-15 09:10:33.748008+00:00",
    "updated_at": "2026-06-15 09:10:33.748008+00:00"
  },
  {
    "id": "01df9ddc-2c45-48c9-acd8-be9fbb7a6593",
    "code": "TRYON",
    "description": "TRYON Module",
    "created_at": "2026-06-15 09:10:33.788295+00:00",
    "updated_at": "2026-06-15 09:10:33.788295+00:00"
  }
]
```

## `public.customers_customer_profiles`

```json
[
  {
    "id": "68bd37a4-4cf1-4170-a67a-069fd9b726f6",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "customer_id": "59f9cc28-cb15-4e0d-84fd-29a860b2c986",
    "preferences": {},
    "metadata": {
      "source": "shopify_momzcradle_enrichment",
      "shopify": {
        "tax_exempt": false,
        "verified_email": true
      },
      "marketing": {
        "sms_consent": false,
        "email_consent": false
      },
      "metafields": {},
      "preferences": {
        "locale": "en"
      }
    },
    "created_at": "2025-02-06 04:11:37+00:00",
    "updated_at": "2026-06-20 14:13:09.161679+00:00"
  },
  {
    "id": "4fb7cc1a-30a0-46c4-9e5a-f35edb7584d0",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "customer_id": "72c135e8-64ac-44d7-8f61-59621e225f67",
    "preferences": {},
    "metadata": {
      "source": "shopify_momzcradle_enrichment",
      "shopify": {
        "tax_exempt": false,
        "verified_email": true
      },
      "marketing": {
        "sms_consent": false,
        "email_consent": false
      },
      "metafields": {},
      "preferences": {
        "locale": "en"
      }
    },
    "created_at": "2026-06-14 05:00:00+00:00",
    "updated_at": "2026-06-20 14:32:12.984241+00:00"
  },
  {
    "id": "13069ca7-fcf2-4f82-9db9-f12b63f8ffcc",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "customer_id": "c24b8fc1-b0dc-46f2-a72f-56a6750a31a6",
    "preferences": {},
    "metadata": {
      "source": "shopify_momzcradle_enrichment",
      "shopify": {
        "tax_exempt": false,
        "verified_email": true
      },
      "marketing": {
        "sms_consent": false,
        "email_consent": false
      },
      "metafields": {},
      "preferences": {
        "locale": "en"
      }
    },
    "created_at": "2026-06-20 05:30:33+00:00",
    "updated_at": "2026-06-20 15:30:02.598109+00:00"
  }
]
```

## `public.customers_customers`

```json
[
  {
    "id": "7d681f1d-9f2d-4394-bf3e-1c68ba74c1dc",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "email": "radhavishala@gmail.com",
    "phone": null,
    "first_name": "Radha",
    "last_name": "Ram",
    "status": "active",
    "metadata": {
      "tags": "",
      "source": "shopify_momzcradle_migration",
      "shopify": {
        "created_at": "2026-06-18T06:38:01+05:30",
        "updated_at": "2026-06-19T20:12:04+05:30"
      },
      "commerce": {
        "total_spent": "0.00",
        "orders_count": 0,
        "last_order_id": null,
        "last_order_name": null
      },
      "currency": "INR",
      "addresses": [],
      "enrichment": {
        "version": 1,
        "enriched_at": "2026-06-20T14:39:33.768Z"
      },
      "default_address": null,
      "migration_snapshot": {
        "tags": "",
        "currency": "INR",
        "shopify_customer_id": "9676812091612"
      },
      "shopify_graphql_id": "gid://shopify/Customer/9676812091612",
      "shopify_customer_id": "9676812091612"
    },
    "created_at": "2026-06-18 01:08:01+00:00",
    "updated_at": "2026-06-20 14:39:37.772417+00:00",
    "deleted_at": null
  },
  {
    "id": "e1d9fd5c-12f8-4abe-8d70-8dc5770f323e",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "email": "nivedithaarunbharath@gmail.com",
    "phone": null,
    "first_name": "Niveditha",
    "last_name": "S",
    "status": "active",
    "metadata": {
      "tags": "",
      "source": "shopify_momzcradle_migration",
      "shopify": {
        "created_at": "2026-06-19T17:17:09+05:30",
        "updated_at": "2026-06-19T17:27:03+05:30"
      },
      "commerce": {
        "total_spent": "0.00",
        "orders_count": 0,
        "last_order_id": null,
        "last_order_name": null
      },
      "currency": "INR",
      "addresses": [],
      "enrichment": {
        "version": 1,
        "enriched_at": "2026-06-20T15:52:47.623Z"
      },
      "default_address": null,
      "migration_snapshot": {
        "tags": "",
        "currency": "INR",
        "shopify_customer_id": "9680261120220"
      },
      "shopify_graphql_id": "gid://shopify/Customer/9680261120220",
      "shopify_customer_id": "9680261120220"
    },
    "created_at": "2026-06-19 11:47:09+00:00",
    "updated_at": "2026-06-20 15:52:51.680315+00:00",
    "deleted_at": null
  },
  {
    "id": "e8cc25e8-5c06-4998-88af-d7b85a81bebc",
    "account_id": "00000000-0000-0000-0000-000000000001",
    "email": "dhivya.navneeth@gmail.com",
    "phone": null,
    "first_name": null,
    "last_name": null,
    "status": "active",
    "metadata": {
      "tags": "",
      "source": "shopify_momzcradle_migration",
      "shopify": {
        "created_at": "2026-06-19T15:43:03+05:30",
        "updated_at": "2026-06-20T14:58:33+05:30"
      },
      "commerce": {
        "total_spent": "0.00",
        "orders_count": 0,
        "last_order_id": null,
        "last_order_name": null
      },
      "currency": "INR",
      "addresses": [],
      "enrichment": {
        "version": 1,
        "enriched_at": "2026-06-20T15:57:58.547Z"
      },
      "default_address": null,
      "migration_snapshot": {
        "tags": "",
        "currency": "INR",
        "shopify_customer_id": "9680009920732"
      },
      "shopify_graphql_id": "gid://shopify/Customer/9680009920732",
      "shopify_customer_id": "9680009920732"
    },
    "created_at": "2026-06-19 10:13:03+00:00",
    "updated_at": "2026-06-20 15:58:02.586435+00:00",
    "deleted_at": null
  }
]
```

## `public.fit_admins`

```json
[
  {
    "id": "8cab72a8-3a21-4446-93c4-8373edbd3b6b",
    "email": "test-disabled-1782321889888@fitintelligence.com",
    "password": "***MASKED***",
    "created_at": "2026-06-24 17:24:50.889903",
    "updated_at": "2026-06-24 17:24:50.889903"
  }
]
```

## `public.identity_permissions`

```json
[
  {
    "id": "b49475af-8897-49e8-a4cd-a1dac293831c",
    "code": "users.manage",
    "description": "Allows users.manage",
    "metadata": {},
    "created_at": "2026-06-15 09:10:34.197872+00:00",
    "updated_at": "2026-06-15 09:10:34.197872+00:00",
    "deleted_at": null
  },
  {
    "id": "03351d87-aa21-4889-b1a8-1b135032c790",
    "code": "products.manage",
    "description": "Allows products.manage",
    "metadata": {},
    "created_at": "2026-06-15 09:10:34.245416+00:00",
    "updated_at": "2026-06-15 09:10:34.245416+00:00",
    "deleted_at": null
  },
  {
    "id": "e02fa8f6-b2b9-4bcc-a189-62556df0b510",
    "code": "returns.manage",
    "description": "Allows returns.manage",
    "metadata": {},
    "created_at": "2026-06-15 09:10:34.285675+00:00",
    "updated_at": "2026-06-15 09:10:34.285675+00:00",
    "deleted_at": null
  }
]
```

## `public.identity_role_permissions`

```json
[
  {
    "role_id": "0c2f4a08-4505-4472-8598-870bc6db6c09",
    "permission_id": "b49475af-8897-49e8-a4cd-a1dac293831c",
    "created_at": "2026-06-15 09:10:35.314653+00:00"
  },
  {
    "role_id": "0c2f4a08-4505-4472-8598-870bc6db6c09",
    "permission_id": "03351d87-aa21-4889-b1a8-1b135032c790",
    "created_at": "2026-06-15 09:10:35.423975+00:00"
  },
  {
    "role_id": "0c2f4a08-4505-4472-8598-870bc6db6c09",
    "permission_id": "e02fa8f6-b2b9-4bcc-a189-62556df0b510",
    "created_at": "2026-06-15 09:10:35.504897+00:00"
  }
]
```

## `public.identity_roles`

```json
[
  {
    "id": "0c2f4a08-4505-4472-8598-870bc6db6c09",
    "name": "OWNER",
    "description": "OWNER Role",
    "metadata": {},
    "created_at": "2026-06-15 09:10:34.435629+00:00",
    "updated_at": "2026-06-15 09:10:34.435629+00:00",
    "deleted_at": null
  },
  {
    "id": "d6ae20e8-7d14-43c2-a77f-6a38fa4429b1",
    "name": "MANAGER",
    "description": "MANAGER Role",
    "metadata": {},
    "created_at": "2026-06-15 09:10:34.824706+00:00",
    "updated_at": "2026-06-15 09:10:34.824706+00:00",
    "deleted_at": null
  },
  {
    "id": "87698978-8c6b-40e5-9927-01a3e40f0ab6",
    "name": "DEVELOPER",
    "description": "DEVELOPER Role",
    "metadata": {},
    "created_at": "2026-06-15 09:10:34.956765+00:00",
    "updated_at": "2026-06-15 09:10:34.956765+00:00",
    "deleted_at": null
  }
]
```

## `public.identity_user_accounts`

```json
[
  {
    "user_id": "73124545-ffa2-42b6-ad74-53157fc73234",
    "account_id": "b7039ec1-edc1-4318-a6fd-cffa38719f7a",
    "created_at": "2026-06-15 09:31:09.084000+00:00"
  },
  {
    "user_id": "d49698a0-5fdd-41e2-8162-96f5b352dd9c",
    "account_id": "644529d7-c48a-40c4-a8b6-179d233eaf85",
    "created_at": "2026-06-15 09:36:15.145000+00:00"
  },
  {
    "user_id": "2d6c9417-f381-4ae2-8f02-dcd67712f442",
    "account_id": "0d4825bd-3d75-4d1d-b421-07ba079eeeed",
    "created_at": "2026-06-15 09:36:25.126000+00:00"
  }
]
```

## `public.identity_user_roles`

```json
[
  {
    "user_id": "73124545-ffa2-42b6-ad74-53157fc73234",
    "role_id": "0c2f4a08-4505-4472-8598-870bc6db6c09",
    "account_id": "b7039ec1-edc1-4318-a6fd-cffa38719f7a",
    "created_at": "2026-06-15 09:31:09.140000+00:00"
  },
  {
    "user_id": "d49698a0-5fdd-41e2-8162-96f5b352dd9c",
    "role_id": "0c2f4a08-4505-4472-8598-870bc6db6c09",
    "account_id": "644529d7-c48a-40c4-a8b6-179d233eaf85",
    "created_at": "2026-06-15 09:36:15.188000+00:00"
  },
  {
    "user_id": "2d6c9417-f381-4ae2-8f02-dcd67712f442",
    "role_id": "0c2f4a08-4505-4472-8598-870bc6db6c09",
    "account_id": "0d4825bd-3d75-4d1d-b421-07ba079eeeed",
    "created_at": "2026-06-15 09:36:25.169000+00:00"
  }
]
```

## `public.identity_users`

```json
[
  {
    "id": "73124545-ffa2-42b6-ad74-53157fc73234",
    "email": "owner2@example.com",
    "password_hash": "***MASKED***",
    "name": "Jane Doe",
    "status": "active",
    "metadata": {},
    "created_at": "2026-06-15 09:31:08.965000+00:00",
    "updated_at": "2026-06-15 09:31:08.965000+00:00",
    "deleted_at": null,
    "failed_login_attempts": 0,
    "locked_until": null,
    "reset_token_expires_at": null,
    "reset_token_hash": null,
    "token_version": "***MASKED***",
    "user_type": "BRAND"
  },
  {
    "id": "d49698a0-5fdd-41e2-8162-96f5b352dd9c",
    "email": "owner3@example.com",
    "password_hash": "***MASKED***",
    "name": "User 3",
    "status": "active",
    "metadata": {},
    "created_at": "2026-06-15 09:36:15.044000+00:00",
    "updated_at": "2026-06-15 09:36:15.044000+00:00",
    "deleted_at": null,
    "failed_login_attempts": 0,
    "locked_until": null,
    "reset_token_expires_at": null,
    "reset_token_hash": null,
    "token_version": "***MASKED***",
    "user_type": "BRAND"
  },
  {
    "id": "2d6c9417-f381-4ae2-8f02-dcd67712f442",
    "email": "owner4@example.com",
    "password_hash": "***MASKED***",
    "name": "User 4",
    "status": "active",
    "metadata": {},
    "created_at": "2026-06-15 09:36:25.043000+00:00",
    "updated_at": "2026-06-15 09:36:25.043000+00:00",
    "deleted_at": null,
    "failed_login_attempts": 0,
    "locked_until": null,
    "reset_token_expires_at": null,
    "reset_token_hash": null,
    "token_version": "***MASKED***",
    "user_type": "BRAND"
  }
]
```
