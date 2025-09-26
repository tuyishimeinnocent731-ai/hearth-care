import React from 'react';
import type { Page } from '../App';
import { HomeIcon, UserCircleIcon, MessageSquareIcon, FileTextIcon, SettingsIcon, LogOutIcon, VideoIcon, ChartBarIcon, HeartPulseIcon, XIcon, CalendarIcon, BotIcon, UserIcon } from './IconComponents';
import type { UserProfile } from '../types';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <a
    href="#"
    onClick={(e) => {
        e.preventDefault();
        onClick?.();
    }}
    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
      active
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </a>
);

interface LeftAsideProps {
    onNavigate: (page: Page) => void;
    currentPage: Page;
    isMobileNavOpen: boolean;
    onCloseMobileNav: () => void;
    userProfile: UserProfile;
}

const LeftAside: React.FC<LeftAsideProps> = ({ onNavigate, currentPage, isMobileNavOpen, onCloseMobileNav, userProfile }) => {

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    onCloseMobileNav();
  };

  return (
    <aside className={`
      w-72 bg-white border-r border-gray-200 
      fixed inset-y-0 left-0 z-40 h-screen
      transform transition-transform duration-300 ease-in-out
      flex flex-col
      lg:translate-x-0
      ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center">
              <HeartPulseIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-3 text-xl font-bold text-gray-800">MediConnect AI</span>
          </div>
          <button onClick={onCloseMobileNav} className="p-2 rounded-md hover:bg-gray-100 lg:hidden">
              <XIcon className="w-6 h-6 text-gray-500" />
          </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center mb-6 px-2">
            <img src={userProfile.profilePicture} alt="User" className="w-11 h-11 rounded-full object-cover" />
            <div className="ml-3">
                <p className="font-bold text-gray-800">{userProfile.fullName}</p>
                <p className="text-xs text-gray-500">{userProfile.email}</p>
            </div>
        </div>
        <nav className="space-y-2">
          <NavItem 
            icon={<HomeIcon className="w-5 h-5" />} 
            label="Girana ikiganiro na Muganga" 
            active={currentPage === 'home'} 
            onClick={() => handleNavClick('home')} 
            />
          <NavItem 
            icon={<BotIcon className="w-5 h-5" />} 
            label="Umujyanama wa AI" 
            active={currentPage === 'ai-chat'}
            onClick={() => handleNavClick('ai-chat')}
            />
          <NavItem 
            icon={<UserIcon className="w-5 h-5" />} 
            label="Umwirondoro Wanjye" 
            active={currentPage === 'profile'}
            onClick={() => handleNavClick('profile')}
            />
          <NavItem 
            icon={<MessageSquareIcon className="w-5 h-5" />} 
            label="Ubutumwa" 
            active={currentPage === 'messages'}
            onClick={() => handleNavClick('messages')}
            />
          <NavItem 
            icon={<FileTextIcon className="w-5 h-5" />} 
            label="Imiti wandikiwe" 
            active={currentPage === 'prescriptions'}
            onClick={() => handleNavClick('prescriptions')}
            />
          <NavItem 
            icon={<ChartBarIcon className="w-5 h-5" />} 
            label="Imbonerahamwe y'Ubuzima" 
            active={currentPage === 'dashboard'}
            onClick={() => handleNavClick('dashboard')}
            />
           <NavItem 
            icon={<CalendarIcon className="w-5 h-5" />} 
            label="Gahunda Zanjye" 
            active={currentPage === 'appointments'}
            onClick={() => handleNavClick('appointments')}
            />
           <NavItem 
            icon={<VideoIcon className="w-5 h-5" />} 
            label="Ubujyanama kuri Video" 
            active={currentPage === 'video'} 
            onClick={() => handleNavClick('video')} 
            />
        </nav>
      </div>
        
      <div className="p-4 mt-auto flex-shrink-0">
          <div className="border-t border-gray-200 pt-4 space-y-2">
              <NavItem 
                  icon={<SettingsIcon className="w-5 h-5" />} 
                  label="Igenamiterere" 
                  active={currentPage === 'settings'}
                  onClick={() => handleNavClick('settings')}
                  />
              <NavItem 
                  icon={<LogOutIcon className="w-5 h-5" />} 
                  label="Gusohoka" 
                  />
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
              <h4 className="font-bold text-blue-800">Ukeneye Ubufasha?</h4>
              <p className="text-xs text-blue-700 mt-1">Vugisha abashinzwe ubufasha 24/7.</p>
              <button className="mt-3 w-full text-sm bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Vugana Nabo</button>
          </div>
      </div>
    </aside>
  );
};

export default LeftAside;