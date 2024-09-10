import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = "My app!";

  return (
    <View style={styles.container}>
      {/* <Text>Welcome to {appName}</Text> */}
      <Header name={appName} />
      <Input />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
