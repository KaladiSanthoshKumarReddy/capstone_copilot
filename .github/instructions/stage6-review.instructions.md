---
description: Stage 6 operating instructions — Code Review.
applyTo: "backend/src/**,frontend/src/**"
---

# Stage 6 — Code Review

## Input

Files changed in Stage 5 (per `impl-plan.md` task file targets).

## Output

Review findings in chat (severity-ranked) + safe fixes applied directly to files.

## Checklist

1. Type safety — no unchecked `any`, correct TS types end-to-end.
2. AuthN/AuthZ — protected routes use `backend/src/middleware/auth.ts`.
3. Input validation on every new/changed route.
4. SQL — parameterized only, no string concatenation.
5. No secrets/tokens/hardcoded URLs in source.
6. Consistent error response shape `{ success: false, error }`.
7. No dead code / unused imports / leftover `console.log`.
8. Run `get_errors` after fixes to confirm zero new diagnostics.

## Do / Don't

- ✅ Fix Critical/Major issues directly if the fix is safe and scoped.
- ✅ Flag anything that changes business logic instead of silently fixing it.
- ❌ Don't reduce test coverage while "cleaning up".
