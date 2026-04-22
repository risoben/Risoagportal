import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

export function BenefitSettings() {
  const [settings, setSettings] = useState({
    name: 'Essenszuschuss',
    description: 'Täglicher Zuschuss für Mittagessen',
    benefitType: 'Sachbezug',
    yearlyBudget: '€1.200',
    monthlyLimit: '€100',
    autoAssign: true,
    autoAssignDepartments: 'alle',
    status: 'aktiv',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setSettings(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Einstellungen gespeichert!');
  };

  const goBack = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits' } }));
  };

  return (
    <div className="flex-1 bg-white overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="px-8 py-4">
          <button
            onClick={goBack}
            className="flex items-center text-[#0F429F] hover:text-[#0d3680] mb-4 transition"
          >
            <ChevronLeft size={20} />
            <span className="ml-2">Zurück zu Benefits</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="text-5xl">🍽️</div>
            <div>
              <h1 className="text-3xl font-bold text-[#273A5F]">{settings.name}</h1>
              <p className="text-[#6B7280]">Konfiguration & Einstellungen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 max-w-2xl">
        {/* Basic Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#273A5F] mb-6">Grundinformationen</h2>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#273A5F] mb-2">Benefit Name</label>
              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#273A5F] mb-2">Beschreibung</label>
              <textarea
                name="description"
                value={settings.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#273A5F] mb-2">Benefit Typ</label>
              <select
                name="benefitType"
                value={settings.benefitType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
              >
                <option>Sachbezug</option>
                <option>Dienstleistung</option>
                <option>Versicherung</option>
                <option>Sonstiges</option>
              </select>
            </div>
          </div>
        </div>

        {/* Budget Configuration */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#273A5F] mb-6">Budget & Limits</h2>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#273A5F] mb-2">Jährliches Budget pro Mitarbeiter</label>
              <input
                type="text"
                name="yearlyBudget"
                value={settings.yearlyBudget}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
              />
              <p className="text-xs text-[#6B7280] mt-1">Das Budget wird jährlich am 01. Januar zurückgesetzt</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#273A5F] mb-2">Monatliches Limit</label>
              <input
                type="text"
                name="monthlyLimit"
                value={settings.monthlyLimit}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
              />
              <p className="text-xs text-[#6B7280] mt-1">Das Budget wird automatisch am Monatsende zurückgesetzt</p>
            </div>
          </div>
        </div>

        {/* Auto Assignment */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#273A5F] mb-6">Automatische Zuweisung</h2>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="autoAssign"
                checked={settings.autoAssign}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-[#E5E7EB] text-[#0F429F] focus:ring-[#0F429F]"
              />
              <label className="ml-3 text-sm font-medium text-[#273A5F]">
                Neue Mitarbeiter automatisch hinzufügen
              </label>
            </div>

            {settings.autoAssign && (
              <div>
                <label className="block text-sm font-medium text-[#273A5F] mb-2">Für folgende Abteilungen:</label>
                <select
                  name="autoAssignDepartments"
                  value={settings.autoAssignDepartments}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#0F429F] focus:border-[#0F429F]"
                >
                  <option value="alle">Alle Abteilungen</option>
                  <option value="vertrieb">Vertrieb</option>
                  <option value="it">IT</option>
                  <option value="hr">HR</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#273A5F] mb-6">Status</h2>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="aktiv"
                  checked={settings.status === 'aktiv'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#0F429F] border-[#E5E7EB] focus:ring-[#0F429F]"
                />
                <span className="ml-3 text-sm text-[#273A5F]">
                  <span className="font-medium">Aktiv</span> - Benefit ist für Mitarbeiter verfügbar
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="inaktiv"
                  checked={settings.status === 'inaktiv'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#0F429F] border-[#E5E7EB] focus:ring-[#0F429F]"
                />
                <span className="ml-3 text-sm text-[#273A5F]">
                  <span className="font-medium">Inaktiv</span> - Benefit ist für neue Mitarbeiter nicht verfügbar
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="geplant"
                  checked={settings.status === 'geplant'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#0F429F] border-[#E5E7EB] focus:ring-[#0F429F]"
                />
                <span className="ml-3 text-sm text-[#273A5F]">
                  <span className="font-medium">Geplant</span> - Benefit wird bald verfügbar sein
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 sticky bottom-0 bg-white py-4 border-t border-[#E5E7EB]">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3680] transition"
            style={{ borderRadius: '32px' }}
          >
            Speichern
          </button>
          <button
            onClick={goBack}
            className="px-6 py-3 border border-[#E5E7EB] text-[#273A5F] font-medium rounded-full hover:bg-gray-50 transition"
            style={{ borderRadius: '32px' }}
          >
            Abbrechen
          </button>
          <button 
            className="px-6 py-3 border border-red-300 text-red-600 font-medium rounded-full hover:bg-red-50 transition ml-auto"
            style={{ borderRadius: '32px' }}
          >
            Benefit löschen
          </button>
        </div>
      </div>
    </div>
  );
}
