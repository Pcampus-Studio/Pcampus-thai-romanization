import { describe, it, expect } from 'vitest';
import { romanize } from '../src/index.ts';
import { VERIFIED_AUDIT } from './audit.data.ts';
describe('Audit corpus (verified)', () => {
    for (const { thai, expected, category } of VERIFIED_AUDIT) {
        it(`[${category}] ${thai} → ${expected}`, () => {
            expect(romanize(thai)).toBe(expected);
        });
    }
    it('reports coverage by category', () => {
        const byCategory = new Map();
        for (const { category } of VERIFIED_AUDIT) {
            byCategory.set(category, (byCategory.get(category) ?? 0) + 1);
        }
        expect(byCategory.get('regression')).toBeGreaterThanOrEqual(4);
        expect(VERIFIED_AUDIT.length).toBeGreaterThanOrEqual(16);
    });
});
//# sourceMappingURL=audit.test.js.map