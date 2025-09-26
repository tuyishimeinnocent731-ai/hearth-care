import React from 'react';
import { VideoIcon, PlusCircleIcon, CalendarIcon } from '../components/IconComponents';
import { MOCK_APPOINTMENTS } from '../mockData';

interface VideoConsultationPageProps {
  onScheduleCall: () => void;
}

const VideoConsultationPage: React.FC<VideoConsultationPageProps> = ({ onScheduleCall }) => {
    const videoAppointments = MOCK_APPOINTMENTS.filter(a => a.type === 'Video Call');

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Ubujyanama kuri Video</h1>
            <p className="mt-2 text-lg text-gray-600">Vugana na muganga wawe amaso ku maso.</p>
        </div>
        <button 
            onClick={onScheduleCall}
            className="mt-4 md:mt-0 flex items-center px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            <PlusCircleIcon className="w-5 h-5 mr-2"/>
            Fata Gahunda Nshya
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Gahunda za Video Ziteganyijwe</h2>
        {videoAppointments.length > 0 ? (
            <div className="space-y-4">
                {videoAppointments.map(appt => (
                    <div key={appt.id} className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-gray-800">Video na {appt.doctorName}</p>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                                <CalendarIcon className="w-4 h-4 mr-1.5"/>
                                {new Date(appt.date).toLocaleString('rw-RW', { dateStyle: 'medium', timeStyle: 'short' })}
                            </p>
                        </div>
                        {appt.status === 'Upcoming' ? (
                             <button className="text-sm bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Injira</button>
                        ) : (
                             <span className="text-sm text-gray-400">Byarangiye</span>
                        )}
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-8">
                <VideoIcon className="w-12 h-12 mx-auto text-gray-300"/>
                <p className="mt-4 text-gray-500">Nta gahunda za video ziteganyijwe.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default VideoConsultationPage;
