import React from 'react';
// FIX: The `Page` type is exported from `types.ts`, not `App.tsx`. Updated the import path.
import type { Page } from '../types';
import { CalendarIcon, UserIcon, HeartPulseIcon, PillIcon, ClockIcon, CheckCircleIcon, PlusCircleIcon } from './IconComponents';

interface RightAsideProps {
    onNavigate: (page: Page) => void;
}

const RightAside: React.FC<RightAsideProps> = ({ onNavigate }) => {
  return (
    <aside className="hidden lg:block w-80 bg-gray-50 p-6 border-l border-gray-200 fixed top-0 right-0 h-screen overflow-y-auto">
       <div className="h-16 flex items-center">
        <h2 className="font-bold text-lg text-gray-800">Ibikorwa & Ibyibutswa</h2>
       </div>
      <div className="space-y-8">
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Gahunda Ziteganyijwe</h3>
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 transition-shadow hover:shadow-md cursor-pointer" onClick={() => onNavigate('appointments')}>
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                        <CalendarIcon className="w-5 h-5 text-blue-600"/>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Dr. Samuel Chen</p>
                        <p className="text-xs text-gray-500">Uyu munsi, 3:00 PM</p>
                    </div>
                </div>
                 <button className="mt-2 w-full text-xs bg-blue-50 text-blue-700 py-1.5 rounded-md hover:bg-blue-100 transition-colors">Reba Ibindi</button>
            </div>
          </div>
        </div>
        
        <div className="cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <h3 className="font-bold text-gray-800 mb-4">Intego Z'ubuzima</h3>
            <div className="space-y-3">
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">Kunywa Amazi</span>
                        <span className="text-gray-500">6/8 Ibirahuri</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '75%'}}></div>
                    </div>
                </div>
                 <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">Intambwe</span>
                        <span className="text-gray-500">4,521/10,000</span>
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{width: '45%'}}></div>
                    </div>
                </div>
            </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-4">Ibyo Kwibukwa ku miti</h3>
          <div className="space-y-3">
            <div className="flex items-center bg-white p-3 rounded-lg border cursor-pointer hover:border-blue-400" onClick={() => onNavigate('prescriptions')}>
                <div className="p-2 bg-red-100 rounded-full"><PillIcon className="w-5 h-5 text-red-500"/></div>
                <div className="ml-3 flex-1">
                    <p className="text-sm font-semibold">Amoxicillin</p>
                    <p className="text-xs text-gray-500">Ibiri isigaye - 8:00 AM</p>
                </div>
                <ClockIcon className="w-4 h-4 text-gray-400"/>
            </div>
            <div className="flex items-center bg-white p-3 rounded-lg border opacity-60">
                <div className="p-2 bg-green-100 rounded-full"><CheckCircleIcon className="w-5 h-5 text-green-500"/></div>
                <div className="ml-3 flex-1">
                    <p className="text-sm font-semibold">Ibuprofen</p>
                    <p className="text-xs text-gray-500">Byakozwe - 9:00 PM ejo</p>
                </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Ibikorwa byihuse</h3>
           <div className="grid grid-cols-2 gap-3">
               <button onClick={() => onNavigate('appointments')} className="flex flex-col items-center justify-center bg-white p-3 rounded-lg text-center border hover:bg-gray-50 hover:border-blue-400 transition-colors duration-200">
                   <PlusCircleIcon className="w-6 h-6 text-blue-600 mb-1"/>
                   <p className="text-xs font-semibold text-gray-700">Gufata Gahunda</p>
               </button>
                <button onClick={() => onNavigate('prescriptions')} className="flex flex-col items-center justify-center bg-white p-3 rounded-lg text-center border hover:bg-gray-50 hover:border-green-400 transition-colors duration-200">
                   <PillIcon className="w-6 h-6 text-green-600 mb-1"/>
                   <p className="text-xs font-semibold text-gray-700">Kongeresha Imiti</p>
               </button>
           </div>
        </div>

      </div>
    </aside>
  );
};

export default RightAside;