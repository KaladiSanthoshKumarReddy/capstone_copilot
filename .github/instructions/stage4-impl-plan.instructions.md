---
description: Stage 4 implementation planning instruction contract. Defines deterministic task sequencing, dependency mapping, and completion-ready task granularity for impl-plan.md.
applyTo: "impl-plan.md"
---

# Stage 4 - Implementation Planning Instructions

## Goal

Produce a complete, dependency-aware implementation plan that can be executed
without guesswork.

## Inputs

- `design-review.md` with APPROVED verdict
- `architecture.md`
- `requirements.md`

## Output

- `impl-plan.md`

## Required Task Table Columns

- ID
- Description
- File Target(s)
- Depends On
- Success Criterion
- FR/AC Links

## Planning Rules

- Minimum 15 tasks
- Order tasks by dependency and risk
- Include backend, frontend, and testing tasks
- Keep task scopes small and verifiable
- Ensure every major architecture element is covered

## Quality Gate Requirements

- Task ordering is coherent and executable
- Success criteria are objective
- Test tasks are explicit and sufficient

## Failure Conditions

Fail gate if plan is underspecified, missing dependencies, or missing coverage
for key architecture elements.
