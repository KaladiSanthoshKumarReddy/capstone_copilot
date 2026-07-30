# Implementation Plan — Add Item Tagging and Tag-Based Filtering

## Source Artifacts

- Requirements: [requirements.md](requirements.md) — 14 FRs, 17 ACs
- Architecture: [architecture.md](architecture.md) — APPROVED
- Design Review: [design-review.md](design-review.md) — Verdict: **APPROVED**

## Task List

### Backend

---

**TASK-01 — Add `tags` column migration**
- **Description**: Add an additive migration guard immediately after the existing `updated_at` migration block, reusing the already-queried `cols` (`PRAGMA table_info(items)`) result to check for and add a nullable `tags TEXT` column.
- **File target(s)**: [backend/src/db/init.ts](backend/src/db/init.ts)
- **Depends on**: —
- **Success criterion**: Starting the backend against an existing DB with no `tags` column logs `Migration: added tags column to items` exactly once and does not error on repeated runs (idempotent); a fresh DB also ends up with the column present (FR-01, AC-17).

---

**TASK-02 — Add `tagsSchema` and `normalizeTags()` helper**
- **Description**: Add a `tagsSchema` zod schema (split on comma, trim, filter empty, refine ≤10 tags and each ≤30 chars, optional) and wire it into both `createSchema` and `patchSchema`. Add the `normalizeTags(tags?: string[]): string | null` helper (lowercase, dedupe, join with comma, `null` when empty).
- **File target(s)**: [backend/src/routes/items.ts](backend/src/routes/items.ts)
- **Depends on**: TASK-01
- **Success criterion**: `tagsSchema.safeParse('work, urgent')` yields `['work', 'urgent']`; a value with 11 tags or any tag >30 chars fails `.safeParse`; `normalizeTags(['work','Urgent',' URGENT '])` returns `'work,urgent'`; `normalizeTags(undefined)` and `normalizeTags([])` both return `null` (FR-04, FR-05, AC-03, AC-04, AC-05).

---

**TASK-03 — `POST /api/items` persists normalized tags**
- **Description**: Update the insert statement to include `tags`, calling `normalizeTags(parsed.data.tags)` before storing.
- **File target(s)**: [backend/src/routes/items.ts](backend/src/routes/items.ts)
- **Depends on**: TASK-02
- **Success criterion**: `POST /api/items` with `{ title, tags: "work, urgent" }` returns `201` and the created row's `tags` is `"work,urgent"`; omitting `tags` creates an item with `tags: null` and no error (FR-02, AC-01, AC-02).

---

**TASK-04 — `PATCH /api/items/:id` accepts and updates tags**
- **Description**: Extend the "nothing to update" guard to also check `parsed.data.tags === undefined`; add a conditional `setClauses.push('tags = ?')` branch that calls `normalizeTags(parsed.data.tags)`. Ownership `WHERE id = ? AND user_id = ?` remains unchanged.
- **File target(s)**: [backend/src/routes/items.ts](backend/src/routes/items.ts)
- **Depends on**: TASK-02, TASK-03
- **Success criterion**: `PATCH /api/items/:id` with `{ tags: "work, Urgent , URGENT" }` on an owned item returns the updated item with `tags: "work,urgent"`; the same call against another user's item returns `404` and leaves that item's tags unchanged (FR-03, AC-03, AC-16).

---

**TASK-05 — `GET /api/items` tag query filter**
- **Description**: Parse `req.query.tag` (trim, lowercase), and when present push `"(',' || tags || ',') LIKE ?"` onto `whereClauses` with `args.push('%,' + tag + ',%')`, folded into the existing `whereClauses`/`args` pattern alongside `search`/`status`, after the existing `user_id` clause.
- **File target(s)**: [backend/src/routes/items.ts](backend/src/routes/items.ts)
- **Depends on**: TASK-03, TASK-04
- **Success criterion**: `GET /api/items?tag=work` returns only items whose normalized tags contain the exact segment `work` (not `homework`); combining `tag` with `status` and/or `search` narrows results with `AND` semantics; results remain scoped to `user_id`; items with `tags IS NULL` are excluded without error (FR-06, FR-07, AC-06–AC-11, AC-17).

---

### Frontend

---

