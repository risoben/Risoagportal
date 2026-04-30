import { Users, FileText, Download, Eye, Euro, Edit2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { BenefitIconComponent } from './BenefitIconComponent';

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
      return `${(value / 1000000).toFixed(2)}.000.000€`;
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
        <div
          className="bg-white border border-[#E0E0E0] rounded-lg p-3 shadow-lg"
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
            Verbleibender Budget: <strong>{formatCurrency(verbleibend)}</strong>
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
      <div className="bg-white border-b border-[#E0E0E0] px-8 py-6">
        <h1 className="text-[#273A5F] font-bold text-[32px]">Übersicht</h1>
      </div>

      <div className="px-8 py-8">
        {/* SECTION 1: KPI Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Gesamtbudget */}
          <button
            onClick={() => handleNavigate('benefits')}
            className="bg-white border border-[#E0E0E0] rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center text-center"
            style={{ minHeight: '180px', minWidth: '300px' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center bg-[#F0F4FF] rounded-full shrink-0" style={{ width: '48px', height: '48px' }}>
                <Euro size={24} className="text-[#0F429F]" strokeWidth={2} />
              </div>
              <p className="text-[#666666] text-[14px] font-semibold" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Gesamtbudget
              </p>
            </div>
            <p className="text-[#273A5F] font-bold text-[32px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              1.250.000€
            </p>
          </button>

          {/* Registrierte Nutzer */}
          <button
            onClick={() => handleNavigate('mitarbeiter')}
            className="bg-white border border-[#E0E0E0] rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center text-center"
            style={{ minHeight: '180px', minWidth: '300px' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center bg-[#F0F4FF] rounded-full shrink-0" style={{ width: '48px', height: '48px' }}>
                <Users size={24} className="text-[#0F429F]" strokeWidth={2} />
              </div>
              <p className="text-[#666666] text-[14px] font-semibold" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Registrierte Nutzer
              </p>
            </div>
            <p className="text-[#273A5F] font-bold text-[32px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              87
            </p>
          </button>

          {/* Erstellte Berichte - Gesamtanzahl aller Berichte */}
          <button
            onClick={() => handleNavigate('reports')}
            className="bg-white border border-[#E0E0E0] rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center text-center"
            style={{ minHeight: '180px', minWidth: '300px' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center bg-[#F0F4FF] rounded-full shrink-0" style={{ width: '48px', height: '48px' }}>
                <FileText size={24} className="text-[#0F429F]" strokeWidth={2} />
              </div>
              <p className="text-[#666666] text-[14px] font-semibold" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Erstellte Berichte
              </p>
            </div>
            <p className="text-[#273A5F] font-bold text-[32px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              24
            </p>
          </button>
        </div>

        {/* SECTION 2: Budget Chart */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-8">
          <h2 className="text-[#273A5F] font-bold text-[16px] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Gesamtbudget und Nutzung (pro Monat)
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
              <button
                onClick={() => handleNavigate('mitarbeiter')}
                className="text-[#0F429F] text-[12px] font-normal hover:underline"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Alle Mitarbeiter anzeigen
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="px-6 py-6">
            <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
              {/* Table Header */}
              <div
                className="bg-[#273A5F] flex items-center px-6 h-12"
                style={{ display: 'grid', gridTemplateColumns: '100px 1.5fr 1fr 80px 100px auto', gap: '0' }}
              >
                <div className="text-white font-bold text-xs uppercase tracking-wide">Personalnummer</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Name</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Abteilung</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Status</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Budget</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Aktionen</div>
              </div>

              {/* Table Rows */}
              {employees.map((employee, index) => (
                <div
                  key={employee.id}
                  className={`
                    flex items-center px-6 h-14 border-b border-[#E5E7EB] last:border-b-0
                    transition-colors hover:bg-gray-50
                    ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}
                  `}
                  style={{ display: 'grid', gridTemplateColumns: '100px 1.5fr 1fr 80px 100px auto', gap: '0' }}
                >
                  <div className="text-[#000000] text-sm">{employee.nr}</div>
                  <div className="text-[#000000] text-sm">{employee.name}</div>
                  <div className="text-[#000000] text-sm">{employee.abteilung}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    <span className="text-[#000000] text-sm">{employee.status}</span>
                  </div>
                  <div className="text-[#000000] text-sm">{employee.budget}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEmployeeDetails(employee.id);
                      }}
                      className="bg-[#0F429F] text-white px-4 h-10 rounded-full font-medium text-sm hover:bg-[#0d3680] transition-colors flex items-center gap-2"
                      style={{ borderRadius: '32px' }}
                    >
                      <Eye size={16} />
                      Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEmployeeEdit(employee.id);
                      }}
                      className="bg-[#246AFF] text-white px-4 h-10 rounded-full font-medium text-sm hover:bg-[#1a56e0] transition-colors flex items-center gap-2"
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
                onClick={() => handleNavigate('reports')}
                className="text-[#0F429F] text-[12px] font-normal hover:underline"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Alle Berichte anzeigen
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="px-6 py-6">
            <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
              {/* Table Header */}
              <div
                className="bg-[#273A5F] flex items-center px-6 h-12"
                style={{ display: 'grid', gridTemplateColumns: '80px 100px 1fr 90px 100px 1.5fr auto', gap: '0' }}
              >
                <div className="text-white font-bold text-xs uppercase tracking-wide">Datum</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Monat</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Erstellungsdatum</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Version</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Dateityp</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Dateiname</div>
                <div className="text-white font-bold text-xs uppercase tracking-wide">Aktion</div>
              </div>

              {/* Table Rows */}
              {reports.map((report, index) => (
                <div
                  key={report.id}
                  className={`
                    flex items-center px-6 h-14 border-b border-[#E5E7EB] last:border-b-0
                    transition-colors hover:bg-gray-50
                    ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}
                  `}
                  style={{ display: 'grid', gridTemplateColumns: '80px 100px 1fr 90px 100px 1.5fr auto', gap: '0' }}
                >
                  <div className="text-[#000000] text-sm">{report.date}</div>
                  <div className="text-[#000000] text-sm">{report.month}</div>
                  <div className="text-[#000000] text-sm">{report.createdDate}</div>
                  <div className="text-[#000000] text-sm">{report.version}</div>
                  <div className="text-[#000000] text-sm">{report.fileType}</div>
                  <div className="text-[#000000] text-sm truncate" title={report.fileName}>
                    {report.fileName}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-[#0F429F] text-white px-4 h-10 rounded-full font-medium text-sm hover:bg-[#0d3680] transition-colors flex items-center gap-2"
                      style={{ borderRadius: '32px' }}
                    >
                      <Eye size={16} />
                      Ansehen
                    </button>
                    <button
                      className="bg-[#246AFF] text-white px-4 h-10 rounded-full font-medium text-sm hover:bg-[#1a56e0] transition-colors flex items-center gap-2"
                      style={{ borderRadius: '32px' }}
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
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
