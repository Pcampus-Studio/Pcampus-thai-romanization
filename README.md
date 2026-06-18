# PCP Thai Romanization

A rule-based TypeScript library for **Thai → Latin romanization** — offline, deterministic, no ML dependencies.

Product code lives in [`code/`](code/) as the npm package `@pcampus/thai-romanization`.

```text
สวัสดี  →  sawatdi
กษัตริย์  →  kasatri
มกราคม   →  mokkarakhom
```

---

## Why this matters

Thai text does not map cleanly to Latin keyboards, URLs, or search indexes. Most tools either hardcode word lists or rely on opaque ML models — hard to audit, extend, or run offline.

This library gives developers a **predictable, rule-based romanization layer** they can embed anywhere. Better segmentation and vocabulary directly improve real products.

### Use cases

| Use case | How the library helps | Example |
|----------|----------------------|---------|
| **URL slugs** | Stable Latin paths from Thai titles | `กาญจนบุรี` → `kanchanaburi` |
| **Search indexes** | Index Thai + Latin so users can search either script | `romanize()` + `reverseLookup()` |
| **Bulk data pipelines** | Romanize thousands of names or places in one pass | `romanizeBatch(provinces)` |
| **Admin / forms** | Show Latin alongside Thai for international users | `romanize(personName)` |
| **Education apps** | Pronunciation hints, reading aids, tone display | `{ tone: 'diacritic' }` or `'number'` |
| **CMS & publishing** | Auto-generate metadata, tags, or filenames from Thai content | `romanizeSentence(articleTitle)` |
| **Debugging bad output** | Inspect how words are segmented before fixing rules | `romanizeDetailed(text)` |

### Quick examples

**URL slug**

```ts
import { romanize } from '@pcampus/thai-romanization';

const slug = romanize('กาญจนบุรี').toLowerCase(); // 'kanchanaburi'
```

**Two-way search index**

```ts
import { romanize, reverseLookup } from '@pcampus/thai-romanization';

const latin = romanize('ซอฟต์แวร์');           // 'software'
const thaiCandidates = reverseLookup('software'); // ['ซอฟต์แวร์', …]
```

**Bulk import**

```ts
import { romanizeBatch } from '@pcampus/thai-romanization';

romanizeBatch(['กรุงเทพ', 'เชียงใหม่', 'ภูเก็ต']);
// ['krungthep', 'chiangmai', 'phuket']
```

### What contributors improve

Every fix to segmentation, vocabulary packs, or orthography rules makes the library more useful across all of the above. See [docs/07-backlog/goals.md](docs/07-backlog/goals.md) for planned work and [code/USAGE.md](code/USAGE.md) for the full API guide.

---

## `code/` layout

```text
code/
├── src/                    # Library source
│   ├── index.ts            # Public API — stable exports
│   ├── romanizer.ts        # romanize(), syllable rules, cache
│   ├── sentence.ts         # romanizeSentence(), sentence tokenization
│   ├── detailed.ts         # romanizeDetailed() — debug output
│   ├── batch.ts            # romanizeBatch()
│   ├── reverse.ts          # reverseLookup() — Latin → Thai
│   ├── segmenter.ts        # Trie longest-match segmentation
│   ├── dictionary.ts       # Trie dictionary
│   ├── vocabulary.ts       # Merges vocabulary packs into trie
│   ├── orthography.ts      # Normalize, syllable boundaries
│   ├── morphemeRoman.ts    # Morpheme-level roman rules
│   ├── tone.ts             # Tone marks (omit / diacritic / number)
│   ├── loanwords.ts        # Loanwords (e.g. software → ซอฟต์แวร์)
│   ├── provinceRoman.ts    # Province names
│   ├── monthRules.ts       # Month suffix rules (-าคม → khom)
│   ├── constants.ts        # Consonants, vowels, tone marks
│   ├── types.ts            # RomanizeOptions, ToneMode, …
│   ├── cli.ts              # `thai-romanize` binary
│   └── packs/              # Layered vocabulary
│       ├── core.ts         # Core words
│       ├── geo.ts          # Geography
│       ├── calendar.ts     # Calendar / months
│       ├── article.ts      # Article vocab (internal)
│       └── index.ts        # mergeVocabulary, defaultVocabulary
├── test/                   # Vitest — unit + regression tests
├── playground/             # Next.js demo UI
├── dist/                   # Build output (tsup) — not committed
├── package.json
├── README.md               # API summary
└── USAGE.md                # Full usage guide (Thai)
```

