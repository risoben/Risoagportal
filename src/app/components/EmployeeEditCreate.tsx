import { useState } from 'react';
import { AlertCircle, Loader2, Info, X, Check } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';

type EmployeeEditCreateProps = {
  editMode?: boolean;
  employeeId?: string;
};

type Benefit = {
  id: string;
  name: string;
  frequency: string;
  dailyLimit: string;
  monthlyLimit: string;
  selected: boolean;
  budgetType: 'dynamic' | 'fix';
};

const COMPANIES = ['Fine Cotton Company', 'Cassianiel Software'];
const LOCATIONS_MAP: Record<string, string[]> = {
  'Fine Cotton Company': ['München', 'Heidelsheim'],
  'Cassianiel Software': ['Cassianiel Office'],
};

export function EmployeeEditCreate({ editMode = false, employeeId }: EmployeeEditCreateProps) {
  const isEditMode = editMode || !!employeeId;

  const [hasErrors] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [infoModalBenefit, setInfoModalBenefit] = useState<Benefit | null>(null);

  // Personal Data
  const [personalData, setPersonalData] = useState({
    email: isEditMode ? 'max@example.com' : '',
    password: '',
    name: isEditMode ? 'Max' : '',
    surname: isEditMode ? 'Mustermann' : '',
    gender: isEditMode ? 'Keine Angabe' : 'Keine Angabe',
    dateOfBirth: isEditMode ? '1990-05-15' : '',
    phone: isEditMode ? '+49 123 456789' : '',
    employeeNo: isEditMode ? 'EMP-12345' : '',
  });

  // Company Assignment
  const [companyData, setCompanyData] = useState({
    company: isEditMode ? 'Fine Cotton Company' : '',
    location: isEditMode ? 'München' : '',
    department: isEditMode ? 'IT' : '',
    status: isEditMode ? 'Active' : 'Active',
    startDate: isEditMode ? '2024-01-01' : '',
    endDate: 'unbefristet',
  });

  // Family Situation
  const [familyData, setFamilyData] = useState({
    maritalStatus: isEditMode ? 'Single' : '',
    numberOfChildren: isEditMode ? '0' : '0',
  });

  const benefitCategories: Record<string, string> = {
    'Essenszuschuss': 'Cash-Benefits', 'Internet': 'Cash-Benefits', 'Kindergarten': 'Cash-Benefits',
    'Fahrkostenzuschuss': 'Cash-Benefits', 'Erholung': 'Cash-Benefits', 'Danke-Bonus': 'Cash-Benefits', 'ÖPNV': 'Cash-Benefits',
    'Sachbezug': 'Gutschein-Benefits', 'Geburtstag': 'Gutschein-Benefits',
    'BKV': 'Versicherungs-Benefits', 'BAV': 'Versicherungs-Benefits',
  };

  // Benefits
  const [benefits, setBenefits] = useState<Benefit[]>([
    { id: '1', name: 'Essenszuschuss', frequency: 'Täglich', dailyLimit: '7.00', monthlyLimit: '115.05', selected: isEditMode, budgetType: 'dynamic' },
    { id: '2', name: 'Internet', frequency: 'Monatlich', dailyLimit: '50.00', monthlyLimit: '50.00', selected: isEditMode, budgetType: 'dynamic' },
    { id: '3', name: 'Kindergarten', frequency: 'Monatlich', dailyLimit: '', monthlyLimit: '100.00', selected: false, budgetType: 'dynamic' },
    { id: '4', name: 'Fahrkostenzuschuss', frequency: 'Monatlich', dailyLimit: '', monthlyLimit: '80.00', selected: false, budgetType: 'dynamic' },
    { id: '5', name: 'Erholung', frequency: 'Jährlich', dailyLimit: '', monthlyLimit: '156.00', selected: false, budgetType: 'dynamic' },
    { id: '6', name: 'Sachbezug', frequency: 'Monatlich', dailyLimit: '', monthlyLimit: '50.00', selected: false, budgetType: 'dynamic' },
    { id: '7', name: 'Danke-Bonus', frequency: 'Einmalig', dailyLimit: '', monthlyLimit: '100.00', selected: false, budgetType: 'dynamic' },
    { id: '8', name: 'Geburtstag', frequency: 'Jährlich', dailyLimit: '', monthlyLimit: '50.00', selected: false, budgetType: 'dynamic' },
    { id: '9', name: 'ÖPNV', frequency: 'Monatlich', dailyLimit: '63.00', monthlyLimit: '63.00', selected: isEditMode, budgetType: 'dynamic' },
    { id: '10', name: 'BKV', frequency: 'Monatlich', dailyLimit: '', monthlyLimit: '80.00', selected: false, budgetType: 'dynamic' },
    { id: '11', name: 'BAV', frequency: 'Monatlich', dailyLimit: '', monthlyLimit: '150.00', selected: false, budgetType: 'dynamic' },
  ]);

  const [showFixModal, setShowFixModal] = useState(false);
  const [fixModalBenefitId, setFixModalBenefitId] = useState<string | null>(null);
  const [fixModalValue, setFixModalValue] = useState('');
  const [fixModalError, setFixModalError] = useState('');

  const availableLocations = companyData.company ? LOCATIONS_MAP[companyData.company] || [] : [];

  const handlePersonalChange = (field: string, value: string) => {
    setPersonalData({ ...personalData, [field]: value });
  };

  const handleCompanyChange = (field: string, value: string) => {
    if (field === 'company') {
      setCompanyData({ ...companyData, [field]: value, location: '' });
    } else {
      setCompanyData({ ...companyData, [field]: value });
    }
  };

  const handleFamilyChange = (field: string, value: string) => {
    setFamilyData({ ...familyData, [field]: value });
  };

  const toggleBenefit = (id: string) => {
    setBenefits(benefits.map(b => b.id === id ? { ...b, selected: !b.selected } : b));
  };

  const updateBenefitLimit = (id: string, field: 'dailyLimit' | 'monthlyLimit', value: string) => {
    setBenefits(benefits.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const ESSEN_DAILY_RATE = 7.67;
  const isEssenBenefit = (name: string) => name === 'Essenszuschuss' || name.toLowerCase().includes('essen');

  const [showDynamicModal, setShowDynamicModal] = useState(false);
  const [dynamicModalBenefitId, setDynamicModalBenefitId] = useState<string | null>(null);
  const [dynamicWorkingDays, setDynamicWorkingDays] = useState(15);
  const [dynamicModalError, setDynamicModalError] = useState('');

  const handleToggleBudgetType = (id: string, type: 'dynamic' | 'fix') => {
    if (type === 'dynamic') {
      setDynamicModalBenefitId(id);
      setDynamicWorkingDays(15);
      setDynamicModalError('');
      setShowDynamicModal(true);
    } else {
      const benefit = benefits.find(b => b.id === id);
      setFixModalBenefitId(id);
      setFixModalValue(benefit?.monthlyLimit || '');
      setFixModalError('');
      setShowFixModal(true);
    }
  };

  const handleSaveDynamicModal = () => {
    if (dynamicWorkingDays < 1 || dynamicWorkingDays > 15) {
      setDynamicModalError('Arbeitstage müssen zwischen 1 und 15 liegen');
      return;
    }
    const monthly = Math.round(dynamicWorkingDays * ESSEN_DAILY_RATE * 100) / 100;
    if (dynamicModalBenefitId) {
      setBenefits(benefits.map(b =>
        b.id === dynamicModalBenefitId ? { ...b, budgetType: 'dynamic', monthlyLimit: String(monthly) } : b
      ));
    }
    setShowDynamicModal(false);
    setDynamicModalBenefitId(null);
  };

  const handleSaveFixModal = () => {
    if (!fixModalValue.trim()) { setFixModalError('Feld erforderlich'); return; }
    const num = parseFloat(fixModalValue.replace(',', '.'));
    if (isNaN(num) || num < 0) { setFixModalError('Ungültiger Betrag'); return; }
    if (fixModalBenefitId) {
      setBenefits(benefits.map(b =>
        b.id === fixModalBenefitId ? { ...b, budgetType: 'fix', monthlyLimit: String(num) } : b
      ));
    }
    setShowFixModal(false);
    setFixModalBenefitId(null);
    setFixModalValue('');
  };

  const handleSave = () => {
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false);
      alert(isEditMode ? 'Mitarbeiter wurde aktualisiert!' : 'Mitarbeiter wurde erstellt!');
      handleBack();
    }, 1000);
  };

  const handleBack = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'mitarbeiter' } }));
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white px-8 py-6 border-b border-[#E0E0E0]">
        <button
          onClick={handleBack} className="text-[#0F429F] text-[13px] mb-4 hover:underline flex items-center gap-2"
        >
          ← Zurück zur Übersicht
        </button>
        <h1 className="text-[#273A5F] text-[24px]">
          {isEditMode ? 'Mitarbeiter bearbeiten' : 'Neuen Mitarbeiter anlegen'}
        </h1>
      </div>

      {/* Error Banner */}
      {hasErrors && (
        <div className="mx-8 mt-6 p-4 bg-[#FFEBEE] border border-[#F44336] rounded flex items-start gap-3">
          <AlertCircle className="text-[#F44336] mt-0.5" size={20} />
          <div>
            <p className="text-[#D32F2F] font-medium text-[14px]">Fehler beim Speichern</p>
            <p className="text-[#D32F2F] text-[13px]">Bitte überprüfe die markierten Felder.</p>
          </div>
        </div>
      )}

      <div className="w-full p-8 space-y-6">
        {/* SECTION A: Personal Data */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-6">Persönliche Daten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Email <span className="text-[#E53935]">*</span></span>
              </label>
              <input
                type="email"
                value={personalData.email}
                onChange={(e) => handlePersonalChange('email', e.target.value)}
                placeholder="max@example.com"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              />
            </div>

            {/* Password Reset Button */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Passwort</span>
              </label>
              <button
                type="button" className="w-full px-3 py-2.5 border border-[#0F429F] bg-white text-[#0F429F] rounded text-[13px] font-medium hover:bg-[#F0F4FF] transition"
              >
                Passwort-Reset-E-Mail senden
              </button>
            </div>

            {/* Name */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Vorname <span className="text-[#E53935]">*</span></span>
              </label>
              <input
                type="text"
                value={personalData.name}
                onChange={(e) => handlePersonalChange('name', e.target.value)}
                placeholder="Vorname"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              />
            </div>

            {/* Surname */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Nachname <span className="text-[#E53935]">*</span></span>
              </label>
              <input
                type="text"
                value={personalData.surname}
                onChange={(e) => handlePersonalChange('surname', e.target.value)}
                placeholder="Nachname"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              />
            </div>

            {/* Gender */}
            <div className="col-span-2">
              <label className="block mb-2">
                <span className="text-[#666666] text-[13px]">Geschlecht <span className="text-[#E53935]">*</span></span>
              </label>
              <div className="flex gap-4 flex-wrap">
                {['Männlich', 'Weiblich', 'Divers', 'Keine Angabe'].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={personalData.gender === option}
                        onChange={(e) => handlePersonalChange('gender', e.target.value)}
                        disabled={loadingState} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {personalData.gender === option && (
                        <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                      )}
                    </div>
                    <span className="text-[13px] text-black">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Geburtsdatum <span className="text-[#E53935]">*</span></span>
              </label>
              <input
                type="date"
                value={personalData.dateOfBirth}
                onChange={(e) => handlePersonalChange('dateOfBirth', e.target.value)}
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Telefon</span>
              </label>
              <input
                type="tel"
                value={personalData.phone}
                onChange={(e) => handlePersonalChange('phone', e.target.value)}
                placeholder="+49 xxx..."
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              />
            </div>

            {/* Employee No */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Mitarbeiternummer <span className="text-[#E53935]">*</span></span>
              </label>
              <input
                type="text"
                value={personalData.employeeNo}
                onChange={(e) => handlePersonalChange('employeeNo', e.target.value)}
                placeholder="z.B. EMP-12345"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              />
            </div>
          </div>
        </div>

        {/* SECTION B: Company Assignment */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-6">Unternehmens-Zuordnung</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Unternehmen <span className="text-[#E53935]">*</span></span>
              </label>
              <select
                value={companyData.company}
                onChange={(e) => handleCompanyChange('company', e.target.value)}
                disabled={loadingState || isEditMode} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              >
                <option value="">Bitte auswählen</option>
                {COMPANIES.map((company) => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Standort <span className="text-[#E53935]">*</span></span>
              </label>
              <select
                value={companyData.location}
                onChange={(e) => handleCompanyChange('location', e.target.value)}
                disabled={loadingState || !companyData.company} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              >
                <option value="">Bitte auswählen</option>
                {availableLocations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Abteilung</span>
              </label>
              <input
                type="text"
                value={companyData.department}
                onChange={(e) => handleCompanyChange('department', e.target.value)}
                placeholder="z.B. IT"
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Aktiv <span className="text-[#E53935]">*</span></span>
              </label>
              <div className="flex items-center gap-3 h-[42px]">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={companyData.status === 'Active'}
                      onChange={(e) => handleCompanyChange('status', e.target.value)}
                      disabled={loadingState} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {companyData.status === 'Active' && (
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
                      checked={companyData.status === 'Inactive'}
                      onChange={(e) => handleCompanyChange('status', e.target.value)}
                      disabled={loadingState} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer group-hover:border-[#246AFF] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {companyData.status === 'Inactive' && (
                      <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                    )}
                  </div>
                  <span className="text-[13px] text-black">Inaktiv</span>
                </label>
              </div>
            </div>

            {/* Start Date */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Startdatum <span className="text-[#E53935]">*</span></span>
              </label>
              <input
                type="date"
                value={companyData.startDate}
                onChange={(e) => handleCompanyChange('startDate', e.target.value)}
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Enddatum</span>
              </label>
              <div className="flex gap-3">
                <select
                  value={companyData.endDate === 'unbefristet' ? 'unbefristet' : 'datum'}
                  onChange={(e) => {
                    if (e.target.value === 'unbefristet') {
                      handleCompanyChange('endDate', 'unbefristet');
                    } else {
                      handleCompanyChange('endDate', '');
                    }
                  }}
                  disabled={loadingState} className="px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                  style={{ borderRadius: '4px', minWidth: '120px' }}
                >
                  <option value="datum">Enddatum</option>
                  <option value="unbefristet">Unbefristet</option>
                </select>
                {companyData.endDate !== 'unbefristet' && (
                  <input
                    type="date"
                    value={companyData.endDate}
                    onChange={(e) => handleCompanyChange('endDate', e.target.value)}
                    disabled={loadingState} className="flex-1 px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                    style={{ borderRadius: '4px' }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION C: Family Situation */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-6">Familiensituation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Marital Status */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Familienstand <span className="text-[#E53935]">*</span></span>
              </label>
              <select
                value={familyData.maritalStatus}
                onChange={(e) => handleFamilyChange('maritalStatus', e.target.value)}
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              >
                <option value="">Bitte auswählen</option>
                <option value="Single">Ledig</option>
                <option value="Married">Verheiratet</option>
                <option value="Divorced">Geschieden</option>
                <option value="Widowed">Verwitwet</option>
              </select>
            </div>

            {/* Number of Children */}
            <div>
              <label className="block mb-1.5">
                <span className="text-[#666666] text-[13px]">Anzahl Kinder <span className="text-[#E53935]">*</span></span>
              </label>
              <select
                value={familyData.numberOfChildren}
                onChange={(e) => handleFamilyChange('numberOfChildren', e.target.value)}
                disabled={loadingState} className="w-full px-3 py-2.5 border border-[#E0E0E0] rounded text-[13px] text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] transition disabled:bg-[#F5F5F5] disabled:cursor-not-allowed"
                style={{ borderRadius: '4px' }}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8+">8+</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION D: Benefits Table */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-2">Mitarbeiter-Benefits</h2>
          <p className="text-[#666666] text-[12px] mb-3">
            Wähle die Benefits aus, die dieser Mitarbeiter erhalten soll. Die Budgets pro Standort sind auf der Benefit-Detailseite definiert.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-6">
            <span className="text-[11px] text-[#666666]">
              <span className="font-medium text-[#273A5F]">🔄 Auto</span> — Dynamisch: Tagessatz × Arbeitstage
            </span>
            <span className="text-[11px] text-[#666666]">
              <span className="font-medium text-[#273A5F]">📌 Fix</span> — Fester Monatsbetrag
            </span>
            <span className="text-[11px] text-[#999999]">
              Änderungen gelten ab dem 1. des nächsten Monats.
            </span>
          </div>

          <div className="px-6 py-6 space-y-6">
            {['Cash-Benefits', 'Gutschein-Benefits', 'Versicherungs-Benefits'].map(category => {
              const catBenefits = benefits.filter(b => benefitCategories[b.name] === category);
              if (catBenefits.length === 0) return null;
              return (
                <div key={category}>
                  <h3 className="text-[#273A5F] font-bold text-[14px] mb-3">{category}</h3>
                  <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
                    <div className="bg-[#273A5F] px-6 h-12" style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '60px 60px 2fr 1fr 1fr 1fr 0.8fr', gap: '0', minWidth: '700px' }}>
                      {['Aktiv','','Benefit','Frequenz','Monatsbudget','Jahresbudget','Info'].map((h, i) => (
                        <div key={i} className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>{h}</div>
                      ))}
                    </div>
                    {catBenefits.map((benefit, index) => (
                <div key={benefit.id} className={`px-6 h-14 border-b border-[#E5E7EB] last:border-b-0 transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`} style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '60px 60px 2fr 1fr 1fr 1fr 0.8fr', gap: '0', minWidth: '700px' }}>
                  <div className="flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={benefit.selected}
                        onChange={() => toggleBenefit(benefit.id)}
                        disabled={loadingState} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer hover:border-[#246AFF] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {benefit.selected && (
                        <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <BenefitIconComponent benefitName={benefit.name} size={32} background={true} />
                  </div>

                  <div className="flex items-center">
                    <span className="text-sm text-[#000000]">{benefit.name}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-sm text-[#000000]">{benefit.frequency}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isEssenBenefit(benefit.name) ? (
                      /* Toggle nur für Essenszuschuss */
                      <>
                        <div className={`flex rounded border overflow-hidden transition ${!benefit.selected || loadingState ? 'opacity-40 pointer-events-none' : 'border-[#0F429F]'}`}>
                          <button
                            onClick={() => handleToggleBudgetType(benefit.id, 'dynamic')}
                            className={`px-2 py-1 text-[11px] transition ${benefit.budgetType === 'dynamic' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                            title="Dynamisch — Arbeitstage × Tagessatz"
                          >🔄</button>
                          <button
                            onClick={() => handleToggleBudgetType(benefit.id, 'fix')}
                            className={`px-2 py-1 text-[11px] transition border-l border-[#0F429F] ${benefit.budgetType === 'fix' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                            title="Fix — eigenen Betrag setzen"
                          >📌</button>
                        </div>
                        <span className="text-[12px] text-[#333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          {benefit.budgetType === 'dynamic'
                            ? <span className="text-[#0F429F]">{benefit.monthlyLimit.replace('.', ',')} €</span>
                            : <span>{benefit.monthlyLimit.replace('.', ',')} €</span>
                          }
                        </span>
                      </>
                    ) : (
                      /* Original-Inputfeld für alle anderen Benefits */
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={benefit.frequency === 'Jährlich' || benefit.frequency === 'Einmalig'
                            ? (parseFloat(benefit.monthlyLimit) / 12).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                            : benefit.monthlyLimit.replace('.', ',')}
                          onChange={(e) => updateBenefitLimit(benefit.id, 'monthlyLimit', e.target.value)}
                          disabled={loadingState || !benefit.selected}
                          className="w-20 px-2 py-1.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none disabled:bg-[#F5F5F5] disabled:cursor-not-allowed transition"
                          style={{ borderRadius: '4px' }}
                        />
                        <span className="text-sm text-[#000000]">€</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={benefit.frequency === 'Jährlich' || benefit.frequency === 'Einmalig'
                          ? benefit.monthlyLimit.replace('.', ',')
                          : (parseFloat(benefit.monthlyLimit) * 12).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        readOnly
                        disabled className="w-20 px-2 py-1.5 border border-[#CCCCCC] rounded text-sm text-[#666666] bg-[#F5F5F5] cursor-not-allowed"
                        style={{ borderRadius: '4px' }}
                      />
                      <span className="text-sm text-[#000000]">€</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setInfoModalBenefit(benefit)}
                      disabled={loadingState} className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[#2196F3] hover:bg-[#E3F2FD] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      title={`Info zu ${benefit.name}`}
                    >
                      <Info size={16} />
                    </button>
                  </div>
                </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-2">
          <button
            onClick={handleSave}
            disabled={loadingState} className="px-6 py-3 bg-[#0F429F] text-white text-[14px] rounded-full hover:bg-[#0d3680] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderRadius: '4px' }}
          >
            {loadingState && <Loader2 size={16} className="animate-spin" />}
            {isEditMode ? 'Änderungen speichern' : 'Mitarbeiter erstellen'}
          </button>
          <button
            onClick={handleBack}
            disabled={loadingState} className="px-6 py-3 border border-[#D0D0D0] text-[#666666] text-[14px] rounded-full hover:bg-[#F5F5F5] transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderRadius: '4px' }}
          >
            Abbrechen
          </button>
        </div>
      </div>

      {/* Info Modal */}
      {infoModalBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setInfoModalBenefit(null)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
            style={{ borderRadius: '8px' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E0E0]">
              <div>
                <p className="text-[#666666] text-[11px] uppercase tracking-wide mb-0.5">{infoModalBenefit.name}</p>
                <h3 className="text-[#273A5F] text-[16px] font-bold">Infos zum Budget</h3>
              </div>
              <button
                onClick={() => setInfoModalBenefit(null)} className="text-[#E53935] hover:text-[#C62828] transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-5 space-y-4">
              {/* Monatsbudget */}
              <div>
                <h4 className="text-[#273A5F] text-[14px] font-medium mb-1">Monatsbudget</h4>
                <p className="text-[#666666] text-[13px] leading-relaxed">
                  {infoModalBenefit.frequency === 'Jährlich' || infoModalBenefit.frequency === 'Einmalig'
                    ? `Das ${infoModalBenefit.name} wird jährlich ausgezahlt. Das rechnerische Monatsbudget beträgt ca. ${(parseFloat(infoModalBenefit.monthlyLimit) / 12).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€.`
                    : `Das monatliche Budget legt die maximale Summe fest, die pro Monat für diesen Mitarbeiter verfügbar ist.`
                  }
                </p>
              </div>

              {/* Jahresbudget */}
              <div>
                <h4 className="text-[#273A5F] text-[14px] font-medium mb-1">Jahresbudget</h4>
                <p className="text-[#666666] text-[13px] leading-relaxed">
                  {infoModalBenefit.frequency === 'Jährlich' || infoModalBenefit.frequency === 'Einmalig'
                    ? `Das Jahresbudget beträgt ${infoModalBenefit.monthlyLimit.replace('.', ',')}€.`
                    : `Das rechnerische Jahresbudget beträgt ${(parseFloat(infoModalBenefit.monthlyLimit) * 12).toLocaleString('de-DE')}€ (${infoModalBenefit.monthlyLimit.replace('.', ',')}€ × 12 Monate).`
                  }
                </p>
              </div>

              {/* Teilzeit-Hinweis */}
              <div className="bg-[#FFF9E6] border border-[#FFE082] rounded px-4 py-3" style={{ borderRadius: '6px' }}>
                <h4 className="text-[#273A5F] text-[13px] font-medium mb-1">Teilzeit-Hinweis</h4>
                <p className="text-[#666666] text-[12px] leading-relaxed">
                  Bei Teilzeit-Mitarbeitern empfehlen wir, das Budget anteilig anzupassen — z.B. 50% Budget bei einer 50%-Stelle.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end">
              <button
                onClick={() => setInfoModalBenefit(null)} className="px-4 py-2 bg-[#0F429F] text-white text-[13px] rounded hover:bg-[#0D3680] transition"
                style={{ borderRadius: '4px' }}
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic-Budget Modal (nur Essenszuschuss) */}
      {showDynamicModal && dynamicModalBenefitId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full" style={{ borderRadius: '8px' }}>
            <h3 className="text-[18px] font-bold text-[#273A5F] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Dynamisches Budget — Essenszuschuss
            </h3>
            <p className="text-[13px] text-[#666666] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Tagessatz × Arbeitstage (passt sich jährlich an)
            </p>

            <div className="mb-3">
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Tagessatz (gesetzl. Maximum)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text" value={`${ESSEN_DAILY_RATE} €`} disabled
                  className="w-28 h-[40px] px-3 py-2 border border-[#E0E0E0] rounded text-[14px] bg-[#F5F5F5] text-[#9E9E9E]"
                  style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '4px' }}
                />
                <span className="text-[12px] text-[#9E9E9E]">🔒 jährlich von Riso</span>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Max. Arbeitstage / Monat
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number" min={1} max={15} value={dynamicWorkingDays}
                  onChange={(e) => { setDynamicWorkingDays(Math.min(15, Math.max(1, Number(e.target.value)))); setDynamicModalError(''); }}
                  className={`w-24 h-[40px] px-3 py-2 border ${dynamicModalError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                  style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '4px' }}
                  autoFocus
                />
                <span className="text-[12px] text-[#9E9E9E]">(max: 15)</span>
              </div>
              {dynamicModalError && (
                <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{dynamicModalError}</p>
              )}
            </div>

            <div className="bg-[#F0F4FF] border border-[#C7D7F9] rounded p-3 mb-5">
              <p className="text-[13px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Monatliches Budget: <strong>{Math.round(dynamicWorkingDays * ESSEN_DAILY_RATE * 100) / 100} €</strong>
                <span className="text-[11px] text-[#9E9E9E] ml-1">({dynamicWorkingDays} × {ESSEN_DAILY_RATE} €)</span>
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowDynamicModal(false); setDynamicModalBenefitId(null); }}
                className="px-5 py-2.5 border border-[#0F429F] text-[#0F429F] text-[13px] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >Abbrechen</button>
              <button
                onClick={handleSaveDynamicModal}
                className="px-5 py-2.5 bg-[#0F429F] text-white text-[13px] rounded-full hover:bg-[#246AFF] transition"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >Speichern</button>
            </div>
          </div>
        </div>
      )}

      {/* Fix-Budget Modal */}
      {showFixModal && fixModalBenefitId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full" style={{ borderRadius: '8px' }}>
            <h3 className="text-[18px] font-bold text-[#273A5F] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Fixes Budget setzen
            </h3>
            <p className="text-[13px] text-[#666666] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {benefits.find(b => b.id === fixModalBenefitId)?.name} — individuelles Monatsbudget
            </p>

            <div className="mb-4">
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Monatliches Budget
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={fixModalValue}
                  onChange={(e) => { setFixModalValue(e.target.value); setFixModalError(''); }}
                  placeholder="z.B. 80"
                  className={`w-36 h-[40px] px-3 py-2 border ${fixModalError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                  style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '4px' }}
                  autoFocus
                />
                <span className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>€/Monat</span>
              </div>
              {fixModalError && (
                <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{fixModalError}</p>
              )}
              <p className="text-[11px] text-[#9E9E9E] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Standortweites Maximum: <strong className="text-[#273A5F]">{benefits.find(b => b.id === fixModalBenefitId)?.monthlyLimit.replace('.', ',')} €</strong>
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowFixModal(false); setFixModalBenefitId(null); setFixModalValue(''); }}
                className="px-5 py-2.5 border border-[#0F429F] text-[#0F429F] text-[13px] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleSaveFixModal}
                className="px-5 py-2.5 bg-[#0F429F] text-white text-[13px] rounded-full hover:bg-[#246AFF] transition"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
