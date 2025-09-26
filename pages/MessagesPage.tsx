import React from 'react';
import { MOCK_CONVERSATIONS } from '../mockData';
import { SearchIcon, MessageSquareIcon } from '../components/IconComponents';

const MessagesPage: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Conversation List */}
      <div className="w-full md:w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b flex-shrink-0">
          <h1 className="text-xl font-bold text-gray-800">Ubutumwa</h1>
          <div className="relative mt-2">
            <input type="text" placeholder="Shakisha ubutumwa" className="w-full bg-gray-100 py-2 pl-10 pr-3 border border-transparent rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-4 h-4 text-gray-400"/>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
            {MOCK_CONVERSATIONS.map(conv => (
                 <div key={conv.id} className="flex items-center p-4 cursor-pointer hover:bg-gray-50 border-b">
                    <img src={conv.doctor.imageUrl} alt={conv.doctor.name} className="w-12 h-12 rounded-full"/>
                    <div className="ml-4 flex-1">
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-gray-800">{conv.doctor.name}</p>
                            <p className="text-xs text-gray-400">{new Date(conv.timestamp).toLocaleTimeString('rw-RW', {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-600 truncate max-w-xs">{conv.lastMessage}</p>
                            {conv.unreadCount > 0 && (
                                <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{conv.unreadCount}</span>
                            )}
                        </div>
                    </div>
                 </div>
            ))}
        </div>
      </div>
      {/* Message View */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50 text-center p-8">
        <MessageSquareIcon className="w-16 h-16 text-gray-300"/>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Hitamo ikiganiro</h2>
        <p className="mt-1 text-gray-500">Hitamo ikiganiro mu ruhande rw'ibumoso kugira ngo ubashe kubona ubutumwa.</p>
      </div>
    </div>
  );
};

export default MessagesPage;