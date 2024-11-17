// page wrt the Figma --> 8
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const RewardsPage = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
      </View> */}

      <Text style={styles.title}>Rewards</Text>
      <Text style={styles.subtitle}>Pick a Reward</Text>

      <ScrollView contentContainerStyle={styles.rewardsContainer}>
        {[
          { emoji: '🍦', text: 'Ice cream' },
          { emoji: '🤝', text: 'Volunteer' },
          { emoji: '🙌', text: 'Personal Praise' },
          { emoji: '🎮', text: 'Mobile Game' },
          { emoji: '😴', text: 'Nap' },
          { emoji: '🛍️', text: 'Buy something Nice' },
        ].map((reward, index) => (
          <TouchableOpacity key={index} style={styles.rewardButton}>
            <Text style={styles.rewardText}>
              {reward.emoji} {reward.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5FF', // Light purple background
    paddingHorizontal: 20,
    paddingTop: 90,
  },
  header: {
    marginBottom: 40,
  },
  backButton: {
    fontSize: 24,
    color: '#555',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    marginTop:20,
    fontSize: 20,
    textAlign: 'left',
    color: '#777',
    marginBottom: 20,
  },
  rewardsContainer: {
    flexGrow: 1,
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
    backgroundColor: '#A56EFF', // Purple
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 0,
    // paddingBottom:10,
  },
});

export default RewardsPage;