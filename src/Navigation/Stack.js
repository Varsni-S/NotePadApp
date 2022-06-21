import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import AddNotes from '../Screens/AddNotes';

export default function Stack() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          // options={{
          //   headerShown: false,
          // }}
        />
        <Stack.Screen
          name="AddNotes"
          component={AddNotes}
          // options={{
          //   headerShown: false,
          // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
