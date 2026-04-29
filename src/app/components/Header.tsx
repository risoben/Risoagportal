import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import logo from '/Riso_Blue_Logo.svg';

interface HeaderProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
  showBackButton?: boolean;
}

export function Header({ currentView = 'dashboard', onNavigate, showBackButton = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Startseite' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'mitarbeiter', label: 'Mitarbeiter' },
    { id: 'reports', label: 'Berichte' },
    { id: 'mass-import', label: 'Massenimport' },
    { id: 'settings', label: 'Verwaltung' },
    { id: 'help-center', label: 'Hilfe' },
    { id: 'kontakt', label: 'Kontakt', special: true },
  ];

  const handleNavClick = (itemId: string) => {
    if (onNavigate) {
      onNavigate(itemId);
    } else {
      window.dispatchEvent(new CustomEvent('sidebar-navigate', {
        detail: { itemId }
      }));
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E0E0E0] z-50">
      <div className="h-full px-8 flex items-center justify-between">
        {/* LEFT: Logo + Brand */}
        <button
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 hover:bg-[#F9FAFB] group"
        >
          <img
            src={logo}
            alt="Riso Logo"
            className="w-8 h-8 transition-opacity duration-200 group-hover:opacity-80"
          />
          <span
            className="text-[14px] font-bold text-[#273A5F] tracking-tight"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Arbeitgeber-Portal
          </span>
        </button>

        {/* CENTER: Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                relative text-[13px] py-5 transition-all duration-300
                ${currentView === item.id
                  ? 'text-[#0F429F] font-semibold'
                  : item.special
                    ? 'text-[#0F429F] underline hover:opacity-70'
                    : 'text-[#666666] hover:text-[#0F429F]'
                }
              `}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              {item.label}
              {currentView === item.id && !item.special && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0F429F] rounded-t-sm"
                  style={{
                    animation: 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* RIGHT: Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {showBackButton && (
            <button
              onClick={() => handleNavClick('help-center')}
              className="px-4 py-2 text-[12px] font-medium text-[#0F429F] border border-[#0F429F] rounded-md transition-all duration-200 hover:bg-[#F0F4FF] hover:shadow-sm"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              ← Zurück zur Hilfe
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#0F429F] transition-all duration-200 rounded-full hover:bg-[#F9FAFB]"
            >
              <User size={20} strokeWidth={2} />
            </button>

            {userMenuOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#E0E0E0] rounded-lg shadow-lg overflow-hidden"
                style={{
                  animation: 'fadeInDown 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <button
                  className="w-full px-4 py-3 text-left text-[13px] text-[#666666] hover:bg-[#F9FAFB] transition-colors duration-150"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Profil
                </button>
                <button
                  className="w-full px-4 py-3 text-left text-[13px] text-[#666666] hover:bg-[#F9FAFB] transition-colors duration-150"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Einstellungen
                </button>
                <div className="border-t border-[#E0E0E0]" />
                <button
                  className="w-full px-4 py-3 text-left text-[13px] text-[#0F429F] hover:bg-[#F9FAFB] transition-colors duration-150"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Abmelden
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE: Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-[#666666] hover:text-[#0F429F] transition-colors duration-200"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-[#E0E0E0] shadow-lg"
          style={{
            animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  px-8 py-4 text-left text-[13px] transition-colors duration-200 border-l-4
                  ${currentView === item.id
                    ? 'bg-[#F0F4FF] text-[#0F429F] font-semibold border-[#0F429F]'
                    : 'text-[#666666] hover:bg-[#F9FAFB] border-transparent'
                  }
                `}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {showBackButton && (
            <div className="px-8 py-4 border-t border-[#E0E0E0]">
              <button
                onClick={() => handleNavClick('help-center')}
                className="w-full px-4 py-2 text-[12px] font-medium text-[#0F429F] border border-[#0F429F] rounded-md hover:bg-[#F0F4FF] transition-colors duration-200"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                ← Zurück zur Hilfe
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
