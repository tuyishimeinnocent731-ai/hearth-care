import React, { useEffect } from 'react';
import { CheckCircleIcon } from './IconComponents';

interface ToastProps {
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in-0 slide-in-from-bottom-5 z-50">
            <CheckCircleIcon className="w-6 h-6 text-green-400" />
            <span>{message}</span>
        </div>
    );
};

export default Toast;
