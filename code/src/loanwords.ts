/**
 * Loanword transliteration — Thai phonetic spellings mapped to Latin.
 */
export const LOANWORD_MAP: Record<string, string> = {
    'ซอฟต์แวร์': 'software',
    'ฮาร์ดแวร์': 'hardware',
    'สมาร์ทโฟน': 'smartphone',
    'เซิร์ฟเวอร์': 'server',
    'ดาต้าเบส': 'database',
    'บลูทูธ': 'bluetooth',
    'ซูเปอร์มาร์เก็ต': 'supermarket',
    'แอปพลิเคชัน': 'application',
    'แอลกอริทึม': 'algorithm',
    'อินเทอร์เฟซ': 'interface',
    'เน็ตเวิร์ก': 'network',
    'คลาวด์': 'cloud',
    'ไมโครซอฟต์': 'microsoft',
    'กูเกิล': 'google',
    'แอปเปิล': 'apple',
    'เฟซบุ๊ก': 'facebook',
    'อินสตาแกรม': 'instagram',
    'ยูทูบ': 'youtube',
    'ทวิตเตอร์': 'twitter',
    'ลิงก์อิน': 'linkedin',
    'สปอติฟาย': 'spotify',
    'น็อกเทีย': 'netflix',
    'แอนดรอยด์': 'android',
    'ไอโฟน': 'iphone',
    'ไลน์': 'line',
    'ช็อปปี้': 'shopee',
    'ลาซาด้า': 'lazada',
    'กราฟ': 'graph',
    'บล็อกเชน': 'blockchain',
    'คริปโต': 'crypto',
    'วีพีเอ็น': 'vpn',
    'ยูเอสบี': 'usb',
    'ดีเอ็นเอ': 'dna',
    'อาร์เอ็ม': 'arm',
};

export function romanizeLoanword(text: string): string | null {
    return LOANWORD_MAP[text] ?? null;
}
