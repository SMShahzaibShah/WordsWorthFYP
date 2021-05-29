import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image, StatusBar } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import AppIntroSlider from "react-native-app-intro-slider";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../assets/colors/colors";

import onboard1 from "../assets/onboarding1.png";

const data = [
  {
    title: "Save time by tracking \n your studies materials",
    text: "search books, novals, stories and more",
    image: require("../assets/onboarding1.png"),
  },
  {
    title: "Stay on top of your education",
    text: "Reduce your stress, increase your productivity",
    image: require("../assets/onboarding2.png"),
  },
  {
    title: "Spend more by Listening books you love",
    text: "Easily convert books into audiobook",
    image: require("../assets/onboarding3.png"),
  },
];

const fetchFont = () =>
  Font.loadAsync({
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
  });

export default function Onboard(props) {
  //states for loading font
  const [fontLoading, setfontLoading] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.img} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.txt}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => item.title;

  const renderDoneButton = () => {
    return (
      <LinearGradient
        colors={["#A5C8FF", "#23286B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.doneButtonWrapper}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </LinearGradient>
    );
  };
  const renderNextButton = () => {
    return (
      <View style={styles.rightTextWrapper}>
        <Text style={styles.rightText}>Next</Text>
      </View>
    );
  };
  const renderPrevButton = () => {
    return (
      <View style={styles.leftTextWrapper}>
        <Text style={styles.leftText}>Prev</Text>
      </View>
    );
  };
  const handleDone = async () => {
    await AsyncStorage.setItem("onboard", "false");
    props.handleDone();
  };
  if (fontLoading) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderDoneButton={renderDoneButton}
          renderNextButton={renderNextButton}
          renderPrevButton={renderPrevButton}
          showPrevButton
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          data={data}
          onDone={handleDone}
        />
      </View>
    );
  } else {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setfontLoading(true)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
    fontFamily: "OpenSans-SemiBold",
    marginHorizontal: 50,
    marginTop: 20,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  img: {
    marginVertical: 40,
  },
  title: {
    fontSize: 24,
    color: colors.black,
    textAlign: "center",
    fontFamily: "OpenSans-Bold",
    marginHorizontal: 50,
  },
  leftTextWrapper: {
    width: 40,
    height: 40,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  leftText: {
    color: colors.blue,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
  },
  rightTextWrapper: {
    width: 40,
    height: 40,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  rightText: {
    color: colors.blue,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
  },
  activeDotStyle: {
    backgroundColor: colors.blue,
  },
  dotStyle: { backgroundColor: colors.blueFaded },
  doneButtonWrapper: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 50,
    borderRadius: 25,
    marginRight: -40,
  },
  doneButtonText: {
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold",
    textAlign: "center",
    margin: 10,
    color: colors.white,
  },
});
