/* Set time for the application */

import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  PermissionsAndroid
} from 'react-native';
import {useSelector} from 'react-redux';
import AudioRecorderPlayer,{
  AudioEncoderAndroidType,
  AudioSourceAndroidType,} from 'react-native-audio-recorder-player';
import moment from 'moment';
import { Icon } from 'react-native-elements';
  const audioRecorderPlayer = new AudioRecorderPlayer();


const checkPermissions = async () =>{

  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
}

const RingAlarm = () => {
  const [currentPositionSec,setcurrentPositionSec] = useState(0);
  const [isPlayVisible,togglePlayRecord] = useState(true);
  const [isPauseVisible,togglePauseRecord] = useState(false);

  const time = useSelector(state => state.time);

  useEffect(()=>{
    setTimeout(function(){
      console.log("Derf")
    },AlarmFunction());
  },[]);

  const AlarmFunction = () =>{
    let setTime = moment(time,['h:mm A']).format();
    let presentTime = moment(new Date()).format();
    let x = new moment(setTime);
    let y = new moment(presentTime);
    let diff = moment.duration(x.diff(y)).asMilliseconds();
    if(diff<0){
      let nextDay = moment(new Date()).add(1,'day');
      nextDay = nextDay.set({
        hour:moment(time,['h:mm A']).get('hour'),
        minute:moment(time,['h:mm A']).get('minute'),
        second:moment(time,['h:mm A']).get('second'),
      })
      setTime = moment(nextDay).format();
      presentTime = moment(new Date()).format();
      x = new moment(setTime);
      y = new moment(presentTime);
      diff = moment.duration(x.diff(y)).asMilliseconds();
      return diff;
    }
    else{   
      return diff;
    }
  };

  const path = Platform.select({
    ios: 'hello.m4a',
    android: 'sdcard/hello.mp3',
  });

  const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC
  };

  const milltoSecs = (duration) =>{
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  onStartPlay = async () => {
    const msg = await audioRecorderPlayer.startPlayer(path);
    togglePauseRecord(true);
    togglePlayRecord(false);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished'+e.duration);
        audioRecorderPlayer.stopPlayer().catch(err=>console.log(err.message));
        togglePlayRecord(true);
        togglePauseRecord(false);
            }
      setcurrentPositionSec(milltoSecs(e.current_position));
      return;
    });
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    togglePlayRecord(true);
    togglePauseRecord(false);
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  return (
      <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
        <Text style={{marginTop:10,fontSize:18}}>Wait for your Alarm to ring...</Text>
        <Text>{(currentPositionSec!==0)?currentPositionSec:null}</Text>
        <View style={{flexDirection:'row'}}>
        {(isPlayVisible)?<View>
          <Pressable
            onPress={onStartPlay}
            style={{marginTop:13}}
          >
          <View style={{backgroundColor:'#20232a',padding:13,alignItems:'center',borderRadius:50}}>
            <Icon
              reverse
              name='ios-play-outline'
              type='ionicon'
              color='#517fa4'
            />
          </View>
          </Pressable>
        </View>:null}
        {(isPauseVisible)?<View>
          <Pressable
            onPress={onStopPlay}
            style={{marginTop:13}}
          >
          <View style={{backgroundColor:'#20232a',padding:13,alignItems:'center',borderRadius:50}}>
            <Icon
              reverse
              name='ios-pause-outline'
              type='ionicon'
              color='#517fa4'
            />
          </View>
          </Pressable>
        </View>:null}
        </View>
      </View>
  );
};


export default RingAlarm;
