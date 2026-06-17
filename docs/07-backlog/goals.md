# Goal backlog (index)

> Pick **one** `ready` goal per dev round. This file is a **lean index** only — full spec for each goal lives in [`goals/G-xxx.md`](goals/). Read the index here **plus the one goal file you're working on** — not the whole backlog. Keeps token use low as the backlog grows.

## Status flow

```text
draft → ready → in_progress → review → approved → done
              ↘ blocked ↗
```

**Agent rule:** Only execute **`ready`** goals. Never self-start. Never mark **`done`** without human **`approved`**.

## Active queue

| Goal | Title | Status | Depends on | Spec |
|------|-------|--------|------------|------|
| G-001 | Project bootstrap | planned | — | [G-001](goals/G-001.md) |
| G-004 | {Next goal title} | planned | G-001 | [G-004](goals/G-004.md) |

## Done (archived)

Specs moved to [`goals/_archive/`](goals/_archive/) to keep active files small. Permanent record: [changelog-goals.md](changelog-goals.md).

| Goal | Title | Closed | Spec |
|------|-------|--------|------|
| G-000 | Agent OS — CI & PR governance hardening | 2026-05-27 | [G-000](goals/_archive/G-000.md) |
| G-002 | Agent OS — upgrade-os.sh for existing projects | 2026-05-27 | [G-002](goals/_archive/G-002.md) |
| G-003 | Agent OS — rename product branding | 2026-05-27 | [G-003](goals/_archive/G-003.md) |

## How to read this backlog (token-efficient)

1. Scan the **Active queue** for the highest `ready` goal whose deps are `done`.
2. Open **only** that `goals/G-xxx.md` (+ its acceptance contract). Don't load other goal files.
3. Pull a dependency's goal file only if you actually need its detail.
4. `done` goals are reference-only — don't re-read unless a new goal builds on them.

## Add a goal

1. Copy [`goals/_template.md`](goals/_template.md) → `goals/G-xxx.md` and fill it.
2. Add **one row** to the **Active queue** table above (`draft` / `planned` by default).
3. The row's `Status` is the single source of truth for the goal's state — keep it in sync with the goal file header.

## Archive

Closed goals live in [`goals/_archive/`](goals/_archive/) — reference-only, don't re-read unless a new goal builds on them. When the Done table gets long, drop old rows from it (the file + changelog remain the permanent record). Optionally bucket by period, e.g. `goals/_archive/2026Q2/`.
