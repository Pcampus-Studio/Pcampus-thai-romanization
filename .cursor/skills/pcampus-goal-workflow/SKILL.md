---
name: pcampus-goal-workflow
version: "1.2.0"
description: >-
  Executes the Pcampus one-goal-per-round dev workflow: pick or draft a goal in
  goals.md first, confirm scope, implement only after an explicit G-xxx is
  approved, run tests, close goal with changelog. Use when the user mentions
  G-xxx goals, backlog items, "next goal", "ต่อ G-", closing a goal, committing
  goal work, or describes feature work without a goal ID (draft goal only).
---

# Goal workflow

One round = **one goal** = **one commit** (when possible) + green tests + human approval.

Always read first: `AGENTS.md`, [governance.mdc](../../.cursor/rules/governance.mdc), active goal in `docs/07-backlog/goals.md`, `docs/02-product/mvp-scope.md`, [00-project-snapshot.md](../../docs/00-project-snapshot.md).

## 0. Goal gate (mandatory — read before any code)

**No goal → no application code.**

| Situation | Agent must |
|-----------|------------|
| User describes a change **without** `G-xxx` | **Stop.** Create a goal file `docs/07-backlog/goals/G-xxx.md` (from `_template.md`) + add a row in `docs/07-backlog/goals.md` index (`draft` / `planned`). Summarize In/Out/touch map/acceptance criteria. **Do not** edit `code/`, tests, or config. |
| User says "อยากให้…", "ช่วยทำ…", workflow skill only | Treat as **planning** — goal doc only unless they also say **"ทำ G-xxx"** / **"implement G-xxx"** / **"เริ่มทำ G-xxx"**. |
| User says **"ทำ G-xxx"** / **"เริ่มทำ G-xxx"** | Verify goal is **`ready`** → set `in_progress`, then steps 2–4. |
| User says **"set goal"** / **"สร้าง goal"** | Only edit `docs/07-backlog/goals.md` (and acceptance contract if promoting to ready). No `code/`. |
| Goal is `draft` / `planned` | Do **not** implement — human must promote to `ready`. |
| Goal is `blocked` | Stop — wait for human to unblock. |
| Goal is `done` | Do not re-implement unless user opens a new goal. |
| Goal not **`ready`** | Do **not** self-pick or start. |

**Wrong:** User asks for `/store/products` skeleton → agent edits `page.tsx` immediately.  
**Right:** Add **G-113** as `draft`, show acceptance criteria, wait for **"ทำ G-113"**.

If agent already changed code without a goal → report that to the user; offer to revert or fold changes under a new goal after human approves.

## 1. Select goal

1. Open `docs/07-backlog/goals.md` (**lean index**) and scan the Active queue — read only the index, not every goal file
2. Pick highest **`ready`** goal whose **Depends on** goals are **`done`** (skip **`draft`** / **`planned`**)
3. Open **only** that goal's spec file `docs/07-backlog/goals/G-xxx.md` (+ acceptance contract) — don't load other goal files
4. Set goal status → **`in_progress`** only when user explicitly starts that goal (e.g. **"ทำ G-xxx"**) — update status in **both** the index row and the goal file header
5. Load `docs/02-product/acceptance/G-xxx.md` if linked

If scope is unclear → stop and clarify; do not implement.

### Draft a new goal (no code)

1. Assign next **G-xxx** ID
2. Copy `docs/07-backlog/goals/_template.md` → `docs/07-backlog/goals/G-xxx.md`; fill **In**, **Out**, **Touch map**, **Acceptance criteria**, **Test plan**, **Depends on**, **DoD**
3. Add **one row** to the `goals.md` index table (`draft` / `planned` by default)
4. When promoting to `ready`, create acceptance contract from [_template.md](../../docs/02-product/acceptance/_template.md)
5. Tell human: say **"ทำ G-xxx"** when approved

## 2. Confirm scope (before coding)

