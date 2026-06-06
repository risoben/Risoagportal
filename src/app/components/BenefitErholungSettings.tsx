import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { BenefitTaxInfo } from './BenefitTaxInfo';
import { benefitsSettingsData } from './benefitSettingsData';

type ErholungStatus = 'pending' | 'approved' | 'rejected';

interface ErholungLocation {
  id: string;
  name: string;
  maxPerEmployee: number;
  employeeCount: number;
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

const MAX_EMPLOYEE = 156;

const MOCK_LOCATIONS: ErholungLocation[] = [
  { id: '1', name: 'München', maxPerEmployee: MAX_EMPLOYEE, employeeCount: 34 },
  { id: '2', name: 'Heddesheim', maxPerEmployee: MAX_EMPLOYEE, employeeCount: 15 },
  { id: '3', name: 'Berlin', maxPerEmployee: MAX_EMPLOYEE, employeeCount: 8 },
];

const MOCK_EMPLOYEES: Record<string, string[]> = {
  '1': ['Anna Müller', 'Tom Schmidt', 'Sara Becker', 'Max Hoffmann'],
  '2': ['Lisa Weber', 'Klaus Fischer'],
  '3': ['Jan Braun', 'Maria Koch'],
};

const STATUS_CONFIG = {
  pending:  { label: '⏳ Ausstehend', bg: '#FFF8E1', color: '#F57F17', border: '#FFD54F' },
  approved: { label: '✅ Genehmigt',  bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
  rejected: { label: '❌ Abgelehnt',  bg: '#FFEBEE', color: '#C62828', border: '#EF9A9A' },
};

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
  const data = benefitsSettingsData['erholung'];
  const taxInfo = data?.taxInfo;

  const [locations, setLocations] = useState(MOCK_LOCATIONS);
  const [assignments, setAssignments] = useState<ErholungAssignment[]>([]);

  const [formLocationId, setFormLocationId] = useState('');
  const [formEmployee, setFormEmployee] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formMonth, setFormMonth] = useState('');
  const [formAmountError, setFormAmountError] = useState('');
  const [formStep, setFormStep] = useState<'form' | 'confirmation'>('form');
  const [lastSubmitted, setLastSubmitted] = useState<{ id: string; employee: string; availableFrom: string } | null>(null);

  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [editingLoc, setEditingLoc] = useState<ErholungLocation | null>(null);
  const [budgetInput, setBudgetInput] = useState('');
  const [budgetError, setBudgetError] = useState('');
  const [savedConfirm, setSavedConfirm] = useState<string | null>(null);

