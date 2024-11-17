import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HeatMap from '@ncuhomeclub/react-native-heatmap';
import {data} from './stressLevelsData.js';

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
    
    return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.top}>
        {/* Header Section */}
        <View style={styles.header}>
            <Image source={{uri: 'https://example.com/profile.jpg'}} style={styles.profileImage} />
            <Text style={styles.greeting}>Hi, Elina!</Text>
        </View>

        {/* Search Bar */}
        <TextInput style={styles.searchInput} placeholder="Search anything..." />
      </View> 
      
      <View style={styles.bottom}>
        <Text style={styles.heading}>StessLevels at a Glance</Text>
        <ScrollView horizontal={true} style={styles.calendarContainer}>
            <HeatMap style={styles.heatmap} data={data} color={color} xNumber={52} yNumber={7} direction="vertical" shape='circle' />
        </ScrollView>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Let's Track Your Mood!</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Let's complete Challenge</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Rewards</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Journal</Text></TouchableOpacity>
      </View>
    </ScrollView>   
  );
};

const styles = StyleSheet.create({
    top: {flexDirection: 'column', padding: 20, gap: 20, backgroundColor:'#DAC0FC'},
    bottom: {flexDirection: 'column', alignItems: 'center', padding: 20, gap: 10},
    header: { flexDirection: 'row', alignItems: 'center'},
    profileImage: { width: 80, height: 80, borderRadius: 40, borderColor: '#000000', borderWidth: 2 },
    greeting: { fontSize: 24, fontWeight: '600', marginLeft: 10, color: '#4A4A4A' },
    searchInput: { backgroundColor: '#FFF', padding: 10, borderRadius: 30, width: '100%'},
    heading: { fontSize: 18, fontWeight: '600', marginTop: 10, width: '100%'},
    calendarContainer: { marginTop: 10, marginBottom: 20, height: '50%', width: '100%'},
    heatmap: { width: '100%', height: '100%', borderColor: '#000FF0', borderWidth: 2 },
    button: { backgroundColor: '#ECEAFF', padding: 15, borderRadius: 30, borderColor: '#000000', borderWidth: 2, width: '100%', alignItems: 'center', marginVertical: 10 },
    buttonText: { fontSize: 20, fontWeight: '600' },
});

export default Home;