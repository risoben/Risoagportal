import { useState, useMemo } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { BenefitTaxInfo } from './BenefitTaxInfo';
import { StatusBadge } from './Table';
import { benefitsSettingsData } from './benefitSettingsData';
import { EMPLOYEES_BY_LOCATION, EMPLOYEE_PROFILES } from './employeeProfiles';

interface Location {
  id: string;
  name: string;
  limit: string;
  employeeCount: number;
  enabled: boolean;
  budgetType?: 'dynamic' | 'fix';
  address?: string;
}

interface KindEntry {
  id: string;
  name: string;
  geschlecht: string;
  geburtsdatum: string;
  kindergartenName: string;
  kindergartenAdresse: string;
  bestaetigtNichtSchulpflichtig: boolean;
  bestaetigtPartnerKeinZuschuss: boolean;
}

const NEW_KIND_ENTRY = (): KindEntry => ({
  id: String(Date.now() + Math.random()),
  name: '',
  geschlecht: '',
  geburtsdatum: '',
  kindergartenName: '',
  kindergartenAdresse: '',
  bestaetigtNichtSchulpflichtig: false,
  bestaetigtPartnerKeinZuschuss: false,
});

interface PendelDaten {
  wohnadresse: string;
  arbeitsadresse: string;
  keineArbeitsadresse: boolean;
  entfernungKm: string;
  tageProMonat: string;
  pendelArt: string;
}

const NEW_PENDEL_DATEN = (): PendelDaten => ({
  wohnadresse: '',
  arbeitsadresse: '',
  keineArbeitsadresse: false,
  entfernungKm: '',
  tageProMonat: '',
  pendelArt: '',
});

// Fahrtkosten — gesetzliche Obergrenze (Quelle: §9 Abs.1 Nr.4 / §40 Abs.2 EStG, Haufe, Stand 2026).
// Pkw-Pfad (15 % Pauschalierung) → KEIN 4.500-€-Deckel. Wird ERST aus den Mitarbeiter-Angaben
// (Pendelstrecke) berechnet — der AG setzt vorab nur ein optionales Limit (fixer Wert) oder keins.
// Effektive Auszahlung später = min(AG-Limit, dieser gesetzliche Max).
const FAHRTKOSTEN_KM_RATE = 0.38;        // €/km ab dem 1. km (einheitlich seit 01.01.2026)
const FAHRTKOSTEN_MAX_TAGE = 15;         // monatliche Vereinfachungsregel (R 40.2 LStR)

function computeFahrtkostenMax(p?: PendelDaten): { max: number; cappedTage: number } | null {
  if (!p) return null;
  const km = parseFloat((p.entfernungKm || '').replace(',', '.'));
  const tage = parseInt(p.tageProMonat || '', 10);
  if (isNaN(km) || isNaN(tage) || km <= 0 || tage <= 0) return null;
  const cappedTage = Math.min(tage, FAHRTKOSTEN_MAX_TAGE);
  const max = km * FAHRTKOSTEN_KM_RATE * cappedTage;
  return { max: Math.round(max * 100) / 100, cappedTage };
}

interface IndividualAssignment {
  id: string;
  employeeName: string;
  locationName: string;
  amount: number;
  budgetType: 'dynamic' | 'fix';
  month: string;
  availableFrom: string;
  kinder?: KindEntry[];
  pendelDaten?: PendelDaten;
  selfEntryDelegated?: boolean;
  kinderAnzahlErwartet?: number;
}

