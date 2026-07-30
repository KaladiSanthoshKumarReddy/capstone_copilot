---
description: Stage 2 operating instructions — Architecture Design.
applyTo: "architecture.md"
---

# Stage 2 — Architecture Design

## Input

`requirements.md` (required), `design-review.md` (if reworking after REJECT).

## Output

`architecture.md` at workspace root.

## Required Sections

1. **Impacted Components** — backend routes/middleware, frontend
   components/pages/store, DB schema.
2. **Data Model** — new/changed tables/columns in the SQLite schema
   (`backend/src/db/init.ts`), with migration notes.
3. **API Contract** — new/changed endpoints, request/response shapes matching the
   existing `{ success, data }` / `{ success, error }` convention.
4. **Data Flow** — frontend component → `frontend/src/api/*` → backend route → DB.
5. **Tech Stack Notes** — confirm no new frameworks unless justified.
6. **ADRs** — architecture decision records for non-trivial tradeoffs.

## Do / Don't

- ✅ Extend existing modules; don't introduce parallel patterns.
- ✅ Keep auth on new endpoints via `backend/src/middleware/auth.ts`.
- ❌ Don't change the DB engine, framework, or auth mechanism without a strong,
  documented reason.
