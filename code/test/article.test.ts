import { describe, it, expect } from 'vitest';
import { romanize } from '../src/index.ts';

describe('Article vocabulary — playground demo', () => {
  const phrases: [string, string][] = [
    ['ผมตื่นเช้า', 'phomtuenchao'],
    ['อากาศร้อนอบอ้าว', 'akatronopao'],
    ['ท้องฟ้าแจ่มใส', 'thongfajamsai'],
    ['อาบน้ำ', 'abnam'],
    ['รถไฟฟ้า', 'rotfaifa'],
    ['สนามบินสุวรรณภูมิ', 'sanambinsuvarnabhumi'],
    ['วัดพระธาตุดอยสุเทพ', 'watphrathatdoisuthep'],
    ['ข้าวซอย', 'khaosoai'],
    ['ตลาดวโรรส', 'talatwororot'],
    ['สะพานข้ามแม่น้ำแคว', 'saphankhammaenamkhwa'],
  ];

  for (const [thai, expected] of phrases) {
    it(`should romanize ${thai} to ${expected}`, () => {
      expect(romanize(thai)).toBe(expected);
    });
  }
});
