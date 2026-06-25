import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { BenefitTaxInfo } from './BenefitTaxInfo';
import { StatusBadge } from './Table';
import { benefitsSettingsData } from './benefitSettingsData';
import { EMPLOYEES_BY_LOCATION, EMPLOYEE_PROFILES, type EmployeeProfile } from './employeeProfiles';

type ErholungStatus = 'pending' | 'approved' | 'rejected';

interface ErholungLocation {
  id: string;
  name: string;
  maxPerEmployee: number;
  employeeCount: number;
  enabled: boolean;
}

interface ErholungAssignment {
  id: string;
  employeeName: string;
  locationName: string;
  amount: number;
  month: string;
  status: ErholungStatus;
  availableFrom: string;
}

const MAX_EMPLOYEE = 156;   // gesetzlicher Höchstbetrag pro Mitarbeiter (§40 Abs. 2 EStG)
const SPOUSE_BONUS = 104;   // zusätzlich für Ehepartner
const CHILD_BONUS = 52;     // zusätzlich pro Kind

// Aus Familienstand + Kinderzahl den steuerfreien Maximalbetrag vorschlagen.
const computeSuggested = (married: boolean, children: number) =>
  MAX_EMPLOYEE + (married ? SPOUSE_BONUS : 0) + Math.max(0, children) * CHILD_BONUS;

const MOCK_LOCATIONS: ErholungLocation[] = [
  { id: '1', name: 'München', maxPerEmployee: MAX_EMPLOYEE, employeeCount: 34, enabled: true },
  { id: '2', name: 'Heddesheim', maxPerEmployee: MAX_EMPLOYEE, employeeCount: 15, enabled: true },
  { id: '3', name: 'Berlin', maxPerEmployee: MAX_EMPLOYEE, employeeCount: 8, enabled: false },
];

// Mitarbeiter + Profile zentral aus employeeProfiles.ts (Single Source of Truth)
const MOCK_EMPLOYEES = EMPLOYEES_BY_LOCATION;
const MOCK_EMPLOYEE_PROFILES = EMPLOYEE_PROFILES;

