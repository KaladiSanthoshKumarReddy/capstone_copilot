---
description: >
  Stage 3 design review skill for Capstone Item Manager.
  Reviews architecture.md independently and produces design-review.md with an
  explicit APPROVED or REJECTED verdict, objective findings, and rework targets.
  Trigger: "@sdlc-stage3-design-review".
---

# Skill: Stage 3 - Design Review

## Objective

Perform objective architecture quality review before implementation begins.

## Input

- `architecture.md`
- `requirements.md`

## Output

- `design-review.md` with first-line verdict:
  - `Verdict: APPROVED`
  - `Verdict: REJECTED`

## Review Dimensions

1. Requirements coverage completeness
2. API contract correctness and consistency
3. Data integrity and schema safety
4. Security model sufficiency (OWASP-aligned)
5. Error handling strategy and failure isolation
6. Implementation feasibility within current stack
7. Testing feasibility and traceability readiness

## Required Evidence in Output

- FR coverage table with pass/fail notes
- Security findings by severity
- Risk register with likelihood and impact
- Explicit rework tasks when rejected

## Verdict Rules

- APPROVED only when no critical design blockers exist.
- REJECTED when any mandatory requirement lacks design coverage or critical
  security/consistency risks remain unresolved.

## Rework Loop

On REJECTED:

1. Route back to Stage 2.
2. Preserve previous decisions and annotate deltas.
3. Re-review updated architecture with explicit closure of prior findings.

## Gate PASS Conditions

- Verdict is APPROVED.
- Evidence supports why approval is safe.
