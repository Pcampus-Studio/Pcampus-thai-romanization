import { CONSONANTS, VOWELS, TONE_MARKS, SILENT_MARK } from './constants';
import { segment } from './segmenter';
import { applySyllableBoundaries, applySegmentTransforms } from './orthography';
import { MORPHEME_ROMAN } from './morphemeRoman';
import { romanizeLoanword } from './loanwords';
import { romanizeProvince } from './provinceRoman';
import { isMonthRoot, getKhSuffixRoman } from './monthRules';
import { applyTone } from './tone';
import type { Confidence, ResolvedRomanizeOptions, RomanizeOptions } from './types';
import { resolveOptions } from './types';

const romanizeCache = new Map<string, string>();
const CACHE_MAX = 512;

function cacheKey(text: string, options: ResolvedRomanizeOptions): string {
    return JSON.stringify({ text, separator: options.separator, tone: options.tone });
}

export function romanize(text: string, options?: RomanizeOptions): string {
    const resolved = resolveOptions(options);
    const key = cacheKey(text, resolved);
    const cached = romanizeCache.get(key);
    if (cached !== undefined) return cached;

    const result = romanizeInner(text, resolved);
    if (romanizeCache.size >= CACHE_MAX) {
        romanizeCache.clear();
    }
    romanizeCache.set(key, result);
    return result;
}

export function getRomanizationUnits(text: string): string[] {
    const bounded = applySyllableBoundaries(text);

    if (bounded.includes('.')) {
        return bounded
            .split('.')
            .filter(part => part.length > 0)
            .flatMap(part => {
                if (MORPHEME_ROMAN[part]) return [part];
                const transformed = applySegmentTransforms(part);
                const subUnits = transformed.includes('.')
                    ? transformed.split('.').filter(p => p.length > 0)
                    : [transformed];
                return subUnits.flatMap(unit =>
                    MORPHEME_ROMAN[unit] ? [unit] : splitSyllableUnits(unit)
                );
            });
    }

    return segment(text).flatMap(expandToken);
}

export function computeConfidence(text: string, tokens: string[], units: string[]): Confidence {
    if (romanizeLoanword(text) || romanizeProvince(text)) return 'high';
    if (applySyllableBoundaries(text).includes('.')) return 'high';
    if (units.length === 0) return 'low';

    const known = units.filter(u => MORPHEME_ROMAN[u]).length;
    const ratio = known / units.length;

    if (ratio >= 0.75) return 'high';
    if (ratio >= 0.35) return 'medium';
    return 'low';
}

function romanizeInner(text: string, options: ResolvedRomanizeOptions): string {
    const loanword = romanizeLoanword(text);
    if (loanword) return loanword;

    const province = romanizeProvince(text);
    if (province) return province;

    const units = getRomanizationUnits(text);
    return romanizeUnits(units, options);
}

function expandToken(token: string): string[] {
    if (MORPHEME_ROMAN[token]) return [token];
    const transformed = applySegmentTransforms(token);
    if (transformed.includes('.')) {
        return transformed.split('.').filter(p => p.length > 0);
    }
    return splitSyllableUnits(transformed);
}

export function romanizeUnit(unit: string, options?: RomanizeOptions): string {
    const resolved = resolveOptions(options);
    const roman = romanizeSyllable(unit);
    return applyTone(roman, unit, resolved.tone);
}

function romanizeUnits(units: string[], options: ResolvedRomanizeOptions): string {
    const parts: string[] = [];
    for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        let roman: string;
        if (unit === 'คม' && i > 0 && isMonthRoot(units[i - 1])) {
            roman = getKhSuffixRoman(units[i - 1]);
        } else if (unit === 'กร' && i > 0 && units[i - 1] === 'มัง') {
            roman = 'kon';
        } else {
            roman = romanizeSyllable(unit);
        }
        parts.push(applyTone(roman, unit, options.tone));
    }
    return parts.join(options.separator);
}

