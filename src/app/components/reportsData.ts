export type FileType = 'PDF' | 'Excel' | 'CSV';

export type Report = {
  id: number;
  year: number;
  month: number;
  createdDate: string;
  version: string;
  fileType: FileType;
  fileName: string;
};

// TODO: Replace this mock data with a real API call.
// Endpoint: GET /api/v1/portal/reports?type=&location=&month=
// See DEVELOPER_GUIDE.md Section 5 (Report) for the full response shape.
export const mockReports: Report[] = [
  { id: 1, year: 2026, month: 4,  createdDate: '01.04.2026', version: 'v2.3', fileType: 'PDF',   fileName: 'Monatsbericht April' },
  { id: 2, year: 2026, month: 3,  createdDate: '31.03.2026', version: 'v2.2', fileType: 'Excel', fileName: 'Quartalsübersicht Q1' },
  { id: 3, year: 2026, month: 2,  createdDate: '28.02.2026', version: 'v2.1', fileType: 'PDF',   fileName: 'Monatsbericht Februar' },
  { id: 4, year: 2026, month: 1,  createdDate: '31.01.2026', version: 'v2.0', fileType: 'Excel', fileName: 'Jahresübersicht 2025' },
  { id: 5, year: 2025, month: 12, createdDate: '31.12.2025', version: 'v1.9', fileType: 'PDF',   fileName: 'Monatsbericht Dezember' },
  { id: 6, year: 2025, month: 11, createdDate: '30.11.2025', version: 'v1.8', fileType: 'CSV',   fileName: 'Mitarbeiter-Export November' },
  { id: 7, year: 2025, month: 10, createdDate: '31.10.2025', version: 'v1.7', fileType: 'PDF',   fileName: 'Monatsbericht Oktober' },
  { id: 8, year: 2025, month: 9,  createdDate: '30.09.2025', version: 'v1.6', fileType: 'Excel', fileName: 'Quartalsübersicht Q3' },
  { id: 9, year: 2025, month: 8,  createdDate: '31.08.2025', version: 'v1.5', fileType: 'PDF',   fileName: 'Monatsbericht August' },
  { id: 10, year: 2026, month: 1, createdDate: '15.01.2026', version: 'v1.9', fileType: 'CSV',   fileName: 'Mitarbeiter-Export 2025' },
];
