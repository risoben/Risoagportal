import { useState } from 'react';
import { Check, Users, Settings, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { BenefitIconComponent } from './BenefitIconComponent';

type BenefitType = {
  id: string;
  name: string;
  description: string;
};

const benefitTypes: BenefitType[] = [
  { id: 'mittagessen', name: 'Mittagessen', description: 'Bis 100€/Monat' },
  { id: 'sachbezug', name: 'Sachbezug', description: 'Bis 50€/Monat' },
  { id: 'danke-bonus', name: 'Danke-Bonus', description: 'Cash Benefit - Variable Prämie' },
  { id: 'internet', name: 'Internet', description: 'Bis 50€/Monat' },
  { id: 'kindergarten', name: 'Kindergarten', description: 'Variable Zuschuss' },
  { id: 'geburtstag', name: 'Geburtstag', description: 'Einmaliger Gutschein' },
  { id: 'erholung', name: 'Erholung', description: 'Bis 156€/Jahr (jährliches Budget)' },
  { id: 'commuting', name: 'Fahrkostenzuschuss', description: 'Fahrtkostenzuschuss' },
  { id: 'oepnv', name: 'ÖPNV', description: 'Ticket-Zuschuss' },
  { id: 'bkv', name: 'BKV', description: 'Bis 80€/Monat' },
  { id: 'bav', name: 'BAV', description: 'Bis 150€/Monat' },
];

type Location = {
  id: string;
  name: string;
  employeeCount: number;
};

const locations: Location[] = [
  { id: 'muenchen', name: 'München', employeeCount: 45 },
  { id: 'berlin', name: 'Berlin', employeeCount: 32 },
  { id: 'heddesheim', name: 'Heddesheim', employeeCount: 28 },
  { id: 'viernheim', name: 'Viernheim', employeeCount: 18 },
];

type Employee = {
  id: string;
  name: string;
  employeeNo: string;
  monthlyLimit: string;
  selected: boolean;
  hasError: boolean;
};

type BenefitAddLocationProps = {
  onClose?: () => void;
  editMode?: boolean;
  benefitId?: string;
  initialData?: any;
};

export function BenefitAddLocation({ onClose, editMode = false, benefitId, initialData }: BenefitAddLocationProps) {
  // 5-step wizard: 1=choose benefit, 2=choose locations, 3=budget option, 3a/4=configure limits, 5=confirmation
  const [step, setStep] = useState(1);
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitType | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [limitOption, setLimitOption] = useState<'AllEmployees' | 'IndividualEmployees' | ''>('');
  const [hasLimitOptionError, setHasLimitOptionError] = useState(false);
  const [limits, setLimits] = useState<Record<string, string>>({});
  const [selectAll, setSelectAll] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'Max Mustermann', employeeNo: 'EMP-12345', monthlyLimit: '', selected: false, hasError: false },
    { id: '2', name: 'Erika Musterfrau', employeeNo: 'EMP-12346', monthlyLimit: '', selected: false, hasError: false },
    { id: '3', name: 'John Doe', employeeNo: 'EMP-12347', monthlyLimit: '', selected: false, hasError: false },
    { id: '4', name: 'Jane Smith', employeeNo: 'EMP-12348', monthlyLimit: '', selected: false, hasError: false },
    { id: '5', name: 'Hans Mueller', employeeNo: 'EMP-12349', monthlyLimit: '', selected: false, hasError: false },
  ]);

  const handleBenefitSelect = (benefit: BenefitType) => {
    setSelectedBenefit(benefit);
    setStep(2);
  };

  const handleToggleLocation = (locationId: string) => {
    const newSelected = new Set(selectedLocations);
    if (newSelected.has(locationId)) {
      newSelected.delete(locationId);
    } else {
      newSelected.add(locationId);
    }
    setSelectedLocations(newSelected);
  };

  const handleSelectAllLocations = () => {
    setSelectedLocations(new Set(locations.map(l => l.id)));
  };

  const handleNextToLimits = () => {
    if (selectedLocations.size === 0) {
      alert('Bitte wählen Sie mindestens einen Standort aus');
      return;
    }
    setStep(3);
  };

  const handleStep3Next = () => {
    if (!limitOption) {
      setHasLimitOptionError(true);
      return;
    }

    if (limitOption === 'AllEmployees') {
      // Show location limits input inline, then go to confirmation
      // We'll handle this in step 3 UI
      // Validate limits
      for (const locationId of Array.from(selectedLocations)) {
        const limit = limits[locationId];
        if (!limit || parseFloat(limit) <= 0) {
          alert('Bitte geben Sie für alle Standorte ein gültiges Budget ein');
          return;
        }
      }
      setStep(5); // Skip step 4, go directly to confirmation
    } else {
      // Go to employee individual limits
      setStep(4);
    }
  };

  const handleStep4Next = () => {
    const selectedEmployees = employees.filter((emp) => emp.selected);

    if (selectedEmployees.length === 0) {
      return;
    }

    const updatedEmployees = employees.map((emp) => {
      if (emp.selected && (!emp.monthlyLimit || parseFloat(emp.monthlyLimit) <= 0)) {
        return { ...emp, hasError: true };
      }
      return emp;
    });

    setEmployees(updatedEmployees);

    const allValid = selectedEmployees.every(
      (emp) => emp.monthlyLimit && parseFloat(emp.monthlyLimit) > 0
    );

    if (allValid) {
      setStep(5);
    }
  };

  const toggleEmployeeSelection = (id: string) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, selected: !emp.selected, hasError: false } : emp
      )
    );
  };

  const updateEmployeeLimit = (id: string, value: string) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, monthlyLimit: value, hasError: false } : emp
      )
    );
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setEmployees(
      employees.map((emp) => ({ ...emp, selected: newSelectAll, hasError: false }))
    );
  };

  const validateStep4 = () => {
    const selectedEmployees = employees.filter((emp) => emp.selected);
    if (selectedEmployees.length === 0) return false;

    const allHaveValidLimits = selectedEmployees.every(
      (emp) => emp.monthlyLimit && parseFloat(emp.monthlyLimit) > 0
    );

    return allHaveValidLimits;
  };

  const handleClose = () => {
    // Go back to benefits management
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));
  };

  const handleBack = () => {
    if (step === 1) {
      window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits-management' } }));
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="max-w-5xl mx-auto py-8 px-8">
        {/* Step 1: Choose Benefit */}
        {step === 1 && (
          <div className="bg-white rounded-lg border border-[#E0E0E0] p-8">
            <h1 className="text-[#273A5F] font-bold text-[20px] mb-6">SCHRITT 1: BENEFIT WÄHLEN</h1>

            <p className="text-[#666666] text-[14px] mb-6">Verfügbare Benefits:</p>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {benefitTypes.map((benefit) => (
                <button
                  key={benefit.id}
                  onClick={() => handleBenefitSelect(benefit)} className="bg-white border-2 border-[#E0E0E0] rounded-lg p-4 hover:border-[#0F429F] hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <div className="flex justify-center mb-2">
                    <BenefitIconComponent benefitName={benefit.name} size={48} />
                  </div>
                  <div className="text-[#273A5F] font-medium text-[13px] text-center mb-1">
                    {benefit.name}
                  </div>
                  <div className="text-[#666666] text-[11px] text-center">
                    {benefit.description}
                  </div>
                  <div className="mt-3 text-[#0F429F] text-[12px] text-center font-medium">
                    Wählen
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-4 border-t border-[#E0E0E0]">
              <button
                onClick={handleBack} className="px-6 py-2 border border-[#E0E0E0] text-[#666666] rounded-md hover:bg-[#F9FAFB] transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Locations */}
        {step === 2 && selectedBenefit && (
          <div className="bg-white rounded-lg border border-[#E0E0E0] p-8">
            <h1 className="text-[#273A5F] font-bold text-[20px] mb-2">SCHRITT 2: STANDORTE WÄHLEN</h1>
            <p className="text-[#666666] text-[14px] mb-6">
              Für welche Standorte soll {selectedBenefit.name} verfügbar sein?
            </p>

            <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-6 mb-6">
              <p className="text-[#273A5F] font-medium text-[14px] mb-4">Verfügbare Standorte:</p>
              <div className="space-y-3">
                {locations.map((location) => (
                  <label
                    key={location.id} className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded-md transition-colors group"
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedLocations.has(location.id)}
                        onChange={() => handleToggleLocation(location.id)} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer group-hover:border-[#246AFF] transition-colors"
                      />
                      {selectedLocations.has(location.id) && (
                        <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                      )}
                    </div>
                    <span className="text-[#273A5F] font-medium text-[14px]">
                      {location.name}
                    </span>
                    <span className="text-[#666666] text-[12px]">
                      ({location.employeeCount} Mitarbeiter)
                    </span>
                  </label>
                ))}
              </div>

              <button
                onClick={handleSelectAllLocations} className="mt-4 text-[#0F429F] text-[13px] font-medium hover:underline"
              >
                Alle wählen
              </button>
            </div>

            <div className="bg-[#F0F4FF] border border-[#E0E0E0] rounded-lg p-4 mb-6">
              <p className="text-[#666666] text-[12px]">
                <strong>Hinweis:</strong> Neue Benefits gelten ab 1. nächsten Monat für alle zugeordneten Mitarbeiter dieser Standorte.
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[#E0E0E0]">
              <button
                onClick={handleBack} className="px-6 py-2 border border-[#E0E0E0] text-[#666666] rounded-md hover:bg-[#F9FAFB] transition-colors"
              >
                Zurück
              </button>
              <button
                onClick={handleNextToLimits}
                disabled={selectedLocations.size === 0} className={`px-6 py-2 rounded-md transition-colors ${
                  selectedLocations.size === 0
                    ? 'bg-[#E0E0E0] text-[#999999] cursor-not-allowed'
                    : 'bg-[#0F429F] text-white hover:bg-[#246AFF]'
                }`}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Choose Budget Configuration Method */}
        {step === 3 && selectedBenefit && (
          <div className="bg-white rounded-lg border border-[#E0E0E0] p-8">
            <h1 className="text-[#273A5F] font-bold text-[20px] mb-2">SCHRITT 3 VON 5: LIMITS KONFIGURIEREN</h1>
            <p className="text-[#666666] text-[14px] mb-2">Benefit: <strong>{selectedBenefit.name}</strong></p>
            <p className="text-[#666666] text-[14px] mb-6">
              Für Standorte: <strong>{Array.from(selectedLocations).map(id => locations.find(l => l.id === id)?.name).join(', ')}</strong>
            </p>

            <p className="text-[#666666] text-[13px] mb-6">
              Wähle wie die Monatsbudgets für diese Standorte konfiguriert werden sollen.
            </p>

            {/* Option 1: All Employees */}
            <button
              onClick={() => {
                setLimitOption('AllEmployees');
                setHasLimitOptionError(false);
              }} className={`w-full p-4 border rounded-lg text-left transition-all flex items-start gap-4 mb-4 ${
                limitOption === 'AllEmployees'
                  ? 'border-[#2196F3] bg-[#E3F2FD]'
                  : 'border-[#E0E0E0] bg-white hover:bg-[#E3F2FD] hover:border-[#2196F3]'
              }`}
              style={{ borderRadius: '8px' }}
            >
              <div className="relative flex items-center justify-center w-6 h-6 mt-1">
                <input
                  type="radio"
                  name="limitOption"
                  checked={limitOption === 'AllEmployees'}
                  onChange={() => {
                    setLimitOption('AllEmployees');
                    setHasLimitOptionError(false);
                  }} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer hover:border-[#246AFF] transition-colors"
                />
                {limitOption === 'AllEmployees' && (
                  <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={24} className="text-[#2196F3]" />
                  <h3 className="text-[#273A5F] text-[14px] font-medium">
                    Für alle Mitarbeiter in den Standorten
                  </h3>
                </div>
                <p className="text-[#666666] text-[12px]">
                  Alle Mitarbeiter erhalten das gleiche monatliche Budget. Du kannst später noch einzelne Budgets setzen.
                </p>
              </div>
            </button>

            {/* Option 2: Individual Employees */}
            <button
              onClick={() => {
                setLimitOption('IndividualEmployees');
                setHasLimitOptionError(false);
              }} className={`w-full p-4 border rounded-lg text-left transition-all flex items-start gap-4 mb-4 ${
                limitOption === 'IndividualEmployees'
                  ? 'border-[#2196F3] bg-[#E3F2FD]'
                  : 'border-[#E0E0E0] bg-white hover:bg-[#E3F2FD] hover:border-[#2196F3]'
              }`}
              style={{ borderRadius: '8px' }}
            >
              <div className="relative flex items-center justify-center w-6 h-6 mt-1">
                <input
                  type="radio"
                  name="limitOption"
                  checked={limitOption === 'IndividualEmployees'}
                  onChange={() => {
                    setLimitOption('IndividualEmployees');
                    setHasLimitOptionError(false);
                  }} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer hover:border-[#246AFF] transition-colors"
                />
                {limitOption === 'IndividualEmployees' && (
                  <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Settings size={24} className="text-[#2196F3]" />
                  <h3 className="text-[#273A5F] text-[14px] font-medium">
                    Budgets für jeden Mitarbeiter einzeln verwalten
                  </h3>
                </div>
                <p className="text-[#666666] text-[12px]">
                  Definiere unterschiedliche Monatsbudgets für einzelne Mitarbeiter. Dies ermöglicht flexible Budgets je nach Bedarf.
                </p>
              </div>
            </button>

            {/* Error Message */}
            {hasLimitOptionError && (
              <div className="flex items-center gap-2 text-[#E74C3C] text-[12px] mb-4">
                <AlertCircle size={16} />
                <span>Bitte wähle eine Option aus, um fortzufahren.</span>
              </div>
            )}

            {/* If AllEmployees selected, show location limits input */}
            {limitOption === 'AllEmployees' && (
              <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-6 mb-6">
                <p className="text-[#273A5F] font-medium text-[14px] mb-4">Monatsbudget pro Standort:</p>
                <div className="space-y-4">
                  {Array.from(selectedLocations).map((locationId) => {
                    const location = locations.find(l => l.id === locationId);
                    return (
                      <div key={locationId} className="flex items-center gap-4">
                        <label className="w-32 text-[#273A5F] text-[14px] font-medium">
                          {location?.name}:
                        </label>
                        <input
                          type="number"
                          value={limits[locationId] || ''}
                          onChange={(e) => setLimits({ ...limits, [locationId]: e.target.value })}
                          placeholder="z.B. 100" className="flex-1 max-w-xs px-4 py-2 border border-[#E0E0E0] rounded-md text-[14px] focus:border-[#2196F3] focus:outline-none"
                        />
                        <span className="text-[#666666] text-[14px]">€ / Monat</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-[#E0E0E0]">
              <button
                onClick={() => setStep(2)} className="px-6 py-2 border border-[#E0E0E0] text-[#666666] rounded-md hover:bg-[#F9FAFB] transition-colors"
              >
                Zurück
              </button>
              <button
                onClick={handleStep3Next}
                disabled={!limitOption} className={`px-6 py-2 rounded-md transition-colors ${
                  limitOption
                    ? 'bg-[#4CAF50] text-white hover:bg-[#45a049]'
                    : 'bg-[#E0E0E0] text-[#999999] cursor-not-allowed'
                }`}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Employee Individual Limits */}
        {step === 4 && selectedBenefit && (
          <div className="bg-white rounded-lg border border-[#E0E0E0] p-8">
            <h1 className="text-[#273A5F] font-bold text-[20px] mb-2">SCHRITT 4 VON 5: MONATSBUDGETS FÜR MITARBEITER</h1>
            <p className="text-[#666666] text-[14px] mb-2">Benefit: <strong>{selectedBenefit.name}</strong></p>
            <p className="text-[#666666] text-[14px] mb-6">
              Für Standorte: <strong>{Array.from(selectedLocations).map(id => locations.find(l => l.id === id)?.name).join(', ')}</strong>
            </p>

            <p className="text-[#666666] text-[13px] mb-6">
              Wähle Mitarbeiter aus und lege ein Monatsbudget fest. Das Budget ist erforderlich für alle ausgewählten Mitarbeiter.
            </p>

            {/* Employee Table */}
            <div className="px-4 md:px-6 lg:px-8 py-6">
              <div className="border border-[#E5E7EB] rounded-lg overflow-x-auto">
                <div className="bg-[#273A5F] px-6 h-12" style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '60px 2fr 1fr 1fr', gap: '0', minWidth: '500px' }}>
                  <div className="flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer hover:border-[#246AFF] transition-colors"
                      />
                      {selectAll && (
                        <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                  <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Mitarbeiter</div>
                  <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Personennummer</div>
                  <div className="text-white font-bold text-xs uppercase tracking-wide overflow-hidden" style={{ minWidth: 0 }}>Monatsbudget</div>
                </div>

                {employees.map((employee, index) => (
                  <div
                    key={employee.id} className={`px-6 h-14 border-b border-[#E5E7EB] last:border-b-0 transition-colors hover:bg-gray-50 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'
                    } ${employee.hasError ? 'bg-[#FFEBEE]' : ''}`}
                    style={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '60px 2fr 1fr 1fr', gap: '0', minWidth: '500px' }}
                  >
                    <div className="flex items-center justify-center">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={employee.selected}
                          onChange={() => toggleEmployeeSelection(employee.id)} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded checked:bg-[#0F429F] cursor-pointer hover:border-[#246AFF] transition-colors"
                        />
                        {employee.selected && (
                          <Check size={12} className="absolute text-white pointer-events-none" strokeWidth={3} />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className="text-sm text-[#000000]">{employee.name}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-sm text-[#000000]">{employee.employeeNo}</span>
                    </div>

                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={employee.monthlyLimit}
                            onChange={(e) => updateEmployeeLimit(employee.id, e.target.value)}
                            disabled={!employee.selected}
                            placeholder="z.B. 500" className={`w-32 px-3 py-2 border rounded text-sm text-black focus:outline-none transition ${
                              employee.hasError
                                ? 'border-[#E74C3C] bg-[#FFEBEE] border-2'
                                : employee.selected
                                ? 'border-[#E0E0E0] focus:border-[#2196F3] focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)]'
                                : 'border-[#E0E0E0] bg-[#F5F5F5] cursor-not-allowed text-[#999999]'
                            }`}
                            style={{ borderRadius: '4px' }}
                          />
                          <span className="text-sm text-[#000000]">€</span>
                        </div>
                        {employee.hasError && (
                          <p className="text-[#E74C3C] text-[11px] mt-1">Monatsbudget erforderlich</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Validation Messages */}
            {(() => {
              const selectedCount = employees.filter((emp) => emp.selected).length;
              const employeesWithMissingLimits = employees.filter(
                (emp) => emp.selected && (!emp.monthlyLimit || parseFloat(emp.monthlyLimit) <= 0)
              );

              if (selectedCount === 0) {
                return (
                  <div className="flex items-center gap-2 text-[#FF9800] text-[12px] mb-4">
                    <AlertCircle size={16} />
                    <span>Bitte wähle mindestens einen Mitarbeiter aus.</span>
                  </div>
                );
              }

              if (employeesWithMissingLimits.length > 0) {
                const names = employeesWithMissingLimits.map((emp) => emp.name).join(', ');
                return (
                  <div className="flex items-center gap-2 text-[#E74C3C] text-[12px] mb-4">
                    <AlertCircle size={16} />
                    <span>Budgets erforderlich für: {names}</span>
                  </div>
                );
              }

              return (
                <div className="flex items-center gap-2 text-[#4CAF50] text-[12px] mb-4">
                  <CheckCircle size={16} />
                  <span>Alle Mitarbeiter konfiguriert ✓</span>
                </div>
              );
            })()}

            <div className="flex gap-3 pt-4 border-t border-[#E0E0E0]">
              <button
                onClick={() => setStep(3)} className="px-6 py-2 border border-[#E0E0E0] text-[#666666] rounded-md hover:bg-[#F9FAFB] transition-colors"
              >
                Zurück
              </button>
              <button
                onClick={handleStep4Next}
                disabled={!validateStep4()} className={`px-6 py-2 rounded-md transition-colors ${
                  validateStep4()
                    ? 'bg-[#4CAF50] text-white hover:bg-[#45a049]'
                    : 'bg-[#E0E0E0] text-[#999999] cursor-not-allowed'
                }`}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && selectedBenefit && (
          <div className="bg-white rounded-lg border border-[#E0E0E0] p-8">
            <div className="flex flex-col items-center text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-[32px]">✅</span>
              </div>

              <h1 className="text-[#273A5F] font-bold text-[24px] mb-4">Benefit hinzugefügt</h1>

              <div className="bg-[#F9FAFB] border border-[#E0E0E0] rounded-lg p-6 mb-6 text-left w-full max-w-md">
                <p className="text-[#333333] text-[14px] mb-4">
                  <strong>{selectedBenefit.name}</strong> wurde hinzugefügt für:
                </p>
                <ul className="space-y-2 mb-4">
                  {Array.from(selectedLocations).map((locationId) => {
                    const location = locations.find(l => l.id === locationId);
                    return (
                      <li key={locationId} className="text-[#333333] text-[14px] flex items-start">
                        <span className="mr-2">•</span>
                        <span>{location?.name}: <strong>{limits[locationId]}€ / Monat</strong></span>
                      </li>
                    );
                  })}
                </ul>
                <p className="text-[#666666] text-[13px] border-t border-[#E0E0E0] pt-4">
                  Gültig ab: <strong>1. Mai 2026</strong>
                </p>
              </div>

              <button
                onClick={handleClose} className="px-8 py-3 bg-[#0F429F] text-white text-[14px] font-medium rounded-full hover:bg-[#246AFF] transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
