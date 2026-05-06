import { useState } from 'react';

type FormData = {
  locationName: string;
  company: string;
  address: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  fax: string;
  type: 'Standort' | 'Tochterunternehmen' | '';
};

type FormErrors = {
  locationName?: string;
  company?: string;
  address?: string;
  type?: string;
};

const bundeslaender = [
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

const countries = ['Deutschland', 'Österreich', 'Schweiz'];

export function LocationCreate() {
  const [formData, setFormData] = useState<FormData>({
    locationName: '',
    company: '',
    address: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'Deutschland',
    phone: '',
    fax: '',
    type: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.locationName.trim()) {
      newErrors.locationName = 'Bitte geben Sie einen Namen ein';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Bitte geben Sie einen Firmennamen ein';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Bitte geben Sie eine Adresse ein';
    }

    if (!formData.type) {
      newErrors.type = 'Bitte wählen Sie einen Typ aus';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert('Standort wurde erfolgreich erstellt!');
      handleBack();
    }
  };

  const handleBack = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'locations' } }));
  };

  return (
    <div className="flex-1 bg-white overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="px-4 md:px-6 lg:px-8 py-6 border-b border-[#E8E8E8]">
        <button
          onClick={handleBack} className="text-[#246AFF] text-sm font-medium mb-4 hover:underline flex items-center gap-2"
        >
          ← Zurück zu Standorten
        </button>
        <h1 className="text-[#000000] font-bold text-[24px]">Neuen Standort erstellen</h1>
      </div>

      {/* Form */}
      <div className="px-4 md:px-6 lg:px-8 py-8">
        <div className="max-w-6xl">
          {/* Section 1: Location Stammdaten */}
          <div className="mb-8">
            <h2 className="text-[#000000] font-bold text-[18px] mb-6">Standort-Stammdaten</h2>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Name */}
              <div>
                <label className="block mb-2">
                  <span className="text-[#000000] font-medium text-[14px]">
                    Location Name <span className="text-[#E53935]">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.locationName}
                  onChange={(e) => handleChange('locationName', e.target.value)}
                  placeholder="z.B. Heddesheim, München, etc." className={`w-full px-3 py-3 border rounded text-[14px] transition ${
                    errors.locationName
                      ? 'border-[#E53935]'
                      : 'border-[#E0E0E0] focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33]'
                  }`}
                  style={{ borderRadius: '4px' }}
                />
                {errors.locationName && (
                  <p className="text-[#E53935] text-[12px] mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.locationName}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block mb-2">
                  <span className="text-[#000000] font-medium text-[14px]">
                    Company (Name) <span className="text-[#E53935]">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="z.B. Causaltel Software GmbH" className={`w-full px-3 py-3 border rounded text-[14px] transition ${
                    errors.company
                      ? 'border-[#E53935]'
                      : 'border-[#E0E0E0] focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33]'
                  }`}
                  style={{ borderRadius: '4px' }}
                />
                {errors.company && (
                  <p className="text-[#E53935] text-[12px] mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.company}
                  </p>
                )}
              </div>

              {/* Address (Full width) */}
              <div className="md:col-span-2">
                <label className="block mb-2">
                  <span className="text-[#000000] font-medium text-[14px]">
                    Adresse <span className="text-[#E53935]">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Vollständige Adresse mit Straße, Hausnummer und Ort" className={`w-full px-3 py-3 border rounded text-[14px] transition ${
                    errors.address
                      ? 'border-[#E53935]'
                      : 'border-[#E0E0E0] focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33]'
                  }`}
                  style={{ borderRadius: '4px' }}
                />
                {errors.address && (
                  <p className="text-[#E53935] text-[12px] mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.address}
                  </p>
                )}
              </div>

              {/* Street */}
              <div>
                <label className="block mb-2">
                  <span className="text-[#000000] font-medium text-[14px]">Straße (Street)</span>
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleChange('street', e.target.value)}
                  placeholder="z.B. Försterleide Straße 279A" className="w-full px-3 py-3 border border-[#E0E0E0] rounded text-[14px] focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33] transition"
                  style={{ borderRadius: '4px' }}
                />
              </div>

              {/* City */}
              <div>
                <label className="block mb-2">
                  <span className="text-[#000000] font-medium text-[14px]">Stadt / Ort (Place)</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="z.B. München" className="w-full px-3 py-3 border border-[#E0E0E0] rounded text-[14px] focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33] transition"
                  style={{ borderRadius: '4px' }}
                />
              </div>

              {/* State */}
              <div>
                <label className="block mb-2">
                  <span className="text-[#000000] font-medium text-[14px]">Bundesland / State</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)} className="w-full px-3 py-3 border border-[#E0E0E0] rounded text-[14px] focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33] transition"
                  style={{ borderRadius: '4px' }}
                >
                  <option value="">Bitte auswählen</option>
                  {bundeslaender.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* ZIP */}
              <div>
                <label className="block mb-2">
                  <span className="text-[#000000] font-medium text-[14px]">Postleitzahl (ZIP)</span>
                </label>
                <input
                  type="text"
                  value={formData.zip}
                  onChange={(e) => handleChange('zip', e.target.value)}
                  placeholder="z.B. 81377" className="w-full px-3 py-3 border border-[#E0E0E0] rounded text-[14px] focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33] transition"
                  style={{ borderRadius: '4px' }}
                />
              </div>

              {/* Country */}
              <div>
                <label className="block mb-2">
                  <span className="text-[#000000] font-medium text-[14px]">Land (Country)</span>
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)} className="w-full px-3 py-3 border border-[#E0E0E0] rounded text-[14px] focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33] transition"
                  style={{ borderRadius: '4px' }}
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2">
                  <span className="text-[#000000] font-medium text-[14px]">Telefon</span>
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="z.B. +49 241 5850001" className="w-full px-3 py-3 border border-[#E0E0E0] rounded text-[14px] focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33] transition"
                  style={{ borderRadius: '4px' }}
                />
              </div>

              {/* Fax */}
              <div>
                <label className="block mb-2">
                  <span className="text-[#000000] font-medium text-[14px]">Fax</span>
                </label>
                <input
                  type="text"
                  value={formData.fax}
                  onChange={(e) => handleChange('fax', e.target.value)}
                  placeholder="z.B. +49 241 5850079" className="w-full px-3 py-3 border border-[#E0E0E0] rounded text-[14px] focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33] transition"
                  style={{ borderRadius: '4px' }}
                />
              </div>

              {/* Type (Full width) */}
              <div className="md:col-span-2">
                <label className="block mb-3">
                  <span className="text-[#000000] font-medium text-[14px]">
                    Typ <span className="text-[#E53935]">*</span>
                  </span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="Standort"
                      checked={formData.type === 'Standort'}
                      onChange={(e) => handleChange('type', e.target.value)} className="w-4 h-4"
                    />
                    <span className="text-[#000000] text-[14px]">Standort</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="Tochterunternehmen"
                      checked={formData.type === 'Tochterunternehmen'}
                      onChange={(e) => handleChange('type', e.target.value)} className="w-4 h-4"
                    />
                    <span className="text-[#000000] text-[14px]">Tochterunternehmen</span>
                  </label>
                </div>
                {errors.type && (
                  <p className="text-[#E53935] text-[12px] mt-2 flex items-center gap-1">
                    <span>⚠️</span> {errors.type}
                  </p>
                )}
              </div>
            </div>

            {/* Required fields note */}
            <p className="text-[#666666] text-[12px] mt-6">
              <span className="text-[#E53935]">*</span> Erforderliche Felder
            </p>
          </div>

          {/* Bottom Buttons */}
          <div className="flex gap-4 pt-6 border-t border-[#E8E8E8]">
            <button
              onClick={handleSubmit} className="px-8 py-3 bg-[#4CAF50] text-white font-medium rounded-full hover:bg-[#45a049] transition"
              style={{ borderRadius: '24px' }}
            >
              Standort erstellen
            </button>
            <button
              onClick={handleBack} className="px-8 py-3 border-2 border-[#E0E0E0] text-[#666666] font-medium rounded-full hover:bg-gray-50 transition"
              style={{ borderRadius: '24px' }}
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
