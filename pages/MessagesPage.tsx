
import React from 'react';
import { MOCK_MESSAGES_THREADS } from '../mockData';
import { SearchIcon } from '../components/IconComponents';

const MessagesPage: React.FC = () => {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Ubutumwa</h1>
        <p className="mt-2 text-lg text-gray-600">Reba ibiganiro byawe n'abaganga.</p>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Shakisha mu butumwa..."
          className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <ul className="divide-y divide-gray-200">
          {MOCK_MESSAGES_THREADS.map(thread => (
            <li key={thread.id} className="p-4 flex items-center space-x-4 hover:bg-gray-50 cursor-pointer">
              <img src={thread.imageUrl} alt={thread.doctorName} className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-800">{thread.doctorName}</p>
                  <p className="text-xs text-gray-500">{thread.timestamp}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600 truncate">{thread.lastMessage}</p>
                    {thread.unread > 0 && (
                        <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{thread.unread}</span>
                    )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessagesPage;
