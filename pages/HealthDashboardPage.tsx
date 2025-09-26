import React from 'react';
import { HeartPulseIcon, CheckCircleIcon, ClockIcon } from '../components/IconComponents';

const MetricCard = ({ title, value, unit, icon, colorClass }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center">
            <div className={`p-3 rounded-full ${colorClass.bg}`}>
                {React.cloneElement(icon, { className: `w-6 h-6 ${colorClass.text}` })}
            </div>
            <div className="ml-4">
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">
                    {value} <span className="text-base font-medium text-gray-600">{unit}</span>
                </p>
            </div>
        </div>
    </div>
);


const HealthDashboardPage: React.FC = () => {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Imbonerahamwe y'Ubuzima</h1>
        <p className="mt-2 text-lg text-gray-600">Kurikirana ibipimo by'ubuzima bwawe n'intego zawe.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Guteragura k'umutima" value="72" unit="bpm" icon={<HeartPulseIcon/>} colorClass={{bg: 'bg-red-100', text: 'text-red-600'}}/>
        <MetricCard title="Umuvuduko w'amaraso" value="120/80" unit="mmHg" icon={<CheckCircleIcon/>} colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}}/>
        <MetricCard title="Igihe cyo kuryama" value="7.5" unit="hrs" icon={<ClockIcon/>} colorClass={{bg: 'bg-indigo-100', text: 'text-indigo-600'}}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-gray-800 mb-4">Intambwe z'icyumweru</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
                <div className="w-full text-center">
                    <div className="bg-blue-500 mx-auto rounded-t-md" style={{height: '60%'}}></div>
                    <p className="text-xs mt-1">L</p>
                </div>
                 <div className="w-full text-center">
                    <div className="bg-blue-500 mx-auto rounded-t-md" style={{height: '80%'}}></div>
                    <p className="text-xs mt-1">T</p>
                </div>
                 <div className="w-full text-center">
                    <div className="bg-blue-500 mx-auto rounded-t-md" style={{height: '75%'}}></div>
                    <p className="text-xs mt-1">W</p>
                </div>
                 <div className="w-full text-center">
                    <div className="bg-blue-200 mx-auto rounded-t-md" style={{height: '45%'}}></div>
                    <p className="text-xs mt-1">T</p>
                </div>
                 <div className="w-full text-center">
                    <div className="bg-blue-500 mx-auto rounded-t-md" style={{height: '90%'}}></div>
                    <p className="text-xs mt-1">F</p>
                </div>
                 <div className="w-full text-center">
                    <div className="bg-blue-200 mx-auto rounded-t-md" style={{height: '50%'}}></div>
                    <p className="text-xs mt-1">S</p>
                </div>
                 <div className="w-full text-center">
                    <div className="bg-blue-200 mx-auto rounded-t-md" style={{height: '65%'}}></div>
                    <p className="text-xs mt-1">S</p>
                </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-gray-800 mb-4">Intego Z'ubuzima</h3>
            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">Kunywa Amazi</span>
                        <span className="text-gray-500">6/8 Ibirahuri</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                </div>
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">Imyitozo ngororamubiri</span>
                        <span className="text-gray-500">3/5 Iminsi</span>
                    </div>
                    <div className="w-full bg-green-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                </div>
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">Kurya Imboga</span>
                        <span className="text-gray-500">4/7 Iminsi</span>
                    </div>
                    <div className="w-full bg-yellow-100 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{width: '57%'}}></div>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default HealthDashboardPage;
