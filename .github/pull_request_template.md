## Goal

- **G-xxx:** <!-- required — e.g. G-003 -->
- **Goal status in [goals.md](../docs/07-backlog/goals.md):** `review` / `approved`

> Process-only PRs (no product goal): add `[governance]` to the title.

## Summary

<!-- What changed and why (1–3 sentences) -->

## Scope

- [ ] Single goal only — no unrelated refactors
- [ ] Changes stay within goal **Touch map**
- [ ] Nothing from [mvp-scope.md](../docs/02-product/mvp-scope.md) **Out** without a new goal

## Quality

- [ ] Tests pass locally and in CI
- [ ] Lint / analyzer green
- [ ] [pcampus-code-review](../.cursor/skills/pcampus-code-review/SKILL.md) lenses addressed:
  - [ ] Security (no secrets, input validation)
  - [ ] Maintainability (minimal diff)
  - [ ] Architecture compliance
  - [ ] No breaking changes / scope creep

## Docs & contracts

- [ ] Acceptance criteria checked in goals.md
- [ ] Acceptance contract verified (if `docs/02-product/acceptance/G-xxx.md` exists)
- [ ] API / data / ADR docs updated if applicable

## Test plan

<!-- Commands run, or checklist for human -->

- [ ] `AGENTS.md` standard commands
- [ ] Goal test plan

## Human approval

- [ ] I reviewed this PR and approve merge
- [ ] Agent did **not** merge (human merges)
