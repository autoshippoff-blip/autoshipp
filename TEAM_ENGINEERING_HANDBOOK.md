# Team Engineering Handbook

_(Formerly the Collaborative Development Plan)_

This handbook serves as the single source of truth for how the team operates, writes code, and ships features. It is designed to bridge the gap between hardware asymmetry (GPU/Docker vs. Non-Docker) while maintaining startup-grade velocity.

---

## §0. Repository Governance

| Property                            | Value                                            |
| :---------------------------------- | :----------------------------------------------- |
| **Handbook Version**                | v2.0.0                                           |
| **Repository Baseline Branch**      | `pre-prod`                                       |
| **Repository Baseline Commit**      | _(See governance process below)_                 |
| **Architecture Authority**          | `Full-architecture-file-autoshipp.md`            |
| **Architecture Source**             | AutoShipp Engineering Documentation (AES series) |
| **Production Branch**               | `main`                                           |
| **Integration Branch**              | `pre-prod`                                       |
| **Long-lived Development Branches** | `abbas` (ABBAS), `granny` (GRANNY)               |
| **Last Governance Review**          | 2026-07-25                                       |
| **Governance Last Updated**         | 2026-07-25                                       |

> **⚠️ VERIFICATION REQUIRED — AGENT.md:**
> The workspace rules (`autoshipp-workspace-rules.md`) designate `AGENT.md` as the highest-priority rules document. The repository currently contains `AGENTS.md` (which holds Next.js agent guidance) but no standalone `AGENT.md`. ABBAS must clarify which file serves as the authoritative `AGENT.md` equivalent, or create it. Until resolved, treat `autoshipp-workspace-rules.md` as the effective workspace rules authority.

> **⚠️ VERIFICATION REQUIRED — Long-lived Branches:**
> Verify that the long-lived development branches `abbas` and `granny` exist in `origin` before adopting the workflow described in §8. If they do not exist, create them as a separate repository-governance task before beginning normal development.

### Handbook Versioning

The **Handbook Version** follows semantic versioning (`vMAJOR.MINOR.PATCH`):

- **MAJOR** — Structural change to the handbook's governance model or fundamental workflow.
- **MINOR** — Addition of new sections, workflows, or significant policy updates.
- **PATCH** — Corrections, clarifications, or minor wording improvements.

The Handbook Version increments only after an **approved governance revision**. It is independent of architecture revisions. Incrementing the version is ABBAS's responsibility.

### Repository Baseline Commit — Governance Process

The **Repository Baseline Commit** is not a hardcoded value. It is a living governance record.

**Process:**

After every approved handbook revision is committed and merged into `pre-prod`, the developer responsible for that merge **must** update this field to the full commit hash of the merge commit containing that exact handbook revision.

This ensures the Repository Baseline Commit always identifies the precise repository state that produced the handbook version being read.

**Updating the baseline commit is a mandatory governance step after every approved handbook revision. It must not be skipped.**

> **⚠️ GOVERNANCE PROTECTION — Repository Baseline Commit:**
> The Repository Baseline Commit must never be edited manually except immediately after an approved handbook revision has been merged into `pre-prod`. Editing it at any other time corrupts the governance record.

> **⚠️ VERIFICATION REQUIRED — Quick Start Repository URL:**
> The Quick Start section below uses a placeholder repository URL. No authoritative project document specifies the canonical clone URL for this repository. ABBAS must confirm the correct URL before distributing this handbook to new team members.

---

## Quick Start

Get up and running in minutes based on your hardware profile.

**For Abbas (Docker + Heavy Compute):**

```bash
git clone <VERIFY: confirm canonical repository URL with ABBAS>
cd autoshipp
pnpm install
docker compose up -d
pnpm dev
```

**For GRANNY (No Docker + Light Compute):**

