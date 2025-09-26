import React from 'react';
import type { Page, UserProfile } from '../types';
import { MOCK_HEALTH_GOALS, MOCK_HEALTH_METRICS } from '../mockData';
import { ArrowUpRightIcon } from '../components/IconComponents';

const HealthDashboardPage: React.FC<{ userProfile: UserProfile, onNavigate: (page: Page) => void }> = ({ userProfile, onNavigate }) => {
    return (
        <div className="p-6 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Murakaza neza, {userProfile.fullName.split(' ')[0]}!</h1>
                <p className="mt-2 text-lg text-gray-600">Dore uko ubuzima bwawe buhagaze uyu munsi.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {MOCK_HEALTH_METRICS.map(metric => (
                    <div key={metric.id} className="bg-white p-5 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-600">{metric.name}</h3>
                            <metric.icon className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value} <span className="text-base font-medium text-gray-500">{metric.unit}</span></p>
                        <p className="text-xs text-gray-500 mt-1">Intego: {metric.target}</p>
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
                     <h3 className="font-bold text-lg text-gray-800 mb-4">Intego Z'ubuzima</h3>
                     <div className="space-y-4">
                        {MOCK_HEALTH_GOALS.map(goal => (
                             <div key={goal.id}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700 flex items-center"><goal.icon className="w-4 h-4 mr-2" /> {goal.name}</span>
                                    <span className="text-gray-500">{goal.target}</span>
                                </div>
                                <div className={`w-full bg-gray-200 rounded-full h-2`}>
                                    <div className={`bg-blue-600 h-2 rounded-full`} style={{width: `${goal.progress}%`}}></div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
                <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-xl">Ukeneye Ubufasha?</h3>
                        <p className="text-blue-100 mt-2 text-sm">Vugana na muganga ubu, cyangwa ufate indi gahunda.</p>
                    </div>
                     <button onClick={() => onNavigate('doctor-selection')} className="mt-4 w-full bg-white text-blue-600 font-bold py-2.5 px-4 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors">
                        Tangira Ubujyanama <ArrowUpRightIcon className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HealthDashboardPage;
