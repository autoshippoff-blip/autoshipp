---
trigger: always_on
---

# WORKSPACE_RULES.md

# AutoShipp Platform - Workspace Rules

## 1. Mandatory Context Loading

Before starting ANY task, ALWAYS read and follow:

1. AGENT.md (Hard Rules - highest priority)
2. Full-architecture-file-autoshipp.md (System source of truth, specifically AES-000 to AES-043)
3. collaborative_dev_plan.md (Team Engineering Handbook)

Priority Order:

AGENT.md > Full-architecture-file-autoshipp.md > collaborative_dev_plan.md > current task request

If any instruction conflicts:

* Follow AGENT.md
* Then Full-architecture-file-autoshipp.md
* Then collaborative_dev_plan.md

Never ignore these files.

---

## 2. No Assumptions Rule

Assumptions are strictly prohibited.

If ANY of the following are unclear:

* Business requirement
* API behavior
* Data structure
* Shopify Integration behavior
* Edge case handling
* Missing schema information

STOP.

Ask questions.

Do not invent behavior.
Do not guess.
Do not create placeholder business logic unless explicitly requested.

---

## 3. Architecture Is The Source Of Truth

Whenever uncertainty exists:

* Re-read `Full-architecture-file-autoshipp.md` (check the relevant AES-XXX section)
* Follow the architecture exactly
* Do not redesign architecture
* Do not simplify architecture
* Do not replace architecture decisions

Architecture decisions are already approved.

Examples:

* Multi-tenant RLS design (AES-029)
* BullMQ Job Scheduler implementation (AES-022)
* AutoShipp Intelligence Platform (AES-043)
* Binary Asset Strategy (No S3/R2) (AES-025)
* Transactional Outbox (AES-036)

Must remain unchanged.

---

## 4. Development Plan Execution Rule

Follow the execution phases outlined in `collaborative_dev_plan.md` sequentially.

Phase 0 → Phase 1 → Phase 2 → Phase 3 → ... → Phase 9

Do not skip tasks. Do not jump ahead.

If a dependency is incomplete:

STOP. Report the blocker.

---

## 5. Multi-Tenant First Mindset

This platform is a B2B multi-tenant SaaS platform.

Every design decision must support:

* Tenant isolation
* Tenant scalability
* Tenant security

Never create features that assume a single merchant.

---

## 6. Tenant Isolation Rules

Mandatory:

Every tenant-scoped query MUST include:

`WHERE tenant_id = $tenantId`

Never:

* Query tenant data without tenant filtering
* Share cache across tenants
* Share memory across tenants

Redis keys must always be:

`key_type:tenant_id:resource`

Examples:

`session:{tenantId}:{sessionId}`
`shopify_sync:{tenantId}:{jobId}`
`intelligence_score:{tenantId}`

Violation of tenant isolation is a critical architecture failure.

---

## 7. Background Jobs & Messaging Rules

There is NO RabbitMQ in this platform.

ALL asynchronous tasks, queues, and background jobs MUST use **BullMQ** running on **Upstash Redis**.

Use modern **BullMQ Job Schedulers** (or Repeatable Jobs when necessary).

---

## 8. Commerce Sync Rules

Never call Shopify APIs directly from standard API controllers.

Always route external commerce data through the **Commerce Sync** layer (AES-011) and handle conflicts via the Synchronization & Conflict Resolution Specification (AES-038).

---

## 9. AutoShipp Intelligence Rules (AES-043)

The AutoShipp Intelligence Platform is the core AI analysis engine.

* **Crawler:** Fetches public store data.
* **Shopify Analyzer:** Analyzes synced Shopify data.
* **Scorer:** Generates Intelligence Scores and Industry Benchmarking.
* **Executive Report Generator:** Generates actionable reports.

The AI must NEVER execute commerce actions (like changing stock or pricing). It is strictly for analysis, scoring, and providing actionable insights for the brand.

---

## 10. Binary Asset Strategy (AES-025)

The platform has **NO binary storage**.
Do NOT introduce AWS S3, Cloudflare R2, or any blob storage.

* Reports are generated dynamically.
* CSV/XLSX files are streamed directly to the client.

---

## 11. Testing Rules

Every feature must include tests.

Mandatory tests:

* Tenant isolation tests
* BullMQ Job Queue failure recovery tests
* Commerce Sync data normalization tests
* Scorer logic tests

Never mark work complete without passing tests.

---

## 12. Deployment Rules

The infrastructure stack is strictly locked:

* **App Hosting:** Render
* **Database:** Neon PostgreSQL (Free Tier initially)
* **Message Broker / Cache:** Upstash Redis
* **Payments:** Razorpay
* **Email:** Resend

Do not introduce:

* Kubernetes
* Self-hosted infrastructure
* AWS / GCP / Azure specific services
* S3 / Cloudflare R2

Keep infrastructure aligned with the architecture specs.

---

## 13. Completion Checklist

Before marking any task complete:

* AGENT.md rules verified
* AES architecture compliance verified
* `collaborative_dev_plan.md` phase completed
* Tests passing
* Tenant isolation preserved
* No assumptions introduced
* No RabbitMQ or unauthorized services introduced
* No direct Shopify controller calls

Only then mark the task complete.

---

## 14. Agent Behaviour Requirements

For every response:

1. State what task is being worked on.
2. State which development-plan phase it belongs to.
3. State dependencies.
4. Identify blockers.
5. Ask questions when unclear.
6. Never assume missing information.
7. Explain architectural impact before major changes.
8. Keep implementation aligned with `Full-architecture-file-autoshipp.md`.
9. Follow AGENT.md without exception.
10. Stop and ask questions whenever ambiguity exists.

End of Workspace Rules.
