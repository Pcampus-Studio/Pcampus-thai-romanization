# Dev loop

One round = one goal = one commit (when possible) + green tests + review.

See **[team-workflow.md](team-workflow.md)** for the full **6-phase Human + Agent cycle** (DEFINE → SHIP).

## Macro cycle (project level)

```text
DEFINE → PLAN → EXECUTE → REVIEW → IMPROVE → SHIP → (repeat)
```

## Micro loop (one goal)

```text
┌──────────┐    ┌──────────────┐    ┌────────────┐    ┌─────────┐    ┌──────────┐    ┌──────────┐
│ Planner  │───▶│ Implementer  │───▶│  Tester    │───▶│ Reviewer│───▶│  Done    │───▶│  Shipper │
│ goal     │    │ + skill      │    │ testing    │    │ review  │    │ changelog│    │ optional │
└──────────┘    └──────────────┘    └────────────┘    └─────────┘    └──────────┘    └──────────┘
```

### 1. Select goal

- Open [../07-backlog/goals.md](../07-backlog/goals.md)
- Pick highest **`ready`** goal whose dependencies are `done` (skip `draft` / `planned`)
- Set status → `in_progress` when human says **"ทำ G-xxx"**
- Load acceptance contract `docs/02-product/acceptance/G-xxx.md` if present
- Load matching skill from [skills-library.md](../04-agents/skills-library.md)

### 2. Confirm scope

- **In** / **Out** unambiguous
- Acceptance criteria testable
- If not → Planner updates goal; stop

### 3. Implement

- Read touch map, architecture links, and task skill (API, migration, etc.)
- Code only within scope
- Update `docs/03-architecture/api/` or `data/` when applicable
- No unrelated refactors

### 4. Test (IMPROVE)

- Follow [pcampus-testing](../../.cursor/skills/pcampus-testing/SKILL.md)
- Run goal **Test plan** and `AGENTS.md` **Standard commands**
- Fix failures before proceeding

### 5. Review (REVIEW)

- Set goal status → `review`
- Run [pcampus-code-review](../../.cursor/skills/pcampus-code-review/SKILL.md) (five lenses)
- Human approves → `approved`; or request changes → `in_progress`

### 6. Commit

- One goal per commit; message `G-xxx: description`
- User must request commit in chat
- Agent does not merge

### 7. Close goal

- Status → `done` (from `approved` only)
- Append row to [../07-backlog/changelog-goals.md](../07-backlog/changelog-goals.md)
- Append audit row to [../07-backlog/changelog.md](../07-backlog/changelog.md)

### 8. Ship (when goal includes deploy)

- Human approves; agent follows [pcampus-deploy-staging](../../.cursor/skills/pcampus-deploy-staging/SKILL.md)
- Smoke test staging; record result

## When to split a goal

Split if estimate > one focused session or touches unrelated modules.

## When to write an ADR

Auth strategy, schema breaking change, new dependency, major architectural choice.

Use [../05-decisions/0000-template.md](../05-decisions/0000-template.md). See [0001-example-postgresql.md](../05-decisions/0001-example-postgresql.md) for format.

## Related

- [team-workflow.md](team-workflow.md)
- [definition-of-done.md](definition-of-done.md)
- [../03-architecture/design-spec.md](../03-architecture/design-spec.md)
- [../../AGENTS.md](../../AGENTS.md)
