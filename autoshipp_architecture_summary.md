# AutoShipp Architecture Summary

> **Source Documents:** Full-architecture-file-autoshipp.md + chat-with-architect-gpt.md + AES-000 through AES-035 (36 part-specific specification files)

---

## What is AutoShipp?

AutoShipp is a **multi-tenant Commerce Intelligence Platform** — not a single SaaS product. It acts like an **operating system for commerce businesses**, providing a shared foundation through which multiple independently deployable products are sold and consumed.

> "Build the platform once. Build products forever."

---

## Core Philosophy

The platform is structured as two distinct layers:

| Layer | Responsibility |
|---|---|
| **Platform Layer** | Identity, Orgs, Commerce, Billing, Wallet, Marketplace, Audit, Notifications, Feature Flags, Integrations |
| **Product Layer** | Fit Intelligence, Delivery ETA, Returns, AI Assistant, Virtual Try-On, Shipping, Future Products |

Products **consume** the platform. They never replace it.

---

## Organization Hierarchy (3 Types)

```text
AutoShipp Platform
    │
    ├── Direct Brand (merchant)
    │
    └── Aggregator (strategic partner: Shiprocket, Delhivery, etc.)
              │
              ├── Managed Brand A
              ├── Managed Brand B
              └── Managed Brand C
```

- **Platform** — full admin authority, owns everything
- **Aggregator** — manages brands, purchases products, receives consolidated invoices
- **Brand** — consumes products, sees only their own data

---

## Technology Stack (Final — Locked)

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 + React 19 + Tailwind CSS 4 + shadcn/ui + TypeScript 5 |
| Backend | NestJS (Platform API) |
| ORM | Prisma (one client per service) |
| Database | PostgreSQL via Neon (single DB, multi-schema) |
| Cache | Redis |
| Queue | BullMQ |
| Storage | None (Platform has no binary storage, reports are dynamic) |
| Authentication | JWT + HttpOnly Cookies |
| Observability | Pino + Prometheus + Grafana + OpenTelemetry + Sentry |
| CI/CD | GitHub Actions + Docker + Nginx |

---

## Database Architecture: Shared DB, Domain-Owned Schemas

**One PostgreSQL database. Multiple schemas. One owner per schema.**

```
autoshipp_platform (Neon PostgreSQL)
│
├── Platform Schemas (owned by Platform API, R/W)
│   ├── identity
│   ├── organization
│   ├── commerce
│   ├── customer
│   ├── marketplace
│   ├── billing
│   ├── wallet
│   ├── integration
│   ├── audit
│   ├── notification
│   ├── feature_flag
│   └── platform
│
└── Product Schemas (owned by respective services)
    ├── fit         ← Fit Service (RW only to fit.*)
    ├── eta         ← ETA Service
    ├── returns     ← Returns Service
    ├── tryon       ← Try-On Service
    ├── assistant   ← AI Assistant
    └── shipping    ← Shipping Service
```

### Read/Write Rules

- Products may **READ** shared platform schemas (users, orgs, orders, etc.)
- Products may **NEVER WRITE** platform schemas
- Products may **NEVER WRITE** each other's schemas
- Cross-product data → accessed via API, never raw SQL

---

## Key Domain Schemas (Summary)

### `identity` — IAM Domain
- Users (global, immutable UUID), Sessions, Roles, Permissions, Memberships
- **Guard Pipeline:** `JwtAuthGuard → OrganizationGuard → PermissionGuard`
- Token versioning (not blacklists) for instant revocation
- Future ready: MFA, SSO, OAuth2, API Keys, SCIM

### `organization` — Org Domain
- Organizations, hierarchy, transfers, settings, contacts, domains
- Hierarchy modeled via `organization_relationships` (not a `parent_id` column)
- Brands are immutable identities; ownership can transfer, identity never changes

### `commerce` — Single Commerce Foundation
- Stores, Products, Variants, Collections, Orders, Order Items, Inventory
- **One sync pipeline** via Commerce Sync Service; products NEVER sync Shopify independently
- Supports Shopify, WooCommerce, Magento, Custom APIs

