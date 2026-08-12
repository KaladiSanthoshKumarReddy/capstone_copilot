---
name: sdlc-orchestrator
description: >
  Orchestrator skill for Capstone Item Manager AI SDLC.
  Scope is control-plane only: invoke one eligible stage skill, track gate status
  from workspace artifacts, and action stage outputs (PASS/FAIL/BLOCKED,
  remediation routing, approval wait).
  Commands: @sdlc, @sdlc status, @sdlc resume, @sdlc from=stage-N.
  Trigger phrases: "sdlc", "sdlc orchestrate", "sdlc resume", "sdlc status",
  "pipeline check".
---

# Orchestrator Skill: Capstone Item Manager AI SDLC

## Purpose

The orchestrator is the control plane for the 8-stage AI SDLC pipeline.
It provides one command surface to invoke stages, track gate state, and act on
stage outputs.

The orchestrator does not perform stage implementation work. Stage agents own
artifact creation and code/test changes.

## Supported Commands

| Command | Behavior |
|---|---|
| `@sdlc` | Inspect current state and recommend the immediate next stage |
| `@sdlc status` | Show gate table with stage-by-stage PASS/FAIL/BLOCKED state |
| `@sdlc resume` | Continue from the most recent stage that is eligible to run |
| `@sdlc from=stage-1..8` | Attempt controlled jump with prerequisite validation |

## Inputs

- Session state memory files under `/memories/session/`
- Stage artifacts in workspace root and source/test folders
- Global/stage instruction files under `.github/instructions/`

## Outputs

- Orchestrator status summary in chat
- Deterministic recommendation: run stage, approve gate, or rework stage
- Delegation to one stage skill at a time

## Responsibility Boundary

Orchestrator responsibilities are strictly limited to:

1. Invoke exactly one eligible stage skill.
2. Track stage/gate status using artifact-backed evidence.
3. Take action on stage output: mark PASS/FAIL/BLOCKED, request remediation, or
  wait for explicit user approval.

The orchestrator must not:

- Draft stage artifacts on behalf of a stage.
- Implement production code or tests for a stage.
- Auto-advance to the next stage without explicit user approval.

## Orchestration Workflow

1. Load gate state memory or initialize it if missing.
2. Verify artifact reality in workspace (workspace is source of truth over
  memory).
3. Compute stage progression status table.
4. Validate requested action against prerequisites.
5. Invoke one stage skill.
6. Capture stage output and map it to a gate action.
7. Stop and wait for explicit approval before any transition.

## Stage Transition Rules

- Sequential progression is default and preferred.
- Stage jumps are only valid when prerequisites and artifacts are satisfied.
- Stage 3 REJECTED verdict always routes rework to Stage 2.
- No auto-advance after stage completion.

## Gate Decision Model

A gate is considered PASS only when:

1. Required artifact exists.
2. Required sections and minimum quality bars are met.
3. Evidence is explicit and not inferred.
4. No unresolved critical blockers exist for the stage.

## Failure Actioning

When a stage gate fails, the orchestrator:

1. Marks gate as FAIL.
2. Records concrete blockers from stage output.
3. Routes to the impacted stage for rework.

## Cross References

- `.github/instructions/sdlc-global.instructions.md`
- `.github/instructions/gate-validation-checklist.md`
- `.github/agents/sdlc.agent.md`
