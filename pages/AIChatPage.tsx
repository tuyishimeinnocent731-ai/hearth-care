import React, { useState, useEffect, useRef } from 'react';
import type { Message, UserProfile } from '../types';
import { BotIcon, SendIcon, UserCircleIcon, LightbulbIcon, AlertTriangleIcon, SmileIcon, ClipboardCheckIcon, HeartPulseIcon, ClipboardIcon, CheckIcon, PaperclipIcon, XIcon, MicrophoneIcon, VideoIcon } from '../components/IconComponents';
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
    const [isCopied, setIsCopied] = useState(false);
    const isUser = message.sender === 'user';
    const isSystem = message.sender === 'system';
    const isAI = message.sender === 'doctor';

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(message.text.replace(/\[ICON:\w+\]/g, ''));
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

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
            <div className="group relative">
                <div
                    className={`max-w-xl rounded-2xl shadow-md ${
                        isUser
                            ? 'bg-blue-600 text-white rounded-br-lg'
                            : 'bg-white text-gray-800 rounded-bl-lg border border-gray-100'
                    } ${message.attachment ? 'p-1.5' : 'p-4'}`}
                >
                     {message.attachment && (
                        <div className="mb-2 max-w-xs">
                            {/* FIX: The attachment object uses the 'url' property, not 'data', to store the attachment source, as defined in types.ts. */}
                            {message.attachment.type === 'image' ? (
                                <img src={message.attachment.url} alt="Attachment" className="rounded-lg w-full"/>
                            ) : (
                                <video src={message.attachment.url} controls className="rounded-lg w-full"/>
                            )}
                        </div>
                    )}
                    {message.text && (
                        <div className={`text-sm leading-relaxed whitespace-pre-wrap ${message.attachment ? 'px-2.5 pb-2' : ''}`}>
                            {renderMessageWithIcons(message.text)}
                        </div>
                    )}
                </div>
                {isAI && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={handleCopy} 
                            className="p-1.5 bg-gray-500/10 rounded-lg text-gray-500 hover:bg-gray-500/20"
                            aria-label="Copy message"
                        >
                          {isCopied ? <CheckIcon className="w-4 h-4 text-green-600" /> : <ClipboardIcon className="w-4 h-4" />}
                        </button>
                    </div>
                )}
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
            <h2 className="text-3xl font-extrabold text-gray-800">Umujyanama wa AI</h2>
            <p className="text-gray-500 mt-2 mb-6 max-w-md">Nshobora kugufasha n'inama z'ubuzima rusange. Baza ikibazo cyangwa uhitemo mu byifuzo bikurikira.</p>
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

interface AIChatPageProps {
  userProfile: UserProfile;
}

const AIChatPage: React.FC<AIChatPageProps> = ({ userProfile }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<any>(null);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        // @ts-ignore
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            const recognition = recognitionRef.current;
            recognition.continuous = false;
            recognition.lang = 'rw-RW';
            recognition.interimResults = false;

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setNewMessage(prev => prev ? `${prev} ${transcript}` : transcript);
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error);
                setIsRecording(false);
            };

            recognition.onend = () => {
                setIsRecording(false);
            };
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (filePreview) {
            URL.revokeObjectURL(filePreview);
        }
        setFilePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = async (e?: React.FormEvent, promptText?: string) => {
        if (e) e.preventDefault();
        const textToSend = promptText || newMessage;
        if ((!textToSend.trim() && !selectedFile) || isLoading) return;

        let attachmentData: Message['attachment'] | undefined = undefined;
        const fileToSend = selectedFile;

        if (fileToSend) {
            attachmentData = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    // FIX: Corrected the attachment object property from 'data' to 'url' to match the 'Message' type definition, resolving the property error.
                    resolve({
                        type: fileToSend.type.startsWith('image/') ? 'image' : 'video',
                        url: reader.result as string,
                    });
                };
                reader.readAsDataURL(fileToSend);
            });
        }
        
        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text: textToSend,
            sender: 'user',
            timestamp: new Date().toISOString(),
            attachment: attachmentData,
        };
        
        const updatedHistory = [...messages, userMessage];
        setMessages(updatedHistory);

        if (!promptText) {
            setNewMessage('');
        }
        removeFile();
        setIsLoading(true);

        try {
            const botResponseText = await getAIHealthAdvice(textToSend, updatedHistory, fileToSend, userProfile);
            const botMessage: Message = {
                id: `ai-${Date.now()}`,
                text: botResponseText,
                sender: 'doctor',
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

     const handleToggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
        } else {
            if (recognitionRef.current) {
                recognitionRef.current.start();
                setIsRecording(true);
            } else {
                const browserSupportMessage: Message = {
                  id: `error-no-support-${Date.now()}`,
                  text: "[ICON:warning] Ijwi ntiryemewe kuri iyi 'browser' yawe. Gerageza gukoresha Chrome cyangwa Edge.",
                  sender: 'system',
                  timestamp: new Date().toISOString(),
                };
                setMessages(prev => [...prev, browserSupportMessage]);
            }
        }
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
                        <h2 className="text-lg font-extrabold text-gray-800">Umujyanama wa AI</h2>
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
                {filePreview && (
                    <div className="relative w-28 h-28 mb-2 p-2 border rounded-lg bg-gray-100">
                        {selectedFile?.type.startsWith('image/') ? (
                            <img src={filePreview} alt="Preview" className="w-full h-full object-cover rounded"/>
                        ) : (
                             <div className="w-full h-full flex items-center justify-center">
                                <VideoIcon className="w-8 h-8 text-gray-500" />
                            </div>
                        )}
                        <button onClick={removeFile} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600">
                            <XIcon className="w-4 h-4"/>
                        </button>
                    </div>
                )}
                <form onSubmit={handleSendMessage}>
                    <div className="flex items-center">
                         <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*,video/*"
                            className="hidden"
                          />
                         <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:text-blue-600 mr-2">
                            <PaperclipIcon className="w-5 h-5" />
                         </button>
                         <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={isRecording ? "Ndi kumva..." : "Andika ikibazo cyangwa uvuge..."}
                            className="flex-1 w-full py-3 pr-24 pl-4 bg-gray-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            disabled={isLoading}
                        />
                        <div className="flex items-center ml-2">
                            <button
                                type="button"
                                onClick={handleToggleRecording}
                                className={`p-2.5 rounded-full transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:text-blue-600'}`}
                                aria-label="Record voice message"
                            >
                                <MicrophoneIcon className="w-5 h-5" />
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || (!newMessage.trim() && !selectedFile)}
                                className="bg-blue-600 text-white rounded-full p-2.5 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-110 ml-1"
                                aria-label="Send message"
                            >
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AIChatPage;