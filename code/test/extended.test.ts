import { describe, it, expect } from 'vitest';
import { romanize } from '../src/index.ts';

describe('Extended Thai Romanization', () => {
  const words = [
    // Phase 8.3 — compounds
    { thai: 'กษัตริย์', expected: 'kasatri' },
    { thai: 'ใส่ใจ', expected: 'saichai' },
    { thai: 'การจราจร', expected: 'kancharachon' },
    { thai: 'มังกร', expected: 'mangkon' },
    { thai: 'ผู้ใช้', expected: 'phuchai' },
    { thai: 'บ้านจัดสรร', expected: 'banjadsan' },
    { thai: 'ตำรวจ', expected: 'tamruat' },
    { thai: 'กฎหมาย', expected: 'kotmai' },
    { thai: 'อาจารย์', expected: 'achan' },
    { thai: 'อินทรี', expected: 'intri' },
    { thai: 'วันจันทร์', expected: 'wanchan' },
    { thai: 'กรุงไทย', expected: 'krungthai' },
    { thai: 'ศรีราชา', expected: 'siracha' },
    { thai: 'ส้มตำ', expected: 'somtam' },
    { thai: 'นักเรียน', expected: 'nakrian' },
    { thai: 'โรงเรียน', expected: 'rongrian' },

    // Phase 8.1 — provinces
    { thai: 'สมุทรปราการ', expected: 'samutprakan' },
    { thai: 'สมุทรสงคราม', expected: 'samutsongkhram' },
    { thai: 'สระแก้ว', expected: 'sakaew' },
    { thai: 'สุโขทัย', expected: 'sukhothai' },
    { thai: 'อุดรธานี', expected: 'udonthani' },
    { thai: 'อุบลราชธานี', expected: 'ubonratchathani' },
    { thai: 'อำนาจเจริญ', expected: 'amnatcharoen' },
    { thai: 'หนองบัวลำภู', expected: 'nongbualamphu' },

    // Phase 8.2 — months
    { thai: 'มกราคม', expected: 'mokkarakhom' },
    { thai: 'กุมภาพันธ์', expected: 'kumphaphan' },
    { thai: 'มีนาคม', expected: 'minakhom' },
    { thai: 'กรกฎาคม', expected: 'karakadakhom' },
    { thai: 'พฤษภาคม', expected: 'phruetsaphakhom' },
    { thai: 'ธันวาคม', expected: 'thanwakhom' },

    // Phase 8.4 — loanwords
    { thai: 'ซอฟต์แวร์', expected: 'software' },
    { thai: 'สมาร์ทโฟน', expected: 'smartphone' },
    { thai: 'เซิร์ฟเวอร์', expected: 'server' },

    // Phase 9.1 — more provinces
    { thai: 'นครราชสีมา', expected: 'nakhonratchasima' },
    { thai: 'ชลบุรี', expected: 'chonburi' },
    { thai: 'นครปฐม', expected: 'nakhonpathom' },
    { thai: 'นครศรีธรรมราช', expected: 'nakhonsithammarat' },
    { thai: 'พิษณุโลก', expected: 'phitsanulok' },
    { thai: 'เชียงราย', expected: 'chiangrai' },
    { thai: 'ลำปาง', expected: 'lampang' },
    { thai: 'นนทบุรี', expected: 'nonthaburi' },
    { thai: 'ปทุมธานี', expected: 'pathumthani' },

    // Phase 9.2 — more loanwords
    { thai: 'ฮาร์ดแวร์', expected: 'hardware' },
    { thai: 'ดาต้าเบส', expected: 'database' },
    { thai: 'บลูทูธ', expected: 'bluetooth' },
    { thai: 'คลาวด์', expected: 'cloud' },
    { thai: 'กูเกิล', expected: 'google' },

    // Phase 9.3 — computed month suffix (no COMPOUND_ROMAN)
    { thai: 'เมษายน', expected: 'mesaayon' },
    { thai: 'สิงหาคม', expected: 'singhakhom' },
  ];

  for (const { thai, expected } of words) {
    it(`should romanize ${thai} to ${expected}`, () => {
      expect(romanize(thai)).toBe(expected);
    });
  }
});
