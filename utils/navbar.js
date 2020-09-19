/* Login page for the application */

import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {
  return (
      <View style={{height:50,backgroundColor:'#fafafb',elevation:5,padding:5,flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontSize:20,fontFamily:'OpenSans-Regular'}}>Alarmchat</Text>
        <FontAwesomeIcon icon={faClock} size={32} />
      </View>
  );
};

const styles = StyleSheet.create({
});

export default Navbar;
