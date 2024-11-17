

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Journal = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState("What are you grateful for today?");
  const [journalEntries, setJournalEntries] = useState([]); // State for journal entries
  const [showEntries, setShowEntries] = useState(false); // State to toggle view
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
    if (journalEntry.trim()) {
      const newEntry = {
        id: Date.now().toString(),
        question: currentQuestion,
        answer: journalEntry,
        date: new Date().toLocaleString(),
      };
      setJournalEntries((prev) => [newEntry, ...prev]); // Add the new entry to the state
      setJournalEntry(''); // Clear the input
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Uncomment if back navigation is needed */}
          {/* <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity> */}
        </View>

        {/* Heading */}
        <Text style={styles.title}>✍🏻 Journal</Text>
        <Text style={styles.subheading}>WRITE IT OUT, LET IT OUT!</Text>

        {showEntries ? (
          // View Previous Entries
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Previous Entries</Text>
            {journalEntries.length === 0 ? (
              <Text style={styles.noEntriesText}>No entries yet. Start journaling!</Text>
            ) : (
              <FlatList
                data={journalEntries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.entry}>
                    <Text style={styles.entryDate}>{item.date}</Text>
                    <Text style={styles.entryQuestion}>{item.question}</Text>
                    <Text style={styles.entryAnswer}>{item.answer}</Text>
                  </View>
                )}
              />
            )}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowEntries(false)}
            >
              <Text style={styles.backButtonText}>Back to Journaling</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Journal Input Form
          <View style={styles.content}>
            <View style={styles.questionBox}>
              <Text style={styles.questionText}>{currentQuestion}</Text>
            </View>

            <TextInput
              style={styles.journalInput}
              placeholder="Write your thoughts here..."
              multiline
              value={journalEntry}
              onChangeText={setJournalEntry}
            />

            <TouchableOpacity style={styles.newQuestionButton} onPress={handleNewQuestion}>
              <Text style={styles.newQuestionButtonText}>Would you like another Question?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Save Journal</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewEntriesButton}
              onPress={() => setShowEntries(true)}
            >
              <Text style={styles.viewEntriesButtonText}>Show Previous Entries</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
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
    marginBottom: 16,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  viewEntriesButton: {
    backgroundColor: '#673AB7',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  viewEntriesButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  entry: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    width: '100%',
  },
  entryDate: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  entryQuestion: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  entryAnswer: {
    fontSize: 14,
    color: '#555',
  },
  noEntriesText: {
    fontSize: 16,
    color: '#9E9E9E',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#9C27B0',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Journal;

