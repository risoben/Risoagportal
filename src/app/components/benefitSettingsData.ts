export const benefitsSettingsData: Record<string, { category: 'cash' | 'other' | 'insurance'; isYearlyBudget?: boolean }> = {
  'mittagessen': { category: 'cash' },
  'internet': { category: 'cash' },
  'kindergarten': { category: 'cash' },
  'commuting': { category: 'cash' },
  'erholung': { category: 'cash', isYearlyBudget: true },
  'sachbezug': { category: 'other' },
  'danke-bonus': { category: 'cash' },
  'geburtstag': { category: 'other' },
  'oepnv': { category: 'cash' },
  'bkv': { category: 'insurance' },
  'bav': { category: 'insurance' },
};