### `marketplace` — Product Catalog & Licensing
- Product Registry → Editions → Features → Assignments → Entitlements → Runtime Access
- Subscriptions ≠ Access (billing and licensing are intentionally separated)
- Every product always visible (Available / Purchased / Locked states, never hidden)

### `billing` — Commercial Engine
- Plans, Prices, Subscriptions, Invoices, Invoice Items, Payments, Credits
- Aggregators receive **one consolidated invoice** with per-brand, per-product line items
- Billing never determines runtime access (Marketplace does)

### `wallet` — Ledger-First Financial System
- **Append-only transaction ledger** (balance is derived, never stored)
- Supports: top-ups, credits, usage deductions, reservations, refunds
- Reservation model for AI requests to prevent double-spending
- Products request debits through Platform APIs, never write wallet directly

### `integration` — Universal Provider Framework
- Provider registry + Organization Connections (not one table per provider)
- Supports: Shopify, Shiprocket, OpenAI, Razorpay, Resend, etc.
- Credentials stored encrypted (envelope encryption); never plaintext

---

## Authentication & Authorization

```
Login → Validate password → Check status → Token version check
→ Issue JWT (sub, org_id, org_type, role, token_version)
→ HttpOnly Cookie
→ GET /account/context (returns org, membership, role, permissions, modules, feature_flags)
```

**RBAC Roles:**
- Platform: `OWNER`, `MANAGER`, `DEVELOPER`, `SUPPORT`
- Aggregator: `AGGREGATOR_OWNER`, `AGGREGATOR_ADMIN`, `AGGREGATOR_SUPPORT`, `AGGREGATOR_VIEWER`
- Brand: `BRAND_ADMIN`, `BRAND_VIEWER`

**Permission Pattern:** `resource:action` (e.g., `fit:read`, `billing:manage`, `platform:admin`)

**Key Security Decisions:**
- Only Platform OWNER can create Platform users (enforced in service layer, not just guards)
- Role changes take effect immediately via session invalidation
- Sessions table for per-device revocation

---

## Platform API (NestJS)

- REST-first, `/api/v1` versioned
- Standard response format: `{ success, data, meta }` or `{ success, error }`
- Rate limiting: 100/min (public), 1000/min (authenticated)
- `X-Correlation-ID` on every request for end-to-end tracing
- `Idempotency-Key` header for payment/subscription operations
- Never executes product logic; products expose their own APIs

---

## Frontend Architecture (Next.js)

**Single app, 3 route groups:**
```
app/
├── (auth)          → Login, Password Reset
├── (platform)      → Platform admin dashboard
├── (aggregator)    → Aggregator management dashboard
└── (brand)         → Brand product dashboard
```

**Dynamic Navigation:** Sidebar generated from Account Context → Marketplace Assignments → Permissions → Feature Flags. Products appear automatically when assigned; no hardcoded menus.

**Stack:** Next.js 16 App Router, Server Components by default, TanStack Query, React Hook Form + Zod, shadcn/ui, Lucide Icons.

---

## Event & Worker Architecture

- **BullMQ** for async event processing (topic exchanges + dead letter queues)
- **Background Workers**: Commerce Sync, Billing Jobs, Notification Delivery, Cleanup
- Workers are stateless and independently deployable
- Products publish events; Platform consumes and dispatches

---

## Multi-Tenancy Strategy

- **Shared schema** with `organization_id` scoping (not per-tenant databases)
- Service-layer enforcement + DB permissions (PostgreSQL roles per service)
- Future: PostgreSQL Row-Level Security for high-risk tables
- Platform staff bypass tenant scoping; Brand users are strictly scoped

---

## Immutable Architecture Principles (IP-001 to IP-010)

| # | Principle |
|---|---|
| IP-001 | Platform owns shared capabilities; products extend it |
| IP-002 | Single source of truth — no duplicated business entities |
| IP-003 | Products own only their own intelligence |
| IP-004 | Authentication is centralized in the Platform |
| IP-005 | Commerce enters platform exactly once (Commerce Sync) |
| IP-006 | Every product is independently deployable |
| IP-007 | Every database object has one owner |
| IP-008 | Every API has one owner |
| IP-009 | Security is an architectural property, not an afterthought |
| IP-010 | Every service is observable from day one |

