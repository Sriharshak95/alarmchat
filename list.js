import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,View } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const List = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItems,setItem] = useState([]);

  useEffect(()=>{
    console.log(selectedItems)
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
    // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    // const backgroundColor = selectedItems.includes(selectedId)?"#6e3b6e":"#f9c2ff"
    if(selectedItems.includes(item.id)){
      return (
        <Item
          item={item}
          onPress={() => addList(item.id)}
          style={{ backgroundColor:'#6e3b6e' }}
        />
      );
    }else{      
      return (
        <Item
          item={item}
          onPress={() => addList(item.id)}
          style={{ backgroundColor:'#f9c2ff' }}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default List;