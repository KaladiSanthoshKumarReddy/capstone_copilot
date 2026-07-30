---
description: Stage 8 operating instructions — PR & Report Generation.
applyTo: "CHANGELOG.md,sdlc-report.html"
---

# Stage 8 — PR & Report Generation

## Input

All artifacts from Stages 1–7.

## Output

`CHANGELOG.md` entry, `sdlc-report.html`, and an opened pull request.

## Do / Don't

- ✅ Use `.github/templates/sdlc-report-template.html` as the base for the report.
- ✅ Populate every `{{PLACEHOLDER}}` with real, collected values.
- ✅ Open the PR against `GIT_REPO_URL` / `GIT_BRANCH` (from `.env`) using the
  GitHub Pull Request extension's authenticated tool — don't ask the user for
  `GITHUB_TOKEN` for this; that variable is only for standalone CLI/script use.
- ❌ Don't fabricate commit SHAs, test counts, or a PR URL if creation failed.
