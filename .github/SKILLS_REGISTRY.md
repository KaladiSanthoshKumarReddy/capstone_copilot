---
description: Registry of all Capstone Item Manager SDLC skills, including stage ownership, trigger usage, expected artifacts, and quick-reference execution guidance.
---

# Skills Registry - Capstone Item Manager AI SDLC

## Overview

This registry defines all skills used by the Item Manager AI SDLC pipeline. The
pipeline is intentionally stage-gated and human-approved. Every skill is mapped
to a specific stage artifact, gate criteria, and rework path.

The orchestrator is the only entry point for normal operation. Direct stage skill
invocations are supported for controlled rework or targeted execution.

## Entry Skill

- `sdlc-orchestrator`
  - Primary command surface: `@sdlc`, `@sdlc status`, `@sdlc resume`,
    `@sdlc from=stage-N`
  - Responsibility: determine current gate state, verify prerequisites, invoke
    stage skill, stop for explicit approval at each gate

## Stage Skills Matrix

| Stage | Skill | Primary Input | Primary Output | Gate Decision | Rework Path |
|---|---|---|---|---|---|
| 1 | sdlc-stage1-requirements | user-story.md/Jira/Confluence | requirements.md | PASS when FR and AC quality bars are met | Stage 1 rerun |
| 2 | sdlc-stage2-architecture | requirements.md | architecture.md | PASS when traceability and design completeness are met | Stage 2 rerun |
| 3 | sdlc-stage3-design-review | architecture.md + requirements.md | design-review.md | APPROVED/REJECTED | REJECTED loops to Stage 2 |
| 4 | sdlc-stage4-impl-plan | design-review.md APPROVED | impl-plan.md | PASS when plan is complete, ordered, and test-included | Stage 4 rerun |
| 5 | sdlc-stage5-implementation | impl-plan.md + architecture.md | code in backend/src + frontend/src | PASS when implementation evidence and quality checks pass | Stage 5 rerun |
| 6 | sdlc-stage6-review | Stage 5 diff | findings in chat + safe fixes | PASS when critical issues resolved or explicitly tracked | Stage 6 rerun |
| 7 | sdlc-stage7-verify | requirements + implementation | tests + verification-report.md | PASS when AC coverage and real execution evidence exist | Stage 7 rerun |
| 8 | sdlc-stage8-pr | all stage artifacts | CHANGELOG.md + sdlc-report.html + PR | PASS when report and PR evidence are complete | Stage 8 rerun |

## Standard Skill Contract

Every stage skill must:

1. Confirm required upstream artifacts exist and are readable.
2. Refuse execution if upstream gate is not passed.
3. Produce only stage-scoped outputs.
4. Record objective evidence used for PASS/FAIL decisions.
5. Never fabricate results, counters, links, timings, coverage, or test output.
6. Stop at gate and wait for explicit human approval before downstream execution.

## Evidence Model

Each stage must provide evidence in one or more of these forms:

- Artifact content evidence (explicit sections/tables/checklists)
- Validation evidence (lint/test/diagnostics outputs where applicable)
- Traceability evidence (FR -> design -> task -> test mapping)
- Risk/security evidence (OWASP controls and unresolved risk register)

## Human-In-The-Loop Rules

No skill or agent is allowed to auto-advance stages. Explicit user confirmation
is mandatory between stages. Accepted approvals include: `approve`, `continue`,
`proceed`. Rework controls include: `reject`, `rework`, `redo`.

## Global References

- Global policy: `.github/instructions/sdlc-global.instructions.md`
- Gate rubric: `.github/instructions/gate-validation-checklist.md`
- Skill implementation details: `.github/skills/<stage>/SKILL.md`
- Agent execution contracts: `.github/agents/*.agent.md`
- SDLC mapping and environment wiring: `docs/AI_SDLC_OVERVIEW.md`
