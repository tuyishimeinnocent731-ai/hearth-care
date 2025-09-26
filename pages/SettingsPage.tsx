import React, { useState } from 'react';
import { BellIcon, ShieldCheckIcon } from '../components/IconComponents';
import type { Page } from '../App';

interface ToggleSwitchProps {
    id: string;
    label: string;
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, label, enabled, setEnabled }) => {
    return (
        <div className="flex items-center justify-between">
            <label htmlFor={id} className="font-medium text-gray-700">{label}</label>
            <button
                id={id}
                onClick={() => setEnabled(!enabled)}
                className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
                <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
            </button>
        </div>
    );
};

interface SettingsPageProps {
    onNavigate: (page: Page) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: true,
    });

    const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
        setNotifications(prev => ({ ...prev, [key]: value }));
    };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Igenamiterere</h1>
      <div className="space-y-12">
        {/* Link to Profile Page */}
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 text-sm">
            <p>Kugira ngo uhindure amakuru yawe bwite nk'izina, imeri, cyangwa ifoto, <a href="#" onClick={(e) => {e.preventDefault(); onNavigate('profile')}} className="font-bold underline hover:text-blue-600">kanda hano</a> ujye ku rupapuro rw'umwirondoro wawe.</p>
        </div>

        {/* Notifications Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mb-6 flex items-center">
            <BellIcon className="w-6 h-6 mr-3 text-blue-600" />
            Amatangazo
          </h2>
          <div className="space-y-4">
            <ToggleSwitch id="email" label="Amatangazo kuri Email" enabled={notifications.email} setEnabled={(val) => handleNotificationChange('email', val)} />
            <ToggleSwitch id="push" label="Amatangazo kuri Terefone (Push)" enabled={notifications.push} setEnabled={(val) => handleNotificationChange('push', val)} />
            <ToggleSwitch id="sms" label="Amatangazo kuri SMS" enabled={notifications.sms} setEnabled={(val) => handleNotificationChange('sms', val)} />
          </div>
        </section>

        {/* Security Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mb-6 flex items-center">
            <ShieldCheckIcon className="w-6 h-6 mr-3 text-blue-600" />
            Umutekano
          </h2>
           <div className="space-y-4">
               <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Ijambobanga Rishya</label>
                  <input type="password" id="currentPassword" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5" />
               </div>
               <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Emeza Ijambobanga Rishya</label>
                  <input type="password" id="newPassword" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5" />
               </div>
               <button className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">Hindura Ijambobanga</button>
           </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;