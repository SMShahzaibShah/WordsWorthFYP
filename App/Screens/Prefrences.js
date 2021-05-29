import React from 'react';
import { TextInput,StyleSheet, Text, View, Button, Image } from 'react-native';
import CustomButton from "../component/ButtonComponent";


const prefrence=({navigation})=>{
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Prefrences</Text>
        <View style={styles.button}>
        <CustomButton  text="Pref 1" color="gray" />
        <CustomButton  text="Pref 2" color="gray"/>
        <CustomButton  text="Pref 3" color="gray"/>
        </View>
        <View style={styles.button}>
        <CustomButton  text="Pref 4" color="gray"/>
        <CustomButton  text="Pref 5" color="gray"/>
        <CustomButton  text="Pref 6" color="gray"/>
        </View>
        <View style={styles.button}>
        <CustomButton  text="Pref 7" color="gray"/>
        <CustomButton  text="Pref 8" color="gray"/>
        </View>
        <CustomButton  text="Next" color="green"/>
      </View>
  );
  }
  
  const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
       //paddingTop: 40,
    },text:{
        fontSize: 32,
        color: 'darkgrey',
      },button:{
          margin: 10,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 10,
          width: "100%",
      }

  });

  export default prefrence;