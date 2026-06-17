# {PROJECT_NAME} — Agent Guide

> **Pause before coding.** This repo uses **Pcampus goal-driven development** — Human defines scope, AI implements within goals.

Replace `{PROJECT_NAME}` and mission below when bootstrapping. **Process docs and `pcampus-*` skills** ship with **Pcampus Agent OS** and stay unchanged across projects.

Human onboarding: [docs/06-workflows/team-workflow.md](docs/06-workflows/team-workflow.md)  
Framework map: [docs/03-architecture/design-spec.md](docs/03-architecture/design-spec.md)

## Mission (one paragraph)

{Describe what the product is, who it serves, and what it is NOT.}

## Pcampus Agent OS — six layers

```text
Context + Skill + Goal + Governance + Approval + Audit
```

| Layer | Location | Agent job |
|-------|----------|-----------|
| **Context** | `AGENTS.md`, `docs/00-project-snapshot.md`, brief, ADR, API | Load before EXECUTE |
| **Skill** | `.cursor/skills/pcampus-*/` | Follow task playbook |
| **Goal** | `docs/07-backlog/goals.md`, `docs/02-product/acceptance/` | One `ready` goal per round |
| **Governance** | `.cursor/rules/governance.mdc`, `security.mdc` | Hard boundaries |
| **Approval** | Human in REVIEW / SHIP | No merge, prod, or `done` without human |
| **Audit** | `docs/07-backlog/changelog.md` | Log decisions |

## How this repo works

| Layer | Location | Agent job |
|-------|----------|-----------|
| **Goals** | `docs/07-backlog/goals.md` | Work on **one** `ready` goal only |
| **Scope lock** | `docs/02-product/mvp-scope.md` | Do not build **Out** items without a new goal |
| **Rules** | `.cursor/rules/` | Always follow |
| **Skills** | `.cursor/skills/pcampus-*/` | Read when task matches skill description |
| **Specs** | `docs/02-product/`, `docs/03-architecture/` | Read links in the active goal |
| **API / data** | `docs/03-architecture/api/`, `data/` | Update contracts when goal changes APIs or domain rules |

**Goal statuses:** `draft` / `planned` = spec only · `ready` = may pick · `in_progress` · `review` · `blocked` · `approved` · `done`

## Approval gates — NO AI MAY (without explicit human approval)

- Merge to `main` / protected branches
- Deploy to **production**
- Modify infrastructure
- Run destructive migrations
- Change auth / security boundaries
- Mark goal `done` without human approval (`approved` → `done`)

See [.cursor/rules/governance.mdc](.cursor/rules/governance.mdc) and [.cursor/rules/security.mdc](.cursor/rules/security.mdc).

## Collaboration cycle (every session)

```text
DEFINE → PLAN → EXECUTE → REVIEW → IMPROVE → SHIP
```

1. **DEFINE** — Read brief, scope, active goal, project snapshot
2. **PLAN** — Confirm In/Out/touch map; read linked ADRs and acceptance contract
3. **EXECUTE** — Implement with task skill (API, migration, …) within touch map
4. **REVIEW** — Run code-review skill; human approves → `approved`
5. **IMPROVE** — Tests green per test plan + DoD
6. **SHIP** — Deploy goals only; human approves staging

## Context loading (before EXECUTE)

Load in order:

1. This file (`AGENTS.md`)
2. [docs/00-project-snapshot.md](docs/00-project-snapshot.md)
3. [docs/02-product/project-brief.md](docs/02-product/project-brief.md)
4. Active goal in [docs/07-backlog/goals.md](docs/07-backlog/goals.md)
5. Acceptance contract `docs/02-product/acceptance/G-xxx.md` (if present)
6. Linked ADR in `docs/05-decisions/`
7. Relevant API/data docs
8. Matching `pcampus-*` skill

## Read first (in order)

1. [docs/02-product/project-brief.md](docs/02-product/project-brief.md) — canonical spec
2. [docs/02-product/mvp-scope.md](docs/02-product/mvp-scope.md) — in/out scope
3. [docs/03-architecture/overview.md](docs/03-architecture/overview.md) — stack & boundaries
4. [docs/03-architecture/design-spec.md](docs/03-architecture/design-spec.md) — framework map
5. [docs/07-backlog/goals.md](docs/07-backlog/goals.md) — pick **one** active goal
6. [docs/06-workflows/definition-of-done.md](docs/06-workflows/definition-of-done.md)

## Work loop (every round)

