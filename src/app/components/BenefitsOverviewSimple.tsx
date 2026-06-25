import { useState } from 'react';
import { Settings, Ban, Info, Search } from 'lucide-react';
import { BenefitInfoModal } from './BenefitInfoModal';
import { BenefitIcon } from './BenefitIcon';
import { StatusBadge } from './Table';

type Benefit = {
  id: string;
  icon: string;
  name: string;
  limitDescription: string;
  monthlyEquivalent: string;
  status: 'aktiv' | 'inaktiv';
};

const mockBenefits: Benefit[] = [
  {
    id: 'mittagessen',
    icon: '🍽️',
    name: 'Mittagessen',
    limitDescription: '7,67 € pro Tag',
    monthlyEquivalent: '(115,05 €/Monat)',
    status: 'aktiv',
  },
  {
    id: 'sachbezug',
    icon: '🎁',
    name: '50 €-Sachbezug',
    limitDescription: '50 € pro Monat',
    monthlyEquivalent: '',
    status: 'aktiv',
  },
  {
    id: 'danke',
    icon: '🙏',
    name: 'Danke-Bonus',
    limitDescription: 'bis zu 10.000 € / Jahr',
    monthlyEquivalent: '(Anerkennung)',
    status: 'aktiv',
  },
  {
    id: 'bkv',
    icon: '🏥',
    name: 'BKV (Betriebliche Krankenversicherung)',
    limitDescription: 'Variabel',
    monthlyEquivalent: '(je nach Plan)',
    status: 'aktiv',
  },
  {
    id: 'internetzuschuss',
    icon: '📡',
    name: 'Internetzuschuss',
    limitDescription: '50 € pro Monat',
    monthlyEquivalent: '',
    status: 'aktiv',
  },
  {
    id: 'kindergarten',
    icon: '👶',
    name: 'Kindergartenzuschuss',
    limitDescription: 'Unbegrenzt',
    monthlyEquivalent: '',
    status: 'aktiv',
  },
  {
    id: 'geburtstag',
    icon: '🎂',
    name: 'Geburtstag',
    limitDescription: 'Variabel',
    monthlyEquivalent: '(pro Anlass)',
    status: 'aktiv',
  },
  {
    id: 'bav',
    icon: '👴',
    name: 'BAV (Betriebliche Altersvorsorge)',
    limitDescription: 'Variabel',
    monthlyEquivalent: '(je nach Plan)',
    status: 'aktiv',
  },
  {
    id: 'erholungsbeihilfe',
    icon: '🏖️',
    name: 'Erholung',
    limitDescription: '156 € pro Jahr',
    monthlyEquivalent: '(~13 €/Monat)',
    status: 'aktiv',
  },
  {
    id: 'fahrtkosten',
    icon: '🚗',
    name: 'Fahrtkosten',
    limitDescription: 'Flexibel',
    monthlyEquivalent: '(exklusiv mit ÖPNV)',
    status: 'aktiv',
  },
  {
    id: 'oepnv',
    icon: '🚌',
    name: 'ÖPNV',
    limitDescription: '50-100 €/Monat',
    monthlyEquivalent: '(exklusiv mit Fahrtkosten)',
    status: 'aktiv',
  },
];

export function BenefitsOverviewSimple() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'Alle' | 'aktiv' | 'inaktiv'>('Alle');
  const [selectedBenefitInfo, setSelectedBenefitInfo] = useState<string | null>(null);

  const filteredBenefits = mockBenefits.filter((benefit) => {
    // Filter by status
    if (filterStatus !== 'Alle' && benefit.status !== filterStatus.toLowerCase()) {
      return false;
    }
    // Filter by search query
    if (searchQuery && !benefit.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleConfigure = (benefitId: string) => {
    // Navigate to the same page as "Benefit hinzufügen" but in EDIT mode
    // Mock data for demonstration - in production this would come from the backend
    const mockInitialData = {
      limit: benefitId === 'mittagessen' ? '150' : benefitId === 'internetzuschuss' ? '50' : '100',
      isActive: true,
      assignmentType: 'all' as const,
      selectedEmployees: [],
    };

    window.dispatchEvent(
      new CustomEvent('sidebar-navigate', {
        detail: {
          itemId: 'benefits-add-location',
          benefitId: benefitId,
          editMode: true,
          initialData: mockInitialData,
        }
      })
    );
  };

  const handleDeactivate = (benefitId: string) => {
    alert(`Benefit "${benefitId}" wird deaktiviert`);
  };

  const handleShowInfo = (benefitId: string) => {
    setSelectedBenefitInfo(benefitId);
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-[#E8E8E8]">
        <h1 className="text-[#000000] font-bold text-[28px] mb-6">Alle Benefits</h1>

        {/* Search & Filter */}
        <div className="flex items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nach Benefit suchen..." className="w-full pl-10 pr-4 py-3 border border-[#E0E0E0] rounded-lg text-sm focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33] transition"
              style={{ borderRadius: '8px' }}
            />
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
      </div>

      {/* Benefits Grid */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBenefits.map((benefit) => (
            <div
              key={benefit.id} className="bg-white border border-[#E0E0E0] rounded-xl p-5 hover:border-[#246AFF] hover:shadow-lg transition"
              style={{ borderRadius: '12px' }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <BenefitIcon
                  benefitName={benefit.name}
                  size={48}
                  withShadow={true}
                  disabled={benefit.status === 'inaktiv'}
                />
              </div>

              {/* Benefit Name */}
              <h3 className="text-[#000000] font-medium text-[16px] text-center mb-2">
                {benefit.name}
              </h3>

              {/* Limit Description */}
              <div className="text-center mb-6">
                <p className="text-[#666666] text-[13px]">{benefit.limitDescription}</p>
                {benefit.monthlyEquivalent && (
                  <p className="text-[#999999] text-[12px]">{benefit.monthlyEquivalent}</p>
                )}
              </div>

              {/* Status Badge */}
              <div className="flex justify-center mb-4">
                <StatusBadge status={benefit.status === 'aktiv' ? 'Aktiv' : 'Inaktiv'} type={benefit.status === 'aktiv' ? 'success' : 'inactive'} />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => handleConfigure(benefit.id)} className="w-full px-4 py-2 border-2 border-[#0F429F] text-[#0F429F] font-medium text-xs rounded-full hover:bg-[#F0F4FF] transition flex items-center justify-center gap-2"
                  style={{ borderRadius: '24px' }}
                >
                  <Settings className="w-3 h-3" />
                  Verwalten
                </button>

                {benefit.status === 'aktiv' && (
                  <button
                    onClick={() => handleDeactivate(benefit.id)} className="w-full px-4 py-2 border border-[#E0E0E0] text-[#666666] font-medium text-xs rounded-full hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    style={{ borderRadius: '24px' }}
                  >
                    <Ban className="w-3 h-3" />
                    Deaktivieren
                  </button>
                )}

                <button
                  onClick={() => handleShowInfo(benefit.id)} className="w-full px-4 py-2 text-[#246AFF] font-medium text-xs rounded-full hover:bg-[#F0F4FF] transition flex items-center justify-center gap-2"
                  style={{ borderRadius: '24px' }}
                >
                  <Info className="w-3 h-3" />
                  Informationen
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBenefits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#666666] text-lg mb-4">Keine Benefits gefunden</p>
            <p className="text-[#999999] text-sm">
              Passe deine Suche oder Filter an, um Benefits anzuzeigen.
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
