import { useState } from 'react';
import { Table, StatusBadge, CurrencyCell } from './Table';
import { Plus } from 'lucide-react';

// TODO: Replace this mock data with a real API call.
// Endpoint: GET /api/v1/portal/locations
// See DEVELOPER_GUIDE.md Section 5 (Location) for the full response shape.
const locations = [
  {
    id: 'heddesheim',
    name: 'Heddesheim',
    type: 'Standort',
    employees: 34,
    budgetPerMonth: 4200,
    usedThisMonth: 3100,
    status: 'active'
  },
  {
    id: 'gmbh-a',
    name: 'GmbH A',
    type: 'Tochterunternehmen',
    employees: 15,
    budgetPerMonth: 1800,
    usedThisMonth: 900,
    status: 'active'
  },
  {
    id: 'viernheim',
    name: 'Viernheim',
    type: 'Standort',
    employees: 12,
    budgetPerMonth: 2500,
    usedThisMonth: 1200,
    status: 'active'
  },
  {
    id: 'muenchen',
    name: 'München',
    type: 'Standort',
    employees: 45,
    budgetPerMonth: 5600,
    usedThisMonth: 4200,
    status: 'active'
  },
  {
    id: 'berlin',
    name: 'Berlin',
    type: 'Standort',
    employees: 28,
    budgetPerMonth: 3400,
    usedThisMonth: 2800,
    status: 'active'
  }
];

export function LocationsOverview() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(locations.length / itemsPerPage);
  const paginatedLocations = locations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenLocation = (location: any) => {
    window.dispatchEvent(
      new CustomEvent('sidebar-navigate', {
        detail: { itemId: 'location-details', locationId: location.id, locationName: location.name }
      })
    );
  };

  const handleCreateLocation = () => {
    window.dispatchEvent(
      new CustomEvent('sidebar-navigate', {
        detail: { itemId: 'location-form-create' }
      })
    );
  };

  const columns = [
    {
      key: 'name',
      label: 'NAME',
      width: '2.5fr',
      align: 'left' as const
    },
    {
      key: 'type',
      label: 'TYP',
      width: '1.5fr',
      align: 'left' as const
    },
    {
      key: 'employees',
      label: 'MITARBEITER',
      width: '1fr',
      align: 'left' as const
    },
    {
      key: 'budgetPerMonth',
      label: 'BUDGET/MONAT',
      width: '1.2fr',
      align: 'left' as const,
      render: (value: number) => <CurrencyCell amount={value} />
    },
    {
      key: 'usedThisMonth',
      label: 'GENUTZTES BUDGET (MONAT)',
      width: '1.5fr',
      align: 'left' as const,
      render: (value: number) => <CurrencyCell amount={value} />
    },
    {
      key: 'status',
      label: 'STATUS',
      width: '1fr',
      align: 'left' as const,
      render: (value: string) => <StatusBadge status={value === 'active' ? 'Aktiv' : 'Inaktiv'} type={value === 'active' ? 'success' : 'inactive'} />
    },
    {
      key: 'action',
      label: 'AKTION',
      width: '1fr',
      align: 'left' as const,
      render: (_: any, row: any) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenLocation(row);
          }} className="px-4 py-1 bg-[#0F429F] text-white text-[12px] rounded-full hover:bg-[#246AFF] transition-colors"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Öffnen
        </button>
      )
    }
  ];

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-4 md:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#273A5F] font-bold text-[32px] mb-2">Standorte</h1>
            <p className="text-[#666666] text-[14px]">
              Verwalte alle Standorte und Tochterunternehmen
            </p>
          </div>
          <button
            onClick={handleCreateLocation} className="flex items-center gap-2 px-6 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
          >
            <Plus size={16} />
            Standort erstellen
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-x-auto">
          <Table
            columns={columns}
            data={paginatedLocations}
            onRowClick={handleOpenLocation}
            hoverable={true}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-[#666666] text-sm">Anzeigen:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="border border-[#D0D0D0] rounded px-2 py-1 text-sm text-[#000000] focus:outline-none focus:border-[#0F429F]"
            >
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-[#666666] text-sm">Einträge</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 border rounded-lg transition ${currentPage === 1 ? 'border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed' : 'border-[#D0D0D0] text-[#000000] hover:bg-gray-50'}`}
            >‹</button>
            <span className="text-[#666666] text-sm">Seite {currentPage} von {totalPages}</span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 border rounded-lg transition ${currentPage === totalPages ? 'border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed' : 'border-[#D0D0D0] text-[#000000] hover:bg-gray-50'}`}
            >›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
