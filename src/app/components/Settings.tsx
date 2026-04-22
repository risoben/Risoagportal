import { useState } from 'react';
import { Building2, MapPin, FileText, Edit2, Plus, X } from 'lucide-react';

type TabType = 'general' | 'locations' | 'reports';

type Location = {
  id: number;
  name: string;
  employees: number;
  address: string;
  zipCode: string;
  city: string;
};

export function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: 'München', employees: 150, address: 'Leopoldstraße 45', zipCode: '80802', city: 'München' },
    { id: 2, name: 'Berlin', employees: 80, address: 'Unter den Linden 12', zipCode: '10117', city: 'Berlin' },
    { id: 3, name: 'Hamburg', employees: 60, address: 'Mönckebergstraße 7', zipCode: '20095', city: 'Hamburg' },
  ]);

  const [reportSettings, setReportSettings] = useState({
    reportType: 'both',
    locationHandling: 'combined',
    exportFormats: {
      pdf: true,
      excel: true,
      csv: false,
    },
    columns: {
      firstName: true,
      lastName: true,
      employeeId: true,
      mealAllowance: true,
      recreationAllowance: true,
      internetAllowance: true,
      mobilityAllowance: false,
      healthInsurance: false,
    },
    comment: '',
  });

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setShowLocationModal(true);
  };

  const handleAddLocation = () => {
    setEditingLocation(null);
    setShowLocationModal(true);
  };

  const handleSaveReportSettings = () => {
    console.log('Saving report settings:', reportSettings);
    alert('Report-Einstellungen gespeichert!');
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-[#273A5F] mb-2">Verwaltung</h1>
          <p className="text-[#6B7280]">System-Einstellungen und Konfiguration</p>
        </div>

        {/* Tabs Navigation */}
        <div className="px-8 flex gap-1 border-t border-[#E5E7EB]">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'general'
                ? 'text-[#0F429F] border-[#0F429F]'
                : 'text-[#6B7280] border-transparent hover:text-[#273A5F]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Building2 size={18} />
              Allgemeine Infos
            </div>
          </button>
          <button
            onClick={() => setActiveTab('locations')}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'locations'
                ? 'text-[#0F429F] border-[#0F429F]'
                : 'text-[#6B7280] border-transparent hover:text-[#273A5F]'
            }`}
          >
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              Standorte
            </div>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === 'reports'
                ? 'text-[#0F429F] border-[#0F429F]'
                : 'text-[#6B7280] border-transparent hover:text-[#273A5F]'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText size={18} />
              Report-Einstellungen
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-8 py-8">
        {/* TAB 1: ALLGEMEINE INFOS */}
        {activeTab === 'general' && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <h2 className="text-xl font-bold text-[#273A5F] mb-6">Firmendaten (Info nur)</h2>
              
              <div className="space-y-4">
                {/* Company Info Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-1">Unternehmensname</label>
                    <p className="text-[#273A5F] font-medium">Riso GmbH</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B7280] mb-1">Firmensitz (PLZ, Stadt)</label>
                    <p className="text-[#273A5F] font-medium">10115, Berlin</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">Unternehmensadresse</label>
                  <p className="text-[#273A5F] font-medium">Friedrichstraße 123, 10115 Berlin</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">Umsatzsteuer-ID</label>
                  <p className="text-[#273A5F] font-medium">DE123456789</p>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 mt-6">
                  <h3 className="text-lg font-bold text-[#273A5F] mb-4">Kontaktperson</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#6B7280] mb-1">Name</label>
                      <p className="text-[#273A5F] font-medium">Max Mustermann</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B7280] mb-1">Rolle im Portal</label>
                      <p className="text-[#273A5F] font-medium">Admin</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-[#6B7280] mb-1">Email</label>
                      <p className="text-[#273A5F] font-medium">max.mustermann@riso.de</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#6B7280] mb-1">Telefon</label>
                      <p className="text-[#273A5F] font-medium">+49 (0) 30 123456</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 mt-6">
                  <button className="text-[#0F429F] hover:text-[#0d3680] font-medium text-sm transition">
                    → Passwort ändern
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STANDORTE */}
        {activeTab === 'locations' && (
          <div className="max-w-5xl">
            <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
              <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#273A5F]">Standorte-Übersicht</h2>
                <button
                  onClick={handleAddLocation}
                  className="px-4 py-2 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3680] transition flex items-center gap-2"
                  style={{ borderRadius: '32px' }}
                >
                  <Plus size={18} />
                  Neuer Standort hinzufügen
                </button>
              </div>

              {/* Locations Table */}
              <table className="w-full">
                <thead>
                  <tr className="bg-[#273A5F]">
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Standort Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Employees</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map((location, idx) => (
                    <tr key={location.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                      <td className="px-6 py-4 text-sm text-[#273A5F] font-medium">#{location.id}</td>
                      <td className="px-6 py-4 text-sm text-[#273A5F] font-medium">{location.name}</td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{location.employees} Mitarbeiter</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleEditLocation(location)}
                          className="text-[#0F429F] hover:text-[#0d3680] font-medium transition flex items-center gap-1"
                        >
                          <Edit2 size={14} />
                          Bearbeiten
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: REPORT-EINSTELLUNGEN */}
        {activeTab === 'reports' && (
          <div className="max-w-3xl">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <h2 className="text-xl font-bold text-[#273A5F] mb-6">Report-Konfiguration</h2>

              <div className="space-y-8">
                {/* Report Type */}
                <div>
                  <h3 className="text-base font-bold text-[#273A5F] mb-3">Report-Typ</h3>
                  <div className="space-y-2 bg-[#F9FAFB] p-4 rounded-lg">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="reportType"
                        value="both"
                        checked={reportSettings.reportType === 'both'}
                        onChange={(e) => setReportSettings({ ...reportSettings, reportType: e.target.value })}
                        className="w-4 h-4 text-[#0F429F] border-[#E5E7EB] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Beide — Overview & Full report</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="reportType"
                        value="overview"
                        checked={reportSettings.reportType === 'overview'}
                        onChange={(e) => setReportSettings({ ...reportSettings, reportType: e.target.value })}
                        className="w-4 h-4 text-[#0F429F] border-[#E5E7EB] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Nur Overview</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="reportType"
                        value="full"
                        checked={reportSettings.reportType === 'full'}
                        onChange={(e) => setReportSettings({ ...reportSettings, reportType: e.target.value })}
                        className="w-4 h-4 text-[#0F429F] border-[#E5E7EB] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Nur Full report</span>
                    </label>
                  </div>
                </div>

                {/* Location Handling */}
                <div>
                  <h3 className="text-base font-bold text-[#273A5F] mb-3">Standort-Handling</h3>
                  <div className="space-y-2 bg-[#F9FAFB] p-4 rounded-lg">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="locationHandling"
                        value="combined"
                        checked={reportSettings.locationHandling === 'combined'}
                        onChange={(e) => setReportSettings({ ...reportSettings, locationHandling: e.target.value })}
                        className="w-4 h-4 text-[#0F429F] border-[#E5E7EB] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Alle Standorte in einem Report</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="locationHandling"
                        value="separate"
                        checked={reportSettings.locationHandling === 'separate'}
                        onChange={(e) => setReportSettings({ ...reportSettings, locationHandling: e.target.value })}
                        className="w-4 h-4 text-[#0F429F] border-[#E5E7EB] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Einen Report je Standort</span>
                    </label>
                  </div>
                </div>

                {/* Export Format */}
                <div>
                  <h3 className="text-base font-bold text-[#273A5F] mb-3">Export-Format</h3>
                  <div className="space-y-2 bg-[#F9FAFB] p-4 rounded-lg">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportSettings.exportFormats.pdf}
                        onChange={(e) =>
                          setReportSettings({
                            ...reportSettings,
                            exportFormats: { ...reportSettings.exportFormats, pdf: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">PDF</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportSettings.exportFormats.excel}
                        onChange={(e) =>
                          setReportSettings({
                            ...reportSettings,
                            exportFormats: { ...reportSettings.exportFormats, excel: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Excel</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportSettings.exportFormats.csv}
                        onChange={(e) =>
                          setReportSettings({
                            ...reportSettings,
                            exportFormats: { ...reportSettings.exportFormats, csv: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">CSV</span>
                    </label>
                  </div>
                </div>

                {/* Report Columns */}
                <div>
                  <h3 className="text-base font-bold text-[#273A5F] mb-3">Spalten im Report</h3>
                  <div className="grid grid-cols-2 gap-2 bg-[#F9FAFB] p-4 rounded-lg">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportSettings.columns.firstName}
                        onChange={(e) =>
                          setReportSettings({
                            ...reportSettings,
                            columns: { ...reportSettings.columns, firstName: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Vorname</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportSettings.columns.lastName}
                        onChange={(e) =>
                          setReportSettings({
                            ...reportSettings,
                            columns: { ...reportSettings.columns, lastName: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Nachname</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportSettings.columns.employeeId}
                        onChange={(e) =>
                          setReportSettings({
                            ...reportSettings,
                            columns: { ...reportSettings.columns, employeeId: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Personalnummer</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportSettings.columns.mealAllowance}
                        onChange={(e) =>
                          setReportSettings({
                            ...reportSettings,
                            columns: { ...reportSettings.columns, mealAllowance: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Essenszuschuss</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportSettings.columns.recreationAllowance}
                        onChange={(e) =>
                          setReportSettings({
                            ...reportSettings,
                            columns: { ...reportSettings.columns, recreationAllowance: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Erholungsbeihilfe</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportSettings.columns.internetAllowance}
                        onChange={(e) =>
                          setReportSettings({
                            ...reportSettings,
                            columns: { ...reportSettings.columns, internetAllowance: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Internetzuschuss</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportSettings.columns.mobilityAllowance}
                        onChange={(e) =>
                          setReportSettings({
                            ...reportSettings,
                            columns: { ...reportSettings.columns, mobilityAllowance: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Mobilitätszuschuss</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={reportSettings.columns.healthInsurance}
                        onChange={(e) =>
                          setReportSettings({
                            ...reportSettings,
                            columns: { ...reportSettings.columns, healthInsurance: e.target.checked },
                          })
                        }
                        className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
                      />
                      <span className="ml-3 text-sm text-[#273A5F]">Krankenversicherung</span>
                    </label>
                  </div>
                </div>

                {/* Comment Field */}
                <div>
                  <h3 className="text-base font-bold text-[#273A5F] mb-3">Kommentarfeld</h3>
                  <textarea
                    value={reportSettings.comment}
                    onChange={(e) => setReportSettings({ ...reportSettings, comment: e.target.value })}
                    placeholder="Für Lohnbuchhaltung XYZ"
                    rows={4}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F] text-[#273A5F]"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-[#E5E7EB]">
                  <button
                    onClick={handleSaveReportSettings}
                    className="px-6 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3680] transition"
                    style={{ borderRadius: '32px' }}
                  >
                    Einstellungen speichern
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#273A5F]">
                {editingLocation ? 'Standort bearbeiten' : 'Neuer Standort'}
              </h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="text-[#6B7280] hover:text-[#273A5F] transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#273A5F] mb-2">Name</label>
                <input
                  type="text"
                  defaultValue={editingLocation?.name || ''}
                  placeholder="z.B. Frankfurt"
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#273A5F] mb-2">Adresse</label>
                <input
                  type="text"
                  defaultValue={editingLocation?.address || ''}
                  placeholder="Straße und Hausnummer"
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#273A5F] mb-2">PLZ</label>
                  <input
                    type="text"
                    defaultValue={editingLocation?.zipCode || ''}
                    placeholder="12345"
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#273A5F] mb-2">Stadt</label>
                  <input
                    type="text"
                    defaultValue={editingLocation?.city || ''}
                    placeholder="Berlin"
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#273A5F] mb-2">Employees zuordnen</label>
                <select
                  multiple
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
                  style={{ height: '120px' }}
                >
                  <option>Anna Smith (Vertrieb)</option>
                  <option>Max Müller (IT)</option>
                  <option>Sarah Johnson (HR)</option>
                  <option>Tom Weber (Management)</option>
                </select>
                <p className="text-xs text-[#6B7280] mt-1">Halte Strg/Cmd für Mehrfachauswahl</p>
              </div>
            </div>

            <div className="p-6 border-t border-[#E5E7EB] flex gap-3">
              <button
                onClick={() => {
                  setShowLocationModal(false);
                  alert('Standort gespeichert!');
                }}
                className="flex-1 px-4 py-2 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3680] transition"
                style={{ borderRadius: '32px' }}
              >
                Speichern
              </button>
              <button
                onClick={() => setShowLocationModal(false)}
                className="flex-1 px-4 py-2 border border-[#E5E7EB] text-[#273A5F] font-medium rounded-full hover:bg-gray-50 transition"
                style={{ borderRadius: '32px' }}
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
