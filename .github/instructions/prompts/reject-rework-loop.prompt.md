# Prompt Template: Reject Rework Loop

Use this template when design review or gate decision is REJECT.

## Template

A gate has failed for Stage {{STAGE_ID}} in the Capstone Item Manager.

Inputs:
- Failed checks: {{FAILED_CHECKS}}
- Evidence: {{EVIDENCE_SUMMARY}}

Instructions:
1. Convert failed checks into prioritized remediation tasks.
2. Map each task to exact file targets.
3. Re-run only the impacted stage(s).
4. Re-evaluate against `gate-validation-checklist.md`.
5. Stop and publish updated gate decision.

Required output format:
- Root cause summary
- Remediation plan (ordered)
- Re-run scope
- Updated gate decision
