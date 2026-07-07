# Team Engineering Handbook

_(Formerly the Collaborative Development Plan)_

This handbook serves as the single source of truth for how the team operates, writes code, and ships features. It is designed to bridge the gap between hardware asymmetry (GPU/Docker vs. Non-Docker) while maintaining startup-grade velocity.

---

## Temporary Priority First

> **⚠️ URGENT:** This section temporarily overrides standard processes to serve a single live client immediately. Do **not** connect this implementation with the main architecture or alter long-term plans.

**Goal:** Allow our single live client to log in and view the dashboard for the two currently ready features in production today.

**Scope & Shortcuts:**

- **Feature 1:** Already built and live via a public link. The temporary dashboard will simply embed (iframe) or link out to this existing page.
- **Feature 2:** Needs to be integrated/displayed on the new temporary dashboard.
- **Authentication:** Implement a lightweight, simplified login mechanism using new, hardcoded credentials (e.g., `momcreadlz@autoshipp.com`) that we will provide to the client.
- **Process:** We will bypass complex architectural requirements ("the hard parts") to ensure rapid delivery.

**Ownership & Workload Assessment:**

- **Initial Step:** Abbas will evaluate the required work for this temporary dashboard.
- **Small/Moderate Workload:** Abbas will take sole ownership and complete it.
- **Large Workload:** Abbas and Grannie will collaborate to split the tasks and get it shipped immediately.

**Execution Plan:**

1.  **Workload Assessment:** Decide ownership (Abbas solo vs. Abbas + Grannie).
2.  **Temporary Login:** Create a quick login route bypassing complex auth, using the newly generated hardcoded credentials.
3.  **Dashboard Hub:** Create an isolated temporary dashboard page.
4.  **Integrate Features:** Add the link/iframe for Feature 1, and build the quick UI for Feature 2.
5.  **Ship to Production:** Push this temporary, isolated fix to the main production environment for immediate client access.

---

## Quick Start

Get up and running in minutes based on your hardware profile.

**For Abbas (Docker + Heavy Compute):**

```bash
git clone git@github.com:org/repo.git
cd repo
pnpm install
docker compose up -d
pnpm dev
```

**For Grannie (No Docker + Light Compute):**

```bash
git clone git@github.com:org/repo.git
cd repo
pnpm install
cp .env.example .env.local
pnpm dev
```

---

## Table of Contents

**Part I — Team & Principles**

