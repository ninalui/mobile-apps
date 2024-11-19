import { View, Button, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDocumentById, setDB } from '../Firebase/firestoreHelper';
import { auth } from '../Firebase/firebaseSetup';

export default function LocationManager() {
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        async function getUserData() {
            const userData = await getDocumentById(auth.currentUser.uid, "users");
            if (userData && userData.location) {
                setLocation(userData.location);
            }
        }
        // only fetch data if no selected location in route params
        if (!route.params) {
            getUserData();
        }
    }, []);

    useEffect(() => {
        if (route.params) {
            setLocation(route.params.selectedLocation);
        }
    }, [route.params]);

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

    async function saveLocationHandler() {
        //call updateDB, save location in user doc
        setDB(auth.currentUser.uid, { location }, 'users');
        navigation.navigate('Home');
    };

    return (
        <View>
            <Button title='Get My Location' onPress={locateUserHandler} />
            <Button title='Go to Map' onPress={() => navigation.navigate('Map')} />
            {location && <Image source={{
                uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`
            }}
                style={{ width: windowWidth, height: 200 }}
            />
            }
            <Button title='Save Location' onPress={saveLocationHandler} />
        </View>
    )
}