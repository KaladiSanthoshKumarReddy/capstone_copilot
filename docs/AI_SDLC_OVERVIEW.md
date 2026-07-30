# AI SDLC Overview — Capstone Item Manager

> **Purpose of this document**: A single, presentation-ready reference explaining
> the Capstone Item Manager project, the Agentic SDLC framework built on top of
> it, exactly which agent/skill/instruction is used at each stage and why, how to
> run the entire pipeline end-to-end, where a human must intervene, and where
> requirements/stories and generated artifacts physically live. Use this doc as
> the walkthrough script when presenting the framework for review.

---

## 0. Executive Summary

- **Project**: Capstone Item Manager — a full-stack CRUD app (auth + item
  management + dashboard) built with React and Express/SQLite.
- **What was added**: A governance layer under `.github/` that turns Copilot into
  an **8-stage agentic SDLC pipeline** — from requirements to an opened pull
  request — with a **mandatory human approval gate after every stage**.
- **Why**: So new features are built the same way a real engineering team would
  ship them (requirements → design → review → plan → build → review → test → PR),
  with traceable artifacts at each step instead of one big unreviewed AI change.
- **Where it runs**: Entirely inside VS Code via GitHub Copilot Chat, using this
  repo's own `.env` for Jira/Confluence/GitHub URLs — no secrets are ever
  hardcoded in tracked files.
- **Human involvement**: Required at **every one of the 8 gates** (explicit
  `approve` / `reject`) — the pipeline never advances on its own.

---

## 1. Project Overview — Capstone Item Manager

**What it is**: A capstone reference application for managing "items" (create,
read, update, delete, search, filter, paginate) behind JWT-based authentication,
with a dashboard UI.

| Layer | Stack | Location |
|---|---|---|
| Frontend | React 18 + TypeScript + Vite + Tailwind CSS + Zustand (state) | `frontend/src/` |
| Backend | Node.js + Express + TypeScript | `backend/src/` |
| Database | SQLite (file-based) | `backend/src/db/init.ts`, path from `DATABASE_PATH` |
| Auth | JWT, verified in Express middleware | `backend/src/middleware/auth.ts` |
| Tests | Playwright (E2E) + Cucumber (Gherkin features) + Vitest (unit) | `tests/`, `frontend/src/**/__tests__` |

**Key conventions the AI-SDLC framework must always respect** (so generated code
fits the existing app instead of introducing a parallel style):

- Backend API responses always use `{ success: true, data }` or
  `{ success: false, error }`.
- All protected backend routes go through `backend/src/middleware/auth.ts`.
- All frontend HTTP calls go through `frontend/src/api/client.ts` (JWT attached
  via an Axios interceptor).
- Frontend app state lives in Zustand stores under `frontend/src/store/`.
- No new frameworks, DB engines, or auth mechanisms are introduced without an
  explicit, documented reason (see Stage 2 Architecture / ADRs below).

**Where this pipeline fits**: it governs **new feature work added on top of**
this existing app — it does not regenerate the already-built auth/items/dashboard
functionality.

---

## 2. Why an Agentic SDLC Framework

Handing a feature request straight to an AI coding agent risks skipping design
thinking, security review, and test coverage. This framework forces the same
discipline a human team would apply, by splitting the work into **8 discrete,
auditable stages**, each owned by a dedicated agent + skill + instruction file,
each producing a **committed artifact** (a markdown/HTML file or code diff), and
each **blocked behind a human approval gate** before the next stage can start.

This buys you:

1. **Traceability** — every requirement (FR-xx) traces to an architecture element,
   a task, an implementation diff, and a test (AC-xx).
2. **Security by construction** — Stage 3 and Stage 6 explicitly gate on
   authentication, input validation, parameterized SQL, and no hardcoded secrets.
3. **No fabricated results** — Stage 5/7/8 agents are instructed to run real
   commands (`npm run test`, `npx playwright test`) and report actual output,
   never invented pass/fail numbers.
4. **Resumability** — the pipeline can be stopped and resumed at any stage by
   inspecting which artifacts already exist in the repo.

---

## 3. Framework Architecture — What Was Added

