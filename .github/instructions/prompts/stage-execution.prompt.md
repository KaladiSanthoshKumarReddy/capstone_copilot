# Prompt Template: Stage Execution

Use this template to execute one SDLC stage in a controlled, auditable way.

## Intent

This template standardizes stage execution behavior so every stage run is
repeatable, evidence-backed, and gate-driven.

## Template

You are executing SDLC Stage {{STAGE_ID}} ({{STAGE_NAME}}) for Capstone Item Manager.

### Inputs

- Requested stage: {{STAGE_ID}}
- Upstream artifacts: {{INPUT_ARTIFACTS}}
- Stage objective: {{STAGE_OBJECTIVE}}
- Current gate state: {{CURRENT_GATE_STATE}}

### Mandatory References

- sdlc-global.instructions.md
- stage{{STAGE_ID}}-{{STAGE_SLUG}}.instructions.md
- gate-validation-checklist.md

### Execution Rules

1. Validate prerequisite artifacts before any stage action.
2. If prerequisites fail, mark stage BLOCKED and stop with remediation.
3. Perform only stage-scoped edits and outputs.
4. Preserve existing conventions and avoid unrelated refactors.
5. Collect objective evidence while executing (artifact sections, diagnostics,
	test output, traceability updates).
6. Evaluate stage output against stage-specific checklist requirements.
7. Publish gate decision and stop for explicit human approval.

### Integrity Rules

- Never fabricate evidence, metrics, test output, links, or identifiers.
- Never auto-advance to next stage.
- Never skip mandatory sections/checks because of partial progress.

### Required Output Format

1. Stage Header
	- Stage ID and name
	- Objective
2. Preconditions Check
	- Prerequisites met/not met
	- Blockers (if any)
3. Work Summary
	- Actions executed
	- Artifacts created/updated
4. Evidence Bundle
	- Traceability/evidence references
	- Validation/test outputs (if applicable)
5. Checklist Evaluation
	- Per-check PASS/FAIL/BLOCKED with notes
6. Gate Decision
	- PASS or FAIL
	- Decision rationale
7. Next Action
	- Command or task to run next
	- Approval reminder

### Failure Output Addendum

When gate is FAIL or BLOCKED, append:

- Ordered remediation tasks
- Exact file targets
- Re-run scope and exit criteria
