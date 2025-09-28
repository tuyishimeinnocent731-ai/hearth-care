import React from 'react';
import type { Appointment, Page } from '../types';
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon, StethoscopeIcon, FileTextIcon } from '../components/IconComponents';

interface AppointmentSummaryPageProps {
    appointment: Appointment | null;
    onNavigate: (page: Page) => void;
    onShowToast: (message: string) => void;
}

const AppointmentSummaryPage: React.FC<AppointmentSummaryPageProps> = ({ appointment, onNavigate, onShowToast }) => {
    if (!appointment) {
        return (
            <div className="p-8 text-center">
                <p>Nta gahunda yatoranijwe.</p>
                <button onClick={() => onNavigate('appointments')} className="text-blue-600 hover:underline mt-2">Subira kuri gahunda zanjye</button>
            </div>
        );
    }
    
    return (
        <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-full">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => onNavigate('appointments')} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    Subira kuri Gahunda Zose
                </button>

                 <div className="bg-white rounded-xl shadow-md border border-gray-200">
                    <div className="p-6 border-b">
                        <p className="text-sm text-blue-600 font-semibold">{appointment.specialty}</p>
                        <h1 className="text-2xl font-bold text-gray-800 mt-1">Incamake ya Gahunda na {appointment.doctorName}</h1>
                        <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-x-4 gap-y-1">
                            <span className="flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-1.5"/> {new Date(appointment.date).toLocaleDateString('rw-RW', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1.5"/> {new Date(appointment.date).toLocaleTimeString('rw-RW', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                     <div className="p-6">
                         <h2 className="font-bold text-lg flex items-center mb-3"><FileTextIcon className="w-5 h-5 mr-2 text-blue-600"/> Inyandiko za Muganga</h2>
                         <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border">
                            {appointment.summaryNotes || "Nta nyandiko z'inyongera zihari kuri iyi gahunda."}
                         </div>
                     </div>
                     <div className="p-6 bg-gray-50/50 border-t flex justify-end">
                          <button 
                            onClick={() => onShowToast("Incamake yoherejwe kuri email yawe!")}
                            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700"
                        >
                            Ohereza kuri Email
                        </button>
                     </div>
                 </div>
            </div>
        </div>
    )
};

export default AppointmentSummaryPage;
