---
description: >
  Stage 5 skill — Implementation for Capstone Item Manager. Executes impl-plan.md
  and writes production code under backend/src and frontend/src.
  Trigger: "@sdlc-stage5-implementation".
---

# Skill: Stage 5 — Implementation

**Input**: `impl-plan.md`.
**Output**: Changes under `backend/src/**`, `frontend/src/**`, plus unit tests.
**Gate**: PASS if all planned files exist/changed + ≥80% tasks complete + no
compile/lint errors + no secrets introduced.
**Blocks**: Stage 6 cannot start until implementation is complete and passes gate.

Full behavior defined in `.github/agents/sdlc-stage5-implementation.agent.md` and
`.github/instructions/stage5-implementation.instructions.md`.
