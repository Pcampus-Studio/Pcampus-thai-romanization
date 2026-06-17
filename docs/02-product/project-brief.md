# Project brief — PCP Thai Romanization

> **Status:** Active

## Vision

A rule-based Thai → Latin romanization library for developers who need consistent, offline transliteration without ML dependencies — usable as an npm package, CLI, or embedded module.

## Problem

Thai romanization is inconsistent across tools. Many solutions rely on hardcoded word lists or opaque ML models, making them hard to audit, extend, or run in constrained environments.

## Solution

`@pcampus/thai-romanization` uses morpheme trie segmentation, orthography rules, and layered vocabulary packs (core, geography, calendar, loanwords) to produce predictable romanization. The API supports word-level, sentence-level, batch, detailed debug output, and reverse lookup.

## Is / Is not

| Is | Is not |
|----|--------|
| Rule-based romanization library | Machine-learning transliteration |
| npm package + CLI | Full NLP pipeline |
| Extensible vocabulary packs | Per-word hardcoded overrides in core |
| Offline, deterministic | Cloud API service (v1) |

## Target users

Developers building Thai-language tools — search indexes, education apps, data pipelines, or admin UIs — who need programmatic romanization with TypeScript types and test coverage.

## Core user journey (high level)

1. Install `@pcampus/thai-romanization` via npm
2. Call `romanize()` or `romanizeSentence()` with optional tone/separator settings
3. Optionally import vocabulary packs or use `reverseLookup()` for Latin → Thai candidates

## Technical direction

| Area | Choice |
|------|--------|
| Library | TypeScript, ESM + CJS via tsup |
| Tests | Vitest (303 tests) |
| Demo | Next.js playground in `code/playground/` |
| Runtime | Node.js ≥ 18 |

## Related

- [mvp-scope.md](mvp-scope.md)
- [../03-architecture/overview.md](../03-architecture/overview.md)
- [../../code/README.md](../../code/README.md)
