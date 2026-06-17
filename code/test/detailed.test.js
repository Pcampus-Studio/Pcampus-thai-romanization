import { describe, it, expect } from 'vitest';
import { romanizeDetailed, romanizeBatch } from '../src/index.ts';
describe('Detailed & Batch API', () => {
    it('romanizeDetailed returns pipeline data', () => {
        const result = romanizeDetailed('ใส่ใจ');
        expect(result.text).toBe('saichai');
        expect(result.tokens.length).toBeGreaterThan(0);
        expect(result.units.length).toBeGreaterThan(0);
        expect(result.segments.length).toBe(result.units.length);
        expect(['high', 'medium', 'low']).toContain(result.confidence);
    });
    it('romanizeBatch romanizes multiple words', () => {
        expect(romanizeBatch(['สวัสดี', 'ครับ'])).toEqual(['sawatdi', 'khrap']);
    });
});
//# sourceMappingURL=detailed.test.js.map