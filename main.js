/* Login page for the application */

import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Button
} from 'react-native';
import Navbar from './utils/navbar';
// import ImportContacts from './importContacts';
// import ContactList from './contacts';
// import List from './list';
import SetTime from './set_time';
import * as SecureStore from 'expo-secure-store';

const Main = ({history,location,match}) => {

    const [contacts,setContacts] = useState(false);
    const [profile,setProfile] = useState({});

    const getContacts = (setValue)=>{
      setContacts(setValue)
    }

    useEffect(()=>{
      peerMe('token','peer','peerId').then((data)=>{
        setProfile(data);
      }).catch(error=>console.log(error));
    },[]);


    const peerMe = async(keyName,peerName,peerId) =>{
      try{
          const token = await SecureStore.getItemAsync(keyName);
          const myName = await SecureStore.getItemAsync(peerName);
          const myId = await SecureStore.getItemAsync(peerId);
          return {token,myId,myName};
      }catch(e){
          console.log(e)
      }
    }

  return (
    <View style={{flex: 1}}>
      <Navbar/>
      {/*(contacts)?<ContactList loadBack={getContacts}/>:<ImportContacts loadContacts={getContacts} {...profile} />*/}
      <SetTime/>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default Main;
