// FIX: Create ConsultationSummary component
import React, { useState, useEffect } from 'react';
import type { Doctor, Message, ConsultationSummaryData } from '../types';
import { generateConsultationSummary } from '../services/geminiService';
import Spinner from './Spinner';
import { FileTextIcon } from './IconComponents';

interface ConsultationSummaryProps {
  doctor: Doctor | null;
  chatHistory: Message[];
  onStartNew: () => void;
}

const ConsultationSummary: React.FC<ConsultationSummaryProps> = ({ doctor, chatHistory, onStartNew }) => {
  const [summary, setSummary] = useState<ConsultationSummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!doctor || chatHistory.length <= 1) { // <=1 to account for initial system message
        setError("Nta makuru ahagije yo gukora incamake.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const summaryJsonString = await generateConsultationSummary(chatHistory, doctor);
        const summaryData: ConsultationSummaryData = JSON.parse(summaryJsonString);
        setSummary(summaryData);
      } catch (err) {
        setError("Habaye ikibazo mu gukora incamake. Gerageza wongere.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [chatHistory, doctor]);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <Spinner />
        <p className="mt-4 text-gray-600">Turi gutegura incamake y'ubujyanama bwawe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>{error}</p>
        <button onClick={onStartNew} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">Subira ahabanza</button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="text-center mb-8">
        <FileTextIcon className="w-12 h-12 mx-auto text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Incamake y'Ubujyanama</h1>
        <p className="mt-2 text-lg text-gray-600">Hano hari incamake y'ikiganiro wagiranye na Dr. {doctor?.name}.</p>
      </div>
      
      {summary && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Ibimenyetso Byavuzwe</h2>
            <p className="mt-2 text-gray-600">{summary.symptoms}</p>
          </div>
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-800">Isesengura ry'Ibanze</h2>
            <p className="mt-2 text-gray-600">{summary.diagnosis}</p>
          </div>
           <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-800">Imiti Wandikiwe</h2>
            {summary.prescription && summary.prescription.length > 0 ? (
                <ul className="mt-2 space-y-2 list-disc list-inside">
                    {summary.prescription.map((p, index) => (
                        <li key={index} className="text-gray-700">
                            <span className="font-semibold">{p.name}</span> ({p.dosage}, {p.frequency})
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-2 text-gray-600">Nta miti yanditswe.</p>
            )}
          </div>
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-800">Inama za Muganga</h2>
            <p className="mt-2 text-gray-600">{summary.advice}</p>
          </div>
        </div>
      )}

       <div className="mt-8 text-center">
            <button
                onClick={onStartNew}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Tangira Ubundi Bujyanama
            </button>
        </div>
    </div>
  );
};

export default ConsultationSummary;