---

## Architecture Rules (AR-001 to AR-010)

1. One PostgreSQL, multiple schemas
2. Products own their own schema
3. Products may read shared platform schemas
4. Products NEVER write another product's schema
5. Platform owns all shared business domains
6. Cross-product logic accessed through APIs
7. Products NEVER duplicate commerce synchronization
8. Billing is independent from licensing/access
9. Wallet belongs to organizations, never users
10. Platform API is the Control Plane, not an API Gateway

---

## Business Model

- **Marketplace**: Products sold independently; always visible (never hidden)
- **Subscription → Assignment → Entitlement → Runtime Access** (4 separate layers)
- **Aggregator Billing**: One invoice to aggregator with per-brand, per-product breakdown
- **Wallet Credits**: Prepaid credit model for AI/usage-based consumption
- **Product Editions**: Starter / Professional / Enterprise — configuration only, no code changes

---

## Security Architecture

- OWASP Top 10 + ASVS compliance
- Defense in Depth + Zero Trust + Least Privilege
- All credentials encrypted at rest (envelope encryption)
- HttpOnly JWT cookies (no localStorage)
- CSP + CSRF + Helmet headers
- Rate limiting (Redis-backed)
- Audit logging for every write operation
- Virus scanning on all uploads
- Signed URLs for file downloads

---

## Performance Targets

| Metric | Target |
|---|---|
| API Response | < 200ms |
| Dashboard Load | < 2 sec |
| Health Check | < 1 sec |
| Queue Processing | < 2 sec |
| Cache Hit | < 2ms |

---

## Current Build Status & Phase Plan

Based on `chat-with-architect-gpt.md` (the original planning conversation):

| Phase | Goal | Status |
|---|---|---|
| Phase 0 | DB migrations, seed roles/permissions/modules | Planned |
| Phase 1 | Auth & Shell (JWT guards, Account Context, route guards, dynamic sidebar) | **Highest Priority** |
| Phase 2 | Brand Dashboard (Fit, Orders, Settings) | Next |
| Phase 3 | Platform Dashboard (Accounts, Module Toggles, Users) | Next |
| Phase 4 | Remaining Products (ETA, Returns, AI, Try-On) | Future |
| Phase 5 | Automated Onboarding (POST /admin/onboard, Nodemailer) | Future |

---

## Open Items (from original planning)

> [!WARNING]
> These were flagged as pre-production requirements before brand onboarding:

1. **Role caching** — Role changes should take immediate effect (remove role from JWT; fetch from DB/Redis in guard)
2. **Session table** — Alongside token_version for per-device logout and audit trail
3. **Audit logging** — Every admin action must be logged
4. **Centralized module registry** — Single source of truth for product metadata (code, label, icon, route, permission) in frontend
5. **Tenant scope middleware** — Prevent accidental cross-account data access via a `TenantContext` pattern
6. **Permission caching** — Short TTL Redis cache to avoid joining roles/permissions on every request
7. **GRANT permissions tightening** — Replace GRANT ALL with fine-grained DB role permissions before production

---

## What Makes This Architecture Excellent

1. **No data duplication** — Orders, customers, products exist exactly once in the commerce schema; all products read from the same foundation
2. **Commerce sync is centralized** — One pipeline for Shopify/WooCommerce/Magento, not 5 separate connections per product
3. **Billing ≠ Access** — An unpaid invoice doesn't automatically revoke access; these are managed independently
4. **Wallet is a ledger** — Balance is always derivable from immutable transactions; never stored as a mutable field
5. **Aggregator model built-in** — Not bolted on; the hierarchy is a first-class architectural citizen
6. **Future-proof extensibility** — Adding a new product requires: new schema + new service + product registration + product manifest. No platform redesign.
7. **35+ locked decisions (AES-000 through AES-035)** — Every major decision is documented, traceable, and immutable unless explicitly revised via ADR process
