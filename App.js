<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from './config';
import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import Header from './src/components/Header';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null); 

  function onAuthStateChanged(user) {
    setUser(user); 
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); 
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTitle: () => <Header name="Bug Ningas" />,
              headerStyle: {
                height: 150,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: '#00e4d0',
                shadowColor: '#000',
                elevation: 25
              }
            }}
          />

          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{
              headerTitle: () => <Header name="Bug Ningas" />,
              headerStyle: {
                height: 150,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: '#00e4d0',
                shadowColor: '#000',
                elevation: 25
              }
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerTitle: () => <Header name="Dashboard" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: '#00e4d0',
              shadowColor: '#000',
              elevation: 25
            }
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}
>>>>>>> 70505de92f2661777a43d1dc44834ab4e86690b9
