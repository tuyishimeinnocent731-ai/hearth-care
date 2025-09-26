// FIX: Create ChatWindow component
import React, { useState, useEffect, useRef } from 'react';
import type { Doctor, Message } from '../types';
import ChatMessage from './ChatMessage';
import Spinner from './Spinner';
import { sendSymptomDetails } from '../services/geminiService';
import { SendIcon, PaperclipIcon } from './IconComponents';

interface ChatWindowProps {
  doctor: Doctor | null;
  initialMessages: Message[];
  onEndConsultation: (chatHistory: Message[]) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ doctor, initialMessages, onEndConsultation }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading || !doctor) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setNewMessage('');
    setIsLoading(true);

    try {
      const botResponseText = await sendSymptomDetails(newMessage, messages, doctor);
      const botMessage: Message = {
        id: `doctor-${Date.now()}`,
        text: botResponseText,
        sender: 'doctor',
        timestamp: new Date().toISOString(),
      };
      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Tuvuganye n'ikibazo cya tekiniki. Mwihangane musubiremo nyuma.",
        sender: 'system',
        timestamp: new Date().toISOString(),
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!doctor) return <div className="p-8 text-center text-red-500">Muganga ntiyatoranijwe. Subira inyuma uhitemo.</div>;

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-4rem)] p-4 md:p-6">
       <div className="flex-shrink-0 pb-4 border-b border-gray-200">
            <div className="flex items-center">
                <img src={doctor.imageUrl} alt={doctor.name} className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
                <button 
                  onClick={() => onEndConsultation(messages)}
                  className="ml-auto px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Soza Ubujyanama
                </button>
            </div>
      </div>
      <div className="flex-1 overflow-y-auto py-6 space-y-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} doctor={doctor} />
        ))}
        {isLoading && (
           <div className="flex items-start space-x-4">
                <img src={doctor.imageUrl} alt={doctor.name} className="w-10 h-10 rounded-full"/>
                <div className="p-3 bg-gray-100 rounded-lg max-w-lg">
                    <Spinner />
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="mt-auto pt-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Andika ubutumwa bwawe hano..."
            className="w-full py-3 pr-28 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
             <button type="button" className="text-gray-400 hover:text-gray-600">
                <PaperclipIcon className="w-5 h-5" />
             </button>
          </div>
          <button
            type="submit"
            disabled={isLoading || !newMessage.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2.5 hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
