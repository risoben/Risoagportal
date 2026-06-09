import { useState, useMemo } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { BenefitTaxInfo } from './BenefitTaxInfo';
import { StatusBadge } from './Table';
import { benefitsSettingsData } from './benefitSettingsData';

interface Location {
  id: string;
  name: string;
  limit: string;
  employeeCount: number;
  enabled: boolean;
  budgetType?: 'dynamic' | 'fix';
}

interface IndividualAssignment {
  id: string;
  employeeName: string;
  locationName: string;
  amount: number;
  budgetType: 'dynamic' | 'fix';
  month: string;
  availableFrom: string;
}

const MOCK_EMPLOYEES: Record<string, string[]> = {
  '1': ['Anna Müller', 'Tom Schmidt', 'Sara Becker', 'Max Hoffmann'],
  '2': ['Lisa Weber', 'Klaus Fischer'],
  '3': ['Jan Braun', 'Maria Koch'],
  '4': ['Nina Vogel'],
};


const UPCOMING_MONTHS = (() => {
  const months: string[] = [];
  const now = new Date();
  for (let i = 1; i <= 3; i++) {
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
  const benefitName = customName || benefitData?.name || 'Essenszuschuss';
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
  const taxInfo = benefitData?.taxInfo ?? benefitsSettingsData['mittagessen']?.taxInfo;
  const highlightBoxes = isEssen
    ? [
        { icon: '💶', title: '115,05 € / Monat steuerfrei', text: 'Bis zu 1.380 € im Jahr — 7,67 € pro Arbeitstag als gesetzliches Maximum' },
        { icon: '🧾', title: 'Jeder Lebensmittelbeleg gilt', text: 'Gekauft, gekocht oder bestellt — Restaurant, Supermarkt, Lieferdienst' },
        { icon: '💰', title: 'Direkt aufs Konto', text: 'Bargelderstattung per Gehaltsabrechnung — kein Gutschein, kein Umweg' },
      ]
    : [];

  const [activeTab, setActiveTab] = useState<'info' | 'bearbeitung' | 'faqs'>('info');
  const [showOlderAssignments, setShowOlderAssignments] = useState(false);
  const [expandedAssignmentIds, setExpandedAssignmentIds] = useState<Set<string>>(new Set());
  const [isActive, setIsActive] = useState(true);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [limitValue, setLimitValue] = useState('');
  const [limitError, setLimitError] = useState('');
  const [workingDays, setWorkingDays] = useState(15);
  const [essenBudgetType, setEssenBudgetType] = useState<'fix' | 'dynamic'>('dynamic');

  const [locations, setLocations] = useState<Location[]>(defaultLocations);
  const stats = defaultStats;

  // Einem Mitarbeiter zuweisen
  const [assignments, setAssignments] = useState<IndividualAssignment[]>([
    { id: 'mock-1', employeeName: 'Anna Müller', locationName: 'München', amount: 0, budgetType: 'dynamic', month: 'Juli 2026', availableFrom: '1. Juli 2026' },
    { id: 'mock-2', employeeName: 'Alle Mitarbeiter', locationName: 'Heddesheim', amount: 0, budgetType: 'dynamic', month: 'Juli 2026', availableFrom: '1. Juli 2026' },
    { id: 'mock-3', employeeName: 'Tom Schmidt', locationName: 'München', amount: 95, budgetType: 'fix', month: 'August 2026', availableFrom: '1. August 2026' },
    { id: 'mock-4', employeeName: 'Sara Becker', locationName: 'München', amount: 0, budgetType: 'dynamic', month: 'August 2026', availableFrom: '1. August 2026' },
    { id: 'mock-5', employeeName: 'Lisa Weber', locationName: 'Berlin', amount: 85, budgetType: 'fix', month: 'September 2026', availableFrom: '1. September 2026' },
  ]);
  const [assignLocationId, setAssignLocationId] = useState('');
  const [assignEmployee, setAssignEmployee] = useState('');
  const [assignAmount, setAssignAmount] = useState('');
  const [assignMonth, setAssignMonth] = useState('');
  const [assignError, setAssignError] = useState('');
  const [assignBudgetType, setAssignBudgetType] = useState<'dynamic' | 'fix'>('dynamic');
  const [assignStep, setAssignStep] = useState<'form' | 'confirmation'>('form');
  const [lastAssigned, setLastAssigned] = useState<{ id: string; employee: string; availableFrom: string } | null>(null);

  const isAllLocations = assignLocationId === 'all';
  const assignLocation = locations.find((l) => l.id === assignLocationId);
  const assignLocationLabel = isAllLocations ? 'Alle Standorte' : (assignLocation?.name ?? '');
  const enabledLocationIds = locations.filter(l => l.enabled).map(l => l.id);
  const assignableEmployees = isAllLocations
    ? Array.from(new Set(enabledLocationIds.flatMap(id => MOCK_EMPLOYEES[id] ?? [])))
    : (MOCK_EMPLOYEES[assignLocationId] ?? []);
  const assignIsAuto = isEssen && assignBudgetType === 'dynamic';
  const isAssignFormValid = !!(assignLocationId && assignEmployee && assignMonth && (assignIsAuto || assignAmount.trim()));

  const handleAssignSubmit = () => {
    let numValue = 0;
    if (!assignIsAuto) {
      numValue = parseFloat(assignAmount.replace(',', '.'));
      if (!assignAmount.trim() || isNaN(numValue)) { setAssignError('Betrag ist erforderlich'); return; }
      if (numValue <= 0) { setAssignError('Betrag muss größer als 0 sein'); return; }
    }
    if (!assignLocationId || !assignEmployee || !assignMonth) return;

    const availableFrom = '1. ' + assignMonth;
    const newId = String(Date.now());
    const employeeLabel = assignEmployee === 'all' ? 'Alle Mitarbeiter' : assignEmployee;
    setAssignments((prev) => [{
      id: newId,
      employeeName: employeeLabel,
      locationName: assignLocationLabel,
      amount: numValue,
      budgetType: isEssen ? assignBudgetType : 'fix',
      month: assignMonth,
      availableFrom,
    }, ...prev]);
    setLastAssigned({ id: newId, employee: employeeLabel, availableFrom });
    setAssignStep('confirmation');
  };

  const handleNewAssignment = () => {
    setAssignStep('form');
    setAssignLocationId('');
    setAssignEmployee('');
    setAssignAmount('');
    setAssignMonth('');
    setAssignError('');
    setAssignBudgetType('dynamic');
    setLastAssigned(null);
  };

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

  const [savedConfirm, setSavedConfirm] = useState<string | null>(null);

  const handleSaveLimit = () => {
    if (isEssen && essenBudgetType === 'dynamic') {
      if (workingDays < 1 || workingDays > 15) {
        setLimitError('Arbeitstage müssen zwischen 1 und 15 liegen');
        return;
      }
      const newAmount = Math.round(workingDays * dailyRate * 100) / 100;
      if (editingLocation) {
        setLocations(locations.map((loc) =>
          loc.id === editingLocation.id
            ? { ...loc, limit: `${newAmount}€/Monat`, budgetType: 'dynamic', enabled: true }
            : loc
        ));
        setSavedConfirm(`${editingLocation.name}: Änderung gespeichert — wird zum 1. nächsten Monat wirksam.`);
      }
    } else {
      if (!limitValue.trim()) { setLimitError('Feld erforderlich'); return; }
      const numValue = parseFloat(limitValue);
      if (isNaN(numValue)) { setLimitError('Nur Zahlen erlaubt'); return; }
      if (numValue < 0) { setLimitError('Betrag kann nicht negativ sein'); return; }
      if (editingLocation) {
        setLocations(locations.map((loc) =>
          loc.id === editingLocation.id
            ? { ...loc, limit: `${limitValue}€/Monat`, budgetType: essenBudgetType, enabled: true }
            : loc
        ));
        setSavedConfirm(`${editingLocation.name}: Änderung gespeichert — wird zum 1. nächsten Monat wirksam.`);
      }
    }
    setShowLimitModal(false);
    setEditingLocation(null);
    setLimitValue('');
    setTimeout(() => setSavedConfirm(null), 4000);
  };

  const handleToggleLocation = (locationId: string) => {
    setLocations(locations.map((loc) => (loc.id === locationId ? { ...loc, enabled: !loc.enabled } : loc)));
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
            <div>
              <h1 className="text-[20px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {benefitName}
              </h1>
            </div>
          </div>

          {/* Status Toggle */}
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[17px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
            <p className="text-[15px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Status-Änderung gilt ab 1. nächsten Monat
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E0E0E0] px-8">
        <div className="flex gap-8">
          {([
            // Reihenfolge an die App angeglichen (Philipp-Feedback 2026-06-08): "Bearbeitung" zuerst, dann "Info", dann "FAQs"
            // ⚠️ Name "Bearbeitung" steht noch nicht final fest — Philipp/Santiago entscheiden später.
            //    Vorschläge aus dem Feedback-Gespräch: "Benefit Verwaltung" / "Benefit einrichten" / "Benefits verwalten"
            { id: 'bearbeitung' as const, label: 'Benefit verwalten' },
            { id: 'info' as const, label: 'Info' },
            { id: 'faqs' as const, label: 'FAQs' },
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
                Was ist {benefitName}?
              </h2>
              <p className="text-[14px] text-[#333333] mb-4" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
                {benefitDescription}
              </p>
              {highlightBoxes.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {highlightBoxes.map(({ icon, title, text }) => (
                    <div key={title} className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4">
                      <div className="text-[15px] mb-2">{icon}</div>
                      <p className="text-[15px] font-bold text-[#273A5F] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{title}</p>
                      <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>{text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Wie funktioniert es? */}
            {isEssen && (
              <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
                <h2 className="text-[17px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Wie funktioniert es?
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {/* AG-Seite */}
                  <div>
                    <p className="text-[15px] font-bold text-[#0F429F] uppercase tracking-wide mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Arbeitgeber-Setup (einmalig)
                    </p>
                    <div className="flex flex-col gap-3">
                      {[
                        { step: '1', icon: '⚙️', title: 'Standort & Budget', text: 'Standorte aktivieren, Budget per Auto oder Fix festlegen' },
                        { step: '2', icon: '👥', title: 'Mitarbeiter zuweisen', text: 'Benefit den richtigen Mitarbeitern zuweisen' },
                        { step: '3', icon: '✅', title: 'Fertig', text: 'Riso übernimmt Prüfung & Abrechnung automatisch' },
                      ].map(({ step, icon, title, text }) => (
                        <div key={step} className="flex items-start gap-3 bg-[#F0F4FF] border border-[#C7D7F9] rounded-lg p-3">
                          <span className="flex items-center justify-center rounded-full bg-[#0F429F] text-white text-[15px] font-bold flex-shrink-0 mt-0.5" style={{ width: '20px', height: '20px' }}>{step}</span>
                          <div>
                            <p className="text-[14px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>{icon} {title}</p>
                            <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>{text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* MA-Seite */}
                  <div>
                    <p className="text-[15px] font-bold text-[#273A5F] uppercase tracking-wide mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Mitarbeiter-Nutzung (monatlich)
                    </p>
                    <div className="flex flex-col gap-3">
                      {[
                        { step: '1', icon: '🍽️', title: 'Essen kaufen', text: 'Restaurant, Supermarkt, Lieferdienst — beliebig' },
                        { step: '2', icon: '📱', title: 'Beleg hochladen', text: 'In der Riso App fotografieren & einreichen' },
                        { step: '3', icon: '💰', title: 'Geld erhalten', text: 'Bis 115 € / Monat steuerfrei aufs Konto' },
                      ].map(({ step, icon, title, text }) => (
                        <div key={step} className="flex items-start gap-3 bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-3">
                          <span className="flex items-center justify-center rounded-full bg-[#273A5F] text-white text-[15px] font-bold flex-shrink-0 mt-0.5" style={{ width: '20px', height: '20px' }}>{step}</span>
                          <div>
                            <p className="text-[14px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>{icon} {title}</p>
                            <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>{text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Das Belegprinzip */}
            {isEssen && (
              <div className="border border-[#C7D7F9] rounded-xl px-8 py-10 mb-6" style={{ background: '#EFF6FF' }}>
                <h2 className="text-[17px] font-bold text-[#273A5F] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Das Belegprinzip
                </h2>
                <p className="text-[13px] text-[#666666] mb-8" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
                  Mitarbeiter reichen ihre Essensbelege direkt über die App ein — der Betrag wird automatisch geprüft und mit dem nächsten Gehalt erstattet. Kein Gutschein, kein Umweg.
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { icon: '🧾', label: 'Beleg kaufen', sub: 'Restaurant, Supermarkt, Lieferdienst' },
                    { icon: '📱', label: 'In App hochladen', sub: 'Foto machen & einreichen' },
                    { icon: '🔍', label: 'Riso prüft', sub: 'Automatisch & regelkonform' },
                    { icon: '💰', label: 'Erstattung', sub: 'Direkt aufs Konto mit Gehalt' },
                  ].map((s, i, arr) => (
                    <div key={s.label} className="flex items-center gap-3 flex-1">
                      <div className="flex flex-col items-center text-center flex-1 gap-3">
                        <div className="flex items-center justify-center rounded-full bg-white" style={{ width: '84px', height: '84px', fontSize: '42px', boxShadow: '0 2px 8px rgba(15,66,159,0.10)', border: '1.5px solid #C7D7F9' }}>
                          {s.icon}
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

            {/* 4. Vorteile für Arbeitgeber */}
            {isEssen && (
              <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
                <h2 className="text-[17px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Vorteile für dich als Arbeitgeber
                </h2>
                <div className="grid grid-cols-3 gap-5">
                  {[
                    { icon: '💸', title: 'Bis zu 50% niedrigere Lohnnebenkosten', text: 'Der Essenszuschuss reduziert die Lohnnebenkosten gegenüber einer klassischen Gehaltserhöhung erheblich.' },
                    { icon: '🧲', title: 'Talentbindung & -gewinnung', text: 'Attraktive Benefits helfen, Mitarbeiter zu halten und neue im Wettbewerb um Fachkräfte zu gewinnen.' },
                    { icon: '⚡', title: 'Einfache digitale Umsetzung', text: 'Einmal einrichten — Riso übernimmt Belegprüfung, Abrechnung und Reporting automatisch.' },
                  ].map(({ icon, title, text }) => (
                    <div key={title} className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-5">
                      <div className="text-[22px] mb-3">{icon}</div>
                      <p className="text-[16px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.3' }}>{title}</p>
                      <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Passt für jeden Essenstyp — Mitarbeiter-Personas */}
            {isEssen && (
              <div className="border border-[#E0E0E0] rounded-xl p-6 mb-6" style={{ background: '#F9FAFB' }}>
                <h2 className="text-[17px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Passt für jeden Essenstyp
                </h2>
                <p className="text-[13px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
                  Egal was für ein Essenstyp deine Mitarbeitenden sind — der Essenszuschuss passt zu jedem Lifestyle und jeder Essensgewohnheit.
                </p>
                <div className="grid grid-cols-3 gap-5">
                  {[
                    { icon: '🥡', title: 'Tupperdose-Fan', text: 'Bringt Essen von zuhause ins Büro — selbst gekochte Mahlzeiten zählen.' },
                    { icon: '🍽️', title: 'Menü-Liebhaber', text: 'Genießt die lange Mittagspause im Restaurant — jeder Restaurantbeleg gilt.' },
                    { icon: '🥗', title: 'Healthy Hero', text: 'Vegan, bio, glutenfrei — Lebensmittel aus dem Supermarkt sind selbstverständlich dabei.' },
                    { icon: '🥨', title: 'Bäcker oder Imbiss', text: 'Auch Belege vom Bäcker, Metzger oder Imbiss um die Ecke werden akzeptiert.' },
                    { icon: '💪', title: 'Fitness-Typ', text: 'Protein-Riegel, Proteinshakes und Sportlernahrung zählen ebenfalls als Beleg.' },
                    { icon: '⏱️', title: 'Flexibler Esser', text: 'Arbeitet zu ungewöhnlichen Zeiten? Das Zeitfenster (11–16 Uhr) gilt auch im Home-Office.' },
                  ].map(({ icon, title, text }) => (
                    <div key={title} className="bg-white border border-[#E0E0E0] rounded-xl p-5 flex flex-col">
                      <div className="flex justify-center mb-4">
                        <span style={{ fontSize: '44px', lineHeight: '1' }}>{icon}</span>
                      </div>
                      <p className="text-[15px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>{title}</p>
                      <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Steuerliche Behandlung */}
            {taxInfo && <BenefitTaxInfo steuer={taxInfo.steuer} sv={taxInfo.sv} />}

            {/* 6. Erklärvideo */}
            {isEssen && (
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
                    YouTube, Vimeo oder direkter Link — wird hier als Embed angezeigt
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'bearbeitung' && (
          <>
            {/* Einrichtungshinweise — Onboarding-Kachel ganz oben */}
            <div className="rounded-xl p-6 mb-6" style={{ background: '#F0F4FF', border: '1px solid #C7D7F9' }}>
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                So richtest du den Benefit „{benefitName}" ein
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { step: '1', title: 'Standort aktivieren', text: 'Lege fest, an welchen Standorten der Benefit verfügbar sein soll.' },
                  { step: '2', title: 'Budget festlegen', text: 'Hinterlege pro Standort, wie viel Budget zur Verfügung steht.' },
                  { step: '3', title: 'Mitarbeiter zuweisen', text: 'Weise den Benefit den passenden Mitarbeitern zu — erst dann haben sie Zugriff.' },
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
                Verfügbarkeit und Budget pro Standort an einer Stelle festlegen.
              </p>

              {/* Table Header */}
              <div className="bg-[#273A5F] px-6 h-12"
                style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.8fr 1fr 1.3fr 1.1fr', gap: '0', minWidth: '650px' }}
              >
                <div className="text-white font-bold text-[14px] uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Standort</div>
                <div className="text-white font-bold text-[14px] uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Verfügbar</div>
                <div className="text-white font-bold text-[14px] uppercase tracking-wide relative" style={{ minWidth: 0 }}>
                  <span className="flex items-center gap-1.5">
                    Budget-Typ
                    <span className="group/tip relative cursor-help inline-flex items-center justify-center rounded-full border border-white text-[14px] leading-none font-normal flex-shrink-0" style={{ width: '17px', height: '17px' }}>
                      ?
                      <span className="pointer-events-none absolute left-0 top-full mt-1.5 hidden group-hover/tip:block bg-white text-[#273A5F] text-[15px] rounded-lg shadow-lg p-3 z-50 normal-case tracking-normal font-normal" style={{ width: '240px', lineHeight: '1.5' }}>
                        <span className="block mb-1.5"><strong>🔄 Auto</strong> — Riso berechnet das Budget automatisch (passt sich jährlich an, du musst nichts tun)</span>
                        <span className="block"><strong>📌 Fix</strong> — Du legst selbst einen festen Betrag pro Monat fest</span>
                      </span>
                    </span>
                  </span>
                </div>
                <div className="text-white font-bold text-[14px] uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Betrag</div>
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
                  style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.8fr 1fr 1.3fr 1.1fr', gap: '0', minWidth: '650px', minHeight: '56px', paddingTop: '8px', paddingBottom: '8px' }}
                >
                  <div className="text-[#000000] text-[14px] overflow-hidden" style={{ minWidth: 0 }}>
                    {location.name} <span className="text-[14px] text-[#9E9E9E]">({location.employeeCount} MA)</span>
                  </div>

                  {/* Verfügbar-Checkbox */}
                  <div className="relative flex items-center" style={{ minWidth: 0 }}>
                    <input
                      type="checkbox"
                      checked={location.enabled}
                      onChange={() => {
                        if (!location.enabled) {
                          // Enabling: open budget modal immediately
                          handleEditLimit(location);
                        } else {
                          // Disabling: just toggle off
                          handleToggleLocation(location.id);
                        }
                      }}
                      className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer hover:border-[#246AFF] transition-colors"
                    />
                    {location.enabled && (
                      <Check size={12} className="absolute left-[3px] text-white pointer-events-none" strokeWidth={3} />
                    )}
                  </div>

                  {/* Budget-Typ Toggle — nur sichtbar wenn Standort aktiviert */}
                  {location.enabled ? (
                    isEssen ? (
                      <div className="flex rounded border border-[#0F429F] overflow-hidden w-fit">
                        <button
                          onClick={() => handleEditLimit({ ...location, budgetType: 'dynamic' })}
                          className={`px-2 py-1 text-[14px] leading-none transition ${locBudgetType === 'dynamic' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >🔄 Auto</button>
                        <button
                          onClick={() => handleEditLimit({ ...location, budgetType: 'fix' })}
                          className={`px-2 py-1 text-[14px] leading-none transition border-l border-[#0F429F] ${locBudgetType === 'fix' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >📌 Fix</button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => handleEditLimit(location)}
                          className="px-3 py-1 border border-[#0F429F] text-[#0F429F] text-[15px] rounded-full hover:bg-[#F0F4FF] transition"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >Bearbeiten</button>
                      </div>
                    )
                  ) : (
                    <div />
                  )}

                  {/* Betrag — nur sichtbar wenn Standort aktiviert */}
                  <div className="text-[#000000] text-[14px] overflow-hidden" style={{ minWidth: 0 }}>
                    {location.enabled && (
                      <span className={`text-[14px] ${locBudgetType === 'dynamic' && isEssen ? 'text-[#0F429F]' : ''}`}>
                        {locBudgetType === 'dynamic' && isEssen ? `Auto — ${location.limit}` : location.limit}
                      </span>
                    )}
                  </div>
                </div>
              );
              })}

              {/* Logging-Bestätigung */}
              {savedConfirm && (
                <div className="mt-4 flex items-center gap-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded-lg px-4 py-3">
                  <span className="text-[#2E7D32] text-[17px]">✅ {savedConfirm}</span>
                  <span className="text-[#666666] text-[15px] ml-auto">Änderung wird geloggt und zum 1. nächsten Monats aktiviert.</span>
                </div>
              )}


              <p className="text-[14px] text-[#666666] mt-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Ein Standort ist für dieses Benefit aktiv, wenn der Haken gesetzt <strong>und</strong> ein Budget
                hinterlegt ist. Das allein reicht aber nicht — Mitarbeiter erhalten das Benefit erst, wenn sie zusätzlich
                im Abschnitt „Einem Mitarbeiter zuweisen" weiter unten zugewiesen wurden.
              </p>

              {locations.length === 0 && (
                <div className="mt-4 bg-[#FFF8E1] border border-[#FFD54F] rounded-lg px-4 py-3">
                  <p className="text-[17px] text-[#8D6E00]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    ⚠️ Noch keine Standorte angelegt. Bitte zuerst unter <strong>Standortverwaltung</strong> mindestens
                    einen Standort einrichten — erst danach kann dieses Benefit dort aktiviert werden.
                  </p>
                </div>
              )}
            </div>

            {/* Einem Mitarbeiter zuweisen */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Den Benefit „{benefitName}" einem Mitarbeiter zuweisen
              </h2>

              {assignStep === 'confirmation' && lastAssigned ? (
                <div className="text-center py-6">
                  <div className="text-[56px] mb-3">✅</div>
                  <h3 className="text-[17px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Zuweisung eingereicht
                  </h3>
                  <p className="text-[14px] text-[#666666] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Wird von Riso geprüft. Verfügbar für{' '}
                    <strong className="text-[#273A5F]">{lastAssigned.employee}</strong>{' '}
                    am <strong className="text-[#273A5F]">{lastAssigned.availableFrom}</strong>.
                  </p>
                  <p className="text-[14px] text-[#9E9E9E] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Du kannst die Zuweisung bis zum Monatsende stornieren.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setAssignments((prev) => prev.filter((a) => a.id !== lastAssigned.id))}
                      className="px-6 py-2 border border-[#F44336] text-[#F44336] text-[17px] rounded-full hover:bg-[#FFEBEE] transition"
                      style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
                    >
                      🗑 Stornieren
                    </button>
                    <button
                      onClick={handleNewAssignment}
                      className="px-6 py-2 bg-[#0F429F] text-white text-[17px] rounded-full hover:bg-[#246AFF] transition"
                      style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
                    >
                      Weitere Zuweisung anlegen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Standort</label>
                      <select
                        value={assignLocationId}
                        onChange={(e) => { setAssignLocationId(e.target.value); setAssignEmployee(''); setAssignAmount(''); setAssignError(''); }}
                        className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <option value="">Standort wählen…</option>
                        {locations.some(loc => loc.enabled) && (
                          <option value="all">🏢 Alle aktiven Standorte</option>
                        )}
                        {locations.filter(loc => loc.enabled).map((loc) => (
                          <option key={loc.id} value={loc.id}>{loc.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Mitarbeiter</label>
                      <select
                        value={assignEmployee}
                        onChange={(e) => {
                          const val = e.target.value;
                          setAssignEmployee(val);
                          if (val && val !== 'all') {
                            const loc = (assignLocationId && assignLocationId !== 'all')
                              ? locations.find(l => l.id === assignLocationId)
                              : locations.find(l => l.enabled);
                            if (loc) handleEditLimit(loc);
                          }
                        }}
                        disabled={!assignLocationId}
                        className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F] disabled:bg-[#F5F5F5] disabled:border-[#E0E0E0] disabled:text-[#9E9E9E]"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <option value="">Mitarbeiter wählen…</option>
                        {assignLocationId && (
                          <option value="all">👥 Alle aktiven Mitarbeiter{isAllLocations ? '' : ` (${assignLocationLabel})`}</option>
                        )}
                        {assignableEmployees.map((emp) => (
                          <option key={emp} value={emp}>{emp}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {isEssen ? 'Budget pro Monat' : 'Betrag'}
                      </label>
                      {isEssen && (
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                          <div className="flex rounded border border-[#0F429F] overflow-hidden w-fit">
                            <button
                              type="button"
                              onClick={() => {
                                const loc = (assignLocationId && assignLocationId !== 'all')
                                  ? locations.find(l => l.id === assignLocationId)
                                  : locations.find(l => l.enabled);
                                if (loc) { handleEditLimit(loc); }
                                setAssignBudgetType('dynamic');
                              }}
                              className={`px-2 py-1 text-[14px] leading-none transition ${assignBudgetType === 'dynamic' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >🔄 Auto</button>
                            <button
                              type="button"
                              onClick={() => {
                                const loc = (assignLocationId && assignLocationId !== 'all')
                                  ? locations.find(l => l.id === assignLocationId)
                                  : locations.find(l => l.enabled);
                                if (loc) { handleEditLimit(loc); }
                                setAssignBudgetType('fix');
                              }}
                              className={`px-2 py-1 text-[14px] leading-none transition border-l border-[#0F429F] ${assignBudgetType === 'fix' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >📌 Fix</button>
                          </div>
                          <span className="text-[15px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            Gesetzl. Max. 2026: 115,50 €
                          </span>
                        </div>
                      )}
                      {!assignIsAuto && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            value={assignAmount}
                            onChange={(e) => { setAssignAmount(e.target.value); setAssignError(''); }}
                            placeholder="z.B. 115"
                            className={`w-32 h-[40px] px-3 border ${assignError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          />
                          <span className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>€</span>
                        </div>
                      )}
                      {assignError && <p className="text-[14px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{assignError}</p>}
                    </div>
                    <div>
                      <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Gültig ab</label>
                      <select
                        value={assignMonth}
                        onChange={(e) => setAssignMonth(e.target.value)}
                        className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        <option value="">Monat wählen…</option>
                        {UPCOMING_MONTHS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleAssignSubmit}
                      disabled={!isAssignFormValid}
                      className="px-8 py-3 bg-[#0F429F] text-white font-medium hover:bg-[#246AFF] transition disabled:bg-[#9E9E9E] disabled:cursor-not-allowed"
                      style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
                    >
                      Zuweisung einreichen →
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Bisherige Zuweisungen — standalone section */}
            {assignments.length > 0 && (
              <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-[17px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Bisherige Zuweisungen
                  </h2>
                  <div className="flex gap-4 text-[13px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <span style={{ color: '#F57F17' }}>⏳ Ausstehend — aktiv ab 1. des Monats</span>
                    <span style={{ color: '#2E7D32' }}>✅ Aktiv — Benefit läuft</span>
                  </div>
                </div>
                <p className="text-[14px] text-[#666666] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Alle eingereichten Zuweisungen für dieses Benefit.
                </p>

                <div className="bg-[#FFF8E1] border border-[#FFD54F] rounded-lg px-4 py-3 mb-4">
                  <p className="text-[14px] text-[#8D6E00]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    ⚠️ Eine neuere Zuweisung für denselben Mitarbeiter überschreibt automatisch die ältere.
                  </p>
                </div>

                {/* Column Headers */}
                <div
                  className="px-4 py-2 rounded-t-lg"
                  style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1fr 1fr 1fr', background: '#273A5F' }}
                >
                  {['Standort', 'Mitarbeiter', 'Budget', 'Gültig ab', 'Status'].map(h => (
                    <span key={h} className="text-white font-bold text-[13px] uppercase tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</span>
                  ))}
                </div>

                {/* Rows */}
                {(showOlderAssignments ? assignments : assignments.slice(0, 10)).map((a, index) => {
                  const isAllEmployees = a.employeeName === 'Alle Mitarbeiter';
                  const locId = locations.find(l => l.name === a.locationName)?.id;
                  const locLimit = locId ? locations.find(l => l.id === locId)?.limit?.replace('€/Monat', '').trim() : null;
                  const expandedEmployeesWithLoc = isAllEmployees
                    ? (locId
                      ? (MOCK_EMPLOYEES[locId] ?? []).map(emp => ({ emp, empLocId: locId, empLocName: a.locationName }))
                      : enabledLocationIds.flatMap(id => (MOCK_EMPLOYEES[id] ?? []).map(emp => ({
                          emp,
                          empLocId: id,
                          empLocName: locations.find(l => l.id === id)?.name ?? id,
                        }))))
                    : [];
                  const isExpanded = expandedAssignmentIds.has(a.id);
                  return (
                    <div key={a.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'} style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <div
                        className="px-4 py-3 items-center"
                        style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1fr 1fr 1fr' }}
                      >
                        <span className="text-[14px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.locationName}</span>
                        <div>
                          {isAllEmployees ? (
                            <button
                              onClick={() => setExpandedAssignmentIds(prev => {
                                const next = new Set(prev);
                                if (next.has(a.id)) next.delete(a.id); else next.add(a.id);
                                return next;
                              })}
                              className="flex items-center gap-1 text-[14px] text-[#0F429F] hover:underline"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Alle aktiven Mitarbeiter ({expandedEmployeesWithLoc.length})
                              <span>{isExpanded ? '▲' : '▼'}</span>
                            </button>
                          ) : (
                            <span className="text-[14px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.employeeName}</span>
                          )}
                        </div>
                        <span className="text-[14px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          {a.budgetType === 'dynamic'
                            ? (locLimit ? `🔄 ${locLimit} €` : '🔄 Standortabhängig')
                            : `📌 ${a.amount} €`}
                        </span>
                        <span className="text-[14px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          {a.availableFrom}
                        </span>
                        <span className="text-[13px] font-medium px-2 py-1 rounded-full inline-block" style={{ background: '#FFF8E1', color: '#F57F17', border: '1px solid #FFD54F', fontFamily: 'Roboto, sans-serif' }}>
                          ⏳ Ausstehend
                        </span>
                      </div>
                      {isAllEmployees && isExpanded && expandedEmployeesWithLoc.length > 0 && (
                        <div className="px-4 pb-3 bg-[#F0F4FF]">
                          {expandedEmployeesWithLoc.map(({ emp, empLocId, empLocName }, empIdx) => {
                            const empLimit = locations.find(l => l.id === empLocId)?.limit?.replace('€/Monat', '').trim();
                            return (
                              <div
                                key={`${empLocId}-${emp}`}
                                className="px-4 py-2"
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns: '1.2fr 1.4fr 1fr 1fr 1fr',
                                  borderBottom: empIdx < expandedEmployeesWithLoc.length - 1 ? '1px solid #C7D7F9' : 'none',
                                }}
                              >
                                <span className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>{empLocName}</span>
                                <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{emp}</span>
                                <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                  {a.budgetType === 'dynamic' ? `🔄 ${empLimit ?? '—'} €` : `📌 ${a.amount} €`}
                                </span>
                                <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.availableFrom}</span>
                                <span className="text-[12px] font-medium px-2 py-0.5 rounded-full inline-block self-center" style={{ background: '#FFF8E1', color: '#F57F17', border: '1px solid #FFD54F', fontFamily: 'Roboto, sans-serif' }}>
                                  ⏳ Ausstehend
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {assignments.length > 10 && (
                  <div className="pt-3 text-center">
                    <button
                      onClick={() => setShowOlderAssignments(!showOlderAssignments)}
                      className="text-[14px] text-[#0F429F] hover:underline"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      {showOlderAssignments
                        ? '▲ Weniger anzeigen'
                        : `▼ Ältere Zuweisungen ansehen (${assignments.length - 10} weitere)`}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Nutzungsstatistik — ganz unten */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Nutzungsstatistik
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 text-center">
                  <p className="text-[15px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {stats.employeesWithAccess}
                  </p>
                  <p className="text-[14px] text-[#666666] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Mitarbeiter mit Zugriff
                  </p>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 text-center">
                  <p className="text-[15px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {stats.budgetThisMonth.toLocaleString('de-DE')}€
                  </p>
                  <p className="text-[14px] text-[#666666] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Budget (diesen Monat)
                  </p>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 text-center">
                  <p className="text-[15px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {stats.usedThisMonth.toLocaleString('de-DE')}€
                  </p>
                  <p className="text-[14px] text-[#666666] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Genutzt (diesen Monat)
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center mt-8">
              <button
                onClick={handleSave} className="px-8 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#246AFF] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Speichern
              </button>
            </div>
          </>
        )}

        {/* 📌 PHASE 2 (Philipp-Feedback 2026-06-08): FAQs hier sind nur ein Platzhalter.
            Geplant: FAQ-Inhalte zentral in Zoho Desk pflegen (getaggt nach Zielgruppe + Benefit + Kanal),
            dynamisches Laden statt hartcodierter Einträge — Machbarkeit mit Nalini/Skiy31 klären. */}
        {activeTab === 'faqs' && (
          <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
            <h2 className="text-[17px] font-bold text-[#273A5F] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Häufige Fragen
            </h2>
            <div className="space-y-3">
              {isEssen && (
                <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4">
                  <p className="text-[14px] font-medium text-[#273A5F] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Wie hoch ist das gesetzliche Tageslimit für den Essensbenefit?
                  </p>
                  <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
                    Der Essenszuschuss ist steuerfrei bis zu 7,67 € pro Arbeitstag — das entspricht bis zu 115 € im Monat.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'faqs' && isEssen && (
          <div className="rounded-xl p-6 mb-6" style={{ background: '#E3F2FD', border: '1px solid #90CAF9' }}>
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-[17px] font-bold text-[#273A5F] mb-2">Beratung anfragen</h2>
                <p className="text-[14px] text-[#273A5F]" style={{ lineHeight: '1.6' }}>
                  Du möchtest den Essenszuschuss einrichten oder hast Fragen zur Umsetzung? Unser Team begleitet dich durch den gesamten Prozess — von der Standort-Konfiguration bis zur Abrechnung.
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
        )}
      </div>

      {/* Modal 1: Budget bearbeiten */}
      {showLimitModal && editingLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-[17px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Budget bearbeiten — {benefitName} — {editingLocation.name}
            </h3>

            {isEssen ? (
              <div className="mb-4 space-y-4">
                {/* Fix / Dynamisch Toggle */}
                <div>
                  <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Budget-Typ
                  </label>
                  <div className="flex rounded-lg border border-[#0F429F] overflow-hidden w-fit">
                    <button
                      onClick={() => { setEssenBudgetType('dynamic'); setLimitError(''); }}
                      className={`px-4 py-2 text-[17px] transition ${essenBudgetType === 'dynamic' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      🔄 Auto
                    </button>
                    <button
                      onClick={() => { setEssenBudgetType('fix'); setLimitError(''); }}
                      className={`px-4 py-2 text-[17px] transition border-l border-[#0F429F] ${essenBudgetType === 'fix' ? 'bg-[#0F429F] text-white font-medium' : 'bg-white text-[#0F429F] hover:bg-[#F0F4FF]'}`}
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      📌 Fix
                    </button>
                  </div>
                  <p className="text-[15px] text-[#9E9E9E] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {essenBudgetType === 'dynamic'
                      ? 'Riso berechnet das Budget automatisch aus Tagessatz und Arbeitstagen — passt sich jedes Jahr von selbst an'
                      : 'Du gibst einen festen Betrag pro Monat vor — der bleibt so, bis du ihn änderst'}
                  </p>
                </div>
                {essenBudgetType === 'dynamic' ? (
                  <>
                    {/* Arbeitstage — editierbar */}
                    <div>
                      <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Anzahl von Arbeitstagen
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
                        <span className="text-[14px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          (gesetzl. Max: 15)
                        </span>
                      </div>
                      {limitError && (
                        <p className="text-[14px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{limitError}</p>
                      )}
                    </div>

                    {/* Tagessatz — gesperrt */}
                    <div>
                      <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Tagessatz
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={`${dailyRate} €`}
                          disabled
                          className="w-28 h-[40px] px-3 py-2 border border-[#E0E0E0] rounded text-[14px] bg-[#F5F5F5] text-[#9E9E9E]"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                        <span className="text-[14px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          (gesetzl. Maximum)
                        </span>
                      </div>
                    </div>

                    {/* Auto-berechnetes Budget */}
                    <div className="bg-[#F0F4FF] border border-[#C7D7F9] rounded p-3">
                      <p className="text-[17px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Monatliches Budget:{' '}
                        <strong>{Math.round(workingDays * dailyRate * 100) / 100} €</strong>
                        <span className="text-[15px] text-[#9E9E9E] ml-1">({workingDays} × {dailyRate} €)</span>
                      </p>
                    </div>
                  </>
                ) : (
                  /* Fix: einfaches Betrag-Feld */
                  <div>
                    <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
                      <p className="text-[14px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{limitError}</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-[15px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
                  <p className="text-[14px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{limitError}</p>
                )}
              </div>
            )}

            <p className="text-[14px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Änderung gilt ab 1. nächsten Monat.
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

    </div>
  );
}
