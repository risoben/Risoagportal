import { useState } from 'react';
import { Search, Eye, Download, FileText, FileSpreadsheet, File, Check } from 'lucide-react';

type FileType = 'PDF' | 'Excel' | 'CSV';

type Report = {
  id: string;
  date: string;
  month: string;
  createdDate: string;
  version: string;
  fileType: FileType;
  fileName: string;
};

type Benefit = {
  id: string;
  icon: string;
  name: string;
  employees: number;
  budgetMonth: number;
  usedMonth: number;
  available: number;
  percentage: number;
};

const mockReports: Report[] = [
  {
    id: '1',
    date: '01.04.',
    month: 'April',
    createdDate: '01.04.2026',
    version: 'v2.3',
    fileType: 'PDF',
    fileName: 'Monatsbericht April',
  },
  {
    id: '2',
    date: '31.03.',
    month: 'März',
    createdDate: '31.03.2026',
    version: 'v2.2',
    fileType: 'Excel',
    fileName: 'Quartalsübersicht Q1',
  },
  {
    id: '3',
    date: '28.02.',
    month: 'Februar',
    createdDate: '28.02.2026',
    version: 'v2.1',
    fileType: 'PDF',
    fileName: 'Monatsbericht Februar',
  },
  {
    id: '4',
    date: '31.01.',
    month: 'Januar',
    createdDate: '31.01.2026',
    version: 'v2.0',
    fileType: 'Excel',
    fileName: 'Jahresübersicht 2025',
  },
  {
    id: '5',
    date: '15.01.',
    month: 'Januar',
    createdDate: '15.01.2026',
    version: 'v1.9',
    fileType: 'CSV',
    fileName: 'Mitarbeiter-Export 2025',
  },
];

const mockBenefits: Benefit[] = [
  {
    id: 'essenszuschuss',
    icon: '🍽️',
    name: 'Essenszuschuss',
    employees: 45,
    budgetMonth: 1250,
    usedMonth: 850,
    available: 400,
    percentage: 68,
  },
  {
    id: 'internet',
    icon: '📡',
    name: 'Internet',
    employees: 38,
    budgetMonth: 950,
    usedMonth: 720,
    available: 230,
    percentage: 76,
  },
  {
    id: 'mobilitaet',
    icon: '🚗',
    name: 'Mobilität',
    employees: 28,
    budgetMonth: 2100,
    usedMonth: 1890,
    available: 210,
    percentage: 90,
  },
  {
    id: 'urban-sports',
    icon: '⚽',
    name: 'Urban Sports Club',
    employees: 52,
    budgetMonth: 1560,
    usedMonth: 1248,
    available: 312,
    percentage: 80,
  },
  {
    id: 'kindergeld',
    icon: '👶',
    name: 'Kindergeld',
    employees: 15,
    budgetMonth: 750,
    usedMonth: 525,
    available: 225,
    percentage: 70,
  },
  {
    id: 'weiterbildung',
    icon: '📚',
    name: 'Weiterbildung',
    employees: 22,
    budgetMonth: 1800,
    usedMonth: 1440,
    available: 360,
    percentage: 80,
  },
  {
    id: 'sachbezug',
    icon: '🎁',
    name: 'Sachbezug',
    employees: 67,
    budgetMonth: 3350,
    usedMonth: 2680,
    available: 670,
    percentage: 80,
  },
  {
    id: 'homeoffice',
    icon: '🏠',
    name: 'Homeoffice-Ausstattung',
    employees: 41,
    budgetMonth: 1640,
    usedMonth: 1148,
    available: 492,
    percentage: 70,
  },
];

