import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { writeToDB } from '../Firebase/firestoreHelper';

export default function GoalUsers({ id }) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/users'
                );
                // promise doesn't get rejected if there is an HTTP error 
                // have to check response.ok 
                // extract data only if response is ok
                if (!response.ok) {
                    throw new Error(`HTTP error with status ${response.status}`);
                };
                // this code will only execute if response.ok is true
                const data = await response.json();
                // write data to the database
                data.map((user) => {
                    writeToDB(user, `goals/${id}/users/`);
                });
                // set users state variable from the data
                const names = data.map(user => {
                    return user.name;
                });
                setUsers(names);
            } catch (error) {
                console.error('fetch user data error', error);
            };
        }
        fetchData();
    }, []);

    return (
        <View>
            <FlatList
                data={users}
                renderItem={({ item }) => <Text>{item}</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({})