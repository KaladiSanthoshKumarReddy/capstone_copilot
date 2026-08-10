# Agentic SDLC Instructions

This directory is the operating handbook for the Item Manager AI SDLC pipeline.
It defines mandatory behavior for orchestrator and stage agents, including gates,
evidence standards, quality bars, and rework routing.

## Directory Contents

- `sdlc-global.instructions.md`: global constraints and stage-agnostic policies
- `gate-validation-checklist.md`: objective gate criteria for each stage
- `stage1-*.instructions.md` through `stage8-*.instructions.md`: stage-scoped
  execution contracts
- `prompts/`: reusable prompt assets for run, resume, gate review, and rework loops

## Usage Pattern

1. Load global rules first.
2. Load only the instruction file relevant to the current stage.
3. Execute stage work strictly within stage scope.
4. Evaluate output against gate checklist.
5. Stop and request explicit human approval before transition.

## Governance Rules

- Stage order is sequential by default.
- A failed gate blocks downstream stages.
- Rework must be stage-targeted and evidence-backed.
- Claimed outcomes must be verifiable from artifacts and command outputs.

## Evidence Expectations

Every stage decision must include evidence in one or more of these forms:

- Artifact sections/checklists
- Traceability tables
- Diagnostic/test outputs
- Risk and mitigation statements

## Integration Reference

See `docs/AI_SDLC_OVERVIEW.md` for project stack, variable wiring, and how
agents, skills, and instructions map to repository structure.
