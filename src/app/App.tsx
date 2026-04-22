import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { BudgetOverview } from './components/BudgetOverview';
import { EmployeeTable } from './components/EmployeeTable';
import { MitarbeiterEdit } from './components/MitarbeiterEdit';
import { CSVUpload } from './components/CSVUpload';
import { HelpPanel } from './components/HelpPanel';
import { BenefitsOverview } from './components/BenefitsOverview';
import { BenefitSettings } from './components/BenefitSettings';
import { ReportsPage } from './components/ReportsPage';
import { Kontakt } from './components/Kontakt';
import { Settings } from './components/Settings';
import { MassImport } from './components/MassImport';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showHelpPanel, setShowHelpPanel] = useState(false);

  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      const itemId = event.detail.itemId;

      // Handle help panel toggle
      if (itemId === 'help') {
        setShowHelpPanel(true);
      } else {
        setCurrentView(itemId);
      }
    };

    window.addEventListener('sidebar-navigate', handleNavigation as EventListener);
    return () => {
      window.removeEventListener('sidebar-navigate', handleNavigation as EventListener);
    };
  }, []);

  return (
    <div className="size-full flex">
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'benefits' && <BenefitsOverview />}
        {currentView === 'benefits-edit' && <BenefitSettings />}
        {currentView === 'mitarbeiter' && <EmployeeTable />}
        {currentView === 'mitarbeiter-edit' && <MitarbeiterEdit />}
        {currentView === 'mass-import' && <MassImport />}
        {currentView === 'reports' && <ReportsPage />}
        {currentView === 'csv-upload' && <CSVUpload />}
        {currentView === 'kontakt' && <Kontakt />}
        {currentView === 'settings' && <Settings />}
        {currentView === 'übersicht' && <BudgetOverview />}
        {currentView !== 'dashboard' &&
         currentView !== 'benefits' &&
         currentView !== 'benefits-edit' &&
         currentView !== 'mitarbeiter' &&
         currentView !== 'mitarbeiter-edit' &&
         currentView !== 'mass-import' &&
         currentView !== 'reports' &&
         currentView !== 'csv-upload' &&
         currentView !== 'kontakt' &&
         currentView !== 'settings' &&
         currentView !== 'übersicht' && (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
            </h1>
            <p className="text-gray-600 mt-4">This section is under construction.</p>
          </div>
        )}
      </div>

      {/* Help Panel */}
      {showHelpPanel && <HelpPanel onClose={() => setShowHelpPanel(false)} />}
    </div>
  );
}