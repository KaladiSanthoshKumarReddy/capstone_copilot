# User Story — Capstone Item Manager

> Fill this in with the next feature you want the AI-SDLC pipeline to build, then
> run `@sdlc` to start Stage 1 (Requirements Analysis). If left as-is, Stage 1 will
> ask you for the feature description, a Jira issue key, or a Confluence page instead.

## Title

Add item tagging and tag-based filtering

## As a / I want / So that

- As a: registered user managing my items
- I want: to add one or more tags to an item and filter my item list by tag
- So that: I can organize and quickly find related items

## Notes / Context

<!-- Any constraints, references to existing behavior, or links -->
- Tags should be free-text, comma-separated on the item form (similar to how status is currently a dropdown in ItemForm.tsx)
- Filtering should work alongside the existing search/status filters, not replace them
- No new external dependencies; use existing SQLite schema conventions in backend/src/db/init.ts