const LEADING_VOWELS = ['เ', 'แ', 'โ', 'ใ', 'ไ'];

/** Split a token into syllable units. */
function splitSyllableUnits(word: string): string[] {
    if (word.includes('.')) {
        return word.split('.').filter(part => part.length > 0);
    }

    const syllables: string[] = [];
    let i = 0;
    while (i < word.length) {
        let syllable = word[i];
        i++;

        if (LEADING_VOWELS.includes(syllable)) {
            if (i < word.length) {
                syllable += word[i];
                i++;
            }
        }

        if (i < word.length && CONSONANTS[syllable[syllable.length - 1]]) {
            const possibleCluster = syllable[syllable.length - 1] + word[i];
            const validClusters = ['กร', 'กล', 'กว', 'คร', 'คล', 'คว', 'ขร', 'ขล', 'ขว', 'ปร', 'ปล', 'ผล', 'พล', 'ตร', 'พร', 'ทร', 'ศร', 'สร', 'หง', 'หญ', 'หน', 'หม', 'หย', 'หร', 'หล', 'หว', 'อย'];
            if (validClusters.includes(possibleCluster)) {
                syllable += word[i];
                i++;
            }
        }

        while (i < word.length) {
            const char = word[i];
            const nextChar = word[i + 1];

            if (LEADING_VOWELS.includes(char) && syllable.length > 0) {
                break;
            }
            if (VOWELS[char] || TONE_MARKS.includes(char) || char === SILENT_MARK || char === '็') {
                syllable += char;
                i++;
            } else if (CONSONANTS[char]) {
                if (char === 'ก' && nextChar === 'ร' && syllable.endsWith('ง')) {
                    break;
                }
                const preVowels = LEADING_VOWELS;
                if (nextChar && preVowels.includes(nextChar)) {
                    syllable += char;
                    i++;
                    break;
                } else if (nextChar && VOWELS[nextChar] && !preVowels.includes(nextChar)) {
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
        syllables.push(syllable);
    }
    return syllables;
}

export function splitIntoSyllables(word: string): string[] {
    const bounded = applySyllableBoundaries(word);
    if (bounded.includes('.')) {
        return bounded.split('.').filter(part => part.length > 0)
            .map(part => applySegmentTransforms(part));
    }
    return splitSyllableUnits(applySegmentTransforms(word));
}

export function romanizeSyllable(syllable: string): string {
    if (!syllable || syllable.trim() === '') return syllable || '';

    let s = syllable;

    if (MORPHEME_ROMAN[s]) return MORPHEME_ROMAN[s];

    // Leading silent อ (e.g. อเมริกา) but not อย- words
    if (s.startsWith('อ') && !s.startsWith('อย') && s.length > 1 && CONSONANTS[s[1]]) {
        return 'a' + romanizeSyllable(s.substring(1));
    }

    let preVowel = '';
    if (/^[เแโใไ]/.test(s)) {
        preVowel = s[0];
        s = s.substring(1);
    }

    if (preVowel === '' && s.startsWith('อ') && s.length > 1) {
        const rest = s.substring(1);
        if (/^[ิีึืุู]/.test(rest) || rest === 'ำ') {
            preVowel = 'อ';
            s = rest;
        }
    }

    let initial = '';
    let initMatch = s.match(/^(?:หง|หญ|หน|หม|หย|หว|หร|หล|อย|กร|กล|กว|คร|คล|คว|ขร|ขล|ขว|ปร|ปล|ผล|พล|ตร|พร|ทร)[่้๊๋็]?/);
    if (!initMatch) {
        initMatch = s.match(/^[ก-ฮ][่้๊๋็]?/);
    }

    let initStr = '';
    if (initMatch) {
        initStr = initMatch[0];
        let initClean = initStr.replace(/[่้๊๋็]/g, '');
        const clusters = ['กร', 'กล', 'กว', 'คร', 'คล', 'คว', 'ขร', 'ขล', 'ขว', 'ปร', 'ปล', 'ผล', 'พล', 'ตร', 'พร'];
        if (initClean.length === 2) {
            if (initClean[0] === 'ห' || initClean[0] === 'อ') {
                initial = CONSONANTS[initClean[1]].initial;
            } else if (initClean === 'ทร') {
                initial = 's';
            } else if (clusters.includes(initClean)) {
                initial = CONSONANTS[initClean[0]].initial + (initClean[1] === 'ร' ? 'r' : initClean[1] === 'ล' ? 'l' : 'w');
            } else {
                initial = CONSONANTS[initClean[0]].initial;
            }
        } else {
            initial = CONSONANTS[initClean].initial;
            if (initClean === 'ฤ' || initClean === 'ฤา') {
                initial = 'rue';
            } else if (initClean === 'พฤ') {
                initial = 'phrue';
            } else if (initClean === 'นฤ') {
                initial = 'narue';
            }
        }
        s = s.substring(initStr.length);
    }

    s = s.replace(/[่้๊๋็]/g, '');

    let vowel = '';
    let final = '';

    const vowelMap: Record<string, string> = {
        'ะ': 'a', 'ั': 'a', 'า': 'a', 'ำ': 'am',
        'ิ': 'i', 'ี': 'i', 'ึ': 'ue', 'ื': 'ue', 'ือ': 'ue', 'อ': 'o',
        'ุ': 'u', 'ู': 'u',
        'เะ': 'e', 'เ': 'e',
        'แะ': 'ae', 'แ': 'ae',
        'โะ': 'o', 'โ': 'o',
        'เาะ': 'o', 'เอะ': 'oe', 'เอ': 'oe', 'เือ': 'uea', 'เีย': 'ia', 'เียว': 'iao', 'เา': 'ao', 'เิ': 'oe',
        'ัวะ': 'ua', 'ัว': 'ua', 'ว': 'ua',
        'ใ': 'ai', 'ไ': 'ai', 'ัย': 'ai', 'าย': 'ai', 'าว': 'ao', 'ิว': 'io', 'ุย': 'ui', 'เอย': 'oei', 'โอย': 'oi',
        'ไย': 'ai', 'ใย': 'ai',
        'ฤ': 'rue', 'ฤา': 'rue',
        'อิ': 'i', 'อี': 'i', 'อึ': 'ue', 'อื': 'ue', 'อุ': 'u', 'อู': 'u', 'อำ': 'am',
    };

    let fullVowel = preVowel + s;
    if (vowelMap[fullVowel]) {
        vowel = vowelMap[fullVowel];
        final = '';
    } else {
        if (s.length > 0) {
            const last = s[s.length - 1];
            const secondLast = s.length > 1 ? s[s.length - 2] : '';

            if (last === 'ร' && secondLast === 'ท') {
                final = 'tr';
                s = s.substring(0, s.length - 2);
            } else if (last === 'ร' && secondLast === 'ร') {
                vowel = 'an';
                s = s.substring(0, s.length - 2);
                final = '';
            } else if (CONSONANTS[last]) {
                final = CONSONANTS[last].final;
                if (last === 'ว') final = 'o';
                if (last === 'ย') final = 'i';
                s = s.substring(0, s.length - 1);
            }
        }
        fullVowel = preVowel + s;
        if (vowelMap[fullVowel]) {
            vowel = vowelMap[fullVowel];
        } else if (vowel === 'an') {
            // set by รร
        } else if (fullVowel === '' && final !== '') {
            vowel = 'o';
        } else if (fullVowel === '' && final === '') {
            const initClean = initStr.replace(/[่้๊๋็]/g, '');
            if (initClean === 'ฤ' || initClean === 'ฤา') vowel = '';
            else vowel = 'a';
        } else {
            vowel = 'a';
        }
    }

    return initial + vowel + final;
}
