---
description: Global constraints and execution policy for Capstone Item Manager Agentic SDLC.
applyTo: "**"
---

# Global SDLC Instructions

## Mission

Implement Capstone Item Manager features end-to-end through GitHub Copilot agents,
prompts, instructions, skills, and hooks with gated human approval.

## Mandatory Execution Rules

1. Follow strict stage order: 1 to 8.
2. Never skip, merge, or auto-advance stages.
3. Stop at every gate and wait for explicit approval.
4. Use existing artifact filenames and folders exactly (see Artifact Contract).
5. Record evidence for every gate pass/fail decision.
6. Never fabricate test results, coverage, timings, URLs, or defects.
7. Never hardcode secrets, tokens, or environment-specific URLs in source or docs —
   read them from `.env` (see `docs/AI_SDLC_OVERVIEW.md` for the variable map).

## Artifact Contract

- Stage 1: `requirements.md`
- Stage 2: `architecture.md`
- Stage 3: `design-review.md`
- Stage 4: `impl-plan.md`
- Stage 5: changes under `backend/src/` and `frontend/src/`
- Stage 6: review findings in chat + safe fixes in changed files
- Stage 7: `tests/e2e/specs/*.spec.ts`, `tests/features/*.feature`, `verification-report.md`
- Stage 8: `CHANGELOG.md` and `sdlc-report.html`

## Quality Controls

1. Keep requirements traceability from source (Jira/Confluence/user-story.md) to test evidence.
2. Keep changes minimal and scoped to the current stage.
3. Fail a gate if required evidence is missing or ambiguous.
4. On failure, provide concrete remediation tasks and exact file targets.
5. Apply OWASP Top 10 hygiene: input validation, parameterized SQL, auth on
   protected routes, no secrets in client bundles.

## Human-In-The-Loop Approval

Only proceed when user intent is explicit (for example: approve, continue, proceed).
If approval is not explicit, remain at the current gate.

## Failure Handling

If a stage fails:

1. Mark gate as FAIL with reasons.
2. List blocking gaps and file-level fixes.
3. Re-run only the impacted stage after fixes.