| Field | Action |
|-------|--------|
| **In** / **Out** | Code only **In**; never expand MVP without new goal |
| **Acceptance criteria** | Each item must be testable |
| **Acceptance contract** | Verify scenarios are clear |
| **Touch map** | Only edit listed paths |
| **Notes for AI** / ADR links | Read linked docs before coding |
| **Test plan** | Know which tests to add/run |

**Stop** if acceptance criteria are ambiguous — update goal first (Planner role).

## 3. Implement

**Only after §0 gate passes** (explicit G-xxx + `in_progress`).

- Smallest correct diff; no drive-by refactors
- Match `docs/03-architecture/folder-structure.md`
- Follow [governance.mdc](../../.cursor/rules/governance.mdc) execution boundaries
- Follow constraints in goal **Notes for AI**
- Load task skill when applicable:

| Goal type | Skill |
|-----------|-------|
| API endpoints | [pcampus-rest-api](../pcampus-rest-api/SKILL.md) |
| Schema / DB | [pcampus-db-migration](../pcampus-db-migration/SKILL.md) |
| Deploy / staging | [pcampus-deploy-staging](../pcampus-deploy-staging/SKILL.md) |

## 4. Test (IMPROVE)

Run [pcampus-testing](../pcampus-testing/SKILL.md) — commands from goal **Test plan** and `AGENTS.md` **Standard commands**.

- Verify acceptance contract scenarios
- Add tests from goal **Test plan**; test behavior, not constants
- Fix all failures before proceeding

## 5. Review (REVIEW)

1. Set goal status → **`review`**
2. Run [pcampus-code-review](../pcampus-code-review/SKILL.md)
3. Human approves → **`approved`**

Do not mark `done` without human approval.

## 6. Commit (only when user asks)

- One goal per commit; message: `G-xxx: imperative description`
- Stage only files from **Touch map** (+ goal/changelog docs)
- Do not commit unless user explicitly requests
- Do not merge — human merges

## 7. Close goal

1. Check acceptance criteria `[x]` in `docs/07-backlog/goals/G-xxx.md`
2. Set status → **`done`** (in both the goal file header and the index row; only from **`approved`**)
3. Append row to `docs/07-backlog/changelog-goals.md`:

```markdown
| G-xxx | YYYY-MM-DD | <hash or —> | One-line summary |
```

4. Append audit row to `docs/07-backlog/changelog.md` if not already logged
5. Update [00-project-snapshot.md](../../docs/00-project-snapshot.md) if architecture or active goals changed
6. Report summary; wait for commit instruction if not yet committed

## 8. Ship (deploy goals only)

If goal **In** includes staging deploy → [pcampus-deploy-staging](../pcampus-deploy-staging/SKILL.md) after human approval. Do not mark deploy goals done until smoke tests pass. Never deploy production without explicit human authorization.

## User says → Do

| User says | Do |
|-----------|-----|
| "ทำ G-003" / "next goal" / "เริ่มทำ G-003" | §0 gate OK → `in_progress` → steps 2–5 |
| "set goal" / "สร้าง goal" / describes feature, no G-xxx | Draft goal in `goals.md` only — **no code** |
| "commit G-003" | Git commit only; follow `commits.mdc` |
| "review G-003" | Set `review`; run code-review skill |
| "approve G-003" | Set `approved` if checklist passes (human decision) |
| "ทำให้สวย / refactor ทั้ง repo" | Stop — ask for goal ID or draft new goal |
| "ทำไปเลย" after goal named | Skip re-confirm if scope already clear |
| Attaches this skill + feature request, no G-xxx | **Goal first** (§0) — do not implement |

## Related

- [docs/06-workflows/team-workflow.md](../../docs/06-workflows/team-workflow.md)
- [docs/06-workflows/dev-loop.md](../../docs/06-workflows/dev-loop.md)
- [docs/06-workflows/definition-of-done.md](../../docs/06-workflows/definition-of-done.md)
- [governance.mdc](../../.cursor/rules/governance.mdc)
