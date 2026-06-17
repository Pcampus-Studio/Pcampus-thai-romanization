import type { ToneMode } from './types';
/** Extract RTGS-style tone number (1–4) from a Thai syllable unit. */
export declare function extractToneNumber(thai: string): number;
export declare function applyTone(roman: string, thaiUnit: string, mode: ToneMode): string;
//# sourceMappingURL=tone.d.ts.map