// Mitarbeiter + Profile zentral aus employeeProfiles.ts (Single Source of Truth)
const MOCK_EMPLOYEES = EMPLOYEES_BY_LOCATION;


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
  const benefitName = customName || benefitData?.name || 'Mittagessen';
  const benefitDescription = customDescription || benefitData?.description || 'Das Mittagessen ermöglicht Mitarbeitern die Nutzung von Essensgutscheinen oder direkten Verpflegungszuschüssen.';
  // Beispiel-Budget für die Mock-Daten: festes Max (Internet/Sachbezug) ODER ÖPNV ~Deutschlandticket (58 €)
  const _exampleBudget = benefitData?.maxBudgetPerEmployee ?? (benefitId === 'oepnv' ? 58 : benefitId === 'commuting' ? 60 : undefined);
  const _fmtEuro = (v: number) => `${v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €/Monat`;
  const defaultLocations = customLocations || benefitData?.locations || (_exampleBudget !== undefined
    ? [
        // Benefits mit festem €-Maximum (z. B. Internet, Sachbezug): Beispiel-Budgets ≤ Maximum, fix
        { id: '1', name: 'München', limit: _fmtEuro(_exampleBudget), employeeCount: 34, enabled: true, budgetType: 'fix' as const, address: 'Fürstenrieder Straße 279A, 81377 München' },
        { id: '2', name: 'Heddesheim', limit: _fmtEuro(Math.max(_exampleBudget - 10, 5)), employeeCount: 15, enabled: true, budgetType: 'fix' as const, address: 'Industriestraße 12, 68542 Heddesheim' },
        { id: '3', name: 'Berlin', limit: _fmtEuro(Math.max(_exampleBudget - 20, 5)), employeeCount: 8, enabled: true, budgetType: 'fix' as const, address: 'Torstraße 48, 10119 Berlin' },
        { id: '4', name: 'Viernheim', limit: _fmtEuro(_exampleBudget), employeeCount: 5, enabled: false, budgetType: 'fix' as const, address: 'Lorscher Straße 5, 68519 Viernheim' },
      ]
    : [
        { id: '1', name: 'München', limit: '115,05 €/Monat', employeeCount: 34, enabled: true, budgetType: 'dynamic' as const, address: 'Fürstenrieder Straße 279A, 81377 München' },
        { id: '2', name: 'Heddesheim', limit: '115,05 €/Monat', employeeCount: 15, enabled: true, budgetType: 'dynamic' as const, address: 'Industriestraße 12, 68542 Heddesheim' },
        { id: '3', name: 'Berlin', limit: '85,00 €/Monat', employeeCount: 8, enabled: true, budgetType: 'fix' as const, address: 'Torstraße 48, 10119 Berlin' },
        { id: '4', name: 'Viernheim', limit: '115,05 €/Monat', employeeCount: 5, enabled: false, budgetType: 'dynamic' as const, address: 'Lorscher Straße 5, 68519 Viernheim' },
      ]);
  const defaultStats = customStats || benefitData?.stats || {
    employeesWithAccess: 62,
    budgetThisMonth: 4200,
    usedThisMonth: 3100,
  };
  const isEssen = benefitName === 'Mittagessen' || benefitName.toLowerCase().includes('essen');
  const dailyRate = 7.67;
  const taxInfo = benefitData?.taxInfo ?? benefitsSettingsData['mittagessen']?.taxInfo;
  const highlightBoxes = benefitData?.highlightBoxes ?? [];
  const wieFunktioniert = benefitData?.wieFunktioniert;
  const belegprinzip = benefitData?.belegprinzip;
  const vorteile = benefitData?.vorteile;
  const personas = benefitData?.personas;
  const faqs = benefitData?.faqs ?? [];
  const maxBudgetPerEmployee = benefitData?.maxBudgetPerEmployee;
  const isYearlyBudget = benefitData?.isYearlyBudget ?? false;
  const hasKinderField = benefitData?.hasKinderField ?? false;
  const hasPendelstreckeField = benefitData?.hasPendelstreckeField ?? false;
  const hasDelegatableField = hasKinderField || hasPendelstreckeField;
  const zuweisungenGridCols = hasKinderField
    ? '1.1fr 1.3fr 0.6fr 0.9fr 0.9fr 0.9fr 0.9fr'
    : hasPendelstreckeField
      ? '1fr 1.2fr 1.1fr 0.8fr 0.8fr 0.8fr 0.9fr'
      : '1.2fr 1.4fr 1fr 1fr 1fr 0.9fr';

  const delegatableCellContent = (a: IndividualAssignment): { text: string; title?: string } => {
    if (a.selfEntryDelegated) {
      if (hasKinderField && a.kinderAnzahlErwartet) {
        return { text: `${a.kinderAnzahlErwartet} erwartet`, title: 'Mitarbeiter trägt die Kinder-Angaben selbst in der Riso-App ein.' };
      }
      return { text: 'Mitarbeiter trägt ein' };
    }
    if (hasKinderField) {
      const count = a.kinder?.length ?? 0;
      return {
        text: count ? `${count} ${count === 1 ? 'Kind' : 'Kinder'}` : '—',
        title: a.kinder?.map(k => k.name || '(ohne Namen)').join(', '),
      };
    }
    if (hasPendelstreckeField) {
      const p = a.pendelDaten;
      if (!p) return { text: '—' };
      return { text: p.entfernungKm ? `${p.entfernungKm} km` : '—', title: `${p.pendelArt || '—'} · ${p.tageProMonat || '—'} Tage/Monat` };
    }
    return { text: '—' };
  };

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
  const [assignments, setAssignments] = useState<IndividualAssignment[]>(_exampleBudget !== undefined
    ? [
        // Benefits mit festem €-Maximum: Beispiel-Beträge ≤ Maximum, fix
        { id: 'mock-1', employeeName: 'Anna Müller', locationName: 'München', amount: _exampleBudget, budgetType: 'fix', month: 'Juli 2026', availableFrom: '1. Juli 2026' },
        { id: 'mock-3', employeeName: 'Tom Schmidt', locationName: 'München', amount: Math.max(_exampleBudget - 10, 5), budgetType: 'fix', month: 'August 2026', availableFrom: '1. August 2026' },
        { id: 'mock-5', employeeName: 'Lisa Weber', locationName: 'Berlin', amount: Math.max(_exampleBudget - 20, 5), budgetType: 'fix', month: 'September 2026', availableFrom: '1. September 2026' },
      ]
    : [
        { id: 'mock-1', employeeName: 'Anna Müller', locationName: 'München', amount: 0, budgetType: 'dynamic', month: 'Juli 2026', availableFrom: '1. Juli 2026' },
        { id: 'mock-2', employeeName: 'Alle Mitarbeiter', locationName: 'Heddesheim', amount: 0, budgetType: 'dynamic', month: 'Juli 2026', availableFrom: '1. Juli 2026' },
        { id: 'mock-3', employeeName: 'Tom Schmidt', locationName: 'München', amount: 95, budgetType: 'fix', month: 'August 2026', availableFrom: '1. August 2026' },
        { id: 'mock-4', employeeName: 'Sara Becker', locationName: 'München', amount: 0, budgetType: 'dynamic', month: 'August 2026', availableFrom: '1. August 2026' },
        { id: 'mock-5', employeeName: 'Lisa Weber', locationName: 'Berlin', amount: 85, budgetType: 'fix', month: 'September 2026', availableFrom: '1. September 2026' },
      ]);
  const [assignLocationId, setAssignLocationId] = useState('');
  const [assignEmployee, setAssignEmployee] = useState('');
  const [assignAmount, setAssignAmount] = useState('');
  const [assignKinderList, setAssignKinderList] = useState<KindEntry[]>([]);
  const [assignPendelDaten, setAssignPendelDaten] = useState<PendelDaten>(NEW_PENDEL_DATEN());
  const [assignDelegateEntry, setAssignDelegateEntry] = useState(false);
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
  const isBulkEmployee = assignEmployee === 'all';
  const employeeKinderCount = (hasKinderField && assignEmployee && !isBulkEmployee)
    ? (EMPLOYEE_PROFILES[assignEmployee]?.children ?? 0)
    : null;
  const kinderListValid = !hasKinderField || isBulkEmployee || (
    employeeKinderCount !== null && employeeKinderCount > 0 &&
    assignKinderList.length === employeeKinderCount &&
    assignKinderList.every(k => k.name.trim() && k.geburtsdatum.trim() && k.bestaetigtNichtSchulpflichtig && k.bestaetigtPartnerKeinZuschuss)
  );
  const pendelValid = !hasPendelstreckeField || !!(
    assignPendelDaten.wohnadresse.trim() &&
    (assignPendelDaten.keineArbeitsadresse || assignPendelDaten.arbeitsadresse.trim()) &&
    assignPendelDaten.entfernungKm.trim() &&
    assignPendelDaten.tageProMonat.trim() &&
    assignPendelDaten.pendelArt.trim()
  );
  const delegatedKinderValid = !hasKinderField || isBulkEmployee || (employeeKinderCount !== null && employeeKinderCount > 0);
  const detailFieldsValid = !hasDelegatableField || (assignDelegateEntry ? delegatedKinderValid : (kinderListValid && pendelValid));
  // Fahrtkosten: Betrag ist optional (AG kann ein Limit setzen ODER keins — dann schöpft der MA das
  // gesetzliche Maximum aus, berechnet nach seinen Angaben). Bei allen anderen Fix-Benefits Pflicht.
  const amountOptional = assignIsAuto || hasPendelstreckeField;
  // Live-Vorschau der gesetzlichen Obergrenze, sobald die Pendelstrecke-Angaben vorliegen
  const fahrtkostenMax = (hasPendelstreckeField && !assignDelegateEntry) ? computeFahrtkostenMax(assignPendelDaten) : null;
  const isAssignFormValid = !!(assignLocationId && assignEmployee && assignMonth && (amountOptional || assignAmount.trim()) && detailFieldsValid);

  const handleAssignSubmit = () => {
    let numValue = 0;
    if (!assignIsAuto) {
      const amountEntered = assignAmount.trim() !== '';
      if (!amountEntered) {
        // Pflicht bei normalen Fix-Benefits; bei Fahrtkosten erlaubt = "kein Limit"
        if (!amountOptional) { setAssignError('Betrag ist erforderlich'); return; }
        // Fahrtkosten ohne Limit: kein AG-Deckel — der MA schöpft das gesetzliche Maximum
        // (km × 0,38 € × max. 15 Tage, kein Deckel) nach seinen Angaben aus.
      } else {
        numValue = parseFloat(assignAmount.replace(',', '.'));
        if (isNaN(numValue)) { setAssignError('Betrag ist erforderlich'); return; }
        if (numValue <= 0) { setAssignError('Betrag muss größer als 0 sein'); return; }
        if (maxBudgetPerEmployee !== undefined && numValue > maxBudgetPerEmployee) {
          const maxLabel = `${maxBudgetPerEmployee.toString().replace('.', ',')} €${isYearlyBudget ? '/Jahr' : '/Monat'}`;
          setAssignError(`Betrag überschreitet das gesetzliche Maximum von ${maxLabel}`);
          return;
        }
        if (assignLocationId && assignLocationId !== 'all') {
          const loc = locations.find(l => l.id === assignLocationId);
          if (loc) {
            const locMax = parseFloat(loc.limit.replace('€/Monat', '').replace(',', '.').trim());
            if (!isNaN(locMax) && numValue > locMax) {
              setAssignError('Budget überschreitet das Standortbudget.');
              return;
            }
          }
        }
      }
    }
    if (!detailFieldsValid) {
      setAssignError(hasKinderField
        ? (employeeKinderCount === 0
            ? 'Für diesen Mitarbeiter sind im Mitarbeiterprofil keine Kinder hinterlegt. Bitte zuerst dort ein Kind anlegen.'
            : 'Bitte für jedes Kind Name, Geburtsdatum und beide Bestätigungen ausfüllen.')
        : 'Bitte Wohnadresse, Entfernung, Pendeltage und Pendelart angeben, oder die Eingabe an den Mitarbeiter übergeben.');
      return;
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
      kinder: hasKinderField && !assignDelegateEntry ? assignKinderList : undefined,
      pendelDaten: hasPendelstreckeField && !assignDelegateEntry ? assignPendelDaten : undefined,
      selfEntryDelegated: hasDelegatableField ? assignDelegateEntry : undefined,
      kinderAnzahlErwartet: hasKinderField && assignDelegateEntry ? (employeeKinderCount ?? undefined) : undefined,
    }, ...prev]);
    setLastAssigned({ id: newId, employee: employeeLabel, availableFrom });
    setAssignStep('confirmation');
  };

  const handleNewAssignment = () => {
    setAssignStep('form');
    setAssignLocationId('');
    setAssignEmployee('');
    setAssignAmount('');
    setAssignKinderList([]);
    setAssignPendelDaten(NEW_PENDEL_DATEN());
    setAssignDelegateEntry(false);
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
        setSavedConfirm(`${editingLocation.name}: Änderung gespeichert, wird ab dem 1. des nächsten Monats wirksam.`);
      }
    } else {
      if (!limitValue.trim()) { setLimitError('Feld erforderlich'); return; }
      const numValue = parseFloat(limitValue);
      if (isNaN(numValue)) { setLimitError('Nur Zahlen erlaubt'); return; }
      if (numValue < 0) { setLimitError('Betrag kann nicht negativ sein'); return; }
      if (maxBudgetPerEmployee !== undefined && numValue > maxBudgetPerEmployee) {
        const maxLabel = `${maxBudgetPerEmployee.toString().replace('.', ',')} €${isYearlyBudget ? '/Jahr' : '/Monat'}`;
        setLimitError(`Betrag überschreitet das gesetzliche Maximum von ${maxLabel}`);
        return;
      }
      if (editingLocation) {
        setLocations(locations.map((loc) =>
          loc.id === editingLocation.id
            ? { ...loc, limit: `${limitValue}€/Monat`, budgetType: essenBudgetType, enabled: true }
            : loc
        ));
        setSavedConfirm(`${editingLocation.name}: Änderung gespeichert, wird ab dem 1. des nächsten Monats wirksam.`);
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
              Status-Änderung gilt ab dem 1. des nächsten Monats
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
                {benefitDescription}
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
                {/* Paarweises Grid: AG- & MA-Kachel je Zeile teilen sich dieselbe Zeilenhöhe (grid stretch) */}
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

            {/* 4. Vorteile für Arbeitgeber */}
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

            {/* 5. Personas */}
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

            {/* 6. Steuerliche Behandlung */}
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
          <>
            {/* Einrichtungshinweise — Onboarding-Kachel ganz oben */}
            <div className="rounded-xl p-6 mb-6" style={{ background: '#F0F4FF', border: '1px solid #C7D7F9' }}>
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                So richtest du den Benefit {benefitName} ein
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { step: '1', title: 'Standort aktivieren', text: 'Lege fest, an welchen Standorten der Benefit verfügbar sein soll.' },
                  { step: '2', title: 'Budget festlegen', text: 'Hinterlege pro Standort, wie viel Budget zur Verfügung steht.' },
                  { step: '3', title: 'Mitarbeiter zuweisen', text: 'Weise den Benefit den passenden Mitarbeitern zu, erst dann haben sie Zugriff.' },
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
                Verfügbarkeit und Budget pro Standort hier festlegen:
              </p>

              {/* Table Header */}
              <div className="bg-[#273A5F] px-6 h-12"
                style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.8fr 1fr 1.3fr 1.1fr', gap: '0', minWidth: '650px' }}
              >
                <div className="text-white font-bold text-[14px] uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Standort</div>
                <div className="text-white font-bold text-[14px] uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Verfügbar</div>
                {isEssen ? (
                  <>
                    <div className="text-white font-bold text-[14px] uppercase tracking-wide relative" style={{ minWidth: 0 }}>
                      <span className="flex items-center gap-1.5">
                        Budget-Typ
                        <span className="group/tip relative cursor-help inline-flex items-center justify-center rounded-full border border-white text-[14px] leading-none font-normal flex-shrink-0" style={{ width: '17px', height: '17px' }}>
                          ?
                          <span className="pointer-events-none absolute left-0 top-full mt-1.5 hidden group-hover/tip:block bg-white text-[#273A5F] text-[15px] rounded-lg shadow-lg p-3 z-50 normal-case tracking-normal font-normal" style={{ width: '240px', lineHeight: '1.5' }}>
                            <span className="block mb-1.5"><strong>🔄 Auto</strong>, Riso berechnet das Budget automatisch (passt sich jährlich an, du musst nichts tun)</span>
                            <span className="block"><strong>📌 Fix</strong>, Du legst selbst einen festen Betrag pro Monat fest</span>
                          </span>
                        </span>
                      </span>
                    </div>
                    <div className="text-white font-bold text-[14px] uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Betrag</div>
                  </>
                ) : (
                  <>
                    <div className="text-white font-bold text-[14px] uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Betrag</div>
                    <div className="overflow-hidden" style={{ minWidth: 0 }} />
                  </>
                )}
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

                  {isEssen ? (
                    <>
                      {/* Budget-Typ Toggle — nur sichtbar wenn Standort aktiviert */}
                      {location.enabled ? (
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
                        <div />
                      )}

                      {/* Betrag — nur sichtbar wenn Standort aktiviert */}
                      <div className="text-[#000000] text-[14px] overflow-hidden" style={{ minWidth: 0 }}>
                        {location.enabled && (
                          <span className={`text-[14px] ${locBudgetType === 'dynamic' ? 'text-[#0F429F]' : ''}`}>
                            {locBudgetType === 'dynamic' ? `Auto, ${location.limit}` : location.limit}
                          </span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Betrag — nur sichtbar wenn Standort aktiviert */}
                      <div className="text-[#000000] text-[14px] overflow-hidden" style={{ minWidth: 0 }}>
                        {location.enabled && <span className="text-[14px]">{location.limit}</span>}
                      </div>

                      {/* Bearbeiten — kein Spalten-Header, nur sichtbar wenn Standort aktiviert */}
                      <div className="overflow-hidden" style={{ minWidth: 0 }}>
                        {location.enabled && (
                          <button
                            onClick={() => handleEditLimit(location)}
                            className="px-3 py-1 border border-[#0F429F] text-[#0F429F] text-[15px] rounded-full hover:bg-[#F0F4FF] transition"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >Bearbeiten</button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
              })}

              {/* Logging-Bestätigung */}
              {savedConfirm && (
                <div className="mt-4 flex items-center gap-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded-lg px-4 py-3">
                  <span className="text-[#2E7D32] text-[17px]">✅ {savedConfirm}</span>
                  <span className="text-[#666666] text-[15px] ml-auto">Änderung gilt ab dem 1. des nächsten Monats.</span>
                </div>
              )}


              <p className="text-[14px] text-[#666666] mt-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Ein Standort ist für diesen Benefit aktiv, wenn der Haken gesetzt <strong>und</strong> ein Budget
                hinterlegt ist. Das allein reicht aber nicht, Mitarbeiter erhalten den Benefit erst, wenn sie zusätzlich
                im Abschnitt „Einem Mitarbeiter zuweisen" weiter unten zugewiesen wurden.
              </p>

              {locations.length === 0 && (
                <div className="mt-4 bg-[#FFF8E1] border border-[#FFD54F] rounded-lg px-4 py-3">
                  <p className="text-[17px] text-[#8D6E00]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    ⚠️ Noch keine Standorte angelegt. Bitte zuerst unter <strong>Standortverwaltung</strong> mindestens
                    einen Standort einrichten, erst danach kann dieser Benefit dort aktiviert werden.
                  </p>
                </div>
              )}
            </div>

            {/* Einem Mitarbeiter zuweisen */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Den Benefit {benefitName} einem Mitarbeiter zuweisen
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
                        onChange={(e) => {
                          const locId = e.target.value;
                          setAssignLocationId(locId);
                          setAssignEmployee('');
                          setAssignAmount('');
                          setAssignKinderList([]);
                          setAssignDelegateEntry(false);
                          setAssignError('');
                          if (hasPendelstreckeField) {
                            const loc = locId && locId !== 'all' ? locations.find(l => l.id === locId) : undefined;
                            setAssignPendelDaten({ ...NEW_PENDEL_DATEN(), arbeitsadresse: loc?.address ?? '' });
                          } else {
                            setAssignPendelDaten(NEW_PENDEL_DATEN());
                          }
                        }}
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
                          setAssignDelegateEntry(false);
                          if (hasKinderField && val && val !== 'all') {
                            const count = EMPLOYEE_PROFILES[val]?.children ?? 0;
                            setAssignKinderList(Array.from({ length: count }, () => NEW_KIND_ENTRY()));
                          } else {
                            setAssignKinderList([]);
                          }
                          if (isEssen && val && val !== 'all') {
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
                        {isEssen ? 'Budget pro Monat' : hasPendelstreckeField ? 'Limit (optional)' : 'Betrag'}
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
                            Gesetzl. Max. 2026: 115,05 €
                          </span>
                        </div>
                      )}
                      {!assignIsAuto && (
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={hasPendelstreckeField ? 0 : 1}
                              value={assignAmount}
                              onChange={(e) => { setAssignAmount(e.target.value); setAssignError(''); }}
                              placeholder={hasPendelstreckeField ? 'Leer = kein Limit' : 'z.B. 115'}
                              className={`${hasPendelstreckeField ? 'w-44' : 'w-32'} h-[40px] px-3 border ${assignError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            />
                            <span className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>€</span>
                            {maxBudgetPerEmployee !== undefined && (
                              <span className="text-[14px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                Gesetzl. Max: {maxBudgetPerEmployee.toString().replace('.', ',')} €{isYearlyBudget ? '/Jahr' : '/Monat'}
                              </span>
                            )}
                          </div>
                          {hasPendelstreckeField && (
                            <p className="text-[13px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              Optional ein festes Limit eintragen, oder leer lassen für „kein Limit": dann schöpft der Mitarbeiter das gesetzliche Maximum aus (berechnet aus seinen Pendel-Angaben: km × 0,38 € × max. 15 Tage).
                            </p>
                          )}
                          {fahrtkostenMax && (
                            <p className="text-[13px] text-[#0F429F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              Gesetzliches Maximum laut Angaben: <strong>{fahrtkostenMax.max.toFixed(2).replace('.', ',')} €/Monat</strong>{' '}
                              ({fahrtkostenMax.cappedTage} Tage × 0,38 €/km).
                              {assignAmount.trim() !== '' && (
                                <> Auszahlung = min(Limit, gesetzl. Max) = <strong>{Math.min(parseFloat(assignAmount.replace(',', '.')) || 0, fahrtkostenMax.max).toFixed(2).replace('.', ',')} €</strong>.</>
                              )}
                            </p>
                          )}
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

                  {hasDelegatableField && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-[15px] font-medium text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          {hasKinderField ? 'Kinder' : 'Pendelstrecke'}
                        </label>
                        {!assignDelegateEntry ? (
                          !(hasKinderField && employeeKinderCount === 0) && (
                          <button
                            type="button"
                            onClick={() => setAssignDelegateEntry(true)}
                            className="text-[13px] text-[#0F429F] hover:underline"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            Eingabe an Mitarbeiter übergeben →
                          </button>
                          )
                        ) : (
                          <button
                            type="button"
                            onClick={() => setAssignDelegateEntry(false)}
                            className="text-[13px] text-[#0F429F] hover:underline"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            ← Selbst eintragen
                          </button>
                        )}
                      </div>

                      {hasKinderField && !isBulkEmployee && assignEmployee && (
                        employeeKinderCount === 0 ? (
                          <div className="bg-[#FFF8E1] border border-[#FFD54F] rounded-lg px-4 py-3 mb-3">
                            <p className="text-[13px] text-[#8D6E00]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              ⚠️ Für {assignEmployee} sind im Mitarbeiterprofil keine Kinder hinterlegt. Bitte zuerst dort ein Kind anlegen, erst dann kann dieser Benefit zugewiesen werden.
                            </p>
                          </div>
                        ) : (
                          <div className="bg-[#F0F4FF] border border-[#C7D7F9] rounded-lg px-4 py-2 mb-3">
                            <p className="text-[13px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                              ℹ️ Laut Mitarbeiterprofil hinterlegt: <strong>{employeeKinderCount} {employeeKinderCount === 1 ? 'Kind' : 'Kinder'}</strong>. Weitere Kinder können nur über das Mitarbeiterprofil ergänzt werden.
                            </p>
                          </div>
                        )
                      )}

                      {assignDelegateEntry ? (
                        <div className="bg-[#F0F4FF] border border-[#C7D7F9] rounded-lg px-4 py-3">
                          <p className="text-[13px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            {hasKinderField
                              ? `Der Mitarbeiter trägt die Angaben für ${employeeKinderCount ?? 0} ${employeeKinderCount === 1 ? 'Kind' : 'Kinder'} selbst in der Riso-App ein, sobald die Zuweisung aktiv ist.`
                              : 'Der Mitarbeiter trägt die Pendelstrecke selbst in der Riso-App ein, sobald die Zuweisung aktiv ist.'}
                          </p>
                        </div>
                      ) : (
                        <>
                      {hasKinderField && (employeeKinderCount ?? 0) > 0 && (
                      <>
                      <p className="text-[13px] text-[#9E9E9E] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Diese Angaben macht der Mitarbeiter normalerweise selbst beim Einreichen in der Riso-App ("Neues Kind").
                      </p>
                      <div className="flex flex-col gap-4">
                        {assignKinderList.map((kind, idx) => (
                          <div key={kind.id} className="border border-[#E0E0E0] rounded-lg p-4 bg-[#F9FAFB]">
                            <div className="flex items-center justify-between mb-3">
                              <p className="text-[14px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>Kind {idx + 1}</p>
                            </div>

                            <div className="flex flex-col gap-2 mb-3">
                              <label className="flex items-start gap-2 text-[13px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                <input
                                  type="checkbox"
                                  checked={kind.bestaetigtNichtSchulpflichtig}
                                  onChange={(e) => setAssignKinderList(prev => prev.map(k => k.id === kind.id ? { ...k, bestaetigtNichtSchulpflichtig: e.target.checked } : k))}
                                  className="mt-0.5"
                                />
                                Ich bestätige, dass mein Kind nicht schulpflichtig ist.
                              </label>
                              <label className="flex items-start gap-2 text-[13px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                <input
                                  type="checkbox"
                                  checked={kind.bestaetigtPartnerKeinZuschuss}
                                  onChange={(e) => setAssignKinderList(prev => prev.map(k => k.id === kind.id ? { ...k, bestaetigtPartnerKeinZuschuss: e.target.checked } : k))}
                                  className="mt-0.5"
                                />
                                Ich bestätige, dass mein (Ehe)Partner keinen Kindergartenzuschuss von seinem Arbeitgeber erhält.
                              </label>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={kind.name}
                                onChange={(e) => setAssignKinderList(prev => prev.map(k => k.id === kind.id ? { ...k, name: e.target.value } : k))}
                                placeholder="Name"
                                className="h-[38px] px-3 border border-[#0F429F] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              />
                              <select
                                value={kind.geschlecht}
                                onChange={(e) => setAssignKinderList(prev => prev.map(k => k.id === kind.id ? { ...k, geschlecht: e.target.value } : k))}
                                className="h-[38px] px-3 border border-[#0F429F] rounded text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                <option value="">Geschlecht wählen…</option>
                                <option value="Männlich">Männlich</option>
                                <option value="Weiblich">Weiblich</option>
                                <option value="Divers">Divers</option>
                              </select>
                              <input
                                type="date"
                                value={kind.geburtsdatum}
                                onChange={(e) => setAssignKinderList(prev => prev.map(k => k.id === kind.id ? { ...k, geburtsdatum: e.target.value } : k))}
                                className="h-[38px] px-3 border border-[#0F429F] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              />
                              <input
                                type="text"
                                value={kind.kindergartenName}
                                onChange={(e) => setAssignKinderList(prev => prev.map(k => k.id === kind.id ? { ...k, kindergartenName: e.target.value } : k))}
                                placeholder="Name/Art des Kindergartens"
                                className="h-[38px] px-3 border border-[#0F429F] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              />
                              <input
                                type="text"
                                value={kind.kindergartenAdresse}
                                onChange={(e) => setAssignKinderList(prev => prev.map(k => k.id === kind.id ? { ...k, kindergartenAdresse: e.target.value } : k))}
                                placeholder="Adresse des Kindergartens"
                                className="h-[38px] px-3 border border-[#0F429F] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F] col-span-2"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      </>
                      )}

                      {hasPendelstreckeField && (
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={assignPendelDaten.wohnadresse}
                          onChange={(e) => setAssignPendelDaten(prev => ({ ...prev, wohnadresse: e.target.value }))}
                          placeholder="Wohnadresse"
                          className="h-[38px] px-3 border border-[#0F429F] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F] col-span-2"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                        <input
                          type="text"
                          value={assignPendelDaten.arbeitsadresse}
                          disabled={assignPendelDaten.keineArbeitsadresse}
                          onChange={(e) => setAssignPendelDaten(prev => ({ ...prev, arbeitsadresse: e.target.value }))}
                          placeholder="Arbeitsadresse"
                          className="h-[38px] px-3 border border-[#0F429F] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F] disabled:bg-[#F5F5F5] disabled:text-[#9E9E9E]"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                        <label className="flex items-center gap-2 text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          <input
                            type="checkbox"
                            checked={assignPendelDaten.keineArbeitsadresse}
                            onChange={(e) => setAssignPendelDaten(prev => ({ ...prev, keineArbeitsadresse: e.target.checked, arbeitsadresse: e.target.checked ? '' : prev.arbeitsadresse }))}
                          />
                          Mitarbeiter hat keine Arbeitsadresse
                        </label>
                        <input
                          type="number"
                          min={0}
                          step="0.1"
                          value={assignPendelDaten.entfernungKm}
                          onChange={(e) => setAssignPendelDaten(prev => ({ ...prev, entfernungKm: e.target.value }))}
                          placeholder="Entfernung in km"
                          className="h-[38px] px-3 border border-[#0F429F] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                        <input
                          type="number"
                          min={1}
                          max={31}
                          value={assignPendelDaten.tageProMonat}
                          onChange={(e) => setAssignPendelDaten(prev => ({ ...prev, tageProMonat: e.target.value }))}
                          placeholder="Pendeltage pro Monat"
                          className="h-[38px] px-3 border border-[#0F429F] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                        <select
                          value={assignPendelDaten.pendelArt}
                          onChange={(e) => setAssignPendelDaten(prev => ({ ...prev, pendelArt: e.target.value }))}
                          className="h-[38px] px-3 border border-[#0F429F] rounded text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F] col-span-2"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          <option value="">Wie pendelt der Mitarbeiter zur Arbeit?</option>
                          <option value="Auto">Auto</option>
                          <option value="Fahrrad">Fahrrad</option>
                          <option value="Zu Fuß">Zu Fuß</option>
                          <option value="ÖPNV">ÖPNV</option>
                          <option value="Fahrgemeinschaft">Fahrgemeinschaft</option>
                          <option value="Roller">Roller</option>
                        </select>
                      </div>
                      )}
                        </>
                      )}
                      {assignError && <p className="text-[14px] text-[#F44336] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>{assignError}</p>}
                    </div>
                  )}

                  {/* Budget-Vorschau — zeigt was konkret zugewiesen wird */}
                  {isEssen && assignLocationId && (
                    <div className="bg-[#F0F4FF] border border-[#C7D7F9] rounded-lg px-4 py-3">
                      <p className="text-[14px] font-medium text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Zugewiesenes Budget:{' '}
                        {assignBudgetType === 'dynamic' ? (
                          isAllLocations ? (
                            <strong>Standortabhängig (🔄 Auto je Standort)</strong>
                          ) : (
                            <strong>
                              {(() => {
                                const loc = locations.find(l => l.id === assignLocationId);
                                if (!loc) return '—';
                                if (loc.budgetType === 'dynamic') return `🔄 ${loc.limit} (Auto)`;
                                return `🔄 ${loc.limit}`;
                              })()}
                            </strong>
                          )
                        ) : (
                          assignAmount ? <strong>📌 {assignAmount} €/Monat (Fix)</strong> : <span className="text-[#9E9E9E]">Betrag eingeben</span>
                        )}
                      </p>
                    </div>
                  )}

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
                    <span style={{ color: '#F57F17' }}>⏳ Ausstehend, aktiv ab 1. des Monats</span>
                    <span style={{ color: '#2E7D32' }}>✅ Aktiv, Benefit läuft</span>
                  </div>
                </div>
                <p className="text-[14px] text-[#666666] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Alle eingereichten Zuweisungen für diesen Benefit.
                </p>

                <div className="bg-[#FFF8E1] border border-[#FFD54F] rounded-lg px-4 py-3 mb-4">
                  <p className="text-[14px] text-[#8D6E00]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    ⚠️ Eine neuere Zuweisung für denselben Mitarbeiter überschreibt automatisch die ältere.
                  </p>
                </div>

                {/* Column Headers */}
                <div
                  className="px-4 py-2 rounded-t-lg"
                  style={{ display: 'grid', gridTemplateColumns: zuweisungenGridCols, background: '#273A5F' }}
                >
                  {(hasDelegatableField
                    ? ['Standort', 'Mitarbeiter', hasKinderField ? 'Kinder' : 'Pendelstrecke', 'Budget', 'Gültig ab', 'Status', 'Aktion']
                    : ['Standort', 'Mitarbeiter', 'Budget', 'Gültig ab', 'Status', 'Aktion']
                  ).map(h => (
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
                        style={{ display: 'grid', gridTemplateColumns: zuweisungenGridCols }}
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
                        {hasDelegatableField && (
                          <span
                            className="text-[14px] text-[#333333]"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                            title={delegatableCellContent(a).title}
                          >
                            {delegatableCellContent(a).text}
                          </span>
                        )}
                        <span className="text-[14px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          {isEssen
                            ? (a.budgetType === 'dynamic'
                                ? (locLimit ? `🔄 ${locLimit} €` : '🔄 Standortabhängig')
                                : `📌 ${a.amount} €`)
                            : `${a.amount} €`}
                        </span>
                        <span className="text-[14px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          {a.availableFrom}
                        </span>
                        <span className="text-[11px] font-medium px-2 py-1 rounded-full inline-block whitespace-nowrap" style={{ background: '#FFF8E1', color: '#F57F17', border: '1px solid #FFD54F', fontFamily: 'Roboto, sans-serif', width: 'fit-content' }}>
                          ⏳ Ausstehend
                        </span>
                        <div>
                          <button
                            onClick={() => setAssignments((prev) => prev.filter((x) => x.id !== a.id))}
                            className="text-[13px] text-[#F44336] border border-[#F44336] px-3 py-1 rounded-full hover:bg-[#FFEBEE] transition"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            Stornieren
                          </button>
                        </div>
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
                                  gridTemplateColumns: zuweisungenGridCols,
                                  borderBottom: empIdx < expandedEmployeesWithLoc.length - 1 ? '1px solid #C7D7F9' : 'none',
                                }}
                              >
                                <span className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>{empLocName}</span>
                                <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{emp}</span>
                                {hasDelegatableField && (
                                  <span
                                    className="text-[13px] text-[#333333]"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                    title={delegatableCellContent(a).title}
                                  >
                                    {delegatableCellContent(a).text}
                                  </span>
                                )}
                                <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                  {isEssen
                                    ? (a.budgetType === 'dynamic' ? `🔄 ${empLimit ?? '—'} €` : `📌 ${a.amount} €`)
                                    : `${a.amount} €`}
                                </span>
                                <span className="text-[13px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.availableFrom}</span>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full inline-block self-center whitespace-nowrap" style={{ background: '#FFF8E1', color: '#F57F17', border: '1px solid #FFD54F', fontFamily: 'Roboto, sans-serif', width: 'fit-content' }}>
                                  ⏳ Ausstehend
                                </span>
                                <span />
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

        {activeTab === 'faqs' && (
          <>
            {/* FAQ — Artikel aus Zoho Desk (Kategorie: Über den jeweiligen Benefit) */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[17px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  FAQ
                </h2>
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
                          <p className="text-[14px] font-medium text-[#273A5F] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            {title}
                          </p>
                          <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.5' }}>
                            {summary}
                          </p>
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

            {/* Beratung anfragen */}
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

      {/* Modal 1: Budget bearbeiten */}
      {showLimitModal && editingLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-[17px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Budget bearbeiten, {benefitName}, {editingLocation.name}
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
                      ? 'Riso berechnet das Budget automatisch aus Tagessatz und Arbeitstagen. Der Tagessatz erhöht sich jährlich. Mit dem Budgettyp Auto nutzt du immer das gesetzliche Maximum für deine Mitarbeitenden.'
                      : 'Du gibst einen festen Betrag pro Monat vor. Der bleibt so, bis du ihn änderst (unabhängig von gesetzlichen oder jährlichen Änderungen).'}
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
                    {isYearlyBudget ? '€/Jahr' : '€/Monat'}
                  </span>
                  {maxBudgetPerEmployee !== undefined && (
                    <span className="text-[14px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      (gesetzl. Max: {maxBudgetPerEmployee.toString().replace('.', ',')} €{isYearlyBudget ? '/Jahr' : '/Monat'})
                    </span>
                  )}
                </div>
                {limitError && (
                  <p className="text-[14px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{limitError}</p>
                )}
              </div>
            )}

            <p className="text-[14px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Änderung gilt ab dem 1. des nächsten Monats.
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
