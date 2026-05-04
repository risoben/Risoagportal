import { useState } from 'react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { X } from 'lucide-react';

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
    description: 'bis 100€ / Monat',
    limit: '100€ / Monat',
    active: true,
    locations: ['München', 'Heddesheim'],
    details: 'Steuerfreier Essenszuschuss für Mitarbeiter. Kann für Kantinenverpflegung oder Essensmarken verwendet werden.'
  },
  {
    id: 'internet',
    name: 'Internet',
    description: 'bis 50€ / Monat',
    limit: '50€ / Monat',
    active: true,
    locations: ['München', 'Berlin', 'Heddesheim'],
    details: 'Zuschuss für Internetkosten im Home Office. Gesetzliches Maximum: 50€/Monat.'
  },
  {
    id: 'kindergarten',
    name: 'Kindergarten',
    description: 'bis 150€ / Monat',
    limit: '150€ / Monat',
    active: false,
    locations: ['München'],
    details: 'Steuerfreier Zuschuss zur Kinderbetreuung gemäß §3 Nr. 33 EStG.'
  },
  {
    id: 'commuting',
    name: 'Commuting',
    description: 'bis 80€ / Monat',
    limit: '80€ / Monat',
    active: true,
    locations: ['München', 'Heddesheim'],
    details: 'Fahrtkostenzuschuss für Pendler. Exklusiv mit ÖPNV-Ticket.'
  },
  {
    id: 'erholung',
    name: 'Erholung',
    description: 'bis 13€ / Monat',
    limit: '13€ / Monat',
    active: true,
    locations: ['München', 'Berlin', 'Heddesheim'],
    details: 'Erholungsbeihilfe. Jahresmaximum 156€ = ~13€/Monat.'
  },
  {
    id: 'sachbezug',
    name: 'Sachbezug',
    description: 'bis 50€ / Monat',
    limit: '50€ / Monat',
    active: true,
    locations: ['München', 'Berlin'],
    details: '§8 Abs. 2 EStG — Monatlicher Gutschein-Benefit.'
  },
  {
    id: 'danke-bonus',
    name: 'Danke-Bonus',
    description: 'Variable Prämie',
    limit: '100€ / Monat',
    active: true,
    locations: ['München'],
    details: 'Flexible Prämie zur Wertschätzung außergewöhnlicher Leistungen.'
  },
  {
    id: 'geburtstag',
    name: 'Geburtstag',
    description: 'Einmaliger Gutschein',
    limit: '50€ / Jahr',
    active: true,
    locations: ['München', 'Heddesheim'],
    details: '§37b EStG — Einmaliger Gutschein zu besonderen Anlässen.'
  },
  {
    id: 'oepnv',
    name: 'ÖPNV',
    description: 'bis 70€ / Monat',
    limit: '70€ / Monat',
    active: false,
    locations: ['Berlin'],
    details: 'ÖPNV-Ticket-Zuschuss. Exklusiv mit Fahrtkostenzuschuss.'
  },
  {
    id: 'bkv',
    name: 'BKV',
    description: 'bis 80€ / Monat',
    limit: '80€ / Monat',
    active: true,
    locations: ['München'],
    details: 'Betriebliche Krankenversicherung mit erweiterten Leistungen.'
  },
  {
    id: 'bav',
    name: 'BAV',
    description: 'bis 150€ / Monat',
    limit: '150€ / Monat',
    active: false,
    locations: ['München', 'Berlin'],
    details: 'Betriebliche Altersvorsorge mit Arbeitgeberzuschuss.'
  }
];

export function BenefitsOverviewNew() {
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  const handleManageBenefits = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));
  };

  const handleCardClick = (benefit: Benefit) => {
    setSelectedBenefit(benefit);
  };

  const handleCloseModal = () => {
    setSelectedBenefit(null);
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#273A5F] font-bold text-[32px] mb-2">Benefits</h1>
            <p className="text-[#666666] text-[14px]">
              Übersicht aller verfügbaren Benefits für Ihre Mitarbeiter
            </p>
          </div>
          <button
            onClick={handleManageBenefits}
            className="px-6 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
          >
            Benefits verwalten
          </button>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {benefits.map(benefit => (
            <div
              key={benefit.id}
              onClick={() => handleCardClick(benefit)}
              className="aspect-square bg-white border border-[#E0E0E0] rounded-lg p-4 hover:shadow-md hover:border-[#0F429F] transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex gap-3 items-start">
                {/* Icon - Left Side */}
                <div className="flex-shrink-0">
                  <BenefitIconComponent benefitName={benefit.name} size={40} background={true} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-grow-0">
                  {/* Title */}
                  <h3 className="text-[#273A5F] font-bold text-xs leading-tight truncate">{benefit.name}</h3>
                  {/* Description */}
                  <p className="text-[#666666] text-[10px] leading-tight truncate">{benefit.description}</p>
                </div>
              </div>

              {/* Status Badge - Bottom */}
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium text-white w-fit"
                style={{
                  backgroundColor: benefit.active ? '#4CAF50' : '#9E9E9E'
                }}
              >
                {benefit.active ? '✓ Aktiv' : 'Inaktiv'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Benefit Info Modal */}
      {selectedBenefit && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-[600px]"
            style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <BenefitIconComponent benefitName={selectedBenefit.name} size={48} />
                  <h2 className="text-[#273A5F] font-bold text-[20px]">{selectedBenefit.name}</h2>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 flex items-center justify-center text-[#666666] hover:bg-[#F0F4FF] rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-[#273A5F] font-medium text-[13px] mb-2">Beschreibung:</h3>
                  <p className="text-[#333333] text-[14px]">{selectedBenefit.details}</p>
                </div>

                <div>
                  <h3 className="text-[#273A5F] font-medium text-[13px] mb-2">Limit pro Mitarbeiter:</h3>
                  <p className="text-[#333333] text-[14px]">{selectedBenefit.limit}</p>
                </div>

                <div>
                  <h3 className="text-[#273A5F] font-medium text-[13px] mb-2">Verfügbar für Standorte:</h3>
                  <ul className="space-y-1">
                    {selectedBenefit.locations.map(location => (
                      <li key={location} className="text-[#666666] text-[12px]">
                        • {location}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[#273A5F] font-medium text-[13px] mb-2">Status:</h3>
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium text-white"
                    style={{
                      backgroundColor: selectedBenefit.active ? '#4CAF50' : '#9E9E9E'
                    }}
                  >
                    {selectedBenefit.active ? '✅ Aktiv' : '⚪ Inaktiv'}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-6 mt-6 border-t border-[#E0E0E0]">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-3 border border-[#0F429F] text-[#0F429F] text-[14px] font-medium rounded-full hover:bg-[#F0F4FF] transition-colors"
                >
                  Schließen
                </button>
                <button
                  onClick={handleManageBenefits}
                  className="flex-1 px-6 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
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
