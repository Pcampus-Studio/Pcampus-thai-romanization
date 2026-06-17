import type { ToneMode } from './types';

const VOWEL_DIACRITICS: Record<number, Record<string, string>> = {
    2: { a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù', ae: 'àe' },
    3: { a: 'â', e: 'ê', i: 'î', o: 'ô', u: 'û', ae: 'âe' },
    4: { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', ae: 'áe' },
};

/** Extract RTGS-style tone number (1–4) from a Thai syllable unit. */
export function extractToneNumber(thai: string): number {
    if (thai.includes('๋') || thai.includes('๊')) return 4;
    if (thai.includes('้')) return 3;
    if (thai.includes('่')) return 2;
    return 1;
}

function applyDiacriticTone(roman: string, tone: number): string {
    if (tone === 1) return roman;
    const map = VOWEL_DIACRITICS[tone];
    if (!map) return roman;

    const digraphs = ['ae', 'oe', 'ue', 'ai', 'ao', 'ia', 'io', 'ua', 'uea'];
    for (const d of digraphs) {
        const idx = roman.indexOf(d);
        if (idx !== -1 && map[d]) {
            return roman.slice(0, idx) + map[d] + roman.slice(idx + d.length);
        }
    }

    for (let i = 0; i < roman.length; i++) {
        const ch = roman[i];
        if (map[ch]) {
            return roman.slice(0, i) + map[ch] + roman.slice(i + 1);
        }
    }
    return roman;
}

export function applyTone(roman: string, thaiUnit: string, mode: ToneMode): string {
    if (mode === 'omit' || !roman) return roman;

    const tone = extractToneNumber(thaiUnit);
    if (mode === 'number') {
        return tone === 1 ? roman : `${roman}${tone}`;
    }
    return applyDiacriticTone(roman, tone);
}
