import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { BenefitTaxInfo } from './BenefitTaxInfo';
import { StatusBadge } from './Table';
import { benefitsSettingsData } from './benefitSettingsData';

type Occasion = 'goal_achieved' | 'team_result' | 'anniversary' | 'company_event' | 'other_professional';
type AssignmentStatus = 'pending' | 'approved' | 'rejected';

interface LocationBudget {
  id: string;
  name: string;
  maxPerEmployee: number;
  employeeCount: number;
  enabled: boolean;
}

interface DankebonusAssignment {
  id: string;
  employeeName: string;
  locationName: string;
  occasion: Occasion;
  amount: number;
  status: AssignmentStatus;
  availableFrom: string;
  rejectionReason?: string;
}

const OCCASION_LABELS: Record<Occasion, string> = {
  goal_achieved: 'Ziel / Erfolg erreicht',
  team_result: 'Team-Ergebnis',
  anniversary: 'Betriebsjubiläum / Betriebszugehörigkeit',
  company_event: 'Firmenanlass',
  other_professional: 'Sonstiger beruflicher Anlass',
};

const MOCK_LOCATIONS: LocationBudget[] = [
  { id: '1', name: 'München', maxPerEmployee: 500, employeeCount: 34, enabled: true },
  { id: '2', name: 'Heddesheim', maxPerEmployee: 300, employeeCount: 15, enabled: true },
  { id: '3', name: 'Berlin', maxPerEmployee: 500, employeeCount: 8, enabled: false },
];

const MOCK_EMPLOYEES: Record<string, string[]> = {
  '1': ['Anna Müller', 'Tom Schmidt', 'Sara Becker', 'Max Hoffmann'],
  '2': ['Lisa Weber', 'Klaus Fischer'],
  '3': ['Jan Braun', 'Maria Koch'],
};

const INITIAL_ASSIGNMENTS: DankebonusAssignment[] = [
  {
    id: '1', employeeName: 'Anna Müller', locationName: 'München',
    occasion: 'goal_achieved', amount: 200, status: 'pending', availableFrom: '01.07.2026',
  },
  {
    id: '2', employeeName: 'Tom Schmidt', locationName: 'München',
    occasion: 'anniversary', amount: 150, status: 'approved', availableFrom: '01.05.2026',
  },
];

const MAX_ANNUAL_LIMIT = 10000;

