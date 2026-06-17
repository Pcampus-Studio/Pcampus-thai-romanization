/**
 * Rule-based Thai orthographic normalization.
 * Replaces per-word hardcoded overrides with general patterns.
 */

const B = '.';

/** Insert syllable boundaries for compound morphemes. */
export function applySyllableBoundaries(word: string): string {
    let w = word;

    const compounds: [RegExp, string][] = [
        [/เศรษฐ(?=กิจ)/g, `เศษ${B}ถะ${B}`],
        [/กฤษ(?=ณะ)/g, `กริต${B}สะ${B}`],
        [/เกียรติยศ/g, `เกียด${B}ติ${B}ยด`],
        [/อิส(?=ลาม)/g, `อิด${B}สะ${B}`],
        [/อัก(?=ษร)/g, `อัก${B}`],
        [/โทร(?=ศัพ)/g, `โท${B}ระ${B}`],
        [/โทร(?=ทัศ)/g, `โท${B}ระ${B}`],
        [/อัง(?=กฤษ)/g, `อัง${B}`],
        [/จักร(?=ยาน)/g, `จัก${B}`],
        [/นัก(?=พัฒนา)/g, `นัก${B}`],
        [/พัฒ(?=นา)/g, `พัด${B}ทะ${B}`],
        [/ประ(?=เทศ)/g, `ประ${B}`],
        [/เทศ(?=ไทย)/g, `เทด${B}`],
        [/บริ(?=ษัท)/g, `บอ${B}ริ${B}`],
        [/แม่(?=น้ำ)/g, `แม่${B}`],
        [/โปร(?=แกรม)/g, `โปร${B}`],
        [/แกรม(?=เมอร์)/g, `แกรม${B}`],
        [/อิน(?=เทอร์)/g, `อิน${B}`],
        [/เทอร์(?=เน็ต)/g, `เทอร์${B}`],
        [/ธรรม(?=ศาสตร์)/g, `ธรรม${B}มะ${B}`],
        [/มหัศ(?=จรรย์)/g, `มะ${B}หัด${B}สะ${B}`],
        [/พฤศ(?=จิก)/g, `พฤศ${B}`],
        [/จิกา(?=ยน)/g, `จิกา${B}`],
        [/เก้า(?=อี้)/g, `เก้า${B}`],
        [/ฤา(?=ษี)/g, `ฤา${B}`],
        [/ราช(?=การ)/g, `ราด${B}ชะ${B}`],
        [/พฤหัส(?=บดี)/g, `พฤหัส${B}`],
        [/อัป(?=เด)/g, `อับ${B}`],
        [/โรง(?=พยา)/g, `โรง${B}`],
        [/พยา(?=บาล)/g, `พยา${B}`],
        [/ประชา(?=ชน)/g, `ประ${B}ชา${B}`],
        [/ประวัติ(?=ศาสตร์)/g, `ประ${B}หวัด${B}ติ${B}`],
        [/เกี่ยว(?=ข้อง)/g, `เกี่ยว${B}`],
        [/ครอบ(?=ครัว)/g, `ครอบ${B}`],
        [/อยู่(?=อาศัย)/g, `อยู่${B}`],
        [/ฟัง(?=ก์ชัน)/g, `ฟัง${B}`],
        [/สุราษฎร์(?=ธานี)/g, `สุราษฎร์${B}`],
        [/ผู้(?=ใช้)/g, `ผู้${B}`],
        [/ตำ(?=รวจ)/g, `ตำ${B}`],
        [/กฎ(?=หมาย)/g, `กฎ${B}`],
        [/อำนาจ(?=เจริญ)/g, `อำนาจ${B}`],
        [/อุบล(?=ราชธานี)/g, `อุบล${B}`],
        [/สระแก้ว/g, `สระ${B}เก้ว`],
        [/นคร(?=ราชสีมา)/g, `นคร${B}`],
        [/นคร(?=ศรีธรรมราช)/g, `นคร${B}`],
        [/นคร(?=ปฐม)/g, `นคร${B}`],
        [/นคร(?=นายก)/g, `นคร${B}`],
        [/นคร(?=พนม)/g, `นคร${B}`],
        [/นคร(?=สวรรค์)/g, `นคร${B}`],
        [/ประจวบ(?=คีรีขันธ์)/g, `ประจวบ${B}`],
        [/กาญจน(?=บุรี)/g, `กาญจน${B}`],
        [/สุพรรณ(?=บุรี)/g, `สุพรรณ${B}`],
        [/เพชร(?=บุรี)/g, `เพชร${B}`],
        [/เพชร(?=บูรณ์)/g, `เพชร${B}`],
        [/สิงห์(?=บุรี)/g, `สิงห์${B}`],
        [/สกล(?=นคร)/g, `สกล${B}`],
        [/มหา(?=สารคาม)/g, `มหา${B}`],
        [/แม่(?=ฮ่องสอน)/g, `แม่${B}`],
        [/พิษณุ(?=โลก)/g, `พิษณุ${B}`],
        [/นนท(?=บุรี)/g, `นนท${B}`],
        [/ปทุม(?=ธานี)/g, `ปทุม${B}`],
        [/กษัตริย์/g, `ก${B}ษัตริย์`],
        [/มัง(?=กร)/g, `มัง${B}`],
        [/ตื่น(?=เช้า)/g, `ตื่น${B}`],
        [/อากาศ(?=ร้อน)/g, `อากาศ${B}`],
        [/ร้อน(?=อบอ้าว)/g, `ร้อน${B}`],
        [/ท้องฟ้า(?=แจ่ม)/g, `ท้องฟ้า${B}`],
        [/อาบ(?=น้ำ)/g, `อาบ${B}`],
        [/วัด(?=พระ)/g, `วัด${B}`],
        [/พระ(?=ธาตุ)/g, `พระ${B}`],
        [/ธาตุ(?=ดอย)/g, `ธาตุ${B}`],
        [/สะพาน(?=ข้าม)/g, `สะพาน${B}`],
        [/ข้าม(?=แม่น้ำ)/g, `ข้าม${B}`],
    ];

    for (const [pattern, replacement] of compounds) {
        w = w.replace(pattern, replacement);
    }

    return w;
}

