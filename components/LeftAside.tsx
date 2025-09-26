
import React from 'react';
import type { Page } from '../App';
import {
  LayoutDashboardIcon,
  MessageSquareIcon,
  CalendarIcon,
  PillIcon,
  UserCircleIcon,
  SettingsIcon,
  BotIcon,
  StethoscopeIcon,
  VideoIcon
} from './IconComponents'; // Assuming you have these icons

// Renaming to avoid conflict with SVG element props
const LayoutDashboard: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
const Settings: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.23l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.23l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>

interface LeftAsideProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NavLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white shadow'
        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const LeftAside: React.FC<LeftAsideProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { page: 'consultation-start', label: 'Gisha Inama', icon: <StethoscopeIcon className="w-5 h-5" /> },
    { page: 'ai-chat', label: 'Umujyanama wa AI', icon: <BotIcon className="w-5 h-5" /> },
    { page: 'appointments', label: 'Gahunda Zanjye', icon: <CalendarIcon className="w-5 h-5" /> },
    { page: 'messages', label: 'Ubutumwa', icon: <MessageSquareIcon className="w-5 h-5" /> },
    { page: 'video-consultation', label: 'Video', icon: <VideoIcon className="w-5 h-5" /> },
    { page: 'prescriptions', label: 'Imiti', icon: <PillIcon className="w-5 h-5" /> },
  ];

  const bottomNavItems = [
    { page: 'profile', label: 'Umwirondoro', icon: <UserCircleIcon className="w-5 h-5" /> },
    { page: 'settings', label: 'Igenamiterere', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="hidden lg:block w-64 bg-white p-4 border-r border-gray-200 fixed top-0 left-0 h-screen">
      <div className="flex items-center h-16 px-2 mb-4">
        <h1 className="text-2xl font-bold text-blue-600">MediConnect</h1>
      </div>
      <nav className="flex flex-col h-[calc(100%-6rem)]">
        <div className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.page}
              icon={item.icon}
              label={item.label}
              isActive={currentPage === item.page}
              onClick={() => onNavigate(item.page as Page)}
            />
          ))}
        </div>
        <div className="mt-auto space-y-2">
            {bottomNavItems.map((item) => (
                <NavLink
                key={item.page}
                icon={item.icon}
                label={item.label}
                isActive={currentPage === item.page}
                onClick={() => onNavigate(item.page as Page)}
                />
            ))}
        </div>
      </nav>
    </aside>
  );
};

export default LeftAside;
