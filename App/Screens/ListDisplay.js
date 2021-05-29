import  React,{useState,useEffect} from 'react';
import { View, ActivityIndicator, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity  } from 'react-native';

import {listData} from "../constants/Data.json";

const ListDisplay = ({ navigation , route }) =>{
      const [getRecord,setRecords]=useState({
    "name": "1",
    "image": "",
    "file": "",
    "completed": false
  },);
      
      React.useEffect(() => {
      
      setRecords(listData)
        
        
    })
    /** 
    let url = "https://jsonplaceholder.typicode.com/todos"
    
    const apiCall = () => {
        fetch(url).then(response => {
            response.json().then(responseData => {
                let myList = [];
                Object.keys(responseData).map(x => {
                    myList.push(responseData[x]);
                })
                
       
                setRecords(myList)
                console.log(getRecord)
            })
    
        }).catch(error => {
            console.log(error);
        })

       
    }
    */
    return(
   <View style={styles.flatList}>
    <FlatList
    data={getRecord}
    renderItem={({ item }) => (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {}}
      >
        <View style={{...styles.ScrollView, flexDirection: "row", padding: 5 }}>
          <View style={{...styles.ScrollViewItem, paddingLeft: 5, paddingRight: 10 }}>
            <View style={{flexDirection:"column"}}>
              <Text style={{...styles.ScrollViewText,fontSize: 20}}>Book Name: {item.name}</Text>
              <Text style={{...styles.ScrollViewText,fontSize: 20}}>Image: {item.image}</Text>
              <Text style={{...styles.ScrollViewText,fontSize: 20}}>File Path : {item.file}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={(item, index) => index.toString()}
  />
    </View>   
    );
  }

  const styles = StyleSheet.create({
      ScrollViewItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:"grey",
        alignSelf: "center",
        padding: 10,
        margin:5,
        width: '50%',
        borderRadius: 10,
    
      },
      ScrollViewText:{
        fontSize: 18,
        color: 'white',
      },
      ScrollView:{
        width: '190%'
      },
  })
  
  export default ListDisplay;
  