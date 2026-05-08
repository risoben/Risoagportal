export const benefitsSettingsData: Record<string, { category: 'cash' | 'voucher' | 'insurance'; isYearlyBudget?: boolean }> = {
  'mittagessen': { category: 'cash' },
  'internet': { category: 'cash' },
  'kindergarten': { category: 'cash' },
  'commuting': { category: 'cash' },
  'erholung': { category: 'cash', isYearlyBudget: true },
  'sachbezug': { category: 'voucher' },
  'danke-bonus': { category: 'cash' },
  'geburtstag': { category: 'voucher', isYearlyBudget: true },
  'oepnv': { category: 'cash' },
  'bkv': { category: 'insurance' },
  'bav': { category: 'insurance' },
};
