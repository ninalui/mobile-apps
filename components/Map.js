import React, { useState } from 'react'
import { Button, StyleSheet } from 'react-native';
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';

export default function Map({ navigation }) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    function confirmHandler() {
        // navigate back to Profile, pass selected location in route params
        navigation.navigate('Profile', { selectedLocation });
    }
    return (
        <>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={event => {
                    setSelectedLocation({
                        latitude: event.nativeEvent.coordinate.latitude,
                        longitude: event.nativeEvent.coordinate.longitude
                    });
                }}
            >
                {selectedLocation && <Marker coordinate={selectedLocation} />}
            </MapView>
            <Button
                disabled={!selectedLocation}
                title="Confirm Selection Location"
                onPress={confirmHandler}
            />
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});