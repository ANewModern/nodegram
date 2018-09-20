import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
// import { Image } from 'react-native';
import { View } from 'react-native';
import Dashboard from './components/Dashboard';
import { CameraView } from './components/Camera';

const App = () => (
  <View style={{ flex: 1 }}>
    <CameraView />
  </View>
);

export default App;