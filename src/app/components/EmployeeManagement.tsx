import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Search, Upload, Eye, Edit2 } from 'lucide-react';
import { MassImportModal } from './MassImportModal';
import { StatusBadge } from './Table';

type Employee = {
  id: string;
  personnelNumber: string;
  name: string;
  department: string;
  status: 'aktiv' | 'inaktiv';
  budgetMonth: number;
  budgetYear: number;
  entryDate: string;
  location: string;
  benefits: { benefitId: string; name: string; limit: string; period: 'Monat' | 'Jahr' }[];
};

// TODO: Replace this mock data with a real API call.
// Endpoint: GET /api/v1/portal/employees?search=&status=&location=&page=
// See DEVELOPER_GUIDE.md Section 5 (Employee) for the full response shape.
const mockEmployees: Employee[] = [
  {
    id: '1',
    personnelNumber: 'MA-2451',
    name: 'Max Mustermann',
    department: 'Vertrieb',
    status: 'aktiv',
    budgetMonth: 250,
    budgetYear: 3000,
    entryDate: '01.01.2026',
    location: 'Heddesheim',
    benefits: [
      { benefitId: 'essenszuschuss', name: 'Essenszuschuss', limit: '150€', period: 'Monat' },
      { benefitId: 'internetzuschuss', name: 'Internetzuschuss', limit: '50€', period: 'Monat' },
      { benefitId: 'erholungsbeihilfe', name: 'Erholungsbeihilfe', limit: '156€', period: 'Jahr' },
    ],
  },
  {
    id: '2',
    personnelNumber: 'MA-2452',
    name: 'Anna Schmidt',
    department: 'HR',
    status: 'aktiv',
    budgetMonth: 180,
    budgetYear: 2160,
    entryDate: '15.03.2025',
    location: 'Mannheim',
    benefits: [
      { benefitId: 'essenszuschuss', name: 'Essenszuschuss', limit: '130€', period: 'Monat' },
      { benefitId: 'sachbezug', name: '50€-Sachbezug', limit: '50€', period: 'Monat' },
    ],
  },
  {
    id: '3',
    personnelNumber: 'MA-2453',
    name: 'Peter Meyer',
    department: 'IT',
    status: 'inaktiv',
    budgetMonth: 0,
    budgetYear: 0,
    entryDate: '10.06.2024',
    location: 'Berlin Tech GmbH',
    benefits: [],
  },
  {
    id: '4',
    personnelNumber: 'MA-2454',
    name: 'Lisa Weber',
    department: 'Marketing',
    status: 'aktiv',
    budgetMonth: 320,
    budgetYear: 3840,
    entryDate: '20.02.2026',
    location: 'Heddesheim',
    benefits: [
      { benefitId: 'essenszuschuss', name: 'Essenszuschuss', limit: '150€', period: 'Monat' },
      { benefitId: 'internetzuschuss', name: 'Internetzuschuss', limit: '50€', period: 'Monat' },
      { benefitId: 'oepnv', name: 'ÖPNV-Ticket-Zuschuss', limit: '70€', period: 'Monat' },
      { benefitId: 'sachbezug', name: '50€-Sachbezug', limit: '50€', period: 'Monat' },
    ],
  },
  {
    id: '5',
    personnelNumber: 'MA-2455',
    name: 'Thomas Becker',
    department: 'IT',
    status: 'aktiv',
    budgetMonth: 200,
    budgetYear: 2400,
    entryDate: '05.11.2025',
    location: 'München',
    benefits: [
      { benefitId: 'essenszuschuss', name: 'Essenszuschuss', limit: '150€', period: 'Monat' },
      { benefitId: 'sachbezug', name: '50€-Sachbezug', limit: '50€', period: 'Monat' },
    ],
  },
  {
    id: '6',
    personnelNumber: 'MA-2456',
    name: 'Sarah Müller',
    department: 'Vertrieb',
    status: 'aktiv',
    budgetMonth: 280,
    budgetYear: 3360,
    entryDate: '12.08.2025',
    location: 'Heddesheim',
    benefits: [
      { benefitId: 'essenszuschuss', name: 'Essenszuschuss', limit: '150€', period: 'Monat' },
      { benefitId: 'internetzuschuss', name: 'Internetzuschuss', limit: '50€', period: 'Monat' },
      { benefitId: 'fahrtkosten', name: 'Fahrtkostenzuschuss', limit: '80€', period: 'Monat' },
    ],
  },
  {
    id: '7',
    personnelNumber: 'MA-2457',
    name: 'Michael Wagner',
    department: 'Finanzen',
    status: 'aktiv',
    budgetMonth: 230,
    budgetYear: 2760,
    entryDate: '18.04.2026',
    location: 'Mannheim',
    benefits: [
      { benefitId: 'essenszuschuss', name: 'Essenszuschuss', limit: '150€', period: 'Monat' },
      { benefitId: 'oepnv', name: 'ÖPNV-Ticket-Zuschuss', limit: '80€', period: 'Monat' },
    ],
  },
  {
    id: '8',
    personnelNumber: 'MA-2458',
    name: 'Julia Fischer',
    department: 'HR',
    status: 'aktiv',
    budgetMonth: 200,
    budgetYear: 2400,
    entryDate: '22.09.2025',
    location: 'München',
    benefits: [
      { benefitId: 'essenszuschuss', name: 'Essenszuschuss', limit: '150€', period: 'Monat' },
      { benefitId: 'sachbezug', name: '50€-Sachbezug', limit: '50€', period: 'Monat' },
    ],
  },
  {
    id: '9',
    personnelNumber: 'MA-2459',
    name: 'Daniel Klein',
    department: 'IT',
    status: 'aktiv',
    budgetMonth: 300,
    budgetYear: 3600,
    entryDate: '30.01.2026',
    location: 'Berlin Tech GmbH',
    benefits: [
      { benefitId: 'essenszuschuss', name: 'Essenszuschuss', limit: '150€', period: 'Monat' },
      { benefitId: 'internetzuschuss', name: 'Internetzuschuss', limit: '50€', period: 'Monat' },
      { benefitId: 'sachbezug', name: '50€-Sachbezug', limit: '50€', period: 'Monat' },
      { benefitId: 'bkv', name: 'BKV', limit: '50€', period: 'Monat' },
    ],
  },
  {
    id: '10',
    personnelNumber: 'MA-2460',
    name: 'Laura Hoffmann',
    department: 'Marketing',
    status: 'aktiv',
    budgetMonth: 260,
    budgetYear: 3120,
    entryDate: '14.07.2025',
    location: 'Heddesheim',
    benefits: [
      { benefitId: 'essenszuschuss', name: 'Essenszuschuss', limit: '150€', period: 'Monat' },
      { benefitId: 'internetzuschuss', name: 'Internetzuschuss', limit: '50€', period: 'Monat' },
      { benefitId: 'kindergarten', name: 'Kindergartenzuschuss', limit: '60€', period: 'Monat' },
    ],
  },
];

