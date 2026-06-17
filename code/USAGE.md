# คู่มือการใช้งาน @pcampus/thai-romanization

คู่มือนี้สำหรับผู้ที่ติดตั้งหรือ clone library นี้ไปใช้งาน — อธิบาย API ทั้งหมด พร้อมตัวอย่างโค้ด

## สารบัญ

1. [ติดตั้ง](#ติดตั้ง)
2. [เริ่มต้นใช้งาน](#เริ่มต้นใช้งาน)
3. [ฟังก์ชันหลัก](#ฟังก์ชันหลัก)
4. [ตัวเลือก (Options)](#ตัวเลือก-options)
5. [ฟังก์ชันระดับประโยค](#ฟังก์ชันระดับประโยค)
6. [Reverse Lookup](#reverse-lookup)
7. [Debug / Low-level API](#debug--low-level-api)
8. [Vocabulary Packs](#vocabulary-packs)
9. [CLI](#cli)
10. [TypeScript Types](#typescript-types)
11. [ตัวอย่าง Use Case](#ตัวอย่าง-use-case)
12. [ข้อจำกัดและหมายเหตุ](#ข้อจำกัดและหมายเหตุ)

---

## ติดตั้ง

### จาก npm (เมื่อ publish แล้ว)

```bash
npm install @pcampus/thai-romanization
```

### จากโปรเจกต์ local

```bash
# clone หรือ download มาแล้ว
cd Pcampus-thai-romanization
npm install
npm run build
```

จากโปรเจกต์อื่น อ้างอิง path:

```bash
npm install /path/to/Pcampus-thai-romanization
```

### Import ในโค้ด

**ESM (แนะนำ)**

```ts
import { romanize, romanizeSentence } from '@pcampus/thai-romanization';
```

**CommonJS**

```js
const { romanize, romanizeSentence } = require('@pcampus/thai-romanization');
```

---

## เริ่มต้นใช้งาน

```ts
import { romanize, romanizeSentence } from '@pcampus/thai-romanization';

// คำเดียว / คำประสม
romanize('สวัสดี');        // 'sawatdi'
romanize('กษัตริย์');      // 'kasatri'
romanize('มกราคม');        // 'mokkarakhom'
romanize('กาญจนบุรี');     // 'kanchanaburi'
romanize('ซอฟต์แวร์');     // 'software' (loanword)

// ประโยค — คงช่องว่างและเครื่องหมายวรรคตอน
romanizeSentence('สวัสดี ครับ');  // 'sawatdi khrap'
romanizeSentence('Hello สวัสดี!'); // 'Hello sawatdi!'
```

---

## ฟังก์ชันหลัก

### `romanize(text, options?)`

แปลงข้อความไทย (คำเดียวหรือคำประสม) เป็น Latin

```ts
import { romanize } from '@pcampus/thai-romanization';

romanize('การจราจร');   // 'kancharachon'
romanize('ใส่ใจ');      // 'saichai'
romanize('มังกร');      // 'mangkon'
romanize('ผู้ใช้');     // 'phuchai'
romanize('ตำรวจ');      // 'tamruat'
```

**เหมาะกับ:** แปลงชื่อคน, ชื่อสถานที่, คำศัพท์, URL slug, search index

---

### `romanizeSentence(text, options?)`

แปลงประโยคทั้งหมด โดย:

- แปลงเฉพาะส่วนที่เป็นคำไทย
- คงช่องว่าง, ตัวเลข, อักษร Latin, เครื่องหมายวรรคตอน

```ts
import { romanizeSentence } from '@pcampus/thai-romanization';

romanizeSentence('วันนี้อากาศดีมาก');
// 'wanniaakatdimak'

romanizeSentence('กรุงเทพ กับ เชียงใหม่');
// 'krungthep kap chiangmai'
```

---

### `romanizeBatch(words[], options?)`

แปลงหลายคำพร้อมกัน คืนค่าเป็น array

```ts
import { romanizeBatch } from '@pcampus/thai-romanization';

romanizeBatch(['สวัสดี', 'ครับ', 'กาญจนบุรี']);
// ['sawatdi', 'khrap', 'kanchanaburi']
```

**เหมาะกับ:** ประมวลผล list ชื่อจังหวัด, รายชื่อลูกค้า, bulk import

---

### `romanizeDetailed(text, options?)`

คืนผลลัพธ์พร้อมข้อมูล debug สำหรับดู pipeline

```ts
import { romanizeDetailed } from '@pcampus/thai-romanization';

const result = romanizeDetailed('มกราคม');

console.log(result);
// {
//   text: 'มกราคม',
//   tokens: ['มกราคม'],
//   units: ['มกรา', 'คม'],
//   segments: [
//     { thai: 'มกรา', roman: 'mokkar' },
//     { thai: 'คม', roman: 'akhom' }
//   ],
//   confidence: 'high'
// }
```

| Field | ความหมาย |
|-------|----------|
| `text` | ข้อความต้นทาง |
| `tokens` | ผลจาก Trie segmentation |
| `units` | หน่วยก่อน romanize สุดท้าย |
| `segments` | คู่ `{ thai, roman }` แต่ละ unit |
| `confidence` | `'high'` \| `'medium'` \| `'low'` |

---

## ตัวเลือก (Options)

ทุกฟังก์ชัน romanize รองรับ `RomanizeOptions`:

```ts
interface RomanizeOptions {
  separator?: '' | '-' | ' ';   // default: ''
  tone?: 'omit' | 'diacritic' | 'number';  // default: 'omit'
}
```

### `separator` — ตัวคั่นระหว่าง morpheme/syllable

```ts
romanize('มกราคม');                    // 'mokkarakhom'
romanize('มกราคม', { separator: '-' }); // 'mokkar-akhom'
romanize('มกราคม', { separator: ' ' }); // 'mokkar akhom'
```

### `tone` — รูปแบบวรรณยุกต์

```ts
romanize('สวัสดี', { tone: 'omit' });      // 'sawatdi' (default)
romanize('สวัสดี', { tone: 'number' });    // ใส่เลขวรรณยุกต์
romanize('สวัสดี', { tone: 'diacritic' }); // ใส่ diacritic mark
```

---

## ฟังก์ชันระดับประโยค

### `tokenizeSentence(text)`

แยกประโยคเป็น token (คำไทย + ช่องว่าง/เครื่องหมาย)

```ts
import { tokenizeSentence } from '@pcampus/thai-romanization';

tokenizeSentence('สวัสดี ครับ!');
// ['สวัสดี', ' ', 'ครับ', '!']
```

### `isThaiWord(part)`

เช็คว่า token เป็นคำไทยหรือไม่

```ts
import { isThaiWord } from '@pcampus/thai-romanization';

isThaiWord('สวัสดี');  // true
isThaiWord(' ');       // false
isThaiWord('Hello');   // false
```

---

## Reverse Lookup

### `reverseLookup(latin)`

ค้นหา Latin → คำไทยที่เป็นไปได้

ค้นจาก:

- loanwords (`software` → `ซอฟต์แวร์`)
- ชื่อจังหวัด (`kanchanaburi` → `กาญจนบุรี`)
- morphemes ใน dictionary
- คำใน vocabulary packs

```ts
import { reverseLookup } from '@pcampus/thai-romanization';

reverseLookup('software');
// ['ซอฟต์แวร์']

reverseLookup('kanchanaburi');
// ['กาญจนบุรี']

reverseLookup('samut');
// ['สมุทร']

reverseLookup('notexist');
// []
```

> หมายเหตุ: reverse lookup ไม่ใช่การแปลกลับ 100% — คืนเฉพาะคำที่อยู่ใน dictionary/lookup tables

---

## Debug / Low-level API

สำหรับผู้ที่ต้องการดูหรือปรับ pipeline ภายใน

### `segment(text)`

ตัดคำด้วย Trie (longest-match)

```ts
import { segment } from '@pcampus/thai-romanization';

segment('นครราชสีมา');
// ['นครราชสีมา'] หรือ morpheme ย่อย ตาม vocabulary
```

### `splitIntoSyllables(word)`

แยกพยางค์

```ts
import { splitIntoSyllables } from '@pcampus/thai-romanization';

splitIntoSyllables('กษัตริย์');
// ['ก', 'ษัตริย์'] หรือตาม boundary rules
```

### `romanizeSyllable(syllable)` / `romanizeUnit(unit, options?)`

แปลงพยางค์หรือ unit เดียว

```ts
import { romanizeSyllable, romanizeUnit } from '@pcampus/thai-romanization';

romanizeSyllable('มกรา');           // 'mokkar'
romanizeUnit('คม', { tone: 'omit' }); // 'khom'
```

### `getRomanizationUnits(text)`

ดู internal units ก่อนรวมผลลัพธ์สุดท้าย

```ts
import { getRomanizationUnits } from '@pcampus/thai-romanization';

getRomanizationUnits('มกราคม');
// ['มกรา', 'คม']
```

### `computeConfidence(text, tokens, units)`

ประเมินความมั่นใจของผลลัพธ์

```ts
import { computeConfidence, segment, getRomanizationUnits } from '@pcampus/thai-romanization';

const text = 'กาญจนบุรี';
const tokens = segment(text);
const units = getRomanizationUnits(text);
computeConfidence(text, tokens, units); // 'high'
```

### Orthography helpers

```ts
import {
  applySyllableBoundaries,
  applySegmentTransforms,
  normalizeOrthography,
} from '@pcampus/thai-romanization';

applySyllableBoundaries('นครราชสีมา');
// 'นคร.ราชสีมา'

normalizeOrthography('กษัตริย์');
// ผ่าน boundary rules + Sanskrit transforms
```

---

## Vocabulary Packs

Dictionary แยกเป็นชั้น ๆ เพื่อให้เลือกใช้หรือรวมเองได้

| Pack | เนื้อหา |
|------|---------|
| `coreVocab` | คำพื้นฐาน, compounds, Sanskrit morphemes |
| `calendarVocab` | วัน, เดือน, suffix เดือน |
| `geoVocab` | morphemes ภูมิศาสตร์ + ชื่อจังหวัด |
| `defaultVocabulary` | รวมทุก pack (ใช้เป็น default ของ Trie) |

### Import จาก main package

```ts
import {
  coreVocab,
  geoVocab,
  calendarVocab,
  mergeVocabulary,
  defaultVocabulary,
} from '@pcampus/thai-romanization';

const customVocab = mergeVocabulary(coreVocab, geoVocab);
console.log(customVocab.length);
```

### Import แยก subpath

```ts
import { geoVocab } from '@pcampus/thai-romanization/packs/geo';
import { calendarVocab } from '@pcampus/thai-romanization/packs/calendar';
import { coreVocab } from '@pcampus/thai-romanization/packs/core';
import { mergeVocabulary } from '@pcampus/thai-romanization/packs';
```

---

## CLI

หลัง `npm install` สามารถใช้ command line ได้:

```bash
# แปลงคำเดียว
npx thai-romanize "สวัสดี"
# sawatdi

# แปลงประโยค
npx thai-romanize --sentence "สวัสดี ครับ"
# sawatdi khrap

# ค้นหากลับ Latin → ไทย
npx thai-romanize --reverse software
# ซอฟต์แวร์

# ใส่ options
npx thai-romanize --separator - --tone number "มกราคม"
# mokkar-akhom (หรือตาม tone output)

# ดู help
npx thai-romanize --help
```

### CLI Options

| Flag | คำอธิบาย |
|------|----------|
| `--sentence` | โหมดประโยค (คงช่องว่าง/เครื่องหมาย) |
| `--reverse` | ค้นหา Latin → ไทย |
| `--separator <s>` | `""` \| `"-"` \| `" "` |
| `--tone <mode>` | `omit` \| `diacritic` \| `number` |
| `-h, --help` | แสดงวิธีใช้ |

---

## TypeScript Types

```ts
import type {
  RomanizeOptions,
  RomanizeDetailedResult,
  RomanizeSegment,
  SeparatorMode,
  ToneMode,
  Confidence,
} from '@pcampus/thai-romanization';
```

| Type | คำอธิบาย |
|------|----------|
| `RomanizeOptions` | `{ separator?, tone? }` |
| `RomanizeDetailedResult` | ผลลัพธ์จาก `romanizeDetailed()` |
| `RomanizeSegment` | `{ thai: string; roman: string }` |
| `SeparatorMode` | `'' \| '-' \| ' '` |
| `ToneMode` | `'omit' \| 'diacritic' \| 'number'` |
| `Confidence` | `'high' \| 'medium' \| 'low'` |

---

## ตัวอย่าง Use Case

### 1. สร้าง URL slug

```ts
import { romanize } from '@pcampus/thai-romanization';

function toSlug(thai: string): string {
  return romanize(thai).toLowerCase();
}

toSlug('กาญจนบุรี'); // 'kanchanaburi'
```

### 2. แปลงรายชื่อจังหวัดทั้งหมด

```ts
import { romanizeBatch } from '@pcampus/thai-romanization';

const provinces = ['กรุงเทพ', 'เชียงใหม่', 'ภูเก็ต'];
const romanized = romanizeBatch(provinces);
```

### 3. สร้าง search index สองทาง

```ts
import { romanize, reverseLookup } from '@pcampus/thai-romanization';

// ไทย → Latin
const latin = romanize('ซอฟต์แวร์');

// Latin → ไทย (candidate)
const thaiCandidates = reverseLookup('software');
```

### 4. Debug คำที่แปลงผิด

```ts
import { romanizeDetailed } from '@pcampus/thai-romanization';

const detail = romanizeDetailed('คำที่สงสัย');
console.log('units:', detail.units);
console.log('segments:', detail.segments);
console.log('confidence:', detail.confidence);
```

### 5. Playground (ทดลองใช้บนเว็บ)

```bash
npm run playground
# เปิด http://localhost:3000
```

---

## Pipeline ภายใน

เมื่อเรียก `romanize()` library จะทำงานตามลำดับนี้:

```
romanize(text, options?)
  │
  ├─ 1. Loanword lookup?     → คืนทันที (เช่น ซอฟต์แวร์ → software)
  ├─ 2. Province lookup?     → คืนทันที (เช่น กาญจนบุรี → kanchanaburi)
  │
  └─ 3. Rule-based pipeline
       ├─ applySyllableBoundaries()  — แยก morpheme
       ├─ Trie segmentation          — longest-match จาก vocabulary
       ├─ monthRules               — -าคม → khom/akhom
       ├─ special rules            — เช่น มัง+กร → kon
       └─ applyTone()              — ใส่วรรณยุกต์ตาม options
```

### สิ่งที่ library รองรับดี

| หมวด | ตัวอย่าง |
|------|----------|
| คำประสม | `การจราจร`, `ผู้ใช้`, `ตำรวจ`, `กฎหมาย` |
| คำสะกดพิเศษ | `กษัตริย์`, `ใส่ใจ`, `มังกร` |
| เดือน | `มกราคม`, `เมษายน`, `พฤศจิกายน` |
| จังหวัด | 77 จังหวัด (RTGS-style) |
| Loanwords | `ซอฟต์แวร์`, `กูเกิล`, `คลาวด์` ฯลฯ |
| ประโยค | ช่องว่าง + เครื่องหมายวรรคตอน |

---

## ข้อจำกัดและหมายเหตุ

1. **ไม่ใช่ machine translation** — เป็นการถอดเสียงเป็นอักษร Latin ไม่ใช่แปลความหมาย
2. **RTGS-style** — ผลลัพธ์เป็น lowercase ไม่มีช่องว่าง (เช่น `kanchanaburi` ไม่ใช่ `Kanchanaburi`)
3. **Confidence** — คำที่ไม่อยู่ใน vocabulary อาจได้ `medium` หรือ `low` confidence
4. **Reverse lookup** — คืนเฉพาะคำที่รู้จักใน dictionary ไม่ครอบคลุมทุกคำในภาษาไทย
5. **กรุงเทพมหานคร** — ยังไม่มีใน province lookup (วางแผนเพิ่มในอนาคต)

---

## สรุป API ทั้งหมด

| Function | ระดับ | คำอธิบายสั้น ๆ |
|----------|-------|----------------|
| `romanize` | หลัก | แปลงคำ/คำประสม |
| `romanizeSentence` | หลัก | แปลงประโยค |
| `romanizeBatch` | หลัก | แปลงหลายคำ |
| `romanizeDetailed` | หลัก | แปลง + debug info |
| `reverseLookup` | หลัก | Latin → ไทย |
| `tokenizeSentence` | ประโยค | แยก token |
| `isThaiWord` | ประโยค | เช็คคำไทย |
| `segment` | Low-level | Trie segmentation |
| `splitIntoSyllables` | Low-level | แยกพยางค์ |
| `romanizeSyllable` | Low-level | แปลงพยางค์ |
| `romanizeUnit` | Low-level | แปลง unit + tone |
| `getRomanizationUnits` | Low-level | ดู internal units |
| `computeConfidence` | Low-level | ประเมินความมั่นใจ |
| `applySyllableBoundaries` | Orthography | ใส่ morpheme boundary |
| `applySegmentTransforms` | Orthography | แปลง segment |
| `normalizeOrthography` | Orthography | normalize เต็มรูปแบบ |
| `coreVocab` / `geoVocab` / `calendarVocab` | Packs | vocabulary arrays |
| `mergeVocabulary` | Packs | รวม packs |
| `defaultVocabulary` | Packs | default merged vocab |

---

## ติดปัญหา?

- รัน test: `npm test`
- ลอง playground: `npm run playground`
- ดู roadmap: [TASKS.md](./TASKS.md)
