import { romanizeSyllable } from '../src/romanizer.ts';
import { describe, it } from 'vitest';
describe('Debug Syllables', () => {
    it('should show romanization of จัด', () => {
        console.log('จัด:', romanizeSyllable('จัด'));
    });
    it('should show romanization of สรร', () => {
        console.log('สรร:', romanizeSyllable('สรร'));
    });
});
//# sourceMappingURL=debug_syllables.test.js.map