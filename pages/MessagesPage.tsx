import React, { useState, useRef, useEffect } from 'react';
import type { Conversation, Message } from '../types';
import { SearchIcon, ArrowLeftIcon, PlusIcon, SendIcon, MicrophoneIcon, ImageIcon, DocumentIcon, VideoIcon, SmileIcon, PlayIcon, CheckCheckIcon, XIcon } from '../components/IconComponents';
import Spinner from '../components/Spinner';

const ConversationList: React.FC<{
    conversations: Conversation[];
    selectedConversationId: number | null;
    onSelectConversation: (id: number) => void;
}> = ({ conversations, selectedConversationId, onSelectConversation }) => (
    <div className={`w-full md:w-1/3 lg:w-2/5 xl:w-1/4 bg-white border-r border-gray-200 flex flex-col ${selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Ubutumwa</h1>
            <div className="relative mt-4">
                <input
                    type="text"
                    placeholder="Shakisha mu biganiro..."
                    className="w-full py-2 pl-10 pr-4 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
            {conversations.map(convo => (
                <div
                    key={convo.id}
                    onClick={() => onSelectConversation(convo.id)}
                    className={`p-4 flex items-center space-x-4 cursor-pointer border-l-4 ${selectedConversationId === convo.id ? 'bg-blue-50 border-blue-600' : 'border-transparent hover:bg-gray-50'}`}
                >
                    <div className="relative">
                        <img src={convo.doctor.imageUrl} alt={convo.doctor.name} className="w-12 h-12 rounded-full" />
                        {convo.doctor.available && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-gray-800 truncate">{convo.doctor.name}</p>
                            <p className="text-xs text-gray-500">{new Date(convo.messages[convo.messages.length - 1].timestamp).toLocaleTimeString('rw-RW', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-600 truncate">{convo.messages[convo.messages.length - 1].text || 'Attachment'}</p>
                            {convo.unread > 0 && (
                                <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{convo.unread}</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ChatView: React.FC<{
    conversation: Conversation | undefined;
    onBack: () => void;
    onSendMessage: (conversationId: number, message: Message) => void;
}> = ({ conversation, onBack, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation?.messages]);
    
    const removeFile = () => {
        setSelectedFile(null);
        if (filePreview) URL.revokeObjectURL(filePreview);
        setFilePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    if (!conversation) {
        return <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 text-gray-500">Hitamo ikiganiro kugirango ugitangire.</div>;
    }
    
    const handleSend = () => {
        if (!newMessage.trim() && !selectedFile) return;

        let attachment;
        if (selectedFile && filePreview) {
            attachment = {
                type: 'image' as const,
                url: filePreview,
                file: selectedFile,
            };
        }

        const message: Message = {
            id: `user-${Date.now()}`,
            text: newMessage,
            sender: 'user',
            timestamp: new Date().toISOString(),
            status: 'sent',
            attachment,
        };
        onSendMessage(conversation.id, message);
        setNewMessage('');
        removeFile();
    };

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    return (
        <div className="flex-1 flex flex-col bg-gray-50 h-[calc(100vh-4rem)]">
            {/* Header */}
            <div className="flex items-center p-3 border-b bg-white shadow-sm">
                <button onClick={onBack} className="md:hidden mr-2 p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon className="w-6 h-6"/>
                </button>
                <img src={conversation.doctor.imageUrl} alt={conversation.doctor.name} className="w-11 h-11 rounded-full"/>
                <div className="ml-3">
                    <h2 className="font-bold text-lg">{conversation.doctor.name}</h2>
                    <p className="text-sm text-gray-500">{conversation.doctor.available ? 'Online' : 'Offline'}</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {conversation.messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'doctor' && <img src={conversation.doctor.imageUrl} className="w-8 h-8 rounded-full"/>}
                         <div className={`group relative max-w-lg rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-white text-gray-800 rounded-bl-lg border'} ${msg.attachment && !msg.text ? 'p-1.5' : 'p-3'}`}>
                            {msg.attachment?.type === 'image' && (
                                <img src={msg.attachment.url} className="rounded-xl max-w-xs" alt={msg.attachment.name || 'Image attachment'}/>
                            )}
                            {msg.text && <p className="text-sm">{msg.text}</p>}
                         </div>
                    </div>
                ))}
                 {conversation.isTyping && (
                    <div className="flex items-end gap-3">
                        <img src={conversation.doctor.imageUrl} className="w-8 h-8 rounded-full"/>
                        <div className="p-3 bg-white rounded-2xl rounded-bl-lg border"><Spinner/></div>
                    </div>
                )}
                <div ref={chatEndRef}/>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t">
                 {filePreview && (
                    <div className="relative w-20 h-20 mb-2 p-1.5 border rounded-lg">
                        <img src={filePreview} alt="Preview" className="w-full h-full object-cover rounded"/>
                        <button onClick={removeFile} className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full p-0.5">
                            <XIcon className="w-4 h-4"/>
                        </button>
                    </div>
                )}
                <div className="relative flex items-center">
                    <div className="relative">
                        <button onClick={() => setAttachmentMenuOpen(o => !o)} className="p-2 text-gray-500 hover:text-blue-600">
                            <PlusIcon className="w-6 h-6"/>
                        </button>
                        {attachmentMenuOpen && (
                            <div className="absolute bottom-full mb-2 left-0 bg-white shadow-lg rounded-lg border p-1 flex gap-1">
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden"/>
                                <button onClick={() => {fileInputRef.current?.click(); setAttachmentMenuOpen(false);}} className="p-2 rounded-lg hover:bg-gray-100"><ImageIcon className="w-5 h-5 text-blue-600"/></button>
                                <button className="p-2 rounded-lg hover:bg-gray-100" disabled><DocumentIcon className="w-5 h-5 text-purple-400"/></button>
                            </div>
                        )}
                    </div>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Andika ubutumwa..."
                        className="flex-1 w-full py-2 px-4 bg-gray-100 border-transparent rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 mx-2"
                    />
                    {newMessage || selectedFile ? (
                        <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                            <SendIcon className="w-6 h-6"/>
                        </button>
                    ) : (
                         <button className="p-2 text-gray-500 hover:text-blue-600">
                            <MicrophoneIcon className="w-6 h-6"/>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


const MessagesPage: React.FC<{
    conversations: Conversation[];
    selectedConversationId: number | null;
    onSelectConversation: (id: number | null) => void;
    onSendMessage: (conversationId: number, message: Message) => void;
}> = ({ conversations, selectedConversationId, onSelectConversation, onSendMessage }) => {
    
    const selectedConversation = conversations.find(c => c.id === selectedConversationId);

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            <ConversationList
                conversations={conversations}
                selectedConversationId={selectedConversationId}
                onSelectConversation={onSelectConversation}
            />
            <ChatView 
                conversation={selectedConversation}
                onBack={() => onSelectConversation(null)}
                onSendMessage={onSendMessage}
            />
        </div>
    );
};

export default MessagesPage;