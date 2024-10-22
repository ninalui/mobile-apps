import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import PressableButton from './PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { updateDB } from '../Firebase/firestoreHelper';
import GoalUsers from './GoalUsers';

export default function GoalDetails({ navigation, route }) {

    const [textColor, setTextColor] = useState('black');

    function moreDetailsHandler() {
        navigation.push('Details');
    }

    function warningHandler() {
        setTextColor('red');
        navigation.setOptions({
            title: 'Warning!'
        });
        updateDB(route.params.goal.id, { warning: true }, 'goals');
    }

    // on press, change text color and change header title
    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <PressableButton
                    componentStyle={styles.warningStyle}
                    pressHandler={warningHandler}
                    pressedStyle={styles.warningPressedStyle}
                >
                    <AntDesign name="warning" size={25} color="white" />
                </PressableButton>
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
                onPress={moreDetailsHandler}
            />

            <GoalUsers id={route.params.goal.id}/>
        </View>
    )
}

const styles = StyleSheet.create({
    warningStyle: {
        backgroundColor: 'purple',
    },
    warningPressedStyle: {
        backgroundColor: 'red',
        borderRadius: 5,
        opacity: 0.25,
    }
});