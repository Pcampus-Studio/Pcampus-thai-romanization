# Goal acceptance template

Goals use a **split-file** layout to keep token use low:

- [../07-backlog/goals.md](../07-backlog/goals.md) — **lean index** (one row per goal).
- `../07-backlog/goals/G-xxx.md` — **full spec** for each goal.

For a new goal: copy [../07-backlog/goals/_template.md](../07-backlog/goals/_template.md) → `goals/G-xxx.md`, fill it, then add **one row** to the index table.

For testable behavior, also create [acceptance/G-xxx.md](acceptance/_template.md) when promoting to `ready`.

## Status reference

| Status | Meaning | Agent |
|--------|---------|-------|
| `draft` / `planned` | Spec only | Edit goal doc — no code |
| `ready` | Approved to start | Wait for **"ทำ G-xxx"** |
| `in_progress` | Active work | Implement in touch map |
| `review` | Ready for human | Report diff; code-review skill |
| `blocked` | External dependency | Stop; document blocker |
| `approved` | Human signed off | Commit if asked; then close |
| `done` | Closed | Do not re-implement |

## Writing good acceptance criteria

| Bad | Good |
|-----|------|
| “Improve API” | “`GET /health` returns 200 with `{status: ok}`” |
| “Nice UI” | “Login form validates email before submit (unit test)” |
| “Add tests” | “`auth_test.go` covers invalid token rejection” |

## Related

- [acceptance/README.md](acceptance/README.md) — scenario contracts
- [../06-workflows/definition-of-done.md](../06-workflows/definition-of-done.md)
- [../07-backlog/goals.md](../07-backlog/goals.md)
