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

  // Benefits
  const [benefits, setBenefits] = useState<Benefit[]>([
    { id: '1', name: 'Essenszuschuss', frequency: 'Täglich', dailyLimit: '7.00', monthlyLimit: '150.00', selected: isEditMode },
    { id: '2', name: 'Internet', frequency: 'Monatlich', dailyLimit: '50.00', monthlyLimit: '500.00', selected: isEditMode },
    { id: '3', name: 'Kindergarten', frequency: 'Monatlich', dailyLimit: '', monthlyLimit: '100.00', selected: false },
    { id: '4', name: 'Fahrkostenzuschuss', frequency: 'Monatlich', dailyLimit: '', monthlyLimit: '80.00', selected: false },
    { id: '5', name: 'Erholung', frequency: 'Jährlich', dailyLimit: '', monthlyLimit: '156.00', selected: false },
    { id: '6', name: 'Sachbezug', frequency: 'Monatlich', dailyLimit: '', monthlyLimit: '50.00', selected: false },
    { id: '7', name: 'Danke-Bonus', frequency: 'Einmalig', dailyLimit: '', monthlyLimit: '100.00', selected: false },
    { id: '8', name: 'Geburtstag', frequency: 'Jährlich', dailyLimit: '', monthlyLimit: '50.00', selected: false },
    { id: '9', name: 'ÖPNV', frequency: 'Monatlich', dailyLimit: '63.00', monthlyLimit: '630.00', selected: isEditMode },
    { id: '10', name: 'BKV', frequency: 'Monatlich', dailyLimit: '', monthlyLimit: '80.00', selected: false },
    { id: '11', name: 'BAV', frequency: 'Monatlich', dailyLimit: '', monthlyLimit: '150.00', selected: false },
  ]);

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
            <p className="text-[#D32F2F] text-[13px]">Bitte überprüfen Sie die markierten Felder.</p>
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
                <option value="4+">4+</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION D: Benefits Table */}
        <div className="bg-white rounded border border-[#E0E0E0] p-6">
          <h2 className="text-[#273A5F] text-[16px] mb-2">Mitarbeiter-Benefits</h2>
          <p className="text-[#666666] text-[12px] mb-6">
            Wähle die Leistungen, die dieser Mitarbeiter erhalten soll. Die tatsächlichen Budgets pro Standort sind in der Benefit-Detail-Seite definiert.
          </p>

          <div className="px-6 py-6">
            <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
              <div className="bg-[#273A5F] flex items-center px-6 h-12" style={{ display: 'grid', gridTemplateColumns: '60px 60px 2fr 1fr 1fr 1fr 0.8fr', gap: '0' }}>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Aktiv</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide"></div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Benefit</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Frequenz</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Tagesbudget</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Monatsbudget</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Info</div>
              </div>

              {benefits.map((benefit, index) => (
                <div key={benefit.id} className={`flex items-center px-6 h-14 border-b border-[#E5E7EB] last:border-b-0 transition-colors hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`} style={{ display: 'grid', gridTemplateColumns: '60px 60px 2fr 1fr 1fr 1fr 0.8fr', gap: '0' }}>
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
                    <BenefitIconComponent benefitName={benefit.name} size={32} background={false} />
                  </div>

                  <div className="flex items-center">
                    <span className="text-sm text-[#000000]">{benefit.name}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-sm text-[#000000]">{benefit.frequency}</span>
                  </div>

                  <div className="flex items-center">
                    {benefit.dailyLimit ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={benefit.dailyLimit}
                          readOnly
                          disabled className="w-20 px-2 py-1.5 border border-[#CCCCCC] rounded text-sm text-[#999999] bg-[#F5F5F5] cursor-not-allowed"
                          style={{ borderRadius: '4px' }}
                        />
                        <span className="text-sm text-[#000000]">€</span>
                      </div>
                    ) : (
                      <span className="text-sm text-[#000000]">—</span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={benefit.monthlyLimit}
                        onChange={(e) => updateBenefitLimit(benefit.id, 'monthlyLimit', e.target.value)}
                        disabled={loadingState || !benefit.selected} className="w-20 px-2 py-1.5 border border-[#E0E0E0] rounded text-sm text-black focus:border-[#2196F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)] disabled:bg-[#F5F5F5] disabled:cursor-not-allowed transition"
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
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={handleSave}
            disabled={loadingState} className="px-6 py-3 bg-[#4CAF50] text-white text-[14px] rounded hover:bg-[#45A049] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderRadius: '4px' }}
          >
            {loadingState && <Loader2 size={16} className="animate-spin" />}
            {isEditMode ? 'Änderungen speichern' : 'Mitarbeiter erstellen'}
          </button>
          <button
            onClick={handleBack}
            disabled={loadingState} className="px-6 py-3 border border-[#E0E0E0] text-[#666666] text-[14px] rounded hover:bg-[#F5F5F5] transition disabled:opacity-50 disabled:cursor-not-allowed"
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
              <h3 className="text-[#273A5F] text-[16px]">
                {infoModalBenefit.name}
              </h3>
              <button
                onClick={() => setInfoModalBenefit(null)} className="text-[#E53935] hover:text-[#C62828] transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <h4 className="text-[#273A5F] text-[14px] mb-2">Monatliches Budget</h4>
                <p className="text-[#666666] text-[13px] leading-relaxed">
                  Das monatliche Budget definiert die maximale Summe, die pro Monat für diesen Mitarbeiter verfügbar ist.
                </p>
              </div>

              <div className="bg-[#F0F4FF] px-4 py-3 rounded" style={{ borderRadius: '6px' }}>
                <p className="text-[#273A5F] text-[12px]">
                  <strong>Beispiel:</strong> {infoModalBenefit.name} mit {infoModalBenefit.monthlyLimit}€/Monat = max. {infoModalBenefit.monthlyLimit}€ pro Monat nutzbar
                </p>
              </div>

              {infoModalBenefit.dailyLimit && (
                <div>
                  <h4 className="text-[#273A5F] text-[14px] mb-2">Tagesbudget</h4>
                  <p className="text-[#666666] text-[13px] leading-relaxed">
                    Das Tagesbudget ist vordefiniert und kann nicht geändert werden. Es beträgt {infoModalBenefit.dailyLimit}€ pro Tag.
                  </p>
                </div>
              )}
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
    </div>
  );
}
