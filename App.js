import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Home from './components/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GoalDetails from './components/GoalDetails'
import Login from './components/Login'
import Signup from './components/Signup'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase/firebaseSetup'
import Profile from './components/Profile'
import AntDesign from '@expo/vector-icons/AntDesign';
import PressableButton from './components/PressableButton'
import { signOut } from 'firebase/auth';

const Stack = createNativeStackNavigator();

const AuthStack = <>
  <Stack.Screen name="Login" component={Login} />
  <Stack.Screen name="Signup" component={Signup} />
</>

const AppStack = <>
  <Stack.Screen
    name="Home"
    component={Home}
    options={({ navigation }) => {
      return {
        title: 'My Goals',
        headerRight: () => (
          <PressableButton
            pressHandler={() => navigation.navigate('Profile')}
            componentStyle={{ backgroundColor: 'purple' }}
          >
            <AntDesign name="user" size={25} color="white" />
          </PressableButton>
        )
      }
    }}
  />
  <Stack.Screen
    name="Details"
    component={GoalDetails}
    options={
      ({ route }) => (
        {
          title: route.params ? route.params.goal.text : 'More Details',
        }
      )
    }
  />
  <Stack.Screen
    name="Profile"
    component={Profile}
    options={{
      headerRight: () => (
        <PressableButton
          pressHandler={() => signOut(auth)}
          componentStyle={{ backgroundColor: 'purple' }}
        >
          <AntDesign name="logout" size={25} color="white" />
        </PressableButton>
      )
    }}
  />
</>

export default function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user signed in', user);
        setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
      }
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: 'white',
        }}
      >
        {isLoggedIn ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

