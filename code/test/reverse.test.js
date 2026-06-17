import { describe, it, expect } from 'vitest';
import { reverseLookup } from '../src/reverse.ts';
describe('reverseLookup', () => {
    it('should find loanword by latin', () => {
        expect(reverseLookup('software')).toContain('ซอฟต์แวร์');
    });
    it('should find morpheme by latin', () => {
        expect(reverseLookup('samut')).toContain('สมุทร');
    });
    it('should find vocabulary word by romanized form', () => {
        expect(reverseLookup('kasatri')).toContain('กษัตริย์');
    });
    it('should return empty array for unknown latin', () => {
        expect(reverseLookup('zzzznotaword')).toEqual([]);
    });
    it('should be case-insensitive', () => {
        expect(reverseLookup('SOFTWARE')).toContain('ซอฟต์แวร์');
    });
});
//# sourceMappingURL=reverse.test.js.map