```bash
git clone <VERIFY: confirm canonical repository URL with ABBAS>
cd autoshipp
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
   - 3.1 [Current Active Work Board](#31-current-active-work-board)

**Part II — Development Environment & Architecture**

4. [Architecture & Tech Stack Reference](#4-architecture--tech-stack-reference)
5. [Local Environment Matrix & Remote Dev Flow](#5-local-environment-matrix--remote-dev-flow)
6. [Initial Bootstrap Checklist](#6-initial-bootstrap-checklist)

**Part III — Workflow**

7. [Session Workflows](#7-session-workflows)
   - 7.1 [Session Start Workflow](#71-session-start-workflow)
   - 7.2 [Session End Workflow](#72-session-end-workflow)
   - 7.3 [AI Collaboration Workflow](#73-ai-collaboration-workflow)
   - 7.4 [Engineering Report Standard](#74-engineering-report-standard)
8. [Shared Workflow & Branching](#8-shared-workflow--branching)
   - 8.0 [Branch Model](#80-branch-model)
   - 8.1 [Normal Development Workflow](#81-normal-development-workflow)
   - 8.2 [Cross-Developer Synchronization Workflow](#82-cross-developer-synchronization-workflow)
   - 8.3 [Conflict Resolution Workflow](#83-conflict-resolution-workflow)
   - 8.4 [Pre-prod Integration Workflow](#84-pre-prod-integration-workflow)
   - 8.5 [Production Promotion Workflow](#85-production-promotion-workflow)
   - 8.6 [Repository Synchronization Workflow](#86-repository-synchronization-workflow)
9. [Merge Governance](#9-merge-governance)
10. [Code Review Guidelines](#10-code-review-guidelines)
11. [Definition of Done (DoD)](#11-definition-of-done-dod)

**Part IV — Planning**

12. [Task Management & Living Backlog](#12-task-management--living-backlog)
13. [Sprint & Planning Strategy](#13-sprint--planning-strategy)
14. [Task Sizing](#14-task-sizing)
15. [Project Roadmap Reference](#15-project-roadmap-reference)

**Part V — Engineering Standards**

16. [API Contract & Versioning Policy](#16-api-contract--versioning-policy)
17. [Database Migration Workflow](#17-database-migration-workflow)
18. [Testing Strategy](#18-testing-strategy)
19. [Security Checklist](#19-security-checklist)
20. [Performance Budget](#20-performance-budget)
21. [Coding Standards](#21-coding-standards)

**Part VI — Delivery**

22. [CI Pipeline, Release Process & Checklist](#22-ci-pipeline-release-process--checklist)
23. [Incident Playbook & Rollback Strategy](#23-incident-playbook--rollback-strategy)

**Part VII — Operations**

24. [Monitoring & Observability](#24-monitoring--observability)
25. [Project KPIs & Success Metrics](#25-project-kpis--success-metrics)
26. [Risk Severity Log](#26-risk-severity-log)
27. [Communication Rules](#27-communication-rules)
28. [Versioning Strategy](#28-versioning-strategy)
29. [Dependency Update Schedule](#29-dependency-update-schedule)
30. [Documentation, ADRs & Repo Structure](#30-documentation-adrs--repo-structure)
31. [Backup Responsibilities](#31-backup-responsibilities)
32. [Environment Configuration](#32-environment-configuration)

**Appendix**

- [A. Historical: Temporary Emergency Workflow](#appendix-a-historical-temporary-emergency-workflow)

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
- Follow `Full-architecture-file-autoshipp.md`.
- Follow `TEAM_ENGINEERING_HANDBOOK.md`.
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

This registry tracks the active owner and lifecycle state of AES features. It is a **governance record** — it tracks each feature from initial assignment through to completion and ownership closure.

This is a living registry. It must be updated whenever ownership or state changes.

**Responsibility:** ABBAS assigns ownership. Both developers update state at session boundaries.

| Architecture Feature | Feature Name | Owner      | Current Branch | State      | Started By | Last Updated | Integration Status           | Architecture Review Date | Released Date |
| :------------------- | :----------- | :--------- | :------------- | :--------- | :--------- | :----------- | :--------------------------- | :----------------------- | :------------ |
| AES-009              | Marketplace  | Unassigned | None           | Unassigned | None       | 2026-07-24   | Pending Ownership Resolution | —                        | —             |
| AES-006              | Billing      | Unassigned | None           | Unassigned | None       | 2026-07-24   | Pending Ownership Resolution | —                        | —             |

_(Note: Add features here as they are assigned. Identifiers must come directly from `Full-architecture-file-autoshipp.md`. Do not populate with speculative assignments.)_

### 3.1 Current Active Work Board

This board tracks **live, session-level engineering work in progress**. It is an **operational record** — it answers "what is being worked on right now?" at any given point in time.

**Distinction from Feature Ownership Registry:**

| Section                        | Purpose                                              | Horizon       | Maintained By   |
| :----------------------------- | :--------------------------------------------------- | :------------ | :-------------- |
| §3 Feature Ownership Registry  | Governance: full lifecycle from assignment to closed | Long-term     | Both developers |
| §3.1 Current Active Work Board | Operations: what is actively in progress right now   | Session-level | Both developers |

The two sections must never duplicate each other's responsibilities.

**Board Lifecycle Rules:**

- **Row Added:** When a developer begins active work on a feature at the start of a session.
- **Row Updated:** At the end of every session — update status, blockers, priority, and estimated completion.
- **Row Removed:** When the feature reaches `Released` state in the Feature Ownership Registry (§3) and has been successfully integrated into `pre-prod`.
- **Responsibility:** The owning developer maintains their own row. ABBAS resolves blockers and sets Priority.

| Feature         | Owner | Working Branch | Status | Priority | Estimated Completion | Blockers | Depends On | Next Review | Merge Target |
| :-------------- | :---- | :------------- | :----- | :------- | :------------------- | :------- | :--------- | :---------- | :----------- |
| _(None active)_ | —     | —              | —      | —        | —                    | —        | —          | —           | —            |

_(Add rows at session start when work begins. Remove rows when the feature reaches Released in §3. Priority and Estimated Completion must be reviewed at every session end.)_

---

## Part II — Development Environment & Architecture

### 4. Architecture & Tech Stack Reference

The **Tech Stack** and **Architecture Diagram** are authoritative solely within the primary architecture documentation.
Do not maintain competing versions of the stack or architecture in this handbook.

- For the Tech Stack, refer to `Full-architecture-file-autoshipp.md` (e.g., Next.js, NestJS, Neon PostgreSQL, Upstash Redis).
- For Architectural Diagrams and entity relationships, refer to `Full-architecture-file-autoshipp.md` and `autoshipp-architecture-diagrams.md`.
- For platform principles and immutable architecture rules, refer to `Full-architecture-file-autoshipp.md` (AES-000 to AES-043).

### 5. Local Environment Matrix & Remote Dev Flow

| Component      | Abbas                 | GRANNY                |
| :------------- | :-------------------- | :-------------------- |
| **Frontend**   | Local (`npm run dev`) | Local (`npm run dev`) |
| **Backend**    | Local (Docker)        | Remote Dev API        |
| **PostgreSQL** | Docker                | Neon (Cloud)          |
| **Redis**      | Docker                | Upstash (Cloud)       |

**Remote Development Flow (For GRANNY):**

- The `granny` branch is GRANNY's primary development branch.
- Abbas deploys backend changes automatically after integration into `pre-prod`.
- GRANNY always targets the latest `pre-prod` API for integration testing.

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

1. **Verify Repository Governance (§0).** Confirm the active branch model, integration branch, and long-lived branches before any other step.
2. Pulling the latest `pre-prod` and updating your long-lived development branch.
3. Reading `HANDOVER.md`.
4. Reading `TEAM_ENGINEERING_HANDBOOK.md` (this document).
5. Reading the relevant architecture sections from `Full-architecture-file-autoshipp.md`.
6. Verifying feature ownership in the Feature Ownership Registry (§3) and `HANDOVER.md`.
7. Reviewing recent commits on `pre-prod`.
8. Checking for overlapping work (see §7.3 AI Collaboration Workflow).
9. Updating the Current Active Work Board (§3.1) with the work being started.
10. Performing discovery before coding.
11. Producing an implementation plan before coding.

> **For the complete, authoritative session onboarding procedure, follow `.agents/rules/Project-Start-Rule.md`.** The steps above are a quick reference summary. The rule file defines the full 14-step procedure including Git state inspection, handover verification, and architecture compliance checks.

#### 7.2 Session End Workflow

Every development session must end by:

- Updating `HANDOVER.md`.
- Recording completed work.
- Recording architecture decisions.
- Recording outstanding work.
- Recording repository state.
- Recording current feature ownership.
- Recording possible overlap risks.
- Recording validation completed.
- Updating the Current Active Work Board (§3.1) with current status and blockers.
- Ensuring the working tree is clean or documenting why it is not.
- Stopping after the handover is complete.

> **For the complete, authoritative session close procedure, follow `.agents/rules/Session-Ended-Rules.md`.** The bullets above are a quick reference summary. The rule file delegates to:
>
> - `.agents/rules/Handover-Rule.md` — for handover update procedures
> - `.agents/rules/github-rules.md` — for Git commit and push procedures

#### 7.3 AI Collaboration Workflow

Before implementation, every AI-assisted session must execute the following discovery steps:

- Review the current `HANDOVER.md`.
- Review this engineering handbook (`TEAM_ENGINEERING_HANDBOOK.md`).
- Review relevant architecture sections (`Full-architecture-file-autoshipp.md`).
- Verify feature ownership in the Feature Ownership Registry (§3).
- Review the Current Active Work Board (§3.1) for active overlapping work.
- Review recent repository activity on `pre-prod`.
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

#### 8.0 Branch Model

The following branches define the permanent repository topology. This model is confirmed project governance.

| Branch          | Role                                 | Who Works Here                                             | Protected |
| :-------------- | :----------------------------------- | :--------------------------------------------------------- | :-------- |
| `main`          | Production                           | No development. Receives promotions from `pre-prod` only.  | Yes       |
| `pre-prod`      | Permanent integration branch         | Receives reviewed, completed work from developer branches. | Yes       |
| `abbas`         | ABBAS long-lived development branch  | ABBAS only.                                                | No        |
| `granny`        | GRANNY long-lived development branch | GRANNY only.                                               | No        |
| `feat/<name>`   | Optional feature branch              | Either developer, when task-specific isolation is needed.  | No        |
| `docs/<name>`   | Documentation changes                | Either developer.                                          | No        |
| `hotfix/<name>` | Production fixes                     | ABBAS.                                                     | No        |
| `bugfix/<name>` | Non-critical fixes                   | Either developer.                                          | No        |

> **⚠️ VERIFICATION REQUIRED:** Verify that `abbas` and `granny` exist in `origin` before adopting this workflow. If they do not exist, create them as a separate repository-governance task before beginning normal development. Do not begin implementing this workflow with unverified branch state.

#### 8.1 Normal Development Workflow

Day-to-day development follows this pattern:

1. ABBAS works exclusively on the `abbas` branch.
2. GRANNY works exclusively on the `granny` branch.
3. The Feature Ownership Registry (§3) enforces no overlap between developers.
4. Each developer is fully independent between synchronization points.
5. No coordination is needed unless one developer requires the other's completed work.

This workflow keeps development isolated, prevents merge conflicts between personal branches, and ensures `pre-prod` is always the controlled integration point.

#### 8.2 Cross-Developer Synchronization Workflow

When one developer requires functionality that has been completed by the other:

1. Both developers push their latest work to their respective `origin` branches.
2. The required work is reviewed by ABBAS and integrated into `pre-prod`.
3. Both developers pull from `pre-prod` into their long-lived branches:
   ```bash
   git fetch --all
   git checkout abbas   # or granny
   git pull --ff-only origin pre-prod
   ```
4. Both developers continue work from their own branches.

**Key principle:** `pre-prod` is always the integration point. No developer merges another developer's branch directly into their own.

#### 8.3 Conflict Resolution Workflow

If overlapping work is detected unexpectedly during development or AI-assisted sessions:

1. **Stop implementation immediately.** Do not proceed.
2. **Confirm ownership.** Check the Feature Ownership Registry (§3) and `HANDOVER.md`.
3. **Report the conflict to ABBAS.** Describe the overlap, affected modules, and both developers' current state.
4. **ABBAS resolves ownership.** ABBAS determines which work takes precedence and reviews both branches.
5. **Integrate through `pre-prod`.** The accepted work is merged to `pre-prod` first.
6. **Both developers synchronize from `pre-prod`.** Both update their long-lived branches from the resolved `pre-prod` state.
7. **Resume implementation.** Both developers continue from their updated branches.

This workflow reinforces the no-overlap policy defined in §2.2 and ensures conflicts are never resolved by individual developers in isolation.

#### 8.4 Pre-prod Integration Workflow

Used when a developer's work is complete and ready for integration:

1. Developer confirms implementation is complete on their branch (`abbas` or `granny`).
2. Engineering Report produced (§7.4).
3. DoD checklist verified (§11).
4. Developer pushes their branch to `origin`.
5. ABBAS reviews the changes against `Full-architecture-file-autoshipp.md`.
6. CI must pass.
7. ABBAS integrates into `pre-prod` (via merge or PR review).
8. Feature Ownership Registry (§3) updated — state advanced accordingly.
9. Current Active Work Board (§3.1) row updated or removed if work is `Released`.

#### 8.5 Production Promotion Workflow

Used when `pre-prod` is stable and ready for a production release:

1. ABBAS confirms `pre-prod` stability and CI is green.
2. ABBAS reviews all commits since the last promotion to `main`.
3. Database migrations reviewed for production safety.
4. ABBAS merges `pre-prod` into `main` and pushes to `origin/main`.
5. Deployment occurs automatically via Render (per `autoshipp-workspace-rules.md` §12).
6. Post-deploy smoke test performed.
7. **Repository Baseline Commit in §0 updated** to the merge commit hash.

#### 8.6 Repository Synchronization Workflow

The intended synchronization direction is:

```
Developer Branch → pre-prod → Developer Branch
```

Developers never synchronize directly from each other's branches. `pre-prod` is always the integration point.

**Before every session**, bring your long-lived branch up to date with the latest integrated state:

```bash
# Step 1: Fetch all remote state
git fetch --all

