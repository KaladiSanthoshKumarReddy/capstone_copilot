---
description: Stage 1 operating instructions — Requirements Analysis.
applyTo: "requirements.md"
---

# Stage 1 — Requirements Analysis

## Input

`user-story.md` (preferred, local) OR a Jira issue under `JIRA_PROJECT_KEY` at
`JIRA_BASE_URL`, OR a Confluence page under `CONFLUENCE_SPACE_KEY` at
`CONFLUENCE_BASE_URL` (all read from `.env` — never hardcode).

## Output

`requirements.md` at workspace root.

## Required Sections

1. **Source** — cite exactly where the requirement came from.
2. **Scope** — one paragraph, plus explicit out-of-scope bullet list.
3. **Functional Requirements** — FR-01 .. FR-N, each a single testable statement.
4. **Acceptance Criteria** — AC-01 .. AC-M, Given/When/Then style, each measurable.
5. **Non-Functional Requirements** — auth, validation, performance, accessibility.
6. **Assumptions & Constraints**.

## Minimums (see gate-validation-checklist.md)

≥10 FRs, ≥15 ACs.

## Do / Don't

- ✅ Reuse existing domain language (Item, Dashboard, status/search/pagination).
- ✅ Note if the request extends `frontend/src/types/index.ts` types.
- ❌ Don't invent Jira/Confluence content if a fetch fails — ask the user.
