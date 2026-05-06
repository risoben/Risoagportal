import { useState } from 'react';
import { X } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';

interface Benefit {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

interface BenefitSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (benefitId: string) => void;
}

const allBenefits: Benefit[] = [
  {
    id: 'essenszuschuss',
    name: 'Essenszuschuss',
    description: 'Essenszuschuss für Mitarbeiter',
    status: 'active',
  },
  {
    id: 'internet',
    name: 'Internet',
    description: 'Internetzuschuss für Home Office',
    status: 'active',
  },
  {
    id: 'kindergarten',
    name: 'Kindergarten',
    description: 'Kinderbetreuungs-Zuschuss',
    status: 'inactive',
  },
  {
    id: 'erholung',
    name: 'Erholung',
    description: 'Erholungsbudget für Mitarbeiter',
    status: 'inactive',
  },
  {
    id: 'oepnv',
    name: 'ÖPNV',
    description: 'Öffentliche Verkehrsmittel',
    status: 'inactive',
  },
  {
    id: 'bav',
    name: 'BAV',
    description: 'Betriebliche Altersversorgung',
    status: 'inactive',
  },
  {
    id: 'sachbezug',
    name: 'Sachbezug',
    description: 'Sachleistungen & Gutscheine',
    status: 'inactive',
  },
  {
    id: 'bkv',
    name: 'BKV',
    description: 'Betriebliche Krankenversicherung',
    status: 'inactive',
  },
];

export function BenefitSelectionModal({ isOpen, onClose, onSelect }: BenefitSelectionModalProps) {
  const [selectedBenefitId, setSelectedBenefitId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter to show only inactive benefits
  const inactiveBenefits = allBenefits.filter((benefit) => benefit.status === 'inactive');

  const handleSelectBenefit = (benefitId: string) => {
    setSelectedBenefitId(benefitId);
  };

  const handleWeiter = () => {
    if (selectedBenefitId) {
      onSelect(selectedBenefitId);
      setSelectedBenefitId(null);
    }
  };

  const handleAbbrechen = () => {
    setSelectedBenefitId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-6 border-b border-[#E0E0E0]">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-bold text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Welches Benefit möchte du aktivieren?
              </h2>
              <p className="text-[13px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Wähle ein inaktives Benefit aus der Liste
              </p>
            </div>
            <button
              onClick={handleAbbrechen} className="text-[#666666] hover:text-[#273A5F] transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="flex-1 overflow-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inactiveBenefits.map((benefit) => {
              const isSelected = selectedBenefitId === benefit.id;

              return (
                <div
                  key={benefit.id} className={`border rounded-xl p-6 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-2 border-[#0F429F] bg-[#F0F4FF] shadow-lg'
                      : 'border border-[#E0E0E0] bg-white hover:border-[#0F429F] hover:shadow-md'
                  }`}
                  style={{
                    borderRadius: '12px',
                    boxShadow: isSelected
                      ? '0 4px 12px rgba(15, 66, 159, 0.2)'
                      : undefined,
                  }}
                  onClick={() => handleSelectBenefit(benefit.id)}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <BenefitIconComponent benefitName={benefit.name} size={48} background={true} />
                  </div>

                  {/* Title */}
                  <h3 className="text-[14px] font-medium text-[#273A5F] mb-2 text-center"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {benefit.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[12px] text-[#666666] mb-4 text-center"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {benefit.description}
                  </p>

                  {/* Button */}
                  <button className={`w-full py-2.5 px-5 rounded-full font-medium text-[12px] transition ${
                      isSelected
                        ? 'bg-[#4CAF50] text-white'
                        : 'bg-[#0F429F] text-white hover:bg-[#246AFF]'
                    }`}
                    style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '20px' }}
                  >
                    {isSelected ? '✓ Ausgewählt' : 'Wählen'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAFAFA] border-t border-[#E0E0E0] px-6 py-6">
          <div className="flex justify-end gap-3">
            <button
              onClick={handleAbbrechen} className="px-6 py-3 border border-[#0F429F] text-[#0F429F] font-medium rounded-full hover:bg-[#F0F4FF] transition"
              style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px', fontSize: '14px' }}
            >
              Abbrechen
            </button>
            <button
              onClick={handleWeiter}
              disabled={!selectedBenefitId} className={`px-6 py-3 font-medium rounded-full transition ${
                selectedBenefitId
                  ? 'bg-[#0F429F] text-white hover:bg-[#246AFF]'
                  : 'bg-[#CCCCCC] text-white cursor-not-allowed'
              }`}
              style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px', fontSize: '14px' }}
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
