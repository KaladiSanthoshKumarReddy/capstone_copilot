---
description: Stage 3 operating instructions - Design Review.
applyTo: "design-review.md"
---

# Stage 3 - Design Review Instructions

## Goal

Determine whether architecture is safe and complete enough to proceed to
implementation.

## Inputs

- `architecture.md`
- `requirements.md`

## Output

- `design-review.md` with explicit verdict line

## Mandatory Verdict Format

First line must be exactly one of:

- `Verdict: APPROVED`
- `Verdict: REJECTED`

## Required Review Content

1. FR coverage audit
2. Security and validation review
3. Data integrity and consistency checks
4. Performance and operational risks
5. Testability and observability check
6. Rework task list if rejected

## Review Rules

- Reject when critical requirement coverage is missing.
- Reject when critical security gaps remain unresolved.
- Approve only with evidence-backed confidence.

## Failure Conditions

Any ambiguous verdict or missing evidence is an automatic gate FAIL.
