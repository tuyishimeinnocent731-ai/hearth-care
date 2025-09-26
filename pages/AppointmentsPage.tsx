import React from 'react';
import { CalendarIcon, ClockIcon, VideoIcon, MessageSquareIcon } from '../components/IconComponents';
import { MOCK_APPOINTMENTS } from '../mockData';

const AppointmentsPage: React.FC = () => {
    const upcomingAppointments = MOCK_APPOINTMENTS.filter(a => a.status === 'Upcoming');
    const pastAppointments = MOCK_APPOINTMENTS.filter(a => a.status !== 'Upcoming');

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gahunda Zanjye</h1>
        <p className="mt-2 text-lg text-gray-600">Reba kandi ucunge gahunda zawe ziteganyijwe n'izabaye.</p>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4">Gahunda Ziteganyijwe</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map(appt => (
                <div key={appt.id} className="bg-white rounded-lg shadow-sm border p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                        <p className="font-bold text-lg text-gray-900">{appt.doctorName}</p>
                        <p className="text-sm text-blue-600">{appt.specialty}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-2 gap-4">
                            <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1.5"/> {new Date(appt.date).toLocaleDateString('rw-RW', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1.5"/> {new Date(appt.date).toLocaleTimeString('rw-RW', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto flex flex-col sm:items-end gap-2">
                        <span className={`flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${appt.type === 'Video Call' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                            {appt.type === 'Video Call' ? <VideoIcon className="w-3 h-3 mr-1"/> : <MessageSquareIcon className="w-3 h-3 mr-1" />}
                            {appt.type}
                        </span>
                        <button className="mt-2 text-sm bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full sm:w-auto">Injira mu Nama</button>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nta gahunda nshya ziteganyijwe.</p>
          )}
        </div>
        
        <div>
            <h2 className="text-xl font-bold text-gray-700 border-b pb-2 mb-4">Gahunda Zabaye</h2>
             {pastAppointments.length > 0 ? (
                <div className="space-y-4">
                {pastAppointments.map(appt => (
                    <div key={appt.id} className="bg-white rounded-lg p-4 border opacity-75">
                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                             <div>
                                <p className="font-bold text-gray-800">{appt.doctorName}</p>
                                <p className="text-sm text-gray-500">{new Date(appt.date).toLocaleDateString('rw-RW', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <button className="text-sm text-blue-600 hover:underline">Reba Incamake</button>
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
  );
};

export default AppointmentsPage;
