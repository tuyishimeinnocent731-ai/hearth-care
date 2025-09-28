import React, { useState, useEffect } from 'react';
import type { UserProfile, Appointment, Prescription, Page } from '../types';
import { generateHealthReport } from '../services/geminiService';
import Spinner from '../components/Spinner';
import { DocumentChartBarIcon, ArrowLeftIcon } from '../components/IconComponents';

interface HealthReportPageProps {
    userProfile: UserProfile;
    appointments: Appointment[];
    prescriptions: Prescription[];
    onNavigate: (page: Page) => void;
}

const HealthReportPage: React.FC<HealthReportPageProps> = ({ userProfile, appointments, prescriptions, onNavigate }) => {
    const [report, setReport] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            setIsLoading(true);
            try {
                const generatedReport = await generateHealthReport(userProfile, appointments, prescriptions);
                setReport(generatedReport);
            } catch (error) {
                console.error("Failed to generate health report:", error);
                setReport("Habaye ikibazo mu gukora raporo y'ubuzima. Mwongere mugerageze nyuma.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchReport();
    }, [userProfile, appointments, prescriptions]);

    const renderMarkdown = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.startsWith('### ')) {
                return <h3 key={index} className="text-lg font-bold text-gray-800 mt-4 mb-2">{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('**')) {
                return <p key={index} className="font-bold text-gray-700">{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.startsWith('- ')) {
                return <li key={index} className="ml-5 text-gray-600 list-disc">{line.replace('- ', '')}</li>;
            }
            if (line.trim() === '') {
                return <br key={index} />;
            }
            return <p key={index} className="text-gray-600 mb-2">{line}</p>;
        });
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-full">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => onNavigate('dashboard')} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Subira ku Imbonerahamwe
                </button>

                <div className="bg-white rounded-xl shadow-md border border-gray-200">
                    <div className="p-6 border-b flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                           <DocumentChartBarIcon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                           <h1 className="text-2xl font-bold text-gray-800">Rapo y'Ubuzima Bwawe</h1>
                           <p className="text-gray-500">Isesengura ry'amakuru yawe y'ubuzima.</p>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="text-center">
                                    <Spinner />
                                    <p className="mt-2 text-gray-500">Turimo gutegura raporo yawe...</p>
                                </div>
                            </div>
                        ) : (
                            <div className="prose prose-sm max-w-none">
                                {renderMarkdown(report)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthReportPage;
