import React from 'react';
import { View } from 'react-native';
import App from './App';
import Home from './Home';

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      {/* <Home /> */}
      <App/>
    </View>
  );
}