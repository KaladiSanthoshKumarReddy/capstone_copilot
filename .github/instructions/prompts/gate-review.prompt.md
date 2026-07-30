# Prompt Template: Gate Review

Use this template for objective pass/fail gate decisions.

## Template

Review Stage {{STAGE_ID}} output for the Capstone Item Manager.

Inputs:
- Artifact(s): {{ARTIFACT_LIST}}
- Checklist source: `gate-validation-checklist.md`

Instructions:
1. Evaluate each required check for Stage {{STAGE_ID}}.
2. Mark each check PASS, FAIL, or BLOCKED.
3. Provide evidence reference for every check.
4. Output final gate decision.
5. If FAIL or BLOCKED, provide mandatory remediation tasks with file targets.

Required output format:
- Check results table
- Evidence notes
- Final decision: PASS or FAIL
- Remediation tasks (if not PASS)
