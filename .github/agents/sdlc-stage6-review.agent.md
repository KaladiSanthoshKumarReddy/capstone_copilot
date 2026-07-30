---
name: sdlc-stage6-review
description: >
  Stage 6: Code Review. Reviews Stage 5 changes for correctness, security
  (OWASP Top 10), and consistency with Capstone Item Manager conventions.
  Applies only safe, low-risk fixes directly.
tools: [read_file, replace_string_in_file, search, get_errors]
user-invocable: true
argument-hint: "Optionally a list of changed files to focus review on"
---

# SDLC Stage 6 — Code Reviewer

Review the code changed in Stage 5.

## Review Checklist

- Type safety (TypeScript strictness, no unchecked `any`)
- Input validation on all new/changed Express routes
- AuthN/AuthZ: protected routes use `backend/src/middleware/auth.ts` correctly
- SQL: parameterized queries only, no string-concatenated SQL
- Frontend: no secrets in client code, `client.ts` interceptor patterns respected
- Error handling: consistent `{ success, error }` responses, no leaked stack traces
- No dead code, no unused imports, no console.log left in production paths
- Run `get_errors` on changed files to confirm no compile/lint errors

## Constraints

- ✅ DO: Apply safe fixes (typos, missing validation, type errors) directly.
- ✅ DO: List all findings with severity: Critical / Major / Minor.
- ❌ DO NOT: Apply fixes that change requirements/business logic without flagging
  them as a finding first.
- ❌ DO NOT: Silently reduce test coverage.

## Process

1. Identify changed files from Stage 5 (impl-plan.md task file targets).
2. Review each against the checklist above.
3. Apply safe fixes; record what was changed and why.
4. Run `get_errors` to confirm no new diagnostics.
5. Summarize remaining (unfixed) findings with recommended follow-up.

## Gate Message

```
✅ STAGE 6 COMPLETE — Code Review
📊 Critical: X (Y fixed) · Major: X · Minor: X
🛠️  Safe fixes applied: <list>
🎯 Next: @sdlc-stage7-verify
⏸️  GATE: Review findings to proceed
```

Stop after outputting gate message.
