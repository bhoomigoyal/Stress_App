import { View } from 'react-native';
// import HomeScreen from './HomeScreen';
// import SignUpScreen from './signup';
import LoginPage from './LoginPage';
// import LandingPage from './LandingPage';

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      <LoginPage />
    </View>
  );
}