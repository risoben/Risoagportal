import { X } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';

type BenefitInfo = {
  id: string;
  name: string;
  headline: string;
  what: string;
  vorteile: string[];
  howItWorks: string[];
  wichtig?: string;
};

const benefitInfoData: Record<string, BenefitInfo> = {
  essenszuschuss: {
    id: 'essenszuschuss',    name: 'Essenszuschuss',
    headline: 'Für jeden Lifestyle und jede Essensgewohnheit geeignet.',
    what: 'Finanzielle Unterstützung für deine Mittagspause oder Mahlzeiten am Arbeitsplatz.',
    vorteile: [
      'Bis 7,67€ pro Tag',
      'Steuerfreier Zuschuss',
      'Einfach Kassenbon hochladen',
      'Monatlich bis zu 153€',
    ],
    howItWorks: [
      'Beleg speichern',
      'In App hochladen',
      'Geld kommt in nächster Lohnabrechnung',
    ],
  },
  internetzuschuss: {
    id: 'internetzuschuss',    name: 'Internetzuschuss',
    headline: 'In jede Situation anwendbar und bei jedem Anbieter möglich.',
    what: 'Zuschuss zu deinen Internet- und Mobilfunkkosten — egal ob Zuhause oder unterwegs.',
    vorteile: [
      'Bis 50€ pro Monat',
      'Steuerfreier Zuschuss',
      'Bei jedem Anbieter nutzbar',
      'Flexibel einsetzbar',
    ],
    howItWorks: [
      'Rechnungsbeleg hochladen',
      'Monatlich automatisch gutgeschrieben',
    ],
  },
  erholungsbeihilfe: {
    id: 'erholungsbeihilfe',    name: 'Erholungsbeihilfe',
    headline: 'Für Urlaubswünsche und Erholungsbedürfnisse.',
    what: 'Finanzielle Unterstützung für deinen wohlverdienten Urlaub.',
    vorteile: [
      'Bis 156€ pro Jahr',
      'Für Hotelaufenthalte und Reisen',
      'Steuerfreier Zuschuss',
      'Auch für Familie (Ehepartner, Kinder)',
    ],
    howItWorks: [
      'Hotelbuchung oder Flugticket hochladen',
      'Geld wird gutgeschrieben',
    ],
  },
  kindergarten: {
    id: 'kindergarten',    name: 'Kindergartenzuschuss',
    headline: 'Unbegrenzter Zuschuss für die Betreuung im Vorschulalter.',
    what: 'Finanzielle Unterstützung für Kindergarten, Vorschule oder Kinderbetreuung.',
    vorteile: [
      'Unbegrenzt',
      'Flexibel für verschiedene Betreuungsarten',
      'Steuerfreier Zuschuss',
      'Entlastung der Familie',
    ],
    howItWorks: [
      'Betreuungsrechnung hochladen',
      'Monatlich erstattet',
    ],
  },
  fahrtkosten: {
    id: 'fahrtkosten',    name: 'Fahrtkostenzuschuss',
    headline: 'Für die Anreise ins Büro.',
    what: 'Zuschuss zu deinen Fahrtkosten zur Arbeit.',
    vorteile: [
      'Flexible Höhe',
      'Steuerfreier Zuschuss',
      'Für Auto, Motorrad, Bahn',
      'Mobilität unterstützt',
    ],
    howItWorks: [
      'Belege hochladen',
      'Monatlich erstattet',
    ],
    wichtig: 'Entweder-oder mit ÖPNV-Ticket — du wählst eine Option',
  },
  oepnv: {
    id: 'oepnv',    name: 'ÖPNV-Ticket-Zuschuss',
    headline: 'Deutschlandticket und weitere ÖPNV Fahrten.',
    what: 'Zuschuss für deine umweltfreundliche Anreise mit öffentlichen Verkehrsmitteln.',
    vorteile: [
      'Bis zu 100€ pro Monat',
      'Steuerfreier Zuschuss',
      'Nachhaltig und entspannt',
      'Deutschlandticket möglich',
    ],
    howItWorks: [
      'ÖPNV-Ticket hochladen',
      'Automatisch erstattet',
    ],
    wichtig: 'Entweder-oder mit Fahrtkostenzuschuss — du wählst eine Option',
  },
  sachbezug: {
    id: 'sachbezug',    name: '50€-Sachbezug',
    headline: 'Gutscheine jeden Monat. Große Auswahl an Partnern.',
    what: 'Monatliche Gutschein-Auswahl für Shopping, Freizeit und mehr.',
    vorteile: [
      '50€ pro Monat',
      'Große Partner-Auswahl',
      'Steuerfreier Zuschuss',
      'Jederzeit nutzbar',
    ],
    howItWorks: [
      'Gutschein in der App wählen',
      'QR-Code oder Code erhalten',
      'Einlösen',
    ],
  },
  geburtstag: {
    id: 'geburtstag',    name: 'Geburtstagsgutschein / Jubiläum',
    headline: 'Ein besonderer Tag, ein besonderes Dankeschön.',
    what: 'Spezielle Gutscheine zu deinem Geburtstag und Jubiläum — ein persönliches Dankeschön.',
    vorteile: [
      'Besondere Anerkennung',
      'Zu besonderen Anlässen',
      'Steuerfreier Zuschuss',
      'Persönlich und wertschätzend',
    ],
    howItWorks: [
      'Automatisch zu Geburtstag/Jubiläum',
      'Gutschein in App verfügbar',
    ],
  },
  danke: {
    id: 'danke',    name: 'Danke-Bonus',
    headline: 'Für besondere Leistungen und Erfolge.',
    what: 'Finanzielle Anerkennung für außergewöhnliche Mitarbeiterleistungen.',
    vorteile: [
      'Flexibler Betrag',
      'Steuerfreier Zuschuss',
      'Persönliche Wertschätzung',
      'Motivierend und fair',
    ],
    howItWorks: [
      'Arbeitgeber vergibt den Bonus',
      'Automatisch in Lohnabrechnung',
    ],
  },
  bkv: {
    id: 'bkv',    name: 'BKV (Betriebliche Krankenversicherung)',
    headline: 'Wohlbefinden und Gesundheit nicht nur am Arbeitsplatz.',
    what: 'Private Zusatzkrankenversicherung mit hohem Leistungsspektrum.',
    vorteile: [
      'Umfassender Versicherungsschutz',
      'Steuerfreier Zuschuss',
      'Für dich und deine Familie',
      'Flexible Leistungen',
    ],
    howItWorks: [
      'Versicherung wählen',
      'Arbeitgeber zahlt Zuschuss',
      'Automatisch versichert',
    ],
  },
  bav: {
    id: 'bav',    name: 'BAV (Betriebliche Altersvorsorge)',
    headline: 'Finanzielle Sicherheit für die Zeit nach dem Arbeitsleben.',
    what: 'Zusätzliche Altersvorsorge über deinen Arbeitgeber — für einen sorgenfreien Ruhestand.',
    vorteile: [
      'Aufbau zusätzlicher Rente',
      'Steuerfreier Zuschuss',
      'Sichere Anlage',
      'Für deine Zukunft',
    ],
    howItWorks: [
      'Plan wählen',
      'Arbeitgeber zahlt ein',
      'Automatisch gespart',
    ],
  },
};

