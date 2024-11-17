import { View } from 'react-native';
import Greeting from './Greeting';
// import SignUp from './SignUp';
import SignIn from './SignIn';
import StressDataForm from './StressDataForm';
import Home from './Home';
import Journal from './Journal';
import Rewards from './Rewards';


export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      {/* <Home /> */}
      {/* <Greeting /> */}
      {/* <Journal /> */}
      {/* <Rewards /> */}
      <StressDataForm/>
      {/* <MoodTracker /> */}
    </View>
  );
}
