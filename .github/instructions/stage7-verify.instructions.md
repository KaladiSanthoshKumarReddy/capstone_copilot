---
description: Stage 7 verification instruction contract. Defines required automated tests, execution evidence, and verification-report.md completeness for acceptance validation.
applyTo: "tests/**"
---

# Stage 7 - Verification and Testing Instructions

## Goal

Generate and execute verification assets proving implementation meets acceptance
criteria, then document objective outcomes.

## Inputs

- `requirements.md`
- `impl-plan.md`
- Stage 5 and Stage 6 outputs

## Outputs

- Tests under `tests/e2e/specs/` and/or `tests/features/`
- `verification-report.md`

## Verification Workflow

1. Build AC coverage map before writing tests.
2. Reuse existing page objects/helpers where possible.
3. Add tests for happy path, negative, and edge cases.
4. Execute tests with real commands.
5. Capture pass/fail counts and durations.
6. Document defects and residual risk.

## Required verification-report.md Sections

1. Scope and environment context
2. AC-to-test traceability table
3. Commands run and real execution outputs
4. Pass/fail summary and durations
5. Defects with reproduction details
6. Final gate recommendation

## Quality Gate Requirements

- All ACs mapped to test cases
- Real, non-fabricated execution evidence
- No unresolved critical defects

## Failure Conditions

Fail gate when AC coverage is incomplete, results are unverifiable, or critical
issues remain unresolved.
