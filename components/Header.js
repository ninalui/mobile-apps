import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default function Header( {name} ) {
    const { width, height } = useWindowDimensions();
    console.log(width, height);
    return (
        <View>
            <Text style={[styles.text,{ paddingVertical: height < 415 ? 0: 10 }]}>Welcome to {name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
      color: 'purple',
      fontSize: windowWidth < 400 ? 25 : 35,
      borderWidth: 2,
      borderRadius: 4, 
      borderColor: 'purple',
      padding: 5,
      marginBottom: 5
    }
  });