**TASK-06 — Add `tags` field to `Item` type**
- **Description**: Add `tags: string | null` to the `Item` interface.
- **File target(s)**: [frontend/src/types/index.ts](frontend/src/types/index.ts)
- **Depends on**: TASK-05
- **Success criterion**: `Item` compiles with `tags: string | null`; no existing consumer of `Item` breaks type-checking (FR-08).

---

**TASK-07 — Extend frontend API client for tags**
- **Description**: Add `tag?: string` to `FetchParams`; add an optional `tags?: string` parameter to `createItem`, forwarded in the POST body; widen `updateItem`'s patch type to `Partial<Pick<Item, 'title' | 'description' | 'status' | 'tags'>>`.
- **File target(s)**: [frontend/src/api/items.ts](frontend/src/api/items.ts)
- **Depends on**: TASK-06
- **Success criterion**: `fetchItems({ tag: 'work' })` sends `tag=work` as a query param; `createItem(title, description, tags)` posts a body containing `tags`; `updateItem(id, { tags: 'work,urgent' })` type-checks and PATCHes `{ tags: 'work,urgent' }` (FR-11).

---

**TASK-08 — New `TagFilter.tsx` component**
- **Description**: Create a new component mirroring `StatusFilter.tsx`'s shape (native `<select>`), accepting `{ value: string; options: string[]; onChange: (v: string) => void }` props, with a leading `<option value="">All Tags</option>` and one `<option>` per supplied tag, `data-testid="tag-filter"`.
- **File target(s)**: `frontend/src/components/TagFilter.tsx` (new)
- **Depends on**: TASK-06
- **Success criterion**: Selecting an option calls `onChange` with that tag's value; selecting "All Tags" calls `onChange('')`; component is keyboard-operable via native `<select>` semantics (FR-10, FR-13).

---

**TASK-09 — `ItemForm.tsx` tags input**
- **Description**: Add a third `data-testid="item-tags-input"` text input (placeholder `"Tags (comma-separated, optional)"`) with its own local state; widen the `onAdd` prop type to `(title: string, description: string, tags: string) => Promise<void>`; pass `tags.trim()` on submit and reset the field alongside `title`/`desc` on success.
- **File target(s)**: [frontend/src/components/ItemForm.tsx](frontend/src/components/ItemForm.tsx)
- **Depends on**: TASK-06
- **Success criterion**: Typing into the tags input and submitting calls `onAdd(title, description, tags)`; on success all three fields (including tags) reset to empty; existing title-required validation is unchanged (FR-09, AC-01).

---

**TASK-10 — `ItemCard.tsx` tag pills**
- **Description**: Below the existing description/date block, conditionally render `item.tags` split on comma (filtering empty segments) as `<span>` pills with `data-testid="item-tag-{item.id}-{tag}"`, visually distinct (separate color/rounding) from the existing status badge.
- **File target(s)**: [frontend/src/components/ItemCard.tsx](frontend/src/components/ItemCard.tsx)
- **Depends on**: TASK-06
- **Success criterion**: An item with `tags: "work,urgent"` renders two distinct visible pill elements with the expected `data-testid`s; an item with `tags: null` renders no pill container (FR-12, AC-15).

---

**TASK-11 — Wire tagging and tag filter into `Dashboard.tsx`**
- **Description**: Read `tag` from `useSearchParams()`; pass `tag: tag || undefined` into `fetchItems` in `loadItems` (and add `tag` to its dependency array); derive `tagOptions` from currently loaded `items` (`flatMap` on `tags`, split/filter/dedupe/sort); render `<TagFilter>` in the filters row next to `StatusFilter`, wired to `updateParams({ tag: v, page: '' })`; widen `handleAdd` to accept and forward `tags` to `createItem`.
- **File target(s)**: [frontend/src/pages/Dashboard.tsx](frontend/src/pages/Dashboard.tsx)
- **Depends on**: TASK-07, TASK-08, TASK-09, TASK-10
- **Success criterion**: Selecting a tag in `TagFilter` sets `?tag=...` in the URL and reloads the filtered list; selecting "All Tags" removes the `tag` param and restores the search/status-filtered list; changing `tag` together with `search`/`status` composes correctly and resets to page 1 (FR-10, FR-13, AC-12, AC-13, AC-14).

---

### Tests

---

