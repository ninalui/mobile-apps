import { View, Text } from 'react-native'
import React from 'react'

export default function GoalDetails({ route }) {
    const goal = route.params.goal;
    return (
        <View>
            <Text>Viewing goal details</Text>
            <Text>Goal text: {goal.text}</Text>
            <Text>Goal id: {goal.id}</Text>
        </View>
    )
}