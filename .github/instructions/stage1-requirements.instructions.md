---
description: Stage 1 requirements instruction contract. Defines quality bars for requirements.md, FR/AC completeness, traceability seed expectations, and gate pass/fail evidence.
applyTo: "requirements.md"
---

# Stage 1 - Requirements Analysis Instructions

## Goal

Produce high-quality, testable requirements from approved business input.

## Inputs

- `user-story.md` (preferred)
- Jira/Confluence source if configured and accessible

## Output

- `requirements.md`

## Required Structure

1. Source and context
2. Business objective
3. In-scope items
4. Out-of-scope items
5. Functional requirements (`FR-xx`)
6. Acceptance criteria (`AC-xx`) in Given/When/Then
7. Non-functional requirements
8. Assumptions, dependencies, constraints
9. Open questions
10. Initial traceability table

## Authoring Rules

- Use clear, atomic, testable statements.
- Avoid implementation-level details unless required constraints.
- Keep requirement IDs stable and unique.
- Ensure each AC has measurable expected behavior.

## Quality Gate Requirements

- Minimum FR count: 10
- Minimum AC count: 15
- No unresolved contradictions in scope definitions

## Failure Conditions

Fail gate if requirements are incomplete, ambiguous, or non-testable.
