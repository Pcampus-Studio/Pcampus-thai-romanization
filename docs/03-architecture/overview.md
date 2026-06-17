# Architecture overview

## System context

```text
┌─────────────────────────────────────────────────────┐
│  Consumers (apps, scripts, playground)              │
│  import @pcampus/thai-romanization                  │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│  code/ — @pcampus/thai-romanization (library)     │
│                                                     │
│  index.ts ──► romanizer, sentence, detailed, batch  │
│           ──► segmenter, reverse, orthography       │
│           ──► packs (core, geo, calendar)           │
│                                                     │
│  cli.ts ──► thai-romanize binary                    │
│  playground/ ──► Next.js demo UI                    │
└─────────────────────────────────────────────────────┘
```

## Layers

| Layer | Responsibility |
|-------|----------------|
| **Public API** | `index.ts` — stable exports |
| **Romanization** | `romanizer.ts`, `tone.ts`, `morphemeRoman.ts` — syllable rules |
| **Segmentation** | `segmenter.ts`, `dictionary.ts`, `vocabulary.ts` — trie + packs |
| **Orthography** | `orthography.ts`, `loanwords.ts`, `provinceRoman.ts`, `monthRules.ts` |
| **Sentence** | `sentence.ts` — tokenization + punctuation preservation |
| **Build** | tsup → `dist/` (ESM + CJS + `.d.ts`) |

## Key choices

| Area | Choice |
|------|--------|
| Language | TypeScript |
| Build | tsup |
| Tests | Vitest |
| Demo | Next.js 16 (playground) |
| Package | npm, dual ESM/CJS |

## Related

- [folder-structure.md](folder-structure.md)
- [../02-product/project-brief.md](../02-product/project-brief.md)
- [../../code/README.md](../../code/README.md)
