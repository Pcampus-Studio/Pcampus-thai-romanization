import type { RomanizeOptions } from './types';
/** Split text into Thai words and literal spans (spaces, punctuation). */
export declare function tokenizeSentence(text: string): string[];
export declare function isThaiWord(part: string): boolean;
/** Romanize a sentence, preserving spaces and punctuation. */
export declare function romanizeSentence(text: string, options?: RomanizeOptions): string;
//# sourceMappingURL=sentence.d.ts.map
