import { View, Text, Button } from 'react-native'
import React from 'react'

export default function GoalDetails({ navigation, route }) {

    function moreDetailsHander() {
        navigation.push('Details');
    }

    return (
        <View>
            {route.params ? (
                <Text>Viewing goal details with text {route.params.goal.text} and id {route.params.goal.id}</Text>
            ) : (
                <Text>More details</Text>
            )}

            <Button
                title="More Details"
                onPress={moreDetailsHander}
            />
        </View>
    )
}