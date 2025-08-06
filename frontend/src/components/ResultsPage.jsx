// src/components/ResultsPage.jsx

import React from 'react';
import ResultsDisplay from './ResultsDisplay'; // We'll reuse our existing component

// This component receives the plan data and a function to go back to the form
const ResultsPage = ({ plan, onStartOver }) => {
  return (
    <div className="card results-card animate-fade-in">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your AI-Generated Plan</h2>
        <button
          onClick={onStartOver}
          className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out"
        >
          Start Over
        </button>
      </div>
      <div className="results-content">
        {/* We render the same ResultsDisplay component from before */}
        <ResultsDisplay generatedPlan={plan} />
      </div>
    </div>
  );
};

export default ResultsPage;
