import React from 'react';

const QuestionnaireForm = ({ formData, handleInputChange, handleSubmit, isLoading }) => {

 
  const formOptions = {
    goals: ['Lose Weight', 'Build Muscle', 'Improve Endurance', 'Body Recomposition'],
    experienceLevels: ['Beginner (0-6 months)', 'Intermediate (6-24 months)', 'Advanced (2+ years)'],
    daysPerWeek: ['2-3 days', '4-5 days', '6-7 days'],
    equipment: ['None (Bodyweight only)', 'Basic (Dumbbells, Bands)', 'Full Gym Access'],
    dietaryNeeds: ['None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto'],
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4 text-gray-800">Tell Us About Yourself</h2>

      {/* We attach the handleSubmit function (passed from App.jsx) to the form's onSubmit event */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Goal */}
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">What is your primary goal?</label>
          <select 
            id="goal" 
            name="goal" 
            value={formData.goal} // The value is controlled by the parent's state
            onChange={handleInputChange} // Any change calls the parent's function
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {formOptions.goals.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">What is your fitness experience level?</label>
          <select 
            id="experience" 
            name="experience" 
            value={formData.experience} 
            onChange={handleInputChange} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {formOptions.experienceLevels.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Days Per Week */}
        <div>
          <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-700 mb-2">How many days can you train per week?</label>
          <select 
            id="daysPerWeek" 
            name="daysPerWeek" 
            value={formData.daysPerWeek} 
            onChange={handleInputChange} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {formOptions.daysPerWeek.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Equipment */}
        <div>
          <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-2">What equipment do you have access to?</label>
          <select 
            id="equipment" 
            name="equipment" 
            value={formData.equipment} 
            onChange={handleInputChange} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {formOptions.equipment.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Dietary Needs */}
        <div>
          <label htmlFor="dietaryNeeds" className="block text-sm font-medium text-gray-700 mb-2">Do you have any dietary needs?</label>
          <select 
            id="dietaryNeeds" 
            name="dietaryNeeds" 
            value={formData.dietaryNeeds} 
            onChange={handleInputChange} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {formOptions.dietaryNeeds.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">Any other information? (e.g., injuries, preferences)</label>
          <textarea 
            id="notes" 
            name="notes" 
            value={formData.notes} 
            onChange={handleInputChange} 
            rows="3" 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
            placeholder="e.g., I have a previous knee injury."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button 
            type="submit" 
            disabled={isLoading} // The button is disabled when the app is loading
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate My Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionnaireForm;