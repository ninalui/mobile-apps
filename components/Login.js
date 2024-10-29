import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupHandler = () => {
        navigation.replace('Signup');
    };


    return (
        <View style={styles.container}>
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

            <Button
                title="Login"
            />

            <Button
                title="New User? Create an Account"
                onPress={signupHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    inputField: {
        borderWidth: 2,
        borderColor: 'darkslateblue',
        textAlign: 'center',
        color: 'darkslateblue',
        fontWeight: 'bold',
        padding: 10,
        marginBottom: 20,
    },
});