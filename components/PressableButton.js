import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'

export default function PressableButton({ children, componentStyle, pressHandler, pressedStyle }) {
    return (
        <Pressable
            onPress={pressHandler}
            style={({ pressed }) => [
                styles.default,
                componentStyle,
                pressed && styles.defaultPressed,
                pressed && pressedStyle,
            ]}
        >
            <View>
                {children}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: 'blue', 
    },
    defaultPressed: {
        opacity: 0.2,
        backgroundColor: 'red'
    }
})