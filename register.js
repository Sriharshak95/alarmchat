/* Login page for the application */

import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable
} from 'react-native';

import { Link } from 'react-router-native';

const Register = () => {

    const [form,formInput] = useState({
        name:'',
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
        // getMoviesFromApi();
    },[form]); //the second argument is added for registering updates for mount

    const createPeer = async () => {
      try{
        const config = {
          method:'POST',
          body:JSON.stringify(form),
          headers:{
            Accept:'application/json',
            'content-type':'application/json'
          }
        };
        const response = await fetch('http://192.168.1.5:5000/peers',config)
        const data = await response.json()
        formInput({...form,name:'',password:'',email:''})
      }catch(error){
        throw (error)
      }
    };

  return (
    <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
      <View style={{width:280}}>
        <Text style={{fontWeight:'bold'}}>Name</Text>
        <TextInput
          style={styles.peerTextStyle}
          onChange={updateField('name')}
          value={form.name}
        />
        <Text style={{marginTop:12,fontWeight:'bold'}}>Email</Text>
        <TextInput
          style={styles.peerTextStyle}
          onChange={updateField('email')}
          value={form.email}
          autoCompleteType="email"
        />
        <Text style={{marginTop:12,fontWeight:'bold'}}>Password</Text>
        <TextInput
          style={styles.peerTextStyle}
          onChange={updateField('password')}
          value={form.password}
          secureTextEntry={true}
        />
        <Pressable
          onPress={createPeer}
          style={{marginTop:13}}
        >
          <View style={styles.buttonStyle}>
            <Text style={{color:'#ffffff'}}>Register</Text>
          </View>
        </Pressable>
        <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
            <View style={{alignItems:'center',marginTop:5}}>
                <Text style={{textDecorationLine:'underline'}}>Back to Login</Text>
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
  peerTextStyle:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:10
  },
  buttonStyle:{
    backgroundColor:'#20232a',
    padding:13,
    alignItems:'center',
    borderRadius:10
  },
  red: {
    color: 'red',
  },
});

export default Register;
