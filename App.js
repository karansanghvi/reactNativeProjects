import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TimePicker from './components/TimePicker';

const App = () => {
  return (
    <View style={styles.container}>
      <TimePicker />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40, // Use a numeric value for padding
  }
})