type BenefitInfoModalProps = {
  benefitId: string;
  onClose: () => void;
};

export function BenefitInfoModal({ benefitId, onClose }: BenefitInfoModalProps) {
  const benefit = benefitInfoData[benefitId];

  if (!benefit) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl"
        style={{ width: '700px', maxHeight: '85vh', overflow: 'auto', borderRadius: '16px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-[#E8E8E8] flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            <BenefitIconComponent benefitName={benefit.name} size={48} background={true} />
            <h2 className="text-[#000000] font-bold text-[24px]">{benefit.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#666666] hover:text-[#000000] text-3xl font-light"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-8 py-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
          {/* Section 1: Headline */}
          <div className="mb-6">
            <p className="text-[#0F429F] font-medium text-[18px] leading-relaxed">
              {benefit.headline}
            </p>
          </div>

          {/* Section 2: Was ist das? */}
          <div className="mb-6">
            <h3 className="text-[#000000] font-medium text-[14px] mb-2">Was ist das?</h3>
            <p className="text-[#666666] text-[13px] leading-relaxed">{benefit.what}</p>
          </div>

          {/* Section 3: Deine Vorteile */}
          <div className="mb-6">
            <h3 className="text-[#000000] font-medium text-[14px] mb-3">Deine Vorteile:</h3>
            <div className="space-y-2">
              {benefit.vorteile.map((vorteil, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-[#4CAF50] text-[16px] mt-0.5">✓</span>
                  <span className="text-[#666666] text-[13px]">{vorteil}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: So funktioniert's */}
          <div className="mb-6">
            <h3 className="text-[#000000] font-medium text-[14px] mb-3">So funktioniert's:</h3>
            <div className="space-y-3">
              {benefit.howItWorks.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F0F4FF] text-[#0F429F] font-medium text-[13px] flex-shrink-0"
                  >
                    {index + 1}
                  </div>
                  <span className="text-[#666666] text-[13px] leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Wichtig zu wissen (Optional) */}
          {benefit.wichtig && (
            <div className="mb-6">
              <div className="bg-[#FFF9E6] border border-[#FFE082] rounded-lg p-4" style={{ borderRadius: '8px' }}>
                <h3 className="text-[#000000] font-medium text-[14px] mb-2">Wichtig zu wissen:</h3>
                <p className="text-[#666666] text-[13px]">{benefit.wichtig}</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 border-t border-[#E8E8E8] bg-[#F9FAFB]">
          <button
            onClick={onClose}
            className="w-full px-8 py-3 bg-[#4CAF50] text-white font-medium rounded-full hover:bg-[#45a049] transition"
            style={{ borderRadius: '24px' }}
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
}
