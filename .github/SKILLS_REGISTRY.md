---
description: Capstone Item Manager SDLC Skills Registry and Quick Reference
---

# Skills Registry — Capstone Item Manager SDLC Pipeline

## Quick Reference

- **`sdlc-orchestrator`** — Single entry point for entire pipeline management.
  Triggers: `@sdlc`, `@sdlc resume`, `@sdlc status`, `@sdlc from=stage-N`.

## 8 Stage Skills

| Skill | Input | Output | Gate |
|-------|-------|--------|------|
| sdlc-stage1-requirements | user-story.md / Jira / Confluence | requirements.md | ≥10 FR, ≥15 AC |
| sdlc-stage2-architecture | requirements.md | architecture.md | ≥80% traceability |
| sdlc-stage3-design-review | architecture.md | design-review.md | Explicit APPROVE/REJECT |
| sdlc-stage4-impl-plan | design-review.md (APPROVED) | impl-plan.md | ≥15 ordered tasks |
| sdlc-stage5-implementation | impl-plan.md | backend/src/**, frontend/src/** | No compile errors, ≥80% tasks |
| sdlc-stage6-review | Stage 5 diff | Findings + safe fixes | ≤2 unresolved critical |
| sdlc-stage7-verify | Stage 5 diff + requirements.md | tests/e2e/specs/*, verification-report.md | 100% AC coverage, real results |
| sdlc-stage8-pr | All artifacts | CHANGELOG.md, sdlc-report.html, PR | Real metrics, PR opened |

## Stage Ordering

Sequential, each stage blocks on the previous gate. Stage 3 REJECT loops to Stage 2.

## State Management

- `/memories/session/sdlc-gate-state.md` — master state
- `/memories/session/stageN-state.md` — per-stage state
- `/memories/session/orchestrator-log.md` — execution log

## Cross-References

- `.github/instructions/stageN-*.instructions.md`
- `.github/instructions/sdlc-global.instructions.md`
- `.github/instructions/gate-validation-checklist.md`
- `.github/agents/sdlc-stageN-*.agent.md`

## URL / Token Wiring

See [docs/AI_SDLC_OVERVIEW.md](../docs/AI_SDLC_OVERVIEW.md) for exactly which
`.env` variables each stage/skill uses and how `.vscode/mcp.json` resolves them.
