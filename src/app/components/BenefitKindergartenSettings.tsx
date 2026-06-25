import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { BenefitTaxInfo } from './BenefitTaxInfo';
import { StatusBadge } from './Table';
import { benefitsSettingsData } from './benefitSettingsData';

type NutzungStatus = 'approved' | 'pending' | 'rejected';

interface KindergartenNutzung {
  id: string;
  employeeName: string;
  location: string;
  kinder: number;
  kostenMonat: number;
  status: NutzungStatus;
}

const STATUS_CONFIG: Record<NutzungStatus, { label: string; bg: string; color: string; border: string }> = {
  approved: { label: '✅ Aktiv',      bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
  pending:  { label: '⏳ Ausstehend', bg: '#FFF8E1', color: '#F57F17', border: '#FFD54F' },
  rejected: { label: '❌ Abgelehnt',  bg: '#FFEBEE', color: '#C62828', border: '#EF9A9A' },
};

const MOCK_NUTZUNGEN: KindergartenNutzung[] = [
  { id: '1', employeeName: 'Anna Müller',    location: 'München',    kinder: 2, kostenMonat: 840,  status: 'approved' },
  { id: '2', employeeName: 'Klaus Fischer',  location: 'Heddesheim', kinder: 1, kostenMonat: 320,  status: 'pending'  },
  { id: '3', employeeName: 'Sara Becker',    location: 'München',    kinder: 1, kostenMonat: 450,  status: 'approved' },
  { id: '4', employeeName: 'Tom Schmidt',    location: 'Berlin',     kinder: 3, kostenMonat: 1100, status: 'rejected' },
];

export function BenefitKindergartenSettings() {
  const benefitName = 'Kindergarten';
  const benefitData = benefitsSettingsData['kindergarten'];
  const description = benefitData?.description;
  const taxInfo = benefitData?.taxInfo;
  const highlightBoxes = benefitData?.highlightBoxes ?? [];
  const belegprinzip = benefitData?.belegprinzip;
  const vorteile = benefitData?.vorteile;
  const personas = benefitData?.personas;
  const faqs = benefitData?.faqs ?? [];

  const [activeTab, setActiveTab] = useState<'info' | 'bearbeitung' | 'faqs'>('info');
  const [isActive, setIsActive] = useState(true);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const goBack = () =>
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));

  const aktiveNutzungen = MOCK_NUTZUNGEN.filter(n => n.status === 'approved');
  const gesamtKosten = aktiveNutzungen.reduce((sum, n) => sum + n.kostenMonat, 0);
  const gesamtKinder = MOCK_NUTZUNGEN.reduce((sum, n) => sum + n.kinder, 0);

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

            {/* 2. Das Belegprinzip */}
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
          <div style={{ maxWidth: '900px' }}>
            {/* Aktive Nutzungen */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>Aktive Nutzungen</h2>

              {MOCK_NUTZUNGEN.length === 0 ? (
                <p className="text-[14px] text-[#9E9E9E] text-center py-8">Noch keine Nutzungen eingetragen.</p>
              ) : (
                <>
                  <div
                    className="bg-[#273A5F] px-4 h-11 rounded-t-lg"
                    style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.6fr 1.2fr 0.6fr 1fr 1fr' }}
                  >
                    {['Mitarbeiter', 'Standort', 'Kinder', 'Kosten/Monat', 'Status'].map(h => (
                      <span key={h} className="text-white font-bold text-xs uppercase tracking-wide">{h}</span>
                    ))}
                  </div>

                  {MOCK_NUTZUNGEN.map((n, i) => {
                    const sc = STATUS_CONFIG[n.status];
                    return (
                      <div
                        key={n.id}
                        className={`px-4 border-b border-[#E5E7EB] last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}
                        style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.6fr 1.2fr 0.6fr 1fr 1fr', minHeight: '52px', paddingTop: '8px', paddingBottom: '8px' }}
                      >
                        <span className="text-[14px] text-[#333333]">{n.employeeName}</span>
                        <span className="text-[13px] text-[#666666]">{n.location}</span>
                        <span className="text-[13px] text-[#333333]">{n.kinder}</span>
                        <span className="text-[13px] text-[#273A5F] font-medium">
                          {n.kostenMonat.toLocaleString('de-DE')} €
                        </span>
                        <span
                          className="text-[11px] font-medium px-2 py-1 rounded-full"
                          style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, width: 'fit-content' }}
                        >
                          {sc.label}
                        </span>
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
                  { label: 'Mitarbeiter mit Zugriff', value: String(MOCK_NUTZUNGEN.length) },
                  { label: 'Kosten diesen Monat',     value: `${gesamtKosten.toLocaleString('de-DE')} €` },
                  { label: 'Kinder gesamt',           value: String(gesamtKinder) },
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
    </div>
  );
}
