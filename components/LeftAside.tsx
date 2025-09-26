import React from 'react';
import type { Page } from '../types';
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
} from './IconComponents';

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
    { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" /> },
    { page: 'consultation-start', label: 'Gisha Inama', icon: <StethoscopeIcon className="w-5 h-5" /> },
    { page: 'ai-chat', label: 'Umujyanama wa AI', icon: <BotIcon className="w-5 h-5" /> },
    { page: 'appointments', label: 'Gahunda Zanjye', icon: <CalendarIcon className="w-5 h-5" /> },
    { page: 'messages', label: 'Ubutumwa', icon: <MessageSquareIcon className="w-5 h-5" /> },
    { page: 'video-consultation', label: 'Video', icon: <VideoIcon className="w-5 h-5" /> },
    { page: 'prescriptions', label: 'Imiti', icon: <PillIcon className="w-5 h-5" /> },
  ];

  const bottomNavItems = [
    { page: 'profile', label: 'Umwirondoro', icon: <UserCircleIcon className="w-5 h-5" /> },
    { page: 'settings', label: 'Igenamiterere', icon: <SettingsIcon className="w-5 h-5" /> },
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