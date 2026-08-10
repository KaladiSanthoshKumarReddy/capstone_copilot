# Prompt Template: Gate Review

Use this template for objective, evidence-backed stage gate evaluation.

## Intent

This prompt enforces deterministic gate decisions for the Item Manager AI SDLC.
It standardizes how PASS and FAIL are determined, ensuring no stage advances
without clear evidence and explicit human approval.

## Template

Review Stage {{STAGE_ID}} output for Capstone Item Manager.

### Inputs

- Stage: {{STAGE_ID}} - {{STAGE_NAME}}
- Artifact(s): {{ARTIFACT_LIST}}
- Stage summary from execution: {{STAGE_SUMMARY}}
- Checklist source: gate-validation-checklist.md
- Applicable stage instruction: stage{{STAGE_ID}}-{{STAGE_SLUG}}.instructions.md

### Evaluation Rules

1. Evaluate every mandatory check for Stage {{STAGE_ID}}.
2. For each check, mark one status only: PASS, FAIL, or BLOCKED.
3. Attach evidence for every check. Evidence must be artifact- or output-based.
4. If evidence is missing or ambiguous, mark FAIL (do not infer PASS).
5. If prerequisite artifacts are missing, mark affected checks BLOCKED.
6. Determine overall gate decision using strict policy:
	- PASS only when all mandatory checks are PASS
	- FAIL when any mandatory check is FAIL or BLOCKED
7. If gate is FAIL, include remediation tasks with exact file targets.
8. Stop after publishing decision and wait for explicit user approval.

### Evidence Requirements

- Evidence must point to concrete artifacts, sections, command outputs, or test logs.
- Do not use assumptions such as "likely covered" or "implicitly handled".
- Never fabricate metrics, pass counts, durations, URLs, IDs, or defects.

### Required Output Format

1. Stage Context
	- Stage ID and name
	- Artifacts reviewed
2. Gate Checklist Results (table)
	- Check ID
	- Requirement
	- Status (PASS/FAIL/BLOCKED)
	- Evidence
	- Notes
3. Overall Decision
	- Final Decision: PASS or FAIL
	- Rationale summary
4. Remediation Plan (only if FAIL)
	- Ordered tasks
	- File targets
	- Exit criteria per task
5. Next Action
	- Explicit command or instruction
	- Human approval reminder

### Example Decision Policy

- If one mandatory check has missing evidence, final decision is FAIL.
- If all mandatory checks have objective PASS evidence, final decision is PASS.
