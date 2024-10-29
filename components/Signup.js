import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const loginHandler = () => {
        navigation.replace('Login');
    };

    const signupHandler = async () => {
        // validation: 
        // 1. no fields are empty
        if (!email || !password || !confirmPassword) {
            Alert.alert('Please fill in all fields');
            return;
        }
        // 2. password and confirm password match
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }
        // 3. email is valid 
        if (!email.includes('@') || !email.includes('.')) {
            Alert.alert('Invalid email address');
            return;
        }
        // 4. password is at least 6 characters long
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters long');
            return;
        }
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User created');
        } catch (error) {
            console.log('error creating user', error);
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

            <Text>Confirm Password</Text>
            <TextInput
                style={styles.inputField}
                secureTextEntry={true}
                placeholder='Confirm Password'
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />

            <Button
                title="Signup"
                onPress={signupHandler}
            />

            <Button
                title="Already registered? Login"
                onPress={loginHandler}
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