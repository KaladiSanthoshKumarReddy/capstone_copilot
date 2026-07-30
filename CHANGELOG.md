# Changelog

All notable changes to the Capstone Item Manager are documented in this file.

## [Unreleased]

### Added — Item Tagging and Tag-Based Filtering

- Items can now be tagged with one or more free-text, comma-separated tags at
  creation time via a new "Tags" input in the Add Item form.
- The Dashboard now includes a **Tag Filter** dropdown (`TagFilter.tsx`) that
  narrows the item list to a single selected tag, composable with the existing
  search and status filters (`AND` semantics).
- Tags render as distinct purple pills on each item card, alongside the
  existing status badge.
- Backend: `items` table gains a nullable `tags TEXT` column via an additive,
  backward-compatible migration (`backend/src/db/init.ts`).
- Backend: `POST /api/items` and `PATCH /api/items/:id` accept an optional
  `tags` field, validated with a `zod` schema (max 10 tags per item, max 30
  characters per tag) and normalized (trimmed, lowercased, deduplicated)
  before storage.
- Backend: `GET /api/items` accepts an optional `tag` query parameter that
  performs an exact-match filter (not a substring match) against the stored
  tag list, using a parameterized, wildcard-escaped `LIKE` clause.

### Security

- Tag filter query values are escaped against SQL `LIKE` wildcard characters
  (`%`, `_`) to preserve exact-match filtering guarantees and prevent
  unintended pattern matching (found and fixed during Stage 6 code review).

### Testing

- Added Playwright E2E coverage: tag creation and pill rendering, tag-filter
  URL wiring and clearing, tag-count validation (>10 tags rejected), and
  exact-match + status-filter composition.
- Added Vitest unit coverage: `TagFilter` component behavior, and `tags`
  forwarding in the `createItem`/`updateItem` API client functions.
- Added new Cucumber scenarios to `tests/features/items.feature` for tag
  creation and tag filtering (documentation only — no Cucumber runner exists
  in this repository yet).

### Known Gaps (tracked as follow-up test debt)

- No automated test yet for: tag editing via PATCH, per-tag length validation
  (>30 chars), mixed-case tag normalization end-to-end, tag+search filter
  composition, cross-user tag isolation, and legacy (pre-migration) row
  backward compatibility. See `verification-report.md` for the full
  AC-to-test traceability matrix.

### Artifacts

`requirements.md` · `architecture.md` · `design-review.md` (APPROVED) ·
`impl-plan.md` · `verification-report.md`
