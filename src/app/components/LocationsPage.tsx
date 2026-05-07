import { useState } from 'react';
import { Plus, ChevronRight, Edit2, Trash2, X, Search, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { StatusBadge } from './Table';

type LocationType = 'Standort' | 'Tochterunternehmen';

type Location = {
  id: string;
  name: string;
  type: LocationType;
  employees: number;
  budgetMonth: number;
  usedMonth: number;
  percentage: number;
  status: 'aktiv' | 'inaktiv';
};

type LocationBenefit = {
  id: string;
  name: string;
  limit: string;
  active: boolean;
};

type LocationEmployee = {
  id: string;
  nr: string;
  name: string;
  status: 'aktiv' | 'inaktiv';
};

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Heddesheim',
    type: 'Standort',
    employees: 34,
    budgetMonth: 4200,
    usedMonth: 3100,
    percentage: 74,
    status: 'aktiv',
  },
  {
    id: '2',
    name: 'Mannheim',
    type: 'Standort',
    employees: 52,
    budgetMonth: 6800,
    usedMonth: 5200,
    percentage: 76,
    status: 'aktiv',
  },
  {
    id: '3',
    name: 'Berlin Tech GmbH',
    type: 'Tochterunternehmen',
    employees: 28,
    budgetMonth: 3500,
    usedMonth: 2450,
    percentage: 70,
    status: 'aktiv',
  },
  {
    id: '4',
    name: 'München',
    type: 'Standort',
    employees: 41,
    budgetMonth: 5100,
    usedMonth: 4080,
    percentage: 80,
    status: 'aktiv',
  },
  {
    id: '5',
    name: 'Hamburg Sales GmbH',
    type: 'Tochterunternehmen',
    employees: 19,
    budgetMonth: 2400,
    usedMonth: 1680,
    percentage: 70,
    status: 'inaktiv',
  },
];

const mockLocationBenefits: LocationBenefit[] = [
  { id: '1', name: 'Essenszuschuss', limit: '7€/Tag', active: true },
  { id: '2', name: 'Internetzuschuss', limit: '50€/Monat', active: true },
  { id: '3', name: 'Mobilität', limit: '100€/Monat', active: true },
  { id: '4', name: 'Urban Sports Club', limit: '30€/Monat', active: false },
];

const mockLocationEmployees: LocationEmployee[] = [
  { id: '1', nr: 'MA-2451', name: 'Max Mustermann', status: 'aktiv' },
  { id: '2', nr: 'MA-2452', name: 'Sarah Weber', status: 'aktiv' },
  { id: '3', nr: 'MA-2453', name: 'Thomas Becker', status: 'aktiv' },
  { id: '4', nr: 'MA-2454', name: 'Lisa Müller', status: 'aktiv' },
  { id: '5', nr: 'MA-2455', name: 'Michael Schmidt', status: 'inaktiv' },
];

const budgetData = [
  { id: 1, month: 'Jan', verfuegbar: 4200, genutzt: 2940 },
  { id: 2, month: 'Feb', verfuegbar: 4200, genutzt: 3150 },
  { id: 3, month: 'Mär', verfuegbar: 4200, genutzt: 2940 },
  { id: 4, month: 'Apr', verfuegbar: 4200, genutzt: 3360 },
  { id: 5, month: 'Mai', verfuegbar: 4200, genutzt: 3570 },
  { id: 6, month: 'Jun', verfuegbar: 4200, genutzt: 3780 },
  { id: 7, month: 'Jul', verfuegbar: 4200, genutzt: 3360 },
  { id: 8, month: 'Aug', verfuegbar: 4200, genutzt: 2940 },
  { id: 9, month: 'Sep', verfuegbar: 4200, genutzt: 3570 },
  { id: 10, month: 'Okt', verfuegbar: 4200, genutzt: 3780 },
  { id: 11, month: 'Nov', verfuegbar: 4200, genutzt: 3360 },
  { id: 12, month: 'Dez', verfuegbar: 4200, genutzt: 3990 },
];

const usageData = [
  { id: 1, month: 'Jan', amount: 2940 },
  { id: 2, month: 'Feb', amount: 3150 },
  { id: 3, month: 'Mär', amount: 2940 },
  { id: 4, month: 'Apr', amount: 3360 },
  { id: 5, month: 'Mai', amount: 3570 },
  { id: 6, month: 'Jun', amount: 3780 },
  { id: 7, month: 'Jul', amount: 3360 },
  { id: 8, month: 'Aug', amount: 2940 },
  { id: 9, month: 'Sep', amount: 3570 },
  { id: 10, month: 'Okt', amount: 3780 },
  { id: 11, month: 'Nov', amount: 3360 },
  { id: 12, month: 'Dez', amount: 3990 },
];

