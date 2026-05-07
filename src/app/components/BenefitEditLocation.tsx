import { useState } from 'react';
import { ArrowLeft, Info, Trash2, Calendar, Check } from 'lucide-react';
import { StatusBadge } from './Table';

type Employee = {
  id: string;
  nr: string;
  name: string;
  since: string;
};

type RemoveOption = 'immediately' | 'nextMonth' | 'customDate' | 'specificEmployees';

// TODO: Replace this mock data with a real API call.
// Endpoint: GET /api/v1/portal/benefits/{id} and GET /api/v1/portal/locations/{locationId}/employees
// See DEVELOPER_GUIDE.md Section 5 (Employee, Benefit) for the full response shape.
const mockEmployees: Employee[] = [
  { id: '1', nr: 'MA-2451', name: 'Max Mustermann', since: '01.01.2026' },
  { id: '2', nr: 'MA-2452', name: 'Anna Schmidt', since: '15.02.2026' },
  { id: '3', nr: 'MA-2453', name: 'Peter Meyer', since: '10.03.2026' },
  { id: '4', nr: 'MA-2454', name: 'Lisa Weber', since: '01.04.2026' },
];

export function BenefitEditLocation() {
  const [monthlyLimit, setMonthlyLimit] = useState('150');
  const [isActive, setIsActive] = useState(true);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removeOption, setRemoveOption] = useState<RemoveOption>('nextMonth');
  const [customDate, setCustomDate] = useState('');
  const [removeNote, setRemoveNote] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
  const [employeeToRemove, setEmployeeToRemove] = useState<Employee | null>(null);

  const handleBackToBenefits = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'locations' } }));
  };

  const handleRemoveEmployee = (employee: Employee) => {
    setEmployeeToRemove(employee);
    setShowRemoveModal(true);
    setSelectedEmployees(new Set([employee.id]));
  };

  const handleToggleEmployee = (employeeId: string) => {
    const newSet = new Set(selectedEmployees);
    if (newSet.has(employeeId)) {
      newSet.delete(employeeId);
    } else {
      newSet.add(employeeId);
    }
    setSelectedEmployees(newSet);
  };

  const handleConfirmRemove = () => {
    let message = '';

    if (removeOption === 'immediately') {
      message = `Mitarbeiter werden ab heute vom Benefit entfernt`;
    } else if (removeOption === 'nextMonth') {
      message = `Mitarbeiter werden ab 1. des nächsten Monats vom Benefit entfernt`;
    } else if (removeOption === 'customDate') {
      message = `Mitarbeiter werden ab ${customDate} vom Benefit entfernt. Anfrage wird zur Freigabe weitergeleitet.`;
    } else if (removeOption === 'specificEmployees') {
      message = `${selectedEmployees.size} ausgewählte Mitarbeiter werden entfernt`;
    }

    alert(message);
    setShowRemoveModal(false);
    setEmployeeToRemove(null);
    setSelectedEmployees(new Set());
    setCustomDate('');
    setRemoveNote('');
  };

  const handleSave = () => {
    alert(`Benefit gespeichert:\n- Budget: ${monthlyLimit}€\n- Status: ${isActive ? 'Aktiv' : 'Inaktiv'}`);
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E8E8E8] px-4 md:px-6 lg:px-8 py-6">
        <button
          onClick={handleBackToBenefits} className="text-[#246AFF] text-sm font-medium mb-4 hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zu Benefits
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-[#000000] font-bold text-[24px]">Benefit bearbeiten: Essenszuschuss</h1>
          <span className="px-3 py-1 bg-gray-100 text-[#666666] text-xs rounded-full">
            📍 Heddesheim
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Section 1: Benefit Info (Read-Only) */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6" style={{ borderRadius: '12px' }}>
          <div className="mb-4">
            <label className="text-[#999999] text-xs mb-1 block">Benefit-Name</label>
            <p className="text-[#666666] font-medium text-base">Essenszuschuss</p>
          </div>
          <div>
            <label className="text-[#999999] text-xs mb-1 block">Beschreibung</label>
            <p className="text-[#666666] text-sm">Gesetzliches Tagesmaximum: 7,67€/Tag</p>
          </div>
        </div>

        {/* Section 2: Monatliches Budget */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6" style={{ borderRadius: '12px' }}>
          <div className="flex items-start gap-3 p-4 mb-6 rounded-lg"
            style={{ backgroundColor: '#F0F4FF' }}
          >
            <Info className="w-5 h-5 text-[#0F429F] flex-shrink-0 mt-0.5" />
            <p className="text-[#0F429F] text-sm">
              Änderungen des Budgets gelten ab 1. des nächsten Monats
            </p>
          </div>

          <div>
            <label className="text-[#000000] font-medium text-sm mb-2 block">Monatliches Budget</label>
            <div className="relative">
              <input
                type="text"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(e.target.value.replace(/[^0-9]/g, ''))} className="w-full h-12 px-4 pr-12 border border-[#E0E0E0] rounded-lg text-sm focus:outline-none focus:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:ring-opacity-20"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#666666] text-sm">
                €
              </span>
            </div>
            <p className="text-[#666666] text-xs mt-2">
              Basierend auf Tagesmaximum 7,67€ (max. ~153€/Monat)
            </p>
          </div>
        </div>

        {/* Section 3: Status */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6" style={{ borderRadius: '12px' }}>
          <div className="flex items-start gap-3 p-4 mb-6 rounded-lg"
            style={{ backgroundColor: '#F0F4FF' }}
          >
            <Info className="w-5 h-5 text-[#0F429F] flex-shrink-0 mt-0.5" />
            <p className="text-[#0F429F] text-sm">
              Statusänderung gilt ab 1. des nächsten Monats
            </p>
          </div>

          <div>
            <label className="text-[#000000] font-medium text-sm mb-4 block">Status für diese Location</label>
            <div className="flex items-center gap-4 mb-3">
              <button
                onClick={() => setIsActive(!isActive)} className={`w-16 h-8 rounded-full transition relative ${
                  isActive ? 'bg-[#4CAF50]' : 'bg-[#9E9E9E]'
                }`}
              >
                <div className="w-7 h-7 bg-white rounded-full absolute top-0.5 transition-all"
                  style={{ left: isActive ? '34px' : '2px' }}
                ></div>
              </button>
              <StatusBadge status={isActive ? 'Aktiv' : 'Inaktiv'} type={isActive ? 'success' : 'inactive'} />
            </div>
            <p className="text-[#666666] text-xs">
              Inaktiv = Mitarbeiter können nicht einreichen
            </p>
          </div>
        </div>

        {/* Section 4: Mitarbeiter */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl p-6 mb-6" style={{ borderRadius: '12px' }}>
          <h3 className="text-[#000000] font-medium text-base mb-4">Mitarbeiter mit diesem Benefit</h3>

          <div className="border border-[#E8E8E8] rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-[#F0F4FF] grid grid-cols-[200px_1fr_150px_80px] h-12 items-center px-4">
              <div className="text-[#666666] text-xs font-medium uppercase">Personennummer</div>
              <div className="text-[#666666] text-xs font-medium uppercase">Name</div>
              <div className="text-[#666666] text-xs font-medium uppercase">Seit</div>
              <div className="text-[#666666] text-xs font-medium uppercase">Aktion</div>
            </div>

            {/* Table Rows */}
            {mockEmployees.map((employee, index) => (
              <div
                key={employee.id} className={`grid grid-cols-[200px_1fr_150px_80px] items-center px-4 border-b border-[#E8E8E8] last:border-b-0 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FB]'
                }`}
                style={{ minHeight: '52px' }}
              >
                <div className="text-[#666666] text-sm">{employee.nr}</div>
                <div className="text-[#000000] text-sm">{employee.name}</div>
                <div className="text-[#666666] text-sm">{employee.since}</div>
                <div>
                  <button
                    onClick={() => handleRemoveEmployee(employee)} className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                    title="Entfernen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave} className="px-8 py-3 bg-[#4CAF50] text-white font-medium rounded-full hover:bg-[#45a049] transition"
            style={{ borderRadius: '24px' }}
          >
            Speichern
          </button>
          <button
            onClick={handleBackToBenefits} className="px-8 py-3 border-2 border-[#E0E0E0] text-[#666666] font-medium rounded-full hover:bg-gray-50 transition"
            style={{ borderRadius: '24px' }}
          >
            Abbrechen
          </button>
        </div>
      </div>

      {/* Remove Employee Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{ borderRadius: '12px' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E8E8E8]">
              <h2 className="text-[#000000] font-bold text-xl">Mitarbeiter entfernen</h2>
              <button
                onClick={() => setShowRemoveModal(false)} className="text-[#666666] hover:text-[#000000] transition"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {employeeToRemove && (
                <p className="text-[#666666] text-sm mb-6">
                  Mitarbeiter: <strong>{employeeToRemove.name}</strong> ({employeeToRemove.nr})
                </p>
              )}

              <div className="space-y-4">
                {/* Option 1: Sofort */}
                <label className="flex items-start gap-3 p-4 border-2 border-[#E0E0E0] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition">
                  <input
                    type="radio"
                    name="removeOption"
                    checked={removeOption === 'immediately'}
                    onChange={() => setRemoveOption('immediately')} className="w-5 h-5 mt-0.5 text-[#0F429F] focus:ring-[#0F429F]"
                  />
                  <div className="flex-1">
                    <p className="text-[#000000] font-medium text-sm">Sofort deaktivieren</p>
                    <p className="text-[#666666] text-xs mt-1">Ab heute nicht mehr aktiv</p>
                  </div>
                </label>

                {/* Option 2: Ab 1. nächsten Monat */}
                <label className="flex items-start gap-3 p-4 border-2 border-[#E0E0E0] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition">
                  <input
                    type="radio"
                    name="removeOption"
                    checked={removeOption === 'nextMonth'}
                    onChange={() => setRemoveOption('nextMonth')} className="w-5 h-5 mt-0.5 text-[#0F429F] focus:ring-[#0F429F]"
                  />
                  <div className="flex-1">
                    <p className="text-[#000000] font-medium text-sm">Ab 1. nächsten Monat</p>
                    <p className="text-[#666666] text-xs mt-1">Deaktivierung zum 1. des nächsten Monats</p>
                  </div>
                </label>

                {/* Option 3: Custom Date */}
                <label className="flex items-start gap-3 p-4 border-2 border-[#E0E0E0] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition">
                  <input
                    type="radio"
                    name="removeOption"
                    checked={removeOption === 'customDate'}
                    onChange={() => setRemoveOption('customDate')} className="w-5 h-5 mt-0.5 text-[#0F429F] focus:ring-[#0F429F]"
                  />
                  <div className="flex-1">
                    <p className="text-[#000000] font-medium text-sm mb-3">Anderes Datum (Custom)</p>
                    {removeOption === 'customDate' && (
                      <div className="space-y-3 mt-3">
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#666666]" />
                          <input
                            type="date"
                            value={customDate}
                            onChange={(e) => setCustomDate(e.target.value)} className="w-full h-10 pl-10 pr-4 border border-[#E0E0E0] rounded-lg text-sm focus:outline-none focus:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:ring-opacity-20"
                          />
                        </div>
                        <textarea
                          placeholder="Grund/Notiz (optional)"
                          value={removeNote}
                          onChange={(e) => setRemoveNote(e.target.value)} className="w-full h-20 px-4 py-3 border border-[#E0E0E0] rounded-lg text-sm resize-none focus:outline-none focus:border-[#0F429F] focus:ring-2 focus:ring-[#0F429F] focus:ring-opacity-20"
                        />
                        <div className="flex items-start gap-2 p-3 bg-[#F0F4FF] rounded-lg">
                          <Info className="w-4 h-4 text-[#0F429F] flex-shrink-0 mt-0.5" />
                          <p className="text-[#0F429F] text-xs">
                            Wird an Riso-Admin weitergeleitet zur Freigabe
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Option 4: Specific Employees */}
                <label className="flex items-start gap-3 p-4 border-2 border-[#E0E0E0] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition">
                  <input
                    type="radio"
                    name="removeOption"
                    checked={removeOption === 'specificEmployees'}
                    onChange={() => setRemoveOption('specificEmployees')} className="w-5 h-5 mt-0.5 text-[#0F429F] focus:ring-[#0F429F]"
                  />
                  <div className="flex-1">
                    <p className="text-[#000000] font-medium text-sm mb-3">Für bestimmte Mitarbeiter</p>
                    <p className="text-[#666666] text-xs mb-3">Nur ausgewählte Mitarbeiter entfernen</p>
                    {removeOption === 'specificEmployees' && (
                      <div className="space-y-2 mt-3 max-h-48 overflow-y-auto">
                        {mockEmployees.map((employee) => (
                          <label
                            key={employee.id} className="flex items-center gap-3 p-3 hover:bg-white rounded cursor-pointer group"
                          >
                            <div className="relative flex items-center justify-center">
                              <input
                                type="checkbox"
                                checked={selectedEmployees.has(employee.id)}
                                onChange={() => handleToggleEmployee(employee.id)} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer group-hover:border-[#246AFF] transition-colors"
                              />
                              {selectedEmployees.has(employee.id) && (
                                <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                              )}
                            </div>
                            <span className="text-[#000000] text-sm">
                              {employee.nr} | {employee.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[#E8E8E8]">
              <button
                onClick={() => setShowRemoveModal(false)} className="px-6 py-3 border-2 border-[#E0E0E0] text-[#666666] font-medium rounded-full hover:bg-gray-50 transition"
                style={{ borderRadius: '24px' }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleConfirmRemove} className="px-6 py-3 bg-[#4CAF50] text-white font-medium rounded-full hover:bg-[#45a049] transition"
                style={{ borderRadius: '24px' }}
              >
                Bestätigen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
