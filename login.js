/* Login page for the application */

import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable
} from 'react-native';

import * as SecureStore from 'expo-secure-store';
import { Link } from 'react-router-native';
import tokenGetter from './utils/auth';


const Login = ({history}) => {

    const [form,formInput] = useState({
        email:'',
        password:''
    })

    const updateField = (state) => (event) =>{
        formInput({
          ...form,
          [state]:event.nativeEvent.text
        })
    }


  useEffect(()=>{
  },[]);

  const tokenSetter = async(peer,key,peerId) =>{
    try{
      await SecureStore.setItemAsync('token',key);
      await SecureStore.setItemAsync('peer',peer);
      await SecureStore.setItemAsync('peerId',peerId);
      console.log('done...next is push')
      history.push('/main')
    }catch(e){
      console.log(e)
    }
  }

  const loginPeer = async () => {
    try{
      const config = {
        method:'POST',
        body:JSON.stringify(form),
        headers:{
          Accept:'application/json',
          'content-type':'application/json'
        }
      };
      const response = await fetch('http://192.168.1.7:5000/peers/login',config)
      const data = await response.json()
      tokenSetter(data.peer.name,data.token,data.peer._id)
    }catch(error){
      console.log(error)
    }
  };

  return (
    <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
      <View style={{width:280}}>
        <Text style={{fontWeight:'bold'}}>Email</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius:10}}
          onChange={updateField('email')}
          value={form.email}
        />
        <Text style={{marginTop:12,fontWeight:'bold'}}>Password</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius:10}}
          onChange={updateField('password')}
          value={form.password}
          secureTextEntry={true}
        />
        <Pressable
          onPress={loginPeer}
          style={{marginTop:13}}
        >
          <View style={{backgroundColor:'#20232a',padding:13,alignItems:'center',borderRadius:10}}>
            <Text style={{color:'#ffffff'}}>Login</Text>
          </View>
        </Pressable>
        <Link to="/about" underlayColor="#f0f4f7" style={styles.navItem}>
            <View style={{alignItems:'center',marginTop:5}}>
                <Text style={{textDecorationLine:'underline'}}>New user?</Text>
            </View> 
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default Login;
