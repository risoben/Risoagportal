import { useState, useMemo } from 'react';
import { ArrowLeft, Euro, Users as UsersIcon, TrendingUp, PieChart, Check } from 'lucide-react';
import { Table, StatusBadge } from './Table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BenefitIconComponent } from './BenefitIconComponent';
import { benefitsSettingsData } from './benefitSettingsData';

interface LocationDetailsProps {
  locationId: string;
  locationName: string;
}

// TODO: Replace this mock data with a real API call.
// Endpoint: GET /api/v1/portal/locations/{id}
// See DEVELOPER_GUIDE.md Section 5 (Location) for the full response shape including nested benefits, employees, and budgetChart.
const mockAllBenefits = [
  { id: 'mittagessen', name: 'Mittagessen', limit: 100, active: true },
  { id: 'internet', name: 'Internet', limit: 50, active: true },
  { id: 'kindergarten', name: 'Kindergarten', limit: 150, active: false },
  { id: 'commuting', name: 'Fahrkostenzuschuss', limit: 80, active: true },
  { id: 'danke-bonus', name: 'Danke-Bonus', limit: 100, active: true },
  { id: 'erholung', name: 'Erholung', limit: 13, active: false },
  { id: 'sachbezug', name: 'Sachbezug', limit: 50, active: false },
  { id: 'geburtstag', name: 'Geburtstag', limit: 50, active: false },
  { id: 'oepnv', name: 'ÖPNV', limit: 70, active: false },
  { id: 'bkv', name: 'BKV', limit: 80, active: false },
  { id: 'bav', name: 'BAV', limit: 150, active: false },
];

const employees = [
  { id: '1', nr: 'MA-10234', name: 'Max Mustermann', department: 'IT', active: true },
  { id: '2', nr: 'MA-10081', name: 'Sarah Weber', department: 'Marketing', active: true },
  { id: '3', nr: 'MA-10977', name: 'Thomas Becker', department: 'Finanzen', active: true },
  { id: '4', nr: 'MA-10542', name: 'Lisa Müller', department: 'HR', active: true },
  { id: '5', nr: 'MA-11109', name: 'Michael Schmidt', department: 'IT', active: false },
];

const budgetData = [
  { month: 'Mai', verfuegbar: 4200, genutzt: 3100 },
  { month: 'Jun', verfuegbar: 4200, genutzt: 3500 },
  { month: 'Jul', verfuegbar: 4200, genutzt: 2800 },
  { month: 'Aug', verfuegbar: 4200, genutzt: 3900 },
  { month: 'Sep', verfuegbar: 4200, genutzt: 3300 },
  { month: 'Okt', verfuegbar: 4200, genutzt: 3700 },
  { month: 'Nov', verfuegbar: 4200, genutzt: 2900 },
  { month: 'Dez', verfuegbar: 4200, genutzt: 3400 },
  { month: 'Jan', verfuegbar: 4200, genutzt: 3200 },
  { month: 'Feb', verfuegbar: 4200, genutzt: 3600 },
  { month: 'Mär', verfuegbar: 4200, genutzt: 3100 },
  { month: 'Apr', verfuegbar: 4200, genutzt: 3100 }
];

