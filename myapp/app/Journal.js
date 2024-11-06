import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Journal = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState("What are you grateful for today?");
  const router = useRouter();

  const questions = [
    "What are you grateful for today?",
    "What's one thing that made you smile today?",
    "What's a challenge you faced today, and how did you handle it?",
    "What's one thing you learned today?",
    "What's something you're looking forward to tomorrow?",
    "What's one way you practiced self-care today?",
    "What's one thing you can do tomorrow to reduce stress?",
    "What's one positive affirmation you can tell yourself today?",
    "What's one thing you did today that you're proud of?",
    "What's one thing you can do to better manage your time tomorrow?",
  ];

  const handleNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  };

  const handleSubmit = () => {
    console.log('Journal Entry:', journalEntry);
    setJournalEntry('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
            </View>
        {/* Heading */}
        <Text style={styles.title}>✍🏻Journal</Text>
        {/* Subheading */}
        <Text style={styles.subheading}>WRITE IT OUT, LET IT OUT!</Text>
        
            <View style={styles.content}>
            {/* Question Box */}
            <View style={styles.questionBox}>
            <Text style={styles.questionText}>{currentQuestion}</Text>
            </View>

            {/* Journal Entry Input */}
            <TextInput
            style={styles.journalInput}
            placeholder="Write your thoughts here..."
            multiline
            value={journalEntry}
            onChangeText={setJournalEntry}
            />

            {/* New Question Button */}
            <TouchableOpacity style={styles.newQuestionButton} onPress={handleNewQuestion}>
            <Text style={styles.newQuestionButtonText}>Would you like another Question?</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save Journal</Text>
            </TouchableOpacity>
        </View>
        </View>
    </TouchableWithoutFeedback>   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    // alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // position: 'absolute',
    // marginTop: 20,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    // flex: 1,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 35,
  },
  subheading: {
    fontSize: 16,
    color: '#9C27B0',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
  content: {
    width: '90%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  questionBox: {
    backgroundColor: '#9C27B0',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  questionText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  journalInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
    height: 250,
    width: '100%',
  },
  newQuestionButton: {
    backgroundColor: '#d564e8',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  newQuestionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#9C27B0',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Journal;
