import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';


const ChallengePage = ({ challenges, onComplete }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { completedChallengeLabel } = useLocalSearchParams();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  useEffect(() => {
    if (completedChallengeLabel) {
      const challenges = JSON.parse(challenges);
      const completedChallengeLabel = JSON.parse(completedChallengeLabel);
      console.log("Challenges in parsedchalPage:", challenges);
      console.log("Challenges in parsedcompletedChallengeLabel:", completedChallengeLabel);
      const completedChallenge =  parsedChallenges.find(
        challenge => challenge.label === completedChallengeLabel
      );
      
      if (completedChallenge) {
        handleChallengeCompletion(completedChallenge);
      }
    }
  }, [completedChallengeLabel, challenges]);

  const handleActivitySelect = (activity, index) => {
    setSelectedActivity(index);
  };

  const handleCompleteChallenge = () => {
    if (selectedActivity !== null) {
      
      onComplete(challenges[selectedActivity]);
    }
  };
  const handleStartChallenge = () => {
    if (selectedActivity !== null) {
      const selectedChallenge = challenges[selectedActivity];
      
      // Navigate to timer page with challenge details
      router.push({
        pathname: './temp',
        params: {
          challengeLabel: JSON.stringify(selectedChallenge.label),
          allChallenges: JSON.stringify(challenges),
          
          // onComplete: onComplete
          // allChallenges: challenges.ChallengePage,
          // onComplete: onComplete
          // challengeDuration: selectedChallenge.duration
        }
        // console.log("Challenges in chalPage:", challenges);
      });
    }
  };
  const handleChallengeCompletion = (challenge) => {
    // Add the completed challenge to the list of completed challenges
    setCompletedChallenges(prev => [...prev, challenge]);
    // Reset selected activity
    setSelectedActivity(null);
  };
  console.log("Challenges in chalPage:", challenges);
  return (
  

    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Back Button */}
      {/* <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={{ fontSize: 18, color: '#000' }}>Back</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.backButton} onPress={onComplete}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Stress Management</Text>
        <Text style={styles.subtitle}>
          Choose an activity to help manage your stress and bring your anxiety level down
        </Text>
      </View>

      {/* Activities Grid */}
      <ScrollView
        contentContainerStyle={styles.activitiesGrid}
        showsVerticalScrollIndicator={false}
      >
        
        {challenges.map((activity, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.activityCard,
              selectedActivity === index && styles.selectedCard,
              completedChallenges.some(c => c.label === activity.label) && styles.completedCard
            ]}
            onPress={() => handleActivitySelect(activity, index)}
            disabled={completedChallenges.some(c => c.label === activity.label)}
          >
            <Text style={styles.activityLabel}>{activity.label}</Text>
            <Text style={styles.activityIntensity}>{activity.intensity} Intensity</Text>
            {completedChallenges.some(c => c.label === activity.label) && (
              <Text style={styles.checkmark}>✓</Text>
            )}
            
            {/* {completedChallenges.includes(activity) && (
              <Text style={styles.checkmark}>✓</Text>
            )} */}
{/*             
            {selectedActivity === index && isCompleted && (
                          <Text style={styles.checkmark}>✓</Text>
                      )} */}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity 
        style={[
          styles.nextButton, 
          (selectedActivity === null || 
          completedChallenges.some(c => c.label === challenges[selectedActivity].label)) && 
         styles.disabledButton
        ]}
        onPress={handleStartChallenge}
        disabled={selectedActivity === null}
      >
        {/* <Text style={styles.nextButtonText}>
          {selectedActivity !== null ? 'Complete Challenge' : 'Select an Activity'}
        </Text> */}
         <Text style={styles.nextButtonText}>
          {selectedActivity !== null 
            ? (completedChallenges.some(c => c.label === challenges[selectedActivity].label) 
              ? 'Already Completed' 
              : 'Start Challenge') 
            : 'Select an Activity'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3E5F5',
//   },
//   backButton: {
//     padding: 16,
//   },
//   header: {
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#DAC0FC',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#DAC0FC',
//     textAlign: 'center',
//   },
//   activitiesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   activityCard: {
//     width: '40%',
//     aspectRatio: 1,
//     backgroundColor: 'white',
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 10,
//     shadowColor: '#000',
//     shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
//     shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
//     shadowRadius: Platform.OS === 'ios' ? 4 : undefined,
//     elevation: Platform.OS === 'android' ? 4 : 0,
//   },
//   selectedCard: {
//     backgroundColor: '#DAC0FC',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   activityLabel: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#DAC0FC',
//     textAlign: 'center',
//   },
//   activityIntensity: {
//     fontSize: 14,
//     color: '#8E24AA',
//     marginTop: 8,
//   },
//   nextButton: {
//     marginHorizontal: 20,
//     marginBottom: 20,
//     backgroundColor: '#DAC0FC',
//     padding: 16,
//     borderRadius: 25,
//     alignItems: 'center',
//   },
//   disabledButton: {
//     backgroundColor: '#E1BEF6',
//   },
//   nextButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
const styles = StyleSheet.create({
  container: {
      flexGrow: 1,
      backgroundColor: '#F3E5F5',
  },
  top: { 
      flexDirection: 'row', 
      alignItems: 'center',
      padding: 20, 
      gap: 20, 
      backgroundColor: '#DAC0FC',
  },
  bottom: { 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: 20, 
      gap: 12 
  },
  calendarContainer : {
      marginBottom: 10,
  },
  profileImage: { 
      width: 80, 
      height: 80, 
      borderRadius: 40, 
      borderColor: '#000000', 
      borderWidth: 2 
  },
  greeting: { 
      fontSize: 24,
      marginTop: 10, 
      fontWeight: '600', 
      marginLeft: 0, 
      color: '#000000' 
  },
  searchInput: { 
      backgroundColor: '#FFF', 
      padding: 10, 
      borderRadius: 30, 
      width: '100%' 
  },
  heading: { 
      fontSize: 18, 
      fontWeight: '600', 
      marginTop: 10, 
      width: '100%' 
  },
  button: { 
      backgroundColor: '#ECEAFF', 
      padding: 15, 
      borderRadius: 30, 
      borderColor: '#000000', 
      borderWidth: 2, 
      width: '100%', 
      alignItems: 'center', 
      marginVertical: 10 
  },
  buttonText: { 
      fontSize: 20, 
      fontWeight: '600' 
  },
  backButton: {
      padding: 16,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#4A148C',
      textAlign: 'center',
      marginBottom: 8,
  },
  subtitle: {
      // paddingVertical: 10,
      fontSize: 16,
      color: '#9C27B0',
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 30,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#4A148C',
      textAlign: 'center',
      marginBottom: 8,
      // backgroundColor: 'yellow', // Temporary debug color
  },
  subtitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#4A148C',
      textAlign: 'center',
      marginTop: 10,
      // backgroundColor: 'lightgreen', // Temporary debug color
  },
  moodTrackerContainer: {
      flex: 1,
      backgroundColor: '#F3E5F5',
  },
  scrollView: {
      flex: 1,
  },
  moodGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: 20,
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
      backgroundColor: '#E1BEE7',
      borderWidth: 2,
      borderColor: '#4A148C',
  },
  moodEmoji: {
      fontSize: 32,
      marginBottom: 4,
  },
  moodLabel: {
      fontSize: 12,
      color: '#4A148C',
      marginTop: 4,
  },
  header : {
      padding: 20
  },
  activitiesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: 16,
      // border: '1px solid green',
  },
  activityCard: {
      width: '40%',
      aspectRatio: 1,
      backgroundColor: 'white',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
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
  selectedCard: {
      backgroundColor: '#E1BEE7',
      borderWidth: 2,
      borderColor: '#4A148C',
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
      borderColor: '#4A148C',
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
      backgroundColor: '#4A148C',
      padding: 16,
      borderRadius: 25,
      alignItems: 'center',
  },
  nextButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
  },
  recordButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      marginHorizontal: 20,
      marginBottom: 20,
      backgroundColor: '#4A148C',
      padding: 16,
      borderRadius: 25,
      textAlign: 'center',
  },
  completedCard: {
    backgroundColor: '#E8F5E9', // Light green background for completed challenges
    borderWidth: 2,
    borderColor: '#4CAF50', // Green border for completed challenges
  },
  disabledButton: {
    backgroundColor: '#E1BEF6', // Existing disabled button style
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
export default ChallengePage;
