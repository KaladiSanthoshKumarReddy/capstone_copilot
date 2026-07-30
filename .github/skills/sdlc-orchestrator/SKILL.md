---
description: >
  Orchestrator Skill for Capstone Item Manager SDLC. Single entry point to check
  pipeline status, recommend next stage, and coordinate stage skills.
  Supports: @sdlc (check status), @sdlc resume (continue), @sdlc from=stage-N (jump).
  Triggers: "sdlc", "sdlc orchestrate", "sdlc resume", "sdlc status", "pipeline check".
---

# Orchestrator Skill: Capstone Item Manager SDLC Pipeline

## Purpose
Single entry point (`@sdlc`) to navigate the 8-stage SDLC pipeline for the Capstone
Item Manager. Checks gate status, recommends next action, invokes stage skills,
and coordinates state transitions.

## Supported Invocations

| Command | Action |
|---------|--------|
| `@sdlc` | Check current pipeline status and recommend next stage |
| `@sdlc resume` | Continue from last completed stage |
| `@sdlc from=stage-1` | Start Stage 1 (requirements) |
| `@sdlc from=stage-5` | Jump to Stage 5 (implementation) if prerequisites met |
| `@sdlc status` | Display detailed gate status table |

## Prerequisites
- `/memories/session/sdlc-gate-state.md` exists (created on first run)
- A requirement source is available: `user-story.md`, Jira issue, or Confluence page

## Core Steps

1. Initialize `/memories/session/sdlc-gate-state.md` if missing (current_stage: 1).
2. Read current state to determine current_stage and last_gate_verdict.
3. Inspect workspace artifacts: requirements.md → architecture.md → design-review.md
   → impl-plan.md → backend/frontend diffs → review findings → tests/verification-report.md
   → CHANGELOG.md, to determine actual completion (source of truth over memory).
4. Determine next action and invoke the matching stage agent
   (`@sdlc-stageN-*`) via `runSubagent`.
5. On completion, print the gate message and STOP — await explicit user approval
   (`approve`/`continue`/`proceed`) before invoking the next stage.

## Cross-References

- Global rules: `.github/instructions/sdlc-global.instructions.md`
- Gate checklist: `.github/instructions/gate-validation-checklist.md`
- Full agent: `.github/agents/sdlc.agent.md`

