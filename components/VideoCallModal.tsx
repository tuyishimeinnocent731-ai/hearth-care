// FIX: Create VideoCallModal component
import React from 'react';
import { XIcon, VideoIcon } from './IconComponents';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName: string;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ isOpen, onClose, doctorName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="p-6">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800" id="modal-title">
                    Video Call with {doctorName}
                </h3>
                <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" />
                </button>
            </div>
            <div className="mt-6 text-center">
                <VideoIcon className="h-16 w-16 mx-auto text-blue-500"/>
                <p className="mt-4 text-gray-600">
                    The video call feature is coming soon!
                </p>
                <p className="text-sm text-gray-500">
                    This feature will allow you to have a face-to-face consultation with your doctor.
                </p>
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
            onClick={onClose}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;
