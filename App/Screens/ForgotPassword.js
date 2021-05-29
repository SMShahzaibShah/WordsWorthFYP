import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomButton from "../component/ButtonComponent";
import * as firebase from "firebase";

import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import colors from "../assets/colors/colors";

const ForgotPassword = ({ navigation, route }) => {
  const [email, setemail] = useState("");
  //const [number, setnumber] = useState(0);
  //const [getmethod, setMethod] = useState("none");

  const forgotByEmail = () => {
    var auth = firebase.auth();
    var emailAddress = email;
    console.log(emailAddress);
    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        alert("Email Varification Sent to " + emailAddress);
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  {
    /**
  if (getmethod === "none") {
    return (
      <>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", height: 100 }}>
            <Image
              source={require("../assets/main_top.png")}
              style={{ position: "absolute", left: -140 }}
            />
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  marginTop: 70,
                  marginLeft: 90,
                  fontSize: 24,
                  fontFamily: "OpenSans-Bold",
                }}
              >
                Forgot Password
              </Text>
            </View>
          </View>
          <View
            style={{
              marginLeft: 100,
              height: 160,
              marginTop: 28,
            }}
          >
            <Image
              source={require("../assets/forgot.png")}
              style={{ height: 157, width: 201 }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              marginTop: 15,
              marginLeft: 65,
              height: 465,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setMethod("byEmail")}
            >
              <Text style={{}}>
                <LinearGradient
                  colors={["#6E3AA7", "#23286B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.doneButtonWrapper}
                >
                  <Text style={styles.doneButtonText}>RESET BY EMAIL</Text>
                </LinearGradient>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setMethod("byPhone")}
            >
              <Text style={{ marginTop: 20 }}>
                <LinearGradient
                  colors={["#6E3AA7", "#23286B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.doneButtonWrapper}
                >
                  <Text style={styles.doneButtonText}>RESET BY PHONE</Text>
                </LinearGradient>
              </Text>
            </TouchableOpacity>

            {
              //Or Line Code
            }
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "78%",
                marginTop: 10,
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
              style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}
            >
              <Text style={{ fontFamily: "OpenSans-SemiBold" }}>
                Already Have an Account ?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                <Text style={{ fontFamily: "OpenSans-Bold" }}>Sign in</Text>
              </TouchableOpacity>
            </View>

            {
              //DIV for google and Facebook and Twitter
            }
          </View>
        </View>
      </>
    );
  } else 
  
  if (getmethod === "byEmail") {
     */
  }
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/main_top.png")}
        style={{ position: "absolute", left: -140 }}
      />
      <View style={styles.forgottextCon}>
        <Text style={styles.forgotText}>Forgot Password</Text>
      </View>
      <View style={styles.imgCon}>
        <Image
          source={require("../assets/forgot.png")}
          style={{ height: 157, width: 201 }}
        />
      </View>
      <View style={styles.secCon}>
        <View style={styles.InputTextCon}>
          <Entypo
            name="email"
            size={24}
            style={{ alignSelf: "center", marginRight: 5 }}
            color="#653CA0"
          />
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={(text) => setemail(text)}
            style={styles.textInputs}
          ></TextInput>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => forgotByEmail()}
          style={styles.buttonCon}
        >
          <LinearGradient
            colors={["#6E3AA7", "#23286B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.doneButtonWrapper}
          >
            <Text style={styles.doneButtonText}>SEND EMAIL</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "78%",
            marginVertical: 15,
            alignSelf: "center",
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
            marginTop: 10,
            //    marginLeft: 10,
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontFamily: "OpenSans-SemiBold" }}>
            Back to Forgot Screen ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text style={{ fontFamily: "OpenSans-Bold" }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  {
    /**
  } else if (getmethod === "byPhone") {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", height: 100 }}>
          <Image
            source={require("../assets/main_top.png")}
            style={{ position: "absolute", left: -140 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                marginTop: 70,
                marginLeft: 90,
                fontSize: 24,
                fontFamily: "OpenSans-Bold",
              }}
            >
              phone ForgotPassword
            </Text>
          </View>
        </View>
        <View
          style={{
            marginLeft: 100,
            height: 160,
            marginTop: 28,
          }}
        >
          <Image
            source={require("../assets/forgot.png")}
            style={{ height: 157, width: 201 }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            marginTop: 15,
            marginLeft: 65,
            height: 465,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: 265,
              height: 45,
              backgroundColor: "#F1E7FF",
              borderRadius: 50,
              paddingLeft: 10,
              marginTop: 15,
            }}
          >
            <FontAwesome
              name="phone"
              size={24}
              color="black"
              style={{ alignSelf: "center", marginRight: 5 }}
              color="#653CA0"
            />
            <TextInput
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
              style={{
                width: 232,
                height: 45,
                borderRadius: 50,
                paddingLeft: 10,
                fontFamily: "OpenSans-Regular",
              }}
            ></TextInput>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setMethod("OTP")}
          >
            <Text style={{ marginTop: 15 }}>
              <LinearGradient
                colors={["#6E3AA7", "#23286B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.doneButtonWrapper}
              >
                <Text style={styles.doneButtonText}>SEND CODE</Text>
              </LinearGradient>
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "78%",
              marginTop: 10,
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
          <View style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}>
            <Text style={{ fontFamily: "OpenSans-SemiBold" }}>
              Back to Forgot Screen ?{" "}
            </Text>
            <TouchableOpacity onPress={() => setMethod("none")}>
              <Text style={{ fontFamily: "OpenSans-Bold" }}>Forgot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", height: 100 }}>
          <Image
            source={require("../assets/main_top.png")}
            style={{ position: "absolute", left: -140 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                marginTop: 70,
                marginLeft: 90,
                fontSize: 24,
                fontFamily: "OpenSans-Bold",
              }}
            >
              OTPForgotPassword
            </Text>
          </View>
        </View>
        <View
          style={{
            marginLeft: 100,
            height: 160,
            marginTop: 28,
          }}
        >
          <Image
            source={require("../assets/forgot.png")}
            style={{ height: 157, width: 201 }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            marginTop: 15,
            marginLeft: 65,
            height: 465,
          }}
        >
          <Text style={{ fontFamily: "OpenSans-Regular", color: colors.gray }}>
            Please type the verification code send to number
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: 265,
              height: 45,
              backgroundColor: "#F1E7FF",
              borderRadius: 50,
              paddingLeft: 10,
              marginTop: 15,
            }}
          >
            <Octicons
              name="key"
              size={24}
              color="black"
              style={{ alignSelf: "center", marginRight: 5 }}
              color="#653CA0"
            />
            <TextInput
              placeholder="Enter OTP Code"
              keyboardType="phone-pad"
              style={{
                width: 232,
                height: 45,
                borderRadius: 50,
                paddingLeft: 10,
                fontFamily: "OpenSans-Regular",
              }}
            ></TextInput>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setMethod("byPhone")}
          >
            <Text style={{ marginTop: 15 }}>
              <LinearGradient
                colors={["#6E3AA7", "#23286B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.doneButtonWrapper}
              >
                <Text style={styles.doneButtonText}>VERIFY</Text>
              </LinearGradient>
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "78%",
              marginTop: 10,
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
          <View style={{ marginTop: 10, marginLeft: 10, flexDirection: "row" }}>
            <Text style={{ fontFamily: "OpenSans-SemiBold" }}>
              Back to Forgot Screen ?{" "}
            </Text>
            <TouchableOpacity onPress={() => setMethod("byPhone")}>
              <Text style={{ fontFamily: "OpenSans-Bold" }}>Forgot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
   */
  }
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
    // alignItems: "center",
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
  buttonCon: {
    width: "70%",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    alignSelf: "center",
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
  forgottextCon: {
    //flexDirection: "row",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotText: {
    marginTop: 60,
    //marginLeft: 90,
    fontSize: 24,
    fontFamily: "OpenSans-Bold",
  },
  imgCon: {
    // marginLeft: 100,
    height: 160,
    marginTop: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  secCon: {
    // flexDirection: "column",
    marginTop: 15,
    justifyContent: "center",
    // alignSelf: "center",
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
    alignSelf: "center",
  },
  textInputs: {
    width: "90%",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 5,
    fontFamily: "OpenSans-Regular",
  },
});

export default ForgotPassword;