```
.github/
  copilot-instructions.md        # repo-wide entry point, auto-loaded by Copilot Chat
  SKILLS_REGISTRY.md              # catalogue of all 9 skills
  agents/                         # 9 agent definitions (orchestrator + 8 stages)
  instructions/                   # global policy + 8 stage instructions + gate checklist
    prompts/                      # 4 reusable prompt templates
  skills/                         # 9 SKILL.md files (token-optimized, one per stage)
  hooks/sdlc-gate.json            # session-start / subagent hooks that remind gates are mandatory
  templates/sdlc-report-template.html  # HTML template for the final Stage-8 report
.vscode/mcp.json                  # MCP server config wired to your Jira/Confluence/GitHub URLs
AGENTS.md                         # short pointer doc at repo root
user-story.md                     # where you write the next feature request (see §7)
docs/AI_SDLC_OVERVIEW.md          # this file
```

Nothing under `backend/`, `frontend/`, `tests/`, or `scripts/` was modified when
this framework was added — the app runtime code is untouched. This addition is
purely the governance/agent layer.

**Why three separate pieces (agent + skill + instruction) per stage, instead of
one file?**

| Piece | Role | Why it exists separately |
|---|---|---|
| **Agent** (`.github/agents/sdlc-stageN-*.agent.md`) | The full "job description" Copilot loads when you invoke `@sdlc-stageN-*` directly — process steps, constraints, gate message format. | Lets you run any single stage stand-alone (e.g. re-run just Stage 6) without loading the whole pipeline. |
| **Skill** (`.github/skills/sdlc-stageN-*/SKILL.md`) | A short (~250–350 token) summary the orchestrator reads to decide *whether* to invoke a stage, without paying the token cost of the full agent file. | Keeps the orchestrator (`@sdlc`) cheap to run — it doesn't need to load all 8 full agent definitions just to check status. |
| **Instruction** (`.github/instructions/stageN-*.instructions.md`) | `applyTo`-scoped rules auto-attached by VS Code whenever a matching file (e.g. `requirements.md`, `backend/src/**`) is opened/edited — independent of which agent is active. | Enforces the same required sections/Do-Don't rules even if a stage is run manually outside the agent (e.g. you hand-edit `architecture.md`). |

## 4. The 8-Stage Pipeline — Full Detail

The `sdlc` agent (`.github/agents/sdlc.agent.md`) orchestrates all 8 stages,
blocking at every gate for your explicit `approve`/`reject`.

| # | Stage | Agent to invoke | Input | Output artifact | Gate (PASS criteria) |
|---|---|---|---|---|---|
| 1 | Requirements Analysis | `@sdlc-stage1-requirements` | `user-story.md` / Jira issue / Confluence page | `requirements.md` | ≥10 FRs, ≥15 ACs, source cited |
| 2 | Architecture Design | `@sdlc-stage2-architecture` | `requirements.md` | `architecture.md` | ≥80% FR traceability, schema diff, fits existing stack |
| 3 | Design Review | `@sdlc-stage3-design-review` | `architecture.md` | `design-review.md` | Explicit `APPROVED`/`REJECTED` verdict + security review |
| 4 | Implementation Plan | `@sdlc-stage4-impl-plan` | `design-review.md` (must be APPROVED) | `impl-plan.md` | ≥15 ordered tasks with file targets |
| 5 | Implementation | `@sdlc-stage5-implementation` | `impl-plan.md` | `backend/src/**`, `frontend/src/**` + unit tests | No compile errors, ≥80% tasks done, real Vitest run |
| 6 | Code Review | `@sdlc-stage6-review` | Stage 5 diff | Review findings + safe fixes applied | ≤2 unresolved Critical findings |
| 7 | Verification & Testing | `@sdlc-stage7-verify` | `requirements.md` ACs + Stage 5 diff | `tests/e2e/specs/*.spec.ts`, `verification-report.md` | 100% AC coverage, real Playwright results |
| 8 | PR & Report | `@sdlc-stage8-pr` | All prior artifacts | `CHANGELOG.md`, `sdlc-report.html`, opened PR | Real metrics only, PR opened (or explicit reason why not) |

### Stage-by-stage: why it exists, what it reads/writes, and the human's job

