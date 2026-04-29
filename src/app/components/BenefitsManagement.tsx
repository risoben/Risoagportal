import { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';
import { BenefitSelectionModal } from './BenefitSelectionModal';

type ManagedBenefit = {
  id: string;
  name: string;
  limit: string;
  status: 'active' | 'inactive';
  locations: string[];
  description?: string;
};

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
    name: 'Commuting',
    limit: '80€/Monat',
    status: 'active',
    locations: ['München', 'Viernheim'],
    description: 'Zuschuss für Fahrtkosten zwischen Wohnung und Arbeitsplatz.',
  },
  {
    id: 'danke-bonus',
    name: 'Danke-Bonus',
    limit: '100€/Monat',
    status: 'active',
    locations: ['Alle'],
    description: 'Monatlicher Bonus für besondere Leistungen.',
  },
];

export function BenefitsManagement() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBenefitSelectionModal, setShowBenefitSelectionModal] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<ManagedBenefit | null>(null);
  const [duplicateName, setDuplicateName] = useState('');

  const handleAddBenefit = () => {
    setShowBenefitSelectionModal(true);
  };

  const handleBenefitSelected = (benefitId: string) => {
    console.log('Benefit selected:', benefitId);
    setShowBenefitSelectionModal(false);
    // TODO: Navigate to Step 2 (Standorte wählen)
  };

  const handleEdit = (benefitId: string) => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-edit' } }));
  };

  const handleShowDetails = (benefit: ManagedBenefit) => {
    setSelectedBenefit(benefit);
    setShowDetailsModal(true);
    setOpenMenuId(null);
  };

  const handleDuplicate = (benefit: ManagedBenefit) => {
    setSelectedBenefit(benefit);
    setDuplicateName(`${benefit.name} - Kopie`);
    setShowDuplicateModal(true);
    setOpenMenuId(null);
  };

  const handleDelete = (benefit: ManagedBenefit) => {
    setSelectedBenefit(benefit);
    setShowDeleteModal(true);
    setOpenMenuId(null);
  };

  const confirmDuplicate = () => {
    console.log('Duplicating benefit:', selectedBenefit?.name, 'as', duplicateName);
    setShowDuplicateModal(false);
    setSelectedBenefit(null);
    setDuplicateName('');
  };

  const confirmDelete = () => {
    console.log('Deleting benefit:', selectedBenefit?.name);
    setShowDeleteModal(false);
    setSelectedBenefit(null);
  };

  const toggleMenu = (benefitId: string) => {
    setOpenMenuId(openMenuId === benefitId ? null : benefitId);
  };

  const formatLocations = (locations: string[]) => {
    if (locations.length <= 2) {
      return locations.join(', ');
    }
    return `${locations[0]}, ${locations[1]}, ...`;
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-[32px] font-bold text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Benefits verwalten
          </h1>
          <button
            onClick={handleAddBenefit}
            className="flex items-center gap-2 px-6 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#246AFF] transition-colors"
            style={{ fontFamily: 'Roboto, sans-serif', fontSize: '14px', borderRadius: '24px' }}
          >
            <Plus size={16} />
            Benefit hinzufügen
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg border border-[#E0E0E0] overflow-hidden">
          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="bg-[#F0F4FF]" style={{ height: '40px' }}>
                <th
                  className="text-left px-4 py-3 text-[11px] font-normal text-[#666666] uppercase"
                  style={{ fontFamily: 'Roboto, sans-serif', width: '200px' }}
                >
                  NAME
                </th>
                <th
                  className="text-left px-4 py-3 text-[11px] font-normal text-[#666666] uppercase"
                  style={{ fontFamily: 'Roboto, sans-serif', width: '120px' }}
                >
                  LIMIT
                </th>
                <th
                  className="text-left px-4 py-3 text-[11px] font-normal text-[#666666] uppercase"
                  style={{ fontFamily: 'Roboto, sans-serif', width: '100px' }}
                >
                  STATUS
                </th>
                <th
                  className="text-left px-4 py-3 text-[11px] font-normal text-[#666666] uppercase"
                  style={{ fontFamily: 'Roboto, sans-serif', width: '250px' }}
                >
                  STANDORTE
                </th>
                <th
                  className="text-left px-4 py-3 text-[11px] font-normal text-[#666666] uppercase"
                  style={{ fontFamily: 'Roboto, sans-serif', width: '200px' }}
                >
                  AKTION
                </th>
              </tr>
            </thead>
            <tbody>
              {managedBenefits.map((benefit, index) => (
                <tr
                  key={benefit.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'} hover:bg-[#F0F4FF] transition-colors cursor-pointer`}
                  style={{ height: '56px', borderBottom: '1px solid #F0F0F0' }}
                >
                  {/* Name */}
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <BenefitIconComponent benefitName={benefit.name} size={32} />
                      <span className="text-[12px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {benefit.name}
                      </span>
                    </div>
                  </td>

                  {/* Limit */}
                  <td className="px-4 py-2">
                    <span className="text-[12px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {benefit.limit}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-2">
                    <div className="flex flex-col gap-1">
                      {benefit.status === 'active' ? (
                        <>
                          <span
                            className="inline-flex items-center px-3 py-1 bg-[#4CAF50] text-white text-[11px] font-medium rounded-xl"
                            style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '12px' }}
                          >
                            ✅ Aktiv
                          </span>
                          <span className="text-[10px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                            {benefit.locations.length === 1 && benefit.locations[0] === 'Alle'
                              ? 'Alle Standorte'
                              : `${benefit.locations.length} Standort${benefit.locations.length !== 1 ? 'e' : ''}`}
                          </span>
                        </>
                      ) : (
                        <span
                          className="inline-flex items-center px-3 py-1 bg-[#9E9E9E] text-white text-[11px] font-medium rounded-xl"
                          style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '12px' }}
                        >
                          ⚪ Inaktiv
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Locations */}
                  <td className="px-4 py-2">
                    <span
                      className="text-[12px] text-[#666666]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                      title={benefit.locations.join(', ')}
                    >
                      {formatLocations(benefit.locations)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(benefit.id)}
                        className="text-[12px] text-[#0F429F] hover:text-[#246AFF] hover:underline transition"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        Bearbeiten
                      </button>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMenu(benefit.id);
                          }}
                          className="w-6 h-6 flex items-center justify-center text-[#666666] hover:bg-[#F0F4FF] rounded transition"
                        >
                          <MoreVertical size={24} />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuId === benefit.id && (
                          <div
                            className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#E0E0E0] rounded shadow-lg z-10"
                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                          >
                            <button
                              onClick={() => handleShowDetails(benefit)}
                              className="w-full text-left px-4 py-3 text-[13px] text-[#273A5F] hover:bg-[#F0F4FF] transition"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Details anzeigen
                            </button>
                            <button
                              onClick={() => handleDuplicate(benefit)}
                              className="w-full text-left px-4 py-3 text-[13px] text-[#273A5F] hover:bg-[#F0F4FF] transition"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Duplizieren
                            </button>
                            <button
                              onClick={() => handleDelete(benefit)}
                              className="w-full text-left px-4 py-3 text-[13px] text-[#F44336] hover:bg-[#FFEBEE] transition"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Löschen
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info Box */}
        <div
          className="bg-[#F0F4FF] border-l-4 border-[#0F429F] rounded p-4 mt-6"
          style={{ borderLeftWidth: '4px', borderRadius: '4px' }}
        >
          <p className="text-[12px] text-[#333333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Hinweis: Benefits können pro Standort aktiviert und konfiguriert werden. Änderungen gelten ab 1. nächsten
            Monat.
          </p>
        </div>
      </div>

      {/* Modal 1: Benefit Details */}
      {showDetailsModal && selectedBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-[20px] font-bold text-[#273A5F] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {selectedBenefit.name} — Details
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Card 1: Grundinformationen */}
              <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4">
                <h4 className="text-[16px] font-bold text-[#273A5F] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Grundinformationen
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <BenefitIconComponent benefitName={selectedBenefit.name} size={48} />
                    <div>
                      <p className="text-[14px] font-medium text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {selectedBenefit.name}
                      </p>
                      <p className="text-[12px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {selectedBenefit.description}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className="text-[12px] text-[#666666]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Status:
                    </span>
                    {selectedBenefit.status === 'active' ? (
                      <span
                        className="ml-2 inline-flex items-center px-3 py-1 bg-[#4CAF50] text-white text-[11px] font-medium rounded-xl"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        ✅ Aktiv
                      </span>
                    ) : (
                      <span
                        className="ml-2 inline-flex items-center px-3 py-1 bg-[#9E9E9E] text-white text-[11px] font-medium rounded-xl"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        ⚪ Inaktiv
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Konfiguration */}
              <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-4">
                <h4 className="text-[16px] font-bold text-[#273A5F] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Konfiguration
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-[12px] text-[#666666] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Limit:
                    </p>
                    <p className="text-[14px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {selectedBenefit.limit}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#666666] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Verfügbare Standorte:
                    </p>
                    <p className="text-[14px] text-[#273A5F]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {selectedBenefit.locations.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Schließen
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleEdit(selectedBenefit.id);
                }}
                className="px-6 py-3 bg-[#0F429F] text-white rounded-full hover:bg-[#246AFF] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Bearbeiten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Benefit Duplizieren */}
      {showDuplicateModal && selectedBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-[18px] font-bold text-[#273A5F] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Benefit duplizieren
            </h3>

            <div className="mb-4">
              <label className="block text-[13px] font-medium text-[#273A5F] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Neuer Benefit-Name
              </label>
              <input
                type="text"
                value={duplicateName}
                onChange={(e) => setDuplicateName(e.target.value)}
                placeholder="z.B. Mittagessen — Company"
                className="w-full h-[40px] px-3 py-2 border border-[#0F429F] rounded text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0F429F]"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              />
            </div>

            <p className="text-[12px] text-[#666666] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Das Benefit wird mit den gleichen Limits und Standorten dupliziert. Du kannst dies danach bearbeiten.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDuplicateModal(false);
                  setSelectedBenefit(null);
                  setDuplicateName('');
                }}
                className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Abbrechen
              </button>
              <button
                onClick={confirmDuplicate}
                className="px-6 py-3 bg-[#0F429F] text-white rounded-full hover:bg-[#246AFF] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Duplizieren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Benefit Löschen */}
      {showDeleteModal && selectedBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center mb-4">
              <span className="text-[48px]">⚠️</span>
            </div>

            <h3 className="text-[18px] font-bold text-[#273A5F] mb-3 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Benefit löschen?
            </h3>

            <p className="text-[14px] text-[#333333] mb-4 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Möchtest du {selectedBenefit.name} wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>

            <div className="bg-[#FFEBEE] rounded p-3 mb-6 flex items-start gap-2" style={{ borderRadius: '4px' }}>
              <span className="text-[16px]">⚠️</span>
              <p className="text-[12px] text-[#F44336]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Mitarbeiter verlieren ab 1. nächsten Monat Zugriff auf dieses Benefit
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedBenefit(null);
                }}
                className="px-6 py-3 border border-[#0F429F] text-[#0F429F] rounded-full hover:bg-[#F0F4FF] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Abbrechen
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 bg-[#F44336] text-white rounded-full hover:bg-[#D32F2F] transition"
                style={{ fontFamily: 'Roboto, sans-serif', borderRadius: '24px' }}
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Benefit Selection Modal */}
      <BenefitSelectionModal
        isOpen={showBenefitSelectionModal}
        onClose={() => setShowBenefitSelectionModal(false)}
        onSelect={handleBenefitSelected}
      />

      {/* Click outside to close menu */}
      {openMenuId && (
        <div className="fixed inset-0 z-0" onClick={() => setOpenMenuId(null)} />
      )}
    </div>
  );
}
