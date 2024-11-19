import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';

export default function Map() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    return (
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
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});