import { useState } from 'react';
import { Settings, Ban, Info } from 'lucide-react';
import { BenefitInfoModal } from './BenefitInfoModal';
import { BenefitIconComponent } from './BenefitIconComponent';
import { StatusBadge } from './Table';

type BenefitGroup = 'Cash Benefits' | 'Sachbezüge';

type Benefit = {
  id: string;
  group: BenefitGroup;
  name: string;
  description: string;
  employees: number;
  budgetMonth: number;
  usedMonth: number;
  available: number;
  percentage: number;
  status: 'aktiv' | 'inaktiv';
};

// TODO: Replace this mock data with a real API call.
// Endpoint: GET /api/v1/portal/benefits/overview
// See DEVELOPER_GUIDE.md Section 5 (Benefit) for the full response shape including usage stats.
const mockBenefits: Benefit[] = [
  // GRUPPE 1 — Cash Benefits
  {
    id: 'essenszuschuss',
    group: 'Cash Benefits',    name: 'Essenszuschuss',
    description: 'bis 7,67€/Tag',
    employees: 45,
    budgetMonth: 1250,
    usedMonth: 850,
    available: 400,
    percentage: 68,
    status: 'aktiv',
  },
  {
    id: 'internetzuschuss',
    group: 'Cash Benefits',    name: 'Internetzuschuss',
    description: 'bis 50€/Monat',
    employees: 38,
    budgetMonth: 950,
    usedMonth: 720,
    available: 230,
    percentage: 76,
    status: 'aktiv',
  },
  {
    id: 'erholungsbeihilfe',
    group: 'Cash Benefits',    name: 'Erholungsbeihilfe',
    description: 'bis 156€/Jahr',
    employees: 28,
    budgetMonth: 650,
    usedMonth: 455,
    available: 195,
    percentage: 70,
    status: 'aktiv',
  },
  {
    id: 'kindergarten',
    group: 'Cash Benefits',    name: 'Kindergartenzuschuss',
    description: 'individuell',
    employees: 12,
    budgetMonth: 850,
    usedMonth: 680,
    available: 170,
    percentage: 80,
    status: 'aktiv',
  },
  {
    id: 'fahrtkosten',
    group: 'Cash Benefits',    name: 'Fahrtkostenzuschuss',
    description: 'exklusiv',
    employees: 34,
    budgetMonth: 1150,
    usedMonth: 805,
    available: 345,
    percentage: 70,
    status: 'aktiv',
  },
  {
    id: 'oepnv',
    group: 'Cash Benefits',    name: 'ÖPNV-Ticket-Zuschuss',
    description: 'exklusiv',
    employees: 52,
    budgetMonth: 2100,
    usedMonth: 1680,
    available: 420,
    percentage: 80,
    status: 'aktiv',
  },
  // GRUPPE 2 — Sachbezüge
  {
    id: 'sachbezug',
    group: 'Sachbezüge',    name: '50€-Sachbezug',
    description: 'monatlich',
    employees: 67,
    budgetMonth: 3350,
    usedMonth: 2680,
    available: 670,
    percentage: 80,
    status: 'aktiv',
  },
  {
    id: 'geburtstag',
    group: 'Sachbezüge',    name: 'Geburtstagsgutschein',
    description: 'Jubiläum',
    employees: 8,
    budgetMonth: 400,
    usedMonth: 280,
    available: 120,
    percentage: 70,
    status: 'inaktiv',
  },
];

