import { Pressable, View } from 'react-native'
import React from 'react'

export default function PressableButton({ children, componentStyle, pressHandler, pressedStyle }) {
    return (
        <Pressable
            onPress={pressHandler}
            style={({ pressed }) => [
                componentStyle,
                pressed && pressedStyle,
            ]}
        >
            <View>
                {children}
            </View>
        </Pressable>
    )
}