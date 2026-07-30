---
description: "Capstone Item Manager SDLC Skills — Stage-scoped skills for the 8-stage agentic SDLC pipeline with orchestrator"
---

# Copilot Instructions — Capstone Item Manager

## Project

React 18 + TypeScript + Vite + Tailwind + Zustand frontend, Express + TypeScript +
SQLite backend, Playwright + Cucumber E2E tests. See `docs/AI_SDLC_OVERVIEW.md` for
the full AI-SDLC framework overview (agents, skills, URL/token wiring).

## Entry Points

```
@sdlc                    # Check current pipeline status and get recommendation
@sdlc resume             # Continue from last completed stage
@sdlc status             # Display detailed gate status table
@sdlc from=stage-1       # Jump to a specific stage (if prerequisites met)
```

### Individual Stage Skills

```
@sdlc-stage1-requirements   # requirements.md
@sdlc-stage2-architecture   # architecture.md
@sdlc-stage3-design-review  # design-review.md (APPROVE/REJECT)
@sdlc-stage4-impl-plan      # impl-plan.md
@sdlc-stage5-implementation # backend/src/**, frontend/src/**
@sdlc-stage6-review         # review findings + safe fixes
@sdlc-stage7-verify         # tests/e2e/specs/*, verification-report.md
@sdlc-stage8-pr             # CHANGELOG.md, sdlc-report.html, PR
```

## Human-in-the-Loop

Every stage gate BLOCKS until the user explicitly types `approve`, `continue`, or
`proceed` (or `reject`/`rework`/`redo` to loop back). Never auto-advance.

## Coding Conventions

- Backend routes return `{ success: true, data }` or `{ success: false, error }`.
- Auth-protected routes use `backend/src/middleware/auth.ts`.
- Frontend API calls go through `frontend/src/api/client.ts` (JWT via interceptor).
- State: Zustand stores in `frontend/src/store/`.
- Never hardcode secrets/URLs — use `process.env.*` / `.env`.

## Further Documentation

- `.github/SKILLS_REGISTRY.md` — skill catalogue
- `.github/instructions/README.md` — instruction file index
- `docs/AI_SDLC_OVERVIEW.md` — agents, URLs, tokens, and skill usage overview
