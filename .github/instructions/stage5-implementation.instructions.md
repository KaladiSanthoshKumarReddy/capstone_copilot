---
description: Stage 5 implementation instruction contract. Governs safe code changes in backend/src and frontend/src, contract alignment, auth enforcement, and evidence-backed completion.
applyTo: "backend/src/**,frontend/src/**"
---

# Stage 5 - Implementation Instructions

## Goal

Execute Stage 4 plan tasks to deliver production-safe behavior updates in backend
and frontend source code with objective completion evidence.

## Inputs

- `impl-plan.md`
- `architecture.md`
- `requirements.md`

## Allowed Scope

- `backend/src/**`
- `frontend/src/**`
- Colocated source tests related to changed behavior

## Required Implementation Discipline

1. Implement task-by-task using plan order and dependencies.
2. Keep each change bounded and reviewable.
3. Preserve existing route/store/component patterns.
4. Keep API contracts consistent or explicitly versioned/documented.
5. Add/adjust tests where behavior changes.

## Security and Data Controls

- Use auth middleware on protected routes.
- Validate all external input on server side.
- Use parameterized SQL queries only.
- Avoid leaking internal stack traces to clients.
- Do not hardcode secrets or environment URLs.

## Completion Evidence Requirements

- Task completion status by task ID
- Changed file list with intent summary
- Diagnostics results for changed files
- Relevant test execution results

## Quality Gate Requirements

- Critical diagnostics: zero in changed files
- Security controls applied where required
- Behavior is traceable to FR/AC and architecture

## Failure Conditions

Fail gate if critical defects, missing controls, or major drift from architecture
are detected.
