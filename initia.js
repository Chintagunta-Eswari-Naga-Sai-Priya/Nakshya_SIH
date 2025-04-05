import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button as PaperButton, Headline } from 'react-native-paper';

const Init = () => {
  const [casterAddress, setCasterAddress] = useState('192.167.12.46');  // Dummy IP
  const [port, setPort] = useState('2101');
  const [username, setUsername] = useState('nakshya3442');
  const [password, setPassword] = useState('asldjalksdkls');
  const [mountpoint, setMountpoint] = useState('IGP0');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation(); // Get the navigation prop
  const buttonColor = "#6200ee";  // This is the default color for react-native-paper Button

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
                navigation.navigate('Maps'); // Use 'Main' as the screen name
            },
          },
        ],
        { cancelable: false }
      );
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>Connect to Caster</Headline>
      
      {/* Content */}
      {['Caster Address', 'Port Number', 'Username', 'Password', 'Mountpoint'].map((placeholder, index) => (
        <TextInput
          key={index}
          placeholder={placeholder}
          value={
            placeholder === 'Caster Address' ? casterAddress :
            placeholder === 'Port Number' ? port :
            placeholder === 'Username' ? username :
            placeholder === 'Password' ? password :
            mountpoint
          }
          onChangeText={text => {
            placeholder === 'Caster Address' ? setCasterAddress(text) :
            placeholder === 'Port Number' ? setPort(text) :
            placeholder === 'Username' ? setUsername(text) :
            placeholder === 'Password' ? setPassword(text) :
            setMountpoint(text);
          }}
          style={styles.input}
          selectionColor={buttonColor}
          secureTextEntry={placeholder === 'Password'}
          keyboardType={placeholder === 'Port Number' ? 'numeric' : 'default'}
        />
      ))}
      
      <PaperButton 
        mode="contained" 
        onPress={handleConnect} 
        disabled={isLoading} 
        style={styles.button}
        loading={isLoading}
      >
        Connect
      </PaperButton>
      
      {isLoading && <ActivityIndicator size="large" color={buttonColor} />}
    </View>
  );
};

const buttonColor = "#6200ee";  // This is the default color for react-native-paper Button

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginTop: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',  // Light grey background
  },
  headline: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,  // Rounded corners
    backgroundColor: '#fff',  // White background
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Init;