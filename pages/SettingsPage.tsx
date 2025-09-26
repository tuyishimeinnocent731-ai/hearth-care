import React from 'react';
import { UserCircleIcon, BellIcon, ShieldCheckIcon } from '../components/IconComponents';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Igenamiterere</h1>
        <p className="mt-2 text-lg text-gray-600">Cunga umwirondoro wawe, amatangazo, n'umutekano.</p>
      </div>

      <div className="space-y-8">
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <UserCircleIcon className="w-6 h-6 mr-2 text-blue-600"/> Umwirondoro
            </h2>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Amazina Yombi</label>
                        <input type="text" id="fullName" defaultValue="K. Nkurunziza" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"/>
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" defaultValue="nkurunziza.k@example.com" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"/>
                    </div>
                </div>
                 <div className="text-right">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Bika Impinduka</button>
                 </div>
            </form>
        </div>

        {/* Notifications Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BellIcon className="w-6 h-6 mr-2 text-green-600"/> Amatangazo
            </h2>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-gray-700">Ibyibutswa bya gahunda</p>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer"/>
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                 <div className="flex items-center justify-between">
                    <p className="text-gray-700">Ubutumwa bushya</p>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer"/>
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
