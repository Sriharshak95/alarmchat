import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';


import { NativeRouter, Route,Redirect } from 'react-router-native';
import Login from './login';
import Register from './register';
import Main from './main';
import tokenGetter from './utils/auth';

const App = () => {

  const [userAuthenticated,setFlag] = useState(false);
  const [inflight,setInflight] = useState(true);
  
  useEffect(()=>{
    tokenGetter('token','peer','peerId').then((data)=>{
      setInflight(false);
      if(data){
        console.log(userAuthenticated)
        setFlag(true)
      }else{
        setFlag(false)
      }
    }).catch((e)=>{
      console.log(e)
    })
  },[userAuthenticated]);

  return (
    <NativeRouter>
      <StatusBar barStyle="dark-content" />
      <Route exact path="/">
      {
        (inflight)? <Text>Loading....</Text>: (userAuthenticated)?<Main />:<Login />
      }
      </Route>
      <Route path='/login' component={Login}/>
      <Route path="/main" component={Main}/>
      <Route path="/about" component={Register}/>
    </NativeRouter>
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

export default App;
