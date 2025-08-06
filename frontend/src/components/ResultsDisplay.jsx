import React from 'react';

const ResultsDisplay = ({ generatedPlan }) => {
  
  if (!generatedPlan) {
    return null; 
  }

  // --- THE FIX IS HERE ---
  // This function safely handles the 'snacks' data.
  const renderSnacks = () => {
    const snacks = generatedPlan.mealPlan?.sampleDay?.snacks;

    // Check if snacks is an array
    if (Array.isArray(snacks)) {
      return snacks.join(', '); // If it's an array, join it.
    }
    // If it's not an array (e.g., it's a string), just return it directly.
    return snacks; 
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Overview Section */}
      {generatedPlan.overview && (
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Plan Overview</h3>
          <p className="text-gray-700">{generatedPlan.overview}</p>
        </div>
      )}
      
      {/* Workout Schedule Section */}
      {generatedPlan.workoutSchedule && Array.isArray(generatedPlan.workoutSchedule) && (
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Weekly Workout Schedule</h3>
          <div className="space-y-4">
            {generatedPlan.workoutSchedule.map((dayPlan, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <h4 className="font-bold text-gray-800">{dayPlan.day}</h4>
                {dayPlan.exercises && Array.isArray(dayPlan.exercises) && (
                  <ul className="list-disc list-inside text-gray-600 mt-1">
                    {dayPlan.exercises.map((ex, i) => <li key={i}>{ex}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meal Plan Section */}
      {generatedPlan.mealPlan && (
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Meal Plan Guidance</h3>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-gray-800">Philosophy</h4>
            <p className="text-gray-700 mb-3">{generatedPlan.mealPlan.philosophy}</p>
            
            {generatedPlan.mealPlan.sampleDay && (
              <>
                <h4 className="font-bold text-gray-800">Sample Day</h4>
                <ul className="list-disc list-inside text-gray-600 mt-1">
                  <li><strong>Breakfast:</strong> {generatedPlan.mealPlan.sampleDay.breakfast}</li>
                  <li><strong>Lunch:</strong> {generatedPlan.mealPlan.sampleDay.lunch}</li>
                  <li><strong>Dinner:</strong> {generatedPlan.mealPlan.sampleDay.dinner}</li>
                  {/* We now call our safe render function */}
                  <li><strong>Snacks:</strong> {renderSnacks()}</li>
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
