import { Users, FileText, Download, Eye, Euro } from 'lucide-react';
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
  { id: '1', nr: 'MA-10234', name: 'Max Mustermann', abteilung: 'IT', status: 'aktiv' },
  { id: '2', nr: 'MA-10081', name: 'Sarah Weber', abteilung: 'Marketing', status: 'aktiv' },
  { id: '3', nr: 'MA-10977', name: 'Thomas Becker', abteilung: 'Finanzen', status: 'aktiv' },
  { id: '4', nr: 'MA-10542', name: 'Dr. Lisa-Marie Müller-Schmidt', abteilung: 'HR', status: 'aktiv' },
  { id: '5', nr: 'MA-11109', name: 'Michael Schmidt', abteilung: 'IT', status: 'aktiv' },
];

// Reports data with long filenames for testing ellipsis
const reports = [
  { id: '1', date: '01.04.', month: 'April', createdDate: '01.04.2026', version: 'v2.3', type: 'PDF', name: 'Riso_Report_Benefits_2026_April_Heddesheim.pdf' },
  { id: '2', date: '31.03.', month: 'März', createdDate: '31.03.2026', version: 'v2.2', type: 'Excel', name: 'Quartalsbericht_Q1_2026_Detailliert.xlsx' },
  { id: '3', date: '28.03.', month: 'März', createdDate: '28.03.2026', version: 'v2.1', type: 'PDF', name: 'Benefits_Übersicht_März_2026.pdf' },
  { id: '4', date: '28.02.', month: 'Februar', createdDate: '28.02.2026', version: 'v2.0', type: 'Excel', name: 'Mitarbeiter_Report_Februar_2026.xlsx' },
  { id: '5', date: '15.02.', month: 'Februar', createdDate: '15.02.2026', version: 'v1.9', type: 'PDF', name: 'Budget_Analyse_Q1_2026_Final.pdf' },
];

export function Dashboard() {
  const handleNavigate = (page: string) => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: page } }));
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
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#273A5F] font-bold text-[16px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Mitarbeiter
            </h2>
            <button
              onClick={() => handleNavigate('mitarbeiter')}
              className="text-[#0F429F] text-[12px] font-normal hover:underline"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Alle Mitarbeiter anzeigen
            </button>
          </div>

          <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-[#F0F4FF] grid grid-cols-[100px_1fr_120px_100px_80px] h-12 items-center px-4 border-b border-[#E0E0E0]">
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Pers.Nr.
              </div>
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Name
              </div>
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Abteilung
              </div>
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Status
              </div>
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Bearbeiten
              </div>
            </div>

            {/* Table Rows */}
            {employees.map((employee, index) => (
              <div
                key={employee.id}
                className={`grid grid-cols-[100px_1fr_120px_100px_80px] items-center px-4 h-10 border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#F0F4FF] transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                }`}
              >
                <div className="text-[#333333] text-[12px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {employee.nr}
                </div>
                <div
                  className="text-[#333333] text-[12px] truncate"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                  title={employee.name}
                >
                  {employee.name}
                </div>
                <div className="text-[#333333] text-[12px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {employee.abteilung}
                </div>
                <div>
                  <span className="inline-block px-2 py-1 rounded-xl text-[#4CAF50] bg-[#E8F5E9] text-[12px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    ● Aktiv
                  </span>
                </div>
                <div>
                  <button className="text-[#0F429F] text-[12px] hover:underline hover:text-[#246AFF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Bearbeiten
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              onClick={() => handleNavigate('mitarbeiter')}
              className="text-[#0F429F] text-[12px] hover:underline"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Alle Mitarbeiter anzeigen
            </button>
          </div>
        </div>

        {/* SECTION 4: Berichte-Liste */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#273A5F] font-bold text-[16px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Berichte
            </h2>
            <button
              onClick={() => handleNavigate('reports')}
              className="text-[#0F429F] text-[12px] font-normal hover:underline"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Alle Berichte anzeigen
            </button>
          </div>

          <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
            {/* Table Header - NO CHECKBOX */}
            <div className="bg-[#F0F4FF] grid grid-cols-[100px_80px_120px_80px_80px_200px_100px] h-12 items-center px-4 border-b border-[#E0E0E0]">
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Datum
              </div>
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Monat
              </div>
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Erstellungsdatum
              </div>
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Version
              </div>
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Dateityp
              </div>
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Dateiname
              </div>
              <div className="text-[#666666] text-[11px] font-normal uppercase" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Aktion
              </div>
            </div>

            {/* Table Rows */}
            {reports.map((report, index) => (
              <div
                key={report.id}
                className={`grid grid-cols-[100px_80px_120px_80px_80px_200px_100px] items-center px-4 h-10 border-b border-[#F0F0F0] last:border-b-0 hover:bg-[#F0F4FF] transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                }`}
              >
                <div className="text-[#333333] text-[12px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {report.date}
                </div>
                <div className="text-[#333333] text-[12px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {report.month}
                </div>
                <div className="text-[#333333] text-[12px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {report.createdDate}
                </div>
                <div className="text-[#333333] text-[12px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {report.version}
                </div>
                <div className="text-[#333333] text-[12px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {report.type}
                </div>
                <div
                  className="text-[#333333] text-[12px] truncate"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                  title={report.name}
                >
                  {report.name}
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-[#0F429F] text-[#0F429F] text-[12px] rounded-full hover:bg-[#F0F4FF] hover:opacity-90 transition flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Ansehen
                  </button>
                  <button className="px-3 py-1 bg-[#0F429F] text-white text-[12px] rounded-full hover:opacity-90 transition flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              onClick={() => handleNavigate('reports')}
              className="text-[#0F429F] text-[12px] hover:underline"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Alle Berichte anzeigen
            </button>
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
