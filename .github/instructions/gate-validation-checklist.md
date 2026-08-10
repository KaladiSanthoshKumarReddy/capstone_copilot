# Gate Validation Checklist - Item Manager AI SDLC

Use this checklist to evaluate PASS/FAIL decisions consistently across all
stages. A stage passes only when all mandatory checks are satisfied.

## Stage 1 - Requirements

Mandatory checks:

- Source of requirements is explicit and verifiable.
- `requirements.md` contains required sections.
- At least 10 FR entries.
- At least 15 AC entries in measurable Given/When/Then style.
- Scope, out-of-scope, assumptions, and constraints are explicit.

## Stage 2 - Architecture

Mandatory checks:

- `architecture.md` exists and is complete.
- FR-to-architecture traceability coverage is at least 80 percent.
- API contracts are explicit and consistent with project conventions.
- Schema/model changes are defined with migration impact notes.
- Security and validation controls are documented.

## Stage 3 - Design Review

Mandatory checks:

- `design-review.md` begins with explicit verdict.
- Every key requirement has review coverage evidence.
- Critical risks are either resolved or drive rejection.
- Rework tasks are explicit when verdict is REJECTED.

## Stage 4 - Implementation Plan

Mandatory checks:

- `impl-plan.md` exists.
- At least 15 dependency-ordered tasks.
- Every major architecture item maps to one or more tasks.
- Explicit test tasks are present.
- Success criteria are objective and verifiable.

## Stage 5 - Implementation

Mandatory checks:

- Code changes exist in intended source folders.
- Task completion evidence is provided.
- No critical diagnostics remain in changed files.
- Validation/auth/SQL safety controls are present.
- No secrets or environment constants are hardcoded.

## Stage 6 - Review

Mandatory checks:

- Findings are severity-ranked and actionable.
- Critical findings are resolved or explicitly blocked.
- Safe fixes are validated with diagnostics.
- Residual risk is documented.

## Stage 7 - Verification

Mandatory checks:

- AC-to-test traceability is complete.
- Tests are executed and results are real.
- `verification-report.md` includes pass/fail counts and defects.
- Critical unresolved defects block gate PASS.

## Stage 8 - PR/Report

Mandatory checks:

- `CHANGELOG.md` reflects delivered scope.
- `sdlc-report.html` is fully populated with real data.
- PR creation evidence exists (or failure is explicitly evidenced).
- No placeholder or fabricated values remain.

## Final Rule

If any mandatory check fails, mark gate FAIL and return explicit remediation.
