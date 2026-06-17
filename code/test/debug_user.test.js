import { romanize } from '../src/index.ts';
// Need to simulate what happens, importing directly to bypass index.ts if needed,
// but for now let's just run it via node (might need ts-node or similar if not set up, 
// but npm run test environment might be easier).
// Actually, let's just add it to a temporary test file.
import { describe, it, expect } from 'vitest';
describe('Debug ผู้ใช้งาน', () => {
    it('should show how ผู้ใช้งาน is romanized', () => {
        const result = romanize('ผู้ใช้งาน');
        console.log('Result of ผู้ใช้งาน:', result);
    });
});
//# sourceMappingURL=debug_user.test.js.map