  const goBack = () =>
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));

  const selectedLocation = locations.find(l => l.id === formLocationId);
  const availableEmployees = MOCK_EMPLOYEES[formLocationId] ?? [];

  const validateAmount = (val: string): string => {
    const n = parseFloat(val.replace(',', '.'));
    if (!val.trim() || isNaN(n)) return 'Betrag ist erforderlich';
    if (n <= 0) return 'Betrag muss größer als 0 sein';
    if (n > MAX_EMPLOYEE) return `Max. ${MAX_EMPLOYEE} € pro Mitarbeiter (§40 EStG)`;
    return '';
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
    setLastSubmitted(null);
  };

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
    if (n > MAX_EMPLOYEE) { setBudgetError(`Maximum: ${MAX_EMPLOYEE} € (§40 Abs. 2 EStG)`); return; }
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
            <BenefitIconComponent benefitName="Erholungsbeihilfe" size={48} background={true} />
            <div>
              <h1 className="text-[32px] font-bold text-[#273A5F]">Erholungsbeihilfe</h1>
              <p className="text-[13px] text-[#666666] mt-1">Einmal pro Jahr — bis zu 156 € + Familienzuschläge</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6" style={{ maxWidth: '900px' }}>

        {/* Section 1: Info */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-3">Benefit-Informationen</h2>
          <p className="text-[14px] text-[#333333]" style={{ lineHeight: '1.6' }}>{data?.description}</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: 'Mitarbeiter', amount: '156 €' },
              { label: 'Ehepartner (Bonus)', amount: '+ 104 €' },
              { label: 'Pro Kind (Bonus)', amount: '+ 52 €' },
            ].map(({ label, amount }) => (
              <div key={label} className="bg-[#F0F4FF] border border-[#C7D7F9] rounded-lg p-3 text-center">
                <p className="text-[18px] font-bold text-[#0F429F]">{amount}</p>
                <p className="text-[12px] text-[#273A5F]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Steuer */}
        {taxInfo && <BenefitTaxInfo steuer={taxInfo.steuer} sv={taxInfo.sv} />}

        {/* Save confirmation */}
        {savedConfirm && (
          <div className="mb-4 flex items-center gap-3 bg-[#E8F5E9] border border-[#A5D6A7] rounded-lg px-4 py-3">
            <span className="text-[#2E7D32] text-[13px]">✅ {savedConfirm}</span>
          </div>
        )}

        {/* Section 3: Erholungsbeihilfe vergeben */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5">Erholungsbeihilfe vergeben</h2>

          {formStep === 'confirmation' && lastSubmitted ? (
            <div className="text-center py-6">
              <div className="text-[56px] mb-3">✅</div>
              <h3 className="text-[20px] font-bold text-[#273A5F] mb-2">Erholungsbeihilfe eingereicht</h3>
              <p className="text-[14px] text-[#666666] mb-1">
                Wird von Riso geprüft. Verfügbar für{' '}
                <strong className="text-[#273A5F]">{lastSubmitted.employee}</strong>{' '}
                am <strong className="text-[#273A5F]">{lastSubmitted.availableFrom}</strong>.
              </p>
              <p className="text-[12px] text-[#9E9E9E] mb-6">Du kannst die Vergabe bis zum Monatsende stornieren.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setAssignments(prev => prev.filter(a => a.id !== lastSubmitted.id))}
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
                  Weitere Erholungsbeihilfe vergeben
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#273A5F] mb-2">Betrag</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={MAX_EMPLOYEE}
                      value={formAmount}
                      onChange={e => { setFormAmount(e.target.value); setFormAmountError(''); }}
                      placeholder="z.B. 156"
                      className={`w-32 h-[40px] px-3 border ${formAmountError ? 'border-[#F44336]' : 'border-[#0F429F]'} rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]`}
                    />
                    <span className="text-[14px] text-[#666666]">€</span>
                    <span className="text-[12px] text-[#9E9E9E]">max. {MAX_EMPLOYEE} €</span>
                  </div>
                  {formAmountError && <p className="text-[12px] text-[#F44336] mt-1">{formAmountError}</p>}
                  <p className="text-[11px] text-[#9E9E9E] mt-1">
                    Ehepartner +104 € / Kind +52 € werden separat erfasst
                  </p>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#273A5F] mb-2">Monat der Auszahlung</label>
                  <select
                    value={formMonth}
                    onChange={e => setFormMonth(e.target.value)}
                    className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                  >
                    <option value="">Monat wählen…</option>
                    {UPCOMING_MONTHS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="px-8 py-3 bg-[#0F429F] text-white font-medium hover:bg-[#246AFF] transition disabled:bg-[#9E9E9E] disabled:cursor-not-allowed"
                  style={{ borderRadius: '24px' }}
                >
                  Erholungsbeihilfe einreichen →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Budget pro Standort */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-2">Budget pro Standort</h2>
          <p className="text-[13px] text-[#666666] mb-4">
            Max. Betrag pro Mitarbeiter — gesetzliches Maximum: {MAX_EMPLOYEE} € (§40 Abs. 2 EStG).
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
                {loc.name} <span className="text-[12px] text-[#9E9E9E]">({loc.employeeCount} MA)</span>
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

        {/* Section 5: Verlauf */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-5">Verlauf Erholungsbeihilfen</h2>

          {assignments.length === 0 ? (
            <p className="text-[14px] text-[#9E9E9E] text-center py-8">Noch keine Erholungsbeihilfen vergeben.</p>
          ) : (
            <>
              <div
                className="bg-[#273A5F] px-4 h-11 rounded-t-lg"
                style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.2fr 1.3fr 0.7fr 1.2fr 1fr 1fr' }}
              >
                {['Status', 'Mitarbeiter', 'Betrag', 'Monat', 'Verfügbar ab', 'Aktion'].map(h => (
                  <span key={h} className="text-white font-bold text-xs uppercase tracking-wide">{h}</span>
                ))}
              </div>

              {assignments.map((a, i) => {
                const sc = STATUS_CONFIG[a.status];
                return (
                  <div
                    key={a.id}
                    className={`px-4 border-b border-[#E5E7EB] last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}
                    style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.2fr 1.3fr 0.7fr 1.2fr 1fr 1fr', minHeight: '52px', paddingTop: '8px', paddingBottom: '8px' }}
                  >
                    <span
                      className="text-[11px] font-medium px-2 py-1 rounded-full"
                      style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, width: 'fit-content' }}
                    >
                      {sc.label}
                    </span>
                    <span className="text-[13px] text-[#333333]">{a.employeeName}</span>
                    <span className="text-[13px] text-[#333333]">{a.amount.toLocaleString('de-DE')} €</span>
                    <span className="text-[12px] text-[#666666]">{a.month}</span>
                    <span className="text-[12px] text-[#666666]">{a.availableFrom}</span>
                    <div>
                      {a.status === 'pending' && (
                        <button
                          onClick={() => setAssignments(prev => prev.filter(x => x.id !== a.id))}
                          className="text-[11px] text-[#F44336] border border-[#F44336] px-3 py-1 rounded-full hover:bg-[#FFEBEE] transition"
                        >
                          Stornieren
                        </button>
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

      {/* Budget Modal */}
      {showBudgetModal && editingLoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <h3 className="text-[18px] font-bold text-[#273A5F] mb-4">
              Budget bearbeiten — {editingLoc.name}
            </h3>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2">Max. Betrag pro Mitarbeiter</label>
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
                <span className="text-[12px] text-[#9E9E9E]">max. {MAX_EMPLOYEE} €</span>
              </div>
              {budgetError && <p className="text-[12px] text-[#F44336] mt-1">{budgetError}</p>}
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
