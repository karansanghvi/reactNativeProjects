import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { firebase } from '../config';
import Login from './Login';

const Registration = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const registerUser = async () => {
    try {
      // Create user in Firebase Authentication
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // Send email verification
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://authenticationsystem-9e2c9.firebaseapp.com/',
      });

      // Store user data in Firestore
      await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
        firstName,
        lastName,
        email,
      });

      // Alert user and navigate to login page
      alert('Verification email sent. Please check your email and verify your account.');
      navigation.navigate('Login'); // Replace 'Login' with the name of your login screen
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 23 }}>
        Register Here!!
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder='First Name'
          onChangeText={(text) => setFirstName(text)}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Last Name'
          onChangeText={(text) => setLastName(text)}
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
        />
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={registerUser}
        style={styles.button}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
