import React, { useState, useEffect } from 'react';
import type { Prescription, Page, UserProfile } from '../types';
import { analyzePrescriptions } from '../services/geminiService';
import Spinner from '../components/Spinner';
import { PillIcon, ArrowLeftIcon, InformationCircleIcon } from '../components/IconComponents';

interface PrescriptionAnalysisPageProps {
    userProfile: UserProfile;
    prescriptions: Prescription[];
    onNavigate: (page: Page) => void;
}

const PrescriptionAnalysisPage: React.FC<PrescriptionAnalysisPageProps> = ({ userProfile, prescriptions, onNavigate }) => {
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            setIsLoading(true);
            try {
                const activePrescriptions = prescriptions.filter(p => p.status === 'Active');
                if (activePrescriptions.length === 0) {
                    setAnalysis("Nta miti ikoreshwa washyizemo kugirango isesengurwe.");
                    return;
                }
                const generatedAnalysis = await analyzePrescriptions(activePrescriptions);
                setAnalysis(generatedAnalysis);
            } catch (error) {
                console.error("Failed to analyze prescriptions:", error);
                setAnalysis("Habaye ikibazo mu gusesengura imiti yawe. Mwongere mugerageze nyuma.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalysis();
    }, [prescriptions]);

    const renderMarkdown = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.startsWith('### ')) {
                 const title = line.replace('### ', '').replace(/\*\*/g, '').replace(/_/g, ' ');
                if (title === 'ICYITONDERWA CY\'INGENZI') {
                     return (
                        <div key={index} className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
                           <h3 className="font-bold">{title}</h3>
                           <p className="text-sm mt-1">{text.split(line)[1]}</p>
                        </div>
                     )
                }
                if(text.includes('ICYITONDERWA CY\'INGENZI') && text.split('ICYITONDERWA CY\'INGENZI')[1].includes(line)) return null;

                return <h3 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-2 flex items-center"><PillIcon className="w-5 h-5 mr-2 text-blue-500"/>{title}</h3>;
            }
             if (line.startsWith('#### ')) {
                return <h4 key={index} className="text-md font-bold text-gray-700 mt-4 mb-1">{line.replace('#### ', '')}</h4>;
            }
            if (line.startsWith('**')) {
                return <p key={index} className="font-semibold text-gray-700 my-1">{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.startsWith('- ')) {
                return <li key={index} className="ml-5 text-gray-600 ">{line.replace('- ', '')}</li>;
            }
            if (line.trim() === '' || line.includes('ICYITONDERWA CY\'INGENZI')) {
                return null;
            }
            return <p key={index} className="text-gray-600 mb-2 leading-relaxed">{line}</p>;
        });
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-full">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => onNavigate('prescriptions')} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Subira ku Imiti
                </button>

                <div className="bg-white rounded-xl shadow-md border border-gray-200">
                    <div className="p-6 border-b flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                           <InformationCircleIcon className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                           <h1 className="text-2xl font-bold text-gray-800">Isesengura ry'Imiti</h1>
                           <p className="text-gray-500">Sobanukirwa imiti yawe neza.</p>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="text-center">
                                    <Spinner />
                                    <p className="mt-2 text-gray-500">Turimo gusesengura imiti yawe...</p>
                                </div>
                            </div>
                        ) : (
                            <div className="prose prose-sm max-w-none">
                                {renderMarkdown(analysis)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionAnalysisPage;
