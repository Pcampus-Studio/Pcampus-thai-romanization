export type AuditCategory = 'basic' | 'compound' | 'geography' | 'calendar' | 'loanword' | 'sanskrit' | 'silent-consonant' | 'cluster' | 'regression';
export interface AuditWord {
    thai: string;
    expected: string;
    category: AuditCategory;
}
/** Verified corpus — must pass in CI (regression guard). */
export declare const VERIFIED_AUDIT: AuditWord[];
//# sourceMappingURL=audit.data.d.ts.map