---
description: >
  Stage 5 implementation skill for Capstone Item Manager.
  Executes impl-plan.md tasks and applies production-safe code changes in
  backend/src and frontend/src while preserving auth, contract integrity, and
  existing project conventions.
  Trigger: "@sdlc-stage5-implementation".
---

# Skill: Stage 5 - Implementation

## Objective

Implement approved design through the execution plan while preserving codebase
patterns, type safety, security controls, and testability.

## Input

- `impl-plan.md`
- `architecture.md`
- `requirements.md`

## Output

- Production code updates under `backend/src/**` and `frontend/src/**`
- Related unit/integration tests where required by plan tasks

## Execution Contract

1. Execute tasks in declared order unless dependencies permit parallelization.
2. Keep changes minimal and task-scoped.
3. Maintain existing API and state management conventions unless explicitly changed.
4. Record completed task IDs and evidence.

## Required Engineering Controls

- Server-side validation for all input-bearing routes
- Parameterized SQL only
- Auth middleware on protected endpoints
- Stable error contract: `{ success: false, error }`
- No secrets, tokens, or environment URLs hardcoded

## Quality Checks Before Gate

- Type/compile diagnostics are clean for changed files
- Relevant unit tests are added/updated and run
- No debug-only logs or dead code in committed changes
- Behavior aligns with architecture and requirements

## Gate PASS Conditions

- At least 80 percent of Stage 4 tasks are completed with evidence
- No unresolved critical implementation defects
- All changed surfaces compile and are testable

## Gate FAIL Conditions

- Architectural drift without approval
- Missing validation/security controls
- Broken contract behavior or failing critical checks

## Downstream Contract

Stage 6 review consumes this diff and may apply safe fixes only.
