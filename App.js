import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = "My app!";
  const inputFocus = true;

  const [inputtedText, setInputtedText] = useState('Study');
  const [showModal, setShowModal] = useState(false);
  const [goals, setGoals] = useState([]);

  function handleInputData(inputData) {
    // console.log("App.js", inputData);
    // replacing with new obj instead
    // setInputtedText(inputData); 
    let newGoal = { text: inputData, id: Math.random() };
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal]
    });
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
        <Input focus={inputFocus} inputHandler={handleInputData} showModal={showModal} cancelHandler={handleCancel} />
        <Button title="Add a Goal" onPress={() => setShowModal(true)} />
      </View>
      <View style={styles.bottomView}>
        {goals.map((goal) => {
          return (
            <View style={styles.textContainer} key={goal.id}>
              <Text style={styles.text}>{goal.text}</Text>
            </View> 
          );
        })}
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
    fontSize: 20,
    color: 'purple',
  },
  textContainer: {
    borderRadius: 5,
    backgroundColor: '#999',
    padding: 5,
    marginTop: 5,
  }
});