export function EmployeeManagement() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMassImportModal, setShowMassImportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter employees by search query
  const filteredEmployees = mockEmployees.filter((employee) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.personnelNumber.toLowerCase().includes(query)
    );
  });

  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter((e) => e.status === 'aktiv').length;
  const inactiveEmployees = mockEmployees.filter((e) => e.status === 'inaktiv').length;

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('de-DE') + '€';
  };

  const handleShowDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };

  const handleEdit = (employee: Employee) => {
    window.dispatchEvent(
      new CustomEvent('sidebar-navigate', {
        detail: { itemId: 'mitarbeiter-edit', employeeId: employee.id },
      })
    );
  };

  const handleAddNew = () => {
    window.dispatchEvent(
      new CustomEvent('sidebar-navigate', {
        detail: { itemId: 'mitarbeiter-add' },
      })
    );
  };


  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-[#E8E8E8]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[#000000] font-bold text-[28px]">Mitarbeiter</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowMassImportModal(true)} className="px-6 py-3 border-2 border-[#0F429F] text-[#0F429F] font-medium rounded-full hover:bg-[#F0F4FF] transition flex items-center gap-2"
              style={{ borderRadius: '24px' }}
            >
              <Upload className="w-4 h-4" />
              CSV importieren
            </button>
            <button
              onClick={handleAddNew} className="px-6 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3680] transition flex items-center gap-2"
              style={{ borderRadius: '24px' }}
            >
              <Plus className="w-5 h-5" />
              Neuen Mitarbeiter hinzufügen
            </button>
          </div>
        </div>

        {/* Search Field */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              placeholder="Nach Name, Personalnummer suchen..." className="w-full pl-10 pr-4 py-3 border border-[#E0E0E0] rounded text-sm focus:border-[#246AFF] focus:outline-none focus:ring-2 focus:ring-[#246AFF33] transition"
              style={{ borderRadius: '4px' }}
            />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E0E0E0] rounded-xl p-4 text-center"
            style={{ borderRadius: '12px' }}
          >
            <p className="text-[#666666] text-[14px] font-medium mb-1">Gesamte Mitarbeiter</p>
            <p className="text-[#273A5F] font-bold text-[32px]">{totalEmployees}</p>
          </div>
          <div className="bg-white border border-[#E0E0E0] rounded-xl p-4 text-center"
            style={{ borderRadius: '12px' }}
          >
            <p className="text-[#666666] text-[14px] font-medium mb-1">Aktive Mitarbeiter</p>
            <p className="text-[#273A5F] font-bold text-[32px]">{activeEmployees}</p>
          </div>
          <div className="bg-white border border-[#E0E0E0] rounded-xl p-4 text-center"
            style={{ borderRadius: '12px' }}
          >
            <p className="text-[#666666] text-[14px] font-medium mb-1">Inaktive Mitarbeiter</p>
            <p className="text-[#273A5F] font-bold text-[32px]">{inactiveEmployees}</p>
          </div>
        </div>
      </div>

      {/* Massenimport-Banner — Phase 2 */}
      <div className="px-8 py-4">
        <div className="flex items-center gap-4 bg-[#F9FAFB] border border-[#E0E0E0] rounded-xl px-6 py-4">
          <div className="w-10 h-10 bg-[#E0E0E0] rounded-lg flex items-center justify-center flex-shrink-0">
            <Upload className="w-5 h-5 text-[#999999]" />
          </div>
          <div>
            <p className="text-[#666666] font-bold text-[14px]">Massenimport via CSV <span className="ml-2 px-2 py-0.5 bg-[#E0E0E0] text-[#666666] text-[11px] rounded-full font-medium">Phase 2</span></p>
            <p className="text-[#999999] text-[13px]">Wird in einer späteren Version verfügbar sein — dann kannst du viele Mitarbeiter auf einmal importieren.</p>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="px-4 md:px-6 lg:px-8 py-6">
        <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-x-auto">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(230px,1.8fr)', minWidth: '900px' }}>
            {/* Header cells — same grid as rows */}
            {['Pers.-Nr.', 'Name', 'Abteilung', 'Status', 'Budget', 'Aktionen'].map((h) => (
              <div key={h} className="bg-[#273A5F] text-white font-bold text-xs uppercase tracking-wide px-6 flex items-center" style={{ height: '48px', overflow: 'hidden' }}>{h}</div>
            ))}
            {/* Body rows — flat cells in the same grid */}
            {paginatedEmployees.map((employee, index) => {
              const bg = index % 2 === 0 ? '#ffffff' : '#F9FAFB';
              const border = '1px solid #E5E7EB';
              const cell: React.CSSProperties = { background: bg, borderBottom: border, height: '56px', display: 'flex', alignItems: 'center', padding: '0 24px' };
              return (
                <React.Fragment key={employee.id}>
                  <div style={{ ...cell, overflow: 'hidden' }} className="text-sm text-[#000000]">{employee.personnelNumber}</div>
                  <div style={{ ...cell, overflow: 'hidden' }} className="text-sm text-[#000000]">{employee.name}</div>
                  <div style={{ ...cell, overflow: 'hidden' }} className="text-sm text-[#000000]">{employee.department}</div>
                  <div style={cell}><StatusBadge status={employee.status === 'aktiv' ? 'Aktiv' : 'Inaktiv'} type={employee.status === 'aktiv' ? 'success' : 'inactive'} /></div>
                  <div style={{ ...cell, overflow: 'hidden' }} className="text-sm text-[#000000]">{formatCurrency(employee.budgetYear)}</div>
                  <div style={{ ...cell, gap: '8px', flexShrink: 0 }}>
                    <button onClick={(e) => { e.stopPropagation(); handleShowDetails(employee); }} className="bg-[#0F429F] text-white px-3 h-8 rounded-full font-medium text-sm hover:bg-[#0d3680] transition-colors flex items-center gap-1 whitespace-nowrap">
                      <Eye size={14} />Details
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleEdit(employee); }} className="bg-[#246AFF] text-white px-3 h-8 rounded-full font-medium text-sm hover:bg-[#1a56e0] transition-colors flex items-center gap-1 whitespace-nowrap">
                      <Edit2 size={14} />Bearbeiten
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
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
              disabled={currentPage === 1} className={`p-2 border rounded-lg transition ${
                currentPage === 1
                  ? 'border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed'
                  : 'border-[#D0D0D0] text-[#000000] hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[#666666] text-sm">Seite {currentPage} von {totalPages}</span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages} className={`p-2 border rounded-lg transition ${
                currentPage === totalPages
                  ? 'border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed'
                  : 'border-[#D0D0D0] text-[#000000] hover:bg-gray-50'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowDetailsModal(false)}
        >
          <div className="bg-white rounded-xl shadow-2xl p-8"
            style={{ width: '600px', borderRadius: '16px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[#000000] font-bold text-[24px] mb-6">
              Mitarbeiter Details: {selectedEmployee.name}
            </h2>

            <div className="space-y-4 mb-8">
              <div className="bg-[#F8F9FB] p-4 rounded-lg">
                <p className="text-[#666666] text-xs mb-1">Personalnummer</p>
                <p className="text-[#000000] text-sm font-medium">{selectedEmployee.personnelNumber}</p>
              </div>

              <div className="bg-[#F8F9FB] p-4 rounded-lg">
                <p className="text-[#666666] text-xs mb-1">Name</p>
                <p className="text-[#000000] text-sm font-medium">{selectedEmployee.name}</p>
              </div>

              <div className="bg-[#F8F9FB] p-4 rounded-lg">
                <p className="text-[#666666] text-xs mb-1">Abteilung</p>
                <p className="text-[#000000] text-sm font-medium">{selectedEmployee.department}</p>
              </div>

              <div className="bg-[#F8F9FB] p-4 rounded-lg">
                <p className="text-[#666666] text-xs mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    selectedEmployee.status === 'aktiv'
                      ? 'bg-[#E8F5E9] text-[#4CAF50]'
                      : 'bg-[#F5F5F5] text-[#9E9E9E]'
                  }`}
                >
                  {selectedEmployee.status === 'aktiv' ? 'Aktiv' : 'Inaktiv'}
                </span>
              </div>

              <div className="bg-[#F8F9FB] p-4 rounded-lg">
                <p className="text-[#666666] text-xs mb-1">Eintrittsdatum</p>
                <p className="text-[#000000] text-sm font-medium">{selectedEmployee.entryDate}</p>
              </div>

              <div className="bg-[#F8F9FB] p-4 rounded-lg">
                <p className="text-[#666666] text-xs mb-1">Standort</p>
                <p className="text-[#000000] text-sm font-medium">{selectedEmployee.location}</p>
              </div>

              <div className="bg-[#F8F9FB] p-4 rounded-lg">
                <p className="text-[#666666] text-xs mb-2">Aktuelle Benefits</p>
                {selectedEmployee.benefits.length > 0 ? (
                  <div className="space-y-2">
                    {selectedEmployee.benefits.map((benefit, idx) => (
                      <p key={idx} className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>
                        • {benefit.name}: {benefit.limit} ({benefit.period})
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#9E9E9E] text-sm">Keine Benefits zugeordnet</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleEdit(selectedEmployee);
                }} className="px-8 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3780] transition"
                style={{ borderRadius: '24px' }}
              >
                Bearbeiten
              </button>
              <button
                onClick={() => setShowDetailsModal(false)} className="px-8 py-3 border-2 border-[#E0E0E0] text-[#666666] font-medium rounded-full hover:bg-gray-50 transition"
                style={{ borderRadius: '24px' }}
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mass Import Modal */}
      {showMassImportModal && <MassImportModal onClose={() => setShowMassImportModal(false)} />}
    </div>
  );
}
