import { describe, it, expect } from 'vitest';
import { romanize } from '../src/index.ts';
describe('Geography pack — provinces', () => {
    const provinces = [
        { thai: 'กระบี่', expected: 'krabi' },
        { thai: 'กาญจนบุรี', expected: 'kanchanaburi' },
        { thai: 'กาฬสินธุ์', expected: 'kalasin' },
        { thai: 'กำแพงเพชร', expected: 'kamphaengphet' },
        { thai: 'จันทบุรี', expected: 'chanthaburi' },
        { thai: 'ฉะเชิงเทรา', expected: 'chachoengsao' },
        { thai: 'ชัยนาท', expected: 'chainat' },
        { thai: 'ชุมพร', expected: 'chumphon' },
        { thai: 'ตรัง', expected: 'trang' },
        { thai: 'ตาก', expected: 'tak' },
        { thai: 'นครนายก', expected: 'nakhonnayok' },
        { thai: 'นครพนม', expected: 'nakhonphanom' },
        { thai: 'นครสวรรค์', expected: 'nakhonsawan' },
        { thai: 'นราธิวาส', expected: 'narathiwat' },
        { thai: 'น่าน', expected: 'nan' },
        { thai: 'บึงกาฬ', expected: 'buengkan' },
        { thai: 'บุรีรัมย์', expected: 'buriram' },
        { thai: 'ประจวบคีรีขันธ์', expected: 'prachuapkhirikhan' },
        { thai: 'ปราจีนบุรี', expected: 'prachinburi' },
        { thai: 'พระนครศรีอยุธยา', expected: 'phranakhonsiayutthaya' },
        { thai: 'พะเยา', expected: 'phayao' },
        { thai: 'พังงา', expected: 'phangnga' },
        { thai: 'พัทลุง', expected: 'phatthalung' },
        { thai: 'พิจิตร', expected: 'phichit' },
        { thai: 'มหาสารคาม', expected: 'mahasarakham' },
        { thai: 'แม่ฮ่องสอน', expected: 'maehongson' },
        { thai: 'ยโสธร', expected: 'yasothon' },
        { thai: 'ยะลา', expected: 'yala' },
        { thai: 'ร้อยเอ็ด', expected: 'roiet' },
        { thai: 'ระนอง', expected: 'ranong' },
        { thai: 'ลพบุรี', expected: 'lopburi' },
        { thai: 'ลำพูน', expected: 'lamphun' },
        { thai: 'เลย', expected: 'loei' },
        { thai: 'ศรีสะเกษ', expected: 'sisaket' },
        { thai: 'สกลนคร', expected: 'sakonnakhon' },
        { thai: 'สตูล', expected: 'satun' },
        { thai: 'สมุทรสาคร', expected: 'samutsakhon' },
        { thai: 'สระบุรี', expected: 'saraburi' },
        { thai: 'สิงห์บุรี', expected: 'singburi' },
        { thai: 'สุพรรณบุรี', expected: 'suphanburi' },
        { thai: 'เพชรบุรี', expected: 'phetchaburi' },
        { thai: 'เพชรบูรณ์', expected: 'phetchabun' },
        { thai: 'แพร่', expected: 'phrae' },
        { thai: 'มุกดาหาร', expected: 'mukdahan' },
        { thai: 'หนองคาย', expected: 'nongkhai' },
        { thai: 'อุตรดิตถ์', expected: 'uttaradit' },
        { thai: 'อุทัยธานี', expected: 'uthaithani' },
    ];
    for (const { thai, expected } of provinces) {
        it(`should romanize ${thai} to ${expected}`, () => {
            expect(romanize(thai)).toBe(expected);
        });
    }
});
//# sourceMappingURL=geo.test.js.map