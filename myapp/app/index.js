import { View } from 'react-native';
// import HomeScreen from './HomeScreen';
import SignUpScreen from './signup';

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      <SignUpScreen />
    </View>
  );
}