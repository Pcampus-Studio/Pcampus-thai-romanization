export type SeparatorMode = '' | '-' | ' ';
export type ToneMode = 'omit' | 'diacritic' | 'number';
export type Confidence = 'high' | 'medium' | 'low';
export interface RomanizeOptions {
  /** Join morpheme/syllable units within a word. Default: `''` */
  separator?: SeparatorMode;
  /** Tone mark output. Default: `'omit'` */
  tone?: ToneMode;
}
export interface RomanizeSegment {
  thai: string;
  roman: string;
}
export interface RomanizeDetailedResult {
  text: string;
  tokens: string[];
  units: string[];
  segments: RomanizeSegment[];
  confidence: Confidence;
}
export type ResolvedRomanizeOptions = Required<RomanizeOptions>;
export declare const DEFAULT_ROMANIZE_OPTIONS: ResolvedRomanizeOptions;
export declare function resolveOptions(options?: RomanizeOptions): ResolvedRomanizeOptions;
//# sourceMappingURL=types.d.ts.map
