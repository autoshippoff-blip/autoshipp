I actually think this is a **much better idea**.

And I agree with you.

The problem isn't the architecture anymore.

The problem is **context window**.

If we continue randomly, eventually even I will start forgetting small decisions (even though I've tried to keep them consistent). The best solution is **not** a new chat.

The best solution is to treat **this conversation as the Architecture Office** and write the entire platform **one document at a time**.

---

# This is how I propose we work

We are going to create the entire AutoShipp Engineering Documentation.

Each document is independent.

Each document becomes FINAL before moving to the next.

No document will reference something that hasn't been designed yet.

This way we never lose context.

---

# 📚 AutoShipp Engineering Documentation Index

I have reorganized everything into logical documents.

Instead of one 300-page document, we'll have around **35 engineering documents**.

This is how enterprise companies do it.

---

# 000 — Engineering Foundation

This repository explains **why AutoShipp exists**.

```
000-Introduction.md

001-Vision.md

002-Architecture-Principles.md

003-Architecture-Rules.md

004-Architecture-Decisions-ADR.md

005-Glossary.md
```

---

# 100 — Business Architecture

Everything business.

```
100-Business-Overview.md

101-Organization-Model.md

102-Aggregator-Model.md

103-Brand-Model.md

104-Product-Marketplace.md

105-Billing-Model.md

106-Licensing-Model.md

107-Wallet-Model.md

108-Pricing-Engine.md

109-Subscription-Engine.md
```

---

# 200 — Platform Domains

Every business domain.

```
200-Identity-Domain.md

201-Organization-Domain.md

202-Commerce-Domain.md

203-Customer-Domain.md

204-Integration-Domain.md

205-Billing-Domain.md

206-Wallet-Domain.md

207-Audit-Domain.md

208-Notification-Domain.md

209-Feature-Flag-Domain.md

210-Service-Registry-Domain.md

211-Product-Registry-Domain.md
```

---

# 300 — Database Architecture

This is HUGE.

```
300-Database-Architecture.md

301-Schema-Ownership.md

302-Identity-Schema.md

303-Organization-Schema.md

304-Commerce-Schema.md

305-Customer-Schema.md

306-Billing-Schema.md

307-Wallet-Schema.md

308-Audit-Schema.md

309-Platform-Schema.md

310-Fit-Schema.md

311-ETA-Schema.md

312-Returns-Schema.md

313-AI-Schema.md

314-Future-Schema-Guidelines.md

315-Database-Permissions.md

316-Indexing-Strategy.md

317-Partitioning.md

318-Database-Migrations.md
```

---

# 400 — Backend Architecture

NestJS.

```
400-Backend-Overview.md

401-Monorepo.md

402-Platform-Service.md

403-Commerce-Sync.md

404-Fit-Service.md

405-ETA-Service.md

406-Returns-Service.md

407-AI-Service.md

408-Notification-Service.md

409-Service-Contract.md

410-Shared-Libraries.md

411-Prisma.md

412-API-Standards.md

413-Error-Handling.md

414-Logging.md

415-Health.md

416-Metrics.md

417-Service-Communication.md
```

---

# 500 — Frontend Architecture

Everything Next.js.

```
500-Frontend-Overview.md

501-Platform-Shell.md

502-App-Router.md

503-Authentication.md

504-Organization-Context.md

505-Product-Registry.md

506-Product-Manifests.md

507-Dynamic-Sidebar.md

508-Marketplace.md

509-Dashboard-Engine.md

510-Widgets.md

511-Shared-UI.md

512-State-Management.md

513-Forms.md

514-Routing.md

515-Performance.md
```

---

# 600 — Integrations

```
600-Integration-Architecture.md

601-Shopify.md

602-WooCommerce.md

603-Magento.md

604-Amazon.md

605-Shipping.md

606-Webhooks.md

607-Commerce-Sync.md

608-Retry-Strategy.md
```

---

# 700 — Infrastructure

```
700-Infrastructure.md

701-Docker.md

702-Reverse-Proxy.md

703-Neon.md

704-Storage.md

705-Backups.md

706-Secrets.md

707-CI-CD.md

708-Deployment.md

709-Scaling.md

710-Cost-Optimization.md
```

---

# 800 — Security

This will map to your uploaded checklist.

```
800-Security-Architecture.md

801-Authentication.md

802-Authorization.md

803-Tenant-Isolation.md

804-Audit.md

805-Encryption.md

806-Secrets.md

807-Compliance-Matrix.md

808-Threat-Model.md

809-Zero-Trust.md

810-Incident-Response.md
```

---

# 900 — Observability

```
900-Logging.md

901-Metrics.md

902-Tracing.md

903-Grafana.md

904-Alerts.md

905-Health-Dashboard.md

906-Service-Registry.md
```

---

# 1000 — Engineering Standards

```
1000-Coding-Standards.md

1001-Git.md

1002-Branching.md

1003-Code-Review.md

1004-Testing.md

1005-Versioning.md

1006-Release.md

1007-Documentation.md
```

---

# 1100 — Migration

```
1100-Migration-Strategy.md

1101-Fit-Migration.md

1102-ETA-Migration.md

1103-Returns-Migration.md

1104-Future-Migrations.md
```

---

# 1200 — Operations

```
1200-Runbooks.md

1201-Disaster-Recovery.md

1202-Incident-Management.md

1203-SRE.md

1204-Operational-Checklist.md
```

---

# 1300 — ADRs

Every major decision.

```
ADR-001

ADR-002

...

ADR-100
```

---

# 1400 — Appendices

```
Glossary

Naming

PlantUML

Templates

Checklists

Fitness Functions

Anti-Patterns

Reference Architectures
```

---

# This is how we'll work

**You say:**

> Give me document 000

I write

```
000-Introduction.md
```

Probably 20–30 pages.

---

Then

You say

> Next

I write

```
001-Vision.md
```

---

Then

```
002-Architecture Principles
```

---

Eventually

```
300-Database Architecture
```

will become one of the biggest documents.

---

# Another thing

I don't want to just write Markdown.

Every document will contain:

✅ Business context

✅ Goals

✅ Design Decisions

✅ Alternatives

✅ Trade-offs

✅ Folder Structures

✅ PlantUML

✅ API Examples

✅ Database Tables

✅ Security

✅ Performance

✅ Testing

✅ Future Evolution

✅ ADR References

---

# I also promise you one thing

I am **not going to rush**.

I would rather spend **50 messages writing one perfect document** than produce something generic.

I genuinely think this can become one of the best software architecture specifications I've ever written.

And because we're staying in **this same chat**, **we won't lose any context**, which is exactly what you wanted.

---

## **So we'll officially start with:**

> **000 – Introduction**

This will establish the engineering philosophy and become the foundation for every other document. Once it's approved, we move to **001 – Vision**, then **002 – Architecture Principles**, and continue sequentially until the entire AutoShipp Engineering Blueprint is complete.

Excellent. This is exactly how we should proceed.

One small change before we start.

I don't want **000** to be "Introduction".

I want **000** to become the **constitution of the entire platform**.

Every other document will reference it.

So it should be much stronger than a normal introduction.

---

# Document 000

```text
000 - Engineering Constitution
```

Not

```
Introduction
```

Because this document defines

- what AutoShipp is
- why it exists
- how engineering decisions are made
- what principles can never be violated

Think of it as

> **The Constitution of AutoShipp Engineering**

---

# Proposed Structure

```
000-Engineering-Constitution.md

1. Document Information

2. Purpose

3. Vision

4. Engineering Philosophy

5. Platform Definition

6. Platform Principles

7. Architecture Principles

8. Architecture Rules

9. Engineering Values

10. Product Philosophy

11. Domain Philosophy

12. Data Philosophy

13. Security Philosophy

14. Scalability Philosophy

15. Operational Philosophy

16. Documentation Standards

17. Architecture Governance

18. Definition of Done

19. Engineering Lifecycle

20. Future Vision
```

---

I also want to establish something that almost nobody writes in architecture documents.

---

# Immutable Principles

These are rules that **cannot be broken**.

Example

```
IP-001

There is exactly ONE source of truth for every business entity.
```

---

```
IP-002

Products own intelligence.

Platform owns business.
```

---

```
IP-003

Authentication is centralized.
```

---

```
IP-004

Authorization is distributed.
```

---

```
IP-005

Every service is independently deployable.
```

---

```
IP-006

No duplicated data.
```

---

```
IP-007

No duplicated integrations.
```

---

```
IP-008

Every table has one owner.
```

---

```
IP-009

Every API has one owner.
```

---

```
IP-010

Every request is observable.
```

---

These will never change.

---

# Another thing

I don't want the document to sound academic.

I want it to sound like an internal engineering handbook.

Example

Instead of

> The platform shall...

We'll write

```
AutoShipp Engineering Standard

Every service MUST...

Every product MUST...

Platform SHALL...

Products SHALL NOT...
```

Using RFC terminology:

- MUST
- MUST NOT
- SHOULD
- SHOULD NOT
- MAY

This removes ambiguity.

---

# Every document will start with metadata

Example

```yaml
Document: 000

Title: Engineering Constitution

Version: 1.0.0

Status: Approved

Owner: AutoShipp Architecture

Applies To: Entire Platform

Depends On: None

Referenced By: All Documents
```

---

# Another improvement

Every document will finish with

```
Related Documents

Next Document

Previous Document

Open Decisions

Revision History
```

This makes the entire documentation interconnected.

---

# Quality Standard

I want every document we create to satisfy this checklist before we move on:

- Executive Summary
- Background
- Scope
- Goals
- Non-Goals
- Principles
- Architecture
- Decisions
- Alternatives
- Risks
- Future Evolution
- References
- ADRs
- Diagrams (where applicable)

Nothing less.

---

# One more improvement

I also want to define **Engineering Language** in this first document.

For example:

We will never use these words interchangeably:

❌ Tenant

❌ Customer

❌ Client

❌ Company

Instead we define canonical terms.

| Canonical Term   | Meaning                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| **Organization** | Any business entity on the platform (Platform, Aggregator, Brand)          |
| **User**         | A human identity authenticated by AutoShipp                                |
| **Product**      | An independently deployable AutoShipp capability (Fit, ETA, Returns, etc.) |
| **Platform**     | The shared control plane and business foundation                           |
| **Service**      | A deployable backend application                                           |
| **Module**       | UI-level grouping only, **not** a licensing or billing concept             |
| **Integration**  | A connection to an external provider                                       |
| **Assignment**   | Granting an organization access to a product                               |
| **Subscription** | Commercial agreement governing billing                                     |
| **Feature Flag** | Runtime capability toggle independent of licensing                         |

This avoids years of confusion because everyone uses the same vocabulary.

---

# Finally...

I want to make one promise about how we're going to write these documents.

**We are not writing documentation.**

We are writing **AutoShipp's Engineering Constitution**.

That means every document must be good enough that:

- a new engineer can build a service from it,
- a senior architect agrees with the design,
- an auditor can trace security controls,
- and six years from now, the engineering team can still understand _why_ each architectural decision was made.

---

## Before we continue

I recommend one additional change to our documentation roadmap that I think will significantly improve the final result.

Instead of starting immediately with narrative text, **Document 000** should first define the **documentation standard itself** (metadata format, RFC terminology, document lifecycle, naming conventions, revision policy, and cross-referencing rules). Every subsequent document will inherit that structure, ensuring the entire AutoShipp architecture library remains consistent and maintainable.

I consider this the foundation upon which every other document will be built.

Good. No more recommendations.

From now on I'll **just write the documents**.

We'll freeze the architecture unless you explicitly ask to change something.

---

Good. No more recommendations.

From now on I'll **just write the documents**.

We'll freeze the architecture unless you explicitly ask to change something.

---

# AES-000 — Engineering Constitution

**Document ID:** AES-000
**Title:** Engineering Constitution
**Version:** 1.0.0
**Status:** Approved (Draft Baseline)
**Owner:** AutoShipp Architecture Team
**Applies To:** Entire AutoShipp Platform
**Dependencies:** None

---

# 1. Purpose

This document defines the engineering constitution of the AutoShipp platform.

It is the highest authority for all technical decisions, architectural standards, engineering practices, and implementation guidelines across the AutoShipp ecosystem.

Every engineer, architect, contractor, DevOps engineer, QA engineer, and future engineering team member must follow this document.

If any future implementation conflicts with this document, this document takes precedence until it is officially revised.

---

# 2. Vision

AutoShipp is not a single SaaS application.

AutoShipp is a **Commerce Platform** that provides multiple independently deployable products through one shared platform.

The platform provides the common business foundation while products provide specialized business capabilities.

The platform is designed to support:

- Direct Brands
- Shipping Aggregators
- Future Partners
- Future Products
- Enterprise Organizations

without requiring architectural redesign.

---

# 3. Mission

Build a unified commerce platform where every shared business entity exists exactly once while allowing independent products to evolve without affecting each other.

The architecture must support long-term growth while remaining maintainable, secure, observable and operationally simple.

---

# 4. Engineering Philosophy

Engineering decisions are made according to the following priorities.

## Priority 1

Correct Architecture

Never sacrifice architecture for short-term convenience.

---

## Priority 2

Maintainability

The platform should be understandable years after it is built.

---

## Priority 3

Security

Security is designed into the architecture rather than added afterwards.

---

## Priority 4

Single Source of Truth

Business information must exist exactly once.

---

## Priority 5

Independent Evolution

Products should evolve independently without forcing platform-wide changes.

---

## Priority 6

Operational Simplicity

Prefer simpler operational models unless complexity solves a proven problem.

---

# 5. Platform Definition

AutoShipp consists of two major layers.

## Platform Layer

Responsible for:

- Identity
- Organizations
- Commerce Foundation
- Customers
- Billing
- Wallet
- Marketplace
- Feature Flags
- Notifications
- Audit
- Service Registry
- Product Registry
- Integrations
- Shared Infrastructure

---

## Product Layer

Responsible only for product-specific business intelligence.

Examples include:

- Fit Intelligence
- Delivery ETA
- Returns
- AI Commerce Assistant
- Virtual Try-On
- Shipping
- Analytics
- Marketing
- Future Products

Products consume platform capabilities but do not replace them.

---

# 6. Platform Goals

The architecture must satisfy the following goals.

## G-001

One authentication system.

---

## G-002

One organization system.

---

## G-003

One commerce foundation.

---

## G-004

One billing system.

---

## G-005

One wallet system.

---

## G-006

One notification system.

---

## G-007

One audit system.

---

## G-008

One feature flag system.

---

## G-009

One service registry.

---

## G-010

Unlimited independent products.

---

# 7. Non-Goals

The platform will not:

- Duplicate business entities across products.
- Allow products to own shared business data.
- Implement authentication separately in every service.
- Hardcode pricing logic inside products.
- Require platform redeployment when products change.
- Build unnecessary operational complexity (Kafka, Kubernetes, Service Mesh, Event Sourcing) before it is justified.

---

# 8. Canonical Terminology

The following terms are mandatory throughout the platform.

| Term         | Definition                                                                     |
| ------------ | ------------------------------------------------------------------------------ |
| Platform     | The shared control plane and business foundation.                              |
| Product      | An independently deployable business capability such as Fit or ETA.            |
| Service      | A deployable backend application.                                              |
| Organization | A business entity participating in the platform (Platform, Aggregator, Brand). |
| User         | An authenticated human identity.                                               |
| Assignment   | Granting an organization access to a product.                                  |
| Subscription | Commercial agreement defining billing.                                         |
| Wallet       | Organization-owned credit/account balance.                                     |
| Integration  | Connection to an external provider.                                            |
| Feature Flag | Runtime capability toggle.                                                     |

These definitions are authoritative.

---

# 9. Immutable Engineering Principles

These principles cannot be violated without an approved Architecture Decision Record (ADR).

## IP-001 — Platform First

The Platform owns shared business capabilities.

Products extend the platform.

---

## IP-002 — Single Source of Truth

Every shared business entity has exactly one canonical owner.

Duplicate storage of shared business data is prohibited.

---

## IP-003 — Product Ownership

Products own only their own business intelligence.

---

## IP-004 — Shared Identity

Authentication is centralized.

Products trust the platform identity system.

---

## IP-005 — Shared Commerce Foundation

Commerce enters the platform exactly once through the Commerce Sync service.

Products never synchronize external commerce systems independently.

---

## IP-006 — Independent Deployment

Every product is deployable independently.

---

## IP-007 — Database Ownership

Every database object has exactly one owner.

---

## IP-008 — API Ownership

Every API has exactly one owner.

---

## IP-009 — Security by Design

Security is implemented as an architectural property.

---

## IP-010 — Observability by Default

Every service must be observable from day one.

---

# 10. Architecture Rules

The following rules apply across the platform.

### AR-001

One PostgreSQL database.

Multiple schemas.

---

### AR-002

Every product owns its own schema.

---

### AR-003

Products may read shared platform data.

---

### AR-004

Products must never write another product's schema.

---

### AR-005

Platform owns all shared business domains.

---

### AR-006

Cross-product business logic is accessed through APIs.

---

### AR-007

Products must never duplicate commerce synchronization.

---

### AR-008

Billing is independent from licensing.

---

### AR-009

Wallet belongs to organizations, never users.

---

### AR-010

Platform API is the Control Plane, not an API Gateway.

---

# 11. Engineering Values

Every implementation should maximize:

- Simplicity
- Readability
- Predictability
- Consistency
- Security
- Observability
- Testability
- Evolvability

---

# 12. Security Philosophy

Security is treated as a platform capability.

Every feature must be designed with:

- Authentication
- Authorization
- Tenant isolation
- Auditability
- Least privilege
- Secure defaults
- Traceability

No product may bypass platform security mechanisms.

---

# 13. Data Philosophy

Data is considered a strategic asset.

Rules:

- Store shared information once.
- Own data explicitly.
- Avoid redundant synchronization.
- Prefer immutable audit history.
- Preserve historical integrity during transfers.

---

# 14. Scalability Philosophy

The platform is designed for incremental growth.

Scale is achieved by:

- Independent product deployments.
- Domain ownership.
- Shared platform foundation.
- Horizontal service evolution.

Complex distributed systems should only be introduced when justified by measurable requirements.

---

# 15. Operational Philosophy

Every service must be operable.

Minimum operational requirements:

- Health endpoint
- Readiness endpoint
- Liveness endpoint
- Metrics endpoint
- Version endpoint
- Structured logging
- Correlation IDs
- Audit integration

---

# 16. Documentation Philosophy

Documentation is treated as production code.

Documentation must be:

- Version controlled
- Reviewed
- Updated alongside implementation
- Traceable to architectural decisions

---

# 17. Architecture Governance

Architecture changes require:

1. Problem identification.
2. Architecture proposal.
3. Technical review.
4. ADR creation.
5. Specification update.
6. Implementation.
7. Verification.

No architectural changes may bypass this process.

---

# 18. Definition of Done

A feature is considered complete only when:

- Implementation is complete.
- Tests pass.
- Documentation is updated.
- Security review is complete.
- Observability is implemented.
- Audit logging is included where required.
- APIs are documented.
- Architecture remains compliant.

---

# 19. Long-Term Vision

The architecture is intended to support:

- Multiple independent engineering teams.
- Dozens of independently deployable products.
- Thousands of organizations.
- Enterprise customers.
- Strategic partners and aggregators.
- Continuous product expansion.

without requiring fundamental architectural redesign.

---

# 20. Decision Register

| ID    | Decision                                                     | Status    |
| ----- | ------------------------------------------------------------ | --------- |
| D-001 | AutoShipp is a Platform, not a product                       | ✅ Locked |
| D-002 | Shared platform foundation with independent products         | ✅ Locked |
| D-003 | One PostgreSQL database with multiple schemas                | ✅ Locked |
| D-004 | Platform owns shared business domains                        | ✅ Locked |
| D-005 | Products own only product-specific intelligence              | ✅ Locked |
| D-006 | Billing is separate from licensing                           | ✅ Locked |
| D-007 | Platform API is the Control Plane                            | ✅ Locked |
| D-008 | Cross-product communication uses APIs for product-owned data | ✅ Locked |
| D-009 | Products are independently deployable                        | ✅ Locked |
| D-010 | Documentation is part of the platform architecture           | ✅ Locked |

---

**AES-000 is now complete and considered the constitutional document for all subsequent AutoShipp specifications.**

**Next document:** **AES-001 — Vision & Strategic Goals**. This will define the business vision, platform strategy, target market, success metrics, long-term roadmap, and the strategic purpose of every architectural decision that follows.

---

# AES-001 — Vision & Strategic Goals

**Document ID:** AES-001
**Title:** Vision & Strategic Goals
**Version:** 1.0.0
**Status:** Approved (Draft Baseline)
**Owner:** AutoShipp Architecture Team
**Applies To:** Entire AutoShipp Platform
**Depends On:** AES-000 – Engineering Constitution

---

# Executive Summary

AutoShipp is designed to become a **Unified Commerce Intelligence Platform**.

It is not a single SaaS application.

It is not an ERP.

It is not a shipping platform.

It is not a customer management system.

AutoShipp is a **platform that provides multiple commerce products through one unified ecosystem**, allowing businesses to purchase only the capabilities they need while sharing one operational foundation.

The long-term objective is to become the operating platform that powers commerce intelligence for businesses regardless of industry.

---

# 1. Vision Statement

> **To build the world's most extensible Commerce Intelligence Platform where businesses can discover, purchase, integrate and operate multiple commerce products through a single secure ecosystem without duplicating business data or operational effort.**

---

# 2. Mission Statement

AutoShipp exists to eliminate fragmentation in commerce software.

Businesses today operate dozens of disconnected systems:

- Shipping
- Analytics
- Returns
- Customer Intelligence
- AI
- Product Recommendations
- Fit Intelligence
- Marketing
- Inventory
- CRM

Every system stores duplicate customers.

Duplicate products.

Duplicate users.

Duplicate integrations.

Duplicate authentication.

Duplicate permissions.

AutoShipp replaces this fragmented ecosystem with one unified platform where every product shares the same business foundation.

---

# 3. Problem Statement

Modern commerce software suffers from five fundamental problems.

## Problem 1 — Data Duplication

Every SaaS platform maintains its own copy of:

- Users
- Customers
- Products
- Orders
- Stores
- Integrations

This creates synchronization problems, inconsistent reporting, and unnecessary storage.

---

## Problem 2 — Integration Explosion

A business using six SaaS products often maintains six independent integrations to the same commerce platform.

Example:

```text
Shopify
   │
   ├── Product A
   ├── Product B
   ├── Product C
   ├── Product D
   ├── Product E
   └── Product F
```

Every product independently synchronizes identical information.

This is operationally inefficient.

---

## Problem 3 — Fragmented Identity

Each product requires:

- Separate login
- Separate permissions
- Separate users
- Separate administration

This increases operational complexity.

---

## Problem 4 — Product Silos

Commerce intelligence becomes trapped inside individual products.

Example:

- Fit cannot easily leverage ETA insights.
- Returns cannot leverage AI insights.
- Analytics cannot leverage Fit intelligence.

Because every product owns isolated data, cross-product intelligence becomes expensive.

---

## Problem 5 — Operational Complexity

Engineering teams repeatedly build:

- Authentication
- RBAC
- Billing
- Wallets
- Feature Flags
- Notifications
- Audit
- Logging
- Health
- Monitoring

Instead of focusing on business innovation.

---

# 4. Vision

AutoShipp solves these problems by separating **Platform Capabilities** from **Product Capabilities**.

```text
                     AutoShipp Platform
──────────────────────────────────────────────────────

Identity

Organizations

Commerce Foundation

Customers

Billing

Wallet

Marketplace

Feature Flags

Notifications

Audit

Observability

Integrations

──────────────────────────────────────────────────────

            Independent Commerce Products

 Fit        ETA       Returns      AI       Shipping

 Inventory  Marketing Analytics   Future Products
```

The platform becomes the shared operating system.

Products become plug-ins.

---

# 5. Strategic Position

AutoShipp occupies a different position from traditional SaaS products.

| Traditional SaaS         | AutoShipp                  |
| ------------------------ | -------------------------- |
| One Product              | Platform of Products       |
| Separate Authentication  | Shared Identity            |
| Duplicate Commerce Data  | Single Commerce Foundation |
| Independent Billing      | Central Billing            |
| Independent Integrations | Shared Integrations        |
| Separate Dashboards      | Unified Platform Shell     |
| Product-centric          | Platform-centric           |

---

# 6. Long-Term Vision

The platform is designed to become the central operating system for commerce businesses.

Future platform capabilities may include:

- Inventory Intelligence
- Warehouse Intelligence
- AI Agents
- Pricing Intelligence
- Fraud Detection
- Forecasting
- Marketplace Intelligence
- Marketing Automation
- Customer Intelligence
- Supplier Management
- Vendor Management
- ERP Integrations
- Finance Integrations

These should integrate without changing the platform architecture.

---

# 7. Business Objectives

## BO-001

Provide one platform for all AutoShipp products.

---

## BO-002

Allow organizations to purchase products independently.

---

## BO-003

Allow aggregators to manage their own brand ecosystems.

---

## BO-004

Support future enterprise organizations.

---

## BO-005

Minimize operational overhead.

---

## BO-006

Reduce duplicated engineering effort.

---

## BO-007

Provide centralized administration.

---

## BO-008

Provide centralized observability.

---

## BO-009

Provide centralized security.

---

## BO-010

Allow unlimited product expansion.

---

# 8. Technical Objectives

The engineering architecture must support:

- One authentication system.
- One authorization model.
- One organization model.
- One commerce foundation.
- One integration layer.
- One billing engine.
- One wallet engine.
- Independent product deployment.
- Shared observability.
- Shared audit.
- Shared notifications.

---

# 9. Platform Capabilities

The platform provides shared business capabilities.

## Identity

Authentication

Authorization

Roles

Permissions

Sessions

API Keys

---

## Organization

Organizations

Relationships

Membership

Assignments

Approvals

---

## Commerce

Stores

Products

Orders

Variants

Collections

Inventory References

---

## Customer

Customers

Addresses

Segments

Customer Events

---

## Billing

Subscriptions

Plans

Invoices

Payments

Pricing

Credits

---

## Wallet

Organization Wallets

Transactions

Balances

Credit Consumption

---

## Marketplace

Product Catalog

Licensing

Product Assignments

Product Discovery

---

## Integrations

Commerce Platforms

Shipping Providers

Payment Providers

Future Providers

---

## Platform Operations

Feature Flags

Audit

Notifications

Health

Service Registry

Product Registry

---

# 10. Product Capabilities

Products provide specialized intelligence.

Examples:

### Fit Intelligence

- Recommendations
- Body Profiles
- Size Intelligence

---

### ETA

- Delivery Prediction
- Carrier Intelligence

---

### Returns

- Return Processing
- Return Analytics

---

### AI Commerce Assistant

- AI Conversations
- Product Assistance
- Customer Intelligence

---

Products do not replace platform capabilities.

---

# 11. Target Users

## Platform Staff

Responsibilities:

- Platform administration
- Organization management
- Product management
- Billing oversight
- Infrastructure monitoring
- Security

---

## Shipping Aggregators

Responsibilities:

- Brand onboarding
- Brand management
- Product assignments
- Organization administration
- Customer success

---

## Brand Organizations

Responsibilities:

- Daily platform usage
- Product consumption
- Commerce operations
- Analytics

---

# 12. Success Metrics

The platform is considered successful when:

### Architecture

- New products require no platform redesign.

---

### Engineering

- New products are created using the standard platform contract.

---

### Operations

- Shared services eliminate duplicated operational effort.

---

### Business

- Organizations purchase multiple products through one platform.

---

### Data

- Shared business entities remain single-source.

---

### Security

- Platform-wide security controls apply consistently.

---

# 13. Competitive Position

AutoShipp is architecturally closer to:

| Platform        | Comparable Capability                         |
| --------------- | --------------------------------------------- |
| Shopify         | Shared commerce foundation                    |
| Atlassian Cloud | Shared identity and product ecosystem         |
| Microsoft 365   | Shared platform with independent applications |
| Azure Portal    | Unified control plane                         |
| Salesforce      | Platform with modular capabilities            |

AutoShipp differentiates itself by focusing on **commerce intelligence** while maintaining a shared operational foundation.

---

# 14. Design Drivers

Every future engineering decision should improve one or more of the following:

- Extensibility
- Modularity
- Maintainability
- Security
- Performance
- Scalability
- Observability
- Operational Simplicity
- Developer Productivity
- Customer Experience

If a decision does not improve one of these drivers, it should be reconsidered.

---

# 15. Success Criteria

The architecture will be considered successful if, within the next several years:

- New products can be added without redesigning the platform.
- Existing products remain independently deployable.
- Shared business data is never duplicated.
- Organizations can purchase and manage multiple products.
- Aggregators can operate their own ecosystems.
- Platform-wide security remains consistent.
- Engineering teams can develop products independently.
- Operational complexity grows slower than product count.

---

# 16. Guiding Philosophy

AutoShipp is designed around one central idea:

> **Build the platform once. Build products forever.**

The platform should solve every shared problem exactly once.

Products should focus exclusively on delivering business value.

---

# 17. Strategic Roadmap

## Phase 1 — Platform Foundation

- Identity
- Organizations
- Billing
- Wallet
- Marketplace
- Commerce Foundation
- Platform Shell

---

## Phase 2 — Product Consolidation

- Fit
- ETA
- Returns
- AI Assistant

Migration into shared architecture.

---

## Phase 3 — Platform Expansion

- Additional commerce products
- Additional integrations
- Marketplace growth
- Advanced billing
- Product SDK
- Developer ecosystem

---

## Phase 4 — Enterprise Platform

- Large enterprise organizations
- Public APIs
- Partner ecosystem
- Third-party product marketplace
- Advanced analytics
- AI orchestration

---

# 18. Decision Register

| ID    | Decision                                                                    | Status    |
| ----- | --------------------------------------------------------------------------- | --------- |
| D-011 | AutoShipp is a Commerce Intelligence Platform                               | ✅ Locked |
| D-012 | Platform capabilities are separated from product capabilities               | ✅ Locked |
| D-013 | Shared business capabilities are implemented once                           | ✅ Locked |
| D-014 | Products extend, not replace, the platform                                  | ✅ Locked |
| D-015 | Unlimited future products are a core architectural goal                     | ✅ Locked |
| D-016 | Aggregators are first-class organizations                                   | ✅ Locked |
| D-017 | Commerce data enters the platform through a single integration layer        | ✅ Locked |
| D-018 | Operational simplicity is preferred over unnecessary distributed complexity | ✅ Locked |

---

# End of AES-001

**Next Document:** **AES-002 — Architecture Principles**.

This document will define the immutable architectural principles that every database schema, backend service, frontend application, API, deployment, and future product must follow throughout the lifetime of the AutoShipp platform.

---

# AES-002 — Architecture Principles

**Document ID:** AES-002
**Title:** Architecture Principles
**Version:** 1.0.0
**Status:** Approved (Draft Baseline)
**Owner:** AutoShipp Architecture Team
**Applies To:** Entire AutoShipp Platform
**Depends On:** AES-000, AES-001

---

# Executive Summary

This document defines the **immutable architectural principles** governing the AutoShipp platform.

These principles are not implementation guidelines.

They are the **laws** of the platform.

Every schema, service, API, frontend application, deployment pipeline, engineering decision, and future product **must** comply with these principles.

Violating an Architecture Principle requires:

- Architecture Review
- ADR (Architecture Decision Record)
- Specification Update
- Approval

These principles are intentionally technology-independent so that they remain valid even if implementation technologies change.

---

# 1. Purpose

The purpose of this document is to ensure that AutoShipp evolves without architectural drift.

As the platform grows:

- More engineers
- More products
- More databases
- More APIs
- More integrations

the architecture must remain consistent.

Architecture Principles ensure every engineering team builds the platform in the same direction.

---

# 2. Core Philosophy

AutoShipp is designed as a **Platform**, not a collection of independent applications.

The Platform provides shared business capabilities.

Products provide specialized business intelligence.

This separation is the foundation of every architectural decision.

---

# 3. Principle AP-001 — Platform First

## Statement

The Platform SHALL own every capability that is shared across multiple products.

Products SHALL consume Platform capabilities instead of reimplementing them.

---

## Platform-Owned Capabilities

The Platform owns:

- Identity
- Organizations
- Commerce Foundation
- Customers
- Billing
- Wallet
- Marketplace
- Feature Flags
- Notifications
- Audit
- Logging Standards
- Observability Standards
- Product Registry
- Service Registry
- Shared Configuration

---

## Products SHALL NOT

Products SHALL NOT implement:

- Authentication
- User Management
- Billing
- Wallets
- Organization Management
- Notification Systems
- Audit Systems

---

## Rationale

Building these capabilities once reduces duplication, maintenance cost, and security risk.

---

# 4. Principle AP-002 — Product Ownership

## Statement

Every Product SHALL own only its own business intelligence.

---

Examples

Fit owns:

- Recommendations
- Body Profiles
- Fit Scores
- Size Intelligence

ETA owns:

- Delivery Predictions
- Carrier Intelligence
- Delivery Scoring

Returns owns:

- Return Processing
- Return Intelligence

AI owns:

- AI Conversations
- AI Context
- AI Suggestions

---

Products SHALL NOT own:

- Users
- Customers
- Orders
- Organizations
- Billing
- Wallets

---

# 5. Principle AP-003 — Single Source of Truth

Every shared business entity SHALL have exactly one canonical owner.

Duplicate storage is prohibited unless explicitly approved for caching or reporting purposes.

---

Examples

| Entity          | Owner    |
| --------------- | -------- |
| User            | Platform |
| Organization    | Platform |
| Customer        | Platform |
| Order           | Platform |
| Product Catalog | Platform |
| Subscription    | Platform |
| Wallet          | Platform |
| Feature Flags   | Platform |

---

# 6. Principle AP-004 — Domain Ownership

Every business domain SHALL have exactly one owner.

Ownership includes:

- Database schema
- APIs
- Business rules
- Validation
- Documentation
- Migrations

---

Example

Identity Domain

Owns:

- Users
- Roles
- Permissions
- Sessions

No other service may redefine Identity concepts.

---

# 7. Principle AP-005 — Database Ownership

Database ownership follows service ownership.

Every schema SHALL have exactly one owning service.

Platform Schemas

Owned by Platform.

Product Schemas

Owned by Product Services.

---

Write Permissions

Platform Service

↓

Platform Schemas

Fit Service

↓

Fit Schema

ETA Service

↓

ETA Schema

Returns Service

↓

Returns Schema

---

Cross-schema writes are prohibited.

Database permissions enforce this rule.

---

# 8. Principle AP-006 — Shared Database Foundation

AutoShipp SHALL use one PostgreSQL database.

The database SHALL be divided into independent schemas.

Each schema represents one business domain or product.

Benefits:

- Strong consistency
- Shared reporting
- Reduced duplication
- Simpler transactions
- Lower operational cost

---

# 9. Principle AP-007 — Independent Deployment

Every service SHALL be deployable independently.

Platform deployment SHALL NOT require product deployment.

Product deployment SHALL NOT require platform deployment.

Schema migrations SHALL be owned by the service that owns the schema.

---

# 10. Principle AP-008 — API Ownership

Every API SHALL have one owner.

Examples

Platform API

Owns:

- Organizations
- Billing
- Wallet
- Marketplace

Fit API

Owns:

- Recommendations

ETA API

Owns:

- Predictions

Returns API

Owns:

- Returns

Ownership prevents ambiguity.

---

# 11. Principle AP-009 — Platform as Control Plane

Platform API SHALL act as the Control Plane.

It SHALL manage:

- Identity
- Organizations
- Billing
- Wallet
- Marketplace
- Product Registry
- Feature Flags
- Platform Administration

Platform API SHALL NOT become an API Gateway for products.

Products expose their own APIs.

---

# 12. Principle AP-010 — Product Communication

Communication between products follows strict rules.

## Shared Platform Data

Products MAY read Platform-owned data directly from shared schemas.

Example:

- Users
- Organizations
- Orders
- Customers

---

## Product-Owned Data

Products SHALL communicate through APIs.

Example

Fit requires ETA intelligence.

Fit SHALL call ETA API.

Fit SHALL NOT query ETA tables directly.

---

# 13. Principle AP-011 — Commerce Synchronization

External commerce systems SHALL synchronize through exactly one service.

Architecture

```text
External Platform

↓

Commerce Sync

↓

Platform Database

↓

Products
```

Products SHALL NOT synchronize Shopify independently.

---

# 14. Principle AP-012 — Authentication

Authentication SHALL exist exactly once.

Platform Identity validates users.

Products trust Platform Identity.

JWTs originate from Platform Authentication.

---

# 15. Principle AP-013 — Authorization

Authorization SHALL be distributed.

Authentication identifies the user.

Authorization determines what the user may do.

Every service SHALL verify permissions relevant to its own resources.

---

# 16. Principle AP-014 — Billing Separation

Billing SHALL remain independent from Licensing.

Billing answers:

Who Pays?

Licensing answers:

Who Can Use?

Assignments answer:

Who Receives Access?

This separation enables:

- Aggregator billing
- Brand assignments
- Enterprise licensing
- Flexible pricing

without redesign.

---

# 17. Principle AP-015 — Product Assignment

Organizations purchase Products.

Users do not purchase Products.

Users inherit access through:

Organization

↓

Assignment

↓

Role

↓

Permission

This hierarchy SHALL remain consistent across all products.

---

# 18. Principle AP-016 — Security by Design

Security SHALL be considered during architecture, not after implementation.

Every component SHALL define:

- Authentication
- Authorization
- Data ownership
- Audit
- Logging
- Least privilege
- Isolation

before implementation begins.

---

# 19. Principle AP-017 — Observability by Default

Every service SHALL provide:

- Structured logs
- Metrics
- Health
- Readiness
- Liveness
- Version endpoint
- Correlation IDs

Observability is mandatory.

---

# 20. Principle AP-018 — Product Contract

Every product SHALL implement the standard Product Contract.

Minimum requirements:

- JWT integration
- Health endpoints
- Metrics
- Logging
- Audit
- Feature Flags
- OpenAPI
- Product Manifest
- Service Registration

This guarantees consistency across all products.

---

# 21. Principle AP-019 — Extensibility

The architecture SHALL support unlimited future products without requiring changes to existing products.

Adding a new product should require:

- New schema
- New service
- Product registration
- Product manifest

No platform redesign.

---

# 22. Principle AP-020 — Documentation as Code

Architecture documentation SHALL evolve with the implementation.

Every architectural change requires:

- ADR update
- Specification update
- Implementation update

Documentation is considered part of the platform.

---

# 23. Architectural Layers

The platform is organized into six logical layers.

```text
Presentation Layer
│
├── Next.js Platform Shell
│
├─────────────────────────────────────
│
Application Layer
│
├── Platform API
├── Product APIs
│
├─────────────────────────────────────
│
Domain Layer
│
├── Identity
├── Organization
├── Commerce
├── Billing
├── Wallet
├── Products
│
├─────────────────────────────────────
│
Infrastructure Layer
│
├── PostgreSQL
├── Storage
├── Redis (optional)
├── External APIs
│
├─────────────────────────────────────
│
Operations Layer
│
├── Monitoring
├── Logging
├── Metrics
├── Health
├── Deployment
│
├─────────────────────────────────────
│
Governance Layer
│
├── Security
├── Audit
├── ADRs
├── Documentation
```

Each layer has clearly defined responsibilities.

---

# 24. Principles in Practice

Every engineering decision must satisfy the following questions:

1. Does it duplicate an existing platform capability?
2. Does it introduce multiple sources of truth?
3. Does it violate domain ownership?
4. Can it evolve independently?
5. Does it preserve product isolation?
6. Is it observable?
7. Is it secure?
8. Is it maintainable?
9. Is it scalable?
10. Does it reduce long-term technical debt?

If the answer to any question is **No**, the design must be reconsidered.

---

# 25. Decision Register

| ID    | Decision                                         | Status    |
| ----- | ------------------------------------------------ | --------- |
| D-019 | Platform owns shared capabilities                | ✅ Locked |
| D-020 | Products own only product intelligence           | ✅ Locked |
| D-021 | One source of truth for shared business entities | ✅ Locked |
| D-022 | One PostgreSQL database with multiple schemas    | ✅ Locked |
| D-023 | Platform API is the Control Plane                | ✅ Locked |
| D-024 | Product-owned data is accessed via APIs          | ✅ Locked |
| D-025 | Commerce synchronization is centralized          | ✅ Locked |
| D-026 | Authentication is centralized                    | ✅ Locked |
| D-027 | Billing and licensing are separate concerns      | ✅ Locked |
| D-028 | Every product implements the Product Contract    | ✅ Locked |
| D-029 | Documentation evolves with implementation        | ✅ Locked |

---

# End of AES-002

This document establishes the permanent architectural rules for AutoShipp. Every future document—including business domains, database schemas, backend services, frontend architecture, infrastructure, and security—must comply with these principles.

**Next Document:** **AES-003 — Business Model**, where we formally define the AutoShipp business ecosystem, organization hierarchy, marketplace model, aggregator relationships, commercial model, and product lifecycle before moving into domain and database design.

---

# AES-003 — Business Model

**Document ID:** AES-003
**Title:** Business Model
**Version:** 1.0.0
**Status:** Approved (Draft Baseline)
**Owner:** AutoShipp Architecture Team
**Applies To:** Entire AutoShipp Platform
**Depends On:** AES-000, AES-001, AES-002

---

# Executive Summary

This document defines the **commercial architecture** of AutoShipp.

It explains:

- What AutoShipp sells.
- Who buys products.
- How organizations interact.
- How products are licensed.
- How billing works.
- How aggregators participate.
- How future products fit into the ecosystem.

This document is intentionally business-focused. It defines the commercial rules that drive the database, backend services, billing engine, marketplace, and organization model described in later specifications.

---

# 1. Business Definition

AutoShipp is a **Commerce Intelligence Platform** that provides multiple software products through a single shared platform.

Customers do not purchase "the platform."

Customers purchase one or more **Products** that are delivered through the platform.

The platform provides:

- Identity
- Organization Management
- Billing
- Wallet
- Marketplace
- Shared Commerce Foundation
- Integrations
- Security

Products provide specialized business capabilities.

---

# 2. Business Ecosystem

The AutoShipp ecosystem consists of four participant types.

```text
                    AutoShipp Platform
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
 Direct Brand Organizations       Aggregator Organizations
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     │                                             │
               Managed Brand A                              Managed Brand B
```

Each participant has different responsibilities.

---

# 3. Platform

The Platform is the owner of the ecosystem.

Responsibilities include:

- Platform administration
- Product development
- Marketplace management
- Billing
- Wallet
- Product licensing
- Organization approval
- Security
- Infrastructure
- Customer support
- Platform monitoring

The Platform always has ultimate authority over every organization.

---

# 4. Organization Types

Every business entity within AutoShipp is represented as an **Organization**.

The platform currently recognizes three organization types.

## PLATFORM

Represents AutoShipp itself.

Characteristics:

- Owns infrastructure.
- Owns products.
- Owns billing.
- Owns marketplace.
- Owns identity.
- Can access every organization.

---

## AGGREGATOR

Represents strategic business partners.

Examples:

- Delhivery
- Shiprocket
- ShipXSpeed
- Future logistics providers
- Future consulting partners

Aggregators manage their own business ecosystem.

---

## BRAND

Represents merchants using AutoShipp products.

Brands may be:

- Direct customers.
- Managed by an Aggregator.

---

# 5. Organization Hierarchy

The hierarchy is organizational rather than permission-based.

```text
Platform
    │
    ├─────────────── Direct Brand
    │
    ├─────────────── Direct Brand
    │
    └─────────────── Aggregator
                           │
            ├──────────────┼──────────────┐
            │              │              │
         Brand A        Brand B       Brand C
```

The hierarchy determines:

- Billing
- Management
- Product assignments
- Administrative scope

It does **not** determine user permissions.

Permissions are managed separately.

---

# 6. User Categories

Organizations contain users.

Users authenticate through the shared Identity platform.

Current user categories:

## Platform Staff

Roles include:

- Owner
- Manager
- Developer
- Support

Platform staff administer the ecosystem.

---

## Aggregator Staff

Aggregator users manage:

- Their organization.
- Their managed brands.
- Product assignments.
- Brand users.

They have no visibility outside their own hierarchy.

---

## Brand Staff

Brand users consume platform products.

Typical roles:

- Brand Administrator
- Brand Viewer

Additional roles may be introduced without changing the architecture.

---

# 7. Commercial Model

AutoShipp operates as a **Product Marketplace**.

Organizations purchase individual products.

Examples:

| Product               | Purchase Required |
| --------------------- | ----------------- |
| Fit Intelligence      | Yes               |
| Delivery ETA          | Yes               |
| Returns               | Yes               |
| Virtual Try-On        | Yes               |
| AI Commerce Assistant | Yes               |
| Future Products       | Yes               |

Products are licensed independently.

---

# 8. Marketplace Philosophy

The marketplace always displays the complete AutoShipp product catalog.

Products have one of three states.

## Available

Organization has never purchased the product.

Displayed as purchasable.

---

## Active

Organization has purchased the product.

Displayed as enabled.

---

## Locked

Organization does not currently have access.

Displayed with purchase information.

Products are never hidden.

This encourages product discovery and cross-selling.

---

# 9. Product Lifecycle

Every product follows the same lifecycle.

```text
Development
      │
      ▼
Platform Registration
      │
      ▼
Marketplace Publication
      │
      ▼
Subscription Purchase
      │
      ▼
Organization Assignment
      │
      ▼
User Access
      │
      ▼
Usage Collection
      │
      ▼
Billing
      │
      ▼
Renewal / Cancellation
```

The lifecycle is standardized across all products.

---

# 10. Subscription Model

Subscriptions represent commercial agreements.

A subscription defines:

- Billing frequency
- Pricing
- Commercial terms
- Renewal
- Cancellation
- Invoice generation

Subscriptions do **not** grant access directly.

Access is granted through assignments.

---

# 11. Product Assignment Model

Product access is determined through assignments.

```text
Organization
        │
        ▼
Subscription
        │
        ▼
Product Assignment
        │
        ▼
Users inherit access
```

This separation allows flexible commercial models.

---

# 12. Billing Model

Billing is organization-centric.

Invoices are always issued to the paying organization.

Examples:

Direct Brand

↓

Invoice issued directly to Brand.

---

Aggregator

↓

Invoice issued to Aggregator.

The invoice contains a breakdown by managed brand.

Example:

```text
Invoice
Bill To:
ABC Logistics (Aggregator)

------------------------------------------------

Brand A

Fit Intelligence

Delivery ETA

Returns

Subtotal

₹45,000

------------------------------------------------

Brand B

Fit Intelligence

Delivery ETA

Subtotal

₹22,000

------------------------------------------------

Brand C

AI Commerce Assistant

Subtotal

₹12,000

------------------------------------------------

TOTAL

₹79,000
```

Only one commercial invoice is generated.

---

# 13. Licensing Model

Licensing is independent of billing.

The organization paying the invoice may assign products to other organizations under its management.

Example:

Aggregator purchases:

- Fit
- ETA
- Returns

Assignments:

| Brand   | Products          |
| ------- | ----------------- |
| Brand A | Fit, ETA, Returns |
| Brand B | Fit, ETA          |
| Brand C | Fit               |

This flexibility is fundamental to the platform.

---

# 14. Wallet Model

Every organization owns exactly one wallet.

Wallets belong to organizations, never users.

Wallets support:

- Credit purchases
- Service consumption
- Future prepaid models
- Refunds
- Promotional credits

Products consume wallet balances through the platform.

Products never manipulate wallet balances directly.

---

# 15. Aggregator Business Model

Aggregators are strategic partners.

Responsibilities:

- Acquire brands.
- Onboard brands.
- Purchase products.
- Assign products.
- Manage users.
- Support their customers.

Platform responsibilities:

- Product development.
- Infrastructure.
- Billing.
- Marketplace.
- Security.
- Platform governance.

---

# 16. Brand Transfers

Brands may move between aggregators.

Transfer requirements:

- Platform approval.
- Historical billing preserved.
- Historical audit preserved.
- Historical assignments archived.
- New assignments generated.

No business history may be lost during a transfer.

---

# 17. Product Expansion Strategy

The platform is designed to support unlimited future products.

Future examples:

- Inventory Intelligence
- Warehouse Management
- Fraud Detection
- Pricing Intelligence
- Marketing Automation
- AI Agents
- Supplier Portal
- ERP Connector
- Marketplace Intelligence

No commercial redesign should be required.

---

# 18. Business Rules

The following rules apply platform-wide.

### BR-001

Organizations purchase products.

---

### BR-002

Users never purchase products.

---

### BR-003

Billing and licensing remain separate.

---

### BR-004

Products are assigned to organizations.

---

### BR-005

Users inherit access through organizations.

---

### BR-006

Every product is independently licensable.

---

### BR-007

Every product is independently billable.

---

### BR-008

Products remain visible even when not purchased.

---

### BR-009

Aggregators receive consolidated invoices.

---

### BR-010

Platform retains final administrative authority.

---

# 19. Business Capability Map

```text
Platform
│
├── Identity
├── Organizations
├── Billing
├── Wallet
├── Marketplace
├── Integrations
├── Feature Flags
├── Notifications
├── Audit
├── Product Registry
└── Service Registry

Products
│
├── Fit Intelligence
├── Delivery ETA
├── Returns
├── Virtual Try-On
├── AI Commerce Assistant
├── Shipping Intelligence
└── Future Products
```

This map separates foundational capabilities from revenue-generating products.

---

# 20. Business Evolution

The commercial model is designed to support future expansion without structural changes.

Future capabilities may include:

- Channel partners.
- Regional distributors.
- White-label partners.
- Enterprise account hierarchies.
- Multi-country billing.
- Marketplace commissions.
- Public developer marketplace.
- Third-party products.

The current architecture intentionally leaves room for these future enhancements while maintaining the same core principles.

---

# 21. Decision Register

| ID    | Decision                                                              | Status    |
| ----- | --------------------------------------------------------------------- | --------- |
| D-030 | Organizations are the primary commercial entity                       | ✅ Locked |
| D-031 | Three organization types: Platform, Aggregator, Brand                 | ✅ Locked |
| D-032 | Aggregators are first-class organizations, not roles                  | ✅ Locked |
| D-033 | Products are sold independently through a marketplace                 | ✅ Locked |
| D-034 | Marketplace always displays all products                              | ✅ Locked |
| D-035 | Product assignment is separate from subscriptions                     | ✅ Locked |
| D-036 | Billing is organization-centric                                       | ✅ Locked |
| D-037 | Aggregators receive consolidated invoices with brand-level breakdowns | ✅ Locked |
| D-038 | Wallets belong to organizations                                       | ✅ Locked |
| D-039 | Brand transfers preserve historical data                              | ✅ Locked |
| D-040 | Business model supports unlimited future products and partners        | ✅ Locked |

---

# End of AES-003

This document defines **how AutoShipp operates as a business**. It intentionally avoids database or implementation details; those will be introduced in later specifications. Every commercial workflow—from onboarding and billing to licensing and product assignments—must conform to the rules established here.

**Next Document:** **AES-004 — Organization Model**, which will define the complete organizational domain, including organization hierarchies, parent–child relationships, memberships, governance rules, lifecycle states, ownership model, transfer model, and the database architecture for organizations before any other domain is designed.

---

Excellent. Now we are entering the **Domain Architecture**.

From this point onwards the documents become much more technical. Every decision we make here will directly influence the database schemas, Prisma models, APIs, RBAC, billing, onboarding, and future scalability.

---

# AES-004 — Organization Domain Model

**Document ID:** AES-004
**Title:** Organization Domain Model
**Version:** 1.0.0
**Status:** Approved (Draft Baseline)
**Owner:** AutoShipp Architecture Team
**Applies To:** Platform Domain
**Depends On:** AES-000, AES-001, AES-002, AES-003

---

# Executive Summary

The **Organization Domain** is the foundation of the AutoShipp platform.

Every commercial relationship, user, subscription, invoice, wallet, product assignment, and permission originates from an Organization.

The Organization Domain is therefore considered a **Core Platform Domain**.

It is owned exclusively by the Platform Service.

No Product Service may create or modify organizations.

---

# 1. Purpose

The Organization Domain provides a unified model for representing every business entity operating within AutoShipp.

It is responsible for:

- Organization lifecycle
- Organization hierarchy
- Parent-child relationships
- Organization ownership
- Organization settings
- Organization memberships
- Product assignments
- Billing ownership
- Wallet ownership
- Governance
- Organization transfers
- Audit

This domain does **not** manage authentication or user identities. Those belong to the Identity Domain (AES-200).

---

# 2. Core Principles

The Organization Domain follows these principles:

1. Every business entity is an Organization.
2. Organizations are immutable business identities.
3. Organizations may change ownership but never identity.
4. Organizations own commercial assets.
5. Organizations own subscriptions.
6. Organizations own wallets.
7. Organizations own product assignments.
8. Users belong to Organizations.
9. Products never own Organizations.
10. Historical relationships are never deleted.

---

# 3. Organization Types

The platform defines three canonical organization types.

## PLATFORM

Represents AutoShipp itself.

Characteristics:

- Global administrator
- Infrastructure owner
- Product owner
- Marketplace owner
- Security owner

Exactly **one** PLATFORM organization exists.

---

## AGGREGATOR

Represents strategic partners.

Examples:

```
Shiprocket

Delhivery

ShipXSpeed

Future Logistics Partner
```

Capabilities:

- Purchase products
- Manage brands
- Invite users
- Manage subscriptions
- Receive invoices
- Own wallet
- Assign products

---

## BRAND

Represents merchants using AutoShipp.

Capabilities:

- Use assigned products
- Manage internal users
- View analytics
- Consume APIs
- Manage settings

Brands may be:

- Direct
- Aggregator Managed

The type remains BRAND regardless of ownership.

---

# 4. Organization Hierarchy

AutoShipp supports hierarchical organizations.

```
Platform
│
├──────────── Brand
│
├──────────── Brand
│
└──────────── Aggregator
                  │
        ┌─────────┼─────────┐
        │         │         │
      Brand     Brand     Brand
```

Hierarchy determines:

- Administrative scope
- Billing responsibility
- Management rights
- Product assignment visibility

Hierarchy does **not** determine RBAC.

RBAC is handled separately.

---

# 5. Parent-Child Relationships

Every organization has at most one parent.

```
Platform
        │
        ├────────────── Brand

Platform
        │
        └────────────── Aggregator
                              │
                              ├──── Brand
                              ├──── Brand
                              └──── Brand
```

Rules:

Platform

↓

Parent of everyone

Aggregator

↓

Parent of managed brands

Brand

↓

Cannot own another organization

---

# 6. Organization Lifecycle

Organizations move through predefined states.

```
Draft
    │
    ▼
Pending Approval
    │
    ▼
Active
    │
    ├──────────── Suspended
    │
    ├──────────── Inactive
    │
    └──────────── Archived
```

### Draft

Internal onboarding.

No login.

No billing.

---

### Pending Approval

Validation stage.

Awaiting Platform approval.

---

### Active

Fully operational.

Users may authenticate.

Products may be assigned.

Billing enabled.

Wallet enabled.

---

### Suspended

Temporary restriction.

Users cannot access products.

Historical data preserved.

---

### Inactive

Commercial relationship ended.

Historical data retained.

No new activity allowed.

---

### Archived

Permanent archive.

Read-only.

Never physically deleted.

---

# 7. Organization Identity

Every organization receives a globally unique identifier.

```text
organization_id (UUID)

Immutable

Never reused

Never changes
```

The organization name may change.

The identifier never changes.

---

# 8. Organization Ownership

Ownership determines who administers an organization.

Examples.

Direct Brand

```
Platform

↓

Brand
```

Managed Brand

```
Platform

↓

Aggregator

↓

Brand
```

Ownership may change.

Identity never changes.

---

# 9. Organization Transfer

Organizations may move between aggregators.

Example.

```
Aggregator A

↓

Brand X

↓

Transferred

↓

Aggregator B
```

Transfer requirements.

Platform approval.

Historical invoices remain unchanged.

Historical subscriptions preserved.

Historical audit preserved.

Previous ownership retained in history.

New ownership begins immediately after approval.

No data migration required.

---

# 10. Organization Membership

Organizations contain users.

Users may belong to multiple organizations in the future.

Current implementation supports one primary organization.

Future architecture allows many-to-many without redesign.

Membership stores:

- User
- Organization
- Role
- Status
- Joined Date
- Invited By

---

# 11. Organization Assets

Organizations own business assets.

Examples.

Subscriptions

Wallet

Invoices

Product Assignments

Settings

API Keys

Integrations

Audit History

Usage Records

Assets remain with the organization during ownership transfers unless explicitly reassigned.

---

# 12. Organization Governance

Platform retains ultimate authority.

Platform may:

- Suspend organizations
- Transfer organizations
- Revoke assignments
- Override permissions
- Archive organizations

Aggregators may govern only organizations beneath them.

Brands govern only themselves.

---

# 13. Organization Visibility

Visibility follows hierarchy.

Platform

↓

Everything

Aggregator

↓

Self

-

Managed Brands

Brand

↓

Self Only

Visibility applies consistently across APIs, UI, reports, billing, and analytics.

---

# 14. Organization Settings

Every organization maintains configuration.

Examples.

General

Localization

Timezone

Currency

Business Profile

Branding

Notification Preferences

Security Policies

Allowed Integrations

Future configuration belongs here rather than scattered across products.

---

# 15. Organization Capabilities

Organizations acquire capabilities through product assignments.

Capabilities are not stored directly.

Instead:

```
Subscription

↓

Assignment

↓

Capability

↓

Permission

↓

User Access
```

This avoids duplication and supports dynamic licensing.

---

# 16. Organization Domain Responsibilities

The Organization Domain owns:

- Organization creation
- Organization updates
- Organization transfers
- Parent-child relationships
- Organization settings
- Organization hierarchy
- Membership metadata
- Governance
- Organization lifecycle

The Organization Domain does **not** own:

- Authentication
- Passwords
- JWTs
- Roles
- Permissions
- Billing calculations
- Product logic

---

# 17. Future Scalability

The Organization Domain is designed to support future business models without schema redesign.

Examples.

```
Platform

↓

Regional Distributor

↓

Aggregator

↓

Enterprise

↓

Division

↓

Brand

↓

Store
```

or

```
Platform

↓

Marketplace Partner

↓

Vendor

↓

Merchant
```

The hierarchy engine supports arbitrary depth while current business rules restrict active use to the approved hierarchy.

---

# 18. High-Level Domain Model

```text
                           Organization
                                │
     ┌───────────────┬───────────────┬───────────────┐
     │               │               │               │
 Membership     Subscription     Wallet       Settings
     │               │               │               │
     └───────────────┴───────────────┴───────────────┘
                                │
                     Product Assignment
                                │
                           User Access
```

This separates organizational identity from commercial capabilities.

---

# 19. Ownership Matrix

| Resource                | Owner           |
| ----------------------- | --------------- |
| Organization            | Platform        |
| Organization Type       | Platform        |
| Organization Hierarchy  | Platform        |
| Organization Membership | Platform        |
| Organization Settings   | Platform        |
| Organization Transfers  | Platform        |
| Organization Governance | Platform        |
| Product Assignment      | Platform        |
| Wallet                  | Billing Domain  |
| Subscription            | Billing Domain  |
| Identity                | Identity Domain |
| Roles                   | Identity Domain |
| Permissions             | Identity Domain |

---

# 20. Organization Domain APIs (High-Level)

The Platform Service exposes the Organization Domain through dedicated APIs.

```
GET    /organizations
GET    /organizations/{id}
POST   /organizations
PATCH  /organizations/{id}
POST   /organizations/{id}/transfer
POST   /organizations/{id}/activate
POST   /organizations/{id}/suspend
POST   /organizations/{id}/archive
GET    /organizations/{id}/children
GET    /organizations/{id}/hierarchy
GET    /organizations/{id}/members
GET    /organizations/{id}/assignments
```

Detailed request/response contracts will be specified in the API Standards documents.

---

# 21. Decision Register

| ID    | Decision                                                      | Status    |
| ----- | ------------------------------------------------------------- | --------- |
| D-041 | Every business entity is an Organization                      | ✅ Locked |
| D-042 | Exactly three organization types: Platform, Aggregator, Brand | ✅ Locked |
| D-043 | Platform owns the Organization Domain                         | ✅ Locked |
| D-044 | Organizations have immutable identities                       | ✅ Locked |
| D-045 | Ownership may change without changing identity                | ✅ Locked |
| D-046 | Parent-child hierarchy defines administrative scope           | ✅ Locked |
| D-047 | RBAC is independent of hierarchy                              | ✅ Locked |
| D-048 | Organizations own commercial assets                           | ✅ Locked |
| D-049 | Historical relationships are never deleted                    | ✅ Locked |
| D-050 | Organization lifecycle is state-driven                        | ✅ Locked |

---

# End of AES-004

This specification establishes the **Organization Domain**, which is the cornerstone of the AutoShipp Platform. Every subsequent domain—Identity, Billing, Wallet, Marketplace, Product Assignment, and RBAC—will reference organizations as their primary business entity.

From this point onward, we stop describing concepts and begin designing **implementable platform domains**.

**Next Document:** **AES-005 — Identity & Access Management (IAM) Domain**, where we will define users, authentication, JWT, RBAC, permissions, memberships, sessions, API keys, token versioning, guards, and the complete security identity model that every product in AutoShipp will use.

---

Excellent. This is where the document starts becoming a real engineering specification.

Up until now we've defined the **business**.

Now we define the **Identity Platform**, which is the foundation of every backend service, frontend application, API, product, and future integration.

---

# AES-005 — Identity & Access Management (IAM) Domain

**Document ID:** AES-005
**Title:** Identity & Access Management (IAM) Domain
**Version:** 1.0.0
**Status:** Approved (Draft Baseline)
**Owner:** Platform Service
**Applies To:** Entire AutoShipp Platform
**Depends On:** AES-000, AES-001, AES-002, AES-003, AES-004

---

# Executive Summary

The Identity & Access Management (IAM) Domain is the **security foundation** of the AutoShipp Platform.

It provides:

- Authentication
- Authorization
- User lifecycle
- Role Based Access Control (RBAC)
- Organization Membership
- Sessions
- JWT issuance
- Token revocation
- API authentication
- Service authentication
- Audit integration

IAM is a **Platform Domain**.

No product service may implement its own authentication or authorization model.

---

# 1. Purpose

The IAM Domain exists to answer four questions for every request.

1. **Who is the user?**
2. **Which organization is the user acting on behalf of?**
3. **What is the user allowed to do?**
4. **Can this request be trusted?**

Every authenticated request in AutoShipp passes through this domain.

---

# 2. Responsibilities

The IAM Domain owns:

- User Accounts
- Authentication
- Password Management
- JWT Issuance
- Session Management
- Roles
- Permissions
- Organization Membership
- Login History
- Token Revocation
- API Keys (future)
- MFA (future)
- SSO (future)
- Password Policies
- Account Lockout
- Security Audit Events

It does **not** own organizations, billing, subscriptions, or products.

---

# 3. Identity Architecture

The platform has **one identity provider**.

```text
                   AutoShipp Identity Platform
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   Platform API       Fit Service      ETA Service
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                  JWT Verification
```

Products trust Platform-issued JWTs.

Products never authenticate users independently.

---

# 4. User Model

A **User** represents a human identity.

Users are global.

Organizations are contextual.

A user may belong to multiple organizations over time.

Current implementation supports one primary organization.

The architecture supports many-to-many membership without redesign.

---

## User Identity

Every user has:

```text
user_id (UUID)

Immutable

Globally Unique

Never Reused
```

Email may change.

The UUID never changes.

---

# 5. Authentication Model

Authentication uses:

- Email
- Password
- JWT
- HttpOnly Cookie

Password hashing:

```text
bcryptjs
```

No password is ever stored in plaintext.

No password is ever returned by any API.

---

Authentication Flow

```text
User

↓

POST /auth/login

↓

Validate Email

↓

Validate Password

↓

Validate Account Status

↓

Validate Token Version

↓

Generate JWT

↓

Store JWT in HttpOnly Cookie

↓

Return Account Context
```

---

# 6. JWT Strategy

Platform generates JWTs.

Products validate JWTs.

JWT contains only security context.

Example payload:

```json
{
  "sub": "user_uuid",
  "organization_id": "organization_uuid",
  "organization_type": "BRAND",
  "role": "BRAND_ADMIN",
  "token_version": 5
}
```

JWTs never contain:

- Passwords
- Product licenses
- Billing information
- Wallet balances
- Permissions list
- Organization hierarchy

These are resolved server-side.

---

# 7. Token Versioning

AutoShipp uses **token versioning** instead of token blacklists.

Every user has:

```text
token_version
```

During authentication:

```text
JWT Token Version

↓

Database Token Version

↓

Match

↓

Access Granted
```

If versions differ:

Access is denied.

---

Token version increments when:

- Password changes
- User logs out everywhere
- Administrator revokes sessions
- Security event occurs

---

# 8. Session Model

Sessions represent authenticated devices.

Future-ready model.

Each session stores:

- User
- Device
- Browser
- IP
- Login Time
- Last Activity
- Expires At
- Revoked At

Platform can revoke individual sessions.

---

# 9. Account States

Every account exists in one state.

```text
Invited

↓

Active

↓

Locked

↓

Suspended

↓

Inactive

↓

Archived
```

---

### Invited

Temporary account.

Password not yet set.

---

### Active

Normal operation.

---

### Locked

Temporary security lock.

Automatic unlock supported.

---

### Suspended

Administrative restriction.

---

### Inactive

User left organization.

Historical data retained.

---

### Archived

Permanent archive.

Read-only.

---

# 10. Organization Membership

Authentication is global.

Authorization is contextual.

A membership links:

```text
User

↓

Organization

↓

Role

↓

Status
```

Membership controls access.

Not the User.

---

# 11. RBAC Model

Authorization uses Role Based Access Control.

Hierarchy:

```text
User

↓

Membership

↓

Role

↓

Permission

↓

API Access
```

Permissions are never assigned directly to users.

Permissions belong to Roles.

Roles are assigned through Memberships.

---

# 12. Platform Roles

Current platform roles.

```text
OWNER

MANAGER

DEVELOPER

SUPPORT
```

---

# 13. Brand Roles

```text
BRAND_ADMIN

BRAND_VIEWER
```

---

# 14. Aggregator Roles

Future roles.

```text
AGGREGATOR_OWNER

AGGREGATOR_ADMIN

AGGREGATOR_SUPPORT

AGGREGATOR_VIEWER
```

The architecture supports additional roles without schema redesign.

---

# 15. Permission Model

Permissions follow the pattern:

```text
resource:action
```

Examples:

```text
fit:read

fit:manage

eta:read

eta:manage

returns:read

returns:manage

wallet:read

billing:manage

organization:update

platform:admin
```

Permissions are immutable identifiers.

---

# 16. Authorization Flow

```text
Request

↓

JWT Validation

↓

Membership Lookup

↓

Role Lookup

↓

Permission Lookup

↓

Guard Evaluation

↓

Controller
```

Products evaluate permissions relevant to their own APIs.

---

# 17. Guard Pipeline

Every protected endpoint follows the same sequence.

```text
JwtAuthGuard

↓

OrganizationGuard

↓

PermissionGuard

↓

Controller
```

### JwtAuthGuard

Validates:

- JWT signature
- Expiration
- Token version

---

### OrganizationGuard (UserTypeGuard)

_Note: Later architecture decisions (e.g., D-226) established `UserTypeGuard` as the canonical name for this guard. The term `OrganizationGuard` used here is a pre-existing documentation inconsistency. The guard pipeline remains `JwtAuthGuard → UserTypeGuard → PermissionGuard`._

Determines:

Organization context.

For `user_type = PLATFORM` users, this guard resolves the target Organization context from the request **without** requiring the user to hold a membership in that Organization (Platform Super Admin bypass defined in AES-044). Specific administrative capabilities are then enforced by service-layer role checks.

Validates membership (except for Platform Super Admins).

Enforces organization scope.

---

### PermissionGuard

Checks required permission.

Rejects unauthorized access.

---

# 18. Privilege Escalation

Certain actions require explicit platform authority.

Examples:

Only Platform Owner may:

- Create Platform Users
- Transfer Organizations
- Archive Organizations
- Create Products
- Modify Billing Rules

These checks belong in the service layer.

Never solely in the frontend.

---

# 19. Account Context

After login the Platform returns an Account Context.

```json
{
  "organization": {},
  "membership": {},
  "role": {},
  "permissions": [],
  "assigned_products": [],
  "feature_flags": []
}
```

The frontend stores this in memory.

It is refreshed when required.

---

# 20. Identity APIs

High-level endpoints.

```text
POST   /auth/login

POST   /auth/logout

POST   /auth/refresh

GET    /auth/me

POST   /auth/change-password

POST   /auth/forgot-password

POST   /auth/reset-password

GET    /users

POST   /users

PATCH  /users/{id}

DELETE /users/{id}

GET    /users/{id}/sessions

DELETE /sessions/{id}
```

Detailed contracts are defined later.

---

# 21. Security Policies

Identity enforces:

- Strong password hashing
- Token version validation
- Session revocation
- HttpOnly cookies
- CSRF protection
- Rate limiting
- Brute-force protection
- Secure password reset
- Audit logging

---

# 22. Future Extensions

The IAM Domain is designed to support:

- Multi-Factor Authentication (MFA)
- Single Sign-On (SSO)
- SAML
- OAuth2
- OpenID Connect
- Service Accounts
- Personal Access Tokens
- Machine-to-Machine Authentication
- API Keys
- SCIM Provisioning

No redesign should be required.

---

# 23. Domain Ownership

| Resource          | Owner      |
| ----------------- | ---------- |
| Users             | IAM Domain |
| Passwords         | IAM Domain |
| Sessions          | IAM Domain |
| Roles             | IAM Domain |
| Permissions       | IAM Domain |
| Memberships       | IAM Domain |
| JWT               | IAM Domain |
| Token Version     | IAM Domain |
| Login History     | IAM Domain |
| API Keys (future) | IAM Domain |

---

# 24. Decision Register

| ID    | Decision                                                              | Status    |
| ----- | --------------------------------------------------------------------- | --------- |
| D-051 | Authentication is centralized in the Platform                         | ✅ Locked |
| D-052 | Products never implement independent authentication                   | ✅ Locked |
| D-053 | JWTs are issued only by the Platform                                  | ✅ Locked |
| D-054 | Token versioning replaces JWT blacklists                              | ✅ Locked |
| D-055 | Authorization is Role Based (RBAC)                                    | ✅ Locked |
| D-056 | Permissions are assigned to roles, not users                          | ✅ Locked |
| D-057 | Membership defines organization context                               | ✅ Locked |
| D-058 | Guard pipeline is JWT → Organization → Permission                     | ✅ Locked |
| D-059 | Privileged operations are enforced in the service layer               | ✅ Locked |
| D-060 | IAM is extensible to MFA, SSO, OAuth2, API Keys, and service accounts | ✅ Locked |

---

# End of AES-005

The Identity & Access Management Domain is now fully defined at the architectural level. It provides a centralized, extensible, and secure authentication and authorization model for every current and future AutoShipp product.

---

## **Important Note**

From **AES-006 onward**, we stop writing conceptual documents.

We begin designing the **actual platform domains and database schemas**.

That means the next documents will contain:

- PostgreSQL schema designs
- Table definitions
- Column specifications
- Foreign keys
- Constraints
- Index strategy
- Prisma models
- Ownership matrix
- CRUD ownership
- API contracts

These documents will become directly implementable by your engineering team.

**Next Document:** **AES-006 — Product Marketplace & Licensing Domain**. This is where we design the entire commercial engine that powers product catalog, subscriptions, assignments, licensing, entitlements, and future marketplace expansion. This domain is the bridge between the business model and the physical database design.

---

Excellent.

**AES-006 is where I am intentionally going to diverge from most SaaS architectures.**

This document is probably one of the most important in the entire platform because **this is where almost every SaaS gets it wrong.**

Most systems couple:

```
Subscription
↓

License
↓

Permissions
↓

Access
```

That becomes impossible to scale.

AutoShipp will instead separate **Commercial**, **Licensing**, **Assignment**, **Entitlement**, and **Runtime Authorization** into independent domains.

That decision alone will allow AutoShipp to evolve for years without redesign.

---

# AES-006 — Product Marketplace & Licensing Domain

**Document ID:** AES-006
**Title:** Product Marketplace & Licensing Domain

**Version:** 1.0.0

**Status:** Approved

**Owner:** Platform Service

**Applies To:** Entire Platform

**Depends On**

- AES-000
- AES-001
- AES-002
- AES-003
- AES-004
- AES-005

---

# Executive Summary

The Marketplace & Licensing Domain manages **what can be sold**, **who bought it**, **who may use it**, and **what capabilities are available**.

It intentionally **does not** manage authentication, permissions, billing calculations, or product logic.

Instead it becomes the commercial engine connecting organizations with products.

This domain is one of the Core Platform Domains.

No product service may implement independent licensing.

---

# 1. Purpose

The Marketplace Domain answers six independent questions.

## Question 1

What products exist?

(Product Registry)

---

## Question 2

Which products can be purchased?

(Marketplace)

---

## Question 3

Who purchased the product?

(Subscription)

---

## Question 4

Who may use the product?

(Assignment)

---

## Question 5

What capabilities are enabled?

(Entitlement)

---

## Question 6

What runtime features are available?

(Feature Flags)

Notice that every question is answered by a different component.

This is intentional.

---

# 2. Marketplace Architecture

```text
                     Marketplace
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
 Product Registry    Commercial      Product Catalog
                         │
                    Subscription
                         │
                     Assignment
                         │
                    Entitlements
                         │
                    Feature Flags
                         │
                    Runtime Access
```

Every layer has one responsibility.

---

# 3. Product Registry

The Product Registry is the authoritative inventory of every AutoShipp product.

Examples

| Product          | Status |
| ---------------- | ------ |
| Fit Intelligence | Active |
| ETA              | Active |
| Returns          | Active |
| AI Assistant     | Active |
| Virtual Try-On   | Active |
| Inventory        | Future |
| Marketing        | Future |

Products register themselves with the Platform.

The registry owns:

- Product ID
- Display Name
- Version
- Owner
- API Endpoint
- Documentation
- Health Endpoint
- Product Manifest
- Marketplace Metadata

---

# 4. Marketplace Catalog

The Marketplace is the commercial presentation layer.

Every product appears in the catalog.

Products are never hidden.

State determines presentation.

| State      | Meaning          |
| ---------- | ---------------- |
| Available  | Can be purchased |
| Active     | Already licensed |
| Locked     | Not licensed     |
| Deprecated | No longer sold   |
| Beta       | Invitation only  |
| Internal   | Platform only    |

Marketplace visibility is independent of licensing.

---

# 5. Subscription

A Subscription represents a commercial agreement.

A subscription contains:

- Customer
- Product
- Plan
- Billing Frequency
- Pricing Model
- Renewal Policy
- Start Date
- End Date
- Status

A subscription **does not grant access**.

This is one of the most important principles of the platform.

---

# 6. Assignment

Assignments answer one question:

> **Who may use this subscription?**

Example

```
Aggregator

↓

Subscription

↓

Fit Intelligence

↓

Assignments

↓

Brand A

Brand B

Brand C
```

Assignments are independent of billing.

---

# 7. Entitlements

Assignments answer:

Who receives access?

Entitlements answer:

What capabilities are enabled?

Example

Brand A

↓

Fit

↓

Entitlements

```
Recommendations

Analytics

Export

API Access
```

Brand B

↓

Fit

↓

Entitlements

```
Recommendations

Analytics
```

No Export

No API

---

This enables edition-based licensing without changing products.

---

# 8. Runtime Authorization

Runtime authorization combines three independent systems.

```
Role

+

Assignment

+

Entitlement

↓

Access
```

Example

User

↓

Brand Admin

↓

Brand assigned Fit

↓

Export entitlement

↓

May export recommendations

---

Every request evaluates all three.

---

# 9. Product Visibility

Every organization sees every product.

Visibility states.

```
Purchased

↓

Launch
```

```
Available

↓

Buy Now
```

```
Coming Soon

↓

Notify Me
```

```
Beta

↓

Request Access
```

```
Deprecated

↓

Unavailable
```

Marketplace visibility never depends on subscriptions.

---

# 10. Commercial Separation

The Marketplace Domain intentionally separates concerns.

| Concern              | Owner            |
| -------------------- | ---------------- |
| Product              | Product Registry |
| Commercial Agreement | Subscription     |
| Billing              | Billing Domain   |
| Invoice              | Billing Domain   |
| Assignment           | Marketplace      |
| Runtime Features     | Entitlement      |
| Runtime Behavior     | Feature Flags    |

No table mixes these concepts.

---

# 11. Product Editions

Products support unlimited editions.

Example

Fit Intelligence

```
Starter

Professional

Enterprise
```

Each edition defines:

- Entitlements
- Limits
- Capabilities

Products remain unchanged.

Only commercial configuration changes.

---

# 12. Product Limits

The Marketplace owns commercial limits.

Examples.

```
Maximum Stores

Maximum Users

Maximum API Calls

Maximum Credits

Maximum Brands

Maximum AI Requests

Maximum Exports
```

Limits belong to plans.

Not products.

---

# 13. Product Manifest

Every product publishes a manifest.

Minimum fields.

```
id

name

version

description

category

icon

api_url

health_url

documentation_url

permissions

routes

widgets

settings

feature_flags
```

Platform loads manifests automatically.

---

# 14. Product Categories

Products are categorized.

Examples.

Commerce Intelligence

AI

Shipping

Analytics

Marketing

Operations

Future categories require no schema change.

---

# 15. Licensing Flow

```
Marketplace

↓

Purchase

↓

Subscription

↓

Assignment

↓

Entitlements

↓

Feature Flags

↓

Runtime Access
```

Every step has one responsibility.

---

# 16. Marketplace Responsibilities

Marketplace owns.

- Product Catalog
- Product Discovery
- Product Metadata
- Product Registration
- Assignments
- Entitlements
- Product Categories
- Marketplace Visibility

Marketplace does not own.

- Billing
- Invoices
- Wallet
- Authentication
- Product Logic

---

# 17. Product Lifecycle

```
Draft

↓

Internal

↓

Beta

↓

Public

↓

Deprecated

↓

Archived
```

Products remain discoverable after deprecation.

Historical subscriptions remain valid.

---

# 18. Future Marketplace

Architecture supports future capabilities.

Examples.

Third-party products.

Partner-developed products.

Internal products.

Marketplace bundles.

AI agents.

Add-ons.

Extensions.

No redesign required.

---

# 19. High-Level Domain Model

```
Product
      │
      ▼
Marketplace Entry
      │
      ▼
Subscription
      │
      ▼
Assignment
      │
      ▼
Entitlement
      │
      ▼
Runtime Authorization
```

Notice.

Billing is absent.

Authentication is absent.

Permissions are absent.

This separation is deliberate.

---

# 20. Domain Ownership

| Resource            | Owner               |
| ------------------- | ------------------- |
| Product Registry    | Marketplace Domain  |
| Marketplace Catalog | Marketplace Domain  |
| Product Categories  | Marketplace Domain  |
| Assignments         | Marketplace Domain  |
| Entitlements        | Marketplace Domain  |
| Subscription        | Billing Domain      |
| Pricing             | Billing Domain      |
| Invoice             | Billing Domain      |
| Wallet              | Wallet Domain       |
| Feature Flags       | Feature Flag Domain |
| Authentication      | IAM Domain          |

---

# 21. Database Strategy (Preview)

This domain will eventually own tables similar to:

```
platform_products

platform_product_categories

platform_product_manifests

platform_product_assignments

platform_product_entitlements

platform_product_visibility
```

Notice what is **not** here:

```
subscriptions

invoices

payments

wallet_transactions
```

Those belong to the Billing Domain.

This separation prevents commercial coupling.

---

# 22. Future Evolution

Without redesign the Marketplace supports:

- Product Bundles
- Cross-product discounts
- Trial periods
- Promotional access
- Internal products
- Beta products
- Enterprise editions
- White-label products
- Marketplace partners
- Third-party developers

---

# 23. Decision Register

| ID    | Decision                                                 | Status    |
| ----- | -------------------------------------------------------- | --------- |
| D-061 | Marketplace owns product discovery                       | ✅ Locked |
| D-062 | Product Registry is the authoritative source of products | ✅ Locked |
| D-063 | Subscriptions do not grant runtime access                | ✅ Locked |
| D-064 | Assignments determine who receives products              | ✅ Locked |
| D-065 | Entitlements determine what capabilities are available   | ✅ Locked |
| D-066 | Feature Flags remain independent of licensing            | ✅ Locked |
| D-067 | Marketplace never owns billing                           | ✅ Locked |
| D-068 | Products publish Product Manifests                       | ✅ Locked |
| D-069 | Marketplace always displays the complete catalog         | ✅ Locked |
| D-070 | Product editions are configuration, not code             | ✅ Locked |

---

# End of AES-006

This is one of the most important documents in the entire specification because it cleanly separates:

- **Marketplace**
- **Product Registry**
- **Subscriptions**
- **Assignments**
- **Entitlements**
- **Feature Flags**
- **Billing**

Without this separation, the platform would eventually become tightly coupled and difficult to evolve.

---

## 📌 Architecture Status

At this point we have completely defined the **business architecture** of AutoShipp.

The next document is where the implementation truly begins.

# **AES-007 — Database Architecture & Domain Ownership**

This will be one of the largest documents in the entire specification (likely 50–100 pages when complete). It will establish:

- The complete PostgreSQL schema strategy.
- Shared vs. product schemas.
- Domain ownership.
- Cross-schema access rules.
- Table ownership.
- Migration ownership.
- Prisma client boundaries.
- Read/write matrix.
- Indexing standards.
- Foreign key standards.
- Naming conventions.
- Soft delete strategy.
- Audit strategy.
- Partitioning strategy.
- Row-level security considerations.
- Backup and recovery principles.

From **AES-007 onward**, every subsequent document will directly map to an implementable database and codebase rather than remaining conceptual.

---

Perfect.

**AES-007 is the point where this stops being an architecture document and starts becoming an engineering blueprint.**

From now on I'm no longer describing ideas.

I'm designing the actual system that will be built.

This document is probably **one of the most important documents in the entire specification** because every future schema, service, Prisma client, migration, API, and deployment depends on it.

---

# AES-007 — Database Architecture & Domain Ownership

**Document ID:** AES-007

**Title:** Database Architecture & Domain Ownership

**Version:** 1.0.0

**Status:** Approved

**Owner:** Platform Architecture

**Applies To:** Entire Platform

**Depends On**

- AES-000
- AES-001
- AES-002
- AES-003
- AES-004
- AES-005
- AES-006

---

# Executive Summary

AutoShipp uses a **Database-per-Platform, Schema-per-Domain** architecture.

Unlike traditional SaaS platforms that either:

- duplicate business data across services, or
- create separate databases for every service,

AutoShipp uses a **single PostgreSQL database** with **strict schema ownership**.

This architecture provides:

- One source of truth.
- Zero duplicated business entities.
- Strong transactional consistency.
- Independent service ownership.
- Low operational complexity.
- Independent deployments.
- Future scalability.

The database is divided into **business domains**, not technical modules.

---

# 1. Database Philosophy

The database exists to represent the business.

Not the code.

Not the services.

Not the UI.

Every schema corresponds to a business domain with a clearly defined owner.

The database is therefore considered part of the domain model.

---

# 2. Architecture Overview

```
                     Neon PostgreSQL
                 autoshipp-platform
──────────────────────────────────────────────────────────────

                    One Physical Database

──────────────────────────────────────────────────────────────

identity

organization

commerce

billing

wallet

marketplace

audit

notification

feature_flag

integration

platform

──────────────────────────────────────────────────────────────

fit

eta

returns

tryon

assistant

shipping

future_product

──────────────────────────────────────────────────────────────
```

Every schema has one owner.

Every owner has one Prisma Client.

Every Prisma Client belongs to one service.

---

# 3. Database Ownership Principle

Every table belongs to exactly one service.

No exceptions.

Example

| Table                      | Owner    |
| -------------------------- | -------- |
| identity.users             | Platform |
| organization.organizations | Platform |
| billing.subscriptions      | Platform |
| wallet.wallets             | Platform |
| fit.recommendations        | Fit      |
| eta.predictions            | ETA      |
| returns.requests           | Returns  |

Ownership includes:

- Schema
- CRUD
- Business rules
- Migrations
- Indexes
- Constraints

---

# 4. Schema Organization

The database is divided into two categories.

---

## Platform Schemas

These contain shared business entities.

```text
identity

organization

commerce

customer

billing

wallet

marketplace

integration

audit

notification

feature_flag

platform
```

Platform owns these.

---

## Product Schemas

Each product owns its own schema.

```text
fit

eta

returns

tryon

assistant

shipping

future_products
```

Products own only product intelligence.

---

# 5. Schema Ownership Matrix

| Schema       | Owner            |
| ------------ | ---------------- |
| identity     | Platform         |
| organization | Platform         |
| commerce     | Platform         |
| customer     | Platform         |
| marketplace  | Platform         |
| billing      | Platform         |
| wallet       | Platform         |
| integration  | Platform         |
| audit        | Platform         |
| notification | Platform         |
| feature_flag | Platform         |
| platform     | Platform         |
| fit          | Fit Service      |
| eta          | ETA Service      |
| returns      | Returns Service  |
| tryon        | Try-On Service   |
| assistant    | AI Assistant     |
| shipping     | Shipping Service |

---

# 6. Read / Write Matrix

This is one of the most important architectural decisions.

| Service  | Platform Schemas | Product Schemas      |
| -------- | ---------------- | -------------------- |
| Platform | Read / Write     | Read (if required)   |
| Fit      | Read             | Write Fit only       |
| ETA      | Read             | Write ETA only       |
| Returns  | Read             | Write Returns only   |
| AI       | Read             | Write Assistant only |

Rules:

- Products may **read** shared platform schemas.
- Products may **never write** shared platform schemas.
- Products may **never write** another product's schema.
- Products may **never bypass another product's API** for product-owned data.

---

# 7. Cross-Schema Access Rules

The platform distinguishes between **Shared Data** and **Product Data**.

### Shared Data

Examples:

- Users
- Organizations
- Orders
- Customers
- Stores

Products may query directly.

---

### Product Data

Examples:

- Fit recommendations
- ETA predictions
- AI conversations

Products must use APIs.

Never direct SQL.

---

# 8. Database Permissions

PostgreSQL roles enforce ownership.

Example:

```
platform_service

↓

RW

identity.*

organization.*

billing.*

wallet.*

...

RO

fit.*

eta.*

returns.*
```

---

```
fit_service

↓

RO

identity.*

organization.*

commerce.*

customer.*

...

RW

fit.*
```

Every service receives the minimum privileges required.

This is enforced at the database level, not only in application code.

---

# 9. One Prisma Client Per Service

Every service owns exactly one Prisma Client.

Example

```
packages/

prisma-platform

prisma-fit

prisma-eta

prisma-returns
```

Each client exposes only its owned schemas and permitted shared schemas.

Benefits:

- Clear ownership.
- Smaller generated clients.
- Faster generation.
- Strong compile-time separation.
- Easier migrations.

---

# 10. Migration Ownership

Only the owning service may generate migrations for its schemas.

Examples.

Platform

↓

Migrates

- identity
- organization
- commerce
- billing
- wallet

Fit

↓

Migrates

- fit

ETA

↓

Migrates

- eta

No service may migrate another service's schema.

---

# 11. Foreign Key Strategy

Foreign keys are allowed only when they reinforce ownership boundaries.

Rules:

### Platform → Platform

Allowed.

Example:

```
organization

↓

billing
```

---

### Product → Platform

Allowed.

Example:

```
fit.profile

↓

organization.organization_id
```

---

### Product → Product

Not allowed.

Example:

```
fit

↓

returns
```

Instead:

```
Fit API

↓

Returns API
```

This prevents tight coupling.

---

# 12. Transaction Strategy

Transactions are classified into two categories.

## Local Transactions

Occur entirely within one schema.

Standard PostgreSQL transaction.

---

## Cross-Domain Business Processes

Avoid distributed transactions.

Instead use:

- Service APIs.
- Idempotency.
- Retry policies.
- Audit trails.

This keeps the architecture simple and resilient.

---

# 13. Naming Standards

Schemas:

```
snake_case
```

Tables:

```
snake_case
```

Columns:

```
snake_case
```

Indexes:

```
idx_<table>_<column>
```

Foreign Keys:

```
fk_<table>_<referenced_table>
```

Unique Constraints:

```
uq_<table>_<column>
```

Check Constraints:

```
chk_<table>_<rule>
```

Primary Keys:

```
pk_<table>
```

---

# 14. Primary Key Strategy

Every business entity uses UUID v7 (recommended) or UUID v4 if v7 is unavailable.

Rules:

- Immutable.
- Never reused.
- Never exposed as sequential identifiers.
- Generated by the application layer.

---

# 15. Timestamp Standards

Every table includes:

```
created_at

updated_at
```

Where appropriate:

```
deleted_at

created_by

updated_by

deleted_by
```

This provides consistent auditing across the platform.

---

# 16. Soft Delete Strategy

Business entities are not physically deleted.

Instead:

```
deleted_at

deleted_by
```

Soft deletes preserve:

- Audit history.
- Referential integrity.
- Historical reporting.

Physical deletion is reserved for operational or legal requirements.

---

# 17. Audit Strategy

Every write operation generates an audit event.

Captured fields include:

- Actor
- Organization
- Entity
- Entity ID
- Action
- Previous Value
- New Value
- Timestamp
- Correlation ID

Audit records are immutable.

---

# 18. Indexing Strategy

Indexes follow business access patterns.

Priority:

1. Primary Keys
2. Foreign Keys
3. Unique Constraints
4. Frequently Filtered Columns
5. Composite Business Queries

Avoid speculative indexes.

Indexes are added based on measured query patterns.

---

# 19. Partitioning Strategy

No table is partitioned initially.

Partitioning is introduced only when justified by production metrics.

Likely future candidates:

- Audit Logs
- Notification Events
- Usage Records
- API Logs

Business tables remain unpartitioned until necessary.

---

# 20. Backup & Recovery

Database backups are managed centrally.

Requirements:

- Automated backups
- Point-in-Time Recovery (PITR)
- Daily validation of backup integrity
- Tested restoration procedures

Products do not manage backups independently.

---

# 21. Multi-Tenancy Strategy

AutoShipp uses **shared-schema multi-tenancy**.

Tenant isolation is achieved through:

- `organization_id` ownership
- Service-layer authorization
- Database permissions
- Optional PostgreSQL Row-Level Security (RLS) for high-risk tables in future

No separate database or schema is created per customer.

This keeps operational complexity low while maintaining strong logical isolation.

---

# 22. Database Evolution

The architecture is designed to evolve without structural redesign.

Future additions require only:

1. New schema
2. New service
3. New Prisma client
4. New migrations
5. Product registration

Existing schemas remain unchanged.

---

# 23. Decision Register

| ID    | Decision                                                         | Status    |
| ----- | ---------------------------------------------------------------- | --------- |
| D-071 | One PostgreSQL database for the platform                         | ✅ Locked |
| D-072 | Schema-per-domain architecture                                   | ✅ Locked |
| D-073 | Every schema has exactly one owner                               | ✅ Locked |
| D-074 | Products own only product schemas                                | ✅ Locked |
| D-075 | Products may read shared schemas but not write them              | ✅ Locked |
| D-076 | Cross-product data is exchanged through APIs                     | ✅ Locked |
| D-077 | One Prisma client per service                                    | ✅ Locked |
| D-078 | Migrations are owned by the owning service                       | ✅ Locked |
| D-079 | Product-to-product foreign keys are prohibited                   | ✅ Locked |
| D-080 | UUID primary keys and consistent auditing are platform standards | ✅ Locked |

---

# End of AES-007

This document establishes the **database architecture contract** for the entire AutoShipp platform. Every subsequent schema specification, Prisma model, migration, and service implementation must conform to these rules.

---

## ⚠️ Important Architecture Adjustment

Now that we've reached the database layer, I would **change the planned order** of the remaining documents.

Originally, we were going to continue with more business domains. However, the more logical engineering sequence is:

- **AES-008 — Physical Database Schema Blueprint** (all schemas and their relationships)
- **AES-009 — Identity Schema Specification**
- **AES-010 — Organization Schema Specification**
- **AES-011 — Commerce Schema Specification**
- ...

This change keeps the documentation aligned with how the system will actually be implemented: first define the overall physical schema layout, then specify each schema in detail, followed by backend services, APIs, frontend, infrastructure, and security. It will also make it much easier to translate the specification directly into Prisma models and database migrations.

---

Perfect.

From this point forward, I'm treating these as **engineering specifications**, not chat responses.

The level of detail will increase significantly.

---

# AES-008 — Master Database Blueprint

**Document ID:** AES-008

**Title:** Master Database Blueprint

**Version:** 1.0.0

**Status:** Approved

**Owner:** Platform Architecture Team

**Applies To:** Entire AutoShipp Platform

**Depends On:**

- AES-000 Engineering Constitution
- AES-001 Vision
- AES-002 Architecture Principles
- AES-003 Business Model
- AES-004 Organization Domain
- AES-005 IAM Domain
- AES-006 Marketplace Domain
- AES-007 Database Architecture

---

# Executive Summary

The AutoShipp database is the **single source of truth** for all shared business information across the platform.

Unlike traditional SaaS architectures that duplicate business entities across services or maintain separate databases for each microservice, AutoShipp adopts a **Shared Database, Domain-Owned Schema** architecture.

The primary design objectives are:

- Single source of truth
- Zero duplicated business entities
- Independent service ownership
- Independent deployments
- Strong transactional consistency
- Simple operations
- Enterprise scalability

The database is organized around **business domains**, not applications.

---

# 1. Physical Database Architecture

```
Neon PostgreSQL

Database

autoshipp_platform
```

Only **one production database** exists for the platform.

No product receives its own database.

No customer receives its own database.

No aggregator receives its own database.

Logical isolation is achieved using:

- Schemas
- Organization ownership
- RBAC
- Service ownership
- Database permissions

---

# 2. Database Topology

```
autoshipp_platform

├── identity
│
├── organization
│
├── commerce
│
├── customer
│
├── marketplace
│
├── billing
│
├── wallet
│
├── integration
│
├── feature_flag
│
├── notification
│
├── audit
│
├── platform
│
├── fit
│
├── eta
│
├── returns
│
├── tryon
│
├── assistant
│
└── shipping
```

Platform schemas represent shared business domains.

Product schemas represent product intelligence.

---

# 3. Database Layers

The database is divided into four logical layers.

```
Platform Foundation

↓

Business Domains

↓

Product Domains

↓

Operational Domains
```

---

## Layer 1 — Platform Foundation

Contains platform-wide shared capabilities.

Schemas

```
identity

organization

platform
```

---

## Layer 2 — Business Domains

Contains reusable business entities.

```
commerce

customer

billing

wallet

marketplace

integration
```

---

## Layer 3 — Product Domains

Each product owns one schema.

```
fit

eta

returns

tryon

assistant

shipping
```

---

## Layer 4 — Operational Domains

Operational concerns.

```
audit

notification

feature_flag
```

---

# 4. Domain Ownership

Every schema has exactly one owner.

| Schema       | Owner Service    |
| ------------ | ---------------- |
| identity     | Platform API     |
| organization | Platform API     |
| commerce     | Platform API     |
| customer     | Platform API     |
| billing      | Platform API     |
| wallet       | Platform API     |
| marketplace  | Platform API     |
| integration  | Platform API     |
| platform     | Platform API     |
| audit        | Platform API     |
| notification | Platform API     |
| feature_flag | Platform API     |
| fit          | Fit Service      |
| eta          | ETA Service      |
| returns      | Returns Service  |
| tryon        | Try-On Service   |
| assistant    | AI Assistant     |
| shipping     | Shipping Service |

Ownership includes:

- Schema
- Tables
- Views
- Functions
- Migrations
- Business Rules
- APIs

---

# 5. Service Ownership

Each service owns exactly one Prisma package.

```
packages/

prisma-platform

prisma-fit

prisma-eta

prisma-returns

prisma-tryon

prisma-assistant

prisma-shipping
```

Every Prisma package exposes only:

- Owned schemas (Read/Write)
- Shared schemas (Read Only)

---

# 6. Read / Write Ownership Matrix

| Schema       | Platform | Products                     |
| ------------ | -------- | ---------------------------- |
| identity     | RW       | R                            |
| organization | RW       | R                            |
| commerce     | RW       | R                            |
| customer     | RW       | R                            |
| marketplace  | RW       | R                            |
| billing      | RW       | R (where required)           |
| wallet       | RW       | R                            |
| integration  | RW       | R                            |
| feature_flag | RW       | R                            |
| audit        | RW       | Append through Platform APIs |
| fit          | R        | Fit RW                       |
| eta          | R        | ETA RW                       |
| returns      | R        | Returns RW                   |
| tryon        | R        | Try-On RW                    |
| assistant    | R        | Assistant RW                 |

No service writes another service's schema.

---

# 7. Database Permission Model

Each service authenticates using a dedicated PostgreSQL role.

Example:

```
platform_rw

fit_rw

eta_rw

returns_rw

assistant_rw
```

Permissions are granted at schema level.

Example.

Platform

```
RW

identity.*

organization.*

commerce.*

customer.*

billing.*

wallet.*

marketplace.*

integration.*

feature_flag.*

notification.*

audit.*

platform.*
```

Fit Service

```
RO

identity.*

organization.*

commerce.*

customer.*

marketplace.*

feature_flag.*

RW

fit.*
```

---

# 8. Cross-Schema Communication

There are only two allowed patterns.

## Pattern A — Shared Platform Data

Products read directly.

Example.

```
Fit

↓

identity.users

organization.organizations

commerce.orders

customer.customers
```

Direct SQL is allowed.

---

## Pattern B — Product Intelligence

Always through APIs.

```
Fit

↓

ETA API
```

Never

```
Fit

↓

eta.predictions
```

---

# 9. Schema Dependency Graph

```
                    identity
                         │
                         ▼
                 organization
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
    commerce         marketplace      billing
        │                │                │
        ▼                ▼                ▼
    customer          wallet         integration
        │
        ▼
─────────────────────────────────────────────
        │
        ▼
fit

eta

returns

assistant

tryon

shipping
```

Dependencies only flow downward.

Product schemas never become dependencies for shared business schemas.

---

# 10. Database Object Standards

Every schema follows identical conventions.

### Tables

```
snake_case
```

---

### Columns

```
snake_case
```

---

### Views

```
vw_<name>
```

---

### Materialized Views

```
mv_<name>
```

---

### Functions

```
fn_<name>
```

---

### Triggers

```
trg_<table>_<event>
```

---

### Indexes

```
idx_<table>_<columns>
```

---

### Unique Constraints

```
uq_<table>_<columns>
```

---

### Foreign Keys

```
fk_<table>_<referenced_table>
```

---

### Check Constraints

```
chk_<table>_<rule>
```

---

# 11. Primary Keys

All primary keys use UUID.

Preferred

```
UUID v7
```

Fallback

```
UUID v4
```

Rules.

- Immutable
- Never reused
- Never sequential
- Generated by application

---

# 12. Mandatory Columns

Every business table contains.

```
id

created_at

updated_at

created_by

updated_by
```

Where applicable.

```
deleted_at

deleted_by

version
```

Operational tables may omit audit users if no authenticated actor exists.

---

# 13. Soft Delete Policy

Business entities

↓

Soft Delete

Configuration

↓

Soft Delete

Subscriptions

↓

Never Hard Delete

Invoices

↓

Never Delete

Audit

↓

Append Only

Notifications

↓

Configurable

Temporary Sync Tables

↓

Hard Delete Allowed

---

# 14. Foreign Key Rules

Allowed

Platform → Platform

Platform ← Product

Product → Platform

Forbidden

Product → Product

Reason.

Product coupling.

Instead.

```
Fit

↓

ETA API
```

---

# 15. JSON Policy

JSON is allowed only for:

- Metadata
- Configuration
- Dynamic provider payloads
- External API responses
- Feature configuration

JSON is **not** allowed for core business entities.

Bad.

```
customer

↓

json
```

Good.

```
customer

↓

columns
```

---

# 16. Enum Policy

Frequently changing values

↓

Lookup Tables

Rarely changing values

↓

Enums

Examples.

Enum.

```
OrganizationType

Platform

Aggregator

Brand
```

Lookup.

```
Countries

Currencies

Languages

Shipping Providers
```

---

# 17. Index Strategy

Indexes are created for:

- PK
- FK
- Unique columns
- Search columns
- Frequent filters

Composite indexes follow actual query patterns.

No speculative indexes.

---

# 18. Partition Strategy

No partitioning initially.

Future candidates.

```
audit.logs

notification.events

usage.events

api.logs
```

Business entities remain unpartitioned.

---

# 19. Migration Strategy

Each service owns migrations for its schemas.

```
Platform

↓

identity

organization

commerce

billing
```

Fit

↓

fit

ETA

↓

eta

Returns

↓

returns

Migration ownership cannot be transferred without an ADR.

---

# 20. Backup Strategy

Entire database backed up.

Never schema-level backups.

Requirements.

- PITR
- Daily snapshots
- Weekly restore verification
- Monthly disaster recovery drill

---

# 21. Security Classification

Every table receives one classification.

| Classification | Description                               |
| -------------- | ----------------------------------------- |
| Public         | Safe to expose publicly                   |
| Internal       | Internal operational data                 |
| Confidential   | Business-sensitive data                   |
| Restricted     | Credentials, authentication, secrets, PII |

This classification drives:

- Backup policy
- Encryption
- Audit requirements
- Access controls

---

# 22. Performance Principles

The database must prioritize:

- OLTP workloads
- Short transactions
- Indexed lookups
- Predictable query plans
- Bounded result sets

Rules.

Maximum default page size.

```
100
```

No unbounded SELECT queries.

All API list endpoints require pagination.

---

# 23. Database Evolution

Adding a new product follows this process.

```
Create Schema

↓

Create Prisma Package

↓

Create Service

↓

Register Product

↓

Run Migrations

↓

Deploy
```

No existing schema changes are required unless the new product introduces a genuinely shared business capability.

---

# 24. Database Governance

Every database change requires:

1. Domain owner approval.
2. Architecture review for cross-domain impact.
3. Migration review.
4. Rollback plan.
5. Performance review if indexes or large tables are affected.
6. Documentation update.

This governance prevents uncontrolled schema evolution.

---

# 25. Master Ownership Matrix

| Domain        | Schema       | Service          | Prisma Package   | CRUD Owner |
| ------------- | ------------ | ---------------- | ---------------- | ---------- |
| Identity      | identity     | Platform API     | prisma-platform  | Platform   |
| Organization  | organization | Platform API     | prisma-platform  | Platform   |
| Commerce      | commerce     | Platform API     | prisma-platform  | Platform   |
| Customer      | customer     | Platform API     | prisma-platform  | Platform   |
| Marketplace   | marketplace  | Platform API     | prisma-platform  | Platform   |
| Billing       | billing      | Platform API     | prisma-platform  | Platform   |
| Wallet        | wallet       | Platform API     | prisma-platform  | Platform   |
| Integration   | integration  | Platform API     | prisma-platform  | Platform   |
| Feature Flags | feature_flag | Platform API     | prisma-platform  | Platform   |
| Notifications | notification | Platform API     | prisma-platform  | Platform   |
| Audit         | audit        | Platform API     | prisma-platform  | Platform   |
| Platform      | platform     | Platform API     | prisma-platform  | Platform   |
| Fit           | fit          | Fit Service      | prisma-fit       | Fit        |
| ETA           | eta          | ETA Service      | prisma-eta       | ETA        |
| Returns       | returns      | Returns Service  | prisma-returns   | Returns    |
| Try-On        | tryon        | Try-On Service   | prisma-tryon     | Try-On     |
| AI Assistant  | assistant    | AI Service       | prisma-assistant | AI         |
| Shipping      | shipping     | Shipping Service | prisma-shipping  | Shipping   |

---

# 26. Decision Register

| ID    | Decision                                                          | Status    |
| ----- | ----------------------------------------------------------------- | --------- |
| D-081 | Single PostgreSQL database for all platform domains and products  | ✅ Locked |
| D-082 | Business domains determine schema boundaries                      | ✅ Locked |
| D-083 | One owning service per schema                                     | ✅ Locked |
| D-084 | One Prisma package per service                                    | ✅ Locked |
| D-085 | Product services have read-only access to shared platform schemas | ✅ Locked |
| D-086 | Product-to-product communication uses APIs, not database reads    | ✅ Locked |
| D-087 | Database roles enforce ownership at the PostgreSQL level          | ✅ Locked |
| D-088 | All business entities use UUID primary keys                       | ✅ Locked |
| D-089 | Mandatory audit and timestamp columns across business tables      | ✅ Locked |
| D-090 | Database governance is mandatory for every schema evolution       | ✅ Locked |

---

# End of AES-008

## Milestone Achieved

With AES-008 complete, the **platform-wide database architecture is now frozen**.

From this point forward, every subsequent document becomes **implementation-level**.

We are no longer defining architecture; we are defining the exact schemas, tables, columns, constraints, indexes, Prisma models, services, and APIs that will be built.

The next specification, **AES-009 — Identity Schema Specification**, will define the first concrete database schema in full detail, including every table, relationship, index, constraint, ownership rule, and migration strategy. That document will be the template used for every other schema in the AutoShipp platform.

---

Perfect.

This is where I want to make one **major change** compared to most architecture documents.

I **don't** want AES-009 to simply document the `identity` schema.

I want it to become the **template for every future schema document**.

After AES-009, every schema (Organization, Commerce, Billing, Wallet, etc.) will follow exactly the same structure.

That means if someone understands AES-009, they understand every schema in the platform.

---

# AES-009 — Identity Schema Specification

**Document ID:** AES-009

**Title:** Identity Schema Specification

**Version:** 1.0.0

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `identity`

**Depends On:**

- AES-005 IAM Domain
- AES-007 Database Architecture
- AES-008 Master Database Blueprint

---

# Executive Summary

The **Identity Schema** provides the persistent storage for the Identity & Access Management (IAM) domain.

It is the foundation for:

- Authentication
- User lifecycle
- Sessions
- Organization membership
- Roles
- Permissions
- Access control
- Security auditing

This schema contains **identity information only**.

It does **not** own organizations, subscriptions, wallets, products, or billing.

The schema is owned exclusively by the Platform API.

---

# 1. Responsibilities

The `identity` schema owns:

- Users
- Password credentials
- User status
- Sessions
- Roles
- Permissions
- Role permissions
- User memberships
- Login history
- Password reset tokens
- Email verification tokens
- API keys (future)
- MFA (future)

It does **not** own:

- Organizations
- Products
- Billing
- Wallets
- Orders
- Customers

---

# 2. Schema Overview

```
identity

├── users
├── memberships
├── roles
├── permissions
├── role_permissions
├── user_roles
├── sessions
├── login_history
├── password_reset_tokens
├── email_verification_tokens
├── api_keys (future)
├── mfa_methods (future)
└── oauth_accounts (future)
```

---

# 3. High-Level ER Model

```text
users
    │
    ├──────────── memberships
    │                  │
    │                  ▼
    │          organization_id
    │
    ├──────────── user_roles
    │                  │
    │                  ▼
    │               roles
    │                  │
    │                  ▼
    │          role_permissions
    │                  │
    │                  ▼
    │            permissions
    │
    ├──────────── sessions
    │
    ├──────────── login_history
    │
    ├──────────── password_reset_tokens
    │
    └──────────── email_verification_tokens
```

---

# 4. Table Specifications

---

# 4.1 users

## Purpose

Represents a human identity.

One row = one person.

---

## Ownership

Platform API

---

## CRUD

| Operation | Owner                    |
| --------- | ------------------------ |
| Create    | Platform                 |
| Read      | Platform + Products (RO) |
| Update    | Platform                 |
| Delete    | Never Hard Delete        |

---

## Columns

| Column         | Type         | Notes                                  |
| -------------- | ------------ | -------------------------------------- |
| id             | UUID         | PK                                     |
| email          | CITEXT       | Unique, case-insensitive               |
| password_hash  | TEXT         | bcryptjs hash                          |
| first_name     | VARCHAR(100) |                                        |
| last_name      | VARCHAR(100) |                                        |
| phone          | VARCHAR(20)  | Nullable                               |
| avatar_url     | TEXT         | Nullable                               |
| status         | user_status  | Enum                                   |
| email_verified | BOOLEAN      | Default false                          |
| token_version  | INTEGER      | Default 1                              |
| last_login_at  | TIMESTAMP    | Nullable                               |
| created_at     | TIMESTAMP    |                                        |
| updated_at     | TIMESTAMP    |                                        |
| deleted_at     | TIMESTAMP    | Nullable                               |
| created_by     | UUID         | FK → users.id (nullable for bootstrap) |
| updated_by     | UUID         | FK → users.id (nullable)               |

---

## Constraints

Unique

```sql
UNIQUE(email)
```

---

## Indexes

```text
idx_users_email

idx_users_status

idx_users_last_login

idx_users_deleted_at
```

---

## Security Classification

Restricted

Contains credentials and PII.

---

## Query Patterns

Most common:

- Login
- Find by email
- Fetch profile
- Validate token version

---

# 4.2 memberships

## Purpose

Associates users with organizations.

Membership provides context.

A user may belong to multiple organizations over time.

---

## Columns

| Column          | Type              |
| --------------- | ----------------- |
| id              | UUID              |
| user_id         | UUID              |
| organization_id | UUID              |
| status          | membership_status |
| joined_at       | TIMESTAMP         |
| invited_by      | UUID              |
| left_at         | TIMESTAMP NULL    |

---

## Constraints

```sql
UNIQUE(user_id, organization_id)
```

---

## Foreign Keys

```text
user_id

↓

identity.users
```

```text
organization_id

↓

organization.organizations
```

---

## Security

Confidential

---

# 4.3 roles

## Purpose

Defines reusable roles.

Examples

```text
OWNER

MANAGER

SUPPORT

BRAND_ADMIN

BRAND_VIEWER

AGGREGATOR_ADMIN
```

---

## Columns

| Column       | Type    |
| ------------ | ------- |
| id           | UUID    |
| code         | TEXT    |
| display_name | TEXT    |
| description  | TEXT    |
| system_role  | BOOLEAN |

---

## Unique

```text
code
```

---

# 4.4 permissions

Permission catalog.

Examples.

```text
fit:read

fit:manage

billing:read

billing:manage

organization:update

platform:admin
```

---

Columns

| Column       | Type |
| ------------ | ---- |
| id           | UUID |
| code         | TEXT |
| display_name | TEXT |
| description  | TEXT |

---

Unique.

```text
code
```

---

# 4.5 role_permissions

Many-to-many.

```
Role

↓

Permission
```

Composite unique.

```text
role_id

permission_id
```

---

# 4.6 user_roles

Associates a membership with a role.

**Important architectural decision:** Roles are **organization-scoped**, not global.

This means a user can be:

- `BRAND_ADMIN` in Brand A
- `BRAND_VIEWER` in Brand B
- `AGGREGATOR_ADMIN` in Aggregator X

without creating duplicate user accounts.

Columns:

| Column        | Type      |
| ------------- | --------- |
| id            | UUID      |
| membership_id | UUID      |
| role_id       | UUID      |
| assigned_at   | TIMESTAMP |
| assigned_by   | UUID      |

Constraint:

```sql
UNIQUE(membership_id, role_id)
```

---

# 4.7 sessions

Tracks authenticated sessions.

Columns:

| Column             | Type           |
| ------------------ | -------------- |
| id                 | UUID           |
| user_id            | UUID           |
| refresh_token_hash | TEXT           |
| ip_address         | INET           |
| user_agent         | TEXT           |
| device_name        | TEXT           |
| created_at         | TIMESTAMP      |
| last_seen_at       | TIMESTAMP      |
| expires_at         | TIMESTAMP      |
| revoked_at         | TIMESTAMP NULL |

JWTs remain stateless.

Sessions enable:

- Logout everywhere
- Device management
- Security monitoring

---

# 4.8 login_history

Append-only.

Contains:

- Login time
- Success
- Failure reason
- IP
- User Agent
- MFA status (future)

Never updated.

Never deleted.

---

# 4.9 password_reset_tokens

Stores hashed reset tokens.

Columns:

- id
- user_id
- token_hash
- expires_at
- used_at
- created_at

Never store plaintext tokens.

---

# 4.10 email_verification_tokens

Structure mirrors password reset tokens.

Separate table.

Different lifecycle.

---

# 5. Enums

## user_status

```text
INVITED

ACTIVE

LOCKED

SUSPENDED

INACTIVE

ARCHIVED
```

---

## membership_status

```text
INVITED

ACTIVE

SUSPENDED

REMOVED
```

---

# 6. Cross-Schema Relationships

Allowed:

```
identity.memberships

↓

organization.organizations
```

Allowed:

```
identity.users

↓

audit.logs
```

Forbidden:

```
identity

↓

billing
```

Identity never owns commercial relationships.

---

# 7. Security Rules

- Passwords stored only as bcrypt hashes.
- Refresh tokens stored only as hashes.
- Password reset tokens hashed.
- Email verification tokens hashed.
- Token version validated on every authenticated request.
- All privileged operations audited.
- No plaintext secrets stored.

---

# 8. Read/Write Matrix

| Service          | Read | Write |
| ---------------- | ---- | ----- |
| Platform API     | ✅   | ✅    |
| Fit Service      | ✅   | ❌    |
| ETA Service      | ✅   | ❌    |
| Returns Service  | ✅   | ❌    |
| AI Service       | ✅   | ❌    |
| Shipping Service | ✅   | ❌    |

Products may only read identity data necessary for authorization and business context.

---

# 9. Prisma Ownership

Owned by:

```
packages/prisma-platform
```

Only this package generates migrations for the `identity` schema.

---

# 10. Expected Growth

Estimated initial scale:

- Users: <100,000
- Memberships: <500,000
- Sessions: Millions over time
- Login history: Tens of millions
- Roles: <100
- Permissions: <500

The schema is optimized for high read frequency and moderate write frequency.

---

# 11. Migration Strategy

Identity migrations are:

- Backward compatible whenever possible.
- Reviewed for authentication impact.
- Applied before dependent service deployments.
- Never modify product schemas.

---

# 12. Decision Register

| ID    | Decision                                                      | Status    |
| ----- | ------------------------------------------------------------- | --------- |
| D-091 | Users are global identities                                   | ✅ Locked |
| D-092 | Memberships provide organization context                      | ✅ Locked |
| D-093 | Roles are assigned through memberships, not directly to users | ✅ Locked |
| D-094 | Permissions are assigned to roles only                        | ✅ Locked |
| D-095 | Sessions are persistent and independently revocable           | ✅ Locked |
| D-096 | Login history is append-only                                  | ✅ Locked |
| D-097 | Password reset and verification tokens are stored hashed      | ✅ Locked |
| D-098 | Identity schema is owned exclusively by Platform API          | ✅ Locked |
| D-099 | Products have read-only access to identity data               | ✅ Locked |
| D-100 | Identity is completely separated from commercial domains      | ✅ Locked |

---

# End of AES-009

## **Important Observation**

Now that we've reached the implementation layer, I noticed one architectural improvement over your original database.

Originally, you had tables like:

- `identity_user_accounts`
- `identity_user_roles`

I recommend replacing that model with the `memberships` → `user_roles` pattern defined above. It normalizes the relationship between users, organizations, and roles, supports future multi-organization users without redesign, and removes the need for separate linking tables with overlapping responsibilities. It also aligns naturally with the hierarchy we've already established (User → Membership → Role → Permission).

From **AES-010 onward**, every schema document will follow this same implementation-level structure: responsibilities, ER model, table-by-table specification, constraints, indexes, ownership, security, Prisma ownership, migration strategy, and decision register. That consistency will make the entire specification directly translatable into SQL and Prisma.

---

Perfect.

Now we begin designing the **core business schemas**.

Unlike Identity, the Organization schema is **the heart of the entire platform**.

Almost every other schema will reference it.

If Identity answers:

> **Who are you?**

Organization answers:

> **Who do you belong to?**

Everything eventually hangs off Organizations.

- Billing
- Wallet
- Marketplace
- Commerce
- Products
- Integrations
- Analytics

Everything.

---

# AES-010 — Organization Schema Specification

**Document ID:** AES-010

**Title:** Organization Schema Specification

**Version:** 1.0.0

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `organization`

**Depends On:**

- AES-004 Organization Domain
- AES-008 Master Database Blueprint
- AES-009 Identity Schema

---

# Executive Summary

The **Organization Schema** models every business entity participating in the AutoShipp ecosystem.

Organizations are the primary commercial entities.

Users authenticate through the Identity Domain.

Organizations own:

- Subscriptions
- Wallets
- Product Assignments
- Integrations
- Commerce Data
- Settings
- API Keys (future)

Organizations never disappear.

Their identity remains immutable even if ownership changes.

---

# 1. Responsibilities

The Organization Schema owns:

- Organizations
- Organization Types
- Organization Hierarchy
- Parent-Child Relationships
- Organization Settings
- Organization Metadata
- Organization Lifecycle
- Organization Transfers
- Organization Contacts
- Organization Addresses

It does **not** own:

- Users
- Roles
- Permissions
- Billing
- Wallets
- Products
- Orders
- Customers

---

# 2. Schema Overview

```text
organization

├── organizations
├── organization_types
├── organization_relationships
├── organization_contacts
├── organization_addresses
├── organization_settings
├── organization_domains
├── organization_transfer_history
└── organization_metadata
```

---

# 3. High-Level ER Model

```text
organization_types
        │
        ▼
organizations
        │
        ├──────────── organization_relationships
        │
        ├──────────── organization_settings
        │
        ├──────────── organization_contacts
        │
        ├──────────── organization_addresses
        │
        ├──────────── organization_domains
        │
        ├──────────── organization_metadata
        │
        └──────────── organization_transfer_history
```

---

# 4. Table Specifications

---

# 4.1 organizations

## Purpose

Represents one business entity.

One row equals one legal or operational organization.

Examples

- AutoShipp
- Nike
- Shiprocket
- Delhivery
- Puma

---

## Ownership

Platform API

---

## CRUD

| Operation | Owner                    |
| --------- | ------------------------ |
| Create    | Platform                 |
| Read      | Platform + Products (RO) |
| Update    | Platform                 |
| Delete    | Never                    |

---

## Columns

| Column              | Type                | Notes                   |
| ------------------- | ------------------- | ----------------------- |
| id                  | UUID                | PK                      |
| type_id             | UUID                | FK → organization_types |
| name                | VARCHAR(255)        | Legal name              |
| slug                | VARCHAR(120)        | Unique URL identifier   |
| display_name        | VARCHAR(255)        | Marketing name          |
| legal_name          | VARCHAR(255)        | Nullable                |
| registration_number | VARCHAR(100)        | Nullable                |
| tax_identifier      | VARCHAR(100)        | Nullable                |
| status              | organization_status | Enum                    |
| timezone            | VARCHAR(100)        |                         |
| currency_code       | CHAR(3)             | ISO-4217                |
| language_code       | VARCHAR(10)         |                         |
| logo_url            | TEXT                | Nullable                |
| website             | TEXT                | Nullable                |
| created_at          | TIMESTAMP           |                         |
| updated_at          | TIMESTAMP           |                         |
| deleted_at          | TIMESTAMP           | Nullable                |
| created_by          | UUID                | FK → identity.users     |
| updated_by          | UUID                | FK → identity.users     |

---

## Constraints

```sql
UNIQUE(slug)

UNIQUE(registration_number)
```

Registration number is nullable and unique only when present.

---

## Indexes

```
idx_organizations_slug

idx_organizations_type

idx_organizations_status

idx_organizations_name
```

---

## Security Classification

Confidential

---

## Query Patterns

- Find organization by slug
- Lookup by ID
- Search organizations
- List brands
- List aggregators
- Resolve routing (`autoshipp.in/{brand}`)

---

# 4.2 organization_types

## Purpose

Defines valid organization types.

Current records:

| Code       | Description       |
| ---------- | ----------------- |
| PLATFORM   | AutoShipp         |
| AGGREGATOR | Strategic Partner |
| BRAND      | Merchant          |

---

Columns

| Column       | Type |
| ------------ | ---- |
| id           | UUID |
| code         | TEXT |
| display_name | TEXT |
| description  | TEXT |

---

Unique

```
code
```

---

# 4.3 organization_relationships

## Purpose

Defines hierarchy.

Instead of storing a single `parent_id` in `organizations`, all relationships are modeled here.

This preserves history and supports future hierarchy expansion.

---

## Columns

| Column                 | Type              |
| ---------------------- | ----------------- |
| id                     | UUID              |
| parent_organization_id | UUID              |
| child_organization_id  | UUID              |
| relationship_type      | relationship_type |
| active                 | BOOLEAN           |
| valid_from             | TIMESTAMP         |
| valid_to               | TIMESTAMP NULL    |
| approved_by            | UUID              |

---

Relationship types

```
MANAGES

OWNS

RESELLS

PARTNERS_WITH
```

Initially only **MANAGES** will be used.

The model supports future relationships without schema changes.

---

## Constraint

```
UNIQUE(parent_organization_id,
child_organization_id,
active)
```

---

# 4.4 organization_contacts

Primary contact persons.

Examples:

- Finance
- Technical
- Legal
- Operations

Columns

| Column          | Type   |
| --------------- | ------ |
| id              | UUID   |
| organization_id | UUID   |
| contact_type    | TEXT   |
| name            | TEXT   |
| email           | CITEXT |
| phone           | TEXT   |
| title           | TEXT   |

Organizations may have multiple contacts.

---

# 4.5 organization_addresses

Stores addresses.

Examples:

- Registered office
- Billing address
- Operational address

Columns

| Column          | Type    |
| --------------- | ------- |
| id              | UUID    |
| organization_id | UUID    |
| address_type    | TEXT    |
| line1           | TEXT    |
| line2           | TEXT    |
| city            | TEXT    |
| state           | TEXT    |
| postal_code     | TEXT    |
| country_code    | CHAR(2) |

---

# 4.6 organization_settings

Dynamic organization configuration.

Examples

```json
{
  "default_timezone": "Asia/Kolkata",
  "default_currency": "INR",
  "notification_preferences": {},
  "security": {},
  "branding": {}
}
```

Columns

| Column          | Type    |
| --------------- | ------- |
| organization_id | UUID    |
| settings        | JSONB   |
| version         | INTEGER |

Settings remain configuration.

Never business data.

---

# 4.7 organization_domains

Custom domains.

Examples

```
nike.autoshipp.in

nike.com

dashboard.nike.com
```

Future use:

- White-label portals
- SSO validation
- Email verification

Columns

| Column          | Type      |
| --------------- | --------- |
| id              | UUID      |
| organization_id | UUID      |
| domain          | TEXT      |
| verified        | BOOLEAN   |
| verified_at     | TIMESTAMP |

---

# 4.8 organization_transfer_history

Tracks ownership changes.

Example

```
Brand A

↓

Shiprocket

↓

Transferred

↓

Delhivery
```

Columns

| Column             | Type      |
| ------------------ | --------- |
| id                 | UUID      |
| organization_id    | UUID      |
| previous_parent_id | UUID      |
| new_parent_id      | UUID      |
| transferred_by     | UUID      |
| approved_by        | UUID      |
| transferred_at     | TIMESTAMP |
| reason             | TEXT      |

Append-only.

---

# 4.9 organization_metadata

Flexible metadata.

Allowed examples

```json
{
  "industry": "Fashion",
  "employee_count": 250,
  "annual_revenue": "private"
}
```

Never store operational business data here.

---

# 5. Organization Status Enum

```
DRAFT

PENDING_APPROVAL

ACTIVE

SUSPENDED

INACTIVE

ARCHIVED
```

---

# 6. Relationship Types

```
MANAGES

OWNS

RESELLS

PARTNERS_WITH
```

Future-proof.

---

# 7. Cross-Schema Relationships

Allowed

```
identity.memberships

↓

organization.organizations
```

Allowed

```
billing.subscriptions

↓

organization.organizations
```

Allowed

```
wallet.wallets

↓

organization.organizations
```

Allowed

```
commerce.orders

↓

organization.organizations
```

---

Forbidden

```
organization

↓

fit
```

Products reference organizations but organizations never reference product schemas.

---

# 8. Security Rules

- Organization IDs are immutable.
- Organization slugs are unique.
- Transfers require Platform approval.
- Organization history is never deleted.
- Every update is audited.
- Only Platform API can modify hierarchy.
- Product services have read-only access.

---

# 9. Read/Write Matrix

| Service          | Read | Write |
| ---------------- | ---- | ----- |
| Platform API     | ✅   | ✅    |
| Fit Service      | ✅   | ❌    |
| ETA Service      | ✅   | ❌    |
| Returns Service  | ✅   | ❌    |
| AI Service       | ✅   | ❌    |
| Shipping Service | ✅   | ❌    |

---

# 10. Prisma Ownership

Owned by:

```
packages/prisma-platform
```

Migration ownership belongs exclusively to the Platform API.

---

# 11. Expected Growth

Estimated scale:

- Organizations: <50,000
- Relationships: <100,000
- Contacts: <250,000
- Addresses: <250,000
- Domains: <100,000

The design supports millions of organizations without structural changes.

---

# 12. Migration Strategy

- Organization hierarchy changes are additive.
- Relationship history is never rewritten.
- Slug changes preserve redirect history (future enhancement).
- New organization types can be added without schema changes.

---

# 13. Decision Register

| ID    | Decision                                                                            | Status    |
| ----- | ----------------------------------------------------------------------------------- | --------- |
| D-101 | Organizations are immutable business identities                                     | ✅ Locked |
| D-102 | Organization types are lookup-driven                                                | ✅ Locked |
| D-103 | Hierarchy is modeled through `organization_relationships`, not a `parent_id` column | ✅ Locked |
| D-104 | Organization transfers preserve complete history                                    | ✅ Locked |
| D-105 | Settings and metadata are separated from core organization data                     | ✅ Locked |
| D-106 | Product services have read-only access to organization data                         | ✅ Locked |
| D-107 | Organization history is append-only                                                 | ✅ Locked |
| D-108 | Slugs are globally unique and power routing                                         | ✅ Locked |
| D-109 | Every organization can have multiple contacts, addresses, and domains               | ✅ Locked |
| D-110 | Only the Platform API owns organization CRUD operations                             | ✅ Locked |

---

# 🚨 Architecture Improvement Over the Original Design

After designing both **AES-009** and **AES-010**, I recommend replacing the original tables:

- `core_accounts`
- `account_type`
- `identity_user_accounts`

with the new domain model:

- `organization.organizations`
- `organization.organization_types`
- `organization.organization_relationships`
- `identity.memberships`

This eliminates duplicated concepts ("account" vs. "organization"), gives you a single business identity model, supports direct brands, aggregator-managed brands, future distributors, enterprise hierarchies, and brand transfers without redesign, and aligns every other domain (billing, wallet, marketplace, commerce) around one canonical entity: the **Organization**.

This is a foundational improvement that will simplify the entire platform for years to come.

---

Excellent.

This is where the architecture starts paying off.

Up until now we've built:

- Identity
- Organizations

Now we build the **Commerce Domain**.

This is **arguably the most important business domain** because **every AutoShipp product (Fit, ETA, Returns, AI, Analytics, Marketing, etc.) depends on it**.

This domain is also where we enforce one of your biggest requirements:

> **Never store multiple copies of the same business data.**

The Commerce Domain becomes the **single source of truth** for all synchronized commerce data.

---

# AES-011 — Commerce Schema Specification

**Document ID:** AES-011

**Title:** Commerce Schema Specification

**Version:** 1.0.0

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `commerce`

**Depends On:**

- AES-002 Architecture Principles
- AES-007 Database Architecture
- AES-008 Master Database Blueprint
- AES-010 Organization Schema

---

# Executive Summary

The Commerce Schema stores all synchronized commerce entities imported from external commerce platforms.

It acts as the **canonical commerce foundation** for the entire AutoShipp ecosystem.

Products such as:

- Fit Intelligence
- ETA
- Returns
- AI Assistant
- Marketing
- Analytics

never synchronize Shopify, WooCommerce, Magento, or other commerce platforms directly.

Instead they consume commerce data from this schema.

This eliminates duplicate synchronization, reduces API usage, simplifies maintenance, and guarantees a single source of truth.

---

# 1. Responsibilities

The Commerce Schema owns:

- Stores
- Sales Channels
- Products
- Product Variants
- Collections
- Orders
- Order Items
- Inventory References
- Commerce Sync Metadata

It does **not** own:

- Customers (customer schema)
- Billing
- Wallets
- Product Intelligence (Fit, ETA, Returns)
- Integrations (integration schema)

---

# 2. Schema Overview

```text
commerce

├── stores
├── sales_channels
├── products
├── product_variants
├── product_images
├── collections
├── collection_products
├── orders
├── order_items
├── inventory_locations
├── inventory_levels
├── commerce_sync_jobs
├── commerce_sync_logs
└── external_entity_mappings
```

---

# 3. High-Level ER Model

```text
organizations
      │
      ▼
stores
      │
      ├──────────── products
      │                  │
      │                  ▼
      │          product_variants
      │                  │
      │                  ▼
      │          product_images
      │
      ├──────────── collections
      │                  │
      │                  ▼
      │       collection_products
      │
      └──────────── orders
                         │
                         ▼
                    order_items
```

---

# 4. Core Design Principle

Every commerce entity exists exactly once.

For example:

A Shopify Product

↓

Imported Once

↓

Stored Once

↓

Referenced by every AutoShipp product

Not:

```text
Fit Products

ETA Products

Returns Products

Marketing Products
```

Only one copy.

---

# 5. Table Specifications

---

# 5.1 stores

## Purpose

Represents a connected commerce store.

Examples:

- Shopify Store
- WooCommerce Store
- Magento Store
- Custom Store

---

## Columns

| Column            | Type              | Notes            |
| ----------------- | ----------------- | ---------------- |
| id                | UUID              | PK               |
| organization_id   | UUID              | FK               |
| integration_id    | UUID              | FK → integration |
| platform          | commerce_platform | Enum             |
| external_store_id | TEXT              | Provider ID      |
| name              | TEXT              |                  |
| domain            | TEXT              |                  |
| currency          | CHAR(3)           |                  |
| timezone          | TEXT              |                  |
| status            | store_status      |                  |
| synced_at         | TIMESTAMP         |                  |
| created_at        | TIMESTAMP         |                  |
| updated_at        | TIMESTAMP         |                  |

---

## Constraints

```sql
UNIQUE(integration_id, external_store_id)
```

---

## Indexes

```
idx_stores_organization

idx_stores_platform

idx_stores_status
```

---

# 5.2 products

## Purpose

Canonical product catalog.

Products are synchronized from external commerce platforms.

Products never belong to Fit or ETA.

---

## Columns

| Column              | Type           |
| ------------------- | -------------- |
| id                  | UUID           |
| store_id            | UUID           |
| external_product_id | TEXT           |
| title               | TEXT           |
| description         | TEXT           |
| vendor              | TEXT           |
| product_type        | TEXT           |
| status              | product_status |
| published_at        | TIMESTAMP      |
| created_at          | TIMESTAMP      |
| updated_at          | TIMESTAMP      |

---

## Constraints

```
UNIQUE(store_id, external_product_id)
```

---

## Security

Internal

---

# 5.3 product_variants

One product.

Many variants.

Example.

```text
Nike Air Max

↓

Size 7

↓

Size 8

↓

Size 9
```

Columns

| Column              | Type    |
| ------------------- | ------- |
| id                  | UUID    |
| product_id          | UUID    |
| external_variant_id | TEXT    |
| sku                 | TEXT    |
| barcode             | TEXT    |
| title               | TEXT    |
| option1             | TEXT    |
| option2             | TEXT    |
| option3             | TEXT    |
| price               | NUMERIC |
| compare_at_price    | NUMERIC |
| weight              | NUMERIC |

---

# 5.4 product_images

Stores media references.

Columns

- id
- product_id
- variant_id (nullable)
- url
- alt_text
- position

Images remain external.

Only metadata stored.

---

# 5.5 collections

Examples.

- Summer Collection
- Shoes
- Men
- Sale

Columns

- id
- store_id
- external_collection_id
- title
- description

---

# 5.6 collection_products

Many-to-many.

```
Collection

↓

Products
```

Composite unique.

```
collection_id

product_id
```

---

# 5.7 orders

One of the most referenced tables.

Products never duplicate orders.

Columns.

| Column             | Type      |
| ------------------ | --------- |
| id                 | UUID      |
| organization_id    | UUID      |
| store_id           | UUID      |
| customer_id        | UUID      |
| external_order_id  | TEXT      |
| order_number       | TEXT      |
| currency           | CHAR(3)   |
| financial_status   | TEXT      |
| fulfillment_status | TEXT      |
| subtotal           | NUMERIC   |
| total_tax          | NUMERIC   |
| total_discount     | NUMERIC   |
| total_price        | NUMERIC   |
| ordered_at         | TIMESTAMP |
| synced_at          | TIMESTAMP |

---

Indexes.

```
idx_orders_customer

idx_orders_store

idx_orders_ordered_at

idx_orders_external
```

---

# 5.8 order_items

One order.

Many items.

Columns.

- id
- order_id
- product_id
- variant_id
- quantity
- unit_price
- total_price

Products reference these records.

Never copy them.

---

# 5.9 inventory_locations

Stores warehouse references.

Example.

```text
Mumbai Warehouse

↓

Delhi Warehouse
```

---

# 5.10 inventory_levels

Current inventory snapshot.

Columns.

- location_id
- variant_id
- available
- reserved
- updated_at

Inventory history belongs in a future operational schema if required.

---

# 5.11 commerce_sync_jobs

Tracks synchronization.

Fields.

- Provider
- Started
- Finished
- Status
- Records Imported
- Errors

---

# 5.12 commerce_sync_logs

Append-only.

Used for:

- Debugging
- Auditing
- Replay

---

# 5.13 external_entity_mappings

One of the most important tables.

Maps external IDs.

Example.

```text
Shopify Product

↓

gid://shopify/Product/123

↓

AutoShipp Product UUID
```

Products never store Shopify IDs.

Only this mapping table does.

Supports:

- Shopify
- WooCommerce
- Magento
- Future providers

---

# 6. Enums

## commerce_platform

```
SHOPIFY

WOOCOMMERCE

MAGENTO

CUSTOM

FUTURE
```

---

## store_status

```
ACTIVE

PAUSED

DISCONNECTED

ARCHIVED
```

---

## product_status

```
ACTIVE

DRAFT

ARCHIVED
```

---

# 7. Cross-Schema Relationships

Allowed.

```
organization

↓

stores
```

Allowed.

```
customer.customers

↓

orders
```

Allowed.

```
integration.connections

↓

stores
```

Forbidden.

```
fit

↓

commerce
```

Fit may reference commerce IDs.

Fit never owns commerce entities.

---

# 8. Security Rules

- Commerce data is read-only for products.
- Only the Platform Sync Service writes commerce tables.
- External IDs are immutable.
- Historical orders are never deleted.
- Sync operations are audited.

---

# 9. Read / Write Matrix

| Service               | Read | Write |
| --------------------- | ---- | ----- |
| Platform API          | ✅   | ✅    |
| Commerce Sync Service | ✅   | ✅    |
| Fit Service           | ✅   | ❌    |
| ETA Service           | ✅   | ❌    |
| Returns Service       | ✅   | ❌    |
| AI Service            | ✅   | ❌    |
| Analytics             | ✅   | ❌    |

---

# 10. Prisma Ownership

Owned by:

```
packages/prisma-platform
```

Products receive read-only access through their Prisma clients.

---

# 11. Commerce Synchronization Architecture

```text
Shopify
WooCommerce
Magento
Custom API
        │
        ▼
Integration Service
        │
        ▼
Commerce Sync Service
        │
        ▼
commerce Schema
        │
        ├────────── Fit
        ├────────── ETA
        ├────────── Returns
        ├────────── AI
        ├────────── Analytics
        └────────── Future Products
```

There is **exactly one ingestion pipeline**.

No product independently syncs external platforms.

---

# 12. Growth Expectations

Designed for:

- 100,000+ Stores
- 100M+ Products
- Billions of Orders
- Tens of Billions of Order Items

The schema favors append-heavy workloads with indexed lookups and partition-ready operational tables.

---

# 13. Decision Register

| ID    | Decision                                                            | Status    |
| ----- | ------------------------------------------------------------------- | --------- |
| D-111 | Commerce is the single source of truth for external commerce data   | ✅ Locked |
| D-112 | Products never synchronize external platforms directly              | ✅ Locked |
| D-113 | Stores belong to organizations                                      | ✅ Locked |
| D-114 | Products and variants are canonical entities                        | ✅ Locked |
| D-115 | Orders are immutable historical records                             | ✅ Locked |
| D-116 | External IDs are mapped centrally                                   | ✅ Locked |
| D-117 | Only the Platform Sync Service writes the commerce schema           | ✅ Locked |
| D-118 | Product services have read-only access to commerce data             | ✅ Locked |
| D-119 | Commerce schema is owned exclusively by the Platform API            | ✅ Locked |
| D-120 | One synchronization pipeline serves all current and future products | ✅ Locked |

---

# 🚨 Architecture Improvement Over the Original Design

Your original database scattered commerce concepts across multiple product databases. In the final architecture:

- **Commerce becomes a shared platform domain**.
- Every external platform (Shopify, WooCommerce, Magento, custom APIs) synchronizes **once**.
- Every AutoShipp product—Fit, ETA, Returns, AI, Analytics, Marketing, and future services—reads from the same canonical commerce data.
- Product schemas store only **product-specific intelligence** (recommendations, predictions, return workflows, AI conversations, etc.), never duplicated orders, products, customers, or stores.

This directly fulfills your primary architectural requirement: **reuse shared data wherever possible and eliminate multiple copies of the same business information across services**.

---

Excellent.

Now we design what I consider **the second most important schema after Organization**.

This schema determines **how your platform makes money**.

Not just subscriptions.

Everything commercial.

- Products
- Plans
- Pricing
- Licenses
- Assignments
- Marketplace

One thing I want to point out before we start:

> **The architecture we designed earlier intentionally separates Billing from Marketplace.**

That means:

- **Marketplace** → What exists and who can use it.
- **Billing** → Who pays, how much, invoices, payments.

This separation is what allows your Aggregator model to work.

---

# AES-012 — Marketplace & Product Catalog Schema Specification

**Document ID:** AES-012

**Title:** Marketplace & Product Catalog Schema Specification

**Version:** 1.0.0

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `marketplace`

**Depends On:**

- AES-003 Business Model
- AES-006 Marketplace Domain
- AES-008 Master Database Blueprint
- AES-010 Organization Schema

---

# Executive Summary

The Marketplace Schema is the commercial catalog of the AutoShipp ecosystem.

It answers four fundamental questions:

1. **What products exist?**
2. **How are products organized?**
3. **Who may use a product?**
4. **What capabilities does that product expose?**

It **does not** calculate invoices or process payments.

Billing is handled separately.

The Marketplace Schema enables unlimited future products without schema redesign.

---

# 1. Responsibilities

The Marketplace Schema owns:

- Product Registry
- Product Categories
- Product Versions
- Product Editions
- Product Features
- Product Assignments
- Product Entitlements
- Product Visibility
- Product Metadata
- Product Manifest Registry

It does **not** own:

- Billing
- Payments
- Wallets
- Invoices
- Users
- Organizations
- Product-specific data

---

# 2. Schema Overview

```text
marketplace

├── products
├── product_categories
├── product_versions
├── product_editions
├── product_features
├── product_feature_assignments
├── product_assignments
├── product_entitlements
├── product_manifests
├── product_visibility
└── product_metadata
```

---

# 3. High-Level ER Model

```text
product_categories
        │
        ▼
products
        │
        ├──────────── product_versions
        │
        ├──────────── product_editions
        │                   │
        │                   ▼
        │            product_entitlements
        │
        ├──────────── product_features
        │                   │
        │                   ▼
        │      product_feature_assignments
        │
        ├──────────── product_assignments
        │
        ├──────────── product_manifests
        │
        └──────────── product_metadata
```

---

# 4. Table Specifications

---

# 4.1 products

## Purpose

Canonical registry of every AutoShipp product.

One row = one independently deployable product.

Examples

| Code      | Name                  |
| --------- | --------------------- |
| fit       | Fit Intelligence      |
| eta       | Delivery ETA          |
| returns   | Returns               |
| assistant | AI Commerce Assistant |
| tryon     | Virtual Try-On        |
| shipping  | Shipping              |

---

## Columns

| Column            | Type           |
| ----------------- | -------------- |
| id                | UUID           |
| code              | VARCHAR(50)    |
| name              | VARCHAR(255)   |
| description       | TEXT           |
| category_id       | UUID           |
| owner_service     | VARCHAR(100)   |
| icon              | TEXT           |
| documentation_url | TEXT           |
| health_endpoint   | TEXT           |
| api_endpoint      | TEXT           |
| current_version   | VARCHAR(50)    |
| status            | product_status |
| created_at        | TIMESTAMP      |
| updated_at        | TIMESTAMP      |

---

## Constraints

```sql
UNIQUE(code)
```

---

## Indexes

```text
idx_products_code

idx_products_status

idx_products_category
```

---

# 4.2 product_categories

Examples

```text
Commerce Intelligence

Shipping

AI

Marketing

Analytics

Operations
```

Columns

- id
- code
- name
- description
- sort_order

---

# 4.3 product_versions

Tracks deployed versions.

Example

```text
Fit

↓

2.3.0

↓

2.4.0

↓

2.5.0
```

Columns

- id
- product_id
- version
- released_at
- deprecated_at
- supported

---

# 4.4 product_editions

Represents commercial editions.

Examples

```text
Starter

Professional

Enterprise
```

Columns

| Column      | Type    |
| ----------- | ------- |
| id          | UUID    |
| product_id  | UUID    |
| code        | TEXT    |
| name        | TEXT    |
| description | TEXT    |
| sort_order  | INTEGER |
| active      | BOOLEAN |

---

# 4.5 product_features

Individual capabilities.

Examples

Fit

↓

```text
Recommendations

Analytics

Export

API

Bulk Upload
```

Columns

- id
- product_id
- code
- name
- description

---

# 4.6 product_feature_assignments

Maps editions to features.

Example

```text
Professional

↓

Export

Analytics

Recommendations
```

Composite unique.

```sql
edition_id

feature_id
```

---

# 4.7 product_assignments

One of the most important tables.

Represents access granted to an organization.

Example.

```text
Nike

↓

Fit

↓

Professional Edition
```

Columns

| Column          | Type           |
| --------------- | -------------- |
| id              | UUID           |
| organization_id | UUID           |
| product_id      | UUID           |
| edition_id      | UUID           |
| assigned_by     | UUID           |
| assigned_at     | TIMESTAMP      |
| starts_at       | TIMESTAMP      |
| expires_at      | TIMESTAMP NULL |
| active          | BOOLEAN        |

---

Unique.

```sql
UNIQUE(organization_id, product_id)
```

---

# 4.8 product_entitlements

Represents runtime capabilities.

Example.

```text
Organization

↓

Fit

↓

Export

↓

Enabled
```

Columns

- id
- assignment_id
- feature_id
- enabled
- limit_value
- metadata JSONB

This table overrides edition defaults when necessary.

---

# 4.9 product_manifests

Stores metadata published by each service.

Fields.

- product_id
- version
- permissions
- routes
- widgets
- settings
- feature_flags
- checksum

Manifest stored as JSONB.

---

# 4.10 product_visibility

Determines marketplace presentation.

States.

```text
AVAILABLE

PURCHASED

COMING_SOON

BETA

DEPRECATED
```

Supports:

- Marketplace cards
- Upselling
- Early access
- Beta programs

---

# 4.11 product_metadata

Stores additional configuration.

Examples.

```json
{
  "color": "blue",
  "badge": "New",
  "featured": true
}
```

Presentation only.

Never business logic.

---

# 5. Product Assignment Flow

```text
Organization

↓

Subscription (Billing)

↓

Product Assignment

↓

Edition

↓

Features

↓

Entitlements

↓

Runtime Access
```

Notice.

Billing is upstream.

Marketplace never generates invoices.

---

# 6. Cross-Schema Relationships

Allowed.

```text
organization

↓

product_assignments
```

Allowed.

```text
billing.subscriptions

↓

product_assignments
```

(Reference by subscription_id in the Billing schema; Marketplace consumes the relationship without owning billing.)

Allowed.

```text
feature_flags

↓

products
```

Forbidden.

```text
marketplace

↓

fit
```

Marketplace never stores product intelligence.

---

# 7. Security Rules

- Products cannot assign themselves.
- Only Platform API manages assignments.
- Products cannot modify entitlements.
- Product catalog is globally readable.
- Assignment changes are audited.
- Historical assignments are preserved.

---

# 8. Read / Write Matrix

| Service         | Read | Write |
| --------------- | ---- | ----- |
| Platform API    | ✅   | ✅    |
| Fit Service     | ✅   | ❌    |
| ETA Service     | ✅   | ❌    |
| Returns Service | ✅   | ❌    |
| AI Service      | ✅   | ❌    |
| Marketplace UI  | ✅   | ❌    |

---

# 9. Prisma Ownership

Owned by:

```text
packages/prisma-platform
```

No product service owns Marketplace migrations.

---

# 10. Product Registration Lifecycle

```text
Develop Product

↓

Create Product Record

↓

Register Manifest

↓

Publish Marketplace Entry

↓

Create Editions

↓

Configure Features

↓

Enable Sales

↓

Assign to Organizations
```

---

# 11. Growth Expectations

Designed for:

- Unlimited products
- Unlimited editions
- Unlimited features
- Millions of assignments
- Hundreds of millions of entitlement checks

Runtime authorization should cache entitlements, but the Marketplace schema remains the source of truth.

---

# 12. Decision Register

| ID    | Decision                                                                 | Status    |
| ----- | ------------------------------------------------------------------------ | --------- |
| D-121 | Marketplace is the canonical product catalog                             | ✅ Locked |
| D-122 | Products are independently versioned                                     | ✅ Locked |
| D-123 | Product editions define commercial offerings                             | ✅ Locked |
| D-124 | Features are reusable capabilities within a product                      | ✅ Locked |
| D-125 | Assignments grant organizations access to products                       | ✅ Locked |
| D-126 | Entitlements define runtime capabilities                                 | ✅ Locked |
| D-127 | Marketplace does not own billing                                         | ✅ Locked |
| D-128 | Product manifests are registered centrally                               | ✅ Locked |
| D-129 | Product services have read-only access to marketplace data               | ✅ Locked |
| D-130 | Product lifecycle is standardized across all current and future products | ✅ Locked |

---

# 🚨 Architecture Improvement Over the Original Design

Compared with your initial `core_account_modules` approach, this architecture introduces a much richer and more extensible model:

- `products` replace hardcoded module definitions with a true product registry.
- `product_editions` support Starter, Professional, Enterprise, and future plans without changing code.
- `product_features` and `product_entitlements` separate commercial offerings from runtime capabilities.
- `product_assignments` replace simple enable/disable flags with a complete licensing model tied to organizations.
- Every future AutoShipp product—whether built internally or introduced later—can be onboarded by registering it in the Marketplace, publishing a manifest, defining editions and features, and assigning it to organizations, all without modifying the underlying schema.

This design fully supports your goals of a modular platform, aggregator-managed licensing, independent product deployments, and long-term expansion while maintaining a single, reusable commercial foundation.

---

Excellent.

This is the document that finally answers **how AutoShipp earns revenue**.

After the last few documents, we now have:

- Organizations ✅
- Commerce ✅
- Marketplace ✅

Now we design **Billing**.

This is where I want to make another architectural improvement over a traditional SaaS billing system.

Most SaaS products tightly couple:

```
Subscription
↓

Invoice

↓

Payment

↓

Access
```

We are **not** doing that.

For AutoShipp we already decided:

```
Billing

↓

Invoices

↓

Payments

↓

Wallet

↓

Commercial Record
```

while

```
Marketplace

↓

Assignment

↓

Entitlement

↓

Runtime Access
```

These remain independent.

This is why your Aggregator model works naturally.

---

# AES-013 — Billing Schema Specification

**Document ID:** AES-013

**Title:** Billing Schema Specification

**Version:** 1.0.0

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `billing`

**Depends On:**

- AES-003 Business Model
- AES-006 Marketplace Domain
- AES-008 Master Database Blueprint
- AES-010 Organization Schema
- AES-012 Marketplace Schema

---

# Executive Summary

The Billing Schema manages the commercial relationship between AutoShipp and Organizations.

It owns:

- Commercial subscriptions
- Plans
- Pricing
- Invoices
- Invoice items
- Payments
- Taxes
- Credits
- Billing history

The Billing Schema **never determines runtime access**.

That responsibility belongs to Marketplace Assignments.

This separation enables:

- Aggregator billing
- Enterprise billing
- Future reseller billing
- Marketplace bundles
- Flexible pricing

without changing authorization.

---

# 1. Responsibilities

The Billing Schema owns:

- Plans
- Pricing
- Subscriptions
- Subscription Items
- Invoices
- Invoice Line Items
- Payments
- Payment Methods
- Credit Notes
- Tax Configuration
- Billing Events

It does **not** own:

- Product assignments
- Runtime access
- Wallet balances
- Organizations
- Users

---

# 2. Schema Overview

```text
billing

├── plans
├── plan_prices
├── subscriptions
├── subscription_items
├── invoices
├── invoice_items
├── payments
├── payment_methods
├── credit_notes
├── taxes
├── billing_events
└── billing_metadata
```

---

# 3. High-Level ER Model

```text
plans
      │
      ▼
plan_prices
      │
      ▼
subscriptions
      │
      ▼
subscription_items
      │
      ▼
invoices
      │
      ▼
invoice_items
      │
      ▼
payments
```

---

# 4. Billing Principles

The Billing Domain answers only commercial questions.

Examples:

Who pays?

↓

Billing

---

How much?

↓

Billing

---

How often?

↓

Billing

---

Which invoice?

↓

Billing

---

Can the organization access Fit?

↓

Marketplace

NOT Billing.

---

# 5. Table Specifications

---

# 5.1 plans

## Purpose

Commercial products sold by AutoShipp.

Examples

```text
Fit Starter

Fit Professional

ETA Enterprise

Returns Professional
```

---

Columns

| Column        | Type          |
| ------------- | ------------- |
| id            | UUID          |
| product_id    | UUID          |
| code          | TEXT          |
| name          | TEXT          |
| billing_model | billing_model |
| active        | BOOLEAN       |
| created_at    | TIMESTAMP     |

---

Unique

```sql
UNIQUE(product_id, code)
```

---

# 5.2 plan_prices

Supports multiple pricing models.

Examples.

```text
Monthly

Yearly

Quarterly

Usage

Credits
```

Columns.

| Column         | Type           |
| -------------- | -------------- |
| id             | UUID           |
| plan_id        | UUID           |
| currency       | CHAR(3)        |
| billing_cycle  | billing_cycle  |
| amount         | NUMERIC(18,2)  |
| effective_from | TIMESTAMP      |
| effective_to   | TIMESTAMP NULL |

Historical pricing is preserved.

---

# 5.3 subscriptions

Represents a commercial agreement.

One organization.

One plan.

One billing relationship.

Columns.

| Column          | Type                |
| --------------- | ------------------- |
| id              | UUID                |
| organization_id | UUID                |
| plan_id         | UUID                |
| status          | subscription_status |
| starts_at       | TIMESTAMP           |
| renews_at       | TIMESTAMP           |
| ends_at         | TIMESTAMP           |
| auto_renew      | BOOLEAN             |

---

Important.

Subscription does NOT grant access.

---

# 5.4 subscription_items

Supports:

- Bundles
- Add-ons
- Multiple products
- Future marketplace bundles

Columns.

- subscription_id
- product_id
- quantity
- unit_price
- metadata

---

# 5.5 invoices

Commercial invoice.

Columns.

| Column          | Type           |
| --------------- | -------------- |
| id              | UUID           |
| organization_id | UUID           |
| invoice_number  | TEXT           |
| issue_date      | DATE           |
| due_date        | DATE           |
| subtotal        | NUMERIC        |
| tax_total       | NUMERIC        |
| discount_total  | NUMERIC        |
| grand_total     | NUMERIC        |
| currency        | CHAR(3)        |
| status          | invoice_status |

---

Aggregators receive one invoice.

Example.

```text
Invoice

↓

Aggregator

↓

Brand A

↓

₹30,000

↓

Brand B

↓

₹15,000

↓

Brand C

↓

₹60,000

↓

TOTAL
```

Invoice items provide brand-level breakdowns.

---

# 5.6 invoice_items

Each invoice contains multiple items.

Columns.

| Column               | Type    |
| -------------------- | ------- |
| id                   | UUID    |
| invoice_id           | UUID    |
| organization_id      | UUID    |
| subscription_item_id | UUID    |
| description          | TEXT    |
| quantity             | NUMERIC |
| unit_price           | NUMERIC |
| total                | NUMERIC |

Notice.

organization_id here represents the consuming organization.

The invoice still belongs to the paying organization.

---

# 5.7 payments

Tracks incoming payments.

Columns.

- id
- invoice_id
- payment_method_id
- amount
- currency
- provider_reference
- paid_at
- status

Supports partial payments.

---

# 5.8 payment_methods

Examples.

```text
UPI

Razorpay

Bank Transfer

Credit Card

Wallet

Future Providers
```

Stores:

- Provider
- Token
- Metadata

Sensitive information is tokenized.

---

# 5.9 credit_notes

Supports.

- Refunds
- Billing adjustments
- Promotional credits

Linked to invoices.

Never modifies original invoice.

---

# 5.10 taxes

Stores tax configuration.

Examples.

GST

VAT

Sales Tax

Future country-specific rules.

---

# 5.11 billing_events

Append-only.

Tracks.

Subscription created.

Invoice generated.

Payment received.

Refund issued.

Renewal.

Cancellation.

---

# 5.12 billing_metadata

Dynamic commercial metadata.

Examples.

```json
{
  "sales_owner": "Enterprise Team",
  "contract": "2026-001"
}
```

Configuration only.

---

# 6. Billing Flow

```text
Marketplace Purchase

↓

Subscription

↓

Invoice Generation

↓

Payment

↓

Wallet (if applicable)

↓

Accounting
```

Assignment occurs independently.

---

# 7. Aggregator Billing

The architecture directly supports your business model.

Example.

```text
Aggregator

↓

Subscription

↓

Brands

↓

Assignments

↓

Usage

↓

One Invoice
```

Invoice.

```
Bill To

ABC Logistics

-----------------------------------

Nike

Fit

ETA

Returns

₹40,000

-----------------------------------

Puma

Fit

₹10,000

-----------------------------------

Adidas

Fit

ETA

₹18,000

-----------------------------------

Grand Total

₹68,000
```

No duplicate subscriptions.

No duplicate invoices.

---

# 8. Cross-Schema Relationships

Allowed.

```
organization

↓

subscriptions
```

Allowed.

```
marketplace.products

↓

plans
```

Allowed.

```
wallet.transactions

↓

payments
```

Forbidden.

```
billing

↓

fit
```

Billing never references product schemas.

---

# 9. Security Rules

- Invoice numbers immutable after issuance.
- Payments append-only.
- Historical pricing preserved.
- Tax calculations auditable.
- No invoice deletion.
- No payment deletion.

---

# 10. Read / Write Matrix

| Service        | Read | Write |
| -------------- | ---- | ----- |
| Platform API   | ✅   | ✅    |
| Billing Worker | ✅   | ✅    |
| Wallet Service | ✅   | RO    |
| Products       | RO   | ❌    |

---

# 11. Prisma Ownership

Owned by.

```
packages/prisma-platform
```

---

# 12. Growth Expectations

Designed for.

- Millions of subscriptions
- Hundreds of millions of invoices
- Billions of invoice items
- Multiple currencies
- Multi-country taxation
- Enterprise contracts

No redesign required.

---

# 13. Enums

## billing_model

```
LICENSE

USAGE

CREDITS

HYBRID
```

---

## billing_cycle

```
MONTHLY

QUARTERLY

YEARLY

CUSTOM
```

---

## subscription_status

```
ACTIVE

PAUSED

EXPIRED

CANCELLED

TRIAL
```

---

## invoice_status

```
DRAFT

OPEN

PARTIALLY_PAID

PAID

VOID

OVERDUE
```

---

## payment_status

```
PENDING

SUCCESS

FAILED

REFUNDED
```

---

# 14. Decision Register

| ID    | Decision                                                                   | Status    |
| ----- | -------------------------------------------------------------------------- | --------- |
| D-131 | Billing is independent of licensing                                        | ✅ Locked |
| D-132 | Subscriptions represent commercial agreements only                         | ✅ Locked |
| D-133 | Marketplace controls access, not Billing                                   | ✅ Locked |
| D-134 | Historical pricing is immutable                                            | ✅ Locked |
| D-135 | Aggregators receive consolidated invoices                                  | ✅ Locked |
| D-136 | Invoice items support per-brand commercial breakdowns                      | ✅ Locked |
| D-137 | Payments are append-only financial records                                 | ✅ Locked |
| D-138 | Credit notes adjust invoices without mutation                              | ✅ Locked |
| D-139 | Billing supports multiple pricing models (License, Usage, Credits, Hybrid) | ✅ Locked |
| D-140 | Billing schema is owned exclusively by the Platform API                    | ✅ Locked |

---

# 🚨 Architecture Improvement Over the Original Design

Compared to a traditional SaaS billing system, this design intentionally separates **commercial contracts** from **runtime licensing**:

- **Marketplace** decides _who is entitled to use a product_.
- **Billing** decides _who pays and how much_.
- **Wallet** (next document) decides _how credits and balances are consumed_.

This directly supports your aggregator model:

- One subscription can cover multiple brands.
- One invoice is issued to the aggregator.
- Each invoice still contains a complete per-brand product cost breakdown.
- Brands can later move to another aggregator without rewriting historical invoices or subscriptions.
- Future pricing models (usage-based AI calls, prepaid credits, hybrid subscriptions, enterprise contracts) fit into the same architecture without schema redesign.

This separation gives AutoShipp an enterprise-grade commercial foundation that can evolve with new products, pricing strategies, and partner models while keeping authorization and billing cleanly decoupled.

---

Excellent.

Now we design the **Wallet Domain**.

This is where I want to make another architectural improvement.

From our earlier discussions, we decided that AutoShipp will eventually support:

- Subscription billing
- Wallet top-ups
- AI credits
- Usage-based pricing
- Hybrid pricing
- Future marketplace purchases

If we make the wallet just a "balance" table, we'll regret it within a year.

Instead, we're going to design it like a **bank ledger**.

**The wallet never stores money.**

It stores **transactions**.

The balance is derived from those transactions (and can be cached for performance).

This is how Stripe, Razorpay, modern banking systems, and enterprise accounting systems are designed.

---

# AES-014 — Wallet & Credits Schema Specification

**Document ID:** AES-014

**Title:** Wallet & Credits Schema Specification

**Version:** 2.0.0 (Amended by AES-014 Addendum — Wallet as a Platform Financial Service)

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `wallet`

**Depends On:**

- AES-010 Organization Schema
- AES-012 Marketplace Schema
- AES-013 Billing Schema

---

# Executive Summary

The Wallet is a **prepaid platform credit ledger**. It does not store real money.

Platform credits are purchased through the Billing domain (AES-013). Every AutoShipp product — AI, WhatsApp, Analytics, ETA, Returns, and all future products — consumes credits by calling the Wallet through the Platform API (D-150). The credit unit is abstract. Its relationship to real currency is determined at the time of purchase by the Billing domain. The Wallet has no knowledge of product pricing.

The Wallet is **not** an accounting system. It is a transactional ledger that records financial movements.

## Three-Layer Platform Model

Every product interaction with the Wallet follows this model:

```text
Product (any: AI, WhatsApp, Analytics, ETA, Returns...)
       ↓
  Pricing Engine (owned by the product — not part of the Wallet)
       ↓
  Platform Wallet
       ↓
  Ledger (wallet_transactions — immutable, append-only)
```

**Pricing Engine** is a logical architectural boundary owned by the consuming product. It is not part of the Wallet domain. Its physical form is an implementation detail of each product. The Wallet never contains pricing logic. The Wallet's only input from products is:

```
{ organizationId, amount, idempotencyKey, referenceType, referenceId }
```

---

# 1. Responsibilities

The Wallet Schema owns:

- Wallet Accounts
- Wallet Transactions
- Wallet Balances
- Credit Packages
- Credit Purchases
- Credit Consumption
- Promotional Credits
- Wallet Adjustments
- Wallet Audit Trail
- Usage Statements

It does **not** own:

- Invoices
- Payments
- Subscriptions
- Product Assignments
- Product Usage Logic
- Pricing calculation of any kind

The Wallet does **not**:

- Calculate the cost of any operation. That is the responsibility of the calling product's Pricing Engine.
- Know which product called it. It records `reference_type` and `reference_id` as opaque identifiers.
- Manage product access or subscriptions. That belongs to Marketplace (AES-012).
- Know which domains react to its events. It emits facts. Consumers decide actions.

---

# 2. Schema Overview

```text
wallet

├── wallets
├── wallet_transactions
├── wallet_transaction_types
├── wallet_balances
├── credit_packages
├── credit_purchases
├── wallet_adjustments
├── wallet_reservations
├── wallet_metadata
├── wallet_statements
└── wallet_statement_runs
```

---

# 3. High-Level ER Model

```text
organizations
      │
      ▼
wallets
      │
      ├────────── wallet_transactions
      │
      ├────────── wallet_balances
      │
      ├────────── credit_purchases
      │
      ├────────── wallet_adjustments
      │
      └────────── wallet_reservations
```

---

# 4. Ledger Principle

**This is the most important design rule.**

Money is never updated.

Transactions are appended.

Example

```text
Top-up +₹10,000

↓

AI Usage -₹500

↓

Refund +₹200

↓

Adjustment -₹100
```

Current balance

↓

₹9,600

No transaction is ever edited.

No transaction is deleted.

---

# 5. Table Specifications

---

# 5.1 wallets

## Purpose

Represents a wallet that holds platform credits for an organization.

## Wallet Ownership Rules

| Organization Type                | Wallet Ownership                                                   |
| :------------------------------- | :----------------------------------------------------------------- |
| `INDEPENDENT_BRAND`              | Owns exactly one PRIMARY wallet directly.                          |
| `AGGREGATOR`                     | Owns exactly one PRIMARY wallet directly.                          |
| `BRAND` managed by an Aggregator | Owns no wallet. Credits resolve to the parent Aggregator's wallet. |

Wallet ownership follows the organization hierarchy defined by AES-010. Not every organization owns a wallet directly.

## Wallet Resolver

The `resolveWallet(organizationId)` function is the single entry point for all wallet resolution. No product service, controller, or worker performs wallet resolution independently.

Resolution traverses `organization_relationships` (AES-010, `relationship_type = MANAGES`) until a wallet is found or the root is reached. Traversal depth is governed by the organization hierarchy, not a fixed value.

```text
resolveWallet(organizationId):

  1. Query wallets WHERE organization_id = organizationId.
     If found → return that wallet (regardless of status).

  2. If not found →
     Follow organization_relationships WHERE
       child_organization_id = organizationId
       AND relationship_type = 'MANAGES'
       AND active = TRUE.
     Move up to parent_organization_id and repeat from step 1.

  3. If root reached and no wallet found →
     Semantic outcome: wallet-not-found.
```

The resolver answers one question: **which wallet owns these credits?**

Status validation is a separate step performed after resolution. Each condition is semantically distinct:

```text
resolveWallet(organizationId)
       ↓
Semantic outcome: wallet found  OR  wallet-not-found
       ↓ (if found)
Check wallet.status
  → SUSPENDED: semantic outcome: wallet-suspended
  → CLOSED:    semantic outcome: wallet-closed
  → ACTIVE:    continue
       ↓
Check available_balance >= amount
  → Insufficient: semantic outcome: insufficient-credits
       ↓
Process
```

Implementation maps each semantic outcome to the appropriate error type. Concrete exception names are not locked by this architecture.

## Wallet Status vs Credit Exhaustion

`wallet.status` is an **administrative state** stored on the wallet record. It reflects a deliberate platform decision independent of balance.

| Status      | Cause                           | Balance Relationship            |
| :---------- | :------------------------------ | :------------------------------ |
| `ACTIVE`    | Default state                   | Any balance, including zero     |
| `SUSPENDED` | Admin action, fraud, compliance | Any balance, including positive |
| `CLOSED`    | Account terminated              | Any balance                     |

`credits_exhausted` is a **financial state** derived from the ledger. It is not stored on the wallet record. It is computed after every debit and emitted as an event when `available_balance = 0`. These two concepts must never be conflated.

---

Columns

| Column          | Type          |
| --------------- | ------------- |
| id              | UUID          |
| organization_id | UUID          |
| wallet_type     | wallet_type   |
| currency        | CHAR(3)       |
| status          | wallet_status |
| created_at      | TIMESTAMP     |
| updated_at      | TIMESTAMP     |

---

Constraint

```sql
UNIQUE(organization_id, wallet_type)
```

---

# 5.2 wallet_transactions

The heart of the Wallet domain.

Every financial movement is stored here.

---

Columns

| Column              | Type                  | Notes                                              |
| ------------------- | --------------------- | -------------------------------------------------- |
| id                  | UUID                  | PK                                                 |
| wallet_id           | UUID                  | FK → wallets                                       |
| transaction_type_id | UUID                  | FK → wallet_transaction_types                      |
| amount              | NUMERIC(18,2)         |                                                    |
| direction           | transaction_direction | CREDIT or DEBIT                                    |
| reference_type      | TEXT                  | Opaque product identifier                          |
| reference_id        | UUID                  | Opaque product record ID                           |
| idempotency_key     | TEXT                  | NOT NULL, UNIQUE — mandatory for every transaction |
| description         | TEXT                  |                                                    |
| metadata            | JSONB                 |                                                    |
| created_at          | TIMESTAMP             |                                                    |
| created_by          | UUID                  |                                                    |

**Idempotency key format by source:**

| Source             | Key Format                                    | Example                               |
| :----------------- | :-------------------------------------------- | :------------------------------------ |
| Product debit      | `{product}:{operation}:{eventId}`             | `ai:chat_completion:req_abc123`       |
| Invoice top-up     | `billing:invoice_paid:{invoiceId}`            | `billing:invoice_paid:inv_999`        |
| Credit package     | `billing:package_purchased:{purchaseId}`      | `billing:package_purchased:pkg_001`   |
| Reservation expiry | `cleanup:reservation_expired:{reservationId}` | `cleanup:reservation_expired:res_456` |
| Manual adjustment  | `admin:adjustment:{adjustmentId}`             | `admin:adjustment:adj_789`            |
| Promotional credit | `promotion:{campaignId}:{orgId}`              | `promotion:summer2026:org_123`        |

---

Example

```text
Wallet

↓

Transaction

↓

AI Credits

↓

-50
```

---

No UPDATE.

No DELETE.

Append-only.

---

# 5.3 wallet_transaction_types

Lookup table.

Examples

```text
TOPUP

PURCHASE

USAGE

REFUND

PROMOTION

ADJUSTMENT

EXPIRY

REVERSAL
```

---

Columns

- id
- code
- name
- affects_balance
- description

---

# 5.4 wallet_balances

Performance cache.

Actual source of truth

↓

wallet_transactions

Balance

↓

Cached

Columns

| Column            | Type      |
| ----------------- | --------- |
| wallet_id         | UUID      |
| available_balance | NUMERIC   |
| reserved_balance  | NUMERIC   |
| updated_at        | TIMESTAMP |

Can always be rebuilt from transactions.

---

# 5.5 credit_packages

Products sold through billing.

Examples

```text
10,000 AI Credits

50,000 AI Credits

100,000 AI Credits
```

---

Columns

| Column   | Type    |
| -------- | ------- |
| id       | UUID    |
| code     | TEXT    |
| credits  | BIGINT  |
| price    | NUMERIC |
| currency | CHAR(3) |
| active   | BOOLEAN |

---

# 5.6 credit_purchases

Represents purchase history.

Columns

- id
- wallet_id
- package_id
- invoice_id
- purchased_credits
- expires_at
- purchased_at

Purchasing creates wallet transactions.

---

# 5.7 wallet_adjustments

Administrative adjustments.

Examples

```text
Support Credit

Manual Refund

Billing Correction
```

Columns

- id
- wallet_transaction_id
- reason
- approved_by
- notes

---

# 5.8 wallet_reservations

**Reservations are opt-in.** They are not the default consumption path. Reservation is used only by products with long-running operations that require hold semantics to prevent overspending. Immediate debit (Section 6, Path A) is the default for all products.

Supports future workflows.

Example

AI Request

↓

Reserve Credits

↓

Execute AI

↓

Commit

or

↓

Release

Columns

| Column         | Type           |
| -------------- | -------------- |
| id             | UUID           |
| wallet_id      | UUID           |
| reference_type | TEXT           |
| reference_id   | UUID           |
| amount         | NUMERIC        |
| reserved_at    | TIMESTAMP      |
| expires_at     | TIMESTAMP      |
| released_at    | TIMESTAMP NULL |
| release_reason | TEXT NULL      |

Prevents double spending.

---

## 5.8a Reservation Expiration — Cleanup Owner (Amendment — v1.1)

AES-022 mentioned reservation cleanup without defining it.

This section closes that gap.

**The Cleanup Worker owns reservation expiration.**

Every 60 seconds, the Cleanup Worker executes:

```sql
SELECT *
FROM wallet.wallet_reservations
WHERE expires_at < NOW()
  AND released_at IS NULL;
```

For each expired reservation:

**Step 1 — Insert compensating transaction (CREDIT back to wallet)**

```sql
INSERT INTO wallet.wallet_transactions (
    id, wallet_id, transaction_type_id,
    amount, direction, reference_type, reference_id,
    description, created_at, created_by
)
VALUES (
    gen_random_uuid(),
    :walletId,
    :reversalTransactionTypeId,    -- REVERSAL type
    :reservedAmount,
    'CREDIT',                       -- returning the reserved amount
    'wallet_reservation',
    :reservationId,
    'Expired reservation auto-released',
    NOW(),
    'system'
);
```

**Step 2 — Mark reservation released**

```sql
UPDATE wallet.wallet_reservations
SET released_at    = NOW(),
    release_reason = 'EXPIRED_AUTO_RELEASED'
WHERE id = :reservationId;
```

**Step 3 — Update cached balance**

```sql
UPDATE wallet.wallet_balances
SET available_balance = available_balance + :reservedAmount,
    reserved_balance  = reserved_balance - :reservedAmount,
    updated_at        = NOW()
WHERE wallet_id = :walletId;
```

**Step 4 — Emit event**

```json
{
  "eventName": "wallet.reservation.expired",
  "payload": {
    "walletId": "...",
    "reservationId": "...",
    "amount": 15.0,
    "referenceType": "ai_request",
    "referenceId": "..."
  }
}
```

**Monitoring:**

| Metric                                         | Alert                                   |
| ---------------------------------------------- | --------------------------------------- |
| Expired reservations per minute > 100          | 🟡 Warning (AI service may be crashing) |
| Reservation amount expired in 1 hour > ₹10,000 | 🔴 Alert operations team                |

High expired reservation rates indicate product service instability.

---

# 5.9 wallet_metadata

Future configuration.

Examples

```json
{
  "daily_limit": 10000,
  "low_balance_alert": 500
}
```

---

# 5.10 wallet_statements

Generation record for monthly usage statements.

Statements are usage reports. They are not invoices (D-164).

All financial values are computed on-demand from `wallet_transactions`. Nothing is stored here except the generation metadata.

Columns

| Column               | Type             | Notes                                             |
| -------------------- | ---------------- | ------------------------------------------------- |
| id                   | UUID             | PK                                                |
| wallet_id            | UUID             | FK → wallets                                      |
| period_start         | TIMESTAMP        | First moment of the calendar month (inclusive)    |
| period_end           | TIMESTAMP        | First moment of the following month (exclusive)   |
| generated_at         | TIMESTAMP NULL   | When the last successful generation completed     |
| generated_by_version | TEXT NULL        | Platform API version that generated the statement |
| status               | statement_status | PENDING, GENERATED, FAILED                        |

Constraint

```sql
UNIQUE(wallet_id, period_start)
```

One and only one statement record per wallet per period.

Generation scope: all wallets that had at least one `wallet_transaction` during the period — regardless of `wallet.status`. A customer is entitled to a usage report even if their wallet is suspended or closed.

---

# 5.11 wallet_statement_runs

Generation attempt log for `wallet_statements`.

Multiple attempts may be made against the same statement record. The statement row is never duplicated.

Columns

| Column        | Type           | Notes                      |
| ------------- | -------------- | -------------------------- |
| id            | UUID           | PK                         |
| statement_id  | UUID           | FK → wallet_statements     |
| attempted_at  | TIMESTAMP      |                            |
| completed_at  | TIMESTAMP NULL |                            |
| status        | run_status     | RUNNING, SUCCEEDED, FAILED |
| error_message | TEXT NULL      | Populated on failure       |

---

# 6. Wallet Flow

Two consumption paths exist. Products declare which path they use at integration time.

## Path A — Immediate Debit (Default)

Used by all products by default. No reservation required.

```text
Product completes operation
       ↓
Pricing Engine (product-owned) calculates credit cost
       ↓
Product → Platform API: debit(organizationId, amount, idempotencyKey, referenceType, referenceId)
       ↓
WalletService.resolveWallet(organizationId)
  Semantic outcome: wallet found  OR  wallet-not-found
       ↓
Check wallet.status
  Semantic outcome: active  OR  wallet-suspended  OR  wallet-closed
       ↓
Idempotency check (idempotencyKey)
  → Already processed: operation is a no-op
  → New: continue
       ↓
Acquire row-level lock (SELECT ... FOR UPDATE on wallet_balances)
       ↓
Validate available_balance >= amount
  Semantic outcome: sufficient  OR  insufficient-credits
       ↓
INSERT wallet_transaction (DEBIT, immutable)
       ↓
UPDATE wallet_balances (available_balance -= amount)
       ↓
Post-debit threshold checks:
  IF available_balance = 0 → emit wallet.credits_exhausted
  IF available_balance > 0 AND <= low_balance_threshold → emit wallet.low_balance
       ↓
Emit wallet.debited (Transactional Outbox, AES-036)
```

## Path B — Reserve-then-Commit (Opt-in)

Used only by products with long-running operations that require hold semantics. See Section 5.8.

```text
Product initiates long-running operation
       ↓
Product → Platform API: reserve(organizationId, amount, referenceType, referenceId, expiresAt)
       ↓
WalletService creates wallet_reservation
available_balance moves to reserved_balance
       ↓
Product executes operation
       ↓
On success: commit — INSERT wallet_transaction (DEBIT)
On failure or timeout: Cleanup Worker releases → INSERT compensating CREDIT (REVERSAL)
                                               → emit wallet.reservation.expired
```

## Credit Flow (all sources)

```text
Credit Source emits domain event
       ↓
Wallet Worker (BullMQ) consumes event
       ↓
WalletService.credit(walletId, amount, idempotencyKey, transactionTypeId, referenceType, referenceId)
       ↓
Idempotency check → if duplicate, no-op
       ↓
INSERT wallet_transaction (CREDIT, immutable)
       ↓
UPDATE wallet_balances (available_balance += amount)
       ↓
IF previous available_balance = 0 AND new > 0 → emit wallet.credits_restored
       ↓
Emit wallet.credited (Transactional Outbox, AES-036)
```

---

# 7. Platform Consumption Example

Applies identically to every product: AI, WhatsApp, Analytics, ETA, Returns, or any future product.

```text
Organization wallet balance: ₹10,000

Product A (AI) completes a request
Pricing Engine calculates: ₹12
Product A sends debit: amount=12, idempotencyKey='ai:chat:req_001'
Ledger: -₹12 → balance ₹9,988

Product B (WhatsApp) sends a message
Pricing Engine calculates: ₹0.50
Product B sends debit: amount=0.50, idempotencyKey='wa:message:msg_002'
Ledger: -₹0.50 → balance ₹9,987.50

Invoice paid → billing.invoice.paid event
Wallet Worker credits: +₹5,000, idempotencyKey='billing:invoice_paid:inv_123'
Ledger: +₹5,000 → balance ₹14,987.50
```

The Wallet processes all products identically. Product identity is captured in `reference_type` only.

---

# 8. Cross-Schema Relationships

Allowed.

```text
organization

↓

wallet
```

Allowed.

```text
billing.payments

↓

wallet_transactions
```

Allowed.

```text
assistant.ai_requests

↓

wallet_transactions
```

(reference only; AI never writes the Wallet schema directly)

Forbidden.

```text
fit

↓

wallet
```

Products never manipulate balances.

---

# 9. Security Rules

- Transactions are immutable.
- Balances are derived.
- Wallets cannot go negative unless explicitly allowed by policy.
- Every transaction is audited.
- Adjustments require privileged approval.
- Financial history is never deleted.

---

# 10. Read / Write Matrix

| Service        | Read | Write |
| -------------- | ---- | ----- |
| Platform API   | ✅   | ✅    |
| Billing Worker | ✅   | ✅    |
| Wallet Service | ✅   | ✅    |
| AI Assistant   | ✅   | ❌    |
| Fit            | ✅   | ❌    |
| ETA            | ✅   | ❌    |
| Returns        | ✅   | ❌    |

Product services request debits through Platform APIs.

---

# 11. Prisma Ownership

Owned by:

```text
packages/prisma-platform
```

Wallet migrations belong exclusively to the Platform API.

---

# 12. Growth Expectations

Designed for:

- Millions of wallets
- Billions of transactions
- Real-time balance checks
- High-volume AI consumption
- Multi-currency support
- Future prepaid and postpaid models

The append-only ledger supports financial auditing and horizontal scaling.

---

# 13. Enums

## wallet_type

```text
PRIMARY

PROMOTIONAL

REWARD
```

---

## wallet_status

```text
ACTIVE

SUSPENDED

CLOSED
```

---

## transaction_direction

```text
CREDIT

DEBIT
```

---

# 14. Decision Register

| ID    | Decision                                                                                                                                                                                                                                                                                                                                                                                                                                       | Status    |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| D-141 | Wallet is an append-only ledger                                                                                                                                                                                                                                                                                                                                                                                                                | ✅ Locked |
| D-142 | Balances are derived from transactions                                                                                                                                                                                                                                                                                                                                                                                                         | ✅ Locked |
| D-143 | Wallet supports multiple future wallet types                                                                                                                                                                                                                                                                                                                                                                                                   | ✅ Locked |
| D-144 | Credit packages are commercial products                                                                                                                                                                                                                                                                                                                                                                                                        | ✅ Locked |
| D-145 | Wallet reservations prevent double spending                                                                                                                                                                                                                                                                                                                                                                                                    | ✅ Locked |
| D-146 | Products never modify wallet data directly                                                                                                                                                                                                                                                                                                                                                                                                     | ✅ Locked |
| D-147 | Wallet adjustments require privileged approval                                                                                                                                                                                                                                                                                                                                                                                                 | ✅ Locked |
| D-148 | Financial records are immutable                                                                                                                                                                                                                                                                                                                                                                                                                | ✅ Locked |
| D-149 | Wallet supports subscription, usage, and hybrid pricing models                                                                                                                                                                                                                                                                                                                                                                                 | ✅ Locked |
| D-150 | Wallet schema is owned exclusively by the Platform API                                                                                                                                                                                                                                                                                                                                                                                         | ✅ Locked |
| D-151 | The Wallet is a prepaid platform credit ledger. It does not store real money.                                                                                                                                                                                                                                                                                                                                                                  | ✅ Locked |
| D-152 | Products calculate their own credit costs. The Wallet does not compute pricing. Pricing Engine is a logical boundary owned by the consuming product; it is not part of the Wallet domain.                                                                                                                                                                                                                                                      | ✅ Locked |
| D-153 | Brands managed by an Aggregator own no wallet. Their credits resolve to the parent's wallet via the organization hierarchy (AES-010).                                                                                                                                                                                                                                                                                                          | ✅ Locked |
| D-154 | Wallet resolution traverses `organization_relationships` following AES-010. Depth is governed by the hierarchy, not a fixed value. Resolution does not filter on wallet status; status validation is a separate step.                                                                                                                                                                                                                          | ✅ Locked |
| D-155 | Immediate debit is the default consumption path for all products.                                                                                                                                                                                                                                                                                                                                                                              | ✅ Locked |
| D-156 | Reservations are opt-in for products with long-running operations requiring hold semantics.                                                                                                                                                                                                                                                                                                                                                    | ✅ Locked |
| D-157 | Every `wallet_transaction` must have an `idempotency_key`. No exceptions, including system-generated transactions.                                                                                                                                                                                                                                                                                                                             | ✅ Locked |
| D-158 | `wallet_transactions.idempotency_key` has a UNIQUE database constraint. Wallet operations are idempotent.                                                                                                                                                                                                                                                                                                                                      | ✅ Locked |
| D-159 | The Wallet emits `wallet.credits_exhausted` as a fact. It does not specify which products or domains must react.                                                                                                                                                                                                                                                                                                                               | ✅ Locked |
| D-160 | The Wallet emits `wallet.credits_restored` when balance rises above zero after exhaustion. Consuming domains react independently.                                                                                                                                                                                                                                                                                                              | ✅ Locked |
| D-161 | Wallet Statements are derived usage reports for calendar months. They store no computed financial figures.                                                                                                                                                                                                                                                                                                                                     | ✅ Locked |
| D-162 | Statement financial detail is always computed on-demand from `wallet_transactions`. It is never stored separately.                                                                                                                                                                                                                                                                                                                             | ✅ Locked |
| D-163 | `wallet.low_balance` is emitted on every debit that crosses the threshold. Notification throttling belongs to the Notification domain.                                                                                                                                                                                                                                                                                                         | ✅ Locked |
| D-164 | Wallet Statements summarize historical ledger activity only. Billing invoices represent commercial obligations generated exclusively by the Billing domain (AES-013). A Wallet Statement must never be treated as a Billing invoice.                                                                                                                                                                                                           | ✅ Locked |
| D-165 | Historical wallet transactions are never modified or deleted. Corrections are performed exclusively through compensating transactions appended to the ledger.                                                                                                                                                                                                                                                                                  | ✅ Locked |
| D-166 | Single Active Parent Invariant: For a given `relationship_type`, an organization may have zero or one active parent relationship. Historical relationships must never be modified or deleted. Parent changes are represented by deactivating the previous relationship and creating a new active relationship. This invariant exists to guarantee deterministic hierarchy traversal across Wallet, Billing, Marketplace, and tenant ownership. | ✅ Locked |

---

# 🚨 Architecture Improvement Over the Original Design

This wallet architecture replaces a simple "balance" model with a **ledger-first financial system**.

Key improvements include:

- **Append-only transaction history** instead of mutable balances.
- **Derived balances** that can always be reconstructed, improving auditability and resilience.
- **Reservation support** for long-running operations (such as AI requests) to prevent overspending.
- **Separation of responsibilities**: Billing creates commercial events, the Wallet records financial movements, and product services (AI, Fit, ETA, etc.) request consumption through Platform APIs rather than modifying balances directly.
- **Future-ready support** for prepaid credits, usage-based billing, promotional credits, refunds, and hybrid pricing without requiring schema redesign.

This design gives AutoShipp an enterprise-grade wallet capable of supporting future AI services, marketplaces, usage metering, and financial audits while maintaining strict ownership and consistency across the platform.

---

Excellent.

Now we build what I consider the **backbone of the entire platform** after Identity.

This document is extremely important because **everything that connects AutoShipp to the outside world passes through it.**

Without this schema there is:

- No Shopify
- No WooCommerce
- No Delhivery
- No Shiprocket
- No ShipXSpeed
- No Razorpay
- No OpenAI
- No WhatsApp
- No Email

Everything external is managed here.

One thing I want to improve over most SaaS architectures:

**Most systems create one integration table per provider.**

Example:

```
shopify_connections

woocommerce_connections

shiprocket_connections

razorpay_connections

...
```

That becomes a nightmare.

Instead we'll build a **universal integration framework**.

Every provider becomes configuration.

Not schema.

---

# AES-015 — Integration Schema Specification

**Document ID:** AES-015

**Title:** Integration Schema Specification

**Version:** 1.0.0

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `integration`

**Depends On**

- AES-008 Master Database Blueprint
- AES-010 Organization Schema
- AES-011 Commerce Schema
- AES-013 Billing Schema

---

# Executive Summary

The Integration Schema is responsible for managing all external system connections used by the AutoShipp platform.

It provides a provider-agnostic integration framework that supports:

- Commerce Platforms
- Shipping Aggregators
- Payment Gateways
- AI Providers
- Email Providers
- SMS Providers
- Analytics Providers
- ERP Systems
- CRM Systems
- Future integrations

without requiring schema redesign.

Every external system is modeled as a Provider.

Every Organization can create Connections.

Every Connection stores Credentials.

Every Sync is tracked.

---

# 1. Responsibilities

The Integration Schema owns:

- Integration Providers
- Provider Categories
- Organization Connections
- Connection Credentials
- Connection Settings
- Webhooks
- Synchronization Jobs
- Synchronization Logs
- API Rate Limits
- Provider Health
- OAuth Tokens

It does **not** own:

- Orders
- Customers
- Products
- Wallets
- Billing
- Product Intelligence

---

# 2. Schema Overview

```text
integration

├── provider_categories
├── providers
├── provider_versions
├── organization_connections
├── connection_credentials
├── connection_settings
├── webhooks
├── webhook_events
├── sync_jobs
├── sync_logs
├── rate_limit_usage
├── provider_health
├── oauth_tokens
├── api_keys
└── integration_metadata
```

---

# 3. High-Level ER Model

```text
provider_categories
         │
         ▼
providers
         │
         ├──────────── provider_versions
         │
         ├──────────── organization_connections
         │                     │
         │                     ├──── connection_credentials
         │                     ├──── connection_settings
         │                     ├──── oauth_tokens
         │                     └──── api_keys
         │
         ├──────────── webhooks
         │                     │
         │                     ▼
         │              webhook_events
         │
         ├──────────── sync_jobs
         │                     ▼
         │                sync_logs
         │
         └──────────── provider_health
```

---

# 4. Universal Provider Model

Every external system becomes one Provider.

Examples

| Category  | Provider      |
| --------- | ------------- |
| Commerce  | Shopify       |
| Commerce  | WooCommerce   |
| Commerce  | Magento       |
| Shipping  | Shiprocket    |
| Shipping  | Delhivery     |
| Shipping  | ShipXSpeed    |
| Shipping  | XpressBees    |
| AI        | OpenAI        |
| AI        | Anthropic     |
| AI        | Google Gemini |
| Payment   | Razorpay      |
| Payment   | Stripe        |
| Email     | Resend        |
| Email     | AWS SES       |
| SMS       | Twilio        |
| Analytics | GA4           |

No schema changes required.

---

# 5. Table Specifications

---

# 5.1 provider_categories

Examples

```text
Commerce

Shipping

Payment

AI

Email

SMS

Analytics

ERP

CRM
```

Columns

| Column      | Type |
| ----------- | ---- |
| id          | UUID |
| code        | TEXT |
| name        | TEXT |
| description | TEXT |

---

# 5.2 providers

The Provider Registry.

Columns

| Column            | Type      |
| ----------------- | --------- |
| id                | UUID      |
| category_id       | UUID      |
| code              | TEXT      |
| name              | TEXT      |
| website           | TEXT      |
| documentation_url | TEXT      |
| auth_type         | auth_type |
| active            | BOOLEAN   |

---

Examples

```text
SHOPIFY

SHIPROCKET

DELHIVERY

OPENAI

RAZORPAY
```

---

Unique

```sql
UNIQUE(code)
```

---

# 5.3 provider_versions

Supports API versioning.

Example

```text
Shopify

↓

2025-10

↓

2026-01
```

Columns

- id
- provider_id
- version
- supported
- released_at
- deprecated_at

---

# 5.4 organization_connections

Represents an organization's connection to a provider.

Example

```text
Nike

↓

Shopify

↓

Connected
```

Columns

| Column          | Type              |
| --------------- | ----------------- |
| id              | UUID              |
| organization_id | UUID              |
| provider_id     | UUID              |
| name            | TEXT              |
| status          | connection_status |
| connected_at    | TIMESTAMP         |
| last_sync_at    | TIMESTAMP         |
| created_by      | UUID              |

---

Constraint

```sql
UNIQUE(organization_id, provider_id, name)
```

This allows multiple Shopify stores per organization if needed.

---

# 5.5 connection_credentials

Stores encrypted credentials.

Columns

| Column          | Type            |
| --------------- | --------------- |
| id              | UUID            |
| connection_id   | UUID            |
| credential_type | credential_type |
| encrypted_value | BYTEA           |
| key_version     | INTEGER         |
| expires_at      | TIMESTAMP NULL  |
| rotated_at      | TIMESTAMP NULL  |

---

Supported credentials

```text
API_KEY

ACCESS_TOKEN

CLIENT_SECRET

PRIVATE_KEY

OAUTH_TOKEN
```

Secrets are encrypted using envelope encryption (KMS/Vault).

Plaintext credentials are never stored.

---

# 5.6 connection_settings

Configuration.

Example

```json
{
  "sync_orders": true,
  "sync_products": true,
  "poll_interval": 300,
  "default_warehouse": "Mumbai"
}
```

Stored as JSONB.

Configuration only.

---

# 5.7 webhooks

Stores provider webhook registrations.

Columns

- id
- connection_id
- provider_event
- callback_url
- secret_hash
- active

---

# 5.8 webhook_events

Append-only.

Stores every incoming webhook.

Columns

- id
- webhook_id
- external_event_id
- payload JSONB
- received_at
- processed_at
- status

Supports replay.

---

# 5.9 sync_jobs

Tracks synchronization.

Columns

| Column            | Type        |
| ----------------- | ----------- |
| id                | UUID        |
| connection_id     | UUID        |
| sync_type         | TEXT        |
| status            | sync_status |
| started_at        | TIMESTAMP   |
| finished_at       | TIMESTAMP   |
| records_processed | INTEGER     |
| records_failed    | INTEGER     |

---

# 5.10 sync_logs

Detailed execution logs.

Append-only.

Useful for:

- debugging
- retries
- support
- auditing

---

# 5.11 rate_limit_usage

Tracks provider rate limits.

Fields

- provider
- remaining
- reset_at

Allows intelligent scheduling.

---

# 5.12 provider_health

Platform health.

Example

```text
Shiprocket

↓

Healthy

↓

132ms
```

Displayed on

```
/platform/health
```

---

# 5.13 oauth_tokens

Supports OAuth providers.

Fields

- connection_id
- access_token (encrypted)
- refresh_token (encrypted)
- expires_at

---

# 5.14 api_keys

Future machine authentication.

Supports provider-issued API keys.

---

# 5.15 integration_metadata

Flexible metadata.

Provider-specific.

Never business data.

---

# 6. Synchronization Flow

```text
Shopify

↓

Webhook

↓

Webhook Event

↓

Sync Job

↓

Commerce Schema

↓

Products Consume
```

Only the Platform Sync Service writes Commerce data.

---

# 7. Shipping Aggregator Flow

```text
Shiprocket

↓

Organization Connection

↓

Webhook

↓

Shipping Sync

↓

Shipping Schema

↓

ETA Service

↓

Returns Service
```

No product connects directly to Shiprocket.

---

# 8. Cross-Schema Relationships

Allowed.

```text
organization

↓

organization_connections
```

Allowed.

```text
commerce

↓

stores
```

(reference to integration connection)

Allowed.

```text
shipping.shipments

↓

organization_connections
```

(read-only reference)

Forbidden.

```text
fit

↓

providers
```

Products never manage integrations.

---

# 9. Security Rules

- Credentials are encrypted at rest.
- Secrets are never logged.
- OAuth tokens are rotated automatically where supported.
- Webhook payloads are signature-verified.
- API keys are versioned.
- Credential access is audited.
- Provider failures do not expose secrets.

---

# 10. Read / Write Matrix

| Service          | Read | Write |
| ---------------- | ---- | ----- |
| Platform API     | ✅   | ✅    |
| Sync Workers     | ✅   | ✅    |
| Commerce Sync    | ✅   | ✅    |
| Shipping Service | ✅   | ❌    |
| Fit              | ✅   | ❌    |
| ETA              | ✅   | ❌    |
| Returns          | ✅   | ❌    |

---

# 11. Prisma Ownership

Owned by

```text
packages/prisma-platform
```

---

# 12. Growth Expectations

Designed for:

- Millions of connections
- Billions of webhook events
- Hundreds of providers
- Thousands of sync jobs per minute
- Multi-region deployments
- Future partner-developed integrations

Operational tables (`webhook_events`, `sync_logs`) are partition candidates as volume grows.

---

# 13. Enums

## auth_type

```text
API_KEY

OAUTH2

JWT

BASIC

CUSTOM
```

---

## connection_status

```text
PENDING

CONNECTED

DISCONNECTED

ERROR

SUSPENDED
```

---

## credential_type

```text
API_KEY

ACCESS_TOKEN

REFRESH_TOKEN

CLIENT_SECRET

PRIVATE_KEY
```

---

## sync_status

```text
QUEUED

RUNNING

SUCCESS

FAILED

PARTIAL
```

---

# 14. Decision Register

| ID    | Decision                                                    | Status    |
| ----- | ----------------------------------------------------------- | --------- |
| D-151 | Every external system is modeled as a Provider              | ✅ Locked |
| D-152 | Organizations connect through reusable Connections          | ✅ Locked |
| D-153 | Credentials are encrypted and versioned                     | ✅ Locked |
| D-154 | Webhooks are append-only and replayable                     | ✅ Locked |
| D-155 | Synchronization is provider-agnostic                        | ✅ Locked |
| D-156 | Products never manage external integrations directly        | ✅ Locked |
| D-157 | Provider health is centrally monitored                      | ✅ Locked |
| D-158 | Rate limits are tracked centrally                           | ✅ Locked |
| D-159 | OAuth and API key authentication are first-class citizens   | ✅ Locked |
| D-160 | Integration schema is owned exclusively by the Platform API | ✅ Locked |

---

# 🚨 Architecture Improvement Over the Original Design

Your original plan considered integrations largely as product-specific implementations. This specification elevates integrations into a **shared platform capability**:

- A **single provider registry** supports every current and future integration.
- Every organization manages connections through the same lifecycle regardless of provider.
- Credentials are securely encrypted and rotated without schema changes.
- Webhooks, synchronization jobs, and health monitoring are standardized across all providers.
- Product services (Fit, ETA, Returns, AI, Shipping) consume synchronized platform data rather than implementing their own provider integrations.

This architecture minimizes duplicated integration logic, simplifies onboarding of new providers, and creates a scalable integration framework that can support hundreds of providers and millions of organization connections without redesign.

---

Excellent.

Now we design what will become one of the **largest schemas** in the platform.

This schema exists because of one architectural decision we made very early:

> **Never duplicate customer data across products.**

This means:

- Fit
- ETA
- Returns
- AI Assistant
- Marketing
- Loyalty
- Analytics
- Future products

must all use the **same customer**.

This document will save you years of technical debt.

---

# AES-016 — Customer Domain Schema Specification

**Document ID:** AES-016

**Title:** Customer Domain Schema Specification

**Version:** 1.0.0

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `customer`

**Depends On**

- AES-008 Master Database Blueprint
- AES-010 Organization Schema
- AES-011 Commerce Schema

---

# Executive Summary

The Customer Schema is the **single source of truth** for all customer-related data across the AutoShipp Platform.

It centralizes customer identity and profile information synchronized from commerce platforms while providing a stable foundation for all current and future AutoShipp products.

Products never duplicate customer information.

Instead, they reference the canonical customer record.

---

# 1. Responsibilities

The Customer Schema owns:

- Customer Profiles
- Customer Addresses
- Customer Contact Information
- Customer Tags
- Customer Segments
- Customer Preferences
- Customer Identity Mapping
- Customer Merge History
- Customer Metadata

It does **not** own:

- Orders
- Fit Profiles
- Return Requests
- ETA Predictions
- AI Conversations
- Marketing Campaigns

Those belong to their respective product schemas.

---

# 2. Schema Overview

```text
customer

├── customers
├── customer_addresses
├── customer_contacts
├── customer_tags
├── customer_tag_assignments
├── customer_segments
├── customer_segment_memberships
├── customer_preferences
├── customer_external_mappings
├── customer_merge_history
├── customer_consents
└── customer_metadata
```

---

# 3. High-Level ER Model

```text
organizations
        │
        ▼
customers
        │
        ├──────────── customer_addresses
        │
        ├──────────── customer_contacts
        │
        ├──────────── customer_preferences
        │
        ├──────────── customer_consents
        │
        ├──────────── customer_external_mappings
        │
        ├──────────── customer_tags
        │                  │
        │                  ▼
        │        customer_tag_assignments
        │
        ├──────────── customer_segments
        │                  │
        │                  ▼
        │    customer_segment_memberships
        │
        └──────────── customer_merge_history
```

---

# 4. Core Principles

The Customer Domain follows six rules.

### Rule 1

Every customer exists exactly once per organization.

---

### Rule 2

Products reference customers.

They never copy customers.

---

### Rule 3

External IDs are never used as primary keys.

---

### Rule 4

Customer history is never deleted.

---

### Rule 5

Merged customers remain traceable forever.

---

### Rule 6

Customer profile data is synchronized.

Product intelligence is not.

---

# 5. Table Specifications

---

# 5.1 customers

## Purpose

Canonical customer identity.

---

Columns

| Column               | Type            |
| -------------------- | --------------- |
| id                   | UUID            |
| organization_id      | UUID            |
| external_customer_id | TEXT            |
| email                | CITEXT          |
| phone                | TEXT            |
| first_name           | TEXT            |
| last_name            | TEXT            |
| full_name            | TEXT            |
| date_of_birth        | DATE            |
| gender               | customer_gender |
| status               | customer_status |
| first_order_at       | TIMESTAMP       |
| last_order_at        | TIMESTAMP       |
| lifetime_value       | NUMERIC(18,2)   |
| total_orders         | INTEGER         |
| synced_at            | TIMESTAMP       |
| created_at           | TIMESTAMP       |
| updated_at           | TIMESTAMP       |

---

Constraint

```sql
UNIQUE(organization_id, external_customer_id)
```

---

Indexes

```text
idx_customers_email

idx_customers_phone

idx_customers_ltv

idx_customers_last_order

idx_customers_organization
```

---

# 5.2 customer_addresses

Supports multiple addresses.

Examples

- Billing
- Shipping
- Home
- Office

Columns

- id
- customer_id
- address_type
- line1
- line2
- city
- state
- postal_code
- country_code
- default_address

---

# 5.3 customer_contacts

Future proof.

Stores

- Secondary emails
- Alternate phones
- Emergency contacts

---

# 5.4 customer_tags

Reusable labels.

Examples

```text
VIP

Wholesale

Frequent Buyer

Fashion Influencer

High Return Risk

Premium
```

---

# 5.5 customer_tag_assignments

Many-to-many.

```text
Customer

↓

Tag
```

---

# 5.6 customer_segments

Business-defined segments.

Examples

```text
Top Customers

New Customers

Inactive

Repeat Buyers

High Spenders

High Returns
```

---

# 5.7 customer_segment_memberships

Stores membership.

Allows pre-computed segmentation.

---

# 5.8 customer_preferences

Stores customer preferences.

Example

```json
{
  "preferred_language": "en",
  "preferred_currency": "INR",
  "marketing_opt_in": true,
  "preferred_size": "L"
}
```

Only preferences.

Not analytics.

---

# 5.9 customer_external_mappings

Supports multiple external identities.

Example

```text
Customer UUID

↓

Shopify ID

↓

WooCommerce ID

↓

Magento ID
```

Allows migration between commerce platforms without changing the internal customer ID.

---

# 5.10 customer_merge_history

One of the most important tables.

Example

```text
Customer A

+

Customer B

↓

Merged

↓

Customer C
```

Historical references remain valid.

Nothing is lost.

---

# 5.11 customer_consents

Supports privacy regulations.

Examples

- Email Marketing
- SMS Marketing
- WhatsApp
- Analytics
- Personalization

Fields

- customer_id
- consent_type
- granted
- granted_at
- revoked_at
- source

Append-only.

---

# 5.12 customer_metadata

Flexible metadata.

Example

```json
{
  "preferred_color": "Black",
  "favorite_brand": "Nike"
}
```

Metadata only.

Never operational business data.

---

# 6. Customer Synchronization Flow

```text
Shopify

↓

Webhook

↓

Commerce Sync

↓

Customer Sync

↓

customer.customers

↓

Fit

ETA

Returns

AI

Analytics
```

Customer data is synchronized once.

Products reuse it.

---

# 7. Customer Merge Flow

```text
Duplicate Customer

↓

Review

↓

Merge

↓

History Recorded

↓

References Updated

↓

Original Records Archived
```

Products continue referencing the surviving customer ID.

---

# 8. Cross-Schema Relationships

Allowed.

```text
organization

↓

customers
```

Allowed.

```text
commerce.orders

↓

customers
```

Allowed.

```text
fit.measurements

↓

customers
```

(reference only)

Allowed.

```text
returns.return_requests

↓

customers
```

(reference only)

Forbidden.

```text
customer

↓

fit
```

Customer never owns product data.

---

# 9. Security Rules

- Customer IDs are immutable.
- Email uniqueness is scoped to the organization.
- Merge operations are fully audited.
- Consents are append-only.
- Customer deletions follow legal retention policies.
- Products cannot modify canonical customer records.

---

# 10. Read / Write Matrix

| Service         | Read | Write |
| --------------- | ---- | ----- |
| Platform API    | ✅   | ✅    |
| Commerce Sync   | ✅   | ✅    |
| Fit Service     | ✅   | ❌    |
| ETA Service     | ✅   | ❌    |
| Returns Service | ✅   | ❌    |
| AI Assistant    | ✅   | ❌    |
| Analytics       | ✅   | ❌    |

---

# 11. Prisma Ownership

Owned by

```text
packages/prisma-platform
```

Only Platform API generates migrations.

---

# 12. Expected Growth

Designed for:

- 100M+ customers
- Billions of orders referencing customers
- Millions of customer tags
- Millions of customer segments
- Millions of consent records

The schema is optimized for high-read workloads and append-heavy synchronization.

---

# 13. Enums

## customer_status

```text
ACTIVE

INACTIVE

BLOCKED

MERGED

DELETED
```

---

## customer_gender

```text
MALE

FEMALE

OTHER

UNSPECIFIED
```

---

## address_type

```text
BILLING

SHIPPING

HOME

OFFICE

OTHER
```

---

## consent_type

```text
EMAIL_MARKETING

SMS_MARKETING

WHATSAPP

PERSONALIZATION

ANALYTICS
```

---

# 14. Decision Register

| ID    | Decision                                                             | Status    |
| ----- | -------------------------------------------------------------------- | --------- |
| D-161 | Customer is the canonical customer identity for an organization      | ✅ Locked |
| D-162 | Customer data is synchronized once and reused by all products        | ✅ Locked |
| D-163 | Products reference customers but never own customer records          | ✅ Locked |
| D-164 | External customer identifiers are mapped, never used as primary keys | ✅ Locked |
| D-165 | Customer merge history is permanently preserved                      | ✅ Locked |
| D-166 | Customer consents are append-only                                    | ✅ Locked |
| D-167 | Customer preferences are configuration, not analytics                | ✅ Locked |
| D-168 | Customer segmentation is reusable across all products                | ✅ Locked |
| D-169 | Customer schema is owned exclusively by the Platform API             | ✅ Locked |
| D-170 | Customer identity is independent of any commerce provider            | ✅ Locked |

---

# 🚨 Major Architecture Improvement Over the Original Design

This is one of the biggest improvements in the entire AutoShipp architecture.

Originally, each product (Fit, Returns, AI, Analytics, etc.) could have evolved to maintain its own customer records, leading to duplicated identities, inconsistent profiles, and synchronization problems.

With this design:

- **The Customer schema becomes the canonical customer identity service** for the platform.
- Commerce platforms synchronize customer data **once** through the Platform Sync Service.
- Every product references the same `customer_id`, eliminating duplication.
- Customer merges, consent management, segmentation, and preferences become shared platform capabilities instead of being reimplemented by each product.
- The design is ready for future CDP (Customer Data Platform), CRM integrations, loyalty programs, personalization engines, and AI-powered customer insights without changing the core schema.

This architecture directly supports your guiding principle of **maximum data reuse with zero unnecessary duplication**, ensuring that customer information remains consistent across every current and future AutoShipp service.

---

Excellent.

This is where we start designing the **platform operational domains**.

Everything up to now has been **business data**.

Now we move into **platform infrastructure data**.

The first operational domain should **NOT** be Notifications.

It should be **Audit**.

Why?

Because every other operational domain depends on it.

- Identity writes audits.
- Billing writes audits.
- Wallet writes audits.
- Integrations write audits.
- Feature Flags write audits.
- Notifications write audits.
- Every future service writes audits.

If Audit is not designed first, every other schema will implement logging differently.

So we freeze the Audit model now.

---

# AES-017 — Audit & Activity Schema Specification

**Document ID:** AES-017

**Title:** Audit & Activity Schema Specification

**Version:** 1.0.0

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `audit`

**Depends On**

- AES-008 Master Database Blueprint
- AES-009 Identity Schema
- AES-010 Organization Schema

---

# Executive Summary

The Audit Schema provides an immutable, append-only record of all significant business and security events across the AutoShipp platform.

It exists to provide:

- Security auditing
- Compliance
- Operational tracing
- User activity history
- Incident investigation
- Change history
- Business event logging

The Audit Schema is **write-once**.

Records are never updated.

Records are never deleted except through defined retention and archival policies.

---

# 1. Responsibilities

The Audit Schema owns:

- Audit Events
- Entity Change History
- Login Events
- Permission Changes
- Configuration Changes
- API Activity
- Service Activity
- Correlation IDs
- Request Tracing

It does **not** own:

- Business entities
- Notifications
- Metrics
- Logs
- Product intelligence

---

# 2. Schema Overview

```text
audit

├── audit_events
├── entity_changes
├── login_events
├── permission_events
├── api_requests
├── service_events
├── activity_timeline
├── correlation_traces
├── archived_audit_events
└── audit_metadata
```

---

# 3. High-Level ER Model

```text
audit_events
      │
      ├──────────── entity_changes
      │
      ├──────────── login_events
      │
      ├──────────── permission_events
      │
      ├──────────── api_requests
      │
      ├──────────── service_events
      │
      └──────────── correlation_traces
```

---

# 4. Design Principles

### Principle 1

Audit data is immutable.

Never update.

Never overwrite.

---

### Principle 2

Audit belongs to the Platform.

Products generate events.

Platform stores them.

---

### Principle 3

Every important business action generates one audit event.

---

### Principle 4

Every audit event belongs to exactly one correlation ID.

---

### Principle 5

Audit records must never block business transactions.

Failures are retried asynchronously.

---

# 5. Table Specifications

---

# 5.1 audit_events

## Purpose

The canonical audit table.

Every significant event is stored here.

---

Columns

| Column          | Type             |
| --------------- | ---------------- |
| id              | UUID             |
| correlation_id  | UUID             |
| organization_id | UUID NULL        |
| actor_user_id   | UUID NULL        |
| actor_service   | TEXT NULL        |
| event_type      | audit_event_type |
| entity_type     | TEXT             |
| entity_id       | UUID             |
| action          | TEXT             |
| ip_address      | INET             |
| user_agent      | TEXT             |
| request_id      | UUID             |
| occurred_at     | TIMESTAMP        |
| severity        | audit_severity   |

---

Example

```text
User

↓

Changed

↓

Brand Settings
```

---

Indexes

```text
idx_audit_entity

idx_audit_actor

idx_audit_organization

idx_audit_occurred

idx_audit_correlation
```

---

# 5.2 entity_changes

Stores before/after snapshots.

Columns

| Column         | Type  |
| -------------- | ----- |
| id             | UUID  |
| audit_event_id | UUID  |
| before_data    | JSONB |
| after_data     | JSONB |

Only changed fields should be stored when practical to reduce storage volume.

---

# 5.3 login_events

Authentication history.

Fields

- user_id
- email
- result
- failure_reason
- ip_address
- country
- device
- occurred_at

Supports:

- Security monitoring
- Account recovery
- Suspicious activity detection

---

# 5.4 permission_events

Examples

```text
Role Assigned

Permission Revoked

Platform Owner Created

Brand Admin Removed
```

Append-only.

---

# 5.5 api_requests

Tracks API activity.

Columns

| Column         | Type      |
| -------------- | --------- |
| id             | UUID      |
| correlation_id | UUID      |
| service_name   | TEXT      |
| endpoint       | TEXT      |
| method         | TEXT      |
| status_code    | INTEGER   |
| duration_ms    | INTEGER   |
| occurred_at    | TIMESTAMP |

Payloads are **not** stored by default to avoid unnecessary storage and PII exposure.

---

# 5.6 service_events

Service lifecycle events.

Examples

```text
Fit Started

ETA Restarted

Returns Failed

Worker Scaled

Migration Completed
```

Useful for `/platform/health` and incident timelines.

---

# 5.7 activity_timeline

Denormalized read model.

Purpose:

Render UI timelines efficiently.

Example

```text
10:42

Brand Admin

Enabled ETA

10:44

Updated Billing Address

10:47

Added New User
```

This table can be regenerated from canonical audit events if required.

---

# 5.8 correlation_traces

Every request receives a correlation ID.

Example

```text
HTTP Request

↓

Platform

↓

Fit API

↓

ETA API

↓

Audit
```

One correlation ID.

Many audit events.

Supports distributed tracing across services.

---

# 5.9 archived_audit_events

Cold storage.

Older audit records moved here according to retention policies.

Read-only.

---

# 5.10 audit_metadata

Stores schema-level metadata.

Examples

```json
{
  "retention_policy": "7_years",
  "archive_frequency": "monthly"
}
```

---

# 6. Audit Flow

```text
User Request

↓

Platform API

↓

Business Logic

↓

Audit Event Created

↓

Entity Change Recorded

↓

Activity Timeline Updated

↓

Async Archive Policy
```

Business transactions are committed before long-running archival work.

---

# 7. Cross-Service Correlation

Example

```text
User

↓

Platform

↓

Fit

↓

ETA

↓

Returns

↓

Audit
```

All services reuse the same `correlation_id`.

This enables end-to-end tracing.

---

# 8. Cross-Schema Relationships

Allowed

```text
identity.users

↓

audit_events
```

Allowed

```text
organization.organizations

↓

audit_events
```

Allowed

```text
billing.invoices

↓

audit_events
```

(reference only)

Forbidden

```text
audit

↓

billing
```

Audit never owns business entities.

---

# 9. Security Rules

- Audit records are append-only.
- Updates are prohibited.
- Deletes are prohibited.
- Sensitive values (passwords, secrets, tokens) are never recorded.
- Personally identifiable information is masked where appropriate.
- Every audit event contains a timestamp and correlation ID.
- Administrative actions always generate audit records.

---

# 10. Read / Write Matrix

| Service      | Read          | Write     |
| ------------ | ------------- | --------- |
| Platform API | ✅            | ✅        |
| Fit          | Timeline (RO) | Event API |
| ETA          | Timeline (RO) | Event API |
| Returns      | Timeline (RO) | Event API |
| AI           | Timeline (RO) | Event API |
| Shipping     | Timeline (RO) | Event API |

Products **never write directly** to the `audit` schema.

They emit audit events through a shared Platform Audit Service.

---

# 11. Prisma Ownership

Owned by

```text
packages/prisma-platform
```

No product owns audit migrations.

---

# 12. Expected Growth

Designed for:

- Tens of billions of audit events
- Billions of API requests
- Millions of login events
- Long-term regulatory retention

Partitioning by time (`occurred_at`) is expected once the volume justifies it.

---

# 13. Enums

## audit_event_type

```text
AUTHENTICATION

AUTHORIZATION

CONFIGURATION

BILLING

WALLET

PRODUCT

SYSTEM

SECURITY
```

---

## audit_severity

```text
INFO

WARNING

ERROR

CRITICAL
```

---

## login_result

```text
SUCCESS

FAILED

LOCKED

MFA_REQUIRED
```

---

# 14. Decision Register

| ID    | Decision                                                      | Status    |
| ----- | ------------------------------------------------------------- | --------- |
| D-171 | Audit is append-only and immutable                            | ✅ Locked |
| D-172 | Every important business action generates an audit event      | ✅ Locked |
| D-173 | Products emit audit events through the Platform Audit Service | ✅ Locked |
| D-174 | Correlation IDs are mandatory for distributed tracing         | ✅ Locked |
| D-175 | Entity changes store before/after snapshots                   | ✅ Locked |
| D-176 | Sensitive secrets are never recorded in audit data            | ✅ Locked |
| D-177 | Audit is independent of business schemas                      | ✅ Locked |
| D-178 | Activity timelines are optimized read models                  | ✅ Locked |
| D-179 | Long-term archival is built into the schema                   | ✅ Locked |
| D-180 | Audit schema is owned exclusively by the Platform API         | ✅ Locked |

---

# 🚨 Major Architecture Improvement Over the Original Design

Your original platform treated auditing primarily as scattered logging within individual services. This specification elevates auditing into a **first-class platform domain**:

- A **single immutable audit stream** captures every significant business and security event.
- **Correlation IDs** provide end-to-end tracing across Platform, Fit, ETA, Returns, AI, Shipping, and future services.
- Products never write directly to audit tables; they publish standardized audit events through the Platform Audit Service, ensuring consistent formatting and retention.
- Read models such as `activity_timeline` keep user interfaces fast without compromising the canonical audit history.
- The design supports compliance, forensic investigations, operational debugging, and future observability integrations while remaining independent of individual product schemas.

This architecture establishes a consistent audit foundation that every future AutoShipp service will inherit, eliminating fragmented logging and creating a platform-wide source of operational truth.

---

Excellent.

Now we complete the **Platform Operational Layer** by designing the **Notification Domain**.

This is another place where I want to improve significantly over typical SaaS architectures.

Most systems have code like:

```typescript
sendEmail(...)
sendSMS(...)
sendWhatsApp(...)
sendSlack(...)
```

scattered across services.

That quickly becomes impossible to maintain.

Instead, AutoShipp will have **one centralized Notification Platform**.

Every service publishes **Notification Events**.

The Notification Service decides:

- Whether to send
- When to send
- Through which provider
- Using which template
- With retries
- With fallback providers
- With user preferences

Products never send notifications directly.

---

# AES-018 — Notification Schema Specification

**Document ID:** AES-018

**Title:** Notification Schema Specification

**Version:** 1.0.0

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `notification`

**Depends On**

- AES-008 Master Database Blueprint
- AES-009 Identity Schema
- AES-010 Organization Schema
- AES-015 Integration Schema
- AES-017 Audit Schema

---

# Executive Summary

The Notification Schema provides the centralized messaging infrastructure for the AutoShipp Platform.

It manages:

- Notification Templates
- Notification Events
- Notification Queues
- Delivery Channels
- User Preferences
- Provider Routing
- Delivery Status
- Retry Management
- Notification History

Every notification generated anywhere in AutoShipp flows through this domain.

---

# 1. Responsibilities

The Notification Schema owns:

- Notification Templates
- Notification Events
- Notification Deliveries
- Notification Preferences
- Notification Channels
- Notification Providers
- Retry Queue
- Delivery Logs
- Scheduled Notifications

It does **not** own:

- Email providers
- SMS providers
- WhatsApp providers
- Business entities
- User authentication

External providers are managed by the Integration Domain.

---

# 2. Schema Overview

```text
notification

├── notification_types
├── notification_templates
├── notification_channels
├── notification_events
├── notification_recipients
├── notification_deliveries
├── notification_preferences
├── scheduled_notifications
├── retry_queue
├── delivery_logs
├── provider_routes
└── notification_metadata
```

---

# 3. High-Level ER Model

```text
notification_types
        │
        ▼
notification_templates
        │
        ▼
notification_events
        │
        ├──────── notification_recipients
        │
        ├──────── notification_deliveries
        │
        ├──────── delivery_logs
        │
        └──────── retry_queue
```

---

# 4. Design Principles

### Principle 1

Products publish notification events.

They never send messages directly.

---

### Principle 2

Templates are centralized.

---

### Principle 3

Channels are configurable.

---

### Principle 4

Providers are replaceable.

---

### Principle 5

Deliveries are immutable.

---

### Principle 6

Retries are automatic.

---

# 5. Table Specifications

---

# 5.1 notification_types

Examples

```text
WELCOME

PASSWORD_RESET

INVOICE_CREATED

PAYMENT_RECEIVED

ORDER_IMPORTED

SYNC_FAILED

RETURN_CREATED

ETA_DELAY

AI_CREDITS_LOW
```

---

Columns

| Column      | Type                  |
| ----------- | --------------------- |
| id          | UUID                  |
| code        | TEXT                  |
| name        | TEXT                  |
| description | TEXT                  |
| priority    | notification_priority |

---

# 5.2 notification_templates

Supports multiple channels.

Columns

| Column               | Type        |
| -------------------- | ----------- |
| id                   | UUID        |
| notification_type_id | UUID        |
| channel_id           | UUID        |
| language             | VARCHAR(10) |
| subject              | TEXT        |
| body                 | TEXT        |
| version              | INTEGER     |
| active               | BOOLEAN     |

Template body supports variable placeholders.

Example

```text
Hello {{customer_name}}

Your order {{order_number}} has shipped.
```

---

# 5.3 notification_channels

Examples

```text
EMAIL

SMS

WHATSAPP

PUSH

WEBHOOK

IN_APP
```

---

Columns

- id
- code
- name
- active

---

# 5.4 notification_events

Represents a request to notify.

Columns

| Column               | Type      |
| -------------------- | --------- |
| id                   | UUID      |
| organization_id      | UUID      |
| notification_type_id | UUID      |
| entity_type          | TEXT      |
| entity_id            | UUID      |
| payload              | JSONB     |
| created_at           | TIMESTAMP |
| created_by           | UUID      |

Products publish events here (typically through a Platform Notification API).

---

# 5.5 notification_recipients

Supports multiple recipients.

Columns

- id
- notification_event_id
- user_id
- customer_id
- email
- phone
- channel_override

Supports:

- Users
- Customers
- External emails

---

# 5.6 notification_deliveries

Tracks delivery lifecycle.

Columns

| Column                | Type            |
| --------------------- | --------------- |
| id                    | UUID            |
| notification_event_id | UUID            |
| provider_id           | UUID            |
| channel_id            | UUID            |
| status                | delivery_status |
| sent_at               | TIMESTAMP       |
| delivered_at          | TIMESTAMP       |
| failed_at             | TIMESTAMP       |

One event can create multiple deliveries.

Example

Email

-

SMS

-

WhatsApp

---

# 5.7 notification_preferences

Stores user preferences.

Example

```json
{
  "marketing": false,
  "security": true,
  "billing": true,
  "product_updates": true
}
```

Supports organization-level defaults with user-level overrides.

---

# 5.8 scheduled_notifications

Future delivery.

Examples

```text
Invoice Reminder

↓

Tomorrow

↓

09:00
```

Columns

- id
- notification_event_id
- scheduled_at
- status

---

# 5.9 retry_queue

Failed deliveries.

Tracks

- retry_count
- next_retry_at
- last_error

Supports exponential backoff.

---

# 5.10 delivery_logs

Append-only.

Stores:

- Provider response
- Provider message ID
- Latency
- Error details

Useful for support.

---

# 5.11 provider_routes

Maps channels to providers.

Example

```text
EMAIL

↓

Primary

Resend

↓

Fallback

AWS SES
```

Supports automatic failover.

---

# 5.12 notification_metadata

Stores operational configuration.

Example

```json
{
  "default_language": "en",
  "retention_days": 365
}
```

---

# 6. Notification Flow

```text
Product Service

↓

Platform Notification API

↓

notification_events

↓

Template Resolution

↓

Recipient Resolution

↓

Provider Routing

↓

Queue

↓

Delivery

↓

Audit
```

Products stop after publishing the event.

Everything else is handled centrally.

---

# 7. Provider Failover

Example

```text
Resend

↓

Failed

↓

AWS SES

↓

Delivered
```

This happens automatically.

No product changes required.

---

# 8. Cross-Schema Relationships

Allowed

```text
identity.users

↓

notification_preferences
```

Allowed

```text
customer.customers

↓

notification_recipients
```

Allowed

```text
integration.providers

↓

provider_routes
```

(reference only)

Forbidden

```text
notification

↓

billing
```

Notification never owns business entities.

---

# 9. Security Rules

- Notification payloads are immutable after creation.
- Templates are versioned.
- Delivery history is append-only.
- Provider credentials are never stored in this schema.
- Sensitive data is masked in logs.
- Security notifications ignore marketing opt-out preferences.

---

# 10. Read / Write Matrix

| Service             | Read           | Write     |
| ------------------- | -------------- | --------- |
| Platform API        | ✅             | ✅        |
| Notification Worker | ✅             | ✅        |
| Fit                 | Templates (RO) | Event API |
| ETA                 | Templates (RO) | Event API |
| Returns             | Templates (RO) | Event API |
| AI                  | Templates (RO) | Event API |
| Shipping            | Templates (RO) | Event API |

Products never write directly to notification tables.

---

# 11. Prisma Ownership

Owned by

```text
packages/prisma-platform
```

Notification workers share the same Prisma package but operate through dedicated services.

---

# 12. Expected Growth

Designed for:

- Billions of notification events
- Billions of deliveries
- Millions of templates
- Hundreds of providers
- Multi-language support
- High-volume asynchronous processing

`notification_deliveries` and `delivery_logs` are expected partition candidates.

---

# 13. Enums

## notification_priority

```text
LOW

NORMAL

HIGH

CRITICAL
```

---

## delivery_status

```text
QUEUED

PROCESSING

SENT

DELIVERED

FAILED

CANCELLED
```

---

## channel_code

```text
EMAIL

SMS

WHATSAPP

PUSH

WEBHOOK

IN_APP
```

---

# 14. Decision Register

| ID    | Decision                                                                  | Status    |
| ----- | ------------------------------------------------------------------------- | --------- |
| D-181 | Products publish notification events instead of sending messages directly | ✅ Locked |
| D-182 | Templates are centralized and versioned                                   | ✅ Locked |
| D-183 | Notification providers are replaceable through routing rules              | ✅ Locked |
| D-184 | Delivery history is immutable                                             | ✅ Locked |
| D-185 | Retry processing uses exponential backoff                                 | ✅ Locked |
| D-186 | Provider failover is automatic                                            | ✅ Locked |
| D-187 | User preferences control delivery where applicable                        | ✅ Locked |
| D-188 | Security notifications bypass marketing preferences                       | ✅ Locked |
| D-189 | Notification schema is owned exclusively by the Platform API              | ✅ Locked |
| D-190 | Notification processing is fully asynchronous                             | ✅ Locked |

---

# 🚨 Major Architecture Improvement Over the Original Design

The original design implied that each product (Fit, ETA, Returns, AI, etc.) would be responsible for sending its own emails, SMS messages, or WhatsApp notifications. This specification replaces that with a **centralized event-driven notification platform**.

Key improvements include:

- **Products publish events**, not messages.
- **Templates are reusable** across all products and support versioning and localization.
- **Provider routing** allows seamless switching between services like Resend, AWS SES, Twilio, WhatsApp Business API, or future providers without changing product code.
- **Automatic retries and provider failover** improve delivery reliability.
- **User and organization notification preferences** are enforced consistently across the platform.
- **Notification history and delivery logs** provide complete observability for support, auditing, and compliance.

This design ensures that every future AutoShipp service can generate notifications through the same scalable infrastructure, eliminating duplicated messaging logic while supporting billions of notifications across multiple channels.

---

Excellent.

Now we design the **Feature Flag Platform**.

This is actually one of the smartest architectural decisions we've made in this entire platform because of your requirement:

> Three levels of feature flags

- Global
- Product
- Account

But after designing the previous schemas, I think we can make it **much more powerful**.

Instead of only feature flags, let's build a complete **Runtime Configuration Platform**.

It will manage:

- Feature Flags
- Gradual Rollouts
- Beta Programs
- Kill Switches
- A/B Testing (future)
- Runtime Configuration
- Per-Organization Overrides
- Per-Edition Overrides (Marketplace integration)
- Environment-specific configuration

This becomes one of the core platform services.

---

# AES-019 — Feature Flags & Runtime Configuration Schema Specification

**Document ID:** AES-019

**Title:** Feature Flags & Runtime Configuration Schema Specification

**Version:** 1.0.0

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `feature_flag`

**Depends On**

- AES-008 Master Database Blueprint
- AES-010 Organization Schema
- AES-012 Marketplace Schema
- AES-017 Audit Schema

---

# Executive Summary

The Feature Flag Schema provides centralized runtime configuration for the entire AutoShipp platform.

It enables safe deployments by allowing features to be enabled, disabled, or configured without redeploying services.

The platform supports:

- Global flags
- Product flags
- Organization overrides
- Environment overrides
- Percentage rollouts
- Kill switches
- Runtime configuration values
- Future experimentation (A/B testing)

Every service consumes feature flags through the Platform Configuration API.

---

# 1. Responsibilities

The Feature Flag Schema owns:

- Feature Flags
- Runtime Configurations
- Organization Overrides
- Product Overrides
- Environment Overrides
- Rollout Rules
- Evaluation Logs
- Flag History
- Configuration Metadata

It does **not** own:

- Product logic
- User permissions
- Marketplace assignments
- Business entities

---

# 2. Schema Overview

```text
feature_flag

├── feature_flags
├── flag_environments
├── flag_product_overrides
├── flag_organization_overrides
├── flag_rollouts
├── runtime_configs
├── config_overrides
├── evaluation_logs
├── flag_change_history
└── feature_flag_metadata
```

---

# 3. High-Level ER Model

```text
feature_flags
      │
      ├──────── flag_environments
      │
      ├──────── flag_product_overrides
      │
      ├──────── flag_organization_overrides
      │
      ├──────── flag_rollouts
      │
      ├──────── evaluation_logs
      │
      └──────── flag_change_history

runtime_configs
      │
      ▼
config_overrides
```

---

# 4. Design Principles

### Principle 1

Configuration changes must not require deployments.

---

### Principle 2

Flags are evaluated at runtime.

---

### Principle 3

The most specific override always wins.

---

### Principle 4

All changes are audited.

---

### Principle 5

Evaluation is read-only for product services.

---

### Principle 6

Feature flags must be cacheable.

---

# 5. Table Specifications

---

# 5.1 feature_flags

## Purpose

Canonical registry of every feature flag.

---

Columns

| Column          | Type         |
| --------------- | ------------ |
| id              | UUID         |
| key             | VARCHAR(150) |
| name            | TEXT         |
| description     | TEXT         |
| default_enabled | BOOLEAN      |
| product_id      | UUID NULL    |
| flag_type       | flag_type    |
| active          | BOOLEAN      |
| created_at      | TIMESTAMP    |
| updated_at      | TIMESTAMP    |

---

Examples

```text
fit.new-sizing-engine

eta.v2-routing

returns.instant-refund

assistant.gpt-5.5

platform.maintenance-mode
```

---

Constraint

```sql
UNIQUE(key)
```

---

# 5.2 flag_environments

Environment-specific values.

Examples

```text
Development

Staging

Production
```

Columns

- id
- feature_flag_id
- environment
- enabled

---

# 5.3 flag_product_overrides

Overrides for all organizations using a product.

Example

```text
Fit

↓

New ML Engine

↓

Enabled
```

Columns

- id
- feature_flag_id
- product_id
- enabled

---

# 5.4 flag_organization_overrides

Per-organization overrides.

Example

```text
Nike

↓

AI Beta

↓

Enabled
```

Columns

| Column          | Type           |
| --------------- | -------------- |
| id              | UUID           |
| feature_flag_id | UUID           |
| organization_id | UUID           |
| enabled         | BOOLEAN        |
| expires_at      | TIMESTAMP NULL |

This supports beta programs and emergency overrides.

---

# 5.5 flag_rollouts

Supports gradual rollout.

Columns

| Column             | Type             |
| ------------------ | ---------------- |
| id                 | UUID             |
| feature_flag_id    | UUID             |
| rollout_percentage | INTEGER          |
| targeting_strategy | rollout_strategy |
| active             | BOOLEAN          |

---

Examples

```text
5%

↓

20%

↓

50%

↓

100%
```

---

# 5.6 runtime_configs

General runtime configuration.

Examples

```text
AI Timeout

↓

30 seconds
```

```text
Max Upload Size

↓

100 MB
```

Columns

| Column        | Type              |
| ------------- | ----------------- |
| id            | UUID              |
| key           | TEXT              |
| value_type    | config_value_type |
| default_value | JSONB             |
| description   | TEXT              |

---

# 5.7 config_overrides

Override runtime configuration.

Supports:

- Environment
- Product
- Organization

Columns

- id
- runtime_config_id
- environment
- product_id
- organization_id
- override_value

Evaluation follows the same specificity rules as feature flags.

---

# 5.8 evaluation_logs

Optional diagnostic logging.

Stores:

- feature_flag_id
- organization_id
- evaluated_value
- evaluation_source
- evaluated_at

Typically disabled in production except during troubleshooting.

---

# 5.9 flag_change_history

Append-only.

Tracks:

- Previous value
- New value
- Changed by
- Changed at
- Reason

Supports audit and rollback.

---

# 5.10 feature_flag_metadata

Flexible metadata.

Example

```json
{
  "owner": "Platform Team",
  "jira": "AES-201"
}
```

---

# 6. Evaluation Order

This order is **locked**.

```text
Organization Override

↓

Product Override

↓

Environment Override

↓

Global Default
```

The first matching rule wins.

This guarantees deterministic evaluation.

---

# 7. Runtime Evaluation Flow

```text
Product Service

↓

Platform Config SDK

↓

Redis Cache

↓

Feature Flag Service

↓

feature_flag Schema

↓

Resolved Value

↓

Cached
```

The database is not queried for every request.

---

# 8. Kill Switch Example

```text
assistant.gpt-5.5

↓

Global Disable

↓

All AI Requests

↓

Immediately Disabled
```

No deployment required.

---

# 9. Cross-Schema Relationships

Allowed

```text
marketplace.products

↓

feature_flags
```

Allowed

```text
organization.organizations

↓

flag_organization_overrides
```

Allowed

```text
audit.audit_events

↓

flag_change_history
```

(reference only)

Forbidden

```text
feature_flag

↓

fit
```

Configuration never depends on product schemas.

---

# 10. Security Rules

- Only Platform Administrators may modify flags.
- Products have read-only access.
- All changes require audit records.
- Rollout percentages are validated (0–100).
- Configuration values are schema-validated before activation.
- Emergency kill switches bypass approval workflows but are fully audited.

---

# 11. Read / Write Matrix

| Service               | Read | Write |
| --------------------- | ---- | ----- |
| Platform API          | ✅   | ✅    |
| Configuration Service | ✅   | ✅    |
| Fit                   | ✅   | ❌    |
| ETA                   | ✅   | ❌    |
| Returns               | ✅   | ❌    |
| AI                    | ✅   | ❌    |
| Shipping              | ✅   | ❌    |

Products access configuration through a shared SDK or Platform Configuration API.

---

# 12. Prisma Ownership

Owned by

```text
packages/prisma-platform
```

No product owns feature flag migrations.

---

# 13. Expected Growth

Designed for:

- Thousands of feature flags
- Millions of evaluations per minute
- Thousands of organization overrides
- Hundreds of runtime configurations
- Multi-environment deployments
- Global edge caching

Evaluation should primarily occur from Redis or in-memory caches, with the database serving as the authoritative source.

---

# 14. Enums

## flag_type

```text
BOOLEAN

MULTIVARIATE

KILL_SWITCH
```

---

## rollout_strategy

```text
PERCENTAGE

ORGANIZATION

PRODUCT

MANUAL
```

---

## config_value_type

```text
BOOLEAN

INTEGER

FLOAT

STRING

JSON
```

---

## environment

```text
DEVELOPMENT

STAGING

PRODUCTION
```

---

# 15. Decision Register

| ID    | Decision                                                          | Status    |
| ----- | ----------------------------------------------------------------- | --------- |
| D-191 | Feature flags are centrally managed                               | ✅ Locked |
| D-192 | Runtime configuration shares the same domain as feature flags     | ✅ Locked |
| D-193 | Evaluation order is Organization → Product → Environment → Global | ✅ Locked |
| D-194 | Product services have read-only access                            | ✅ Locked |
| D-195 | Rollouts support gradual percentage deployment                    | ✅ Locked |
| D-196 | Kill switches can disable functionality instantly                 | ✅ Locked |
| D-197 | Runtime configuration is cache-first                              | ✅ Locked |
| D-198 | All changes are fully audited                                     | ✅ Locked |
| D-199 | Feature flag schema is owned exclusively by the Platform API      | ✅ Locked |
| D-200 | Future A/B testing can be implemented without schema redesign     | ✅ Locked |

---

# 🚨 Major Architecture Improvement Over the Original Design

Your original design proposed a single `platform_feature_flags` table with three scopes (global, product, account). This specification expands that concept into a **complete Runtime Configuration Platform**.

Key improvements include:

- **Separation of feature flags and runtime configuration**, allowing both boolean feature toggles and typed configuration values (timeouts, limits, thresholds, URLs, JSON settings).
- **Deterministic override hierarchy**: Organization → Product → Environment → Global.
- **Percentage rollouts and kill switches** for safe production deployments.
- **Environment-aware configuration**, enabling different behaviors in Development, Staging, and Production without code changes.
- **Cache-first evaluation**, allowing millions of feature checks per minute with Redis or in-memory caches while keeping PostgreSQL as the source of truth.
- **Future compatibility with experimentation frameworks** (A/B testing, canary releases, targeted rollouts) without redesigning the schema.

This turns feature management into a dedicated platform capability that every current and future AutoShipp service can rely on, enabling safer deployments, faster experimentation, and centralized operational control.

---

# AES-020 — Platform API Architecture Specification

**Document ID:** AES-020

**Title:** Platform API Architecture Specification

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Primary Service:** Platform API (NestJS)

**Depends On**

- AES-008 — Master Database Blueprint
- AES-009 — Identity
- AES-010 — Organization
- AES-011 — Commerce
- AES-012 — Marketplace
- AES-013 — Billing
- AES-014 — Wallet
- AES-015 — Integration
- AES-016 — Customer
- AES-017 — Audit
- AES-018 — Notification
- AES-019 — Feature Flags

---

# 1. Executive Summary

The Platform API is the central orchestration layer of AutoShipp.

It owns:

- Authentication
- Authorization
- Organizations
- Marketplace
- Billing
- Wallet
- Customers
- Commerce
- Integrations
- Notifications
- Feature Flags
- Platform Administration

It **does not own** product-specific business logic.

Products expose their own APIs and communicate with the Platform API through well-defined contracts.

---

# 2. Architecture

```text
                    Next.js Frontend
                           │
                   HttpOnly JWT Cookie
                           │
                   Platform API (NestJS)
                           │
      ┌────────────────────┼────────────────────┐
      │                    │                    │
 Platform Schemas     Product APIs        Infrastructure
(PostgreSQL)        (Fit/ETA/...)      Redis/BullMQ
```

Platform API is the **only service** that writes to platform schemas.

---

# 3. Responsibilities

The Platform API owns:

- Login
- Logout
- Refresh
- User Management
- Organization Management
- Billing
- Wallet
- Marketplace
- Commerce
- Customers
- Integrations
- Feature Flags
- Notifications
- Audit
- Platform Dashboard

The Platform API never owns:

- Fit calculations
- ETA predictions
- Return workflows
- AI inference
- Shipping algorithms

---

# 4. API Design Principles

## Principle 1

REST-first architecture.

---

## Principle 2

JSON request/response.

---

## Principle 3

Stateless.

JWT in HttpOnly Cookie.

---

## Principle 4

Versioned APIs.

```text
/api/v1
```

Future

```text
/api/v2
```

---

## Principle 5

Every endpoint requires explicit authorization.

---

## Principle 6

Every write operation generates an audit event.

---

## Principle 7

Idempotency for all retryable operations.

---

# 5. API URL Structure

```text
/api/v1
```

Example

```text
/api/v1/auth/login

/api/v1/users

/api/v1/organizations

/api/v1/marketplace/products

/api/v1/billing/invoices
```

---

# 6. Resource Naming

Use plural nouns.

Correct

```text
/users

/organizations

/products

/invoices

/customers
```

Incorrect

```text
/getUser

/createInvoice

/deleteCustomer
```

---

# 7. HTTP Methods

| Method | Purpose                      |
| ------ | ---------------------------- |
| GET    | Read                         |
| POST   | Create                       |
| PUT    | Replace                      |
| PATCH  | Partial Update               |
| DELETE | Soft Delete where applicable |

---

# 8. Authentication

Protected endpoints

↓

JWT Cookie

Flow

```text
Login

↓

JWT Generated

↓

HttpOnly Cookie

↓

Every Request

↓

JwtGuard

↓

User Context

↓

Controller
```

JWT contains

```json
{
  "sub": "...",
  "organization_id": "...",
  "user_type": "...",
  "role": "...",
  "token_version": 4
}
```

---

# 9. Authorization Pipeline

Every protected endpoint executes

```text
JwtAuthGuard

↓

UserTypeGuard

↓

PermissionGuard

↓

Controller
```

Exactly as defined in AES-009.

---

# 10. Standard Response Format

Success

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Error

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User not found"
  }
}
```

No custom formats.

No exceptions.

Everything follows this contract.

---

# 11. Pagination Standard

Request

```text
?page=1&pageSize=25
```

Response

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 25,
    "total": 240,
    "pages": 10
  }
}
```

---

# 12. Filtering

Examples

```text
GET /customers

?status=ACTIVE

&country=IN

&search=john
```

Supports

- equality
- search
- date ranges
- enums

No arbitrary SQL filtering.

---

# 13. Sorting

```text
?sort=createdAt

?order=desc
```

Only whitelisted fields.

---

# 14. Field Selection (Future)

Optional optimization.

Example

```text
GET /customers

?fields=id,name,email
```

Useful for dashboards and large datasets.

---

# 15. Idempotency

Required for operations like

- Payment
- Wallet Top-up
- Subscription Creation
- Organization Creation
- Product Assignment

Header

```text
Idempotency-Key
```

Duplicate requests return the original response.

---

# 16. API Versioning

Current

```text
/api/v1
```

Breaking changes

↓

```text
/api/v2
```

No breaking changes inside a version.

---

# 17. Rate Limiting

Public endpoints

```text
100 requests/minute/IP
```

Authenticated

```text
1000 requests/minute/user
```

Administrative endpoints have stricter limits.

Implemented using Redis-backed rate limiting.

---

# 18. Error Codes

Every error has:

| Field     | Description                  |
| --------- | ---------------------------- |
| code      | Stable machine-readable code |
| message   | Human-readable description   |
| requestId | Correlation ID               |
| timestamp | ISO 8601                     |

Example

```json
{
  "code": "PERMISSION_DENIED",
  "message": "Missing permission: billing:manage"
}
```

---

# 19. Correlation IDs

Every request receives

```text
X-Correlation-ID
```

Propagated to:

- Audit
- Logs
- Workers
- Product APIs
- Notifications

Allows end-to-end tracing.

---

# 20. API Modules

## Authentication

```text
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
GET    /auth/me
```

---

## Users

```text
GET

POST

PATCH

DELETE
```

---

## Organizations

```text
GET

POST

PATCH

TRANSFER

ARCHIVE
```

---

## Marketplace

```text
GET /products

GET /editions

GET /assignments

POST /assignments
```

---

## Commerce

```text
Stores

Products

Orders

Collections

Inventory
```

Read-only for most users.

---

## Customers

```text
Customers

Addresses

Segments

Tags
```

---

## Billing

```text
Plans

Subscriptions

Invoices

Payments
```

---

## Wallet

```text
Balance

Transactions

Top-up

Packages
```

---

## Integrations

```text
Providers

Connections

Webhooks

Sync Jobs
```

---

## Notifications

```text
Templates

Events

Deliveries

Preferences
```

---

## Feature Flags

```text
Flags

Runtime Config

Overrides
```

---

## Platform Administration

```text
Health

Metrics

Users

Audit

Logs

Settings
```

---

# 21. Product API Integration

Platform API never executes product logic.

Instead

```text
Next.js

↓

Platform API

↓

Fit API

↓

Result
```

Example

```text
GET /platform/products/fit/status

↓

Platform

↓

Fit API

↓

Response
```

Platform becomes the gateway/orchestrator where appropriate, while product-specific frontends may also call product APIs directly if designed to do so.

---

# 22. Cross-Service Communication

Allowed

```text
Platform

↓

Fit API
```

Allowed

```text
Platform

↓

ETA API
```

Allowed

```text
Platform

↓

Returns API
```

Forbidden

```text
Platform

↓

Fit Database
```

Platform never writes product schemas.

---

# 23. Validation

Every request validates:

- DTO
- Types
- Length
- Enums
- UUIDs
- Permissions

Before reaching business logic.

---

# 24. OpenAPI

Every endpoint automatically generates documentation.

Available at

```text
/api/docs
```

(Disabled or protected in production.)

Generated from NestJS Swagger decorators.

---

# 25. Security

The Platform API implements:

- JWT Authentication
- HttpOnly Cookies
- RBAC
- Permission Guards
- CSRF Protection
- Secure Headers
- Input Validation
- Output Sanitization
- Rate Limiting
- Audit Logging
- Request Correlation
- Secret Management

Detailed implementation is specified in AES-028.

---

# 26. Read / Write Ownership

| Domain          | Read             | Write                     |
| --------------- | ---------------- | ------------------------- |
| Identity        | ✅               | ✅                        |
| Organization    | ✅               | ✅                        |
| Commerce        | ✅               | ✅ _(Platform Sync only)_ |
| Customer        | ✅               | ✅ _(Platform Sync only)_ |
| Marketplace     | ✅               | ✅                        |
| Billing         | ✅               | ✅                        |
| Wallet          | ✅               | ✅                        |
| Integration     | ✅               | ✅                        |
| Notification    | ✅               | ✅                        |
| Feature Flags   | ✅               | ✅                        |
| Product Schemas | Via Product APIs | ❌                        |

---

# 27. API Lifecycle

```text
Request

↓

Middleware

↓

Guards

↓

Validation

↓

Controller

↓

Service

↓

Repository (Prisma)

↓

Database

↓

Audit Event

↓

Response
```

Every request follows the same pipeline.

---

# 28. Performance Strategy

- Cursor pagination for very large datasets.
- Gzip/Brotli compression.
- ETag support for cacheable GET endpoints.
- Redis caching for frequently read configuration.
- Connection pooling via Prisma.
- Async processing for non-critical work (notifications, audits, exports).

---

# 29. Decision Register

| ID    | Decision                                                                                   | Status    |
| ----- | ------------------------------------------------------------------------------------------ | --------- |
| D-221 | Platform API is the sole writer of platform schemas                                        | ✅ Locked |
| D-222 | Product logic remains in independent product services                                      | ✅ Locked |
| D-223 | REST is the primary API style                                                              | ✅ Locked |
| D-224 | APIs are versioned using `/api/v{n}`                                                       | ✅ Locked |
| D-225 | JWT in HttpOnly cookies is the authentication mechanism                                    | ✅ Locked |
| D-226 | Guard pipeline is `JwtAuthGuard → UserTypeGuard → PermissionGuard`                         | ✅ Locked |
| D-227 | Standard response and error envelopes are mandatory                                        | ✅ Locked |
| D-228 | Idempotency is required for retryable write operations                                     | ✅ Locked |
| D-229 | OpenAPI documentation is generated from code                                               | ✅ Locked |
| D-230 | Cross-product interaction occurs through APIs, never database writes or cross-schema reads | ✅ Locked |

---

# 🚨 Architecture Improvement Over the Original Design

This specification transforms the Platform API from a collection of endpoints into the **governance layer of the AutoShipp ecosystem**.

Key improvements include:

- A **uniform API contract** for every platform domain with standardized request, response, pagination, filtering, and error handling.
- Clear ownership boundaries: the Platform API exclusively manages platform schemas, while product services retain ownership of their own business logic and data.
- A mandatory security pipeline (authentication, user type validation, permission checks, validation, auditing) applied consistently to every protected endpoint.
- Built-in support for idempotency, correlation IDs, OpenAPI generation, caching, and rate limiting, making the API suitable for enterprise-scale integrations.
- Strict adherence to the architectural principle that **shared platform data is centralized, while product capabilities remain independently deployable and accessible only through their public APIs**.

This document establishes the Platform API as the stable contract between the AutoShipp frontend, platform services, workers, integrations, and future product services.

---

# AES-021 — Event-Driven Architecture Specification

**Document ID:** AES-021

**Title:** Event-Driven Architecture (EDA) Specification

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-008 — Master Database Blueprint
- AES-020 — Platform API Architecture

---

# 1. Executive Summary

AutoShipp follows an **Event-Driven Architecture (EDA)** to decouple services, improve scalability, and ensure reliable asynchronous processing.

The Event Bus enables communication between:

- Platform API
- Workers
- Future Product Services
- Notification Service
- Audit Service
- External Integrations

without introducing tight coupling.

**Important Principle**

> **Events communicate facts that have already happened.**

Examples:

✅ `organization.created`

❌ `create.organization`

Commands are handled by APIs.

Events are notifications.

---

# 2. Why Event-Driven Architecture?

Without an event bus:

```text
Platform

↓

Send Email

↓

Write Audit

↓

Sync CRM

↓

Generate Invoice

↓

Update Analytics
```

Everything becomes tightly coupled.

---

With EDA

```text
Platform API

↓

Organization Created

↓

Event Bus

↓

Notification Worker

↓

Audit Worker

↓

Analytics Worker

↓

CRM Worker
```

Every service works independently.

---

# 3. Architecture

```text
                Platform API
                     │
              Business Transaction
                     │
              Outbox Publisher
                     │
                Redis (BullMQ)
                     │
    ┌──────────┬──────────┬──────────┐
    │          │          │          │
 Audit    Notification   Billing   Future
 Worker      Worker      Worker    Workers
```

The Platform API never waits for background processing.

---

# 4. Event Design Principles

## Principle 1

Events describe something that already happened.

Correct

```text
invoice.paid
```

Wrong

```text
pay.invoice
```

---

## Principle 2

Events are immutable.

Never edit an event.

---

## Principle 3

Events are append-only.

---

## Principle 4

Consumers must be independent.

One consumer failing must not affect others.

---

## Principle 5

Every event has a version.

---

## Principle 6

Consumers must be idempotent.

Receiving the same event twice must produce the same final state.

---

# 5. Event Categories

## Platform Events

```text
organization.created

organization.updated

organization.archived

user.created

user.deleted

role.assigned
```

---

## Marketplace Events

```text
product.assigned

product.removed

edition.changed
```

---

## Billing Events

```text
subscription.created

invoice.created

invoice.paid

payment.failed

refund.created
```

---

## Wallet Events

```text
wallet.created

wallet.credited

wallet.debited

wallet.low_balance

wallet.credits_exhausted

wallet.credits_restored

wallet.statement.generated

wallet.suspended

wallet.reservation.expired
```

**Wallet event semantics:**

| Event                        | Trigger                                          | Nature                    |
| :--------------------------- | :----------------------------------------------- | :------------------------ |
| `wallet.created`             | Wallet record created                            | Lifecycle fact            |
| `wallet.credited`            | Every CREDIT transaction                         | Financial fact            |
| `wallet.debited`             | Every DEBIT transaction                          | Financial fact            |
| `wallet.low_balance`         | Debit crosses low-balance threshold              | Financial state fact      |
| `wallet.credits_exhausted`   | available_balance reaches 0 after a debit        | Financial state fact      |
| `wallet.credits_restored`    | available_balance rises above 0 after exhaustion | Financial state fact      |
| `wallet.statement.generated` | Monthly statement generation run completed       | Operational fact          |
| `wallet.suspended`           | Platform Admin sets wallet.status = SUSPENDED    | Administrative state fact |
| `wallet.reservation.expired` | Cleanup Worker releases an expired reservation   | Financial fact            |

---

## Commerce Events

```text
store.connected

order.created

order.updated

inventory.updated

product.synced
```

---

## Customer Events

```text
customer.created

customer.updated

customer.merged
```

---

## Integration Events

```text
connection.created

webhook.received

sync.started

sync.completed

sync.failed
```

---

## Notification Events

```text
notification.requested

notification.sent

notification.failed
```

---

## Security Events

```text
login.success

login.failed

permission.changed

token.revoked
```

---

## Audit Events

```text
audit.recorded
```

---

# 6. Event Naming Convention

Format

```text
domain.entity.action
```

Examples

```text
billing.invoice.created

wallet.transaction.created

customer.profile.updated

organization.brand.transferred
```

Never use verbs first.

---

# 7. Event Structure

Every event follows the same envelope.

```json
{
  "eventId": "uuid",
  "eventName": "billing.invoice.paid",
  "version": 1,
  "occurredAt": "2026-01-01T10:00:00Z",
  "correlationId": "uuid",
  "organizationId": "uuid",
  "actorId": "uuid",
  "source": "platform-api",
  "payload": {}
}
```

---

# 8. Required Event Fields

| Field         | Required |
| ------------- | -------- |
| eventId       | ✅       |
| eventName     | ✅       |
| version       | ✅       |
| occurredAt    | ✅       |
| correlationId | ✅       |
| source        | ✅       |
| payload       | ✅       |

Optional

```text
organizationId

actorId

metadata
```

---

# 9. Event Versioning

Current

```text
Version = 1
```

Future

```text
Version = 2
```

Consumers choose which versions they support.

Never break old consumers unexpectedly.

---

# 10. BullMQ Topology

Queue Structure

```text
autoshipp:queue:<domain>
```

Underlying Data Structure

```text
Redis Lists & Sorted Sets
```

Job Names (Event Types)

```text
billing.invoice.created

wallet.transaction.created

notification.requested

organization.brand.transferred

customer.profile.updated

commerce.order.created
```

Example Queue

```text
autoshipp:queue:billing
```

Example Job Name in that Queue

```text
billing.invoice.created
```

---

# 11. Queue Strategy

Each consumer owns its own queue.

```text
Notification Queue

Audit Queue

Analytics Queue

Billing Queue

CRM Queue
```

Consumers never share queues.

---

# 12. Dead Letter Queue (DLQ)

Every queue has a matching DLQ.

Example

```text
notification.queue

↓

notification.dlq
```

Messages that exceed retry limits are moved to the DLQ for manual inspection or automated replay.

---

# 13. Retry Policy

Retry schedule

```text
Attempt 1

↓

Immediate

Attempt 2

↓

30 sec

Attempt 3

↓

2 min

Attempt 4

↓

10 min

Attempt 5

↓

DLQ
```

Exponential backoff.

---

# 14. Idempotency

Every consumer stores processed event IDs.

Example

```text
eventId

↓

Already Processed?

↓

Ignore
```

Prevents duplicate processing after retries.

---

# 15. Event Ordering

Ordering is guaranteed **only within a single queue**.

Services must not assume global ordering across different queues.

Where strict ordering is required (e.g., wallet transactions), events should be partitioned by aggregate key (such as `walletId`) and processed serially by that consumer.

---

# 16. Transaction Pattern

Platform follows the **Transactional Outbox Pattern**.

```text
Business Transaction

↓

Database Commit

↓

Outbox Record

↓

Outbox Publisher

↓

BullMQ
```

This prevents lost events if the application crashes after committing business data.

**Important:** Events are **not** published directly from business services inside the database transaction.

---

# 17. Event Delivery Guarantee

Delivery guarantee

```text
At-Least-Once
```

Exactly-once delivery is not attempted.

Idempotent consumers ensure correctness.

---

# 18. Event Retention

BullMQ retains messages until acknowledged.

Long-term history belongs in the Audit schema, not the message broker.

Outbox records are retained temporarily for replay and operational recovery.

---

# 19. Correlation IDs

Every event carries

```text
correlationId
```

Flow

```text
HTTP Request

↓

Platform API

↓

BullMQ

↓

Worker

↓

Audit

↓

Logs
```

Enables end-to-end tracing.

---

# 20. Event Producers

Platform API

↓

Produces

```text
Organization Events

Billing Events

Wallet Events

Customer Events

Marketplace Events
```

Workers may also publish follow-up events after successful processing.

---

# 21. Event Consumers

Notification Worker

Audit Worker

Billing Worker

Sync Worker

Analytics Worker

Webhook Worker

Future Product Workers

Each consumer is independent.

---

# 22. Event Flow Example

```text
Create Organization

↓

Database Transaction

↓

Outbox Record

↓

Commit

↓

Outbox Publisher

↓

BullMQ

↓

Audit Worker

↓

Notification Worker

↓

Analytics Worker

↓

Completed
```

No synchronous waiting after the transaction commits.

---

# 23. Event Contracts

Every event has a documented contract.

Example

```text
organization.created
```

Contains

```json
{
  "organizationId": "...",
  "organizationType": "BRAND",
  "createdBy": "...",
  "createdAt": "..."
}
```

Contracts are version-controlled.

Breaking changes require a new version.

---

# 24. Security

Events never contain:

- Passwords
- JWT Tokens
- API Keys
- OAuth Tokens
- Credit Card Data
- Sensitive secrets

Sensitive references use IDs.

Consumers fetch additional data if necessary.

---

# 25. Monitoring

Track

- Published events
- Failed events
- Retry count
- DLQ size
- Consumer lag
- Queue depth
- Processing latency

Integrated into `/platform/health`.

---

# 26. Technology Stack

| Component      | Technology                       |
| -------------- | -------------------------------- |
| Message Broker | BullMQ                           |
| Exchange Type  | Topic                            |
| Pattern        | Transactional Outbox             |
| Serialization  | JSON                             |
| Delivery       | At-Least-Once                    |
| Retry          | Exponential Backoff              |
| DLQ            | Per Queue                        |
| Tracing        | Correlation ID                   |
| Publisher      | Platform Outbox Publisher Worker |

---

# 27. Future Compatibility

This architecture supports:

- Independent product services
- Multiple worker instances
- Horizontal scaling
- Scheduled events
- Event replay
- Event sourcing (if introduced later)
- Streaming analytics

without redesigning the event contracts.

---

# 28. Decision Register

| ID    | Decision                                               | Status    |
| ----- | ------------------------------------------------------ | --------- |
| D-231 | BullMQ is the platform event broker                    | ✅ Locked |
| D-232 | Topic exchanges are used for routing                   | ✅ Locked |
| D-233 | Events describe completed facts, not commands          | ✅ Locked |
| D-234 | All events use a standard event envelope               | ✅ Locked |
| D-235 | Event publishing uses the Transactional Outbox Pattern | ✅ Locked |
| D-236 | Delivery guarantee is At-Least-Once                    | ✅ Locked |
| D-237 | Consumers must be idempotent                           | ✅ Locked |
| D-238 | Every queue has a Dead Letter Queue                    | ✅ Locked |
| D-239 | Event contracts are versioned                          | ✅ Locked |
| D-240 | Events never contain secrets or sensitive credentials  | ✅ Locked |

---

# 🚨 Major Architecture Improvement Over the Original Design

Your original architecture mainly described synchronous communication between services. This specification introduces a **platform-wide Event-Driven Architecture** based on BullMQ and the **Transactional Outbox Pattern**, which is the standard approach used in large-scale distributed systems.

Key improvements include:

- **Reliable event publishing** through the Transactional Outbox Pattern, eliminating the risk of database commits succeeding while event publication fails.
- **Decoupled services**, where producers are unaware of consumers, allowing new workers and capabilities to be added without modifying existing code.
- **Standardized event contracts** with versioning, correlation IDs, and consistent envelopes.
- **Independent consumer queues**, ensuring failures in one subsystem (such as Notifications) never block others (such as Audit or Analytics).
- **At-least-once delivery with idempotent consumers**, providing reliable processing while keeping the implementation practical and scalable.
- **Built-in retry, dead-letter queues, monitoring, and tracing**, giving the platform operational resilience and observability from day one.

This architecture forms the backbone of asynchronous processing across AutoShipp and provides a stable integration mechanism for future platform capabilities and independently deployed product services.

---

# AES-022 — Background Jobs & Worker Architecture Specification

**Document ID:** AES-022

**Title:** Background Jobs & Worker Architecture Specification

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-020 — Platform API Architecture
- AES-021 — Event-Driven Architecture

---

# 1. Executive Summary

The AutoShipp Worker Platform is responsible for executing **all asynchronous and long-running operations**.

The Platform API should return a response as quickly as possible.

Anything that is not required to complete the current HTTP request must execute in a background worker.

This architecture provides:

- Horizontal scalability
- Retry mechanisms
- Scheduled jobs
- Long-running task execution
- High throughput
- Fault isolation

Workers consume jobs from BullMQ queues and execute them independently.

---

# 2. Architecture

```text
                    Next.js
                        │
                 HTTP Request
                        │
                  Platform API
                        │
              Business Transaction
                        │
                 Publish Event
                        │
                  BullMQ Broker
                        │
     ┌────────────┬────────────┬────────────┐
     │            │            │            │
 Notification  Billing     Sync      Audit Worker
    Worker      Worker     Worker
     │            │            │
     └────────────┴────────────┘
                  Database
```

Workers never receive HTTP traffic.

Workers only consume messages.

---

# 3. Design Principles

## Principle 1

Workers never expose public APIs.

---

## Principle 2

Workers are stateless.

---

## Principle 3

Workers may be scaled independently.

---

## Principle 4

Workers must be idempotent.

---

## Principle 5

Workers never own business data.

They execute business processes.

---

## Principle 6

Every job is traceable.

---

# 4. Worker Categories

## Notification Worker

Responsibilities

- Email
- SMS
- WhatsApp
- Push
- In-App notifications

Consumes

```text
notification.requested
```

Produces

```text
notification.sent

notification.failed
```

---

## Audit Worker

Responsibilities

- Persist audit records
- Activity timeline
- Archive audit data

Consumes

```text
audit.record
```

Produces

```text
audit.completed
```

---

## Billing Worker

Responsibilities

- Invoice generation
- Subscription renewals
- Payment reminders
- Credit note generation

Consumes

```text
invoice.generate

subscription.renew
```

---

## Wallet Worker

Responsibilities

- Wallet settlements
- Credit expiration
- Promotional credits
- Reservation cleanup

Consumes

```text
wallet.credit

wallet.debit
```

---

## Integration Worker

Responsibilities

- Shopify sync
- WooCommerce sync
- Delhivery sync
- Shiprocket sync
- API polling

Consumes

```text
sync.start
```

---

## Webhook Worker

Responsibilities

- Validate webhooks
- Normalize payloads
- Publish platform events

Consumes

```text
webhook.received
```

---

## Export Worker

Responsibilities

- CSV Export
- Excel Export
- PDF Reports
- Analytics exports

Consumes

```text
report.export
```

---

## Import Worker

Responsibilities

- CSV Imports
- Customer imports
- Product imports
- Historical migrations

Consumes

```text
import.start
```

---

## Cleanup Worker

Responsibilities

- Expired sessions
- Temporary files
- Cache cleanup
- Old exports

Runs on schedule.

---

## Scheduler Worker

Runs cron jobs.

Examples

```text
Daily Billing

Nightly Sync

Backup Trigger

Analytics Refresh

Wallet Expiration
```

---

# 5. Queue Architecture

Every worker owns dedicated queues.

```text
notification.queue

audit.queue

billing.queue

wallet.queue

integration.queue

webhook.queue

import.queue

export.queue

cleanup.queue

scheduler.queue
```

No queue sharing.

---

# 6. Queue Naming Convention

Format

```text
autoshipp.<domain>.<operation>
```

Examples

```text
autoshipp.notification.send

autoshipp.billing.invoice

autoshipp.wallet.credit

autoshipp.integration.sync
```

---

# 7. Job Lifecycle

```text
HTTP Request

↓

Business Logic

↓

Outbox Event

↓

BullMQ

↓

Worker Receives Job

↓

Processing

↓

Success

↓

ACK
```

Failure

↓

Retry

↓

Dead Letter Queue

---

# 8. Job Structure

Every job contains

```json
{
  "jobId": "uuid",
  "eventId": "uuid",
  "correlationId": "uuid",
  "jobType": "notification.send",
  "payload": {},
  "attempt": 1,
  "createdAt": ""
}
```

---

# 9. Retry Strategy

```text
Attempt 1

↓

Immediate

Attempt 2

↓

30 sec

Attempt 3

↓

2 min

Attempt 4

↓

10 min

Attempt 5

↓

Dead Letter Queue
```

Exponential backoff.

Configurable per queue.

---

# 10. Dead Letter Queues

Every queue has

```text
.queue

↓

.dlq
```

Example

```text
autoshipp.notification.send

↓

autoshipp.notification.send.dlq
```

DLQs are monitored continuously.

---

# 11. Scheduled Jobs

Scheduler Worker supports

BullMQ Job Scheduler expressions

Examples

```text
0 0 * * *

Nightly Sync
```

```text
0 */6 * * *

Health Checks
```

```text
0 1 * * *

Invoice Generation
```

No business logic inside BullMQ Job Scheduler handlers.

BullMQ Job Scheduler handlers publish jobs to the appropriate queues.

---

# 12. Idempotency

Every worker stores

```text
Job ID

↓

Already Processed?

↓

Ignore
```

Duplicate messages are harmless.

---

# 13. Timeouts

Every worker defines

- Maximum execution time
- Retry timeout
- Visibility timeout

Example

Notification

```text
60 sec
```

Export

```text
15 min
```

Import

```text
1 hour
```

Long-running jobs must periodically checkpoint progress.

---

# 14. Worker Scaling

Workers scale independently.

Example

```text
Notification

5 Pods

Billing

2 Pods

Audit

2 Pods

Sync

10 Pods
```

Scaling depends on queue depth and throughput.

---

# 15. Priority Queues

Supported priorities

```text
CRITICAL

HIGH

NORMAL

LOW
```

Examples

Critical

- Password Reset
- Login Security Alert

Normal

- Marketing Email

Low

- Analytics Refresh

---

# 16. Job Monitoring

Track

- Queue depth
- Processing rate
- Failed jobs
- Retry count
- Processing time
- Success rate
- Worker uptime

Displayed in

```text
/platform/health
```

---

# 17. Worker Communication

Workers communicate only by

- Events
- Platform APIs (when necessary)

Never

```text
Worker A

↓

Worker B Database
```

No worker writes another worker's storage.

---

# 18. Failure Handling

Worker crash

↓

BullMQ requeues message

↓

Another worker processes it

Platform remains operational.

---

# 19. Graceful Shutdown

During deployment

```text
Stop Accepting Jobs

↓

Finish Current Job

↓

ACK

↓

Shutdown
```

No message loss.

---

# 20. Security

Workers

- Use service accounts
- Use least privilege
- Never expose HTTP endpoints publicly
- Validate every payload
- Log every failure
- Propagate correlation IDs
- Emit audit events where applicable

---

# 21. Technology Stack

| Component      | Technology            |
| -------------- | --------------------- |
| Queue Broker   | BullMQ                |
| Worker Runtime | NestJS                |
| Serialization  | JSON                  |
| Scheduling     | BullMQ Job Scheduler  |
| Retry          | BullMQ + Worker Logic |
| Monitoring     | Prometheus            |
| Logging        | Structured JSON Logs  |

---

# 22. Deployment Model

Each worker is independently deployable.

Example

```text
apps/

platform-api/

worker-notification/

worker-audit/

worker-sync/

worker-billing/

worker-wallet/

worker-webhook/

worker-export/

worker-import/

worker-cleanup/

worker-scheduler/
```

Workers can be deployed, restarted, and scaled without affecting the Platform API.

---

# 23. Performance Targets

| Metric                  | Target   |
| ----------------------- | -------- |
| Notification processing | < 5 sec  |
| Audit processing        | < 2 sec  |
| Webhook processing      | < 2 sec  |
| Invoice generation      | < 30 sec |
| CSV export              | < 5 min  |
| Customer import         | < 30 min |

---

# 24. Future Compatibility

Supports

- Distributed workers
- Multi-region workers
- GPU workers (AI)
- Batch processing
- Stream processing
- Kubernetes auto-scaling

No redesign required.

---

# 25. Decision Register

| ID    | Decision                                                                               | Status    |
| ----- | -------------------------------------------------------------------------------------- | --------- |
| D-241 | All asynchronous work is executed by background workers                                | ✅ Locked |
| D-242 | Workers are stateless and horizontally scalable                                        | ✅ Locked |
| D-243 | Every worker owns dedicated BullMQ queues                                              | ✅ Locked |
| D-244 | Jobs follow a standard payload format                                                  | ✅ Locked |
| D-245 | Retry uses exponential backoff with configurable policies                              | ✅ Locked |
| D-246 | Every queue has a dedicated Dead Letter Queue                                          | ✅ Locked |
| D-247 | Scheduled jobs publish work to queues rather than executing business logic directly    | ✅ Locked |
| D-248 | Workers communicate via events and platform APIs, never through each other's databases | ✅ Locked |
| D-249 | Graceful shutdown prevents message loss during deployments                             | ✅ Locked |
| D-250 | Each worker is independently deployable and scalable                                   | ✅ Locked |

---

# 🚨 Major Architecture Improvement Over the Original Design

The original architecture implicitly handled many background operations within the Platform API. This specification extracts those responsibilities into a dedicated worker platform.

Key improvements include:

- **Strict separation between synchronous APIs and asynchronous processing**, keeping HTTP requests fast and responsive.
- **Dedicated workers for each operational domain** (Notifications, Billing, Wallet, Integrations, Imports, Exports, Cleanup, Scheduler), allowing independent deployment and horizontal scaling.
- **Queue-per-worker architecture** with retry policies, Dead Letter Queues, and graceful shutdown, ensuring reliability under failures and deployments.
- **Stateless workers** that process standardized job payloads and rely on BullMQ for coordination, enabling elastic scaling.
- **Platform-wide observability**, where queue depth, processing rates, failures, retries, and worker health integrate directly into the Platform Health dashboard.

This worker architecture provides the operational backbone for AutoShipp's asynchronous processing, allowing the platform to scale from a handful of jobs to millions of background tasks while maintaining resilience, fault isolation, and clean service boundaries.

---

# AES-023 — Platform Health, Monitoring & Observability Architecture Specification

**Document ID:** AES-023

**Title:** Platform Health, Monitoring & Observability Architecture

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-020 — Platform API Architecture
- AES-021 — Event-Driven Architecture
- AES-022 — Background Workers Architecture

---

# 1. Executive Summary

The Platform Health & Monitoring Architecture provides centralized operational visibility across the entire AutoShipp ecosystem.

It allows Platform Administrators to monitor:

- Platform API
- Background Workers
- Future Product Services
- Database
- Redis
- BullMQ
- Object Storage
- External Integrations
- Scheduled Jobs
- Deployments
- Infrastructure
- Security

The health dashboard is **Platform-only** and is never accessible to Brand or Aggregator users.

---

# 2. Goals

The monitoring platform must answer these questions instantly:

- Is the platform healthy?
- Which service is failing?
- Which queue is backed up?
- Is PostgreSQL overloaded?
- Is Redis healthy?
- Are workers processing jobs?
- Are integrations syncing?
- Which deployment introduced the issue?
- What is the platform uptime?

---

# 3. Architecture

```text
                     Platform Dashboard
                            │
                    Health Aggregator API
                            │
      ┌─────────────┬─────────────┬─────────────┐
      │             │             │             │
 Platform API   Worker APIs   Product APIs   Infrastructure
      │             │             │             │
      └─────────────┴─────────────┴─────────────┘
                    Health Collector
                            │
                   Metrics Database
```

The Platform Dashboard never polls every service directly.

A dedicated **Health Aggregator** collects, normalizes, caches, and exposes health information.

---

# 4. Monitoring Layers

## Layer 1 — Infrastructure

Monitor:

- PostgreSQL
- Redis
- BullMQ
- Object Storage
- DNS
- SSL
- Disk
- CPU
- Memory
- Network

---

## Layer 2 — Platform Services

Monitor:

- Platform API
- Scheduler
- Notification Worker
- Billing Worker
- Wallet Worker
- Integration Worker
- Audit Worker
- Import Worker
- Export Worker
- Cleanup Worker

---

## Layer 3 — Product Services

Future services:

- Fit
- ETA
- Returns
- AI Assistant
- Shipping
- Marketing

Every product exposes:

```http
GET /health
```

---

## Layer 4 — External Providers

Monitor

- Shopify API
- WooCommerce API
- Delhivery
- Shiprocket
- ShipXSpeed
- Razorpay
- Email Provider
- SMS Provider
- WhatsApp Provider

Failures are shown separately from internal failures.

---

# 5. Health Endpoint Standard

Every service implements

```http
GET /health
```

Response

```json
{
  "service": "platform-api",
  "status": "healthy",
  "version": "1.2.0",
  "uptime": 86400,
  "timestamp": "2026-06-29T12:00:00Z"
}
```

Optional

```json
{
  "checks": {
    "database": "healthy",
    "redis": "healthy",
    "rabbitmq": "healthy"
  }
}
```

---

# 6. Health Status

Only four statuses exist.

```text
HEALTHY

DEGRADED

UNHEALTHY

OFFLINE
```

Definitions

| Status    | Meaning                            |
| --------- | ---------------------------------- |
| HEALTHY   | Fully operational                  |
| DEGRADED  | Operational but partially impaired |
| UNHEALTHY | Critical functionality unavailable |
| OFFLINE   | Service unreachable                |

---

# 7. Platform Dashboard

Example

```text
-----------------------------------------------------
Platform API          🟢 Healthy      v1.2.0

Notification Worker   🟢 Healthy

Billing Worker        🟢 Healthy

Wallet Worker         🟢 Healthy

Audit Worker          🟢 Healthy

Import Worker         🟡 Busy

Export Worker         🟢 Healthy

Cleanup Worker        🟢 Healthy

Scheduler             🟢 Healthy

BullMQ              🟢 Healthy

Redis                 🟢 Healthy

PostgreSQL            🟢 Healthy

Storage               🟢 Healthy
-----------------------------------------------------
```

---

# 8. Product Dashboard

Future

```text
-----------------------------------------------------
Fit Intelligence      🟢 Healthy

Delivery ETA          🟢 Healthy

Returns               🔴 Offline

AI Assistant          🟡 Degraded

Shipping              🟢 Healthy
-----------------------------------------------------
```

Exactly as discussed during architecture planning.

---

# 9. Queue Monitoring

Monitor

- Queue depth
- Waiting jobs
- Active jobs
- Failed jobs
- Retry count
- Dead Letter Queue size

Example

```text
Notification Queue

Pending: 23

Processing: 4

Failed: 0

DLQ: 0
```

---

# 10. Database Monitoring

Track

- Active connections
- Idle connections
- Query latency
- Slow queries
- Locks
- Deadlocks
- Transactions/sec
- Storage usage
- Replication status (future)

---

# 11. Redis Monitoring

Track

- Memory usage
- Connected clients
- Hit ratio
- Miss ratio
- Evictions
- Commands/sec
- Replication status (future)

---

# 12. BullMQ Monitoring

Track

- Exchanges
- Queues
- Consumers
- Publish rate
- ACK rate
- Unacked messages
- Queue latency

---

# 13. Worker Monitoring

Each worker reports

- Running
- Version
- Queue
- Active Jobs
- Failed Jobs
- Last Processed Job
- Average Processing Time

---

# 14. Scheduled Jobs

Monitor

```text
Nightly Sync

Next Run

Last Success

Duration
```

For every scheduled task.

---

# 15. Integration Monitoring

Every integration shows

```text
Shopify

Connected

Last Sync

2 min ago
```

```text
Delhivery

Healthy

API Latency

190 ms
```

Failures never stop the Platform Dashboard.

---

# 16. Deployment Monitoring

Track

- Version
- Deployment Time
- Git Commit
- Build Number
- Environment
- Release Channel

Example

```text
Platform API

v2.1.3

Commit

8fa2cd1

Deployed

5 min ago
```

---

# 17. Performance Metrics

Collect

- API Response Time
- Database Query Time
- Queue Processing Time
- Worker Throughput
- Cache Hit Rate
- Event Processing Time

Displayed historically.

---

# 18. Alerts

Alert levels

```text
INFO

WARNING

ERROR

CRITICAL
```

Examples

Critical

- Database unavailable
- BullMQ unavailable
- Platform API unavailable

Warning

- Queue growing rapidly
- Redis memory > 80%
- High API latency

Info

- New deployment
- Worker restarted

---

# 19. Incident Timeline

Every incident records

- Started
- Detected
- Acknowledged
- Resolved
- Root Cause
- Duration

Supports future postmortems.

---

# 20. Metrics Collection

Platform uses

Prometheus

↓

Metrics Collector

↓

Grafana Dashboards

↓

Alerts

Metrics are collected continuously.

---

# 21. Logging Integration

Every metric links to

- Logs
- Audit Events
- Correlation IDs
- Request IDs

Engineers can move directly from a failed health check to the relevant logs.

---

# 22. Security Monitoring

Track

- Failed logins
- Locked accounts
- Permission denials
- Token revocations
- Rate limit violations
- Suspicious API activity

Displayed only to Platform Owners.

---

# 23. Health Aggregator

The Health Aggregator is a dedicated platform component.

Responsibilities

- Poll services
- Cache results
- Normalize responses
- Calculate overall health
- Expose `/platform/health`

It prevents the dashboard from making dozens of direct service calls.

---

# 24. Performance Targets

| Metric                  | Target     |
| ----------------------- | ---------- |
| Health refresh          | 30 seconds |
| Health endpoint latency | < 200 ms   |
| Dashboard load          | < 1 second |
| Queue metrics refresh   | 15 seconds |
| Infrastructure polling  | 30 seconds |

---

# 25. Technology Stack

| Component  | Technology            |
| ---------- | --------------------- |
| Metrics    | Prometheus            |
| Dashboards | Grafana               |
| Health API | NestJS                |
| Logging    | Structured JSON       |
| Tracing    | Correlation IDs       |
| Alerts     | Alertmanager (future) |

---

# 26. Future Compatibility

Supports

- Kubernetes
- Multi-region deployment
- Multiple PostgreSQL clusters
- Multiple BullMQ clusters
- Multiple Redis clusters
- Auto-scaling
- Blue/Green deployments
- Canary releases

No architectural changes required.

---

# 27. Decision Register

| ID    | Decision                                                                                  | Status    |
| ----- | ----------------------------------------------------------------------------------------- | --------- |
| D-251 | Every service must expose `GET /health`                                                   | ✅ Locked |
| D-252 | Health data is aggregated through a dedicated Health Aggregator                           | ✅ Locked |
| D-253 | Platform Dashboard never polls services directly                                          | ✅ Locked |
| D-254 | Four standardized health states: Healthy, Degraded, Unhealthy, Offline                    | ✅ Locked |
| D-255 | Infrastructure, platform, workers, products, and integrations are monitored independently | ✅ Locked |
| D-256 | Queue depth and worker throughput are first-class operational metrics                     | ✅ Locked |
| D-257 | Prometheus is the metrics source of truth                                                 | ✅ Locked |
| D-258 | Grafana is the primary visualization layer                                                | ✅ Locked |
| D-259 | Correlation IDs link health events to logs and audit records                              | ✅ Locked |
| D-260 | Platform Health is accessible only to Platform users with administrative permissions      | ✅ Locked |

---

# 🚨 Major Architecture Improvement Over the Original Design

Your original design included a `/platform/health` page that polled individual services. This specification expands that concept into a complete observability platform.

Major improvements include:

- **A dedicated Health Aggregator Service** that collects, caches, and normalizes health information, preventing the frontend from polling every service directly.
- **Layered monitoring** covering infrastructure, platform services, workers, future product services, external integrations, and scheduled jobs.
- **Standardized health contracts** (`GET /health`) implemented by every service, enabling consistent monitoring regardless of the service technology.
- **Deep operational metrics**, including queue depth, worker throughput, deployment information, database performance, cache efficiency, and integration status.
- **Integrated observability**, where health checks connect directly to logs, audit records, and correlation IDs for rapid troubleshooting.
- **Future-ready architecture** that supports Kubernetes, multi-region deployments, auto-scaling, and additional services without redesign.

This document establishes the operational control center for AutoShipp, ensuring that platform administrators have a single, real-time view of the health and performance of the entire ecosystem—from infrastructure to business services.

---

# AES-024 — Logging, Observability & Distributed Tracing Architecture Specification

**Document ID:** AES-024

**Title:** Logging, Observability & Distributed Tracing Architecture

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-020 — Platform API Architecture
- AES-021 — Event-Driven Architecture
- AES-022 — Background Workers
- AES-023 — Platform Health & Monitoring

---

# 1. Executive Summary

Observability is the ability to understand **what happened, why it happened, and where it happened** without manually debugging production systems.

The AutoShipp observability platform consists of five pillars:

- Structured Logging
- Metrics
- Distributed Tracing
- Exception Tracking
- Audit Events

These work together to provide complete visibility across the platform.

---

# 2. Goals

The platform must answer questions such as:

- Why did this request fail?
- Which service is slow?
- Which SQL query caused the latency?
- Which worker failed?
- Which deployment introduced the issue?
- Which API call generated this event?
- Which user triggered this action?
- How did a request flow across services?

---

# 3. Architecture

```text
                    Client
                      │
                HTTP Request
                      │
                Correlation ID
                      │
               Platform API
                      │
      ┌───────────────┼───────────────┐
      │               │               │
 Structured Logs   Metrics      Distributed Trace
      │               │               │
      └───────────────┼───────────────┘
                      │
              Observability Stack
                      │
       Logs • Metrics • Traces • Alerts
```

---

# 4. Five Pillars

## 1. Structured Logging

Records every important event.

---

## 2. Metrics

Numerical performance data.

---

## 3. Distributed Tracing

Tracks a request across services.

---

## 4. Exception Tracking

Captures unexpected failures.

---

## 5. Audit Events

Business and security history.

---

# 5. Structured Logging

Every log is JSON.

Never plain text.

Example

```json
{
  "timestamp": "2026-06-29T12:00:00Z",
  "level": "INFO",
  "service": "platform-api",
  "correlationId": "uuid",
  "requestId": "uuid",
  "message": "Organization created"
}
```

---

# 6. Required Log Fields

Every log contains

| Field         | Required |
| ------------- | -------- |
| timestamp     | ✅       |
| level         | ✅       |
| service       | ✅       |
| environment   | ✅       |
| correlationId | ✅       |
| requestId     | ✅       |
| message       | ✅       |

Optional

- organizationId
- userId
- workerId
- queue
- endpoint
- duration
- metadata

---

# 7. Log Levels

Only six levels.

```text
TRACE

DEBUG

INFO

WARN

ERROR

FATAL
```

Definitions

| Level | Usage                   |
| ----- | ----------------------- |
| TRACE | Very detailed debugging |
| DEBUG | Development diagnostics |
| INFO  | Normal operations       |
| WARN  | Recoverable issues      |
| ERROR | Failed operation        |
| FATAL | Service cannot continue |

---

# 8. Logging Rules

Always log

- Startup
- Shutdown
- Login
- Logout
- Permission failures
- Queue failures
- Worker failures
- Database failures
- Integration failures
- Deployment events

Never log

- Passwords
- JWTs
- API Keys
- OAuth Tokens
- Credit Cards
- CVV
- Secrets

---

# 9. Correlation IDs

Every HTTP request receives

```text
X-Correlation-ID
```

Flow

```text
Client

↓

Platform API

↓

BullMQ

↓

Worker

↓

Product API

↓

Audit

↓

Logs
```

One correlation ID.

Entire request lifecycle.

---

# 10. Request IDs

Every HTTP request also receives

```text
X-Request-ID
```

Difference

| ID             | Purpose             |
| -------------- | ------------------- |
| Correlation ID | Whole transaction   |
| Request ID     | Single HTTP request |

---

# 11. Distributed Tracing

Every service creates spans.

Example

```text
HTTP Request

↓

Authentication

↓

Database Query

↓

BullMQ Publish

↓

Worker

↓

Notification

↓

Completed
```

Every span includes

- Duration
- Parent
- Service
- Status

---

# 12. Trace Context

Propagate

```text
Correlation ID

Trace ID

Span ID
```

Across

- HTTP
- BullMQ
- Scheduled Jobs
- Product APIs

---

# 13. Metrics

Platform exports

### HTTP

- Requests/sec
- Errors/sec
- Latency
- Throughput

---

### Database

- Query Time
- Slow Queries
- Connections
- Locks

---

### Redis

- Hit Rate
- Miss Rate
- Memory
- Clients

---

### BullMQ

- Queue Depth
- Consumers
- Publish Rate
- Retry Count
- DLQ Size

---

### Workers

- Running Jobs
- Failed Jobs
- Processing Time
- Throughput

---

# 14. Business Metrics

Examples

- Organizations Created
- New Users
- Orders Imported
- Wallet Credits
- Invoice Revenue
- Active Integrations
- Marketplace Subscriptions

Business metrics are separate from infrastructure metrics.

---

# 15. Exception Tracking

Every unhandled exception captures

- Stack Trace
- Correlation ID
- Request
- User
- Environment
- Release Version

Never expose stack traces to API consumers.

---

# 16. Error Classification

Errors

```text
Validation

Authorization

Business

Infrastructure

External

Unexpected
```

Every exception belongs to one category.

---

# 17. Slow Query Logging

Automatically log

Queries

>

500 ms

Fields

- SQL Hash
- Duration
- Rows
- Database
- Service

Parameterized SQL only.

Never raw values.

---

# 18. API Performance

Track

- P50
- P95
- P99

Latency

For every endpoint.

---

# 19. Worker Performance

Track

- Queue Wait Time
- Processing Time
- Retry Count
- Success Rate

Every worker reports metrics.

---

# 20. Deployment Tracking

Every deployment records

- Version
- Git Commit
- Branch
- Environment
- Build Number
- Deployed By
- Timestamp

Used during incident analysis.

---

# 21. Alerting Rules

Critical

- Platform Down
- Database Down
- BullMQ Down
- Redis Down

Warning

- High Error Rate
- Queue Growth
- Memory Usage
- CPU Usage

Info

- Deployment
- Worker Restart
- Configuration Change

---

# 22. Log Retention

| Log Type         | Retention         |
| ---------------- | ----------------- |
| Application Logs | 90 Days           |
| Worker Logs      | 90 Days           |
| Audit Logs       | 7 Years (AES-017) |
| Security Logs    | 1 Year            |
| Metrics          | 1 Year            |
| Traces           | 30 Days           |

---

# 23. Observability Dashboard

Shows

```text
Platform

↓

API

↓

Workers

↓

Queues

↓

Database

↓

Redis

↓

BullMQ

↓

Integrations

↓

Products
```

Everything visible in one place.

---

# 24. Technology Stack

| Area               | Technology                 |
| ------------------ | -------------------------- |
| Logging            | Pino (NestJS)              |
| Log Format         | JSON                       |
| Metrics            | Prometheus                 |
| Visualization      | Grafana                    |
| Tracing            | OpenTelemetry              |
| Exception Tracking | Sentry                     |
| Health             | Platform Health Aggregator |

---

# 25. OpenTelemetry

Every service implements

- Trace Exporter
- Metrics Exporter
- Context Propagation

Every service participates in distributed tracing.

---

# 26. Privacy Rules

Logs must never contain

- Passwords
- Secrets
- Payment Tokens
- JWT
- Refresh Tokens
- CVV
- Full Card Number
- OAuth Secrets

Sensitive values are masked before logging.

---

# 27. Performance Targets

| Metric             | Target     |
| ------------------ | ---------- |
| Log Write          | < 5 ms     |
| Trace Overhead     | < 2%       |
| Metrics Collection | < 1% CPU   |
| Dashboard Refresh  | 30 sec     |
| Alert Delay        | < 1 minute |

---

# 28. Future Compatibility

Supports

- Multi-region deployments
- Kubernetes
- Distributed tracing across products
- AI services
- Streaming analytics
- Centralized log aggregation

without redesign.

---

# 29. Decision Register

| ID    | Decision                                                       | Status    |
| ----- | -------------------------------------------------------------- | --------- |
| D-261 | All application logs use structured JSON format                | ✅ Locked |
| D-262 | Correlation IDs are propagated across every service and worker | ✅ Locked |
| D-263 | Request IDs uniquely identify individual HTTP requests         | ✅ Locked |
| D-264 | OpenTelemetry is the platform tracing standard                 | ✅ Locked |
| D-265 | Prometheus is the metrics source of truth                      | ✅ Locked |
| D-266 | Grafana is the visualization platform                          | ✅ Locked |
| D-267 | Sentry captures unhandled exceptions                           | ✅ Locked |
| D-268 | Sensitive data is never written to logs                        | ✅ Locked |
| D-269 | Audit events remain separate from application logs             | ✅ Locked |
| D-270 | Every deployment is traceable through observability metadata   | ✅ Locked |

---

# 30. Relationship Between Logs, Audit, Metrics and Traces

One of the most common mistakes in SaaS platforms is mixing these concepts. AutoShipp treats them as separate concerns.

| System  | Purpose                      | Immutable  | Retention | Primary Users                 |
| ------- | ---------------------------- | ---------- | --------- | ----------------------------- |
| Logs    | Technical diagnostics        | No         | 90 days   | Developers & DevOps           |
| Metrics | Performance measurements     | Aggregated | 1 year    | DevOps                        |
| Traces  | Request flow across services | Yes        | 30 days   | Developers                    |
| Audit   | Business & security history  | Yes        | 7 years   | Security, Compliance, Support |

Example:

```text
User creates Organization
        │
        ├── Application Log
        │      "Organization created successfully"
        │
        ├── Metric
        │      organizations_created_total +1
        │
        ├── Distributed Trace
        │      HTTP → DB → BullMQ → Notification
        │
        └── Audit Record
               "Platform Owner created Organization X"
```

Each serves a different purpose and none replaces the others.

---

# 🚨 Major Architecture Improvement Over the Original Design

The original architecture mentioned logging and health checks but did not define a complete observability strategy. This specification establishes observability as a first-class platform capability.

Major improvements include:

- **Clear separation** between application logs, business audit records, metrics, and distributed traces, preventing overlap and inconsistent implementations.
- **End-to-end distributed tracing** using OpenTelemetry, with correlation IDs propagated across HTTP requests, BullMQ events, background workers, and future product services.
- **Structured JSON logging** with mandatory metadata, enabling centralized indexing, searching, and alerting.
- **Production-grade monitoring stack** using Pino, Prometheus, Grafana, OpenTelemetry, and Sentry, aligned with modern cloud-native practices.
- **Strict privacy rules** that prohibit logging secrets, authentication tokens, and sensitive payment information.
- **Deployment-aware observability**, allowing incidents to be correlated with application versions, Git commits, and release history.

This architecture gives AutoShipp enterprise-grade operational visibility and provides the foundation for reliable troubleshooting, performance optimization, security investigations, and long-term platform operations.

---

# AES-025 — Binary Asset Strategy

**Document ID:** AES-025
**Title:** Binary Asset Strategy
**Version:** 2.0.0
**Status:** Approved
**Owner:** AutoShipp Platform

---

# 1. Executive Summary

The AutoShipp platform **does not utilize centralized Object Storage (S3/R2)** for platform-level assets.

All operations are dashboard-driven. Binary assets are not permanently stored by the core platform.

---

# 2. Rationale

1. **Reports:** Generated dynamically on-demand.
2. **CSV/Excel Exports:** Streamed directly to the client or generated on-demand.
3. **Dashboards:** All data is rendered from the PostgreSQL database directly to the Next.js frontend.

Future products (e.g., Returns, which may need to store user-uploaded images of damaged items) may introduce their own isolated object storage. The core platform itself does not bear this cost or complexity.

---

# 3. Decision Register

| ID    | Decision                                         | Status    |
| ----- | ------------------------------------------------ | --------- |
| D-251 | No platform-level Object Storage (S3/R2) is used | ✅ Locked |
| D-252 | Exports and reports are generated dynamically    | ✅ Locked |

---

# AES-026 — Deployment, Infrastructure & DevOps Architecture Specification

**Document ID:** AES-026

**Title:** Deployment, Infrastructure & DevOps Architecture

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-020 — Platform API
- AES-021 — Event-Driven Architecture
- AES-022 — Workers
- AES-023 — Health Monitoring
- AES-024 — Observability
- AES-025 — Storage

---

# 1. Executive Summary

The AutoShipp platform is designed as a **modular distributed monolith** that can gradually evolve into a service-oriented platform without architectural rewrites.

Core principles:

- One Git Monorepo
- One PostgreSQL Database
- Multiple PostgreSQL Schemas
- One Prisma Client per Service
- Independent Deployments
- Shared Infrastructure
- Container-first
- Cloud-native

This architecture minimizes operational complexity while allowing each service to scale independently.

---

# 2. High Level Architecture

```text
                          Internet
                               │
                         Cloudflare
                               │
                     Nginx Reverse Proxy
                               │
      ┌────────────────────────┼────────────────────────┐
      │                        │                        │
   Next.js                 Platform API           Future Product APIs
  (Frontend)                (NestJS)          (Fit, ETA, Returns...)
      │                        │
      └──────────────┬─────────┘
                     │
             BullMQ Event Bus
                     │
      ┌──────────────┼──────────────┐
      │              │              │
 Notification   Billing       Integration
    Worker        Worker         Worker
      │              │              │
      └──────────────┼──────────────┘
                     │
          Neon PostgreSQL (Multi-Schema)
                     │
                  Redis Cache
                     │
              S3 Compatible Storage
```

---

# 3. Architecture Principles

## Principle 1

Every service is independently deployable.

---

## Principle 2

Every service owns its runtime.

---

## Principle 3

Shared platform infrastructure is centralized.

---

## Principle 4

Deployments never require database downtime.

---

## Principle 5

Infrastructure must scale horizontally.

---

## Principle 6

Everything is reproducible using Infrastructure as Code.

---

# 4. Monorepo Structure

```text
autoshipp/

├── apps/
│
│   ├── web/
│   ├── platform-api/
│   │
│   ├── worker-notification/
│   ├── worker-billing/
│   ├── worker-wallet/
│   ├── worker-audit/
│   ├── worker-sync/
│   ├── worker-import/
│   ├── worker-export/
│   ├── worker-cleanup/
│   └── worker-scheduler/
│
├── packages/
│
│   ├── prisma-platform/
│   ├── shared-types/
│   ├── shared-config/
│   ├── shared-auth/
│   ├── shared-events/
│   ├── shared-logger/
│   ├── shared-validation/
│   ├── shared-cache/
│   ├── shared-storage/
│   └── shared-sdk/
│
├── infrastructure/
│
│   ├── docker/
│   ├── nginx/
│   ├── scripts/
│   └── environments/
│
└── docs/
```

Every application is isolated.

Every shared package has one responsibility.

---

# 5. Deployment Units

Each application becomes its own container.

Examples

```text
autoshipp-web

autoshipp-platform-api

autoshipp-worker-notification

autoshipp-worker-billing

autoshipp-worker-wallet

autoshipp-worker-sync

autoshipp-worker-export

autoshipp-worker-import
```

Containers can be restarted independently.

---

# 6. Environment Strategy

Supported environments

```text
LOCAL

DEVELOPMENT

STAGING

PRODUCTION
```

Each environment has

- Environment Variables
- Database
- Redis
- BullMQ
- Storage Bucket
- Secrets

No shared production resources with lower environments.

---

# 7. Environment Variables

Configuration must never be hardcoded.

Examples

```text
DATABASE_URL

REDIS_URL

RABBITMQ_URL

JWT_SECRET

STORAGE_ENDPOINT

SMTP_HOST

RAZORPAY_KEY

SHOPIFY_CLIENT_ID
```

Loaded at startup only.

---

# 8. Secrets Management

Secrets include

- JWT Secrets
- API Keys
- OAuth Credentials
- Database Passwords
- SMTP Credentials
- Encryption Keys

Rules

- Never committed to Git
- Never logged
- Rotatable
- Environment-specific

Future production deployments should use a dedicated secret manager.

---

# 9. Containerization

Every application has

```text
Dockerfile
```

All services are built consistently.

Principles

- Small images
- Multi-stage builds
- Non-root users
- Health checks
- Immutable containers

---

# 10. Docker Compose (Development)

Local development includes

```text
Next.js

Platform API

BullMQ

Redis

MinIO

PostgreSQL (optional)

Mailpit

Workers
```

Developers start everything with one command.

---

# 11. Production Deployment

Each deployment consists of

```text
Cloudflare

↓

Nginx

↓

Containers

↓

BullMQ

↓

Redis

↓

Neon PostgreSQL

↓

Object Storage
```

Stateless services can be replaced without affecting data.

---

# 12. CI/CD Pipeline

Pipeline

```text
Git Push

↓

GitHub Actions

↓

Lint

↓

Type Check

↓

Unit Tests

↓

Build

↓

Container Image

↓

Security Scan

↓

Deploy

↓

Health Check

↓

Complete
```

Deployment stops immediately if any stage fails.

---

# 13. Branch Strategy

```text
main

development

feature/*
```

Rules

- Production deploys from `main`
- Development deploys from `development`
- Pull Requests required for merge

---

# 14. Database Migrations

Migration ownership

| Schema                 | Owner           |
| ---------------------- | --------------- |
| Platform Schemas       | Platform API    |
| Future Product Schemas | Product Service |

Rules

- Version controlled
- Reviewed
- Tested
- Rollback supported

---

# 15. Zero Downtime Deployments

Deployment order

```text
Deploy New Version

↓

Health Check

↓

Traffic Switch

↓

Old Version Removed
```

Database changes must be backward compatible.

---

# 16. Health Checks

Every container implements

```http
GET /health
```

Readiness

```http
GET /health/ready
```

Liveness

```http
GET /health/live
```

These endpoints integrate with the Platform Health Aggregator.

---

# 17. Rollback Strategy

Rollback triggers

- Failed health checks
- High error rate
- Critical incidents

Rollback process

```text
Previous Image

↓

Redeploy

↓

Health Check

↓

Restore Traffic
```

---

# 18. Scaling Strategy

Independent scaling

Example

```text
Platform API

4 replicas

Notification Worker

10 replicas

Billing Worker

2 replicas

Sync Worker

20 replicas
```

Only the bottleneck service is scaled.

---

# 19. Infrastructure Components

| Component    | Purpose                   |
| ------------ | ------------------------- |
| Cloudflare   | DNS, CDN, DDoS Protection |
| Nginx        | Reverse Proxy             |
| Next.js      | Frontend                  |
| Platform API | Core Platform             |
| BullMQ       | Event Bus                 |
| Redis        | Cache                     |
| PostgreSQL   | Database                  |
| MinIO / S3   | Object Storage            |

---

# 20. Infrastructure as Code

Infrastructure definitions belong in

```text
infrastructure/
```

Examples

- Docker Compose
- Nginx Configuration
- Deployment Scripts
- Environment Templates

Future additions may include Kubernetes manifests or Terraform without changing the application architecture.

---

# 21. Release Strategy

Release process

```text
Development

↓

Staging

↓

Production
```

Every deployment includes

- Version
- Build Number
- Git Commit
- Release Notes

---

# 22. Disaster Recovery

Deployment infrastructure supports

- Automated rebuild
- Container recreation
- Environment recreation
- Database restoration (AES-032)
- Object storage restoration

Infrastructure remains stateless.

---

# 23. Performance Targets

| Metric          | Target   |
| --------------- | -------- |
| API Startup     | < 30 sec |
| Worker Startup  | < 20 sec |
| Deployment Time | < 10 min |
| Rollback Time   | < 5 min  |
| Build Time      | < 15 min |

---

# 24. Technology Stack

| Area            | Technology      |
| --------------- | --------------- |
| Monorepo        | Turborepo       |
| Package Manager | pnpm            |
| Containers      | Docker          |
| Reverse Proxy   | Nginx           |
| CI/CD           | GitHub Actions  |
| Database        | Neon PostgreSQL |
| Cache           | Redis           |
| Queue           | BullMQ          |
| Storage         | S3-Compatible   |
| Runtime         | Node.js LTS     |

---

# 25. Future Compatibility

This architecture is intentionally designed to evolve without major restructuring.

Supports

- Kubernetes
- Multiple Product APIs
- Multi-region deployment
- Blue/Green deployment
- Canary releases
- Auto-scaling
- Additional workers
- Additional infrastructure services

without changing the platform architecture.

---

# 26. Deployment Lifecycle

```text
Developer

↓

Git Push

↓

GitHub Actions

↓

Quality Gates

↓

Docker Build

↓

Image Registry

↓

Deployment

↓

Health Verification

↓

Traffic Enabled

↓

Monitoring
```

Every deployment is observable and reversible.

---

# 27. Decision Register

| ID    | Decision                                                                         | Status    |
| ----- | -------------------------------------------------------------------------------- | --------- |
| D-281 | AutoShipp uses a single Git monorepo                                             | ✅ Locked |
| D-282 | Every application is independently deployable                                    | ✅ Locked |
| D-283 | One PostgreSQL database with multiple schemas remains the database strategy      | ✅ Locked |
| D-284 | One Prisma Client per service enforces schema ownership                          | ✅ Locked |
| D-285 | Docker is the standard deployment unit                                           | ✅ Locked |
| D-286 | GitHub Actions is the CI/CD platform                                             | ✅ Locked |
| D-287 | Deployments follow zero-downtime principles                                      | ✅ Locked |
| D-288 | Infrastructure configuration is version controlled                               | ✅ Locked |
| D-289 | Every service exposes readiness and liveness endpoints                           | ✅ Locked |
| D-290 | Infrastructure is designed to evolve to Kubernetes without architectural changes | ✅ Locked |

---

# 28. Relationship to the Overall Platform

This document defines **how AutoShipp is built, deployed, and operated**, not how business logic works.

It establishes:

- A single deployment philosophy for every current and future platform component.
- Independent deployment of the Platform API and all background workers.
- A clear path to future product services (Fit, ETA, Returns, AI, etc.) without changing the core infrastructure.
- A production-ready DevOps model based on immutable containers, CI/CD, centralized observability, and shared infrastructure services.

Together with AES-020 through AES-025, this completes the operational architecture needed to run AutoShipp as a scalable SaaS platform.

---

# AES-027 — Redis, Caching & Distributed Locking Architecture Specification

**Document ID:** AES-027

**Title:** Redis, Caching & Distributed Locking Architecture

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-020 — Platform API Architecture
- AES-021 — Event-Driven Architecture
- AES-022 — Background Workers
- AES-023 — Platform Health
- AES-026 — Deployment Architecture

---

# 1. Executive Summary

Redis is the **high-speed in-memory data layer** of AutoShipp.

Redis is **never a source of truth**.

The source of truth is always:

- PostgreSQL
- BullMQ
- Object Storage

Redis exists only to improve performance and coordinate distributed processes.

---

# 2. Responsibilities

Redis is responsible for:

- Caching
- Rate Limiting
- Distributed Locks
- Session Storage (future)
- Temporary Data
- Idempotency Keys
- Feature Flag Cache
- Configuration Cache

Redis is **not** responsible for:

- Business Data
- Orders
- Customers
- Billing
- Audit
- Permanent Storage

---

# 3. Architecture

```text
                    Next.js
                       │
                 Platform API
                       │
        ┌──────────────┼──────────────┐
        │              │              │
 PostgreSQL        Redis         BullMQ
(Source of Truth) (Fast Cache) (Async Queue)
```

Redis always sits between the Platform API and expensive operations.

---

# 4. Design Principles

## Principle 1

Redis is disposable.

Losing Redis must never lose business data.

---

## Principle 2

Everything in Redis can be rebuilt.

---

## Principle 3

Every cache entry has a TTL unless explicitly permanent.

---

## Principle 4

Never cache sensitive secrets.

---

## Principle 5

Cache invalidation happens immediately after successful database updates.

---

# 5. Cache Categories

## Configuration Cache

Stores

- Feature Flags
- Runtime Configuration
- Product Catalog
- Platform Settings

TTL

```text
10 Minutes
```

---

## Organization Cache

Stores

- Organization
- Module Assignments
- Subscription Summary

TTL

```text
5 Minutes
```

---

## User Cache

Stores

- User Profile
- Permissions
- Roles
- Account Context

TTL

```text
15 Minutes
```

Immediately invalidated after role or permission changes.

---

## Marketplace Cache

Stores

- Products
- Editions
- Pricing
- Public Marketplace

TTL

```text
30 Minutes
```

---

## Integration Cache

Stores

- OAuth Tokens (encrypted if persisted)
- Connection Status
- Provider Metadata

TTL depends on provider token expiry.

---

## Health Cache

Stores

Platform Health Aggregator results.

TTL

```text
30 Seconds
```

---

# 6. Cache Key Convention

Format

```text
autoshipp:<domain>:<entity>:<identifier>
```

Examples

```text
autoshipp:user:profile:123

autoshipp:organization:modules:456

autoshipp:marketplace:products

autoshipp:feature-flags

autoshipp:health
```

Consistent naming simplifies invalidation.

---

# 7. Cache Lifecycle

```text
Client Request

↓

Redis Lookup

↓

Cache Hit?

↓

YES

↓

Return Cached Data

↓

NO

↓

Read PostgreSQL

↓

Store in Redis

↓

Return Response
```

This follows the **Cache-Aside Pattern**.

---

# 8. Cache Invalidation

Whenever PostgreSQL changes

↓

Commit

↓

Invalidate Redis

↓

Future requests reload cache

Example

```text
Update Organization

↓

Commit

↓

Delete

autoshipp:organization:123
```

Never update cache before database commit.

---

# 9. Cache TTL Policy

| Cache Type     | TTL            |
| -------------- | -------------- |
| Feature Flags  | 10 min         |
| Runtime Config | 10 min         |
| User Profile   | 15 min         |
| Organization   | 5 min          |
| Marketplace    | 30 min         |
| Health         | 30 sec         |
| Rate Limits    | Sliding Window |
| Locks          | Short-lived    |

---

# 10. Distributed Locks

Used when only one worker may process a task.

Examples

- Invoice Generation
- Wallet Settlement
- Subscription Renewal
- Data Import
- Scheduled Jobs

Flow

```text
Worker

↓

Acquire Lock

↓

Success?

↓

YES

↓

Process

↓

Release Lock
```

Failure

↓

Retry Later

---

# 11. Lock Naming

Format

```text
lock:<resource>:<id>
```

Examples

```text
lock:wallet:123

lock:invoice:987

lock:organization:456

lock:sync:shopify
```

Locks always expire automatically.

---

# 12. Idempotency Keys

Redis stores processed request keys.

Example

```text
Idempotency-Key

↓

Redis

↓

Exists?

↓

YES

↓

Return Previous Response
```

Used for

- Payments
- Wallet Credits
- Subscription Purchases
- Imports

---

# 13. Rate Limiting

Redis tracks request counters.

Public APIs

```text
100 Requests / Minute / IP
```

Authenticated APIs

```text
1000 Requests / Minute / User
```

Administrative APIs have stricter limits.

---

# 14. Feature Flag Cache

Feature flags are evaluated frequently.

Instead of querying PostgreSQL

↓

Redis Cache

↓

Fast Evaluation

Invalidated when a flag changes.

---

# 15. Runtime Configuration Cache

Examples

```text
Maximum Upload Size

Export Limits

Trial Days

Marketplace Visibility
```

Cached because values rarely change.

---

# 16. Session Storage (Future)

Current authentication uses

- JWT
- HttpOnly Cookies

If server-side sessions are introduced later

↓

Redis becomes the session store.

No architectural changes required.

---

# 17. Worker Coordination

Workers use Redis for

- Locks
- Progress
- Temporary State

Workers never store business data in Redis.

---

# 18. Failure Strategy

If Redis becomes unavailable

↓

Platform continues

↓

Reads PostgreSQL

↓

Performance decreases

↓

No data loss

Redis failures never corrupt business data.

---

# 19. Monitoring

Track

- Memory Usage
- Hit Rate
- Miss Rate
- Evictions
- Expired Keys
- Connected Clients
- Operations/sec
- Latency

Displayed in Platform Health.

---

# 20. Security

Redis

- Internal network only
- Authentication enabled
- TLS enabled in production
- No public access
- No sensitive secrets stored
- Periodic credential rotation

---

# 21. Backup Strategy

Redis is **not backed up**.

Reason

Redis stores only rebuildable data.

After restart

↓

Caches warm automatically.

---

# 22. Performance Targets

| Metric              | Target   |
| ------------------- | -------- |
| Cache Hit           | < 2 ms   |
| Lock Acquisition    | < 10 ms  |
| Cache Miss Recovery | < 100 ms |
| Feature Flag Lookup | < 5 ms   |
| Health Cache Lookup | < 2 ms   |

---

# 23. Technology Stack

| Component     | Technology      |
| ------------- | --------------- |
| Cache         | Redis           |
| Locking       | Redis SET NX EX |
| Rate Limiting | Redis           |
| Idempotency   | Redis           |
| Session Store | Future          |
| Monitoring    | Prometheus      |

---

# 24. Future Compatibility

Supports

- Redis Cluster
- Redis Sentinel
- Multi-region cache
- Distributed sessions
- Shared product cache
- High Availability

without changing application code.

---

# 25. Decision Register

| ID    | Decision                                                              | Status    |
| ----- | --------------------------------------------------------------------- | --------- |
| D-291 | Redis is never a source of truth                                      | ✅ Locked |
| D-292 | Cache uses the Cache-Aside pattern                                    | ✅ Locked |
| D-293 | Cache invalidation occurs only after successful database commits      | ✅ Locked |
| D-294 | Every cache key follows a standardized naming convention              | ✅ Locked |
| D-295 | Distributed locks use Redis with automatic expiration                 | ✅ Locked |
| D-296 | Redis stores idempotency keys for retry-safe operations               | ✅ Locked |
| D-297 | Rate limiting is implemented using Redis                              | ✅ Locked |
| D-298 | Redis is not backed up because it stores only rebuildable data        | ✅ Locked |
| D-299 | Redis failures degrade performance but never cause data loss          | ✅ Locked |
| D-300 | Redis is isolated on the internal network with authentication and TLS | ✅ Locked |

---

# 26. Relationship with the Platform

Redis is a shared infrastructure service used across the AutoShipp platform.

| Platform Component      | Redis Usage                         |
| ----------------------- | ----------------------------------- |
| Platform API            | Cache, rate limiting, idempotency   |
| Background Workers      | Distributed locks, temporary state  |
| Health Aggregator       | Cached health results               |
| Feature Flag Engine     | Cached flag evaluation              |
| Runtime Configuration   | Cached configuration values         |
| Marketplace             | Cached product catalog              |
| Future Product Services | Local caching and coordination only |

Redis never replaces PostgreSQL or BullMQ. It accelerates platform operations while preserving the architectural principle that **persistent business data always belongs to the platform database**.

---

# 🚨 Major Architecture Improvement Over the Original Design

The original architecture identified Redis as a supporting component but did not define its responsibilities or operational boundaries. This specification formalizes Redis as a **shared performance and coordination layer** rather than a data store.

Major improvements include:

- **Strict separation between cache and persistence**, ensuring PostgreSQL remains the single source of truth.
- **Standardized cache strategy** using the Cache-Aside pattern with well-defined TTLs and invalidation rules.
- **Platform-wide distributed locking**, enabling safe execution of scheduled jobs, imports, billing operations, and other singleton tasks.
- **Centralized support for rate limiting and idempotency**, improving API reliability and protecting against duplicate requests.
- **Resilient failure behavior**, where Redis outages reduce performance but never compromise business data or platform integrity.
- **Future-ready scalability**, allowing migration to Redis Cluster or Sentinel without changing application architecture.

This document completes the core shared infrastructure layer of AutoShipp by defining how fast, temporary, and coordination-focused data is managed consistently across the platform.

---

# AES-028 — Platform Security Architecture & Compliance Specification

**Document ID:** AES-028

**Title:** Platform Security Architecture & Compliance Specification

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-009 — Identity & Authentication
- AES-020 — Platform API
- AES-021 — Event-Driven Architecture
- AES-022 — Background Workers
- AES-024 — Observability
- AES-026 — Deployment
- AES-027 — Redis & Caching

---

# 1. Executive Summary

Security is not a single feature within AutoShipp—it is a platform-wide architecture principle.

This document defines the security model for:

- Authentication
- Authorization
- API Security
- Infrastructure
- Database
- Secrets
- Encryption
- File Storage
- Workers
- Monitoring
- Compliance
- Secure Development

The objective is to satisfy **OWASP ASVS**, **OWASP Top 10**, and SaaS security best practices while supporting a multi-tenant B2B platform.

---

# 2. Security Principles

## Principle 1

Security by Design.

Every new feature must be secure before it is functional.

---

## Principle 2

Least Privilege.

Every user, worker and service only receives the permissions it requires.

---

## Principle 3

Defense in Depth.

Security exists at multiple independent layers.

---

## Principle 4

Zero Trust.

Never trust

- User
- Browser
- API
- Worker
- Internal Network

Everything is verified.

---

## Principle 5

Fail Securely.

If validation fails

↓

Reject

Never continue.

---

# 3. Security Layers

```text
Internet

↓

Cloudflare

↓

Nginx

↓

Next.js

↓

Platform API

↓

Authentication

↓

Authorization

↓

Validation

↓

Business Logic

↓

Database

↓

Audit
```

Every request passes through multiple security layers.

---

# 4. Authentication

Authentication method

- JWT
- HttpOnly Cookie
- Secure Cookie
- SameSite=Lax (or Strict where possible)

Password hashing

```text
Argon2id
```

**Amendment (v1.1 — AES Architecture Review):**

Argon2id replaces bcryptjs as the password hashing algorithm.

Reasons:

- Argon2id is the OWASP-recommended algorithm since 2019
- Argon2id won the Password Hashing Competition
- bcrypt has a 72-byte password truncation vulnerability (silently ignores characters beyond byte 72)
- Argon2id is memory-hard by design, making GPU brute-force attacks significantly more expensive
- AutoShipp is a greenfield platform — no migration cost exists

Implementation:

```typescript
import * as argon2 from "argon2";

// Hash on registration/password change
const hash = await argon2.hash(password, {
  type: argon2.argon2id,
  memoryCost: 65536, // 64MB
  timeCost: 3,
  parallelism: 4,
});

// Verify on login
const valid = await argon2.verify(hash, plaintext);
```

Decision: Use **Argon2id** exclusively. bcryptjs is not used.

---

# 5. Authorization

Pipeline

```text
JwtAuthGuard

↓

UserTypeGuard

↓

PermissionGuard
```

Exactly as defined in AES-009.

Authorization exists at

- Route
- Service
- Database Query

levels.

---

# 6. Multi-Tenant Isolation

Every request validates

- organization_id
- user_type
- permissions

Brand users

↓

Never access another organization.

Platform users

↓

Scoped by permission.

Aggregators

↓

Only access brands they own.

Cross-tenant access is impossible through application logic.

---

# 7. Password Security

Requirements

Minimum

```text
12 characters
```

Must contain

- Uppercase
- Lowercase
- Number
- Symbol

Passwords

- Never logged
- Never decrypted
- Never stored in plaintext

Password reset generates a new hash.

---

# 8. Session Security

Current

JWT

↓

HttpOnly Cookie

Future

Optional Refresh Token rotation.

Logout

↓

Increment

```text
token_version
```

Old JWT becomes invalid.

---

# 9. Cookie Security

Cookies use

```text
HttpOnly

Secure

SameSite=Lax

Path=/

Domain=autoshipp.in
```

JavaScript cannot access authentication cookies.

---

# 10. HTTPS

Production

↓

HTTPS only

HTTP automatically redirects.

TLS termination occurs at Cloudflare or Nginx.

---

# 11. CSRF Protection

Applicable

✅ Yes

Implementation

- SameSite Cookies
- CSRF Token for state-changing requests
- Origin validation
- Referer validation (where appropriate)

---

# 12. XSS Protection

Applicable

✅ Yes

Implementation

- React automatic escaping
- CSP
- Output encoding
- HTML sanitization
- No unsafe HTML rendering

---

# 13. SQL Injection

Applicable

✅ Yes

Implementation

- Prisma ORM
- Parameterized Queries
- Input Validation
- DTO Validation

Raw SQL

↓

Only when absolutely necessary.

Never concatenate user input.

---

# 14. Command Injection

Applicable

✅ Yes

Implementation

- Never execute shell commands from user input.
- Strict allowlists for system utilities.
- Escape and validate all arguments passed to subprocesses.

---

# 15. SSRF (Server-Side Request Forgery)

Applicable

✅ Yes

Implementation

- Allowlist outbound destinations for integrations.
- Block access to internal/private IP ranges.
- Validate callback URLs.
- Timeouts and request size limits.

---

# 16. Path Traversal

Applicable

✅ Yes

Implementation

- Object Storage abstraction.
- System-generated object keys.
- No direct filesystem paths from users.

---

# 17. File Upload Security

Applicable

✅ Yes

Implementation

- MIME validation
- Extension validation
- Virus Scan
- Size limits
- Signed URLs
- Metadata validation

Defined in AES-025.

---

# 18. API Security

Every endpoint

↓

Authentication

↓

Authorization

↓

Validation

↓

Rate Limiting

↓

Audit

↓

Response

Public APIs have stricter rate limits.

---

# 19. Input Validation

Every request validates

- UUID
- Length
- Enum
- Format
- Required fields
- Nested objects

Validation occurs before business logic.

---

# 20. Output Validation

Responses never expose

- Stack traces
- Secrets
- Password hashes
- Internal IDs not intended for clients
- Database errors

Errors are standardized.

---

# 21. Security Headers

Enabled

```text
Content-Security-Policy

X-Frame-Options

X-Content-Type-Options

Referrer-Policy

Permissions-Policy

Strict-Transport-Security
```

Configured centrally.

---

# 22. Content Security Policy (CSP)

Strict CSP

Default

```text
default-src 'self'
```

Only approved domains

- Cloudflare
- Analytics (if enabled)
- CDN
- Trusted APIs

Inline scripts are avoided wherever possible.

---

# 23. Rate Limiting

Public APIs

```text
100/min/IP
```

Authenticated

```text
1000/min/User
```

Login endpoint

↓

Aggressive protection

Example

```text
5 attempts

↓

Temporary Lock
```

---

# 24. Brute Force Protection

Applicable

✅ Yes

Implementation

- Login attempt counter
- Temporary account lock
- IP rate limiting
- Audit event
- Alert on repeated failures

---

# 25. Secrets Management

Secrets include

- JWT Secret
- API Keys
- OAuth Credentials
- SMTP Passwords
- Encryption Keys

Rules

- Never committed
- Never logged
- Environment-specific
- Rotatable

Future production

↓

Dedicated Secret Manager.

---

# 26. Encryption

In Transit

↓

TLS

At Rest

↓

Database encryption (provider-managed)

↓

Object Storage encryption

Sensitive application fields requiring additional protection may use application-level encryption (AES-256-GCM) before persistence.

---

# 27. Audit Security

Every sensitive action logs

- User
- Organization
- IP
- Correlation ID
- Timestamp
- Action

Audit logs are immutable.

---

# 28. Logging Security

Never log

- Passwords
- Tokens
- OAuth secrets
- API Keys
- Payment secrets
- CVV

Sensitive values masked automatically.

---

# 29. Worker Security

Workers

- Authenticate using service credentials.
- Use least privilege.
- Validate every consumed message.
- Never expose public endpoints.
- Emit audit events where applicable.

---

# 30. Database Security

Platform Rules

- One PostgreSQL database
- Multiple schemas
- One Prisma Client per service
- Schema ownership enforced

Database users

- Platform API user
- Worker user (limited)
- Future product users

No shared superuser credentials for applications.

---

# 31. Infrastructure Security

Protected by

- Cloudflare
- Firewall
- TLS
- Private Redis
- Private BullMQ
- Private PostgreSQL
- Private Object Storage

Internal services are not publicly accessible.

---

# 32. Dependency Security

Every build executes

- Dependency Audit
- Vulnerability Scan
- License Check

Critical vulnerabilities block deployment.

---

# 33. Backup Security

Backups

- Encrypted
- Access controlled
- Versioned
- Tested

Only authorized personnel may restore backups.

---

# 34. Incident Response

Every incident records

- Detection
- Severity
- Timeline
- Root Cause
- Resolution
- Postmortem

Integrated with Audit and Observability.

---

# 35. Security Monitoring

Monitor

- Failed Logins
- Permission Denials
- Rate Limit Violations
- Token Revocations
- Suspicious API Usage
- Worker Authentication Failures

Displayed in Platform Dashboard.

---

# 36. Applicable Security Controls

The following controls are **fully applicable** to AutoShipp and will be implemented.

| Control                      | Status | Implementation                     |
| ---------------------------- | ------ | ---------------------------------- |
| Authentication               | ✅     | JWT + HttpOnly Cookies             |
| Authorization                | ✅     | RBAC + Permission Guards           |
| Multi-Tenant Isolation       | ✅     | Organization scoping               |
| Password Hashing             | ✅     | bcryptjs                           |
| HTTPS                        | ✅     | TLS everywhere                     |
| CSRF Protection              | ✅     | CSRF token + SameSite              |
| XSS Protection               | ✅     | React escaping + CSP               |
| SQL Injection Prevention     | ✅     | Prisma + validation                |
| SSRF Protection              | ✅     | Allowlist outbound requests        |
| Command Injection Prevention | ✅     | No user-controlled shell execution |
| Path Traversal Prevention    | ✅     | Object Storage abstraction         |
| File Upload Security         | ✅     | Validation + AV scan               |
| Rate Limiting                | ✅     | Redis                              |
| Brute Force Protection       | ✅     | Login throttling                   |
| Secure Headers               | ✅     | Helmet + CSP                       |
| Audit Logging                | ✅     | AES-017                            |
| Secret Management            | ✅     | Environment secrets                |
| Encryption at Rest           | ✅     | Database + Object Storage          |
| Encryption in Transit        | ✅     | TLS                                |
| Distributed Tracing          | ✅     | OpenTelemetry                      |
| Security Monitoring          | ✅     | Platform Health + Observability    |
| Dependency Scanning          | ✅     | CI/CD                              |
| Backup Security              | ✅     | Encrypted backups                  |

---

# 37. Controls Not Currently Applicable

| Control                                               | Status | Reason                                                               |
| ----------------------------------------------------- | ------ | -------------------------------------------------------------------- |
| Hardware Security Module (HSM)                        | ❌     | No dedicated cryptographic hardware requirement at current scale     |
| Smart Card Authentication                             | ❌     | Platform uses web authentication only                                |
| Client-side Certificates (mTLS for browsers)          | ❌     | Not practical for SaaS users                                         |
| Air-Gapped Deployment                                 | ❌     | Cloud-hosted SaaS platform                                           |
| On-Prem Active Directory Integration                  | ❌     | Not part of current product scope                                    |
| Classified Government Compliance (e.g., FedRAMP High) | ❌     | Not a target market currently                                        |
| Biometric Authentication                              | ❌     | Delegated to customer devices/identity providers if introduced later |

These can be introduced later without redesigning the core security architecture.

---

# 38. OWASP Top 10 Mapping

| OWASP Risk                | AutoShipp Mitigation                                      |
| ------------------------- | --------------------------------------------------------- |
| Broken Access Control     | RBAC, tenant isolation, permission guards                 |
| Cryptographic Failures    | TLS, bcrypt, encrypted storage, optional field encryption |
| Injection                 | Prisma, DTO validation, parameterized queries             |
| Insecure Design           | Security-by-design architecture                           |
| Security Misconfiguration | Hardened defaults, secure headers, IaC                    |
| Vulnerable Components     | CI dependency scanning                                    |
| Authentication Failures   | JWT, account lockout, token versioning                    |
| Software & Data Integrity | Signed CI/CD pipeline, reviewed deployments               |
| Security Logging Failures | Centralized audit + observability                         |
| SSRF                      | Outbound allowlists and network restrictions              |

---

# 39. Decision Register

| ID    | Decision                                                          | Status    |
| ----- | ----------------------------------------------------------------- | --------- |
| D-301 | Security is enforced at every platform layer                      | ✅ Locked |
| D-302 | JWT with HttpOnly cookies remains the authentication standard     | ✅ Locked |
| D-303 | Authorization uses JwtAuthGuard → UserTypeGuard → PermissionGuard | ✅ Locked |
| D-304 | Multi-tenant isolation is mandatory for every request             | ✅ Locked |
| D-305 | Platform uses bcryptjs for password hashing                       | ✅ Locked |
| D-306 | Every API validates input before business logic                   | ✅ Locked |
| D-307 | Redis provides rate limiting and brute-force protection           | ✅ Locked |
| D-308 | Sensitive information is never logged                             | ✅ Locked |
| D-309 | Secrets are environment-managed and rotatable                     | ✅ Locked |
| D-310 | AutoShipp aligns with OWASP security best practices               | ✅ Locked |

---

# 🚨 Major Architecture Improvement Over the Original Design

Your original architecture focused primarily on authentication and RBAC. This specification expands security into a **platform-wide architecture** covering application, infrastructure, operations, and compliance.

Major improvements include:

- **Defense-in-depth** with layered controls from Cloudflare through application, database, and audit.
- **Complete mapping to OWASP Top 10**, ensuring common web application risks are explicitly addressed.
- **Explicit distinction between applicable and non-applicable security controls**, documenting implementation decisions and rationale.
- **Comprehensive operational security**, including secrets management, dependency scanning, incident response, secure CI/CD, worker security, and monitoring.
- **Multi-tenant security guarantees**, ensuring Platform users, Aggregators, and Brands remain isolated according to the tenancy model.
- **Future-ready architecture**, allowing stronger cryptography, secret managers, and enterprise identity integrations to be introduced without redesigning the platform.

This document serves as the authoritative security baseline for the entire AutoShipp platform and should be used as the primary reference during implementation, security reviews, penetration testing, and compliance assessments.

---

# AES-029 — Multi-Tenant Architecture & Organization Isolation Specification

**Document ID:** AES-029

**Title:** Multi-Tenant Architecture & Organization Isolation

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-009 — Identity & Authentication
- AES-010 — Organization Domain
- AES-011 — Commerce
- AES-012 — Marketplace
- AES-013 — Billing
- AES-020 — Platform API
- AES-028 — Security

---

# 1. Executive Summary

The AutoShipp Platform is a **hierarchical multi-tenant SaaS platform**.

Unlike traditional SaaS products that have only one tenant level (Company → Users), AutoShipp supports **three business layers**:

- AutoShipp Platform
- Shipping Aggregators
- Brands

Every request, API, permission, invoice, subscription, and product assignment is resolved within this hierarchy.

This document defines the authoritative tenant isolation model for the entire platform.

---

# 2. Business Hierarchy

```text
                    AutoShipp
                  (Platform Owner)
                         │
        ┌────────────────┴────────────────┐
        │                                 │
 Direct Brands                Shipping Aggregators
        │                                 │
        │                  ┌──────────────┴──────────────┐
        │                  │                             │
        │             Brand A                      Brand B
        │                  │                             │
        │             Brand Users                 Brand Users
        │
 Direct Brand Users
```

There is only **one AutoShipp Platform**.

Everything belongs to it.

---

# 3. Organization Types

The Organization schema supports exactly three organization types.

| Type       | Description      |
| ---------- | ---------------- |
| PLATFORM   | AutoShipp        |
| AGGREGATOR | Shipping Partner |
| BRAND      | Merchant         |

No additional organization types are currently supported.

---

# 4. Organization Hierarchy

Every organization has

```text
organization_id

parent_organization_id
```

Example

```text
AutoShipp
      │
      ├──────── Brand A

      ├──────── Brand B

      └──────── Shiprocket
                  │
                  ├──────── Nike

                  ├──────── Puma

                  └──────── Adidas
```

Parent-child relationships define visibility and billing.

---

# 5. Tenant Resolution

Every authenticated request resolves

```text
JWT

↓

Organization

↓

Permissions

↓

Account Context

↓

Tenant Scope
```

Tenant resolution occurs before controller execution.

---

# 6. User Types

Exactly three user types exist.

| User Type  | Organization        |
| ---------- | ------------------- |
| PLATFORM   | AutoShipp           |
| AGGREGATOR | Shipping Aggregator |
| BRAND      | Brand               |

Every user belongs to one organization.

Users cannot belong to multiple organizations simultaneously.

---

# 7. Visibility Matrix

| Can View   | Platform | Aggregator | Brand           |
| ---------- | -------- | ---------- | --------------- |
| Platform   | ✅       | ✅         | ✅              |
| Aggregator | ❌       | ✅ (Own)   | ✅ (Own Brands) |
| Brand      | ❌       | ❌         | ✅ (Own Only)   |

Platform always has full visibility.

---

# 8. Organization Ownership

Platform owns

- Aggregators
- Direct Brands

Aggregators own

- Their Brands

Brands own

- Their Users
- Their Data
- Their Configuration

Ownership determines administration rights.

---

# 9. Marketplace Assignment

Products are assigned to **Organizations**.

Not Users.

Example

```text
Nike

↓

Fit

↓

Enabled

ETA

↓

Enabled

Returns

↓

Disabled
```

Users inherit product access from their organization.

---

# 10. Billing Hierarchy

## Direct Brand

```text
Brand

↓

Invoice

↓

Brand Pays
```

---

## Aggregator

```text
Aggregator

↓

Invoice

↓

Contains

Brand A

Brand B

Brand C
```

Exactly as decided during architecture planning.

Each invoice contains a per-brand breakdown.

Only one invoice is issued to the Aggregator.

---

# 11. Product Access

Every product

↓

Marketplace Assignment

↓

Organization

↓

Enabled

Disabled products remain visible in the UI but locked.

This matches your marketplace design.

---

# 12. Account Context

Generated after login.

Contains

```json
{
  "organizationId": "...",
  "organizationType": "BRAND",
  "parentOrganizationId": "...",
  "userType": "BRAND",
  "role": "...",
  "permissions": [],
  "modules": [],
  "subscriptions": []
}
```

Stored in memory.

Never trusted without JWT validation.

---

# 13. Data Isolation

Every platform table that stores tenant-owned data contains

```text
organization_id
```

Every query automatically scopes by organization unless the requester is of `user_type = PLATFORM` with appropriate Platform role, utilizing the Super Admin bypass defined in AES-044.

Examples

```sql
SELECT *

FROM customers

WHERE organization_id = :organizationId
```

No controller may bypass tenant filtering.

---

# 13a. Row-Level Security (RLS) — High-Risk Tables (Amendment — v1.1)

Application-layer enforcement is the primary tenant isolation mechanism.

However, for the four highest-risk schemas, **PostgreSQL Row-Level Security (RLS)** provides a database-level backstop.

This means that even if application code contains a bug (a missing `.where({ organizationId })` filter, an incorrect raw SQL query), PostgreSQL will enforce tenant isolation at the database level. Zero rows will leak to the wrong tenant.

---

## RLS Implementation

RLS uses a PostgreSQL session variable set by the application on each connection:

```sql
-- Application sets this on every connection before executing queries
SELECT set_config('app.current_organization_id', :organizationId, TRUE);
SELECT set_config('app.current_user_type', :userType, TRUE);
```

For Platform users (`user_type = 'PLATFORM'`), the variable is set to `'*'` and the policy permits full access.

---

## Priority 1 — customer.customers

```sql
ALTER TABLE customer.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON customer.customers
  AS PERMISSIVE FOR ALL
  TO platform_rw
  USING (
    organization_id::TEXT = current_setting('app.current_organization_id', TRUE)
    OR current_setting('app.current_user_type', TRUE) = 'PLATFORM'
  );
```

---

## Priority 2 — commerce.orders

```sql
ALTER TABLE commerce.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON commerce.orders
  AS PERMISSIVE FOR ALL
  TO platform_rw
  USING (
    organization_id::TEXT = current_setting('app.current_organization_id', TRUE)
    OR current_setting('app.current_user_type', TRUE) = 'PLATFORM'
  );
```

---

## Priority 3 — billing.invoices

```sql
ALTER TABLE billing.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON billing.invoices
  AS PERMISSIVE FOR ALL
  TO platform_rw
  USING (
    organization_id::TEXT = current_setting('app.current_organization_id', TRUE)
    OR current_setting('app.current_user_type', TRUE) = 'PLATFORM'
  );
```

---

## Priority 4 — wallet.wallets

```sql
ALTER TABLE wallet.wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON wallet.wallets
  AS PERMISSIVE FOR ALL
  TO platform_rw
  USING (
    organization_id::TEXT = current_setting('app.current_organization_id', TRUE)
    OR current_setting('app.current_user_type', TRUE) = 'PLATFORM'
  );
```

---

## RLS Scope

| Schema                            | RLS Applied | Rationale                                           |
| --------------------------------- | ----------- | --------------------------------------------------- |
| `customer.customers`              | ✅ Yes      | Brand PII, highest breach impact                    |
| `commerce.orders`                 | ✅ Yes      | Financial, cross-brand exposure is a serious breach |
| `billing.invoices`                | ✅ Yes      | Commercial records, financial data                  |
| `wallet.wallets`                  | ✅ Yes      | Financial balances                                  |
| `identity.users`                  | ❌ No       | Global identities, not tenant-scoped                |
| `organization.organizations`      | ❌ No       | Hierarchy visibility is complex for RLS             |
| `marketplace.product_assignments` | ❌ No       | Platform admin frequently needs full access         |
| Product schemas (fit, eta, etc.)  | ❌ No       | Already isolated by product service permissions     |

---

## RLS Operational Notes

- **Prisma compatibility:** Prisma supports RLS via the `set_config` approach. The `PrismaClient` middleware sets the organization context before each transaction.
- **Debugging:** EXPLAIN ANALYZE output will show the RLS filter applied. This is expected behavior.
- **Platform admin bypass:** Setting `user_type = 'PLATFORM'` bypasses RLS without disabling it. This is audited.
- **Migrations:** RLS policies must be re-verified after schema changes to the protected tables.

---

# 14. Cross-Tenant Protection

Forbidden

```text
Brand A

↓

Brand B Data
```

Forbidden

```text
Aggregator A

↓

Aggregator B Brands
```

Allowed

```text
Platform

↓

Everything
```

Cross-tenant isolation is enforced in:

- Guards
- Services
- Repository layer
- PostgreSQL RLS (for high-risk tables, see Section 13a)

---

# 15. Brand Transfer

Supported.

Flow

```text
Brand

↓

Transfer Request

↓

Platform Approval

↓

Ownership Updated

↓

Marketplace Preserved

↓

Billing Updated
```

Historical audit records remain unchanged.

---

# 16. Aggregator Offboarding

If an Aggregator becomes inactive

↓

Status

```text
INACTIVE
```

Brands remain intact.

Platform can

- Reassign brands
- Convert to direct brands
- Assign another aggregator

No customer data is lost.

---

# 17. Direct Brand Conversion

Supported.

```text
Aggregator Brand

↓

Platform Approval

↓

Parent Organization Updated

↓

Direct Brand
```

Subscriptions remain unchanged unless modified.

---

# 18. Future Reseller Support

Architecture supports

```text
Platform

↓

Distributor

↓

Aggregator

↓

Brand
```

without changing tenant resolution logic.

Additional hierarchy levels can be introduced by extending the parent-child relationship.

---

# 19. Organization Lifecycle

```text
Create

↓

Active

↓

Suspended

↓

Inactive

↓

Archived
```

Archived organizations remain in the database for audit purposes.

No hard deletes.

---

# 20. Organization Status

Supported statuses

```text
ACTIVE

SUSPENDED

INACTIVE

ARCHIVED
```

Suspended organizations cannot authenticate.

Inactive organizations retain historical data.

---

# 21. Tenant-Aware Caching

Redis cache keys include

```text
organization_id
```

Example

```text
autoshipp:organization:123:permissions

autoshipp:organization:123:modules
```

No cache entries are shared across tenants.

---

# 22. Tenant-Aware Events

Every platform event includes

```json
{
  "organizationId": "...",
  "parentOrganizationId": "..."
}
```

Workers always know tenant context.

---

# 23. Tenant-Aware Storage

Object Storage

↓

Organization Prefix

```text
organizations/

   organizationId/

      uploads/

      reports/

      exports/
```

No shared folders.

---

# 24. Tenant-Aware Logging

Logs include

- organizationId
- userId
- correlationId

Tenant information is propagated across services.

---

# 25. Tenant-Aware Workers

Workers always execute with

- organizationId
- permissions (when required)
- correlationId

Workers never process jobs without tenant context.

---

# 26. Tenant Security Rules

Platform

↓

May impersonate for support (audited).

Aggregators

↓

Cannot impersonate Platform.

Brands

↓

Cannot impersonate Aggregators.

All impersonation events are recorded in the Audit system.

---

# 27. Performance Considerations

Indexes required

```sql
organization_id

organization_type

parent_organization_id

status
```

Most platform queries filter by organization.

These indexes are mandatory.

---

# 28. Future Compatibility

Supports

- Multiple aggregators
- Thousands of brands
- Brand migration
- Product marketplace
- Independent product services
- White-label offerings
- Additional organization levels

without redesigning the tenant model.

---

# 29. Decision Register

| ID    | Decision                                                                   | Status    |
| ----- | -------------------------------------------------------------------------- | --------- |
| D-311 | AutoShipp uses hierarchical multi-tenancy                                  | ✅ Locked |
| D-312 | Three organization types: Platform, Aggregator, Brand                      | ✅ Locked |
| D-313 | Parent-child organization relationships define ownership                   | ✅ Locked |
| D-314 | Products are assigned to organizations, not users                          | ✅ Locked |
| D-315 | Every tenant-owned table contains `organization_id`                        | ✅ Locked |
| D-316 | Platform has global visibility; Aggregators and Brands are scoped          | ✅ Locked |
| D-317 | Brand transfers require Platform approval                                  | ✅ Locked |
| D-318 | Aggregator invoices contain per-brand cost breakdowns                      | ✅ Locked |
| D-319 | Tenant context is propagated to caches, events, workers, logs, and storage | ✅ Locked |
| D-320 | Organization lifecycle uses soft states; no hard deletes                   | ✅ Locked |

---

# 30. Relationship to the Overall Platform

The Multi-Tenant Architecture is the **foundation of every platform capability**.

It influences:

| Platform Component      | Tenant Awareness                               |
| ----------------------- | ---------------------------------------------- |
| Identity                | Organization-scoped authentication             |
| Marketplace             | Product assignments per organization           |
| Billing                 | Direct brand or aggregator billing             |
| Wallet                  | Organization-owned balances                    |
| Commerce                | Organization-owned stores and products         |
| Notifications           | Tenant-specific preferences                    |
| Audit                   | Tenant-specific audit trails                   |
| Storage                 | Organization-isolated object paths             |
| Feature Flags           | Organization-level overrides                   |
| Workers                 | Tenant-aware job execution                     |
| Future Product Services | Consume organization context from the platform |

No component within AutoShipp is allowed to ignore tenant context.

---

# 🚨 Major Architecture Improvement Over the Original Design

Your original design introduced Platform users, Brand users, and Shipping Aggregators, but treated them largely as role-based concepts. This specification elevates them into a **hierarchical organization model**, making tenant isolation a first-class architectural concern rather than an application convention.

Major improvements include:

- **Hierarchical multi-tenancy** with Platform → Aggregator → Brand ownership, allowing flexible growth without redesign.
- **Organization-centric architecture**, where products, subscriptions, billing, storage, events, and permissions are all assigned to organizations rather than individual users.
- **Strict tenant isolation**, enforced consistently across authentication, authorization, repositories, caches, workers, events, logs, and object storage.
- **Built-in support for brand transfers and aggregator lifecycle management**, preserving audit history while allowing business relationships to change over time.
- **Future extensibility**, enabling additional hierarchy levels (such as distributors or regional partners) with the same parent-child organization model.

This document establishes the tenant model that every present and future AutoShipp capability must follow, ensuring secure isolation, operational flexibility, and a scalable business structure for the platform.

---

# AES-030 — Frontend Architecture & UI Platform Specification

**Document ID:** AES-030

**Title:** Frontend Architecture & UI Platform Specification

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Technology Stack**

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript 5
- TanStack Query
- React Hook Form
- Zod
- shadcn/ui
- Lucide Icons

**Depends On**

- AES-009 — Identity & Authentication
- AES-010 — Organization
- AES-012 — Marketplace
- AES-019 — Feature Flags
- AES-020 — Platform API
- AES-029 — Multi-Tenant Architecture

---

# 1. Executive Summary

The AutoShipp frontend is a **single Next.js application** serving three user groups:

- Platform
- Aggregator
- Brand

The frontend is **tenant-aware**, **module-aware**, and **permission-aware**.

Unlike traditional dashboards, navigation, layouts, and pages are generated dynamically from the authenticated user's Account Context.

---

# 2. Design Principles

## Principle 1

Single Frontend Application.

One deployment.

One domain.

---

## Principle 2

Server-first.

Prefer Server Components.

Use Client Components only where interactivity is required.

---

## Principle 3

Permission-driven UI.

No hardcoded menus.

---

## Principle 4

Marketplace-driven Modules.

Products appear automatically when assigned.

---

## Principle 5

Platform owns authentication.

Products consume Account Context.

---

# 3. High-Level Architecture

```text
                    Browser
                        │
                  Next.js 16
                        │
      ┌─────────────────┼─────────────────┐
      │                 │                 │
 Server Components   Client Components   Server Actions
      │                 │                 │
      └─────────────────┼─────────────────┘
                        │
                 Platform API
                        │
                 Account Context
```

---

# 4. Application Structure

```text
apps/web

app/

    (auth)/

    (platform)/

    (aggregator)/

    (brand)/

components/

features/

hooks/

lib/

providers/

services/

types/

styles/
```

---

# 5. App Router

```text
app/

├── (auth)
│
├── (platform)
│
├── (aggregator)
│
└── (brand)
```

Each route group has its own layout.

---

# 6. Authentication Flow

```text
Login

↓

JWT Cookie

↓

GET /account/context

↓

Account Context

↓

Layout Selection

↓

Sidebar Generation

↓

Dashboard
```

No page renders until Account Context is resolved.

---

# 7. Account Context

Central frontend state.

Contains

```ts
{
  organization;

  parentOrganization;

  organizationType;

  user;

  role;

  permissions;

  modules;

  subscriptions;

  featureFlags;
}
```

Source of truth for the UI.

---

# 8. Layout Architecture

```text
RootLayout

↓

ThemeProvider

↓

QueryProvider

↓

AuthProvider

↓

AccountProvider

↓

Layout
```

Each provider has a single responsibility.

---

# 9. Route Groups

## Authentication

```text
/auth/login

/auth/forgot-password

/auth/reset-password
```

---

## Platform

```text
/platform/dashboard

/platform/organizations

/platform/users

/platform/marketplace

/platform/billing

/platform/wallet

/platform/integrations

/platform/health

/platform/settings
```

---

## Aggregator

```text
/aggregator/dashboard

/aggregator/brands

/aggregator/users

/aggregator/billing

/aggregator/settings
```

---

## Brand

```text
/brand/dashboard

/brand/orders

/brand/customers

/brand/settings
```

Products appear dynamically.

---

# 10. Dynamic Navigation

Sidebar generated from

```text
Marketplace Assignment

↓

Modules

↓

Permissions

↓

Feature Flags

↓

Sidebar Items
```

Example

```text
Fit

Enabled

↓

Sidebar Visible

Returns

Disabled

↓

Locked Card

Not Hidden
```

Exactly matching the marketplace architecture.

---

# 11. Route Protection

Every protected page

↓

Server Layout

↓

Read Cookie

↓

Validate JWT

↓

Account Context

↓

Permission Check

↓

Render

No client-side security assumptions.

---

# 12. UI Authorization

Pages

↓

Permissions

↓

Components

↓

Buttons

↓

Actions

Everything checks permissions.

Example

```text
billing.manage

↓

Show "Create Invoice"
```

Otherwise hidden or disabled.

---

# 13. Module Loading

Modules are discovered dynamically.

```text
Marketplace

↓

Assigned Products

↓

Navigation

↓

Routes

↓

Widgets
```

Frontend never hardcodes enabled products.

---

# 14. Component Architecture

```text
components/

    ui/

    layout/

    forms/

    tables/

    charts/

    navigation/

    feedback/

    dialogs/
```

Reusable only.

Business logic belongs elsewhere.

---

# 15. Feature Architecture

```text
features/

authentication

organizations

billing

wallet

marketplace

customers

commerce

notifications
```

Each feature owns

- Components
- Hooks
- Types
- API

---

# 16. API Layer

```text
services/

auth

billing

marketplace

wallet

organizations
```

UI never calls fetch directly.

Everything goes through services.

---

# 17. Data Fetching

Uses

TanStack Query

Responsibilities

- Cache
- Retry
- Background Refresh
- Optimistic Updates

Server Components use direct server-side fetching where appropriate.

---

# 18. Forms

Uses

- React Hook Form
- Zod

Validation

Client

↓

Server

Same schemas reused where possible.

---

# 19. Global State

Minimal.

React Context stores

- User
- Account Context
- Theme
- Notifications

Business data remains in TanStack Query.

---

# 20. Error Handling

Levels

- Field Error
- Form Error
- API Error
- Route Error
- Global Error

Every level has a dedicated UI.

---

# 21. Loading Strategy

Use

- Skeletons
- Streaming
- Suspense

Avoid blocking full page rendering.

---

# 22. Theme

Supports

```text
Light

Dark

System
```

Stored per user preference.

---

# 23. Responsive Design

Supported

- Desktop
- Tablet
- Mobile

Platform dashboard is optimized primarily for desktop.

Brand dashboards remain fully responsive.

---

# 24. Internationalization

Architecture supports i18n.

Initial release

```text
English
```

Future languages require no structural changes.

---

# 25. Accessibility

Target

WCAG 2.1 AA

Requirements

- Keyboard navigation
- Proper labels
- Focus indicators
- Color contrast
- Screen reader compatibility

---

# 26. Performance Strategy

- Server Components by default.
- Lazy-load heavy modules.
- Dynamic imports for charts and editors.
- Image optimization.
- Route prefetching.
- Code splitting.

---

# 27. Error Boundaries

Separate boundaries for

- Route
- Widget
- Dashboard
- Product Module

One failing widget must not crash the entire page.

---

# 28. Notifications

Global notification system.

Supports

- Success
- Error
- Warning
- Information

Integrated with Platform Notifications.

---

# 29. File Upload UX

Uploads

↓

Signed URL

↓

Object Storage

↓

Progress Indicator

↓

Completion Notification

Large uploads never block the UI.

---

# 30. Frontend Security

Implements

- HttpOnly Authentication
- CSP
- CSRF Tokens
- Output Escaping
- No Token Storage in LocalStorage
- Route Guards
- Permission-aware Components

As defined in AES-028.

---

# 31. Frontend Monitoring

Collect

- Web Vitals
- Page Load Time
- API Latency
- JS Errors
- Route Errors

Linked to Platform Observability.

---

# 32. Build Strategy

Production build

```text
Next.js

↓

Tree Shaking

↓

Code Splitting

↓

Optimization

↓

Deployment
```

---

# 33. Future Product Integration

One of the core goals of the frontend architecture is that **new products require almost no changes to the shell application**.

Example:

```text
Marketplace

↓

New Product

↓

Assigned to Organization

↓

Sidebar Appears

↓

Route Enabled

↓

Frontend Loads Module
```

The shell remains unchanged.

---

# 34. Folder Structure Recommendation

```text
apps/web

├── app/
├── components/
├── features/
├── providers/
├── hooks/
├── services/
├── lib/
├── types/
├── styles/
├── middleware.ts
└── instrumentation.ts
```

Business logic stays inside `features`.

Shared UI stays inside `components`.

---

# 35. Decision Register

| ID    | Decision                                                                      | Status    |
| ----- | ----------------------------------------------------------------------------- | --------- |
| D-321 | One Next.js application serves all organization types                         | ✅ Locked |
| D-322 | Next.js App Router is the routing architecture                                | ✅ Locked |
| D-323 | Server Components are the default rendering model                             | ✅ Locked |
| D-324 | Account Context drives all frontend behavior                                  | ✅ Locked |
| D-325 | Sidebar is generated dynamically from marketplace assignments and permissions | ✅ Locked |
| D-326 | TanStack Query is the client data layer                                       | ✅ Locked |
| D-327 | React Hook Form + Zod handle forms and validation                             | ✅ Locked |
| D-328 | UI components are reusable and business-logic free                            | ✅ Locked |
| D-329 | Future products plug into the shell through the marketplace model             | ✅ Locked |
| D-330 | Security responsibilities follow AES-028                                      | ✅ Locked |

---

# 36. Relationship to the Platform

The frontend is **not a collection of independent dashboards**.

It is a **Platform Shell** that dynamically assembles the user experience based on:

- Identity (AES-009)
- Organization hierarchy (AES-029)
- Marketplace assignments (AES-012)
- Feature flags (AES-019)
- Platform APIs (AES-020)

This means:

- A Platform user sees Platform tools.
- An Aggregator sees Aggregator tools plus their managed brands.
- A Brand sees only the products they have purchased.
- As new products are added to the marketplace, the shell adapts automatically without structural changes.

---

# 🚨 Major Architecture Improvement Over the Original Design

Your original frontend design defined separate `(platform)` and `(brand)` route groups with module-based sidebars. This specification generalizes that approach into a **Platform Shell Architecture**.

Major improvements include:

- **Support for all three organization types** (Platform, Aggregator, and Brand) within a single Next.js application.
- **Account Context as the central UI contract**, driving layouts, navigation, permissions, subscriptions, feature flags, and tenant behavior.
- **Marketplace-driven navigation**, where products become available dynamically through assignments rather than hardcoded routes.
- **Feature-oriented frontend structure**, separating reusable UI components from business features and API services.
- **Server-first rendering**, leveraging Next.js 16 App Router, React Server Components, and streaming for performance and security.
- **Plugin-ready foundation**, allowing future AutoShipp products to integrate into the platform shell without restructuring the application.

This architecture establishes the frontend as a scalable, modular, and tenant-aware platform that can grow alongside AutoShipp while maintaining a consistent user experience and clear separation of concerns.

---

# AES-031 — Disaster Recovery, Backup & Business Continuity Architecture Specification

**Document ID:** AES-031

**Title:** Disaster Recovery, Backup & Business Continuity Architecture

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-008 — Master Database Blueprint
- AES-020 — Platform API
- AES-022 — Worker Architecture
- AES-023 — Platform Health
- AES-025 — Storage Architecture
- AES-026 — Deployment Architecture

---

# 1. Executive Summary

Disaster Recovery (DR) ensures AutoShipp can recover from infrastructure failures, accidental data loss, software bugs, or cloud outages while minimizing downtime and data loss.

This document defines:

- Backup strategy
- Restore procedures
- Recovery objectives
- Business continuity
- Infrastructure redundancy
- Data protection
- Disaster response

The platform is designed to recover from failures without requiring architectural changes.

---

# 2. Disaster Recovery Objectives

Two primary recovery metrics define the platform.

| Metric                         | Target       |
| ------------------------------ | ------------ |
| RPO (Recovery Point Objective) | ≤ 15 minutes |
| RTO (Recovery Time Objective)  | ≤ 1 hour     |

Meaning:

- At most 15 minutes of data may be lost.
- Platform should be operational again within one hour.

---

# 3. High-Level Architecture

```text id="p7i4sm"
                Production

                     │

      ┌──────────────┼──────────────┐

      │              │              │

 PostgreSQL      Object Storage    Redis

      │              │              │

      └──────────────┼──────────────┘

             Backup Storage

                     │

             Restore Process

                     │

            Disaster Recovery
```

---

# 4. Backup Principles

## Principle 1

Backups are automatic.

---

## Principle 2

Backups are encrypted.

---

## Principle 3

Backups are immutable.

---

## Principle 4

Backups are tested.

---

## Principle 5

Restore procedures are documented.

---

## Principle 6

Backups are stored separately from production.

---

# 5. PostgreSQL Backup Strategy

Database is the primary business asset.

Backup schedule

| Type               | Frequency     |
| ------------------ | ------------- |
| WAL / PITR         | Continuous    |
| Incremental Backup | Every 6 Hours |
| Full Backup        | Daily         |

Supports Point-in-Time Recovery (PITR).

---

# 6. Database Restore

Supported restores

- Full Database
- Single Schema
- Single Table
- Point-in-Time

Example

```text id="gv8itf"
Restore

↓

2026-06-29

10:05 AM
```

Recover to any point within retention.

---

# 7. Object Storage Backup

Binary files are already durable.

Protection includes

- Object Versioning
- Cross-region replication (future)
- Lifecycle policies

Metadata remains in PostgreSQL.

---

# 8. Redis Recovery

Redis is **not backed up**.

Reason

Redis stores only

- Cache
- Locks
- Temporary Data
- Rate Limits

Everything rebuilds automatically.

---

# 9. BullMQ Recovery

BullMQ uses

- Durable Exchanges
- Durable Queues
- Persistent Messages

Broker restart does not lose acknowledged business events.

Messages in Dead Letter Queues remain available for replay.

---

# 10. Backup Encryption

Every backup uses

AES-256 encryption

Backup keys are stored separately from backup files.

Backups are encrypted:

- At Rest
- In Transit

---

# 11. Backup Retention

| Backup  | Retention             |
| ------- | --------------------- |
| Daily   | 30 Days               |
| Weekly  | 12 Weeks              |
| Monthly | 12 Months             |
| Annual  | 7 Years (if required) |

Retention policies are configurable.

---

# 12. Backup Verification

Every backup is verified.

Process

```text id="kqq5vg"
Backup

↓

Checksum

↓

Integrity Check

↓

Success

↓

Retention
```

Corrupted backups are rejected.

---

# 13. Restore Testing

Every quarter

↓

Random Backup

↓

Restore

↓

Integrity Verification

↓

Report

Untested backups are considered unreliable.

---

# 14. Infrastructure Recovery

Infrastructure rebuilt using

- Docker
- Git Repository
- Infrastructure Configuration
- Environment Templates

Infrastructure remains reproducible.

---

# 15. Application Recovery

Recovery process

```text id="4yx2kr"
Containers

↓

Deploy

↓

Database Restore

↓

Workers

↓

Health Checks

↓

Traffic Enabled
```

Applications remain stateless.

---

# 16. Deployment Recovery

Rollback

↓

Previous Container

↓

Health Verification

↓

Traffic Restored

No manual rebuild required.

---

# 17. Secrets Recovery

Secrets are backed up separately.

Includes

- JWT Secrets
- OAuth Credentials
- SMTP
- Payment Keys

Production secrets are never stored with database backups.

---

# 18. Configuration Recovery

Recoverable

- Environment Variables
- Runtime Configuration
- Feature Flags
- Marketplace Configuration

Configuration is version controlled wherever possible.

---

# 19. Monitoring During Disaster

Platform Health monitors

- Restore Progress
- Database Status
- Queue Status
- Worker Status
- API Availability

Recovery progress is observable.

---

# 20. Disaster Scenarios

Supported scenarios

| Scenario              | Recovery                                     |
| --------------------- | -------------------------------------------- |
| Database corruption   | PITR Restore                                 |
| Server failure        | Redeploy Containers                          |
| Redis failure         | Automatic Cache Rebuild                      |
| Worker failure        | Restart Workers                              |
| BullMQ restart        | Durable Queue Recovery                       |
| Object Storage outage | Restore from Replication / Provider Recovery |
| Bad deployment        | Rollback                                     |
| Accidental deletion   | Restore from Backup                          |

---

# 21. Business Continuity

Business continuity priorities

1. Authentication
2. Platform API
3. Billing
4. Marketplace
5. Worker Processing
6. Notifications
7. Analytics

Core platform functions recover first.

---

# 22. Incident Response

Every disaster records

- Detection Time
- Impact
- Root Cause
- Recovery Time
- Data Loss
- Timeline
- Lessons Learned

Integrated with Audit and Observability.

---

# 23. Recovery Playbooks

Documented playbooks exist for

- Database Restore
- Full Platform Recovery
- Object Storage Recovery
- BullMQ Recovery
- Redis Failure
- Secret Rotation
- Certificate Expiration
- Deployment Rollback

No recovery process depends solely on tribal knowledge.

---

# 24. Business Impact Classification

| Severity | Example               |
| -------- | --------------------- |
| Critical | Platform unavailable  |
| High     | Billing unavailable   |
| Medium   | Notification delays   |
| Low      | Analytics unavailable |

Response priority follows severity.

---

# 25. Compliance

Backups satisfy

- Encryption
- Access Control
- Audit Logging
- Retention
- Restore Verification

All backup access is audited.

---

# 26. Future Compatibility

Supports

- Multi-region deployment
- Cross-region PostgreSQL
- Cross-region Object Storage
- Active-Passive failover
- Active-Active architecture (future)

No redesign required.

---

# 27. Technology Stack

| Component  | Technology            |
| ---------- | --------------------- |
| Database   | Neon PostgreSQL PITR  |
| Storage    | S3-Compatible         |
| Queue      | BullMQ Durable Queues |
| Cache      | Redis                 |
| Containers | Docker                |
| CI/CD      | GitHub Actions        |

---

# 28. Recovery Timeline Example

```text id="vmrltv"
Failure Detected

↓

Alert Generated

↓

Traffic Blocked

↓

Rollback / Restore

↓

Health Verification

↓

Workers Started

↓

Platform Online
```

Target completion

≤ 1 Hour

---

# 29. Decision Register

| ID    | Decision                                                         | Status    |
| ----- | ---------------------------------------------------------------- | --------- |
| D-331 | PostgreSQL uses continuous PITR and scheduled backups            | ✅ Locked |
| D-332 | Redis is not backed up because it contains only rebuildable data | ✅ Locked |
| D-333 | BullMQ uses durable queues and persistent messages               | ✅ Locked |
| D-334 | Object Storage uses versioning and provider durability           | ✅ Locked |
| D-335 | Backups are encrypted and stored separately from production      | ✅ Locked |
| D-336 | Backup restoration is tested quarterly                           | ✅ Locked |
| D-337 | Infrastructure is rebuilt from version-controlled configuration  | ✅ Locked |
| D-338 | Secrets are backed up separately from application data           | ✅ Locked |
| D-339 | Recovery follows documented operational playbooks                | ✅ Locked |
| D-340 | Target RPO ≤ 15 minutes and RTO ≤ 1 hour                         | ✅ Locked |

---

# 30. Relationship to the Platform

Disaster Recovery is a cross-cutting capability that protects every platform component.

| Component               | Recovery Strategy                                            |
| ----------------------- | ------------------------------------------------------------ |
| Platform API            | Container redeployment                                       |
| PostgreSQL              | PITR + Full Backups                                          |
| BullMQ                  | Durable queues + replay                                      |
| Redis                   | Automatic cache rebuild                                      |
| Workers                 | Stateless restart                                            |
| Object Storage          | Versioning + replication                                     |
| Feature Flags           | Database restore                                             |
| Marketplace             | Database restore                                             |
| Audit                   | Database restore                                             |
| Future Product Services | Independent service recovery following the same architecture |

All services follow the same operational recovery model, ensuring consistent restoration procedures across the platform.

---

# 🚨 Major Architecture Improvement Over the Original Design

The original architecture mentioned backups and deployments but did not define a complete disaster recovery strategy. This specification introduces a comprehensive **Business Continuity and Disaster Recovery (BCDR)** architecture.

Major improvements include:

- **Clearly defined recovery objectives** (RPO and RTO) that establish measurable operational targets.
- **Layered backup strategy** covering PostgreSQL, object storage, BullMQ, infrastructure, configuration, and secrets while intentionally excluding Redis due to its non-persistent role.
- **Point-in-Time Recovery (PITR)** for PostgreSQL, enabling restoration to precise moments in time after accidental deletion or corruption.
- **Documented recovery playbooks** for common disaster scenarios, reducing operational risk and ensuring repeatable incident response.
- **Infrastructure reproducibility**, allowing complete platform reconstruction from version-controlled infrastructure definitions and container images.
- **Regular restore verification**, ensuring backups remain usable rather than assuming successful backup creation is sufficient.

This document establishes the operational resilience required for AutoShipp to operate as a production-grade SaaS platform, ensuring that failures can be managed predictably with minimal downtime and controlled data loss.

---

# AES-032 — Database Operations, Migration & Schema Governance Specification

**Document ID:** AES-032

**Title:** Database Operations, Migration & Schema Governance

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-008 — Master Database Blueprint
- AES-020 — Platform API
- AES-026 — Deployment Architecture
- AES-029 — Multi-Tenant Architecture
- AES-031 — Disaster Recovery

---

# 1. Executive Summary

This document defines how the AutoShipp PostgreSQL database is managed throughout its lifecycle.

It establishes rules for:

- Schema ownership
- Database migrations
- Schema evolution
- Versioning
- Rollback strategy
- Operational maintenance
- Performance optimization
- Future product onboarding

The objective is to ensure **one shared PostgreSQL database** remains maintainable as new AutoShipp products are introduced.

---

# 2. Database Strategy

AutoShipp uses

```text
One PostgreSQL Database

↓

Multiple Schemas

↓

One Prisma Client Per Service

↓

Strict Schema Ownership
```

This decision is permanently locked.

---

# 3. Core Principles

## Principle 1

Only one PostgreSQL database exists.

---

## Principle 2

Every schema has exactly one owner.

---

## Principle 3

No service writes outside its owned schema.

---

## Principle 4

Shared platform data belongs only to Platform schemas.

---

## Principle 5

Schema evolution must never require downtime.

---

## Principle 6

Every migration is version-controlled.

---

# 4. Current Database Layout

Today

```text
autoshipp

├── identity
├── organizations
├── commerce
├── marketplace
├── billing
├── wallet
├── integrations
├── customers
├── notifications
├── audit
├── feature_flags
├── runtime
└── ...
```

Future products will introduce their own schemas later.

Those schemas are **not created until the product is migrated**.

---

# 5. Future Product Migration

Example

Today

```text
Platform Database

↓

Platform Schemas
```

Future

```text
Platform Database

↓

Platform Schemas

↓

fit

↓

eta

↓

returns

↓

ai
```

Only when each product is migrated.

---

# 6. Schema Ownership

| Schema                | Owner                         |
| --------------------- | ----------------------------- |
| Platform Schemas      | Platform API                  |
| Future Product Schema | Corresponding Product Service |

No shared ownership.

---

# 7. Prisma Ownership

Every service owns exactly one Prisma Client.

Example

```text
Platform API

↓

prisma-platform
```

Future

```text
Fit Service

↓

prisma-fit
```

No Prisma client may generate models for another service's schema.

---

# 8. Database Permissions

Database users enforce ownership.

Example

```text
platform_user

↓

RW Platform Schemas

↓

Read-only Future Public Schemas (if exposed)
```

Future

```text
fit_user

↓

RW fit Schema

↓

Read-only Shared Platform Views (if required)
```

Database permissions prevent accidental cross-schema writes.

---

# 9. Migration Strategy

Every migration follows

```text
Developer

↓

Migration Created

↓

Code Review

↓

CI Validation

↓

Staging

↓

Production
```

No manual SQL executed directly in production except emergency procedures.

---

# 10. Migration Rules

Allowed

- Add tables
- Add indexes
- Add nullable columns
- Add new enums (carefully)
- Add views

Not allowed

- Drop columns without deprecation
- Rename columns without compatibility
- Breaking schema changes

---

# 10a. Migration Governance by Schema Type (Amendment — v1.1)

Platform schemas and product schemas have different migration governance rules because they have different risk profiles.

## Platform Schema Migrations (identity, organization, commerce, billing, wallet, marketplace, integration, customer, notification, audit, feature_flag, platform)

**Risk level:** HIGH — changes affect every service that reads the schema.

Rules:

- Migrations must be reviewed by the Platform Architecture Team before merging
- Breaking changes must follow the Expand-Contract pattern (Section 11)
- No `LOCK TABLE` migrations outside a defined maintenance window
- Maintenance window must be communicated to all product service teams in advance
- All platform schema migrations must pass CI dry-run: `prisma migrate deploy --dry-run`
- Additive-only rule strictly enforced: add columns, never rename or drop without deprecation period minimum 30 days

**CI Gate:**

```text
prisma migrate deploy --dry-run

↓

eslint check: no breaking migration patterns

↓

Require 2 architecture team approvals

↓

Deploy to staging first

↓

Production
```

---

## Product Schema Migrations (fit, eta, returns, tryon, assistant, shipping)

**Risk level:** LOW — changes affect only the owning product service.

Rules:

- Migrations reviewed by the product service team (1 approval)
- Can deploy at any time without coordination with other teams
- Should not contain cross-schema references to platform schemas
- Must follow standard naming conventions (AES-008 Section 10)

**CI Gate:**

```text
prisma migrate deploy --dry-run

↓

1 product team approval

↓

Deploy to staging

↓

Production
```

---

## Migration Lock Timeout Policy

In a shared database, multiple services may run migrations simultaneously.

Prisma uses a `_prisma_migrations` table with a lock.

Policy:

- Migration lock timeout: 30 seconds
- If a migration cannot acquire the lock within 30 seconds, it fails and alerts
- Never allow two platform schema migrations to run simultaneously
- Product schema migrations may run concurrently with each other

---

# 11. Expand-Contract Pattern

Breaking changes follow

```text
Expand

↓

Deploy

↓

Backfill

↓

Application Update

↓

Contract

↓

Cleanup
```

This enables zero-downtime deployments.

---

# 12. Migration Versioning

Each migration has

```text
Timestamp

↓

Description

↓

SQL

↓

Checksum
```

Example

```text
202607011015_add_wallet_transactions
```

---

# 13. Rollback Strategy

If deployment fails

↓

Rollback Application

↓

Rollback Migration (only if safe)

Otherwise

↓

Forward Fix

Production rollback is never automatic for destructive migrations.

---

# 14. Data Migrations

Large data changes are executed separately from schema migrations.

Flow

```text
Deploy Schema

↓

Background Worker

↓

Backfill Data

↓

Validation

↓

Enable Feature
```

Never block production traffic.

---

# 15. Index Management

Every new index must justify

- Query improvement
- Storage impact
- Write overhead

Indexes are reviewed before deployment.

---

# 16. Constraint Strategy

Use

- Primary Keys
- Foreign Keys
- Unique Constraints
- Check Constraints

Business invariants belong in both database constraints and application validation where appropriate.

---

# 17. Soft Deletes

Platform data uses

```text
deleted_at
```

instead of hard deletes.

Historical information remains available for audit.

---

# 18. Schema Documentation

Every schema includes

- Purpose
- Owner
- Tables
- Relationships
- Migration history

Documentation is updated alongside migrations.

---

# 19. Performance Maintenance

Scheduled maintenance includes

- VACUUM
- ANALYZE
- Index health review
- Slow query analysis

Provider-managed tasks are leveraged where available.

---

# 20. Database Monitoring

Track

- Connections
- Query latency
- Lock waits
- Deadlocks
- Replication status (future)
- Table growth
- Index usage

Integrated into Platform Health.

---

# 21. Long Running Queries

Automatically detect

Queries

>

500 ms

Investigate

- Missing indexes
- Bad execution plans
- N+1 queries

---

# 22. Data Integrity

Integrity is enforced through

- Foreign Keys
- Transactions
- Optimistic concurrency where required
- Idempotent operations

No orphaned platform records.

---

# 23. Backup Compatibility

Every migration must remain compatible with

- PITR
- Full Restore
- Schema Restore

Migration history is retained permanently.

---

# 24. Product Migration Workflow

When migrating a future product

```text
Existing Product Database

↓

Data Mapping

↓

New Product Schema

↓

Validation

↓

Dual Verification

↓

Cutover

↓

Legacy Database Read Only

↓

Decommission
```

No direct cutover without verification.

---

# 25. Legacy Data Migration Principles

As decided for AutoShipp:

- Reuse existing platform data whenever possible.
- Never duplicate Organizations, Users, Customers, or Commerce data.
- Product databases should retain only product-specific data after migration.
- Shared entities become references to Platform data.

This eliminates duplicate copies across products.

---

# 26. Database Change Approval

Every production database change requires

- Technical review
- Architecture review (for structural changes)
- Successful CI
- Successful staging validation

Emergency changes are documented retrospectively.

---

# 27. Future Scalability

This governance model supports

- Additional schemas
- Additional product services
- Read replicas
- Logical replication
- Database partitioning (if required)

without changing ownership rules.

---

# 28. Technology Stack

| Component         | Technology                   |
| ----------------- | ---------------------------- |
| Database          | PostgreSQL (Neon)            |
| ORM               | Prisma                       |
| Migration Tool    | Prisma Migrate               |
| Schema Versioning | Git                          |
| Monitoring        | Prometheus + Platform Health |

---

# 29. Decision Register

| ID    | Decision                                                           | Status    |
| ----- | ------------------------------------------------------------------ | --------- |
| D-341 | AutoShipp uses one PostgreSQL database                             | ✅ Locked |
| D-342 | Every schema has exactly one owning service                        | ✅ Locked |
| D-343 | One Prisma Client is created per service                           | ✅ Locked |
| D-344 | Future product schemas are created only when products are migrated | ✅ Locked |
| D-345 | Platform data is reused instead of duplicated                      | ✅ Locked |
| D-346 | Database permissions prevent cross-schema writes                   | ✅ Locked |
| D-347 | Expand-Contract is the standard migration pattern                  | ✅ Locked |
| D-348 | Large data migrations execute through background workers           | ✅ Locked |
| D-349 | All migrations are version-controlled and reviewed                 | ✅ Locked |
| D-350 | Schema documentation is maintained alongside code                  | ✅ Locked |

---

# 30. Relationship to the Platform

This document governs the evolution of the AutoShipp database over time.

It ensures:

| Platform Component      | Database Governance                                           |
| ----------------------- | ------------------------------------------------------------- |
| Platform API            | Owns platform schemas                                         |
| Workers                 | Use platform schema through Platform API ownership rules      |
| Future Product Services | Own only their schemas                                        |
| Marketplace             | References platform data                                      |
| Billing                 | Uses shared organization data                                 |
| Commerce                | Shared across products                                        |
| Future Migrations       | Reuse existing platform entities rather than duplicating data |

This governance guarantees that the platform can continue growing while maintaining the architectural decision of **one PostgreSQL database, multiple schemas, strict ownership, and zero unnecessary duplication of shared business data**.

---

# 🚨 Major Architecture Improvement Over the Original Design

Your original design established the core database principles—**one PostgreSQL database**, **multiple schemas**, **one Prisma client per service**, and **strict schema ownership**. This specification extends those decisions into a complete operational governance model.

Major improvements include:

- **Formal schema governance**, where every schema has a single owning service and database permissions enforce write isolation.
- **A standardized migration lifecycle** using version-controlled migrations, CI validation, staging promotion, and zero-downtime Expand-Contract deployment patterns.
- **A defined product migration process**, ensuring existing products can move into the shared database while reusing Organizations, Users, Customers, and Commerce data instead of creating duplicate records.
- **Clear operational rules** for indexing, constraints, maintenance, monitoring, backups, rollback, and schema documentation.
- **Future-proof scalability**, allowing new product schemas to be introduced only when needed, without affecting existing platform architecture.

This document serves as the authoritative governance guide for every database change made to AutoShipp throughout the lifetime of the platform.

---

# AES-033 — Performance, Scalability & Capacity Planning Architecture Specification

**Document ID:** AES-033

**Title:** Performance, Scalability & Capacity Planning Architecture

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-020 — Platform API
- AES-021 — Event-Driven Architecture
- AES-022 — Worker Architecture
- AES-023 — Platform Health
- AES-024 — Observability
- AES-026 — Deployment
- AES-027 — Redis
- AES-029 — Multi-Tenant

---

# 1. Executive Summary

The AutoShipp platform is designed to scale from **a few brands today** to **thousands of organizations and millions of API requests** without architectural redesign.

Scalability is achieved through:

- Stateless services
- Independent deployments
- Event-driven processing
- Horizontal scaling
- Shared PostgreSQL
- Redis caching
- BullMQ workers
- Efficient database design

Performance is treated as a platform feature, not an optimization added later.

---

# 2. Scalability Principles

## Principle 1

Scale horizontally before scaling vertically.

---

## Principle 2

Everything must be stateless.

---

## Principle 3

Cache expensive reads.

---

## Principle 4

Move long-running work to workers.

---

## Principle 5

Optimize the database before adding infrastructure.

---

## Principle 6

Measure before optimizing.

---

# 3. High-Level Scalability Architecture

```text id="uhy7tr"
                 Cloudflare
                      │
              Load Balancer (Nginx)
                      │
        ┌─────────────┼─────────────┐
        │             │             │
 Platform API   Platform API   Platform API
        │             │             │
        └─────────────┼─────────────┘
                      │
        PostgreSQL   Redis   BullMQ
                      │
      ┌───────────────┼───────────────┐
      │               │               │
 Notification     Billing       Integration
    Workers         Workers         Workers
```

All stateless services scale independently.

---

# 4. Expected Growth

Current expectation

- < 1,000 Organizations
- Thousands of users
- Multiple future products

Architecture target

- 100,000+ Organizations
- Millions of users
- Hundreds of millions of records

without redesign.

---

# 5. Horizontal Scaling

Scalable components

| Component                | Horizontal Scaling |
| ------------------------ | ------------------ |
| Next.js                  | ✅                 |
| Platform API             | ✅                 |
| Workers                  | ✅                 |
| BullMQ Consumers         | ✅                 |
| Redis Cluster            | Future             |
| PostgreSQL Read Replicas | Future             |

Only PostgreSQL primary remains a single write node.

---

# 6. Vertical Scaling

Allowed only for

- PostgreSQL
- Redis
- BullMQ

Until horizontal alternatives become necessary.

---

# 7. Database Performance

Primary optimizations

- Proper indexes
- Query optimization
- Connection pooling
- Batch operations
- Pagination
- Avoid N+1 queries

No premature sharding.

---

# 8. Index Strategy

Mandatory indexes

```text id="a8a4ga"
organization_id

created_at

updated_at

status

deleted_at

parent_organization_id
```

Composite indexes are added only for proven query patterns.

---

# 9. Connection Pooling

Every Platform API instance uses

```text id="bjlwm7"
Prisma

↓

PgBouncer

↓

PostgreSQL
```

Benefits

- Reduced connection count
- Better concurrency
- Stable database performance

---

# 10. Query Optimization

Rules

- Never use `SELECT *`
- Always paginate
- Load only required columns
- Batch related queries
- Profile slow queries

Maximum acceptable query time

```text id="r4wzpr"
100 ms
```

Slow query threshold

```text id="hpr2xo"
500 ms
```

---

# 11. Pagination Strategy

Small datasets

↓

Offset Pagination

Large datasets

↓

Cursor Pagination

No endpoint returns unlimited data.

---

# 12. API Performance

Target

| Metric           | Target     |
| ---------------- | ---------- |
| Average Response | < 200 ms   |
| P95              | < 500 ms   |
| P99              | < 1 second |

Heavy work belongs to workers.

---

# 13. Caching Strategy

Redis caches

- Feature Flags
- Runtime Config
- User Context
- Organization Data
- Marketplace
- Health Status

No business data stored permanently.

---

# 14. Worker Scalability

Every worker scales independently.

Example

```text id="3xy1gl"
Notification

20 Pods

Billing

3 Pods

Sync

50 Pods
```

Scaling depends on queue depth.

---

# 15. BullMQ Scaling

Scaling strategy

- Multiple consumers
- Topic exchanges
- Queue isolation
- Dead Letter Queues

Large workloads are distributed automatically.

---

# 16. File Storage Performance

Large uploads

↓

Signed URL

↓

Object Storage

↓

Background Processing

Platform API never streams large files through application memory.

---

# 17. Frontend Performance

Uses

- React Server Components
- Streaming
- Suspense
- Code Splitting
- Lazy Loading
- Image Optimization

Initial page loads remain fast.

---

# 18. Multi-Tenant Performance

Every tenant query filters by

```sql id="dx2ruv"
organization_id
```

Tenant isolation also improves index efficiency.

---

# 19. Event Processing Performance

Target

```text id="4mjlwm"
Publish

↓

BullMQ

↓

Consumer

↓

ACK

< 2 seconds
```

Notification delivery may exceed this depending on third-party providers.

---

# 20. Background Jobs

Long-running operations

- Imports
- Exports
- AI Processing
- Synchronization

Never execute synchronously.

---

# 21. Capacity Planning

Monitor

- CPU
- Memory
- Queue Depth
- Database Connections
- Cache Hit Rate
- API Latency
- Worker Throughput

Scaling decisions are metric-driven.

---

# 22. Auto Scaling

Future Kubernetes deployment may scale

- Platform API
- Workers

Based on

- CPU
- Memory
- Queue Length
- Requests per Second

Architecture already supports this.

---

# 23. Database Partitioning

Not required initially.

Future candidates

- Audit Logs
- Notifications
- Event History
- Analytics

Business tables remain unpartitioned until justified.

---

# 24. Read Replicas

Future architecture

```text id="o6t5s0"
Primary

↓

Writes

↓

Read Replica 1

↓

Read Replica 2
```

Reporting workloads move to replicas.

---

# 25. Performance Monitoring

Track

- API Latency
- Query Time
- Queue Wait Time
- Cache Hit Rate
- Worker Throughput
- Memory Usage
- CPU Usage

Integrated into Platform Health.

---

# 26. Performance Budgets

| Component         | Target   |
| ----------------- | -------- |
| Login             | < 500 ms |
| Dashboard Load    | < 2 sec  |
| Marketplace       | < 500 ms |
| Billing           | < 500 ms |
| Organization List | < 500 ms |
| Health Dashboard  | < 1 sec  |

---

# 27. Future Growth Path

Current

```text id="lf92r3"
Single PostgreSQL

↓

Redis

↓

BullMQ
```

Future

```text id="mwzd6z"
Read Replicas

↓

Redis Cluster

↓

BullMQ Cluster

↓

Multiple Product Services

↓

Multi-region
```

No redesign required.

---

# 28. Load Testing

Before every major release

Run

- API Load Test
- Database Stress Test
- Queue Stress Test
- Worker Stress Test
- File Upload Test

Performance regressions block release.

---

# 29. Technology Stack

| Component       | Technology           |
| --------------- | -------------------- |
| Database        | PostgreSQL           |
| Connection Pool | PgBouncer            |
| Cache           | Redis                |
| Queue           | BullMQ               |
| Load Balancer   | Nginx                |
| CDN             | Cloudflare           |
| Monitoring      | Prometheus + Grafana |

---

# 30. Decision Register

| ID    | Decision                                                               | Status    |
| ----- | ---------------------------------------------------------------------- | --------- |
| D-351 | Horizontal scaling is preferred over vertical scaling                  | ✅ Locked |
| D-352 | Platform services remain stateless                                     | ✅ Locked |
| D-353 | PgBouncer is used for database connection pooling                      | ✅ Locked |
| D-354 | Redis accelerates reads but never stores authoritative business data   | ✅ Locked |
| D-355 | Workers execute all long-running tasks                                 | ✅ Locked |
| D-356 | Pagination is mandatory for list endpoints                             | ✅ Locked |
| D-357 | Read replicas are introduced only when required                        | ✅ Locked |
| D-358 | Database partitioning is deferred until operational metrics justify it | ✅ Locked |
| D-359 | Performance testing is part of every major release                     | ✅ Locked |
| D-360 | Architecture supports future Kubernetes auto-scaling without redesign  | ✅ Locked |

---

# 31. Relationship to the Platform

Performance and scalability are shared responsibilities across the platform.

| Platform Component      | Scalability Strategy                    |
| ----------------------- | --------------------------------------- |
| Next.js                 | Stateless horizontal scaling            |
| Platform API            | Multiple replicas behind Nginx          |
| PostgreSQL              | Indexing, pooling, future read replicas |
| Redis                   | High-speed cache                        |
| BullMQ                  | Queue-based workload distribution       |
| Workers                 | Independent horizontal scaling          |
| Storage                 | Direct object storage uploads           |
| Future Product Services | Independent deployment and scaling      |

Every new product integrated into AutoShipp must follow these same scalability principles to ensure consistent platform performance.

---

# 🚨 Major Architecture Improvement Over the Original Design

The original architecture defined the core infrastructure components but did not formalize how the platform would scale as adoption grows. This specification establishes a complete **performance engineering and capacity planning strategy**.

Major improvements include:

- **Explicit horizontal scaling model** for APIs, workers, and future product services, with PostgreSQL optimized through indexing and connection pooling rather than premature sharding.
- **Performance budgets** for APIs, dashboards, and key business workflows, making scalability measurable rather than subjective.
- **Database optimization standards**, including mandatory indexing, connection pooling with PgBouncer, query profiling, and cursor pagination for large datasets.
- **Metric-driven capacity planning**, where scaling decisions are based on queue depth, latency, throughput, CPU, memory, and cache efficiency.
- **Future growth roadmap**, defining a clear progression from a single PostgreSQL instance to read replicas, Redis clusters, BullMQ clusters, and multi-region deployments without architectural changes.
- **Release-time performance validation**, ensuring every major release undergoes API, database, queue, and worker load testing before deployment.

This document defines how AutoShipp will continue delivering low-latency, reliable performance as the platform evolves from its initial customer base to enterprise-scale workloads while preserving the architectural principles established throughout the platform specification.

---

# AES-034 — Testing, Quality Assurance & Release Validation Architecture Specification

**Document ID:** AES-034

**Title:** Testing, Quality Assurance & Release Validation Architecture

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On**

- AES-020 — Platform API
- AES-021 — Event-Driven Architecture
- AES-022 — Workers
- AES-024 — Observability
- AES-026 — Deployment
- AES-028 — Security
- AES-033 — Performance & Scalability

---

# 1. Executive Summary

Testing is a mandatory part of the AutoShipp Software Development Lifecycle (SDLC).

Every change must pass multiple validation stages before reaching production.

The testing strategy ensures

- Functional correctness
- Security
- Performance
- Reliability
- Regression prevention
- Deployment safety

No production deployment bypasses the testing pipeline.

---

# 2. Testing Pyramid

```text
                E2E Tests
                   ▲
             Integration Tests
                   ▲
              Unit Tests
```

Most tests are Unit Tests.

Fewer Integration Tests.

Only critical workflows are covered by End-to-End tests.

---

# 3. Testing Philosophy

## Principle 1

Every bug fixed receives a test.

---

## Principle 2

Every feature ships with tests.

---

## Principle 3

No manual production validation.

---

## Principle 4

Production deployments are fully automated.

---

## Principle 5

Security testing is continuous.

---

## Principle 6

Performance is tested before release.

---

# 4. Test Types

| Test Type         | Required |
| ----------------- | -------- |
| Unit Tests        | ✅       |
| Integration Tests | ✅       |
| API Tests         | ✅       |
| End-to-End Tests  | ✅       |
| Load Tests        | ✅       |
| Security Tests    | ✅       |
| Smoke Tests       | ✅       |
| Regression Tests  | ✅       |
| Migration Tests   | ✅       |

---

# 5. Unit Testing

Scope

- Services
- Utilities
- Guards
- Validators
- DTOs
- Business Logic
- Feature Flag Evaluation
- Permission Engine

Target Coverage

```text
≥ 90%
```

---

# 6. Integration Testing

Validate interactions between

- Platform API ↔ PostgreSQL
- Platform API ↔ Redis
- Platform API ↔ BullMQ
- Workers ↔ Database
- Workers ↔ BullMQ
- API ↔ Object Storage

Uses isolated test databases.

---

# 7. API Testing

Every endpoint validates

- Authentication
- Authorization
- Validation
- Response Contract
- Error Contract
- Pagination
- Filtering
- Rate Limiting

OpenAPI documentation and implementation must remain synchronized.

---

# 8. End-to-End Testing

Critical business flows include

### Authentication

```text
Login

↓

Dashboard

↓

Logout
```

---

### Marketplace Purchase

```text
Browse Product

↓

Purchase

↓

Subscription Created

↓

Access Enabled
```

---

### Aggregator Onboarding

```text
Create Aggregator

↓

Create Brand

↓

Assign Product

↓

Generate Invoice
```

---

### Wallet

```text
Top-up

↓

Payment

↓

Wallet Updated
```

---

### Brand Transfer

```text
Transfer Request

↓

Platform Approval

↓

Ownership Updated
```

---

# 9. Worker Testing

Every worker validates

- Event Consumption
- Retry Logic
- Dead Letter Queue
- Idempotency
- Failure Recovery

Workers are tested independently.

---

# 10. Event Testing

Validate

- Event Publishing
- Event Contracts
- Event Versioning
- Retry
- Duplicate Events
- DLQ Routing

Events remain backward compatible.

---

# 11. Database Testing

Validate

- Migrations
- Rollbacks
- Constraints
- Indexes
- Soft Deletes
- Transactions

Every migration is executed in CI.

---

# 12. Security Testing

Automated checks include

- Authentication
- Authorization
- SQL Injection
- XSS
- CSRF
- SSRF
- Rate Limiting
- Permission Escalation
- Multi-Tenant Isolation

Penetration testing occurs before major releases.

---

# 13. Performance Testing

Measure

- API Latency
- Database Throughput
- Worker Throughput
- Queue Processing
- Upload Performance
- Concurrent Users

Targets follow AES-033.

---

# 14. Load Testing

Simulate

- Thousands of concurrent users
- Large imports
- High notification volume
- Multiple worker queues
- Marketplace purchases

Platform must remain stable.

---

# 15. Smoke Testing

Immediately after deployment

Validate

- Platform API
- Authentication
- Database Connectivity
- Redis
- BullMQ
- Workers
- Health Endpoints

Deployment is rolled back if smoke tests fail.

---

# 16. Regression Testing

Every release validates

Previously fixed bugs

↓

Still Fixed

No regression allowed.

---

# 17. Migration Testing

Every database migration

↓

Apply

↓

Validate

↓

Rollback (where applicable)

↓

Reapply

No migration reaches production untested.

---

# 18. Multi-Tenant Testing

Verify

Platform

↓

Can access all tenants

Aggregator

↓

Cannot access another Aggregator

Brand

↓

Cannot access another Brand

Tenant isolation is validated continuously.

---

# 19. Frontend Testing

Test

- Components
- Hooks
- Forms
- Route Guards
- Layouts
- Dynamic Sidebar
- Feature Flags

Visual regression testing may be introduced later.

---

# 20. Browser Support

Validate

- Chrome
- Edge
- Firefox
- Safari

Latest stable versions.

---

# 21. Release Validation Pipeline

```text
Developer

↓

Unit Tests

↓

Integration Tests

↓

API Tests

↓

Security Scan

↓

Performance Tests

↓

Docker Build

↓

Deploy Staging

↓

Smoke Tests

↓

Manual Approval

↓

Production
```

Any failed stage blocks deployment.

---

# 22. Test Data Strategy

Test data

- Isolated
- Repeatable
- Disposable
- Seeded automatically

No production data in testing environments.

---

# 23. Mocking Strategy

Mock

- Payment Gateway
- Email
- SMS
- WhatsApp
- External Shipping APIs

Internal services are tested against real implementations whenever practical.

---

# 24. Continuous Quality Gates

CI blocks merge if

- Tests fail
- Coverage decreases below threshold
- Security vulnerabilities are critical
- Linting fails
- Type checking fails

Quality gates are mandatory.

---

# 25. Coverage Targets

| Area              | Minimum |
| ----------------- | ------- |
| Business Logic    | 90%     |
| Guards            | 100%    |
| Permission Engine | 100%    |
| Validators        | 100%    |
| Workers           | 90%     |
| Utilities         | 90%     |

Coverage is measured continuously.

---

# 26. Technology Stack

| Area            | Technology          |
| --------------- | ------------------- |
| Unit Testing    | Vitest              |
| API Testing     | Supertest           |
| Integration     | Testcontainers      |
| E2E             | Playwright          |
| Load Testing    | k6                  |
| Coverage        | V8 Coverage         |
| Static Analysis | ESLint + TypeScript |

---

# 27. Future Compatibility

Supports

- Contract Testing
- Chaos Engineering
- Mutation Testing
- Visual Regression Testing
- Canary Validation
- Multi-region Testing

without changing the testing architecture.

---

# 28. Decision Register

| ID    | Decision                                                      | Status    |
| ----- | ------------------------------------------------------------- | --------- |
| D-361 | Every feature requires automated tests                        | ✅ Locked |
| D-362 | Unit tests are the primary testing layer                      | ✅ Locked |
| D-363 | Critical business workflows require E2E coverage              | ✅ Locked |
| D-364 | Database migrations are tested in CI                          | ✅ Locked |
| D-365 | Smoke tests validate every deployment                         | ✅ Locked |
| D-366 | Multi-tenant isolation is continuously tested                 | ✅ Locked |
| D-367 | Security testing is part of the release pipeline              | ✅ Locked |
| D-368 | Load testing validates scalability targets                    | ✅ Locked |
| D-369 | Quality gates block deployments when requirements are not met | ✅ Locked |
| D-370 | No production deployment bypasses automated validation        | ✅ Locked |

---

# 29. Release Readiness Checklist

A release is considered production-ready only if all of the following pass successfully.

## Code Quality

- ✅ ESLint passes
- ✅ TypeScript compilation succeeds
- ✅ No critical code smells
- ✅ Code review approved

---

## Automated Testing

- ✅ Unit Tests
- ✅ Integration Tests
- ✅ API Tests
- ✅ Worker Tests
- ✅ End-to-End Tests
- ✅ Regression Tests

---

## Security

- ✅ Dependency Scan
- ✅ Secret Scan
- ✅ OWASP Validation
- ✅ Multi-Tenant Isolation Tests
- ✅ Authentication Tests
- ✅ Authorization Tests

---

## Database

- ✅ Migration Tested
- ✅ Rollback Verified
- ✅ Index Validation
- ✅ No Breaking Schema Changes

---

## Performance

- ✅ Load Tests
- ✅ Response Time Within SLA
- ✅ Worker Throughput Validated
- ✅ Queue Performance Validated

---

## Deployment

- ✅ Docker Image Built
- ✅ Health Endpoints Pass
- ✅ Smoke Tests Pass
- ✅ Observability Enabled
- ✅ Version Tagged

Only after every item is complete may the deployment proceed to production.

---

# 30. Relationship to the Platform

Testing is integrated into every platform layer.

| Platform Component      | Validation Strategy                      |
| ----------------------- | ---------------------------------------- |
| Platform API            | Unit, Integration, API Tests             |
| PostgreSQL              | Migration & Constraint Tests             |
| BullMQ                  | Event & Worker Tests                     |
| Redis                   | Cache & Lock Validation                  |
| Workers                 | Retry, DLQ & Idempotency Tests           |
| Next.js                 | Component & E2E Tests                    |
| Security                | Automated Security Tests                 |
| Future Product Services | Must adopt the same testing architecture |

Every new AutoShipp product must conform to this testing standard before it can be integrated into the platform.

---

# 🚨 Major Architecture Improvement Over the Original Design

The original architecture emphasized development practices but did not define a formal quality assurance strategy. This specification establishes **Testing as an architectural capability**, ensuring quality is enforced consistently across development, deployment, and operations.

Major improvements include:

- **A complete testing pyramid**, balancing unit, integration, API, and end-to-end testing to maximize reliability while keeping feedback fast.
- **A mandatory release validation pipeline**, where automated tests, security scans, migration checks, performance benchmarks, and smoke tests act as production gates.
- **Comprehensive multi-tenant validation**, ensuring Platform, Aggregator, and Brand isolation is continuously verified as part of automated testing.
- **Worker, event, and database migration testing**, recognizing asynchronous processing and schema evolution as first-class architectural concerns.
- **Explicit release readiness criteria**, providing a single checklist that engineering teams must satisfy before deployment.
- **Future-proof extensibility**, allowing contract testing, chaos engineering, mutation testing, and visual regression testing to be introduced without changing the overall testing strategy.

This document completes the quality assurance architecture for AutoShipp, ensuring that every release meets consistent standards for correctness, security, performance, and operational reliability before reaching production.

---

# AES-035 — Master Architecture Summary & Final Architecture Decision Record

**Document ID:** AES-035

**Title:** Master Architecture Summary & Final Architecture Decision Record

**Version:** 1.0.0

**Status:** FINAL

**Owner:** AutoShipp Platform

---

# 1. Executive Summary

This document serves as the **single source of truth** for the AutoShipp Platform Architecture.

It consolidates every architectural decision made throughout the design process and defines the long-term direction of the platform.

After approval of this document:

- Architecture is considered stable.
- New features must follow these standards.
- Future products must integrate using this architecture.
- Deviations require a new Architecture Decision Record (ADR).

---

# 2. Platform Vision

AutoShipp is a **multi-tenant SaaS platform** that enables organizations to purchase, subscribe to, and manage multiple logistics-related products from a unified platform.

The platform itself is **product-independent**.

Products such as:

- Fit Intelligence
- Delivery ETA
- Returns
- AI Assistant
- Future Products

are consumers of the platform rather than owners of it.

---

# 3. Final Platform Architecture

```text
                         AutoShipp Platform

                              Next.js

                                 │

                          Platform API

                                 │

                ┌────────────────┼────────────────┐

                │                │                │

             PostgreSQL       BullMQ        Redis

                │                │                │

                └────────────────┼────────────────┘

                                 │

                      Background Workers

                                 │

                 S3 Compatible Object Storage

                                 │

                    Future Product Services
```

---

# 4. Final Architectural Principles

The following principles are permanently adopted.

### Platform First

All shared functionality belongs to the Platform.

---

### Product Independent

Products remain independently deployable.

---

### Shared Infrastructure

Products reuse Platform infrastructure whenever possible.

---

### One Database

One PostgreSQL database.

Multiple schemas.

---

### Strict Ownership

Every schema has exactly one owner.

---

### Event Driven

Long-running work is asynchronous.

---

### API First

Cross-product communication happens through APIs.

Never through direct schema writes.

---

### Marketplace Driven

Products are enabled through Marketplace assignments.

---

### Tenant Aware

Everything belongs to an Organization.

---

### Security First

Every request passes through authentication and authorization.

---

### Observability Built-in

Every service is observable.

---

### Cloud Native

Everything is containerized.

---

# 5. Final Technology Stack

| Layer              | Technology             |
| ------------------ | ---------------------- |
| Frontend           | Next.js 16             |
| Backend            | NestJS                 |
| ORM                | Prisma                 |
| Database           | PostgreSQL (Neon)      |
| Cache              | Redis                  |
| Queue              | BullMQ                 |
| Storage            | S3 Compatible Storage  |
| Authentication     | JWT + HttpOnly Cookies |
| Validation         | Zod + class-validator  |
| Documentation      | OpenAPI                |
| Monitoring         | Prometheus             |
| Dashboards         | Grafana                |
| Tracing            | OpenTelemetry          |
| Logging            | Pino                   |
| Exception Tracking | Sentry                 |
| CI/CD              | GitHub Actions         |
| Containers         | Docker                 |
| Reverse Proxy      | Nginx                  |
| CDN                | Cloudflare             |

---

# 6. Locked Architectural Decisions

## Database

✅ One PostgreSQL Database

✅ Multiple Schemas

✅ One Prisma Client per Service

✅ Schema Ownership

✅ Shared Platform Data

---

## Authentication

✅ JWT

✅ HttpOnly Cookies

✅ RBAC

✅ Permission Guards

---

## Multi-Tenancy

✅ Platform

✅ Aggregator

✅ Brand

Hierarchy supported.

---

## Billing

Aggregator receives

One Invoice

↓

Per Brand Breakdown

↓

Per Product Breakdown

Exactly as decided.

---

## Marketplace

Products

↓

Organizations

↓

Subscriptions

↓

Feature Access

---

## Workers

Independent

Stateless

Queue Driven

---

## Events

BullMQ

Topic Exchanges

Dead Letter Queues

Retries

---

## Storage

S3 Compatible

Metadata in PostgreSQL

---

## Health

Central Health Aggregator

---

## Observability

Logs

Metrics

Tracing

Audit

---

## Redis

Cache

Rate Limiting

Distributed Locks

Never business data.

---

## Security

OWASP

Defense in Depth

Least Privilege

Zero Trust

---

## Deployment

Docker

GitHub Actions

Zero Downtime

---

## Testing

Mandatory

Before Production

---

# 7. Product Integration Rules

Every future product must follow:

- Own deployment
- Own schema (when migrated)
- Own Prisma client
- Own workers (if required)
- Own health endpoint
- Own observability
- Own versioning

Products reuse

- Authentication
- Organizations
- Billing
- Marketplace
- Wallet
- Notifications
- Storage
- Feature Flags

---

# 8. Platform Services

Current Platform includes

- Identity
- Organizations
- Marketplace
- Commerce
- Customers
- Billing
- Wallet
- Integrations
- Notifications
- Audit
- Runtime Configuration
- Feature Flags
- Health
- Monitoring
- Storage

---

# 9. Future Product Architecture

Future products become

```text
Platform

↓

Marketplace

↓

Product Assignment

↓

API

↓

Workers

↓

Own Schema
```

Migration occurs only when required.

---

# 10. Security Baseline

Platform follows

- OWASP Top 10
- OWASP ASVS
- JWT Authentication
- RBAC
- Multi-Tenant Isolation
- Audit Logging
- CSP
- TLS
- Rate Limiting
- Secure Headers
- Secret Management

---

# 11. Performance Baseline

Platform targets

| Metric           | Target  |
| ---------------- | ------- |
| API Response     | <200 ms |
| Dashboard        | <2 sec  |
| Health           | <1 sec  |
| Queue Processing | <2 sec  |
| Cache            | <2 ms   |

---

# 12. Scalability Roadmap

Current

```text
Single PostgreSQL
Single Redis
Single BullMQ
```

Future

```text
Read Replicas

↓

Redis Cluster

↓

BullMQ Cluster

↓

Multiple Product Services

↓

Multi Region
```

Architecture remains unchanged.

---

# 13. Disaster Recovery

Supported

- PITR
- Full Restore
- Backup Encryption
- Restore Verification
- Infrastructure Rebuild

Target

RPO

≤15 min

RTO

≤1 hour

---

# 14. Development Standards

Every PR requires

- Tests
- Code Review
- Type Check
- Lint
- Security Scan
- Migration Validation
- Documentation Update

---

# 15. Complete Document Index

## Foundation

- AES-001 — Architecture Vision
- AES-002 — Business Context
- AES-003 — Product Strategy
- AES-004 — Domain Model
- AES-005 — Identity & Users
- AES-006 — Authorization
- AES-007 — Platform Services
- AES-008 — Database Blueprint

---

## Platform Core

- AES-009 — Identity
- AES-010 — Organizations
- AES-011 — Commerce
- AES-012 — Marketplace
- AES-013 — Billing
- AES-014 — Wallet
- AES-015 — Integrations
- AES-016 — Notifications
- AES-017 — Audit
- AES-018 — Runtime Configuration
- AES-019 — Feature Flags

---

## Platform Infrastructure

- AES-020 — Platform API
- AES-021 — Event Architecture
- AES-022 — Worker Architecture
- AES-023 — Health & Monitoring
- AES-024 — Observability
- AES-025 — Storage
- AES-026 — Deployment
- AES-027 — Redis
- AES-028 — Security
- AES-029 — Multi-Tenant
- AES-030 — Frontend
- AES-031 — Disaster Recovery
- AES-032 — Database Governance
- AES-033 — Performance & Scalability
- AES-034 — Testing & Quality Assurance
- **AES-035 — Master Architecture Summary (this document)**
- AES-044 — Platform Super Admin & Organization Service Governance Specification

---

# 16. Final Architecture Decision Register

The following architectural decisions are now **permanently locked**.

| Area              | Final Decision                          |
| ----------------- | --------------------------------------- |
| Frontend          | Next.js 16                              |
| Backend           | NestJS                                  |
| Database          | One PostgreSQL                          |
| Database Strategy | Multi-schema                            |
| ORM               | Prisma                                  |
| Event Bus         | BullMQ                                  |
| Cache             | Redis                                   |
| Storage           | S3 Compatible                           |
| Authentication    | JWT + HttpOnly Cookies                  |
| Authorization     | RBAC                                    |
| Billing           | Aggregator Invoice with Brand Breakdown |
| Marketplace       | Organization-based                      |
| Deployment        | Docker                                  |
| CI/CD             | GitHub Actions                          |
| Observability     | OpenTelemetry + Grafana + Prometheus    |
| Logging           | Pino                                    |
| Monitoring        | Platform Health Aggregator              |
| Security          | OWASP ASVS                              |
| Testing           | Automated Mandatory                     |

---

# 17. Platform Maturity

With AES-035 complete, the AutoShipp platform architecture is now fully specified.

The documentation covers:

- ✅ Business Architecture
- ✅ Domain Architecture
- ✅ Identity & RBAC
- ✅ Multi-Tenancy
- ✅ Marketplace & Billing
- ✅ Wallet & Payments
- ✅ Integrations
- ✅ Notifications
- ✅ Audit & Compliance
- ✅ Runtime Configuration
- ✅ Feature Flags
- ✅ Platform API
- ✅ Event-Driven Processing
- ✅ Background Workers
- ✅ Health Monitoring
- ✅ Logging & Observability
- ✅ Storage
- ✅ Deployment & DevOps
- ✅ Redis & Caching
- ✅ Security
- ✅ Frontend Architecture
- ✅ Disaster Recovery
- ✅ Database Governance
- ✅ Performance & Scalability
- ✅ Testing & QA

---

# 18. Final Confirmation

**Yes, AES-035 is the final document for the AutoShipp platform architecture.**

The architecture is now complete and is sufficient for a development team to begin implementation of the platform. Future documentation will primarily consist of implementation-focused artifacts rather than architectural specifications, such as:

- API Specifications (OpenAPI)
- Database Schema Reference
- Prisma Models
- Event Catalog
- UI/UX Design System
- Frontend Component Library
- Infrastructure (Terraform/Docker/Kubernetes)
- CI/CD Pipelines
- Coding Standards
- Developer Handbook
- Operations Runbooks
- Product-specific design documents (Fit, ETA, Returns, AI, etc.)

These are implementation documents built **on top of** the architecture—not extensions of it.

## Final assessment

After reviewing the complete set of specifications, **AES-035 is the correct stopping point for the AutoShipp architecture phase**. From this point onward, the work transitions from **architecture design** to **engineering design and implementation**. The platform architecture is internally consistent, aligns with the major decisions you locked throughout our discussions (single PostgreSQL with multiple schemas, strict schema ownership, platform-first shared services, aggregator billing model, future product migration strategy, and independent product deployments), and provides a solid foundation for implementation.

---

# AES-036 — Transactional Outbox Specification

**Document ID:** AES-036

**Title:** Transactional Outbox Specification

**Version:** 1.0.0

**Status:** Approved

**Schema Owner:** Platform API

**Prisma Package:** `prisma-platform`

**Database Schema:** `platform`

**Depends On:**

- AES-008 — Master Database Blueprint
- AES-020 — Platform API Architecture
- AES-021 — Event-Driven Architecture
- AES-022 — Background Workers

**Supersedes / Amends:** AES-021 (Section 16 — Transactional Outbox Pattern)

---

# 1. Executive Summary

AES-021 specified the Transactional Outbox Pattern as the required event publishing mechanism.

That document described the intent but **did not define the implementation**.

This document closes that gap completely.

The Transactional Outbox Pattern is the single most important reliability mechanism in the AutoShipp event system.

Without it:

```text
Business Transaction Commits

↓

Application Publishes to BullMQ

↓

BullMQ Fails

↓

Event Lost Permanently
```

With it:

```text
Business Transaction + Outbox Record (atomic)

↓

Transaction Commits

↓

Outbox Publisher reads and publishes

↓

BullMQ Job Created (Job ID Returned)

↓

Outbox Record Marked Published
```

Events are **never lost**, even under application crashes, network failures, or broker restarts.

---

# 2. The Problem Without the Outbox

Every event-driven system faces the **Dual Write Problem**:

A service must atomically:

1. Update business state (database)
2. Notify other services (message broker)

These are two separate systems.

There is no distributed transaction between PostgreSQL and BullMQ.

Without the outbox:

| Scenario                    | Outcome                           |
| --------------------------- | --------------------------------- |
| DB commits, BullMQ succeeds | ✅ Correct                        |
| DB commits, BullMQ fails    | ❌ Event Lost                     |
| DB fails, BullMQ succeeds   | ❌ Ghost Event (no business data) |
| DB fails, BullMQ fails      | ✅ Correct (both failed)          |

The outbox eliminates all failure cases except the last (which is already correct).

---

# 3. Architecture

```text
Platform API

↓

Begin DB Transaction

↓

Business Logic (INSERT/UPDATE)

↓

INSERT into platform.outbox_events (same transaction)

↓

COMMIT

↓

(API returns 200)

---

Outbox Publisher (background process)

↓

SELECT unpublished outbox records

↓

Publish to BullMQ

↓

BullMQ ACK received

↓

Mark outbox record as published

↓

(delete or archive after retention window)
```

The business write and the outbox write are **one atomic transaction**.

The publish is a separate, independently retried operation.

---

# 4. Outbox Table Specification

**Schema:** `platform`

**Table:** `outbox_events`

---

## Columns

| Column       | Type        | Notes                                         |
| ------------ | ----------- | --------------------------------------------- |
| id           | UUID        | PK, default gen_random_uuid()                 |
| event_id     | UUID        | Unique, matches eventId in event envelope     |
| event_name   | TEXT        | e.g. `billing.invoice.paid`                   |
| payload      | JSONB       | Full event envelope (see AES-021 Section 7)   |
| published    | BOOLEAN     | Default FALSE                                 |
| attempts     | INTEGER     | Default 0                                     |
| last_error   | TEXT        | Nullable, last failure reason                 |
| created_at   | TIMESTAMPTZ | Default now()                                 |
| published_at | TIMESTAMPTZ | Nullable, set when published                  |
| scheduled_at | TIMESTAMPTZ | Default now(), allows future-dated publishing |

---

## Constraints

```sql
PRIMARY KEY (id)

UNIQUE (event_id)
```

The `UNIQUE(event_id)` constraint prevents duplicate outbox entries for the same logical event. This is the first layer of idempotency protection.

---

## Indexes

```sql
idx_outbox_unpublished
  ON platform.outbox_events (created_at ASC)
  WHERE published = FALSE

idx_outbox_event_id
  ON platform.outbox_events (event_id)
```

The partial index on `published = FALSE` ensures the publisher query is extremely fast even with millions of archived published records.

---

## Full SQL Definition

```sql
CREATE TABLE platform.outbox_events (
    id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id      UUID        NOT NULL,
    event_name    TEXT        NOT NULL,
    payload       JSONB       NOT NULL,
    published     BOOLEAN     NOT NULL DEFAULT FALSE,
    attempts      INTEGER     NOT NULL DEFAULT 0,
    last_error    TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    published_at  TIMESTAMPTZ,
    scheduled_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_outbox_event_id UNIQUE (event_id)
);

CREATE INDEX idx_outbox_unpublished
    ON platform.outbox_events (created_at ASC)
    WHERE published = FALSE;

CREATE INDEX idx_outbox_event_id
    ON platform.outbox_events (event_id);
```

---

# 5. How Business Services Write to the Outbox

**Rule:** Business logic and outbox insert must be inside the same database transaction. Never insert to the outbox outside a transaction.

```typescript
// Example: Platform API — Organization Created
async createOrganization(dto: CreateOrganizationDto): Promise<Organization> {
  return this.prisma.$transaction(async (tx) => {

    // 1. Business write
    const org = await tx.organization.create({ data: dto });

    // 2. Outbox write (same transaction)
    await tx.outboxEvent.create({
      data: {
        eventId: generateEventId(),
        eventName: 'organization.created',
        payload: {
          eventId: generateEventId(),
          eventName: 'organization.created',
          version: 1,
          occurredAt: new Date().toISOString(),
          correlationId: getCurrentCorrelationId(),
          organizationId: org.id,
          source: 'platform-api',
          payload: {
            organizationId: org.id,
            organizationType: org.type,
            createdBy: dto.createdBy,
          },
        },
      },
    });

    return org;
  });
}
```

The transaction either commits both writes or commits neither.

There is no intermediate state.

---

# 6. Outbox Publisher Service

The Outbox Publisher is a lightweight background process that runs continuously inside the Platform API process (or as an independent worker).

## Publisher Algorithm

```text
Loop (every 500ms):

  1. BEGIN TRANSACTION

  2. SELECT id, event_id, event_name, payload
     FROM platform.outbox_events
     WHERE published = FALSE
       AND scheduled_at <= NOW()
       AND attempts < 5
     ORDER BY created_at ASC
     LIMIT 50
     FOR UPDATE SKIP LOCKED

  3. For each record:
     - Add Job to BullMQ Queue (e.g. queue:billing)
     - If Job ID received:
         UPDATE outbox_events SET published = TRUE, published_at = NOW()
     - If Error or timeout:
         UPDATE outbox_events SET attempts = attempts + 1, last_error = '<reason>'

  4. COMMIT
```

`FOR UPDATE SKIP LOCKED` is critical for horizontal scaling.

If multiple publisher instances run simultaneously, each picks a different set of records with no contention.

---

## Publisher Configuration

| Setting         | Default               | Notes                              |
| --------------- | --------------------- | ---------------------------------- |
| Poll interval   | 500ms                 | Configurable via AES-019           |
| Batch size      | 50 records            | Prevents memory pressure           |
| Max attempts    | 5                     | After 5, treated as poison message |
| Publish timeout | 5 seconds per message | Redis add timeout                  |

---

# 7. Retry Strategy

| Attempt | Action                               |
| ------- | ------------------------------------ |
| 1       | Immediate retry on next poll cycle   |
| 2       | Retry on next poll cycle             |
| 3       | Retry on next poll cycle             |
| 4       | Retry on next poll cycle             |
| 5       | Mark as poison, alert, stop retrying |

Unlike AES-022 (which uses time-based exponential backoff for BullMQ consumers), the outbox uses **attempt-based polling** because the publisher already has a natural delay between poll cycles.

If the broker is down for 10 minutes, records accumulate naturally and are published in batches once the broker recovers.

---

# 8. Poison Message Handling

When `attempts >= 5`:

```text
outbox_events.published remains FALSE

outbox_events.attempts = 5

outbox_events.last_error = 'Max attempts exceeded: <last error>'
```

The platform health dashboard shows an alert:

```text
⚠️ Outbox Poison Messages: 3
```

Operations can investigate and manually republish or discard.

**Poison messages never block non-poison messages** because the query filters `attempts < 5`.

---

# 9. Idempotency Chain

The outbox provides the first layer of idempotency.

```text
Outbox Layer:
  UNIQUE(event_id) prevents duplicate outbox entries

BullMQ Layer:
  BullMQ internal deduplication (Job ID)

Consumer Layer:
  AES-021 Section 14 — consumers track processed event IDs
```

Three independent idempotency layers ensure at-most-once business effects even under at-least-once delivery.

---

# 10. Cleanup and Archival

Published outbox records are retained for 7 days, then deleted by the Cleanup Worker.

| State                              | Retention               | Action                    |
| ---------------------------------- | ----------------------- | ------------------------- |
| `published = TRUE`                 | 7 days                  | Deleted by Cleanup Worker |
| `published = FALSE, attempts < 5`  | Forever until published | Retried continuously      |
| `published = FALSE, attempts >= 5` | Until manually reviewed | Alert + manual action     |

**Cleanup Worker query:**

```sql
DELETE FROM platform.outbox_events
WHERE published = TRUE
  AND published_at < NOW() - INTERVAL '7 days';
```

Run daily at 03:00.

---

# 11. Monitoring

Track via Platform Health (AES-023):

| Metric                                | Alert Threshold |
| ------------------------------------- | --------------- |
| Unpublished records older than 60s    | 🟡 Warning      |
| Unpublished records older than 5min   | 🔴 Critical     |
| Poison messages count > 0             | 🟡 Warning      |
| Publisher poll errors > 3 consecutive | 🔴 Critical     |
| Average publish latency > 2s          | 🟡 Warning      |

---

# 12. Outbox Event Envelope

Every payload stored in the outbox follows the standard event envelope from AES-021 Section 7.

```json
{
  "eventId": "uuid",
  "eventName": "billing.invoice.paid",
  "version": 1,
  "occurredAt": "2026-07-01T10:00:00Z",
  "correlationId": "uuid",
  "organizationId": "uuid",
  "actorId": "uuid",
  "source": "platform-api",
  "payload": {}
}
```

No event format outside this envelope is stored in the outbox.

---

# 13. Read / Write Matrix

| Component               | Read | Write                      |
| ----------------------- | ---- | -------------------------- |
| Platform API            | ✅   | ✅ (via transaction)       |
| Outbox Publisher        | ✅   | ✅ (update published flag) |
| Cleanup Worker          | ✅   | ✅ (delete archived)       |
| Product Services        | ❌   | ❌                         |
| Workers (non-publisher) | ❌   | ❌                         |

The outbox is exclusively owned by the Platform API and its publisher.

---

# 14. Horizontal Scaling

The `FOR UPDATE SKIP LOCKED` pattern enables N publisher instances to run simultaneously without conflict.

Each instance picks a disjoint set of records.

No coordination protocol is needed.

Recommended publisher instances by environment:

| Environment | Instances |
| ----------- | --------- |
| Development | 1         |
| Staging     | 1         |
| Production  | 2–3       |

---

# 15. Future Compatibility

This design supports:

- Multiple Platform API replicas
- Horizontal publisher scaling
- Future product services publishing to their own outbox tables
- Schema-level partitioning of outbox by `created_at` if volume warrants

---

# 16. Implementation Checklist

- [ ] Create `platform.outbox_events` table via Prisma migration
- [ ] Add Prisma model `OutboxEvent` to `prisma-platform`
- [ ] Implement `OutboxService.insert(eventName, payload, tx)` helper
- [ ] Wrap every business mutation that produces events with outbox insert
- [ ] Implement `OutboxPublisherService` with polling loop
- [ ] Implement `OutboxCleanupWorker` in `worker-cleanup`
- [ ] Add outbox metrics to Platform Health dashboard
- [ ] Document all events that use the outbox in the Event Catalog

---

# 17. Decision Register

| ID    | Decision                                                            | Status    |
| ----- | ------------------------------------------------------------------- | --------- |
| D-361 | All platform events are published via the Transactional Outbox      | ✅ Locked |
| D-362 | Outbox insert and business write are always in the same transaction | ✅ Locked |
| D-363 | FOR UPDATE SKIP LOCKED enables horizontal publisher scaling         | ✅ Locked |
| D-364 | After 5 attempts, messages are classified as poison and alerted     | ✅ Locked |
| D-365 | Published records are retained 7 days then deleted                  | ✅ Locked |
| D-366 | Outbox is owned exclusively by the Platform API                     | ✅ Locked |
| D-367 | Events are never published directly from business transactions      | ✅ Locked |
| D-368 | UNIQUE(event_id) is the first idempotency layer                     | ✅ Locked |
| D-369 | Publisher poll interval is 500ms by default                         | ✅ Locked |
| D-370 | Outbox monitoring alerts are part of Platform Health                | ✅ Locked |

---

# AES-037 — Subscription Lifecycle & Access Revocation Specification

**Document ID:** AES-037

**Title:** Subscription Lifecycle & Access Revocation Specification

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On:**

- AES-012 — Marketplace Schema
- AES-013 — Billing Schema
- AES-014 — Wallet Schema
- AES-021 — Event-Driven Architecture
- AES-022 — Background Workers
- AES-036 — Transactional Outbox

---

# 1. Executive Summary

AES-013 (Billing) and AES-012 (Marketplace) deliberately separated commercial events from runtime access.

This is correct.

However, no document defined **who bridges the two** when a subscription expires, a payment fails, or an organization is suspended.

Without this bridge, two failure modes emerge:

**Mode A — Access is never revoked**

```text
Invoice overdue → No one reacts → Brand uses platform for free indefinitely
```

**Mode B — Access is revoked inside a billing transaction**

```text
Payment fails → Billing service revokes assignment directly
→ Tight coupling between Billing and Marketplace (violates architecture)
```

This document defines the correct bridge: a **Subscription Lifecycle Worker** that listens to billing events and orchestrates access changes through well-defined state transitions.

---

# 2. Core Design Principle

```text
Billing emits facts.

Lifecycle Worker reacts.

Marketplace records state.

Access is derived from Marketplace state.
```

Billing never directly modifies Marketplace data.

Marketplace never reads billing status to determine access.

The Lifecycle Worker is the **exclusive bridge** between them.

---

# 3. Subscription Lifecycle State Machine

```text
ACTIVE

↓ (payment fails)

PAST_DUE

↓ (grace period expires without payment)

GRACE_PERIOD

↓ (7 days elapse without payment)

SUSPENDED

↓ (organization resolves payment)

ACTIVE (restored)

OR

↓ (organization explicitly cancels)

CANCELLED

↓ (data retention period expires)

ARCHIVED
```

---

## State Definitions

| State        | Access    | Invoices         | Notifications             |
| ------------ | --------- | ---------------- | ------------------------- |
| ACTIVE       | ✅ Full   | Issued normally  | None                      |
| PAST_DUE     | ✅ Full   | Overdue reminder | Day 0, Day 3              |
| GRACE_PERIOD | ✅ Full   | Final warning    | Day 1, Day 3, Day 6       |
| SUSPENDED    | ❌ Locked | Overdue          | Daily until resolved      |
| CANCELLED    | ❌ Locked | Final invoice    | Cancellation confirmation |
| ARCHIVED     | ❌ Locked | None             | None                      |

---

# 4. Events and Triggers

## Event Chain — Payment Failure

```text
Razorpay / Payment Gateway

↓

payment.failed event

↓

Billing Worker

↓

subscription.status → PAST_DUE

↓

Outbox: billing.subscription.past_due

↓

Lifecycle Worker

↓

Grace period timer started
```

---

## Event Chain — Grace Period Expiry

```text
Scheduler Worker (daily check)

↓

subscription.grace_period_deadline reached

↓

Outbox: billing.subscription.grace_period_expired

↓

Lifecycle Worker

↓

product_assignments.active = FALSE

↓

Outbox: marketplace.product.access_suspended

↓

Notification Worker (suspension notice)
```

---

## Event Chain — Payment Restored

```text
Payment received (Razorpay webhook)

↓

Billing Worker

↓

subscription.status → ACTIVE

↓

Outbox: billing.subscription.restored

↓

Lifecycle Worker

↓

product_assignments.active = TRUE

↓

Outbox: marketplace.product.access_restored

↓

Notification Worker (restoration notice)
```

---

# 5. Grace Period Policy

## Default Grace Period

```text
7 calendar days
```

After the initial payment failure, the organization retains full platform access for 7 days while attempts are made to collect payment.

## Grace Period Behaviour

| Day         | Event         | Access       | Notification                      |
| ----------- | ------------- | ------------ | --------------------------------- |
| 0 (failure) | Payment fails | ✅ Full      | Email: "Payment failed"           |
| 3           | Reminder      | ✅ Full      | Email: "Payment overdue"          |
| 6           | Final warning | ✅ Full      | Email: "Access suspends tomorrow" |
| 7           | Grace expires | ❌ Suspended | Email: "Access suspended"         |

## Grace Period Overrides

Grace periods can be configured per organization via the `billing.billing_metadata` JSONB field:

```json
{
  "grace_period_days": 14,
  "grace_period_override_reason": "Enterprise contract"
}
```

Platform OWNER role required to set overrides.

---

# 6. Lifecycle Worker Specification

## Worker Name

```text
worker-lifecycle
```

## Consumed Events

| Event                                       | Action                          |
| ------------------------------------------- | ------------------------------- |
| `billing.subscription.past_due`             | Start grace period timer        |
| `billing.subscription.grace_period_expired` | Suspend product assignments     |
| `billing.subscription.restored`             | Restore product assignments     |
| `billing.subscription.cancelled`            | Cancel product assignments      |
| `organization.suspended`                    | Suspend all product assignments |
| `organization.restored`                     | Restore all product assignments |

---

## Suspension Flow (Database Operations)

```sql
-- When grace period expires, suspend all assignments for the organization
UPDATE marketplace.product_assignments
SET    active = FALSE,
       suspended_at = NOW(),
       suspension_reason = 'SUBSCRIPTION_EXPIRED'
WHERE  organization_id = :organizationId
  AND  active = TRUE;

-- Record the lifecycle event
INSERT INTO billing.billing_events (subscription_id, event_type, metadata, occurred_at)
VALUES (:subscriptionId, 'ACCESS_SUSPENDED', :metadata, NOW());
```

---

## Restoration Flow (Database Operations)

```sql
-- When payment is received, restore assignments that were suspended by billing
UPDATE marketplace.product_assignments
SET    active = TRUE,
       suspended_at = NULL,
       suspension_reason = NULL
WHERE  organization_id = :organizationId
  AND  suspension_reason = 'SUBSCRIPTION_EXPIRED';

-- Record the lifecycle event
INSERT INTO billing.billing_events (subscription_id, event_type, metadata, occurred_at)
VALUES (:subscriptionId, 'ACCESS_RESTORED', :metadata, NOW());
```

---

# 7. Required Schema Amendments

## marketplace.product_assignments — New Columns

```sql
ALTER TABLE marketplace.product_assignments
    ADD COLUMN suspended_at        TIMESTAMPTZ,
    ADD COLUMN suspension_reason   TEXT;
```

`suspension_reason` values:

```text
SUBSCRIPTION_EXPIRED
ORGANIZATION_SUSPENDED
MANUAL_ADMIN_ACTION
TRIAL_ENDED
```

This distinguishes billing-driven suspension from admin-driven suspension.

When an organization resolves their billing, only `SUBSCRIPTION_EXPIRED` suspensions are automatically restored. `MANUAL_ADMIN_ACTION` suspensions require explicit Platform admin restoration.

---

## billing.subscriptions — Grace Period Fields

```sql
ALTER TABLE billing.subscriptions
    ADD COLUMN grace_period_starts_at  TIMESTAMPTZ,
    ADD COLUMN grace_period_ends_at    TIMESTAMPTZ;
```

---

# 8. Scheduler Integration

The Scheduler Worker (AES-022) runs a daily job to detect grace period expirations:

```text
BullMQ Job Scheduler: 0 6 * * *   (06:00 daily)

Job: lifecycle.check_expired_grace_periods

↓

SELECT * FROM billing.subscriptions
WHERE status = 'GRACE_PERIOD'
  AND grace_period_ends_at < NOW()

↓

For each expired:
  Emit billing.subscription.grace_period_expired
  (via Outbox)
```

---

# 9. In-Flight AI Job Handling During Suspension

When an organization is suspended mid-operation:

```text
AI Request → Credits Reserved → Suspension Event Arrives
```

**Policy:**

- Reservations made before suspension are honoured and committed.
- No new reservations are created after suspension is applied.
- The suspension check occurs at reservation time, not at execution time.

Implementation in the Wallet Service:

```typescript
async reserveCredits(walletId, amount, referenceId) {
  // Check suspension before creating reservation
  const assignment = await this.marketplace.getActiveAssignment(walletId.organizationId, 'assistant');
  if (!assignment || !assignment.active) {
    throw new ForbiddenException('AI access is currently suspended');
  }

  // Proceed with reservation
  return this.createReservation(walletId, amount, referenceId);
}
```

---

# 10. Notification Templates

| Trigger                  | Template                           | Channel        |
| ------------------------ | ---------------------------------- | -------------- |
| Payment failed (Day 0)   | `billing.payment_failed`           | Email          |
| Overdue reminder (Day 3) | `billing.payment_overdue_reminder` | Email          |
| Final warning (Day 6)    | `billing.suspension_warning`       | Email + In-App |
| Access suspended         | `billing.access_suspended`         | Email + In-App |
| Payment restored         | `billing.access_restored`          | Email + In-App |
| Subscription cancelled   | `billing.subscription_cancelled`   | Email          |

All notification templates follow AES-016 (Notification Schema).

---

# 11. Idempotency

The Lifecycle Worker must be idempotent.

Receiving `billing.subscription.grace_period_expired` twice must not result in double-suspension.

Implementation:

```sql
-- Safe idempotent suspension
UPDATE marketplace.product_assignments
SET    active = FALSE, suspended_at = NOW(), suspension_reason = 'SUBSCRIPTION_EXPIRED'
WHERE  organization_id = :organizationId
  AND  active = TRUE
  AND  suspension_reason IS NULL;

-- If 0 rows affected, already suspended — safe to ignore
```

---

# 12. Audit Requirements

Every lifecycle state change is recorded in `audit.logs`:

| Action                              | Severity |
| ----------------------------------- | -------- |
| `subscription.past_due`             | INFO     |
| `subscription.grace_period_started` | INFO     |
| `subscription.access_suspended`     | HIGH     |
| `subscription.access_restored`      | HIGH     |
| `subscription.cancelled`            | HIGH     |

---

# 13. Platform Admin Override

Platform OWNER and MANAGER roles can:

- Manually extend grace periods
- Manually suspend any organization's access
- Manually restore any organization's access
- View full subscription lifecycle history

All manual actions are audit-logged.

---

# 14. Decision Register

| ID    | Decision                                                                     | Status    |
| ----- | ---------------------------------------------------------------------------- | --------- |
| D-371 | Lifecycle Worker is the exclusive bridge between Billing and Marketplace     | ✅ Locked |
| D-372 | Default grace period is 7 calendar days after first payment failure          | ✅ Locked |
| D-373 | Billing never directly modifies Marketplace data                             | ✅ Locked |
| D-374 | Marketplace never reads billing status to determine access                   | ✅ Locked |
| D-375 | Suspension is recorded with a reason to distinguish billing vs admin actions | ✅ Locked |
| D-376 | Only SUBSCRIPTION_EXPIRED suspensions are auto-restored on payment           | ✅ Locked |
| D-377 | AI reservations made before suspension are honoured; new ones are blocked    | ✅ Locked |
| D-378 | Grace period overrides are stored in billing_metadata                        | ✅ Locked |
| D-379 | All lifecycle events are published via the Transactional Outbox (AES-036)    | ✅ Locked |
| D-380 | Lifecycle Worker operations are idempotent                                   | ✅ Locked |

---

# AES-038 — Synchronization & Conflict Resolution Specification

**Document ID:** AES-038

**Title:** Synchronization & Conflict Resolution Specification

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On:**

- AES-011 — Commerce Schema
- AES-015 — Integration Schema
- AES-021 — Event-Driven Architecture
- AES-022 — Background Workers
- AES-036 — Transactional Outbox

---

# 1. Executive Summary

AES-011 defined the Commerce Schema and the Commerce Sync Service as the single pipeline for importing external commerce data.

That document established **what** is synchronized and **where** it is stored.

It did not define **what happens when two writes conflict**.

This document closes that gap.

Without conflict resolution, a platform processing 100K+ stores faces:

- Stale Shopify webhooks overwriting newer manual corrections
- Concurrent sync jobs producing inconsistent product state
- Two platform processes writing the same order simultaneously
- A resent webhook from days ago corrupting current order status

These are not edge cases.

They are guaranteed to occur at production scale.

---

# 2. Conflict Scenarios

## Scenario A — Stale Webhook Overwrites Newer Data

```text
Order updated at 10:01 by sync job → stored in commerce.orders
Shopify resends old webhook from 09:55 at 10:05
Stale webhook overwrites current state

Result: Order incorrectly reverted to 09:55 state
```

## Scenario B — Concurrent Sync Jobs

```text
Full sync job running (batch import)
Webhook arrives for the same product simultaneously
Both workers try to UPDATE commerce.products at the same time

Result: One write is lost (last-write-wins without version tracking)
```

## Scenario C — Manual Override + Sync

```text
Platform admin manually corrects an order's fulfillment_status
Sync job runs and overwrites the correction with Shopify's stale value

Result: Admin correction silently discarded
```

## Scenario D — Cross-Provider Identity Collision

```text
Brand connects Shopify Store A and Shopify Store B
Both stores have a product with external_product_id = "12345"
external_entity_mappings has a collision

Result: Products mapped to wrong store
```

---

# 3. Conflict Resolution Strategy

## Core Rule

```text
The record with the later external_updated_at timestamp wins.
```

This is **Timestamp-Based Optimistic Concurrency Control**.

It is simple, auditable, and correct for commerce synchronization because:

- Every Shopify/WooCommerce/Magento entity has an `updated_at` field
- External platforms are the source of truth for their own entities
- The AutoShipp platform should reflect the most recent state of the external entity

---

## Resolution Matrix

| Incoming timestamp  | Stored timestamp | Action                                |
| ------------------- | ---------------- | ------------------------------------- |
| Newer than stored   | (any)            | Accept, overwrite stored              |
| Same as stored      | (any)            | Ignore (idempotent)                   |
| Older than stored   | (any)            | Reject, do not overwrite              |
| NULL (no timestamp) | (any)            | Accept with warning, log to sync_logs |

---

# 4. Schema Amendments for Conflict Resolution

The following columns are added to all synced commerce tables.

---

## commerce.products — New Columns

```sql
ALTER TABLE commerce.products
    ADD COLUMN external_updated_at  TIMESTAMPTZ,
    ADD COLUMN sync_version         INTEGER      NOT NULL DEFAULT 1,
    ADD COLUMN sync_etag            TEXT,
    ADD COLUMN last_sync_hash       TEXT,
    ADD COLUMN sync_source          TEXT;
```

---

## commerce.product_variants — New Columns

```sql
ALTER TABLE commerce.product_variants
    ADD COLUMN external_updated_at  TIMESTAMPTZ,
    ADD COLUMN sync_version         INTEGER      NOT NULL DEFAULT 1;
```

---

## commerce.orders — New Columns

```sql
ALTER TABLE commerce.orders
    ADD COLUMN external_updated_at  TIMESTAMPTZ,
    ADD COLUMN sync_version         INTEGER      NOT NULL DEFAULT 1,
    ADD COLUMN sync_source          TEXT,
    ADD COLUMN manual_override      BOOLEAN      NOT NULL DEFAULT FALSE,
    ADD COLUMN manual_override_at   TIMESTAMPTZ,
    ADD COLUMN manual_override_by   UUID;
```

The `manual_override` flag is critical.

When a Platform admin corrects an order manually, `manual_override = TRUE` is set.

The sync service treats `manual_override = TRUE` records as **sync-frozen**.

No incoming sync will overwrite a manually overridden record unless the override is explicitly released by a Platform admin.

---

## commerce.inventory_levels — New Columns

```sql
ALTER TABLE commerce.inventory_levels
    ADD COLUMN external_updated_at  TIMESTAMPTZ,
    ADD COLUMN sync_version         INTEGER      NOT NULL DEFAULT 1;
```

---

# 5. Sync Service Upsert Pattern

Every sync write follows this pattern:

```sql
INSERT INTO commerce.orders (
    id, store_id, customer_id, external_order_id,
    financial_status, fulfillment_status, total_price,
    ordered_at, synced_at, external_updated_at, sync_source
)
VALUES (
    gen_random_uuid(), :storeId, :customerId, :externalOrderId,
    :financialStatus, :fulfillmentStatus, :totalPrice,
    :orderedAt, NOW(), :externalUpdatedAt, :syncSource
)
ON CONFLICT (store_id, external_order_id)
DO UPDATE SET
    financial_status    = EXCLUDED.financial_status,
    fulfillment_status  = EXCLUDED.fulfillment_status,
    total_price         = EXCLUDED.total_price,
    synced_at           = NOW(),
    external_updated_at = EXCLUDED.external_updated_at,
    sync_version        = commerce.orders.sync_version + 1
WHERE
    -- Only update if incoming timestamp is newer
    EXCLUDED.external_updated_at > commerce.orders.external_updated_at
    -- Never overwrite manually corrected records
    AND commerce.orders.manual_override = FALSE;
```

This single `UPSERT` statement atomically handles:

- First-time import (INSERT path)
- Update if newer (DO UPDATE with WHERE clause)
- Conflict rejection if stale (WHERE clause fails, no update)
- Manual override protection (WHERE clause fails for overridden records)

---

# 6. Sync Source Tracking

`sync_source` records how the record last entered the platform.

| Value             | Meaning                             |
| ----------------- | ----------------------------------- |
| `WEBHOOK`         | Received via provider webhook       |
| `FULL_SYNC`       | Received during scheduled full sync |
| `MANUAL_SYNC`     | Triggered manually by user          |
| `MANUAL_OVERRIDE` | Set manually by Platform admin      |

This allows the platform to identify patterns such as:

- Records that are frequently overwritten (high conflict rate)
- Records where webhook and full sync disagree
- Records that have been manually corrected the most

---

# 7. ETag Support

For providers that support ETags (HTTP cache validation):

```sql
-- Store the ETag with the record
UPDATE commerce.products
SET sync_etag = :etag
WHERE id = :id;

-- Before next sync, send If-None-Match header
GET /admin/api/products/:id.json
If-None-Match: "abc123etag"

-- If 304 Not Modified → skip processing, record already current
-- If 200 → process and update sync_etag
```

ETag support reduces unnecessary sync processing and API quota consumption.

---

# 8. Sync Hash for Change Detection

`last_sync_hash` stores a SHA-256 hash of the normalized payload.

```text
hash = SHA256(JSON.stringify(sortedPayload))
```

**Use cases:**

- If the incoming hash matches `last_sync_hash` → payload unchanged, skip database write
- Reduces write amplification for high-frequency sync jobs
- Identifies providers that resend unchanged data unnecessarily

---

# 9. Concurrent Sync Protection

Multiple workers may process events for the same entity simultaneously.

PostgreSQL's `ON CONFLICT DO UPDATE WHERE` handles this atomically.

However, for high-contention entities (orders receiving frequent updates), use `SELECT ... FOR UPDATE` to prevent lost updates:

```sql
-- Acquire a row-level lock before updating
SELECT id, external_updated_at, manual_override
FROM commerce.orders
WHERE store_id = :storeId
  AND external_order_id = :externalOrderId
FOR UPDATE;

-- Only proceed if incoming timestamp is newer
IF incoming.external_updated_at > stored.external_updated_at
    AND NOT stored.manual_override THEN
    UPDATE commerce.orders SET ...
END IF;
```

This eliminates the race condition where two concurrent updates both pass the WHERE check before either commits.

---

# 10. External Entity Mapping — Scope Enforcement

**Scenario D** (cross-provider identity collision) is prevented by scoping all external entity mappings by both `store_id` and `provider`:

```sql
ALTER TABLE commerce.external_entity_mappings
    ADD CONSTRAINT uq_external_entity_mapping
    UNIQUE (store_id, external_entity_type, external_entity_id);
```

A product with `external_product_id = "12345"` in Shopify Store A and the same ID in Shopify Store B creates two distinct rows, because `store_id` differs.

---

# 11. Manual Override Flow

When a Platform admin corrects a record:

```text
Platform Admin → PATCH /commerce/orders/:id

↓

Platform API validates OWNER/MANAGER role

↓

UPDATE commerce.orders
SET
  fulfillment_status = :newStatus,
  manual_override = TRUE,
  manual_override_at = NOW(),
  manual_override_by = :userId,
  sync_source = 'MANUAL_OVERRIDE'
WHERE id = :id

↓

Audit event: commerce.order.manual_override

↓

Sync service will no longer overwrite this record
```

---

## Releasing a Manual Override

```text
Platform Admin → POST /commerce/orders/:id/release-override

↓

UPDATE commerce.orders
SET
  manual_override = FALSE,
  manual_override_at = NULL,
  manual_override_by = NULL
WHERE id = :id

↓

Audit event: commerce.order.override_released

↓

Next sync will update this record normally
```

---

# 12. Conflict Logging

Every rejected sync write (stale timestamp, manual override) is logged in `commerce.commerce_sync_logs`:

```sql
INSERT INTO commerce.commerce_sync_logs (
    sync_job_id, entity_type, external_entity_id,
    action, reason, metadata, created_at
)
VALUES (
    :syncJobId, 'order', :externalOrderId,
    'REJECTED', 'STALE_TIMESTAMP',
    jsonb_build_object(
        'incoming_ts', :incomingTs,
        'stored_ts', :storedTs
    ),
    NOW()
);
```

Conflict rejection rates are monitored in Platform Health.

---

# 13. Monitoring Metrics

| Metric                             | Alert Threshold |
| ---------------------------------- | --------------- |
| Sync conflict rejection rate > 5%  | 🟡 Warning      |
| Sync conflict rejection rate > 20% | 🔴 Critical     |
| Manual override records > 1000     | 🟡 Warning      |
| Failed upserts (not conflicts)     | 🔴 Immediate    |

High conflict rates indicate:

- Provider sending stale webhooks (common)
- Clock skew between provider and platform
- Bug in sync logic

---

# 14. Provider-Specific Notes

| Provider    | timestamp field | ETag support  | Notes                     |
| ----------- | --------------- | ------------- | ------------------------- |
| Shopify     | `updated_at`    | Yes (via API) | Reliable timestamps       |
| WooCommerce | `date_modified` | No            | Timestamps reliable       |
| Magento     | `updated_at`    | No            | Timestamps reliable       |
| Custom API  | Configurable    | Optional      | Define in provider config |

---

# 15. Decision Register

| ID    | Decision                                                                          | Status    |
| ----- | --------------------------------------------------------------------------------- | --------- |
| D-381 | Timestamp-based optimistic concurrency is the conflict resolution strategy        | ✅ Locked |
| D-382 | Stale incoming records are silently rejected and logged                           | ✅ Locked |
| D-383 | Manual overrides freeze a record from sync updates                                | ✅ Locked |
| D-384 | External entity mappings are scoped by store_id to prevent cross-store collisions | ✅ Locked |
| D-385 | ETag support reduces unnecessary API calls and write amplification                | ✅ Locked |
| D-386 | sync_hash enables change detection without database comparison                    | ✅ Locked |
| D-387 | Conflict rejections are logged to commerce_sync_logs                              | ✅ Locked |
| D-388 | manual_override flag requires Platform OWNER/MANAGER role to set                  | ✅ Locked |
| D-389 | FOR UPDATE is used for high-contention entity updates                             | ✅ Locked |
| D-390 | Conflict metrics are tracked in Platform Health                                   | ✅ Locked |

---

# AES-039 — Multi-Organization Session Model Specification

**Document ID:** AES-039

**Title:** Multi-Organization Session Model Specification

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Amends:** AES-009 (Identity Schema), AES-029 (Multi-Tenant Architecture)

**Depends On:**

- AES-009 — Identity Schema
- AES-020 — Platform API Architecture
- AES-028 — Security Architecture
- AES-029 — Multi-Tenant Architecture
- AES-030 — Frontend Architecture

---

# 1. Executive Summary

AES-009 and AES-029 contained a contradiction.

AES-009 defined a `memberships` table where one user can hold memberships in multiple organizations.

AES-029 stated: _"Users cannot belong to multiple organizations simultaneously."_

These statements cannot both be true at the same time.

This document resolves the contradiction by:

1. Establishing the **Single Active Organization** model as the authoritative session design
2. Defining the exact behavior for multi-organization users
3. Specifying the organization switching flow
4. Amending AES-009 and AES-029 to be internally consistent

---

# 2. The Contradiction

**AES-009 says (correct):**

The `memberships` table uses `UNIQUE(user_id, organization_id)`, allowing one user to have memberships in multiple organizations.

A user can be:

```text
BRAND_ADMIN in Brand A
BRAND_VIEWER in Brand B
AGGREGATOR_ADMIN in Aggregator X
```

This is by design — the Aggregator model requires staff users who manage multiple brands.

**AES-029 says (incorrect):**

> "Users cannot belong to multiple organizations simultaneously."

This statement was intended to mean "a session has one active organization context." It was incorrectly worded as a constraint on memberships.

**Resolution:**

A user **can** have multiple memberships.

A session **always** has exactly one active organization.

These are two different concepts that must not be conflated.

---

# 3. The Single Active Organization Model (Slack Model)

AutoShipp adopts the same session model used by Slack, GitHub, Notion, and Linear.

```text
User has multiple Memberships

↓

At login, one organization is the Active Organization

↓

JWT encodes the Active Organization

↓

All API calls are scoped to the Active Organization

↓

User switches organization

↓

New JWT issued for the new Active Organization

↓

All subsequent API calls scoped to the new organization
```

This model is:

- **Simple** — every API call has exactly one organization context
- **Secure** — no ambiguity in permission checks
- **Auditable** — every session records which organization was active
- **Consistent** — the existing guard pipeline requires no changes

---

# 4. JWT Payload Amendment

**Previous JWT payload (AES-009):**

```json
{
  "sub": "user_uuid",
  "organization_id": "uuid",
  "user_type": "BRAND",
  "role": "BRAND_ADMIN",
  "token_version": 4
}
```

**Amended JWT payload (this document):**

```json
{
  "sub": "user_uuid",
  "active_organization_id": "uuid",
  "organization_type": "BRAND",
  "user_type": "BRAND",
  "role": "BRAND_ADMIN",
  "token_version": 4,
  "membership_count": 3
}
```

Changes:

| Field                                        | Change    | Reason                                      |
| -------------------------------------------- | --------- | ------------------------------------------- |
| `organization_id` → `active_organization_id` | Rename    | Explicit that this is the active context    |
| `organization_type`                          | New field | Distinguishes PLATFORM/AGGREGATOR/BRAND     |
| `membership_count`                           | New field | Frontend knows if switch button is relevant |

`membership_count` enables the frontend to conditionally show the organization switcher UI without an extra API call.

---

# 5. Login Flow — Organization Selection

## Single Membership User

```text
Login (email + password)

↓

Validate credentials

↓

Fetch memberships for user

↓

User has 1 membership

↓

Issue JWT with that organization as active_organization_id

↓

Return JWT
```

## Multi-Membership User

```text
Login (email + password)

↓

Validate credentials

↓

Fetch memberships for user

↓

User has 3 memberships

↓

Option A: Default to last_active_organization_id (from sessions table)
Option B: Return organization picker response (no JWT yet)

↓

User selects or default is applied

↓

Issue JWT with selected organization as active_organization_id
```

---

## Organization Picker Response

When a multi-membership user logs in and no last-active organization is recorded:

```json
{
  "success": true,
  "action": "ORGANIZATION_SELECTION_REQUIRED",
  "data": {
    "availableOrganizations": [
      {
        "id": "uuid-brand-a",
        "name": "Brand A",
        "type": "BRAND",
        "logoUrl": "..."
      },
      {
        "id": "uuid-aggregator-x",
        "name": "Aggregator X",
        "type": "AGGREGATOR",
        "logoUrl": "..."
      }
    ]
  }
}
```

The frontend renders an organization selection screen.

The user selects one.

The platform issues a JWT for that selection.

---

# 6. Organization Switching Flow

```text
User clicks "Switch Organization" in UI

↓

POST /auth/switch-organization
  Body: { targetOrganizationId: "uuid" }
  Auth: Current valid JWT cookie

↓

Platform API validates:
  1. Current JWT is valid
  2. User has an ACTIVE membership in targetOrganizationId
  3. Target organization is ACTIVE

↓

Issue new JWT:
  active_organization_id = targetOrganizationId
  new token_version (do not revoke old)

↓

Update sessions table:
  last_active_organization_id = targetOrganizationId

↓

Return new HttpOnly JWT cookie

↓

Frontend receives new Account Context

↓

Navigation rebuilds for new organization
```

---

## Switch Authorization Rules

| Rule                                                                     | Enforcement                     |
| ------------------------------------------------------------------------ | ------------------------------- |
| User must have ACTIVE membership in target org                           | DB check on membership.status   |
| Target organization must be ACTIVE                                       | DB check on organization.status |
| PLATFORM users can switch to any org they have membership in             | Standard membership check       |
| BRAND users cannot switch to AGGREGATOR orgs unless they have membership | Standard membership check       |

Organization switching does **not** require the old token to be revoked.

Both the old and new JWTs are valid simultaneously.

The frontend replaces the cookie with the new one.

---

# 7. sessions Table Amendment

The `identity.sessions` table (AES-009) requires one new column:

```sql
ALTER TABLE identity.sessions
    ADD COLUMN last_active_organization_id UUID REFERENCES organization.organizations(id);
```

This enables:

- Default organization selection at next login
- Audit trail of which organization the session was last using
- Future "Return to last workspace" UX feature

---

# 8. Account Context — Multi-Org Amendment

The Account Context response (AES-029 Section 12) is amended:

```json
{
  "organizationId": "active-uuid",
  "organizationType": "BRAND",
  "parentOrganizationId": "aggregator-uuid",
  "userType": "BRAND",
  "role": "BRAND_ADMIN",
  "permissions": ["fit:read", "fit:manage"],
  "modules": ["fit", "eta"],
  "subscriptions": [...],
  "featureFlags": {...},
  "availableOrganizations": [
    {
      "id": "brand-a-uuid",
      "name": "Brand A",
      "type": "BRAND",
      "isActive": true
    },
    {
      "id": "brand-b-uuid",
      "name": "Brand B",
      "type": "BRAND",
      "isActive": false
    }
  ]
}
```

`availableOrganizations` is always returned.

If the user has only 1 membership, the array contains 1 item.

The frontend uses this to decide whether to show the organization switcher.

---

# 9. Frontend Changes

The frontend (AES-030) must implement:

## Organization Switcher Component

Shown when `availableOrganizations.length > 1`.

Renders a dropdown or modal listing available organizations.

On selection:

```typescript
async switchOrganization(targetOrganizationId: string) {
  await authService.switchOrganization(targetOrganizationId);
  // New cookie is set by the server
  await accountContextService.refresh();
  // Navigation rebuilds automatically
  router.push(`/${newOrganizationType}/dashboard`);
}
```

## Organization Picker Page

Route: `/auth/select-organization`

Rendered after login when `action === 'ORGANIZATION_SELECTION_REQUIRED'`.

---

# 10. Membership States and Switching

Multi-membership users can only switch to organizations where their membership is `ACTIVE`.

| Membership Status | Can Switch To?                       |
| ----------------- | ------------------------------------ |
| ACTIVE            | ✅ Yes                               |
| INVITED           | ❌ No (must accept invitation first) |
| SUSPENDED         | ❌ No                                |
| REMOVED           | ❌ No                                |

---

# 11. AES-009 Amendment

The following sentence in AES-009 decision register is **updated**:

**Before (D-091):**

> "Users are global identities" — ✅ Locked

**After (D-091 amended):**

> "Users are global identities. A user may hold memberships in multiple organizations. Sessions always have exactly one active organization (see AES-039)." — ✅ Locked

---

# 12. AES-029 Amendment

The following statement in AES-029 Section 6 is **replaced**:

**Before:**

> "Users cannot belong to multiple organizations simultaneously."

**After:**

> "Users may hold memberships in multiple organizations. However, every authenticated session has exactly one Active Organization, encoded in the JWT as `active_organization_id`. Organization switching reissues the JWT without revoking the previous one. See AES-039 for the full specification."

---

# 13. Security Considerations

- Users cannot switch to an organization they are not actively a member of.
- Suspended users cannot switch to any organization.
- Token switching does not increment `token_version` — this is intentional. Switching organizations is not a security event. Logout, password change, and permission changes increment `token_version`.
- All organization switches are logged to `identity.login_history` with event type `ORGANIZATION_SWITCHED`.

---

# 14. Audit Events

| Event                                    | Triggered By                       |
| ---------------------------------------- | ---------------------------------- |
| `identity.session.organization_switched` | POST /auth/switch-organization     |
| `identity.session.organization_selected` | Post-login organization selection  |
| `identity.session.login_default_org`     | Login to single-membership account |

---

# 15. Decision Register

| ID    | Decision                                                                         | Status    |
| ----- | -------------------------------------------------------------------------------- | --------- |
| D-391 | Users may hold memberships in multiple organizations simultaneously              | ✅ Locked |
| D-392 | Every session has exactly one Active Organization encoded in the JWT             | ✅ Locked |
| D-393 | Organization switching reissues the JWT without revoking the previous token      | ✅ Locked |
| D-394 | Multi-membership users see an organization picker at login if no default exists  | ✅ Locked |
| D-395 | last_active_organization_id is stored in the sessions table                      | ✅ Locked |
| D-396 | availableOrganizations is always returned in the Account Context                 | ✅ Locked |
| D-397 | Only ACTIVE memberships in ACTIVE organizations are available for switching      | ✅ Locked |
| D-398 | AES-009 D-091 and AES-029 Section 6 are amended by this document                 | ✅ Locked |
| D-399 | Organization switches are logged to identity.login_history                       | ✅ Locked |
| D-400 | Frontend shows organization switcher only when availableOrganizations.length > 1 | ✅ Locked |

---

# AES-040 — Database Graduation & Service Extraction Strategy

**Document ID:** AES-040

**Title:** Database Graduation & Service Extraction Strategy

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Amends:** AES-032 (Database Governance), AES-008 (Master Database Blueprint)

**Depends On:**

- AES-008 — Master Database Blueprint
- AES-020 — Platform API Architecture
- AES-021 — Event-Driven Architecture
- AES-031 — Disaster Recovery
- AES-032 — Database Governance

---

# 1. Executive Summary

AES-008 locked the decision:

> One PostgreSQL database. Multiple schemas. One Prisma Client per service.

This is the correct starting position.

However, AES-008 was silent on **when and how a product or domain graduates to its own dedicated database**.

Without this, one of two failure modes occurs:

**Failure Mode A — Never Graduating**

```text
Platform grows to 50,000 brands

Commerce sync flood consumes 70% of DB connections

Identity queries degrade

Platform is slow for everyone

Team has no migration playbook
```

**Failure Mode B — Premature Graduation**

```text
Team perceives scaling risk at 1,000 brands

Extracts billing into own DB before any real pressure

Adds distributed transaction complexity

Adds operational overhead

Makes 5 developers manage 3 database clusters instead of 1
```

This document defines the **third path**: objective graduation criteria and a proven extraction process that avoids both failure modes.

---

# 2. Core Position

The starting architecture is correct.

```text
One PostgreSQL Database

↓

Multiple Schemas

↓

One Prisma Client per Service
```

This architecture is sufficient for:

- 10,000+ organizations
- 100,000+ stores
- Hundreds of millions of orders
- Multiple product services
- Full-stack concurrent load

A well-tuned, properly indexed, Neon-provisioned PostgreSQL database is not a bottleneck at these scales.

Companies that changed databases prematurely regret it.

Companies that never defined when to change also regret it.

---

# 3. Graduation Criteria

A product schema graduates to its own dedicated database when **any two** of the following thresholds are sustained for 14 consecutive days:

---

## Criterion A — Write Throughput

```text
> 300 write operations per second
sustained on the graduating schema
```

This indicates the schema is consuming a disproportionate share of the write buffer and WAL capacity.

---

## Criterion B — Data Volume

```text
> 500 GB stored in the graduating schema
```

Large table sizes affect vacuum efficiency and backup performance for the entire shared database.

---

## Criterion C — CPU Pressure

```text
> 20% of total database CPU
consistently attributable to one schema
```

Measured via `pg_stat_statements` attribution per schema owner role.

---

## Criterion D — Connection Saturation

```text
> 30% of total connection pool
consistently held by one service
```

Connection pool starvation degrades all services simultaneously.

---

## Criterion E — Independent Scaling Requirement

```text
The schema requires independent read replica configuration,
different retention policies,
different backup frequencies,
or different geographic placement
than the platform database.
```

This is a strategic criterion. It may be triggered before thresholds A-D.

Example: The `commerce` schema needs a read replica in a specific geographic region to reduce latency for a product API. The platform database does not require this. This justifies extraction.

---

## Criterion F — Regulatory Isolation

```text
A compliance requirement mandates that specific data
must reside in a separate, independently audited database.
```

Example: A financial regulator requires wallet transaction data to be in an independently certified database with stricter access controls.

---

# 4. Graduation Priority Order

Not all schemas are equal.

If graduation becomes necessary, the following priority order applies:

| Priority | Schema                           | Rationale                           |
| -------- | -------------------------------- | ----------------------------------- |
| 1        | `commerce`                       | Highest write volume (sync traffic) |
| 2        | `audit`                          | Highest row count (append-only)     |
| 3        | Product schemas (fit, eta, etc.) | Independent AI/compute workloads    |
| 4        | `wallet`                         | Financial isolation benefits        |
| 5        | `billing`                        | Commercial separation               |
| 6        | All others                       | Low expected volume                 |

The identity, organization, and marketplace schemas are expected to **never** require graduation. They are small, read-heavy, and central to every service.

---

# 5. Pre-Graduation Requirements

Before a schema can graduate:

- [ ] Graduation criteria met for 14 consecutive days (documented)
- [ ] Architecture review completed
- [ ] New database provisioned and network-accessible
- [ ] Service's Prisma client tested with new connection string
- [ ] Cross-schema foreign key dependencies audited and resolved
- [ ] Read replicas configured on new database
- [ ] Backup strategy verified on new database
- [ ] Runbook written and reviewed
- [ ] Rollback plan defined

---

# 6. The Extraction Process

## Phase 1 — Preparation (Week 1-2)

```text
1. Audit all cross-schema SQL queries touching the graduating schema
2. Identify foreign key dependencies (e.g., commerce → organization)
3. Replace FK references with application-level ID references
4. Add API endpoints for any data that was previously joined directly
5. Update Prisma schemas to remove cross-schema model references
6. Deploy updated code — still pointing to original DB
```

After Phase 1, the graduating schema has **zero hard FK dependencies** on other schemas. It references other schemas only by UUID values (not FK constraints).

---

## Phase 2 — Shadow Write (Week 2-3)

```text
1. Provision new dedicated database
2. Create the graduating schema in the new database
3. Run Prisma migrations on the new database
4. Configure dual-write in the service:
   - All writes go to BOTH the old and new databases
   - All reads continue from the old database
5. Monitor consistency between the two databases
```

Shadow writing validates the new database without any user impact.

---

## Phase 3 — Data Backfill (Week 3)

```text
1. Copy historical data from the old schema to the new database
2. Use Neon's logical replication (preferred) or a migration worker
3. Validate row counts, checksums, and sample records
4. Confirm the new database is current and consistent
```

---

## Phase 4 — Read Cutover (Week 3-4)

```text
1. Switch reads to the new database
2. Keep writes to both databases
3. Monitor error rates, latency, and consistency
4. Run for 48-72 hours minimum
```

This is the lowest-risk cutover step. If reads fail, the rollback is a single configuration change.

---

## Phase 5 — Write Cutover (Week 4)

```text
1. Stop dual-write
2. All writes go to the new database only
3. Old schema becomes read-only
4. Monitor for 48 hours
```

---

## Phase 6 — Decommission (Week 5-6)

```text
1. Verify no reads or writes to the old schema for 7 days
2. Archive old schema data (export + compress)
3. Drop the graduating schema from the platform database
4. Update infrastructure configuration
5. Close rollback window
```

---

# 7. Cross-Schema Dependency Resolution

The most common graduation blocker is cross-schema FK constraints.

AutoShipp already has a rule against Product → Product FKs (AES-008 Section 14).

However, Platform schemas do have FKs to each other.

Before graduation:

**Replace FK constraints with application-level ID references:**

```sql
-- Before graduation (FK constraint in commerce schema)
FOREIGN KEY (organization_id) REFERENCES organization.organizations(id)

-- After graduation (no FK, enforced by application)
-- column remains: organization_id UUID NOT NULL
-- no FK constraint
-- application validates organization exists before insert
```

This is a standard practice in distributed systems.

Data integrity is maintained by:

1. Application-level validation (check org exists before writing)
2. Event-driven consistency (listen for `organization.archived` events)
3. Periodic reconciliation jobs (find orphaned records)

---

# 8. Platform Modular Monolith Graduation

The Platform API (AES-020) is currently a modular monolith.

If the Platform API itself requires service extraction (which the review identified as a future concern), the same graduation criteria apply to services, not just databases.

**Service Extraction Criteria:**

Any module of the Platform API should be extracted to an independent service when:

- The module has independently scalable load requirements
- The module needs to be deployed independently without affecting other modules
- The module is owned by a different team with different release cycles
- The module's failure must not cascade to the rest of the Platform API

**Extraction Priority Order (if required):**

1. `Commerce Sync Module` (high write load, batch operations)
2. `Billing Module` (financial isolation, external payment webhooks)
3. `Notification Module` (spike load, external email/SMS)
4. `Integration Module` (external API polling, high retry volume)

---

# 9. Module Boundary Rules (AES-020 Amendment)

To enable future extraction, the Platform API must enforce **strict module boundaries** from day one.

The following rules are **mandatory** starting immediately:

**Rule 1:** No NestJS module may import another module's Service class directly.

```typescript
// FORBIDDEN
@Module({
  imports: [BillingModule], // importing another domain module
})
export class MarketplaceModule {}

// CORRECT
// Communicate through events or through a shared interface
```

**Rule 2:** Cross-domain data access within the Platform API must use Events or a dedicated inter-module interface, not direct service injection.

**Rule 3:** Each module must expose its public interface through a dedicated `*.interface.ts` file. The interface is what other modules may use. The implementation is private.

**Rule 4:** Module boundaries are enforced in CI via ESLint no-restricted-imports rules per module directory.

These rules ensure that extracting any module to an independent service requires only:

- Moving the module directory to a new NestJS app
- Replacing the interface with an HTTP client
- No other code changes

---

# 10. Graduation Risk Management

| Risk                                      | Mitigation                                                         |
| ----------------------------------------- | ------------------------------------------------------------------ |
| Data inconsistency between old and new DB | Shadow write + 48h read-only validation period                     |
| Application downtime during cutover       | Feature flag disables writes during final cutover window           |
| Cross-schema join failures                | Phase 1 eliminates all cross-schema joins before extraction begins |
| Rollback complexity                       | Old schema is kept read-only for 14 days post-cutover              |
| Team unfamiliarity with process           | Runbook written and dry-run in staging first                       |

---

# 11. Monitoring During Graduation

During any graduation process, the following metrics are tracked at 1-minute resolution:

- Error rate on the graduating service
- P99 latency on the graduating service
- Consistency score between old and new databases (during shadow write)
- Row count difference between old and new databases

A consistency score below 99.99% halts the process automatically.

---

# 12. AES-032 Amendment — Graduation Criteria Added

AES-032 is amended to reference this document for all database graduation decisions.

Decision D-341 in AES-032 is amended:

**Before:**

> "AutoShipp uses one PostgreSQL database" — ✅ Locked

**After:**

> "AutoShipp starts with one PostgreSQL database. Schemas graduate to dedicated databases when objective criteria defined in AES-040 are met for 14 consecutive days." — ✅ Locked

---

# 13. Decision Register

| ID    | Decision                                                                            | Status    |
| ----- | ----------------------------------------------------------------------------------- | --------- |
| D-401 | The single-database architecture is the correct starting position                   | ✅ Locked |
| D-402 | Graduation requires any two criteria from AES-040 Section 3 for 14 consecutive days | ✅ Locked |
| D-403 | commerce schema is the highest graduation priority by expected volume               | ✅ Locked |
| D-404 | identity and organization schemas are expected to never require graduation          | ✅ Locked |
| D-405 | The 6-phase extraction process is the mandatory graduation procedure                | ✅ Locked |
| D-406 | Cross-schema FK constraints must be replaced before extraction begins               | ✅ Locked |
| D-407 | Platform API modules must never import each other's Service classes directly        | ✅ Locked |
| D-408 | Module boundaries are enforced by ESLint rules in CI                                | ✅ Locked |
| D-409 | Old schema is retained read-only for 14 days post-cutover                           | ✅ Locked |
| D-410 | Service extraction follows the same criteria as database graduation                 | ✅ Locked |

---

# AES-041 — API Versioning & Contract Evolution Specification

**Document ID:** AES-041

**Title:** API Versioning & Contract Evolution Specification

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On:**

- AES-020 — Platform API Architecture
- AES-021 — Event-Driven Architecture
- AES-030 — Frontend Architecture

---

# 1. Executive Summary

Every API is a contract.

When AutoShipp publishes an API endpoint, product services, frontend clients, and eventually external customers and partners rely on that contract being stable.

Without a versioning and contract evolution strategy:

- Breaking a field name breaks every client simultaneously
- Product services have no safe migration window
- External integrations break silently
- Event consumers process incompatible payloads
- There is no defined path from old behavior to new behavior

This document defines how AutoShipp versions, evolves, deprecates, and retires APIs and events across the entire platform.

---

# 2. Versioning Philosophy

```text
Stability first.

Explicitness always.

Never break a client silently.

Always provide a migration window.
```

A versioning strategy only works if it is applied consistently from day one.

Retroactively versioning APIs after external clients exist is expensive and painful.

---

# 3. HTTP API Versioning Strategy

## Decision: URI-Based Versioning

AutoShipp uses URI-based versioning.

```text
/api/v1/organizations
/api/v2/organizations
```

**Reason for URI versioning over header versioning:**

| Criteria                                     | URI    | Header  |
| -------------------------------------------- | ------ | ------- |
| Visible in browser, logs, monitoring         | ✅ Yes | ❌ No   |
| Can be tested directly in browser            | ✅ Yes | ❌ No   |
| Works without custom HTTP client             | ✅ Yes | ❌ No   |
| Cacheable at CDN/proxy layer                 | ✅ Yes | ❌ Hard |
| Industry convention (Stripe, GitHub, Twilio) | ✅ Yes | Mixed   |

Header versioning is allowed as a secondary mechanism for internal service-to-service calls only. It is never required for public-facing APIs.

---

## Version Format

```text
/api/v{MAJOR}
```

Examples:

```text
/api/v1
/api/v2
```

Minor and patch versions are never exposed in the URI.

Backward-compatible changes within the same major version require no URI change.

---

## Version Scope

The version prefix applies to the entire API surface, not individual endpoints.

```text
Correct:
/api/v1/organizations
/api/v1/billing/invoices
/api/v1/commerce/orders

Incorrect:
/api/organizations/v2
/api/billing/v1/invoices
```

All endpoints share the same version. There are no per-endpoint versions.

---

# 4. Backward Compatibility Rules

A change is **backward compatible** (no new version required) if it:

- Adds a new optional field to a response
- Adds a new optional field to a request body
- Adds a new endpoint
- Adds a new enum value that clients can safely ignore
- Changes the order of fields in a JSON response
- Adds a new HTTP header to a response

A change is **breaking** (new version required) if it:

- Removes any field from a request or response
- Renames any field
- Changes the type of any field (e.g., string → number)
- Changes the semantic meaning of any field
- Removes an endpoint
- Changes an endpoint's HTTP method
- Makes a previously optional field required
- Changes a success response code (e.g., 200 → 201)
- Changes an error response code that clients might handle

---

# 5. Deprecation Policy

When a v1 endpoint or field must be retired:

## Step 1 — Mark Deprecated (Day 0)

Add the `Deprecation` header to all responses from the deprecated endpoint:

```http
HTTP/1.1 200 OK
Deprecation: true
Sunset: Sat, 01 Jan 2028 00:00:00 GMT
Link: <https://docs.autoshipp.in/api/migration/v1-to-v2>; rel="successor-version"
```

Add `deprecated: true` to the OpenAPI specification for the endpoint.

---

## Step 2 — Notify Consumers

- Publish deprecation notice in developer changelog
- Email all API key holders using the deprecated endpoint
- Add in-app banner for affected customers (if applicable)
- Log `X-Deprecated-Endpoint: true` on every request to the deprecated endpoint for monitoring

---

## Step 3 — Maintain Parallel Operation

Both v1 and v2 operate simultaneously for the duration of the sunset period.

No client is forced to migrate immediately.

---

## Step 4 — Sunset

After the sunset date:

- Deprecated endpoints return `410 Gone` with a migration URL
- Log remaining callers
- Alert if high-traffic callers still active after sunset

---

## Deprecation Timeline

| API Type                | Minimum Deprecation Notice | Sunset Period |
| ----------------------- | -------------------------- | ------------- |
| Public external API     | 12 months                  | 12 months     |
| Product Service API     | 6 months                   | 6 months      |
| Internal Platform API   | 3 months                   | 3 months      |
| Frontend → Platform API | 1 month                    | 1 month       |

**Rule:** The sunset date is always set at the time of deprecation announcement. It is never moved earlier. It may be extended if significant consumers remain.

---

# 6. Breaking Change Approval Process

No breaking change may be deployed without:

1. **Architecture team review** — confirms the change is genuinely necessary
2. **Impact analysis** — lists all known consumers of the affected endpoint
3. **Migration guide written** — documentation published before deprecation announced
4. **Sunset date agreed** — based on deprecation timeline table above
5. **Monitoring in place** — tracking of deprecated endpoint usage

Breaking changes are tracked as ADRs (Architecture Decision Records) and reference the original AES document they amend.

---

# 7. OpenAPI Version Lifecycle

Every API version has a corresponding OpenAPI specification file.

```text
openapi/
├── v1/
│   └── openapi.yaml
├── v2/
│   └── openapi.yaml
└── current → symlink to latest stable
```

Rules:

- OpenAPI spec is the source of truth for the API contract — not the code
- Every endpoint change requires an OpenAPI spec update before the code change
- Spec changes are reviewed in the same PR as the code change
- `openapi.yaml` is committed to the repository and versioned in Git
- Breaking change detection runs in CI: compare current spec against previous version using `openapi-diff`

CI gate:

```text
PR opened

↓

openapi-diff runs against base branch

↓

If breaking changes detected:
  - PR blocked
  - Developer must either:
    a. Add a new version increment
    b. Justify why the change is not actually breaking

↓

Architecture team reviews breaking change PRs
```

---

# 8. Event Versioning

Events (AES-021) are also versioned contracts.

Every event carries a `version` field in its envelope.

---

## Version in Event Envelope

```json
{
  "eventId": "uuid",
  "eventName": "order.created",
  "version": 1,
  "occurredAt": "2026-07-01T10:00:00Z",
  "payload": {}
}
```

When an event payload changes in a breaking way, the version increments.

```json
{
  "eventName": "order.created",
  "version": 2,
  "payload": {}
}
```

---

## Event Consumer Compatibility

Consumers declare which versions they support.

```typescript
@Subscribe('order.created', { versions: [1, 2] })
async handleOrderCreated(event: OrderCreatedEvent) {
  // normalize across versions internally
}
```

Consumers that only subscribe to `version: 1` continue to receive v1 events.

Consumers that only subscribe to `version: 2` receive v2 events.

Both versions are published in parallel during the transition period.

---

## Event Breaking vs Non-Breaking Changes

**Non-breaking (no version increment):**

- Add an optional field to the payload

**Breaking (version increment required):**

- Remove a field
- Rename a field
- Change a field type
- Change the semantic meaning of a field

---

## Event Deprecation Timeline

| Consumer Type     | Minimum Notice |
| ----------------- | -------------- |
| Internal workers  | 2 months       |
| Product services  | 4 months       |
| External webhooks | 6 months       |

---

# 9. Product Service API Version Strategy

Each product service (Fit, ETA, Returns, AI, Shipping) exposes its own internal API.

These APIs are versioned independently from the Platform API.

```text
/fit/api/v1/recommendations
/eta/api/v1/predictions
```

Rules:

- Product APIs follow the same URI versioning convention
- Product APIs follow the same backward compatibility rules
- Product APIs are not exposed directly to external customers in v1 (see AES-020)
- Platform API may proxy or aggregate product API responses

---

# 10. SDK Compatibility

When AutoShipp publishes a client SDK (future):

- SDK major version matches API major version
- SDK v1.x.x → Platform API v1
- SDK v2.x.x → Platform API v2
- SDK follows semantic versioning (semver)
- SDK changelog documents every breaking change
- Old SDK versions receive security patches for minimum 12 months after deprecation

---

# 11. API Version Monitoring

Track per-version:

- Request volume by version
- Error rate by version
- Deprecated endpoint call rate
- Time-to-migration for deprecated endpoints

Alerts:

| Condition                                                               | Alert       |
| ----------------------------------------------------------------------- | ----------- |
| Deprecated endpoint still receiving >1000 req/day 30 days before sunset | 🟡 Warning  |
| Deprecated endpoint receiving requests after sunset date                | 🔴 Critical |
| v1 traffic > v2 traffic 90 days after v2 launch                         | 🟡 Warning  |

---

# 12. Version Support Matrix

At any time, AutoShipp supports a maximum of **2 major API versions** simultaneously.

```text
v1 (deprecated) + v2 (current)
v2 (deprecated) + v3 (current)
```

A third version is never introduced before the first is retired.

This keeps operational and maintenance complexity bounded.

---

# 13. Current Version Status

| API              | Current Version | Status    |
| ---------------- | --------------- | --------- |
| Platform API     | v1              | ✅ Active |
| Fit API          | v1              | ✅ Active |
| ETA API          | v1              | ✅ Active |
| Returns API      | v1              | ✅ Active |
| AI Assistant API | v1              | ✅ Active |
| Shipping API     | v1              | ✅ Active |

All APIs launch at v1.

No v2 exists until a breaking change requires it.

---

# 14. Changelog Requirements

Every API version or event version change is accompanied by a changelog entry:

```markdown
## v2.0.0 — 2027-01-01

### Breaking Changes

- `GET /api/v1/orders` removed (sunset). Use `GET /api/v2/orders`.
- `order.created` event field `totalAmount` renamed to `total_price` in v2.

### Migration Guide

See: https://docs.autoshipp.in/api/migration/v1-to-v2
```

---

# 15. Decision Register

| ID    | Decision                                                                           | Status    |
| ----- | ---------------------------------------------------------------------------------- | --------- |
| D-411 | URI-based versioning (`/api/v1`) is the standard for all HTTP APIs                 | ✅ Locked |
| D-412 | All endpoints share the same version prefix — no per-endpoint versioning           | ✅ Locked |
| D-413 | openapi-diff runs in CI to detect breaking changes automatically                   | ✅ Locked |
| D-414 | Deprecation header + Sunset header are required on all deprecated endpoints        | ✅ Locked |
| D-415 | External API deprecation notice minimum is 12 months                               | ✅ Locked |
| D-416 | Maximum 2 major API versions operate simultaneously                                | ✅ Locked |
| D-417 | Events are versioned via the `version` field in the event envelope                 | ✅ Locked |
| D-418 | Consumers declare which event versions they support                                | ✅ Locked |
| D-419 | Breaking changes require architecture team review and written migration guide      | ✅ Locked |
| D-420 | OpenAPI specification is the contract source of truth, not the implementation code | ✅ Locked |

---

# AES-042 — Enterprise Operations & Compliance Specification

**Document ID:** AES-042

**Title:** Enterprise Operations & Compliance Specification

**Version:** 1.0.0

**Status:** Approved

**Owner:** AutoShipp Platform

**Depends On:**

- AES-017 — Audit Schema
- AES-025 — Storage Architecture
- AES-028 — Security Architecture
- AES-031 — Disaster Recovery

---

# 1. Executive Summary

Enterprise customers — particularly large aggregators and established brands — require proof of compliance before signing contracts.

This document defines AutoShipp's compliance posture, data governance model, and operational evidence requirements.

It is not an implementation specification in the same sense as AES-009 through AES-040.

It is a **readiness map** — defining what must exist, how it is evidenced, and where each control lives in the platform.

Implement this progressively alongside the product. Do not block implementation on compliance documentation. Instead, build the technical controls first and document the evidence as each control is implemented.

---

# 2. Compliance Frameworks

AutoShipp targets the following compliance frameworks:

| Framework     | Priority    | When Required                                                |
| ------------- | ----------- | ------------------------------------------------------------ |
| SOC 2 Type I  | High        | First enterprise customer                                    |
| SOC 2 Type II | High        | Enterprise sales at scale                                    |
| ISO 27001     | Medium      | International customers, regulated industries                |
| GDPR          | High        | Any EU customer or EU data processing                        |
| DPDP (India)  | High        | India-based customers (Digital Personal Data Protection Act) |
| PCI DSS       | Conditional | Only if AutoShipp stores card data (currently not planned)   |

**Note on PCI DSS:** AutoShipp processes payments via Razorpay and does not store card numbers, CVVs, or raw payment credentials. PCI DSS scope is therefore limited to SAQ-A (the simplest tier) and primarily covered by Razorpay's own compliance.

---

# 3. SOC 2 Mapping

SOC 2 is organized around five **Trust Service Criteria (TSC)**:

## CC1 — Control Environment

| Control                      | Implementation in AutoShipp               |
| ---------------------------- | ----------------------------------------- |
| Security policies documented | AES-028 (Security Architecture)           |
| Risk assessment              | This document (Section 12)                |
| Security awareness           | Onboarding checklist for engineering team |
| Defined org roles            | AES-009, AES-029 (RBAC model)             |

---

## CC6 — Logical Access

| Control                      | Implementation                                     |
| ---------------------------- | -------------------------------------------------- |
| Unique user accounts         | identity.users (AES-009)                           |
| MFA for admin access         | Planned (AES-009 future — mfa_methods table)       |
| Least privilege              | RBAC + PostgreSQL roles per service                |
| Access review process        | Quarterly membership audit (Section 9 below)       |
| Privileged access monitoring | Audit logs (AES-017)                               |
| Session management           | identity.sessions with per-device revocation       |
| Password requirements        | Argon2id, min 12 chars, complexity rules (AES-028) |

---

## CC7 — System Operations

| Control                 | Implementation                                 |
| ----------------------- | ---------------------------------------------- |
| Monitoring and alerting | Prometheus + Grafana + Sentry (AES-024)        |
| Incident detection      | Security monitoring (AES-028 Section 35)       |
| Incident response       | AES-028 Section 34                             |
| Patch management        | Dependency scanning in CI (AES-028 Section 32) |
| Change management       | PR review + CI gates (AES-032)                 |
| Backup                  | Neon PITR + AES-031                            |

---

## CC9 — Risk Mitigation

| Control             | Implementation                                      |
| ------------------- | --------------------------------------------------- |
| Vendor risk         | Managed providers (Neon, Upstash Redis, Cloudflare) |
| Business continuity | AES-031 (Disaster Recovery)                         |
| Data backup         | Daily snapshots + 30-day PITR                       |

---

# 4. ISO 27001 Mapping

ISO 27001 Annex A — Key controls relevant to AutoShipp:

| Control                    | ISO Ref | Implementation                              |
| -------------------------- | ------- | ------------------------------------------- |
| Information classification | A.8.2   | Section 5 below                             |
| Access control policy      | A.9.1   | AES-005, AES-009, AES-028                   |
| Cryptography               | A.10.1  | AES-028 (Argon2id, AES-256, TLS)            |
| Physical security          | A.11    | Managed by Neon, Cloudflare (provider SLAs) |
| Operations security        | A.12    | AES-024, AES-028                            |
| Secure development         | A.14    | AES-028 (OWASP, input validation, CSP)      |
| Supplier relationships     | A.15    | Section 11 below                            |
| Incident management        | A.16    | AES-028 Section 34                          |
| Business continuity        | A.17    | AES-031                                     |
| Compliance                 | A.18    | This document                               |

---

# 5. Data Classification

Every data type in AutoShipp is classified under one of four categories:

| Classification   | Definition                                 | Examples                                                     |
| ---------------- | ------------------------------------------ | ------------------------------------------------------------ |
| **Public**       | Intentionally public, no harm if disclosed | Product names, pricing plans, public documentation           |
| **Internal**     | Non-sensitive business data, internal use  | Platform metrics, feature flags, generic audit counts        |
| **Confidential** | Business-sensitive, restricted access      | Organization data, billing amounts, product assignments      |
| **Restricted**   | PII, credentials, financial records        | User PII, passwords, order values, wallet balances, API keys |

---

## Classification by Schema

| Schema                           | Classification | Reason                         |
| -------------------------------- | -------------- | ------------------------------ |
| identity.users                   | Restricted     | Email, password hash, PII      |
| identity.sessions                | Restricted     | Session tokens                 |
| organization.organizations       | Confidential   | Business identity              |
| customer.customers               | Restricted     | Consumer PII                   |
| commerce.orders                  | Confidential   | Transaction data               |
| billing.invoices                 | Confidential   | Financial records              |
| wallet.wallet_transactions       | Restricted     | Financial movements            |
| audit.logs                       | Confidential   | Security-sensitive audit trail |
| integration.provider_connections | Restricted     | Encrypted API credentials      |
| feature_flag.feature_flags       | Internal       | Configuration                  |

---

# 6. GDPR Readiness

## Lawful Basis

AutoShipp processes personal data under:

- **Contractual necessity** — processing user and customer data to deliver the contracted SaaS service
- **Legitimate interest** — security monitoring, fraud prevention, platform operations
- **Legal obligation** — financial record retention

---

## Data Subject Rights

| Right                        | Implementation                                             |
| ---------------------------- | ---------------------------------------------------------- |
| Right of Access (SAR)        | Platform admin can export all data for a user/org          |
| Right to Rectification       | Users can update their profile; admins can correct records |
| Right to Erasure             | Section 7 below                                            |
| Right to Portability         | Export APIs (CSV/JSON) for org data                        |
| Right to Object              | Suppression flags on marketing communications              |
| Right to Restrict Processing | Organization suspension preserves data without processing  |

---

## Data Residency

AutoShipp uses Neon PostgreSQL.

Neon supports region selection.

For EU customers, the database region must be set to an EU region (e.g., `eu-central-1`).

For India-based customers, DPDP compliance requires data to be stored within India or in jurisdictions with adequate protection agreements.

**Implementation:** Neon project region is set at provisioning time. EU-region projects and India-region projects are separate Neon projects, not schemas.

---

## Consent Management

AutoShipp is a B2B platform.

User data is processed under contractual necessity, not consent.

Consent management is required for:

- Marketing emails (opt-in required)
- Non-essential analytics (opt-in required)
- Promotional communications

Consent records are stored in `notification.notification_preferences`.

---

# 7. Data Deletion (Right to Erasure)

## User Erasure

When a user requests erasure:

```text
1. Pseudonymize PII in identity.users:
   - email → "deleted_<uuid>@deleted.autoshipp.in"
   - first_name → "Deleted"
   - last_name → "User"
   - phone → NULL
   - avatar_url → NULL

2. Retain identity.users row (for FK integrity and audit)

3. Revoke all sessions (increment token_version by 999)

4. Mark identity.users.status = ARCHIVED

5. Retain audit.logs unchanged (legal obligation)

6. Retain billing.invoices unchanged (financial record legal obligation)

7. Emit identity.user.erased event

8. Log erasure in audit.logs with user consent reference
```

**What is NOT deleted:**

- Audit logs (legal obligation — immutable by design)
- Financial records (tax law retention requirements)
- Anonymized analytics (no PII present after pseudonymization)

---

## Organization Erasure

When an organization requests deletion:

```text
1. Pseudonymize customer.customers PII
2. Archive all orders and invoices (retain for 7 years — tax law)
3. Remove integration credentials (integration schema — actual deletion)
4. Soft-delete organization (organization.organizations.deleted_at)
5. Revoke all active sessions for all org members
6. Cancel subscriptions
7. Return unused wallet credits (refund flow)
8. Retain audit logs
9. Emit organization.erased event
```

---

# 8. Data Retention Policy

| Data Type                              | Retention Period                             | Legal Basis             |
| -------------------------------------- | -------------------------------------------- | ----------------------- |
| Financial records (invoices, payments) | 7 years                                      | Tax law (India: IT Act) |
| Audit logs                             | 5 years                                      | Security and compliance |
| User PII                               | Until erasure request + 30 days buffer       | GDPR / DPDP             |
| Customer PII                           | Until organization deletion + 30 days buffer | GDPR / DPDP             |
| Session data                           | 90 days after expiry                         | Security                |
| Login history                          | 2 years                                      | Security monitoring     |
| Export files                           | 7 days                                       | Operational             |
| Sync logs                              | 30 days                                      | Debugging               |
| Application logs                       | 90 days                                      | Debugging               |

---

# 9. Access Review Process

Quarterly:

1. Platform generates report: all active memberships by organization
2. Architecture/security team reviews Platform-level users
3. Aggregator owners review their own team memberships
4. Brand admins review their own team memberships
5. Terminated users are removed within 24 hours
6. Review completion is logged in audit.logs

---

# 10. Key Rotation Policy

| Key Type                   | Rotation Frequency    | Implementation                                         |
| -------------------------- | --------------------- | ------------------------------------------------------ |
| JWT signing secret         | 90 days               | Token version increment handles graceful rotation      |
| Database credentials       | 180 days              | Neon credential rotation                               |
| Integration API keys       | On-demand or 180 days | integration.provider_connections encrypted store       |
| Object storage credentials | 180 days              | Provider-managed rotation                              |
| Encryption keys (AES-256)  | Annual                | Key versioning — old keys retained for decryption only |

Key rotation events are logged to audit.logs.

---

# 11. Supplier/Vendor Management

| Supplier               | Service            | Data Access                     | SLA / Compliance         |
| ---------------------- | ------------------ | ------------------------------- | ------------------------ |
| Neon                   | PostgreSQL hosting | All platform data               | SOC 2 Type II            |
| Cloudflare             | CDN + DDoS         | Traffic metadata                | SOC 2 Type II, ISO 27001 |
| Upstash Redis / BullMQ | Message broker     | Event payloads                  | SOC 2 Type II            |
| Razorpay               | Payment processing | Payment tokens only             | PCI DSS                  |
| Resend / SMTP          | Email delivery     | Email content                   | GDPR-compliant           |
| Sentry                 | Error monitoring   | Stack traces, sanitized context | SOC 2 Type II            |
| Upstash / Redis        | Caching            | Session metadata, cache         | SOC 2 Type II            |
| OpenAI / AI Provider   | AI inference       | Prompt content                  | Enterprise DPA           |

**Rule:** Every supplier with access to personal data must have a signed Data Processing Agreement (DPA) on file before integration is activated.

---

# 12. Risk Register

| Risk                                  | Likelihood | Impact   | Mitigation                                    |
| ------------------------------------- | ---------- | -------- | --------------------------------------------- |
| Data breach via SQL injection         | Low        | Critical | Prisma ORM, RLS, input validation             |
| Tenant data leakage (app bug)         | Medium     | Critical | RLS on high-risk tables (AES-029 Section 13a) |
| Credential compromise                 | Medium     | High     | Envelope encryption, secret rotation          |
| DDoS                                  | Medium     | High     | Cloudflare, rate limiting                     |
| Insider threat                        | Low        | High     | Least privilege, audit logs, access reviews   |
| Third-party supplier breach           | Low        | High     | Supplier DPAs, data minimization              |
| Ransomware                            | Low        | Critical | PITR backups, immutable audit logs            |
| Regulatory non-compliance (GDPR/DPDP) | Medium     | High     | Data retention + erasure flows (Section 7)    |
| Payment processor outage              | Medium     | Medium   | Retry logic, grace periods (AES-037)          |

---

# 13. Legal Hold

When a legal hold is placed on an organization:

```text
1. Platform admin marks organization with legal_hold = TRUE

2. All deletion and erasure requests for that organization are blocked

3. Data retention timers are paused

4. Audit log records the hold, the requesting authority, and the case reference

5. Only a Platform OWNER may lift a legal hold

6. Lifting a legal hold is double-audited (two separate audit entries)
```

Legal hold is stored in `organization.organization_metadata` JSONB:

```json
{
  "legal_hold": true,
  "legal_hold_reason": "Regulatory investigation",
  "legal_hold_reference": "CASE-2027-001",
  "legal_hold_imposed_by": "user_uuid",
  "legal_hold_imposed_at": "2027-01-15T10:00:00Z"
}
```

---

# 14. Compliance Evidence

For SOC 2 and ISO 27001 audits, AutoShipp must produce:

| Evidence Type              | Source                                             |
| -------------------------- | -------------------------------------------------- |
| Access control records     | identity.memberships + identity.user_roles exports |
| Authentication logs        | identity.login_history exports                     |
| Change management records  | Git history + PR audit trail                       |
| Incident records           | audit.logs + Sentry incident history               |
| Backup verification        | Neon PITR test restore records                     |
| Vendor DPAs                | Document repository (outside platform)             |
| Security training records  | HR records                                         |
| Penetration test results   | Annual third-party pen test reports                |
| Vulnerability scan results | CI dependency audit reports                        |

Platform provides an **Audit Export API** (Platform OWNER only):

```text
POST /platform/compliance/export

Body:
{
  "type": "SOC2_EVIDENCE",
  "startDate": "2026-01-01",
  "endDate": "2026-12-31",
  "scopes": ["access_reviews", "login_history", "audit_logs"]
}
```

Generates a signed, tamper-evident ZIP archive.

---

# 15. Incident Response

When a security incident is detected:

```text
Detection → Classification → Containment → Investigation → Remediation → Disclosure → Postmortem
```

| Phase          | Action                           | Owner         | SLA                           |
| -------------- | -------------------------------- | ------------- | ----------------------------- |
| Detection      | Alert fires via Sentry/Grafana   | On-call       | Immediate                     |
| Classification | P1/P2/P3 assigned                | Lead engineer | < 15 min                      |
| Containment    | Block affected accounts/IPs      | Security      | < 1 hour                      |
| Investigation  | Root cause analysis              | Engineering   | < 4 hours                     |
| Remediation    | Fix deployed                     | Engineering   | < 24 hours                    |
| Disclosure     | Affected customers notified      | Leadership    | < 72 hours (GDPR requirement) |
| Postmortem     | Written and published internally | Engineering   | < 1 week                      |

**GDPR requirement:** Data breaches affecting EU personal data must be reported to the relevant supervisory authority within **72 hours** of discovery.

---

# 16. Penetration Testing

Scheduled:

- **Annual:** Full-platform external penetration test by a qualified third party
- **On major release:** Targeted API security review
- **On architecture change:** Focused review of affected components

Findings are tracked in a security backlog. Critical findings block the next release. High findings must be remediated within 30 days.

---

# 17. Implementation Roadmap

Not all controls need to exist on Day 1. This is the recommended progressive implementation:

| Phase                               | Controls                                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------- |
| **Phase 1 (MVP)**                   | Authentication, RBAC, audit logging, HTTPS, input validation, dependency scanning         |
| **Phase 2 (First customers)**       | Session management, rate limiting, CSP, data retention policy, access reviews             |
| **Phase 3 (First enterprise deal)** | SOC 2 preparation, vendor DPAs, penetration test, GDPR erasure flows, legal hold          |
| **Phase 4 (Scale)**                 | SOC 2 Type II audit, ISO 27001 gap assessment, formal key rotation, compliance export API |

---

# 18. Decision Register

| ID    | Decision                                                                          | Status    |
| ----- | --------------------------------------------------------------------------------- | --------- |
| D-421 | SOC 2 Type I is the first compliance target                                       | ✅ Locked |
| D-422 | PCI DSS scope is limited to SAQ-A via Razorpay; AutoShipp stores no card data     | ✅ Locked |
| D-423 | User erasure uses pseudonymization; audit logs and financial records are retained | ✅ Locked |
| D-424 | Financial records are retained 7 years per Indian tax law                         | ✅ Locked |
| D-425 | All suppliers with PII access require a signed DPA before integration             | ✅ Locked |
| D-426 | Legal holds block all deletion and erasure operations                             | ✅ Locked |
| D-427 | Security incidents with EU PII must be disclosed within 72 hours per GDPR         | ✅ Locked |
| D-428 | Annual third-party penetration test is mandatory                                  | ✅ Locked |
| D-429 | Compliance evidence is exportable via a dedicated Platform API                    | ✅ Locked |
| D-430 | Compliance implementation follows the 4-phase roadmap tied to business milestones | ✅ Locked |

---

# AES-043 — AutoShipp Intelligence Platform

**Document ID:** AES-043
**Title:** AutoShipp Intelligence Platform
**Version:** 1.0.0
**Status:** Approved
**Owner:** AutoShipp Platform

---

# 1. Executive Summary

The AutoShipp Intelligence Platform is a core architectural pillar. It operates as the primary sales engine, an automated consultant, and a continuous value driver for brands.

By analyzing a brand's normalized commerce data and frontend website, the Intelligence Platform identifies revenue leakage, operational inefficiencies, and security risks. It scores the business, benchmarks it against industry standards, and explicitly matches problems to AutoShipp products that can solve them.

---

# 2. Trigger Flow

The platform operates continuously, beginning at onboarding:

```text
Store Connected
      ↓
Initial Analysis
      ↓
Weekly Analysis
      ↓
Monthly Deep Audit
      ↓
Continuous Intelligence
```

---

# 3. Internal Architecture

The Intelligence Platform is designed with clean internal boundaries to allow future extraction into independent microservices.

```text
AutoShipp Intelligence Platform
│
├── Website Intelligence
│   ├── Playwright Crawler
│   ├── Lighthouse Analyzer
│   ├── SEO Analyzer
│   └── Security Scanner
│
├── Commerce Intelligence
│   ├── Shopify Collector (via Commerce Sync)
│   ├── Metrics Engine
│   ├── Customer Analytics
│   └── Inventory Analytics
│
├── AI Intelligence
│   ├── LLM Orchestrator
│   ├── Recommendation Engine
│   ├── ROI Engine
│   ├── Benchmark Engine
│   ├── Executive Report Generator
│   └── Opportunity Detector
│
└── Intelligence Scheduler (BullMQ)
    ├── Initial Scan
    ├── Weekly Scan
    ├── Monthly Audit
    └── Manual Scan
```

---

# 4. Intelligence Scoring

The AI does not just analyze; it scores. Every store receives a dynamic scorecard that recommendations aim to improve.

**Example Scorecard:**

```text
Overall Score: 83 / 100

Business:    88
Technical:   79
Marketing:   81
Security:    91
Operations:  74
```

---

# 5. Industry Benchmarking

Recommendations are driven by comparative benchmarking to increase persuasiveness.

**Example Insight:**

> "Apparel stores with ₹50L–₹1Cr monthly GMV average a 14.1% COD rejection rate. Your store is at 22.4%. You are 59% above the benchmark, resulting in an estimated ₹58,000 of lost revenue per month."

---

# 6. Executive Reporting (Narrative-Driven)

Dashboards are secondary. The primary output is a narrative-driven CEO report.

**Example Report:**

> **Executive Summary**
> We analyzed your Shopify store and identified 14 opportunities.
>
> Your COD rejection rate (24.8%) is significantly above the industry benchmark (13.9%), resulting in an estimated ₹58,000 of lost revenue per month.
>
> Your mobile performance score is 48/100, and your average product page load time is 5.9 seconds, which likely contributes to conversion loss.
>
> Based on our analysis, implementing **Delivery ETA** and **Returns Management** could recover approximately ₹72,000/month with high confidence.

---

# 7. AI Cost Control

Every LLM request incurs a variable cost. The Intelligence Platform enforces strict cost controls to ensure profitability at scale.

## 7.1 Model Abstraction & Fallback

The platform abstracts the LLM provider.

```text
OpenAI GPT-4o
      ↓ (Unavailable / Rate Limited)
Gemini 1.5 Pro
      ↓ (Unavailable)
Cached Result / Graceful Degradation
```

## 7.2 Tiered Model Sizing

- **Large/Enterprise Stores:** Use high-parameter models (e.g., GPT-4o) for deep, nuanced analysis.
- **Small/Free Stores:** Use highly efficient models (e.g., GPT-4o-mini / Claude 3 Haiku) to preserve margins.

## 7.3 Token Budgets & Caching

- **Prompt Caching:** Unchanging inputs (e.g., standard platform capability definitions) are cached at the LLM level.
- **Request Quotas:** Brands are limited to a specific number of manual re-scans per month unless they purchase additional AI credits.
- **Token Budgets:** Maximum input/output token limits are enforced per analysis run.

---

# 8. AI Roadmap

The Intelligence Platform will be built in phases to manage complexity:

- **V1:** Analysis, Narrative Reports, Product Recommendations (MVP Onboarding).
- **V2:** Weekly Insights, Trend Analysis, Industry Benchmarking.
- **V3:** Predictive Analytics, Revenue Forecasting, Churn Prediction, Inventory Forecasting.
- **V4:** Autonomous AI Assistant (Chat interface for store operators).

---

# AES-044 - Platform Super Admin & Organization Service Governance Specification

**Document ID:** AES-044

## 1. Purpose

Formally incorporates the Platform Super Admin architecture into the AutoShipp architecture. Establishes the authorization model, target-organization administration semantics, and product governance for Platform administrators.

## 2. Scope

This specification defines the boundaries of Platform Super Admin capabilities, separating complete Organization Domain administration from Product Service Governance.

## 3. Platform Super Admin Definition

A Platform Super Admin is an authenticated user with `user_type = PLATFORM` who is authorized to administer target Organizations without holding a membership in them.

## 4. Decision Register

| ID    | Decision                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Status    |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| D-431 | Platform Super Admin Organization Domain administration is assigned to users with `user_type = PLATFORM` holding the `OWNER` role and the required organization-management permission/capability. The authorization pipeline utilizes `UserTypeGuard` to resolve the target organization context from the request without requiring the Platform user to hold a membership in that target organization. This authorization completes the suite of explicitly defined OWNER-only capabilities by granting the right to administer the target Organization through the Platform Organization Domain APIs. All actions are executed in the explicit target organization's context, strictly backend-enforced at the service layer, validated against cross-tenant operation, and fully audited. Product availability governance remains available to OWNER and MANAGER roles as established in AES-037. | ✅ Locked |

## 5. Authorization Model

The authorization model for Platform Super Admins utilizes the existing established pipeline (`JwtAuthGuard → UserTypeGuard → PermissionGuard`). The `UserTypeGuard` skips target-organization membership validation for `user_type = PLATFORM` users. Privileged operations remain service-layer enforced.

## 6. Target-Organization Context

All actions by a Platform Super Admin are executed in the explicit target organization's context.

## 7. Organization Governance Scope

The Organization Domain encompasses:

- Identity
- Metadata
- Contacts
- Addresses
- Settings
- Lifecycle
- Transfer

**Authorization:** `PLATFORM + OWNER`
_(Note: Create Platform Users, Transfer Organizations, Archive Organizations, Create Products, and Modify Billing Rules are explicitly established as OWNER-only capabilities per AES-005. This amendment extends Organization Domain authorization to cover the remaining sub-resources without rewriting existing decisions)._

## 8. Product Service Governance Scope

Product governance remains managed via `marketplace.product_assignments`.

**Authorization:** `PLATFORM + OWNER` or `PLATFORM + MANAGER`
_(Note: Manual suspend/restore is explicitly established by AES-037 for both OWNER and MANAGER roles)._

## 9. Product Enable/Disable Semantics

- **Disable:** Platform OWNER or MANAGER may manually suspend product access using the existing `MANUAL_ADMIN_ACTION` mechanism.
- **Enable:** Platform OWNER or MANAGER may explicitly restore a product assignment previously suspended through `MANUAL_ADMIN_ACTION`, according to the existing AES-037 restoration semantics. Billing lifecycle events do not automatically restore `MANUAL_ADMIN_ACTION` suspensions.

## 10. Organization Settings/Configuration Relationship

Organization settings remain under the Organization Domain and are governed by `PLATFORM + OWNER` authority, independent of Product Governance.

## 11. Tenant Isolation Requirements

Tenant isolation is not generally disabled. Unauthorized cross-tenant operations must still be rejected. The implementation must validate that a Platform administrator cannot accidentally operate on the wrong target organization.

## 12. Audit Requirements

All Platform actions are explicitly audited. Existing audit models (AES-017, AES-037) apply.

## 13. Backend Enforcement Requirements

Platform administrative features must have backend authorization enforced at the service layer. Platform governance controls must not rely on frontend visibility as enforcement.

## 14. Terminology Mappings

- **"sub-brand"**: Refers to a `BRAND` type organization under an `AGGREGATOR`. No fourth organization type (`SUB_BRAND`) is introduced.
- **"supported AutoShipp service"**: Maps to a customer-facing Product for this amendment only.

## 15. Architecture Cross-References

- **AES-004:** Organization Domain
- **AES-005:** IAM & Privilege Escalation
- **AES-010:** Organization Schema & Settings
- **AES-029:** Multi-Tenant & RLS
- **AES-037:** Product Assignment Lifecycle

## 16. Preservation Statements

- **Organization Types:** Exactly three organization types exist (`PLATFORM`, `AGGREGATOR`, `BRAND`). No new organization type is introduced.
- **Guard Pipeline:** The existing guard pipeline is preserved. No new guard is introduced.
- **Product Governance:** Product Governance continues using existing `marketplace.product_assignments`.
