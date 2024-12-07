// App.js
import 'react-native-gesture-handler';  // Must be the first import
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import Home from './Home';
import StressDataForm from './StressDataForm';
import MoodTracker from './MoodTracker';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#DAC0FC',
          },
          headerTintColor: '#4A4A4A',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="WelcomeScreen" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ 
            title: 'Home',
            headerLeft: null 
          }} 
        />
        <Stack.Screen 
          name="StressDataForm" 
          component={StressDataForm}
          options={{ title: 'Stress Level Check' }} 
        />
        <Stack.Screen 
          name="MoodTracker" 
          component={MoodTracker}
          options={{ title: 'Mood Tracker' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;