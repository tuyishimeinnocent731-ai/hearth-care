
import React from 'react';

const Spinner: React.FC = () => (
  <div className="animate-pulse flex space-x-1">
    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
  </div>
);

export default Spinner;
