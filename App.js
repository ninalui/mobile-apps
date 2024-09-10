import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Header from './components/Header';

export default function App() {
  const appName = "My app!";
  const [text, setText] = React.useState("");

  return (
    <View style={styles.container}>
      {/* <Text>Welcome to {appName}</Text> */}
      <Header name={appName} />

      <TextInput
        autoCorrect={true}
        keyboardType="default"
        style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
        placeholder="Enter text here"
        value={text}
        onChangeText={(changedText) => {
          setText(changedText);
        }}
      />

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
