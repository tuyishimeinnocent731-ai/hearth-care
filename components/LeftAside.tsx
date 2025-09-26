import React, { useState } from 'react';
import { HomeIcon, UserCircleIcon, MessageSquareIcon, FileTextIcon, SettingsIcon, LogOutIcon, VideoIcon, ChartBarIcon, HeartPulseIcon, XIcon } from './IconComponents';

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
    onNavigateHome: () => void;
    onVideoCall: () => void;
    isMobileNavOpen: boolean;
    onCloseMobileNav: () => void;
}

const LeftAside: React.FC<LeftAsideProps> = ({ onNavigateHome, onVideoCall, isMobileNavOpen, onCloseMobileNav }) => {
    const [activeItem, setActiveItem] = useState('Shakisha Muganga');

    const handleNavClick = (label: string, action?: () => void) => {
        setActiveItem(label);
        action?.();
        onCloseMobileNav(); // Always close mobile nav after an action
    };

  return (
    <aside className={`
      w-72 bg-white border-r border-gray-200 
      fixed inset-y-0 left-0 z-40
      transform transition-transform duration-300 ease-in-out
      md:relative md:translate-x-0
      ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex flex-col h-full p-4">
        <div className="md:hidden flex items-center justify-between mb-4">
            <div className="flex items-center">
                <HeartPulseIcon className="h-8 w-8 text-blue-600" />
                <span className="ml-3 text-xl font-bold text-gray-800">MediConnect AI</span>
            </div>
            <button onClick={onCloseMobileNav} className="p-2 rounded-md hover:bg-gray-100">
                <XIcon className="w-6 h-6 text-gray-500" />
            </button>
        </div>

        <div className="flex items-center mb-6 px-2">
            <img src="https://picsum.photos/seed/user/200/200" alt="User" className="w-11 h-11 rounded-full" />
            <div className="ml-3">
                <p className="font-bold text-gray-800">K. Nkurunziza</p>
                <p className="text-xs text-gray-500">nkurunziza.k@example.com</p>
            </div>
        </div>
        <nav className="flex-1 space-y-2">
          <NavItem 
            icon={<HomeIcon className="w-5 h-5" />} 
            label="Ahabanza" 
            active={activeItem === 'Ahabanza'} 
            onClick={() => handleNavClick('Ahabanza')} 
            />
          <NavItem 
            icon={<UserCircleIcon className="w-5 h-5" />} 
            label="Shakisha Muganga" 
            active={activeItem === 'Shakisha Muganga'} 
            onClick={() => handleNavClick('Shakisha Muganga', onNavigateHome)} 
            />
          <NavItem 
            icon={<VideoIcon className="w-5 h-5" />} 
            label="Ubujyanama kuri Video" 
            active={activeItem === 'Ubujyanama kuri Video'} 
            onClick={() => handleNavClick('Ubujyanama kuri Video', onVideoCall)} 
            />
          <NavItem 
            icon={<MessageSquareIcon className="w-5 h-5" />} 
            label="Ubutumwa" 
            active={activeItem === 'Ubutumwa'}
            onClick={() => handleNavClick('Ubutumwa')}
            />
          <NavItem 
            icon={<FileTextIcon className="w-5 h-5" />} 
            label="Imiti wandikiwe" 
            active={activeItem === 'Imiti wandikiwe'}
            onClick={() => handleNavClick('Imiti wandikiwe')}
            />
          <NavItem 
            icon={<ChartBarIcon className="w-5 h-5" />} 
            label="Imbonerahamwe y'Ubuzima" 
            active={activeItem === 'Imbonerahamwe y\'Ubuzima'}
            onClick={() => handleNavClick('Imbonerahamwe y\'Ubuzima')}
            />
        </nav>
        
        <div className="mt-auto">
            <div className="border-t border-gray-200 pt-4 space-y-2">
                <NavItem 
                    icon={<SettingsIcon className="w-5 h-5" />} 
                    label="Igenamiterere" 
                    active={activeItem === 'Igenamiterere'}
                    onClick={() => handleNavClick('Igenamiterere')}
                    />
                <NavItem 
                    icon={<LogOutIcon className="w-5 h-5" />} 
                    label="Gusohoka" 
                    onClick={() => handleNavClick('Gusohoka')}
                    />
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
                <h4 className="font-bold text-blue-800">Ukeneye Ubufasha?</h4>
                <p className="text-xs text-blue-700 mt-1">Vugisha abashinzwe ubufasha 24/7.</p>
                <button className="mt-3 w-full text-sm bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Vugana Nabo</button>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftAside;