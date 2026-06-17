import { romanize } from './romanizer';
import type { RomanizeOptions } from './types';

export function romanizeBatch(words: string[], options?: RomanizeOptions): string[] {
    return words.map(word => romanize(word, options));
}
