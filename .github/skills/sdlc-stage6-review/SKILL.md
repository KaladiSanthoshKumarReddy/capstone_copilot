---
description: >
  Stage 6 skill — Code Review for Capstone Item Manager. Reviews Stage 5 changes
  for quality, security (OWASP), and consistency; applies safe fixes.
  Trigger: "@sdlc-stage6-review".
---

# Skill: Stage 6 — Code Review

**Input**: Files changed in Stage 5.
**Output**: Review findings (chat) + safe fixes applied to code.
**Gate**: PASS if ≤2 unresolved critical issues + auth/validation/SQL-safety confirmed
+ safe fixes applied.
**Blocks**: Stage 7 cannot start until review is complete and passes gate.

Full behavior defined in `.github/agents/sdlc-stage6-review.agent.md` and
`.github/instructions/stage6-review.instructions.md`.
