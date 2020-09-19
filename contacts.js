import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Pressable,
  FlatList,
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity
} from 'react-native';

import {Icon} from 'react-native-elements';

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


const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.displayName}</Text>
  </TouchableOpacity>
);



const ContactList = ({loadBack}) => {
  const [contactsData, loadContacts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItems,setItem] = useState([]);

  const returnToImport = () =>{
    loadBack(false);
  }

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

  },[])


  const addList = (itemId) =>{
    // setSelectedId(itemId)
    if(selectedItems.includes(itemId)){
      setItem(selectedItems.filter(item=>item!==itemId))
    }else{
      setItem([...selectedItems,itemId])
    }
  }

  const renderItem = ({ item }) => {
    if(selectedItems.includes(item.recordID)){
      return (
        <Item
          item={item}
          onPress={() => addList(item.recordID)}
          style={{ backgroundColor:'#303846',color:'#ffffff' }}
        />
      );
    }else{      
      return (
        <Item
          item={item}
          onPress={() => addList(item.recordID)}
          style={{ backgroundColor:'#b4c3de',color:'#000000' }}
        />
      );
    }
  };

  return (
        <>
        <View>
            <Pressable
            onPress={returnToImport}
            style={{marginTop:13}}
            >
            <Icon name='arrow-circle-left' type='font-awesome' color='#000000'></Icon>
            </Pressable>
        </View>
            <FlatList
                data={contactsData}
                renderItem={renderItem}
                keyExtractor={item=>item.recordID}
                extraData={selectedId}
            />
        </>
    );
};

const styles = StyleSheet.create({
  title:{
    padding:10,
    fontFamily:'OpenSans-Regular'
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default ContactList;
