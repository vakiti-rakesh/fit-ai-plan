

import React from 'react';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    <p className="text-lg text-gray-600">Generating your personalized plan... This might take a moment.</p>
  </div>
);

export default LoadingSpinner;