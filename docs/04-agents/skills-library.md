# Skills library

> **Pcampus Studio standard skills** — shipped with every project from **Pcampus Agent OS**.  
> Versioned, repeatable procedures for humans and Cursor agents.

Project-specific skills use prefix `{project}-*` and are listed in a separate section below.

## Version convention

| Change type | Bump | Example |
|-------------|------|---------|
| New steps, removed steps, different order | **minor** (1.0 → 1.1) | Add mandatory security scan |
| Incompatible with previous workflow | **major** (1.x → 2.0) | Commit policy changed |
| Wording, links, typos | **patch** (1.0.0 → 1.0.1) | Fix path typo |

Store version in skill frontmatter:

```yaml
---
name: pcampus-my-skill
version: "1.0.0"
description: When to use this skill…
---
```

## Pcampus standard skills (shipped)

| Skill | Version | Path | Use when |
|-------|---------|------|----------|
| Goal workflow | **1.2.0** | [pcampus-goal-workflow](../../.cursor/skills/pcampus-goal-workflow/SKILL.md) | G-xxx, next goal, close goal, commit |
| Create REST API | **1.0.0** | [pcampus-rest-api](../../.cursor/skills/pcampus-rest-api/SKILL.md) | New/changed HTTP/RPC endpoints |
| Code review checklist | **1.1.0** | [pcampus-code-review](../../.cursor/skills/pcampus-code-review/SKILL.md) | Before done / merge / PR review |
| Testing procedure | **1.0.0** | [pcampus-testing](../../.cursor/skills/pcampus-testing/SKILL.md) | Tests, failures, test plan |
| Deploy to staging | **1.0.0** | [pcampus-deploy-staging](../../.cursor/skills/pcampus-deploy-staging/SKILL.md) | SHIP phase, staging deploy |
| Incident response | **1.1.0** | [pcampus-incident-response](../../.cursor/skills/pcampus-incident-response/SKILL.md) | Outages, rollback, postmortem |
| Database migration | **1.0.0** | [pcampus-db-migration](../../.cursor/skills/pcampus-db-migration/SKILL.md) | Schema changes, migrations |

All linked from [AGENTS.md](../../AGENTS.md) and routed via [.cursor/rules/guidelines.mdc](../../.cursor/rules/guidelines.mdc).

## Project-specific skills (add when needed)

Use when the same **project-only** convention is explained 3+ times:

```text
.cursor/skills/{project}-{name}/SKILL.md
```

| Skill | Version | Path | Use when |
|-------|---------|------|----------|
| *(none — add rows as created)* | — | — | — |

Register new skills here and in `AGENTS.md`.

## Changelog

| Skill | Version | Date | Change |
|-------|---------|------|--------|
| pcampus-goal-workflow | 1.2.0 | 2026-05-27 | Governance layer: state machine, audit, acceptance contracts |
| pcampus-code-review | 1.1.0 | 2026-05-27 | Five review lenses (security, architecture, scope creep) |
| pcampus-incident-response | 1.1.0 | 2026-05-27 | Normal vs incident mode |
| pcampus-goal-workflow | 1.1.0 | 2026-05-24 | Goal gate mandatory before code |
| pcampus-rest-api | 1.0.0 | 2026-05-24 | Initial ship |
| pcampus-code-review | 1.0.0 | 2026-05-24 | Initial ship |
| pcampus-testing | 1.0.0 | 2026-05-24 | Initial ship |
| pcampus-deploy-staging | 1.0.0 | 2026-05-24 | Initial ship |
| pcampus-incident-response | 1.0.0 | 2026-05-24 | Initial ship |
| pcampus-db-migration | 1.0.0 | 2026-05-24 | Initial ship |

## Related

- [design-spec.md](../03-architecture/design-spec.md)
- [dev-roles.md](dev-roles.md)
- [../06-workflows/team-workflow.md](../06-workflows/team-workflow.md)
