import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GoalItem({ goal }) {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}>{goal.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
      text: {
        fontSize: 100,
        color: 'purple',
      },
      textContainer: {
        borderRadius: 5,
        backgroundColor: '#999',
        padding: 5,
        marginTop: 10,
      },
});
