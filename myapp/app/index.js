import { View } from 'react-native';
import Greeting from './Greeting';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Challenge from './Challenge';
import Rewards from './Rewards';

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      <Rewards/>
    </View>
  );
}