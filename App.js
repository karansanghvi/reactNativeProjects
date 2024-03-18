import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SMS from 'expo-sms';

export default function App() {

  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  // function sends the message to the number using Expo's SMS API
  const sendSMS = async () => {
    try {
      await SMS.sendSMSAsync(number, message);
      alert("Message sent successfully");
    } catch (error) {
      alert("Failed to send message");
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SMS Demo</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter phone number'
        value={number}
        onChangeText={setNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder='Enter message'
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button
        title="Send Message"
        onPress={sendSMS}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  }
});
