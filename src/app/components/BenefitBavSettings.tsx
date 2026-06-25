import { useState } from 'react';
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

export function BenefitBavSettings() {
  const benefitName = 'Betriebliche Altersvorsorge (BAV)';
  const benefitData = benefitsSettingsData['bav'];
  const description = benefitData?.description;
  const taxInfo = benefitData?.taxInfo;
  const highlightBoxes = benefitData?.highlightBoxes ?? [];
  const wieFunktioniert = benefitData?.wieFunktioniert;
  const personas = benefitData?.personas;
  const vorteile = benefitData?.vorteile;
  const faqs = benefitData?.faqs ?? [];

  const [activeTab, setActiveTab] = useState<'info' | 'bearbeitung' | 'faqs'>('info');
  const setupStatus: SetupStatus = 'not_started';

  const goBack = () =>
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));

  const handleContactRequest = () =>
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'kontakt' } }));

  const sc = STATUS_LABELS[setupStatus];

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
            <BenefitIconComponent benefitName="BAV" size={48} background={true} />
            <h1 className="text-[20px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {benefitName}
            </h1>
          </div>
          <span
            className="text-[13px] font-medium px-3 py-1.5 rounded-full"
            style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontFamily: 'Roboto, sans-serif' }}
          >
            {sc.label}
          </span>
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
            {/* 1. Was ist die BAV? */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Was ist die BAV?
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
                <h2 className="text-[17px] font-bold text-[#273A5F] mb-5" style={{ fontFamily: 'Roboto, sans-serif' }}>Wie funktioniert es?</h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 items-stretch">
                  <p className="text-[15px] font-bold text-[#0F429F] uppercase tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>{wieFunktioniert.agTitle}</p>
                  <p className="text-[15px] font-bold text-[#273A5F] uppercase tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>{wieFunktioniert.maTitle}</p>
                  {Array.from({ length: Math.max(wieFunktioniert.agSteps.length, wieFunktioniert.maSteps.length) }).flatMap((_, i) => {
                    const ag = wieFunktioniert.agSteps[i];
                    const ma = wieFunktioniert.maSteps[i];
                    return [
                      ag ? (
                        <div key={`ag-${i}`} className="flex items-start gap-3 bg-[#F0F4FF] border border-[#C7D7F9] rounded-lg p-3 h-full">
                          <div className="flex-shrink-0 mt-0.5 flex items-center justify-center rounded-full bg-[#0F429F] text-white text-[12px] font-bold" style={{ width: '20px', height: '20px', fontFamily: 'Roboto, sans-serif' }}>{ag.step}</div>
                          <div>
                            <p className="text-[14px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>{ag.title}</p>
                            <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>{ag.text}</p>
                          </div>
                        </div>
                      ) : <div key={`ag-${i}`} />,
                      ma ? (
                        <div key={`ma-${i}`} className="flex items-start gap-3 bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-3 h-full">
                          <div className="flex-shrink-0 mt-0.5 flex items-center justify-center rounded-full bg-[#273A5F] text-white text-[12px] font-bold" style={{ width: '20px', height: '20px', fontFamily: 'Roboto, sans-serif' }}>{ma.step}</div>
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

            {/* 3. Personas / Was es abdeckt (aus Landing Page) */}
            {personas && (
              <div className="border border-[#E0E0E0] rounded-xl p-6 mb-6" style={{ background: '#F9FAFB' }}>
                <h2 className="text-[17px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>{personas.title}</h2>
                {personas.intro && (
                  <p className="text-[13px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>{personas.intro}</p>
                )}
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

            {/* 4. Steuerliche Behandlung */}
            {taxInfo && <BenefitTaxInfo steuer={taxInfo.steuer} sv={taxInfo.sv} />}

            {/* 5. Erklärvideo */}
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
            {/* Beratungs-Kasten */}
            <div className="rounded-xl p-6 mb-6" style={{ background: '#E3F2FD', border: '1px solid #90CAF9' }}>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-[17px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Beratung anfragen</h2>
                  <p className="text-[14px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
                    Die BAV wird gemeinsam mit Riso eingerichtet. Unser Team begleitet dich durch den gesamten Prozess, von der Auswahl des richtigen Versicherers bis zur Integration in deine Gehaltsabrechnung.
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

            {/* So läuft die Einrichtung ab */}
            <div className="bg-white border border-[#E0E0E0] rounded-xl p-6">
              <h2 className="text-[17px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>So läuft die Einrichtung ab</h2>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Beratungsgespräch', desc: 'Riso klärt mit dir welche Variante (Direktversicherung, Pensionskasse, etc.) am besten passt' },
                  { step: '2', title: 'Vertragsauswahl', desc: 'Riso empfiehlt passende Versicherer und koordiniert die Vertragsunterzeichnung' },
                  { step: '3', title: 'Mitarbeiter onboarden', desc: 'Mitarbeiter werden informiert und können Entgeltumwandlungen über die Riso App einrichten' },
                  { step: '4', title: 'Laufende Abwicklung', desc: 'Riso leitet Beiträge automatisch weiter, monatlich, zuverlässig, ohne deinen Aufwand' },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0F429F] text-white flex items-center justify-center text-[14px] font-bold" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {step}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>{title}</p>
                      <p className="text-[14px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                    Du möchtest die {benefitName} einrichten oder hast Fragen zur Umsetzung? Unser Team begleitet dich durch den gesamten Prozess.
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
          </>
        )}
      </div>
    </div>
  );
}