### Romanization pipeline

```text
romanize(text)
  ├─ loanword?     → LOANWORD_MAP
  ├─ province?     → PROVINCE_ROMAN
  └─ segment + rules
       ├─ applySyllableBoundaries()
       ├─ Trie longest-match (vocabulary packs)
       ├─ monthRules (-าคม → khom/akhom)
       └─ applyTone()
```

Architecture details: [docs/03-architecture/overview.md](docs/03-architecture/overview.md)

---

## Quick start

### Install

```bash
cd code
npm install
npm run build
```

### Use in code

```ts
import { romanize, romanizeSentence } from '@pcampus/thai-romanization';

romanize('สวัสดี');              // 'sawatdi'
romanize('กษัตริย์');            // 'kasatri'
romanizeSentence('สวัสดี ครับ'); // 'sawatdi khrap'

romanize('มกราคม', { separator: '-', tone: 'number' });
```

### CLI

```bash
cd code
npx thai-romanize "สวัสดี"
npx thai-romanize --sentence "สวัสดี ครับ"
npx thai-romanize --reverse software
```

### Playground

```bash
cd code
npm run playground
```

Open `http://localhost:3000` for an interactive romanization demo.

---

## Public API

| Function | Description |
|----------|-------------|
| `romanize(text, options?)` | Romanize a word or compound |
| `romanizeSentence(text, options?)` | Romanize a sentence — preserves spaces and punctuation |
| `romanizeDetailed(text, options?)` | Full output with debug segments |
| `romanizeBatch(words[], options?)` | Romanize multiple words |
| `reverseLookup(latin)` | Latin → Thai candidates |
| `segment(text)` | Word segmentation via trie |
| `splitIntoSyllables(text)` | Syllable-level split |

**Options:** `separator` (`''` | `'-'` | `' '`) · `tone` (`'omit'` | `'diacritic'` | `'number'`)

**Vocabulary packs:**

```ts
import { coreVocab, geoVocab, mergeVocabulary } from '@pcampus/thai-romanization';
import { geoVocab } from '@pcampus/thai-romanization/packs/geo';
```

Full guide: [code/USAGE.md](code/USAGE.md) · API summary: [code/README.md](code/README.md)

---

## Development

```bash
cd code
npm test          # vitest
npm run lint      # tsc --noEmit
npm run build     # tsup → dist/ (ESM + CJS + .d.ts)
```

