import { View, Button, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location'
import { Dimensions } from 'react-native';

export default function LocationManager() {
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);

    const windowWidth = Dimensions.get('window').width;

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
            console.log('located');
        } catch (error) {
            console.log('Error locating', error);
        }
    };

    return (
        <View>
            <Button title='Get My Location' onPress={locateUserHandler} />
            {location && <Image source={{
                uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`
            }}
                style={{ width: windowWidth, height: 200 }}
            />
            }

        </View>
    )
}