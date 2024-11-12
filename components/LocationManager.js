import { View, Button } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location'

export default function LocationManager() {
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);

    async function verifyPermission() {
        try {
            // if don't have permission, request permission
            if (response.granted === false) {
                await requestPermission();
            }
            return response.granted;
        } catch (err) {
            console.log(err);
        }
    };

    async function locateUserHandler() {
        try {
            const hasPermission = await verifyPermission();
            if (!hasPermission) {
                Alert.alert('You need to give permission to use location services');
                return;
            }
            const response = await Location.getCurrentPositionAsync();
            setLocation({ latitude: response.coords.latitude, longitude: response.coords.longitude });
        } catch (error) {
            console.log('Error locating', error);
        }
    };

    return (
        <View>
            <Button title='Get My Location' onPress={locateUserHandler} />
        </View>
    )
}