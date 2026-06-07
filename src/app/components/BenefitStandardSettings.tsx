import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { BenefitTaxInfo } from './BenefitTaxInfo';
import { StatusBadge } from './Table';
import { benefitsSettingsData } from './benefitSettingsData';

interface StandardLocation {
  id: string;
  name: string;
  budgetPerEmployee: number;
  employeeCount: number;
  enabled: boolean;
}

interface BenefitStandardSettingsProps {
  benefitId: string;
}

const DEFAULT_LOCATIONS: StandardLocation[] = [
  { id: '1', name: 'München', budgetPerEmployee: 50, employeeCount: 34, enabled: true },
  { id: '2', name: 'Heddesheim', budgetPerEmployee: 50, employeeCount: 15, enabled: true },
  { id: '3', name: 'Berlin', budgetPerEmployee: 50, employeeCount: 8, enabled: true },
  { id: '4', name: 'Viernheim', budgetPerEmployee: 50, employeeCount: 5, enabled: false },
];

const DEFAULT_STATS = { employeesWithAccess: 57, budgetThisMonth: 2850, usedThisMonth: 2100 };

export function BenefitStandardSettings({ benefitId }: BenefitStandardSettingsProps) {
  const data = benefitsSettingsData[benefitId];
  const benefitName = data?.name ?? benefitId;
  const description = data?.description ?? '';
  const taxInfo = data?.taxInfo;
  const maxBudget = data?.maxBudgetPerEmployee;

  const [isActive, setIsActive] = useState(true);
  const [locations, setLocations] = useState<StandardLocation[]>(DEFAULT_LOCATIONS);
  const [savedConfirm, setSavedConfirm] = useState<string | null>(null);

  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [editingLoc, setEditingLoc] = useState<StandardLocation | null>(null);
  const [budgetInput, setBudgetInput] = useState('');
  const [budgetError, setBudgetError] = useState('');

  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const goBack = () =>
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));

  const handleOpenBudgetModal = (loc: StandardLocation) => {
    setEditingLoc(loc);
    setBudgetInput(String(loc.budgetPerEmployee));
    setBudgetError('');
    setShowBudgetModal(true);
  };

  const handleSaveBudget = () => {
    const n = parseFloat(budgetInput.replace(',', '.'));
    if (!budgetInput.trim() || isNaN(n)) { setBudgetError('Bitte gültigen Betrag eingeben'); return; }
    if (n <= 0) { setBudgetError('Betrag muss größer als 0 sein'); return; }
    if (maxBudget && n > maxBudget) { setBudgetError(`Überschreitet das Maximum (${maxBudget} €/Monat)`); return; }
    if (editingLoc) {
      setLocations(prev => prev.map(l => l.id === editingLoc.id ? { ...l, budgetPerEmployee: n } : l));
      setSavedConfirm(`${editingLoc.name}: Budget gespeichert — gilt ab 1. nächsten Monat.`);
      setTimeout(() => setSavedConfirm(null), 4000);
    }
    setShowBudgetModal(false);
    setEditingLoc(null);
  };

  const handleToggleLocation = (id: string) =>
    setLocations(prev => prev.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l));

  const stats = DEFAULT_STATS;

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Back */}
      <div className="bg-white px-8 pt-6 pb-4">
        <button onClick={goBack} className="flex items-center text-[#0F429F] text-[12px] hover:underline transition">
          <ArrowLeft size={16} className="mr-1" />
          Zurück zu Benefits verwalten
        </button>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-8 pb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <BenefitIconComponent benefitName={benefitName} size={48} background={true} />
            <div>
              <h1 className="text-[32px] font-bold text-[#273A5F]">{benefitName}</h1>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[13px] text-[#273A5F]">Status</span>
              <button
                onClick={() => setIsActive(v => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? 'bg-[#4CAF50]' : 'bg-[#9E9E9E]'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <StatusBadge status={isActive ? 'Aktiv' : 'Inaktiv'} type={isActive ? 'success' : 'inactive'} />
            </div>
            <p className="text-[11px] text-[#666666]">Status-Änderung gilt ab 1. nächsten Monat</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6" style={{ maxWidth: '900px' }}>

        {/* Section 1: Benefit-Informationen */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-3">Benefit-Informationen</h2>
          <p className="text-[14px] text-[#333333]" style={{ lineHeight: '1.6' }}>{description}</p>
        </div>

        {/* Save confirmation banner */}
        {savedConfirm && (
          <div className="mb-4 flex items-center gap-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded-lg px-4 py-3">
            <span className="text-[#2E7D32] text-[13px]">✅ {savedConfirm}</span>
          </div>
        )}

        {/* Section 3: Budget pro Standort */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-2">Budget pro Standort</h2>
          <p className="text-[13px] text-[#666666] mb-4">
            Monatlicher Fixbetrag pro Mitarbeiter — gilt ab 1. nächsten Monat nach Änderung.
          </p>

          <div
            className="bg-[#273A5F] px-6 h-12 rounded-t-lg"
            style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '2fr 1.5fr 120px' }}
          >
            <span className="text-white font-bold text-xs uppercase tracking-wide">Standort</span>
            <span className="text-white font-bold text-xs uppercase tracking-wide">Budget / Mitarbeiter</span>
            <span />
          </div>

          {locations.map((loc, i) => (
            <div
              key={loc.id}
              className={`px-6 border-b border-[#E5E7EB] last:border-b-0 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}
              style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '2fr 1.5fr 120px', minHeight: '52px', paddingTop: '8px', paddingBottom: '8px' }}
            >
              <span className="text-[14px] text-[#333333]">
                {loc.name} <span className="text-[12px] text-[#9E9E9E]">({loc.employeeCount} MA)</span>
              </span>
              <span className="text-[14px] text-[#273A5F] font-medium">
                {loc.budgetPerEmployee.toLocaleString('de-DE')} €/Monat
              </span>
              <div className="flex justify-end">
                <button
                  onClick={() => handleOpenBudgetModal(loc)}
                  className="px-4 py-1.5 border border-[#0F429F] text-[#0F429F] text-[12px] rounded-full hover:bg-[#F0F4FF] transition"
                >
                  Bearbeiten
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section 4: Verfügbare Standorte */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-4">Verfügbar für diese Standorte</h2>
          <div className="space-y-1">
            {locations.map(loc => (
              <label
                key={loc.id}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F0F4FF] rounded cursor-pointer transition group"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={loc.enabled}
                    onChange={() => handleToggleLocation(loc.id)}
                    className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer transition-colors"
                  />
                  {loc.enabled && (
                    <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                  )}
                </div>
                <span className="text-[14px] text-[#333333]">
                  {loc.name} ({loc.employeeCount} Mitarbeiter)
                </span>
              </label>
            ))}
          </div>
          <p className="text-[12px] text-[#666666] mt-4">
            Mitarbeiter aktivierter Standorte erhalten das Benefit automatisch ab 1. nächsten Monat.
          </p>
        </div>

        {/* Section 5: Nutzungsstatistik */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5">Nutzungsstatistik</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Mitarbeiter mit Zugriff', value: `${stats.employeesWithAccess}` },
              { label: 'Budget (diesen Monat)', value: `${stats.budgetThisMonth.toLocaleString('de-DE')} €` },
              { label: 'Genutzt (diesen Monat)', value: `${stats.usedThisMonth.toLocaleString('de-DE')} €` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 text-center">
                <p className="text-[24px] font-bold text-[#273A5F]">{value}</p>
                <p className="text-[12px] text-[#666666] mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Steuerliche Behandlung */}
        {taxInfo && <BenefitTaxInfo steuer={taxInfo.steuer} sv={taxInfo.sv} />}

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setShowDeactivateModal(true)}
            className="px-6 py-3 border border-[#F44336] text-[#F44336] font-medium rounded-full hover:bg-[#FFEBEE] transition"
            style={{ borderRadius: '24px' }}
          >
            Deaktivieren
          </button>
          <button
            className="px-8 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#246AFF] transition"
            style={{ borderRadius: '24px' }}
            onClick={() => {
              setSavedConfirm('Einstellungen gespeichert.');
              setTimeout(() => setSavedConfirm(null), 4000);
            }}
          >
            Speichern
          </button>
        </div>
      </div>

      {/* Budget Modal */}
      {showBudgetModal && editingLoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <h3 className="text-[18px] font-bold text-[#273A5F] mb-4">
              Budget bearbeiten — {editingLoc.name}
            </h3>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2">
                Monatlicher Fixbetrag pro Mitarbeiter
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={maxBudget ?? undefined}
                  value={budgetInput}
                  onChange={e => { setBudgetInput(e.target.value); setBudgetError(''); }}
                  className={`w-40 h-[40px] px-3 border ${budgetError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                />
                <span className="text-[14px] text-[#666666]">€/Monat</span>
                {maxBudget && (
                  <span className="text-[12px] text-[#9E9E9E]">max. {maxBudget} €</span>
                )}
              </div>
              {budgetError && <p className="text-[12px] text-[#F44336] mt-1">{budgetError}</p>}
            </div>
            <p className="text-[12px] text-[#666666] mb-6">
              Änderung gilt ab 1. nächsten Monat — wartet auf Riso-Genehmigung.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowBudgetModal(false); setEditingLoc(null); }}
                className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ borderRadius: '24px' }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleSaveBudget}
                className="px-6 py-3 bg-[#0F429F] text-white rounded-full hover:bg-[#246AFF] transition"
                style={{ borderRadius: '24px' }}
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <div className="text-[48px] mb-3">⚠️</div>
            <h3 className="text-[18px] font-bold text-[#273A5F] mb-3">Benefit deaktivieren?</h3>
            <p className="text-[14px] text-[#333333] mb-4">
              Möchtest du <strong>{benefitName}</strong> wirklich deaktivieren?
            </p>
            <div className="bg-[#FFEBEE] border border-[#F44336] rounded p-3 mb-6 flex items-start gap-2 text-left">
              <span>⚠️</span>
              <p className="text-[12px] text-[#F44336]">
                Mitarbeiter verlieren ab 1. nächsten Monat Zugriff auf dieses Benefit.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ borderRadius: '24px' }}
              >
                Abbrechen
              </button>
              <button
                onClick={() => { setShowDeactivateModal(false); goBack(); }}
                className="px-6 py-3 bg-[#F44336] text-white rounded-full hover:bg-[#D32F2F] transition"
                style={{ borderRadius: '24px' }}
              >
                Deaktivieren
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
