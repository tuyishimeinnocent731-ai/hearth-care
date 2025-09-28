import React from 'react';
import type { UserProfile, Page } from '../types';
// FIX: Replaced missing SettingsIcon with Cog6ToothIcon
import { BellIcon, SearchIcon, Cog6ToothIcon, MenuIcon } from './IconComponents';

interface HeaderProps {
    userProfile: UserProfile;
    onNavigate: (page: Page) => void;
    onToggleMobileSidebar: () => void;
    onOpenSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onNavigate, onToggleMobileSidebar, onOpenSearch }) => {
    return (
        <header className="flex-shrink-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-20">
            <div className="flex items-center">
                 <button onClick={onToggleMobileSidebar} className="md:hidden mr-2 text-gray-500 hover:text-gray-700">
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <button onClick={onOpenSearch} className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
                    <SearchIcon className="w-5 h-5" />
                </button>
                <button onClick={() => onNavigate('notifications')} className="relative text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
                 <button onClick={() => onNavigate('settings')} className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 hidden sm:block">
                    {/* FIX: Replaced missing SettingsIcon with Cog6ToothIcon */}
                    <Cog6ToothIcon className="w-6 h-6" />
                </button>
                <div className="w-px h-6 bg-gray-200 hidden sm:block" />
                <button onClick={() => onNavigate('profile')} className="flex items-center gap-3">
                    <span className="text-sm font-semibold hidden sm:inline">{userProfile.fullName}</span>
                    <img src={userProfile.profilePicture} alt={userProfile.fullName} className="w-9 h-9 rounded-full"/>
                </button>
            </div>
        </header>
    );
};

export default Header;