**TASK-12 — Update frontend API client unit tests for tags**
- **Description**: Extend the existing `createItem`/`updateItem` test suites with cases asserting `tags` is forwarded on create (including omitted-tags case) and that `updateItem` sends a `tags` patch correctly.
- **File target(s)**: [frontend/src/api/__tests__/items.test.ts](frontend/src/api/__tests__/items.test.ts)
- **Depends on**: TASK-07
- **Success criterion**: `npm run test` (Vitest) in `frontend/` passes, including new assertions that `client.post`/`client.patch` are called with a `tags` field in the expected shape.

---

**TASK-13 — New unit test for `TagFilter.tsx`**
- **Description**: Add a component test verifying default "All Tags" option renders, supplied `options` render as `<option>`s, and selecting a value/clearing calls `onChange` with the expected string.
- **File target(s)**: `frontend/src/components/__tests__/TagFilter.test.tsx` (new)
- **Depends on**: TASK-08
- **Success criterion**: `npm run test` (Vitest) in `frontend/` passes the new `TagFilter` test file with no failures.

---

**TASK-14 — Update `DashboardPage` Playwright page object**
- **Description**: Add `itemTagsInput` (`item-tags-input`) and `tagFilter` (`tag-filter`) `Locator` properties, following the existing constructor pattern.
- **File target(s)**: [tests/e2e/pages/DashboardPage.ts](tests/e2e/pages/DashboardPage.ts)
- **Depends on**: TASK-09, TASK-08
- **Success criterion**: `DashboardPage` exposes `itemTagsInput` and `tagFilter` locators usable by spec files without additional selector strings.

---

**TASK-15 — Add tagging/filtering Playwright scenarios**
- **Description**: Add specs under `Item Management` for adding an item with comma-separated tags and seeing tag pills render, and under `Search and Filter` for selecting a tag in `TagFilter` (URL gains `?tag=...`) and clearing it back to "All Tags" (URL param removed).
- **File target(s)**: [tests/e2e/specs/items.spec.ts](tests/e2e/specs/items.spec.ts)
- **Depends on**: TASK-11, TASK-14
- **Success criterion**: `npx playwright test items.spec.ts` passes locally against the running app, including the new tag-add and tag-filter scenarios (AC-01, AC-12, AC-13, AC-15).

---

**TASK-16 — Extend Cucumber feature file with tagging scenarios**
- **Description**: Add `Scenario` entries to the existing `Item Management` feature for creating an item with tags and filtering the list by tag, following the existing Given/When/Then step phrasing style already used in the file.
- **File target(s)**: [tests/features/items.feature](tests/features/items.feature)
- **Depends on**: TASK-11
- **Success criterion**: `items.feature` contains new scenarios covering tag creation and tag filtering, phrased consistently with existing steps (step-definition implementation, if introduced, is out of scope for this plan — no Cucumber runner/step-defs currently exist in `tests/`).

---

### Docs

---

**TASK-17 — Draft CHANGELOG entry content for this feature**
- **Description**: Prepare a concise, factual summary (feature name, affected endpoints/components, migration note) of this change for Stage 8 to incorporate into `CHANGELOG.md`; do not create/modify `CHANGELOG.md` in Stage 5 (per Artifact Contract, `CHANGELOG.md` is a Stage 8 output).
- **File target(s)**: `CHANGELOG.md` (Stage 8 hand-off — not written in Stage 5)
- **Depends on**: TASK-01–TASK-16
- **Success criterion**: A short, accurate change summary (referencing the `tags` migration, `/api/items` contract changes, and new `TagFilter` component) is available for Stage 8 to consume verbatim.

---

## Ordering Rationale

Backend tasks (TASK-01–05) establish the schema, validation, and API contract first since all frontend and test tasks depend on them. Frontend tasks (TASK-06–11) build bottom-up: shared types → API client → new/changed leaf components → `Dashboard.tsx` wiring, which depends on all preceding frontend tasks. Test tasks (TASK-12–16) follow their respective implementation targets. TASK-17 is a documentation hand-off dependent on the full task set.

## Gate Message

```
✅ STAGE 4 COMPLETE — Implementation Plan
📄 Artifact: impl-plan.md
📊 17 tasks, ordered with file targets and success criteria
🎯 Next: @sdlc-stage5-implementation
⏸️  GATE: Review impl-plan.md to proceed
```
