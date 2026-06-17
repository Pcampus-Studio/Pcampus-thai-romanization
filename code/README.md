# @pcampus/thai-romanization

Rule-based Thai → Latin romanization library. No per-word hardcoded overrides in the core pipeline — segmentation uses a morpheme trie, orthography rules, and lookup tables for loanwords and provinces.

📖 **คู่มือการใช้งานฉบับเต็ม:** [USAGE.md](./USAGE.md)

## Install

```bash
npm install @pcampus/thai-romanization
```

## Quick start

```ts
import { romanize, romanizeSentence } from '@pcampus/thai-romanization';

romanize('สวัสดี');           // 'sawatdi'
romanize('กษัตริย์');         // 'kasatri'
romanize('มกราคม');           // 'mokkarakhom'

romanizeSentence('สวัสดี ครับ'); // 'sawatdi khrap'
```

## API

| Function | Description |
|----------|-------------|
| `romanize(text, options?)` | Romanize a single word or compound |
| `romanizeSentence(text, options?)` | Romanize text, preserving spaces and punctuation |
| `romanizeDetailed(text, options?)` | Full pipeline debug output |
| `romanizeBatch(words[], options?)` | Romanize multiple words |
| `reverseLookup(latin)` | Latin → Thai candidates (vocabulary, morphemes, loanwords, provinces) |
| `segment(text)` | Trie-based word segmentation |
| `splitIntoSyllables(text)` | Syllable-level split |
| `getRomanizationUnits(text)` | Internal romanization units |

### Options

```ts
romanize('สวัสดี', { separator: '-', tone: 'number' });
// separator: '' | '-' | ' '  (default: '')
// tone: 'omit' | 'diacritic' | 'number'  (default: 'omit')
```

## Vocabulary packs

The trie dictionary is split into layered packs:

```ts
import { coreVocab, geoVocab, calendarVocab, mergeVocabulary } from '@pcampus/thai-romanization';

const custom = mergeVocabulary(coreVocab, geoVocab);
```

Optional subpath imports:

```ts
import { geoVocab } from '@pcampus/thai-romanization/packs/geo';
import { calendarVocab } from '@pcampus/thai-romanization/packs/calendar';
import { coreVocab } from '@pcampus/thai-romanization/packs/core';
```

## CLI

```bash
npx thai-romanize "สวัสดี"
npx thai-romanize --sentence "สวัสดี ครับ"
npx thai-romanize --reverse software
npx thai-romanize --separator - --tone number "มกราคม"
```

## Pipeline

```
romanize(text, options?)
  ├─ loanword?     → LOANWORD_MAP
  ├─ province?     → PROVINCE_ROMAN
  └─ segment + rules
       ├─ applySyllableBoundaries()
       ├─ Trie longest-match (vocabulary packs)
       ├─ monthRules (-าคม → khom/akhom)
       └─ applyTone()
```

## Development

```bash
npm test          # vitest
npm run build     # tsup → dist/
npm run playground  # Next.js demo UI
```

## Publish

```bash
npm login
npm publish
```

## License

MIT
