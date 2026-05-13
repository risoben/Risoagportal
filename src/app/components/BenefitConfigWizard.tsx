import { useState } from 'react';
import { Users, Settings, AlertCircle, CheckCircle, ArrowLeft, Check } from 'lucide-react';

type Employee = {
  id: string;
  name: string;
  employeeNo: string;
  monthlyLimit: string;
  selected: boolean;
  hasError: boolean;
};

type BenefitConfigWizardProps = {
  benefitName?: string;
  locationName?: string;
  benefitIcon?: string;
};

export function BenefitConfigWizard({
  benefitName = 'Internet',
  locationName = 'München',
  benefitIcon = '📡',
}: BenefitConfigWizardProps) {
  const [currentStep, setCurrentStep] = useState<'step3' | 'step4'>('step3');
  const [selectedOption, setSelectedOption] = useState<'AllEmployees' | 'IndividualEmployees' | ''>('');
  const [hasError, setHasError] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([
    { id: '1', name: 'Max Mustermann', employeeNo: 'EMP-12345', monthlyLimit: '', selected: false, hasError: false },
    { id: '2', name: 'Erika Musterfrau', employeeNo: 'EMP-12346', monthlyLimit: '', selected: false, hasError: false },
    { id: '3', name: 'John Doe', employeeNo: 'EMP-12347', monthlyLimit: '', selected: false, hasError: false },
    { id: '4', name: 'Jane Smith', employeeNo: 'EMP-12348', monthlyLimit: '', selected: false, hasError: false },
    { id: '5', name: 'Hans Mueller', employeeNo: 'EMP-12349', monthlyLimit: '', selected: false, hasError: false },
  ]);

  const handleOptionSelect = (option: 'AllEmployees' | 'IndividualEmployees') => {
    setSelectedOption(option);
    setHasError(false);
  };

  const handleStep3Next = () => {
    if (!selectedOption) {
      setHasError(true);
      return;
    }

    if (selectedOption === 'IndividualEmployees') {
      setCurrentStep('step4');
    } else {
      alert(`Alle Mitarbeiter in ${locationName} erhalten das gleiche Budget für ${benefitName}.`);
      handleBack();
    }
  };

  const handleStep3Back = () => {
    handleBack();
  };

  const handleStep4Back = () => {
    setCurrentStep('step3');
  };

  const handleBack = () => {
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'benefits' } }));
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

    if (validateStep4()) {
      alert('Alle Mitarbeiter erfolgreich konfiguriert!');
      handleBack();
    }
  };

  const selectedCount = employees.filter((emp) => emp.selected).length;
  const employeesWithMissingLimits = employees.filter(
    (emp) => emp.selected && (!emp.monthlyLimit || parseFloat(emp.monthlyLimit) <= 0)
  );

  const getValidationMessage = () => {
    if (selectedCount === 0) {
      return {
        type: 'warning',
        text: 'Bitte wähle mindestens einen Mitarbeiter aus.',
      };
    }

    if (employeesWithMissingLimits.length > 0) {
      const names = employeesWithMissingLimits.map((emp) => emp.name).join(', ');
      return {
        type: 'error',
        text: `Budgets erforderlich für: ${names}`,
      };
    }

    return {
      type: 'success',
      text: 'Alle Mitarbeiter konfiguriert ✓',
    };
  };

  const validationMessage = currentStep === 'step4' ? getValidationMessage() : null;

  return (
    <div className="flex-1 bg-[#F9FAFB] overflow-auto" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white px-8 py-6 border-b border-[#E0E0E0]">
        <button
          onClick={handleBack} className="text-[#0F429F] text-[13px] mb-4 hover:underline flex items-center gap-2"
        >
          ← Zurück zur Übersicht
        </button>
        <div className="flex items-center gap-3">
          <span className="text-[32px]">{benefitIcon}</span>
          <div>
            <h1 className="text-[#273A5F] text-[18px]">
              {currentStep === 'step3'
                ? 'Schritt 3 von 4: Budgets konfigurieren'
                : 'Schritt 4 von 4: Monatsbudgets für Mitarbeiter'}
            </h1>
            <p className="text-[#666666] text-[14px]">
              {benefitName} – {locationName}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full p-8">
        {/* STEP 3: Budget Configuration */}
        {currentStep === 'step3' && (
          <div className="space-y-6">
            <p className="text-[#666666] text-[13px]">
              Wähle wie die Monatsbudgets für diesen Standort konfiguriert werden sollen.
            </p>

            {/* Option 1: All Employees */}
            <button
              onClick={() => handleOptionSelect('AllEmployees')} className={`w-full p-4 border rounded-lg text-left transition-all flex items-start gap-4 ${
                selectedOption === 'AllEmployees'
                  ? 'border-[#2196F3] bg-[#E3F2FD]'
                  : 'border-[#E0E0E0] bg-white hover:bg-[#E3F2FD] hover:border-[#2196F3]'
              }`}
              style={{ borderRadius: '8px' }}
            >
              <div className="relative flex items-center justify-center w-6 h-6 mt-1">
                <input
                  type="radio"
                  name="limitOption"
                  checked={selectedOption === 'AllEmployees'}
                  onChange={() => handleOptionSelect('AllEmployees')} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer hover:border-[#246AFF] transition-colors"
                />
                {selectedOption === 'AllEmployees' && (
                  <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={24} className="text-[#2196F3]" />
                  <h3 className="text-[#273A5F] text-[14px]">
                    Für alle Mitarbeiter in dieser Location
                  </h3>
                </div>
                <p className="text-[#666666] text-[12px]">
                  Alle Mitarbeiter erhalten das gleiche monatliche Budget. Du kannst später noch einzelne Budgets setzen.
                </p>
              </div>
            </button>

            {/* Option 2: Individual Employees */}
            <button
              onClick={() => handleOptionSelect('IndividualEmployees')} className={`w-full p-4 border rounded-lg text-left transition-all flex items-start gap-4 ${
                selectedOption === 'IndividualEmployees'
                  ? 'border-[#2196F3] bg-[#E3F2FD]'
                  : 'border-[#E0E0E0] bg-white hover:bg-[#E3F2FD] hover:border-[#2196F3]'
              }`}
              style={{ borderRadius: '8px' }}
            >
              <div className="relative flex items-center justify-center w-6 h-6 mt-1">
                <input
                  type="radio"
                  name="limitOption"
                  checked={selectedOption === 'IndividualEmployees'}
                  onChange={() => handleOptionSelect('IndividualEmployees')} className="appearance-none w-[18px] h-[18px] border-2 border-[#0F429F] rounded-full cursor-pointer hover:border-[#246AFF] transition-colors"
                />
                {selectedOption === 'IndividualEmployees' && (
                  <div className="absolute w-2 h-2 bg-[#0F429F] rounded-full pointer-events-none"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Settings size={24} className="text-[#2196F3]" />
                  <h3 className="text-[#273A5F] text-[14px]">
                    Budgets für jeden Mitarbeiter einzeln verwalten
                  </h3>
                </div>
                <p className="text-[#666666] text-[12px]">
                  Definiere unterschiedliche Monatsbudgets für einzelne Mitarbeiter. Dies ermöglicht flexible Budgets je nach Bedarf.
                </p>
              </div>
            </button>

            {/* Error Message */}
            {hasError && (
              <div className="flex items-center gap-2 text-[#E74C3C] text-[12px]">
                <AlertCircle size={16} />
                <span>Bitte wähle eine Option aus, um fortzufahren.</span>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleStep3Back} className="px-6 py-3 border border-[#E0E0E0] text-[#666666] text-[14px] rounded hover:bg-[#F5F5F5] transition"
                style={{ borderRadius: '4px' }}
              >
                Zurück
              </button>
              <button
                onClick={handleStep3Next}
                disabled={!selectedOption} className={`px-6 py-3 text-white text-[14px] rounded transition ${
                  selectedOption
                    ? 'bg-[#4CAF50] hover:bg-[#45A049]'
                    : 'bg-[#CCCCCC] cursor-not-allowed'
                }`}
                style={{ borderRadius: '4px' }}
              >
                Weiter
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Employee Individual Limits */}
        {currentStep === 'step4' && (
          <div className="space-y-6">
            <p className="text-[#666666] text-[13px]">
              Wähle Mitarbeiter aus und lege ein Monatsbudget fest. Das Limit ist erforderlich für alle ausgewählten Mitarbeiter.
            </p>

            {/* Employee Table */}
            <div className="bg-white rounded border border-[#E0E0E0] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F5F5F5] border-b border-[#E0E0E0]">
                    <th className="px-4 py-3 text-left">
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
                    </th>
                    <th className="px-4 py-3 text-left text-[#666666] text-[13px]">Mitarbeiter</th>
                    <th className="px-4 py-3 text-left text-[#666666] text-[13px]">Personennummer</th>
                    <th className="px-4 py-3 text-left text-[#666666] text-[13px]">Monatsbudget</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr
                      key={employee.id} className={`border-b border-[#E0E0E0] hover:bg-[#E3F2FD] transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                      } ${employee.hasError ? 'bg-[#FFEBEE]' : ''}`}
                      style={{ height: '56px' }}
                    >
                      <td className="px-4">
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
                      </td>
                      <td className="px-4 text-[13px] text-black">{employee.name}</td>
                      <td className="px-4 text-[13px] text-[#666666]">{employee.employeeNo}</td>
                      <td className="px-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={employee.monthlyLimit}
                              onChange={(e) => updateEmployeeLimit(employee.id, e.target.value)}
                              disabled={!employee.selected}
                              placeholder="z.B. 500" className={`w-32 px-3 py-2 border rounded text-[13px] text-black focus:outline-none transition ${
                                employee.hasError
                                  ? 'border-[#E74C3C] bg-[#FFEBEE] border-2'
                                  : employee.selected
                                  ? 'border-[#E0E0E0] focus:border-[#2196F3] focus:shadow-[0_0_0_3px_rgba(33,150,243,0.1)]'
                                  : 'border-[#E0E0E0] bg-[#F5F5F5] cursor-not-allowed text-[#999999]'
                              }`}
                              style={{ borderRadius: '4px' }}
                            />
                            <span className="text-[13px] text-[#666666]">€</span>
                          </div>
                          {employee.hasError && (
                            <p className="text-[#E74C3C] text-[11px] mt-1">Monatsbudget erforderlich</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Validation Messages */}
            {validationMessage && (
              <div className={`flex items-center gap-2 text-[12px] ${
                  validationMessage.type === 'error'
                    ? 'text-[#E74C3C]'
                    : validationMessage.type === 'warning'
                    ? 'text-[#FF9800]'
                    : 'text-[#4CAF50]'
                }`}
              >
                {validationMessage.type === 'error' && <AlertCircle size={16} />}
                {validationMessage.type === 'warning' && <AlertCircle size={16} />}
                {validationMessage.type === 'success' && <CheckCircle size={16} />}
                <span>{validationMessage.text}</span>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleStep4Back} className="px-6 py-3 border border-[#E0E0E0] text-[#666666] text-[14px] rounded hover:bg-[#F5F5F5] transition flex items-center gap-2"
                style={{ borderRadius: '4px' }}
              >
                <ArrowLeft size={16} />
                Zurück
              </button>
              <button
                onClick={handleStep4Next}
                disabled={!validateStep4()} className={`px-6 py-3 text-white text-[14px] rounded transition ${
                  validateStep4()
                    ? 'bg-[#4CAF50] hover:bg-[#45A049]'
                    : 'bg-[#CCCCCC] cursor-not-allowed'
                }`}
                style={{ borderRadius: '4px' }}
              >
                Weiter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
