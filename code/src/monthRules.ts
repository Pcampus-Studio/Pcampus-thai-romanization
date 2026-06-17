import { MORPHEME_ROMAN } from './morphemeRoman';

/** Month name roots that precede คม or ายน suffixes. */
export const MONTH_ROOTS = new Set([
    'มกรา', 'กุมภา', 'มีนา', 'เมษา', 'พฤษภา', 'มิถุนา',
    'กรกฎา', 'สิงหา', 'กันยา', 'ตุลา', 'ธันวา',
]);

export function isMonthRoot(token: string): boolean {
    return MONTH_ROOTS.has(token);
}

/**
 * -าคม suffix: khom if root romanization ends with 'a', else akhom.
 * e.g. มกรา→mokkar + akhom, มีนา→mina + khom
 */
export function getKhSuffixRoman(rootToken: string, rootRoman?: string): string {
    const roman = rootRoman ?? MORPHEME_ROMAN[rootToken] ?? '';
    return roman.endsWith('a') ? 'khom' : 'akhom';
}
