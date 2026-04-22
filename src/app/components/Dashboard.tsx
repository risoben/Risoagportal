import { Search, HelpCircle, User, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Sample data for the budget chart
const budgetData = [
  { id: 1, month: 'Jan', amount: 95000 },
  { id: 2, month: 'Feb', amount: 102000 },
  { id: 3, month: 'Mär', amount: 98000 },
  { id: 4, month: 'Apr', amount: 110000 },
  { id: 5, month: 'Mai', amount: 105000 },
  { id: 6, month: 'Jun', amount: 115000 },
  { id: 7, month: 'Jul', amount: 108000 },
  { id: 8, month: 'Aug', amount: 95000 },
  { id: 9, month: 'Sep', amount: 120000 },
  { id: 10, month: 'Okt', amount: 112000 },
  { id: 11, month: 'Nov', amount: 118000 },
  { id: 12, month: 'Dez', amount: 125000 },
];

// Sample employee data
const employees = [
  {
    name: 'Max Mustermann',
    nr: '001234',
    abteilung: 'IT',
    status: 'aktiv',
    budget: '€45.000',
  },
  {
    name: 'Sarah Weber',
    nr: '001235',
    abteilung: 'Marketing',
    status: 'aktiv',
    budget: '€38.000',
  },
  {
    name: 'Thomas Becker',
    nr: '001236',
    abteilung: 'Finanzen',
    status: 'aktiv',
    budget: '€52.000',
  },
];

// Sample reports data
const reports = [
  { name: 'Monatsbericht März 2026', date: '15.03.2026' },
  { name: 'Quartalsbericht Q1 2026', date: '31.03.2026' },
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 pt-6 pb-8">
        <h1 className="text-[#273A5F] font-bold text-2xl">
          Welcome, Anna Schmidt! 👋
        </h1>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-6 h-6 text-[#6B7280]" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <HelpCircle className="w-6 h-6 text-[#6B7280]" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#0F429F] flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div className="px-6 pb-10">
        <div className="flex gap-8">
          {/* Card 1 */}
          <div
            className="bg-white border border-[#E5E7EB] rounded-lg p-6"
            style={{
              width: '300px',
              height: '120px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="text-[#0F429F] font-bold text-xl mb-2">€1.200.000</div>
            <div className="text-[#6B7280] text-xs">Gesamt Budget</div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white border border-[#E5E7EB] rounded-lg p-6"
            style={{
              width: '300px',
              height: '120px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="text-[#0F429F] font-bold text-xl mb-2">1.024 aktiv</div>
            <div className="text-[#6B7280] text-xs">36 inaktiv</div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white border border-[#E5E7EB] rounded-lg p-6"
            style={{
              width: '300px',
              height: '120px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="text-[#0F429F] font-bold text-xl mb-2">28 Reports</div>
            <div className="text-[#6B7280] text-xs">bereit</div>
          </div>
        </div>
      </div>

      {/* Budget Chart Section */}
      <div className="px-6 pb-10">
        <div className="bg-[#F9FAFB] rounded-lg p-6">
          <h2 className="text-[#273A5F] font-bold text-base mb-4">
            Dein Budget (letzte 12 Monate)
          </h2>
          <div style={{ width: '100%', overflow: 'auto' }}>
            <BarChart
              width={1000}
              height={240}
              data={budgetData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F429F" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0F429F" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={(value) => `€${value / 1000}k`}
                tickLine={false}
              />
              <Bar
                dataKey="amount"
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
                maxBarSize={60}
              />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Employee Table Section */}
      <div className="px-6 pb-10">
        <h2 className="text-[#273A5F] font-bold text-base mb-4">Deine Mitarbeiter</h2>
        <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#273A5F] grid grid-cols-5 h-14 items-center px-6">
            <div className="text-white font-bold text-sm">Name</div>
            <div className="text-white font-bold text-sm">Nr.</div>
            <div className="text-white font-bold text-sm">Abteilung</div>
            <div className="text-white font-bold text-sm">Status</div>
            <div className="text-white font-bold text-sm">Budget</div>
          </div>

          {/* Table Rows */}
          {employees.map((employee, index) => (
            <div
              key={employee.nr}
              className={`grid grid-cols-5 h-14 items-center px-6 ${
                index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'
              }`}
            >
              <div className="text-[#273A5F] text-sm">{employee.name}</div>
              <div className="text-[#6B7280] text-sm">{employee.nr}</div>
              <div className="text-[#6B7280] text-sm">{employee.abteilung}</div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✅</span>
                <span className="text-[#6B7280] text-sm">{employee.status}</span>
              </div>
              <div className="text-[#6B7280] text-sm">{employee.budget}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reports Section */}
      <div className="px-6 pb-10">
        <h2 className="text-[#273A5F] font-bold text-base mb-4">Deine Berichte</h2>
        <div className="bg-[#F9FAFB] rounded-lg p-6">
          {reports.map((report) => (
            <div
              key={report.name}
              className="flex items-center justify-between py-4 border-b border-[#E5E7EB] last:border-b-0"
            >
              <div>
                <div className="text-[#273A5F] font-medium text-sm">{report.name}</div>
                <div className="text-[#6B7280] text-xs mt-1">{report.date}</div>
              </div>
              <button className="bg-[#0F429F] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#0d3680] transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}