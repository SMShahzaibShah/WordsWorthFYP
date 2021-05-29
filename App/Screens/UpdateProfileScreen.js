import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomButton from "../component/ButtonComponent";
import * as firebase from "firebase";

const UpdateProfileScreen = ({ navigation, route }) => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [name, setname] = useState("");
  const onSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, pass);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.ImagesSty}
        source={require("../Images/WelcomePageLogo.png")}
      />
      <View style={styles.internalContents}>
        <Text style={styles.text}>Sign Up</Text>
        <Text style={{ ...styles.label, marginBottom: -5 }}>First Name</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder="Enter First Name" />
        </View>
        <Text style={{ ...styles.label, marginBottom: -5 }}>Last Name</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder="Enter Last Name" />
        </View>
        <Text style={{ ...styles.label, marginBottom: -5 }}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Email"
            value={email}
            onChangeText={(text) => setemail(text)}
          />
        </View>
        <Text style={{ ...styles.label, marginBottom: -5 }}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Password"
            value={pass}
            onChangeText={(text) => setpass(text)}
          />
        </View>
      </View>

      <View style={styles.button}>
        <CustomButton
          text="Countinue"
          color="red"
          onPressEvent={() => onSignUp()}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          margin: 20,
          justifyContent: "space-between",
          width: "50%",
          alignSelf: "center",
        }}
      >
        <Text style={styles.Hitext}>Have an Account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Text style={{ ...styles.label, alignSelf: "center" }}>SignIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: "red",
    //alignSelf:'center'
  },
  internalContents: {
    width: "85%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
    //paddingTop: 40,
  },
  ImagesSty: {
    width: 250,
    height: 60,
    marginTop: 100,
    marginBottom: 50,
    //justifyContent: "center"
  },
  textInput: {
    borderColor: "grey",
    //borderWidth: 2,
    borderBottomWidth: 2,
    width: "95%",
    //borderRadius: 50,
    fontSize: 16,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 10,
    paddingTop: 0,
  },
  text: {
    fontSize: 30,
    color: "black",
    marginBottom: 5,
  },
  button: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  Hitext: {
    fontStyle: "italic",
    color: "lightgrey",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default UpdateProfileScreen;
