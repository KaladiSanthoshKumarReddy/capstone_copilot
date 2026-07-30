# Prompt Template: Stage Execution

Use this template to run a single SDLC stage.

## Template

You are executing SDLC Stage {{STAGE_ID}} ({{STAGE_NAME}}) for the Capstone Item Manager.

Inputs:
- {{INPUT_ARTIFACTS}}

Instructions:
1. Follow `sdlc-global.instructions.md` and `stage{{STAGE_ID}}-{{STAGE_SLUG}}.instructions.md`.
2. Produce or update only the required stage artifacts.
3. Keep changes minimal and stage-scoped.
4. Validate stage output using `gate-validation-checklist.md` for Stage {{STAGE_ID}}.
5. Output gate decision with evidence and stop.

Required output format:
- Stage summary
- Artifact changes
- Checklist result (PASS/FAIL per check)
- Gate decision
- Next action
