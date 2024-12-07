import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TimerPage = () => {
  const router = useRouter();
  const { challengeLabel } = useLocalSearchParams();
  const { allChallenges } = useLocalSearchParams();
  const [duration, setDuration] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(true);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isSetupMode) {
      setIsTimerRunning(false);
      setIsCompleted(true);
    }
    console.log("Challenges in TimerPage:", allChallenges);
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, isSetupMode]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const startTimer = () => {
    const durationInMinutes = parseInt(duration);
    
    if (isNaN(durationInMinutes) || durationInMinutes <= 0) {
      Alert.alert('Invalid Duration', 'Please enter a valid number of minutes');
      return;
    }

    setTimeLeft(durationInMinutes * 60);
    setIsTimerRunning(true);
    setIsSetupMode(false);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(0);
    setIsTimerRunning(false);
    setIsCompleted(false);
    setIsSetupMode(true);
    setDuration('');
  };

  const handleComplete = () => {
    // Navigate back to the challenge page and mark the challenge as completed
    // const parsedChallenges = JSON.parse(allChallenges);
    // router.push({
    //   pathname: './Challenge', 
    //   params: { 
    //     completedChallengeLabel: JSON.stringify(challengeLabel),
    //     // challenges: allChallenges
    //     challenges: JSON.stringify(allChallenges)
    //     // onComplete: onComplete
    //   }
    // });
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Timer Setup or Display */}
      {isSetupMode ? (
        <View style={styles.setupContainer}>
          <Text style={styles.title}>Set Timer Duration</Text>
          <TextInput 
            style={styles.durationInput}
            placeholder="Enter duration (minutes)"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
            placeholderTextColor="#7E57C2"
          />
          <TouchableOpacity 
            style={styles.startButton} 
            onPress={startTimer}
          >
            <Text style={styles.startButtonText}>Start Timer</Text>
          </TouchableOpacity>
        </View>
      ) : !isCompleted ? (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          
          {/* Timer Controls */}
          <View style={styles.controlsContainer}>
            {!isTimerRunning ? (
              <TouchableOpacity 
                style={styles.controlButton} 
                onPress={() => setIsTimerRunning(true)}
              >
                <Text style={styles.controlButtonText}>Resume</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.controlButton} 
                onPress={pauseTimer}
              >
                <Text style={styles.controlButtonText}>Pause</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.controlButton} 
              onPress={resetTimer}
            >
              <Text style={styles.controlButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.completedContainer}>
          <Text style={styles.completedTitle}>Time's Up!</Text>
          <TouchableOpacity 
            style={styles.completeButton} 
            onPress={handleComplete}
          >
            <Text style={styles.completeButtonText}>Complete Challenge</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 30,
    textAlign: 'center',
  },
  setupContainer: {
    width: '80%',
    alignItems: 'center',
  },
  durationInput: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#4A148C',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#4A148C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 72,
    color: '#4A148C',
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 20,
  },
  controlButton: {
    backgroundColor: '#4A148C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  completedContainer: {
    alignItems: 'center',
  },
  completedTitle: {
    fontSize: 36,
    color: '#4A148C',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  completeButton: {
    backgroundColor: '#4A148C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TimerPage;