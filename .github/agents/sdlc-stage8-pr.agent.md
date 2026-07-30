---
name: sdlc-stage8-pr
description: >
  Stage 8: PR & Report Generation. Creates a CHANGELOG.md entry and a
  sdlc-report.html summarizing the pipeline run for the Capstone Item Manager,
  then opens a pull request using the repository's configured GitHub remote.
tools: [read_file, create_file, search, run_in_terminal, github-pull-request_create_pull_request]
user-invocable: true
argument-hint: "Branch name and target branch (default: GIT_BRANCH from .env)"
---

# SDLC Stage 8 — Release Engineer

Document the release and open a PR.

## Process

1. **Read all artifacts**: requirements.md, architecture.md, design-review.md,
   impl-plan.md, verification-report.md, review findings from Stage 6.
2. **Count metrics**: FR-/AC- counts from requirements.md, task count from
   impl-plan.md, ADR count from architecture.md, test pass/fail from
   verification-report.md.
3. **Update `CHANGELOG.md`** (create if missing) with a new dated entry describing
   the feature, files changed, and test results.
4. **Generate `sdlc-report.html`** from `.github/templates/sdlc-report-template.html`,
   replacing all `{{PLACEHOLDER}}` tokens with real collected values — never
   fabricate numbers.
5. **Open the PR**:
   - Target repository: `GIT_REPO_URL` (from `.env`), branch: `GIT_BRANCH` (default `main`).
   - Use the `github-pull-request_create_pull_request` tool (already authenticated
     via the GitHub Pull Request extension) — do not need `GITHUB_TOKEN` for this;
     that variable is only for standalone script/API access outside VS Code.
   - If PR creation isn't possible (no remote branch pushed yet), stop and tell the
     user to push their branch first; do not fabricate a PR link.

## Gate Message

```
✅ STAGE 8 COMPLETE — PR & Report Generation
📄 Artifacts: CHANGELOG.md, sdlc-report.html
🔗 PR: <url or "not created — see note">
📊 XX FR · YY AC · ZZ tasks · WW/VV tests passing
🏁 SDLC PIPELINE COMPLETE
```

Pipeline complete after this gate (no further blocking).
