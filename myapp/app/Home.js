
import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Home = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.top}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.profileImage} />
                    <Text style={styles.greeting}>Hi, Elina!</Text>
                </View>

                {/* Search Bar */}
                <TextInput style={styles.searchInput} placeholder="Search anything..." />
            </View>

            <View style={styles.bottom}>
                <Text style={styles.heading}>StessLevels at a Glance</Text>

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
    top: { flexDirection: 'column', padding: 20, gap: 20, backgroundColor: '#DAC0FC' },
    bottom: { flexDirection: 'column', alignItems: 'center', padding: 20, gap: 10 },
    header: { flexDirection: 'row', alignItems: 'center' },
    profileImage: { width: 80, height: 80, borderRadius: 40, borderColor: '#000000', borderWidth: 2 },
    greeting: { fontSize: 24, fontWeight: '600', marginLeft: 10, color: '#4A4A4A' },
    searchInput: { backgroundColor: '#FFF', padding: 10, borderRadius: 30, width: '100%' },
    heading: { fontSize: 18, fontWeight: '600', marginTop: 10, width: '100%' },
    button: { backgroundColor: '#ECEAFF', padding: 15, borderRadius: 30, borderColor: '#000000', borderWidth: 2, width: '100%', alignItems: 'center', marginVertical: 10 },
    buttonText: { fontSize: 20, fontWeight: '600' },
});

export default Home;