import React from 'react';
import type { UserProfile, Page } from '../types';
import { BellIcon, SearchIcon, SettingsIcon } from './IconComponents';

interface HeaderProps {
    userProfile: UserProfile;
    onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onNavigate }) => {
    return (
        <header className="flex-shrink-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20">
            <div className="flex items-center">
                {/* This could be a search bar or page title */}
            </div>
            <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:text-gray-700">
                    <SearchIcon className="w-5 h-5" />
                </button>
                <button onClick={() => onNavigate('notifications')} className="relative text-gray-500 hover:text-gray-700">
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
                 <button onClick={() => onNavigate('settings')} className="text-gray-500 hover:text-gray-700">
                    <SettingsIcon className="w-6 h-6" />
                </button>
                <div className="w-px h-6 bg-gray-200" />
                <button onClick={() => onNavigate('profile')} className="flex items-center gap-3">
                    <span className="text-sm font-semibold hidden sm:inline">{userProfile.fullName}</span>
                    <img src={userProfile.profilePicture} alt={userProfile.fullName} className="w-9 h-9 rounded-full"/>
                </button>
            </div>
        </header>
    );
};

export default Header;
