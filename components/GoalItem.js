import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function GoalItem({ goal, deleteHandler, navigation }) {

    function handleDelete() {
        deleteHandler(goal.id);
    };

    function handlePress() {
        navigation.navigate('Details', { goal: goal });
    };

    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}>{goal.text}</Text>
            <Button title="X" color={"grey"} onPress={handleDelete}/>
            <Button title="i" color={"grey"} onPress={handlePress} />
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
});
