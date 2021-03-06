/* Set time for the application */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  PermissionsAndroid
} from 'react-native';
import { useSelector } from 'react-redux';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import ReactNativeAN from 'react-native-alarm-notification';

const audioRecorderPlayer = new AudioRecorderPlayer();


const checkPermissions = async () => {

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
  const [currentPositionSec, setcurrentPositionSec] = useState(0);
  const [isPlayVisible, togglePlayRecord] = useState(true);
  const [isPauseVisible, togglePauseRecord] = useState(false);

  const time = useSelector(state => state.time);

  useEffect(() => {
    console.log(AlarmFunction());
    setTimeout(function(){
      onStartPlay();
    },AlarmFunction());
    const der = AlarmFunction();
    // ScheduleAlarm("2020-12-23T11:59:33.388Z");

  }, []);


  const deleteAlarm = async() =>{
    const alarms = await ReactNativeAN.getScheduledAlarms();
    alarms.map(l=>{
      console.log(`alarm: ${l.day}-${l.month}-${l.year} ${l.hour}:${l.minute}:${l.second}---${l.id}`)
    }) 
  }

  const ScheduleAlarm = async(scheduledTime) =>{
    try{

      const fireDate = ReactNativeAN.parseDate(new Date(scheduledTime));
      // console.log(fireDate);

      const alarmNotifData = {
        title: "My Notification Title",
        message: "My Notification Message",
        channel: "my_channel_id",
        small_icon: "ic_launcher",
        loop_sound:true,
        play_sound:true,
        sound_name:"/storage/emulated/0/hello.mp3",
        // You can add any additional data that is important for the notification
        // It will be added to the PendingIntent along with the rest of the bundle.
        // e.g.
          data: { foo: "bar" },
      };

      const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate })
    
    }catch(e){
      console.log(e);
    }
  };

  const stopAlarmSound = async() =>{
    ReactNativeAN.stopAlarmSound();
  }

  const AlarmFunction = () => {
    let setTime = moment("10:36 AM", ['h:mm A']).format();
    let presentTime = moment(new Date()).format();
    let x = new moment(setTime);
    let y = new moment(presentTime);
    let diff = moment.duration(x.diff(y)).asMilliseconds();
    if (diff < 0) {
      let nextDay = moment(new Date()).add(1, 'day');
      
      nextDay.set({
        hour: moment(time, ['h:mm A']).get('hour'),
        minute: moment(time, ['h:mm A']).get('minute'),
        second: moment(time, ['h:mm A']).get('second'),
      })
      setTime = moment(nextDay).format();
      presentTime = moment(new Date()).format();
      x = new moment(setTime);
      y = new moment(presentTime);
      diff = moment.duration(x.diff(y)).asMilliseconds();
      return diff;
    }
    else {
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

  const milltoSecs = (duration) => {
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
        console.log('finished' + e.duration);
        audioRecorderPlayer.stopPlayer().catch(err => console.log(err.message));
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
    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginTop: 10, fontSize: 18 }}>Wait for your Alarm to ring...</Text>
      <Text>{(currentPositionSec !== 0) ? currentPositionSec : null}</Text>
      <View style={{ flexDirection: 'row' }}>
        {(isPlayVisible) ? <View>
          <Pressable
            onPress={onStartPlay}
            style={{ marginTop: 13 }}
          >
            <View style={{ backgroundColor: '#20232a', padding: 13, alignItems: 'center', borderRadius: 50 }}>
              <Icon
                reverse
                name='ios-play-outline'
                type='ionicon'
                color='#517fa4'
              />
            </View>
          </Pressable>
          <Pressable
            onPress={deleteAlarm}
            style={{ marginTop: 13 }}
          >
            <View style={{ backgroundColor: '#20232a', padding: 13, alignItems: 'center', borderRadius: 50 }}>
              <Text>Delete</Text>
            </View>
          </Pressable>
        </View> : null}
        {(isPauseVisible) ? <View>
          <Pressable
            onPress={onStopPlay}
            style={{ marginTop: 13 }}
          >
            <View style={{ backgroundColor: '#20232a', padding: 13, alignItems: 'center', borderRadius: 50 }}>
              <Icon
                reverse
                name='ios-pause-outline'
                type='ionicon'
                color='#517fa4'
              />
            </View>
          </Pressable>
        </View> : null}
      </View>
    </View>
  );
};


export default RingAlarm;
