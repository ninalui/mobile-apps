import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import PressableButton from './PressableButton';
import { database } from '../Firebase/firebaseSetup';
import { writeToDB, deleteFromDB, deleteAll } from '../Firebase/firestoreHelper';
import { onSnapshot, collection, doc, query, where } from 'firebase/firestore';
import { auth } from '../Firebase/firebaseSetup';

export default function Home({ navigation }) {
  // console.log(database);
  const appName = "My app!";
  const inputFocus = true;

  const [inputtedText, setInputtedText] = useState('Study');
  const [showModal, setShowModal] = useState(false);
  const [goals, setGoals] = useState([]);

  // update to receive data from database
  useEffect(() => {
    // should only query user's data, not entire collection 
    const unsubscribe = onSnapshot(
      query(
        collection(database, 'goals'),
        where('owner', '==', auth.currentUser.uid)
      ),
      (querySnapshot) => {
        let newArray = [];
        querySnapshot.forEach((docSnapshot) => {
          newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        setGoals(newArray);
      },
      (error) => {
        console.log(error);
        Alert.alert(error.message);
      });
    return () => {
      unsubscribe();
    }
  }, []);

  function handleInputData(inputData) {
    // console.log("App.js", inputData);
    // replacing with new obj instead
    // setInputtedText(inputData); 
    let newGoal = { text: inputData };
    // adding info about owner of goal (to control access)
    newGoal = { ...newGoal, owner: auth.currentUser.uid };
    writeToDB(newGoal, 'goals');
    // setGoals((prevGoals) => {
    //   return [...prevGoals, newGoal]
    // });
    setShowModal(false);
  };

  function handleCancel() {
    setShowModal(false);
  };

  function handleDelete(deleteId) {
    deleteFromDB(deleteId, 'goals');
    // setGoals((prevGoals) => {
    //   return prevGoals.filter(goal => goal.id !== deleteId);
    // });
  };

  function handleDeleteAll() {
    Alert.alert('Are you sure you want to delete all goals?', null, [
      { text: 'No', style: 'cancel', },
      {
        text: 'Yes',
        onPress: () => {
          deleteAll('goals');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <Input focus={inputFocus} inputHandler={handleInputData} showModal={showModal} cancelHandler={handleCancel} />

        <PressableButton
          componentStyle={styles.addButton}
          pressedStyle={styles.addPressedStyle}
          pressHandler={() => setShowModal(true)}
        >
          <Text style={styles.addText}>Add a Goal</Text>
        </PressableButton>

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
          ListHeaderComponent={goals.length > 0 ? <Text style={styles.title}>My Goals</Text> : null}
          ListFooterComponent={goals.length > 0 ? <Button title="Delete all" onPress={() => handleDeleteAll()} /> : null}
          ListFooterComponentStyle={styles.footerContainer}
          ItemSeparatorComponent={({ highlighted }) => <View style={[styles.divider, highlighted && { backgroundColor: 'purple' }]} />}
          data={goals}
          // highlight separator when item selected 
          renderItem={({ item, separators }) => (
            <GoalItem
              goal={item}
              deleteHandler={handleDelete}
              navigation={navigation}
              onPressIn={() => separators.highlight()}
              onPressOut={() => separators.unhighlight()} />
          )}
        />
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
  footerContainer: {
    marginTop: 20,
  },
  divider: {
    height: 5,
    backgroundColor: 'grey',
    marginBottom: 5,
    marginTop: 15,
  },
  addButton: {
    backgroundColor: 'darkmagenta',
    padding: 10,
    borderRadius: 5,
  },
  addText: {
    color: 'white',
    fontSize: 18,
  },
  addPressedStyle: {
    backgroundColor: 'grey',
    opacity: 0.5,
  }
});