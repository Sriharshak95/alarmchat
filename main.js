/* Login page for the application */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Alert
} from 'react-native';
import Navbar from './utils/navbar';
// import ImportContacts from './importContacts';
// import ContactList from './contacts';
// import List from './list';
import SetTime from './set_time';
import moment from 'moment';
import * as SecureStore from 'expo-secure-store';
navigator.geolocation = require('@react-native-community/geolocation');
import 'moment-timezone';

const Main = ({ history, location, match }) => {

  const [contacts, setContacts] = useState(false);
  const [profile, setProfile] = useState({});

  const getContacts = (setValue) => {
    setContacts(setValue)
  }

  useEffect(() => {
    findCoords();
    peerMe('token', 'peer', 'peerId').then((data) => {
      setProfile(data);
    }).catch(error => console.log(error));
  }, []);

  const findCoords = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        fetch('https://maps.googleapis.com/maps/api/timezone/json?location=' + position.coords.latitude + ',' + position.coords.longitude + '&timestamp=1331161200&key=AIzaSyCorSzOVJi3Nw9_EdZ01jxFaKtIQYaNjR8').then((response) => response.json()).then((json) => {
          console.log(moment().tz(json.timeZoneId).format());
        }).catch((error) => {
          console.error(error);
        })
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  const peerMe = async (keyName, peerName, peerId) => {
    try {
      const token = await SecureStore.getItemAsync(keyName);
      const myName = await SecureStore.getItemAsync(peerName);
      const myId = await SecureStore.getItemAsync(peerId);
      return { token, myId, myName };
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      {/*(contacts)?<ContactList loadBack={getContacts}/>:<ImportContacts loadContacts={getContacts} {...profile} />*/}
      <SetTime />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default Main;
