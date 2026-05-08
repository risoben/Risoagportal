import { useState, useMemo } from 'react';
import { ArrowLeft, AlertCircle, Loader2, X, Check, Info } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';

type LocationFormCompleteProps = {
  mode?: 'Create' | 'Edit';
  locationId?: string;
};

const GERMAN_STATES = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen',
];

const COUNTRIES = ['Deutschland', 'Österreich', 'Schweiz', 'Liechtenstein'];
const COMPANIES = ['Cassianiel Software', 'Fine Cotton Company', 'Berlin Tech GmbH'];

const ALL_BENEFITS = [
  { id: 'mittagessen', name: 'Mittagessen', dailyLimit: '60', monthlyLimit: '600' },
  { id: 'internet', name: 'Internet', dailyLimit: '', monthlyLimit: '50' },
  { id: 'kindergarten', name: 'Kindergarten', dailyLimit: '', monthlyLimit: '150' },
  { id: 'commuting', name: 'Fahrkostenzuschuss', dailyLimit: '', monthlyLimit: '80' },
  { id: 'erholung', name: 'Erholung', dailyLimit: '', monthlyLimit: '13' },
  { id: 'sachbezug', name: 'Sachbezug', dailyLimit: '', monthlyLimit: '50' },
  { id: 'danke-bonus', name: 'Danke-Bonus', dailyLimit: '', monthlyLimit: '100' },
  { id: 'geburtstag', name: 'Geburtstag', dailyLimit: '', monthlyLimit: '50' },
  { id: 'oepnv', name: 'ÖPNV', dailyLimit: '', monthlyLimit: '70' },
  { id: 'bkv', name: 'BKV', dailyLimit: '', monthlyLimit: '80' },
  { id: 'bav', name: 'BAV', dailyLimit: '', monthlyLimit: '150' },
];

