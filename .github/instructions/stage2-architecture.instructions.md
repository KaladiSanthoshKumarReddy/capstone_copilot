---
description: Stage 2 operating instructions - Architecture Design.
applyTo: "architecture.md"
---

# Stage 2 - Architecture Design Instructions

## Goal

Create a realistic architecture that can be implemented with minimal rework in
current Item Manager stack and conventions.

## Inputs

- `requirements.md`
- Existing codebase structure
- Prior review feedback (if in rework cycle)

## Output

- `architecture.md`

## Required Structure

1. Current-state baseline
2. Requirement coverage matrix
3. Backend impact and endpoint contracts
4. Frontend impact and data/state flow
5. Data model/schema changes
6. Validation and error-handling strategy
7. Security and authorization model
8. ADRs with alternatives and trade-offs
9. Risk and rollout considerations

## Design Rules

- Prefer extending existing patterns over introducing parallel frameworks.
- Keep contract shapes consistent with existing API conventions.
- Document all behavior-affecting assumptions.
- Explicitly call out data migration risks.

## Quality Gate Requirements

- Minimum 80 percent FR traceability
- No undefined critical contract behavior
- Security controls are explicit for all touched surfaces

## Failure Conditions

Fail gate when traceability is weak, contracts are incomplete, or risk handling
is inadequate.