export function BenefitsOverviewPage() {
  const [filterStatus, setFilterStatus] = useState<'Alle' | 'aktiv' | 'inaktiv'>('Alle');
  const [selectedBenefitInfo, setSelectedBenefitInfo] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('de-DE') + '€';
  };

  const filteredBenefits = mockBenefits.filter((benefit) => {
    if (filterStatus === 'Alle') return true;
    return benefit.status === filterStatus;
  });

  // Calculate totals
  const totalBudget = mockBenefits.reduce((sum, b) => sum + b.budgetMonth, 0);
  const totalUsed = mockBenefits.reduce((sum, b) => sum + b.usedMonth, 0);
  const totalAvailable = mockBenefits.reduce((sum, b) => sum + b.available, 0);
  const totalUtilization = Math.round((totalUsed / totalBudget) * 100);

  const handleConfigure = (benefitId: string) => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-edit' } }));
  };

  const handleDeactivate = (benefitId: string) => {
    alert(`Benefit "${benefitId}" wird deaktiviert`);
  };

  // Group benefits
  const groupedBenefits = filteredBenefits.reduce((acc, benefit) => {
    if (!acc[benefit.group]) {
      acc[benefit.group] = [];
    }
    acc[benefit.group].push(benefit);
    return acc;
  }, {} as Record<BenefitGroup, Benefit[]>);

  return (
    <div className="flex-1 bg-white overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#E8E8E8]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[#000000] font-bold text-[28px] mb-2">Alle Benefits</h1>
            <p className="text-[#666666] text-sm">
              {mockBenefits.length} verfügbare Benefits • Gesamtbudget: {formatCurrency(totalBudget)} (dieser Monat)
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('Alle')} className={`px-6 py-3 text-sm font-medium rounded-lg transition ${
                filterStatus === 'Alle'
                  ? 'bg-[#0F429F] text-white'
                  : 'bg-white text-[#666666] border border-[#E0E0E0] hover:bg-gray-50'
              }`}
              style={{ borderRadius: '8px' }}
            >
              Alle
            </button>
            <button
              onClick={() => setFilterStatus('aktiv')} className={`px-6 py-3 text-sm font-medium rounded-lg transition ${
                filterStatus === 'aktiv'
                  ? 'bg-[#0F429F] text-white'
                  : 'bg-white text-[#666666] border border-[#E0E0E0] hover:bg-gray-50'
              }`}
              style={{ borderRadius: '8px' }}
            >
              Aktiv
            </button>
            <button
              onClick={() => setFilterStatus('inaktiv')} className={`px-6 py-3 text-sm font-medium rounded-lg transition ${
                filterStatus === 'inaktiv'
                  ? 'bg-[#0F429F] text-white'
                  : 'bg-white text-[#666666] border border-[#E0E0E0] hover:bg-gray-50'
              }`}
              style={{ borderRadius: '8px' }}
            >
              Inaktiv
            </button>
          </div>
        </div>

        {/* Statistics Box */}
        <div className="bg-[#F0F4FF] border border-[#E0E0E0] rounded-xl p-6 mt-6" style={{ borderRadius: '12px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-[#666666] text-xs mb-2">Gesamtbudget (Monat)</p>
              <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalBudget)}</p>
            </div>
            <div>
              <p className="text-[#666666] text-xs mb-2">Gesamtvergeben</p>
              <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalUsed)}</p>
            </div>
            <div>
              <p className="text-[#666666] text-xs mb-2">Gesamtverfügbar</p>
              <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalAvailable)}</p>
            </div>
            <div>
              <p className="text-[#666666] text-xs mb-2">Gesamtauslastung</p>
              <p className="text-[#0F429F] font-bold text-2xl">{totalUtilization}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Content */}
      <div className="px-8 py-8">
        {Object.entries(groupedBenefits).map(([group, benefits]) => (
          <div key={group} className="mb-8 last:mb-0">
            {/* Group Header */}
            <h2 className="text-[#000000] font-bold text-[18px] mb-4">
              {group === 'Cash Benefits' ? 'GRUPPE 1 — Cash Benefits (Beleg-Erstattung)' : 'GRUPPE 2 — Sachbezüge (Gutschein)'}
            </h2>

            {/* Benefits Table */}
            <div className="border border-[#E8E8E8] rounded-lg overflow-x-auto">
              {/* Table Header */}
              <div className="bg-[#F0F4FF] grid grid-cols-[80px_1fr_140px_140px_160px_130px_120px_200px] h-12 items-center px-4" style={{ minWidth: '1000px' }}>
                <div className="text-[#666666] text-xs font-medium uppercase">Icon</div>
                <div className="text-[#666666] text-xs font-medium uppercase">Benefit-Name</div>
                <div className="text-[#666666] text-xs font-medium uppercase">Mitarbeiter</div>
                <div className="text-[#666666] text-xs font-medium uppercase">Budget (Monat)</div>
                <div className="text-[#666666] text-xs font-medium uppercase">Verwendet</div>
                <div className="text-[#666666] text-xs font-medium uppercase">Verfügbar</div>
                <div className="text-[#666666] text-xs font-medium uppercase">Status</div>
                <div className="text-[#666666] text-xs font-medium uppercase">Aktion</div>
              </div>

              {/* Table Rows */}
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.id} className={`grid grid-cols-[80px_1fr_140px_140px_160px_130px_120px_200px] items-center px-4 border-b border-[#E8E8E8] last:border-b-0 hover:bg-[#EEF2FF] hover:shadow-sm transition ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'
                  }`}
                  style={{ minHeight: '64px', minWidth: '1000px' }}
                >
                  {/* Icon */}
                  <div>
                    <BenefitIconComponent benefitName={benefit.name} size={32} background={true} />
                  </div>

                  {/* Name */}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[#000000] text-sm font-medium">{benefit.name}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBenefitInfo(benefit.id);
                        }} className="text-[#246AFF] hover:text-[#0F429F] transition"
                        title="Mehr Informationen"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[#666666] text-xs">{benefit.description}</p>
                  </div>

                  {/* Employees */}
                  <div className="text-[#666666] text-sm">
                    {benefit.employees} Mitarbeiter
                  </div>

                  {/* Budget */}
                  <div className="text-[#000000] text-sm">
                    {formatCurrency(benefit.budgetMonth)}
                  </div>

                  {/* Used */}
                  <div className="text-[#000000] text-sm">
                    {formatCurrency(benefit.usedMonth)}{' '}
                    <span className="text-[#666666]">({benefit.percentage}%)</span>
                  </div>

                  {/* Available */}
                  <div className="text-[#000000] text-sm">
                    {formatCurrency(benefit.available)}
                  </div>

                  {/* Status */}
                  <div>
                    <StatusBadge status={benefit.status === 'aktiv' ? 'Aktiv' : 'Inaktiv'} type={benefit.status === 'aktiv' ? 'success' : 'inactive'} />
                  </div>

                  {/* Action */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleConfigure(benefit.id)} className="px-4 py-2 border-2 border-[#0F429F] text-[#0F429F] font-medium text-xs rounded-full hover:bg-[#F0F4FF] transition flex items-center gap-2"
                      style={{ borderRadius: '24px' }}
                    >
                      <Settings className="w-3 h-3" />
                      Konfigurieren
                    </button>
                    {benefit.status === 'aktiv' && (
                      <button
                        onClick={() => handleDeactivate(benefit.id)} className="px-4 py-2 bg-[#9E9E9E] text-white font-medium text-xs rounded-full hover:bg-[#757575] transition flex items-center gap-2"
                        style={{ borderRadius: '24px' }}
                      >
                        <Ban className="w-3 h-3" />
                        Deaktivieren
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredBenefits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#666666] text-lg mb-4">Keine Benefits gefunden</p>
            <p className="text-[#999999] text-sm">
              Passen Sie Ihre Filter an, um Benefits anzuzeigen.
            </p>
          </div>
        )}
      </div>

      {/* Benefit Info Modal */}
      {selectedBenefitInfo && (
        <BenefitInfoModal
          benefitId={selectedBenefitInfo}
          onClose={() => setSelectedBenefitInfo(null)}
        />
      )}
    </div>
  );
}
