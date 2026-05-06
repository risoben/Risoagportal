import { useState, useRef } from 'react';
import { Upload, X, CheckCircle2, XCircle } from 'lucide-react';

export function CSVUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleValidate = () => {
    if (selectedFile) {
      setShowValidationModal(true);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImport = () => {
    // Handle import logic here
    setShowValidationModal(false);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Title */}
      <div className="px-6 pt-6 pb-6">
        <h1 className="text-[#273A5F] font-bold text-base">CSV-Datei hochladen:</h1>
      </div>

      {/* Upload Area */}
      <div className="px-6 pb-6">
        <div className={`
            relative w-full rounded-lg border-2 border-dashed transition-all
            ${isDragging ? 'border-[#246AFF] bg-blue-50' : 'border-[#0F429F] bg-[#F0F9FF]'}
          `}
          style={{ height: '300px' }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xls,.xlsx"
            onChange={handleFileSelect} className="hidden"
          />

          <div className="flex flex-col items-center justify-center h-full px-8">
            {/* Upload Icon */}
            <Upload className="w-16 h-16 text-[#0F429F] mb-4" />

            {/* Text */}
            <div className="text-center mb-2">
              <p className="text-[#273A5F] text-base mb-2">
                Ziehe eine CSV-Datei hier hin oder
              </p>
              <button
                onClick={() => fileInputRef.current?.click()} className="text-[#0F429F] text-base font-medium hover:underline"
              >
                Klicke hier zum Hochladen
              </button>
            </div>

            {/* File Info */}
            {selectedFile && (
              <div className="mt-4 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg">
                <p className="text-[#273A5F] text-sm font-medium">{selectedFile.name}</p>
                <p className="text-[#6B7280] text-xs">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}

            {/* Subtext */}
            <p className="text-[#6B7280] text-sm mt-4">
              Max. Dateigröße: 10 MB | Unterstützt: CSV, XLS, XLSX
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 flex gap-4">
        <button
          onClick={handleValidate}
          disabled={!selectedFile} className={`
            h-10 px-8 rounded-full font-medium text-sm transition-all
            ${
              selectedFile
                ? 'bg-[#0F429F] text-white hover:bg-[#0d3680]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Validieren
        </button>

        <button
          onClick={handleCancel} className="h-10 px-8 rounded-full font-medium text-sm bg-white border border-[#E5E7EB] text-[#273A5F] hover:bg-gray-50 transition-all"
        >
          Abbrechen
        </button>
      </div>

      {/* Validation Modal */}
      {showValidationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl"
            style={{ width: '600px', maxWidth: '90%' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-[#273A5F] font-bold text-lg">Validierungsergebnis</h2>
              <button
                onClick={() => setShowValidationModal(false)} className="text-[#6B7280] hover:text-[#273A5F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 space-y-4">
              {/* Success Message */}
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-900 font-medium text-sm">
                    21 Mitarbeiter können importiert werden
                  </p>
                </div>
              </div>

              {/* Error Message */}
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-900 font-medium text-sm mb-2">
                    4 Zeilen haben Fehler
                  </p>
                  <ul className="text-red-800 text-xs space-y-1 ml-4 list-disc">
                    <li>Zeile 3: Fehlende Mitarbeiter-Nr.</li>
                    <li>Zeile 7: Ungültiges Budget-Format</li>
                    <li>Zeile 12: Fehlende Abteilung</li>
                    <li>Zeile 18: Ungültige E-Mail-Adresse</li>
                  </ul>
                </div>
              </div>

              {/* Option Checkbox */}
              <div className="flex items-center gap-3 p-4 border border-[#E5E7EB] rounded-lg">
                <input
                  type="checkbox"
                  id="importOnlyValid"
                  defaultChecked className="w-4 h-4 text-[#0F429F] border-gray-300 rounded focus:ring-[#0F429F]"
                />
                <label htmlFor="importOnlyValid" className="text-[#273A5F] text-sm">
                  Nur OK-Zeilen importieren (21/25)
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 px-6 py-4 border-t border-[#E5E7EB]">
              <button
                onClick={() => setShowValidationModal(false)} className="h-10 px-6 rounded-full font-medium text-sm bg-white border border-[#E5E7EB] text-[#273A5F] hover:bg-gray-50 transition-all"
              >
                Abbrechen
              </button>
              <button
                onClick={handleImport} className="h-10 px-6 rounded-full font-medium text-sm bg-[#0F429F] text-white hover:bg-[#0d3680] transition-all"
              >
                Import starten
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
