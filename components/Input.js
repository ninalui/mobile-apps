import React, { useState } from 'react';
import { TextInput, Text, Button, View, StyleSheet, Modal, Alert, Image } from 'react-native';

export default function Input({ focus, inputHandler, showModal, cancelHandler }) {
    const [text, setText] = useState('');
    const [count, setCount] = useState(0);
    const [isFocused, setIsFocused] = useState(focus);

    function handleConfirm() {
        // console.log(text);
        setText('');
        setCount(0);
        inputHandler(text);
    };

    function handleCancel() {
        Alert.alert('Are you sure you want to cancel?', 'Press OK to cancel adding a goal', [
            { text: 'Cancel', style: 'cancel', },
            {
                text: 'OK',
                onPress: () => {
                    setText('');
                    setCount(0);
                    cancelHandler()
                }
            },
        ]);
    };

    return (

        <Modal
            animationType='slide'
            visible={showModal}
            transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png'
                        }}
                        alt='Target Icon - URL source'
                    />
                    <Image
                        style={styles.image}
                        source={require('../assets/target.png')}
                        alt='Target Icon - local source'
                    />

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

                    {/* cancel and confirm buttons */}
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
                                disabled={count < 3}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    modal: {
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20, 
    },
});