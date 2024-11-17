// page wrt the Figma --> 7
// // page wrt the Figma --> 7
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const ACTIVITIES = [
  { label: 'Meditate' },
  { label: 'Music' },
  { label: 'Walk' },
  { label: 'Read' },
  { label: 'Write' },
  { label: 'TED Talk' },
];

const ChallengePage = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={{ fontSize: 18, color: '#000' }}>Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Let’s complete Challenge</Text>
        <Text style={styles.subtitle}>
          Spend all of it and bring your current anxiety level down to an ideal level before the day ends
        </Text>
      </View>

      {/* Activities Grid */}
      <ScrollView
        contentContainerStyle={styles.activitiesGrid}
        showsVerticalScrollIndicator={false}
      >
        {ACTIVITIES.map((activity, index) => (
          <TouchableOpacity key={index} style={styles.activityCard}>
            <Text style={styles.activityLabel}>{activity.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  backButton: {
    padding: 16,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
  },
  activityCard: {
    width: '40%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 4 : undefined,
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  activityLabel: {
    fontSize: 18, // Increased font size
    fontWeight: 'bold', // Made text bold
    color: '#4A148C',
    textAlign: 'center',
  },
  nextButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#9C27B0',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChallengePage;