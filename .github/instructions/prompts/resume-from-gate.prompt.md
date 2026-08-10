# Prompt Template: Resume From Gate

Use this template to continue the AI SDLC pipeline after interruption,
session reset, or handoff.

## Intent

This prompt reconstructs true pipeline state from artifacts and gate rules.
Workspace artifacts are treated as source of truth over memory when conflicts
exist.

## Template

Resume Capstone Item Manager SDLC from current state.

### Resume Rules

1. Detect artifact presence for all stages (1 through 8).
2. Validate each detected artifact against stage-specific quality checks.
3. Determine last stage with evidence-backed PASS status.
4. Determine current gate status: APPROVED, PENDING, FAIL, or BLOCKED.
5. If gate is PENDING or FAIL, do not advance; recommend corrective action.
6. If Stage 3 verdict is REJECTED, route to Stage 2 architecture rework.
7. If artifacts and memory conflict, trust artifact evidence and report mismatch.
8. Provide exact next command and stop for user approval.

### Artifact Detection Matrix

Check at minimum:

- Stage 1: requirements.md
- Stage 2: architecture.md
- Stage 3: design-review.md
- Stage 4: impl-plan.md
- Stage 5: backend/src and frontend/src stage changes
- Stage 6: review findings + safe fix evidence
- Stage 7: tests artifacts + verification-report.md
- Stage 8: CHANGELOG.md + sdlc-report.html + PR evidence

### Required Output Format

1. Artifact Detection Summary
	- Stage-by-stage presence status
	- Missing/invalid artifacts
2. Gate Reconstruction
	- Last completed stage
	- Current gate status and rationale
3. Conflict Notes
	- Memory vs artifact mismatches (if any)
4. Next Action
	- Recommended stage to run
	- Exact command
	- Explicit approval reminder

### Blocking Rules

- Do not infer stage completion from partial artifacts.
- Do not advance on ambiguous gate evidence.
- Do not bypass required rework loop.
