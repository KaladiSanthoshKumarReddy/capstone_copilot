---
description: Stage 8 release instruction contract. Defines changelog/report quality, traceable release summary, and pull-request readiness evidence for final handoff.
applyTo: "CHANGELOG.md,sdlc-report.html"
---

# Stage 8 - PR and Report Generation Instructions

## Goal

Finalize release artifacts and create a pull request that accurately reflects
scope, quality, and verification evidence.

## Inputs

- All stage artifacts from 1 to 7
- Current branch and change history

## Outputs

- Updated `CHANGELOG.md`
- Updated `sdlc-report.html`
- Pull request with full summary and evidence

## Required CHANGELOG Content

- Feature summary
- Key backend/frontend changes
- Verification highlights
- Known limitations or deferred work

## Required SDLC Report Content

1. Stage status timeline
2. Gate decisions with evidence
3. Implementation and review summary
4. Verification metrics and defect summary
5. Risk/mitigation and follow-up actions

## PR Quality Requirements

- Clear title and scope description
- Links to artifacts and test evidence
- Risk/rollback notes when needed
- No placeholder/fabricated values

## Quality Gate Requirements

- Changelog/report complete and accurate
- PR creation evidence present
- Stage outputs are internally consistent

## Failure Conditions

Fail gate if artifacts are incomplete, contradictory, or unverifiable.
