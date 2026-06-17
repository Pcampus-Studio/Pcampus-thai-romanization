/**
 * Rule-based Thai orthographic normalization.
 * Replaces per-word hardcoded overrides with general patterns.
 */
/** Insert syllable boundaries for compound morphemes. */
export declare function applySyllableBoundaries(word: string): string;
/** Apply per-segment orthographic transforms. */
export declare function applySegmentTransforms(segment: string): string;
/** Full normalization: boundaries + per-segment transforms. */
export declare function normalizeOrthography(word: string): string;
//# sourceMappingURL=orthography.d.ts.map