export function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [activeTab, setActiveTab] = useState<'benefits' | 'employees' | 'overview'>('benefits');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('de-DE') + '€';
  };

  const handleOpenLocation = (location: Location) => {
    setSelectedLocation(location);
    setActiveTab('benefits');
  };

  const handleBackToList = () => {
    setSelectedLocation(null);
  };

  if (selectedLocation) {
    // Location Details View
    const totalBudget = 4200;
    const totalUsed = 3100;
    const totalAvailable = totalBudget - totalUsed;
    const utilization = Math.round((totalUsed / totalBudget) * 100);

    return (
      <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {/* Header */}
        <div className="bg-white border-b border-[#E8E8E8] px-4 md:px-6 lg:px-8 py-6">
          <button
            onClick={handleBackToList} className="text-[#246AFF] text-sm font-medium mb-4 hover:underline flex items-center gap-2"
          >
            ← Zurück zur Übersicht
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-[#000000] font-bold text-[24px]">{selectedLocation.name}</h1>
              <span className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: selectedLocation.type === 'Standort' ? '#F0F4FF' : '#FFF4E6',
                  color: selectedLocation.type === 'Standort' ? '#0F429F' : '#F57C00',
                }}
              >
                {selectedLocation.type === 'Standort' ? '🏢' : '🏛️'} {selectedLocation.type}
              </span>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <span className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>Status</span>
              <div className={`w-12 h-6 rounded-full transition ${
                  selectedLocation.status === 'aktiv' ? 'bg-[#4CAF50]' : 'bg-[#9E9E9E]'
                }`}
                style={{ position: 'relative' }}
              >
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all"
                  style={{ left: selectedLocation.status === 'aktiv' ? '26px' : '2px' }}
                ></div>
              </div>
              <span className="text-[#000000] text-sm font-medium">
                {selectedLocation.status === 'aktiv' ? 'Aktiv' : 'Inaktiv'}
              </span>
            </label>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-[#E8E8E8] px-4 md:px-6 lg:px-8">
          <div className="flex gap-3 md:gap-6">
            <button
              onClick={() => setActiveTab('benefits')} className={`py-4 px-2 font-medium text-sm border-b-2 transition ${
                activeTab === 'benefits'
                  ? 'border-[#0F429F] text-[#0F429F]'
                  : 'border-transparent text-[#666666] hover:text-[#000000]'
              }`}
            >
              Benefits
            </button>
            <button
              onClick={() => setActiveTab('employees')} className={`py-4 px-2 font-medium text-sm border-b-2 transition ${
                activeTab === 'employees'
                  ? 'border-[#0F429F] text-[#0F429F]'
                  : 'border-transparent text-[#666666] hover:text-[#000000]'
              }`}
            >
              Mitarbeiter
            </button>
            <button
              onClick={() => setActiveTab('overview')} className={`py-4 px-2 font-medium text-sm border-b-2 transition ${
                activeTab === 'overview'
                  ? 'border-[#0F429F] text-[#0F429F]'
                  : 'border-transparent text-[#666666] hover:text-[#000000]'
              }`}
            >
              Übersicht
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 md:px-6 lg:px-8 py-6">
          {activeTab === 'benefits' && (
            <div>
              <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#273A5F] px-6 h-12" style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '0' }}>
                  <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Benefit-Name</div>
                  <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Budget/Monat</div>
                  <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Status</div>
                  <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Aktion</div>
                </div>

                {/* Table Rows */}
                {mockLocationBenefits.map((benefit, index) => (
                  <div
                    key={benefit.id} className={`px-6 h-14 border-b border-[#E5E7EB] last:border-b-0 transition-colors hover:bg-gray-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'
                    }`}
                    style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '0' }}
                  >
                    <div className="text-[#000000] text-sm font-medium">{benefit.name}</div>
                    <div className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>{benefit.limit}</div>
                    <div>
                      <div className={`w-10 h-5 rounded-full transition ${
                          benefit.active ? 'bg-[#4CAF50]' : 'bg-[#9E9E9E]'
                        }`}
                        style={{ position: 'relative' }}
                      >
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all"
                          style={{ left: benefit.active ? '22px' : '2px' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-edit-location' } }));
                        }} className="p-2 text-[#0F429F] hover:bg-[#F0F4FF] rounded transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-add-location' } }));
                  }} className="px-6 py-3 border-2 border-[#0F429F] text-[#0F429F] font-medium rounded-full hover:bg-[#F0F4FF] transition flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Benefit hinzufügen
                </button>
                <button className="px-6 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3680] transition">
                  Speichern
                </button>
              </div>

              <p className="mt-4 text-[#666666] text-xs">
                Änderungen gelten ab dem 1. des nächsten Monats für alle Mitarbeiter dieses Standorts.
              </p>
            </div>
          )}

          {activeTab === 'employees' && (
            <div>
              <div className="mb-6 flex items-center gap-4">
                <button className="px-6 py-3 border-2 border-[#0F429F] text-[#0F429F] font-medium rounded-full hover:bg-[#F0F4FF] transition flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Mitarbeiter hinzufügen
                </button>
                <button className="px-6 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3680] transition">
                  Speichern
                </button>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#273A5F] px-6 h-12" style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '0' }}>
                  <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Personennummer</div>
                  <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Name</div>
                  <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Status</div>
                  <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Aktion</div>
                </div>

                {/* Table Rows */}
                {mockLocationEmployees.map((employee, index) => (
                  <div
                    key={employee.id} className={`px-6 h-14 border-b border-[#E5E7EB] last:border-b-0 transition-colors hover:bg-gray-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'
                    }`}
                    style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: '0' }}
                  >
                    <div className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>{employee.nr}</div>
                    <div className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>{employee.name}</div>
                    <div>
                      <StatusBadge status={employee.status === 'aktiv' ? 'Aktiv' : 'Inaktiv'} type={employee.status === 'aktiv' ? 'success' : 'inactive'} />
                    </div>
                    <div>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="bg-white border border-[#E0E0E0] rounded-xl p-6" style={{ borderRadius: '12px' }}>
                  <p className="text-[#666666] text-xs mb-2">Gesamtbudget (Monat)</p>
                  <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalBudget)}</p>
                </div>
                <div className="bg-white border border-[#E0E0E0] rounded-xl p-6" style={{ borderRadius: '12px' }}>
                  <p className="text-[#666666] text-xs mb-2">Genutzt (dieser Monat)</p>
                  <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalUsed)}</p>
                </div>
                <div className="bg-white border border-[#E0E0E0] rounded-xl p-6" style={{ borderRadius: '12px' }}>
                  <p className="text-[#666666] text-xs mb-2">Übrig</p>
                  <p className="text-[#0F429F] font-bold text-2xl">{formatCurrency(totalAvailable)}</p>
                </div>
                <div className="bg-white border border-[#E0E0E0] rounded-xl p-6" style={{ borderRadius: '12px' }}>
                  <p className="text-[#666666] text-xs mb-2">Nutzungsquote</p>
                  <p className="text-[#0F429F] font-bold text-2xl">{utilization}%</p>
                </div>
              </div>

              {/* Budget Chart */}
              <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-8" style={{ borderRadius: '12px' }}>
                <h3 className="text-[#000000] font-bold text-base mb-6">Budget-Verlauf (12 Monate)</h3>
                <div style={{ width: '100%', height: '300px', minHeight: '300px', minWidth: 0 }}>
                  <ResponsiveContainer width="100%" height={300} minWidth={0} minHeight={0}>
                    <BarChart
                      data={budgetData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid key="grid-loc" strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                      <XAxis
                        key="xaxis-loc"
                        dataKey="month"
                        axisLine={{ stroke: '#E5E7EB' }}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis
                        key="yaxis-loc"
                        axisLine={{ stroke: '#E5E7EB' }}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        tickFormatter={(value) => `${value.toLocaleString('de-DE')}€`}
                        tickLine={false}
                      />
                      <Tooltip key="tooltip-loc" />
                      <Legend
                        key="legend-loc"
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="square"
                        formatter={(value: string) => {
                          return value === 'verfuegbar' ? 'Verfügbar' : 'Genutzt';
                        }}
                      />
                      <Bar
                        key="bar-loc-verfuegbar"
                        dataKey="verfuegbar"
                        name="verfuegbar"
                        fill="#0A2E7A"
                        radius={[4, 4, 0, 0]}
                        isAnimationActive={false}
                        animationDuration={0}
                        maxBarSize={40}
                      />
                      <Bar
                        key="bar-loc-genutzt"
                        dataKey="genutzt"
                        name="genutzt"
                        fill="#246AFF"
                        radius={[4, 4, 0, 0]}
                        isAnimationActive={false}
                        animationDuration={0}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Usage Line Chart */}
              <div className="bg-white border border-[#E0E0E0] rounded-xl p-6" style={{ borderRadius: '12px' }}>
                <h3 className="text-[#000000] font-bold text-base mb-6">Nutzungsverlauf</h3>
                <div style={{ width: '100%', height: '300px', minHeight: '300px', minWidth: 0 }}>
                  <ResponsiveContainer width="100%" height={300} minWidth={0} minHeight={0}>
                    <LineChart
                      data={usageData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid key="grid-usage-loc" strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        key="xaxis-usage-loc"
                        dataKey="month"
                        axisLine={{ stroke: '#E5E7EB' }}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis
                        key="yaxis-usage-loc"
                        axisLine={{ stroke: '#E5E7EB' }}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        tickFormatter={(value) => `${value.toLocaleString('de-DE')}€`}
                        tickLine={false}
                      />
                      <Tooltip key="tooltip-usage-loc" />
                      <Line
                        key="line-usage-loc"
                        type="monotone"
                        dataKey="amount"
                        stroke="#246AFF"
                        strokeWidth={2}
                        dot={{ fill: '#246AFF', r: 4 }}
                        isAnimationActive={false}
                        animationDuration={0}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Locations List View
  return (
    <div className="flex-1 bg-white overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="px-4 md:px-6 lg:px-8 py-6 border-b border-[#E8E8E8] flex items-center justify-between">
        <div>
          <h1 className="text-[#000000] font-bold text-[28px] mb-2">Verwaltete Standorte</h1>
          <p className="text-[#666666] text-sm overflow-hidden" style={{ minWidth: 0 }}>Übersicht aller Standorte und Tochterunternehmen</p>
        </div>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'location-form-create' } }));
          }} className="px-6 py-3 bg-[#4CAF50] text-white font-medium rounded-full hover:bg-[#45a049] transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Standort erstellen
        </button>
      </div>

      {/* Table */}
      <div className="px-4 md:px-6 lg:px-8 py-6">
        <div className="w-full border border-[#E5E7EB] rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="w-full bg-[#273A5F] flex items-center px-6 h-12" style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '2.5fr 0.9fr 0.8fr 0.9fr 0.9fr 0.8fr auto', gap: '0' }}>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Name</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Typ</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Mitarbeiter</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Budget/Monat</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Genutzt (dieser Monat)</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Status</div>
            <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Aktion</div>
          </div>

          {/* Table Rows */}
          {mockLocations.map((location, index) => (
            <div
              key={location.id} className={`w-full px-6 h-14 border-b border-[#E5E7EB] last:border-b-0 transition-colors hover:bg-gray-50 cursor-pointer ${
                index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'
              }`}
              style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '2.5fr 0.9fr 0.8fr 0.9fr 0.9fr 0.8fr auto', gap: '0' }}
              onClick={() => handleOpenLocation(location)}
            >
              <div className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>{location.name}</div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: location.type === 'Standort' ? '#F0F4FF' : '#FFF4E6',
                    color: location.type === 'Standort' ? '#0F429F' : '#F57C00',
                  }}
                >
                  {location.type === 'Standort' ? '🏢' : '🏛️'} {location.type}
                </span>
              </div>
              <div className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>{location.employees}</div>
              <div className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>{formatCurrency(location.budgetMonth)}</div>
              <div className="text-[#000000] text-sm overflow-hidden" style={{ minWidth: 0 }}>
                {formatCurrency(location.usedMonth)} ({location.percentage}%)
              </div>
              <div>
                <StatusBadge status={location.status === 'aktiv' ? 'Aktiv' : 'Inaktiv'} type={location.status === 'aktiv' ? 'success' : 'inactive'} />
              </div>
              <div>
                <button className="text-[#246AFF] hover:underline flex items-center gap-1">
                  Öffnen
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="px-4 md:px-6 lg:px-8 py-6 flex items-center justify-between">
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
            disabled={currentPage === 1} className={`p-2 border rounded-lg transition ${currentPage === 1 ? 'border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed' : 'border-[#D0D0D0] text-[#000000] hover:bg-gray-50'}`}
          >
            ‹
          </button>
          <span className="text-[#666666] text-sm">Seite {currentPage} von 3</span>
          <button
            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
            disabled={currentPage === 3} className={`p-2 border rounded-lg transition ${currentPage === 3 ? 'border-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed' : 'border-[#D0D0D0] text-[#000000] hover:bg-gray-50'}`}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
