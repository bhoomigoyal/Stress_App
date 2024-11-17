

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
      const response = await fetch('http://10.10.235.125:5000/predict', {
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
        setError(`Error: ${response.status}`);
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

  return (
    <ScrollView style={styles.container}>
      {!prediction ? (
        <>
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
              placeholderTextColor="#9c9c9c"
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
              placeholderTextColor="#9c9c9c"
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
              placeholderTextColor="#9c9c9c"
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
              placeholderTextColor="#9c9c9c"
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
              placeholderTextColor="#9c9c9c"
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
              placeholderTextColor="#9c9c9c"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Predict Stress Level</Text>
          </TouchableOpacity>

          {error && <Text style={styles.error}>{error}</Text>}
        </>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Prediction Result:</Text>
          <Text style={styles.resultText}>Stress Level: {prediction}</Text>
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
    backgroundColor: '#f9f5ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c1d95',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#4c1d95',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#c4b5fd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#4c1d95',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#c4b5fd',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#4c1d95',
  },
  button: {
    backgroundColor: '#8b5cf6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#f43f5e',
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
});

export default StressDataForm;