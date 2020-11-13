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
import { Link } from "react-router-native";

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

const SetRecord = () => {

  const [recordSecs,setRecordSecond] = useState(0);
  const [recordTime,setRecordTime] = useState('');
  const [currentPositionSec,setcurrentPositionSec] = useState(0);
  const [currentDurationSec,setdurationSec] = useState(0);
  const [playTime,setplayTime] = useState(0);
  const [duration,setDuration] = useState(0);
  const [isRecordVisible,toggleRecord] = useState(true);
  const [isStopRecordVisible,toggleStopRecord] = useState(false);
  const [isPlayVisible,togglePlayRecord] = useState(false);
  const [isPauseVisible,togglePauseRecord] = useState(false);

  const time = useSelector(state => state.time);

  useEffect(()=>{
    console.log(time);
  },[]);

  const AlarmFunction = () =>{
    let setTime = moment("11:01 PM",['h:mm A']).format();
    let presentTime = moment(new Date()).format();
    let x = new moment(setTime);
    let y = new moment(presentTime);
    let diff = moment.duration(x.diff(y)).asMilliseconds();
    return diff;
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

  onStartRecord = async () => {
    checkPermissions();
    const result = await audioRecorderPlayer.startRecorder(path,audioSet);
    togglePlayRecord(false);
    toggleStopRecord(true);
    toggleRecord(false);
    togglePauseRecord(false);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setcurrentPositionSec(milltoSecs(e.current_position));
      // setRecordSecond(e.current_position);
      // setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
      return;
    });
    console.log(result);
  };

  onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    togglePlayRecord(true);
    toggleStopRecord(false);
    toggleRecord(true);
    togglePauseRecord(false);
    audioRecorderPlayer.removeRecordBackListener();
    // setRecordSecond(0);
    console.log(result);
  };

  onStartPlay = async () => {
    const msg = await audioRecorderPlayer.startPlayer(path);
    // audioRecorderPlayer.setVolume(1.0);
    // console.log(msg);
    togglePlayRecord(false);
    toggleStopRecord(false);
    toggleRecord(false);
    togglePauseRecord(true);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished'+e.duration);
        audioRecorderPlayer.stopPlayer().catch(err=>console.log(err.message));
        togglePlayRecord(true);
        toggleStopRecord(false);
        toggleRecord(true);
        togglePauseRecord(false);
      }
      setcurrentPositionSec(milltoSecs(e.current_position));
      // setdurationSec(e.duration);
      // setplayTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));
      // setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      return;
    });
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    togglePlayRecord(true);
    toggleStopRecord(false);
    toggleRecord(true);
    togglePauseRecord(false);
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  return (
      <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
        <Text style={{marginTop:10,fontSize:18}}>{'Record your Message'}</Text>
        <Text>{(currentPositionSec!==0)?currentPositionSec:null}</Text>
        <View style={{flexDirection:'row'}}>
        {(isRecordVisible)?<View style={{paddingRight:15}}>
          <Pressable
            onPress={onStartRecord}
            style={{marginTop:13}}
          >
            <View style={{backgroundColor:'#20232a',padding:13,alignItems:'center',borderRadius:50}}>
              <Icon
                reverse
                name='ios-mic-outline'
                type='ionicon'
                color='#f44336'
              />
            </View>
          </Pressable>
        </View>:null}
        {(isStopRecordVisible)?<View>
          <Pressable
            onPress={onStopRecord}
            style={{marginTop:13}}
          >
          <View style={{backgroundColor:'#20232a',padding:13,alignItems:'center',borderRadius:50}}>
            <Icon
              reverse
              name='ios-stop-circle-outline'
              type='ionicon'
              color='#f44336'
            />
          </View>
          </Pressable>
        </View>:null}
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
        {(isPlayVisible)?<View>
          <Link to="/ring">
            <Text style={{color:'#000000'}}>Set Alarm</Text>
          </Link>
        </View>:null}
      </View>
  );
};


export default SetRecord;
