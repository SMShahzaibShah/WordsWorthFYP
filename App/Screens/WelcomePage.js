import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import CustomButton from "../component/ButtonComponent";

import colors from "../assets/colors/colors";

import { LinearGradient } from "expo-linear-gradient";
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", height: 220 }}>
        <Image source={require("../assets/main_top2.png")} />
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              marginTop: 120,
              marginLeft: -30,
              fontSize: 24,
              fontFamily: "OpenSans-Bold",
            }}
          >
            WELCOME TO
          </Text>
          <Text
            style={{
              marginLeft: -39,
              fontSize: 24,
              fontFamily: "OpenSans-Bold",
            }}
          >
            WORDSWORTH
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: 20, height: 300 }}>
        <Image source={require("../assets/Welcome.png")} />
      </View>
      <View
        style={{
          flexDirection: "column",
          marginTop: 20,
          marginLeft: 110,
          height: 130,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text>
            <LinearGradient
              colors={["#6E3AA7", "#23286B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.doneButtonWrapper}
            >
              <Text style={styles.doneButtonText}>LOGIN</Text>
            </LinearGradient>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={{ marginTop: 25 }}>
            <LinearGradient
              colors={["#A5C8FF", "#23286B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.doneButtonWrapper}
            >
              <Text style={styles.doneButtonText}>SIGNUP</Text>
            </LinearGradient>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 60 }}>
        <Image source={require("../assets/main_bottom2.png")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  doneButtonWrapper: {
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 25,
    height: 45,
    width: 161,
  },
  doneButtonText: {
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold",
    textAlign: "center",
    marginTop: 10,
    color: colors.white,
  },
});

export default WelcomeScreen;
