import React, { useState, useEffect, useMemo } from 'react';
import type { Page, Appointment, Prescription, Doctor } from '../types';
import { DOCTORS } from '../constants';
import { SearchIcon, XIcon, CalendarDaysIcon, PillIcon, UserCircleIcon } from './IconComponents';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (page: Page) => void;
    appointments: Appointment[];
    prescriptions: Prescription[];
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate, appointments, prescriptions }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setQuery('');
        }
    }, [isOpen]);

    const searchResults = useMemo(() => {
        if (!query.trim()) {
            return { doctors: [], appointments: [], prescriptions: [] };
        }

        const lowerCaseQuery = query.toLowerCase();

        const filteredDoctors = DOCTORS.filter(doc =>
            doc.name.toLowerCase().includes(lowerCaseQuery) ||
            doc.specialty.toLowerCase().includes(lowerCaseQuery)
        );

        const filteredAppointments = appointments.filter(appt =>
            appt.doctorName.toLowerCase().includes(lowerCaseQuery) ||
            appt.specialty.toLowerCase().includes(lowerCaseQuery)
        );

        const filteredPrescriptions = prescriptions.filter(pres =>
            pres.medication.toLowerCase().includes(lowerCaseQuery) ||
            pres.doctorName.toLowerCase().includes(lowerCaseQuery)
        );

        return {
            doctors: filteredDoctors,
            appointments: filteredAppointments,
            prescriptions: filteredPrescriptions,
        };
    }, [query, appointments, prescriptions]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center p-4 pt-[10vh]" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-fit max-h-[80vh] flex flex-col animate-in fade-in-0 zoom-in-95" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Andika hano kugirango ushake..."
                            className="w-full p-2 pl-10 border-0 rounded-lg text-lg focus:ring-0"
                            autoFocus
                        />
                        <button onClick={onClose} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                           <XIcon className="h-5 w-5"/>
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {query.trim() === '' ? (
                         <p className="text-center text-gray-500 py-8">Tangira wandike kugirango ubone ibisubizo.</p>
                    ) : (
                        <div className="space-y-6">
                            {searchResults.doctors.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-sm text-gray-500 uppercase px-2 mb-2">Abaganga</h3>
                                    {searchResults.doctors.map(doc => (
                                        <div key={`doc-${doc.id}`} onClick={() => onNavigate('doctor-selection')} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                            <img src={doc.imageUrl} className="w-9 h-9 rounded-full" />
                                            <div>
                                               <p className="font-semibold text-gray-800">{doc.name}</p>
                                               <p className="text-sm text-gray-500">{doc.specialty}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                             {searchResults.appointments.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-sm text-gray-500 uppercase px-2 mb-2">Gahunda</h3>
                                    {searchResults.appointments.map(appt => (
                                        <div key={`appt-${appt.id}`} onClick={() => onNavigate('appointments')} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                            <CalendarDaysIcon className="w-6 h-6 text-blue-500"/>
                                            <div>
                                               <p className="font-semibold text-gray-800">Gahunda na {appt.doctorName}</p>
                                               <p className="text-sm text-gray-500">{new Date(appt.date).toLocaleDateString('rw-RW', {dateStyle: 'medium'})}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                             {searchResults.prescriptions.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-sm text-gray-500 uppercase px-2 mb-2">Imiti</h3>
                                     {searchResults.prescriptions.map(pres => (
                                        <div key={`pres-${pres.id}`} onClick={() => onNavigate('prescriptions')} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                            <PillIcon className="w-6 h-6 text-green-500"/>
                                            <div>
                                               <p className="font-semibold text-gray-800">{pres.medication}</p>
                                               <p className="text-sm text-gray-500">Yanditswe na {pres.doctorName}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {searchResults.doctors.length === 0 && searchResults.appointments.length === 0 && searchResults.prescriptions.length === 0 && (
                                <p className="text-center text-gray-500 py-8">Nta bisubizo bibonetse kuri "{query}".</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