**Stage 1 — Requirements Analyst** (`sdlc-stage1-requirements.agent.md` /
`instructions/stage1-requirements.instructions.md`)
- **Why**: Nothing gets built without a written, testable spec — prevents the
  AI from guessing scope.
- **Reads**: `user-story.md`, or a Jira issue (`JIRA_BASE_URL` + `JIRA_PROJECT_KEY`),
  or a Confluence page (`CONFLUENCE_BASE_URL` + `CONFLUENCE_SPACE_KEY`).
- **Writes**: `requirements.md` — Source, Scope, FR-01..FR-N, AC-01..AC-M,
  Non-Functional Requirements, Assumptions/Constraints.
- **Human's job at the gate**: Confirm the FRs/ACs actually match what you asked
  for and that nothing was fabricated if a live Jira/Confluence fetch failed.

**Stage 2 — Solution Architect** (`sdlc-stage2-architecture.agent.md` /
`instructions/stage2-architecture.instructions.md`)
- **Why**: Forces a design pass — impacted components, DB schema, API contract —
  before any code is written, and keeps the design fitting the existing stack.
- **Reads**: `requirements.md` (and `design-review.md` if reworking after a
  REJECT).
- **Writes**: `architecture.md` — impacted components, data model/schema diff,
  API contract, data flow, tech-stack notes, ADRs.
- **Human's job**: Confirm no unnecessary new dependencies/services and that the
  schema changes are safe for the existing SQLite data.

**Stage 3 — Design Reviewer** (`sdlc-stage3-design-review.agent.md` /
`instructions/stage3-design-review.instructions.md`)
- **Why**: An independent security/soundness check before planning work — this
  is the framework's main security gate for the *design*.
- **Reads**: `architecture.md`, `requirements.md` (for traceability).
- **Writes**: `design-review.md` with an explicit `Verdict: APPROVED` or
  `Verdict: REJECTED`, traceability table, security review, risk assessment, and
  (if rejected) concrete rework actions.
- **Human's job**: This is a **hard stop** — REJECTED loops back to Stage 2 with
  the feedback; you decide whether the rework is sufficient before re-approving.

**Stage 4 — Implementation Planner** (`sdlc-stage4-impl-plan.agent.md` /
`instructions/stage4-impl-plan.instructions.md`)
- **Why**: Breaks approved architecture into small, ordered, independently
  verifiable units of work instead of one giant change.
- **Reads**: `design-review.md` (must be APPROVED), `architecture.md`.
- **Writes**: `impl-plan.md` — ≥15 tasks (`ID | Description | File Target(s) |
  Depends On | Success Criterion`), ordered DB → backend → frontend → unit tests
  → E2E tests → docs.
- **Human's job**: Confirm task granularity/order makes sense before code changes
  start (this is the last gate *before* any source file is touched).

**Stage 5 — Implementation Engineer** (`sdlc-stage5-implementation.agent.md` /
`instructions/stage5-implementation.instructions.md`)
- **Why**: Executes the plan against the **real** codebase, following existing
  patterns (Express routers, Zustand stores) instead of inventing new ones.
- **Reads**: `impl-plan.md`, `architecture.md`.
- **Writes**: Code under `backend/src/**` and `frontend/src/**`, plus colocated
  unit tests; runs `cd frontend && npm run test` (Vitest) and reports the real
  pass/fail count.
- **Human's job**: Review the actual diff — this is real production code being
  written to your app.

**Stage 6 — Code Reviewer** (`sdlc-stage6-review.agent.md` /
`instructions/stage6-review.instructions.md`)
- **Why**: A second, independent security/quality pass (OWASP-style) on the
  actual diff — type safety, auth/authz, input validation, parameterized SQL, no
  secrets, consistent error shape.
- **Reads**: Files changed in Stage 5.
- **Writes**: Review findings (Critical/Major/Minor) in chat + safe fixes applied
  directly to the changed files; runs `get_errors` to confirm zero new
  diagnostics.
- **Human's job**: Decide if any remaining unfixed findings are acceptable to
  carry forward, or whether Stage 5 must be redone.

