import { vocabulary } from './vocabulary';
import { romanize } from './romanizer';
import { LOANWORD_MAP } from './loanwords';
import { MORPHEME_ROMAN } from './morphemeRoman';
import { PROVINCE_ROMAN } from './provinceRoman';

let reverseMap: Map<string, string[]> | null = null;

function addEntry(map: Map<string, string[]>, latin: string, thai: string): void {
    const key = latin.toLowerCase();
    const list = map.get(key) ?? [];
    if (!list.includes(thai)) {
        list.push(thai);
        map.set(key, list);
    }
}

function buildReverseMap(): Map<string, string[]> {
    const map = new Map<string, string[]>();

    for (const [thai, latin] of Object.entries(LOANWORD_MAP)) {
        addEntry(map, latin, thai);
    }
    for (const [thai, latin] of Object.entries(PROVINCE_ROMAN)) {
        addEntry(map, latin, thai);
    }
    for (const [thai, latin] of Object.entries(MORPHEME_ROMAN)) {
        addEntry(map, latin, thai);
    }
    for (const word of vocabulary) {
        addEntry(map, romanize(word), word);
    }

    return map;
}

/** Latin → Thai lookup (vocabulary, morphemes, loanwords). */
export function reverseLookup(latin: string): string[] {
    if (!reverseMap) {
        reverseMap = buildReverseMap();
    }
    return reverseMap.get(latin.toLowerCase()) ?? [];
}
