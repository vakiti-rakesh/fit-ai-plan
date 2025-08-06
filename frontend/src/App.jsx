import React, { useState } from 'react';
import QuestionnaireForm from './components/QuestionnaireForm';
import ResultsPage from './components/ResultsPage';
import LoadingSpinner from './components/LoadingSpinner';
import './NewStyles.css'; // Import the custom styles

export default function App() {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    goal: 'Lose Weight',
    experience: 'Beginner (0-6 months)',
    daysPerWeek: '2-3 days',
    equipment: 'None (Bodyweight only)',
    dietaryNeeds: 'None',
    notes: '',
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState('form'); // Manages the current view: 'form', 'loading', or 'results'

  // --- LOGIC FUNCTIONS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage('loading'); // Switch to the loading view
    setError(null);

    try {
      // IMPORTANT: Replace with your actual live Render backend URL
      const response = await fetch('https://fitplan-ai-backend.onrender.com/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setGeneratedPlan(data);
      setPage('results'); // On success, switch to the results page

    } catch (err) {
      setError(err.message || "An unknown error occurred.");
      setPage('form'); // On error, go back to the form to show the message
    }
  };

  // Function to reset the app and go back to the form
  const handleStartOver = () => {
    setGeneratedPlan(null);
    setError(null);
    setPage('form');
  };

  // --- RENDER LOGIC ---
  // This function decides which "page" to show the user
  const renderContent = () => {
    switch (page) {
      case 'loading':
        return <div className="card"><LoadingSpinner /></div>;
      case 'results':
        return <ResultsPage plan={generatedPlan} onStartOver={handleStartOver} />;
      case 'form':
      default:
        return (
          <div className="card form-card animate-fade-in">
            {error && <p className="error-message mb-6">{error}</p>}
            <QuestionnaireForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={false} // The page state handles loading now
            />
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="text-5xl font-bold tracking-tight">FitPlan AI</h1>
        <p className="text-slate-500 mt-2 text-lg">Your personal AI fitness and nutrition coach.</p>
      </header>

      <main className="app-main">
        {renderContent()}
      </main>

      <footer className="app-footer">
        <p>FitPlan AI &copy; 2024. Always consult a professional before starting a new fitness regimen.</p>
      </footer>
    </div>
  );
}
