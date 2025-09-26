
import React from 'react';
import type { Doctor } from '../types';
import { XIcon, StarIcon, CheckCircleIcon, GlobeIcon } from './IconComponents';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onStartConsultation: () => void;
}

const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({ doctor, onClose, onStartConsultation }) => {
  if (!doctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg transform transition-all relative animate-in fade-in-0 zoom-in-95">
        <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1.5"
        >
            <span className="sr-only">Funga</span>
            <XIcon className="h-5 w-5" />
        </button>

        <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                <img src={doctor.imageUrl} alt={doctor.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-200 flex-shrink-0" />
                <div className="mt-4 sm:mt-0 sm:ml-6">
                    <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
                    <p className="text-md text-blue-600 font-semibold">{doctor.specialty}</p>
                    <div className="flex items-center justify-center sm:justify-start mt-2 text-yellow-500">
                        <StarIcon className="w-5 h-5 mr-1" />
                        <span className="font-bold text-gray-800">{doctor.rating}</span>
                        <span className="text-gray-500 ml-1.5">({doctor.reviews} isubiramo)</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-6 border-t pt-6 space-y-4">
                <div>
                    <h3 className="font-bold text-gray-700">Amakuru yihariye</h3>
                    <p className="text-sm text-gray-600 mt-1">{doctor.bio}</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-700">Indimi Avuga</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {doctor.languages.map(lang => (
                            <span key={lang} className="flex items-center bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                <GlobeIcon className="w-3 h-3 mr-1.5" />
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="font-bold text-gray-700">Amafaranga y'Ubujyanama</h3>
                    <p className="text-lg font-bold text-blue-700">{doctor.consultationFee.toLocaleString('rw-RW')} RWF</p>
                </div>
            </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
          <button
            type="button"
            disabled={!doctor.available}
            onClick={onStartConsultation}
            className="w-full flex items-center justify-center rounded-lg border border-transparent shadow-sm px-4 py-3 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300"
          >
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            Tangira Ubujyanama
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileModal;
