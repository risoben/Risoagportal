import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { BudgetOverview } from './components/BudgetOverview';
import { EmployeeTable } from './components/EmployeeTable';
import { EmployeeManagement } from './components/EmployeeManagement';
import { MitarbeiterEdit } from './components/MitarbeiterEdit';
import { EmployeeEditCreate } from './components/EmployeeEditCreate';
import { CSVUpload } from './components/CSVUpload';
import { HelpPanel } from './components/HelpPanel';
import { BenefitsOverview } from './components/BenefitsOverview';
import { BenefitsOverviewPage } from './components/BenefitsOverviewPage';
import { BenefitsOverviewSimple } from './components/BenefitsOverviewSimple';
import { BenefitsOverviewNew } from './components/BenefitsOverviewNew';
import { BenefitsManagement } from './components/BenefitsManagement';
import { BenefitSettings } from './components/BenefitSettings';
import { BenefitDankeBonusSettings } from './components/BenefitDankeBonusSettings';
import { BenefitGeburtstagSettings } from './components/BenefitGeburtstagSettings';
import { BenefitErholungSettings } from './components/BenefitErholungSettings';
import { BenefitBavSettings } from './components/BenefitBavSettings';
import { BenefitBkvSettings } from './components/BenefitBkvSettings';
import { BenefitFormComplete } from './components/BenefitFormComplete';
import { BenefitEditLocation } from './components/BenefitEditLocation';
import { BenefitAddLocation } from './components/BenefitAddLocation';
import { BenefitConfigWizard } from './components/BenefitConfigWizard';
import { ReportsPage } from './components/ReportsPage';
import { LocationsPage } from './components/LocationsPage';
import { LocationCreate } from './components/LocationCreate';
import { LocationFormComplete } from './components/LocationFormComplete';
import { Kontakt } from './components/Kontakt';
import { Settings } from './components/Settings';
import { VerwaltungPage } from './components/VerwaltungPage';
import { LocationsOverview } from './components/LocationsOverview';
import { LocationDetails } from './components/LocationDetails';
import { MassImport } from './components/MassImport';
import { HelpCenter } from './components/HelpCenter';
import { ContactModal } from './components/ContactModal';
import { User, Mail } from 'lucide-react';
import logo from '/Riso_Blue_Logo.svg';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showHelpPanel, setShowHelpPanel] = useState(false);
  const [navigationData, setNavigationData] = useState<any>({});
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [locationData, setLocationData] = useState<{ locationId?: string; locationName?: string }>({});
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      const { itemId, locationId, locationName, ...extraData } = event.detail;

      // Special handling for contact modal
      if (itemId === 'kontakt') {
        setShowContactModal(true);
        return;
      }

      setCurrentView(itemId);
      setNavigationData(extraData);

      if (locationId && locationName) {
        setLocationData({ locationId, locationName });
      }
    };

    window.addEventListener('sidebar-navigate', handleNavigation as EventListener);
    return () => {
      window.removeEventListener('sidebar-navigate', handleNavigation as EventListener);
    };
  }, []);

  const handleLogoClick = () => {
    setCurrentView('dashboard');
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: 'dashboard' } }));
  };

  return (
    <div className="size-full flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Top Bar */}
      <header className="h-16 bg-white border-b border-[#E0E0E0] px-6 flex items-center justify-between z-50">
        {/* Left: Logo + Brand */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-4 hover:opacity-80 transition-opacity duration-200"
        >
          <img src={logo} alt="Riso Logo" className="w-8 h-8" />
          <span className="text-[16px] font-bold text-[#273A5F]">
            Arbeitgeber-Portal
          </span>
        </button>

        {/* Right: Contact + User Profile */}
        <div className="flex items-center gap-3">
          {/* Contact Icon */}
          <button
            onClick={() => setShowContactModal(true)}
            className="w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#0F429F] hover:bg-[#F9FAFB] rounded-full transition-all duration-200"
            title="Kontakt"
          >
            <Mail size={24} />
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 rounded-full bg-[#0F429F] text-white flex items-center justify-center hover:opacity-90 transition-opacity duration-200"
            >
              <User size={20} />
            </button>

            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#E0E0E0] rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E0E0E0]">
                  <p className="text-[14px] font-medium text-[#273A5F]">Admin User</p>
                  <p className="text-[12px] text-[#666666]">admin@company.com</p>
                </div>
                <button className="w-full px-4 py-2 text-left text-[13px] text-[#666666] hover:bg-[#F9FAFB] transition-colors">
                  Profil
                </button>
                <button className="w-full px-4 py-2 text-left text-[13px] text-[#666666] hover:bg-[#F9FAFB] transition-colors">
                  Einstellungen
                </button>
                <div className="border-t border-[#E0E0E0]" />
                <button className="w-full px-4 py-2 text-left text-[13px] text-[#0F429F] hover:bg-[#F9FAFB] transition-colors">
                  Abmelden
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Show Help Center without Sidebar */}
        {currentView === 'help-center' ? (
          <HelpCenter />
        ) : (
          <>
            <Sidebar />
            {/* Main content area */}
            <div className="flex-1 overflow-auto bg-[#F9FAFB]">
              {currentView === 'dashboard' && <Dashboard />}
              {currentView === 'benefits' && <BenefitsOverviewNew />}
              {currentView === 'benefits-management' && <BenefitsManagement />}
              {currentView === 'benefits-overview' && <BenefitsOverview />}
              {currentView === 'benefits-table' && <BenefitsOverviewPage />}
              {currentView === 'benefits-edit' && navigationData.benefitId === 'danke-bonus' && <BenefitDankeBonusSettings />}
              {currentView === 'benefits-edit' && navigationData.benefitId === 'geburtstag' && <BenefitGeburtstagSettings />}
              {currentView === 'benefits-edit' && navigationData.benefitId === 'erholung' && <BenefitErholungSettings />}
              {currentView === 'benefits-edit' && navigationData.benefitId === 'bav' && <BenefitBavSettings />}
              {currentView === 'benefits-edit' && navigationData.benefitId === 'bkv' && <BenefitBkvSettings />}
              {currentView === 'benefits-edit' && !['danke-bonus','geburtstag','erholung','bav','bkv'].includes(navigationData.benefitId) && <BenefitSettings benefitId={navigationData.benefitId} />}
              {currentView === 'benefits-form' && <BenefitFormComplete mode="Edit" />}
              {currentView === 'benefits-create' && <BenefitFormComplete mode="Create" />}
              {currentView === 'benefits-edit-location' && <BenefitEditLocation />}
              {currentView === 'benefits-add-location' && (
                <BenefitAddLocation
                  editMode={navigationData.editMode}
                  benefitId={navigationData.benefitId}
                  initialData={navigationData.initialData}
                />
              )}
              {currentView === 'benefit-config-wizard' && <BenefitConfigWizard />}
              {currentView === 'mitarbeiter' && <EmployeeManagement />}
              {currentView === 'mitarbeiter-edit' && (
                <EmployeeEditCreate editMode={true} employeeId={navigationData.employeeId} />
              )}
              {currentView === 'mitarbeiter-add' && <EmployeeEditCreate editMode={false} />}
              {currentView === 'mass-import' && <MassImport />}
              {currentView === 'reports' && <ReportsPage />}
              {currentView === 'locations' && <LocationsOverview />}
              {currentView === 'location-details' && locationData.locationId && locationData.locationName && (
                <LocationDetails locationId={locationData.locationId} locationName={locationData.locationName} />
              )}
              {currentView === 'location-create' && <LocationCreate />}
              {currentView === 'location-form-create' && <LocationFormComplete mode="Create" />}
              {currentView === 'location-form-edit' && <LocationFormComplete mode="Edit" />}
              {currentView === 'csv-upload' && <CSVUpload />}
              {currentView === 'kontakt' && <Kontakt />}
              {currentView === 'settings' && <VerwaltungPage />}
              {currentView === 'übersicht' && <BudgetOverview />}
              {currentView !== 'dashboard' &&
               currentView !== 'benefits' &&
               currentView !== 'benefits-management' &&
               currentView !== 'benefits-overview' &&
               currentView !== 'benefits-table' &&
               currentView !== 'benefits-edit' &&
               currentView !== 'benefits-form' &&
               currentView !== 'benefits-create' &&
               currentView !== 'benefits-edit-location' &&
               currentView !== 'benefits-add-location' &&
               currentView !== 'benefit-config-wizard' &&
               currentView !== 'mitarbeiter' &&
               currentView !== 'mitarbeiter-edit' &&
               currentView !== 'mitarbeiter-add' &&
               currentView !== 'mass-import' &&
               currentView !== 'reports' &&
               currentView !== 'locations' &&
               currentView !== 'location-details' &&
               currentView !== 'location-create' &&
               currentView !== 'location-form-create' &&
               currentView !== 'location-form-edit' &&
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
          </>
        )}
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>
  );
}