const STATUS_CONFIG = {
  pending:  { label: '⏳ Ausstehend', bg: '#FFF8E1', color: '#F57F17', border: '#FFD54F' },
  approved: { label: '✅ Genehmigt',  bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
  rejected: { label: '❌ Abgelehnt',  bg: '#FFEBEE', color: '#C62828', border: '#EF9A9A' },
};

function getNextMonthFirst() {
  const d = new Date();
  const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  return next.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function BenefitDankeBonusSettings() {
  const benefitName = 'Danke-Bonus';
  const benefitData = benefitsSettingsData['danke-bonus'];
  const description = benefitData?.description;
  const taxInfo = benefitData?.taxInfo;
  const highlightBoxes = benefitData?.highlightBoxes ?? [];
  const wieFunktioniert = benefitData?.wieFunktioniert;
  const belegprinzip = benefitData?.belegprinzip;
  const vorteile = benefitData?.vorteile;
  const personas = benefitData?.personas;
  const faqs = benefitData?.faqs ?? [];

  const [activeTab, setActiveTab] = useState<'info' | 'bearbeitung' | 'faqs'>('info');
  const [isActive, setIsActive] = useState(true);
  const [locations, setLocations] = useState(MOCK_LOCATIONS);
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);

  // Form
  const [formLocationId, setFormLocationId] = useState('');
  const [formEmployee, setFormEmployee]     = useState('');
  const [formOccasion, setFormOccasion]     = useState<Occasion | ''>('');
  const [formAmount, setFormAmount]         = useState('');
  const [formAmountError, setFormAmountError] = useState('');
  const [formStep, setFormStep] = useState<'form' | 'confirmation'>('form');
  const [lastSubmitted, setLastSubmitted] = useState<{ id: string; employee: string; availableFrom: string } | null>(null);

  // Budget modal
  const [showBudgetModal, setShowBudgetModal]   = useState(false);
  const [editingLocation, setEditingLocation]   = useState<LocationBudget | null>(null);
  const [budgetInput, setBudgetInput]           = useState('');
  const [budgetError, setBudgetError]           = useState('');
  const [savedConfirm, setSavedConfirm]         = useState<string | null>(null);

  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const goBack = () =>
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));

  const handleToggleLocation = (id: string) =>
    setLocations(prev => prev.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l));

  const selectedLocation = locations.find(l => l.id === formLocationId);
  const availableEmployees = MOCK_EMPLOYEES[formLocationId] ?? [];

  const validateAmount = (val: string): string => {
    const n = parseFloat(val.replace(',', '.'));
    if (!val.trim() || isNaN(n)) return 'Betrag ist erforderlich';
    if (n <= 0) return 'Betrag muss größer als 0 sein';
    if (selectedLocation && n > selectedLocation.maxPerEmployee)
      return 'Budget überschreitet das Standortbudget.';
    if (n > MAX_ANNUAL_LIMIT)
      return `Überschreitet die gesetzliche Jahresgrenze (max. ${MAX_ANNUAL_LIMIT.toLocaleString('de-DE')} €)`;
    return '';
  };

  const handleSubmit = () => {
    const err = validateAmount(formAmount);
    if (err) { setFormAmountError(err); return; }
    if (!formLocationId || !formEmployee || !formOccasion) return;

    const amount = parseFloat(formAmount.replace(',', '.'));
    const availableFrom = getNextMonthFirst();
    const newId = String(Date.now());

    setAssignments(prev => [{
      id: newId,
      employeeName: formEmployee,
      locationName: selectedLocation?.name ?? '',
      occasion: formOccasion as Occasion,
      amount,
      status: 'pending',
      availableFrom,
    }, ...prev]);

    setLastSubmitted({ id: newId, employee: formEmployee, availableFrom });
    setFormStep('confirmation');
  };

  const handleCancelAssignment = (id: string) =>
    setAssignments(prev => prev.filter(a => a.id !== id));

  const handleNewAssignment = () => {
    setFormStep('form');
    setFormLocationId('');
    setFormEmployee('');
    setFormOccasion('');
    setFormAmount('');
    setFormAmountError('');
    setLastSubmitted(null);
  };

  const handleOpenBudgetModal = (loc: LocationBudget) => {
    setEditingLocation(loc);
    setBudgetInput(String(loc.maxPerEmployee));
    setBudgetError('');
    setShowBudgetModal(true);
  };

  const handleSaveBudget = () => {
    const n = parseFloat(budgetInput.replace(',', '.'));
    if (!budgetInput.trim() || isNaN(n)) { setBudgetError('Bitte gültigen Betrag eingeben'); return; }
    if (n <= 0) { setBudgetError('Betrag muss größer als 0 sein'); return; }
    if (n > MAX_ANNUAL_LIMIT) { setBudgetError(`Maximum: ${MAX_ANNUAL_LIMIT.toLocaleString('de-DE')} €`); return; }
    if (editingLocation) {
      setLocations(prev => prev.map(l => l.id === editingLocation.id ? { ...l, maxPerEmployee: n } : l));
      setSavedConfirm(`${editingLocation.name}: Budget gespeichert, gilt ab 1. nächsten Monat.`);
      setTimeout(() => setSavedConfirm(null), 4000);
    }
    setShowBudgetModal(false);
    setEditingLocation(null);
  };

  const isFormValid = !!(formLocationId && formEmployee && formOccasion && formAmount.trim());

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Back Link */}
      <div className="bg-white px-8 pt-6 pb-4">
        <button
          onClick={goBack} className="flex items-center text-[#0F429F] text-[14px] hover:underline transition"
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
            <h1 className="text-[20px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {benefitName}
            </h1>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[17px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>Status</span>
              <button
                onClick={() => setIsActive(v => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? 'bg-[#4CAF50]' : 'bg-[#9E9E9E]'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <StatusBadge status={isActive ? 'Aktiv' : 'Inaktiv'} type={isActive ? 'success' : 'inactive'} />
            </div>
            <p className="text-[15px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Status-Änderung gilt ab dem 1. des nächsten Monats
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E0E0E0] px-8">
        <div className="flex gap-8">
          {([
            { id: 'bearbeitung' as const, label: 'Benefit verwalten' },
            { id: 'info' as const, label: 'Info' },
            { id: 'faqs' as const, label: 'FAQ' },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-[14px] font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'text-[#0F429F] border-[#0F429F]'
                  : 'text-[#666666] border-transparent hover:text-[#273A5F]'
              }`}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-6">
        {activeTab === 'info' && (
          <>
            {/* 1. Was ist der Benefit? */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Was ist der Benefit {benefitName}?
              </h2>
              <p className="text-[14px] text-[#333333] mb-4" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
                {description}
              </p>
              {highlightBoxes.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {highlightBoxes.map(({ title, text }) => (
                    <div key={title} className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4">
                      <p className="text-[15px] font-bold text-[#273A5F] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{title}</p>
                      <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>{text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Wie funktioniert es? */}
            {wieFunktioniert && (
              <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
                <h2 className="text-[17px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Wie funktioniert es?
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 items-stretch">
                  <p className="text-[15px] font-bold text-[#0F429F] uppercase tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {wieFunktioniert.agTitle}
                  </p>
                  <p className="text-[15px] font-bold text-[#273A5F] uppercase tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {wieFunktioniert.maTitle}
                  </p>
                  {Array.from({ length: Math.max(wieFunktioniert.agSteps.length, wieFunktioniert.maSteps.length) }).flatMap((_, i) => {
                    const ag = wieFunktioniert.agSteps[i];
                    const ma = wieFunktioniert.maSteps[i];
                    return [
                      ag ? (
                        <div key={`ag-${i}`} className="flex items-start gap-3 bg-[#F0F4FF] border border-[#C7D7F9] rounded-lg p-3 h-full">
                          <span className="flex items-center justify-center rounded-full bg-[#0F429F] text-white text-[15px] font-bold flex-shrink-0 mt-0.5" style={{ width: '20px', height: '20px' }}>{ag.step}</span>
                          <div>
                            <p className="text-[14px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>{ag.title}</p>
                            <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>{ag.text}</p>
                          </div>
                        </div>
                      ) : <div key={`ag-${i}`} />,
                      ma ? (
                        <div key={`ma-${i}`} className="flex items-start gap-3 bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-3 h-full">
                          <span className="flex items-center justify-center rounded-full bg-[#273A5F] text-white text-[15px] font-bold flex-shrink-0 mt-0.5" style={{ width: '20px', height: '20px' }}>{ma.step}</span>
                          <div>
                            <p className="text-[14px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>{ma.title}</p>
                            <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>{ma.text}</p>
                          </div>
                        </div>
                      ) : <div key={`ma-${i}`} />,
                    ];
                  })}
                </div>
              </div>
            )}

            {/* 3. Das Gutscheinprinzip */}
            {belegprinzip && (
              <div className="border border-[#C7D7F9] rounded-xl px-8 py-10 mb-6" style={{ background: '#EFF6FF' }}>
                <h2 className="text-[17px] font-bold text-[#273A5F] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {belegprinzip.title ?? 'Das Belegprinzip'}
                </h2>
                <p className="text-[13px] text-[#666666] mb-8" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
                  {belegprinzip.intro}
                </p>
                <div className="flex items-center gap-3">
                  {belegprinzip.steps.map((s, i, arr) => (
                    <div key={s.label} className="flex items-center gap-3 flex-1">
                      <div className="flex flex-col items-center text-center flex-1 gap-3">
                        <div className="flex items-center justify-center rounded-full bg-white" style={{ width: '84px', height: '84px', boxShadow: '0 2px 8px rgba(15,66,159,0.10)', border: '1.5px solid #C7D7F9' }}>
                          <img src={s.icon} alt={s.label} style={{ width: '52px', height: '52px', objectFit: 'contain' }} />
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
                          <p className="text-[13px] text-[#9E9E9E] mt-1" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.4' }}>{s.sub}</p>
                        </div>
                      </div>
                      {i < arr.length - 1 && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7BAAE0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><polyline points="9,18 15,12 9,6"/></svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Vorteile für Arbeitgeber */}
            {vorteile && (
              <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
                <h2 className="text-[17px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Vorteile für dich als Arbeitgeber
                </h2>
                <div className="grid grid-cols-3 gap-5">
                  {vorteile.map(({ title, text }) => (
                    <div key={title} className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-5">
                      <p className="text-[16px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.3' }}>{title}</p>
                      <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Personas */}
            {personas && (
              <div className="border border-[#E0E0E0] rounded-xl p-6 mb-6" style={{ background: '#F9FAFB' }}>
                <h2 className="text-[17px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {personas.title}
                </h2>
                <p className="text-[13px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
                  {personas.intro}
                </p>
                <div className="grid grid-cols-3 gap-5">
                  {personas.items.map(({ img, title, text }) => (
                    <div key={title} className="bg-white border border-[#E0E0E0] rounded-xl p-5 flex flex-col">
                      {img && (
                        <div className="flex justify-center mb-4">
                          <img src={img} alt={title} style={{ width: '96px', height: '96px', objectFit: 'contain' }} />
                        </div>
                      )}
                      <p className="text-[15px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>{title}</p>
                      <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Steuerliche Behandlung */}
            {taxInfo && <BenefitTaxInfo steuer={taxInfo.steuer} sv={taxInfo.sv} />}

            {/* 6. Erklärvideo */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Erklärvideo
              </h2>
              <div
                className="w-full rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer group"
                style={{ background: '#F0F4FF', border: '2px dashed #C7D7F9', minHeight: '200px' }}
              >
                <div className="flex items-center justify-center rounded-full bg-[#0F429F] group-hover:bg-[#246AFF] transition" style={{ width: '56px', height: '56px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
                </div>
                <p className="text-[17px] font-medium text-[#0F429F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Video-URL einfügen
                </p>
                <p className="text-[15px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  YouTube, Vimeo oder direkter Link, wird hier als Embed angezeigt
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'bearbeitung' && (
          <div>
            {/* Einrichtungshinweise — Onboarding-Kachel ganz oben */}
            <div className="rounded-xl p-6 mb-6" style={{ background: '#F0F4FF', border: '1px solid #C7D7F9' }}>
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                So richtest du den Benefit {benefitName} ein
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { step: '1', title: 'Standort aktivieren', text: 'Lege fest, an welchen Standorten der Danke-Bonus verfügbar sein soll.' },
                  { step: '2', title: 'Budget festlegen', text: 'Hinterlege pro Standort das Maximum pro Mitarbeiter.' },
                  { step: '3', title: 'Dankebonus vergeben', text: 'Wähle Mitarbeiter, Anlass und Betrag, nach Riso-Genehmigung wird der Gutschein freigeschaltet.' },
                ].map(({ step, title, text }) => (
                  <div key={step} className="bg-white border border-[#C7D7F9] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="flex items-center justify-center rounded-full bg-[#0F429F] text-white text-[14px] font-bold flex-shrink-0"
                        style={{ width: '22px', height: '22px' }}
                      >
                        {step}
                      </span>
                      <p className="text-[15px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>{title}</p>
                    </div>
                    <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Standorte: Verfügbarkeit + Budget kombiniert */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Standorte
              </h2>
              <p className="text-[14px] text-[#666666] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Verfügbarkeit und Budget pro Standort hier festlegen.
              </p>

              {/* Table Header */}
              <div
                className="bg-[#273A5F] px-6 h-12 rounded-t-lg"
                style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.8fr 1fr 1.3fr 1.1fr', minWidth: '650px' }}
              >
                <span className="text-white font-bold text-[14px] uppercase tracking-wide">Standort</span>
                <span className="text-white font-bold text-[14px] uppercase tracking-wide">Verfügbar</span>
                <span className="text-white font-bold text-[14px] uppercase tracking-wide">Betrag</span>
                <span />
              </div>

              {/* Rows */}
              {locations.map((loc, i) => (
                <div
                  key={loc.id}
                  className={`px-6 border-b border-[#E5E7EB] last:border-b-0 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}
                  style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.8fr 1fr 1.3fr 1.1fr', minHeight: '52px', paddingTop: '8px', paddingBottom: '8px', minWidth: '650px' }}
                >
                  <span className="text-[14px] text-[#333333]">
                    {loc.name}{' '}
                    <span className="text-[14px] text-[#9E9E9E]">({loc.employeeCount} MA)</span>
                  </span>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={loc.enabled}
                        onChange={() => handleToggleLocation(loc.id)}
                        className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer transition-colors"
                      />
                      {loc.enabled && <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />}
                    </div>
                  </label>
                  <span className="text-[14px] text-[#273A5F] font-medium">
                    {loc.maxPerEmployee.toLocaleString('de-DE')} €
                  </span>
                  <div className="flex justify-end">
                    {loc.enabled && (
                      <button
                        onClick={() => handleOpenBudgetModal(loc)}
                        className="px-4 py-1.5 border border-[#0F429F] text-[#0F429F] text-[14px] rounded-full hover:bg-[#F0F4FF] transition"
                      >
                        Bearbeiten
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Dankebonus vergeben */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>Den Benefit {benefitName} einem Mitarbeiter zuweisen</h2>

              {formStep === 'confirmation' && lastSubmitted ? (
                <div className="text-center py-6">
                  <div className="text-[56px] mb-3">✅</div>
                  <h3 className="text-[17px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Dankebonus eingereicht</h3>
                  <p className="text-[14px] text-[#666666] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Wird von Riso geprüft. Verfügbar für{' '}
                    <strong className="text-[#273A5F]">{lastSubmitted.employee}</strong>{' '}
                    am <strong className="text-[#273A5F]">{lastSubmitted.availableFrom}</strong>.
                  </p>
                  <p className="text-[14px] text-[#9E9E9E] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Du kannst den Dankebonus bis zum Monatsende stornieren.</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => handleCancelAssignment(lastSubmitted.id)}
                      className="px-6 py-2 border border-[#F44336] text-[#F44336] text-[14px] rounded-full hover:bg-[#FFEBEE] transition"
                      style={{ borderRadius: '24px', fontFamily: 'Roboto, sans-serif' }}
                    >
                      🗑 Stornieren
                    </button>
                    <button
                      onClick={handleNewAssignment}
                      className="px-6 py-2 bg-[#0F429F] text-white text-[14px] rounded-full hover:bg-[#246AFF] transition"
                      style={{ borderRadius: '24px', fontFamily: 'Roboto, sans-serif' }}
                    >
                      Weiteren Dankebonus vergeben
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Standort */}
                    <div>
                      <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Standort</label>
                      <select
                        value={formLocationId}
                        onChange={e => { setFormLocationId(e.target.value); setFormEmployee(''); setFormAmount(''); setFormAmountError(''); }}
                        className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <option value="">Standort wählen…</option>
                        {locations.map(loc => (
                          <option key={loc.id} value={loc.id}>{loc.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Mitarbeiter */}
                    <div>
                      <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Mitarbeiter</label>
                      <select
                        value={formEmployee}
                        onChange={e => setFormEmployee(e.target.value)}
                        disabled={!formLocationId}
                        className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F] disabled:bg-[#F5F5F5] disabled:border-[#E0E0E0] disabled:text-[#9E9E9E]"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <option value="">Mitarbeiter wählen…</option>
                        {availableEmployees.map(emp => (
                          <option key={emp} value={emp}>{emp}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Anlass */}
                  <div>
                    <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Anlass</label>
                    <select
                      value={formOccasion}
                      onChange={e => setFormOccasion(e.target.value as Occasion)}
                      className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      <option value="">Anlass wählen…</option>
                      {(Object.entries(OCCASION_LABELS) as [Occasion, string][]).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Betrag */}
                  <div>
                    <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Betrag</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        max={selectedLocation?.maxPerEmployee ?? MAX_ANNUAL_LIMIT}
                        value={formAmount}
                        onChange={e => { setFormAmount(e.target.value); setFormAmountError(''); }}
                        placeholder="z.B. 200"
                        className={`w-40 h-[40px] px-3 border ${formAmountError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      />
                      <span className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>€</span>
                      {selectedLocation && (
                        <span className="text-[14px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          max. {selectedLocation.maxPerEmployee.toLocaleString('de-DE')} € (Standort-Budget)
                        </span>
                      )}
                    </div>
                    {formAmountError && (
                      <p className="text-[14px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{formAmountError}</p>
                    )}
                    <p className="text-[14px] text-[#9E9E9E] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Gesetzliche Jahresgrenze: max. {MAX_ANNUAL_LIMIT.toLocaleString('de-DE')} € pro Mitarbeiter
                    </p>
                  </div>

                  {/* Timing hint */}
                  {formLocationId && (
                    <div className="bg-[#F0F4FF] border border-[#C7D7F9] rounded-lg px-4 py-3">
                      <p className="text-[14px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        📅 Credit wird verfügbar am <strong>{getNextMonthFirst()}</strong>, nach Riso-Genehmigung
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleSubmit}
                      disabled={!isFormValid}
                      className="px-8 py-3 bg-[#0F429F] text-white font-medium hover:bg-[#246AFF] transition disabled:bg-[#9E9E9E] disabled:cursor-not-allowed"
                      style={{ borderRadius: '24px', fontFamily: 'Roboto, sans-serif' }}
                    >
                      Dankebonus einreichen →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Save confirmation banner */}
            {savedConfirm && (
              <div className="mb-4 flex items-center gap-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded-lg px-4 py-3">
                <span className="text-[#2E7D32] text-[14px]" style={{ fontFamily: 'Roboto, sans-serif' }}>✅ {savedConfirm}</span>
              </div>
            )}

            {/* Bisherige Zuweisungen (MD §11) */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-[17px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>Bisherige Zuweisungen</h2>
                {assignments.length > 0 && (
                  <div className="flex gap-4 text-[13px]">
                    <span style={{ color: '#F57F17' }}>⏳ Ausstehend, aktiv ab 1. des Monats</span>
                    <span style={{ color: '#2E7D32' }}>✅ Aktiv, Benefit läuft</span>
                  </div>
                )}
              </div>
              <p className="text-[14px] text-[#666666] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Alle eingereichten Zuweisungen für diesen Benefit.
              </p>

              {assignments.length === 0 ? (
                <p className="text-[14px] text-[#9E9E9E] text-center py-8">Noch keine Dankeboni vergeben.</p>
              ) : (
                <>
                  <div className="bg-[#FFF8E1] border border-[#FFD54F] rounded-lg px-4 py-3 mb-4">
                    <p className="text-[14px] text-[#8D6E00]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      ⚠️ Eine neuere Zuweisung für denselben Mitarbeiter überschreibt automatisch die ältere.
                    </p>
                  </div>

                  <div
                    className="bg-[#273A5F] px-4 h-11 rounded-t-lg"
                    style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.2fr 1.4fr 1fr 1fr 1fr 0.9fr' }}
                  >
                    {['Standort', 'Mitarbeiter', 'Budget', 'Gültig ab', 'Status', 'Aktion'].map(h => (
                      <span key={h} className="text-white font-bold text-[13px] uppercase tracking-wide">{h}</span>
                    ))}
                  </div>

                  {assignments.map((a, i) => {
                    const sc = STATUS_CONFIG[a.status];
                    return (
                      <div
                        key={a.id}
                        className={`px-4 border-b border-[#E5E7EB] last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}
                        style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.2fr 1.4fr 1fr 1fr 1fr 0.9fr', minHeight: '52px', paddingTop: '8px', paddingBottom: '8px' }}
                      >
                        <span className="text-[14px] text-[#333333]">{a.locationName}</span>
                        <span className="text-[14px] text-[#333333]">{a.employeeName}</span>
                        <span className="text-[14px] text-[#333333]">{a.amount.toLocaleString('de-DE')} €</span>
                        <span className="text-[13px] text-[#666666]">{a.availableFrom}</span>
                        <span
                          className="text-[11px] font-medium px-2 py-1 rounded-full"
                          style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, width: 'fit-content' }}
                        >
                          {sc.label}
                        </span>
                        <div>
                          {a.status === 'pending' && (
                            <button
                              onClick={() => handleCancelAssignment(a.id)}
                              className="text-[13px] text-[#F44336] border border-[#F44336] px-3 py-1 rounded-full hover:bg-[#FFEBEE] transition"
                            >
                              Stornieren
                            </button>
                          )}
                          {a.status === 'rejected' && a.rejectionReason && (
                            <span className="text-[13px] text-[#F44336]">Grund: {a.rejectionReason}</span>
                          )}
                          {a.status === 'approved' && (
                            <span className="text-[13px] text-[#2E7D32]">seit {a.availableFrom}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Nutzungsstatistik */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>Nutzungsstatistik</h2>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: 'Mitarbeiter mit Zugriff', value: '57' },
                  { label: 'Dankeboni dieses Jahr', value: '8' },
                  { label: 'Ø Betrag', value: '250 €' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 text-center">
                    <p className="text-[24px] font-bold text-[#273A5F]">{value}</p>
                    <p className="text-[14px] text-[#666666] mt-2">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8 mb-8">
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
              >
                Speichern
              </button>
            </div>

          </div>
        )}

        {activeTab === 'faqs' && (
          <>
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[17px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>FAQ</h2>
                {faqs.length > 0 && (
                  <span className="flex items-center gap-1.5 text-[12px] text-[#666666] bg-[#F9FAFB] border border-[#E0E0E0] rounded-full px-3 py-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <span className="w-2 h-2 rounded-full bg-[#4CAF50] inline-block flex-shrink-0" />
                    Live aus hilfe.riso-app.de
                  </span>
                )}
              </div>
              {faqs.length > 0 ? (
                <div className="divide-y divide-[#E0E0E0]">
                  {faqs.map(({ title, summary, url }) => (
                    <div key={title} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-[#273A5F] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{title}</p>
                          <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.5' }}>{summary}</p>
                        </div>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 text-[13px] text-[#0F429F] hover:underline whitespace-nowrap"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          Artikel lesen →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Für diesen Benefit sind noch keine FAQ-Artikel hinterlegt.
                </p>
              )}
            </div>

            <div className="rounded-xl p-6 mb-6" style={{ background: '#E3F2FD', border: '1px solid #90CAF9' }}>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-[17px] font-bold text-[#273A5F] mb-2">Beratung anfragen</h2>
                  <p className="text-[14px] text-[#273A5F]" style={{ lineHeight: '1.6' }}>
                    Du möchtest den Benefit {benefitName} einrichten oder hast Fragen zur Umsetzung? Unser Team begleitet dich durch den gesamten Prozess, von der Standort-Konfiguration bis zu den monatlichen Berichten.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'kontakt' } }))}
                    className="px-6 py-3 bg-[#0F429F] text-white font-medium text-[14px] rounded-full hover:bg-[#246AFF] transition whitespace-nowrap"
                    style={{ borderRadius: '24px' }}
                  >
                    Beratung anfragen →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <div className="text-[48px] mb-3">⚠️</div>
            <h3 className="text-[18px] font-bold text-[#273A5F] mb-3">Benefit deaktivieren?</h3>
            <p className="text-[14px] text-[#333333] mb-4">Möchtest du den <strong>{benefitName}</strong> wirklich deaktivieren?</p>
            <div className="bg-[#FFEBEE] border border-[#F44336] rounded p-3 mb-6 flex items-start gap-2 text-left">
              <span>⚠️</span>
              <p className="text-[12px] text-[#F44336]">Mitarbeiter verlieren ab 1. nächsten Monat Zugriff auf diesen Benefit.</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowDeactivateModal(false)}
                className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ borderRadius: '24px' }}
              >Abbrechen</button>
              <button
                onClick={() => { setShowDeactivateModal(false); goBack(); }}
                className="px-6 py-3 bg-[#F44336] text-white rounded-full hover:bg-[#D32F2F] transition"
                style={{ borderRadius: '24px' }}
              >Deaktivieren</button>
            </div>
          </div>
        </div>
      )}

      {/* Budget Edit Modal */}
      {showBudgetModal && editingLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-[17px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Budget bearbeiten, {editingLocation.name}
            </h3>
            <div className="mb-4">
              <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Max. Betrag pro Mitarbeiter
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={MAX_ANNUAL_LIMIT}
                  value={budgetInput}
                  onChange={e => { setBudgetInput(e.target.value); setBudgetError(''); }}
                  className={`w-40 h-[40px] px-3 border ${budgetError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
                <span className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>€</span>
                <span className="text-[14px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  max. {MAX_ANNUAL_LIMIT.toLocaleString('de-DE')} €
                </span>
              </div>
              {budgetError && (
                <p className="text-[14px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{budgetError}</p>
              )}
            </div>
            <p className="text-[14px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Änderung gilt ab 1. nächsten Monat, wartet auf Riso-Genehmigung
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowBudgetModal(false); setEditingLocation(null); }}
                className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleSaveBudget}
                className="px-6 py-3 bg-[#0F429F] text-white rounded-full hover:bg-[#246AFF] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
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
