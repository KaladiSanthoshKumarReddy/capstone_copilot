---
description: >
  Stage 1 requirements skill for Capstone Item Manager.
  Consumes user-story.md or approved Jira/Confluence sources and produces
  requirements.md with FR/AC, scope boundaries, NFRs, dependencies, and
  traceability starter mappings.
  Trigger: "@sdlc-stage1-requirements".
---

# Skill: Stage 1 - Requirements Analysis

## Objective

Transform business intent into complete, testable, and implementation-ready
requirements for the Item Manager feature scope.

## Accepted Sources

- Local `user-story.md` (preferred)
- Jira issue via `.env` values (`JIRA_BASE_URL`, `JIRA_PROJECT_KEY`)
- Confluence page via `.env` values (`CONFLUENCE_BASE_URL`, `CONFLUENCE_SPACE_KEY`)

## Required Output

- `requirements.md` at repository root

## Mandatory Sections in requirements.md

1. Source of truth and retrieval method
2. Problem statement and business objective
3. Scope and out-of-scope boundaries
4. Functional requirements (`FR-01...`)
5. Acceptance criteria (`AC-01...`) in Given/When/Then format
6. Non-functional requirements
7. Data and domain constraints
8. Security and compliance expectations
9. Assumptions, dependencies, and open questions
10. Traceability starter table for downstream stages

## Quality Bar

- At least 10 functional requirements
- At least 15 acceptance criteria
- Every AC must be measurable and testable
- No contradictory or duplicate requirements

## Execution Steps

1. Gather source material.
2. Normalize terminology to existing Item Manager domain language.
3. Extract candidate requirements and remove ambiguity.
4. Separate must-have from nice-to-have content.
5. Draft `requirements.md` with required sections.
6. Perform self-consistency and testability review.
7. Produce gate recommendation and await approval.

## Gate PASS Conditions

- Artifact exists and includes all required sections.
- FR and AC minimum counts achieved.
- ACs are test-ready and mapped to user value.

## Gate FAIL Conditions

- Missing source clarity.
- Non-testable ACs.
- Insufficient FR/AC volume.
- Major ambiguity likely to cause rework.

## Downstream Contract

Stage 2 architecture must consume this artifact directly and maintain traceability.
