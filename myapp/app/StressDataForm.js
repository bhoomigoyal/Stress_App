import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const StressDataForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    gender: '1', // 1 for Male, 2 for Female
    age: '',
    occupation: '',
    sleep_duration: '',
    bmi_category: '1', // 1-4 for different BMI categories
    heart_rate: '',
    daily_steps: '',
    systolic_bp: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://10.10.237.165:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gender: parseInt(formData.gender),
          age: parseInt(formData.age),
          occupation: parseInt(formData.occupation),
          sleep_duration: parseFloat(formData.sleep_duration),
          bmi_category: parseInt(formData.bmi_category),
          heart_rate: parseInt(formData.heart_rate),
          daily_steps: parseInt(formData.daily_steps),
          systolic_bp: parseInt(formData.systolic_bp),
        }),
      });

      if (!response.ok) {
        setError('Error: ${response.status}');
        return;
      }

      const result = await response.json();
      if (result.status === 'success') {
        setPrediction(result.prediction[0]);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const stressLevelMessages = {
    3: 'Low stress: Your stress level is manageable. Maintain your current routine!',
    4: 'Mild stress: Consider engaging in relaxation techniques or light exercise.',
    5: 'Moderate stress: It’s a good idea to take breaks and practice mindfulness.',
    6: 'High stress: Pay attention to your workload and prioritize self-care.',
    7: 'Severe stress: It’s important to talk to someone or seek professional help.',
    8: 'Critical stress: Immediate action is needed. Consult a healthcare professional.',
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {!prediction ? (
        <>
          <Text style={styles.title}>Stress Level Prediction</Text>

          {/* Gender Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <Picker
              selectedValue={formData.gender}
              style={styles.picker}
              onValueChange={(value) => handleInputChange('gender', value)}
            >
              <Picker.Item label="Male" value="1" />
              <Picker.Item label="Female" value="2" />
            </Picker>
          </View>

          {/* Age Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={formData.age}
              onChangeText={(value) => handleInputChange('age', value)}
              keyboardType="numeric"
              placeholder="Enter age"
              placeholderTextColor="#9c9c9c"
            />
          </View>

          {/* Occupation Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Occupation</Text>
            <Picker
              selectedValue={formData.occupation}
              style={styles.picker}
              onValueChange={(value) => handleInputChange('occupation', value)}
            >
              <Picker.Item label="Select Occupation" value="" />
              <Picker.Item label="Scientist" value="0" />
              <Picker.Item label="Doctor" value="1" />
              <Picker.Item label="Accountant" value="2" />
              <Picker.Item label="Teacher" value="3" />
              <Picker.Item label="Manager" value="4" />
              <Picker.Item label="Engineer" value="5" />
              <Picker.Item label="Sales Representative" value="6" />
              <Picker.Item label="Lawyer" value="8" />
              <Picker.Item label="Salesperson" value="7" />
              <Picker.Item label="Software Engineer" value="9" />
              <Picker.Item label="Nurse" value="10" />
            </Picker>
          </View>

          {/* Sleep Duration Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sleep Duration (hours)</Text>
            <TextInput
              style={styles.input}
              value={formData.sleep_duration}
              onChangeText={(value) => handleInputChange('sleep_duration', value)}
              keyboardType="numeric"
              placeholder="Enter sleep duration"
              placeholderTextColor="#9c9c9c"
            />
          </View>

          {/* BMI Category Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>BMI Category</Text>
            <Picker
              selectedValue={formData.bmi_category}
              style={styles.picker}
              onValueChange={(value) => handleInputChange('bmi_category', value)}
            >
              <Picker.Item label="Underweight" value="1" />
              <Picker.Item label="Normal" value="2" />
              <Picker.Item label="Overweight" value="3" />
              <Picker.Item label="Obese" value="4" />
            </Picker>
          </View>

          {/* Heart Rate Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Heart Rate (bpm)</Text>
            <TextInput
              style={styles.input}
              value={formData.heart_rate}
              onChangeText={(value) => handleInputChange('heart_rate', value)}
              keyboardType="numeric"
              placeholder="Enter heart rate"
              placeholderTextColor="#9c9c9c"
            />
          </View>

          {/* Daily Steps Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Daily Steps</Text>
            <TextInput
              style={styles.input}
              value={formData.daily_steps}
              onChangeText={(value) => handleInputChange('daily_steps', value)}
              keyboardType="numeric"
              placeholder="Enter daily steps"
              placeholderTextColor="#9c9c9c"
            />
          </View>

          {/* Systolic BP Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Systolic BP</Text>
            <TextInput
              style={styles.input}
              value={formData.systolic_bp}
              onChangeText={(value) => handleInputChange('systolic_bp', value)}
              keyboardType="numeric"
              placeholder="Enter systolic blood pressure"
              placeholderTextColor="#9c9c9c"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Predict Stress Level</Text>
          </TouchableOpacity>

          {/* Error Message */}
          {error && <Text style={styles.error}>{error}</Text>}
        </>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Prediction Result:</Text>
          <Text style={styles.resultText}>
            {stressLevelMessages[prediction] || 'Unknown stress level: Please try again.'}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPrediction(null)}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(74, 20, 140, 1)',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: 'rgba(74, 20, 140, 1)',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(74, 20, 140, 1)',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#4c1d95',
  },
  picker: {
    borderWidth: 1,
    borderColor: 'rgba(74, 20, 140, 1)',
    borderRadius: 10,
    backgroundColor: '#fff',
    color: 'rgba(74, 20, 140, 1)',
  },
  button: {
    backgroundColor: 'rgba(74, 20, 140, 1)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'rgba(74, 20, 140, 1)',
    marginTop: 10,
    textAlign: 'center',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4c1d95',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    color: '#6b21a8',
  },
  backButton: {
    paddingVertical: 16,
    alignItems: 'left',
    width: '100%',
  },
});

export default StressDataForm;
