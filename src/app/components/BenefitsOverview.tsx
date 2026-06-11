import { useState } from 'react';
import { ChevronDown, X, Search } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BenefitIconComponent } from './BenefitIconComponent';
import { StatusBadge } from './Table';

type Benefit = {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  employeeCount: number;
  totalBudget: number;
  used: number;
  usagePercentage: number;
};

type Employee = {
  id: string;
  name: string;
  employeeNumber: string;
  department: string;
  alreadyAssigned: boolean;
};

type BenefitWithCategory = Benefit & { category: 'cash' | 'gutschein' };

const mockBenefits: BenefitWithCategory[] = [
  // Cash-Benefits
  {
    id: 'mittagessen',
    name: 'Mittagessen',
    status: 'active',
    employeeCount: 1024,
    totalBudget: 5000,
    used: 3500,
    usagePercentage: 70,
    category: 'cash',
  },
  {
    id: 'internet',
    name: 'Internet',
    status: 'active',
    employeeCount: 978,
    totalBudget: 2500,
    used: 1750,
    usagePercentage: 70,
    category: 'cash',
  },
  {
    id: 'kindergarten',
    name: 'Kindergarten',
    status: 'active',
    employeeCount: 324,
    totalBudget: 1500,
    used: 1050,
    usagePercentage: 70,
    category: 'cash',
  },
  // Gutschein-Benefits
  {
    id: 'commuting',
    name: 'Fahrkostenzuschuss',
    status: 'active',
    employeeCount: 856,
    totalBudget: 3000,
    used: 2100,
    usagePercentage: 70,
    category: 'gutschein',
  },
  {
    id: 'erholung',
    name: 'Erholung',
    status: 'active',
    employeeCount: 642,
    totalBudget: 2000,
    used: 1400,
    usagePercentage: 70,
    category: 'gutschein',
  },
  {
    id: 'sachbezug',
    name: 'Sachbezug',
    status: 'inactive',
    employeeCount: 0,
    totalBudget: 0,
    used: 0,
    usagePercentage: 0,
    category: 'gutschein',
  },
];

const mockEmployees: Employee[] = [
  { id: 'emp_001', name: 'Anna Keller', employeeNumber: 'EMP-10234', department: 'Vertrieb', alreadyAssigned: false },
  { id: 'emp_002', name: 'Jonas Richter', employeeNumber: 'EMP-10081', department: 'IT', alreadyAssigned: false },
  { id: 'emp_003', name: 'Lea Hoffmann', employeeNumber: 'EMP-10977', department: 'Marketing', alreadyAssigned: true },
  { id: 'emp_004', name: 'Mert Yilmaz', employeeNumber: 'EMP-10542', department: 'HR', alreadyAssigned: false },
  { id: 'emp_005', name: 'Sofia Bauer', employeeNumber: 'EMP-11109', department: 'Finanzen', alreadyAssigned: false },
  { id: 'emp_006', name: 'Max Müller', employeeNumber: 'EMP-10123', department: 'IT', alreadyAssigned: false },
  { id: 'emp_007', name: 'Lisa Weber', employeeNumber: 'EMP-10456', department: 'Vertrieb', alreadyAssigned: false },
];

const monthlyUsageData = [
  { id: 1, month: 'Jan', amount: 54000 },
  { id: 2, month: 'Feb', amount: 62000 },
  { id: 3, month: 'Mär', amount: 58000 },
  { id: 4, month: 'Apr', amount: 71000 },
  { id: 5, month: 'Mai', amount: 65000 },
  { id: 6, month: 'Jun', amount: 69000 },
  { id: 7, month: 'Jul', amount: 72000 },
  { id: 8, month: 'Aug', amount: 68000 },
  { id: 9, month: 'Sep', amount: 74000 },
  { id: 10, month: 'Okt', amount: 70000 },
  { id: 11, month: 'Nov', amount: 66000 },
  { id: 12, month: 'Dez', amount: 75000 },
];

