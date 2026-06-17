export type AuditCategory =
    | 'basic'
    | 'compound'
    | 'geography'
    | 'calendar'
    | 'loanword'
    | 'sanskrit'
    | 'silent-consonant'
    | 'cluster'
    | 'regression';

export interface AuditWord {
    thai: string;
    expected: string;
    category: AuditCategory;
}

/** Verified corpus — must pass in CI (regression guard). */
export const VERIFIED_AUDIT: AuditWord[] = [
    { thai: 'ใส่ใจ', expected: 'saichai', category: 'regression' },
    { thai: 'มังกร', expected: 'mangkon', category: 'regression' },
    { thai: 'การจราจร', expected: 'kancharachon', category: 'regression' },
    { thai: 'กษัตริย์', expected: 'kasatri', category: 'regression' },
    { thai: 'ผู้ใช้', expected: 'phuchai', category: 'compound' },
    { thai: 'บ้านจัดสรร', expected: 'banjadsan', category: 'compound' },
    { thai: 'ตำรวจ', expected: 'tamruat', category: 'compound' },
    { thai: 'กฎหมาย', expected: 'kotmai', category: 'compound' },
    { thai: 'อินทรี', expected: 'intri', category: 'cluster' },
    { thai: 'สมุทรปราการ', expected: 'samutprakan', category: 'geography' },
    { thai: 'นครราชสีมา', expected: 'nakhonratchasima', category: 'geography' },
    { thai: 'มกราคม', expected: 'mokkarakhom', category: 'calendar' },
    { thai: 'เมษายน', expected: 'mesaayon', category: 'calendar' },
    { thai: 'ซอฟต์แวร์', expected: 'software', category: 'loanword' },
    { thai: 'กูเกิล', expected: 'google', category: 'loanword' },
    { thai: 'ธรรมศาสตร์', expected: 'thammasat', category: 'sanskrit' },
    { thai: 'อาจารย์', expected: 'achan', category: 'silent-consonant' },
];
