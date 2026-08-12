---
name: sdlc-stage6-review
description: >
  Stage 6 code review skill for Capstone Item Manager.
  Reviews Stage 5 changes for correctness, security, and maintainability,
  reports severity-ranked findings, and applies low-risk remediation fixes.
  Trigger: "@sdlc-stage6-review".
---

# Skill: Stage 6 - Code Review

## Objective

Perform an implementation-focused review to identify regressions, security gaps,
contract violations, and maintainability issues before formal verification.

## Input

- Stage 5 changed files
- `impl-plan.md`
- `architecture.md`
- `requirements.md`

## Output

- Severity-ranked findings in chat
- Safe, low-risk fixes directly applied when appropriate

## Review Scope

1. Correctness and behavior regressions
2. Type safety and runtime risk
3. Authentication/authorization coverage
4. Input validation completeness
5. SQL safety and data integrity
6. Error handling and contract consistency
7. Code clarity, duplication, and maintainability
8. Test alignment for changed behavior

## Findings Format

Each finding must include:

- Severity (`Critical`, `Major`, `Minor`)
- Location (file and symbol)
- Risk description
- Recommended remediation
- Fix status (`Applied` or `Pending`)

## Safe-Fix Policy

Apply only deterministic low-risk fixes that do not alter intended business
behavior. For risky logic changes, document clearly and request explicit approval.

## Gate PASS Conditions

- No unresolved critical findings
- Major findings are fixed or explicitly accepted with rationale
- Post-fix diagnostics do not introduce new errors

## Gate FAIL Conditions

- Critical unresolved security/correctness issues
- Review evidence incomplete or ambiguous

## Downstream Contract

Stage 7 verification should test against reviewed code, not pre-review state.
