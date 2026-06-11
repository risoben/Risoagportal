// BENEFITS VIEW vs LIST (Nalini clarification 2026-06-03):
// - LIST:  GET /api/v1/portal/benefits          → returns all benefits with id, name, status, budget (compact)
//          Used in: LocationDetails "Benefits" tab, EmployeeEditCreate benefit selection
// - VIEW:  GET /api/v1/portal/benefits/{id}     → returns full detail: description, limits, locations, stats
//          Used in: BenefitSettings (per-benefit detail page), this component (BenefitsOverviewNew)
// benefit_id is integer in both endpoints (not string).

import React, { useMemo, useState } from 'react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { StatusBadge } from './Table';
import { ChevronLeft, X } from 'lucide-react';

interface Benefit {
  id: string;
  name: string;
  description: string;
  limit: string;
  active: boolean;
  locations: string[];
  details: string;
}

const benefits: Benefit[] = [
  {
    id: 'mittagessen',
    name: 'Mittagessen',
    description: 'bis 115€ / Monat',
    limit: 'bis 115€ / Monat',
    active: true,
    locations: ['München', 'Heddesheim'],
    details: 'Erstattet deinen Mitarbeitern Mahlzeiten am Arbeitstag — täglich, flexibel, steuerfrei.'
  },
  {
    id: 'internet',
    name: 'Internetzuschuss',
    description: 'bis 50€ / Monat',
    limit: 'bis 50€ / Monat',
    active: true,
    locations: ['München', 'Berlin', 'Heddesheim'],
    details: 'Du übernimmst die privaten Internetkosten deiner Mitarbeiter — monatlich, unkompliziert.'
  },
  {
    id: 'kindergarten',
    name: 'Kindergartenzuschuss',
    description: 'Tatsächliche Betreuungskosten',
    limit: 'Tatsächliche Betreuungskosten',
    active: false,
    locations: ['München'],
    details: 'Übernahme der Kita-Kosten deiner Mitarbeiter — unbegrenzt, bis zur Einschulung.'
  },
  {
    id: 'commuting',
    name: 'Fahrkostenzuschuss',
    description: 'ab 0,38€ pro Kilometer',
    limit: 'ab 0,38€ pro Kilometer',
    active: true,
    locations: ['München', 'Heddesheim'],
    details: 'Erstattung des Arbeitswegs — abhängig von Entfernung und Arbeitstagen.'
  },
  {
    id: 'erholung',
    name: 'Erholungsbeihilfe',
    description: 'ab 156€ / Jahr',
    limit: 'ab 156€ / Jahr',
    active: true,
    locations: ['München', 'Berlin', 'Heddesheim'],
    details: 'Jährlicher Urlaubszuschuss für Mitarbeiter und Familie — einmal im Jahr.'
  },
  {
    id: 'sachbezug',
    name: 'Sachbezug',
    description: 'bis 50€ / Monat',
    limit: 'bis 50€ / Monat',
    active: true,
    locations: ['München', 'Berlin'],
    details: 'Monatlicher Gutschein aus unserem Partnernetzwerk — deine Mitarbeiter wählen selbst.'
  },
  {
    id: 'danke-bonus',
    name: 'Danke-Bonus',
    description: 'Variable Prämie',
    limit: 'Variable Prämie',
    active: true,
    locations: ['München'],
    details: 'Flexibler Einmal-Bonus für besondere Leistungen — du entscheidest wann und wie viel.'
  },
  {
    id: 'geburtstag',
    name: 'Geburtstagsgutschein',
    description: 'bis zu 60€ / Jahr',
    limit: 'bis zu 60€ / Jahr',
    active: true,
    locations: ['München', 'Heddesheim'],
    details: 'Automatischer Gutschein im Geburtstagsmonat — persönliche Wertschätzung ohne Aufwand.'
  },
  {
    id: 'oepnv',
    name: 'ÖPNV-Ticket',
    description: 'kein gesetzliches Maximum',
    limit: 'kein gesetzliches Maximum',
    active: false,
    locations: ['Berlin'],
    details: 'Du übernimmst das Ticket für Bus und Bahn — vollständig steuerfrei, kein Höchstbetrag.'
  },
  {
    id: 'bkv',
    name: 'BKV',
    description: 'bis 1.000€ / Jahr',
    limit: 'bis 1.000€ / Jahr',
    active: true,
    locations: ['München'],
    details: 'Private Zusatzkrankenversicherung direkt durch dich als Arbeitgeber bezahlt.'
  },
  {
    id: 'bav',
    name: 'BAV',
    description: 'bis 676€ / Monat',
    limit: 'bis 676€ / Monat',
    active: false,
    locations: ['München', 'Berlin'],
    details: 'Betriebliche Altersvorsorge für deine Mitarbeiter — monatlicher Zuschuss direkt in ihren Versicherungsvertrag, steuerlich begünstigt, von Riso vollständig abgewickelt.'
  }
];

