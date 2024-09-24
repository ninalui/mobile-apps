import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function GoalItem({ goal, deleteHandler}) {

    function handleDelete() {
        deleteHandler(goal.id);
    }

    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}>{goal.text}</Text>
            <Button title="X" color={"grey"} onPress={() => handleDelete(goal.id)}/>     
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
