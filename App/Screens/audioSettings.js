import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import colors from "../assets/colors/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-community/picker";

import { Audio } from "expo-av";

const soundObject = new Audio.Sound();

import * as FileSystem from "expo-file-system";

const audioSettings = ({ navigation, route }) => {
  const [name, setname] = useState({ fName: "", LName: "" });

  const [getquestion, setquestion] = useState({
    quest: "Microsoft David Desktop",
  });
  var ip = "192.168.100.106";

  const downloadFile = (bookName) => {
    //  console.log(bookName + "download");
    console.log(bookName.quest);
    let naratoorNaam = bookName.quest.split(" ").join("$");
    //  console.log(naratoorNaam);
    const uri = "http://" + ip + ":8080/files/test/" + naratoorNaam;

    let fileUri = FileSystem.documentDirectory + bookName.quest + ".wav";
    //check(bookName);
    //console.log(status);
    //if (status == true) {
    //setTimeout(5000);
    FileSystem.downloadAsync(uri, fileUri)
      .then(async ({ uri }) => {
        console.log("uri is", uri);

        if (soundObject._loaded) {
          soundObject.unloadAsync();
          await soundObject.loadAsync({
            uri: uri,
          });
        } else {
          await soundObject.loadAsync({
            uri: uri,
          });
        }
        await soundObject.playAsync();

        //   setModal(false);
        //outputData();
      })
      .catch((error) => {
        console.error(error);
      });
    //} else {
    //  setModal(false);

    //   alert("book already there");
    //}
  };

  const saveNarator = async () => {
    var link = firebase.auth().currentUser.uid + "/narrator";
    await AsyncStorage.setItem(link, getquestion.quest).then(() => {
      alert("Narrator has been set");
    });
  };

  const getNarrator = async () => {
    var link = firebase.auth().currentUser.uid + "/narrator";
    const dat = await AsyncStorage.getItem(link);
    console.log(dat);
  };
  const Arrays = [{ key: "0", data: "Search A Book", backColor: "red" }];

  useEffect(() => {
    var user = firebase.auth().currentUser;
    //  console.log(user);
    var disName = user.displayName;
    var disNamear = disName.split(",");
    setname({ fName: disNamear[0], LName: disNamear[1] });
    //setemail()
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/main_bottom4.png")}
        style={{ position: "absolute", bottom: 0, right: 0, width: "100%" }}
      />
      {
        //go Back Button
      }

      <Image
        source={require("../assets/main_top.png")}
        style={styles.backGroungImage}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons
          name="ios-arrow-back"
          size={20}
          color={colors.gray}
          style={{
            marginRight: 5,
            alignSelf: "center",
          }}
        />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {
        //go Back Button close
      }
      {
        //Page Name
      }
      <View style={styles.mainTextCon}>
        <Text style={styles.maintext}>AUDIO SETTINGS</Text>
      </View>

      {
        //Page Name Close
      }
      <View style={styles.nameandImgCon}>
        <Image source={require("../assets/defaultUser.png")} />
        <View
          style={{
            flexDirection: "row",
            //marginLeft: 5,
            marginTop: 3,
          }}
        >
          <Text style={{ fontFamily: "OpenSans-Bold", color: colors.gray }}>
            {name.fName}{" "}
          </Text>
          <Text
            style={{
              // marginLeft: 5,
              fontFamily: "OpenSans-Bold",
              color: colors.gray,
            }}
          >
            {name.LName}
          </Text>
        </View>
      </View>
      {/**        <Image
          source={require("../assets/EditProfile1.png")}
          style={{ marginTop: 666, right: 5, position: "absolute" }}
        />
         */}

      <FlatList
        data={Arrays}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.secondCon}>
              {
                //Security Settings
              }
              <View style={{ marginTop: 10, alignSelf: "center" }}>
                <Text style={styles.lineText}>Select Narrator ? </Text>
                <Picker
                  selectedValue={getquestion}
                  style={{
                    height: 50,
                    width: 270,
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setquestion({ quest: itemValue })
                  }
                  mode="dropdown"
                >
                  <Picker.Item
                    label="Microsoft David Desktop"
                    value="Microsoft David Desktop"
                  />
                  <Picker.Item
                    label="Microsoft James"
                    value="Microsoft James"
                  />
                  <Picker.Item
                    label="Microsoft Linda"
                    value="Microsoft Linda"
                  />
                  <Picker.Item
                    label="Microsoft Richard"
                    value="Microsoft Richard"
                  />
                  <Picker.Item
                    label="Microsoft George"
                    value="Microsoft George"
                  />
                  <Picker.Item
                    label="Microsoft Susan"
                    value="Microsoft Susan"
                  />
                  <Picker.Item label="Microsoft Sean" value="Microsoft Sean" />
                  <Picker.Item
                    label="Microsoft Heera"
                    value="Microsoft Heera"
                  />
                  <Picker.Item label="Microsoft Ravi" value="Microsoft Ravi" />
                  <Picker.Item label="Microsoft Mark" value="Microsoft Mark" />
                  <Picker.Item
                    label="Microsoft Hazel Desktop"
                    value="Microsoft Hazel Desktop"
                  />
                  <Picker.Item
                    label="Microsoft Catherine"
                    value="Microsoft Catherine"
                  />
                  <Picker.Item
                    label="Microsoft Zira Desktop"
                    value="Microsoft Zira Desktop"
                  />
                </Picker>
              </View>
              <View
                style={{ marginTop: 10, width: "70%", alignSelf: "center" }}
              >
                <Text style={styles.lineText}> Sample Audio </Text>
                <View style={styles.playButton}>
                  <TouchableOpacity onPress={() => downloadFile(getquestion)}>
                    <Entypo
                      name="controller-play"
                      size={38}
                      color="#653CA0"
                      style={{
                        alignSelf: "center",
                        marginLeft: 3,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  //setModal(true);
                  //saveNarator();
                  saveNarator();
                }}
                style={styles.buttonCon}
              >
                <LinearGradient
                  colors={["#6E3AA7", "#23286B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.doneButtonWrapper}
                >
                  <Text style={styles.doneButtonText}>SAVE</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          );
        }}
      />
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
    // alignItems: "center",
    justifyContent: "center",
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
  doneButtonWrapper: {
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 25,
    width: 265,
    height: 45,
  },
  doneButtonText: {
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold",
    textAlign: "center",
    marginTop: 10,
    color: colors.white,
  },
  backButton: {
    marginTop: "8%",
    marginLeft: "5%",
    width: 80,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,

    elevation: 5,
    paddingHorizontal: 10,
  },
  backText: {
    alignSelf: "center",
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    color: colors.gray,
  },
  backGroungImage: {
    position: "absolute",
    top: 0,
    left: -140,
  },
  mainTextCon: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  maintext: {
    fontSize: 24,
    fontFamily: "OpenSans-Bold",
  },
  nameandImgCon: {
    // marginLeft: 130,
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  secondCon: {
    flexDirection: "column",
    marginTop: 25,
    // marginLeft: 65,
    justifyContent: "center",
    // alignItems: "center",
    //alignSelf: "center",
  },
  lineText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
    color: colors.gray,
  },
  playButton: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#F1E7FF",
    borderRadius: 50,
    width: 50,
    height: 50,
    //padding: 3,
    alignItems: "center",
  },
  buttonCon: {
    width: "70%",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    //  elevation: 5,
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
});

export default audioSettings;
