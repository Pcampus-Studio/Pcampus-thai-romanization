# Documentation index

> Pcampus Agent OS — replace product placeholders when bootstrapping a new project.  
> **Do not remove** process docs, `design-spec.md`, or `pcampus-*` skills.

## Project status

| Field | Value |
|-------|--------|
| **Phase** | G-001 library bootstrap — review |
| **Framework** | [03-architecture/design-spec.md](03-architecture/design-spec.md) |
| **Active goal** | [G-001](07-backlog/goals.md) |
| **Stack** | TypeScript, Vitest, tsup, Next.js playground |
| **Last updated** | 2026-06-17 |

## Read before writing code

1. [00-project-snapshot.md](00-project-snapshot.md) — TL;DR state
2. [02-product/project-brief.md](02-product/project-brief.md)
3. [02-product/mvp-scope.md](02-product/mvp-scope.md)
4. [03-architecture/overview.md](03-architecture/overview.md)
5. [03-architecture/design-spec.md](03-architecture/design-spec.md)
6. Active goal in [07-backlog/goals.md](07-backlog/goals.md)
7. [06-workflows/definition-of-done.md](06-workflows/definition-of-done.md)

## Team onboarding

- **[06-workflows/team-workflow.md](06-workflows/team-workflow.md)** — 6-phase Human + Agent cycle
- [assets/human-agent-cycle.png](assets/human-agent-cycle.png) — infographic
- [../AGENTS.md](../AGENTS.md) — AI entry point
- [../README.md](../README.md) — bootstrap checklist

## Document map

### Product

| Doc | Purpose |
|-----|---------|
| [00-project-snapshot.md](00-project-snapshot.md) | Agent reload — architecture, goals, constraints |
| [02-product/project-brief.md](02-product/project-brief.md) | Canonical product spec |
| [02-product/mvp-scope.md](02-product/mvp-scope.md) | MVP in/out |
| [02-product/acceptance-template.md](02-product/acceptance-template.md) | Goal block template |
| [02-product/acceptance/](02-product/acceptance/) | Per-goal acceptance test contracts |
| [01-vision.md](01-vision.md) | Vision & principles (optional) |

### Architecture

| Doc | Purpose |
|-----|---------|
| [03-architecture/design-spec.md](03-architecture/design-spec.md) | Framework map (Pcampus standard) |
| [03-architecture/overview.md](03-architecture/overview.md) | System context |
| [03-architecture/folder-structure.md](03-architecture/folder-structure.md) | Code layout |
| [03-architecture/api/README.md](03-architecture/api/README.md) | API contracts |
| [03-architecture/data/README.md](03-architecture/data/README.md) | Business rules |
| [assets/human-agent-cycle.png](assets/human-agent-cycle.png) | Human + Agent cycle |

### Process

| Doc | Purpose |
|-----|---------|
| [04-agents/dev-roles.md](04-agents/dev-roles.md) | Planner / implementer / tester / reviewer / shipper |
| [04-agents/skills-library.md](04-agents/skills-library.md) | Pcampus standard skills (versioned) |
| [06-workflows/dev-loop.md](06-workflows/dev-loop.md) | One round workflow |
| [06-workflows/team-workflow.md](06-workflows/team-workflow.md) | Mermaid diagrams |
| [06-workflows/upgrade-agent-os.md](06-workflows/upgrade-agent-os.md) | Upgrade framework in existing repos |
| [06-workflows/github-governance.md](06-workflows/github-governance.md) | GitHub branch protection + CI setup |
| [06-workflows/definition-of-done.md](06-workflows/definition-of-done.md) | Done checklist |
| [07-backlog/goals.md](07-backlog/goals.md) | Goal queue + state machine |
| [07-backlog/changelog-goals.md](07-backlog/changelog-goals.md) | Completed goals log |
| [07-backlog/changelog.md](07-backlog/changelog.md) | Agent audit trail |

### Decisions

| Doc | Purpose |
|-----|---------|
| [05-decisions/0000-template.md](05-decisions/0000-template.md) | ADR template |
| [05-decisions/0001-example-postgresql.md](05-decisions/0001-example-postgresql.md) | ADR format example (replace on bootstrap) |

### Agent layers (repo root)

| Path | Purpose |
|------|---------|
| [../AGENTS.md](../AGENTS.md) | Agent entry |
| [../.github/](../.github/) | PR template, CI workflows, ci-config |
| [../.cursor/rules/](../.cursor/rules/) | Always-on rules (core, governance, security) |
| [../.cursor/skills/pcampus-*/](../.cursor/skills/) | Standard skills |