export function LocationDetails({ locationId, locationName }: LocationDetailsProps) {
  const [activeTab, setActiveTab] = useState<'benefits' | 'employees' | 'overview'>('benefits');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBenefits, setActiveBenefits] = useState<Set<string>>(
    new Set(mockAllBenefits.filter(b => b.active).map(b => b.id))
  );
  const [activeEmployees, setActiveEmployees] = useState<Set<string>>(
    new Set(employees.filter(e => e.active).map(e => e.id))
  );

  const handleBack = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'locations' } }));
  };

  const toggleBenefit = (benefitId: string) => {
    const newSet = new Set(activeBenefits);
    if (newSet.has(benefitId)) {
      newSet.delete(benefitId);
    } else {
      newSet.add(benefitId);
    }
    setActiveBenefits(newSet);
  };

  const toggleEmployee = (employeeId: string) => {
    const newSet = new Set(activeEmployees);
    if (newSet.has(employeeId)) {
      newSet.delete(employeeId);
    } else {
      newSet.add(employeeId);
    }
    setActiveEmployees(newSet);
  };

  const groupedBenefits = useMemo(() => {
    return mockAllBenefits.reduce((acc, benefit) => {
      const benefitData = benefitsSettingsData[benefit.id];
      if (!benefitData) return acc;

      let category = '';
      if (benefitData.category === 'cash') category = 'Cash-Benefits';
      else if (benefitData.category === 'voucher') category = 'Gutschein-Benefits';
      else if (benefitData.category === 'insurance') category = 'Versicherungs-Benefits';

      if (!acc[category]) acc[category] = [];
      acc[category].push(benefit);
      return acc;
    }, {} as Record<string, typeof mockAllBenefits>);
  }, []);

  const employeeColumns = [
    {
      key: 'active',
      label: 'AKTIV',
      width: '60px',
      align: 'center' as const,
      render: (_, row: any) => (
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={activeEmployees.has(row.id)}
              onChange={() => toggleEmployee(row.id)} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer hover:border-[#246AFF] transition-colors"
            />
            {activeEmployees.has(row.id) && (
              <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
            )}
          </div>
        </div>
      )
    },
    { key: 'nr', label: 'PERSONALNUMMER', width: '150px' },
    { key: 'name', label: 'NAME', width: '200px' },
    { key: 'department', label: 'ABTEILUNG', width: '150px' },
  ];

  const filteredEmployees = employees.filter(
    emp =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.nr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-4 md:px-6 lg:px-8 py-6">
        <button
          onClick={handleBack} className="flex items-center gap-2 text-[#0F429F] text-[14px] font-medium mb-4 hover:underline"
        >
          <ArrowLeft size={16} />
          Standorte
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-[#273A5F] font-bold text-[20px]">{locationName}</h1>
            <span className="px-3 py-1 bg-[#F9FAFB] text-[#666666] text-[12px] rounded-full border border-[#E0E0E0]">
              Standort
            </span>
          </div>
          <label className="flex items-center gap-2">
            <div className="w-12 h-6 bg-[#4CAF50] rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
            </div>
            <span className="text-[#333333] text-[14px]">Aktiv</span>
          </label>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-6 border-b border-[#E0E0E0]">
          <button
            onClick={() => setActiveTab('benefits')} className={`pb-3 text-[14px] font-medium transition-colors ${
              activeTab === 'benefits'
                ? 'text-[#0F429F] border-b-2 border-[#0F429F]'
                : 'text-[#666666] hover:text-[#0F429F]'
            }`}
          >
            Benefits
          </button>
          <button
            onClick={() => setActiveTab('employees')} className={`pb-3 text-[14px] font-medium transition-colors ${
              activeTab === 'employees'
                ? 'text-[#0F429F] border-b-2 border-[#0F429F]'
                : 'text-[#666666] hover:text-[#0F429F]'
            }`}
          >
            Mitarbeiter
          </button>
          <button
            onClick={() => setActiveTab('overview')} className={`pb-3 text-[14px] font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-[#0F429F] border-b-2 border-[#0F429F]'
                : 'text-[#666666] hover:text-[#0F429F]'
            }`}
          >
            Übersicht
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 lg:px-8 py-8">
        {/* TAB 1: Benefits */}
        {activeTab === 'benefits' && (
          <div>
            <h2 className="text-[#273A5F] font-bold text-[20px] mb-6">Hier kannst du für deine Benefits aktivieren und Budgets festlegen</h2>

            {Object.entries(groupedBenefits).map(([category, benefits]) => (
              <div key={category} className="mb-8">
                <h3 className="text-[#273A5F] font-bold text-[14px] mb-4">{category}</h3>
                <div className="px-4 md:px-6 lg:px-8 py-6">
                  <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
                    <div className="bg-[#273A5F] px-6 h-12" style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '60px 2fr 1fr 1fr', gap: '0', minWidth: '500px' }}>
                      <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Aktiv</div>
                      <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Benefit</div>
                      <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Budget</div>
                      <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Status</div>
                    </div>

                    {benefits.map((benefit, index) => (
                      <div
                        key={benefit.id} className={`px-6 h-14 border-b border-[#E5E7EB] last:border-b-0 transition-colors hover:bg-gray-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'
                        }`}
                        style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '60px 2fr 1fr 1fr', gap: '0', minWidth: '500px' }}
                      >
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={activeBenefits.has(benefit.id)}
                            onChange={() => toggleBenefit(benefit.id)} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer hover:border-[#246AFF] transition-colors"
                          />
                          {activeBenefits.has(benefit.id) && (
                            <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <BenefitIconComponent benefitName={benefit.name} size={32} background={false} />
                          <span className="text-sm text-[#000000]">{benefit.name}</span>
                        </div>

                        <div className="text-sm text-[#000000]">{benefit.limit}€</div>

                        <div>
                          <StatusBadge status={activeBenefits.has(benefit.id) ? 'Aktiv' : 'Inaktiv'} type={activeBenefits.has(benefit.id) ? 'success' : 'inactive'} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 mb-4">
              <button
                onClick={() => alert('Änderungen gespeichert!')}
                className="px-6 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3680] transition"
              >
                Speichern
              </button>
            </div>

            <div className="bg-[#F0F4FF] border border-[#E0E0E0] rounded-lg p-4">
              <p className="text-[#666666] text-[12px]">
                <strong>Hinweis:</strong> Änderungen gelten ab 1. des nächsten Monats für alle Mitarbeiter dieses Standorts. Benefits mit Jahresbudget (Erholung, Geburtstag, Danke-Bonus) werden einmal jährlich abgerechnet.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: Mitarbeiter */}
        {activeTab === 'employees' && (
          <div>
            <h2 className="text-[#273A5F] font-bold text-[20px] mb-6">Mitarbeiter in {locationName}</h2>

            <div className="mb-4">
              <button className="px-6 py-3 border-2 border-[#0F429F] text-[#0F429F] font-medium rounded-full hover:bg-[#F0F4FF] transition flex items-center gap-2">
                <span className="text-lg leading-none">+</span>
                Mitarbeiter hinzufügen
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Nach Name oder Personalnummer suchen" className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg text-[14px]"
              />
            </div>

            <div className="bg-white rounded-lg border border-[#E0E0E0] overflow-hidden mb-4">
              <Table columns={employeeColumns} data={filteredEmployees} hoverable={true} />
            </div>

            <div className="mb-4">
              <button
                onClick={() => alert('Änderungen gespeichert!')}
                className="px-6 py-3 bg-[#0F429F] text-white font-medium rounded-full hover:bg-[#0d3680] transition"
              >
                Speichern
              </button>
            </div>

            <div className="bg-[#F0F4FF] border border-[#E0E0E0] rounded-lg p-4">
              <p className="text-[#666666] text-[12px]">
                <strong>Hinweis:</strong> Änderungen gelten ab 1. des nächsten Monats. Location-Wechsel werden als weiche Migration durchgeführt.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: Übersicht */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-[#273A5F] font-bold text-[20px] mb-6">Budget-Übersicht {locationName}</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-[#F0F4FF] rounded-lg flex items-center justify-center">
                    <Euro size={24} className="text-[#0F429F]" />
                  </div>
                </div>
                <p className="text-[#666666] text-[12px] mb-1">Gesamtbudget</p>
                <p className="text-[#273A5F] font-bold text-[24px]">4.200€</p>
              </div>

              <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-[#F0F4FF] rounded-lg flex items-center justify-center">
                    <TrendingUp size={24} className="text-[#4CAF50]" />
                  </div>
                </div>
                <p className="text-[#666666] text-[12px] mb-1">Genutzt (diese Monat)</p>
                <p className="text-[#273A5F] font-bold text-[24px]">3.100€</p>
              </div>

              <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-[#F0F4FF] rounded-lg flex items-center justify-center">
                    <UsersIcon size={24} className="text-[#999999]" />
                  </div>
                </div>
                <p className="text-[#666666] text-[12px] mb-1">Übrig</p>
                <p className="text-[#273A5F] font-bold text-[24px]">1.100€</p>
              </div>

              <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-[#F0F4FF] rounded-lg flex items-center justify-center">
                    <PieChart size={24} className="text-[#0F429F]" />
                  </div>
                </div>
                <p className="text-[#666666] text-[12px] mb-1">Nutzungsquote</p>
                <p className="text-[#273A5F] font-bold text-[24px]">73.8%</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
              <h3 className="text-[#273A5F] font-bold text-[16px] mb-6">Budgetverlauf (12 Monate)</h3>
              <div style={{ width: '100%', height: '400px', minHeight: '400px', minWidth: 0 }}>
                <ResponsiveContainer width="100%" height={400} minWidth={0} minHeight={0}>
                  <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid key="location-grid" strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis
                      key="location-xaxis"
                      dataKey="month"
                      axisLine={{ stroke: '#E5E7EB' }}
                      tick={{ fill: '#666666', fontSize: 11, fontFamily: 'Roboto, sans-serif' }}
                      tickLine={false}
                    />
                    <YAxis
                      key="location-yaxis"
                      axisLine={{ stroke: '#E5E7EB' }}
                      tick={{ fill: '#666666', fontSize: 11, fontFamily: 'Roboto, sans-serif' }}
                      tickLine={false}
                    />
                    <Tooltip key="location-tooltip" />
                    <Bar key="bar-verfuegbar" dataKey="verfuegbar" name="Verfügbar" fill="#0F429F" radius={[4, 4, 0, 0]} />
                    <Bar key="bar-genutzt" dataKey="genutzt" name="Genutzt" fill="#246AFF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
