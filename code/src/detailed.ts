import { romanizeLoanword } from './loanwords';
import {
    computeConfidence,
    getRomanizationUnits,
    romanize,
    romanizeUnit,
} from './romanizer';
import { segment } from './segmenter';
import type { RomanizeDetailedResult, RomanizeOptions } from './types';

export function romanizeDetailed(text: string, options?: RomanizeOptions): RomanizeDetailedResult {
    const loanword = romanizeLoanword(text);
    const tokens = loanword ? [text] : segment(text);
    const units = loanword ? [text] : getRomanizationUnits(text);

    const segments = units.map(thai => ({
        thai,
        roman: loanword
            ? loanword
            : romanizeUnit(thai, options),
    }));

    return {
        text: romanize(text, options),
        tokens,
        units,
        segments,
        confidence: loanword ? 'high' : computeConfidence(text, tokens, units),
    };
}
