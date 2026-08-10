---
description: Stage 6 operating instructions - Code Review.
applyTo: "backend/src/**,frontend/src/**"
---

# Stage 6 - Code Review Instructions

## Goal

Assess Stage 5 implementation for correctness, security, maintainability, and
contract integrity. Apply safe fixes where possible.

## Inputs

- Stage 5 changed files
- `requirements.md`, `architecture.md`, `impl-plan.md`

## Output

- Severity-ranked findings in chat
- Safe fixes in source files when low risk

## Review Checklist

1. Requirements/architecture alignment
2. Type safety and runtime failure risks
3. Auth and authorization enforcement
4. Input validation completeness
5. SQL safety and data consistency
6. Error handling and API response consistency
7. Maintainability and readability
8. Test adequacy for changed behavior

## Findings Format

For each finding, include:

- Severity
- Location
- Risk
- Suggested remediation
- Fix status

## Safe Fix Policy

- Apply deterministic, low-risk fixes directly.
- For risky behavior changes, report and request explicit approval.

## Quality Gate Requirements

- No unresolved critical findings
- Major findings resolved or explicitly accepted
- Post-fix diagnostics do not introduce new issues

## Failure Conditions

Fail gate if critical issues remain or evidence is incomplete.
