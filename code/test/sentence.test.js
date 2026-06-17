import { describe, it, expect } from 'vitest';
import { romanize, romanizeSentence } from '../src/index.ts';
describe('Sentence API', () => {
    it('romanizes multiple Thai words with spaces', () => {
        expect(romanizeSentence('สวัสดี ครับ')).toBe('sawatdi khrap');
    });
    it('preserves punctuation', () => {
        expect(romanizeSentence('กรุงเทพ, ไทย')).toBe('krungthep, thai');
    });
    it('supports separator option per word', () => {
        expect(romanize('กรุงเทพ', { separator: '-' })).toBe('krung-thep');
    });
    it('supports tone number option', () => {
        expect(romanize('ใส่', { tone: 'number' })).toBe('sai2');
    });
    it('backward compatible without options', () => {
        expect(romanize('สวัสดี')).toBe('sawatdi');
    });
});
//# sourceMappingURL=sentence.test.js.map