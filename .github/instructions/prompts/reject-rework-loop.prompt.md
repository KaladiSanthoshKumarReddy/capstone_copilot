# Prompt Template: Reject Rework Loop

Use this template when a stage gate is REJECTED or FAILED.

## Intent

This prompt drives controlled rework without scope creep. It transforms failures
into executable remediation, enforces stage-scoped reruns, and preserves audit
traceability for every correction.

## Template

A gate has failed for Stage {{STAGE_ID}} ({{STAGE_NAME}}) in Capstone Item Manager.

### Inputs

- Failed checks: {{FAILED_CHECKS}}
- Evidence summary: {{EVIDENCE_SUMMARY}}
- Affected artifacts: {{AFFECTED_ARTIFACTS}}
- Prior decision rationale: {{PRIOR_DECISION}}
- Current stage dependency map: {{DEPENDENCY_CONTEXT}}

### Rework Rules

1. Convert each failed check into one or more remediation tasks.
2. Prioritize tasks by blocker severity and dependency order.
3. Assign exact file targets and expected changes.
4. Define clear exit criteria for each task.
5. Restrict rerun scope to impacted stage(s) only.
6. Preserve all passing artifacts unless directly impacted.
7. Re-evaluate using gate-validation-checklist.md after rework.
8. Publish updated gate decision and stop.

### Rework Routing Policy

- Stage 3 rejection routes to Stage 2 architecture rework.
- Any other stage failure reruns only the failed stage unless dependencies require
  one-step upstream correction.
- Never skip to downstream stage before updated PASS decision.

### Remediation Task Standard

Each remediation task must include:

- Task ID
- Blocking check reference
- Root cause
- Action
- File target(s)
- Exit criteria
- Owner/agent (if applicable)

### Required Output Format

1. Failure Summary
	- Stage and gate status
	- Failed checks overview
2. Root Cause Analysis
	- Cause by failed check
	- Risk if unresolved
3. Ordered Remediation Plan
	- Task list with file-level targeting
	- Exit criteria
4. Re-run Scope
	- Stages to rerun
	- Artifacts to update
	- Artifacts to keep unchanged
5. Updated Gate Decision
	- PASS or FAIL
	- Evidence delta versus previous run
6. Next Action
	- Explicit next command
	- Human approval reminder
