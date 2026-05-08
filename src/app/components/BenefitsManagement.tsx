import React, { useMemo } from 'react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { StatusBadge } from './Table';

type ManagedBenefit = {
  id: string;
  name: string;
  limit: string;
  status: 'active' | 'inactive';
  locations: string[];
  description?: string;
};

// TODO: Replace this mock data with a real API call.
// Endpoint: GET /api/v1/portal/benefits
// See DEVELOPER_GUIDE.md Section 5 (Benefit) for the full response shape.
const managedBenefits: ManagedBenefit[] = [
  {
    id: 'mittagessen',
    name: 'Mittagessen',
    limit: '100€/Monat',
    status: 'active',
    locations: ['München', 'Heddesheim'],
    description: 'Täglicher Zuschuss für Mittagessen in der Kantine oder bei Restaurants.',
  },
  {
    id: 'internet',
    name: 'Internet',
    limit: '50€/Monat',
    status: 'active',
    locations: ['München'],
    description: 'Monatlicher Zuschuss für Internetkosten im Home Office.',
  },
  {
    id: 'kindergarten',
    name: 'Kindergarten',
    limit: '150€/Monat',
    status: 'inactive',
    locations: ['München', 'Berlin', 'Heddesheim'],
    description: 'Zuschuss für Kindergartenkosten.',
  },
  {
    id: 'commuting',
    name: 'Fahrkostenzuschuss',
    limit: '80€/Monat',
    status: 'active',
    locations: ['München', 'Viernheim'],
    description: 'Zuschuss für Fahrtkosten zwischen Wohnung und Arbeitsplatz.',
  },
  {
    id: 'erholung',
    name: 'Erholung',
    limit: '156€/Jahr',
    status: 'active',
    locations: ['München', 'Heddesheim', 'Berlin'],
    description: 'Jährlicher Zuschuss für Erholung und Entspannung.',
  },
  {
    id: 'sachbezug',
    name: 'Sachbezug',
    limit: '50€/Monat',
    status: 'active',
    locations: ['Alle'],
    description: 'Sachlicher Zuschuss für Arbeitsmittel.',
  },
  {
    id: 'danke-bonus',
    name: 'Danke-Bonus',
    limit: '100€/Monat',
    status: 'active',
    locations: ['Alle'],
    description: 'Variable Prämie für besondere Leistungen.',
  },
  {
    id: 'geburtstag',
    name: 'Geburtstag',
    limit: '50€',
    status: 'active',
    locations: ['Alle'],
    description: 'Gutschein zum Geburtstag.',
  },
  {
    id: 'oepnv',
    name: 'ÖPNV',
    limit: '70€/Monat',
    status: 'active',
    locations: ['München', 'Berlin'],
    description: 'Zuschuss für öffentliche Verkehrsmittel.',
  },
  {
    id: 'bkv',
    name: 'BKV',
    limit: '80€/Monat',
    status: 'inactive',
    locations: ['Alle'],
    description: 'Betriebliche Krankenversicherung.',
  },
  {
    id: 'bav',
    name: 'BAV',
    limit: '150€/Monat',
    status: 'active',
    locations: ['Alle'],
    description: 'Betriebliche Altersvorsorge.',
  },
];

// TODO V2: BKV and BAV are not yet implemented in the backend. Their activation logic differs from standard benefits.
// TODO V2: Add "Mehr Info zum Benefit" button per row that opens a dedicated benefit detail page (not just the info popup).

export function BenefitsManagement() {
  const handleEdit = (benefitId: string) => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-edit', benefitId } }));
  };

  const formatLocations = (locations: string[]) => {
    if (locations.length <= 2) {
      return locations.join(', ');
    }
    return `${locations[0]}, ${locations[1]}, ...`;
  };

  const groupedBenefits = useMemo(() => {
    const benefitCategories: Record<string, 'cash' | 'other' | 'insurance'> = {
      'mittagessen': 'cash',
      'internet': 'cash',
      'kindergarten': 'cash',
      'commuting': 'cash',
      'erholung': 'cash',
      'sachbezug': 'other',
      'danke-bonus': 'cash',
      'geburtstag': 'other',
      'oepnv': 'cash',
      'bkv': 'insurance',
      'bav': 'insurance',
    };

    return managedBenefits.reduce((acc, benefit) => {
      const categoryType = benefitCategories[benefit.id];

      let category = '';
      if (categoryType === 'cash') category = 'Cash-Benefits';
      else if (categoryType === 'other') category = 'Gutschein-Benefits';
      else if (categoryType === 'insurance') category = 'Versicherungs-Benefits';

      if (!category) return acc;
      if (!acc[category]) acc[category] = [];
      acc[category].push(benefit);
      return acc;
    }, {} as Record<string, typeof managedBenefits>);
  }, []);

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-6 py-6">
        <h1 className="text-[32px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Benefits verwalten
        </h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {Object.entries(groupedBenefits).map(([category, benefits]) => (
          <div key={category} className="mb-8">
            <h2 className="text-[#273A5F] font-bold text-[16px] mb-4">{category}</h2>
            <div className="bg-white rounded-lg border border-[#E0E0E0] overflow-x-auto">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0,1fr))', minWidth: '600px' }}>
                {['Icon','Name','Budget','Status','Standorte','Aktion'].map(h => (
                  <div key={h} style={{ background: '#273A5F', height: '48px', display: 'flex', alignItems: 'center', padding: '0 24px', overflow: 'hidden' }}>
                    <span className="text-white font-bold text-xs uppercase tracking-wide">{h}</span>
                  </div>
                ))}
                {benefits.map((benefit, index) => {
                  const bg = index % 2 === 0 ? '#fff' : '#F9FAFB';
                  const c: React.CSSProperties = { background: bg, borderBottom: '1px solid #E5E7EB', height: '56px', display: 'flex', alignItems: 'center', padding: '0 24px', overflow: 'hidden' };
                  return (
                    <React.Fragment key={benefit.id}>
                      <div style={c}><BenefitIconComponent benefitName={benefit.name} size={32} /></div>
                      <div style={c} className="text-sm text-[#000000]">{benefit.name}</div>
                      <div style={c} className="text-sm text-[#000000]">{benefit.limit}</div>
                      <div style={c}><StatusBadge status={benefit.status === 'active' ? 'Aktiv' : 'Inaktiv'} type={benefit.status === 'active' ? 'success' : 'inactive'} /></div>
                      <div style={c} className="text-sm text-[#666666]">{formatLocations(benefit.locations)}</div>
                      <div style={c}>
                        <button onClick={() => handleEdit(benefit.id)} className="text-[12px] text-[#0F429F] hover:text-[#246AFF] hover:underline transition">
                          Bearbeiten
                        </button>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Info Box */}
        <div className="bg-[#F0F4FF] border-l-4 border-[#0F429F] rounded p-4 mt-6"
          style={{ borderLeftWidth: '4px', borderRadius: '4px' }}
        >
          <p className="text-[12px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Hinweis: Benefits können pro Standort aktiviert und konfiguriert werden. Änderungen gelten ab 1. nächsten
            Monat.
          </p>
        </div>
      </div>
    </div>
  );
}
