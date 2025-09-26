
import React, { useState } from 'react';
import type { Doctor } from '../types';
import { DOCTORS } from '../constants';
import DoctorCard from './DoctorCard';
import DoctorProfileModal from './DoctorProfileModal';

interface DoctorSelectionProps {
  onSelectDoctor: (doctor: Doctor) => void;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({ onSelectDoctor }) => {
    const [selectedDoctorProfile, setSelectedDoctorProfile] = useState<Doctor | null>(null);

    return (
        <div className="p-6 md:p-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Hitamo Muganga</h1>
                <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">Hitamo mu baganga b'inzobere bemewe bahari kugira ngo bagufashe.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DOCTORS.map(doctor => (
                    <DoctorCard 
                        key={doctor.id} 
                        doctor={doctor} 
                        onStartConsultation={() => onSelectDoctor(doctor)}
                        onViewProfile={() => setSelectedDoctorProfile(doctor)}
                    />
                ))}
            </div>

            {selectedDoctorProfile && (
                <DoctorProfileModal 
                    doctor={selectedDoctorProfile} 
                    onClose={() => setSelectedDoctorProfile(null)}
                    onStartConsultation={() => {
                        onSelectDoctor(selectedDoctorProfile);
                        setSelectedDoctorProfile(null);
                    }}
                />
            )}
        </div>
    );
};

export default DoctorSelection;
