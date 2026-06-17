# G-xxx — {Short title}

> One goal per file. Keep it short — the agent reads **only this file** (+ acceptance contract) per round. Don't paste long prose; link instead.

**Status:** draft  
**Owner agent:** planner | implementer | tester | reviewer  
**Depends on:** G-yyy or —  
**Acceptance contract:** [G-xxx.md](../../02-product/acceptance/G-xxx.md) (create when promoting to `ready`)

## Intent

One paragraph: what user or system outcome this enables.

## Scope

**In:**

- ...

**Out:**

- ...

## Acceptance criteria

- [ ] Testable criterion 1
- [ ] Testable criterion 2

## Definition of done

- [ ] Implemented within touch map
- [ ] Acceptance contract verified (if present)
- [ ] Tests + lint green
- [ ] Docs / ADR updated if needed
- [ ] Human approved

## Test plan

- Commands: (from `AGENTS.md` standard commands)
- New/updated test files: `code/...` (paths per stack)

## Touch map

- `path/to/...`
- `docs/03-architecture/api/...` (if API changes)
- `docs/03-architecture/data/...` (if domain rules change)

## Notes for AI

- Read: [link to architecture doc]
- Skill: `pcampus-rest-api` | `pcampus-db-migration` | `pcampus-deploy-staging` | —
- Constraints: ...
