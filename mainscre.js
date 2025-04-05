// Import necessary libraries and components

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import MapView, { Marker , Callout } from 'react-native-maps';
import { SearchBar } from 'react-native-elements';

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import RNCSV from 'react-native-csv';
import { useNavigation } from '@react-navigation/native';
import Init from './initia'; // Change this line
const baseStations = [
  { id: '1', name: 'Station 1', coordinates: { latitude: 13.6350, longitude: 79.4180 }, type: 'RTCM 3.0' },
];

// Function to generate random corrections
const generateCorrection = (c) => {
  const correctionType = 'RTCM 3.0';
  const correctionLatitude = c.latitude - Math.random() * 0.00001 - 0.000005;
  const correctionLongitude = c.longitude - Math.random() * 0.00001 - 0.000005;

  return {
  timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
station : "Station 1",
    Correction: correctionType,
    Latitude: correctionLatitude,
    Longitude: correctionLongitude,
    cLatitude: c.latitude,
    cLongitude: c.longitude,
  };
};


// Function to generate random position updates with 1 cm accuracy
const generatePositionUpdate = (previousPosition) => {
  return {
    latitude: previousPosition.latitude + Math.random() * 0.00001 - 0.000005,
    longitude: previousPosition.longitude + Math.random() * 0.00001 - 0.000005,
  };
};

const MainScreen = ({ navigation }) => {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 16.6304, // Set the latitude near Tirupati
    longitude: 79.4192, // Set the longitude near Tirupati
    latitudeDelta: 0.0,
      longitudeDelta: 0.0,
  });
  const [correctionLogs, setCorrectionLogs] = useState([]);

  useEffect(() => {
    // Simulate real-time updates every second
    const intervalId = setInterval(() => {
      setCurrentPosition((prev) => generatePositionUpdate(prev));
      setCorrectionLogs((prev) => [
        ...prev,
        generateCorrection(currentPosition),
      ]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTransmitToggle = () => {
    setIsTransmitting((prev) => !prev);
    navigation.navigate('Nakshya');

    // Implement logic for starting/stopping data transmission
  };

  const handleViewLogs = () => {
    navigation.navigate('DataLogging', { logs: correctionLogs });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        placeholder="Type Here..."
        containerStyle={{ backgroundColor: 'white', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
        inputContainerStyle={{ backgroundColor: '#f0f0f0' }}
      />
      {/* Map */}
      <MapView
        style={styles.map}
        region={{
          ...currentPosition // Adjust the zoom level as needed
        }}
      >
        {baseStations.map((station) => (
          <Marker key={station.id} coordinate={station.coordinates}>
            <Callout>
              <View>
                <Text>Name: {station.name}</Text>
                <Text>Coordinates: {station.coordinates.latitude.toFixed(6)}, {station.coordinates.longitude.toFixed(6)}</Text>
                <Text>Type: {station.type}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        <Marker
          coordinate={currentPosition}
          pinColor='blue'
        >
          <Callout>
            <View>
              <Text>You are here</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      {/* Location Info Box */}
      <View style={styles.locationInfoBox}>
        <Text style={styles.locationInfoText}>
          Latitude: {currentPosition.latitude.toFixed(6)}
        </Text>
        <Text style={styles.locationInfoText}>
          Longitude: {currentPosition.longitude.toFixed(6)}
        </Text>
      </View>

      {/* Panel */}
      <View style={styles.panel}>
        <Button mode="contained" onPress={handleTransmitToggle}>
          {!isTransmitting ? 'Disconnect' : 'Disconnect'}
        </Button>
        <Button onPress={handleViewLogs}>View Logs</Button>
      </View>
    </View>
  );
};
const DataLoggingScreen = ({ route }) => {
  const { logs } = route.params;

  const tableHead = ['Timestamp', "Base Station",  "Correction Type", "User Latitude (Corrected)", "User Longitude (Corrected)"];

  const tableData = logs.map((log) => [
    log.timestamp,
    log.station,
    log.Correction,
    log.Latitude,
    log.Longitude
  ]);

  const columnWidth = 100; // Set the width for each column

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
            <Row data={tableHead} style={{ width: tableHead.length * columnWidth, ...styles.head }} textStyle={styles.text} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  style={{ width: tableHead.length * columnWidth, ...(index % 2 ? styles.rowEven : styles.rowOdd) }}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
      <Button
        style={styles.exportButton}
        mode="contained"
      >
        Export to CSV
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  map: {
    flex: 1,
  },
  panel: {
    padding: 16,
    backgroundColor: 'white',
  },
  locationInfoBox: {
    position: 'absolute',
    bottom: 150, // Adjust the position to the bottom
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  locationInfoText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  head: { height: 100, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: 'center' },
  rowEven: { height: 100, backgroundColor: '#f2f2f2' }, // Apply background color for even rows
  rowOdd: { height: 100 }, // Leave odd rows with the default background
  exportButton: {
    margin: 16,
  },
});

export { MainScreen, DataLoggingScreen };
