// TODO V2: On save, send Riso an email notification listing the exact fields changed (e.g. "Straße: Mannheim → Saarbrücken").
// TODO V2: Implement role/user management — define which portal users can access which sections (e.g. HR sees only employees, no benefits or locations).
import { useState } from 'react';
import { Check } from 'lucide-react';

const columnsList = [
  'Vorname',
  'Nachname',
  'Personalnummer',
  'Geburtsdatum'
];

export function VerwaltungPage() {
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(new Set());
  const [exportType, setExportType] = useState<'combined' | 'separate'>('combined');

  const handleToggleColumn = (column: string) => {
    const newSelected = new Set(selectedColumns);
    if (newSelected.has(column)) {
      newSelected.delete(column);
    } else {
      newSelected.add(column);
    }
    setSelectedColumns(newSelected);
  };

  const handleSave = () => {
    alert('Einstellungen erfolgreich gespeichert!');
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-8 py-6">
        <h1 className="text-[#273A5F] font-bold text-[32px]">Verwaltung</h1>
      </div>

      {/* Content */}
      <div className="px-8 py-8 max-w-6xl">
        {/* Info Banner */}
        <div className="bg-[#FFF9E6] border border-[#FFE082] rounded-lg px-4 py-3 mb-6 flex items-start gap-3">
          <span className="text-[#F57C00] text-lg mt-0.5">ℹ</span>
          <div>
            <p className="text-[#333333] text-[13px] font-medium">Daten können nicht direkt bearbeitet werden.</p>
            <p className="text-[#666666] text-[12px] mt-0.5">Änderungen bitte per E-Mail an <strong>support@riso-app.de</strong> — wir aktualisieren die Daten innerhalb von 24 Stunden.</p>
          </div>
        </div>

        {/* SECTION 1: Allgemeine Informationen */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[#273A5F] font-bold text-[18px] mb-5">Allgemeine Informationen</h2>

          <div className="space-y-4">
            {/* Row 1: Firmenname, Stadt */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">
                  Firmenname <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Riso GmbH" className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] text-[#666666] bg-[#F5F5F5] cursor-default" readOnly
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">Stadt</label>
                <input
                  type="text"
                  defaultValue="Mannheim" className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] text-[#666666] bg-[#F5F5F5] cursor-default" readOnly
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
            </div>

            {/* Row 2: Unternehmensadresse (full-width) */}
            <div>
              <label className="block text-[#273A5F] text-[13px] font-medium mb-2">
                Unternehmensadresse <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue="Hauptstraße 42" className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] text-[#666666] bg-[#F5F5F5] cursor-default" readOnly
                style={{ fontFamily: 'Roboto, sans-serif' }}
              />
            </div>

            {/* Row 3: Postleitzahl, Umsatzsteuer-ID / VAT */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">Postleitzahl</label>
                <input
                  type="text"
                  defaultValue="68219" className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] text-[#666666] bg-[#F5F5F5] cursor-default" readOnly
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">Umsatzsteuer-ID / VAT</label>
                <input
                  type="text"
                  defaultValue="DE123456789" className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] text-[#666666] bg-[#F5F5F5] cursor-default" readOnly
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
            </div>

            {/* Row 4: Ansprechpartner Vorname, Nachname */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">
                  Ansprechpartner (Vorname) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Max" className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] text-[#666666] bg-[#F5F5F5] cursor-default" readOnly
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">
                  Ansprechpartner (Nachname) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Müller" className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] text-[#666666] bg-[#F5F5F5] cursor-default" readOnly
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
            </div>

            {/* Row 5: E-Mail, Telefonnummer */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">
                  E-Mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="max.mueller@riso.de" className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] text-[#666666] bg-[#F5F5F5] cursor-default" readOnly
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">Telefonnummer</label>
                <input
                  type="text"
                  defaultValue="+49 621 123456" className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] text-[#666666] bg-[#F5F5F5] cursor-default" readOnly
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
            </div>

            {/* Row 6: Rolle im Portal */}
            <div>
              <label className="block text-[#273A5F] text-[13px] font-medium mb-2">Rolle im Portal</label>
              <div>
                <input
                  type="text"
                  value="Administrator"
                  readOnly className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] bg-[#F9FAFB] text-[#666666] cursor-default"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
                <p className="text-[#999999] text-[11px] mt-1 italic" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Wird von Riso festgelegt
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-[#E0E0E0]">
            <button
              onClick={handleSave} className="px-8 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Einstellungen speichern
            </button>
          </div>
        </div>

        {/* SECTION 2: Berichte & Exporte */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[#273A5F] font-bold text-[18px] mb-5">Berichte & Exporte</h2>

          {/* Subsection: Spalten-Auswahl */}
          <div className="mb-6">
            <h3 className="text-[#273A5F] text-[14px] font-medium mb-4">
              Welche Spalten sollen in den Berichten enthalten sein?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {columnsList.map(column => (
                <label
                  key={column} className="flex items-center gap-3 cursor-pointer hover:bg-[#F0F4FF] p-2 rounded transition-colors group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedColumns.has(column)}
                      onChange={() => handleToggleColumn(column)} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer group-hover:border-[#246AFF] transition-colors"
                    />
                    {selectedColumns.has(column) && (
                      <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-[#333333] text-[14px] group-hover:text-[#0F429F] transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {column}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Subsection: Export-Typ */}
          <div className="mb-6">
            <h3 className="text-[#273A5F] text-[14px] font-medium mb-4">
              Exporttyp bezüglich Standorte
            </h3>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer hover:bg-[#F0F4FF] p-2 rounded transition-colors group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="exportType"
                    checked={exportType === 'combined'}
                    onChange={() => setExportType('combined')} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors"
                  />
                  {exportType === 'combined' && (
                    <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                  )}
                </div>
                <span className="text-[#333333] text-[14px] group-hover:text-[#0F429F] transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Alle Standorte in einem Bericht
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-[#F0F4FF] p-2 rounded transition-colors group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="exportType"
                    checked={exportType === 'separate'}
                    onChange={() => setExportType('separate')} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors"
                  />
                  {exportType === 'separate' && (
                    <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                  )}
                </div>
                <span className="text-[#333333] text-[14px] group-hover:text-[#0F429F] transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Jeweils ein Bericht pro Standort
                </span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-[#E0E0E0]">
            <button
              onClick={handleSave} className="px-8 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Einstellungen speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
