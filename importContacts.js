/* Login page for the application */

import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable
} from 'react-native';

const ImportContacts = ({loadContacts,myName}) => {

    const getContacts = ()=>{
        loadContacts(true);
    }

    useEffect(()=>{
      console.log(myName)
    })

  return (
      <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
        <Text style={{marginTop:10,fontSize:18}}>Hello {myName}.</Text>
        <Pressable
          onPress={getContacts}
          style={{marginTop:13}}
        >
          <View style={{backgroundColor:'#20232a',padding:13,alignItems:'center',borderRadius:10}}>
            <Text style={{color:'#ffffff'}}>Set Time</Text>
          </View>
        </Pressable>
        <Text style={{marginTop:10,fontSize:14,color:'#717171'}}>Start sending alarms to your peers</Text>
      </View>
  );
};

const styles = StyleSheet.create({
});

export default ImportContacts;
