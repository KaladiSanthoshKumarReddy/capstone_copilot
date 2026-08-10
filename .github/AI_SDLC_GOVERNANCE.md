---
description: Central governance index for Capstone Item Manager AI SDLC assets.
---

# Capstone Item Manager AI SDLC Governance Index

## Purpose

This document is the single governance map for the Item Manager AI SDLC system.
It links all operational control assets: agents, skills, instructions, prompts,
hooks, stage artifacts, gate criteria, and evidence rules.

Use this index to onboard contributors, audit pipeline behavior, and validate
that stage execution remains deterministic and compliant.

## Governance Principles

1. Stage-gated execution only
2. Explicit human approval between stages
3. Evidence-backed PASS/FAIL decisions
4. No fabricated outputs, metrics, links, or defects
5. Minimal, stage-scoped changes
6. Security-first implementation and review hygiene

## Stage Model

1. Stage 1 - Requirements -> requirements.md
2. Stage 2 - Architecture -> architecture.md
3. Stage 3 - Design Review -> design-review.md
4. Stage 4 - Implementation Plan -> impl-plan.md
5. Stage 5 - Implementation -> backend/src and frontend/src changes
6. Stage 6 - Review -> severity-ranked findings + safe fixes
7. Stage 7 - Verify -> tests outputs + verification-report.md
8. Stage 8 - PR/Report -> CHANGELOG.md + sdlc-report.html + PR evidence

## Control Surface Map

### Global Governance

- .github/instructions/sdlc-global.instructions.md
- .github/instructions/gate-validation-checklist.md
- .github/SKILLS_REGISTRY.md

### Stage Instructions

- .github/instructions/stage1-requirements.instructions.md
- .github/instructions/stage2-architecture.instructions.md
- .github/instructions/stage3-design-review.instructions.md
- .github/instructions/stage4-impl-plan.instructions.md
- .github/instructions/stage5-implementation.instructions.md
- .github/instructions/stage6-review.instructions.md
- .github/instructions/stage7-verify.instructions.md
- .github/instructions/stage8-pr.instructions.md

### Prompt Templates

- .github/instructions/prompts/stage-execution.prompt.md
- .github/instructions/prompts/gate-review.prompt.md
- .github/instructions/prompts/reject-rework-loop.prompt.md
- .github/instructions/prompts/resume-from-gate.prompt.md

### Agent Definitions

- .github/agents/sdlc.agent.md
- .github/agents/sdlc-stage1-requirements.agent.md
- .github/agents/sdlc-stage2-architecture.agent.md
- .github/agents/sdlc-stage3-design-review.agent.md
- .github/agents/sdlc-stage4-impl-plan.agent.md
- .github/agents/sdlc-stage5-implementation.agent.md
- .github/agents/sdlc-stage6-review.agent.md
- .github/agents/sdlc-stage7-verify.agent.md
- .github/agents/sdlc-stage8-pr.agent.md

### Skill Definitions

- .github/skills/sdlc-orchestrator/SKILL.md
- .github/skills/sdlc-stage1-requirements/SKILL.md
- .github/skills/sdlc-stage2-architecture/SKILL.md
- .github/skills/sdlc-stage3-design-review/SKILL.md
- .github/skills/sdlc-stage4-impl-plan/SKILL.md
- .github/skills/sdlc-stage5-implementation/SKILL.md
- .github/skills/sdlc-stage6-review/SKILL.md
- .github/skills/sdlc-stage7-verify/SKILL.md
- .github/skills/sdlc-stage8-pr/SKILL.md

### Hooks

- .github/hooks/sdlc-gate.json

## Gate Decision Standard

A stage may be marked PASS only when all mandatory checks for that stage are
satisfied with objective evidence.

If any mandatory check is FAIL or BLOCKED, the stage is FAIL and must enter
controlled rework.

## Evidence Standard

Acceptable evidence sources:

- Stage artifact sections and checklists
- Traceability tables
- Compiler/linter diagnostics
- Test execution outputs
- Review findings with severity and disposition

Prohibited evidence behavior:

- Fabricated metrics or synthetic command output
- Implicit assumptions without artifact backing
- Placeholder values presented as completed work

## Rework Policy

- Failed stages rerun in place by default.
- Stage 3 rejection routes to Stage 2 architecture rework.
- Rework tasks must be file-targeted, ordered, and exit-criteria driven.

## Human-in-the-Loop Policy

Accepted approval intents include: approve, continue, proceed.

Without explicit approval intent, no stage transition is allowed.

## Audit Checklist

1. Are all required artifacts present and complete?
2. Are gate decisions backed by objective evidence?
3. Are unresolved critical risks blocked from progression?
4. Is traceability preserved from requirements to verification?
5. Are security and data handling controls visibly enforced?

## Maintenance Guidance

Update this index whenever:

- Stage contracts change
- New prompts/hooks are added
- Gate criteria are modified
- Agent/skill ownership boundaries shift

Keeping this file current ensures SDLC governance remains transparent,
operationally consistent, and audit-ready.
