

import React, { useState, useEffect } from 'react';
import type { Doctor, Message } from '../types';
import Spinner from './Spinner';
import { generateConsultationSummary } from '../services/geminiService';
import { FileTextIcon } from './IconComponents';

interface ConsultationSummaryProps {
  doctor: Doctor | null;
  chatHistory: Message[];
  onStartNewConsultation: () => void;
  onShowToast: (message: string) => void;
}

const ConsultationSummary: React.FC<ConsultationSummaryProps> = ({ doctor, chatHistory, onStartNewConsultation, onShowToast }) => {
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (doctor) {
            generateConsultationSummary(chatHistory, doctor)
                .then(setSummary)
                .finally(() => setIsLoading(false));
        }
    }, [chatHistory, doctor]);

    if (!doctor) return null;

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Incamake y'Ubujyanama</h1>
            <p className="mt-2 text-lg text-gray-600">Hano hari incamake y'ikiganiro cyawe na Dr. {doctor.name}.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center pb-4 border-b mb-4">
                <img src={doctor.imageUrl} alt={doctor.name} className="w-14 h-14 rounded-full"/>
                <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-800">Dr. {doctor.name}</h2>
                    <p className="text-sm text-blue-600">{doctor.specialty}</p>
                </div>
            </div>
             <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center"><FileTextIcon className="w-5 h-5 mr-2 text-blue-600"/> Incamake Ya Maneko</h3>
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spinner />
                    </div>
                ) : (
                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                        {summary.split('\n').map((line, index) => {
                             if (line.match(/^\*\*.*\*\*$/)) {
                                // FIX: Property 'replaceAll' does not exist on type 'string'. Using replace with a global regex for compatibility.
                                return <h4 key={index} className="font-bold mt-3">{line.replace(/\*\*/g, '')}</h4>
                            }
                            if (line.trim() === '') return null;
                            return <p key={index}>{line}</p>
                        })}
                    </div>
                )}
             </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                onClick={onStartNewConsultation}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Gisha Inama Nshya
            </button>
             <button 
                onClick={() => onShowToast("Incamake yoherejwe kuri email yawe!")}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg border hover:bg-gray-200"
            >
                Ohereza kuri Email
            </button>
        </div>
    </div>
  );
};

export default ConsultationSummary;