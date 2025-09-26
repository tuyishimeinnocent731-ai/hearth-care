import React, { useState, useEffect, useRef } from 'react';
import type { Message } from '../types';
import { BotIcon, SendIcon, UserCircleIcon } from '../components/IconComponents';
import Spinner from '../components/Spinner';
import { getAIHealthAdvice } from '../services/geminiService';

const AIChatMessage: React.FC<{ message: Message }> = ({ message }) => {
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
            {!isUser && (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <BotIcon className="w-6 h-6 text-blue-600" />
                </div>
            )}
            <div
                className={`max-w-lg rounded-xl p-3 shadow-sm ${
                    isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
            >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </div>
            {isUser && (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <UserCircleIcon className="w-6 h-6 text-gray-500" />
                </div>
            )}
        </div>
    );
};

const AIChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'system-1',
            sender: 'system',
            text: "Muraho! Ndi umujyanama w'ubuzima wa AI. Vuga ku bimenyetso byawe cyangwa ubaze ikibazo kijyanye n'ubuzima.",
            timestamp: new Date().toISOString(),
        }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || isLoading) return;

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
            const botResponseText = await getAIHealthAdvice(newMessage, messages);
            const botMessage: Message = {
                id: `ai-${Date.now()}`,
                text: botResponseText,
                sender: 'doctor', // Using 'doctor' for styling consistency
                timestamp: new Date().toISOString(),
            };
            setMessages([...updatedMessages, botMessage]);
        } catch (error) {
            console.error('Failed to get AI response:', error);
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

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6">
            <div className="flex-shrink-0 pb-4 border-b border-gray-200">
                <div className="flex items-center">
                    <BotIcon className="w-10 h-10 text-blue-600" />
                    <div className="ml-4">
                        <h2 className="text-xl font-bold text-gray-800">Umujyanama wa AI</h2>
                        <p className="text-sm text-gray-500">Ufite ibibazo by'ubuzima? Mvugishe.</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
                {messages.map((msg) => (
                    <AIChatMessage key={msg.id} message={msg} />
                ))}
                {isLoading && (
                    <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                           <BotIcon className="w-6 h-6 text-blue-600" />
                        </div>
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
                        className="w-full py-3 pr-20 pl-5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !newMessage.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2.5 hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
                 <p className="text-xs text-center text-gray-500 mt-2">
                    Umujyanama wa AI ni uwo kugufasha gusa. Ntabwo asimbura inama za muganga wemewe.
                </p>
            </div>
        </div>
    );
};

export default AIChatPage;
