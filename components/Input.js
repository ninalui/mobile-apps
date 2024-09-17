import React, { useState } from 'react';
import { TextInput, Text, Button, View, StyleSheet, Modal, Alert } from 'react-native';

export default function Input({ focus, inputHandler, showModal, cancelHandler }) {
    const [text, setText] = useState('');
    const [count, setCount] = useState(0);
    const [isFocused, setIsFocused] = useState(focus);

    function handleConfirm() {
        // console.log(text);
        inputHandler(text);
    };

    function handleCancel() {
        Alert.alert('Are you sure you want to cancel?', 'Press OK to cancel adding a goal', [
            { text: 'Cancel', style: 'cancel', },
            { text: 'OK', onPress: () => { cancelHandler() } },
        ]);
    };

    return (
        <Modal animationType='slide' visible={showModal}>
            <View style={styles.container}>
                <TextInput
                    autoCorrect={true}
                    keyboardType="default"
                    style={styles.input}
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

                <View style={styles.buttonRow}>
                    <View style={styles.padding}>
                        <Button
                            title='Cancel'
                            onPress={handleCancel}
                        />
                    </View>
                    <View style={styles.padding}>
                        <Button
                            title='Confirm'
                            onPress={handleConfirm}
                        />
                    </View>
                </View>
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
    input: {
        borderWidth: 2,
        padding: 5,
        color: 'blue',
        borderColor: 'purple',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    padding: {
        padding: 10,
    },
});