import { useState, useMemo } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { StatusBadge } from './Table';
import { benefitsSettingsData } from './benefitSettingsData';

interface Location {
  id: string;
  name: string;
  limit: string;
  employeeCount: number;
  enabled: boolean;
  budgetType?: 'dynamic' | 'fix';
  pendingLimit?: string;
  pendingStatus?: 'waiting';
}

interface BenefitSettingsProps {
  benefitId?: string;
  benefitName?: string;
  benefitDescription?: string;
  initialLocations?: Location[];
  initialStats?: {
    employeesWithAccess: number;
    budgetThisMonth: number;
    usedThisMonth: number;
  };
}

export function BenefitSettings({
  benefitId,
  benefitName: customName,
  benefitDescription: customDescription,
  initialLocations: customLocations,
  initialStats: customStats,
}: BenefitSettingsProps = {}) {
  // Lookup benefit data if benefitId provided
  const benefitData = useMemo(() => {
    if (benefitId && benefitsSettingsData[benefitId]) {
      return benefitsSettingsData[benefitId];
    }
    return null;
  }, [benefitId]);

  // Use provided props or benefit data or defaults
  const benefitName = customName || benefitData?.name || 'Mittagessen';
  const benefitDescription = customDescription || benefitData?.description || 'Der Essenszuschuss ermöglicht Mitarbeitern die Nutzung von Essensgutscheinen oder direkten Kantinenzuschüssen.';
  const defaultLocations = customLocations || benefitData?.locations || [
    { id: '1', name: 'München', limit: '115,05€/Monat', employeeCount: 34, enabled: true, budgetType: 'dynamic' as const },
    { id: '2', name: 'Heddesheim', limit: '115,05€/Monat', employeeCount: 15, enabled: true, budgetType: 'dynamic' as const },
    { id: '3', name: 'Berlin', limit: '85,00€/Monat', employeeCount: 8, enabled: true, budgetType: 'fix' as const },
    { id: '4', name: 'Viernheim', limit: '115,05€/Monat', employeeCount: 5, enabled: false, budgetType: 'dynamic' as const },
  ];
  const defaultStats = customStats || benefitData?.stats || {
    employeesWithAccess: 62,
    budgetThisMonth: 4200,
    usedThisMonth: 3100,
  };
  const isEssen = benefitName === 'Mittagessen' || benefitName.toLowerCase().includes('essen');
  const dailyRate = 7.67;

  const [isActive, setIsActive] = useState(true);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [limitValue, setLimitValue] = useState('');
  const [limitError, setLimitError] = useState('');
  const [workingDays, setWorkingDays] = useState(15);
  const [essenBudgetType, setEssenBudgetType] = useState<'fix' | 'dynamic'>('dynamic');

  const [locations, setLocations] = useState<Location[]>(defaultLocations);
  const stats = defaultStats;

  const goBack = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));
  };

  const handleEditLimit = (location: Location) => {
    setEditingLocation(location);
    setLimitValue(location.limit.replace('€/Monat', '').replace(',', '.').trim());
    setLimitError('');
    setWorkingDays(15);
    setEssenBudgetType(location.budgetType === 'fix' ? 'fix' : 'dynamic');
    setShowLimitModal(true);
  };

  const handleSaveLimit = () => {
    if (isEssen && essenBudgetType === 'dynamic') {
      if (workingDays < 1 || workingDays > 15) {
        setLimitError('Arbeitstage müssen zwischen 1 und 15 liegen');
        return;
      }
      const pendingAmount = Math.round(workingDays * dailyRate * 100) / 100;
      if (editingLocation) {
        setLocations(locations.map((loc) =>
          loc.id === editingLocation.id
            ? { ...loc, pendingLimit: `${pendingAmount}€/Monat`, pendingStatus: 'waiting' }
            : loc
        ));
      }
    } else {
      if (!limitValue.trim()) {
        setLimitError('Feld erforderlich');
        return;
      }
      const numValue = parseFloat(limitValue);
      if (isNaN(numValue)) {
        setLimitError('Nur Zahlen erlaubt');
        return;
      }
      if (numValue < 0) {
        setLimitError('Betrag kann nicht negativ sein');
        return;
      }
      if (editingLocation) {
        setLocations(locations.map((loc) =>
          loc.id === editingLocation.id
            ? { ...loc, pendingLimit: `${limitValue}€/Monat`, pendingStatus: 'waiting' }
            : loc
        ));
      }
    }

    setShowLimitModal(false);
    setEditingLocation(null);
    setLimitValue('');
  };

  const handleWithdrawPending = (locationId: string) => {
    setLocations(locations.map((loc) =>
      loc.id === locationId ? { ...loc, pendingLimit: undefined, pendingStatus: undefined } : loc
    ));
  };

  const handleToggleLocation = (locationId: string) => {
    setLocations(locations.map((loc) => (loc.id === locationId ? { ...loc, enabled: !loc.enabled } : loc)));
  };

  const handleDelete = () => {
    console.log('Deleting benefit...');
    setShowDeleteModal(false);
    goBack();
  };

  const handleSave = () => {
    console.log('Saving changes...');
    alert('Änderungen gespeichert!');
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Back Link */}
      <div className="bg-white px-8 pt-6 pb-4">
        <button
          onClick={goBack} className="flex items-center text-[#0F429F] text-[12px] hover:underline transition"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
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
              <h1 className="text-[32px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {benefitName}
              </h1>
            </div>
          </div>

          {/* Status Toggle */}
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[13px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Status
              </span>
              <button
                onClick={() => setIsActive(!isActive)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isActive ? 'bg-[#4CAF50]' : 'bg-[#9E9E9E]'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <StatusBadge status={isActive ? 'Aktiv' : 'Inaktiv'} type={isActive ? 'success' : 'inactive'} />
            </div>
            <p className="text-[11px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Status-Änderung gilt ab 1. nächsten Monat
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Section 1: Benefit-Informationen */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Benefit-Informationen
          </h2>
          <div>
            <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Beschreibung
            </label>
            <p className="text-[14px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
              {benefitDescription}
            </p>
          </div>
        </div>

        {/* Section 2: Limits pro Location */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Budgets pro Standort
          </h2>

          {/* Table Header */}
          <div className="bg-[#273A5F] px-6 h-12"
            style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '2fr 1.4fr 1.2fr', gap: '0', minWidth: '600px' }}
          >
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Standort</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Budget-Typ</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Betrag</div>
          </div>

          {/* Table Rows */}
          {locations.map((location, index) => {
            const locBudgetType = location.budgetType ?? 'dynamic';
            return (
            <div
              key={location.id} className={`
                px-6 border-b border-[#E5E7EB] last:border-b-0
                transition-colors hover:bg-gray-50
                ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}
              `}
              style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '2fr 1.4fr 1.2fr', gap: '0', minWidth: '600px', minHeight: '56px', paddingTop: '8px', paddingBottom: '8px' }}
            >
              <div className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>
                {location.name}
              </div>

              {/* Budget-Typ Toggle (nur Essenszuschuss) oder Betrag + Bearbeiten */}
              {isEssen ? (
                <div className="flex rounded border border-[#0F429F] overflow-hidden">
                  <button
                    onClick={() => handleEditLimit({ ...location, budgetType: 'dynamic' })}
                    className={`px-3 py-1.5 text-[11px] transition ${locBudgetType === 'dynamic' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >🔄 Auto</button>
                  <button
                    onClick={() => handleEditLimit({ ...location, budgetType: 'fix' })}
                    className={`px-3 py-1.5 text-[11px] transition border-l border-[#0F429F] ${locBudgetType === 'fix' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >📌 Fix</button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditLimit(location)}
                  className="px-4 py-2 border border-[#0F429F] text-[#0F429F] text-[12px] rounded-2xl hover:bg-[#F0F4FF] transition"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >Bearbeiten</button>
              )}

              {/* Betrag + Pending */}
              <div className="text-[#000000] text-sm overflow-hidden flex flex-col gap-0.5" style={{ minWidth: 0 }}>
                <span className={`text-[12px] ${locBudgetType === 'dynamic' && isEssen ? 'text-[#0F429F]' : ''}`}>
                  {locBudgetType === 'dynamic' && isEssen ? `Auto — ${location.limit}` : location.limit}
                </span>
                {location.pendingStatus === 'waiting' && (
                  <span className="text-[11px] text-[#F59E0B] bg-[#FFFBEB] border border-[#F59E0B] rounded px-1.5 py-0.5 w-fit">
                    → {location.pendingLimit} ⏳
                    <button
                      onClick={() => handleWithdrawPending(location.id)}
                      className="ml-1 text-[#F44336] hover:underline text-[10px]"
                    >zurückziehen</button>
                  </span>
                )}
              </div>
            </div>
          );
          })}
        </div>

        {/* Legend: Budget-Typen */}
        <div className="mt-3 px-2 flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="text-[11px] text-[#666666]">
            <span className="font-medium text-[#273A5F]">🔄 Auto</span> — Dynamisch: Budget wird automatisch aus Tagessatz × Arbeitstagen berechnet
          </span>
          <span className="text-[11px] text-[#666666]">
            <span className="font-medium text-[#273A5F]">📌 Fix</span> — Fester Monatsbetrag: du legst einen fixen Betrag pro Monat fest
          </span>
          <span className="text-[11px] text-[#999999]">
            Änderungen gelten ab dem 1. des nächsten Monats.
          </span>
        </div>

        {/* Section 3: Verfügbare Standorte */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Verfügbar für diese Standorte
          </h2>

          <div className="space-y-2">
            {locations.map((location) => (
              <label
                key={location.id} className="flex items-center gap-3 px-3 py-3 hover:bg-[#F0F4FF] rounded cursor-pointer transition group"
                style={{ height: '40px' }}
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={location.enabled}
                    onChange={() => handleToggleLocation(location.id)} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer group-hover:border-[#246AFF] transition-colors"
                  />
                  {location.enabled && (
                    <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                  )}
                </div>
                <span className="text-[14px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {location.name} ({location.employeeCount} Mitarbeiter)
                </span>
              </label>
            ))}
          </div>

          <p className="text-[12px] text-[#666666] mt-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Ein Benefit ist für einen Standort verfügbar, wenn mindestens ein Budget gesetzt ist. Mitarbeiter dieser
            Standorte erhalten das Benefit automatisch ab 1. nächsten Monat.
          </p>
        </div>

        {/* Section 4: Nutzungsstatistik */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Nutzungsstatistik
          </h2>

          <div className="grid grid-cols-3 gap-6">
            {/* Mitarbeiter mit Zugriff */}
            <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 text-center">
              <p className="text-[24px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {stats.employeesWithAccess}
              </p>
              <p className="text-[12px] text-[#666666] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Mitarbeiter mit Zugriff
              </p>
            </div>

            {/* Budget diesen Monat */}
            <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 text-center">
              <p className="text-[24px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {stats.budgetThisMonth.toLocaleString('de-DE')}€
              </p>
              <p className="text-[12px] text-[#666666] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Budget (diesen Monat)
              </p>
            </div>

            {/* Genutzt diesen Monat */}
            <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 text-center">
              <p className="text-[24px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {stats.usedThisMonth.toLocaleString('de-DE')}€
              </p>
              <p className="text-[12px] text-[#666666] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Genutzt (diesen Monat)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setShowDeleteModal(true)} className="px-6 py-3 border border-[#F44336] text-[#F44336] font-medium rounded-full hover:bg-[#FFEBEE] transition"
            style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
          >
            Deaktivieren
          </button>

          <button
            onClick={handleSave} className="px-8 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#246AFF] transition"
            style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
          >
            Speichern
          </button>
        </div>
      </div>

      {/* Modal 1: Budget bearbeiten */}
      {showLimitModal && editingLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-[18px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Budget bearbeiten — {benefitName} — {editingLocation.name}
            </h3>

            {isEssen ? (
              <div className="mb-4 space-y-4">
                {/* Fix / Dynamisch Toggle */}
                <div>
                  <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Budget-Typ
                  </label>
                  <div className="flex rounded-lg border border-[#0F429F] overflow-hidden w-fit">
                    <button
                      onClick={() => { setEssenBudgetType('dynamic'); setLimitError(''); }}
                      className={`px-4 py-2 text-[13px] transition ${essenBudgetType === 'dynamic' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      🔄 Dynamisch
                    </button>
                    <button
                      onClick={() => { setEssenBudgetType('fix'); setLimitError(''); }}
                      className={`px-4 py-2 text-[13px] transition border-l border-[#0F429F] ${essenBudgetType === 'fix' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      📌 Fix
                    </button>
                  </div>
                  <p className="text-[11px] text-[#9E9E9E] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {essenBudgetType === 'dynamic'
                      ? 'Tagessatz × Arbeitstage — passt sich jährlich an'
                      : 'Fester Betrag — bleibt bis zur nächsten Änderung'}
                  </p>
                </div>
                {essenBudgetType === 'dynamic' ? (
                  <>
                    {/* Tagessatz — gesperrt */}
                    <div>
                      <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Tagessatz (gesetzl. Maximum)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={`${dailyRate} €`}
                          disabled
                          className="w-28 h-[40px] px-3 py-2 border border-[#E0E0E0] rounded text-[14px] bg-[#F5F5F5] text-[#9E9E9E]"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                        <span className="text-[12px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          🔒 jährlich von Riso aktualisiert
                        </span>
                      </div>
                    </div>

                    {/* Arbeitstage — editierbar */}
                    <div>
                      <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Max. Arbeitstage / Monat
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={15}
                          value={workingDays}
                          onChange={(e) => {
                            setWorkingDays(Math.min(15, Math.max(1, Number(e.target.value))));
                            setLimitError('');
                          }}
                          className={`w-24 h-[40px] px-3 py-2 border ${limitError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                        <span className="text-[12px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          (gesetzl. Max: 15)
                        </span>
                      </div>
                      {limitError && (
                        <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{limitError}</p>
                      )}
                    </div>

                    {/* Auto-berechnetes Budget */}
                    <div className="bg-[#F0F4FF] border border-[#C7D7F9] rounded p-3">
                      <p className="text-[13px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Monatliches Budget:{' '}
                        <strong>{Math.round(workingDays * dailyRate * 100) / 100} €</strong>
                        <span className="text-[11px] text-[#9E9E9E] ml-1">({workingDays} × {dailyRate} €)</span>
                      </p>
                    </div>
                  </>
                ) : (
                  /* Fix: einfaches Betrag-Feld */
                  <div>
                    <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Budget pro Mitarbeiter
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={limitValue}
                        onChange={(e) => { setLimitValue(e.target.value); setLimitError(''); }}
                        placeholder="z.B. 100"
                        className={`w-40 h-[40px] px-3 py-2 border ${limitError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      />
                      <span className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>€/Monat</span>
                    </div>
                    {limitError && (
                      <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{limitError}</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Budget pro Mitarbeiter
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={limitValue}
                    onChange={(e) => {
                      setLimitValue(e.target.value);
                      setLimitError('');
                    }}
                    placeholder="z.B. 100"
                    className={`flex-1 h-[40px] px-3 py-2 border ${limitError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                    style={{ fontFamily: 'Roboto, sans-serif', width: '250px' }}
                  />
                  <span className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    €/Monat
                  </span>
                </div>
                {limitError && (
                  <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{limitError}</p>
                )}
              </div>
            )}

            <p className="text-[12px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Änderung gilt ab 1. nächsten Monat — wartet auf Riso-Genehmigung
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowLimitModal(false);
                  setEditingLocation(null);
                  setLimitValue('');
                  setLimitError('');
                }} className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleSaveLimit} className="px-6 py-3 bg-[#0F429F] text-white rounded-full hover:bg-[#246AFF] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Benefit deaktivieren */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <span className="text-[48px]">⚠️</span>
            </div>

            <h3 className="text-[18px] font-bold text-[#273A5F] mb-3 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Benefit deaktivieren?
            </h3>

            <p className="text-[14px] text-[#333333] mb-4 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Möchtest du {benefitName} wirklich deaktivieren?
            </p>

            <div className="bg-[#FFEBEE] border border-[#F44336] rounded p-3 mb-6 flex items-start gap-2">
              <span className="text-[16px]">⚠️</span>
              <p className="text-[12px] text-[#F44336]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Mitarbeiter verlieren ab 1. nächsten Monat Zugriff auf dieses Benefit
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowDeleteModal(false)} className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleDelete} className="px-6 py-3 bg-[#F44336] text-white rounded-full hover:bg-[#D32F2F] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
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
