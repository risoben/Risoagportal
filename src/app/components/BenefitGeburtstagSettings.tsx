import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { BenefitTaxInfo } from './BenefitTaxInfo';
import { StatusBadge } from './Table';
import { benefitsSettingsData } from './benefitSettingsData';

interface LocationEntry {
  id: string;
  name: string;
  employeeCount: number;
  enabled: boolean;
}

interface BirthdayEntry {
  id: string;
  name: string;
  birthday: string;
}

const MOCK_LOCATIONS: LocationEntry[] = [
  { id: '1', name: 'München', employeeCount: 34, enabled: true },
  { id: '2', name: 'Heddesheim', employeeCount: 15, enabled: true },
  { id: '3', name: 'Berlin', employeeCount: 8, enabled: true },
  { id: '4', name: 'Viernheim', employeeCount: 5, enabled: false },
];

const ALL_EMPLOYEES = ['Anna Müller', 'Tom Schmidt', 'Sara Becker', 'Max Hoffmann', 'Lisa Weber', 'Klaus Fischer', 'Jan Braun', 'Maria Koch'];

const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

export function BenefitGeburtstagSettings() {
  const data = benefitsSettingsData['geburtstag'];
  const taxInfo = data?.taxInfo;

  const [locations, setLocations] = useState<LocationEntry[]>(MOCK_LOCATIONS);
  const [birthdays, setBirthdays] = useState<BirthdayEntry[]>([]);
  const [savedConfirm, setSavedConfirm] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [modalEmployee, setModalEmployee] = useState('');
  const [modalMonth, setModalMonth] = useState('');
  const [modalDay, setModalDay] = useState('');
  const [modalStep, setModalStep] = useState<'form' | 'confirmation'>('form');

  const goBack = () =>
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));

  const handleToggleLocation = (id: string) =>
    setLocations(prev => prev.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l));

  const handleOpenModal = () => {
    setModalEmployee('');
    setModalMonth('');
    setModalDay('');
    setModalStep('form');
    setShowModal(true);
  };

  const handleSaveBirthday = () => {
    if (!modalEmployee || !modalMonth || !modalDay) return;
    const newEntry: BirthdayEntry = {
      id: String(Date.now()),
      name: modalEmployee,
      birthday: `${modalDay.padStart(2, '0')}. ${MONTHS[parseInt(modalMonth) - 1]}`,
    };
    setBirthdays(prev => [...prev, newEntry]);
    setModalStep('confirmation');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalStep('form');
  };

  const nextBirthMonth = (() => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
  })();

  const isFormValid = !!(modalEmployee && modalMonth && modalDay);

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
            <BenefitIconComponent benefitName="Geburtstagsgutschein" size={48} background={true} />
            <div>
              <h1 className="text-[32px] font-bold text-[#273A5F]">Geburtstagsgutschein</h1>
              <p className="text-[13px] text-[#666666] mt-1">Automatisch bis zu 60 € im Geburtsmonat</p>
            </div>
          </div>
          <div className="text-right">
            <StatusBadge status="Aktiv" type="success" />
            <p className="text-[11px] text-[#666666] mt-1">Wird automatisch ausgelöst</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6" style={{ maxWidth: '900px' }}>

        {/* Section 1: Benefit-Info */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-3">Benefit-Informationen</h2>
          <p className="text-[14px] text-[#333333]" style={{ lineHeight: '1.6' }}>{data?.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-[11px] bg-[#E3F2FD] text-[#1565C0] px-3 py-1 rounded-full">Automatisch — kein manuelles Auslösen</span>
            <span className="text-[11px] bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full">Bis zu 60 € / Mitarbeiter</span>
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

        {/* Section 3: Geburtstage */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#273A5F]">Geburtstage</h2>
              <p className="text-[13px] text-[#666666] mt-1">
                Geburtstage werden automatisch aus dem Mitarbeiterprofil gezogen. Falls ein Geburtstag fehlt, kannst du ihn hier manuell hinzufügen.
              </p>
            </div>
            <button
              onClick={handleOpenModal}
              className="ml-4 px-5 py-2.5 bg-[#0F429F] text-white text-[13px] font-medium rounded-full hover:bg-[#246AFF] transition whitespace-nowrap"
              style={{ borderRadius: '24px' }}
            >
              + Geburtstag hinzufügen
            </button>
          </div>

          {birthdays.length === 0 ? (
            <p className="text-[14px] text-[#9E9E9E] text-center py-6">
              Keine manuellen Einträge — alle Geburtstage kommen aus den Mitarbeiterprofilen.
            </p>
          ) : (
            <>
              <div
                className="bg-[#273A5F] px-5 h-11 rounded-t-lg"
                style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1fr 1fr 100px' }}
              >
                {['Mitarbeiter', 'Geburtstag (TT. Monat)', ''].map(h => (
                  <span key={h} className="text-white font-bold text-xs uppercase tracking-wide">{h}</span>
                ))}
              </div>
              {birthdays.map((b, i) => (
                <div
                  key={b.id}
                  className={`px-5 border-b border-[#E5E7EB] last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}
                  style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1fr 1fr 100px', minHeight: '48px' }}
                >
                  <span className="text-[13px] text-[#333333]">{b.name}</span>
                  <span className="text-[13px] text-[#666666]">{b.birthday}</span>
                  <button
                    onClick={() => setBirthdays(prev => prev.filter(e => e.id !== b.id))}
                    className="text-[11px] text-[#F44336] hover:underline text-left"
                  >
                    Entfernen
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Section 4: Verfügbare Standorte */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-4">Verfügbar für diese Standorte</h2>
          <div className="space-y-1">
            {locations.map(loc => (
              <label
                key={loc.id}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F0F4FF] rounded cursor-pointer transition"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={loc.enabled}
                    onChange={() => handleToggleLocation(loc.id)}
                    className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer transition-colors"
                  />
                  {loc.enabled && (
                    <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                  )}
                </div>
                <span className="text-[14px] text-[#333333]">
                  {loc.name} ({loc.employeeCount} Mitarbeiter)
                </span>
              </label>
            ))}
          </div>
          <p className="text-[12px] text-[#666666] mt-4">
            Kein Budget-Limit — das gesetzliche Maximum von 60 € gilt automatisch.
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="px-8 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#246AFF] transition"
            style={{ borderRadius: '24px' }}
            onClick={() => {
              setSavedConfirm('Einstellungen gespeichert.');
              setTimeout(() => setSavedConfirm(null), 4000);
            }}
          >
            Speichern
          </button>
        </div>
      </div>

      {/* Add Birthday Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {modalStep === 'confirmation' ? (
              <div className="text-center">
                <div className="text-[56px] mb-3">🎂</div>
                <h3 className="text-[20px] font-bold text-[#273A5F] mb-2">Geburtstag gespeichert</h3>
                <p className="text-[14px] text-[#666666] mb-1">
                  Der Credit für <strong className="text-[#273A5F]">{modalEmployee}</strong> wird automatisch im{' '}
                  <strong className="text-[#273A5F]">{nextBirthMonth}</strong> freigeschaltet.
                </p>
                <p className="text-[12px] text-[#9E9E9E] mb-6">Kein weiteres Zutun erforderlich.</p>
                <button
                  onClick={handleCloseModal}
                  className="px-8 py-3 bg-[#0F429F] text-white rounded-full hover:bg-[#246AFF] transition"
                  style={{ borderRadius: '24px' }}
                >
                  Schließen
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-[18px] font-bold text-[#273A5F] mb-3">Geburtstag manuell hinzufügen</h3>
                <p className="text-[13px] text-[#666666] mb-4">
                  Nur Tag und Monat — kein Geburtsjahr (Datenschutz).
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#273A5F] mb-2">Mitarbeiter</label>
                    <select
                      value={modalEmployee}
                      onChange={e => setModalEmployee(e.target.value)}
                      className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                    >
                      <option value="">Mitarbeiter wählen…</option>
                      {ALL_EMPLOYEES.map(emp => (
                        <option key={emp} value={emp}>{emp}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[13px] font-medium text-[#273A5F] mb-2">Monat</label>
                      <select
                        value={modalMonth}
                        onChange={e => setModalMonth(e.target.value)}
                        className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                      >
                        <option value="">Monat…</option>
                        {MONTHS.map((m, idx) => (
                          <option key={m} value={String(idx + 1)}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#273A5F] mb-2">Tag</label>
                      <select
                        value={modalDay}
                        onChange={e => setModalDay(e.target.value)}
                        className="w-full h-[40px] px-3 border border-[#0F429F] rounded text-[14px] text-[#333333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                      >
                        <option value="">Tag…</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                          <option key={d} value={String(d)}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 justify-end mt-6">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition"
                    style={{ borderRadius: '24px' }}
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleSaveBirthday}
                    disabled={!isFormValid}
                    className="px-6 py-3 bg-[#0F429F] text-white rounded-full hover:bg-[#246AFF] transition disabled:bg-[#9E9E9E] disabled:cursor-not-allowed"
                    style={{ borderRadius: '24px' }}
                  >
                    Speichern
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
