import { View, Text } from 'react-native'
import React from 'react'
import { auth } from '../Firebase/firebaseSetup'

export default function Profile() {
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
    </View>
  )
}