import React, { useState, useEffect, useRef } from 'react';
import { HeartPulseIcon, SearchIcon, BellIcon, UserCircleIcon, SettingsIcon, LogOutIcon, ChevronDownIcon, MenuIcon } from './IconComponents';

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onToggleMobileNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onToggleMobileNav }) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setNotificationsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Mobile Nav Toggle */}
          <div className="flex items-center">
            <button
              onClick={onToggleMobileNav}
              className="md:hidden mr-3 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <HeartPulseIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-3 text-2xl font-bold text-gray-800 tracking-tight hidden md:block">
              MediConnect AI
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-start">
            <div className="max-w-md w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Shakisha</label>
              <div className="relative text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <SearchIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  className="block w-full bg-gray-100 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Shakisha abaganga, ibimenyetso..."
                  type="search"
                  name="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
             <div className="relative" ref={notificationsRef}>
                 <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  type="button"
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Reba amatangazo</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {notificationsOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <div className="font-bold px-4 py-2 text-gray-700">Amatangazo</div>
                            <div className="border-t border-gray-100"></div>
                            <a href="#" className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-100">
                                <p className="font-medium text-gray-800">Ubuhamya bushya</p>
                                <p className="truncate">Dr. Isabella Monroe yasubije ubutumwa bwawe.</p>
                            </a>
                            <a href="#" className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-100">
                                <p className="font-medium text-gray-800">Kwibutswa gahunda</p>
                                <p>Ifatabuguzi ryawe na Dr. Chen riri hafi.</p>
                            </a>
                        </div>
                    </div>
                )}
             </div>

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                type="button"
                className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                id="user-menu-button"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Fungura menu y'ukoresha</span>
                <img
                  className="h-9 w-9 rounded-full"
                  src="https://picsum.photos/seed/user/200/200"
                  alt="Ifoto y'ukoresha"
                />
                <ChevronDownIcon className="w-4 h-4 ml-1 text-gray-500" />
              </button>
              {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <UserCircleIcon className="w-5 h-5 mr-2" /> Umwirondoro
                    </a>
                     <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <SettingsIcon className="w-5 h-5 mr-2" /> Igenamiterere
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <LogOutIcon className="w-5 h-5 mr-2" /> Gusohoka
                    </a>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;