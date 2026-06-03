import React, { useState } from 'react';
import { Search, Eye, Download, FileText, FileSpreadsheet, File } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';

type FileType = 'PDF' | 'Excel' | 'CSV';

type Report = {
  id: number;
  year: number;
  month: number;
  createdDate: string;
  version: string;
  fileType: FileType;
  fileName: string;
};

type Benefit = {
  id: string;
  name: string;
  employees: number;
  budgetMonth: number;
  usedMonth: number;
  available: number;
  percentage: number;
};

// TODO: Replace this mock data with a real API call.
// Endpoint: GET /api/v1/portal/reports?type=&location=&month=
// See DEVELOPER_GUIDE.md Section 5 (Report) for the full response shape.
const mockReports: Report[] = [
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

const mockBenefits: Benefit[] = [
  {
    id: 'essenszuschuss',
    name: 'Essenszuschuss',
    employees: 45,
    budgetMonth: 1250,
    usedMonth: 850,
    available: 400,
    percentage: 68,
  },
  {
    id: 'internet',
    name: 'Internet',
    employees: 38,
    budgetMonth: 950,
    usedMonth: 720,
    available: 230,
    percentage: 76,
  },
  {
    id: 'fahrkostenzuschuss',
    name: 'Fahrkostenzuschuss',
    employees: 28,
    budgetMonth: 2100,
    usedMonth: 1890,
    available: 210,
    percentage: 90,
  },
  {
    id: 'erholung',
    name: 'Erholung',
    employees: 52,
    budgetMonth: 1560,
    usedMonth: 1248,
    available: 312,
    percentage: 80,
  },
  {
    id: 'kindergarten',
    name: 'Kindergarten',
    employees: 15,
    budgetMonth: 750,
    usedMonth: 525,
    available: 225,
    percentage: 70,
  },
  {
    id: 'danke-bonus',
    name: 'Danke-Bonus',
    employees: 22,
    budgetMonth: 1800,
    usedMonth: 1440,
    available: 360,
    percentage: 80,
  },
  {
    id: 'sachbezug',
    name: 'Sachbezug',
    employees: 67,
    budgetMonth: 3350,
    usedMonth: 2680,
    available: 670,
    percentage: 80,
  },
  {
    id: 'geburtstag',
    name: 'Geburtstag',
    employees: 41,
    budgetMonth: 1640,
    usedMonth: 1148,
    available: 492,
    percentage: 70,
  },
  {
    id: 'bkv',
    name: 'BKV',
    employees: 38,
    budgetMonth: 1920,
    usedMonth: 1728,
    available: 192,
    percentage: 90,
  },
  {
    id: 'bav',
    name: 'BAV',
    employees: 52,
    budgetMonth: 2600,
    usedMonth: 2340,
    available: 260,
    percentage: 90,
  },
];

// TODO V2: "Ansehen" button should open the PDF in a new browser tab (not download). For Excel files this is complex — consider showing "Ansehen" only for PDF/CSV in V2.
// TODO V2: Add configurable page size selector (10 / 30 / 50 / 100 entries per page).

export function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'Alle' | FileType>('Alle');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'Alle' || report.fileType === filterType;
    return matchesSearch && matchesFilter;
  });
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getFileTypeIcon = (type: FileType) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'Excel':
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case 'CSV':
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleView = (reportId: number) => {
    alert(`Anzeigen: Report ${reportId}`);
  };

  const handleDownload = (reportId: number, fileName: string, format: FileType) => {
    // TODO: Call authenticated portal endpoint — never expose Zoho WorkDrive URL directly.
    // Flow: GET /api/v1/portal/reports/{id}/download?format=pdf|excel
    //   → backend fetches file from WorkDrive (zoho_drive_id from report_configuration)
    //   → streams file to client as attachment (Content-Disposition: attachment)
    // Report files are stored per-company in WorkDrive folders (report_folder_id in DB).
    alert(`Report "${fileName}" (${format}) wird heruntergeladen...`);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('de-DE') + '€';
  };

  // Calculate totals for statistics box
  const totalBudget = mockBenefits.reduce((sum, b) => sum + b.budgetMonth, 0);
  const totalUsed = mockBenefits.reduce((sum, b) => sum + b.usedMonth, 0);
  const totalAvailable = mockBenefits.reduce((sum, b) => sum + b.available, 0);
  const avgUtilization = Math.round((totalUsed / totalBudget) * 100);

  return (
    <div className="flex-1 bg-white overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#E8E8E8]">
        <h1 className="text-[#000000] font-bold text-[28px] mb-2">Meine Berichte</h1>
        <p className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>
          Hier findest du alle generierten Berichte zum Herunterladen
        </p>
      </div>

      {/* Filter Area */}
      <div className="px-8 py-6 border-b border-[#E8E8E8]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Search Field */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666666]" />
              <input
                type="text"
                placeholder="Nach Dateiname suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-12 pl-12 pr-4 border border-[#E0E0E0] rounded-lg text-sm text-[#000000] focus:outline-none focus:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:ring-opacity-20"
                style={{ borderRadius: '8px', padding: '12px 16px 12px 48px' }}
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('Alle')} className={`px-6 py-3 text-sm font-medium rounded-lg transition ${
                  filterType === 'Alle'
                    ? 'bg-[#0F429F] text-white'
                    : 'bg-white text-[#666666] border border-[#E0E0E0] hover:bg-gray-50'
                }`}
                style={{ borderRadius: '8px' }}
              >
                Alle
              </button>
              <button
                onClick={() => setFilterType('PDF')} className={`px-6 py-3 text-sm font-medium rounded-lg transition ${
                  filterType === 'PDF'
                    ? 'bg-[#0F429F] text-white'
                    : 'bg-white text-[#666666] border border-[#E0E0E0] hover:bg-gray-50'
                }`}
                style={{ borderRadius: '8px' }}
              >
                PDF
              </button>
              <button
                onClick={() => setFilterType('Excel')} className={`px-6 py-3 text-sm font-medium rounded-lg transition ${
                  filterType === 'Excel'
                    ? 'bg-[#0F429F] text-white'
                    : 'bg-white text-[#666666] border border-[#E0E0E0] hover:bg-gray-50'
                }`}
                style={{ borderRadius: '8px' }}
              >
                Excel
              </button>
            </div>
          </div>

          {/* Download All Button */}
          <button
            onClick={() => alert('Alle Reports werden heruntergeladen')} className="flex items-center gap-2 px-6 py-3 bg-[#0F429F] text-white text-sm font-medium rounded-full hover:bg-[#0A2E7A] transition"
            style={{ borderRadius: '24px' }}
          >
            <Download className="w-4 h-4" />
            Alle herunterladen
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-8 py-6">
        <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.6fr) minmax(0,0.6fr) minmax(0,1.2fr) minmax(0,0.6fr) minmax(0,0.8fr) minmax(0,2fr) minmax(280px,1.8fr)', minWidth: '960px' }}>
            {['Jahr','Monat','Erstellungsdatum','Version','Dateityp','Dateiname','Aktion'].map(h => (
              <div key={h} className="text-white font-bold text-xs uppercase tracking-wide" style={{ background: '#273A5F', height: '48px', display: 'flex', alignItems: 'center', padding: '0 24px' }}>{h}</div>
            ))}
            {paginatedReports.map((report, index) => {
              const bg = index % 2 === 0 ? '#fff' : '#F9FAFB';
              const c: React.CSSProperties = { background: bg, borderBottom: '1px solid #E5E7EB', height: '56px', display: 'flex', alignItems: 'center', padding: '0 24px' };
              return (
                <React.Fragment key={report.id}>
                  <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{report.year}</div>
                  <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{report.month}</div>
                  <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{report.createdDate}</div>
                  <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{report.version}</div>
                  <div style={{ ...c, gap: '6px' }}>
                    {getFileTypeIcon(report.fileType)}
                    <span className="text-sm text-[#000000]">{report.fileType}</span>
                  </div>
                  <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000] truncate">{report.fileName}</div>
                  <div style={{ ...c, gap: '6px', flexShrink: 0 }}>
                    <button onClick={() => handleView(report.id)} className="flex items-center gap-1 px-3 py-1.5 border border-[#0F429F] text-[#0F429F] text-xs rounded-full hover:bg-[#F0F4FF] transition whitespace-nowrap">
                      <Eye className="w-3.5 h-3.5" />Ansehen
                    </button>
                    <button onClick={() => handleDownload(report.id, report.fileName, 'PDF')} className="flex items-center gap-1 px-2 py-1.5 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition whitespace-nowrap">
                      <FileText className="w-3.5 h-3.5" />PDF
                    </button>
                    <button onClick={() => handleDownload(report.id, report.fileName, 'Excel')} className="flex items-center gap-1 px-2 py-1.5 bg-green-600 text-white text-xs rounded-full hover:bg-green-700 transition whitespace-nowrap">
                      <FileSpreadsheet className="w-3.5 h-3.5" />Excel
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="px-8 py-6 flex items-center justify-between border-b border-[#E8E8E8]">
        <div className="flex items-center gap-2">
          <span className="text-[#666666] text-sm">Anzeigen:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-[#D0D0D0] rounded px-2 py-1 text-sm text-[#000000] focus:outline-none focus:border-[#0F429F]"
          >
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-[#666666] text-sm">Einträge</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1} className={`p-2 border rounded-lg transition ${currentPage === 1 ? 'border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed' : 'border-[#D0D0D0] text-[#000000] hover:bg-gray-50'}`}
          >
            ‹
          </button>
          <span className="text-[#666666] text-sm">Seite {currentPage} von {totalPages}</span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages} className={`p-2 border rounded-lg transition ${currentPage === totalPages ? 'border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed' : 'border-[#D0D0D0] text-[#000000] hover:bg-gray-50'}`}
          >
            ›
          </button>
        </div>
      </div>

      {/* Section 2: Benefit-Verwendungsübersicht */}
      <div className="px-8 py-8 bg-[#F9FAFB]">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-[#000000] font-bold text-[24px] mb-2">Benefit-Übersicht</h2>
          <p className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>Mitarbeiter nach Benefit und Budget-Verwendung</p>
        </div>

        {/* Statistics Box */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-8" style={{ borderRadius: '12px' }}>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-[#666666] text-sm font-bold mb-2">Gesamtbudget (dieser Monat)</p>
              <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalBudget)}</p>
            </div>
            <div>
              <p className="text-[#666666] text-sm font-bold mb-2">Gesamtvergeben</p>
              <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalUsed)}</p>
            </div>
            <div>
              <p className="text-[#666666] text-sm font-bold mb-2">Gesamtverfügbar</p>
              <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalAvailable)}</p>
            </div>
            <div>
              <p className="text-[#666666] text-sm font-bold mb-2">Durchschn. Nutzungsquote</p>
              <p className="text-[#0F429F] font-bold text-2xl">{avgUtilization}%</p>
            </div>
          </div>
        </div>

        {/* Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockBenefits.map((benefit) => (
            <div
              key={benefit.id} className="bg-white border border-[#E0E0E0] rounded-xl p-4 hover:shadow-lg transition-shadow"
              style={{ borderRadius: '12px' }}
            >
              {/* Icon and Name */}
              <div className="flex items-center gap-3 mb-4">
                <BenefitIconComponent benefitName={benefit.name} size={32} background={true} />
                <h3 className="text-[#000000] font-bold text-sm flex-1">{benefit.name}</h3>
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-[#666666]">Mitarbeiter nutzen:</span>
                  <span className="text-[#000000] font-medium">{benefit.employees} Mitarbeiter</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#666666]">Budget (Monat):</span>
                  <span className="text-[#000000] font-medium">{formatCurrency(benefit.budgetMonth)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#666666]">Verwendet (dieser Monat):</span>
                  <span className="text-[#000000] font-medium">{formatCurrency(benefit.usedMonth)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#666666]">Verfügbar (Übrig):</span>
                  <span className="text-[#000000] font-medium">{formatCurrency(benefit.available)}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#666666]">Nutzungsquote</span>
                  <span className="text-[#0F429F] font-bold">{benefit.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#246AFF] rounded-full transition-all"
                    style={{ width: `${benefit.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
