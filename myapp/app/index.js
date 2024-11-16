import { View } from 'react-native';
import Greeting from './Greeting';
// import Home from './Home';

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      <Greeting/>
      {/* <Home /> */}
    </View>
  );
}