---
description: >
  Stage 7 verification skill for Capstone Item Manager.
  Authors and executes Playwright/Cucumber verification assets, captures test
  evidence, and produces verification-report.md aligned to acceptance criteria.
  Trigger: "@sdlc-stage7-verify".
---

# Skill: Stage 7 - Verification and Testing

## Objective

Provide objective verification evidence that implementation satisfies acceptance
criteria and that critical user flows are reliable.

## Input

- `requirements.md`
- `impl-plan.md`
- Stage 5/6 code changes

## Output

- `tests/e2e/specs/*.spec.ts`
- `tests/features/*.feature` where behavior scenarios are needed
- `verification-report.md` with real execution evidence

## Verification Strategy

1. Build AC-to-test mapping before test authoring.
2. Reuse existing page objects and helpers.
3. Cover happy paths, negative paths, and edge cases.
4. Execute tests with real commands and capture outputs.
5. Document defects with reproducible steps.

## Required Report Sections

1. Scope and tested build context
2. Traceability matrix (`AC` -> `Test Case(s)`)
3. Commands executed and environment context
4. Real pass/fail counts and duration snapshots
5. Defects and residual risks
6. Gate recommendation

## Gate PASS Conditions

- 100 percent AC coverage with at least one test per AC
- Commands executed with real outcomes captured
- No unresolved critical defects preventing release

## Gate FAIL Conditions

- Missing AC traceability
- Non-executed or fabricated results
- Critical defects without remediation plan

## Integrity Rule

Never fabricate outcomes, durations, screenshots, URLs, or defect statistics.
