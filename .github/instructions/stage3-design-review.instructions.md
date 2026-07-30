---
description: Stage 3 operating instructions — Design Review.
applyTo: "design-review.md"
---

# Stage 3 — Design Review

## Input

`architecture.md` (required), `requirements.md` (for traceability check).

## Output

`design-review.md` at workspace root, with an explicit verdict.

## Required Sections

1. **Verdict** — first line must read `Verdict: APPROVED` or `Verdict: REJECTED`.
2. **Traceability Check** — table mapping each FR to an architecture element.
3. **Security Review** — auth, input validation, SQL parameterization, secrets handling.
4. **Risk Assessment** — likelihood/impact for top risks.
5. **Rework Actions** (only if REJECTED) — file-level, actionable items.

## Do / Don't

- ✅ Reject if any FR has no architecture coverage.
- ✅ Reject if a new endpoint lacks auth/validation coverage in the design.
- ❌ Don't approve with unresolved Critical security concerns.