// Gruppierung 1:1 übernommen aus BenefitsManagement.tsx (benefitCategories)
type GroupId = 'cash' | 'gutschein' | 'versicherung';

const GROUPS: { id: GroupId; name: string; icon: string; benefitIds: string[]; intro: string[]; highlights: string[] }[] = [
  {
    id: 'cash',
    name: 'Cash Benefits',
    icon: '/assets/group-icons/cash-benefits.svg',
    benefitIds: ['mittagessen', 'internet', 'kindergarten', 'commuting', 'erholung', 'danke-bonus', 'oepnv'],
    intro: [
      'Prinzip: Beleg einreichen, Geld zurückbekommen.',
      'Dazu zählen z. B. Mittagessen, Internet, Fahrtkosten und Erholung.',
    ],
    highlights: [
      'Bis zu 3.000 € steuerfrei pro Jahr möglich',
      'Flexibel für Internet, Fahrt, Essen etc. einsetzbar',
      'Gültig: Belege für Mittagessen, Fahrkarten, Online-Käufe',
    ],
  },
  {
    id: 'gutschein',
    name: 'Gutschein Benefits',
    icon: '/assets/group-icons/gutschein-benefits.svg',
    benefitIds: ['sachbezug', 'geburtstag'],
    intro: [
      'Prinzip: Gutschein erhalten, bei Partnern einlösen.',
      'Dazu zählen der monatliche Sachbezug und der Geburtstagsgutschein.',
    ],
    highlights: [
      'Bis zu 50 €/Monat + 60 € zum Geburtstag steuerfrei',
      'Auswahl bei vielen Partnern wie Amazon, Rewe, Tankstellen etc.',
      'Beliebt: Rewe, dm, Amazon, Tanken, Zalando',
    ],
  },
  {
    id: 'versicherung',
    name: 'Versicherungs Benefits',
    icon: '/assets/group-icons/versicherung-benefits.png',
    benefitIds: ['bkv', 'bav'],
    intro: [
      'Prinzip: Arbeitgeber zahlt, Mitarbeiter sind abgesichert.',
      'Dazu zählen die betriebliche Krankenversicherung (BKV) und die betriebliche Altersvorsorge (bAV).',
    ],
    highlights: [
      'Arbeitgeber zahlt private Zusatzversicherung',
      'Automatische Absicherung – kein Aufwand',
      'Beispiele: Zahnzusatz, Klinik, Vorsorge',
    ],
  },
];

