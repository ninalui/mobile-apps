import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Home from './components/Home'

export default function App() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}