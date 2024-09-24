import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import GoalItem from './components/GoalItem';

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

  function handleDelete(deleteId) {
    setGoals((prevGoals) => {
      return prevGoals.filter(goal => goal.id !== deleteId);
    });
  };

  function handleDeleteAll() {
    Alert.alert('Are you sure you want to delete all goals?', null,  [
      { text: 'No', style: 'cancel', },
      {
        text: 'Yes',
        onPress: () => {
          setGoals([]);
        }
      },
    ]);
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
        {/* <ScrollView contentContainerStyle={styles.listContainer}>
        {goals.map((goal) => {
          return (
            <View style={styles.textContainer} key={goal.id}>
              <Text style={styles.text}>{goal.text}</Text>
            </View> 
          );
        })}
        </ScrollView> */}
        <FlatList
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.title}>No goals to show</Text>}
        ListFooterComponent={goals.length > 0 ? <Button title="Delete all" onPress={() => handleDeleteAll()} /> : null }
        ItemSeparatorComponent={() => <View style={styles.divider} /> }
        data={goals}
        renderItem={itemData => (
          <GoalItem goal={itemData.item} deleteHandler={handleDelete} />
        )} />
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
    backgroundColor: '#dcd',
  },
  listContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'indigo',
    padding: 5,
  },
  divider: {
    height: 5,
    backgroundColor: 'grey',
    marginBottom: 5,
    marginTop: 15,
  }
});