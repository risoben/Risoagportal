import { useState } from 'react';

const benefitsList = [
  'Mittagessen',
  'Internet',
  'Kindergarten',
  'Fahrkostenzuschuss',
  'Erholung',
  'Sachbezug',
  'Danke-Bonus',
  'Geburtstag',
  'ÖPNV',
  'BKV',
  'BAV'
];

const locationsList = ['Alle', 'München', 'Berlin', 'Heddesheim', 'Viernheim'];

export function Settings() {

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
    <div className="flex-1 bg-[#FAFAFA] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] h-16 px-8 flex items-center">
        <h1 className="text-xl font-bold text-[#273A5F]">Einstellungen</h1>
      </div>

      {/* Content Area */}
      <div className="w-full px-4 md:px-6 lg:px-8 py-8 flex gap-8">
        {/* Sidebar */}
        <div className="w-[280px] flex-shrink-0">
          <div className="bg-white border border-[#E0E0E0] rounded-lg overflow-hidden">
            <nav>
              <button
                onClick={() => setActiveTab('general')} className={`w-full text-left px-4 py-3 text-[13px] transition cursor-pointer ${
                  activeTab === 'general'
                    ? 'bg-[#F0F4FF] text-[#0F429F] border-l-[3px] border-[#0F429F]'
                    : 'text-[#333333] hover:bg-[#F9FAFB]'
                }`}
              >
                Allgemeine Infos
              </button>
              <button
                onClick={() => setActiveTab('reports')} className={`w-full text-left px-4 py-3 text-[13px] transition cursor-pointer ${
                  activeTab === 'reports'
                    ? 'bg-[#F0F4FF] text-[#0F429F] border-l-[3px] border-[#0F429F]'
                    : 'text-[#333333] hover:bg-[#F9FAFB]'
                }`}
              >
                Berichte
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* TAB 1: ALLGEMEINE INFOS */}
          {activeTab === 'general' && (
            <div>
              {/* Section 1: Unternehmensformationen */}
              <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 mb-6">
                <h3 className="font-bold text-[13px] text-[#333333] mb-4">Unternehmensformationen</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Firmenname</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="z.B. Riso GmbH" className="w-full px-4 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] transition"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Stadt</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="z.B. Mannheim" className="w-full px-4 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-xs text-[#333333] mb-2">Unternehmensadresse</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="z.B. Hauptstraße 42, 68219 Mannheim" className="w-full px-4 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Postleitzahl</label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="z.B. 68219" className="w-full px-4 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] transition"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Umsatzsteuer-ID / VAT Nummer</label>
                      <input
                        type="text"
                        value={vatNumber}
                        onChange={(e) => setVatNumber(e.target.value)}
                        placeholder="z.B. DE123456789" className="w-full px-4 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-xs text-[#333333] mb-2">Ansprechpartner im Unternehmen</label>
                    <input
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="z.B. Max Müller" className="w-full px-4 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] transition"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Benutzerinformationen */}
              <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 mb-6">
                <h3 className="font-bold text-[13px] text-[#333333] mb-4">Benutzerinformationen</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Vorname</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="z.B. Santiago" className="w-full px-4 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] transition"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Nachname</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="z.B. Tellez" className="w-full px-4 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-xs text-[#333333] mb-2">E-Mail-Adresse</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="z.B. santiago@riso-app.de" className="w-full px-4 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Telefonnummer</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="z.B. +49 621 123456" className="w-full px-4 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] transition"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Rolle im Portal</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 text-[13px] text-[#333333] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] transition cursor-pointer"
                      >
                        <option value="">z.B. Admin</option>
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <button className="text-xs text-[#0F429F] hover:underline cursor-pointer">
                      Passwort ändern
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 3: Vertrag */}
              <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 mb-6">
                <h3 className="font-bold text-[13px] text-[#333333] mb-4">Vertrag</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Anzahl aktive Mitarbeiter</label>
                      <input
                        type="text"
                        value="87"
                        readOnly className="w-full px-4 py-3 text-[13px] text-[#333333] bg-[#F9FAFB] border border-[#E0E0E0] rounded-md cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Vertrag abgeschlossen</label>
                      <input
                        type="text"
                        value="1. Januar 2026"
                        readOnly className="w-full px-4 py-3 text-[13px] text-[#333333] bg-[#F9FAFB] border border-[#E0E0E0] rounded-md cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Vertrag gültig bis</label>
                      <input
                        type="text"
                        value="31. Dezember 2026"
                        readOnly className="w-full px-4 py-3 text-[13px] text-[#333333] bg-[#F9FAFB] border border-[#E0E0E0] rounded-md cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-xs text-[#333333] mb-2">Nächste Abrechnung</label>
                      <input
                        type="text"
                        value="7. Mai 2026"
                        readOnly className="w-full px-4 py-3 text-[13px] text-[#333333] bg-[#F9FAFB] border border-[#E0E0E0] rounded-md cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-8 justify-end">
                <button
                  onClick={handleCancel} className="px-8 py-3 border border-[#0F429F] text-[#0F429F] font-medium rounded-full hover:bg-[#F0F4FF] transition"
                  style={{ borderRadius: '24px' }}
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleSave} className="px-8 py-3 bg-[#246AFF] text-white font-medium rounded-full hover:bg-[#0F429F] transition"
                  style={{ borderRadius: '24px' }}
                >
                  Speichern
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: BERICHTE */}
          {activeTab === 'reports' && (
            <div>
              {/* 2-Column Layout */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* LEFT COLUMN: Basiskonfigurationen */}
                <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
                  <h3 className="font-bold text-[13px] text-[#333333] mb-1">Basiskonfigurationen</h3>
                  <p className="text-[11px] text-[#999999] mb-3">Berichts-Typen exportieren</p>

                  {/* Berichts-Typen */}
                  <div className="space-y-2 mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="reportType"
                        value="both"
                        checked={reportType === 'both'}
                        onChange={(e) => setReportType(e.target.value as 'both')} className="w-4 h-4 text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-xs text-[#333333]">Beide – Übersicht & Vollständiger Bericht</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="reportType"
                        value="overview"
                        checked={reportType === 'overview'}
                        onChange={(e) => setReportType(e.target.value as 'overview')} className="w-4 h-4 text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-xs text-[#333333]">Nur Übersichtsbericht</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="reportType"
                        value="full"
                        checked={reportType === 'full'}
                        onChange={(e) => setReportType(e.target.value as 'full')} className="w-4 h-4 text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-xs text-[#333333]">Nur Vollständiger Bericht</span>
                    </label>
                  </div>

                  <div className="border-t border-[#E0E0E0] my-4"></div>

                  {/* Standorte in Exporten enthalten */}
                  <p className="text-[11px] text-[#999999] mb-3">Standorte in Exporten enthalten</p>
                  <div className="space-y-2 mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={locationsIncluded.all}
                        onChange={(e) => setLocationsIncluded({ ...locationsIncluded, all: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-xs text-[#333333]">Alle</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={locationsIncluded.muenchen}
                        onChange={(e) => setLocationsIncluded({ ...locationsIncluded, muenchen: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-xs text-[#333333]">München</span>
                    </label>
                  </div>

                  <div className="border-t border-[#E0E0E0] my-4"></div>

                  {/* Exporttyp bezüglich Standorte */}
                  <p className="text-[11px] text-[#999999] mb-3">Exporttyp bezüglich Standorte</p>
                  <div className="space-y-2 mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="locationExportType"
                        value="combined"
                        checked={locationExportType === 'combined'}
                        onChange={(e) => setLocationExportType(e.target.value as 'combined')} className="w-4 h-4 text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-xs text-[#333333]">Alle Standorte in einem Bericht</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="locationExportType"
                        value="separate"
                        checked={locationExportType === 'separate'}
                        onChange={(e) => setLocationExportType(e.target.value as 'separate')} className="w-4 h-4 text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-xs text-[#333333]">Jeweils ein Bericht pro Standort</span>
                    </label>
                  </div>

                  <div className="border-t border-[#E0E0E0] my-4"></div>

                  {/* Datentyp */}
                  <p className="text-[11px] text-[#999999] mb-3">Datentyp</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDataTypes({ ...dataTypes, pdf: !dataTypes.pdf })} className={`px-4 py-2 text-xs border rounded-md transition ${
                        dataTypes.pdf
                          ? 'bg-[#0F429F] text-white border-[#0F429F]'
                          : 'bg-white text-[#333333] border-[#E0E0E0] hover:bg-[#F0F4FF] hover:border-[#0F429F]'
                      }`}
                    >
                      PDF
                    </button>
                    <button
                      onClick={() => setDataTypes({ ...dataTypes, excel: !dataTypes.excel })} className={`px-4 py-2 text-xs border rounded-md transition ${
                        dataTypes.excel
                          ? 'bg-[#0F429F] text-white border-[#0F429F]'
                          : 'bg-white text-[#333333] border-[#E0E0E0] hover:bg-[#F0F4FF] hover:border-[#0F429F]'
                      }`}
                    >
                      Excel
                    </button>
                    <button
                      onClick={() => setDataTypes({ ...dataTypes, csv: !dataTypes.csv })} className={`px-4 py-2 text-xs border rounded-md transition ${
                        dataTypes.csv
                          ? 'bg-[#0F429F] text-white border-[#0F429F]'
                          : 'bg-white text-[#333333] border-[#E0E0E0] hover:bg-[#F0F4FF] hover:border-[#0F429F]'
                      }`}
                    >
                      CSV
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: Spaltendaten-Konfigurationen */}
                <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
                  <h3 className="font-bold text-[13px] text-[#333333] mb-4">Spaltendaten-Konfigurationen</h3>

                  {/* Subsection A: Mitarbeiterdaten */}
                  <p className="text-[11px] text-[#999999] mb-2">Mitarbeiterdaten</p>
                  <div className="space-y-2 mb-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mitarbeiterData.vorname}
                        onChange={(e) => setMitarbeiterData({ ...mitarbeiterData, vorname: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-xs text-[#333333]">Vorname</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mitarbeiterData.nachname}
                        onChange={(e) => setMitarbeiterData({ ...mitarbeiterData, nachname: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-xs text-[#333333]">Nachname</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mitarbeiterData.personalnr}
                        onChange={(e) => setMitarbeiterData({ ...mitarbeiterData, personalnr: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-xs text-[#333333]">Personalnr</span>
                    </label>
                  </div>

                  <div className="border-t border-[#E0E0E0] my-3"></div>

                  {/* Subsection B: Benefits */}
                  <p className="text-[11px] text-[#999999] mb-2">Benefits</p>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.mittagessen}
                        onChange={(e) => setBenefits({ ...benefits, mittagessen: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-2 mr-1.5">
                        <BenefitIcon benefitName="Mittagessen" size={24} />
                      </span>
                      <span className="text-xs text-[#333333]">Mittagessen</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.sachbezug}
                        onChange={(e) => setBenefits({ ...benefits, sachbezug: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-2 mr-1.5">
                        <BenefitIcon benefitName="Sachbezug" size={24} />
                      </span>
                      <span className="text-xs text-[#333333]">Sachbezug</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.dankeBonus}
                        onChange={(e) => setBenefits({ ...benefits, dankeBonus: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-2 mr-1.5">
                        <BenefitIcon benefitName="Danke-Bonus" size={24} />
                      </span>
                      <span className="text-xs text-[#333333]">Danke-Bonus</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.bkv}
                        onChange={(e) => setBenefits({ ...benefits, bkv: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-2 mr-1.5">
                        <BenefitIcon benefitName="BKV" size={24} />
                      </span>
                      <span className="text-xs text-[#333333]">BKV</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.internetzuschuss}
                        onChange={(e) => setBenefits({ ...benefits, internetzuschuss: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-2 mr-1.5">
                        <BenefitIcon benefitName="Internetzuschuss" size={24} />
                      </span>
                      <span className="text-xs text-[#333333]">Internetzuschuss</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.kindergartenzuschuss}
                        onChange={(e) => setBenefits({ ...benefits, kindergartenzuschuss: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-2 mr-1.5">
                        <BenefitIcon benefitName="Kindergartenzuschuss" size={24} />
                      </span>
                      <span className="text-xs text-[#333333]">Kindergartenzuschuss</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.geburtstagsgutschein}
                        onChange={(e) => setBenefits({ ...benefits, geburtstagsgutschein: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-2 mr-1.5">
                        <BenefitIcon benefitName="Geburtstag" size={24} />
                      </span>
                      <span className="text-xs text-[#333333]">Geburtstag</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.bav}
                        onChange={(e) => setBenefits({ ...benefits, bav: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-2 mr-1.5">
                        <BenefitIcon benefitName="BAV" size={24} />
                      </span>
                      <span className="text-xs text-[#333333]">BAV</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.erholungsbeihilfe}
                        onChange={(e) => setBenefits({ ...benefits, erholungsbeihilfe: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-2 mr-1.5">
                        <BenefitIcon benefitName="Erholungsbeihilfe" size={24} />
                      </span>
                      <span className="text-xs text-[#333333]">Erholungsbeihilfe</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.fahrtkostenzuschuss}
                        onChange={(e) => setBenefits({ ...benefits, fahrtkostenzuschuss: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-2 mr-1.5">
                        <BenefitIcon benefitName="Fahrtkostenzuschuss" size={24} />
                      </span>
                      <span className="text-xs text-[#333333]">Fahrtkostenzuschuss</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={benefits.oepnvTicketZuschuss}
                        onChange={(e) => setBenefits({ ...benefits, oepnvTicketZuschuss: e.target.checked })} className="w-4 h-4 rounded text-[#0F429F] border-gray-300 focus:ring-[#0F429F]"
                      />
                      <span className="ml-2 mr-1.5">
                        <BenefitIcon benefitName="ÖPNV" size={24} />
                      </span>
                      <span className="text-xs text-[#333333]">ÖPNV</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Full Width: Kommentare */}
              <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 mb-6">
                <h3 className="font-bold text-[13px] text-[#333333] mb-3">Kommentare</h3>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Freitext für zusätzliche Hinweise..." className="w-full h-[120px] px-4 py-3 text-[13px] text-[#333333] placeholder-[#999999] bg-white border border-[#E0E0E0] rounded-md hover:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] resize-none transition"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-8 justify-end">
                <button
                  onClick={handleCancel} className="px-8 py-3 border border-[#0F429F] text-[#0F429F] font-medium rounded-full hover:bg-[#F0F4FF] transition"
                  style={{ borderRadius: '24px' }}
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleSave} className="px-8 py-3 bg-[#246AFF] text-white font-medium rounded-full hover:bg-[#0F429F] transition"
                  style={{ borderRadius: '24px' }}
                >
                  Speichern
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
