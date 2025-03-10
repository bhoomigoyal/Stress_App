import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Journal from './Journal'
import StressDataForm from './StressDataForm'; 
import HeatMap from '@ncuhomeclub/react-native-heatmap';
import MoodTracker from './mood_tracker.js';  // Import the new MoodTracker component
import {data} from './stressLevelsData.js';
import ChallengePage from './Challenge.js';



// const MOODS = [
//   { emoji: '😊', label: 'Happy' },
//   { emoji: '😌', label: 'Relaxed' },
//   { emoji: '🙂', label: 'Okay' },
//   { emoji: '😔', label: 'Sad' },
//   { emoji: '😐', label: 'Neutral' },
//   { emoji: '😩', label: 'Tired' },
//   { emoji: '😄', label: 'Excited' },
//   { emoji: '😴', label: 'Sleepy' },
//   { emoji: '😠', label: 'Angry' },
// ];

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

const Home = () => {
    const color = {
                theme: '#7003ff',
                opacitys: [
                    { opacity: 0.2, limit: 2 },
                    { opacity: 0.4, limit: 4 },
                    { opacity: 0.6, limit: 6 },
                    { opacity: 0.8, limit: 8 },
                    { opacity: 1, limit: 10 },
                ],
            };
    const insets = useSafeAreaInsets();
    const [currentView, setCurrentView] = useState('home'); // 'home', 'mood', 'challenge', 'rewards'
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [selectedMood, setSelectedMood] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [selectedReward, setSelectedReward] = useState(null);
    const [currentChallenges, setCurrentChallenges] = useState(null);

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
        setCurrentView('rewards');
    };

    const handleRewardSelect = (reward, index) => {
        setSelectedReward(index);
    };

    const handleClaimReward = () => {
        if (selectedReward === null) {
            Alert.alert('Select Reward', 'Please select a reward first!');
            return;
        }
        //else{
            Alert.alert(
        'Congratulations! 🎉',
    `You have completed ${ACTIVITIES[selectedActivity].label} and earned: ${REWARDS[selectedReward].emoji} ${REWARDS[selectedReward].text}!`,
            [
                {
                    text: 'Done',
                    onPress: () => {
                        setCurrentView('home');
                        setSelectedActivity(null);
                        setSelectedReward(null);
                        setIsCompleted(false);
                    },
                }
            ]
        );
    //};
    };
    const handleStartChallenge = (challenges) => {
        setCurrentChallenges(challenges);
        setCurrentView('stress_challenge');
      };
    if (currentView === 'journal') {
        return <Journal onBack={() => setCurrentView('home')} />;
    }
    if (currentView === 'stressdata') {
        return <StressDataForm 
        onBack={() => setCurrentView('home')} 
        onStartChallenge={handleStartChallenge} 
        />;
    }

    if (currentView === 'stress_challenge') {
        return <ChallengePage 
        challenges={currentChallenges}
        onComplete={() => setCurrentView('home')}
        />;
    }
    if (currentView === 'journal') {
        return <Journal onBack={() => setCurrentView('home')} />;
    }
    if (currentView === 'stressdata') {
        return <StressDataForm onBack={() => setCurrentView('home')} />;
    }
    
    if (currentView === 'mood') {
        return <MoodTracker onBack={() => setCurrentView('home')} />;
 
    }

    if (currentView === 'challenge') {
        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => setCurrentView('home')}
                >
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.title}>Let's Complete a Challenge!</Text>
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
    }

    if (currentView === 'rewards') {
        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => setCurrentView('challenge')}
                >
                    <Ionicons name="chevron-back" size={24} color="black" />
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

    // Home view
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.top}>
                <Image source={require('../assets/pfp.jpg')} style={styles.profileImage} />
                <Text style={styles.greeting}>Hi, There!</Text>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.title}>StessLevels at a Glance</Text>
                <ScrollView horizontal={true} style={styles.calendarContainer}>
                     <HeatMap style={styles.heatmap} data={data} color={color} xNumber={52} yNumber={7} direction="vertical" shape='circle' />
                 </ScrollView>
                <TouchableOpacity 

                    style={styles.button} 
                    onPress={() => setCurrentView('mood')}
                >
                    <Text style={styles.buttonText}>Let's Track Your Mood!</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => setCurrentView('challenge')}
                >
                    <Text style={styles.buttonText}>Let's Complete a Challenge!</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Rewards</Text>
                </TouchableOpacity> */}
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => setCurrentView('journal')}
                >
                {/* <TouchableOpacity style={styles.button}> */}
                    <Text style={styles.buttonText}>Let's Journal!</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Measure your StessLevels</Text>
                </TouchableOpacity> */}
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => setCurrentView('stressdata')}
                >
                    <Text style={styles.buttonText}>Measure your Stress Level!</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

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
});

export default Home;