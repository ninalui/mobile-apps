import { View, Button } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
    const [response, requestPermission] = ImagePicker.useCameraPermissions();

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

    const takeImageHandler = async () => {
        try {
            // check have permission
            const havePermission = await verifyPermission();
            if (!havePermission) {
                Alert.alert('You need to give permission to use the camera');
                return;
            }
            // only launch camera if have permission
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
            });
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View>
            <Button
                title='Take an Image'
                onPress={takeImageHandler}
            />
        </View>
    )
}