**Stage 7 — Test Engineer** (`sdlc-stage7-verify.agent.md` /
`instructions/stage7-verify.instructions.md`)
- **Why**: Proves the feature actually works against every acceptance criterion,
  with real, non-fabricated results.
- **Reads**: `requirements.md` acceptance criteria, `impl-plan.md` test tasks,
  changed backend/frontend files.
- **Writes**: `tests/e2e/specs/*.spec.ts` (and/or `tests/features/*.feature`),
  reusing existing page objects/helpers, then runs `cd tests && npx playwright
  test` and writes `verification-report.md` with an AC-to-test traceability
  table and real pass/fail counts.
- **Human's job**: Confirm test coverage genuinely maps to every AC, and that any
  reported defects are triaged before moving on.

**Stage 8 — Release Engineer** (`sdlc-stage8-pr.agent.md` /
`instructions/stage8-pr.instructions.md`)
- **Why**: Produces a reviewable summary of the whole run and gets the change
  into a PR, the same way a human would close out a ticket.
- **Reads**: All artifacts from Stages 1–7.
- **Writes**: A `CHANGELOG.md` entry, `sdlc-report.html` (from
  `.github/templates/sdlc-report-template.html`, all `{{PLACEHOLDER}}`s filled
  with real collected metrics), and opens a PR against `GIT_REPO_URL` /
  `GIT_BRANCH` using the GitHub Pull Request VS Code extension's already
  authenticated tool.
- **Human's job**: Final review of the PR itself (this pipeline does not
  auto-merge anything).

---

## 5. How To Run The Complete SDLC

### One-time setup

```powershell
npm run install:all      # installs backend, frontend, and tests dependencies
```

Ensure `.env` is populated at the workspace root (copy from `.env.example` if
needed) — see §8 for exactly which variables are required.

### Option A — Run the full pipeline via the orchestrator (recommended)

```
@sdlc
```

This checks which artifacts already exist, tells you the next stage, and invokes
the matching stage agent. After each stage's gate message, you must reply with
one of:

- ✅ To approve and continue: `approve`, `continue`, or `proceed`
- ❌ To reject and rework the previous stage: `reject`, `rework`, or `redo`

The orchestrator repeats this for all 8 stages until Stage 8 prints
`🏁 SDLC PIPELINE COMPLETE`.

### Option B — Jump to / resume from a specific stage

```
@sdlc from=stage-4      # start directly at Stage 4 (if prerequisites exist)
@sdlc resume             # auto-detect the last completed stage and continue
@sdlc status             # print a gate status table for all 8 stages without running anything
```

### Option C — Run a single stage agent directly (manual/ad-hoc)

```
@sdlc-stage1-requirements
@sdlc-stage2-architecture
@sdlc-stage3-design-review
@sdlc-stage4-impl-plan
@sdlc-stage5-implementation
@sdlc-stage6-review
@sdlc-stage7-verify
@sdlc-stage8-pr
```

Useful when you only need to re-run one stage (e.g. Stage 6 after manually
editing code) without walking the whole pipeline again.

### Verifying the result locally

```powershell
npm run build       # backend + frontend build
npm run test:unit    # frontend unit tests (Vitest)
npm run test:e2e     # Playwright E2E tests
```

---

## 6. Human-in-the-Loop — Exactly Where You Must Step In

🔴 **The pipeline never auto-advances.** Every stage ends with a gate message and
a hard stop. The table below is the review checklist for each gate:

| Gate | What the agent shows you | What you must check before approving |
|---|---|---|
| After Stage 1 | `requirements.md`, FR/AC counts | Requirements match your actual ask; nothing invented if Jira/Confluence fetch failed |
| After Stage 2 | `architecture.md` | No unjustified new dependency/framework/DB engine; schema changes are safe |
| After Stage 3 | `design-review.md` verdict | If REJECTED — are the rework actions clear and correctly scoped? |
| After Stage 4 | `impl-plan.md` (≥15 tasks) | Task order and file targets are correct and complete |
| After Stage 5 | Real code diff + Vitest results | The actual implementation — this is the code that will ship |
| After Stage 6 | Review findings + applied fixes | Any unresolved Critical/Major issue is acceptable to proceed with |
| After Stage 7 | `verification-report.md`, real Playwright results | Every AC has a passing test; any defects are understood |
| After Stage 8 | `CHANGELOG.md`, `sdlc-report.html`, PR link | The PR itself — this pipeline does not merge automatically |

