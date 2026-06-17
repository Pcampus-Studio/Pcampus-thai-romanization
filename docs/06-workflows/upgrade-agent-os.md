# Upgrade Pcampus Agent OS (existing projects)

> **For humans.** New projects use [bootstrap.sh](../../scripts/bootstrap.sh) instead.

When **Pcampus Agent OS** ships a new framework version (governance, skills, CI), sync **framework layer only** into running projects — without overwriting product docs or `code/`.

## When to use

| Scenario | Command |
|----------|---------|
| **New project** | `./scripts/bootstrap.sh /path/to/repo "Name"` |
| **Existing project** | `./scripts/upgrade-os.sh /path/to/repo` |

## Quick start

From a clone of the latest **Pcampus Agent OS**:

```bash
# Preview changes
./scripts/upgrade-os.sh /path/to/my-existing-app --dry-run

# Apply
./scripts/upgrade-os.sh /path/to/my-existing-app --yes
```

Or from inside the target repo (if `upgrade-os.sh` already exists from a prior upgrade):

```bash
/path/to/pcampus-agent-os/scripts/upgrade-os.sh . --yes
```

## What gets overwritten (framework)

- `.cursor/skills/pcampus-*/` (with `--delete` for removed skills)
- `.cursor/rules/` — `governance`, `security`, `core`, `guidelines`, `commits`, `testing`, `stack-*.example.mdc`
- `.github/workflows/`, PR template, `ci-config.example.yml`
- `scripts/ci/`, `scripts/bootstrap.sh`, `scripts/upgrade-os.sh`
- `docs/04-agents/`, `docs/06-workflows/`, `design-spec.md`
- `docs/02-product/acceptance-template.md`, `docs/02-product/acceptance/`
- `docs/assets/human-agent-cycle.png`

## What is NOT touched (product)

- `code/`
- `docs/02-product/project-brief.md`, `mvp-scope.md`
- `docs/03-architecture/overview.md`, `api/`, `data/`
- `docs/05-decisions/` (your ADRs)
- `docs/07-backlog/goals.md`, `changelog-goals.md`
- `AGENTS.md`, `README.md`, `docs/00-index.md`
- `.github/ci-config.yml`
- `.cursor/rules/{stack}.mdc` (non-example)
- `.cursor/skills/{project}-*/`

## Created only if missing

- `docs/00-project-snapshot.md`
- `docs/07-backlog/changelog.md`

## After upgrade — manual merge

1. **AGENTS.md** — keep `{PROJECT_NAME}`, mission, `{TEST_COMMANDS}`; ensure governance/CI sections present
2. **goals.md** — keep your goal queue; add status flow (`review` → `approved` → `done`) if missing
3. **00-project-snapshot.md** — fill architecture, active goals, constraints
4. **ci-config.yml** — if missing, `cp .github/ci-config.example.yml .github/ci-config.yml` and set commands
5. Open a PR: `G-xxx: upgrade Pcampus Agent OS`

## Version tracking

After sync, target repo gets `.pcampus-os-version` (Agent OS git tag/commit + timestamp).

## Recommended goal

Add a backlog row before upgrading production repos:

```markdown
### G-xxx: Upgrade Pcampus Agent OS

**In:** run upgrade-os.sh, merge AGENTS.md/goals.md, verify CI
**Touch map:** framework paths + manual merges listed above
```

## Related

- [github-governance.md](github-governance.md)
- [team-workflow.md](team-workflow.md)
- [../../scripts/bootstrap.sh](../../scripts/bootstrap.sh)
- [../../scripts/upgrade-os.sh](../../scripts/upgrade-os.sh)
