import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import * as firebase from "firebase";

import { FontAwesome, FontAwesome5, Entypo } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import "firebase/firestore";
import colors from "../assets/colors/colors";

const SignUp = ({ navigation, route }) => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [name, setname] = useState({ fName: "", LName: "" });

  const passSettings = () => {
    if (showPass == true) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
  };
  const forgotByEmail = () => {
    var auth = firebase.auth();
    var emailAddress = email;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        alert("Email Varification Sent to", email);
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const onSignUp = () => {
    if (name.fName.length <= 0) {
      alert("Please Enter First name");
    } else if (name.LName.length <= 0) {
      alert("Please Enter Last name");
    } else if (email.length <= 0) {
      alert("Please Email Name");
    } else if (pass.length <= 0) {
      alert("Please Enter Password");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((user) => {
          console.log("User INformation is ", user);
          firebase
            .auth()
            .signInWithEmailAndPassword(email, pass)
            .then((user) => {
              user.user.sendEmailVerification();
              user = firebase.auth().currentUser;
              user.updateProfile({
                displayName: name.fName + " " + name.LName,
              });
              const dbh = firebase.firestore();
              const naa = name.fName + " " + name.LName;
              dbh.collection("users").doc(user.uid).set({
                name: naa,
                email: email,
              });
              alert("User Created");
              setemail("");
              setpass("");
              setname({ fName: "", LName: "" });

              //   forgotByEmail();
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorCode);
              // navigation.navigate('SignIn')
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode);
          // navigation.navigate('SignIn')
        });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/signup_top1.png")}
        style={{
          position: "absolute",
        }}
      />
      <View style={styles.signupTextCon}>
        <Text style={styles.signupText}>SIGNUP</Text>
      </View>
      <View style={styles.imageCon}>
        <Image
          source={require("../assets/signup.png")}
          style={{ height: 200, width: 200 }}
        />
      </View>
      <View style={styles.secondCon}>
        <View style={styles.InputTextCon}>
          <FontAwesome
            name="user"
            size={24}
            style={{
              alignSelf: "center",
              //marginRight: 5,
            }}
            color="#653CA0"
          />
          <TextInput
            placeholder="Enter First Name"
            value={name.fName}
            onChangeText={(text) => setname({ fName: text, LName: name.LName })}
            style={styles.textInputs}
          ></TextInput>
        </View>
        <View style={{ ...styles.InputTextCon, marginTop: 15 }}>
          <FontAwesome
            name="user"
            size={24}
            style={{
              alignSelf: "center",
              //marginRight: 5
            }}
            color="#653CA0"
          />
          <TextInput
            placeholder="Enter Last Name"
            value={name.LName}
            onChangeText={(text) => setname({ fName: name.fName, LName: text })}
            style={styles.textInputs}
          ></TextInput>
        </View>
        <View style={{ ...styles.InputTextCon, marginTop: 15 }}>
          <Entypo
            name="email"
            size={24}
            style={{
              alignSelf: "center",
              //  marginRight: 5
            }}
            color="#653CA0"
          />
          <TextInput
            placeholder="Enter Email"
            value={name.fName}
            value={email}
            onChangeText={(text) => setemail(text)}
            style={styles.textInputs}
          ></TextInput>
        </View>
        <View style={{ ...styles.InputTextCon, marginTop: 15 }}>
          <FontAwesome5
            name="lock"
            size={24}
            style={{
              alignSelf: "center",
              //  marginRight: 5
            }}
            color="#653CA0"
          />
          <TextInput
            placeholder="Enter Password"
            secureTextEntry={showPass}
            value={pass}
            onChangeText={(text) => setpass(text)}
            style={{ ...styles.textInputs, width: "78%" }}
          ></TextInput>
          <TouchableOpacity activeOpacity={0.7} onPress={() => passSettings()}>
            <FontAwesome
              name="eye"
              size={22}
              style={{
                alignSelf: "center",
                //marginLeft: 3,
                //marginRight: 5
              }}
              color="#653CA0"
            />
          </TouchableOpacity>
        </View>
        {
          //Button start
        }
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onSignUp()}
          style={styles.buttonCon}
        >
          <LinearGradient
            colors={["#6E3AA7", "#23286B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.doneButtonWrapper}
          >
            <Text style={styles.doneButtonText}>SIGNUP</Text>
          </LinearGradient>
        </TouchableOpacity>
        {
          //Button Close
        }
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "78%",
            marginVertical: 15,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text
              style={{
                width: 25,
                textAlign: "center",
                fontFamily: "OpenSans-SemiBold",
              }}
            >
              or
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>
        <View
          style={{
            // marginTop: 10,
            // marginLeft: 10,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontFamily: "OpenSans-SemiBold" }}>
            Already Have an Account ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text style={{ fontFamily: "OpenSans-Bold" }}>Sign in</Text>
          </TouchableOpacity>
        </View>
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
    //  backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
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
  buttonCon: {
    width: "70%",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    //  elevation: 5,
  },
  doneButtonWrapper: {
    //flex: 1,
    // paddingLeft: 50,
    // paddingRight: 50,
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    height: 45,
    alignItems: "center",
    elevation: 5,
  },
  doneButtonText: {
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold",
    color: colors.white,
  },
  signupText: {
    //marginTop: 60,
    //  marginLeft: 15,
    fontSize: 24,
    fontFamily: "OpenSans-Bold",
  },
  signupTextCon: {
    flexDirection: "row",
    height: 70,
    top: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  imageCon: {
    height: 200,
    marginTop: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  secondCon: {
    //  flexDirection: "column",
    // marginTop: 15,
    //marginLeft: 65,
    //height: 465,
    justifyContent: "center",
    alignItems: "center",
  },
  InputTextCon: {
    flexDirection: "row",
    width: "70%",
    height: 45,
    backgroundColor: "#F1E7FF",
    borderRadius: 10,
    paddingHorizontal: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputs: {
    width: "90%",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 5,
    fontFamily: "OpenSans-Regular",
  },
});

export default SignUp;
