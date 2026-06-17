import { romanize } from '../src/index.ts';
import { describe, it } from 'vitest';

describe('Debug กษัตริย์', () => {
    it('should show how กษัตริย์ is romanized', () => {
        const result = romanize('กษัตริย์');
        console.log('Result of กษัตริย์:', result);
    });
});
