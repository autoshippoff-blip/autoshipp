---
title: "Start Here"
type: "general"
status: "active"
owner: "engineering"
last_verified: "2026-07-16"
tags:
  - general
---

# AutoShipp Platform — Database Knowledge Base

Welcome to the definitive engineering documentation for the AutoShipp Platform Database.
This documentation is written for software engineers, data architects, and analysts onboarding to the AutoShipp backend.

You do not need to open PostgreSQL or read the application source code to understand how data moves through this system. Everything you need is here.

## Documentation Map

### 🧭 1. Start Here (Core Concepts)

If you are new to the codebase, read these first:

- [[Database Overview]] - The 10,000-foot view.
- [[Tenant Isolation Guide]] - How we separate customer data without physical foreign keys across schemas.
- [[Canonical vs Legacy Guide]] - Crucial for avoiding technical debt. Know which tables to query and which to ignore.

### 🏛️ 2. Business Domains (The "Why")

Understand the business purpose, lifecycle, and common queries for our major subsystems:

- [[Core Infrastructure]]
- [[Identity and RBAC|Identity & RBAC]]
- [[Customer Domain]]
- [[Commerce Domain]]
- [[Fit Engine]]
- [[Fit Governance|Governance]]
- [[Fit Replay|Replay & Recovery]]
- [[Experimentation]]
- [[Shopify Integration]]

### 🔄 3. Workflows (The "How")

Visual and step-by-step guides on how data flows through the system across domains:

- [[Account Onboarding]]
- [[Fit Recommendation Lifecycle]]
  _(More workflows in the [[Workflow MOC]])._

### 📖 4. Reference (The "What")

Exhaustive, programmatic exports of the database schema for exact column lookups:

- [[Business Glossary|Business Glossary & Data Dictionary]]
- [[Table Reference]]
- [[Column Reference]]
- [[Constraint Reference|Constraints & Relationships]]
- [[Sample Data]]
- [[Mermaid Diagrams|Mermaid ER Diagrams]]

### 🩺 5. Maintenance, Support, & Future

- [[Entity Lifecycles]]
- [[Business Rules]]
- [[Developer Cookbook]]
- [[Architecture Decisions|Architecture Decisions (ADRs)]]
- [[Future Architecture|Future Architecture Roadmap]]
- [[JSON Structure Reference]]
- [[Database Health Report]]
- [[Legacy Objects]]
- [[Maintenance Guide|Long-Term Maintenance Guide]]

---

_Generated directly from the live `ep-dawn-mountain` Neon database._

### ⚙️ 6. Operations & Governance

- [[Operations MOC]]
- [[Governance MOC]]
- [[Search Guide]]
