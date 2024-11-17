import { View } from 'react-native';
import Greeting from './Greeting';
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      <SignUp />
    </View>
  );
}