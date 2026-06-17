# MVP scope

> **Status:** Locked for v1 library bootstrap (G-001).

## MVP goal

Ship `@pcampus/thai-romanization` as a publishable npm library with core API, vocabulary packs, CLI, tests, and build pipeline.

## In scope (v1)

- [x] Core API: `romanize`, `romanizeSentence`, `romanizeDetailed`, `romanizeBatch`, `reverseLookup`, `segment`
- [x] Vocabulary packs: core, geo, calendar
- [x] CLI (`thai-romanize`)
- [x] TypeScript types + ESM/CJS build (`dist/`)
- [x] Vitest test suite (303 tests)
- [x] Next.js playground demo
- [x] CI test/lint in `code/`

## Out of scope (v1)

- npm publish to registry (separate goal)
- REST API service
- ML-based romanization
- Mobile SDK wrappers

## Quality bar

- [x] Tests and linter pass per [../06-workflows/definition-of-done.md](../06-workflows/definition-of-done.md)
- [x] Goal-driven delivery per [../06-workflows/dev-loop.md](../06-workflows/dev-loop.md)

## Related

- [project-brief.md](project-brief.md)
- [../07-backlog/goals.md](../07-backlog/goals.md)
