
import React from 'react';
import type { Doctor } from '../types';
import { StarIcon, CheckCircleIcon } from './IconComponents';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: () => void;
  onStartConsultation: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onViewProfile, onStartConsultation }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <img src={doctor.imageUrl} alt={doctor.name} className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100" />
        <div className="ml-4">
          <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
          <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 flex-grow mb-4">{doctor.bio.substring(0, 100)}...</p>
      <div className="flex justify-between items-center text-sm mb-4">
        <div className="flex items-center text-yellow-500">
          <StarIcon className="w-5 h-5 mr-1" />
          <span className="font-bold">{doctor.rating}</span>
          <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
        </div>
        {doctor.available ? (
            <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-800">
                <CheckCircleIcon className="w-3 h-3 mr-1" />
                Ari online
            </span>
        ) : (
             <span className="text-xs font-medium text-gray-500">Ntari online</span>
        )}
      </div>
      <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row gap-2">
        <button onClick={onViewProfile} className="w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Reba Umwirondoro</button>
        <button 
            onClick={onStartConsultation} 
            disabled={!doctor.available}
            className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
            Gisha Inama
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
