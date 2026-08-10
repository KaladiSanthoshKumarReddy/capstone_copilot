---
description: >
  Orchestrator Skill for Capstone Item Manager SDLC. Single entry point to check
  pipeline status, recommend next stage, and coordinate stage skills.
  Supports: @sdlc (check status), @sdlc resume (continue), @sdlc from=stage-N (jump).
  Triggers: "sdlc", "sdlc orchestrate", "sdlc resume", "sdlc status", "pipeline check".
---

# Orchestrator Skill: Capstone Item Manager AI SDLC

## Purpose

The orchestrator controls the complete 8-stage AI SDLC pipeline. It provides a
single command surface and enforces stage sequence, gate criteria, and explicit
human approvals.

This skill does not replace stage agents. It coordinates and validates the
execution context, then delegates to the correct stage skill/agent.

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

## Orchestration Workflow

1. Load gate state memory or initialize it if missing.
2. Verify artifact reality in workspace (workspace is source of truth over memory).
3. Compute stage progression status table.
4. Validate requested action against prerequisites.
5. Invoke one stage skill.
6. Capture stage result and gate recommendation.
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

## Failure Handling

When a stage gate fails, orchestrator must:

1. Mark gate as FAIL.
2. List concrete blocking reasons.
3. Provide file-targeted remediation steps.
4. Re-run only impacted stage after fixes.

## Safety and Integrity

- Never fabricate test metrics, report values, or URLs.
- Never hardcode secrets or environment-specific values.
- Never bypass human approval prompts.

## Cross References

- `.github/instructions/sdlc-global.instructions.md`
- `.github/instructions/gate-validation-checklist.md`
- `.github/agents/sdlc.agent.md`