const STATUS_CONFIG = {
  pending:  { label: '⏳ Ausstehend', bg: '#FFF8E1', color: '#F57F17', border: '#FFD54F' },
  approved: { label: '✅ Genehmigt',  bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
  rejected: { label: '❌ Abgelehnt',  bg: '#FFEBEE', color: '#C62828', border: '#EF9A9A' },
};

// Beispiel-Zuweisungen (Demo) — 156 € Single, 260 € mit Ehepartner, 312 € mit Partner + Kind
const INITIAL_ASSIGNMENTS: ErholungAssignment[] = [
  { id: 'ex1', employeeName: 'Anna Müller',  locationName: 'München',    amount: 156, month: 'Juli 2026',      status: 'approved', availableFrom: '01.07.2026' },
  { id: 'ex2', employeeName: 'Tom Schmidt',  locationName: 'München',    amount: 260, month: 'August 2026',    status: 'approved', availableFrom: '01.08.2026' },
  { id: 'ex3', employeeName: 'Lisa Weber',   locationName: 'Heddesheim', amount: 312, month: 'September 2026', status: 'pending',  availableFrom: '01.09.2026' },
];

const UPCOMING_MONTHS = (() => {
  const months = [];
  const now = new Date();
  for (let i = 1; i <= 4; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push(d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' }));
  }
  return months;
})();

function getNextMonthFirst() {
  const d = new Date();
  const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  return next.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function BenefitErholungSettings() {
  const benefitName = 'Erholung';
  const benefitData = benefitsSettingsData['erholung'];
  const description = benefitData?.description;
  const taxInfo = benefitData?.taxInfo;
  const highlightBoxes = benefitData?.highlightBoxes ?? [];
  const belegprinzip = benefitData?.belegprinzip;
  const wieFunktioniert = benefitData?.wieFunktioniert;
  const vorteile = benefitData?.vorteile;
  const personas = benefitData?.personas;
  const faqs = benefitData?.faqs ?? [];

  const [activeTab, setActiveTab] = useState<'info' | 'bearbeitung' | 'faqs'>('info');
  const [locations, setLocations] = useState(MOCK_LOCATIONS);
  const [assignments, setAssignments] = useState<ErholungAssignment[]>(INITIAL_ASSIGNMENTS);

  const [formLocationId, setFormLocationId] = useState('');
  const [formEmployee, setFormEmployee] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formMonth, setFormMonth] = useState('');
  const [formAmountError, setFormAmountError] = useState('');
  const [formMarried, setFormMarried] = useState(false);
  const [formChildren, setFormChildren] = useState('0');
  const [formStep, setFormStep] = useState<'form' | 'confirmation'>('form');
  const [lastSubmitted, setLastSubmitted] = useState<{ id: string; employee: string; availableFrom: string } | null>(null);

  const [isActive, setIsActive] = useState(true);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [editingLoc, setEditingLoc] = useState<ErholungLocation | null>(null);
  const [budgetInput, setBudgetInput] = useState('');
  const [budgetError, setBudgetError] = useState('');
  const [savedConfirm, setSavedConfirm] = useState<string | null>(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const goBack = () =>
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));

  const selectedLocation = locations.find(l => l.id === formLocationId);
  const availableEmployees = MOCK_EMPLOYEES[formLocationId] ?? [];

  // Profil des gewählten Mitarbeiters (Mock). Fehlt married oder children → Profil unvollständig.
  const selectedProfile: EmployeeProfile | null = formEmployee ? (MOCK_EMPLOYEE_PROFILES[formEmployee] ?? {}) : null;
  const profileComplete = !!selectedProfile && selectedProfile.married !== undefined && selectedProfile.children !== undefined;
  const effectiveMarried = profileComplete ? !!selectedProfile!.married : formMarried;
  const effectiveChildren = profileComplete ? (selectedProfile!.children ?? 0) : (parseInt(formChildren, 10) || 0);
  const suggestedAmount = computeSuggested(effectiveMarried, effectiveChildren);
  const maxAmount = computeSuggested(effectiveMarried, effectiveChildren);

  const validateAmount = (val: string): string => {
    const n = parseFloat(val.replace(',', '.'));
    if (!val.trim() || isNaN(n)) return 'Betrag ist erforderlich';
    if (n <= 0) return 'Betrag muss größer als 0 sein';
    if (selectedLocation && n > selectedLocation.maxPerEmployee)
      return 'Budget überschreitet das Standortbudget.';
    if (n > maxAmount) return `Max. ${maxAmount.toLocaleString('de-DE')} € für diesen Mitarbeiter (156 € + Ehepartner/Kinder)`;
    return '';
  };

  // Mitarbeiterwahl: Profil laden, Familienfelder vorbelegen, Betrag vorschlagen.
  const handleEmployeeChange = (name: string) => {
    setFormEmployee(name);
    setFormAmountError('');
    const p = MOCK_EMPLOYEE_PROFILES[name] ?? {};
    const married = p.married ?? false;
    const children = p.children ?? 0;
    setFormMarried(married);
    setFormChildren(String(children));
    setFormAmount(name ? String(computeSuggested(married, children)) : '');
  };

  const handleMarriedChange = (married: boolean) => {
    setFormMarried(married);
    setFormAmount(String(computeSuggested(married, parseInt(formChildren, 10) || 0)));
    setFormAmountError('');
  };

  const handleChildrenChange = (val: string) => {
    setFormChildren(val);
    setFormAmount(String(computeSuggested(formMarried, parseInt(val, 10) || 0)));
    setFormAmountError('');
  };

  const handleSubmit = () => {
    const err = validateAmount(formAmount);
    if (err) { setFormAmountError(err); return; }
    if (!formLocationId || !formEmployee || !formMonth) return;

    const amount = parseFloat(formAmount.replace(',', '.'));
    const availableFrom = getNextMonthFirst();
    const newId = String(Date.now());

    setAssignments(prev => [{
      id: newId,
      employeeName: formEmployee,
      locationName: selectedLocation?.name ?? '',
      amount,
      month: formMonth,
      status: 'pending',
      availableFrom,
    }, ...prev]);

    setLastSubmitted({ id: newId, employee: formEmployee, availableFrom });
    setFormStep('confirmation');
  };

  const handleNewAssignment = () => {
    setFormStep('form');
    setFormLocationId('');
    setFormEmployee('');
    setFormAmount('');
    setFormMonth('');
    setFormAmountError('');
    setFormMarried(false);
    setFormChildren('0');
    setLastSubmitted(null);
  };

  const handleToggleLocation = (id: string) =>
    setLocations(prev => prev.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l));

  const handleOpenBudgetModal = (loc: ErholungLocation) => {
    setEditingLoc(loc);
    setBudgetInput(String(loc.maxPerEmployee));
    setBudgetError('');
    setShowBudgetModal(true);
  };

  const handleSaveBudget = () => {
    const n = parseFloat(budgetInput.replace(',', '.'));
    if (!budgetInput.trim() || isNaN(n)) { setBudgetError('Bitte gültigen Betrag eingeben'); return; }
    if (n <= 0) { setBudgetError('Betrag muss größer als 0 sein'); return; }
    if (n > MAX_EMPLOYEE) { setBudgetError(`Maximum: ${MAX_EMPLOYEE} €`); return; }
    if (editingLoc) {
      setLocations(prev => prev.map(l => l.id === editingLoc.id ? { ...l, maxPerEmployee: n } : l));
      setSavedConfirm(`${editingLoc.name}: Budget gespeichert.`);
      setTimeout(() => setSavedConfirm(null), 4000);
    }
    setShowBudgetModal(false);
    setEditingLoc(null);
  };

  const isFormValid = !!(formLocationId && formEmployee && formAmount.trim() && formMonth);

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

            {/* 3. Das Belegprinzip */}
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
                          <img src={img} alt={title} style={{ width: '72px', height: '72px', objectFit: 'contain' }} />
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
                  { step: '1', title: 'Standort aktivieren', text: 'Lege fest, an welchen Standorten die Erholung verfügbar sein soll.' },
                  { step: '2', title: 'Budget festlegen', text: `Hinterlege pro Standort das Maximum pro Mitarbeiter (max. ${MAX_EMPLOYEE} €).` },
                  { step: '3', title: 'Erholung vergeben', text: 'Wähle Mitarbeiter, Betrag und Auszahlungsmonat, nach Riso-Genehmigung wird ausgezahlt.' },
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
                Verfügbarkeit und Budget pro Standort hier festlegen. Maximaler Betrag pro Mitarbeiter: {MAX_EMPLOYEE} €.
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
                    {loc.name} <span className="text-[14px] text-[#9E9E9E]">({loc.employeeCount} MA)</span>
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
                    <button
                      onClick={() => handleOpenBudgetModal(loc)}
                      className="px-4 py-1.5 border border-[#0F429F] text-[#0F429F] text-[14px] rounded-full hover:bg-[#F0F4FF] transition"
                    >
                      Bearbeiten
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Save confirmation */}
            {savedConfirm && (
              <div className="mb-4 flex items-center gap-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded-lg px-4 py-3">
                <span className="text-[#2E7D32] text-[14px]" style={{ fontFamily: 'Roboto, sans-serif' }}>✅ {savedConfirm}</span>
              </div>
            )}

            {/* Erholung vergeben */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>Den Benefit {benefitName} einem Mitarbeiter zuweisen</h2>

              {formStep === 'confirmation' && lastSubmitted ? (
                <div className="text-center py-6">
                  <div className="text-[56px] mb-3">✅</div>
                  <h3 className="text-[17px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Erholung eingereicht</h3>
                  <p className="text-[14px] text-[#666666] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Wird von Riso geprüft. Verfügbar für{' '}
                    <strong className="text-[#273A5F]">{lastSubmitted.employee}</strong>{' '}
                    am <strong className="text-[#273A5F]">{lastSubmitted.availableFrom}</strong>.
                  </p>
                  <p className="text-[14px] text-[#9E9E9E] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Du kannst die Vergabe bis zum Monatsende stornieren.</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setAssignments(prev => prev.filter(a => a.id !== lastSubmitted.id))}
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
                      Weitere Erholung vergeben
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
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
                    <div>
                      <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Mitarbeiter</label>
                      <select
                        value={formEmployee}
                        onChange={e => handleEmployeeChange(e.target.value)}
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Betrag</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={maxAmount}
                          value={formAmount}
                          onChange={e => { setFormAmount(e.target.value); setFormAmountError(''); }}
                          placeholder="z.B. 156"
                          className={`w-32 h-[40px] px-3 border ${formAmountError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                        <span className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>€</span>
                      </div>
                      {formAmountError && <p className="text-[14px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{formAmountError}</p>}
                      {formEmployee && (
                        <p className="text-[14px] text-[#9E9E9E] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          Empfehlung: 156 € (Single){effectiveMarried ? ' + 104 € (verheiratet)' : ''}{effectiveChildren > 0 ? ` + ${effectiveChildren} × 52 € (Kinder)` : ''} = {suggestedAmount.toLocaleString('de-DE')} €
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Monat der Auszahlung</label>
                      <select
                        value={formMonth}
                        onChange={e => setFormMonth(e.target.value)}
                        className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <option value="">Monat wählen…</option>
                        {UPCOMING_MONTHS.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Familienstand & Kinder — aus Profil oder manuell */}
                  {formEmployee && profileComplete && (
                    <div className="bg-[#F0F4FF] border border-[#C7D7F9] rounded-lg px-4 py-3">
                      <p className="text-[14px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        👤 Aus dem Mitarbeiterprofil: <strong>{effectiveMarried ? 'verheiratet' : 'nicht verheiratet'}</strong>, <strong>{effectiveChildren} {effectiveChildren === 1 ? 'Kind' : 'Kinder'}</strong>
                      </p>
                    </div>
                  )}
                  {formEmployee && !profileComplete && (
                    <div className="bg-[#FFF8E1] border border-[#FFD54F] rounded-lg px-4 py-4">
                      <p className="text-[14px] text-[#8D6E00] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        ⚠️ Familienstand und Kinderzahl fehlen im Mitarbeiterprofil. Bitte ergänze sie, damit das Budget korrekt vorgeschlagen wird.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Familienstand</label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={formMarried}
                                onChange={e => handleMarriedChange(e.target.checked)}
                                className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer transition-colors"
                              />
                              {formMarried && <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />}
                            </div>
                            <span className="text-[14px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>Verheiratet (+104 €)</span>
                          </label>
                        </div>
                        <div>
                          <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Anzahl Kinder</label>
                          <input
                            type="number"
                            min={0}
                            max={20}
                            value={formChildren}
                            onChange={e => handleChildrenChange(e.target.value)}
                            className="w-32 h-[40px] px-3 border border-[#0F429F] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          />
                          <span className="text-[14px] text-[#9E9E9E] ml-2" style={{ fontFamily: 'Roboto, sans-serif' }}>je +52 €</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleSubmit}
                      disabled={!isFormValid}
                      className="px-8 py-3 bg-[#0F429F] text-white font-medium hover:bg-[#246AFF] transition disabled:bg-[#9E9E9E] disabled:cursor-not-allowed"
                      style={{ borderRadius: '24px', fontFamily: 'Roboto, sans-serif' }}
                    >
                      Erholung einreichen →
                    </button>
                  </div>
                </div>
              )}
            </div>

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
                <p className="text-[14px] text-[#9E9E9E] text-center py-8">Noch keine Erholung vergeben.</p>
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
                              onClick={() => setAssignments(prev => prev.filter(x => x.id !== a.id))}
                              className="text-[13px] text-[#F44336] border border-[#F44336] px-3 py-1 rounded-full hover:bg-[#FFEBEE] transition"
                            >
                              Stornieren
                            </button>
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
                  { label: 'Vergaben dieses Jahr', value: '23' },
                  { label: 'Ø Betrag je Vergabe', value: '156 €' },
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
            <p className="text-[14px] text-[#333333] mb-4">Möchtest du die <strong>{benefitName}</strong> wirklich deaktivieren?</p>
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

      {/* Budget Modal */}
      {showBudgetModal && editingLoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <h3 className="text-[17px] font-bold text-[#273A5F] mb-4">
              Budget bearbeiten, {editingLoc.name}
            </h3>
            <div className="mb-4">
              <label className="block text-[15px] font-medium text-[#273A5F] mb-2">Max. Betrag pro Mitarbeiter</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={MAX_EMPLOYEE}
                  value={budgetInput}
                  onChange={e => { setBudgetInput(e.target.value); setBudgetError(''); }}
                  className={`w-40 h-[40px] px-3 border ${budgetError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                />
                <span className="text-[14px] text-[#666666]">€</span>
                <span className="text-[14px] text-[#9E9E9E]">max. {MAX_EMPLOYEE} €</span>
              </div>
              {budgetError && <p className="text-[14px] text-[#F44336] mt-1">{budgetError}</p>}
            </div>
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
    </div>
  );
}
