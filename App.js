/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'http://igna-ventures.com/elroots2.local/api/user/profile/?email=youcantseeme@john.cena&members=1&bankinfo=1&address=1',
      )
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const apiData = () => {
    console.log('API Data:');
    console.log(data);
  };

  const saveData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('keyOne', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('keyOne');
      if (value !== null) {
        // value previously stored
        console.log(value);
      } else {
        console.log('No Key Exists');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const showKeys = async () => {
    console.log('Showing Keys');
    var keys = await AsyncStorage.getAllKeys();
    console.log(keys);
  };

  const clearKeys = () => {
    console.log('Clearing Data');
    AsyncStorage.clear();
    console.log('Cleared Data');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text>Helloo App</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => apiData()}>
            <Text>Show API Loaded Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => saveData(data.first_name)}>
            <Text>Save Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => loadData()}>
            <Text>Load Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => showKeys()}>
            <Text>Show Keys</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => clearKeys()}>
            <Text>Clear Keys</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  buttonStyle: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
  },
};
