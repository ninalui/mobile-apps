import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import * as Notifications from 'expo-notifications'

export default function NotificationManager() {
    async function verifyPermission() {
        try {
            const permissionResponse = await Notifications.getPermissionsAsync();
            if (permissionResponse.status !== 'granted') {
                const newPermission = await Notifications.requestPermissionsAsync();
            }
            return permissionResponse.status === 'granted';
        
        } catch (error) {
            console.log('Error getting notification permissions', error);
        }
    }

    async function scheduleNotifcationHandler() {
        try {
            const hasPermission = await verifyPermission();
            if (!hasPermission) {
                Alert.alert('You need to give permission to use notifications');
                return;
            }
            const id = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Notification',
                    body: 'New Notification',
                },
                trigger: {
                    seconds: 3
                },
            });
            console.log(id);
        } catch (error) {
            console.log('Error scheduling notification', error);
        }
    }

    return (
        <View>
            <Button title="Schedule a Notification" onPress={scheduleNotifcationHandler} />
        </View>
    )
}