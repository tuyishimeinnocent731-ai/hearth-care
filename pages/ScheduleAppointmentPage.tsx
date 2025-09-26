import React, { useState } from 'react';
import type { Doctor, Appointment } from '../types';
import { CalendarIcon, ClockIcon, VideoIcon, MessageSquareIcon } from '../components/IconComponents';

interface ScheduleAppointmentPageProps {
    doctors: Doctor[];
    onSchedule: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
    onCancel: () => void;
}

const ScheduleAppointmentPage: React.FC<ScheduleAppointmentPageProps> = ({ doctors, onSchedule, onCancel }) => {
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(doctors[0]?.id || null);
    const [appointmentDate, setAppointmentDate] = useState(new Date().toISOString().split('T')[0]);
    const [appointmentTime, setAppointmentTime] = useState('09:00');
    const [appointmentType, setAppointmentType] = useState<'Video Call' | 'Chat'>('Chat');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDoctorId) return;

        const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);
        if (!selectedDoctor) return;

        onSchedule({
            doctorName: selectedDoctor.name,
            specialty: selectedDoctor.specialty,
            date: `${appointmentDate}T${appointmentTime}:00`,
            type: appointmentType,
        });
    };

    return (
        <div className="p-6 md:p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
                 <h1 className="text-3xl font-bold text-gray-800">Fata Gahunda nshya</h1>
                 <p className="mt-2 text-lg text-gray-600">Hitamo muganga n'igihe kikunogeye.</p>
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md border space-y-6">
                 <div>
                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">Hitamo Muganga</label>
                    <select
                        id="doctor"
                        value={selectedDoctorId || ''}
                        onChange={(e) => setSelectedDoctorId(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {doctors.filter(d => d.available).map(doc => (
                            <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Hitamo Itariki</label>
                        <div className="relative">
                            <input
                                type="date"
                                id="date"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                        </div>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Hitamo Isaha</label>
                         <div className="relative">
                            <input
                                type="time"
                                id="time"
                                value={appointmentTime}
                                onChange={(e) => setAppointmentTime(e.target.value)}
                                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ClockIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                        </div>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hitamo Uburyo bw'Ubujyanama</label>
                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" onClick={() => setAppointmentType('Chat')} className={`p-4 border rounded-lg flex flex-col items-center justify-center ${appointmentType === 'Chat' ? 'border-blue-600 ring-2 ring-blue-500 bg-blue-50' : 'hover:border-gray-400'}`}>
                            <MessageSquareIcon className="w-8 h-8 text-purple-600 mb-2"/>
                            <span className="font-semibold">Ikiganiro</span>
                        </button>
                        <button type="button" onClick={() => setAppointmentType('Video Call')} className={`p-4 border rounded-lg flex flex-col items-center justify-center ${appointmentType === 'Video Call' ? 'border-blue-600 ring-2 ring-blue-500 bg-blue-50' : 'hover:border-gray-400'}`}>
                            <VideoIcon className="w-8 h-8 text-green-600 mb-2"/>
                             <span className="font-semibold">Video</span>
                        </button>
                    </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                    <button type="button" onClick={onCancel} className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Reka</button>
                    <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Emeza Gahunda</button>
                </div>
            </form>
        </div>
    );
};

export default ScheduleAppointmentPage;