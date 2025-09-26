import React from 'react';
import type { Page } from '../types';
import { LayoutDashboardIcon, CalendarIcon, MessageSquareIcon, PillIcon, UserCircleIcon, SettingsIcon, BotIcon, HeartPulseIcon } from './IconComponents';

interface LeftAsideProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NavItem: React.FC<{
  page: Page;
  label: string;
  icon: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}> = ({ page, label, icon, currentPage, onNavigate }) => (
  <li>
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onNavigate(page); }}
      className={`flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 ${currentPage === page ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      {icon}
      <span className="ml-3 font-medium">{label}</span>
    </a>
  </li>
);

const LeftAside: React.FC<LeftAsideProps> = ({ currentPage, onNavigate }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="h-16 flex items-center px-6">
        <HeartPulseIcon className="w-8 h-8 text-blue-600" />
        <h1 className="ml-2 text-xl font-bold text-gray-800">Ubuvuzi</h1>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          <NavItem page="dashboard" label="Imbonerahamwe" icon={<LayoutDashboardIcon className="w-5 h-5" />} currentPage={currentPage} onNavigate={onNavigate} />
          <NavItem page="appointments" label="Gahunda Zanjye" icon={<CalendarIcon className="w-5 h-5" />} currentPage={currentPage} onNavigate={onNavigate} />
          <NavItem page="messages" label="Ubutumwa" icon={<MessageSquareIcon className="w-5 h-5" />} currentPage={currentPage} onNavigate={onNavigate} />
          <NavItem page="prescriptions" label="Imiti" icon={<PillIcon className="w-5 h-5" />} currentPage={currentPage} onNavigate={onNavigate} />
          <NavItem page="ai-chat" label="Umujyanama AI" icon={<BotIcon className="w-5 h-5" />} currentPage={currentPage} onNavigate={onNavigate} />
        </ul>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <ul className="space-y-2">
            <NavItem page="profile" label="Umwirondoro" icon={<UserCircleIcon className="w-5 h-5" />} currentPage={currentPage} onNavigate={onNavigate} />
            <NavItem page="settings" label="Igenamiterere" icon={<SettingsIcon className="w-5 h-5" />} currentPage={currentPage} onNavigate={onNavigate} />
          </ul>
        </div>
      </nav>
      
      <div className="p-4 mt-auto">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
            <h4 className="font-bold text-blue-800">Gisha Inama Nshya</h4>
            <p className="text-xs text-blue-700 mt-1 mb-3">Tangira ikiganiro gishya na muganga.</p>
            <button onClick={() => onNavigate('doctor-selection')} className="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700">Hitamo Muganga</button>
        </div>
      </div>
    </aside>
  );
};

export default LeftAside;
