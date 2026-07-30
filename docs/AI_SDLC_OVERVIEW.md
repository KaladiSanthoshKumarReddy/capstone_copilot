# AI SDLC Overview — Capstone Item Manager

This document explains exactly what was added, which agents/skills exist, and
which URLs/tokens they use — so you can verify and trust the wiring.

## 1. What Was Added

```
.github/
  copilot-instructions.md        # repo-wide entry point, auto-loaded by Copilot Chat
  SKILLS_REGISTRY.md              # catalogue of all 9 skills
  agents/                         # 9 agent definitions (orchestrator + 8 stages)
  instructions/                   # global policy + 8 stage instructions + gate checklist
    prompts/                      # 4 reusable prompt templates
  skills/                         # 9 SKILL.md files (token-optimized, one per stage)
  hooks/sdlc-gate.json            # session-start / subagent hooks that remind gates are mandatory
  templates/sdlc-report-template.html  # HTML template for the final Stage-8 report
.vscode/mcp.json                  # MCP server config wired to your Jira/Confluence/GitHub URLs
AGENTS.md                         # short pointer doc at repo root
docs/AI_SDLC_OVERVIEW.md          # this file
```

Nothing under `backend/`, `frontend/`, `tests/`, or `scripts/` was modified — the
app runtime code is untouched. This addition is purely the governance/agent layer.

## 2. The 8-Stage Pipeline

| # | Stage | Agent | Skill | Output |
|---|---|---|---|---|
| 1 | Requirements | `sdlc-stage1-requirements` | `sdlc-stage1-requirements` | `requirements.md` |
| 2 | Architecture | `sdlc-stage2-architecture` | `sdlc-stage2-architecture` | `architecture.md` |
| 3 | Design Review | `sdlc-stage3-design-review` | `sdlc-stage3-design-review` | `design-review.md` |
| 4 | Impl Plan | `sdlc-stage4-impl-plan` | `sdlc-stage4-impl-plan` | `impl-plan.md` |
| 5 | Implementation | `sdlc-stage5-implementation` | `sdlc-stage5-implementation` | `backend/src/**`, `frontend/src/**` |
| 6 | Code Review | `sdlc-stage6-review` | `sdlc-stage6-review` | findings + safe fixes |
| 7 | Verify | `sdlc-stage7-verify` | `sdlc-stage7-verify` | `tests/e2e/specs/*.spec.ts`, `verification-report.md` |
| 8 | PR & Report | `sdlc-stage8-pr` | `sdlc-stage8-pr` | `CHANGELOG.md`, `sdlc-report.html`, PR |

The `sdlc` agent (`.github/agents/sdlc.agent.md`) orchestrates all 8, blocking at
every gate for your explicit `approve`/`reject`.

## 3. Which URLs and Tokens Are Used — and Where From

Your root `.env` (already present, gitignored) is the single source of truth.
No token/URL is hardcoded anywhere in `.github/` — every file references the
variable name, not a value.

| Variable (in `.env`) | Current value in your `.env` | Used by |
|---|---|---|
| `JIRA_BASE_URL` | `https://jiraeu.epam.com` | Stage 1 agent (requirement sourcing), `.vscode/mcp.json` `jira` server |
| `JIRA_PROJECT_KEY` | `EPMCDMETST` | Stage 1 agent, to scope which Jira project to read issues from |
| `JIRA_EMAIL` / `JIRA_API_TOKEN` | set | Auth for Jira REST calls (PAT-style Bearer auth for EPAM Jira Server) |
| `CONFLUENCE_BASE_URL` | **currently blank** — fill in (e.g. `https://kb.epam.com`) | Stage 1 agent, `.vscode/mcp.json` `confluence` server |
| `CONFLUENCE_SPACE_KEY` | `2889552361` | Stage 1 agent, scopes which Confluence space to read |
| `CONFLUENCE_EMAIL` / `CONFLUENCE_API_TOKEN` | set | Auth for Confluence REST calls |
| `GIT_REPO_URL` | `https://github.com/KaladiSanthoshKumarReddy/capstone` | Stage 8 agent, to know where to open the PR |
| `GIT_BRANCH` | `main` | Stage 8 agent, PR target branch |
| `GITHUB_TOKEN` | set | **Not used by the agents directly** — Stage 8 opens PRs via the already-authenticated GitHub Pull Request VS Code extension tool. This var is kept only for any standalone script/CLI use outside VS Code. |

⚠️ **Action needed from you**: `CONFLUENCE_BASE_URL` is empty in your `.env`. Fill
it in (e.g. `https://kb.epam.com`, matching `.env.example`) if you want Stage 1 to
be able to reference Confluence pages.

## 4. `.vscode/mcp.json` — How It's Wired

```json
{
  "servers": {
    "github":     { "url": "https://api.githubcopilot.com/mcp/" },
    "jira":       { "url": "https://jiraeu.epam.com", "headers": { "Authorization": "Bearer ${input:jira-token}" } },
    "confluence": { "url": "https://kb.epam.com",      "headers": { "Authorization": "Bearer ${input:confluence-token}" } },
    "playwright": { "command": "npx", "args": ["-y", "@playwright/mcp@latest"] }
  }
}
```

- The `jira`/`confluence` URLs match your `.env` base URLs exactly (not the
  reference template's placeholder Atlassian Cloud URL).
- Tokens are **never stored in this file**. Each server references
  `${input:jira-token}` / `${input:confluence-token}` — VS Code prompts you once
  per session and stores the secret in its own secure credential store, not in a
  tracked file. Enter the same values as `JIRA_API_TOKEN` / `CONFLUENCE_API_TOKEN`
  from your `.env` when prompted.
- `github` uses the hosted `api.githubcopilot.com` MCP server (OAuth via your
  existing GitHub sign-in) — this is the same mechanism your GitHub Pull Request
  extension already uses, so Stage 8 doesn't need a separate token prompt.

### Important honesty note on Jira/Confluence

There is no certified generic "Jira MCP" / "Confluence MCP" server today — the
`jira`/`confluence` entries above describe the intended REST endpoint and auth
header shape so that if/when you add a compatible MCP server (e.g.
`mcp-atlassian`), it already points at your correct URLs. Until then, Stage 1's
most reliable path is:
1. A local `user-story.md` at the repo root (always works), or
2. Pasting the Jira/Confluence content directly into chat (since EPAM Jira/Confluence
   are SSO/VPN-gated and can't be fetched by generic web tools anyway).

## 5. How Skills Are Used

Each stage has a **SKILL.md** under `.github/skills/sdlc-stageN-*/` — these are
short (250–350 token) files so Copilot only loads the relevant stage's context
instead of the entire 8-stage pipeline every time. The `sdlc-orchestrator` skill
(~150–200 tokens) is the lightweight router that decides which stage to invoke
next based on which artifacts already exist in the repo. This mirrors the
token-efficiency design from your reference project (~85% fewer tokens per
session vs. one monolithic skill).

## 6. Security Notes (please action)

- Your project's own `.env` contains **live** Jira/Confluence/GitHub tokens. It's
  correctly listed in `.gitignore`, so it won't be committed — good. Just avoid
  pasting its contents into chats/tickets/screenshots going forward.
- The `trekbooking` reference folder's `.env` also contains what look like
  **live** credentials (a GitHub PAT and a Jira PAT for a different account).
  Those were **not** copied into this project. If that folder is shared further,
  I'd recommend rotating those two credentials as a precaution.

## 7. Running the Pipeline

```
@sdlc                     # start / check status
@sdlc-stage1-requirements   # or run a single stage directly
```
Create a `user-story.md` at the repo root describing your next feature, then run
`@sdlc` to kick off Stage 1.
