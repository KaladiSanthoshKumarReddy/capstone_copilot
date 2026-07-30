# Verification Report — Add Item Tagging and Tag-Based Filtering

## Test Execution Summary (REAL, executed by user in local dev environment)

### Playwright E2E — `cd tests && npx playwright test items.spec.ts`

Run 1 (before closing coverage gaps):

```
Running 14 tests using 4 workers
14 passed (24.8s)
```

Run 2 (final, after adding AC-04/AC-07/AC-09 coverage):

```
Running 16 tests using 4 workers

  ✓   1 should show empty state when no items (1.8s)
  ✓   2 should toggle item status to completed (1.8s)
  ✓   3 should add a new item (1.8s)
  ✓   4 should delete an item (1.9s)
  ✓   5 should inline-edit item title (1.5s)
  ✓   6 should add an item with comma-separated tags and render tag pills (1.5s)
  ✓   7 should filter items by search term (1.7s)
  ✓   8 should filter items by status (1.3s)
  ✓   9 should reset page to 1 when search changes (1.3s)
  ✓  10 should filter items by tag and clear the filter (1.3s)
  ✓  11 should reject an item with more than 10 tags (1.3s)
  ✓  12 should exact-match tags (not substring) and compose tag filter with status filter (1.7s)
  ✓  13 pagination controls render when there are multiple pages (3.1s)
  ✓  14 clicking Archive button changes status badge to "archived" (2.7s)
  ✓  15 Archive button is hidden after item is archived (1.5s)
  ✓  16 archived item appears when filtering by Archived status (1.2s)

16 passed (20.9s)
```

**Result: 16/16 passed, 0 failed.**

### Frontend Unit Tests (Vitest) — `cd frontend && npm run test`

```
 ✓ src/api/__tests__/items.test.ts (12)
 ✓ src/components/__tests__/TagFilter.test.tsx (4)
 ✓ src/store/__tests__/authStore.test.ts (10)

 Test Files  3 passed (3)
      Tests  26 passed (26)
   Duration  2.39s
```

**Result: 26/26 passed, 0 failed.** (Benign `act(...)`/deprecation warnings from `react-dom/test-utils` on `TagFilter.test.tsx` — not test failures, no assertion errors.)

### Combined: **42/42 automated tests passed, 0 failures.**

### Cucumber

[items.feature](tests/features/items.feature) has new tagging scenarios added, but **no Cucumber test runner or step-definition files exist in `tests/`** (confirmed during Stage 4 planning — this is a pre-existing gap, not introduced by this feature). The feature file documents intended behavior but was not executed. Not a regression; out of scope to introduce a full Cucumber runner in this change.

## AC-to-Test Traceability Matrix

| AC | Description | Coverage | Test(s) |
|---|---|---|---|
| AC-01 | Create with tags normalized (trim/split) | ✅ Full | Playwright #6; [items.test.ts](frontend/src/api/__tests__/items.test.ts) `posts with tags when provided` |
| AC-02 | No tags → `null`, no error | ✅ Full | Playwright #3; `items.test.ts` `posts without description when omitted` |
| AC-03 | Edit existing tags, dedupe/case-normalize | ⚠️ Gap | No tag-edit UI exists (out of architecture scope — only creation has a tags input); backend `PATCH` tag-normalization logic is untested by an automated test |
| AC-04 | >10 tags → 400 | ✅ Full | Playwright #11 `should reject an item with more than 10 tags` |
| AC-05 | Tag >30 chars → 400 | ⚠️ Gap | Shares the same `tagsSchema` `.refine()` validation path as AC-04 but has no dedicated test case |
| AC-06 | `tag=work` returns only tagged items | ✅ Full | Playwright #10, #12 |
| AC-07 | Exact match — `homework` ≠ `work` | ✅ Full | Playwright #12 `should exact-match tags...` |
| AC-08 | Mixed-case input normalized then matched | ⚠️ Gap | No test enters mixed-case tags (e.g. `"Work"`) and filters by lowercase `work` |
| AC-09 | `tag` + `status` compose (AND) | ✅ Full | Playwright #12 (second half) |
| AC-10 | `tag` + `search` compose (AND) | ⚠️ Gap | Not exercised by an automated test |
| AC-11 | Tag filter scoped to `user_id` | ⚠️ Gap | No multi-user automated test; ownership `WHERE user_id = ?` clause verified by code review (Stage 6) but not by an executed test |
| AC-12 | Selecting a tag updates URL + reloads list | ✅ Full | Playwright #10 |
| AC-13 | Clearing tag filter removes URL param | ✅ Full | Playwright #10 |
| AC-14 | Tag + other filters compose, page resets to 1 | 🟡 Partial | Composition covered (Playwright #12); explicit page-reset-to-1 assertion combined with an active tag filter not separately tested |
| AC-15 | Tag pills render distinctly | ✅ Full | Playwright #6 |
| AC-16 | Cross-user `PATCH` tags → 404 | ⚠️ Gap | No automated test; ownership scoping verified by code review only |
| AC-17 | Legacy items (no tags) load without error | ⚠️ Gap | No test seeds a pre-migration row; migration additivity/nullability verified by code review (Stage 6), not by an executed test |

**Coverage**: 9/17 ACs fully covered by executed, passing tests · 1/17 partially covered · 7/17 have no automated test (documented gaps, not defects — nothing failed, these paths simply weren't exercised).

## Defects Found

**None.** All 42 executed tests passed with 0 failures across both runs.

## Recommendation

Core feature behavior (tag creation, normalization on the happy path, exact-match filtering, filter composition with `status`, URL wiring, validation ceiling, UI rendering) is verified with real, passing, executed tests. The 7 documented gaps above are edge cases (mixed-case-only assertion, tag+search-only composition, cross-user isolation, legacy-row backward compatibility, tag editing) that are architecturally sound per the Stage 6 code review but lack dedicated automated tests. Recommend either:
1. Proceeding to Stage 8 with these gaps tracked as known follow-up test debt, or
2. Adding the remaining test cases in a follow-up iteration before release sign-off.

This report reflects only real, executed results — no results were fabricated or estimated.