Approval/rejection is logged to session memory (`/memories/session/orchestrator-log.md`)
with a timestamp, so there is an audit trail of who approved what and when.

**Note**: the `sdlc-global.instructions.md` policy also forbids the agent from
skipping, merging, or auto-advancing stages under any circumstance — if you don't
type an explicit approval, the pipeline stays parked at the current gate.

---

## 7. Where Stories Are Created & Where Data Is Stored

| Source | Location | When to use it |
|---|---|---|
| **Local file (default, always works)** | [user-story.md](../user-story.md) at the repo root | Fastest path — write the feature description directly and run `@sdlc`. No auth/network required. |
| **Jira issue** | Project key `EPMCDMETST` on `https://jiraeu.epam.com` (from `JIRA_BASE_URL` / `JIRA_PROJECT_KEY` in `.env`) | When the feature is already tracked as a ticket in the team's Jira project. |
| **Confluence page (the "KB page")** | Space key `2889552361` on `https://kb.epam.com` (from `CONFLUENCE_BASE_URL` / `CONFLUENCE_SPACE_KEY` in `.env`) | When the feature/requirements are documented as a knowledge-base page instead of a Jira ticket. |

Stage 1 tries these in order: `user-story.md` → Jira → Confluence, and **never
fabricates** requirements if none of them are reachable — it asks you to paste
the content instead (EPAM Jira/Confluence are SSO/VPN-gated, so no generic web
tool can fetch them automatically; see §9 for the honesty note on this).

**Where the pipeline's own generated data lives** (all inside this repo, plain
files — no external database):

| Artifact | Path |
|---|---|
| Requirements | `requirements.md` (repo root) |
| Architecture | `architecture.md` (repo root) |
| Design review verdict | `design-review.md` (repo root) |
| Implementation plan | `impl-plan.md` (repo root) |
| Implementation code | `backend/src/**`, `frontend/src/**` |
| Verification results | `verification-report.md` (repo root) |
| Release notes | `CHANGELOG.md` (repo root) |
| Final HTML report | `sdlc-report.html` (repo root) |
| Gate/approval audit trail | `/memories/session/orchestrator-log.md`, `/memories/session/sdlc-gate-state.md`, `/memories/session/stageN-state.md` |
| App's own runtime data (items, users) | SQLite file at `DATABASE_PATH` (`backend/data/`) — unrelated to the SDLC artifacts above |

---

## 8. Which URLs and Tokens Are Used — and Where From

Your root `.env` (already present, gitignored) is the single source of truth.
No token/URL is hardcoded anywhere in `.github/` — every file references the
variable name, not a value.

| Variable (in `.env`) | Current value in your `.env` | Used by |
|---|---|---|
| `JIRA_BASE_URL` | `https://jiraeu.epam.com` | Stage 1 agent (requirement sourcing), `.vscode/mcp.json` `jira` server |
| `JIRA_PROJECT_KEY` | `EPMCDMETST` | Stage 1 agent, to scope which Jira project to read issues from |
| `JIRA_EMAIL` / `JIRA_API_TOKEN` | set | Auth for Jira REST calls (PAT-style Bearer auth for EPAM Jira Server) |
| `CONFLUENCE_BASE_URL` | `https://kb.epam.com` | Stage 1 agent, `.vscode/mcp.json` `confluence` server |
| `CONFLUENCE_SPACE_KEY` | `2889552361` | Stage 1 agent — the "KB page" space that stories/requirements can be read from |
| `CONFLUENCE_EMAIL` / `CONFLUENCE_API_TOKEN` | set | Auth for Confluence REST calls |
| `GIT_REPO_URL` | `https://github.com/KaladiSanthoshKumarReddy/capstone` | Stage 8 agent, to know where to open the PR |
| `GIT_BRANCH` | `main` | Stage 8 agent, PR target branch |
| `GITHUB_TOKEN` | set | **Not used by the agents directly** — Stage 8 opens PRs via the already-authenticated GitHub Pull Request VS Code extension tool. This var is kept only for any standalone script/CLI use outside VS Code. |
| `FRONTEND_PORT` / `BACKEND_PORT` | `3000` / `4000` | Local dev servers (`npm run dev`) |
| `DATABASE_PATH` | `./data/capstone.db` | Backend SQLite connection (`backend/src/db/init.ts`) |
| `JWT_SECRET` | set | Backend JWT signing/verification (`backend/src/middleware/auth.ts`) |

