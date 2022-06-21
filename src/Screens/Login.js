import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getData();
  }, []);

  //fetches the saved data
  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //saves the data
  const setData = async () => {
    if (name.length == 0 || password.length == 0) {
      Alert.alert('Warning!', 'Please fill the details');
    } else {
      try {
        var user = {
          Name: name,
          Password: password,
        };
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Image source={require('../Assests/Logo.jpg')} style={styles.logo} />
      <Text style={styles.text}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={value => setName(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        maxLength={5}
        onChangeText={value => setPassword(value)}
      />
      <View style={styles.button}>
        <Button title="Log in" color="#FFA500" onPress={setData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 50,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    width: '60%',
    margin: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginTop: 6,
  },
});
