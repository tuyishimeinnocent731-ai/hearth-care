import React, { useState } from 'react';
import { HomeIcon, UserCircleIcon, MessageSquareIcon, FileTextIcon, SettingsIcon, LogOutIcon } from './IconComponents';

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
}

const LeftAside: React.FC<LeftAsideProps> = ({ onNavigateHome }) => {
    const [activeItem, setActiveItem] = useState('Shakisha Muganga');

    const handleNavClick = (label: string, action?: () => void) => {
        setActiveItem(label);
        action?.();
    };

  return (
    <aside className="hidden md:flex w-72 bg-white border-r border-gray-200 p-4 flex-col">
      <div className="flex flex-col h-full">
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
            icon={<FileTextIcon className="w-5 h-5" />} 
            label="Amadosiye y'Ubuvuzi" 
            active={activeItem === 'Amadosiye y\'Ubuvuzi'}
            onClick={() => handleNavClick('Amadosiye y\'Ubuvuzi')}
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