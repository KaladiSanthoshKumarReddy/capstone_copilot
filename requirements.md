# Requirements — Add Item Tagging and Tag-Based Filtering

## Source

- **Origin**: `user-story.md` (workspace root), section "Add item tagging and tag-based filtering".
- **Story**: As a registered user managing my items, I want to add one or more tags to
  an item and filter my item list by tag, so that I can organize and quickly find
  related items.
- **Notes carried over from source**: tags are free-text and comma-separated on the
  item form; tag filtering must work alongside existing search/status filters (not
  replace them); no new external dependencies; follow existing SQLite schema
  conventions in [backend/src/db/init.ts](backend/src/db/init.ts).

## Scope

This feature adds a `tags` attribute to items so users can label items with one or
more free-text tags at creation or edit time, and adds a tag filter to the Dashboard
that narrows the item list to items containing a selected tag, composable with the
existing `search` and `status` filters and pagination. It extends the existing items
domain (`Item` type, `items` table, `/api/items` routes, `ItemForm`, `Dashboard`)
rather than introducing a new resource.

**Out of scope:**
- A dedicated tag management screen (create/rename/delete tags independently of items).
- Multi-select tag filtering (filtering by more than one tag at a time).
- Tag autocomplete/suggestions based on previously used tags.
- Sharing or scoping tags across users (tags remain per-item, per-user via existing `user_id` scoping).
- Case-insensitive tag search beyond normalization applied at save time (see FR-05).
- Any change to authentication, pagination page size, or the `status` enum.

## Functional Requirements

- **FR-01**: The `items` table shall have a nullable `tags` column storing tags as a
  single comma-separated `TEXT` string, added via a migration in
  [backend/src/db/init.ts](backend/src/db/init.ts) consistent with the existing
  `updated_at` migration pattern.
- **FR-02**: `POST /api/items` shall accept an optional `tags` field (string) in the
  request body and persist it on the created item.
- **FR-03**: `PATCH /api/items/:id` shall accept an optional `tags` field (string) in
  the request body and update the item's tags, scoped to the authenticated user's
  own item (existing `user_id` ownership check).
- **FR-04**: Both `POST` and `PATCH` tag input shall be validated with a `zod` schema
  consistent with `createSchema`/`patchSchema` in
  [backend/src/routes/items.ts](backend/src/routes/items.ts): a string of comma-separated
  values, each individual tag trimmed and limited to 30 characters, with a maximum of
  10 tags per item.
- **FR-05**: On create/update, the backend shall normalize tags by trimming
  whitespace, removing empty entries, and de-duplicating (case-insensitive) before
  storing them as a comma-separated string.
- **FR-06**: `GET /api/items` shall accept an optional `tag` query parameter; when
  present, the result set shall be filtered to items whose normalized tag list
  contains an exact (case-insensitive) match for that tag.
- **FR-07**: The `tag` filter in `GET /api/items` shall compose with the existing
  `search` and `status` query parameters using `AND` semantics, following the
  existing `whereClauses`/`args` pattern in
  [backend/src/routes/items.ts](backend/src/routes/items.ts).
- **FR-08**: The `Item` TypeScript interface in
  [frontend/src/types/index.ts](frontend/src/types/index.ts) shall add a `tags: string
  | null` field reflecting the backend's comma-separated representation.
- **FR-09**: [ItemForm.tsx](frontend/src/components/ItemForm.tsx) shall include a new
  text input for entering comma-separated tags, submitted alongside title and
  description when adding an item.
- **FR-10**: [Dashboard.tsx](frontend/src/pages/Dashboard.tsx) shall render a tag
  filter control, populated from tags already present in the currently-loaded items,
  that sets a `tag` URL search parameter and reloads items through `fetchItems`,
  matching the existing `search`/`status` URL-param pattern.
- **FR-11**: [frontend/src/api/items.ts](frontend/src/api/items.ts) `fetchItems`
  parameters (`FetchParams`) shall include an optional `tag` field forwarded to the
  `GET /api/items` request, and `createItem`/`updateItem` shall accept an optional
  `tags` field forwarded to the corresponding backend calls.
- **FR-12**: Item display components (e.g. `ItemCard`/`ItemList`) shall render an
  item's tags, if present, as visually distinct labels alongside the existing
  title/description/status display.
- **FR-13**: Clearing the tag filter (selecting an empty/"All Tags" option) shall
  remove the `tag` parameter from the URL and return the list to the unfiltered
  (by tag) state, consistent with how `StatusFilter`'s `all` value is handled today.
- **FR-14**: An item with no tags shall continue to be created, updated, and listed
  successfully with `tags` stored/returned as `null` or an empty string.

## Acceptance Criteria

- **AC-01**: Given a logged-in user on the Dashboard, when they enter `"work, urgent"`
  in the tags input and submit the Add Item form, then the created item is persisted
  with normalized tags `"work,urgent"`.
