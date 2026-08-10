---
description: Global SDLC policy for all stages. Enforces gate order, explicit approvals, artifact contracts, evidence quality, security hygiene, and failure/rework handling.
applyTo: "**"
---

# Global SDLC Instructions

## Mission

Deliver Item Manager features through an 8-stage AI SDLC pipeline with strict
human-in-the-loop governance and verifiable quality evidence.

## Universal Rules

1. Follow stage order from 1 to 8 unless a controlled rework loop is active.
2. Never auto-advance after a stage finishes.
3. Require explicit user approval to move between stages.
4. Use canonical artifact names and locations.
5. Preserve traceability from requirement to test evidence.
6. Never fabricate metrics, links, outputs, or defects.
7. Never hardcode secrets, tokens, or environment-specific URLs.

## Canonical Artifact Contract

- Stage 1: `requirements.md`
- Stage 2: `architecture.md`
- Stage 3: `design-review.md`
- Stage 4: `impl-plan.md`
- Stage 5: code changes in `backend/src/**` and `frontend/src/**`
- Stage 6: findings in chat + safe review fixes
- Stage 7: `tests/e2e/specs/*.spec.ts`, `tests/features/*.feature`, `verification-report.md`
- Stage 8: `CHANGELOG.md` and `sdlc-report.html`

## Quality Principles

1. Changes must be minimal and scope-accurate.
2. Security controls must follow OWASP-aligned hygiene.
3. Data access must use parameterized SQL.
4. Protected routes must enforce auth middleware.
5. Frontend and backend contracts must stay consistent.

## Gate Integrity Requirements

- Gate decisions must include objective evidence.
- Missing or ambiguous evidence means FAIL.
- FAIL must include blocking reasons and targeted remediation.

## Human Approval Requirements

Proceed only when user intent is explicit, such as `approve`, `continue`, or
`proceed`. If intent is unclear, remain at current gate.

## Failure Handling

When a stage fails:

1. Mark gate `FAIL`.
2. List blockers with severity and impact.
3. Provide exact file-level remediation tasks.
4. Re-run only impacted stage after fixes.
