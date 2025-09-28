import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import type { Message, UserProfile } from '../types';
// FIX: Replaced missing BotIcon with SparklesIcon
import { SparklesIcon, SendIcon, UserCircleIcon, ClipboardPulseIcon } from '../components/IconComponents';
import Spinner from '../components/Spinner';

interface SymptomCheckerPageProps {
    userProfile: UserProfile;
    onComplete: (summary: string) => void;
}

const SymptomCheckerMessage: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    {/* FIX: Replaced missing BotIcon with SparklesIcon */}
                    <SparklesIcon className="w-6 h-6 text-blue-600" />
                </div>
            )}
            <div className={`max-w-xl rounded-2xl p-4 shadow-md ${ isUser ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-white text-gray-800 rounded-bl-lg border'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
            </div>
             {isUser && (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <UserCircleIcon className="w-6 h-6 text-gray-500" />
                </div>
            )}
        </div>
    );
};

const SymptomCheckerPage: React.FC<SymptomCheckerPageProps> = ({ userProfile, onComplete }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const SUMMARY_PREFIX = "[SUMMARY]:";

    useEffect(() => {
        // FIX: Correctly initialize GoogleGenAI and create a chat session.
        const ai = new GoogleGenAI({apiKey: process.env.API_KEY!});
        const systemInstruction = `You are an AI medical triage assistant for a Rwandan health app. Your goal is to gather detailed information about a patient's symptoms before they talk to a doctor.
- All communication must be in Kinyarwanda.
- Be empathetic and professional.
- Ask clarifying questions one at a time.
- Cover aspects like symptom location, duration, severity (on a scale of 1-10), what makes it better or worse, and any associated symptoms.
- Do not provide a diagnosis or medical advice.
- After you have gathered sufficient information (around 4-5 questions), inform the user that you are preparing a summary for the doctor.
- Then, on a new line, output a structured summary in markdown format, starting with the exact prefix "${SUMMARY_PREFIX}".
- The summary should be concise and well-organized for a doctor to read quickly.`;

        const chatSession = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { systemInstruction }
        });
        setChat(chatSession);

        const initialMessage: Message = {
            id: `ai-initial-${Date.now()}`,
            text: "Muraho, ndi umujyanama wa AI ushinzwe kwa kumenya amakuru y'ibanze ku bimenyetso byawe. Mbere y'uko tuvugana na muganga, mbwira muri make ikibazo cyawe nyamukuru.",
            sender: 'doctor',
            timestamp: new Date().toISOString()
        };
        setMessages([initialMessage]);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text: input,
            sender: 'user',
            timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chat.sendMessage({ message: input });
            let responseText = result.text;
            
            if (responseText.includes(SUMMARY_PREFIX)) {
                const parts = responseText.split(SUMMARY_PREFIX);
                const explanation = parts[0].trim();
                const summary = parts[1].trim();

                const finalBotMessage: Message = {
                    id: `ai-summary-exp-${Date.now()}`,
                    text: explanation,
                    sender: 'doctor',
                    timestamp: new Date().toISOString(),
                };
                setMessages(prev => [...prev, finalBotMessage]);

                setTimeout(() => onComplete(summary), 2000);
            } else {
                const botMessage: Message = {
                    id: `ai-${Date.now()}`,
                    text: responseText,
                    sender: 'doctor',
                    timestamp: new Date().toISOString(),
                };
                setMessages(prev => [...prev, botMessage]);
            }

        } catch (error) {
            console.error("Symptom checker AI error:", error);
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                text: "Habaye ikibazo cya tekiniki. Mwihangane musubiremo.",
                sender: 'system',
                timestamp: new Date().toISOString(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-100">
            <div className="flex-shrink-0 p-4 border-b bg-white/80 backdrop-blur-sm z-10">
                 <div className="flex items-center max-w-4xl mx-auto">
                    <ClipboardPulseIcon className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                        <h2 className="text-lg font-extrabold text-gray-800">Isuzumwa ry'Ibimenyetso rya AI</h2>
                        <p className="text-sm text-gray-500">Uru rugendo rugufasha gutegura neza ikiganiro na muganga.</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.map(msg => <SymptomCheckerMessage key={msg.id} message={msg} />)}
                    {isLoading && (
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                {/* FIX: Replaced missing BotIcon with SparklesIcon */}
                                <SparklesIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="p-4 bg-white rounded-2xl rounded-bl-lg border shadow-md">
                                <Spinner />
                            </div>
                        </div>
                    )}
                </div>
                <div ref={chatEndRef} />
            </div>

             <div className="p-4 bg-white/80 backdrop-blur-sm border-t mt-auto">
                <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Andika ubutumwa bwawe..."
                            className="w-full py-3 pr-14 pl-5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2.5 hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            aria-label="Send message"
                        >
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default SymptomCheckerPage;