import React from 'react';
import type { Notification } from '../types';
// FIX: Replaced missing icons with available ones
import { BellIcon, CalendarDaysIcon, ChatBubbleLeftEllipsisIcon, PillIcon, Trash2Icon } from '../components/IconComponents';

const iconMap = {
    // FIX: Replaced CalendarIcon with CalendarDaysIcon
    appointment: CalendarDaysIcon,
    // FIX: Replaced MessageSquareIcon with ChatBubbleLeftEllipsisIcon
    message: ChatBubbleLeftEllipsisIcon,
    prescription: PillIcon,
    general: BellIcon,
};

interface NotificationsPageProps {
    notifications: Notification[];
    onDelete: (id: number) => void;
    onMarkAllRead: () => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications, onDelete, onMarkAllRead }) => {
    return (
        <div className="p-6 md:p-8 max-w-3xl mx-auto">
             <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Amatangazo</h1>
                <button onClick={onMarkAllRead} className="text-sm font-medium text-blue-600 hover:underline">Soma byose</button>
             </div>
             <div className="bg-white rounded-xl shadow-sm border">
                {notifications.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {notifications.map(notif => {
                            const Icon = iconMap[notif.type];
                            return (
                                <li key={notif.id} className={`p-4 flex items-start gap-4 hover:bg-gray-50 group ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                                    <div className={`p-2 rounded-full mt-1 ${!notif.read ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                        <Icon className={`w-5 h-5 ${!notif.read ? 'text-blue-600' : 'text-gray-500'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">{notif.title}</p>
                                        <p className="text-sm text-gray-600">{notif.description}</p>
                                        <p className="text-xs text-gray-400 mt-1">{new Date(notif.date).toLocaleString('rw-RW')}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!notif.read && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>}
                                        <button onClick={() => onDelete(notif.id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity">
                                            <Trash2Icon className="w-4 h-4"/>
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <div className="text-center p-12">
                        <BellIcon className="w-12 h-12 mx-auto text-gray-300"/>
                        <p className="mt-4 text-gray-500">Nta tangazo rishya.</p>
                    </div>
                )}
             </div>
        </div>
    );
}

export default NotificationsPage;