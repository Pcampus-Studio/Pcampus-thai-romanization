import { romanize } from '../src/index.ts';
import { describe, it } from 'vitest';

describe('Debug ผู้ใช้', () => {
    it('should show how ผู้ใช้ is romanized', () => {
        const result = romanize('ผู้ใช้');
        console.log('Result of ผู้ใช้:', result);
    });
});
