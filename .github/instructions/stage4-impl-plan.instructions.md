---
description: Stage 4 operating instructions — Implementation Planning.
applyTo: "impl-plan.md"
---

# Stage 4 — Implementation Planning

## Input

`design-review.md` with `Verdict: APPROVED` (required), `architecture.md`.

## Output

`impl-plan.md` at workspace root.

## Required Sections

Task table with columns: `ID | Description | File Target(s) | Depends On | Success Criterion`.

## Minimums

≥15 tasks, ordered: DB/schema → backend routes/middleware → frontend
api/store/components/pages → unit tests → E2E tests → docs.

## Do / Don't

- ✅ Every architecture element from Stage 2 must map to ≥1 task.
- ✅ Include explicit test tasks (Vitest unit + Playwright E2E) as separate tasks.
- ❌ Don't start Stage 4 if Stage 3 verdict is REJECTED.
