import { ArrowLeft } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { BenefitTaxInfo } from './BenefitTaxInfo';
import { benefitsSettingsData } from './benefitSettingsData';

type SetupStatus = 'not_started' | 'in_progress' | 'active';

const STATUS_LABELS: Record<SetupStatus, { label: string; bg: string; color: string; border: string }> = {
  not_started: { label: 'Noch nicht eingerichtet', bg: '#F5F5F5', color: '#666666', border: '#E0E0E0' },
  in_progress:  { label: 'In Einrichtung',          bg: '#FFF8E1', color: '#F57F17', border: '#FFD54F' },
  active:       { label: 'Aktiv',                    bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
};

export function BenefitBkvSettings() {
  const data = benefitsSettingsData['bkv'];
  const taxInfo = data?.taxInfo;
  const setupStatus: SetupStatus = 'not_started';

  const goBack = () =>
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));

  const handleContactRequest = () =>
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'kontakt' } }));

  const sc = STATUS_LABELS[setupStatus];

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
            <BenefitIconComponent benefitName="BKV" size={48} background={true} />
            <div>
              <h1 className="text-[32px] font-bold text-[#273A5F]">Betriebliche Krankenversicherung (BKV)</h1>
              <p className="text-[13px] text-[#666666] mt-1">Privater Zusatzschutz für deine Mitarbeiter — Riso koordiniert alles</p>
            </div>
          </div>
          <span
            className="text-[12px] font-medium px-3 py-1.5 rounded-full"
            style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}
          >
            {sc.label}
          </span>
        </div>
      </div>

      <div className="px-8 py-6" style={{ maxWidth: '900px' }}>

        {/* Section 1: Info */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-3">Was ist die BKV?</h2>
          <p className="text-[14px] text-[#333333] mb-4" style={{ lineHeight: '1.6' }}>{data?.description}</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🦷', title: 'Zahnzusatz', text: 'Zahnreinigung, Zahnersatz, Implantate' },
              { icon: '🏥', title: 'Stationär', text: 'Chefarztbehandlung, Einbettzimmer, freie Krankenhauswahl' },
              { icon: '👁️', title: 'Sehhilfen', text: 'Brillen, Kontaktlinsen, Laserbehandlung' },
            ].map(({ icon, title, text }) => (
              <div key={title} className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4">
                <div className="text-[24px] mb-2">{icon}</div>
                <p className="text-[13px] font-bold text-[#273A5F] mb-1">{title}</p>
                <p className="text-[12px] text-[#666666]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Steuer */}
        {taxInfo && <BenefitTaxInfo steuer={taxInfo.steuer} sv={taxInfo.sv} />}

        {/* Section 3: Beratungs-Kasten */}
        <div className="rounded-xl p-6 mb-6" style={{ background: '#E3F2FD', border: '1px solid #90CAF9' }}>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-[18px] font-bold text-[#273A5F] mb-2">Beratung anfragen</h2>
              <p className="text-[14px] text-[#273A5F]" style={{ lineHeight: '1.6' }}>
                Die BKV wird gemeinsam mit Riso eingerichtet. Unser Team begleitet dich durch den gesamten Prozess — von der Tarifauswahl bis zur monatlichen Beitragsweiterleitung. Kein Papierkram, kein Aufwand für dich.
              </p>
              <p className="text-[13px] text-[#1565C0] mt-3">
                Durchschnittliche Einrichtungszeit: <strong>1–3 Wochen</strong>
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleContactRequest}
                className="px-6 py-3 bg-[#0F429F] text-white font-medium text-[14px] rounded-full hover:bg-[#246AFF] transition whitespace-nowrap"
                style={{ borderRadius: '24px' }}
              >
                Beratung anfragen →
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Prozess */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6">
          <h2 className="text-[18px] font-bold text-[#273A5F] mb-4">So läuft die Einrichtung ab</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Tarifauswahl', desc: 'Riso stellt dir passende Tarife vor — du wählst Leistungsumfang und Beitragshöhe' },
              { step: '2', title: 'Gruppenvertrag', desc: 'Riso schließt einen Gruppenvertrag für dein Unternehmen ab — günstiger als Einzeltarife' },
              { step: '3', title: 'Mitarbeiter einschreiben', desc: 'Neue Mitarbeiter werden ohne Gesundheitsprüfung aufgenommen — Riso koordiniert das Onboarding' },
              { step: '4', title: 'Monatliche Abwicklung', desc: 'Riso leitet die Beiträge automatisch an den Versicherer weiter — du zahlst pauschal pro Mitarbeiter' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0F429F] text-white flex items-center justify-center text-[13px] font-bold">
                  {step}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#273A5F]">{title}</p>
                  <p className="text-[13px] text-[#666666]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
