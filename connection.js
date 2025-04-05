import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Init = () => {
  const [casterAddress, setCasterAddress] = useState('192.168.1.1');  // Dummy IP
  const [port, setPort] = useState('2101');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mountpoint, setMountpoint] = useState('');
  const [isRealTime, setIsRealTime] = useState(false);
  const [isRecordForLater, setIsRecordForLater] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation(); // Get the navigation prop

  const handleConnect = () => {
    setIsLoading(true);

    // Simulating a connection delay
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success',
        'Connected to the caster!',
        [
          {
            text: 'OK',
            onPress: () => {
                navigation.navigate('Maps View'); // Use 'Main' as the screen name

            },
          },
        ],
        { cancelable: false }
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
     

      {/* Content */}
      <TextInput
        placeholder="Caster Address"
        value={casterAddress}
        onChangeText={setCasterAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Port Number"
        value={port}
        onChangeText={setPort}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />
      <TextInput
        placeholder="Mountpoint (Optional)"
        value={mountpoint}
        onChangeText={setMountpoint}
        style={styles.input}
      />
      
      <View style={styles.switchContainer}>
        <Text>Real-time</Text>
        <Switch
          value={isRealTime}
          onValueChange={newValue => {
            setIsRealTime(newValue);
            setIsRecordForLater(!newValue);
          }}
        />
      </View>
      
      <View style={styles.switchContainer}>
        <Text>Record for Later</Text>
        <Switch
          value={isRecordForLater}
          onValueChange={newValue => {
            setIsRecordForLater(newValue);
            setIsRealTime(!newValue);
          }}
        />
      </View>
      
      <Button title="Connect" onPress={handleConnect} disabled={isLoading} />
      {isLoading && <Text>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 20,
  },
  topBarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Init;