export function BenefitsOverview() {
  const [activeTab, setActiveTab] = useState<'overview' | 'employees'>('overview');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate KPIs
  const totalBudget = 1200000;
  const usedYTD = 684320;
  const activeEmployees = 1024;
  const avgPerEmployee = 668;
  const usagePercentage = 57;

  const budgetDonutData = [
    { name: 'Verwendet', value: usagePercentage },
    { name: 'Frei', value: 100 - usagePercentage },
  ];

  const handleToggleEmployee = (employeeId: string) => {
    const newSet = new Set(selectedEmployees);
    if (newSet.has(employeeId)) {
      newSet.delete(employeeId);
    } else {
      newSet.add(employeeId);
    }
    setSelectedEmployees(newSet);
  };

  const handleSelectAll = () => {
    const allIds = mockEmployees.filter((e) => !e.alreadyAssigned).map((e) => e.id);
    setSelectedEmployees(new Set(allIds));
  };

  const handleDeselectAll = () => {
    setSelectedEmployees(new Set());
  };

  const handleSubmitEmployees = () => {
    // Simulate API call
    alert(`${selectedEmployees.size} Mitarbeiter zu "${selectedBenefit?.name}" hinzugefügt!`);
    setShowAddEmployeeModal(false);
    setSelectedEmployees(new Set());
  };

  const handleEdit = (benefitId: string) => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-edit' } }));
  };

  const filteredEmployees = mockEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.employeeNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50 overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#273A5F]">Benefits Übersicht</h1>
          </div>
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')} className={`px-6 py-3 font-medium text-sm rounded-lg transition ${
                activeTab === 'overview'
                  ? 'bg-[#0F429F] text-white'
                  : 'bg-white text-[#273A5F] border border-[#E5E7EB] hover:bg-gray-50'
              }`}
            >
              Gesamtübersicht
            </button>
            <button
              onClick={() => setActiveTab('employees')} className={`px-6 py-3 font-medium text-sm rounded-lg transition ${
                activeTab === 'employees'
                  ? 'bg-[#0F429F] text-white'
                  : 'bg-white text-[#273A5F] border border-[#E5E7EB] hover:bg-gray-50'
              }`}
            >
              Mitarbeiterübersicht
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm">
            <p className="text-[#6B7280] text-xs mb-2">Gesamtbudget</p>
            <p className="text-[#273A5F] font-bold text-3xl">€ {totalBudget.toLocaleString('de-DE')}</p>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm">
            <p className="text-[#6B7280] text-xs mb-2">Verwendet (YTD)</p>
            <p className="text-[#273A5F] font-bold text-3xl">€ {usedYTD.toLocaleString('de-DE')}</p>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm">
            <p className="text-[#6B7280] text-xs mb-2">Aktive Mitarbeiter</p>
            <p className="text-[#273A5F] font-bold text-3xl">{activeEmployees.toLocaleString('de-DE')}</p>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm">
            <p className="text-[#6B7280] text-xs mb-2">Ø Nutzung/MA</p>
            <p className="text-[#273A5F] font-bold text-3xl">€ {avgPerEmployee}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Budget Donut Chart */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm">
            <h2 className="text-[#273A5F] font-bold text-lg mb-4">Budget-Übersicht</h2>
            <div className="flex flex-col items-center">
              <div style={{ width: '100%', height: '240px', minHeight: '240px', minWidth: 0, display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height={240} minWidth={0} minHeight={0}>
                  <PieChart id="budget-pie-chart">
                    <Pie
                      key="pie-budget"
                      data={budgetDonutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      isAnimationActive={false}
                      animationDuration={0}
                    >
                      {budgetDonutData.map((entry, index) => (
                        <Cell key={`cell-${entry.name}-${index}`} fill={index === 0 ? '#0F429F' : '#E5E7EB'} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <p className="text-[#0F429F] font-bold text-xl">{usagePercentage}% genutzt</p>
                <p className="text-[#6B7280] text-sm">{100 - usagePercentage}% frei</p>
                <div className="mt-4 text-xs text-[#4B5563] space-y-1">
                  <p>€ {totalBudget.toLocaleString('de-DE')} Total</p>
                  <p>€ {usedYTD.toLocaleString('de-DE')} Verwendet</p>
                  <p>€ {(totalBudget - usedYTD).toLocaleString('de-DE')} Frei</p>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Chart */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#273A5F] font-bold text-lg">Nutzungsverlauf</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-[#E5E7EB] text-[#273A5F] text-xs rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  Letzte 12 Monate <ChevronDown size={14} />
                </button>
              </div>
            </div>
            <div style={{ width: '100%', height: '280px', minHeight: '280px', minWidth: 0, overflow: 'auto' }}>
              <ResponsiveContainer width="100%" height={280} minWidth={0} minHeight={0}>
                <BarChart
                  id="usage-chart"
                  data={monthlyUsageData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                <CartesianGrid key="grid-usage" strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  key="xaxis-usage"
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis
                  key="yaxis-usage"
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip key="tooltip-usage" />
                <Bar
                  key="bar-amount"
                  dataKey="amount"
                  name="amount"
                  fill="#0F429F"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                  animationDuration={0}
                  maxBarSize={60}
                />
              </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-[#6B7280] mt-2">
              Die Grafik zeigt aggregierte Ausgaben über alle Benefit-Kategorien.
            </p>
          </div>
        </div>

        {/* Benefits Cards Grid */}
        <div>
          {/* Cash-Benefits Section */}
          <div className="mb-12">
            <h2 className="text-[#273A5F] font-bold text-xl mb-6">Cash-Benefits</h2>
            <div className="space-y-4">
              {mockBenefits.filter(b => b.category === 'cash').map((benefit) => (
                <button
                  key={benefit.id}
                  onClick={() => handleEdit(benefit.id)} className="w-full bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm hover:shadow-md hover:border-[#0F429F] transition-all text-left"
                >
                  <div className="flex gap-6 items-start">
                    {/* Icon - Left Side (64px) */}
                    <div className="flex-shrink-0">
                      <BenefitIconComponent benefitName={benefit.name} size={48} background={true} />
                    </div>

                    {/* Content - Center/Right */}
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-[#273A5F] font-bold text-lg inline">{benefit.name}</h3>
                        <span className="text-[#273A5F] text-lg ml-3">bis zu</span>
                        <span className="text-[#0F429F] font-bold text-lg ml-2">€ {benefit.totalBudget.toLocaleString('de-DE')}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <StatusBadge status={benefit.status === 'active' ? 'Aktiv' : 'Inaktiv'} type={benefit.status === 'active' ? 'success' : 'inactive'} />
                      </div>
                      <div className="flex justify-between text-xs text-[#666666]">
                        <span>{benefit.employeeCount.toLocaleString('de-DE')} Mitarbeiter</span>
                        <span>{benefit.usagePercentage}% genutzt</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Gutschein-Benefits Section */}
          <div className="mb-8">
            <h2 className="text-[#273A5F] font-bold text-xl mb-6">Gutschein-Benefits</h2>
            <div className="space-y-4">
              {mockBenefits.filter(b => b.category === 'gutschein').map((benefit) => (
                <button
                  key={benefit.id}
                  onClick={() => handleEdit(benefit.id)} className="w-full bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm hover:shadow-md hover:border-[#0F429F] transition-all text-left"
                >
                  <div className="flex gap-6 items-start">
                    {/* Icon - Left Side (64px) */}
                    <div className="flex-shrink-0">
                      <BenefitIconComponent benefitName={benefit.name} size={48} background={true} />
                    </div>

                    {/* Content - Center/Right */}
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-[#273A5F] font-bold text-lg inline">{benefit.name}</h3>
                        <span className="text-[#273A5F] text-lg ml-3">bis zu</span>
                        <span className="text-[#0F429F] font-bold text-lg ml-2">€ {benefit.totalBudget.toLocaleString('de-DE')}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <StatusBadge status={benefit.status === 'active' ? 'Aktiv' : 'Inaktiv'} type={benefit.status === 'active' ? 'success' : 'inactive'} />
                      </div>
                      <div className="flex justify-between text-xs text-[#666666]">
                        <span>{benefit.employeeCount.toLocaleString('de-DE')} Mitarbeiter</span>
                        <span>{benefit.usagePercentage}% genutzt</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && selectedBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
              <h2 className="text-[#273A5F] font-bold text-xl">
                Mitarbeiter hinzufügen — {selectedBenefit.name}
              </h2>
              <button
                onClick={() => setShowAddEmployeeModal(false)} className="text-[#6B7280] hover:text-[#273A5F] transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Search/Filter Section */}
            <div className="p-6 border-b border-[#E5E7EB]">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="text"
                    placeholder="Suche nach Mitarbeitername, Nummer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-10 pl-10 pr-4 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#273A5F] focus:outline-none focus:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:ring-opacity-20"
                  />
                </div>
                <button className="px-4 h-10 border border-[#E5E7EB] text-[#273A5F] text-sm rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  Abteilung: Alle <ChevronDown size={16} />
                </button>
              </div>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleSelectAll} className="text-[#0F429F] text-sm hover:underline"
                >
                  Alle auswählen
                </button>
                <button
                  onClick={handleDeselectAll} className="text-[#6B7280] text-sm hover:underline"
                >
                  Keine auswählen
                </button>
              </div>
            </div>

            {/* Employee List */}
            <div className="flex-1 overflow-auto p-6" style={{ maxHeight: '400px' }}>
              <div className="space-y-2">
                {filteredEmployees.map((employee) => (
                  <label
                    key={employee.id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                      selectedEmployees.has(employee.id)
                        ? 'bg-[#F0F9FF] border-2 border-[#0F429F]'
                        : 'bg-white border border-[#E5E7EB] hover:bg-gray-50'
                    } ${employee.alreadyAssigned ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedEmployees.has(employee.id)}
                      onChange={() => handleToggleEmployee(employee.id)}
                      disabled={employee.alreadyAssigned} className="w-5 h-5 text-[#0F429F] rounded border-gray-300 focus:ring-[#0F429F]"
                    />
                    <div className="flex-1">
                      <p className="text-[#273A5F] font-medium text-sm">
                        {employee.name} ({employee.employeeNumber})
                      </p>
                      <p className="text-[#6B7280] text-xs">
                        {employee.department}
                        {employee.alreadyAssigned && ' • Bereits zugewiesen'}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-[#E5E7EB] bg-gray-50">
              <p className="text-[#6B7280] text-sm">
                {selectedEmployees.size} Mitarbeiter ausgewählt
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddEmployeeModal(false)} className="px-6 py-3 border border-[#E5E7EB] text-[#273A5F] font-medium rounded-full hover:bg-white transition"
                  style={{ borderRadius: '32px' }}
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleSubmitEmployees}
                  disabled={selectedEmployees.size === 0} className={`px-6 py-3 font-medium rounded-full transition ${
                    selectedEmployees.size > 0
                      ? 'bg-[#0F429F] text-white hover:bg-[#0d3680]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  style={{ borderRadius: '32px' }}
                >
                  Hinzufügen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
