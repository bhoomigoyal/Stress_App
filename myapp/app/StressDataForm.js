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

const StressDataForm = () => {
  const [formData, setFormData] = useState({
    gender: '1',  // 1 for Male, 2 for Female
    age: '',
    occupation: '',
    sleep_duration: '',
    bmi_category: '1',  // 1-4 for different BMI categories
    heart_rate: '',
    daily_steps: '',
    systolic_bp: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://10.10.49.151:5000/predict', {  // Ensure the IP is correct
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
        console.error('Server error:', response.status);
        setError(`Error: ${response.status}`); // Fixed template literal
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
      console.error('Network error:', err);
      setError('Failed to connect to the server');
    }
  };
  
  const handleInputChange = (field, value) => {
    console.log(`${field} updated to: ${value}`);  // Fixed template literal
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Stress Level Prediction</Text>

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

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={formData.age}
          onChangeText={(value) => handleInputChange('age', value)}
          keyboardType="numeric"
          placeholder="Enter age"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Occupation (1-9)</Text>
        <TextInput
          style={styles.input}
          value={formData.occupation}
          onChangeText={(value) => handleInputChange('occupation', value)}
          keyboardType="numeric"
          placeholder="Enter occupation number"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Sleep Duration (hours)</Text>
        <TextInput
          style={styles.input}
          value={formData.sleep_duration}
          onChangeText={(value) => handleInputChange('sleep_duration', value)}
          keyboardType="numeric"
          placeholder="Enter sleep duration"
        />
      </View>

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

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Heart Rate (bpm)</Text>
        <TextInput
          style={styles.input}
          value={formData.heart_rate}
          onChangeText={(value) => handleInputChange('heart_rate', value)}
          keyboardType="numeric"
          placeholder="Enter heart rate"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Daily Steps</Text>
        <TextInput
          style={styles.input}
          value={formData.daily_steps}
          onChangeText={(value) => handleInputChange('daily_steps', value)}
          keyboardType="numeric"
          placeholder="Enter daily steps"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Systolic BP</Text>
        <TextInput
          style={styles.input}
          value={formData.systolic_bp}
          onChangeText={(value) => handleInputChange('systolic_bp', value)}
          keyboardType="numeric"
          placeholder="Enter systolic blood pressure"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Predict Stress Level</Text>
      </TouchableOpacity>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {prediction !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Prediction Result:</Text>
          <Text style={styles.resultText}>Stress Level: {prediction}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: -10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  resultContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
  }
});

export default StressDataForm;