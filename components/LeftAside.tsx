import React from 'react';
import type { Page } from '../types';
// FIX: Replaced multiple missing icons with available ones.
import { 
    HomeIcon, 
    CalendarDaysIcon, 
    ChatBubbleLeftEllipsisIcon, 
    PillIcon, 
    UserCircleIcon, 
    Cog6ToothIcon, 
    SparklesIcon, 
    HeartPulseIcon, 
    PlusIcon,
    DocumentChartBarIcon
} from './IconComponents';

interface LeftAsideProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

const NavItem: React.FC<{
  page: Page;
  label: string;
  icon: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isExpanded: boolean;
}> = ({ page, label, icon, currentPage, onNavigate, isExpanded }) => (
  <li>
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onNavigate(page); }}
      className={`flex items-center h-12 rounded-lg transition-colors duration-200 justify-center md:group-hover:justify-start md:group-hover:px-4 md:group-hover:gap-3 ${isExpanded ? 'justify-start px-4 gap-3' : ''} ${currentPage === page ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
      title={isExpanded ? '' : label}
    >
      {icon}
      <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-w-48 opacity-100' : 'max-w-0 opacity-0 md:group-hover:max-w-48 md:group-hover:opacity-100'}`}>
        {label}
      </span>
    </a>
  </li>
);

const LeftAside: React.FC<LeftAsideProps> = ({ currentPage, onNavigate, isMobileOpen, onClose }) => {
  const isExpanded = isMobileOpen; // On mobile, expanded means the sidebar is open

  return (
    <>
        {/* Overlay for mobile */}
        <div 
            className={`fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        ></div>

        <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 flex flex-col z-40
            md:relative md:w-20 md:hover:w-64 md:group 
            transition-all duration-300 ease-in-out
            ${isMobileOpen ? 'w-64' : '-translate-x-full md:translate-x-0 w-20'}`}
        >
          <div className={`h-16 flex items-center flex-shrink-0 transition-all duration-300 justify-center ${isExpanded ? 'px-5 justify-start gap-2' : 'md:group-hover:px-5 md:group-hover:justify-start md:group-hover:gap-2'}`}>
            <HeartPulseIcon className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <h1 className={`text-xl font-bold text-gray-800 whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-w-48 opacity-100' : 'max-w-0 opacity-0 md:group-hover:max-w-48 md:group-hover:opacity-100'}`}>
                Ubuvuzi
            </h1>
          </div>

          <nav className="flex-1 px-3 py-4">
            <ul className="space-y-2">
              <NavItem page="dashboard" label="Imbonerahamwe" icon={<HomeIcon className="w-5 h-5 flex-shrink-0" />} currentPage={currentPage} onNavigate={onNavigate} isExpanded={isExpanded} />
              <NavItem page="appointments" label="Gahunda Zanjye" icon={<CalendarDaysIcon className="w-5 h-5 flex-shrink-0" />} currentPage={currentPage} onNavigate={onNavigate} isExpanded={isExpanded} />
              <NavItem page="messages" label="Ubutumwa" icon={<ChatBubbleLeftEllipsisIcon className="w-5 h-5 flex-shrink-0" />} currentPage={currentPage} onNavigate={onNavigate} isExpanded={isExpanded} />
              <NavItem page="prescriptions" label="Imiti" icon={<PillIcon className="w-5 h-5 flex-shrink-0" />} currentPage={currentPage} onNavigate={onNavigate} isExpanded={isExpanded} />
              <NavItem page="health-report" label="Rapo y'Ubuzima" icon={<DocumentChartBarIcon className="w-5 h-5 flex-shrink-0" />} currentPage={currentPage} onNavigate={onNavigate} isExpanded={isExpanded} />
              <NavItem page="ai-chat" label="Umujyanama AI" icon={<SparklesIcon className="w-5 h-5 flex-shrink-0" />} currentPage={currentPage} onNavigate={onNavigate} isExpanded={isExpanded} />
            </ul>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <ul className="space-y-2">
                <NavItem page="profile" label="Umwirondoro" icon={<UserCircleIcon className="w-5 h-5 flex-shrink-0" />} currentPage={currentPage} onNavigate={onNavigate} isExpanded={isExpanded} />
                <NavItem page="settings" label="Igenamiterere" icon={<Cog6ToothIcon className="w-5 h-5 flex-shrink-0" />} currentPage={currentPage} onNavigate={onNavigate} isExpanded={isExpanded} />
              </ul>
            </div>
          </nav>
          
          <div className="p-3 mt-auto">
             <div className={`${isExpanded ? 'block' : 'hidden md:group-hover:block'} transition-all opacity-0 ${isExpanded ? 'opacity-100 delay-200' : 'md:group-hover:opacity-100'} duration-300`}>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h4 className="font-bold text-blue-800 whitespace-nowrap">Gisha Inama Nshya</h4>
                    <p className="text-xs text-blue-700 mt-1 mb-3">Tangira ikiganiro gishya na muganga.</p>
                    <button onClick={() => onNavigate('doctor-selection')} className="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap">Hitamo Muganga</button>
                </div>
            </div>
             <div className={`${isExpanded ? 'hidden' : 'block md:group-hover:hidden'}`}>
                 <button 
                    onClick={() => onNavigate('doctor-selection')} 
                    className="w-full h-14 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    title="Gisha Inama Nshya"
                 >
                    <PlusIcon className="w-6 h-6"/>
                </button>
            </div>
          </div>
        </aside>
    </>
  );
};

export default LeftAside;