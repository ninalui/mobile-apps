import { View, Text, Button } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Home from './components/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GoalDetails from './components/GoalDetails'

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'My Goals' }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={
            ({ route }) => (
              {
                title: route.params ? route.params.goal.text : 'More Details',
              }
            )
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

