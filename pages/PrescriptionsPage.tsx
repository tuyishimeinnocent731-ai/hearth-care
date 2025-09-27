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
      
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
          {MOCK_PRESCRIPTIONS.map(p => {
              const isRequested = requestedRefills.includes(p.id);
              return (
                  <div key={p.id} className="bg-white rounded-lg shadow-sm border p-4 space-y-3">
                      <div className="flex justify-between items-start">
                          <div>
                              <p className="font-bold text-gray-900">{p.medication}</p>
                              <p className="text-sm text-gray-500">{p.dosage}, {p.frequency}</p>
                          </div>
                          <span className={`flex-shrink-0 inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${p.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            <CheckCircleIcon className="w-3 h-3 mr-1.5"/>
                            {p.status}
                          </span>
                      </div>
                      <div className="text-sm text-gray-600">
                          <p><span className="font-medium">Muganga:</span> {p.doctorName}</p>
                          <p><span className="font-medium">Itariki:</span> {new Date(p.dateIssued).toLocaleDateString('rw-RW')}</p>
                      </div>
                      <div className="border-t pt-3">
                          {p.refillsLeft > 0 ? (
                              <button 
                                  onClick={() => handleRequestRefill(p.id)}
                                  disabled={isRequested}
                                  className="w-full font-medium text-blue-600 flex items-center justify-center py-2 rounded-lg bg-blue-50 hover:bg-blue-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50"
                              >
                                  <RefreshCwIcon className={`w-4 h-4 mr-1.5 ${isRequested ? 'animate-spin' : ''}`}/>
                                  {isRequested ? 'Byasabwe...' : `Ongeresha (${p.refillsLeft} ${p.refillsLeft > 1 ? 'bisigaye' : 'hasigaye'})`}
                              </button>
                          ) : (
                                  <p className="text-sm text-center text-gray-500">Nta kongeresha gusigaye</p>
                          )}
                      </div>
                  </div>
              );
          })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Umuti</th>
                    <th scope="col" className="px-6 py-3">Muganga</th>
                    <th scope="col" className="px-6 py-3">Itariki</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3 text-right">Igikorwa</th>
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
                                <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${p.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    <CheckCircleIcon className="w-3 h-3 mr-1"/>
                                    {p.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                            {p.refillsLeft > 0 ? (
                                    <button 
                                        onClick={() => handleRequestRefill(p.id)}
                                        disabled={isRequested}
                                        className="font-medium text-blue-600 hover:underline flex items-center justify-end w-full disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
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