# AGENTS.md — Capstone Item Manager AI-SDLC Agents

This repo now ships a full **agentic SDLC pipeline** under `.github/` (agents,
instructions, skills, hooks, templates), modeled on the reference framework you
provided and adapted to this project's real stack: React + Vite + TS + Tailwind +
Zustand (frontend), Express + TS + SQLite (backend), Playwright + Cucumber (tests).

For the full breakdown of agents, URL/token wiring, and how to run the pipeline,
see **[docs/AI_SDLC_OVERVIEW.md](docs/AI_SDLC_OVERVIEW.md)**.

## Quick Start

```
@sdlc            # check pipeline status / start Stage 1
@sdlc resume      # continue from last completed stage
@sdlc status      # show gate table
```

## Agents (`.github/agents/`)

| Agent | Role |
|---|---|
| `sdlc` | Master orchestrator — runs all 8 stages with mandatory gates |
| `sdlc-stage1-requirements` | Requirements analyst |
| `sdlc-stage2-architecture` | Solution architect |
| `sdlc-stage3-design-review` | Design reviewer (APPROVE/REJECT) |
| `sdlc-stage4-impl-plan` | Implementation planner |
| `sdlc-stage5-implementation` | Implementation engineer |
| `sdlc-stage6-review` | Code reviewer (security/quality) |
| `sdlc-stage7-verify` | Test engineer |
| `sdlc-stage8-pr` | Release engineer (CHANGELOG, report, PR) |

## Scope Note

This pipeline governs **new feature work added on top of the existing app** — it
does not regenerate the already-built auth/items/dashboard functionality.
