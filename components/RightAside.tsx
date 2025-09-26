import React from 'react';
import { CalendarIcon, UserIcon, HeartPulseIcon } from './IconComponents';

const RightAside: React.FC = () => {
  return (
    <aside className="hidden lg:block w-80 bg-gray-50 p-6 border-l border-gray-200 overflow-y-auto">
      <div className="space-y-8">
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Gahunda Ziteganyijwe</h3>
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                        <CalendarIcon className="w-5 h-5 text-blue-600"/>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Dr. Samuel Chen</p>
                        <p className="text-xs text-gray-500">Uyu munsi, 3:00 PM</p>
                    </div>
                </div>
                 <button className="mt-2 w-full text-xs bg-blue-50 text-blue-700 py-1.5 rounded-md hover:bg-blue-100">Reba Ibindi</button>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                     <div className="p-2 bg-red-100 rounded-full">
                        <CalendarIcon className="w-5 h-5 text-red-600"/>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">Dr. Evelyn Reed</p>
                        <p className="text-xs text-gray-500">Nyakanga 28, 10:30 AM</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-gray-800 mb-4">Ibipimo by'Ubuzima</h3>
           <div className="grid grid-cols-2 gap-4">
               <div className="bg-white p-3 rounded-lg text-center border">
                   <p className="text-xs text-gray-500">Umuterere w'Umutima</p>
                   <p className="text-lg font-bold text-red-500">72 <span className="text-sm font-normal">bpm</span></p>
               </div>
                <div className="bg-white p-3 rounded-lg text-center border">
                   <p className="text-xs text-gray-500">Umuvuduko w'Amaraso</p>
                   <p className="text-lg font-bold text-blue-600">120/80</p>
               </div>
           </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-4">Ibikorwa Biheruka</h3>
          <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <HeartPulseIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-600">
                      Imiti yawe ya <span className="font-semibold">Allergy</span> yongeye gutangwa.
                  </p>
              </li>
              <li className="flex items-start space-x-3">
                   <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="text-xs text-gray-600">
                      Ubutumwa bushya buvuye kwa <span className="font-semibold">Dr. Isabella Monroe</span>.
                  </p>
              </li>
          </ul>
        </div>

      </div>
    </aside>
  );
};

export default RightAside;