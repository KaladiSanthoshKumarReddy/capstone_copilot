---
description: >
  Stage 8 PR and reporting skill for Capstone Item Manager.
  Produces CHANGELOG.md and sdlc-report.html with traceable release evidence,
  then opens a pull request summarizing scope, validation, and residual risks.
  Trigger: "@sdlc-stage8-pr".
---

# Skill: Stage 8 - PR and Report Generation

## Objective

Package the full SDLC run into release-ready artifacts and publish a pull request
with transparent, verifiable evidence.

## Input

- All outputs from stages 1 through 7
- Branch state and commit history

## Output

- `CHANGELOG.md` update for current feature scope
- `sdlc-report.html` populated from template and real data
- Pull request opened against configured target branch

## Required Report Coverage

1. Feature summary and business context
2. Stage-by-stage status and gate outcomes
3. Implementation and review highlights
4. Verification summary with real metrics
5. Risks, mitigations, and follow-ups
6. Links/identifiers for PR and commits

## PR Quality Requirements

- Title and description summarize scope and risk
- Acceptance criteria coverage called out
- Test evidence and known limitations documented
- No placeholder or fabricated values

## Gate PASS Conditions

- Changelog and SDLC report are complete and accurate
- PR is created successfully or failure is explicitly evidenced
- Final artifacts align with actual execution history

## Gate FAIL Conditions

- Missing report sections or unverifiable claims
- PR creation failed without diagnostic evidence

## Completion Rule

Pipeline ends only when Stage 8 gate is PASS and evidence is complete.
