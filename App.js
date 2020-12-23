import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Pressable,
  ActivityIndicator
} from 'react-native';


import { NativeRouter, Route,Redirect } from 'react-router-native';
import Login from './login';
import Register from './register';
import Main from './main';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';
import tokenGetter from './utils/auth';
import RingAlarm from './ringAlarm';
const store = createStore(reducer);

const App = () => {

  const [userAuthenticated,setFlag] = useState(false);
  const [inflight,setInflight] = useState(true);

  useEffect(()=>{
    // ScheduleAlarm();
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
    <Provider store={store}>
      <NativeRouter>
        <StatusBar barStyle="dark-content" />
        {/*<Pressable
          onPress={deleteAlarm}
          style={{marginTop:13}}
        >
          <View style={{backgroundColor:'#20232a',padding:13,alignItems:'center',borderRadius:10}}>
            <Text style={{color:'#ffffff'}}>Delete Alarm</Text>
          </View>
        </Pressable>
        <StatusBar barStyle="dark-content" />
        <Pressable
          onPress={ScheduleAlarm}
          style={{marginTop:13}}
        >
          <View style={{backgroundColor:'#20232a',padding:13,alignItems:'center',borderRadius:10}}>
            <Text style={{color:'#ffffff'}}>Set Alarm</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={stopAlarmSound}
          style={{marginTop:13}}
        >
          <View style={{backgroundColor:'#20232a',padding:13,alignItems:'center',borderRadius:10}}>
            <Text style={{color:'#ffffff'}}>Stop Alarm</Text>
          </View>
        </Pressable>*/}
        <Route exact path="/">
        {
          (inflight)? <ActivityIndicator/>: (userAuthenticated)?<Main />:<Login />
        }
        </Route>
        <Route path='/login' component={Login}/>
        <Route path="/main" component={Main}/>
        <Route path="/about" component={Register}/>
        <Route path="/ring" component={RingAlarm}/>
      </NativeRouter>
    </Provider>
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
