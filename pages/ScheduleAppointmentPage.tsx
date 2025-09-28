import React, { useState } from 'react';
import type { Appointment, Doctor } from '../types';
// FIX: Replaced missing CalendarIcon with CalendarDaysIcon
import { CalendarDaysIcon, ClockIcon } from '../components/IconComponents';

interface ScheduleAppointmentPageProps {
  onSchedule: (appointment: Appointment) => void;
  doctors: Doctor[];
}

const ScheduleAppointmentPage: React.FC<ScheduleAppointmentPageProps> = ({ onSchedule, doctors }) => {
    const [step, setStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const handleSchedule = () => {
        if (!selectedDoctor || !selectedDate || !selectedTime) return;
        const newAppointment: Appointment = {
            id: Date.now(),
            doctorName: selectedDoctor.name,
            specialty: selectedDoctor.specialty,
            date: new Date(`${selectedDate}T${selectedTime}`).toISOString(),
            type: 'Video Call',
            status: 'Upcoming',
        };
        onSchedule(newAppointment);
    };

    return (
        <div className="p-6 md:p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Fata Gahunda nshya</h1>
            <p className="text-lg text-gray-600 mb-8">Hitamo muganga, itariki, n'isaha bikunogeye.</p>

            <div className="bg-white p-8 rounded-xl shadow-md border">
                {step === 1 && (
                    <div>
                        <h2 className="font-bold text-xl mb-4">Intambwe ya 1: Hitamo Muganga</h2>
                        <div className="space-y-3">
                            {doctors.filter(d => d.available).map(doc => (
                                <div key={doc.id} onClick={() => { setSelectedDoctor(doc); setStep(2); }}
                                    className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-400">
                                    <img src={doc.imageUrl} alt={doc.name} className="w-12 h-12 rounded-full" />
                                    <div className="ml-4">
                                        <p className="font-bold">{doc.name}</p>
                                        <p className="text-sm text-blue-600">{doc.specialty}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {step === 2 && selectedDoctor && (
                     <div>
                        <div className="flex justify-between items-center mb-6">
                             <h2 className="font-bold text-xl">Intambwe ya 2: Hitamo Igihe</h2>
                             <button onClick={() => setStep(1)} className="text-sm font-medium text-gray-600 hover:text-black">&larr; Subira inyuma</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                {/* FIX: Replaced missing CalendarIcon with CalendarDaysIcon */}
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-2"/> Itariki</label>
                                <input type="date" id="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
                                    className="w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1 flex items-center"><ClockIcon className="w-4 h-4 mr-2"/> Isaha</label>
                                <input type="time" id="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)}
                                    className="w-full p-2 border rounded-md" />
                            </div>
                        </div>
                         <button onClick={handleSchedule} disabled={!selectedDate || !selectedTime}
                            className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-300">
                            Emeza Gahunda
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleAppointmentPage;