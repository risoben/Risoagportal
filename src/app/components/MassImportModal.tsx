import { useState } from 'react';
import { X, ChevronDown, ChevronRight, Download } from 'lucide-react';

type ImportResult = {
  row: number;
  name: string;
  action: 'Neu anlegen' | 'Aktualisieren';
  status: 'success' | 'error';
};

type ErrorDetail = {
  row: number;
  field: string;
  problem: string;
  suggestion: string;
};

type MassImportModalProps = {
  onClose: () => void;
};

export function MassImportModal({ onClose }: MassImportModalProps) {
  const [phase, setPhase] = useState<'upload' | 'validation'>('upload');
  const [csvFile, setCSVFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  // TODO: Replace this mock data with a real API call.
  // Endpoint: POST /api/v1/portal/import/execute
  // See DEVELOPER_GUIDE.md Section 5 (Bulk Import) for the full response shape.
  const mockResults: ImportResult[] = [
    { row: 12, name: 'Killer, Anna', action: 'Neu anlegen', status: 'success' },
    { row: 13, name: 'Moer, Jonas', action: 'Aktualisieren', status: 'success' },
    { row: 21, name: 'Nguyen, Linh', action: 'Neu anlegen', status: 'error' },
    { row: 22, name: 'Schmidt, Lara', action: 'Aktualisieren', status: 'error' },
    { row: 31, name: 'Weber, Tom', action: 'Aktualisieren', status: 'success' },
  ];

  const mockErrors: ErrorDetail[] = [
    {
      row: 21,
      field: 'Email',
      problem: 'Ungültiges Format',
      suggestion: 'müller@firma.de (statt: na_me@f.de)',
    },
    {
      row: 21,
      field: 'Geburtstag',
      problem: 'Fehlendes Feld',
      suggestion: 'Format: DD.MM.YYYY (z.B. 25.06.1990)',
    },
    {
      row: 22,
      field: 'Name',
      problem: 'Leerzeichen am Anfang',
      suggestion: '"Schmidt, Lara" (ohne führendes Leerzeichen)',
    },
    {
      row: 22,
      field: 'Standort',
      problem: 'Standort existiert nicht',
      suggestion: 'Verfügbare: Heddesheim, Viernheim',
    },
  ];

  const successCount = mockResults.filter((r) => r.status === 'success').length;
  const totalCount = mockResults.length;
  const hasErrors = successCount < totalCount;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      setCSVFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCSVFile(file);
    }
  };

  const handleStartImport = () => {
    if (csvFile) {
      setPhase('validation');
    }
  };

  const handleDownloadTemplate = () => {
    alert('CSV-Vorlage wird heruntergeladen...');
  };

  const handleUploadAgain = () => {
    setPhase('upload');
    setCSVFile(null);
  };

  const handleSaveEmployees = () => {
    alert(`${successCount} Mitarbeiter wurden erfolgreich gespeichert!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-white rounded-xl shadow-2xl"
        style={{ width: '900px', maxHeight: '90vh', overflow: 'auto', borderRadius: '12px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E0E0]">
          <h2 className="text-[#273A5F] font-bold text-[24px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Mitarbeiter importieren
          </h2>
          <button onClick={onClose} className="text-[#666666] hover:text-[#000000] text-2xl">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
          {phase === 'upload' ? (
            <>
              {/* Help Box */}
              <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 mb-6"
                style={{ borderRadius: '8px' }}
              >
                <h3 className="text-[#333333] font-medium text-[13px] mb-3">
                  Massenimport von Riso-Mitarbeitern
                </h3>
                <ul className="text-[#666666] text-[12px] space-y-2" style={{ lineHeight: '1.6' }}>
                  <li>
                    • Bestandteil des CSV-Import für Mitarbeiter — speichert neue und aktualisiert bestehende
                    Einträge.
                  </li>
                  <li>• Speichere die Datei als CSV-Format (UTF-8 Encoding). Umlaute werden unterstützt.</li>
                  <li>
                    • Die CSV-Datei muss diese Spalten enthalten: Personennummer, Name, Abteilung, Email,
                    Geburtstag, Location
                  </li>
                  <li>
                    • Fehler und Fehlermeldungen werden nach dem Upload angezeigt. Du kannst die Fehler
                    korrigieren und nochmal hochladen.
                  </li>
                  <li>
                    • Solltest du weitere Fragen haben, schreib uns: support@riso-app.de oder nutze den
                    Chat-Support unten rechts.
                  </li>
                </ul>
              </div>

              {/* Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop} className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition ${
                  isDragging
                    ? 'bg-[#DDE7FF] border-[#0F429F] border-solid'
                    : csvFile
                    ? 'bg-[#E8EEFF] border-[#0F429F]'
                    : 'bg-[#F0F4FF] border-[#0F429F] hover:bg-[#E8EEFF]'
                }`}
                style={{ height: '280px', borderRadius: '12px', cursor: 'pointer' }}
              >
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                  <input type="file" accept=".csv" onChange={handleFileSelect} className="hidden" />
                  <div className="text-[48px] mb-3">📄</div>
                  <p className="text-[#273A5F] font-medium text-[16px] mb-2">
                    {csvFile ? csvFile.name : 'CSV-Datei hier ablegen'}
                  </p>
                  <p className="text-[#666666] text-[14px] mb-2">Klick zum Hochladen</p>
                  <p className="text-[#999999] text-[12px]">Nur CSV-Dateien, max. 10 MB</p>
                </label>
              </div>

              {/* Button Row */}
              <div className="flex items-center justify-between gap-3 mt-6">
                <button
                  onClick={handleDownloadTemplate} className="px-6 py-3 border border-[#0F429F] text-[#0F429F] font-medium rounded-full hover:bg-[#F0F4FF] transition flex items-center gap-2"
                  style={{ borderRadius: '24px' }}
                >
                  <Download className="w-4 h-4" />
                  Vorlage herunterladen
                </button>
                <button
                  onClick={handleStartImport}
                  disabled={!csvFile} className={`px-6 py-3 font-medium rounded-full transition ${
                    csvFile
                      ? 'bg-[#246AFF] text-white hover:bg-[#1a5ae6]'
                      : 'bg-[#CCCCCC] text-[#FFFFFF] cursor-not-allowed'
                  }`}
                  style={{ borderRadius: '24px' }}
                >
                  Import starten
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Status Info Box */}
              <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 mb-6 flex items-center gap-3"
                style={{ borderRadius: '8px' }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    hasErrors ? 'bg-[#F44336]' : 'bg-[#4CAF50]'
                  }`}
                >
                  <span className="text-white text-[16px]">{hasErrors ? '⚠️' : '✅'}</span>
                </div>
                <p className="text-[#333333] text-[14px]">
                  {successCount} von {totalCount} Mitarbeiter erfolgreich importiert
                </p>
              </div>

              {/* Validation Results Table */}
              <div className="border border-[#E0E0E0] rounded-lg overflow-hidden mb-6"
                style={{ borderRadius: '8px', maxHeight: '300px', overflowY: 'auto' }}
              >
                {/* Table Header */}
                <div className="bg-[#F0F4FF] grid grid-cols-[80px_150px_120px_100px] px-4 py-3 border-b border-[#E0E0E0] sticky top-0">
                  <div className="text-[#666666] text-[11px] font-medium uppercase">ZEILE</div>
                  <div className="text-[#666666] text-[11px] font-medium uppercase">NAME</div>
                  <div className="text-[#666666] text-[11px] font-medium uppercase">AKTION</div>
                  <div className="text-[#666666] text-[11px] font-medium uppercase text-center">STATUS</div>
                </div>

                {/* Table Rows */}
                {mockResults.map((result, index) => (
                  <div
                    key={index} className={`grid grid-cols-[80px_150px_120px_100px] px-4 py-2 border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#F0F4FF] transition ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                    }`}
                    style={{ minHeight: '40px' }}
                  >
                    <div className="text-[#333333] text-[12px] flex items-center">Zeile {result.row}</div>
                    <div className="text-[#333333] text-[12px] flex items-center">{result.name}</div>
                    <div className="text-[#333333] text-[12px] flex items-center">{result.action}</div>
                    <div className="flex items-center justify-center">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                          result.status === 'success'
                            ? 'bg-[#E8F5E9] text-[#4CAF50]'
                            : 'bg-[#FFEBEE] text-[#F44336]'
                        }`}
                        style={{ borderRadius: '12px' }}
                      >
                        {result.status === 'success' ? '✅ Erfolg' : '❌ Fehler'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Error Details Expander */}
              {hasErrors && (
                <div className="bg-[#FFF5F5] border border-[#FFEBEE] rounded-lg mb-6"
                  style={{ borderRadius: '8px' }}
                >
                  {/* Header (Clickable) */}
                  <button
                    onClick={() => setShowErrorDetails(!showErrorDetails)} className="w-full flex items-center justify-between px-4 py-4 border-b border-[#FFEBEE] hover:bg-[#FFEDED] transition"
                  >
                    <span className="text-[#273A5F] font-medium text-[13px]">Fehlerdetails</span>
                    {showErrorDetails ? (
                      <ChevronDown className="w-5 h-5 text-[#0F429F] transition-transform" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-[#0F429F] transition-transform" />
                    )}
                  </button>

                  {/* Content (Expandable) */}
                  {showErrorDetails && (
                    <div className="p-4">
                      <div className="border border-[#FFEBEE] rounded overflow-hidden"
                        style={{ maxHeight: '250px', overflowY: 'auto' }}
                      >
                        {/* Error Details Table Header */}
                        <div className="bg-[#FFE8E8] grid grid-cols-[80px_120px_200px_1fr] px-3 py-2 sticky top-0">
                          <div className="text-[#D32F2F] text-[11px] font-medium uppercase">ZEILE</div>
                          <div className="text-[#D32F2F] text-[11px] font-medium uppercase">FELD</div>
                          <div className="text-[#D32F2F] text-[11px] font-medium uppercase">PROBLEM</div>
                          <div className="text-[#D32F2F] text-[11px] font-medium uppercase">VORSCHLAG</div>
                        </div>

                        {/* Error Details Rows */}
                        {mockErrors.map((error, index) => (
                          <div
                            key={index} className={`grid grid-cols-[80px_120px_200px_1fr] px-3 py-2 border-b border-[#FFEBEE] last:border-b-0 ${
                              index % 2 === 0 ? 'bg-white' : 'bg-[#FFF5F5]'
                            }`}
                          >
                            <div className="text-[#333333] text-[12px]">Zeile {error.row}</div>
                            <div className="text-[#333333] text-[12px]">{error.field}</div>
                            <div className="text-[#333333] text-[12px]">{error.problem}</div>
                            <div className="text-[#666666] text-[12px]">{error.suggestion}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Button Row (Phase 2) */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handleUploadAgain} className="px-6 py-3 border border-[#0F429F] text-[#0F429F] font-medium rounded-full hover:bg-[#F0F4FF] transition"
                  style={{ borderRadius: '24px' }}
                >
                  Nochmal hochladen
                </button>
                <button
                  onClick={handleSaveEmployees} className="px-6 py-3 bg-[#4CAF50] text-white font-medium rounded-full hover:bg-[#45a049] transition"
                  style={{ borderRadius: '24px' }}
                >
                  Mitarbeiter speichern
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