## 9. `.vscode/mcp.json` — How It's Wired

```json
{
  "servers": {
    "github":     { "url": "https://api.githubcopilot.com/mcp/" },
    "jira":       { "url": "https://jiraeu.epam.com", "headers": { "Authorization": "Bearer ${input:jira-token}" } },
    "confluence": { "url": "https://kb.epam.com",      "headers": { "Authorization": "Bearer ${input:confluence-token}" } },
    "playwright": { "command": "npx", "args": ["-y", "@playwright/mcp@latest"] }
  }
}
```

- The `jira`/`confluence` URLs match your `.env` base URLs exactly (not the
  reference template's placeholder Atlassian Cloud URL).
- Tokens are **never stored in this file**. Each server references
  `${input:jira-token}` / `${input:confluence-token}` — VS Code prompts you once
  per session and stores the secret in its own secure credential store, not in a
  tracked file. Enter the same values as `JIRA_API_TOKEN` / `CONFLUENCE_API_TOKEN`
  from your `.env` when prompted.
- `github` uses the hosted `api.githubcopilot.com` MCP server (OAuth via your
  existing GitHub sign-in) — this is the same mechanism your GitHub Pull Request
  extension already uses, so Stage 8 doesn't need a separate token prompt.

### Important honesty note on Jira/Confluence

There is no certified generic "Jira MCP" / "Confluence MCP" server today — the
`jira`/`confluence` entries above describe the intended REST endpoint and auth
header shape so that if/when you add a compatible MCP server (e.g.
`mcp-atlassian`), it already points at your correct URLs. Until then, Stage 1's
most reliable path is:
1. A local `user-story.md` at the repo root (always works), or
2. Pasting the Jira/Confluence content directly into chat (since EPAM Jira/Confluence
   are SSO/VPN-gated and can't be fetched by generic web tools anyway).

## 10. How Skills Are Used (Token Efficiency)

Each stage has a **SKILL.md** under `.github/skills/sdlc-stageN-*/` — these are
short (250–350 token) files so Copilot only loads the relevant stage's context
instead of the entire 8-stage pipeline every time. The `sdlc-orchestrator` skill
(~150–200 tokens) is the lightweight router that decides which stage to invoke
next based on which artifacts already exist in the repo. This mirrors the
token-efficiency design from the reference framework this was adapted from
(~85% fewer tokens per session vs. one monolithic skill).

## 11. Security Notes

- Your project's own `.env` contains **live** Jira/Confluence/GitHub tokens. It's
  correctly listed in `.gitignore`, so it won't be committed — good. Just avoid
  pasting its contents into chats/tickets/screenshots going forward.
- Stage 3 (Design Review) and Stage 6 (Code Review) are the two dedicated
  security gates: auth/authorization, input validation, parameterized SQL, and
  no hardcoded secrets are explicitly checked at both.
- `sdlc-global.instructions.md` enforces OWASP Top 10 hygiene project-wide and
  forbids hardcoding secrets/tokens/URLs anywhere in `.github/` or app source.

## 12. Presentation Checklist (for review meetings)

When walking someone through this framework live, this is a suggested order:

1. Show §1 (Project Overview) — what the app is.
2. Show §4's pipeline table — the 8 stages at a glance.
3. Run `@sdlc status` live to show the current gate state.
4. Walk through one gate message end-to-end (e.g. run Stage 1 on a sample
   `user-story.md`) to demonstrate the human approval stop.
5. Show §6 — where human judgment is required at each of the 8 gates.
6. Show §7 — where requirements/stories can come from (local file / Jira /
   Confluence "KB page") and where every generated artifact ends up in the repo.
7. Show §8/§9 — confirm no secrets are hardcoded, everything reads from `.env`
   and VS Code's secure input prompts.

