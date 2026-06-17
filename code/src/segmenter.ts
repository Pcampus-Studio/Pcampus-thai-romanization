import { Trie } from './dictionary';
import { vocabulary } from './vocabulary';
import { CONSONANTS, VOWELS, TONE_MARKS, SILENT_MARK } from './constants';
import { MONTH_ROOTS } from './monthRules';

const dictionary = new Trie();
vocabulary.forEach(word => dictionary.insert(word));

const LEADING_VOWELS = ['เ', 'แ', 'โ', 'ใ', 'ไ'];

/** Geographic / temporal suffixes for rule-based splitting */
const SUFFIXES = [
    'ราชธานี',
    'าคม',
    'บุรี',
    'ธานี',
    'ายน',
    'พันธ์',
];

/** -ายน months: เมษา+ยน (not เมษ+ายน). Returns root length and pushes ายน separately. */
function tryMonthAyonSplit(text: string, start: number): { rootLen: number } | null {
    const slice = text.substring(start);
    if (!slice.endsWith('ายน')) return null;
    for (const root of MONTH_ROOTS) {
        if (slice === root + 'ยน') {
            return { rootLen: root.length };
        }
    }
    return null;
}

function trySuffixSplit(text: string, start: number): number {
    const end = text.length;
    for (const suffix of SUFFIXES) {
        const suffixStart = end - suffix.length;
        if (suffixStart <= start) continue;
        if (text.substring(suffixStart, end) === suffix) {
            const rootLen = suffixStart - start;
            if (rootLen > 0) {
                return rootLen;
            }
        }
    }
    return 0;
}

function extractSyllable(text: string, start: number): { syllable: string; next: number } {
    let i = start;
    let syllable = text[i];
    i++;

    if (LEADING_VOWELS.includes(syllable) && i < text.length) {
        syllable += text[i];
        i++;
    }

    if (i < text.length && CONSONANTS[syllable[syllable.length - 1]]) {
        const possibleCluster = syllable[syllable.length - 1] + text[i];
        const validClusters = ['กร', 'กล', 'กว', 'คร', 'คล', 'คว', 'ขร', 'ขล', 'ขว', 'ปร', 'ปล', 'ผล', 'พล', 'ตร', 'พร', 'ทร', 'ศร', 'สร', 'หง', 'หญ', 'หน', 'หม', 'หย', 'หร', 'หล', 'หว', 'อย'];
        if (validClusters.includes(possibleCluster)) {
            syllable += text[i];
            i++;
        }
    }

    while (i < text.length) {
        const char = text[i];
        if (LEADING_VOWELS.includes(char) && syllable.length > 0) {
            break;
        }
        if (VOWELS[char] || TONE_MARKS.includes(char) || char === SILENT_MARK) {
            syllable += char;
            i++;
        } else if (CONSONANTS[char]) {
            const nextChar = text[i + 1];
            if (char === 'ก' && nextChar === 'ร' && syllable.endsWith('ง')) {
                break;
            }
            if (nextChar && VOWELS[nextChar]) {
                break;
            }
            if (nextChar === SILENT_MARK) {
                syllable += char + nextChar;
                i += 2;
                break;
            }
            syllable += char;
            i++;
        } else {
            break;
        }
    }

    return { syllable, next: i };
}

export function segment(text: string): string[] {
    const tokens: string[] = [];
    let i = 0;
    while (i < text.length) {
        const ayon = tryMonthAyonSplit(text, i);
        if (ayon) {
            tokens.push(text.substring(i, i + ayon.rootLen));
            tokens.push('ายน');
            i = text.length;
            continue;
        }

        const matchLength = dictionary.searchLongest(text, i);
        if (matchLength > 0) {
            tokens.push(text.substring(i, i + matchLength));
            i += matchLength;
        } else {
            const suffixRootLen = trySuffixSplit(text, i);
            if (suffixRootLen > 0) {
                tokens.push(text.substring(i, i + suffixRootLen));
                i += suffixRootLen;
            } else {
                const { syllable, next } = extractSyllable(text, i);
                tokens.push(syllable);
                i = next;
            }
        }
    }
    return tokens;
}
