import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const customButton=(props)=>{
    if(props.disabled)
       var btnColor = 'grey';
    else    
        var btnColor = props.color != undefined ? props.color: "blue";
    return(
        <TouchableOpacity activeOpacity={0.7} 
        onPress={props.onPressEvent}
        disabled={props.disabled}
        >
          <View style={{...styles.buttonContainer, backgroundColor:btnColor}}>
            <Text style={styles.buttonText}>
              {props.text}
            </Text>
          </View>
        </TouchableOpacity>
    );
}
    const styles = StyleSheet.create({
        buttonContainer: {
             padding: 10,
              borderRadius: 50,
               paddingHorizontal: 20
        },buttonText:{
            color: 'white', fontSize: 20
        }
    }
    )

export default customButton;