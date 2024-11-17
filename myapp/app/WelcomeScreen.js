import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo or Heading */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>StressLess</Text>
        <View style={styles.gglowEffect} />
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Unlock Peace, Anytime, Anywhere!</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/MoodTracker')}
        >
          <Text style={styles.primaryButtonText}>GETTING STARTED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => console.log('Login pressed')}
        >
          <Text style={styles.secondaryButtonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>

      {/* Social Login */}
      <Text style={styles.orText}>OR CONTINUE WITH</Text>
      <View style={styles.socialIcons}>
        {/* Local images for Google and Apple logos */}
        <Image
          source={require('../assets/google.png')}
          style={styles.icon}
        />
        <Image
          source={require('../assets/apple.png')}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 50, // Increased spacing
    alignItems: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9C27B0',
    fontFamily: 'serif',
  },
  gglowEffect: {
    width: 250, 
    height: 250,
    backgroundColor: '#E1BEE7',
    borderRadius: 125,
    position: 'absolute',
    top: -80, 
    alignSelf: 'center', 
    zIndex: -1, 
    opacity: 0.7, // Slightly more visible
  },  
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop:70,
    marginBottom: 20, // Increased spacing
    textAlign: 'center', // Center-aligned for better symmetry
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20, // Adjusted spacing
    marginTop:10,
  },
  primaryButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15, // Increased spacing between buttons
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#E1BEE7',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#9C27B0',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    color: '#666',
    fontSize: 14,
    marginVertical: 20,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 15,
  },
});

export default WelcomeScreen;