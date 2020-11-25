/* Set time for the application */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Picker from '@gregfrench/react-native-wheel-picker';
import { storeTime } from './store/actions';
import SetRecord from './soundRecorder';

var PickerItem = Picker.Item;


const SetTime = () => {
  const time = useSelector(state => state.time);
  const dispatch = useDispatch();
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedMeridian, setSelectedMeridian] = useState(0);
  const [timeView, setTimeView] = useState(false);
  const [Hours, setHour] = useState([
    {
      hour: '1'
    },
    {
      hour: '2'
    },
    {
      hour: '3'
    },
    {
      hour: '4'
    },
    {
      hour: '5'
    },
    {
      hour: '6'
    },
    {
      hour: '7'
    },
    {
      hour: '8'
    },
    {
      hour: '9'
    },
    {
      hour: '10'
    },
    {
      hour: '11'
    },
    {
      hour: '12'
    }]);
  const [Minutes, setMinutes] = useState([
    {
      Minutes: '00'
    },
    {
      Minutes: '15'
    },
    {
      Minutes: '30'
    },
    {
      Minutes: '45'
    }]);
  const [Meridian, setMeridian] = useState(['AM', 'PM']);
  const setAlarmTime = () => {
    let time = Hours[selectedHour].hour + ":" + Minutes[selectedMinute].Minutes + " " + Meridian[selectedMeridian];
    dispatch(storeTime(time));
    setTimeView(true);
  }

  if (timeView === false) {

    return (
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginTop: 10, fontSize: 18 }}>{'Hello your time here.' + time}</Text>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <View>
            <Text style={{ fontSize: 23 }}>Hours</Text>
            <Picker style={{ width: 80, height: 180 }}
              lineColor="#000000" //to set top and bottom line color (Without gradients)
              lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
              lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
              selectedValue={selectedHour}
              itemStyle={{ color: "black", fontSize: 26 }}
              onValueChange={(itemValue) => setSelectedHour(itemValue)}>
              {Hours.map((value, i) => (
                <PickerItem label={value.hour} value={i} key={i} />
              ))}
            </Picker>
          </View>
          <View>
            <Text style={{ fontSize: 23 }}>Minutes</Text>
            <Picker style={{ width: 80, height: 180 }}
              lineColor="#000000" //to set top and bottom line color (Without gradients)
              lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
              lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
              selectedValue={selectedMinute}
              itemStyle={{ color: "black", fontSize: 26 }}
              onValueChange={(itemValue) => setSelectedMinute(itemValue)}>
              {Minutes.map((value, i) => (
                <PickerItem label={value.Minutes} value={i} key={i} />
              ))}
            </Picker>
          </View>
          <View>
            <Text style={{ fontSize: 23 }}></Text>
            <Picker style={{ width: 80, height: 180 }}
              lineColor="#000000" //to set top and bottom line color (Without gradients)
              lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
              lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
              selectedValue={selectedMeridian}
              itemStyle={{ color: "black", fontSize: 26 }}
              onValueChange={(itemValue) => setSelectedMeridian(itemValue)}>
              {Meridian.map((value, i) => (
                <PickerItem label={value} value={i} key={i} />
              ))}
            </Picker>
          </View>
        </View>
        <View>
          <Pressable
            onPress={setAlarmTime}
            style={{ marginTop: 13 }}
          >
            <View style={{ backgroundColor: '#20232a', padding: 13, alignItems: 'center', borderRadius: 10 }}>
              <Text style={{ color: '#ffffff' }}>Set Time</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
  else {
    return <SetRecord />
  }
};

const styles = StyleSheet.create({
});

export default SetTime;
