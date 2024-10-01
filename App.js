import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Home from './components/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GoalDetails from './components/GoalDetails'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'My Goals',
            headerStyle: { backgroundColor: 'purple' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen name="Details" component={GoalDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

