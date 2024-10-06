import { View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function GoalDetails({ navigation, route }) {
    const [textColor, setTextColor] = useState('black');

    function moreDetailsHander() {
        navigation.push('Details');
    }

    // on press, change text color and change header title
    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <Button
                    title="Warning"
                    onPress={() => {
                        setTextColor('red');
                        navigation.setOptions({
                            title: 'Warning!'
                        });
                    }}
                />
        })
    }, [navigation]);

    return (
        <View>
            {route.params ? (
                <Text style={{ color: textColor }}>Viewing goal details with text {route.params.goal.text} and id {route.params.goal.id}</Text>
            ) : (
                <Text style={{ color: textColor }}>More details</Text>
            )}

            <Button
                title="More Details"
                onPress={moreDetailsHander}
            />
        </View>
    )
}