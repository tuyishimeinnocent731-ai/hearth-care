
import React, { useState } from 'react';
import type { Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '../mockData';
import { BellIcon, CalendarIcon, MessageSquareIcon, PillIcon, SettingsIcon } from '../components/IconComponents';

const categoryIcons: { [key in Notification['category']]: React.ReactNode } = {
    appointment: <CalendarIcon className="w-5 h-5 text-blue-500" />,
    message: <MessageSquareIcon className="w-5 h-5 text-purple-500" />,
    prescription: <PillIcon className="w-5 h-5 text-green-500" />,
    system: <SettingsIcon className="w-5 h-5 text-gray-500" />,
};

const NotificationsPage: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

    const markAsRead = (id: number) => {
        setNotifications(
            notifications.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };
    
    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({...n, read: true})));
    }

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        <BellIcon className="w-8 h-8 mr-3 text-blue-600"/>
                        Amatangazo
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">Reba amatangazo yawe yose hano.</p>
                </div>
                {unreadCount > 0 && (
                    <button 
                        onClick={markAllAsRead}
                        className="mt-4 md:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                        Soma Byose
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
                <ul className="divide-y divide-gray-200">
                    {notifications.length > 0 ? notifications.map(notification => (
                        <li 
                            key={notification.id}
                            className={`p-4 flex items-start gap-4 transition-colors ${!notification.read ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                        >
                            <div className="flex-shrink-0 mt-1">
                                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                                    {categoryIcons[notification.category]}
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">{notification.title}</p>
                                <p className="text-sm text-gray-600">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(notification.timestamp).toLocaleString('rw-RW', { dateStyle: 'medium', timeStyle: 'short' })}
                                </p>
                            </div>
                            {!notification.read && (
                                <div className="flex-shrink-0 flex items-center h-full">
                                    <button 
                                        onClick={() => markAsRead(notification.id)}
                                        className="text-xs font-bold text-blue-500"
                                        title="Mark as read"
                                    >
                                        <span className="block h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                                    </button>
                                </div>
                            )}
                        </li>
                    )) : (
                        <li className="p-8 text-center text-gray-500">
                            Nta tangazo rishya rifite.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default NotificationsPage;
