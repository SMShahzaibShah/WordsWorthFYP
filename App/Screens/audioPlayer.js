import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";

import Slider from "@react-native-community/slider";

export default function audioPlayer({ navigation, route }) {
  const [sound, setSound] = useState();
  const [current, setcurrent] = useState();
  const [getmax, setmax] = useState();
  const [getButton, setButton] = useState("resume");
  const [getVolume, setVolumne] = useState(100);
  const [getSpeed, setSpeed] = useState(1);
  const [gettime, settime] = useState(1);

  async function playSound() {
    console.log("Loading Sound");
    //setSound(Audio.Sound())
    const { sound } = await Audio.Sound.createAsync({
      uri:
        "file:///storage/emulated/0/expoWordsWorthDownload/Audio/" +
        route.params.audioPartsNumber.key +
        ".wav",
    });

    setSound(sound);

    console.log("Playing Sound");
    if (gettime == 1) {
      await sound.playAsync();
      settime(0);
    }

    var pos = await sound.getStatusAsync();
    console.log(pos);
    while (pos.positionMillis < pos.playableDurationMillis) {
      //  console.log(pos.positionMillis);
      setcurrent(pos.positionMillis);
      setmax(pos.durationMillis);
      pos = await sound.getStatusAsync();
    }
  }
  function msToHMS(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    if (hours == 0) {
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return minutes + ":" + seconds;
    } else {
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return hours + ":" + minutes + ":" + seconds;
    }
  }
  useEffect(() => {
    if (sound == null) {
      playSound();
    }
  }, []);

  {
    /**
        onSlidingComplete={(val) => {
          console.log(val);
          sound.setPositionAsync(val);
          setcurrent(current);
        }}
         */
  }
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/playerTopLeft.png")}
        style={{
          left: 0,
          top: 0,
          position: "absolute",
        }}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          sound.unloadAsync();
          navigation.goBack();
        }}
        style={{
          marginTop: 5,
          backgroundColor: "#FFFFFF",
          width: 50,
          height: 50,
          borderRadius: 50,
          justifyContent: "center",
          top: 50,
          left: 40,
          position: "absolute",
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "#3F414E",
          }}
        >
          X
        </Text>
      </TouchableOpacity>
      <Image
        source={require("../assets/playerRightTop.png")}
        style={{
          right: 0,
          top: 0,
          position: "absolute",
        }}
      />
      <Image
        source={require("../assets/playerBottomLeft.png")}
        style={{
          left: 0,
          bottom: 0,
          position: "absolute",
        }}
      />
      <Image
        source={require("../assets/playerBottomRight.png")}
        style={{
          right: 0,
          bottom: 0,
          position: "absolute",
        }}
      />
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          width: "80%",
          textAlign: "center",
          color: "#3F414E",
        }}
      >
        {route.params.BookDetails.name}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#A0A3B1",
          width: "80%",
          textAlign: "center",
          margin: 5,
        }}
      >
        {route.params.audioPartsNumber.key}
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "70%",
          justifyContent: "space-between",
          margin: 10,
          padding: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            console.log("here");
            let val = current - 5000;
            console.log("current is before ", current);
            setcurrent(val);
            console.log("current is after ", current);
            //console.log(current);
            sound.setPositionAsync(val);
          }}
          style={{
            backgroundColor: "#EBEAEC",
            borderRadius: 50,
            alignSelf: "center",
          }}
        >
          <Image
            source={require("../assets/skipback5.png")}
            style={
              {
                //width: 50
              }
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#3F414E",
            borderRadius: 50,
            alignSelf: "center",
            justifyContent: "center",
            borderWidth: 6,
            borderColor: "#BABCC6",
          }}
          onPress={() => {
            if (getButton == "play") {
              sound.playAsync();
              setButton("resume");
            } else {
              setButton("play");
              sound.pauseAsync();
            }
          }}
        >
          {/**
          <Entypo name="controller-play" size={24} color="black" />
           */}
          {getButton == "play" ? (
            <Image
              source={require("../assets/play.png")}
              style={{ alignSelf: "center" }}
            />
          ) : (
            <Image
              source={require("../assets/pause.png")}
              style={{ alignSelf: "center" }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#EBEAEC",
            borderRadius: 50,
            alignSelf: "center",
          }}
          onPress={() => {
            console.log("current is before ", current);
            let val = current + 5000;
            setcurrent(val);
            console.log("current is after ", current);
            sound.setPositionAsync(val);
            console.log(current);
          }}
        >
          <Image source={require("../assets/forward5.png")} />
        </TouchableOpacity>
      </View>
      <View style={{ width: "90%" }}>
        <Slider
          minimumValue={0}
          maximumValue={getmax}
          value={current}
          disabled={sound == null ? true : false}
          minimumTrackTintColor="#3F414E"
          maximumTrackTintColor="#000000"
          thumbTintColor="#3F414E"
          onSlidingComplete={(val) => {
            //console.log(val, "val is");

            setcurrent(val);
            sound.setPositionAsync(val);
            //console.log(current, " current ");
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              color: "#3F414E",
              fontSize: 16,
            }}
          >
            {msToHMS(current)}
          </Text>

          <Text
            style={{
              color: "#3F414E",
              fontSize: 16,
            }}
          >
            {msToHMS(getmax)}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 14,
          color: "#A0A3B1",
          width: "80%",
          textAlign: "center",
          margin: 5,
        }}
      >
        Set Volume
      </Text>
      <View
        style={{
          width: "60%",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={getVolume}
          //disabled={sound == null ? true : false}
          minimumTrackTintColor="#3F414E"
          maximumTrackTintColor="#000000"
          thumbTintColor="#3F414E"
          onSlidingComplete={(val) => {
            //console.log(val, "val is");
            let vool = val / 100;
            //console.log(getVolume, " before volume ");

            sound.setVolumeAsync(vool);
            setVolumne((vool * 100).toFixed(0));
            //console.log(await sound.getStatusAsync());
            //console.log(getVolume, " volume ");
          }}
          style={{
            width: "90%",
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            color: "#3F414E",
            fontSize: 16,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {getVolume}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 14,
          color: "#A0A3B1",
          width: "80%",
          textAlign: "center",
          margin: 5,
        }}
      >
        Set Speed
      </Text>
      <View
        style={{
          width: "60%",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Slider
          minimumValue={0.5}
          maximumValue={2}
          value={getSpeed}
          //disabled={sound == null ? true : false}
          minimumTrackTintColor="#3F414E"
          maximumTrackTintColor="#000000"
          thumbTintColor="#3F414E"
          onSlidingComplete={async (val) => {
            //console.log(val, "val is");
            let vool = val;
            //console.log(getVolume, " before volume ");
            if (vool >= 0.5 && vool < 0.75) {
              sound.setRateAsync(0.5);
              setSpeed(0.5);
            } else if (vool >= 0.75 && vool < 1.0) {
              sound.setRateAsync(0.75);
              setSpeed(0.75);
            } else if (vool >= 1.0 && vool < 1.25) {
              sound.setRateAsync(1.0);
              setSpeed(1.0);
            } else if (vool >= 1.25 && vool < 1.5) {
              sound.setRateAsync(1.5);
              setSpeed(1.5);
            } else if (vool >= 1.5 && vool < 2) {
              sound.setRateAsync(2);
              setSpeed(2);
            } else {
              sound.setRateAsync(1);
              setSpeed(2);
            }
            //0.5 0.75 1.0 1.25 1.5 2
            //1 2 3 4 5 6

            // sound.setVolumeAsync(vool);

            console.log(await sound.getStatusAsync());
            //console.log(getVolume, " volume ");
          }}
          style={{
            width: "90%",
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            color: "#3F414E",
            fontSize: 16,
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {getSpeed}
        </Text>
      </View>
      {/**
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          justifyContent: "space-between",
        }}
      >

        <Button
          title="skip"
          onPress={() => {
            console.log("current is before ", current);
            let val = current + 5000;
            setcurrent(val);
            console.log("current is after ", current);
            sound.setPositionAsync(val);
            console.log(current);
          }}
        />

        <Button
          title="stop"
          onPress={() => {
            sound.pauseAsync();
          }}
        />
        <Button
          title="play"
          onPress={() => {
            sound.playAsync();
          }}
        />

        <Button
          title="back"
          onPress={() => {
            console.log("here");
            let val = current - 5000;
            console.log("current is before ", current);
            setcurrent(val);
            console.log("current is after ", current);
            //console.log(current);
            sound.setPositionAsync(val);
          }}
        />
                 
      </View>
      
      <View style={{ position: "absolute", bottom: 10 }}>
        <Button title="Play Sound" onPress={playSound} />
      </View>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ecf0f1",
    // padding: 10,
  },
});
