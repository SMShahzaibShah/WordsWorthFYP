import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colorss from "../../assets/colors/colors";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

import Slider from "@react-native-community/slider";
export default function CollectionAudioBooksDetails({ navigation, route }) {
  const [CollectionsName, setCollectionsName] = useState(
    route.params.collectionInfo.name
  );
  const [CollectionsDis, setCollectionsDis] = useState(
    route.params.collectionInfo.dis
  );
  const [listsOfBook, setlistsOfBook] = useState(
    route.params.collectionInfo.items
  );
  //const [getCollection, setCollection] = useState(); //conatins Book That remains after Deleted
  const [allbooks, setbooks] = useState([]); //Conatins ALl the books that are avaiable in library

  const [getselectedItem, setselectedItem] = useState(); //conatins Book To be Deleted

  const [getNotInCollection, setNotInCollection] = useState(); //conatins Book that are not in collection
  const [getModal, setModal] = useState(false); //Display Modal

  const [getBooksToAddInColl, setgetBooksToAddInColl] = useState();
  const [ref, setref] = useState(false); //refresh List 1
  const [ref2, setref2] = useState(false); //refresh List 2

  {
    //Music Player
  }
  const [getPlaymodal, setPlayModal] = useState(false);

  const [sound, setSound] = useState();
  const [current, setcurrent] = useState();
  const [getmax, setmax] = useState();
  const [getButton, setButton] = useState("play");
  const [getVolume, setVolumne] = useState(100);
  const [getSpeed, setSpeed] = useState(1);

  const [getbookname, setbookname] = useState();
  const [getpartName, setPartName] = useState();

  //Audio Player Funtions
  async function playSound(item) {
    var folerName = item.split("-Part");
    //setSound(Audio.Sound())
    const { sound } = await Audio.Sound.createAsync({
      uri:
        "file:///storage/emulated/0/expoWordsWorthDownload/" +
        folerName[0] +
        "/" +
        item,
    });

    setSound(sound);

    console.log("Playing Sound");

    await sound.playAsync();

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
  {
    //MusicPlayer Close
  }
  const allinColl = () => {
    //  console.log(getselectedItem);
    const booksInCols = route.params.collectionInfo.items;
    var data = booksInCols.filter((e) => !getselectedItem.includes(e));
    //setCollection(data);
    if (getBooksToAddInColl.length > 0) {
      data.push(getBooksToAddInColl);
    }
    return data;
  };
  const storeExpense = async (data) => {
    try {
      await AsyncStorage.setItem("audioCollections", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
  const getExpense = async (ob) => {
    try {
      var value = await AsyncStorage.getItem("audioCollections");
      if (value !== null) {
        value = JSON.parse(value);
        // console.log(value);
        for (var i = 0; i < value.length; i++) {
          if (value[i].name == route.params.collectionInfo.name) {
            value[i] = ob;
          }
        }
        //console.log(value);
        storeExpense(value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteColles = async (ob) => {
    try {
      var value = await AsyncStorage.getItem("audioCollections");
      if (value !== null) {
        value = JSON.parse(value);

        // console.log(value);
        var vall = [];
        for (var i = 0; i < value.length; i++) {
          if (value[i].name != route.params.collectionInfo.name) {
            vall.push(value[i]);
          }
        }

        //console.log(vall);
        storeExpense(vall);
        navigation.navigate("AudioBooks");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const selectItem = (item) => {
    // console.log("here");
    var color = false;
    //console.log(item);
    //console.log(getselectedItem);

    for (var i = 0; i < getselectedItem.length; i++) {
      //console.log(getselectedItem[i]);
      if (getselectedItem[i] == item) {
        //found = true;
        // console.log(getselectedItem);
        // console.log(item);
        color = true;
        break;
      }
    }
    //console.log(color);
    return color;
  };

  const playAudioBook = (item) => {
    console.log(item);
    var folderName = item.split("-Part");
    console.log(folderName[0]);
  };

  const selectItem2 = (item) => {
    // console.log("here");
    var color = false;
    //console.log(item);
    //console.log(getselectedItem);

    for (var i = 0; i < getBooksToAddInColl.length; i++) {
      //console.log(getselectedItem[i]);
      if (getBooksToAddInColl[i] == item) {
        //found = true;
        // console.log(getselectedItem);
        // console.log(item);
        color = true;
        break;
      }
    }
    //console.log(color);
    return color;
  };

  const outputData = async () => {
    const datas = await FileSystem.readDirectoryAsync(
      "file:///storage/emulated/0/expoWordsWorthDownload/"
    );
    var tobe = [];
    for (var i = 0; i < datas.length; i++) {
      if (datas[i].includes(".pdf") || datas[i].includes(".txt")) {
      } else {
        if (tobe.indexOf(datas[i]) == -1) {
          tobe.push(datas[i]);
        }
      }
    }
    var tobe1 = [];
    for (var i = 0; i < tobe.length; i++) {
      const data = await FileSystem.readDirectoryAsync(
        "file:///storage/emulated/0/expoWordsWorthDownload/" + tobe[i]
      );
      for (var j = 0; j < data.length; j++) {
        if (tobe1.indexOf(data[j]) == -1) {
          tobe1.push(data[j]);
        }
      }
    }
    setbooks(tobe1);
  };

  const notinColl = () => {
    const booksInCols = route.params.collectionInfo.items;
    const x = allbooks.filter((e) => !booksInCols.includes(e));

    setNotInCollection(x);

    // console.log(getNotInCollection);
  };

  useEffect(() => {
    outputData();
    //  setlistsOfBook()
  }, []);
  return (
    <View style={styles.container}>
      {
        //Music Player
      }
      <Modal
        animationType={"none"}
        visible={getPlaymodal}
        // onDismiss={() => sound.unloadAsync()}
        onRequestClose={() => {
          if (sound._loaded) {
            sound.unloadAsync();
            setPlayModal(false);
          } else {
            setPlayModal(false);
          }
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/playerTopLeft.png")}
            style={{
              left: 0,
              top: 0,
              position: "absolute",
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (sound._loaded) {
                sound.unloadAsync();
                setPlayModal(false);
              } else {
                setPlayModal(false);
              }

              // setPlayModal(false);
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
              elevation: 5,
              alignItems: "center",
            }}
          >
            <Entypo name="cross" size={35} color="#3F414E" />
            {/**
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
                 */}
          </TouchableOpacity>
          <Image
            source={require("../../assets/playerRightTop.png")}
            style={{
              right: 0,
              top: 0,
              position: "absolute",
            }}
          />
          <Image
            source={require("../../assets/playerBottomLeft.png")}
            style={{
              left: 0,
              bottom: 0,
              position: "absolute",
            }}
          />
          <Image
            source={require("../../assets/playerBottomRight.png")}
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
            {getbookname}
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
            {getpartName}
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
                elevation: 10,
              }}
            >
              <MaterialIcons name="replay-5" size={40} color="#a4a4aa" />
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
                  sound.pauseAsync();
                  setButton("resume");
                } else {
                  setButton("play");
                  sound.playAsync();
                }
              }}
            >
              {/**
          <Entypo name="controller-play" size={24} color="black" />
           */}
              {getButton == "play" ? (
                <Image
                  source={require("../../assets/pause.png")}
                  style={{ alignSelf: "center" }}
                />
              ) : (
                <Image
                  source={require("../../assets/play.png")}
                  style={{ alignSelf: "center" }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#EBEAEC",
                borderRadius: 50,
                alignSelf: "center",
                elevation: 10,
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
              <MaterialIcons name="forward-5" size={40} color="#a4a4aa" />
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
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
      </Modal>
      {
        //Music Player CLose
      }
      <Modal
        transparent={true}
        animationType={"none"}
        visible={getModal}
        // onRequestClose={() => outputCollections()}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            {
              //Cross Button
            }
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                backgroundColor: "gray",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              <Entypo name="cross" size={30} color="white" />
            </TouchableOpacity>
            {
              //Cross Button close
            }
            {
              //Collection TExt Input
            }
            <View
              style={{
                flexDirection: "row",
                width: 265,
                height: 45,
                backgroundColor: "#F1E7FF",
                borderRadius: 50,
                paddingLeft: 10,
                marginTop: 40,
              }}
            >
              <MaterialIcons
                name="collections-bookmark"
                size={24}
                style={{ alignSelf: "center", marginRight: 5 }}
                color="#653CA0"
              />
              <TextInput
                placeholder="Enter Collection Name"
                style={{
                  width: 232,
                  height: 45,
                  borderRadius: 50,
                  paddingLeft: 10,
                  fontFamily: "OpenSans-Regular",
                }}
                value={CollectionsName}
                onChangeText={(text) => setCollectionsName(text)}
              ></TextInput>
            </View>
            {
              //Collection TExt Input close
            }
            {
              //Collection TExt Input
            }
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
              <MaterialIcons
                name="description"
                size={24}
                style={{ alignSelf: "center", marginRight: 5 }}
                color="#653CA0"
              />
              <TextInput
                placeholder="Enter Collection Description"
                style={{
                  width: 232,
                  height: 45,
                  borderRadius: 50,
                  paddingLeft: 10,
                  fontFamily: "OpenSans-Regular",
                }}
                value={CollectionsDis}
                onChangeText={(text) => setCollectionsDis(text)}
              ></TextInput>
            </View>
            {
              //Collection TExt Input close
            }
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 16,
                color: "#666666",
                marginTop: 10,
              }}
            >
              {" "}
              Select AudioBooks to delete ?{" "}
            </Text>
            <FlatList
              data={listsOfBook}
              //keyExtractor={(item) => Math.random().toString(36).substring(7)}
              //showsVerticalScrollIndicator={false}
              //numColumns={2}
              //  horizontal={true}
              style={{
                marginTop: 5,
                //height: 0,
                //backgroundColor: "red",
              }}
              refreshing={ref}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      //  backgroundColor: "red",
                      // justifyContent: "space-between",
                      height: 50,
                      width: 265,
                      margin: 5,
                      borderRadius: 50,
                      padding: 7,
                      backgroundColor:
                        selectItem(item) == true ? "green" : "lightgray",
                      justifyContent: "center",
                      //marginLeft: 5,
                      //flexDirection: "row",
                    }}
                    onPress={() => {
                      var newVal = getselectedItem;
                      //console.log(item);
                      //console.log(getselectedItem);
                      if (newVal.includes(item)) {
                        alert("Item Already Exits");
                      } else {
                        newVal.push(item);
                        setselectedItem(newVal);
                        //console.log(getselectedItem);
                        setref(true);
                        setTimeout(() => {
                          setref(false);
                        }, 500);
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "OpenSans-SemiBold",
                        fontSize: 12,
                        //color: colors.blue,
                        justifyContent: "center",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />

            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 16,
                color: "#666666",
                marginTop: 10,
              }}
            >
              {" "}
              Select AudioBooks To Add In Collection ?{" "}
            </Text>
            <FlatList
              data={getNotInCollection}
              //keyExtractor={(item) => Math.random().toString(36).substring(7)}
              //showsVerticalScrollIndicator={false}
              //numColumns={2}
              // horizontal={true}
              style={{
                // marginTop: 5,
                height: 0,
                // backgroundColor: "red",
              }}
              refreshing={ref2}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      //  backgroundColor: "red",
                      // justifyContent: "space-between",
                      height: 50,
                      width: 265,
                      margin: 5,
                      borderRadius: 50,
                      padding: 7,
                      backgroundColor:
                        selectItem2(item) == true ? "green" : "lightgray",
                      justifyContent: "center",
                      //marginLeft: 5,
                      //flexDirection: "row",
                    }}
                    onPress={() => {
                      var newVal = getBooksToAddInColl;
                      //console.log(item);
                      //console.log(getselectedItem);
                      if (newVal.includes(item)) {
                        alert("Item Already Exits");
                      } else {
                        newVal.push(item);
                        setgetBooksToAddInColl(newVal);
                        //console.log(getselectedItem);
                        //   console.log(getBooksToAddInColl);

                        setref2(true);
                        setTimeout(() => {
                          setref2(false);
                        }, 100);
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "OpenSans-SemiBold",
                        fontSize: 12,
                        //color: colors.blue,
                        justifyContent: "center",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            {
              //Button
            }
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                {
                  const ob = {
                    name: CollectionsName,
                    items: allinColl(),
                    dis: CollectionsDis,
                  };

                  setTimeout(() => {
                    setlistsOfBook(ob.items);
                    setModal(false);
                    console.log(ob);
                    getExpense(ob);
                    setlistsOfBook(ob.items);
                    // navigation.goBack();
                  }, 2000);
                }
              }}
            >
              <Text style={{ margin: 5 }}>
                <LinearGradient
                  colors={["#6E3AA7", "#23286B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.doneButtonWrapper}
                >
                  <Text style={styles.doneButtonText}>Update</Text>
                </LinearGradient>
              </Text>
            </TouchableOpacity>
            {
              //Button
            }
            {
              //Button
            }
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                {
                  /**
                SaveData({
                  name: CollectionsName,
                  dis: CollectionsDis,
                  items: getselectedItem,
                });
               // outputCollections();
                setModal(false);
              
               */ DeleteColles(route.params.collectionInfo);
                }
              }}
            >
              <Text style={{ margin: 2, marginBottom: 10 }}>
                <LinearGradient
                  colors={["#6E3AA7", "#23286B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.doneButtonWrapper}
                >
                  <Text style={styles.doneButtonText}>Delete</Text>
                </LinearGradient>
              </Text>
            </TouchableOpacity>
            {
              //Button
            }
          </View>
        </View>
      </Modal>
      {
        //Back Button
      }
      <View
        style={{
          flexDirection: "row",
          // marginTop: 33,
          width: "80%",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("allCollections")}
          style={{
            flexDirection: "row",
          }}
        >
          <Ionicons
            name="md-arrow-back"
            size={24}
            color="black"
            style={{
              marginRight: 3,
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={async () => {
            console.log("Edit");
            setselectedItem([]);
            setgetBooksToAddInColl([]);
            setModal(true);
            notinColl();
          }}
        >
          <Octicons name="gear" size={25} color="black" />
        </TouchableOpacity>
      </View>

      {
        //Back Button close
      }
      {
        //Collection Details
      }
      {
        //Text
      }
      <View
        style={{
          //alignItems: "center",
          //justifyContent: "center",
          alignSelf: "center",
          //backgroundColor: "red",
          width: "80%",
        }}
      >
        <View
          style={{
            // width: "95%",
            //  marginLeft: "7%",
            // backgroundColor: "red",
            //  flexDirection: "row",
            marginTop: 20,
            //    alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "OpenSans-SemiBold",
              fontSize: 18,
              color: colorss.blue,
              // marginTop: 20,
            }}
          >
            Collection Name :
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 17,
              color: colorss.blueFaded,
              // marginTop: 20,
              // alignSelf: "center",
              //marginLeft: 5,
              textAlign: "left",
            }}
          >
            {CollectionsName}
          </Text>
        </View>
        {
          //Collection Details close
        }
        {
          //Text
        }
        <View
          style={{
            // width: "95%",
            //   marginLeft: "7%",
            //  backgroundColor: "red",
            //   flexDirection: "row",
            marginTop: 5,
            // alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "OpenSans-SemiBold",
              fontSize: 18,
              color: colorss.blue,
              // marginTop: 20,
            }}
          >
            Collection Discription :
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 17,
              color: colorss.blueFaded,
              // marginTop: 20,
              // alignSelf: "center",
              //marginLeft: 5,
              textAlign: "left",
            }}
          >
            {CollectionsDis}
          </Text>
        </View>
        {
          //Collection Details close
        }

        <Text
          style={{
            fontFamily: "OpenSans-SemiBold",
            fontSize: 18,
            color: colorss.blue,
            marginTop: 10,
            marginLeft: -4,
          }}
        >
          {" "}
          List of AudioBooks In Collection :{" "}
        </Text>
        {
          //flat List
        }
        <FlatList
          data={listsOfBook}
          //keyExtractor={(item) => Math.random().toString(36).substring(7)}
          //showsVerticalScrollIndicator={false}
          //numColumns={2}
          style={{
            marginTop: 5,
            // backgroundColor: "red",
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  //  backgroundColor: "red",
                  // justifyContent: "space-between",
                  height: 50,
                  width: "90%",
                  margin: 10,
                  borderRadius: 10,
                  padding: 7,
                  backgroundColor: "lightgray",
                  justifyContent: "center",
                  //marginLeft: 5,
                  //flexDirection: "row",
                }}
                onPress={() => {
                  setPlayModal(true);
                  playSound(item);
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans-SemiBold",
                    fontSize: 12,
                    //color: colors.blue,
                    justifyContent: "center",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(index) => index.toString()}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf8f5",
    // alignItems: "center",
    // justifyContent: "center",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000080",
  },
  activityIndicatorWrapper: {
    backgroundColor: "white",
    height: "80%",
    width: "90%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-around",
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
    color: "#FFFFFF",
  },
});
