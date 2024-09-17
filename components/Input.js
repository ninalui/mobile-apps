import React, { useState } from 'react';
import { TextInput, Text, Button, View, StyleSheet, Modal } from 'react-native';

export default function Input({ focus, inputHandler, showModal }) {
    const [text, setText] = useState('');
    const [count, setCount] = useState(0);
    const [isFocused, setIsFocused] = useState(focus);

    

    function handleConfirm() {
        // console.log(text);
        inputHandler(text);
    }

    return (
        <Modal animationType='slide' visible={showModal}>
            <View style={styles.container}>
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
                    onFocus={() => setIsFocused(true)}
                    onSubmitEditing={() => setIsFocused(false)}
                />
                {/* focus: show character count
            blur: show message based on count < 3 */}
                {isFocused ? (
                    count > 0 ? <Text>Character count: {count}</Text> : null
                ) : (
                    count < 3 ? <Text>Please type more than 3 characters</Text> : <Text>Thank you</Text>
                )}

                <Button
                    title='Confirm'
                    onPress={handleConfirm}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});