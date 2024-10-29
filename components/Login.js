import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseSetup';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupHandler = () => {
        navigation.replace('Signup');
    };

    const loginHandler = async () => {
        // validation:
        // 1. no fields are empty
        if (!email || !password) {
            Alert.alert('Please fill in all fields');
            return;
        }
        // 2. email is valid
        if (!email.includes('@') || !email.includes('.')) {
            Alert.alert('Invalid email address');
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User signed in', user);
        } catch (error) {
            console.log('error signing in', error);
        }
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
                onPress={loginHandler}
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