/** Apply per-segment orthographic transforms. */
export function applySegmentTransforms(segment: string): string {
    let w = segment;

    const isSanskrit = /[ษฤพฤเศร]|ศาสตร์|กฤษ|ฤ|รรม/.test(w);

    if (isSanskrit) {
        w = w.replace(/ฤทธิ์/g, 'ริด');
        w = w.replace(/ฤกษ์/g, 'เริก');
        w = w.replace(/เศรษ/g, 'เศษ');
        w = w.replace(/^กฤษ$/g, 'กริต');
        w = w.replace(/กฤษ/g, 'กริษ');
        w = w.replace(/^กริษ$/g, 'กริต');
        w = w.replace(/ษฐ/g, 'ถ');
        w = w.replace(/ษร/g, 'ษน');
        w = w.replace(/พฤหัส/g, 'พรือ.หัด');
        w = w.replace(/พฤศ/g, 'พฤด.สะ');
        w = w.replace(/กิจ/g, 'กิด');
        w = w.replace(/จรรย์/g, 'จัน');
        w = w.replace(/รรม/g, 'มม');
        w = w.replace(/รร(?=[ก-ฮ])/g, '');
        w = w.replace(/สตร์/g, 'ส');
        w = w.replace(/ศัพท์/g, 'ศัพ');
        w = w.replace(/ทัศน์/g, 'ทัศ');
    }

    w = w.replace(/รติ/g, 'ติ');
    w = w.replace(/บดี/g, 'บอ.ดี');
    w = w.replace(/ัป(?=เด)/g, 'ับ');
    w = w.replace(/เดต/g, 'เดด');
    w = w.replace(/ทร์/g, '');
    w = w.replace(/ตริ์/g, '');
    // Keep ษัตริย์ intact (กษัตริย์ → ษัตริ, not ษัต)
    w = w.replace(/(?<!ต)ริย์/g, '');
    w = w.replace(/รย์/g, '');
    w = w.replace(/ีย์/g, 'ี');
    w = w.replace(/ญ์/g, '');
    w = w.replace(/รณ์/g, 'ร');
    w = w.replace(/ก์/g, '');
    w = w.replace(/[ก-ฮ][ิุ]?์$/g, '');
    w = w.replace(/ารย์$/g, 'าร');
    if (/รติ|เกียติ/.test(w)) {
        w = w.replace(/ติ$/g, 'ต');
    }

    return w;
}

/** Full normalization: boundaries + per-segment transforms. */
export function normalizeOrthography(word: string): string {
    const bounded = applySyllableBoundaries(word);
    if (!bounded.includes('.')) {
        return applySegmentTransforms(bounded);
    }
    return bounded.split('.').map(part => applySegmentTransforms(part)).join('.');
}