export function BenefitsOverviewNew() {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupId | null>(null);

  const groupsWithBenefits = useMemo(() => {
    return GROUPS.map(group => {
      const groupBenefits = group.benefitIds
        .map(id => benefits.find(b => b.id === id))
        .filter((b): b is Benefit => Boolean(b));
      const activeCount = groupBenefits.filter(b => b.active).length;
      return { ...group, benefits: groupBenefits, activeCount };
    });
  }, []);

  const handleManageBenefits = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));
  };

  const handleEdit = (benefitId: string) => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-edit', benefitId } }));
  };

  const handleCardClick = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
  };

  const handleCloseModal = () => {
    setSelectedBenefit(null);
  };

  const formatLocations = (locations: string[]) => {
    if (locations.length <= 2) return locations.join(', ');
    return `${locations[0]}, ${locations[1]}, ...`;
  };

  const activeGroup = groupsWithBenefits.find(g => g.id === selectedGroup) ?? null;

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#273A5F] font-bold text-[32px] mb-2">Benefits</h1>
            <p className="text-[#666666] text-[14px]">
              Übersicht aller verfügbaren Benefits für deine Mitarbeiter
            </p>
          </div>
          <button
            onClick={handleManageBenefits} className="px-6 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
          >
            Benefits verwalten
          </button>
        </div>
      </div>

      {!activeGroup ? (
        <div className="px-8 py-8">
          <div className="grid grid-cols-3 gap-6">
              {groupsWithBenefits.map(group => (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroup(group.id)}
                  className="bg-white border border-[#E0E0E0] rounded-xl p-8 cursor-pointer flex flex-col items-center text-center transition-all duration-200"
                  style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(15,66,159,0.12)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#246AFF';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#E0E0E0';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full mb-5"
                    style={{ width: '68px', height: '68px', backgroundColor: '#EFF6FF' }}
                  >
                    <img src={group.icon} alt={group.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                  </div>
                  <div className="flex flex-col w-full" style={{ flex: 1 }}>
                    <h2 className="text-[#273A5F] font-bold text-[22px] mb-3" style={{ letterSpacing: '-0.2px' }}>{group.name}</h2>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-[#666666] text-[14px]">{group.benefits.length} Benefits</span>
                      <span
                        className="text-[13px] font-medium px-2.5 py-0.5 rounded-full"
                        style={{ background: '#E8F5E9', color: '#2E7D32', border: '1px solid #A5D6A7' }}
                      >
                        🟢 {group.activeCount} aktiv
                      </span>
                    </div>
                    {/* Fixed-height description area — ensures feature list starts at same position in all cards */}
                    <div className="flex flex-col gap-2 text-left" style={{ minHeight: '88px' }}>
                      {group.intro.map(sentence => (
                        <p key={sentence} className="text-[#666666] text-[14px]" style={{ lineHeight: '1.6' }}>
                          {sentence}
                        </p>
                      ))}
                    </div>
                    <ul className="flex flex-col gap-2 mt-6 text-left">
                      {group.highlights.map(highlight => (
                        <li key={highlight} className="text-[#444444] text-[14px] flex gap-2" style={{ lineHeight: '1.5' }}>
                          <span className="text-[#2E7D32] font-bold flex-shrink-0">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
        </div>
      ) : (
        <div className="px-8 py-8">
          <button
            onClick={() => setSelectedGroup(null)}
            className="flex items-center text-[#0F429F] hover:text-[#246AFF] mb-6 text-[14px] font-medium"
          >
            <ChevronLeft size={20} />
            <span className="ml-1">Zurück zur Übersicht</span>
          </button>

          <h2 className="text-[#273A5F] font-bold text-[17px] mb-4">{activeGroup.name}</h2>

          {/* Tabelle — gleiche Struktur/Optik wie "Benefits verwalten" (BenefitsManagement.tsx) */}
          <div className="bg-white rounded-lg border border-[#E0E0E0] overflow-x-auto">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0,1fr))', minWidth: '600px' }}>
              {['Icon', 'Name', 'Budget', 'Status', 'Standorte', 'Aktion'].map(h => (
                <div key={h} style={{ background: '#273A5F', height: '48px', display: 'flex', alignItems: 'center', padding: '0 24px', overflow: 'hidden' }}>
                  <span className="text-white font-bold text-[14px] uppercase tracking-wide">{h}</span>
                </div>
              ))}
              {activeGroup.benefits.map((benefit, index) => {
                const bg = index % 2 === 0 ? '#fff' : '#F9FAFB';
                const c: React.CSSProperties = { background: bg, borderBottom: '1px solid #E5E7EB', height: '56px', display: 'flex', alignItems: 'center', padding: '0 24px', overflow: 'hidden' };
                return (
                  <React.Fragment key={benefit.id}>
                    <div style={c} className="cursor-pointer" onClick={() => handleCardClick(benefit)}>
                      <BenefitIconComponent benefitName={benefit.name} size={32} background={true} />
                    </div>
                    <div style={c} className="text-[14px] text-[#000000] cursor-pointer" onClick={() => handleCardClick(benefit)}>{benefit.name}</div>
                    <div style={c} className="text-[14px] text-[#000000]">{benefit.limit}</div>
                    <div style={c}><StatusBadge status={benefit.active ? 'Aktiv' : 'Inaktiv'} type={benefit.active ? 'success' : 'inactive'} /></div>
                    <div style={c} className="text-[14px] text-[#666666]">{formatLocations(benefit.locations)}</div>
                    <div style={c}>
                      <button onClick={() => handleEdit(benefit.id)} className="text-[14px] text-[#0F429F] hover:text-[#246AFF] hover:underline transition">
                        Bearbeiten
                      </button>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Benefit Info Modal */}
      {selectedBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
        >
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[600px]"
            style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <BenefitIconComponent benefitName={selectedBenefit.name} size={48} />
                  <h2 className="text-[#273A5F] font-bold text-[17px]">{selectedBenefit.name}</h2>
                </div>
                <button
                  onClick={handleCloseModal} className="w-8 h-8 flex items-center justify-center text-[#666666] hover:bg-[#F0F4FF] rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-[#273A5F] font-medium text-[17px] mb-2">Beschreibung:</h3>
                  <p className="text-[#333333] text-[14px]">{selectedBenefit.details}</p>
                </div>

                <div>
                  <h3 className="text-[#273A5F] font-medium text-[17px] mb-2">Budget pro Mitarbeiter:</h3>
                  <p className="text-[#333333] text-[14px]">{selectedBenefit.limit}</p>
                </div>

                <div>
                  <h3 className="text-[#273A5F] font-medium text-[17px] mb-2">Verfügbar für Standorte:</h3>
                  <ul className="space-y-1">
                    {selectedBenefit.locations.map(location => (
                      <li key={location} className="text-[#666666] text-[14px]">
                        • {location}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[#273A5F] font-medium text-[17px] mb-2">Status:</h3>
                  <StatusBadge status={selectedBenefit.active ? 'Aktiv' : 'Inaktiv'} type={selectedBenefit.active ? 'success' : 'inactive'} />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-6 mt-6 border-t border-[#E0E0E0]">
                <button
                  onClick={handleCloseModal} className="px-6 py-3 border border-[#0F429F] text-[#0F429F] text-[14px] font-medium rounded-full hover:bg-[#F0F4FF] transition-colors"
                >
                  Schließen
                </button>
                <button
                  onClick={() => handleEdit(selectedBenefit.id)} className="flex-1 px-6 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
                >
                  Dieses Benefit verwalten
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
