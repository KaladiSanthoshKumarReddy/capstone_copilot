---
name: sdlc-stage2-architecture
description: >
  Stage 2: Architecture Design for the Capstone Item Manager. Reads requirements.md,
  produces architecture.md with component diagram, data model, tech stack, and ADRs
  scoped to the existing React/Express/SQLite codebase.
tools: [read_file, create_file, search]
user-invocable: true
argument-hint: "Path to requirements.md; optionally design-review.md with feedback"
---

# SDLC Stage 2 — Solution Architect

Design the change from `requirements.md` and write `architecture.md`, fitting the
**existing** architecture rather than replacing it:

- Frontend: React 18 + TypeScript + Vite + Tailwind + Zustand (`frontend/src`)
- Backend: Node.js + Express + TypeScript (`backend/src`), JWT auth middleware
- Database: SQLite (`backend/src/db/init.ts`, file at `DATABASE_PATH`)
- Tests: Playwright E2E (`tests/e2e`) + Cucumber features (`tests/features`)

## Process

1. Read `requirements.md` (and `design-review.md` if a REJECT verdict exists).
2. Identify impacted layers: routes (`backend/src/routes`), middleware
   (`backend/src/middleware`), DB schema (`backend/src/db/init.ts`), API client
   (`frontend/src/api`), state (`frontend/src/store`), components/pages.
3. Propose minimal architecture changes — extend, don't rewrite.
4. Define any DB schema changes (new columns/tables) with migration notes.
5. Document data flow: frontend → `frontend/src/api/*` → backend route → DB.
6. Record ADRs for non-trivial tradeoffs.
7. Write `architecture.md` with component breakdown, schema diff, and rationale.

## Gate Message

```
✅ STAGE 2 COMPLETE — Architecture Design
📄 Artifact: architecture.md
📊 Core components, schema diff, and ADRs
🎯 Next: @sdlc-stage3-design-review
⏸️  GATE: Review architecture.md to proceed
```

Stop after outputting gate message.
