/** Month name roots that precede คม or ายน suffixes. */
export declare const MONTH_ROOTS: Set<string>;
export declare function isMonthRoot(token: string): boolean;
/**
 * -าคม suffix: khom if root romanization ends with 'a', else akhom.
 * e.g. มกรา→mokkar + akhom, มีนา→mina + khom
 */
export declare function getKhSuffixRoman(rootToken: string, rootRoman?: string): string;
//# sourceMappingURL=monthRules.d.ts.map
