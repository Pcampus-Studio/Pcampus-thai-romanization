import { romanize } from './romanizer';
import type { RomanizeOptions } from './types';

const THAI_WORD = /^[\u0E00-\u0E7F]+$/;

/** Split text into Thai words and literal spans (spaces, punctuation). */
export function tokenizeSentence(text: string): string[] {
    return text.split(/(\s+|[^\u0E00-\u0E7F\s]+)/).filter(part => part.length > 0);
}

export function isThaiWord(part: string): boolean {
    return THAI_WORD.test(part);
}

/** Romanize a sentence, preserving spaces and punctuation. */
export function romanizeSentence(text: string, options?: RomanizeOptions): string {
    return tokenizeSentence(text)
        .map(part => (isThaiWord(part) ? romanize(part, options) : part))
        .join('');
}
