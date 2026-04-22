import { useState, useRef } from 'react';
import { Upload, Download, FileText, ChevronDown, ChevronUp } from 'lucide-react';

type ValidationResult = {
  row_number: number;
  name: string;
  action: 'create' | 'update';
  status: 'ok' | 'error';
  errors: Array<{
    field: string;
    problem: string;
    suggestion: string;
  }>;
};

type ValidationResponse = {
  total_rows: number;
  valid_rows: number;
  invalid_rows: number;
  results: ValidationResult[];
};

export function MassImport() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validationData, setValidationData] = useState<ValidationResponse | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [expandedErrorRows, setExpandedErrorRows] = useState<Set<number>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    if (file.size > 10 * 1024 * 1024) {
      alert('Datei ist zu groß. Maximal 10 MB erlaubt.');
      return;
    }

    if (!file.name.endsWith('.csv')) {
      alert('Bitte nur CSV-Dateien hochladen.');
      return;
    }

    setUploadedFile(file);
    setIsValidating(true);

    // Simulate API call for validation
    setTimeout(() => {
      // Mock validation response
      const mockResponse: ValidationResponse = {
        total_rows: 25,
        valid_rows: 21,
        invalid_rows: 4,
        results: [
          {
            row_number: 12,
            name: 'Keller, Anna',
            action: 'create',
            status: 'ok',
            errors: [],
          },
          {
            row_number: 13,
            name: 'Meier, Jonas',
            action: 'update',
            status: 'ok',
            errors: [],
          },
          {
            row_number: 14,
            name: 'Schmidt, Peter',
            action: 'create',
            status: 'ok',
            errors: [],
          },
          {
            row_number: 15,
            name: 'Wagner, Lisa',
            action: 'update',
            status: 'ok',
            errors: [],
          },
          {
            row_number: 21,
            name: 'Nguyen, Linh',
            action: 'create',
            status: 'error',
            errors: [
              {
                field: 'E-Mail',
                problem: 'Ungültiges Format',
                suggestion: 'name@firma.de',
              },
              {
                field: 'Geburtsdatum',
                problem: 'Ungültig (Format)',
                suggestion: 'TT.MM.JJJJ',
              },
            ],
          },
          {
            row_number: 22,
            name: 'Schmidt, Lara',
            action: 'update',
            status: 'error',
            errors: [
              {
                field: 'Budget',
                problem: 'Wert zu hoch',
                suggestion: '0–2000',
              },
            ],
          },
        ],
      };

      setValidationData(mockResponse);
      setIsValidating(false);
    }, 1500);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fakeEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(fakeEvent);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDownloadTemplate = () => {
    // Mock CSV template download
    const csvContent =
      'Vorname;Nachname;E-Mail;Geburtsdatum;Abteilung;Personalnummer;Budget\nMax;Mustermann;max@firma.de;01.01.1990;IT;12345;1000';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mitarbeiter_vorlage.csv';
    a.click();
  };

  const handleImportStart = () => {
    if (!validationData || validationData.valid_rows === 0) {
      alert('Keine gültigen Zeilen zum Importieren.');
      return;
    }

    // Simulate API call
    alert(
      `${validationData.valid_rows} Mitarbeiter erfolgreich importiert. ${validationData.invalid_rows} Zeilen übersprungen.`
    );
    
    // Navigate to employees page
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'mitarbeiter' } }));
  };

  const toggleErrorRow = (rowNumber: number) => {
    const newSet = new Set(expandedErrorRows);
    if (newSet.has(rowNumber)) {
      newSet.delete(rowNumber);
    } else {
      newSet.add(rowNumber);
    }
    setExpandedErrorRows(newSet);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#273A5F] mb-2">Massenimport</h1>
            <p className="text-[#6B7280]">Mehrere Mitarbeiter gleichzeitig importieren</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownloadTemplate}
              className="px-6 py-3 border border-[#0F429F] text-[#0F429F] font-medium rounded-full hover:bg-blue-50 transition flex items-center gap-2"
              style={{ borderRadius: '32px' }}
            >
              <Download size={18} />
              Vorlage herunterladen
            </button>
            <button
              onClick={handleImportStart}
              disabled={!validationData || validationData.valid_rows === 0}
              className={`px-6 py-3 font-medium rounded-full transition flex items-center gap-2 ${
                validationData && validationData.valid_rows > 0
                  ? 'bg-[#0F429F] text-white hover:bg-[#0d3680]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={{ borderRadius: '32px' }}
            >
              <Upload size={18} />
              Import starten
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 max-w-6xl">
        {/* SECTION 1: DATEN HOCHLADEN */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#273A5F] mb-4">Daten hochladen</h2>

          {!uploadedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="bg-[#F0F9FF] border-2 border-dashed border-[#0F429F] rounded-lg p-12 text-center cursor-pointer hover:bg-[#e6f5ff] transition"
            >
              <div className="flex flex-col items-center">
                <FileText size={48} className="text-[#0F429F] mb-4" />
                <p className="text-[#273A5F] font-medium mb-2">
                  Datei hier ablegen oder klicken zum Hochladen
                </p>
                <p className="text-[#6B7280] text-sm">Maximal 10 MB, CSV-Format</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <FileText size={40} className="text-[#0F429F]" />
                  <div>
                    <p className="text-[#273A5F] font-bold mb-1">{uploadedFile.name}</p>
                    <div className="flex gap-4 text-sm text-[#6B7280]">
                      <span>{formatFileSize(uploadedFile.size)}</span>
                      {validationData && <span>{validationData.total_rows} Zeilen</span>}
                      {isValidating && <span className="text-[#0F429F]">Validierung läuft...</span>}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setValidationData(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="px-4 py-2 border border-[#E5E7EB] text-[#273A5F] font-medium rounded-lg hover:bg-gray-50 transition"
                >
                  Ändern
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: VALIDIERUNGSERGEBNISSE */}
        {validationData && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#273A5F] mb-4">Validierungsergebnisse</h2>

            {/* Summary */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-2xl">✅</span>
                <span className="text-green-700 font-medium">
                  {validationData.valid_rows} Mitarbeiter können importiert werden
                </span>
              </div>
              {validationData.invalid_rows > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl">❌</span>
                  <span className="text-red-700 font-medium">
                    {validationData.invalid_rows} Zeilen haben Fehler
                  </span>
                </div>
              )}
            </div>

            {/* Results Table */}
            <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#273A5F]">
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Zeile</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Aktion</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {validationData.results.map((result, idx) => (
                    <tr key={result.row_number} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                      <td className="px-6 py-4 text-sm text-[#273A5F] font-medium">
                        {result.row_number}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#273A5F]">{result.name}</td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">
                        {result.action === 'create' ? 'Neu anlegen' : 'Aktualisieren'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {result.status === 'ok' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            ✅ Erfolgreich
                          </span>
                        ) : (
                          <button
                            onClick={() => toggleErrorRow(result.row_number)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium hover:bg-red-200 transition"
                          >
                            ❌ Fehler
                            {expandedErrorRows.has(result.row_number) ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 3: FEHLERDETAILS */}
        {validationData && validationData.invalid_rows > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#273A5F] mb-4">Fehlerdetails</h2>

            <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#273A5F]">
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Zeile</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Feld</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Problem</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Vorschlag</th>
                  </tr>
                </thead>
                <tbody>
                  {validationData.results
                    .filter((result) => result.status === 'error' && expandedErrorRows.has(result.row_number))
                    .flatMap((result) =>
                      result.errors.map((error, errorIdx) => (
                        <tr
                          key={`${result.row_number}-${errorIdx}`}
                          className={errorIdx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}
                        >
                          <td className="px-6 py-3 text-sm text-[#273A5F] font-medium">
                            {result.row_number}
                          </td>
                          <td className="px-6 py-3 text-sm text-[#273A5F]">{error.field}</td>
                          <td className="px-6 py-3 text-sm text-red-600">{error.problem}</td>
                          <td className="px-6 py-3 text-sm text-[#6B7280]">{error.suggestion}</td>
                        </tr>
                      ))
                    )}
                  {validationData.results.filter((r) => r.status === 'error' && expandedErrorRows.has(r.row_number))
                    .length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-[#6B7280] text-sm">
                        Klicke auf einen Fehler-Badge oben, um Details anzuzeigen
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
