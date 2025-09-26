import React, { useState } from 'react';
import { MOCK_PRESCRIPTIONS } from '../mockData';
import { PillIcon, RefreshCwIcon, CheckCircleIcon } from '../components/IconComponents';

const PrescriptionsPage: React.FC = () => {
    const [requestedRefills, setRequestedRefills] = useState<number[]>([]);

    const handleRequestRefill = (id: number) => {
        setRequestedRefills(prev => [...prev, id]);
        // Here you would typically make an API call
    };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Imiti Wandikiwe</h1>
        <p className="mt-2 text-lg text-gray-600">Reba urutonde rw'imiti wandikiwe n'abaganga.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Umuti</th>
                    <th scope="col" className="px-6 py-3">Muganga</th>
                    <th scope="col" className="px-6 py-3">Itariki</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody>
                {MOCK_PRESCRIPTIONS.map(p => {
                    const isRequested = requestedRefills.includes(p.id);
                    return (
                        <tr key={p.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">
                                {p.medication}
                                <p className="font-normal text-gray-500 text-xs">{p.dosage}, {p.frequency}</p>
                            </td>
                            <td className="px-6 py-4">{p.doctorName}</td>
                            <td className="px-6 py-4">{new Date(p.dateIssued).toLocaleDateString('rw-RW')}</td>
                            <td className="px-6 py-4">
                                <span className={`flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${p.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    <CheckCircleIcon className="w-3 h-3 mr-1"/>
                                    {p.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                            {p.refillsLeft > 0 ? (
                                    <button 
                                        onClick={() => handleRequestRefill(p.id)}
                                        disabled={isRequested}
                                        className="font-medium text-blue-600 hover:underline flex items-center disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
                                    >
                                        <RefreshCwIcon className={`w-3 h-3 mr-1.5 ${isRequested ? 'animate-spin' : ''}`}/>
                                        {isRequested ? 'Byasabwe...' : `Ongeresha (${p.refillsLeft})`}
                                    </button>
                            ) : (
                                    <span className="text-gray-400">Nta kongeresha gusigaye</span>
                            )}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrescriptionsPage;