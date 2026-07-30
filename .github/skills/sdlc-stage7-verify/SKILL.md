---
description: >
  Stage 7 skill — Verification & Testing for Capstone Item Manager. Writes and
  executes Playwright/Cucumber tests, produces verification-report.md.
  Trigger: "@sdlc-stage7-verify".
---

# Skill: Stage 7 — Verification & Testing

**Input**: Changed backend/frontend files + `requirements.md` acceptance criteria.
**Output**: `tests/e2e/specs/*.spec.ts` (and/or `tests/features/*.feature`) +
`verification-report.md`.
**Gate**: PASS if every AC has a covering test + tests were actually executed +
results are real (never fabricated).
**Blocks**: Stage 8 cannot start until tests pass and report is written.

Full behavior defined in `.github/agents/sdlc-stage7-verify.agent.md` and
`.github/instructions/stage7-verify.instructions.md`.
