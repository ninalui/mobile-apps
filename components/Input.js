import React, { useState } from 'react';
import { TextInput } from 'react-native';

export default function Input( { focus }) {
    const [text, setText] = useState('');
    return (
        <TextInput
            autoCorrect={true}
            keyboardType="default"
            style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
            placeholder="Enter text here"
            value={text}
            onChangeText={(changedText) => {
                setText(changedText);
            }}
            autoFocus={focus}
        />
    )
}