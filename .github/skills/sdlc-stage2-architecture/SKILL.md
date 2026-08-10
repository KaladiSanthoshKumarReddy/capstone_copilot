---
description: >
  Stage 2 skill - Architecture Design for Capstone Item Manager. Reads
  requirements.md and writes architecture.md (components, schema diff, ADRs).
  Trigger: "@sdlc-stage2-architecture".
---

# Skill: Stage 2 - Architecture Design

## Objective

Convert approved requirements into an implementation-ready architecture aligned
with the current React + Express + SQLite system.

## Input

- `requirements.md` (required)
- Prior `design-review.md` feedback (when in rework mode)

## Required Output

- `architecture.md` at repository root

## Required Architecture Sections

1. Requirement-to-design traceability matrix
2. Existing architecture baseline
3. Impacted backend modules and route contracts
4. Impacted frontend modules (api, store, pages, components)
5. SQLite schema changes and migration notes
6. API request/response contract details
7. Validation and error-handling strategy
8. Security controls by surface area
9. Operational and performance considerations
10. ADRs and trade-off rationale

## Execution Steps

1. Parse each FR and AC from Stage 1.
2. Map each requirement to one or more architecture elements.
3. Produce data model and API contract deltas.
4. Validate design consistency with existing patterns.
5. Document alternatives and rejected choices.
6. Confirm testability hooks for Stage 7.
7. Generate gate evidence and stop for approval.

## Gate PASS Conditions

- At least 80 percent of FRs are explicitly mapped.
- No critical architecture gaps for required ACs.
- Data model and API contract are implementation-ready.
- Security and validation paths are documented.

## Gate FAIL Conditions

- Traceability gaps for key requirements.
- Undefined API or schema behavior.
- Missing security boundary definitions.

## Downstream Contract

Stage 4 planning and Stage 5 implementation must be directly traceable to this
architecture without introducing parallel patterns.
