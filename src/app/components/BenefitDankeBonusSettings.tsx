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
  {
    id: '3', employeeName: 'Sara Becker', locationName: 'München',
    occasion: 'other_professional', amount: 300, status: 'rejected', availableFrom: '01.04.2026',
    rejectionReason: 'Jahresgrenze überschritten',
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

  const taxInfo = benefitsSettingsData['danke-bonus']?.taxInfo;

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
      return `Überschreitet das Standort-Budget (max. ${selectedLocation.maxPerEmployee.toLocaleString('de-DE')} €)`;
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
    if (n > MAX_ANNUAL_LIMIT) { setBudgetError(`Maximum: ${MAX_ANNUAL_LIMIT.toLocaleString('de-DE')} € (§37b EStG)`); return; }
    if (editingLocation) {
      setLocations(prev => prev.map(l => l.id === editingLocation.id ? { ...l, maxPerEmployee: n } : l));
      setSavedConfirm(`${editingLocation.name}: Budget gespeichert — gilt ab 1. nächsten Monat.`);
      setTimeout(() => setSavedConfirm(null), 4000);
    }
    setShowBudgetModal(false);
    setEditingLocation(null);
  };

  const isFormValid = !!(formLocationId && formEmployee && formOccasion && formAmount.trim());

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Back */}
      <div className="bg-white px-8 pt-6 pb-4">
        <button onClick={goBack} className="flex items-center text-[#0F429F] text-[12px] hover:underline transition">
          <ArrowLeft size={16} className="mr-1" />
          Zurück zu Benefits verwalten
        </button>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-8 pb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <BenefitIconComponent benefitName="Danke-Bonus" size={48} background={true} />
            <div>
              <h1 className="text-[32px] font-bold text-[#273A5F]">Danke-Bonus</h1>
              <p className="text-[13px] text-[#666666] mt-1">Einmalige Anerkennung für berufliche Anlässe</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[13px] text-[#273A5F]">Status</span>
              <button
                onClick={() => setIsActive(v => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? 'bg-[#4CAF50]' : 'bg-[#9E9E9E]'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <StatusBadge status={isActive ? 'Aktiv' : 'Inaktiv'} type={isActive ? 'success' : 'inactive'} />
            </div>
            <p className="text-[11px] text-[#666666]">Status-Änderung gilt ab 1. nächsten Monat</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6" style={{ maxWidth: '900px' }}>

        {/* Section 1: Info */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-3">Benefit-Informationen</h2>
          <p className="text-[14px] text-[#333333]" style={{ lineHeight: '1.6' }}>
            Mit dem Danke-Bonus kannst du außergewöhnliche Leistungen gezielt anerkennen — für berufliche Anlässe wie erreichte Ziele, Team-Ergebnisse oder Betriebsjubiläen. Du legst Betrag und Anlass selbst fest, Riso schaltet den Gutschein direkt in der Riso App frei.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-[11px] bg-[#E3F2FD] text-[#1565C0] px-3 py-1 rounded-full">Einmalig — kein monatliches Budget</span>
            <span className="text-[11px] bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full">Kein Verfall — bleibt bis zur Einlösung</span>
            <span className="text-[11px] bg-[#FFF8E1] text-[#F57F17] px-3 py-1 rounded-full">Riso-Genehmigung erforderlich</span>
          </div>
        </div>

        {/* Section 2: Dankebonus vergeben */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5">Dankebonus vergeben</h2>

          {formStep === 'confirmation' && lastSubmitted ? (
            <div className="text-center py-6">
              <div className="text-[56px] mb-3">✅</div>
              <h3 className="text-[20px] font-bold text-[#273A5F] mb-2">Dankebonus eingereicht</h3>
              <p className="text-[14px] text-[#666666] mb-1">
                Wird von Riso geprüft. Verfügbar für{' '}
                <strong className="text-[#273A5F]">{lastSubmitted.employee}</strong>{' '}
                am <strong className="text-[#273A5F]">{lastSubmitted.availableFrom}</strong>.
              </p>
              <p className="text-[12px] text-[#9E9E9E] mb-6">Du kannst den Dankebonus bis zum Monatsende stornieren.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handleCancelAssignment(lastSubmitted.id)}
                  className="px-6 py-2 border border-[#F44336] text-[#F44336] text-[13px] rounded-full hover:bg-[#FFEBEE] transition"
                  style={{ borderRadius: '24px' }}
                >
                  🗑 Stornieren
                </button>
                <button
                  onClick={handleNewAssignment}
                  className="px-6 py-2 bg-[#0F429F] text-white text-[13px] rounded-full hover:bg-[#246AFF] transition"
                  style={{ borderRadius: '24px' }}
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
                  <label className="block text-[13px] font-medium text-[#273A5F] mb-2">Standort</label>
                  <select
                    value={formLocationId}
                    onChange={e => { setFormLocationId(e.target.value); setFormEmployee(''); setFormAmount(''); setFormAmountError(''); }}
                    className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                  >
                    <option value="">Standort wählen…</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                </div>

                {/* Mitarbeiter */}
                <div>
                  <label className="block text-[13px] font-medium text-[#273A5F] mb-2">Mitarbeiter</label>
                  <select
                    value={formEmployee}
                    onChange={e => setFormEmployee(e.target.value)}
                    disabled={!formLocationId}
                    className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F] disabled:bg-[#F5F5F5] disabled:border-[#E0E0E0] disabled:text-[#9E9E9E]"
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
                <label className="block text-[13px] font-medium text-[#273A5F] mb-2">Anlass</label>
                <select
                  value={formOccasion}
                  onChange={e => setFormOccasion(e.target.value as Occasion)}
                  className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                >
                  <option value="">Anlass wählen…</option>
                  {(Object.entries(OCCASION_LABELS) as [Occasion, string][]).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
                <p className="text-[11px] text-[#9E9E9E] mt-1">
                  Nur berufliche Anlässe — für Geburtstage bitte den Geburtstagsgutschein nutzen
                </p>
              </div>

              {/* Betrag */}
              <div>
                <label className="block text-[13px] font-medium text-[#273A5F] mb-2">Betrag</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={selectedLocation?.maxPerEmployee ?? MAX_ANNUAL_LIMIT}
                    value={formAmount}
                    onChange={e => { setFormAmount(e.target.value); setFormAmountError(''); }}
                    placeholder="z.B. 200"
                    className={`w-40 h-[40px] px-3 border ${formAmountError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                  />
                  <span className="text-[14px] text-[#666666]">€</span>
                  {selectedLocation && (
                    <span className="text-[12px] text-[#9E9E9E]">
                      max. {selectedLocation.maxPerEmployee.toLocaleString('de-DE')} € (Standort-Budget)
                    </span>
                  )}
                </div>
                {formAmountError && (
                  <p className="text-[12px] text-[#F44336] mt-1">{formAmountError}</p>
                )}
                <p className="text-[11px] text-[#9E9E9E] mt-1">
                  Gesetzliche Jahresgrenze: max. {MAX_ANNUAL_LIMIT.toLocaleString('de-DE')} € pro Mitarbeiter (§37b EStG)
                </p>
              </div>

              {/* Timing hint */}
              {formLocationId && (
                <div className="bg-[#F0F4FF] border border-[#C7D7F9] rounded-lg px-4 py-3">
                  <p className="text-[13px] text-[#273A5F]">
                    📅 Credit wird verfügbar am <strong>{getNextMonthFirst()}</strong> — nach Riso-Genehmigung
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
            <span className="text-[#2E7D32] text-[13px]">✅ {savedConfirm}</span>
          </div>
        )}

        {/* Section 3: Budget pro Standort */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-2">Budget pro Standort</h2>
          <p className="text-[13px] text-[#666666] mb-4">
            Maximaler Betrag pro Mitarbeiter — gilt als Obergrenze beim Vergeben. Gesetzliches Maximum: {MAX_ANNUAL_LIMIT.toLocaleString('de-DE')} € / Jahr (§37b EStG).
          </p>

          <div
            className="bg-[#273A5F] px-6 h-12 rounded-t-lg"
            style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '2fr 1.5fr 120px' }}
          >
            <span className="text-white font-bold text-xs uppercase tracking-wide">Standort</span>
            <span className="text-white font-bold text-xs uppercase tracking-wide">Max. pro Mitarbeiter</span>
            <span />
          </div>

          {locations.map((loc, i) => (
            <div
              key={loc.id}
              className={`px-6 border-b border-[#E5E7EB] last:border-b-0 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}
              style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '2fr 1.5fr 120px', minHeight: '52px', paddingTop: '8px', paddingBottom: '8px' }}
            >
              <span className="text-[14px] text-[#333333]">
                {loc.name}{' '}
                <span className="text-[12px] text-[#9E9E9E]">({loc.employeeCount} MA)</span>
              </span>
              <span className="text-[14px] text-[#273A5F] font-medium">
                {loc.maxPerEmployee.toLocaleString('de-DE')} €
              </span>
              <div className="flex justify-end">
                <button
                  onClick={() => handleOpenBudgetModal(loc)}
                  className="px-4 py-1.5 border border-[#0F429F] text-[#0F429F] text-[12px] rounded-full hover:bg-[#F0F4FF] transition"
                >
                  Bearbeiten
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section 4: Verfügbar für diese Standorte */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-4">Verfügbar für diese Standorte</h2>
          <div className="space-y-1">
            {locations.map(loc => (
              <label key={loc.id} className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F0F4FF] rounded cursor-pointer transition">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={loc.enabled}
                    onChange={() => handleToggleLocation(loc.id)}
                    className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer transition-colors"
                  />
                  {loc.enabled && <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />}
                </div>
                <span className="text-[14px] text-[#333333]">{loc.name} ({loc.employeeCount} Mitarbeiter)</span>
              </label>
            ))}
          </div>
        </div>

        {/* Section 5: Nutzungsstatistik */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5">Nutzungsstatistik</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Mitarbeiter mit Zugriff', value: '57' },
              { label: 'Dankeboni dieses Jahr', value: '8' },
              { label: 'Ø Betrag', value: '250 €' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4 text-center">
                <p className="text-[24px] font-bold text-[#273A5F]">{value}</p>
                <p className="text-[12px] text-[#666666] mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Steuerliche Behandlung */}
        {taxInfo && <BenefitTaxInfo steuer={taxInfo.steuer} sv={taxInfo.sv} />}

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

        {/* Section 7: Verlauf */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5">Verlauf Dankeboni</h2>

          {assignments.length === 0 ? (
            <p className="text-[14px] text-[#9E9E9E] text-center py-8">Noch keine Dankeboni vergeben.</p>
          ) : (
            <>
              <div
                className="bg-[#273A5F] px-4 h-11 rounded-t-lg"
                style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.1fr 1.3fr 0.7fr 1.8fr 0.9fr 1fr' }}
              >
                {['Status', 'Mitarbeiter', 'Betrag', 'Anlass', 'Verfügbar ab', 'Aktion'].map(h => (
                  <span key={h} className="text-white font-bold text-xs uppercase tracking-wide">{h}</span>
                ))}
              </div>

              {assignments.map((a, i) => {
                const sc = STATUS_CONFIG[a.status];
                return (
                  <div
                    key={a.id}
                    className={`px-4 border-b border-[#E5E7EB] last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}
                    style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.1fr 1.3fr 0.7fr 1.8fr 0.9fr 1fr', minHeight: '52px', paddingTop: '8px', paddingBottom: '8px' }}
                  >
                    <span
                      className="text-[11px] font-medium px-2 py-1 rounded-full"
                      style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, width: 'fit-content' }}
                    >
                      {sc.label}
                    </span>
                    <span className="text-[13px] text-[#333333]">{a.employeeName}</span>
                    <span className="text-[13px] text-[#333333]">{a.amount.toLocaleString('de-DE')} €</span>
                    <span className="text-[12px] text-[#666666]">{OCCASION_LABELS[a.occasion]}</span>
                    <span className="text-[12px] text-[#666666]">{a.availableFrom}</span>
                    <div>
                      {a.status === 'pending' && (
                        <button
                          onClick={() => handleCancelAssignment(a.id)}
                          className="text-[11px] text-[#F44336] border border-[#F44336] px-3 py-1 rounded-full hover:bg-[#FFEBEE] transition"
                        >
                          Stornieren
                        </button>
                      )}
                      {a.status === 'rejected' && a.rejectionReason && (
                        <span className="text-[11px] text-[#F44336]">Grund: {a.rejectionReason}</span>
                      )}
                      {a.status === 'approved' && (
                        <span className="text-[11px] text-[#2E7D32]">seit {a.availableFrom}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <div className="text-[48px] mb-3">⚠️</div>
            <h3 className="text-[18px] font-bold text-[#273A5F] mb-3">Benefit deaktivieren?</h3>
            <p className="text-[14px] text-[#333333] mb-4">Möchtest du den <strong>Danke-Bonus</strong> wirklich deaktivieren?</p>
            <div className="bg-[#FFEBEE] border border-[#F44336] rounded p-3 mb-6 flex items-start gap-2 text-left">
              <span>⚠️</span>
              <p className="text-[12px] text-[#F44336]">Mitarbeiter verlieren ab 1. nächsten Monat Zugriff auf dieses Benefit.</p>
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
            <h3 className="text-[18px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Budget bearbeiten — {editingLocation.name}
            </h3>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
                <span className="text-[12px] text-[#9E9E9E]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  max. {MAX_ANNUAL_LIMIT.toLocaleString('de-DE')} €
                </span>
              </div>
              {budgetError && (
                <p className="text-[12px] text-[#F44336] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{budgetError}</p>
              )}
            </div>
            <p className="text-[12px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Änderung gilt ab 1. nächsten Monat — wartet auf Riso-Genehmigung
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
