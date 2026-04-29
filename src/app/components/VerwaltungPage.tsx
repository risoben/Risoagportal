import { useState } from 'react';
import { Check } from 'lucide-react';

const benefitsList = [
  'Mittagessen',
  'Internet',
  'Kindergarten',
  'Commuting',
  'Erholung',
  'Sachbezug',
  'Danke-Bonus',
  'Geburtstag',
  'ÖPNV',
  'BKV',
  'BAV'
];

const locationsList = ['Alle', 'München', 'Berlin', 'Heddesheim', 'Viernheim'];

export function VerwaltungPage() {
  const [selectedBenefits, setSelectedBenefits] = useState<Set<string>>(new Set());
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set(['Alle']));
  const [exportType, setExportType] = useState<'combined' | 'separate'>('combined');

  const handleToggleBenefit = (benefit: string) => {
    const newSelected = new Set(selectedBenefits);
    if (newSelected.has(benefit)) {
      newSelected.delete(benefit);
    } else {
      newSelected.add(benefit);
    }
    setSelectedBenefits(newSelected);
  };

  const handleToggleLocation = (location: string) => {
    const newSelected = new Set(selectedLocations);
    if (newSelected.has(location)) {
      newSelected.delete(location);
    } else {
      newSelected.add(location);
    }
    setSelectedLocations(newSelected);
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
                  value="Riso GmbH"
                  readOnly
                  className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] bg-[#F9FAFB] text-[#666666] cursor-default"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">Stadt</label>
                <input
                  type="text"
                  value="Mannheim"
                  readOnly
                  className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] bg-[#F9FAFB] text-[#666666] cursor-default"
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
                value="Hauptstraße 42"
                readOnly
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] bg-[#F9FAFB] text-[#666666] cursor-default"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              />
            </div>

            {/* Row 3: Postleitzahl, Umsatzsteuer-ID / VAT */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">Postleitzahl</label>
                <input
                  type="text"
                  value="68219"
                  readOnly
                  className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] bg-[#F9FAFB] text-[#666666] cursor-default"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">Umsatzsteuer-ID / VAT</label>
                <input
                  type="text"
                  value="DE123456789"
                  readOnly
                  className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] bg-[#F9FAFB] text-[#666666] cursor-default"
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
                  value="Max"
                  readOnly
                  className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] bg-[#F9FAFB] text-[#666666] cursor-default"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">
                  Ansprechpartner (Nachname) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value="Müller"
                  readOnly
                  className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] bg-[#F9FAFB] text-[#666666] cursor-default"
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
                  value="max.mueller@riso.de"
                  readOnly
                  className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] bg-[#F9FAFB] text-[#666666] cursor-default"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
              <div>
                <label className="block text-[#273A5F] text-[13px] font-medium mb-2">Telefonnummer</label>
                <input
                  type="text"
                  value="+49 621 123456"
                  readOnly
                  className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] bg-[#F9FAFB] text-[#666666] cursor-default"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
            </div>

            {/* Row 6: Rolle im Portal mit Button */}
            <div>
              <label className="block text-[#273A5F] text-[13px] font-medium mb-2">Rolle im Portal</label>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    value="Administrator"
                    readOnly
                    className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[14px] bg-[#F9FAFB] text-[#666666] cursor-default"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  />
                  <p className="text-[#999999] text-[11px] mt-1 italic" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Wird von Riso festgelegt
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  className="px-8 py-2.5 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors whitespace-nowrap"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Einstellungen speichern
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Berichte & Exports */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[#273A5F] font-bold text-[18px] mb-5">Berichte & Exports</h2>

          {/* Subsection A: Benefits Selection */}
          <div className="mb-6">
            <h3 className="text-[#273A5F] text-[14px] font-medium mb-4">
              Welche Benefits sollen in den Berichten enthalten sein?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {benefitsList.map(benefit => (
                <label
                  key={benefit}
                  className="flex items-center gap-3 cursor-pointer hover:bg-[#F0F4FF] p-2 rounded transition-colors group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedBenefits.has(benefit)}
                      onChange={() => handleToggleBenefit(benefit)}
                      className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer group-hover:border-[#246AFF] transition-colors"
                    />
                    {selectedBenefits.has(benefit) && (
                      <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-[#333333] text-[14px] group-hover:text-[#0F429F] transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {benefit}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Subsection B: Standorte in Exporten */}
          <div className="mb-6">
            <h3 className="text-[#273A5F] text-[14px] font-medium mb-4">
              Standorte in Exporten enthalten
            </h3>
            <div className="flex flex-col gap-3">
              {locationsList.map(location => (
                <label
                  key={location}
                  className="flex items-center gap-3 cursor-pointer hover:bg-[#F0F4FF] p-2 rounded transition-colors group"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedLocations.has(location)}
                      onChange={() => handleToggleLocation(location)}
                      className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer group-hover:border-[#246AFF] transition-colors"
                    />
                    {selectedLocations.has(location) && (
                      <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-[#333333] text-[14px] group-hover:text-[#0F429F] transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {location}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Subsection C: Export-Typ */}
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
                    onChange={() => setExportType('combined')}
                    className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors"
                  />
                  {exportType === 'combined' && (
                    <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                  )}
                </div>
                <span className="text-[#333333] text-[14px] group-hover:text-[#0F429F] transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Alle Standorte in einem Report
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-[#F0F4FF] p-2 rounded transition-colors group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="exportType"
                    checked={exportType === 'separate'}
                    onChange={() => setExportType('separate')}
                    className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors"
                  />
                  {exportType === 'separate' && (
                    <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                  )}
                </div>
                <span className="text-[#333333] text-[14px] group-hover:text-[#0F429F] transition-colors" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Einzelnen Report pro Standort
                </span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-[#E0E0E0]">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
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
