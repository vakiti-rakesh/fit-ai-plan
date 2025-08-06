import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# --- 1. CONFIGURE THE AI ---
# IMPORTANT: Replace "YOUR_API_KEY_HERE" with your actual key.
API_KEY = "AIzaSyCCxEWhIKIMUAbSLoMSQCuR6okonS9Ugfw" 
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

# --- 2. INITIALIZE THE FLASK APP ---
app = Flask(__name__)
CORS(app)

# --- 3. THE MAIN API ENDPOINT ---
@app.route('/generate-plan', methods=['POST'])
def generate_plan_route():
    print("--- AI generation request received! ---")
    
    try:
        user_data = request.get_json()
        if not user_data:
            return jsonify({"error": "No input data provided"}), 400
    except Exception as e:
        return jsonify({"error": f"Invalid JSON format: {e}"}), 400

    print("User data received:", user_data)

    try:
        # --- 4. PROMPT ENGINEERING (No changes here) ---
        prompt = f"""
        You are an expert fitness coach and nutritionist named FitPlan AI.
        Your task is to create a personalized 4-week fitness and meal plan based on the user's details.

        USER DETAILS:
        - Primary Goal: {user_data.get('goal')}
        - Fitness Level: {user_data.get('experience')}
        - Training Days Per Week: {user_data.get('daysPerWeek')}
        - Equipment Available: {user_data.get('equipment')}
        - Dietary Needs: {user_data.get('dietaryNeeds')}
        - Additional Notes: {user_data.get('notes', 'None')}

        INSTRUCTIONS:
        Generate a complete plan in a valid JSON object format. Do NOT include any text, notes, or markdown formatting like ```json ``` before or after the JSON object.
        The JSON object must have these exact top-level keys: "overview", "workoutSchedule", "mealPlan".

        - "overview": A string containing a 2-3 sentence motivational overview of the generated plan.
        - "workoutSchedule": An array of objects. Each object represents a day of the week and must have two keys: "day" (e.g., "Day 1: Full Body Strength") and "exercises" (an array of strings, where each string is a specific exercise with sets/reps, e.g., "Squats: 3 sets of 15 reps"). Include rest days.
        - "mealPlan": An object with two keys: "philosophy" (a short string about the nutritional approach) and "sampleDay" (an object with keys "breakfast", "lunch", "dinner", and "snacks", each containing a string with a sample meal).
        """

        # --- 5. CALL THE AI MODEL ---
        print("Sending prompt to Gemini AI...")
        response = model.generate_content(prompt)
        
        # --- 6. DEBUGGING AND PARSING THE RESPONSE ---
        # Get the raw text from the AI's response
        raw_response_text = response.text
        
        # ** NEW DEBUGGING STEP **
        # Print the raw response so we can see exactly what the AI sent back.
        print("--- RAW AI RESPONSE ---")
        print(raw_response_text)
        print("--- END RAW AI RESPONSE ---")
        
        # Clean the response to remove potential markdown code fences
        cleaned_json_string = raw_response_text.strip().replace('```json', '').replace('```', '').strip()

        # Try to parse the cleaned string into a Python dictionary
        plan_dict = json.loads(cleaned_json_string)
        
        # --- 7. RETURN THE AI'S RESPONSE ---
        print("Successfully parsed AI response. Sending to frontend.")
        return jsonify(plan_dict), 200

    except json.JSONDecodeError as e:
        # This error is specific to bad JSON
        print(f"!!! JSON DECODE ERROR: The AI did not return valid JSON. Error: {e}")
        return jsonify({"error": "The AI response was not in a valid format. Please try again."}), 500
    except Exception as e:
        # This catches all other errors during AI generation
        print(f"!!! An unexpected error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred while generating the plan."}), 500

# --- 8. RUN THE SERVER ---
if __name__ == '__main__':
    app.run(port=5000, debug=True)
