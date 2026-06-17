# Project snapshot

> **TL;DR for agents.** Update when architecture, active goals, or constraints change.  
> Reload this at the start of every session before EXECUTE.

## Architecture (one paragraph)

Monorepo-style layout: Agent OS docs at repo root; product code in `code/` as `@pcampus/thai-romanization` — a TypeScript library (tsup → ESM/CJS) with morpheme trie segmentation, orthography rules, vocabulary packs, CLI, and a Next.js playground. No backend or database.

## Active goals

| ID | Status | Summary |
|----|--------|---------|
| G-001 | review | Library bootstrap — source, build, CI |
| G-004 | planned | Next feature goal (TBD) |

## Constraints

- MVP scope: [02-product/mvp-scope.md](02-product/mvp-scope.md)
- Stack: TypeScript + Vitest + tsup — see [03-architecture/overview.md](03-architecture/overview.md)
- Tests: `cd code && npm test` (303 tests)

## Current APIs (high level)

| Area | Doc |
|------|-----|
| Library API | [../../code/README.md](../../code/README.md) |
| HTTP API | *(none — library only)* |

## Known issues / tech debt

| Issue | Goal / note |
|-------|-------------|
| Strict `tsc` on full src needs type fixes | Use `tsconfig.build.json` for lint/build |
| npm publish not configured | Future goal |

## Last updated

2026-06-17 — G-001 library bootstrap implemented
