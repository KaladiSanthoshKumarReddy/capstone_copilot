---
description: Stage 7 operating instructions — Verification & Testing.
applyTo: "tests/**"
---

# Stage 7 — Verification & Testing

## Input

`requirements.md` acceptance criteria, `impl-plan.md` test tasks, changed
backend/frontend files.

## Output

`tests/e2e/specs/*.spec.ts` (and/or `tests/features/*.feature`), plus
`verification-report.md` at workspace root.

## Do / Don't

- ✅ Reuse page objects in `tests/e2e/pages/` and helpers in `tests/e2e/helpers/auth.ts`.
- ✅ Run `cd tests && npx playwright test` and report REAL pass/fail counts.
- ✅ Map every AC-xx to at least one test case in the report.
- ❌ Don't edit `backend/src` or `frontend/src` to force tests green.
- ❌ Don't report fabricated timings, counts, or pass rates.

## verification-report.md Required Sections

1. AC-to-test traceability table.
2. Actual command output (pass/fail counts, duration).
3. Defects found, with reproduction steps and severity.
