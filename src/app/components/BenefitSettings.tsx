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
    { id: '1', name: 'München', limit: '100€/Monat', employeeCount: 34, enabled: true },
    { id: '2', name: 'Heddesheim', limit: '100€/Monat', employeeCount: 15, enabled: true },
    { id: '3', name: 'Berlin', limit: '85€/Monat', employeeCount: 8, enabled: true },
    { id: '4', name: 'Viernheim', limit: '100€/Monat', employeeCount: 5, enabled: false },
  ];
  const defaultStats = customStats || benefitData?.stats || {
    employeesWithAccess: 62,
    budgetThisMonth: 4200,
    usedThisMonth: 3100,
  };
  const [isActive, setIsActive] = useState(true);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [limitValue, setLimitValue] = useState('');
  const [limitError, setLimitError] = useState('');

  const [locations, setLocations] = useState<Location[]>(defaultLocations);
  const stats = defaultStats;

  const goBack = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));
  };

  const handleEditLimit = (location: Location) => {
    setEditingLocation(location);
    setLimitValue(location.limit.replace('€/Monat', '').trim());
    setLimitError('');
    setShowLimitModal(true);
  };

  const handleSaveLimit = () => {
    // Validation
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

    // Update location
    if (editingLocation) {
      setLocations(
        locations.map((loc) =>
          loc.id === editingLocation.id ? { ...loc, limit: `${limitValue}€/Monat` } : loc
        )
      );
    }

    setShowLimitModal(false);
    setEditingLocation(null);
    setLimitValue('');
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
          <div className="bg-[#273A5F] flex items-center px-6 h-12"
            style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0' }}
          >
            <div className="text-white font-bold text-xs uppercase tracking-wide">Standort</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide">Budget</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide">Aktion</div>
          </div>

          {/* Table Rows */}
          {locations.map((location, index) => (
            <div
              key={location.id} className={`
                flex items-center px-6 h-14 border-b border-[#E5E7EB] last:border-b-0
                transition-colors hover:bg-gray-50
                ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}
              `}
              style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0' }}
            >
              <div className="text-[#000000] text-sm">
                {location.name}
              </div>
              <div className="text-[#000000] text-sm">
                {location.limit}
              </div>
              <div>
                <button
                  onClick={() => handleEditLimit(location)} className="px-4 py-2 border border-[#0F429F] text-[#0F429F] text-[12px] rounded-2xl hover:bg-[#F0F4FF] transition"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Bearbeiten
                </button>
              </div>
            </div>
          ))}
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
            Löschen
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
                  placeholder="z.B. 100" className={`flex-1 h-[40px] px-3 py-2 border ${
                    limitError ? 'border-[#F44336]' : 'border-[#0F429F]'
                  } rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                  style={{ fontFamily: 'Roboto, sans-serif', width: '250px' }}
                />
                <span className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  €/Monat
                </span>
              </div>
              {limitError && (
                <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {limitError}
                </p>
              )}
            </div>

            <p className="text-[12px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Änderung gilt ab 1. nächsten Monat für alle Mitarbeiter dieses Standorts
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

      {/* Modal 2: Benefit löschen */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <span className="text-[48px]">⚠️</span>
            </div>

            <h3 className="text-[18px] font-bold text-[#273A5F] mb-3 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Benefit löschen?
            </h3>

            <p className="text-[14px] text-[#333333] mb-4 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Möchtest du {benefitName} wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
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
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
