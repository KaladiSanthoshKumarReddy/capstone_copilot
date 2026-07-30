---
description: >
  Stage 2 skill — Architecture Design for Capstone Item Manager. Reads
  requirements.md and writes architecture.md (components, schema diff, ADRs).
  Trigger: "@sdlc-stage2-architecture".
---

# Skill: Stage 2 — Architecture Design

**Input**: `requirements.md`.
**Output**: `architecture.md` (impacted components, data model, tech stack, ADRs).
**Gate**: PASS if ≥80% traceability to requirements + components + schema diff defined.
**Blocks**: Stage 3 cannot start until `architecture.md` exists and passes gate.

Full behavior defined in `.github/agents/sdlc-stage2-architecture.agent.md` and
`.github/instructions/stage2-architecture.instructions.md`.