1. Select a single **`ready`** goal (dependencies `done`; skip `draft` / `planned`).
2. Confirm **In / Out / Touch map / Acceptance criteria** — stop if unclear.
3. Set status → `in_progress` only when human says **"ทำ G-xxx"**.
4. Load matching **pcampus-** skill; implement within goal scope.
5. Set status → `review`; run **pcampus-testing** + **pcampus-code-review**.
6. Human approves → `approved`; one commit per goal when user asks.
7. Mark goal `done`; update [docs/07-backlog/changelog-goals.md](docs/07-backlog/changelog-goals.md) and [changelog.md](docs/07-backlog/changelog.md).
8. **SHIP goals:** follow **pcampus-deploy-staging** after human approval.

Full workflow: [docs/06-workflows/dev-loop.md](docs/06-workflows/dev-loop.md)

## Dev agent roles

| Role | Reads | Does |
|------|-------|------|
| **Planner** | brief, mvp-scope | Break work into goals |
| **Implementer** | active goal + architecture + skill | Code in scope |
| **Tester** | acceptance contract + test plan | Tests green (`pcampus-testing`) |
| **Reviewer** | DoD + diff | Approve (`pcampus-code-review`) |
| **Shipper** | deploy goal | Approve staging (`pcampus-deploy-staging`) |

Details: [docs/04-agents/dev-roles.md](docs/04-agents/dev-roles.md)

## Hard rules

- **Only `ready` goals** — do not self-pick or implement `draft` / `planned`.
- **One goal per commit** — no drive-by refactors or multi-goal commits.
- **Touch map only** — no repo-wide changes outside goal scope.
- **Tests before `review`** — do not mark complete if tests or analyzer fail.
- **Human before `done`** — status must reach `approved` with explicit human sign-off.
- **Respect MVP scope** — no out-of-scope features without a new goal row.
- **Minimize diff** — smallest change that satisfies acceptance criteria.
- **Do not commit** unless the user explicitly asks.
- **Do not deploy to production** unless goal explicitly includes it and human confirms.
- **No secrets** — never commit or expose `.env`, tokens, keys (see `security.mdc`).

## Operating modes

| Mode | Rules |
|------|-------|
| **Normal** | Full review; no hotfix without goal + review |
| **Incident** | Human declares; follow `pcampus-incident-response`; emergency path requires explicit authorization |

## Standard commands

```bash
# Replace with your stack — run from repo root; app lives in code/
# cd code && npm test && npm run lint
# cd code && dart analyze && flutter test
# cd code && go test ./... && golangci-lint run
{TEST_COMMANDS}
```

## Pcampus standard skills (v1.1.0)

| Skill | When |
|-------|------|
| [pcampus-goal-workflow](.cursor/skills/pcampus-goal-workflow/SKILL.md) | Any G-xxx work |
| [pcampus-rest-api](.cursor/skills/pcampus-rest-api/SKILL.md) | API endpoints |
| [pcampus-testing](.cursor/skills/pcampus-testing/SKILL.md) | Tests & CI |
| [pcampus-code-review](.cursor/skills/pcampus-code-review/SKILL.md) | Before done / PR |
| [pcampus-deploy-staging](.cursor/skills/pcampus-deploy-staging/SKILL.md) | Staging deploy |
| [pcampus-incident-response](.cursor/skills/pcampus-incident-response/SKILL.md) | Incidents |
| [pcampus-db-migration](.cursor/skills/pcampus-db-migration/SKILL.md) | Schema migrations |

Catalog & versions: [docs/04-agents/skills-library.md](docs/04-agents/skills-library.md)

Add `{project}-*` skills only for project-specific conventions; register in the catalog.

## Cursor rules

Persistent constraints: [.cursor/rules/](.cursor/rules/) — `core`, `governance`, `security`, `guidelines`, stack-specific `{stack}.mdc`.

## CI & GitHub hard guards

| Asset | Purpose |
|-------|---------|
| [docs/06-workflows/github-governance.md](docs/06-workflows/github-governance.md) | Protected branches + setup |
| [.github/workflows/governance.yml](.github/workflows/governance.yml) | Goal reference, commit format, secret scan |
| [.github/workflows/ci.yml](.github/workflows/ci.yml) | App test/lint |
| [.github/pull_request_template.md](.github/pull_request_template.md) | PR checklist |

Copy [.github/ci-config.example.yml](.github/ci-config.example.yml) → `ci-config.yml` at G-001 bootstrap.

Run locally: `bash scripts/ci/governance-check.sh` · `bash scripts/ci/app-ci.sh`

**Existing projects:** [scripts/upgrade-os.sh](scripts/upgrade-os.sh) — [upgrade-agent-os.md](docs/06-workflows/upgrade-agent-os.md)
