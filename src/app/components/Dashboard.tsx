import React from 'react';
import { Users, FileText, Download, Eye, Euro, Edit2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { BenefitIconComponent } from './BenefitIconComponent';
import { StatusBadge } from './Table';

// TODO: Replace this mock data with a real API call.
// Endpoint: GET /api/v1/portal/dashboard
// See DEVELOPER_GUIDE.md Section 5 (Dashboard KPIs) for the full response shape.
// Generate rolling 12 months of budget data
// Current month: April 2026 → Shows May 2025 to April 2026
const generateBudgetData = () => {
  const months = [
    'Mai 2025', 'Juni 2025', 'Juli 2025', 'August 2025', 'September 2025', 'Oktober 2025',
    'November 2025', 'Dezember 2025', 'Januar 2026', 'Februar 2026', 'März 2026', 'April 2026'
  ];

  return months.map((monthYear, index) => ({
    id: index + 1,
    monthYear,
    verfuegbar: 1041666,
    genutzt: [425000, 520000, 480000, 550000, 630000, 720000, 680000, 590000, 740000, 820000, 760000, 880000][index],
  }));
};

const budgetData = generateBudgetData();

// Employee data with longer names for testing ellipsis
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

// Reports data with long filenames for testing ellipsis
const reports = [
  { id: '1', date: '01.04.', month: 'April', createdDate: '01.04.2026', version: 'v2.3', fileType: 'PDF', fileName: 'Monatsbericht April' },
  { id: '2', date: '31.03.', month: 'März', createdDate: '31.03.2026', version: 'v2.2', fileType: 'Excel', fileName: 'Quartalsübersicht Q1' },
  { id: '3', date: '28.02.', month: 'Februar', createdDate: '28.02.2026', version: 'v2.1', fileType: 'PDF', fileName: 'Monatsbericht Februar' },
  { id: '4', date: '31.01.', month: 'Januar', createdDate: '31.01.2026', version: 'v2.0', fileType: 'Excel', fileName: 'Jahresübersicht 2025' },
  { id: '5', date: '15.01.', month: 'Januar', createdDate: '15.01.2026', version: 'v1.9', fileType: 'PDF', fileName: 'Mitarbeiter-Export 2025' },
];

export function Dashboard() {

  const handleNavigate = (page: string) => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: page } }));
  };

  const handleEmployeeEdit = (employeeId: number) => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'mitarbeiter-edit' } }));
  };

  const handleEmployeeDetails = (employeeId: number) => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'mitarbeiter-edit' } }));
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + '€';
  };

  const formatYAxisValue = (value: number) => {
    if (value >= 1000000) {
      const millions = (value / 1000000).toFixed(2);
      return `${millions}M€`;
    }
    return formatCurrency(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const verfuegbar = data.verfuegbar;
      const genutzt = data.genutzt;
      const verbleibend = verfuegbar - genutzt;
      const percentage = ((genutzt / verfuegbar) * 100).toFixed(1);

      return (
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-3 shadow-lg"
          style={{
            fontFamily: 'Roboto, sans-serif',
            animation: 'fadeIn 0.2s ease-in-out',
          }}
        >
          <p className="text-[#333333] font-medium text-[11px] mb-2">
            {data.monthYear}
          </p>
          <p className="text-[#333333] text-[11px] mb-1">
            Verfügbares Budget: <strong>{formatCurrency(verfuegbar)}</strong>
          </p>
          <p className="text-[#333333] text-[11px] mb-1">
            Genutztes Budget: <strong>{formatCurrency(genutzt)}</strong>
          </p>
          <p className="text-[#333333] text-[11px] mb-1">
            Verbleibendes Budget: <strong>{formatCurrency(verbleibend)}</strong>
          </p>
          <p className="text-[#333333] text-[11px]">
            Prozentuale Nutzung: <strong>{percentage}%</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-4 md:px-6 lg:px-8 py-6">
        <h1 className="text-[#273A5F] font-bold text-[32px]">Übersicht</h1>
      </div>

      <div className="px-8 py-8">
        {/* SECTION 1: KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Gesamtbudget */}
          <button
            onClick={() => handleNavigate('benefits')} className="bg-white border border-[#E0E0E0] rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 relative flex flex-col items-center justify-center text-center"
            style={{ minHeight: '140px' }}
          >
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center bg-[#F0F4FF] rounded-full" style={{ width: '84px', height: '84px' }}>
              <Euro size={42} className="text-[#0F429F]" strokeWidth={1.5} />
            </div>
            <div style={{ paddingLeft: '96px' }}>
              <p className="text-[#666666] text-[14px] font-medium mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Gesamtbudget</p>
              <p className="text-[#273A5F] font-bold text-[32px]" style={{ fontFamily: 'Roboto, sans-serif' }}>1.250.000€</p>
            </div>
          </button>

          {/* Registrierte Mitarbeiter */}
          <button
            onClick={() => handleNavigate('mitarbeiter')} className="bg-white border border-[#E0E0E0] rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 relative flex flex-col items-center justify-center text-center"
            style={{ minHeight: '140px' }}
          >
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center bg-[#F0F4FF] rounded-full" style={{ width: '84px', height: '84px' }}>
              <Users size={42} className="text-[#0F429F]" strokeWidth={1.5} />
            </div>
            <div style={{ paddingLeft: '96px' }}>
              <p className="text-[#666666] text-[14px] font-medium mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Registrierte Mitarbeiter</p>
              <p className="text-[#273A5F] font-bold text-[32px]" style={{ fontFamily: 'Roboto, sans-serif' }}>87</p>
            </div>
          </button>

          {/* Erstellte Berichte */}
          <button
            onClick={() => handleNavigate('reports')} className="bg-white border border-[#E0E0E0] rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 relative flex flex-col items-center justify-center text-center"
            style={{ minHeight: '140px' }}
          >
            <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center bg-[#F0F4FF] rounded-full" style={{ width: '84px', height: '84px' }}>
              <FileText size={42} className="text-[#0F429F]" strokeWidth={1.5} />
            </div>
            <div style={{ paddingLeft: '96px' }}>
              <p className="text-[#666666] text-[14px] font-medium mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Erstellte Berichte</p>
              <p className="text-[#273A5F] font-bold text-[32px]" style={{ fontFamily: 'Roboto, sans-serif' }}>24</p>
            </div>
          </button>
        </div>

        {/* SECTION 2: Budget Chart */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-8">
          <h2 className="text-[#273A5F] font-bold text-[16px] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Gesamtbudget und Nutzung <span style={{ fontWeight: 'normal' }}>(pro Monat)</span>
          </h2>
          <div style={{ width: '100%', height: '400px', minHeight: '400px', minWidth: 0 }}>
            <ResponsiveContainer width="100%" height={400} minWidth={0} minHeight={0}>
              <BarChart
                data={budgetData}
                margin={{ top: 20, right: 30, left: 60, bottom: 80 }}
              >
                <CartesianGrid key="budget-grid" strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  key="budget-xaxis"
                  dataKey="monthYear"
                  axisLine={{ stroke: '#E5E7EB' }}
                  tick={{ fill: '#666666', fontSize: 11, fontFamily: 'Roboto, sans-serif' }}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  key="budget-yaxis"
                  axisLine={{ stroke: '#E5E7EB' }}
                  tick={{ fill: '#666666', fontSize: 11, fontFamily: 'Roboto, sans-serif' }}
                  tickFormatter={formatYAxisValue}
                  tickLine={false}
                  domain={[0, 1500000]}
                  ticks={[0, 500000, 1000000, 1500000]}
                />
                <Tooltip key="budget-tooltip" content={<CustomTooltip />} cursor={{ fill: 'rgba(15, 66, 159, 0.05)' }} />
                <Legend
                  key="budget-legend"
                  wrapperStyle={{ paddingTop: '20px', fontFamily: 'Roboto, sans-serif' }}
                  iconType="square"
                  formatter={(value: string) => {
                    const label = value === 'verfuegbar' ? 'Verfügbares Budget' : 'Genutztes Budget';
                    return <span style={{ color: '#333333', fontSize: '12px', fontFamily: 'Roboto, sans-serif' }}>{label}</span>;
                  }}
                />
                <Bar
                  key="budget-bar-verfuegbar"
                  dataKey="verfuegbar"
                  name="verfuegbar"
                  fill="#0F429F"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
                <Bar
                  key="budget-bar-genutzt"
                  dataKey="genutzt"
                  name="genutzt"
                  fill="#246AFF"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 3: Mitarbeiter-Liste */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl mb-8">
          {/* Header */}
          <div className="px-6 py-6 border-b border-[#E0E0E0]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[#273A5F] font-bold text-[16px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Mitarbeiter
                </h2>
              </div>
              {/* TODO V2: clicking "Alle Mitarbeiter anzeigen" should also highlight "Mitarbeiter" in the sidebar navigation */}
              <button
                onClick={() => handleNavigate('mitarbeiter')} className="text-[#0F429F] text-[12px] font-normal hover:underline"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Alle Mitarbeiter anzeigen
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="px-4 md:px-6 lg:px-8 py-6">
            <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1fr) minmax(230px,1.8fr)', minWidth: '850px' }}>
                {['Personalnummer','Name','Abteilung','Status','Budget','Aktionen'].map(h => (
                  <div key={h} className="text-white font-bold text-xs uppercase tracking-wide" style={{ background: '#273A5F', height: '48px', display: 'flex', alignItems: 'center', padding: '0 24px' }}>{h}</div>
                ))}
                {employees.map((employee, index) => {
                  const bg = index % 2 === 0 ? '#fff' : '#F9FAFB';
                  const c: React.CSSProperties = { background: bg, borderBottom: '1px solid #E5E7EB', height: '56px', display: 'flex', alignItems: 'center', padding: '0 24px' };
                  return (
                    <React.Fragment key={employee.id}>
                      <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{employee.nr}</div>
                      <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{employee.name}</div>
                      <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{employee.abteilung}</div>
                      <div style={c}><StatusBadge status={employee.status} type={employee.status === 'Aktiv' ? 'success' : 'inactive'} /></div>
                      <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{employee.budget}</div>
                      <div style={{ ...c, gap: '8px', flexShrink: 0 }}>
                        <button onClick={(e) => { e.stopPropagation(); handleEmployeeDetails(employee.id); }} className="bg-[#0F429F] text-white px-3 h-8 rounded-full text-sm hover:bg-[#0d3680] transition-colors flex items-center gap-1 whitespace-nowrap">
                          <Eye size={14} />Details
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleEmployeeEdit(employee.id); }} className="bg-[#246AFF] text-white px-3 h-8 rounded-full text-sm hover:bg-[#1a56e0] transition-colors flex items-center gap-1 whitespace-nowrap">
                          <Edit2 size={14} />Bearbeiten
                        </button>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="px-6 pb-6 flex justify-end">
            <div className="text-[#6B7280] text-xs">Seite 1 von 21</div>
          </div>
        </div>

        {/* SECTION 4: Berichte-Liste */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl">
          {/* Header */}
          <div className="px-6 py-6 border-b border-[#E0E0E0]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[#273A5F] font-bold text-[16px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Berichte
                </h2>
              </div>
              <button
                onClick={() => handleNavigate('reports')} className="text-[#0F429F] text-[12px] font-normal hover:underline"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Alle Berichte anzeigen
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="px-4 md:px-6 lg:px-8 py-6">
            <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.7fr) minmax(0,0.7fr) minmax(0,1.5fr) minmax(0,0.6fr) minmax(0,0.7fr) minmax(0,1.2fr) minmax(210px,1.5fr)', minWidth: '900px' }}>
                {['Datum','Monat','Erstellungsdatum','Version','Dateityp','Dateiname','Aktionen'].map(h => (
                  <div key={h} className="text-white font-bold text-xs uppercase tracking-wide" style={{ background: '#273A5F', height: '48px', display: 'flex', alignItems: 'center', padding: '0 24px' }}>{h}</div>
                ))}
                {reports.map((report, index) => {
                  const bg = index % 2 === 0 ? '#fff' : '#F9FAFB';
                  const c: React.CSSProperties = { background: bg, borderBottom: '1px solid #E5E7EB', height: '56px', display: 'flex', alignItems: 'center', padding: '0 24px' };
                  return (
                    <React.Fragment key={report.id}>
                      <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{report.date}</div>
                      <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{report.month}</div>
                      <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{report.createdDate}</div>
                      <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{report.version}</div>
                      <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000]">{report.fileType}</div>
                      <div style={{ ...c, overflow: 'hidden' }} className="text-sm text-[#000000] truncate" title={report.fileName}>{report.fileName}</div>
                      <div style={{ ...c, gap: '8px', flexShrink: 0 }}>
                        <button className="bg-[#0F429F] text-white px-3 h-8 rounded-full text-sm hover:bg-[#0d3680] transition-colors flex items-center gap-1 whitespace-nowrap"><Eye size={14} />Ansehen</button>
                        <button className="bg-[#246AFF] text-white px-3 h-8 rounded-full text-sm hover:bg-[#1a56e0] transition-colors flex items-center gap-1 whitespace-nowrap"><Download size={14} />Download</button>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="px-6 py-6 flex justify-end border-t border-[#E0E0E0]">
            <div className="text-[#6B7280] text-xs">Seite 1 von 5</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
