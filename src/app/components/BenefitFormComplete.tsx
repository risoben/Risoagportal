import { useState } from 'react';
import { ArrowLeft, AlertCircle, Loader2, Upload, X } from 'lucide-react';

type BenefitFormCompleteProps = {
  mode?: 'Create' | 'Edit';
  benefitId?: string;
};

type YearlyLimit = {
  year: string;
  dailyLimit: string;
  monthlyLimit: string;
  standardAmount: string;
};

type Location = {
  id: string;
  name: string;
  limit: string;
  employeeCount: number;
  enabled: boolean;
};

export function BenefitFormComplete({ mode = 'Create', benefitId }: BenefitFormCompleteProps) {
  const isEditMode = mode === 'Edit' || !!benefitId;

  const [hasErrors, setHasErrors] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [limitValue, setLimitValue] = useState('');

  // Basic Info
  const [basicInfo, setBasicInfo] = useState({
    name: isEditMode ? 'Mittagessen' : '',
    description: isEditMode ? 'Das Mittagessen ermöglicht Mitarbeitern die Nutzung von Essensgutscheinen oder direkten Mitarbeiterverpflegung.' : '',
    frequencyType: isEditMode ? 'Monthly' : '',
    categoryType: isEditMode ? 'Cash' : '',
    status: isEditMode ? 'Active' : 'Active',
  });

  // Configuration
  const [config, setConfig] = useState({
    taxLiable: false,
    differentTimesPerYear: isEditMode,
    color: isEditMode ? '#F4B860' : '#2196F3',
    imageFile: null as File | null,
    imagePreview: '',
  });

  // Yearly Limits (2019-2027)
  const [yearlyLimits, setYearlyLimits] = useState<YearlyLimit[]>(
    Array.from({ length: 9 }, (_, i) => ({
      year: String(2019 + i),
      dailyLimit: isEditMode && i === 5 ? '7.00' : '',
      monthlyLimit: isEditMode && i === 5 ? '150.00' : '',
      standardAmount: isEditMode && i === 5 ? '1800.00' : '',
    }))
  );

  // Locations
  const [locations, setLocations] = useState<Location[]>([
    { id: '1', name: 'München', limit: '10€/Monat', employeeCount: 34, enabled: isEditMode },
    { id: '2', name: 'Heidelsheim', limit: '10€/Monat', employeeCount: 15, enabled: isEditMode },
    { id: '3', name: 'Berlin', limit: '8€/Monat', employeeCount: 8, enabled: isEditMode },
    { id: '4', name: 'Varnheim', limit: '10€/Monat', employeeCount: 5, enabled: false },
  ]);

  // Usage Statistics
  const stats = {
    employeesWithAccess: 62,
    budgetThisMonth: 4200,
    usedThisMonth: 3100,
  };

  const handleBasicInfoChange = (field: string, value: string) => {
    setBasicInfo({ ...basicInfo, [field]: value });
  };

  const handleConfigChange = (field: string, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setConfig({ ...config, imageFile: file, imagePreview: URL.createObjectURL(file) });
    }
  };

  const removeImage = () => {
    setConfig({ ...config, imageFile: null, imagePreview: '' });
  };

  const handleYearlyLimitChange = (year: string, field: keyof Omit<YearlyLimit, 'year'>, value: string) => {
    setYearlyLimits(yearlyLimits.map((limit) => (limit.year === year ? { ...limit, [field]: value } : limit)));
  };

  const handleEditLimit = (location: Location) => {
    setEditingLocation(location);
    setLimitValue(location.limit.replace('€/Monat', '').trim());
    setShowLimitModal(true);
  };

  const handleSaveLimit = () => {
    if (editingLocation) {
      setLocations(locations.map((loc) => (loc.id === editingLocation.id ? { ...loc, limit: `${limitValue}€/Monat` } : loc)));
    }
    setShowLimitModal(false);
    setEditingLocation(null);
    setLimitValue('');
  };

  const toggleLocation = (locationId: string) => {
    setLocations(locations.map((loc) => (loc.id === locationId ? { ...loc, enabled: !loc.enabled } : loc)));
  };

  const handleSave = () => {
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false);
      alert(isEditMode ? 'Benefit wurde aktualisiert!' : 'Benefit wurde erstellt!');
      goBack();
    }, 1000);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    alert('Benefit wurde gelöscht!');
    goBack();
  };

  const goBack = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));
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
          {isEditMode ? basicInfo.name || 'Benefit bearbeiten' : 'Neuen Benefit erstellen'}
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

      <div className="w-full p-8 space-y-6">
        {/* SECTION A: Basic Info */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-6">Grundinformationen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Name <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <input
                type="text"
                value={basicInfo.name}
                onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                placeholder="z.B. Mittagessen"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              />
            </div>

            {/* Frequency Type */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Häufigkeit <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <select
                value={basicInfo.frequencyType}
                onChange={(e) => handleBasicInfoChange('frequencyType', e.target.value)}
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              >
                <option value="">Bitte auswählen</option>
                <option value="Daily">Täglich</option>
                <option value="Weekly">Wöchentlich</option>
                <option value="Monthly">Monatlich</option>
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Beschreibung <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <textarea
                value={basicInfo.description}
                onChange={(e) => handleBasicInfoChange('description', e.target.value)}
                placeholder="Beschreibung der Leistung..."
                rows={4}
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed resize-none"
                style={{ borderRadius: '4px' }}
              />
            </div>

            {/* Category Type */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Kategorie <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <select
                value={basicInfo.categoryType}
                onChange={(e) => handleBasicInfoChange('categoryType', e.target.value)}
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              >
                <option value="">Bitte auswählen</option>
                <option value="Cash">Bargeld</option>
                <option value="Benefit">Sachleistung</option>
                <option value="Product">Produkt</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">
                  Status <span className="text-[#E53935]">*</span>
                </span>
              </label>
              <div className="flex items-center gap-3 h-[42px]">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={basicInfo.status === 'Active'}
                      onChange={(e) => handleBasicInfoChange('status', e.target.value)}
                      disabled={loadingState} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {basicInfo.status === 'Active' && (
                      <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                    )}
                  </div>
                  <span className="text-[13px] text-black">Aktiv</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={basicInfo.status === 'Inactive'}
                      onChange={(e) => handleBasicInfoChange('status', e.target.value)}
                      disabled={loadingState} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {basicInfo.status === 'Inactive' && (
                      <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                    )}
                  </div>
                  <span className="text-[13px] text-black">Inaktiv</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION B: Configuration */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-6">Konfiguration</h2>

          {/* Tax Liable Toggle */}
          <div className="mb-6 pb-6 border-b border-[#E0E0E0]">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="text-[13px] text-black font-medium">Steuerpflichtige Leistung</label>
                <p className="text-[12px] text-[#666666] mt-1">
                  Aktivieren wenn diese Leistung besteuert werden muss
                </p>
              </div>
              <button
                onClick={() => handleConfigChange('taxLiable', !config.taxLiable)}
                disabled={loadingState} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  config.taxLiable ? 'bg-[#4CAF50]' : 'bg-[#9E9E9E]'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.taxLiable ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Different Times Per Year Toggle */}
          <div className="mb-6 pb-6 border-b border-[#E0E0E0]">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <label className="text-[13px] text-black font-medium">Unterschiedliche Budgets pro Jahr</label>
                <p className="text-[12px] text-[#666666] mt-1">
                  Aktivieren um unterschiedliche Budgets für verschiedene Jahre zu setzen
                </p>
              </div>
              <button
                onClick={() => handleConfigChange('differentTimesPerYear', !config.differentTimesPerYear)}
                disabled={loadingState} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  config.differentTimesPerYear ? 'bg-[#4CAF50]' : 'bg-[#9E9E9E]'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.differentTimesPerYear ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Color Picker */}
          <div className="mb-6">
            <label className="block mb-2">
              <span className="text-[#666666] text-[13px]">
                Farbe <span className="text-[#E53935]">*</span>
              </span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={config.color}
                onChange={(e) => handleConfigChange('color', e.target.value)}
                disabled={loadingState} className="w-16 h-10 border border-[#E0E0E0] rounded cursor-pointer disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              />
              <input
                type="text"
                value={config.color}
                onChange={(e) => handleConfigChange('color', e.target.value)}
                placeholder="#2196F3"
                disabled={loadingState} className="w-32 px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2">
              <span className="text-[#666666] text-[13px]">
                Benefit Icon (SVG oder PNG) <span className="text-[#E53935]">*</span>
              </span>
            </label>
            {config.imagePreview ? (
              <div className="flex items-center gap-4">
                <img src={config.imagePreview} alt="Preview" className="w-16 h-16 object-contain border border-[#E0E0E0] rounded" />
                <button
                  onClick={removeImage}
                  disabled={loadingState} className="text-[#E53935] text-[13px] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Entfernen
                </button>
              </div>
            ) : (
              <label className="block w-full border-2 border-dashed border-[#E0E0E0] rounded p-8 text-center cursor-pointer hover:border-[#2196F3] transition">
                <Upload size={32} className="mx-auto mb-2 text-[#666666]" />
                <p className="text-[13px] text-[#666666]">Ziehe Datei herein oder klicke zum Auswählen</p>
                <input
                  type="file"
                  accept="image/svg+xml,image/png"
                  onChange={handleImageUpload}
                  disabled={loadingState} className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* SECTION C: Yearly Limits (Conditional) */}
        {config.differentTimesPerYear && (
          <div className="bg-white rounded border border-[#E0E0E0] p-6 animate-fadeIn">
            <h2 className="text-[#273A5F] text-[16px] mb-2">Budgets pro Jahr</h2>
            <p className="text-[#666666] text-[12px] mb-6">
              Definiere täglich, monatlich und standardmäßig verfügbare Budgets für jedes Jahr.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border border-[#E0E0E0]">
                <thead>
                  <tr className="bg-[#F5F5F5]">
                    <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">Jahr</th>
                    <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">Tagesbudget</th>
                    <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">Monatsbudget</th>
                    <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">Standard Betrag</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyLimits.map((limit, index) => (
                    <tr
                      key={limit.year} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'} hover:bg-[#E3F2FD] transition-colors`}
                      style={{ height: '48px' }}
                    >
                      <td className="px-3 py-2 text-[13px] text-[#666666] border-b border-[#E0E0E0]">{limit.year}</td>
                      <td className="px-3 py-2 border-b border-[#E0E0E0]">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={limit.dailyLimit}
                            onChange={(e) => handleYearlyLimitChange(limit.year, 'dailyLimit', e.target.value)}
                            disabled={loadingState}
                            placeholder="0.00" className="w-24 px-2 py-1.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                            style={{ borderRadius: '4px', padding: '8px' }}
                          />
                          <span className="text-[13px] text-[#666666]">€</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 border-b border-[#E0E0E0]">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={limit.monthlyLimit}
                            onChange={(e) => handleYearlyLimitChange(limit.year, 'monthlyLimit', e.target.value)}
                            disabled={loadingState}
                            placeholder="0.00" className="w-24 px-2 py-1.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                            style={{ borderRadius: '4px', padding: '8px' }}
                          />
                          <span className="text-[13px] text-[#666666]">€</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 border-b border-[#E0E0E0]">
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={limit.standardAmount}
                            onChange={(e) => handleYearlyLimitChange(limit.year, 'standardAmount', e.target.value)}
                            disabled={loadingState}
                            placeholder="0.00" className="w-24 px-2 py-1.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                            style={{ borderRadius: '4px', padding: '8px' }}
                          />
                          <span className="text-[13px] text-[#666666]">€</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION D: Location Limits */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-2">Budgets pro Standort</h2>
          <p className="text-[#666666] text-[12px] mb-6">
            Hier werden die Budgets für jeden Standort dargestellt. Um ein Budget zu ändern, klicke auf "Bearbeiten".
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-[#E0E0E0]">
              <thead>
                <tr className="bg-[#F5F5F5]">
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">Standort</th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">Budget</th>
                  <th className="px-3 py-2 text-left text-[13px] border-b border-[#E0E0E0]">Aktion</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, index) => (
                  <tr
                    key={location.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'} hover:bg-[#E3F2FD] transition-colors`}
                  >
                    <td className="px-3 py-3 text-[13px] text-black border-b border-[#E0E0E0]">{location.name}</td>
                    <td className="px-3 py-3 text-[13px] text-black border-b border-[#E0E0E0]">{location.limit}</td>
                    <td className="px-3 py-3 border-b border-[#E0E0E0]">
                      <button
                        onClick={() => handleEditLimit(location)}
                        disabled={loadingState} className="px-4 py-1.5 border border-[#0F429F] text-[#0F429F] text-[13px] rounded-full hover:bg-[#E3F2FD] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Bearbeiten
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION E: Available Locations */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-2">Verfügbar für diese Standorte</h2>
          <p className="text-[#666666] text-[12px] mb-6">
            Wähle aus, für welche Standorte diese Leistung verfügbar sein soll.
          </p>

          <div className="space-y-2">
            {locations.map((location) => (
              <label
                key={location.id} className="flex items-center gap-3 px-3 py-3 hover:bg-[#F0F4FF] rounded cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  checked={location.enabled}
                  onChange={() => toggleLocation(location.id)}
                  disabled={loadingState} className="w-[18px] h-[18px] border-2 border-[#0F429F] rounded text-[#0F429F] disabled:cursor-not-allowed"
                  style={{ accentColor: '#0F429F' }}
                />
                <span className="text-[13px] text-black">
                  {location.name} <span className="text-[#666666]">({location.employeeCount} Mitarbeiter)</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* SECTION F: Usage Statistics */}
        {isEditMode && (
          <div className="bg-white rounded border border-[#E0E0E0] p-6">
            <h2 className="text-[#273A5F] text-[16px] mb-6">Nutzungsstatistik</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#E3F2FD] rounded-lg p-6 text-center">
                <p className="text-[#273A5F] text-[24px]">{stats.employeesWithAccess}</p>
                <p className="text-[#666666] text-[12px] mt-2">Mitarbeiter im Zugriff</p>
              </div>

              <div className="bg-[#E8F5E9] rounded-lg p-6 text-center">
                <p className="text-[#4CAF50] text-[24px]">{stats.budgetThisMonth.toLocaleString('de-DE')}€</p>
                <p className="text-[#666666] text-[12px] mt-2">Budget diesen Monat</p>
              </div>

              <div className="bg-[#FFF3E0] rounded-lg p-6 text-center">
                <p className="text-[#FF9800] text-[24px]">{stats.usedThisMonth.toLocaleString('de-DE')}€</p>
                <p className="text-[#666666] text-[12px] mt-2">Genutzt diesen Monat</p>
              </div>
            </div>
          </div>
        )}

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
              Speichern
            </button>
          </div>
        </div>
      </div>

      {/* Budget bearbeiten Modal */}
      {showLimitModal && editingLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-[#273A5F] text-[18px] mb-4">
              Budget bearbeiten — {basicInfo.name} — {editingLocation.name}
            </h3>

            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-[#666666] text-[13px]">Budget pro Mitarbeiter</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={limitValue}
                  onChange={(e) => setLimitValue(e.target.value)}
                  placeholder="z.B. 100" className="flex-1 px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none"
                  style={{ borderRadius: '4px' }}
                />
                <span className="text-[13px] text-[#666666]">€/Monat</span>
              </div>
            </div>

            <p className="text-[12px] text-[#666666] mb-6">
              Änderung gilt ab 1. nächsten Monat für alle Mitarbeiter dieses Standorts
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowLimitModal(false);
                  setEditingLocation(null);
                  setLimitValue('');
                }} className="px-6 py-3 border border-[#E0E0E0] text-[#666666] rounded hover:bg-[#F5F5F5] transition"
                style={{ borderRadius: '4px' }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleSaveLimit} className="px-6 py-3 bg-[#4CAF50] text-white rounded hover:bg-[#45A049] transition"
                style={{ borderRadius: '4px' }}
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <span className="text-[48px]">⚠️</span>
            </div>

            <h3 className="text-[#273A5F] text-[18px] mb-3 text-center">Benefit löschen?</h3>

            <p className="text-[#333333] text-[14px] mb-4 text-center">
              Möchtest du "{basicInfo.name}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>

            <div className="bg-[#FFEBEE] border border-[#F44336] rounded p-3 mb-6 flex items-start gap-2">
              <span className="text-[16px]">⚠️</span>
              <p className="text-[#F44336] text-[12px]">
                Mitarbeiter verlieren ab 1. nächsten Monat Zugriff auf dieses Benefit
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
