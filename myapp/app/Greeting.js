// page wrt the Figma --> 1
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Greeting() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text>There are a total of 8 Pages - Everyone please complete the page that was assigned to you. The files have already beeen made, so you may start completing the code in them.</Text>
        <Text>1 Greeting</Text>
        <Text>2 SignIn</Text>
        <Text>3 SignUp</Text>
        <Text>4 Home</Text>
        <Text>5 MoodTracker</Text>
        <Text>6 Journal</Text>
        <Text>7 Challenges</Text>
        <Text>8 Rewards</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
  },
  backButton: {
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
});