import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import PressableButton from "./PressableButton";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function GoalItem({ goal, deleteHandler, navigation }) {

    function handleDelete() {
        deleteHandler(goal.id);
    };

    function handlePress() {
        navigation.navigate('Details', { goal: goal });
    };

    function handleLongPress() {
        Alert.alert('Delete', 'Are you sure you want to delete this goal?', [
            { text: 'No', style: 'cancel', },
            {
                text: 'Yes',
                onPress: () => { handleDelete() },
            },
        ]);
    };

    return (
        <View style={styles.textContainer}>
            <Pressable
                onPress={handlePress}
                onLongPress={handleLongPress}
                android_ripple={{ color: 'red', radius: 50 }}
                style={({ pressed }) => [
                    styles.horizontalContainer,
                    pressed && styles.pressedStyle,
                ]}
            >
                <Text style={styles.text}>{goal.text}</Text>
                <PressableButton
                    componentStyle={styles.deleteButton}
                    pressHandler={handleDelete}
                    pressedStyle={styles.pressedStyle}
                >
                    <MaterialIcons name="delete-outline" size={30} color="black" />
                </PressableButton>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        color: 'purple',
        padding: 5,
    },
    textContainer: {
        borderRadius: 5,
        backgroundColor: '#999',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pressedStyle: {
        backgroundColor: 'darkmagenta',
        opacity: 0.25,
    },
    deleteButton: {
        backgroundColor: 'grey',
    },
    deleteText: {
        color: 'white',
    },
});
