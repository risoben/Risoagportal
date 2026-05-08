import { useState } from 'react';
import { Search, ChevronDown, Upload, Eye, Edit2 } from 'lucide-react';
import { StatusBadge } from './Table';

// Sample employee data
const employees = [
  {
    id: 1,
    name: 'Anna Smith',
    nr: '001',
    abteilung: 'Vertrieb',
    status: 'Aktiv',
    budget: '€1.000',
  },
  {
    id: 2,
    name: 'Max Müller',
    nr: '002',
    abteilung: 'IT',
    status: 'Aktiv',
    budget: '€950',
  },
  {
    id: 3,
    name: 'Kim S.',
    nr: '003',
    abteilung: 'HR',
    status: 'Aktiv',
    budget: '€1.100',
  },
  {
    id: 4,
    name: 'Sarah Weber',
    nr: '004',
    abteilung: 'Marketing',
    status: 'Aktiv',
    budget: '€875',
  },
  {
    id: 5,
    name: 'Thomas Becker',
    nr: '005',
    abteilung: 'Finanzen',
    status: 'Aktiv',
    budget: '€1.200',
  },
];

export function EmployeeTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStandort, setSelectedStandort] = useState('Alle');
  const [selectedStatus, setSelectedStatus] = useState('Alle');

  const handleImportClick = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'csv-upload' } }));
  };

  const handleEmployeeEdit = (employeeId: number) => {
    // Navigate to employee edit page
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'mitarbeiter-edit' } }));
  };

  const handleEmployeeDetails = (employeeId: number) => {
    // Open employee detail modal/panel
    console.log('Opening details for employee:', employeeId);
    // For now, navigate to edit page - can be changed to modal later
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'mitarbeiter-edit' } }));
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Search & Filter Bar */}
      <div className="px-6 pt-6 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Search Field */}
            <div className="relative" style={{ width: '400px' }}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Suche..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-10 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#273A5F] focus:outline-none focus:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:ring-opacity-20"
              />
            </div>

            {/* Standort Filter */}
            <button className="bg-white border border-[#E5E7EB] rounded-lg px-4 h-10 flex items-center gap-2"
              style={{ width: '200px' }}
            >
              <span className="text-[#273A5F] text-sm flex-1 text-left">
                Standort: {selectedStandort}
              </span>
              <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            </button>

            {/* Status Filter */}
            <button className="bg-white border border-[#E5E7EB] rounded-lg px-4 h-10 flex items-center gap-2"
              style={{ width: '200px' }}
            >
              <span className="text-[#273A5F] text-sm flex-1 text-left">
                Status: {selectedStatus}
              </span>
              <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            </button>
          </div>

          {/* Import Button */}
          <button
            onClick={handleImportClick} className="bg-[#0F429F] text-white px-6 h-10 rounded-lg flex items-center gap-2 hover:bg-[#0d3680] transition-colors font-medium text-sm"
          >
            <Upload className="w-4 h-4" />
            CSV Import
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="px-6">
        <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
          {/* Table Header */}
          <div className="bg-[#273A5F] px-6 h-12"
            style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.5fr 0.8fr 1fr 1fr 0.8fr 1fr' }}
          >
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Name</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Nr.</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Abteilung</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Status</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Budget</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Aktionen</div>
          </div>

          {/* Table Rows */}
          {employees.map((employee, index) => (
            <div
              key={employee.id} className={`
                px-6 h-14 border-b border-[#E5E7EB] last:border-b-0
                transition-colors hover:bg-gray-50
                ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}
              `}
              style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1.5fr 0.8fr 1fr 1fr 0.8fr 1fr' }}
            >
              <div className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>{employee.name}</div>
              <div className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>{employee.nr}</div>
              <div className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>{employee.abteilung}</div>
              <StatusBadge status={employee.status} type={employee.status === 'Aktiv' ? 'success' : 'inactive'} />
              <div className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>{employee.budget}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEmployeeDetails(employee.id);
                  }} className="bg-[#0F429F] text-white px-4 h-10 rounded-full font-medium text-sm hover:bg-[#0d3680] transition-colors flex items-center gap-2"
                  style={{ borderRadius: '32px' }}
                >
                  <Eye size={16} />
                  Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEmployeeEdit(employee.id);
                  }} className="bg-[#246AFF] text-white px-4 h-10 rounded-full font-medium text-sm hover:bg-[#1a56e0] transition-colors flex items-center gap-2"
                  style={{ borderRadius: '32px' }}
                >
                  <Edit2 size={16} />
                  Bearbeiten
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="px-6 pt-6 pb-6 flex justify-end">
        <div className="text-[#6B7280] text-xs">Seite 1 von 21</div>
      </div>
    </div>
  );
}