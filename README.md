FitPlan AI: Your Personal AI Fitness & Nutrition Coach
FitPlan AI is a full-stack web application designed to solve the common problem of "analysis paralysis" in fitness. It provides users with a personalized, AI-generated 4-week workout and meal plan based on their individual goals, experience, and preferences.

🚀 Live Demo: fitplain-ai.netlify.app
 
 The Problem
Getting started on a fitness journey is often overwhelming. Generic plans found online don't account for an individual's specific needs, such as available equipment, dietary restrictions, or fitness level. This can lead to confusion, frustration, and ultimately, giving up.

The Solution
FitPlan AI acts as a virtual coach. By answering a simple questionnaire, users receive a structured, actionable plan tailored specifically to them. The application leverages the power of Google's Gemini AI to generate comprehensive and logical fitness and nutrition guidance, making personalized health advice accessible to everyone.

Features
Personalized Questionnaire: Gathers user data on goals, experience, available equipment, and dietary needs.

AI-Powered Plan Generation: Utilizes the Google Gemini API to create a unique 4-week workout schedule and meal plan.

Modern UI/UX: A clean, responsive, multi-page user interface built with React that provides a seamless user experience.

Dedicated Results Page: Presents the generated plan on a separate, clear page for easy reading.

Full-Stack Architecture: Demonstrates a complete client-server architecture with a React frontend and a Python (Flask) backend.

Tech Stack
Component

Technology / Library

Frontend

React.js, Vite, Tailwind CSS

Backend

Python, Flask, Gunicorn

AI Model

Google Gemini 1.5 Flash

Deployment

Frontend: Netlify <br> Backend: Render

How It Works
The application follows a simple, robust data flow:

User Input: The user fills out the questionnaire on the React frontend.

API Request: Upon submission, the frontend sends the user's data as a JSON object to the Python backend (hosted on Render) via a POST request.

Prompt Engineering: The Flask server receives the data and dynamically constructs a detailed prompt for the Gemini AI model. This prompt instructs the AI to act as a fitness expert and to return the plan in a specific, structured JSON format.

AI Generation: The backend sends the prompt to the Google Gemini API and receives the generated plan.

API Response: The backend forwards the AI-generated JSON plan back to the React frontend.

Display Results: The frontend receives the plan, updates its state, and navigates to the Results Page to display the data in a user-friendly format.

Getting Started
To run this project locally, you will need to have Node.js and Python installed on your machine.

1. Clone the Repository
git clone https://github.com/vakiti-rakesh/fit-ai-plan.git
cd fit-ai-plan

2. Backend Setup
# Navigate to the backend folder
cd backend

# Create and activate a virtual environment
python -m venv venv
# On Windows, use: .\venv\Scripts\activate
# On Mac/Linux, use: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
python main.py

The backend will be running on http://127.0.0.1:5000.

3. Frontend Setup
Open a new terminal for the frontend.

# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Run the frontend development server
npm run dev

The frontend will be running on http://localhost:5173 (or a similar port).

Environment Variables
The backend requires a Google AI API key to function.

Obtain a key from Google AI Studio.

Open backend/main.py and replace "YOUR_API_KEY_HERE" with your actual key.

Future Improvements
[ ] Database Integration: Use a database like Firestore to save generated plans, allowing users to view their history.

[ ] User Accounts: Implement user authentication so individuals can save their profiles and plans.

[ ] Weekly Progression: Enhance the AI prompt to generate progressive workouts that get more challenging each week.

[ ] More Customization: Add more options to the questionnaire, such as specific food allergies or workout style preferences (e.g., HIIT, strength training).
