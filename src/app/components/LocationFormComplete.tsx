import { useState } from 'react';
import { ArrowLeft, AlertCircle, Loader2, Plus, Trash2, X } from 'lucide-react';

type LocationFormCompleteProps = {
  mode?: 'Create' | 'Edit';
  locationId?: string;
};

type Product = {
  id: string;
  name: string;
  icon: string;
  color: string;
  selected: boolean;
  dailyLimit: string;
  monthlyLimit: string;
};

type YearlyProduct = {
  id: string;
  name: string;
  icon: string;
  color: string;
  selected: boolean;
  yearlyLimits: {
    '2024': string;
    '2025': string;
    '2026': string;
    '2027': string;
  };
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

export function LocationFormComplete({ mode = 'Create', locationId }: LocationFormCompleteProps) {
  const isEditMode = mode === 'Edit' || !!locationId;

  const [hasErrors, setHasErrors] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Master Data
  const [masterData, setMasterData] = useState({
    locationName: isEditMode ? 'München' : '',
    company: isEditMode ? 'Cassianiel Software' : '',
    taxIdentificationNumber: isEditMode ? 'DE123456789' : '',
  });

  // Address
  const [addressData, setAddressData] = useState({
    address: isEditMode ? 'Fürstenrieder Straße 279A, 81377 München' : '',
    street: isEditMode ? 'Fürstenrieder Straße 279A' : '',
    city: isEditMode ? 'München' : '',
    state: isEditMode ? 'Bayern' : '',
    zipCode: isEditMode ? '81377' : '',
    country: isEditMode ? 'Deutschland' : 'Deutschland',
  });

  // Contact Data
  const [contactData, setContactData] = useState({
    phone: isEditMode ? '+49 241 5850001' : '',
    fax: isEditMode ? '+49 241 5850079' : '',
  });

  // Location Type
  const [locationType, setLocationType] = useState<'Standort' | 'Tochterunternehmen'>(
    isEditMode ? 'Standort' : 'Standort'
  );

  // Products with Daily/Monthly Limits
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Mittagessen', icon: '🍽️', color: '#F4B860', selected: isEditMode, dailyLimit: '60', monthlyLimit: '600' },
    { id: '2', name: 'Internet', icon: '📡', color: '#4CAF50', selected: isEditMode, dailyLimit: '50', monthlyLimit: '500' },
    { id: '3', name: 'Kindergartenzuschuss', icon: '👶', color: '#FF6B6B', selected: isEditMode, dailyLimit: '800', monthlyLimit: '800' },
    { id: '4', name: 'ÖPNV', icon: '🚌', color: '#2196F3', selected: isEditMode, dailyLimit: '63', monthlyLimit: '630' },
    { id: '5', name: 'Sachbezug', icon: '🎁', color: '#E91E63', selected: isEditMode, dailyLimit: '50', monthlyLimit: '500' },
  ]);

  // Products with Yearly Limits
  const [yearlyProducts, setYearlyProducts] = useState<YearlyProduct[]>([
    {
      id: '1',
      name: 'Danke-Bonus',
      icon: '🙏',
      color: '#4CAF50',
      selected: isEditMode,
      yearlyLimits: { '2024': '10000', '2025': '10000', '2026': '10000', '2027': '10000' },
    },
    {
      id: '2',
      name: 'Erholung',
      icon: '🏖️',
      color: '#2196F3',
      selected: isEditMode,
      yearlyLimits: { '2024': '2000', '2025': '2000', '2026': '2000', '2027': '2000' },
    },
  ]);

  const handleMasterDataChange = (field: string, value: string) => {
    setMasterData({ ...masterData, [field]: value });
  };

  const handleAddressChange = (field: string, value: string) => {
    setAddressData({ ...addressData, [field]: value });
  };

  const handleContactChange = (field: string, value: string) => {
    setContactData({ ...contactData, [field]: value });
  };

  const toggleProduct = (id: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)));
  };

  const updateProductLimit = (id: string, field: 'dailyLimit' | 'monthlyLimit', value: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const toggleYearlyProduct = (id: string) => {
    setYearlyProducts(yearlyProducts.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)));
  };

  const updateYearlyProductLimit = (id: string, year: string, value: string) => {
    setYearlyProducts(
      yearlyProducts.map((p) => (p.id === id ? { ...p, yearlyLimits: { ...p.yearlyLimits, [year]: value } } : p))
    );
  };

  const removeYearlyProduct = (id: string) => {
    setYearlyProducts(yearlyProducts.filter((p) => p.id !== id));
  };

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
        <button onClick={goBack} className="text-[#0F429F] text-[13px] mb-4 hover:underline flex items-center gap-2">
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
            <p className="text-[#D32F2F] text-[13px]">Bitte versuchen Sie es später erneut.</p>
          </div>
          <button onClick={() => setHasErrors(false)} className="text-[#D32F2F]">
            <X size={20} />
          </button>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto p-8 space-y-6">
        {/* SECTION A: Standort-Stammdaten */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-6">Standort-Stammdaten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location Name */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Standortname <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <input
                type="text"
                value={masterData.locationName}
                onChange={(e) => handleMasterDataChange('locationName', e.target.value)}
                placeholder="z.B. Heidelsheim, München, etc."
                disabled={loadingState}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            {/* Company */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Unternehmen <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <select
                value={masterData.company}
                onChange={(e) => handleMasterDataChange('company', e.target.value)}
                disabled={loadingState}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
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

            {/* Tax Identification Number */}
            <div className="md:col-span-2">
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Steuernummer / VAT ID</span>
              </label>
              <input
                type="text"
                value={masterData.taxIdentificationNumber}
                onChange={(e) => handleMasterDataChange('taxIdentificationNumber', e.target.value)}
                placeholder="z.B. DE123456789"
                disabled={loadingState}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>
          </div>
        </div>

        {/* SECTION B: Adresse */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-6">Adresse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address */}
            <div className="md:col-span-2">
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Adresse <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <input
                type="text"
                value={addressData.address}
                onChange={(e) => handleAddressChange('address', e.target.value)}
                placeholder="Vollständige Adresse mit Straße, Hausnummer und Ort"
                disabled={loadingState}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            {/* Street */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Straße <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <input
                type="text"
                value={addressData.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                placeholder="z.B. Fürstenrieder Straße 279A"
                disabled={loadingState}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            {/* City */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Stadt <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <input
                type="text"
                value={addressData.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                placeholder="z.B. München"
                disabled={loadingState}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            {/* State */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Bundesland <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <select
                value={addressData.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                disabled={loadingState}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
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

            {/* Zip Code */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  PLZ <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <input
                type="text"
                value={addressData.zipCode}
                onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                placeholder="z.B. 81377"
                disabled={loadingState}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            {/* Country */}
            <div className="md:col-span-2">
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Land <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <select
                value={addressData.country}
                onChange={(e) => handleAddressChange('country', e.target.value)}
                disabled={loadingState}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
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
            {/* Phone */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Telefon</span>
              </label>
              <input
                type="tel"
                value={contactData.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                placeholder="z.B. +49 241 5850001"
                disabled={loadingState}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px', padding: '10px 12px' }}
              />
            </div>

            {/* Fax */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Fax</span>
              </label>
              <input
                type="tel"
                value={contactData.fax}
                onChange={(e) => handleContactChange('fax', e.target.value)}
                placeholder="z.B. +49 241 5850079"
                disabled={loadingState}
                className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
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
                  disabled={loadingState}
                  className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                />
                {locationType === 'Standort' && (
                  <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                )}
              </div>
              <span className="text-[13px] text-black">Standort</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="locationType"
                  value="Tochterunternehmen"
                  checked={locationType === 'Tochterunternehmen'}
                  onChange={(e) => setLocationType(e.target.value as 'Standort' | 'Tochterunternehmen')}
                  disabled={loadingState}
                  className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                />
                {locationType === 'Tochterunternehmen' && (
                  <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                )}
              </div>
              <span className="text-[13px] text-black">Tochterunternehmen</span>
            </label>
          </div>
        </div>

        {/* SECTION E: Zugeordnete Benefits */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-2">Zugeordnete Benefits</h2>
          <p className="text-[#666666] text-[12px] mb-6">
            Benefits mit täglichen und monatlichen Limits für diesen Standort.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-[#E0E0E0]">
              <thead>
                <tr className="bg-[#F5F5F5]">
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0] w-12"></th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0] w-12"></th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">Produkt</th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">Tageslimit</th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">Monatslimit</th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0] w-12"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'} hover:bg-[#E3F2FD] transition-colors`}
                    style={{ height: '48px' }}
                  >
                    <td className="px-3 py-3 border-b border-[#E0E0E0]">
                      <input
                        type="checkbox"
                        checked={product.selected}
                        onChange={() => toggleProduct(product.id)}
                        disabled={loadingState}
                        className="w-4 h-4 disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="px-3 py-3 border-b border-[#E0E0E0]">
                      <span className="text-[24px]">{product.icon}</span>
                    </td>
                    <td className="px-3 py-3 text-[13px] text-black border-b border-[#E0E0E0]">{product.name}</td>
                    <td className="px-3 py-3 border-b border-[#E0E0E0]">
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={product.dailyLimit}
                          onChange={(e) => updateProductLimit(product.id, 'dailyLimit', e.target.value)}
                          disabled={loadingState || !product.selected}
                          className="w-20 px-2 py-1.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                          style={{ borderRadius: '4px', padding: '8px' }}
                        />
                        <span className="text-[13px] text-[#666666]">€</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 border-b border-[#E0E0E0]">
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={product.monthlyLimit}
                          onChange={(e) => updateProductLimit(product.id, 'monthlyLimit', e.target.value)}
                          disabled={loadingState || !product.selected}
                          className="w-20 px-2 py-1.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                          style={{ borderRadius: '4px', padding: '8px' }}
                        />
                        <span className="text-[13px] text-[#666666]">€</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 border-b border-[#E0E0E0]">
                      <button
                        onClick={() => removeProduct(product.id)}
                        disabled={loadingState}
                        className="text-[#E53935] hover:text-[#C62828] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => alert('Produkt hinzufügen')}
            disabled={loadingState}
            className="mt-4 flex items-center gap-2 text-[#0F429F] text-[13px] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Produkt hinzufügen
          </button>
        </div>

        {/* SECTION F: Jahres-Limit Benefits */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-2">Benefits mit Jahres-Limits</h2>
          <p className="text-[#666666] text-[12px] mb-6">
            Benefits mit Limits die pro Jahr unterschiedlich sein können.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-[#E0E0E0]">
              <thead>
                <tr className="bg-[#F5F5F5]">
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0] w-12"></th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0] w-12"></th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">Produkt</th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">2024</th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">2025</th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">2026</th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">2027</th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0] w-12"></th>
                </tr>
              </thead>
              <tbody>
                {yearlyProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'} hover:bg-[#E3F2FD] transition-colors`}
                    style={{ height: '48px' }}
                  >
                    <td className="px-3 py-3 border-b border-[#E0E0E0]">
                      <input
                        type="checkbox"
                        checked={product.selected}
                        onChange={() => toggleYearlyProduct(product.id)}
                        disabled={loadingState}
                        className="w-4 h-4 disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="px-3 py-3 border-b border-[#E0E0E0]">
                      <span className="text-[24px]">{product.icon}</span>
                    </td>
                    <td className="px-3 py-3 text-[13px] text-black border-b border-[#E0E0E0]">{product.name}</td>
                    {['2024', '2025', '2026', '2027'].map((year) => (
                      <td key={year} className="px-3 py-3 border-b border-[#E0E0E0]">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={product.yearlyLimits[year as keyof typeof product.yearlyLimits]}
                            onChange={(e) => updateYearlyProductLimit(product.id, year, e.target.value)}
                            disabled={loadingState || !product.selected}
                            className="w-24 px-2 py-1.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                            style={{ borderRadius: '4px', padding: '8px' }}
                          />
                          <span className="text-[13px] text-[#666666]">€</span>
                        </div>
                      </td>
                    ))}
                    <td className="px-3 py-3 border-b border-[#E0E0E0]">
                      <button
                        onClick={() => removeYearlyProduct(product.id)}
                        disabled={loadingState}
                        className="text-[#E53935] hover:text-[#C62828] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => alert('Produkt hinzufügen')}
            disabled={loadingState}
            className="mt-4 flex items-center gap-2 text-[#0F429F] text-[13px] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Produkt hinzufügen
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          {isEditMode && (
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={loadingState}
              className="px-6 py-3 border border-[#F44336] text-[#F44336] text-[14px] rounded hover:bg-[#FFEBEE] transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: '4px' }}
            >
              Löschen
            </button>
          )}
          <div className={`flex gap-4 ${!isEditMode ? 'ml-auto' : ''}`}>
            <button
              onClick={goBack}
              disabled={loadingState}
              className="px-6 py-3 border border-[#E0E0E0] text-[#666666] text-[14px] rounded hover:bg-[#F5F5F5] transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ borderRadius: '4px' }}
            >
              Abbrechen
            </button>
            <button
              onClick={handleSave}
              disabled={loadingState}
              className="px-6 py-3 bg-[#4CAF50] text-white text-[14px] rounded hover:bg-[#45A049] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-3 border border-[#E0E0E0] text-[#666666] rounded hover:bg-[#F5F5F5] transition"
                style={{ borderRadius: '4px' }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-[#F44336] text-white rounded hover:bg-[#D32F2F] transition"
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
