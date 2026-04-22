import { useState } from 'react';
import { Home, Users, BarChart3, Settings, HelpCircle, Mail, LogOut, Gift, Upload } from 'lucide-react';

type MenuItem = {
  id: string;
  label: string;
  icon: React.ElementType;
};

const mainMenuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'mitarbeiter', label: 'Mitarbeiter', icon: Users },
  { id: 'mass-import', label: 'Massenimport', icon: Upload },
  { id: 'benefits', label: 'Benefits', icon: Gift },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const bottomMenuItems: MenuItem[] = [
  { id: 'help', label: 'Help', icon: HelpCircle },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'logout', label: 'Logout', icon: LogOut },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    
    // Map contact to kontakt view
    const viewId = itemId === 'contact' ? 'kontakt' : itemId;
    
    // Trigger custom event for navigation
    window.dispatchEvent(new CustomEvent('sidebar-navigate', { detail: { itemId: viewId } }));
  };

  return (
    <div
      className="flex flex-col h-screen bg-[#273A5F]"
      style={{ width: '280px', fontFamily: 'Roboto, sans-serif' }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center h-12 px-4">
        <div className="flex items-center gap-2">
          {/* Riso Logo */}
          <div className="flex items-center justify-center w-8 h-8 rounded bg-[#0F429F]">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          {/* AG-Portal Text */}
          <span className="text-white font-medium text-lg">AG-Portal</span>
        </div>
      </div>

      {/* Main Menu Items */}
      <nav className="flex-1 pt-4">
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`
                w-full h-12 flex items-center px-4 gap-3 transition-colors
                ${
                  isActive
                    ? 'bg-[#246AFF]'
                    : 'hover:bg-[#2f4469]'
                }
              `}
            >
              <Icon className="w-6 h-6 text-[#0F429F]" />
              <span
                className="text-white text-sm"
                style={{
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 h-px bg-white opacity-20"></div>

      {/* Bottom Section */}
      <div className="pb-4">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`
                w-full h-12 flex items-center px-4 gap-3 transition-colors
                ${
                  isActive
                    ? 'bg-[#246AFF]'
                    : 'hover:bg-[#2f4469]'
                }
              `}
            >
              <Icon className="w-6 h-6 text-[#0F429F]" />
              <span
                className="text-white text-sm"
                style={{
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}