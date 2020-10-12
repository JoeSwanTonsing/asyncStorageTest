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

import {SafeAreaView, ScrollView, Text, StatusBar} from 'react-native';

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

  const {first_name} = data;
  const fn = JSON.stringify(first_name);

  //save data to async storage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('firNm', jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getFirstname = async () => {
    try {
      const value = await AsyncStorage.getItem('firNm');
      if (value !== null) {
        return <Text>{value}</Text>;
      }
      return <Text>Name not Available</Text>;
    } catch (e) {
      // error reading value
    }
  };

  //{storeData(first_name)}
  //{getFirstname()}
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <Text>Helloo App</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
