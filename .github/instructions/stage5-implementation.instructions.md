---
description: Stage 5 operating instructions — Implementation.
applyTo: "backend/src/**,frontend/src/**"
---

# Stage 5 — Implementation

## Input

`impl-plan.md` (required), `architecture.md`.

## Output

Code changes under `backend/src/` and `frontend/src/`, plus colocated unit tests.

## Do / Don't

- ✅ Follow existing router pattern (`backend/src/routes/items.ts`) for new endpoints.
- ✅ Follow existing Zustand store pattern (`frontend/src/store/authStore.ts`).
- ✅ Validate all inputs server-side; never trust `req.body` without checks.
- ✅ Use parameterized SQL only.
- ✅ Read config from `process.env.*`, never hardcode ports/URLs/secrets.
- ❌ Don't touch `tests/e2e/**` or `tests/features/**` (Stage 7 scope).
- ❌ Don't leave `console.log` debugging statements in committed code.

## Verification Before Gate

Run `cd frontend && npm run test` (Vitest) and report actual pass/fail counts.
Run `get_errors` on all changed files.
