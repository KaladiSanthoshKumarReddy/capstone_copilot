# Design Review — Add Item Tagging and Tag-Based Filtering

## Verdict

**APPROVED**

`architecture.md` is traceable to all 14 FRs / 17 ACs in [requirements.md](requirements.md), fits the existing stack with no new dependencies or tables, is data-model sound with a safe additive SQLite migration, and preserves existing auth/validation/SQL-safety patterns. Its claims about existing code ([backend/src/routes/items.ts](backend/src/routes/items.ts), [backend/src/db/init.ts](backend/src/db/init.ts), [frontend/src/types/index.ts](frontend/src/types/index.ts), [StatusFilter.tsx](frontend/src/components/StatusFilter.tsx), [Dashboard.tsx](frontend/src/pages/Dashboard.tsx)) were checked line-by-line against the actual files and are accurate, with one minor documentation nuance noted below (non-blocking).

---

## 1. Traceability (FR/AC → Architecture)

Verified against §8 Traceability Matrix of [architecture.md](architecture.md):

| FR/AC | Covered by | Verified |
|---|---|---|
| FR-01, AC-17 | `init.ts` additive migration, reuses existing `cols` query | ✅ |
| FR-02, AC-01, AC-02 | `POST /api/items` §6.3 | ✅ |
| FR-03, AC-16 | `PATCH /api/items/:id` §6.4, ownership WHERE unchanged | ✅ |
| FR-04, AC-04, AC-05 | `tagsSchema` zod refine (max 10, max 30 chars) | ✅ |
| FR-05, AC-01, AC-03, AC-08 | `normalizeTags()` (lowercase, dedupe, trim) | ✅ |
| FR-06, FR-07, AC-06–AC-11 | `GET /api/items` comma-wrapped `LIKE` clause, folded into existing `whereClauses`/`args` | ✅ |
| FR-08 | `types/index.ts` add `tags: string \| null` | ✅ |
| FR-09, AC-01/04/05 | `ItemForm.tsx` new input | ✅ |
| FR-10, AC-12, AC-14 | `Dashboard.tsx` + new `TagFilter.tsx` | ✅ |
| FR-11 | `api/items.ts` `FetchParams.tag`, `createItem`/`updateItem` | ✅ |
| FR-12, AC-15 | `ItemCard.tsx` tag pills | ✅ |
| FR-13, AC-13 | `updateParams` falsy-value-deletes-key reuse | ✅ (see Risk R1) |
| FR-14, AC-02, AC-17 | `normalizeTags()` returns `null` on empty input | ✅ |

All 14 FRs and 17 ACs map to a concrete file/change. No gaps found.

## 2. Fit with Existing Stack

- No new runtime dependencies, services, tables, or endpoints are introduced. `tags` is a nullable `TEXT` column on the existing `items` table (ADR-001), consistent with the requirements' explicit constraint to avoid a join table.
- Reuses existing `zod`, `express`, `@libsql/client`, React/Zustand/Tailwind patterns already in the codebase — no `package.json` changes implied.
- `TagFilter.tsx` is additive; no existing component is deleted or renamed.

## 3. Data Model Soundness

Checked against [backend/src/db/init.ts](backend/src/db/init.ts):

- Actual current schema and migration pattern:
  ```ts
  const cols = await db.execute("PRAGMA table_info(items)")
  const hasUpdatedAt = cols.rows.some((r: unknown) => (r as { name: string }).name === 'updated_at')
  if (!hasUpdatedAt) { await db.execute("ALTER TABLE items ADD COLUMN updated_at DATETIME"); ... }
  ```
  The architecture's proposed `tags` migration block is a **structurally identical** guard reusing the same `cols` result — verified accurate, no extra `PRAGMA` round trip introduced.
- Column is nullable, no default beyond implicit `NULL`, additive `ALTER TABLE` — safe for existing rows (AC-17), no backfill required, no destructive change.
- No new keys/constraints/foreign keys needed — tags remain scalar per-item data, consistent with the requirements' "no join table" constraint.

## 4. Security Review

Checked against [backend/src/routes/items.ts](backend/src/routes/items.ts) and [backend/src/middleware/auth.ts](backend/src/middleware/auth.ts):

- **AuthN/AuthZ**: `router.use(authMiddleware)` already guards all `/api/items` routes (confirmed in the actual file); architecture correctly states "no change" here and adds no new unauthenticated routes. `PATCH`'s existing `WHERE id = ? AND user_id = ?` ownership scoping is untouched, so AC-16 (404 on cross-user tag edit) is inherited for free — verified against actual `PATCH` handler.
- **Input validation**: `tagsSchema` (max 10 tags, max 30 chars/tag) is added to `createSchema`/`patchSchema`, both validated server-side via `zod` `.safeParse` before any DB write — matches existing `!parsed.success → 400` pattern verified in the real file. No client-side-only validation gap.
- **SQL injection**: The proposed tag clause `(',' || tags || ',') LIKE ?` with `args.push(`%,${tag},%`)` follows the exact parameterized pattern already used for `search`/`status` in the real `GET` handler (`whereClauses`/`args` arrays) — verified no string concatenation of user input into SQL text.
- **Secrets**: No secrets, tokens, or URLs are introduced in `architecture.md`.
- **CORS/origin**: Unaffected — no new routes, no new middleware.

