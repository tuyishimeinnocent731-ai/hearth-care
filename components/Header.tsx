
import React, { useState } from 'react';
import type { Page, UserProfile } from '../types';
import { SearchIcon, BellIcon, MenuIcon, XIcon } from './IconComponents';

interface HeaderProps {
    userProfile: UserProfile;
    onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <button className="lg:hidden mr-4 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                             {mobileMenuOpen ? <XIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/>}
                        </button>
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Shakisha..."
                                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700" onClick={() => onNavigate('notifications')}>
                            <BellIcon className="w-6 h-6"/>
                        </button>
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('profile')}>
                            <img src={userProfile.profilePicture} alt="User" className="w-9 h-9 rounded-full"/>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-gray-800">{userProfile.fullName}</p>
                                <p className="text-xs text-gray-500">Umurwayi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
