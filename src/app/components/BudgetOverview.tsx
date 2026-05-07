import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Budget breakdown data
const budgetBreakdown = [
  { name: 'Essenszuschuss', amount: 5000, percentage: 70, color: '#0F429F' },
  { name: 'Mobilität', amount: 3000, percentage: 40, color: '#0F429F' },
  { name: 'Urban Sports Club', amount: 2000, percentage: 60, color: '#0F429F' },
];

export function BudgetOverview() {
  const [selectedBenefit, setSelectedBenefit] = useState('Alle');
  const [selectedMA, setSelectedMA] = useState('Alle');
  const [selectedDate, setSelectedDate] = useState('Juni 2024');
  const [isBreakdownExpanded, setIsBreakdownExpanded] = useState(true);

  // Budget data
  const totalBudget = 10000;
  const usedBudget = 7000;
  const freeBudget = 3000;
  const percentage = 70;

  // Determine status color based on percentage
  const getStatusColor = (pct: number) => {
    if (pct > 90) return '#EF4444'; // Red
    if (pct >= 65) return '#F59E0B'; // Orange
    return '#10B981'; // Green
  };

  const statusColor = getStatusColor(percentage);

  // Data for donut chart
  const chartData = [
    { name: 'Used', value: percentage },
    { name: 'Free', value: 100 - percentage },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Filter Bar */}
      <div className="bg-[#F9FAFB] px-6 py-3 flex items-center gap-6">
        {/* Benefit Filter */}
        <div className="relative">
          <button className="bg-white border-2 border-[#0F429F] rounded-lg px-4 h-10 flex items-center gap-2"
            style={{ width: '200px' }}
          >
            <span className="text-[#273A5F] text-sm flex-1 text-left">
              Benefit: {selectedBenefit}
            </span>
            <ChevronDown className="w-4 h-4 text-[#0F429F]" />
          </button>
        </div>

        {/* MA Filter */}
        <div className="relative">
          <button className="bg-white border-2 border-[#0F429F] rounded-lg px-4 h-10 flex items-center gap-2"
            style={{ width: '200px' }}
          >
            <span className="text-[#273A5F] text-sm flex-1 text-left">
              MA: {selectedMA}
            </span>
            <ChevronDown className="w-4 h-4 text-[#0F429F]" />
          </button>
        </div>

        {/* Date Filter */}
        <div className="relative">
          <div className="bg-white border-2 border-[#0F429F] rounded-lg px-4 h-10 flex items-center gap-2"
            style={{ width: '250px' }}
          >
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-4 h-4 text-[#0F429F]" />
            </button>
            <span className="text-[#273A5F] text-sm flex-1 text-center">
              Datum: {selectedDate}
            </span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight className="w-4 h-4 text-[#0F429F]" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="pt-8 pb-8" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="grid grid-cols-3 gap-6 px-6" style={{ maxWidth: '1200px' }}>
          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <p className="text-[#666666] text-[16px] font-bold mb-3">Gesamtbudget</p>
            <p className="text-[#273A5F] font-bold text-[32px]">€{totalBudget.toLocaleString('de-DE')}</p>
          </div>

          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <p className="text-[#666666] text-[16px] font-bold mb-3">Genutzt</p>
            <p className="text-[#4CAF50] font-bold text-[32px]">€{usedBudget.toLocaleString('de-DE')}</p>
          </div>

          <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <p className="text-[#666666] text-[16px] font-bold mb-3">Verfügbar</p>
            <p className="text-[#FF9800] font-bold text-[32px]">€{freeBudget.toLocaleString('de-DE')}</p>
          </div>
        </div>
      </div>

      {/* Donut Chart Section */}
      <div className="pt-8 pb-8">
        <div className="flex justify-center items-center">
          <div style={{ width: '300px', height: '300px', minHeight: '300px', minWidth: 0, position: 'relative' }}>
            <ResponsiveContainer width={300} height={300} minWidth={0} minHeight={0}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={130}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  <Cell fill={statusColor} />
                  <Cell fill="#E5E7EB" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Percentage */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="text-[#273A5F] font-bold text-6xl">{percentage}%</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="text-center mt-8">
          <p className="text-[#273A5F] text-base">
            €{totalBudget.toLocaleString('de-DE')} Total | €{usedBudget.toLocaleString('de-DE')} Genutzt | €
            {freeBudget.toLocaleString('de-DE')} Frei
          </p>
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="px-6 pb-10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setIsBreakdownExpanded(!isBreakdownExpanded)} className="w-full bg-[#F9FAFB] rounded-t-lg px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <h2 className="text-[#273A5F] font-bold text-base">Aufteilung nach Benefit</h2>
            {isBreakdownExpanded ? (
              <ChevronUp className="w-5 h-5 text-[#273A5F]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#273A5F]" />
            )}
          </button>

          {isBreakdownExpanded && (
            <div className="bg-[#F9FAFB] rounded-b-lg px-6 py-6 space-y-6">
              {budgetBreakdown.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#273A5F] text-sm">{item.name}</span>
                    <span className="text-[#273A5F] text-sm font-medium">
                      €{item.amount.toLocaleString('de-DE')} ({item.percentage}%)
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-[#0F429F] rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
