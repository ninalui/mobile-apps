import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = "My app!";
  const inputFocus = true;

  const [inputtedText, setInputtedText] = useState('')

  function handleInputData(inputData) {
    console.log("App.js", inputData);
    setInputtedText(inputData);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Input focus={inputFocus} inputHandler={handleInputData}/>
      <Text>{inputtedText}</Text>
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
