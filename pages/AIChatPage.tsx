import React, { useState, useEffect, useRef } from 'react';
import type { Message } from '../types';
import { BotIcon, SendIcon, UserCircleIcon, LightbulbIcon, AlertTriangleIcon, SmileIcon, ClipboardCheckIcon, HeartPulseIcon } from '../components/IconComponents';
import Spinner from '../components/Spinner';
import { getAIHealthAdvice } from '../services/geminiService';

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    smile: SmileIcon,
    idea: LightbulbIcon,
    warning: AlertTriangleIcon,
    clipboard: ClipboardCheckIcon,
    heart: HeartPulseIcon,
};

const renderMessageWithIcons = (text: string) => {
    const parts = text.split(/(\[ICON:\w+\])/g);
    return parts.map((part, index) => {
        const match = part.match(/\[ICON:(\w+)\]/);
        if (match) {
            const iconName = match[1];
            const IconComponent = iconMap[iconName];
            if (IconComponent) {
                const colorClass = iconName === 'warning' ? 'text-yellow-500' : 'text-blue-600';
                return <IconComponent key={index} className={`inline-block w-5 h-5 mx-1 ${colorClass}`} />;
            }
        }
        return <span key={index}>{part}</span>;
    });
};

const AIChatMessage: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';
    const isSystem = message.sender === 'system';

    if (isSystem) {
        return (
            <div className="text-center my-2">
                <p className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">{renderMessageWithIcons(message.text)}</p>
            </div>
        );
    }

    return (
        <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <BotIcon className="w-6 h-6 text-blue-600" />
                </div>
            )}
            <div
                className={`max-w-xl rounded-2xl p-4 shadow-md ${
                    isUser
                        ? 'bg-blue-600 text-white rounded-br-lg'
                        : 'bg-white text-gray-800 rounded-bl-lg border border-gray-100'
                }`}
            >
                <div className="text-sm leading-relaxed whitespace-pre-wrap">{renderMessageWithIcons(message.text)}</div>
            </div>
             {isUser && (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <UserCircleIcon className="w-6 h-6 text-gray-500" />
                </div>
            )}
        </div>
    );
};

const SuggestedPrompts: React.FC<{ onPromptClick: (prompt: string) => void }> = ({ onPromptClick }) => {
    const prompts = [
        "Nigute narwanya stress?",
        "Ni izihe nama zagufasha gusinzira neza?",
        "Ni ibihe biryo byiza bya mu gitondo?",
        "Mpamirize akamaro ko kunywa amazi."
    ];

    return (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
            <BotIcon className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-700">Umujyanama wa AI</h2>
            <p className="text-gray-500 mt-2 mb-6">Nshobora kugufasha n'inama z'ubuzima rusange.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {prompts.map(prompt => (
                    <button 
                        key={prompt}
                        onClick={() => onPromptClick(prompt)}
                        className="p-4 bg-white border border-gray-200 rounded-lg text-left text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-blue-400 transition-all"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        </div>
    );
};


const AIChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e?: React.FormEvent, promptText?: string) => {
        if (e) e.preventDefault();
        const textToSend = promptText || newMessage;
        if (!textToSend.trim() || isLoading) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text: textToSend,
            sender: 'user',
            timestamp: new Date().toISOString(),
        };
        
        const currentHistory = messages;
        setMessages(prev => [...prev, userMessage]);

        if (!promptText) {
            setNewMessage('');
        }
        setIsLoading(true);

        try {
            const botResponseText = await getAIHealthAdvice(textToSend, currentHistory);
            const botMessage: Message = {
                id: `ai-${Date.now()}`,
                text: botResponseText,
                sender: 'doctor', // Using 'doctor' for styling consistency
                timestamp: new Date().toISOString(),
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Failed to get AI response:', error);
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                text: "[ICON:warning] Tuvuganye n'ikibazo cya tekiniki. Mwihangane musubiremo nyuma.",
                sender: 'system',
                timestamp: new Date().toISOString(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePromptClick = (prompt: string) => {
        handleSendMessage(undefined, prompt);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
            <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white shadow-sm z-10">
                 <div className="flex items-center">
                    <div className="relative">
                        <BotIcon className="w-10 h-10 text-blue-600" />
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-lg font-bold text-gray-800">Umujyanama wa AI</h2>
                        <p className="text-sm text-gray-500">Online</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {messages.length === 0 && <SuggestedPrompts onPromptClick={handlePromptClick} />}
                {messages.map((msg) => (
                    <AIChatMessage key={msg.id} message={msg} />
                ))}
                {isLoading && (
                    <div className="flex items-start space-x-3">
                         <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                           <BotIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="p-4 bg-white rounded-2xl rounded-bl-lg border border-gray-100 shadow-md">
                            <Spinner />
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-200 mt-auto">
                <form onSubmit={handleSendMessage} className="relative">
                     <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Andika ikibazo cyawe hano..."
                        className="w-full py-3 pr-14 pl-5 bg-gray-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !newMessage.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2.5 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-110"
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIChatPage;