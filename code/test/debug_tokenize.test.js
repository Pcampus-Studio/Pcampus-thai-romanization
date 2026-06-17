import { segment } from '../src/segmenter.ts';
import { describe, it } from 'vitest';
describe('Debug Tokenize', () => {
    it('should show tokens for บ้านจัดสรร', () => {
        const result = segment('บ้านจัดสรร');
        console.log('Tokens of บ้านจัดสรร:', result);
    });
});
//# sourceMappingURL=debug_tokenize.test.js.map