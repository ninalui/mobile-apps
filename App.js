import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = "My app!";
  const inputFocus = true;

  const [inputtedText, setInputtedText] = useState('');
  const [showModal, setShowModal] = useState(false);

  function handleInputData(inputData) {
    // console.log("App.js", inputData);
    setInputtedText(inputData);
    setShowModal(false);
  };

  function handleCancel() {
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <Input focus={inputFocus} inputHandler={handleInputData} showModal={showModal} cancelHandler={handleCancel}/>
        <Button title="Add a Goal" onPress={() => setShowModal(true)} />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.text}>{inputtedText}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    flex: 4,
    backgroundColor: '#d5a',
    alignItems: 'center',
  },
  text: {
    color: 'darkblue',
    fontSize: 20
  }
});