export function LocationFormComplete({ mode = 'Create', locationId }: LocationFormCompleteProps) {
  const isEditMode = mode === 'Edit' || !!locationId;

  const [hasErrors, setHasErrors] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [masterData, setMasterData] = useState({
    locationName: isEditMode ? 'München' : '',
    company: isEditMode ? 'Cassianiel Software' : '',
    taxIdentificationNumber: isEditMode ? 'DE123456789' : '',
  });

  const [addressData, setAddressData] = useState({
    address: isEditMode ? 'Fürstenrieder Straße 279A, 81377 München' : '',
    street: isEditMode ? 'Fürstenrieder Straße 279A' : '',
    city: isEditMode ? 'München' : '',
    state: isEditMode ? 'Bayern' : '',
    zipCode: isEditMode ? '81377' : '',
    country: isEditMode ? 'Deutschland' : 'Deutschland',
  });

  const [contactData, setContactData] = useState({
    phone: isEditMode ? '+49 241 5850001' : '',
    fax: isEditMode ? '+49 241 5850079' : '',
  });

  const [locationType, setLocationType] = useState<'Standort' | 'Tochterunternehmen'>(
    isEditMode ? 'Standort' : 'Standort'
  );

  const [activeBenefits, setActiveBenefits] = useState<Set<string>>(
    new Set(isEditMode ? ['mittagessen', 'internet', 'commuting', 'danke-bonus'] : [])
  );

  const [benefitLimits, setBenefitLimits] = useState<Record<string, { daily: string; monthly: string }>>(
    ALL_BENEFITS.reduce((acc, b) => ({
      ...acc,
      [b.id]: { daily: b.dailyLimit, monthly: b.monthlyLimit }
    }), {})
  );

  const handleMasterDataChange = (field: string, value: string) => {
    setMasterData({ ...masterData, [field]: value });
  };

  const handleAddressChange = (field: string, value: string) => {
    setAddressData({ ...addressData, [field]: value });
  };

  const handleContactChange = (field: string, value: string) => {
    setContactData({ ...contactData, [field]: value });
  };

  const toggleBenefit = (benefitId: string) => {
    const newSet = new Set(activeBenefits);
    if (newSet.has(benefitId)) {
      newSet.delete(benefitId);
    } else {
      newSet.add(benefitId);
    }
    setActiveBenefits(newSet);
  };

  const updateBenefitLimit = (benefitId: string, type: 'daily' | 'monthly', value: string) => {
    setBenefitLimits({
      ...benefitLimits,
      [benefitId]: {
        ...benefitLimits[benefitId],
        [type]: value
      }
    });
  };

  const groupedBenefits = useMemo(() => {
    const benefitCategories: Record<string, 'cash' | 'other' | 'insurance'> = {
      'mittagessen': 'cash',
      'internet': 'cash',
      'kindergarten': 'cash',
      'commuting': 'cash',
      'erholung': 'cash',
      'sachbezug': 'other',
      'danke-bonus': 'cash',
      'geburtstag': 'other',
      'oepnv': 'cash',
      'bkv': 'insurance',
      'bav': 'insurance',
    };

    return ALL_BENEFITS.reduce((acc, benefit) => {
      const categoryType = benefitCategories[benefit.id];

      let category = '';
      if (categoryType === 'cash') category = 'Cash-Benefits';
      else if (categoryType === 'other') category = 'Gutschein-Benefits';
      else if (categoryType === 'insurance') category = 'Versicherungs-Benefits';

      if (!category) return acc;
      if (!acc[category]) acc[category] = [];
      acc[category].push(benefit);
      return acc;
    }, {} as Record<string, typeof ALL_BENEFITS>);
  }, []);

  const handleSave = () => {
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false);
      alert(isEditMode ? 'Standort wurde aktualisiert!' : 'Standort wurde erstellt!');
      goBack();
    }, 1000);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    alert('Standort wurde gelöscht!');
    goBack();
  };

  const goBack = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'locations' } }));
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white px-8 py-6 border-b border-[#E0E0E0]">
        <button onClick={goBack} className="text-[#0F429F] text-sm mb-4 hover:underline flex items-center gap-2">
          <ArrowLeft size={16} />
          Zurück zur Übersicht
        </button>
        <h1 className="text-[#273A5F] text-[24px]">
          {isEditMode ? masterData.locationName || 'Standort bearbeiten' : 'Neuen Standort erstellen'}
        </h1>
      </div>

      {/* Error Banner */}
      {hasErrors && (
        <div className="mx-8 mt-6 p-4 bg-[#FFEBEE] border border-[#F44336] rounded flex items-start gap-3">
          <AlertCircle className="text-[#F44336] mt-0.5" size={20} />
          <div className="flex-1">
            <p className="text-[#D32F2F] font-medium text-[14px]">Fehler beim Speichern</p>
            <p className="text-[#D32F2F] text-sm">Bitte versuchen Sie es später erneut.</p>
          </div>
          <button onClick={() => setHasErrors(false)} className="text-[#D32F2F]">
            <X size={20} />
          </button>
        </div>
      )}

      <div className="w-full p-8 space-y-6">
        {/* SECTION A: Standort-Stammdaten */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-6">Standort-Stammdaten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>
                  Standortname <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <input
                type="text"
                value={masterData.locationName}
                onChange={(e) => handleMasterDataChange('locationName', e.target.value)}
                placeholder="z.B. Heidelsheim, München, etc."
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>
                  Unternehmen <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <select
                value={masterData.company}
                onChange={(e) => handleMasterDataChange('company', e.target.value)}
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              >
                <option value="">Bitte auswählen</option>
                {COMPANIES.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1.5">
                <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>Steuernummer / VAT ID</span>
              </label>
              <input
                type="text"
                value={masterData.taxIdentificationNumber}
                onChange={(e) => handleMasterDataChange('taxIdentificationNumber', e.target.value)}
                placeholder="z.B. DE123456789"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>
          </div>
        </div>

        {/* SECTION B: Adresse */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-6">Adresse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block mb-1.5">
                <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>
                  Adresse <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <input
                type="text"
                value={addressData.address}
                onChange={(e) => handleAddressChange('address', e.target.value)}
                placeholder="Vollständige Adresse mit Straße, Hausnummer und Ort"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>
                  Straße <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <input
                type="text"
                value={addressData.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                placeholder="z.B. Fürstenrieder Straße 279A"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>
                  Stadt <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <input
                type="text"
                value={addressData.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                placeholder="z.B. München"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>
                  Bundesland <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <select
                value={addressData.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              >
                <option value="">Bitte auswählen</option>
                {GERMAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>
                  PLZ <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <input
                type="text"
                value={addressData.zipCode}
                onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                placeholder="z.B. 81377"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1.5">
                <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>
                  Land <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <select
                value={addressData.country}
                onChange={(e) => handleAddressChange('country', e.target.value)}
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              >
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION C: Kontaktdaten */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-6">Kontaktdaten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>Telefon</span>
              </label>
              <input
                type="tel"
                value={contactData.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                placeholder="z.B. +49 241 5850001"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>Fax</span>
              </label>
              <input
                type="tel"
                value={contactData.fax}
                onChange={(e) => handleContactChange('fax', e.target.value)}
                placeholder="z.B. +49 241 5850079"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>
          </div>
        </div>

        {/* SECTION D: Standorttyp */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-6">Standorttyp</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="locationType"
                  value="Standort"
                  checked={locationType === 'Standort'}
                  onChange={(e) => setLocationType(e.target.value as 'Standort' | 'Tochterunternehmen')}
                  disabled={loadingState} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                />
                {locationType === 'Standort' && (
                  <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                )}
              </div>
              <span className="text-sm text-black">Standort</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="locationType"
                  value="Tochterunternehmen"
                  checked={locationType === 'Tochterunternehmen'}
                  onChange={(e) => setLocationType(e.target.value as 'Standort' | 'Tochterunternehmen')}
                  disabled={loadingState} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                />
                {locationType === 'Tochterunternehmen' && (
                  <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                )}
              </div>
              <span className="text-sm text-black">Tochterunternehmen</span>
            </label>
          </div>
        </div>

        {/* SECTION E: Benefits */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-2">Benefits aktivieren und Budgets festlegen</h2>

          {Object.entries(groupedBenefits).map(([category, benefits]) => (
            <div key={category} className="mb-8">
              <h3 className="text-[#273A5F] font-bold text-[14px] mb-4 mt-6">{category}</h3>
              <div className="px-4 md:px-6 lg:px-8 py-6">
                <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
                  <div className="bg-[#273A5F] px-6 h-12" style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '60px 60px 2fr 1fr 1fr', gap: '0', minWidth: '600px' }}>
                    <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Aktiv</div>
                    <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}></div>
                    <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Benefit</div>
                    <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Monatsbudget</div>
                    <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Jahresbudget</div>
                  </div>

                  {benefits.map((benefit, index) => (
                    <div
                      key={benefit.id} className={`px-6 h-14 border-b border-[#E5E7EB] last:border-b-0 transition-colors hover:bg-gray-50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'
                      }`}
                      style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '60px 60px 2fr 1fr 1fr', gap: '0', minWidth: '600px' }}
                    >
                      <div className="flex items-center justify-center">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={activeBenefits.has(benefit.id)}
                            onChange={() => toggleBenefit(benefit.id)}
                            disabled={loadingState} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer hover:border-[#246AFF] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                          />
                          {activeBenefits.has(benefit.id) && (
                            <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <BenefitIconComponent benefitName={benefit.name} size={32} background={false} />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#000000]">{benefit.name}</span>
                        {benefit.id === 'erholung' && (
                          <div className="group relative cursor-help">
                            <Info size={16} className="text-[#0F429F]" />
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#273A5F] text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                              Jahresbudget — nicht Monatsbudget (max. 156€/Jahr)
                            </div>
                          </div>
                        )}
                        {benefit.id === 'danke-bonus' && (
                          <div className="group relative cursor-help">
                            <Info size={16} className="text-[#F57C00]" />
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#273A5F] text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                              Jahresbudget — wird einmalig/variabel vergeben
                            </div>
                          </div>
                        )}
                        {benefit.id === 'geburtstag' && (
                          <div className="group relative cursor-help">
                            <Info size={16} className="text-[#F57C00]" />
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#273A5F] text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                              Jahresbudget — einmal jährlich zum Geburtstag
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={benefitLimits[benefit.id]?.daily || ''}
                            onChange={(e) => updateBenefitLimit(benefit.id, 'daily', e.target.value)}
                            disabled={loadingState || !activeBenefits.has(benefit.id)}
                            placeholder="-" className="w-20 px-2 py-1.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none disabled:bg-[#F5F5F5] disabled:cursor-not-allowed transition"
                            style={{ borderRadius: '4px' }}
                          />
                          <span className="text-sm text-[#000000]">€</span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={benefitLimits[benefit.id]?.monthly || ''}
                            onChange={(e) => updateBenefitLimit(benefit.id, 'monthly', e.target.value)}
                            disabled={loadingState || !activeBenefits.has(benefit.id)}
                            placeholder="-" className="w-20 px-2 py-1.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none disabled:bg-[#F5F5F5] disabled:cursor-not-allowed transition"
                            style={{ borderRadius: '4px' }}
                          />
                          <span className="text-sm text-[#000000]">€</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="bg-[#F0F4FF] border border-[#E0E0E0] rounded-lg p-4 mt-6">
            <p className="text-[#666666] text-[12px]">
              <strong>Hinweis:</strong> Änderungen gelten ab 1. des nächsten Monats für alle Mitarbeiter dieses Standorts. Benefits mit <strong>Jahresbudget</strong> (Erholung, Geburtstag, Danke-Bonus) werden einmal jährlich abgerechnet — das eingetragene Budget gilt pro Jahr, nicht pro Monat.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          {isEditMode && (
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={loadingState} className="px-6 py-3 border border-[#F44336] text-[#F44336] text-[14px] rounded hover:bg-[#FFEBEE] transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: '4px' }}
            >
              Löschen
            </button>
          )}
          <div className={`flex gap-4 ${!isEditMode ? 'ml-auto' : ''}`}>
            <button
              onClick={goBack}
              disabled={loadingState} className="px-6 py-3 border border-[#E0E0E0] text-[#666666] text-[14px] rounded hover:bg-[#F5F5F5] transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: '4px' }}
            >
              Abbrechen
            </button>
            <button
              onClick={handleSave}
              disabled={loadingState} className="px-6 py-3 bg-[#4CAF50] text-white text-[14px] rounded hover:bg-[#45A049] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: '4px' }}
            >
              {loadingState && <Loader2 size={16} className="animate-spin" />}
              {isEditMode ? 'Speichern' : 'Standort erstellen'}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <span className="text-[48px]">⚠️</span>
            </div>

            <h3 className="text-[#273A5F] text-[18px] mb-3 text-center">Standort löschen?</h3>

            <p className="text-[#333333] text-[14px] mb-4 text-center">
              Möchtest du "{masterData.locationName}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht
              werden.
            </p>

            <div className="bg-[#FFEBEE] border border-[#F44336] rounded p-3 mb-6 flex items-start gap-2">
              <span className="text-[16px]">⚠️</span>
              <p className="text-[#F44336] text-[12px]">
                Mitarbeiter an diesem Standort verlieren Zugriff auf zugeordnete Benefits
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowDeleteModal(false)} className="px-6 py-3 border border-[#E0E0E0] text-[#666666] rounded hover:bg-[#F5F5F5] transition"
                style={{ borderRadius: '4px' }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleDelete} className="px-6 py-3 bg-[#F44336] text-white rounded hover:bg-[#D32F2F] transition"
                style={{ borderRadius: '4px' }}
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
