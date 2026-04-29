import { useState } from 'react';
import { ArrowLeft, Plus, Euro, Users as UsersIcon, TrendingUp, PieChart } from 'lucide-react';
import { Table, StatusBadge } from './Table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BenefitIconComponent } from './BenefitIconComponent';

interface LocationDetailsProps {
  locationId: string;
  locationName: string;
}

const benefits = [
  { id: 'mittagessen', name: 'Mittagessen', limit: 100, active: true },
  { id: 'internet', name: 'Internet', limit: 50, active: true },
  { id: 'kindergarten', name: 'Kindergarten', limit: 150, active: false },
  { id: 'commuting', name: 'Commuting', limit: 80, active: true },
  { id: 'danke-bonus', name: 'Danke-Bonus', limit: 100, active: true }
];

const employees = [
  { id: '1', nr: 'MA-10234', name: 'Max Mustermann', department: 'IT', status: 'active' },
  { id: '2', nr: 'MA-10081', name: 'Sarah Weber', department: 'Marketing', status: 'active' },
  { id: '3', nr: 'MA-10977', name: 'Thomas Becker', department: 'Finanzen', status: 'active' },
  { id: '4', nr: 'MA-10542', name: 'Lisa Müller', department: 'HR', status: 'active' },
  { id: '5', nr: 'MA-11109', name: 'Michael Schmidt', department: 'IT', status: 'active' }
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

  const handleBack = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'locations' } }));
  };

  const handleAddBenefit = () => {
    window.dispatchEvent(
      new CustomEvent('sidebar-navigate', {
        detail: { itemId: 'benefits-add-location', locationId, locationName }
      })
    );
  };

  const handleToggleBenefit = (benefitId: string) => {
    console.log('Toggle benefit:', benefitId);
  };

  const employeeColumns = [
    { key: 'nr', label: 'PERSONENNUMMER', width: '150px' },
    { key: 'name', label: 'NAME', width: '200px' },
    { key: 'department', label: 'ABTEILUNG', width: '150px' },
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
      render: () => (
        <button className="text-[#F44336] text-[12px] hover:underline" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Entfernen
        </button>
      )
    }
  ];

  const filteredEmployees = employees.filter(
    emp =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.nr.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-8 py-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#0F429F] text-[14px] font-medium mb-4 hover:underline"
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
            onClick={() => setActiveTab('benefits')}
            className={`pb-3 text-[14px] font-medium transition-colors ${
              activeTab === 'benefits'
                ? 'text-[#0F429F] border-b-2 border-[#0F429F]'
                : 'text-[#666666] hover:text-[#0F429F]'
            }`}
          >
            Benefits
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`pb-3 text-[14px] font-medium transition-colors ${
              activeTab === 'employees'
                ? 'text-[#0F429F] border-b-2 border-[#0F429F]'
                : 'text-[#666666] hover:text-[#0F429F]'
            }`}
          >
            Mitarbeiter
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-[14px] font-medium transition-colors ${
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
      <div className="px-8 py-8">
        {/* TAB 1: Benefits */}
        {activeTab === 'benefits' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#273A5F] font-bold text-[20px]">Benefits für {locationName}</h2>
              <button
                onClick={handleAddBenefit}
                className="flex items-center gap-2 px-6 py-2 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
              >
                <Plus size={16} />
                Benefit hinzufügen
              </button>
            </div>

            <div className="bg-white rounded-lg border border-[#E0E0E0] p-6 mb-6">
              <div className="space-y-4">
                {benefits.map(benefit => (
                  <div
                    key={benefit.id}
                    className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg border border-[#E0E0E0]"
                  >
                    <div className="flex items-center gap-4">
                      <BenefitIconComponent benefitName={benefit.name} size={32} />
                      <div>
                        <p className="text-[#273A5F] font-medium text-[14px]">{benefit.name}</p>
                        <p className="text-[#666666] text-[12px]">Limit: {benefit.limit}€/Monat</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div
                          onClick={() => handleToggleBenefit(benefit.id)}
                          className={`w-12 h-6 rounded-full relative transition-colors ${
                            benefit.active ? 'bg-[#4CAF50]' : 'bg-[#9E9E9E]'
                          }`}
                        >
                          <div
                            className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all"
                            style={{ left: benefit.active ? '26px' : '2px' }}
                          ></div>
                        </div>
                        <span className="text-[#666666] text-[12px]">{benefit.active ? 'ON' : 'OFF'}</span>
                      </label>
                      <button className="text-[#0F429F] text-[12px] hover:underline">Bearbeiten</button>
                      <button className="text-[#666666] text-[16px] hover:text-[#0F429F]">⋮</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F0F4FF] border border-[#E0E0E0] rounded-lg p-4">
              <p className="text-[#666666] text-[12px]">
                <strong>Hinweis:</strong> Neue Benefits gelten ab 1. nächsten Monat für alle Mitarbeiter dieser Location.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: Mitarbeiter */}
        {activeTab === 'employees' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[#273A5F] font-bold text-[20px]">Mitarbeiter in {locationName}</h2>
              <button className="flex items-center gap-2 px-6 py-2 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors">
                <Plus size={16} />
                Mitarbeiter zuordnen
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Nach Name oder Personennummer suchen"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg text-[14px]"
              />
            </div>

            <div className="bg-white rounded-lg border border-[#E0E0E0] overflow-hidden mb-6">
              <Table columns={employeeColumns} data={filteredEmployees} hoverable={true} />
            </div>

            <div className="bg-[#F0F4FF] border border-[#E0E0E0] rounded-lg p-4">
              <p className="text-[#666666] text-[12px]">
                <strong>Hinweis:</strong> Mitarbeiter-Änderungen gelten ab 1. nächsten Monat. Location-Wechsel werden
                als weiche Migration durchgeführt.
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
                <p className="text-[#666666] text-[12px] mb-1">Auslastung</p>
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
