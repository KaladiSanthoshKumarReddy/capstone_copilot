# Gate Validation Checklist (Objective Pass/Fail)

Use this checklist at each gate. A stage is PASS only when all required checks are PASS.

## Scoring Rule

- PASS: all required checks pass.
- FAIL: one or more required checks fail.
- BLOCKED: artifact missing or unreadable.

## Stage 1 Gate (Requirements)

1. `requirements.md` exists and is non-empty.
2. ≥10 functional requirements (FR-xx), each testable.
3. ≥15 acceptance criteria (AC-xx), each measurable.
4. Out-of-scope constraints and assumptions are explicitly stated.
5. Source (Jira key / Confluence page / user-story.md) is cited.

## Stage 2 Gate (Architecture)

1. `architecture.md` exists and is non-empty.
2. Identifies impacted components across backend/frontend/db.
3. Includes schema diff (if any) and data flow.
4. ≥80% of FRs traceable to an architecture element.
5. Fits the existing stack (no unjustified new dependencies).

## Stage 3 Gate (Design Review)

1. `design-review.md` exists and is non-empty.
2. Contains an explicit verdict: **APPROVED** or **REJECTED**.
3. Risks, security considerations, and rationale are documented.
4. If REJECTED, rework actions with file targets are listed.

## Stage 4 Gate (Implementation Plan)

1. `impl-plan.md` exists and is non-empty.
2. ≥15 tasks, each with an ID, file target, dependency, and success criterion.
3. Tasks ordered backend → frontend → tests.
4. All Stage-2 architecture elements are covered by at least one task.

## Stage 5 Gate (Implementation)

1. All planned files exist/changed under `backend/src/` and/or `frontend/src/`.
2. `get_errors` reports no new compile/lint errors.
3. ≥80% of impl-plan tasks complete.
4. No secrets or hardcoded environment URLs introduced.

## Stage 6 Gate (Code Review)

1. Review findings documented with severity (Critical/Major/Minor).
2. ≤2 unresolved Critical findings, with justification if deferred.
3. Safe fixes applied and verified with `get_errors`.
4. Auth/validation/SQL-safety checks explicitly confirmed.

## Stage 7 Gate (Verification)

1. Tests exist in `tests/e2e/specs/*.spec.ts` (and/or `tests/features/*.feature`).
2. Tests were executed; results in `verification-report.md` are real, not fabricated.
3. 100% of new acceptance criteria have at least one covering test.
4. Failing tests are logged as defects with reproduction steps, not hidden.

## Stage 8 Gate (PR and Report)

1. `CHANGELOG.md` has a new entry for this change.
2. `sdlc-report.html` exists with real (non-fabricated) metrics.
3. Report includes gate decisions and testing outcomes.
4. PR link included, or an explicit note why PR creation isn't possible yet.

## Gate Decision Template

- Stage:
- Artifact status:
- Required checks (PASS/FAIL):
- Evidence references:
- Decision: PASS or FAIL
- Next action:
