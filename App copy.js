import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Text,
  StatusBar,
  PermissionsAndroid
} from 'react-native';

import Contacts, { getContactById, getContactsByPhoneNumber } from 'react-native-contacts';


function getDetails(loadContacts){
  Contacts.getAll((err, contacts) => {
    if (err === 'denied'){
      console.log('permission denied')
    } else {
      loadContacts(contacts)
    }
  })
}

const App = () => {
  const [contactsData, loadContacts] = useState([])


  useEffect(()=>{

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.',
        'buttonPositive': 'Please accept bare mortal'
      }
    ).then(() => {
      getDetails(loadContacts)
    })

  })

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.displayName}</Text>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
        <View>
          <Text>Hewllo</Text>
          <FlatList
            data={contactsData}
            renderItem={renderItem}
            keyExtractor={item=>item.recordID}
            ListHeaderComponent={
              <Text>Start of the component</Text>
            }
            ListFooterComponent={
              <Text>End of list</Text>
            }
          />
        </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