## 5. Codebase-Claim Verification (explicit checks requested)

| Claim in architecture.md | File checked | Result |
|---|---|---|
| Existing `whereClauses`/`args` pattern in `GET /api/items` | [items.ts](backend/src/routes/items.ts) | ✅ Matches exactly (`user_id` first, then `search`, `status`) |
| `PATCH` "nothing to update" guard shape | [items.ts](backend/src/routes/items.ts) | ✅ `if (!title && description === undefined && !status)` confirmed verbatim |
| `updated_at` migration guard pattern reused for `tags` | [init.ts](backend/src/db/init.ts) | ✅ `cols`/`PRAGMA table_info(items)` confirmed verbatim |
| `Item` interface currently has no `tags` field | [types/index.ts](frontend/src/types/index.ts) | ✅ Confirmed — clean additive change |
| `StatusFilter.tsx` is a `<select>` mirrored by new `TagFilter.tsx` | [StatusFilter.tsx](frontend/src/components/StatusFilter.tsx) | ✅ Structurally confirmed (native `<select>`/`<option>`, `data-testid` pattern) |
| `Dashboard.tsx` uses `useSearchParams`, `updateParams` falsy-delete rule, `[page, search, status]` deps | [Dashboard.tsx](frontend/src/pages/Dashboard.tsx) | ✅ Confirmed verbatim, including the exact `if (!v || (k === 'page' && v === '1'))` logic |
| `ItemCard.tsx` uses `STATUS_COLORS` badges, `item-card-${item.id}` testid convention | [ItemCard.tsx](frontend/src/components/ItemCard.tsx) | ✅ Confirmed — new tag pill testid convention is consistent |

## 6. Risks / Edge Cases

- **R1 (minor, non-blocking)**: §7.4 of `architecture.md` describes the tag-clear behavior as "consistent with how StatusFilter's `all` value is handled today." In the actual code, `StatusFilter`'s `"all"` option is a **truthy** string, so `updateParams`'s `!v` check does **not** delete the `status` key — `status=all` persists in the URL (only the API-call mapping treats `all` as "no filter", via `status !== 'all' ? status : undefined` in `loadItems`). `TagFilter`'s proposed `""` (empty string) value *does* trigger the falsy-delete branch, so **AC-13 is still correctly satisfied** — the analogy to `StatusFilter` is imprecise but the mechanism is actually closer to `SearchBar`'s empty-string pattern, and it works correctly. No rework required; note for Stage 5 to implement `TagFilter` exactly as specified (empty string, not `"all"`).
- **R2 (documented trade-off, accepted)**: ADR-002 validates tag count/length pre-dedup, meaning a submission of 11 raw tags that would dedupe to ≤10 unique tags is still rejected. This is explicitly justified against AC-04's literal wording and is a reasonable, security-favoring interpretation — not a defect.
- **R3 (documented trade-off, accepted)**: Tag filtering uses string `LIKE` pattern matching rather than an indexed join (ADR-001/ADR-003). Acceptable at current scale given the existing `search LIKE` precedent in the same route and the requirements' explicit no-join-table constraint.
- **R4 (low risk)**: Correctness of the comma-wrapped `LIKE` match depends on tag values never containing a literal comma; this is structurally guaranteed since comma is the only tag separator used in both `tagsSchema`'s split and `normalizeTags()` — verified no code path allows a raw comma to survive into a stored tag.

No risk identified rises to the level of a rework item.

## 7. Non-Functional Compliance

| Requirement | Evidence |
|---|---|
| Authentication | `authMiddleware` unchanged, already covers all `/api/items` routes (verified) |
| Validation | Server-side `zod` `tagsSchema` authoritative; existing `400`/`Invalid input` path reused |
| SQL Safety | Tag clause parameterized via `args`, identical to verified `search`/`status` pattern |
| Performance | Tag clause folded into existing single `COUNT` + `SELECT` pair — no added round trip (verified against real query structure) |
| Backward Compatibility | Nullable additive column, default `NULL`, no backfill (AC-17) |
| Accessibility | `TagFilter` uses native `<select>`/`<option>`, mirroring verified `StatusFilter` markup |

## Gate Message

```
✅ STAGE 3 COMPLETE — Design Review
📄 Artifact: design-review.md
🏁 Verdict: APPROVED
🎯 Next: @sdlc-stage4-impl-plan
⏸️  GATE: Review design-review.md to proceed
```
