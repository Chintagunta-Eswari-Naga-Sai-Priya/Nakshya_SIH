import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen, DataLoggingScreen } from './mainscre';
import Init from './initia'; // Change this line

import { View, SafeArrayView,TextInput, Button, StyleSheet, Text, Alert, Switch } from 'react-native';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Nakshya">
        <Stack.Screen name="Nakshya" component={Init} />
        <Stack.Screen name="Maps" component={MainScreen} />
        <Stack.Screen name="DataLogging" component={DataLoggingScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  
  );
};




export default App;