import React from 'react';
import { MOCK_NOTIFICATIONS } from '../mockData';
import { BellIcon, CalendarIcon, MessageSquareIcon, PillIcon } from '../components/IconComponents';

const iconMap = {
    appointment: CalendarIcon,
    message: MessageSquareIcon,
    prescription: PillIcon,
    general: BellIcon,
};

const NotificationsPage: React.FC = () => {
    return (
        <div className="p-6 md:p-8 max-w-3xl mx-auto">
             <h1 className="text-3xl font-bold text-gray-800 mb-8">Amatangazo</h1>
             <div className="bg-white rounded-xl shadow-sm border">
                <ul className="divide-y divide-gray-200">
                    {MOCK_NOTIFICATIONS.map(notif => {
                        const Icon = iconMap[notif.type];
                        return (
                             <li key={notif.id} className={`p-4 flex items-start gap-4 hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}>
                                 <div className="p-2 bg-blue-100 rounded-full mt-1">
                                    <Icon className="w-5 h-5 text-blue-600" />
                                 </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{notif.title}</p>
                                    <p className="text-sm text-gray-600">{notif.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(notif.date).toLocaleString('rw-RW')}</p>
                                </div>
                                {!notif.read && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full ml-auto mt-1 flex-shrink-0"></div>}
                            </li>
                        )
                    })}
                </ul>
             </div>
        </div>
    );
}

export default NotificationsPage;
