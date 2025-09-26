import React from 'react';
import type { Doctor } from '../types';
import { StarIcon } from './IconComponents';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onSelect }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:bg-white border border-gray-200">
      <div className="flex items-start space-x-5">
        <img
          className="h-24 w-24 rounded-full object-cover"
          src={doctor.imageUrl}
          alt={`Dr. ${doctor.name}`}
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
          <p className="text-blue-600 font-medium">{doctor.specialty}</p>
          <div className="flex items-center mt-2">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="ml-1.5 text-gray-700 font-semibold">{doctor.rating}</span>
            <span className="ml-2 text-gray-500">({doctor.reviews} ibitekerezo)</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
            <p className="text-sm text-gray-500">Ikiguzi</p>
            <p className="text-xl font-bold text-gray-800">{doctor.consultationFee.toLocaleString('rw-RW')} RWF</p>
        </div>
        <button
          onClick={() => onSelect(doctor)}
          className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
          Tangira Ubujyanama
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;