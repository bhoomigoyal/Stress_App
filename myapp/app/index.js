import { View } from 'react-native';
import MoodTracker from './MoodTracker'
// import SignUp from './SignUp';
import SignIn from './SignIn';
import StressDataForm from './StressDataForm';
import Home from './Home';
import Journal from './Journal';
import Rewards from './Rewards';
import Challenge from './Challenge'


export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      {/* <SignIn/> */}
      {/* <Home /> */}
      {/* <Journal /> */}
      {/* <Rewards /> */}
      {/* <Challenge /> */}
      <StressDataForm/>
      {/* <MoodTracker /> */}
    </View>
  );
}