1. [Guiding Principles](#1-guiding-principles)
2. [Team Composition](#2-team-composition)
3. [Architecture Ownership Matrix](#3-architecture-ownership-matrix)

**Part II — Development Environment** 4. [Tech Stack](#4-tech-stack) 5. [Architecture Diagram](#5-architecture-diagram) 6. [Local Environment Matrix & Remote Dev Flow](#6-local-environment-matrix--remote-dev-flow) 7. [Initial Bootstrap Checklist](#7-initial-bootstrap-checklist)

**Part III — Workflow** 8. [Shared Workflow & Branching](#8-shared-workflow--branching) 9. [Merge Policy](#9-merge-policy) 10. [Code Review Guidelines](#10-code-review-guidelines) 11. [Definition of Done (DoD)](#11-definition-of-done-dod)

**Part IV — Planning** 12. [Task Management & Living Backlog](#12-task-management--living-backlog) 13. [Sprint & Planning Strategy](#13-sprint--planning-strategy) 14. [Task Sizing](#14-task-sizing) 15. [Project Roadmap](#15-project-roadmap)

**Part V — Engineering Standards** 16. [API Contract & Versioning Policy](#16-api-contract--versioning-policy) 17. [Database Migration Workflow](#17-database-migration-workflow) 18. [Testing Strategy](#18-testing-strategy) 19. [Security Checklist](#19-security-checklist) 20. [Performance Budget](#20-performance-budget) 21. [Coding Standards](#21-coding-standards)

**Part VI — Delivery** 22. [CI Pipeline, Release Process & Checklist](#22-ci-pipeline-release-process--checklist) 23. [Incident Playbook & Rollback Strategy](#23-incident-playbook--rollback-strategy)

**Part VII — Operations** 24. [Monitoring & Observability](#24-monitoring--observability) 25. [Project KPIs & Success Metrics](#25-project-kpis--success-metrics) 26. [Risk Severity Log](#26-risk-severity-log) 27. [Communication Rules](#27-communication-rules) 28. [Versioning Strategy](#28-versioning-strategy) 29. [Dependency Update Schedule](#29-dependency-update-schedule) 30. [Documentation, ADRs & Repo Structure](#30-documentation-adrs--repo-structure) 31. [Backup Responsibilities](#31-backup-responsibilities) 32. [Environment Configuration](#32-environment-configuration)

---

## Part I — Team & Principles

### 1. Guiding Principles

**Required (Non-Negotiable):**

- Branch protection is strictly enforced.
- CI must be green before merging.
- Tests must pass.
- PR review is required (minimum 1 approval).
- Definition of Done (DoD) must be met.

**Recommended (Highly Encouraged):**

- Keep PRs under 300 lines.
- Merge to `main` daily.
- Mock APIs before waiting for backend completion.
- Refactor and improve docs during idle time.

### 2. Team Composition

- **Abbas (Core Dev):** RTX 4050 GPU, Intel i5 13th Gen, supports Docker. (High Compute)
- **Grannie:** Intel i5 12th Gen, NO dedicated GPU, NO Docker. (Light Compute)

### 3. Architecture Ownership Matrix

| Area              | Owner   | Backup                |
| :---------------- | :------ | :-------------------- |
| **Repository**    | Abbas   | Grannie               |
| **CI/CD**         | Abbas   | —                     |
| **Backend**       | Abbas   | Grannie (minor fixes) |
| **Database**      | Abbas   | —                     |
| **Frontend**      | Grannie | Abbas                 |
| **UI Components** | Grannie | Abbas                 |
| **API Contracts** | Shared  | Shared                |
| **Documentation** | Shared  | Shared                |
| **Releases**      | Abbas   | Shared                |

---

## Part II — Development Environment

### 4. Tech Stack

| Layer               | Recommendation                 | Reason                               |
| :------------------ | :----------------------------- | :----------------------------------- |
| **Frontend**        | Next.js + TypeScript           | Mature ecosystem, SSR/CSR support    |
| **Backend**         | NestJS or Express + TypeScript | Same language across stack           |
| **ORM**             | Prisma                         | Excellent migrations and type safety |
| **Database**        | PostgreSQL                     | Production-ready                     |
| **Cache**           | Redis                          | Sessions, caching                    |
| **Auth**            | JWT + Refresh Tokens           | Simple MVP authentication            |
| **Package Manager** | pnpm                           | Fast, workspace support              |
| **Monorepo**        | Turborepo (optional)           | Scales well if project grows         |

### 5. Architecture Diagram

```text
          GitHub
             │
             ▼
     GitHub Actions
             │
             ▼
      Preview Deployment
             │
     ┌───────┴────────┐
     ▼                ▼
 Next.js         NestJS API
     │                │
     └──────┬─────────┘
            ▼
        PostgreSQL
            │
      ┌─────┴─────┐
      ▼           ▼
    Redis      Object Storage
```

### 6. Local Environment Matrix & Remote Dev Flow

| Component      | Abbas                 | Grannie               |
| :------------- | :-------------------- | :-------------------- |
| **Frontend**   | Local (`npm run dev`) | Local (`npm run dev`) |
| **Backend**    | Local (Docker)        | Remote Dev API        |
| **PostgreSQL** | Docker                | Neon (Cloud)          |
| **Redis**      | Docker                | Upstash (Cloud)       |

**Remote Development Flow (For Grannie):**

- The `development` branch auto-deploys to a shared staging environment.
- Abbas deploys backend changes automatically after merging.
- Grannie always targets the latest development API.

### 7. Initial Bootstrap Checklist

- [x] Create GitHub repository & configure branch protection
- [x] Add LICENSE & README
- [x] Configure ESLint & Prettier
- [x] Configure Husky & Commitlint
- [x] Configure GitHub Actions
- [x] Create `.env.example` & `docs/` folder
- [x] Create first release milestone

---

## Part III — Workflow

### 8. Shared Workflow & Branching

**Branch Strategy:** `main` | `feature/*` | `bugfix/*` | `hotfix/*` | `release/*`

### 9. Merge Policy

Merge only if:

- [x] CI passes
- [x] One approval (from teammate)
- [x] No merge conflicts
- [x] Linked issue completed
- [x] DoD satisfied

### 10. Code Review Guidelines

| PR Size           | Review Strategy              |
| :---------------- | :--------------------------- |
| **<100 lines**    | Single reviewer, fast track. |
| **100–300 lines** | Thorough review.             |
| **>300 lines**    | Split before merging.        |

**Checklist:** Readability, Naming, Edge cases, Tests, Performance, Security, Documentation.

### 11. Definition of Done (DoD)

- [x] Code builds & Lint passes
- [x] Tests pass
- [x] Documentation updated
- [x] API contract updated (if changed)
- [x] PR approved & CI green
- [x] Feature behind flag if incomplete

---

## Part IV — Planning

### 12. Task Management & Living Backlog

**Living Backlog Priority:**

- **P0:** Authentication, Database schema
- **P1:** Dashboard, CRUD operations
- **P2:** Notifications, Analytics

**Idle-Time Task Queue:**
`Improve Docs → Refactor → Test Coverage → Accessibility → Performance → Bug Hunt`

### 13. Sprint & Planning Strategy

Avoid heavyweight Scrum. Use lightweight Kanban.

- **Monday:** Plan next tasks (30 min), review backlog, assign ownership.
- **Daily:** Async updates, small PRs.
- **Friday:** Demo completed work, Retrospective (15 min), prep next sprint.

### 14. Task Sizing

No task should exceed 3 days without being decomposed.
**XS:** < 2 hours | **S:** Half day | **M:** 1 day | **L:** 2–3 days | **XL:** Split before starting

### 15. Project Roadmap

- **[x] Phase 1 Foundation**
- **[x] Phase 2 Authentication**
- **[x] Phase 3 CRUD**
- **[x] Phase 4 Dashboard**
- **[x] Phase 5 Testing**
- **[ ] Phase 6 Production**
- **[ ] Phase 7 Enhancements**

---

## Part V — Engineering Standards

### 16. API Contract & Versioning Policy

`OpenAPI Spec → Generate TypeScript types → Frontend imports generated types`

**API Versioning Rules:** (e.g., `/api/v1` to `/api/v2`)

- Never introduce breaking changes inside the same version.
- Deprecate old endpoints before removal.
- Update the OpenAPI spec whenever an endpoint changes.

### 17. Database Migration Workflow

No manual database edits are permitted.
`Schema Change → Create Migration → Review Migration → Run Locally → Apply to Dev Database → Merge → Apply to Production`

### 18. Testing Strategy

- **Unit Tests:** Feature Developer (>90% Critical)
- **Integration Tests:** Abbas
- **UI Tests:** Grannie
- **Smoke/Manual:** Shared

### 19. Security Checklist

For every release:

- [x] Input validation, Auth/Authz checks
- [x] SQL injection, XSS, CSRF protection
- [x] Dependency vulnerability & Secret scanning
- [x] Rate limiting & Secure HTTP headers

### 20. Performance Budget

- **Frontend:** First Load JS < 250 KB, Lighthouse > 90, LCP < 2.5s.
- **Backend:** API response < 300 ms (avg), DB query < 100 ms, No N+1 queries.

### 21. Coding Standards

- ESLint + Prettier + EditorConfig
- Husky pre-commit hooks + Commitlint (`feat(auth): ...`, `fix(ui): ...`)

---

## Part VI — Delivery

### 22. CI Pipeline, Release Process & Checklist

**Pull Request CI:**
`Node Setup → pnpm install → Lint → Test → Type Check → Build → Preview Deploy`

**Production Release Checklist:**

- [x] CI passing & Tests passing
- [x] Documentation updated
- [x] Database migration verified
- [x] Feature flags & Env variables reviewed
- [x] Smoke test completed
- [x] Release tagged & Rollback plan confirmed

### 23. Incident Playbook & Rollback Strategy

**Incident Response:**
`Bug Report → Reproduce → Assign Owner → Create Hotfix Branch → Fix → Review → Deploy → Verify → Close`

**Rollback Strategy:**
`Production Issue → Rollback Deployment → Restore Previous Version → Verify Health → Investigate Root Cause → Fix → Redeploy`

---

## Part VII — Operations

### 24. Monitoring & Observability

- **Stack:** Sentry, Structured Logging, Uptime monitoring, GitHub Actions alerts.
- **Flow:** Deployment Success → Error Rate → API Latency → Database Health → Frontend Crashes.

### 25. Project KPIs & Success Metrics

**Operational KPIs:**

- Average PR merge time < 24 hours
- Build success rate > 95%
- Mean time to fix bugs < 2 days
- Open blocker issues = 0
- Production hotfixes < 2/month

**MVP Success Metrics:**

- Users can sign up/login, Core CRUD works, Mobile responsive, Error handling implemented.

### 26. Risk Severity Log

| Risk                   | Severity | Likelihood | Mitigation                                        |
| :--------------------- | :------- | :--------- | :------------------------------------------------ |
| **API Delay**          | High     | Medium     | Mock-driven UI development via MSW.               |
| **DB Migration Error** | High     | Low        | Rollback Scripts & strict ORM usage.              |
| **Merge Conflicts**    | Medium   | High       | Daily integrations, PRs <300 lines.               |
| **Environment Drift**  | High     | Medium     | Shared `.env.example`, strict Environment Matrix. |

### 27. Communication Rules

| Situation               | Action                        |
| :---------------------- | :---------------------------- |
| **Blocked < 30 min**    | Investigate independently.    |
| **Blocked > 1 hour**    | Notify teammate.              |
| **API contract change** | Update OpenAPI before coding. |
| **DB schema change**    | Discuss before merging.       |
| **Breaking change**     | Pair review required.         |
| **Production issue**    | Immediate notification.       |

### 28. Versioning Strategy

`v0.1.0` (MVP) → `v0.2.0` (Features) → `v0.2.1` (Bug Fix) → `v1.0.0` (Production Release)

### 29. Dependency Update Schedule

| Frequency     | Work                    |
| :------------ | :---------------------- |
| **Weekly**    | Patch updates           |
| **Monthly**   | Minor version updates   |
| **Quarterly** | Major dependency review |

### 30. Documentation, ADRs & Repo Structure

**Repository Structure:**
`apps/frontend`, `apps/backend`, `packages/shared-types`, `docs/`, `.github/`, `scripts/`, `docker/`

**Documentation Structure:**
`architecture.md`, `api.md`, `setup.md`, `deployment.md`, `troubleshooting.md`, `decisions.md` (ADR Log).

### 31. Backup Responsibilities

- **Abbas Backup:** Grannie handles frontend, docs, tests, minor backend fixes.
- **Grannie Backup:** Abbas handles UI integration and urgent frontend fixes.

### 32. Environment Configuration

Use `.env.example`, `.env.local`, `.env.development`, `.env.production`. Never commit secrets.
