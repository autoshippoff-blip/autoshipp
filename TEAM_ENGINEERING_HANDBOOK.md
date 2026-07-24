# Team Engineering Handbook

_(Formerly the Collaborative Development Plan)_

This handbook serves as the single source of truth for how the team operates, writes code, and ships features. It is designed to bridge the gap between hardware asymmetry (GPU/Docker vs. Non-Docker) while maintaining startup-grade velocity.

---

## Temporary Priority First

> **⚠️ URGENT:** This section temporarily overrides standard processes to serve a single live client immediately.

**Temporary Implementation Rules:**

- Temporary implementations remain isolated.
- Temporary implementations must not become dependencies of permanent architecture.
- Temporary implementations must not modify long-term architectural decisions.
- Temporary implementations must never be promoted into permanent architecture without explicit architecture review and approval.
- Temporary implementations are replaced or removed once permanent implementations exist.

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
2. [Team Structure](#2-team-structure)
   - 2.1 [Feature Ownership Policy](#21-feature-ownership-policy)
   - 2.2 [Parallel Development Policy](#22-parallel-development-policy)
   - 2.3 [Feature Reservation & Lock Workflow](#23-feature-reservation--lock-workflow)
3. [Feature Ownership Registry](#3-feature-ownership-registry)

**Part II — Development Environment & Architecture** 4. [Architecture & Tech Stack Reference](#4-architecture--tech-stack-reference) 5. [Local Environment Matrix & Remote Dev Flow](#5-local-environment-matrix--remote-dev-flow) 6. [Initial Bootstrap Checklist](#6-initial-bootstrap-checklist)

**Part III — Workflow** 7. [Session Workflows](#7-session-workflows)

- 7.1 [Session Start Workflow](#71-session-start-workflow)
- 7.2 [Session End Workflow](#72-session-end-workflow)
- 7.3 [AI Collaboration Workflow](#73-ai-collaboration-workflow)
- 7.4 [Engineering Report Standard](#74-engineering-report-standard)

8. [Shared Workflow & Branching](#8-shared-workflow--branching)
9. [Merge Governance](#9-merge-governance)
10. [Code Review Guidelines](#10-code-review-guidelines)
11. [Definition of Done (DoD)](#11-definition-of-done-dod)

**Part IV — Planning** 12. [Task Management & Living Backlog](#12-task-management--living-backlog) 13. [Sprint & Planning Strategy](#13-sprint--planning-strategy) 14. [Task Sizing](#14-task-sizing) 15. [Project Roadmap Reference](#15-project-roadmap-reference)

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

### 2. Team Structure

#### ABBAS (Lead Developer)

ABBAS is the primary platform owner.

Responsibilities include:

- Overall architecture ownership.
- Final architectural decisions.
- Docker environment maintenance.
- Local infrastructure maintenance.
- PostgreSQL management.
- Redis / BullMQ management.
- CI/CD ownership.
- Repository integration.
- Merge conflict resolution.
- Feature review and approval.
- Production readiness review.
- Performance optimization.
- Security review.
- Database migrations.
- Development environment maintenance.
- Final integration of completed features.
- Repository hygiene.
- Architecture compliance verification.

Development Environment:

- High-performance development workstation.
- Full Docker support.
- Complete AutoShipp local stack.
- Primary integration environment.

#### GRANNY (Feature Developer)

GRANNY is the feature implementation developer.

Responsibilities include:

- Implement assigned architecture features.
- Follow Full-architecture-file-autoshipp.md.
- Follow AGENT.md.
- Follow TEAM_ENGINEERING_HANDBOOK.md.
- Produce discovery reports.
- Produce implementation plans.
- Produce implementation reports.
- Produce architecture validation reports.
- Produce session handovers.
- Keep the working tree clean before ending a session.
- Stop immediately if architecture ambiguity is discovered.
- Never implement features outside assigned ownership.

Development Environment:

- Mid-range laptop.
- Docker-supported development environment.
- Optimized for feature implementation rather than full platform infrastructure.

### 2.1 Feature Ownership Policy

- Every architecture feature has exactly one active owner.
- ABBAS assigns ownership.
- GRANNY only works on assigned features.
- Ownership transfers must be documented in HANDOVER.md.
- No developer may begin implementation without verifying ownership.
- If ownership is unclear, implementation must stop until clarified.

### 2.2 Parallel Development Policy

- Marketplace cannot have two active developers simultaneously.
- Billing cannot have two active developers simultaneously.
- Wallet cannot have two active developers simultaneously.
- Any AES feature may have only one active owner.
- If overlap is detected, work stops until ABBAS resolves ownership.

### 2.3 Feature Reservation & Lock Workflow

The lifecycle of any architecture feature is strictly defined as:
`Unassigned` → `Reserved` → `In Progress` → `Architecture Review` → `Released` → `Ownership Closed`

**Session Lock (Feature Lock):**

- When a feature enters the **Reserved** or **In Progress** state, it is considered **locked**.
- Only one developer may reserve or own a feature at any time.
- No other developer or AI session may begin discovery or implementation on that feature until the lock is released.

### 3. Feature Ownership Registry

This registry tracks the active owner of AES features to prevent parallel development conflicts. This is a living registry and must be updated whenever ownership changes.

| Architecture Feature | Feature Name | Owner      | Current Branch | State      | Started By | Last Updated | Integration Status           |
| :------------------- | :----------- | :--------- | :------------- | :--------- | :--------- | :----------- | :--------------------------- |
| AES-009              | Marketplace  | Unassigned | None           | Unassigned | None       | 2026-07-24   | Pending Ownership Resolution |
| AES-006              | Billing      | Unassigned | None           | Unassigned | None       | 2026-07-24   | Pending Ownership Resolution |

_(Note: Add features here as they are assigned. Identifiers must come directly from the architecture. Do not populate with speculative assignments.)_

---

## Part II — Development Environment & Architecture

### 4. Architecture & Tech Stack Reference

The **Tech Stack** and **Architecture Diagram** are authoritative solely within the primary architecture documentation.
Do not maintain competing versions of the stack or architecture in this handbook.

- For the Tech Stack, refer to `Full-architecture-file-autoshipp.md` (e.g., Next.js, NestJS, Neon PostgreSQL, Upstash Redis).
- For Architectural Diagrams and entity relationships, refer to `Full-architecture-file-autoshipp.md` and `autoshipp-architecture-diagrams.md`.

### 5. Local Environment Matrix & Remote Dev Flow

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

### 6. Initial Bootstrap Checklist

- [x] Create GitHub repository & configure branch protection
- [x] Add LICENSE & README
- [x] Configure ESLint & Prettier
- [x] Configure Husky & Commitlint
- [x] Configure GitHub Actions
- [x] Create `.env.example` & `docs/` folder
- [x] Create first release milestone

---

## Part III — Workflow

### 7. Session Workflows

#### 7.1 Session Start Workflow

Every development session must begin by:

1. Pulling the latest repository.
2. Reading HANDOVER.md.
3. Reading TEAM_ENGINEERING_HANDBOOK.md.
4. Reading the relevant architecture sections.
5. Verifying feature ownership in the Feature Ownership Registry and HANDOVER.
6. Reviewing recent commits.
7. Checking for overlapping work.
8. Performing discovery.
9. Producing an implementation plan before coding.

#### 7.2 Session End Workflow

Every development session must end by:

- Updating HANDOVER.md.
- Recording completed work.
- Recording architecture decisions.
- Recording outstanding work.
- Recording repository state.
- Recording current feature ownership.
- Recording possible overlap risks.
- Recording validation completed.
- Ensuring the working tree is clean or documenting why it is not.
- Stopping after the handover is complete.

#### 7.3 AI Collaboration Workflow

Before implementation, every AI-assisted session must execute the following discovery steps:

- Review the current HANDOVER.
- Review the engineering handbook (`TEAM_ENGINEERING_HANDBOOK.md`).
- Review relevant architecture sections (`Full-architecture-file-autoshipp.md`).
- Verify feature ownership.
- Review recent repository activity.
- Compare recent repository activity to detect overlapping modified modules.
- Detect overlapping architecture features.
- **Stop immediately** if overlap exists.
- Report the overlap before any implementation planning begins.
- Perform discovery.
- Produce an implementation plan before coding.

#### 7.4 Engineering Report Standard

Every completed implementation must include a standard engineering report containing:

- Executive Summary
- Architecture Mapping
- Discovery Summary
- Files Changed
- Validation Performed
- Tests Executed
- Risks
- Remaining Work
- Next Approved Task

### 8. Shared Workflow & Branching

**Branch Strategy:** `main` | `feature/*` | `bugfix/*` | `hotfix/*` | `release/*`

### 9. Merge Governance

Repository integration follows strict ownership bounds:

- **ABBAS** manages repository integration.
- **GRANNY** submits completed work for review.
- **ABBAS** performs final architecture verification.
- **ABBAS** declares architecture features complete.
- **Protected Integration Branches** receive reviewed work only.

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

### 15. Project Roadmap Reference

Implementation sequencing follows the approved architecture roadmap (`Full-architecture-file-autoshipp.md` and `collaborative_dev_plan.md`) and the current priorities defined in `HANDOVER.md`.
Do not maintain a generic phase-based roadmap here.

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

Testing responsibilities are strictly separated to maintain quality:

**Feature Developer (GRANNY):**

- Unit tests.
- Feature integration tests.
- Static validation.

**Platform Lead (ABBAS):**

- Cross-feature integration validation.
- Platform validation.
- Final architecture verification.

**Shared:**

- Manual runtime validation remains the responsibility of the developer performing the verification.

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
