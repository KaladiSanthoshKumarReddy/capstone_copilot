# Agentic SDLC Instructions

This folder defines project-level and stage-level instructions for the Capstone
Item Manager Agentic SDLC pipeline.

## What Is Here

- `sdlc-global.instructions.md`: Global rules shared by all SDLC stages.
- `gate-validation-checklist.md`: Objective gate criteria for pass/fail decisions.
- `stage1-requirements.instructions.md` to `stage8-pr.instructions.md`: Stage-scoped
  operating instructions.
- `prompts/`: Reusable prompt templates for running stages, gate checks, resume flow,
  and reject/rework flow.

## Usage Model

1. Run the SDLC orchestrator (`@sdlc`) and stage agents (`@sdlc-stageN-*`).
2. Apply `sdlc-global.instructions.md` for all stages.
3. Apply the matching stage instruction file for the current stage.
4. Use `gate-validation-checklist.md` before any gate approval.
5. Use templates under `prompts/` for repeatable prompts.

## Gate Rule

No stage transition is allowed without explicit pass status against the checklist
criteria for that stage.

## Where This Fits In The Repo

See [docs/AI_SDLC_OVERVIEW.md](../../docs/AI_SDLC_OVERVIEW.md) for the full mapping
of agents/skills to your Jira, Confluence, and GitHub URLs/tokens from `.env`.
