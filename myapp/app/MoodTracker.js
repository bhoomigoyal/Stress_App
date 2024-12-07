import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const MOODS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Relaxed' },
  { emoji: '🙂', label: 'Okay' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😩', label: 'Tired' },
  { emoji: '😄', label: 'Excited' },
  { emoji: '😴', label: 'Sleepy' },
  { emoji: '😠', label: 'Angry' },
];

const MoodTracker = () => {
  const insets = useSafeAreaInsets();
  const [selectedMood, setSelectedMood] = useState(null);
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Let's Track Your Mood !</Text>
        <Text style={styles.subtitle}>How are you feeling today?</Text>
      </View>

      {/* Mood Grid */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.moodGrid}>
        {MOODS.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.moodCard,
              selectedMood === index && styles.selectedMoodCard,
            ]}
            onPress={() => setSelectedMood(index)}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Record Button */}
      <TouchableOpacity
        style={[
          styles.recordButton,
          selectedMood === null && styles.disabledButton,
        ]}
        disabled={selectedMood === null}
        onPress={() => {
          if (selectedMood !== null) {
            console.log('Selected mood:', MOODS[selectedMood].label);
            router.push('/Second');
          }
        }}
      >
        <Text style={styles.recordButtonText}>Let us Record it on Heatmap!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3e5f5',
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    padding: 16,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#DAC0FC',
  },
  subtitle: {
    fontSize: 16,
    color: '#DAC0FC',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
  },
  moodCard: {
    width: '28%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectedMoodCard: {
    backgroundColor: '#DAC0FC',
    borderWidth: 2,
    borderColor: '#9C27B0',
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  recordButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#DAC0FC',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#DAC0FC',
  },
  recordButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MoodTracker;
