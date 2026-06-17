import type { Confidence, RomanizeOptions } from './types';
export declare function romanize(text: string, options?: RomanizeOptions): string;
export declare function getRomanizationUnits(text: string): string[];
export declare function computeConfidence(
  text: string,
  tokens: string[],
  units: string[],
): Confidence;
export declare function romanizeUnit(unit: string, options?: RomanizeOptions): string;
export declare function splitIntoSyllables(word: string): string[];
export declare function romanizeSyllable(syllable: string): string;
//# sourceMappingURL=romanizer.d.ts.map
