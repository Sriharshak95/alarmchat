/* Set time for the application */

import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SetTime = () => {

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [time,setTime] = useState('')

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
  
    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(()=>{
        const Hours = (new Date(date).getHours()<10?'0':'')+new Date(date).getHours();
        const Mins = (new Date(date).getMinutes()<10?'0':'')+new Date(date).getMinutes();
        console.log(Mins);
        setTime(Hours+':'+Mins);
    })

  return (
      <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
        <Text style={{marginTop:10,fontSize:18}}>{'Hello your time here.'+time}</Text>
        <Pressable
          onPress={showTimepicker}
          style={{marginTop:13}}
        >
          <View style={{backgroundColor:'#20232a',padding:13,alignItems:'center',borderRadius:10}}>
            <Text style={{color:'#ffffff'}}>Set Time</Text>
          </View>
        </Pressable>
        {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            />
        )}
        <Text style={{marginTop:10,fontSize:14,color:'#717171'}}>Start sending alarms to your peers</Text>
      </View>
  );
};

const styles = StyleSheet.create({
});

export default SetTime;