| Item | Detail |
|------|--------|
| Runtime | Node.js ≥ 18 |
| Build | [tsup](https://tsup.egoist.dev/) |
| Tests | [Vitest](https://vitest.dev/) |
| Demo | Next.js 16 (`code/playground/`) |
| License | MIT |

---

## Contributing

We welcome contributions — especially fixes to romanization rules, vocabulary packs, and test coverage. Every improvement helps slug generation, search indexes, and every other use case above.

### 1. Get set up

```bash
git clone https://github.com/Pcampus-Studio/Pcampus-thai-romanization.git
cd Pcampus-thai-romanization/code
npm install
npm test && npm run lint && npm run build
```

Open the **repo root** (not `code/` alone) in your editor so you can see `docs/` and `AGENTS.md`.

Requirements: **Node.js ≥ 18**

### 2. Find something to work on

| Where to look | What you'll find |
|---------------|------------------|
| [docs/07-backlog/goals.md](docs/07-backlog/goals.md) | Active goals (`G-xxx`) — pick one marked **`ready`** |
| [docs/07-backlog/goals/](docs/07-backlog/goals/) | Full spec, touch map, and test plan per goal |
| [code/test/](code/test/) | Existing regression tests — good templates for new cases |
| Issues / discussions | Bug reports for wrong romanization output |

This repo uses **goal-driven development**: work should map to a goal when possible. Ask maintainers to set a goal to `ready` before starting larger changes.

### 3. Common contribution types

| Change | Where to edit | Don't forget |
|--------|---------------|--------------|
| Wrong word output | `code/src/romanizer.ts`, `morphemeRoman.ts`, `monthRules.ts` | Add a test in `code/test/` |
| Missing vocabulary | `code/src/packs/*.ts` | Test with `romanize()` and `segment()` |
| Loanword / province | `code/src/loanwords.ts`, `provinceRoman.ts` | Check `reverseLookup()` if bidirectional |
| Segmentation bug | `code/src/segmenter.ts`, `orthography.ts` | Use `romanizeDetailed()` to inspect units |
| CLI behaviour | `code/src/cli.ts` | Manual smoke test + test if logic changes |
| Playground UI | `code/playground/` | `npm run playground` |

**Debugging tip** — inspect how a word is processed before changing rules:

```ts
import { romanizeDetailed } from '@pcampus/thai-romanization';

const detail = romanizeDetailed('คำที่สงสัย');
console.log(detail.units, detail.segments, detail.confidence);
```

### 4. Run checks before opening a PR

```bash
cd code
npm test          # all Vitest tests must pass
npm run lint      # TypeScript check
npm run build     # ensure dist builds
```

Optional: try the playground (`npm run playground`) if you changed user-visible behaviour.

### 5. Open a pull request

1. Create a branch from `main`
2. Keep changes scoped to **one goal** — no drive-by refactors
3. Reference the goal in your PR (e.g. **G-004**) using the [PR template](.github/pull_request_template.md)
4. Commit message format: `G-xxx: imperative description` (e.g. `G-004: fix month suffix for พฤศจิกายน`)

Maintainers review and merge — agents do not merge to `main`.

### 6. What makes a good contribution

- **Reproducible** — include the Thai input, expected output, and a failing test
- **Minimal** — smallest change that fixes the rule or adds the vocab entry
- **Tested** — non-trivial logic always gets a Vitest case
- **In scope** — see [mvp-scope.md](docs/02-product/mvp-scope.md) for v1 boundaries (no ML, no REST API unless a goal says so)

### Further reading

| Doc | Purpose |
|-----|---------|
| [code/USAGE.md](code/USAGE.md) | Full API guide with examples |
| [docs/02-product/project-brief.md](docs/02-product/project-brief.md) | Product vision and constraints |
| [docs/06-workflows/team-workflow.md](docs/06-workflows/team-workflow.md) | How the team works with goals and agents |
| [docs/06-workflows/definition-of-done.md](docs/06-workflows/definition-of-done.md) | Quality bar before a goal is closed |

Questions or ideas for a new goal? Open an issue or discussion on GitHub.

---

## Repository layout

This repo uses [Pcampus Agent OS](https://github.com/Pcampus-Studio/Pcampus-Agent-OS) for development workflow. Product code is in `code/`; specs, goals, and agent rules live at the repo root.

```text
{repo}/
├── code/           ← @pcampus/thai-romanization (library + CLI + playground)
├── docs/           ← product spec, architecture, goals, ADR
├── AGENTS.md       ← AI agent entry point
├── .cursor/        ← rules + pcampus skills
└── .github/        ← CI + governance workflows
```

| Doc | Contents |
|-----|----------|
| [docs/02-product/project-brief.md](docs/02-product/project-brief.md) | Vision and product scope |
| [docs/02-product/mvp-scope.md](docs/02-product/mvp-scope.md) | MVP in / out |
| [docs/07-backlog/goals.md](docs/07-backlog/goals.md) | Goals (G-001, G-002, …) |
| [AGENTS.md](AGENTS.md) | Agent guide for each session |

---

## What this library is / is not

| Is | Is not |
|----|--------|
| Rule-based romanization library | ML transliteration |
| npm package + CLI | Cloud API service |
| Offline, deterministic | Full NLP pipeline |
| Extensible vocabulary packs | Per-word hardcoded overrides in core |

---

Maintained by **Pcampus Studio**
