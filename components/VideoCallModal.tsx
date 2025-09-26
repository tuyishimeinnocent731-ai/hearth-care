import React from 'react';
import type { Doctor } from '../types';
import { XIcon, VideoIcon, MicrophoneIcon } from './IconComponents';

interface VideoCallModalProps {
    doctor: Doctor | null;
    onClose: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ doctor, onClose }) => {
    if (!doctor) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 text-white rounded-2xl shadow-xl w-full max-w-4xl h-[80vh] flex flex-col transform transition-all animate-in fade-in-0 zoom-in-95">
                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h2 className="font-bold">Video Call with {doctor.name}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 bg-black flex items-center justify-center text-gray-400">
                    Patient's video feed would be here.
                </div>
                <div className="w-48 h-32 bg-gray-900 absolute top-20 right-4 rounded-lg border-2 border-gray-700 flex items-center justify-center text-gray-400 text-sm">
                    Doctor's video
                </div>
                 <div className="p-4 bg-gray-900/50 flex justify-center items-center gap-4">
                    <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600">
                        <MicrophoneIcon className="w-6 h-6" />
                    </button>
                    <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600">
                        <VideoIcon className="w-6 h-6" />
                    </button>
                    <button onClick={onClose} className="px-6 py-3 bg-red-600 rounded-full font-semibold hover:bg-red-700">
                        End Call
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoCallModal;
