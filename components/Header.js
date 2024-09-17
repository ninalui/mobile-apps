import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Header( {name} ) {
    return (
        <View>
            <Text style={styles.text}>Welcome to {name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
      color: 'purple',
      fontSize: 20, 
      borderWidth: 2,
      borderRadius: 4, 
      borderColor: 'purple',
      padding: 5,
      marginBottom: 5
    }
  });