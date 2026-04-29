import { Table, StatusBadge, CurrencyCell } from './Table';
import { Plus } from 'lucide-react';

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
      width: '200px',
      align: 'left' as const
    },
    {
      key: 'type',
      label: 'TYP',
      width: '180px',
      align: 'left' as const
    },
    {
      key: 'employees',
      label: 'MITARBEITER',
      width: '140px',
      align: 'right' as const
    },
    {
      key: 'budgetPerMonth',
      label: 'BUDGET/MONAT',
      width: '160px',
      align: 'right' as const,
      render: (value: number) => <CurrencyCell amount={value} />
    },
    {
      key: 'usedThisMonth',
      label: 'GENUTZT DIESE MONAT',
      width: '180px',
      align: 'right' as const,
      render: (value: number) => <CurrencyCell amount={value} />
    },
    {
      key: 'status',
      label: 'STATUS',
      width: '120px',
      align: 'center' as const,
      render: (value: string) => <StatusBadge status={value === 'active' ? 'Aktiv' : 'Inaktiv'} type="success" />
    },
    {
      key: 'action',
      label: 'AKTION',
      width: '120px',
      align: 'center' as const,
      render: (_: any, row: any) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenLocation(row);
          }}
          className="px-4 py-1 bg-[#0F429F] text-white text-[12px] rounded-full hover:bg-[#246AFF] transition-colors"
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
      <div className="bg-white border-b border-[#E0E0E0] px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#273A5F] font-bold text-[32px] mb-2">Standorte</h1>
            <p className="text-[#666666] text-[14px]">
              Verwalten Sie alle Standorte und Tochterunternehmen
            </p>
          </div>
          <button
            onClick={handleCreateLocation}
            className="flex items-center gap-2 px-6 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
          >
            <Plus size={16} />
            Standort erstellen
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        <div className="bg-white rounded-lg border border-[#E0E0E0] overflow-hidden">
          <Table
            columns={columns}
            data={locations}
            onRowClick={handleOpenLocation}
            hoverable={true}
          />
        </div>
      </div>
    </div>
  );
}
