import React from 'react';
import type { Message, Doctor } from '../types';
import { UserCircleIcon, DocumentIcon } from './IconComponents';

interface ChatMessageProps {
  message: Message;
  doctor: Doctor | null;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, doctor }) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  if (isSystem) {
    return (
        <div className="text-center my-2">
            <p className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">{message.text}</p>
        </div>
    );
  }

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && doctor && (
        <img
          src={doctor.imageUrl}
          alt={doctor.name}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
      )}
      <div
        className={`max-w-lg rounded-xl shadow-sm ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        } ${message.attachment ? 'p-1' : 'p-3'}`}
      >
        {message.attachment && (
            <div className="mb-2 max-w-xs">
                {message.attachment.type === 'image' && <img src={message.attachment.url} alt="Attachment" className="rounded-lg w-full"/>}
                {message.attachment.type === 'video' && <video src={message.attachment.url} controls className="rounded-lg w-full"/>}
                {message.attachment.type === 'audio' && <audio src={message.attachment.url} controls className="w-full"/>}
                {message.attachment.type === 'file' && (
                    <a href={message.attachment.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-2 bg-gray-200 rounded-lg">
                        <DocumentIcon className="w-6 h-6 mr-2 text-gray-600"/>
                        <div>
                            <p className="text-sm font-medium text-gray-800">{message.attachment.name}</p>
                            <p className="text-xs text-gray-500">{message.attachment.size}</p>
                        </div>
                    </a>
                )}
            </div>
        )}
        {message.text && <p className={`text-sm whitespace-pre-wrap ${message.attachment ? 'px-2 pb-2' : ''}`}>{message.text}</p>}
      </div>
      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <UserCircleIcon className="w-6 h-6 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;