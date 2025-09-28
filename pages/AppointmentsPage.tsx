import React, { useState } from 'react';
// FIX: Replaced missing icons with available ones
import { CalendarDaysIcon, ClockIcon, VideoIcon, ChatBubbleLeftEllipsisIcon, PlusIcon, AlertTriangleIcon, XIcon } from '../components/IconComponents';
import type { Appointment, Page } from '../types';

interface AppointmentsPageProps {
    appointments: Appointment[];
    onNavigate: (page: Page) => void;
    onCancelAppointment: (appointmentId: number) => void;
    onViewSummary: (appointment: Appointment) => void;
    onJoinCall: (appointment: Appointment) => void;
}

const ConfirmationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-in fade-in-0 zoom-in-95">
                <div className="flex items-start">
                    <div className="p-3 bg-red-100 rounded-full mr-4">
                        <AlertTriangleIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-500 mt-2">{message}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Oya, Reka</button>
                    <button onClick={onConfirm} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Yego, Hagarika</button>
                </div>
            </div>
        </div>
    );
};


const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ appointments, onNavigate, onCancelAppointment, onViewSummary, onJoinCall }) => {
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);

    const openCancelModal = (appointment: Appointment) => {
        setAppointmentToCancel(appointment);
        setIsCancelModalOpen(true);
    };

    const handleConfirmCancel = () => {
        if (appointmentToCancel) {
            onCancelAppointment(appointmentToCancel.id);
        }
        setIsCancelModalOpen(false);
        setAppointmentToCancel(null);
    };

    const upcomingAppointments = appointments.filter(a => a.status === 'Upcoming');
    const pastAppointments = appointments.filter(a => a.status !== 'Upcoming');

    const getStatusChip = (status: Appointment['status']) => {
        switch (status) {
            case 'Completed': return <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800">Byarangiye</span>;
            case 'Cancelled': return <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-800">Byahagaritswe</span>;
            default: return null;
        }
    }


  return (
    <>
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Gahunda Zanjye</h1>
            <p className="mt-2 text-lg text-gray-600">Reba kandi ucunge gahunda zawe ziteganyijwe n'izabaye.</p>
        </div>
        <button 
            onClick={() => onNavigate('schedule-appointment')}
            className="mt-4 md:mt-0 flex items-center px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            {/* FIX: Replaced PlusCircleIcon with PlusIcon */}
            <PlusIcon className="w-5 h-5 mr-2"/>
            Fata Gahunda Nshya
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4">Gahunda Ziteganyijwe</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map(appt => (
                <div key={appt.id} className="bg-white rounded-lg shadow-sm border p-4 flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex-1">
                        <p className="font-bold text-lg text-gray-900">{appt.doctorName}</p>
                        <p className="text-sm text-blue-600">{appt.specialty}</p>
                        <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-x-4 gap-y-1">
                            {/* FIX: Replaced CalendarIcon with CalendarDaysIcon */}
                            <span className="flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-1.5"/> {new Date(appt.date).toLocaleDateString('rw-RW', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1.5"/> {new Date(appt.date).toLocaleTimeString('rw-RW', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto flex flex-col sm:items-end gap-2">
                        <span className={`flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${appt.type === 'Video Call' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                            {/* FIX: Replaced MessageSquareIcon with ChatBubbleLeftEllipsisIcon */}
                            {appt.type === 'Video Call' ? <VideoIcon className="w-3 h-3 mr-1"/> : <ChatBubbleLeftEllipsisIcon className="w-3 h-3 mr-1" />}
                            {appt.type}
                        </span>
                        <div className="flex gap-2 w-full sm:w-auto mt-2">
                            <button onClick={() => openCancelModal(appt)} className="text-sm bg-red-50 text-red-700 py-2 px-4 rounded-lg hover:bg-red-100 w-full sm:w-auto">Hagarika</button>
                            <button onClick={() => onJoinCall(appt)} className="text-sm bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full sm:w-auto">Injira</button>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <CalendarDaysIcon className="w-12 h-12 text-gray-300 mx-auto"/>
                <p className="text-gray-500 mt-2">Nta gahunda nshya ziteganyijwe.</p>
            </div>
          )}
        </div>
        
        <div>
            <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4">Gahunda Zabaye</h2>
             {pastAppointments.length > 0 ? (
                <div className="space-y-4">
                {pastAppointments.map(appt => (
                    <div key={appt.id} className="bg-white rounded-lg p-4 border">
                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                             <div>
                                <p className="font-bold text-gray-800">{appt.doctorName}</p>
                                <p className="text-sm text-gray-500">{new Date(appt.date).toLocaleDateString('rw-RW', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                {getStatusChip(appt.status)}
                                {appt.status === 'Completed' && (
                                    <button onClick={() => onViewSummary(appt)} className="text-sm text-blue-600 hover:underline">Reba Incamake</button>
                                )}
                            </div>
                         </div>
                    </div>
                ))}
                </div>
            ) : (
                <p className="text-gray-500">Nta gahunda zabaye zirahari.</p>
            )}
        </div>

      </div>
    </div>
    <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Hagarika Gahunda"
        message={`Urifuza koko guhagarika gahunda yawe na ${appointmentToCancel?.doctorName}? Iki gikorwa ntigisubirwaho.`}
     />
    </>
  );
};

export default AppointmentsPage;