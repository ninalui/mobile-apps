import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const loginHandler = () => {
        navigation.replace('Login');
    };

    return (
        <View>
            <Text>Email Address</Text>
            <TextInput
                style={styles.inputField}
                placeholder='Email Address'
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <Text>Password</Text>
            <TextInput
                style={styles.inputField}
                secureTextEntry={true}
                placeholder='Password'
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            <Text>Confirm Password</Text>
            <TextInput
                style={styles.inputField}
                secureTextEntry={true}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />

            <Button
                title="Login"
            />

            <Button
                title="Already registered? Login"
                onPress={loginHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderBottomWidth: 2,
        borderColor: 'darkslateblue',
        textAlign: 'center',
        color: 'darkslateblue',
        fontWeight: 'bold',
        padding: 10,
    },
});