export function ReportsPage() {
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'Alle' | FileType>('Alle');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch = report.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'Alle' || report.fileType === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleToggleReport = (reportId: string) => {
    const newSet = new Set(selectedReports);
    if (newSet.has(reportId)) {
      newSet.delete(reportId);
    } else {
      newSet.add(reportId);
    }
    setSelectedReports(newSet);
  };

  const handleToggleAll = () => {
    if (selectedReports.size === filteredReports.length) {
      setSelectedReports(new Set());
    } else {
      setSelectedReports(new Set(filteredReports.map((r) => r.id)));
    }
  };

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

  const handleView = (reportId: string) => {
    alert(`Anzeigen: Report ${reportId}`);
  };

  const handleDownload = (reportId: string, fileName: string) => {
    alert(`Report "${fileName}" erfolgreich heruntergeladen`);
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
        <p className="text-[#666666] text-sm">
          Hier findest du alle deine generierten Reports zum Download
        </p>
      </div>

      {/* Filter Area */}
      <div className="px-8 py-6 border-b border-[#E8E8E8]">
        <div className="flex items-center gap-4">
          {/* Search Field */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666666]" />
            <input
              type="text"
              placeholder="Nach Dateiname suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 border border-[#E0E0E0] rounded-lg text-sm text-[#000000] focus:outline-none focus:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:ring-opacity-20"
              style={{ borderRadius: '8px', padding: '12px 16px 12px 48px' }}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('Alle')}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition ${
                filterType === 'Alle'
                  ? 'bg-[#0F429F] text-white'
                  : 'bg-white text-[#666666] border border-[#E0E0E0] hover:bg-gray-50'
              }`}
              style={{ borderRadius: '8px' }}
            >
              Alle
            </button>
            <button
              onClick={() => setFilterType('PDF')}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition ${
                filterType === 'PDF'
                  ? 'bg-[#0F429F] text-white'
                  : 'bg-white text-[#666666] border border-[#E0E0E0] hover:bg-gray-50'
              }`}
              style={{ borderRadius: '8px' }}
            >
              PDF
            </button>
            <button
              onClick={() => setFilterType('Excel')}
              className={`px-6 py-3 text-sm font-medium rounded-lg transition ${
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
      </div>

      {/* Table */}
      <div className="px-8 py-6">
        <div className="border border-[#E8E8E8] rounded-lg overflow-hidden">
          {/* Table Header */}
          <div
            className="bg-[#F0F4FF] grid grid-cols-[auto_100px_120px_140px_100px_120px_1fr_280px] h-14 items-center px-4"
            style={{ padding: '16px' }}
          >
            <div className="flex items-center" style={{ marginRight: '12px' }}>
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedReports.size === filteredReports.length && filteredReports.length > 0}
                  onChange={handleToggleAll}
                  className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer hover:border-[#246AFF] transition-colors"
                />
                {selectedReports.size === filteredReports.length && filteredReports.length > 0 && (
                  <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                )}
              </div>
            </div>
            <div className="text-[#666666] text-xs font-medium uppercase">Datum</div>
            <div className="text-[#666666] text-xs font-medium uppercase">Monat</div>
            <div className="text-[#666666] text-xs font-medium uppercase">Erstellungsdatum</div>
            <div className="text-[#666666] text-xs font-medium uppercase">Version</div>
            <div className="text-[#666666] text-xs font-medium uppercase">Dateityp</div>
            <div className="text-[#666666] text-xs font-medium uppercase">Dateiname</div>
            <div className="text-[#666666] text-xs font-medium uppercase">Aktion</div>
          </div>

          {/* Table Rows */}
          {filteredReports.map((report, index) => (
            <div
              key={report.id}
              className={`grid grid-cols-[auto_100px_120px_140px_100px_120px_1fr_280px] items-center px-4 border-b border-[#E8E8E8] last:border-b-0 hover:bg-[#EEF2FF] transition ${
                index % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FB]'
              }`}
              style={{ padding: '16px', minHeight: '56px' }}
            >
              {/* Checkbox */}
              <div className="flex items-center" style={{ marginRight: '12px' }}>
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedReports.has(report.id)}
                    onChange={() => handleToggleReport(report.id)}
                    className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer hover:border-[#246AFF] transition-colors"
                  />
                  {selectedReports.has(report.id) && (
                    <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="text-[#000000] text-sm">{report.date}</div>

              {/* Month */}
              <div className="text-[#000000] text-sm">{report.month}</div>

              {/* Created Date */}
              <div className="text-[#000000] text-sm">{report.createdDate}</div>

              {/* Version */}
              <div className="text-[#000000] text-sm">{report.version}</div>

              {/* File Type */}
              <div className="flex items-center gap-2">
                {getFileTypeIcon(report.fileType)}
                <span className="text-[#000000] text-sm">{report.fileType}</span>
              </div>

              {/* File Name */}
              <div className="text-[#000000] text-sm font-medium">{report.fileName}</div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(report.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#0F429F] text-[#0F429F] font-medium text-xs rounded-full hover:bg-[#F0F4FF] transition"
                  style={{ borderRadius: '24px', padding: '8px 16px' }}
                >
                  <Eye className="w-4 h-4" />
                  Ansehen
                </button>
                <button
                  onClick={() => handleDownload(report.id, report.fileName)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0F429F] text-white font-medium text-xs rounded-full hover:bg-[#0A2E7A] transition"
                  style={{ borderRadius: '24px', padding: '8px 16px' }}
                >
                  <Download className="w-4 h-4" />
                  Herunterladen
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="px-8 py-6 flex items-center justify-center gap-2 border-b border-[#E8E8E8]">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
            currentPage === 1
              ? 'border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed'
              : 'border-[#D0D0D0] text-[#000000] hover:bg-gray-50'
          }`}
        >
          Previous
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
              currentPage === page
                ? 'bg-[#0F429F] text-white'
                : 'border border-[#D0D0D0] text-[#000000] hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === 3}
          className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
            currentPage === 3
              ? 'border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed'
              : 'border-[#D0D0D0] text-[#000000] hover:bg-gray-50'
          }`}
        >
          Next
        </button>
      </div>

      {/* Section 2: Benefit-Verwendungsübersicht */}
      <div className="px-8 py-8 bg-[#F9FAFB]">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-[#000000] font-bold text-[24px] mb-2">Benefit-Übersicht</h2>
          <p className="text-[#666666] text-sm">Nutzer nach Benefit und Budget-Verwendung</p>
        </div>

        {/* Statistics Box */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-8" style={{ borderRadius: '12px' }}>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <p className="text-[#666666] text-xs mb-2">Gesamtbudget (dieser Monat)</p>
              <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalBudget)}</p>
            </div>
            <div>
              <p className="text-[#666666] text-xs mb-2">Gesamtvergeben</p>
              <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalUsed)}</p>
            </div>
            <div>
              <p className="text-[#666666] text-xs mb-2">Gesamtverfügbar</p>
              <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalAvailable)}</p>
            </div>
            <div>
              <p className="text-[#666666] text-xs mb-2">Durchschn. Nutzungsquote</p>
              <p className="text-[#0F429F] font-bold text-2xl">{avgUtilization}%</p>
            </div>
          </div>
        </div>

        {/* Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white border border-[#E0E0E0] rounded-xl p-4 hover:shadow-lg transition-shadow"
              style={{ borderRadius: '12px' }}
            >
              {/* Icon and Name */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-lg"
                  style={{ backgroundColor: '#F0F4FF' }}
                >
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
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
                  <div
                    className="h-full bg-[#246AFF] rounded-full transition-all"
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
