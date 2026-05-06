import { useState } from 'react';
import { LayoutDashboard, Users, Settings, FileText, Gift, HelpCircle, MapPin, Mail } from 'lucide-react';

type MenuItem = {
  id: string;
  label: string;
  icon: any;
};

const navItems: MenuItem[] = [
  { id: 'dashboard', label: 'Übersicht', icon: LayoutDashboard },
  { id: 'mitarbeiter', label: 'Mitarbeiter', icon: Users },
  { id: 'benefits', label: 'Benefits', icon: Gift },
  { id: 'locations', label: 'Standorte', icon: MapPin },
  { id: 'reports', label: 'Berichte', icon: FileText },
  { id: 'settings', label: 'Verwaltung', icon: Settings },
  { id: 'kontakt', label: 'Kontakt', icon: Mail },
  { id: 'help-center', label: 'Hilfe', icon: HelpCircle },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId } }));
  };

  return (
    <div className="flex flex-col w-[260px] h-full bg-[#273A5F] border-r border-[#E0E0E0]"
      style={{
        fontFamily: 'Roboto, sans-serif',
        height: 'calc(100vh - 64px)'
      }}
    >
      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)} className={`
                relative w-full px-4 py-3 text-left text-[14px] transition-all duration-200 rounded-md
                flex items-center gap-3
                ${isActive
                  ? 'bg-[#0F429F] text-white font-bold'
                  : 'text-white hover:bg-[rgba(255,255,255,0.1)]'
                }
              `}
            >
              <Icon size={16} className="flex-shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}