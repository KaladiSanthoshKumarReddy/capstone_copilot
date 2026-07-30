---
description: >
  Stage 1 skill — Requirements Analysis for Capstone Item Manager. Reads
  user-story.md, a Jira issue, or a Confluence page and writes requirements.md.
  Trigger: "@sdlc-stage1-requirements".
---

# Skill: Stage 1 — Requirements Analysis

**Input**: `user-story.md` OR Jira issue (`JIRA_BASE_URL` + `JIRA_PROJECT_KEY`) OR
Confluence page (`CONFLUENCE_BASE_URL` + `CONFLUENCE_SPACE_KEY`) — all from `.env`.
**Output**: `requirements.md` (≥10 FR, ≥15 AC).
**Gate**: PASS if ≥10 functional requirements + ≥15 testable acceptance criteria.
**Blocks**: Stage 2 cannot start until `requirements.md` exists and passes gate.

Full behavior defined in `.github/agents/sdlc-stage1-requirements.agent.md` and
`.github/instructions/stage1-requirements.instructions.md`.
