// ChallengePage.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
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

const REWARDS = [
  { emoji: '🍦', text: 'Ice cream' },
  { emoji: '🤝', text: 'Volunteer' },
  { emoji: '🙌', text: 'Personal Praise' },
  { emoji: '🎮', text: 'Mobile Game' },
  { emoji: '😴', text: 'Nap' },
  { emoji: '🛍️', text: 'Buy something Nice' },
];

const ChallengePage = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showRewards, setShowRewards] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const handleActivitySelect = (activity, index) => {
    setSelectedActivity(index);
    setIsCompleted(false);
  };

  const handleCompleteActivity = () => {
    if (selectedActivity === null) {
      Alert.alert('Select Challenge', 'Please select a challenge first!');
      return;
    }
    setIsCompleted(true);
    setShowRewards(true);
  };

  const handleRewardSelect = (reward, index) => {
    setSelectedReward(index);
  };

  const handleClaimReward = () => {
    if (selectedReward === null) {
      Alert.alert('Select Reward', 'Please select a reward first!');
      return;
    }
    Alert.alert(
      'Congratulations! 🎉',
      `You've completed "${ACTIVITIES[selectedActivity].label}" and earned: ${REWARDS[selectedReward].emoji} ${REWARDS[selectedReward].text}!`,
      [
        {
          text: 'Done',
          onPress: () => router.back(),
        }
      ]
    );
  };

  if (showRewards) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => setShowRewards(false)}>
          <Text style={{ fontSize: 18, color: '#000' }}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Rewards</Text>
        <Text style={styles.subtitle}>Pick a Reward</Text>

        <ScrollView contentContainerStyle={styles.rewardsContainer}>
          {REWARDS.map((reward, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.rewardButton,
                selectedReward === index && styles.selectedCard
              ]}
              onPress={() => handleRewardSelect(reward, index)}
            >
              <Text style={styles.rewardText}>
                {reward.emoji} {reward.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity 
          style={[styles.nextButton, selectedReward === null && styles.disabledButton]}
          onPress={handleClaimReward}
        >
          <Text style={styles.nextButtonText}>Claim Reward</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={{ fontSize: 18, color: '#000' }}>Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Let's complete Challenge</Text>
        <Text style={styles.subtitle}>
          Spend all of it and bring your current anxiety level down to an ideal level before the day ends
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.activitiesGrid}
        showsVerticalScrollIndicator={false}
      >
        {ACTIVITIES.map((activity, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.activityCard,
              selectedActivity === index && styles.selectedCard
            ]}
            onPress={() => handleActivitySelect(activity, index)}
          >
            <Text style={styles.activityLabel}>{activity.label}</Text>
            {selectedActivity === index && isCompleted && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={[styles.nextButton, selectedActivity === null && styles.disabledButton]}
        onPress={handleCompleteActivity}
      >
        <Text style={styles.nextButtonText}>
          {isCompleted ? 'Choose Reward' : 'Mark as Complete'}
        </Text>
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
    marginHorizontal: 20,
    marginTop: 20,
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
  selectedCard: {
    backgroundColor: '#E1BEE7',
    borderWidth: 2,
    borderColor: '#9C27B0',
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
  },
  activityLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    textAlign: 'center',
  },
  rewardsContainer: {
    flexGrow: 1,
    padding: 20,
  },
  rewardButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 16,
    color: '#000',
  },
  nextButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#9C27B0',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#D1C4E9',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ChallengePage;