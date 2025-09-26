import React from 'react';
import type { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorSelectionProps {
  doctors: Doctor[];
  onSelect: (doctor: Doctor) => void;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({ doctors, onSelect }) => {
  return (
    <div className="p-6 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Ubujyanama Bwo Kuri Murandasi</h1>
        <p className="mt-2 text-lg text-gray-600">Hitamo inzobere kugira ngo utangire ubujyanama bwawe.</p>
      </div>
      {doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} onSelect={onSelect} />
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
            <p className="text-gray-600">Nta baganga babonetse bahuye n'ishakisha ryawe.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorSelection;