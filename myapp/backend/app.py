from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib  # For loading a saved model

app = Flask(__name__)  # Fixed: Changed _name_ to __name__
CORS(app)  # Allow cross-origin requests
CORS(app, origins=["http://10.10.49.151:8081"])

# Load your pre-trained model (ensure the file path is correct)
model = joblib.load('random_forest_model.pkl')  # Replace with the correct path to your model

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse input JSON data
        data = request.json
        
        # Extract features from the received data
        gender = data.get('gender', None)
        age = data.get('age', None)
        occupation = data.get('occupation', None)
        sleep_duration = data.get('sleep_duration', None)
        bmi_category = data.get('bmi_category', None)
        heart_rate = data.get('heart_rate', None)
        daily_steps = data.get('daily_steps', None)
        systolic_bp = data.get('systolic_bp', None)
        
        # Validate all the required data fields
        if None in [gender, age, occupation, sleep_duration, bmi_category, heart_rate, daily_steps, systolic_bp]:
            return jsonify({
                "status": "error",
                "message": "Missing or invalid data in the request."
            }), 400
        
        # Additional validation: Check if data types are correct (e.g., age is an integer)
        if not isinstance(age, int) or age <= 0:
            return jsonify({"status": "error", "message": "Invalid age."}), 400
        if not isinstance(heart_rate, (int, float)) or heart_rate <= 0:
            return jsonify({"status": "error", "message": "Invalid heart rate."}), 400
        if not isinstance(systolic_bp, (int, float)) or systolic_bp <= 0:
            return jsonify({"status": "error", "message": "Invalid systolic blood pressure."}), 400
        
        # Create feature array for prediction
        features = np.array([
            gender,                # Gender
            age,                   # Age
            occupation,            # Occupation
            sleep_duration,        # Sleep Duration
            bmi_category,          # BMI Category
            heart_rate,            # Heart Rate
            daily_steps,           # Daily Steps
            systolic_bp            # Systolic BP
        ]).reshape(1, -1)
        
        # Predict using the model
        prediction = model.predict(features)
        
        # Respond with the prediction
        return jsonify({
            "status": "success",
            "prediction": prediction.tolist()  # Convert numpy array to list for JSON serialization
        })
    
    except Exception as e:
        # Return an error message if an exception occurs
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == '__main__':  # Fixed: Changed _name_ and _main_ to __name__ and __main__
    app.run(host='0.0.0.0', port=5000, debug=True)