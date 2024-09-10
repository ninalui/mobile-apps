import React, { useState } from 'react';
import { TextInput, Text } from 'react-native';

export default function Input( { focus }) {
    const [text, setText] = useState('');
    const [count, setCount] = useState(0);
    return (
        <>
        <TextInput
            autoCorrect={true}
            keyboardType="default"
            style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
            placeholder="Enter text here"
            value={text}
            onChangeText={(changedText) => {
                setText(changedText);
                setCount(changedText.length);
            }}
            autoFocus={focus}
        />
        <Text>Character count: {count}</Text>
        </>
    )
}