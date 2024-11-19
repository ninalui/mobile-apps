import { View, Text, Button, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import PressableButton from './PressableButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { updateDB } from '../Firebase/firestoreHelper';
import GoalUsers from './GoalUsers';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';

export default function GoalDetails({ navigation, route }) {

    const [textColor, setTextColor] = useState('black');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        async function downloadImage() {
            try {
                if (route.params?.goal.uri) {
                    const imageRef = ref(storage, route.params.goal.uri);
                    const url = await getDownloadURL(imageRef);
                    setImageUrl(url);
                }
            } catch (error) {
                console.log(error);
            }
        }
        downloadImage();
    }, []);

    function moreDetailsHandler() {
        if (route.params) {
            navigation.push('Details');
        }
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

            <GoalUsers id={route.params.goal.id} />
            {imageUrl ? <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100 }} /> : null}
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