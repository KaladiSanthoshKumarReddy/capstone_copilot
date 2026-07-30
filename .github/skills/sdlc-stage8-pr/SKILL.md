---
description: >
  Stage 8 skill — PR & Report Generation for Capstone Item Manager. Creates
  CHANGELOG.md and sdlc-report.html, and opens a pull request.
  Trigger: "@sdlc-stage8-pr".
---

# Skill: Stage 8 — PR & Report Generation

**Input**: All artifacts from stages 1–7.
**Output**: `CHANGELOG.md` + `sdlc-report.html` + an opened pull request.
**Gate**: PASS if CHANGELOG complete + report complete + all metrics real + PR
opened (or explicit note why not).
**Blocks**: None (pipeline complete on PASS).

Full behavior defined in `.github/agents/sdlc-stage8-pr.agent.md` and
`.github/instructions/stage8-pr.instructions.md`.