- **AC-02**: Given a logged-in user adds a new item without entering any tags, when
  the item is created, then the item's `tags` value is `null` and no error occurs.
- **AC-03**: Given an item with tags `"work,urgent"`, when the user edits the tags
  field to `"work, Urgent , URGENT"` and saves, then the stored tags are normalized to
  `"work,urgent"` (deduplicated, case-insensitive, trimmed).
- **AC-04**: Given a tags input value containing 11 comma-separated tags, when the
  user submits the form, then the API returns a 400 validation error and no item is
  created or updated.
- **AC-05**: Given a single tag value longer than 30 characters, when the user
  submits the form, then the API returns a 400 validation error.
- **AC-06**: Given items exist with tags `"work"`, `"personal"`, and no tags
  respectively, when a `GET /api/items?tag=work` request is made, then only the item
  tagged `"work"` is returned.
- **AC-07**: Given an item tagged `"homework"`, when a `GET /api/items?tag=work`
  request is made, then that item is **not** returned (tag match must be exact, not
  a substring match).
- **AC-08**: Given items tagged `"Work"` (mixed case at entry time, normalized to
  `"work"`), when a `GET /api/items?tag=work` request is made, then the item is
  returned.
- **AC-09**: Given a user has both `status=active` items and `status=completed`
  items tagged `"work"`, when `GET /api/items?tag=work&status=active` is requested,
  then only active items tagged `"work"` are returned.
- **AC-10**: Given a user has items tagged `"work"` with titles matching and not
  matching a search term, when `GET /api/items?tag=work&search=report` is requested,
  then only items tagged `"work"` whose title/description matches `"report"` are
  returned.
- **AC-11**: Given items belonging to user A tagged `"work"` and items belonging to
  user B tagged `"work"`, when user A requests `GET /api/items?tag=work`, then only
  user A's items are returned (existing `user_id` scoping preserved).
- **AC-12**: Given the Dashboard is loaded with items that include various tags, when
  the user selects a tag from the tag filter control, then the URL updates with a
  `tag` parameter and the item list reloads to show only items with that tag.
- **AC-13**: Given a tag filter is active (URL has `?tag=work`), when the user
  selects "All Tags" (or clears the filter), then the `tag` parameter is removed from
  the URL and the full (search/status-filtered) item list is shown.
- **AC-14**: Given a tag filter is active, when the user also changes the status
  filter or search text, then both filters apply together and pagination resets to
  page 1, consistent with existing `updateParams` behavior in
  [Dashboard.tsx](frontend/src/pages/Dashboard.tsx).
- **AC-15**: Given an item with tags `"work,urgent"` is rendered in the item list,
  then both tags are visibly displayed as distinct labels on that item's card.
- **AC-16**: Given a request to update an item's tags for an item owned by a
  different user, when `PATCH /api/items/:id` is called with a `tags` field, then
  the API returns a 404 (per existing `PATCH` ownership behavior) and no tags are
  changed.
- **AC-17**: Given an existing item created before this feature (no `tags` column
  value populated), when it is fetched via `GET /api/items`, then the request
  succeeds and the item's `tags` value is `null` without errors, confirming the
  migration is backward-compatible.

## Non-Functional Requirements

- **Authentication**: All tag read/write operations continue to go through the
  existing `authMiddleware` on `/api/items` routes; no new unauthenticated endpoints
  are introduced.
- **Validation**: Tag input is validated server-side via `zod` (max 10 tags, max 30
  chars per tag) in addition to any client-side hints; server-side validation is
  authoritative.
- **SQL Safety**: Tag filtering uses parameterized queries (`args` array), consistent
  with existing `search`/`status` filter handling, to prevent SQL injection.
- **Performance**: Tag filtering must not introduce additional round-trips beyond the
  existing paginated `COUNT` + `SELECT` pattern in `GET /api/items`.
- **Backward Compatibility**: Existing items without tags must continue to function
  unaffected; the `tags` column migration must be additive and non-breaking (nullable
  column, default `NULL`).
- **Accessibility**: The new tags input and tag filter control must be keyboard-
  operable and use semantic HTML form elements consistent with existing
  `ItemForm`/`StatusFilter` components.

## Assumptions & Constraints

- Tags are stored as a single comma-separated `TEXT` column on `items` (no separate
  `tags`/`item_tags` join table), per the source note to follow existing SQLite
  schema conventions and avoid new external dependencies.
- The tag filter dropdown on the Dashboard is populated from tags present in the
  currently loaded page of items (no new "list all distinct tags" endpoint is
  introduced in this scope).
- "Exact match" tag filtering (AC-07) means the filter matches whole tags within the
  comma-separated list, not a raw `LIKE '%tag%'` substring match, to avoid false
  positives (e.g. `"work"` matching `"homework"`).
- No database migration framework beyond the existing manual `ALTER TABLE` check in
  `initDb()` is assumed or introduced.
