---
name: sdlc-stage4-impl-plan
description: >
  Stage 4 implementation planning skill for Capstone Item Manager.
  Converts approved architecture.md into ordered impl-plan.md tasks with
  dependencies, sequencing rationale, and verifiable completion criteria.
  Trigger: "@sdlc-stage4-impl-plan".
---

# Skill: Stage 4 - Implementation Planning

## Objective

Create an execution plan that is complete, ordered, traceable, and directly
implementable by engineering agents.

## Input

- `design-review.md` with `Verdict: APPROVED`
- `architecture.md`
- `requirements.md`

## Output

- `impl-plan.md`

## Required Plan Structure

A task table with these columns:

- `ID`
- `Description`
- `File Target(s)`
- `Depends On`
- `Success Criterion`
- `Requirement Links (FR/AC)`

## Minimum Quality Bar

- At least 15 tasks
- Tasks are dependency-ordered
- Coverage includes backend, frontend, tests, and docs/reporting needs
- Every major architecture element maps to one or more tasks

## Execution Steps

1. Decompose architecture into implementation units.
2. Separate safe increments from high-risk changes.
3. Define objective completion criteria per task.
4. Add explicit test tasks (unit/integration/E2E as applicable).
5. Validate ordering and dependency correctness.
6. Verify traceability back to FR/AC.

## Gate PASS Conditions

- Plan is complete, sequenced, and test-inclusive.
- No orphan architecture decisions without tasks.
- Success criteria are objectively verifiable.

## Gate FAIL Conditions

- Missing test tasks.
- Ambiguous task ownership/targets.
- Dependency ordering conflicts.

## Downstream Contract

Stage 5 must execute against this plan and report progress by task ID.
