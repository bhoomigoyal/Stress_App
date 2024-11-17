import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const SignUp = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // For loading state

  const handleSignUp = async () => {
    if (!email || !phone || !password) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }
  
    const userData = {
      email,
      phone,
      password,
    };
  
    try {
      setLoading(true);
      console.log('Attempting to connect to:', 'http://10.10.49.151:5001/api/signup');
      console.log('With data:', userData);
      
      const response = await fetch('http://10.10.49.151:5001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
  
      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        router.push('/Home');
      } else {
        Alert.alert('Error', data.message || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Detailed error:', error);
      Alert.alert(
        'Connection Error',
        `Failed to connect to the server. Error: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>Connect with your friends today!</Text>
      </View>

      {/* Input fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter Your Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Phone Number"
        keyboardType="phone-pad"
        autoCapitalize="none"
        value={phone}
        onChangeText={setPhone}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter Your Password"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons name="eye-off" size={20} color="gray" style={styles.icon} />
      </View>

      {/* Sign-up Button */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.signUpButtonText}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      {/* Or With */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or With</Text>
        <View style={styles.divider} />
      </View>

      {/* Google Sign-up Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Ionicons name="logo-google" size={20} color="black" />
        <Text style={styles.googleButtonText}>Signup with Google</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => router.push('/SignIn')}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E8FF',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 8,
  },
  signUpButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  loginText: {
    textAlign: 'center',
    color: '#666',
  },
  loginLink: {
    color: '#9C27B0',
    fontWeight: '600',
  },
});

export default SignUp;
