import { describe, it, expect } from 'vitest';
import { romanize } from '../src/index.js';

describe('Thai Romanization', () => {
  it('should romanize สวัสดี to sawatdi', () => {
    expect(romanize('สวัสดี')).toBe('sawatdi');
  });

  it('should romanize ข้าว to khao', () => {
    expect(romanize('ข้าว')).toBe('khao');
  });

  it('should handle implicit vowels like คน to khon', () => {
    expect(romanize('คน')).toBe('khon');
  });


  it('should romanize วันจันทร์ to wanchan', () => {
    expect(romanize('วันจันทร์')).toBe('wanchan');
  });

  it('should romanize กรุงไทย to krungthai', () => {
    expect(romanize('กรุงไทย')).toBe('krungthai');
  });
});
