import React from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";

export default function GoalItem({ goal, deleteHandler, navigation }) {

    function handleDelete() {
        deleteHandler(goal.id);
    };

    function handlePress() {
        navigation.navigate('Details', { goal: goal });
    };

    return (
        <View style={styles.textContainer}>
            <Pressable
                onPress={handlePress}
                android_ripple={{ color: 'red', radius: 50 }}
                style={({ pressed }) => [
                    styles.horizontalContainer,
                    pressed && styles.pressedStyle,
                ]}
            >
                <Text style={styles.text}>{goal.text}</Text>
                <Button title="X" color={"grey"} onPress={handleDelete} />
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
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }, 
    pressedStyle: {
        backgroundColor: 'darkmagenta',
        opacity: 0.25,
    },
});
