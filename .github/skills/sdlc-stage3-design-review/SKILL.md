---
description: >
  Stage 3 skill — Design Review for Capstone Item Manager. Reviews architecture.md
  and writes design-review.md with an explicit APPROVED/REJECTED verdict.
  Trigger: "@sdlc-stage3-design-review".
---

# Skill: Stage 3 — Design Review

**Input**: `architecture.md`.
**Output**: `design-review.md` with explicit verdict.
**Gate**: PASS if verdict is APPROVED + evidence documented.
**Blocks**: If REJECTED, Stage 2 must be re-run; if APPROVED, Stage 4 may proceed.

Full behavior defined in `.github/agents/sdlc-stage3-design-review.agent.md` and
`.github/instructions/stage3-design-review.instructions.md`.
