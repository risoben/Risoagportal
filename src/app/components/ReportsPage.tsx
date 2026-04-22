import { useState } from 'react';
import { Search, Eye, Download, FileText, FileSpreadsheet, File } from 'lucide-react';

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
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedReports.size === filteredReports.length && filteredReports.length > 0}
                onChange={handleToggleAll}
                className="w-5 h-5 rounded border-2 border-[#0F429F] text-[#0F429F] focus:ring-[#0F429F] cursor-pointer"
                style={{ marginRight: '12px' }}
              />
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedReports.has(report.id)}
                  onChange={() => handleToggleReport(report.id)}
                  className="w-5 h-5 rounded border-2 border-[#0F429F] text-[#0F429F] focus:ring-[#0F429F] cursor-pointer"
                  style={{ marginRight: '12px' }}
                />
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
      <div className="px-8 py-6 flex items-center justify-center gap-2">
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
    </div>
  );
}
