import { View, Button, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager({ getImageUri }) {
    const [response, requestPermission] = ImagePicker.useCameraPermissions();
    const [imageUri, setImageUri] = useState('');

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
            setImageUri(result.assets[0].uri);
            // send image uri back to Input.js
            getImageUri(result.assets[0].uri);
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
            {imageUri.length > 0 &&
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    alt='Preview of image taken by the user'
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        margin: 10,
    }
});