# Step 2: Update pre-prod to its latest state
git checkout pre-prod
git pull --ff-only origin pre-prod

# Step 3: Switch to your long-lived development branch
git checkout abbas    # GRANNY: use 'granny' instead

# Step 4: Integrate the latest pre-prod state into your branch
git merge pre-prod    # fast-forward if possible; no rebasing of pushed branches

# Step 5: Verify the working tree is clean and no divergence exists
git status
git branch -vv
```

> **Important:** Use `git merge pre-prod` (not `git pull --ff-only origin pre-prod`) in Step 4 to bring integrated changes into your personal branch from the locally-updated `pre-prod`. Never rebase a branch that has already been pushed to `origin`.

For the complete Git governance procedure — including commit standards, push rules, and multi-branch synchronization reports — follow `.agents/rules/github-rules.md`.

### 9. Merge Governance

Repository integration follows strict ownership bounds:

- **`pre-prod`** is the permanent integration branch. All feature work lands here first.
- **`main`** is production only. It receives no direct development work.
- **Promotion** occurs exclusively from `pre-prod` to `main`, managed by ABBAS.
- **ABBAS** manages all repository integration.
- **GRANNY** submits completed work by pushing to `origin/granny` and notifying ABBAS.
- **ABBAS** performs final architecture verification before any integration.
- **ABBAS** declares architecture features complete and advances the Feature Ownership Registry.

Merge into `pre-prod` only if:

- [x] CI passes
- [x] One approval from ABBAS
- [x] No merge conflicts
- [x] DoD satisfied (§11)
- [x] Engineering Report produced (§7.4)

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
- [ ] Platform administrative features must have backend authorization enforced at the service layer, persistence performed through the owning domain, required audit records confirmed, and target-organization isolation validated.

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

> **For the authoritative rule governing when to run the full test suite versus targeted tests during development, follow `.agents/rules/test-rules.md`.** That rule distinguishes between Development Mode (no full suite per change) and Verification Mode (full suite before commit). Running unnecessary test suites wastes time and tokens.

### 19. Security Checklist

For every release, verify as a minimum:

- [x] Input validation, Auth/Authz checks
- [x] SQL injection, XSS, CSRF protection
- [x] Dependency vulnerability & Secret scanning
- [x] Rate limiting & Secure HTTP headers
- [ ] Platform governance controls must not rely on frontend visibility as enforcement. Backend authorization is the authoritative control.
- [ ] The implementation must validate that a Platform administrator cannot accidentally operate on the wrong target organization.

> **For the complete security validation checklist, follow `.agents/rules/security-checklist.md`.** That document contains the full multi-section checklist covering authentication, API security, data security, infrastructure security, and compliance requirements.

### 20. Performance Budget

- **Frontend:** First Load JS < 250 KB, Lighthouse > 90, LCP < 2.5s.
- **Backend:** API response < 200 ms (avg), DB query < 100 ms, No N+1 queries.

> _Source: `Full-architecture-file-autoshipp.md` — Performance Baseline section, line 27492: `API Response | <200 ms`. Confirmed in `autoshipp_architecture_summary.md` line 294._

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

- Changes to Platform Super Admin capabilities require amendment to AES-044 and approval by the architecture authority before implementation.

### 31. Backup Responsibilities

- **Abbas Backup:** GRANNY handles frontend, docs, tests, minor backend fixes.
- **GRANNY Backup:** Abbas handles UI integration and urgent frontend fixes.

### 32. Environment Configuration

Use `.env.example`, `.env.local`, `.env.development`, `.env.production`. Never commit secrets.

---

## Appendix A. Historical: Temporary Emergency Workflow

> **📁 ARCHIVED — This section is a historical record only.**
> The workflow described below was executed as a one-time emergency delivery for the Momzcradle client. The temporary implementation is now live. This section is preserved for reference purposes.
> **Do not treat this section as an active process override. Standard handbook procedures apply.**

---

The following section documents the emergency workflow that was active during the initial Momzcradle client delivery.

**Temporary Implementation Rules (Historical):**

- Temporary implementations remained isolated.
- Temporary implementations did not become dependencies of permanent architecture.
- Temporary implementations did not modify long-term architectural decisions.
- Temporary implementations were not promoted into permanent architecture without explicit architecture review and approval.
- Temporary implementations are replaced or removed once permanent implementations exist.

**Goal (Historical):** Allow the Momzcradle client to log in and view the dashboard for two ready features in production.

**Scope & Shortcuts (Historical):**

- Feature 1: Already built and live via a public link. The temporary dashboard embedded or linked out to this existing page.
- Feature 2: Integrated and displayed on the new temporary dashboard.
- Authentication: A lightweight, simplified login mechanism was implemented using hardcoded credentials (`momcreadlz@autoshipp.com`).
- Process: Complex architectural requirements were bypassed to ensure rapid delivery.

**Ownership (Historical):**

- Abbas evaluated required work and determined ownership.
- Small/Moderate workload: Abbas sole ownership.
- Large workload: Abbas and GRANNY collaborate.

**Execution Plan (Historical):**

1. Workload Assessment — Decided ownership.
2. Temporary Login — Quick login route bypassing complex auth.
3. Dashboard Hub — Isolated temporary dashboard page.
4. Feature Integration — Link/iframe for Feature 1; UI for Feature 2.
5. Shipped to Production.
