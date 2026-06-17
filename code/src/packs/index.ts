import { coreVocab } from './core';
import { calendarVocab } from './calendar';
import { geoVocab } from './geo';
import { articleVocab } from './article';

export { coreVocab } from './core';
export { geoVocab } from './geo';
export { calendarVocab } from './calendar';
export { articleVocab } from './article';

/** Merge vocabulary packs, deduplicating entries. */
export function mergeVocabulary(...packs: string[][]): string[] {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const pack of packs) {
        for (const word of pack) {
            if (!seen.has(word)) {
                seen.add(word);
                result.push(word);
            }
        }
    }
    return result;
}

export const defaultVocabulary = mergeVocabulary(coreVocab, calendarVocab, geoVocab, articleVocab);
