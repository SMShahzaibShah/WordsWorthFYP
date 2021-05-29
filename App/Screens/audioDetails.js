import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";

import * as MediaLibrary from "expo-media-library";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
import Slider from "@react-native-community/slider";

const getUrl = (img) => {
  //console.log(img.split("url:")[1]);
  return img.split("url:")[1];
};
const audioDetails = ({ navigation, route }) => {
  const [getb, setb] = useState([]);
  const [getpage, setpage] = useState(true);
  const [getref, setref] = useState(false);

  var ip = "192.168.100.106";

  const deleteAudio = async (naaamofAudioFile) => {
    var foldername = route.params.BookDetails.name;
    foldername = foldername.split(" ").join("-");
    naaamofAudioFile = naaamofAudioFile + ".wav";
    {
      /**
    var fileUri =
      "file:///storage/emulated/0/expoWordsWorthDownload/" +
      foldername +
      "/" +
      naaamofAudioFile +
      ".wav";
 */
    }
    let fileUri =
      "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540smshahzaib%252FFYP_WordsWorth/" +
      naaamofAudioFile;

    // console.log(fileUri);

    const album = await MediaLibrary.getAlbumsAsync(fileUri);
    //console.log(album);

    var toFind = "";
    //var co = 0;
    for (var i = 0; i < album.length; i++) {
      if (album[i].title.indexOf(foldername) > -1) {
        toFind = album[i];
        break;
        //co = co + 1;
      }
    }
    //console.log(co);
    //console.log(toFind[0]);

    let media = await MediaLibrary.getAssetsAsync({
      album: toFind,
      mediaType: ["audio"],
    });

    var asse = media.assets;
    console.log(asse);

    var toDel = "";
    for (var i = 0; i < asse.length; i++) {
      if (asse[i].filename.indexOf(naaamofAudioFile) > -1) {
        toDel = asse[i];
      }
    }
    console.log(toDel);

    var delArray = [toDel];
    console.log(delArray);
    await MediaLibrary.deleteAssetsAsync(delArray);
  };

  const displayButton = async () => {
    var folderName = route.params.BookDetails.name;
    folderName = folderName.split(" ").join("-");
    try {
      const data = await FileSystem.readDirectoryAsync(
        "file:///storage/emulated/0/expoWordsWorthDownload/" + folderName
      );

      var arr = [];
      for (var i = 0; i < data.length; i++) {
        arr.push(data[i]);
      }
      // console.log(arr);
      setb(arr);
      setpage(false);
      //setb(data);
    } catch {
      console.log("here");
      setpage(false);
    }
  };
  useEffect(() => {
    displayButton();
    //console.log(typeof getb);
  }, []);

  const [getmodal, setModal] = useState(false);
  const [getPlaymodal, setPlayModal] = useState(false);
  const [getText, setText] = useState(false);

  //of AudioPlayer File
  const [sound, setSound] = useState();
  const [current, setcurrent] = useState();
  const [getmax, setmax] = useState();
  const [getButton, setButton] = useState("play");
  const [getVolume, setVolumne] = useState(100);
  const [getSpeed, setSpeed] = useState(1);

  const [getbookname, setbookname] = useState();
  const [getpartName, setPartName] = useState();

  //Audio Player Funtions
  async function playSound(naaamofAudioFile, foldername) {
    foldername = foldername.split(" ").join("-");
    console.log(naaamofAudioFile);
    console.log(foldername);
    console.log("Loading Sound");
    //setSound(Audio.Sound())
    const { sound } = await Audio.Sound.createAsync({
      uri:
        "file:///storage/emulated/0/expoWordsWorthDownload/" +
        foldername +
        "/" +
        naaamofAudioFile +
        ".wav",
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
  const Arrays = [{ key: "0", data: "Search A Book", backColor: "red" }];

  const [status, setStatus] = useState(true);

  const getpart = async (bookName, link) => {
    // let booknameForFolder = link.name.split(" ").join("-");
    let data = link.file;
    data = data.split("/").join("$");
    // var narratorName = "Microsoft Mark";
    var narratorLink = firebase.auth().currentUser.uid + "/narrator";
    var narratorName = await AsyncStorage.getItem(narratorLink);
    if (narratorName == null) {
      narratorName = "Microsoft Linda";
    }
    console.log(narratorName);
    const uri =
      "http://" +
      ip +
      ":8080/files/fetch/" +
      data +
      "||" +
      bookName.key +
      "||" +
      bookName.start +
      "||" +
      bookName.end +
      "||" +
      narratorName.split(" ").join("$");

    return await fetch(uri)
      .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson);
        downloadFile(bookName, responseJson, link);
      })
      .catch((error) => {
        // console.error(error);
        setModal(false);
        alert(error);
        // setModal(false);
      });
  };
  const downloadFile = async (bookName, send, link) => {
    //  console.log(bookName + "download");
    console.log("yes");
    //setText(false);
    let booknameForFolder = link.name.split(" ").join("-");
    const uri = "http://" + ip + ":8080/files/get/" + send;
    let fileUri = FileSystem.documentDirectory + bookName.key + ".wav";
    //check(bookName);
    //console.log(status);
    //if (status == true) {
    //setTimeout(5000);
    await FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        console.log("Download ho gya");
        saveAudioFile(uri, booknameForFolder);
        console.log("uri is", uri);
        console.log("done");
        // setText(true);
        //SaveData(bookName);
        setModal(false);
        //outputData();
        var newVal = getb;
        newVal.push(bookName.key + ".wav");
        console.log(newVal);
        setb(newVal);
        setref(true);
        setTimeout(() => {
          setref(false);
        }, 500);
      })
      .catch((error) => {
        console.error(error);
      });
    //} else {
    //  setModal(false);

    //   alert("book already there");
    //}
  };

  const saveAudioFile = async (fileUri, bookName) => {
    console.log(bookName + " save");
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync(
        "expoWordsWorthDownload" + "/" + bookName
      );
      await MediaLibrary.createAlbumAsync(
        "expoWordsWorthDownload" + "/" + bookName,
        asset,
        false
      );
    }
  };

  if (getpage == true) {
    return (
      <>
        <View style={{ justifyContent: "center", alignSelf: "center" }}>
          <ActivityIndicator size="large" />
          <Text style={{ fontSize: 18, fontFamily: "OpenSans-Bold" }}>
            Loading Please Wait
          </Text>
        </View>
      </>
    );
  } else {
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
                    source={require("../assets/pause.png")}
                    style={{ alignSelf: "center" }}
                  />
                ) : (
                  <Image
                    source={require("../assets/play.png")}
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
        {
          //Image for background
        }
        <Image
          source={require("../assets/detailBackground.png")}
          style={styles.backGroungImage}
        />
        {
          //Image close
        }
        {
          //Div code where Imgae will be displayed
        }
        <View>
          {
            //Back button Icon
          }

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.goBack();
            }}
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
            //back Button Close
          }
          {
            //book detail Text
          }
          <View style={{ width: "100%", marginLeft: "7%" }}>
            <Text style={styles.mainText}>AUDIOBOOK</Text>
          </View>
          {
            //bookDetail Close
          }
          <Modal
            transparent={true}
            animationType={"none"}
            visible={getmodal}
            //onDismiss={() => console.log("close modal")}
          >
            <View style={styles.modalBackground}>
              <View style={styles.activityIndicatorWrapper}>
                <Text
                  style={{
                    fontFamily: "OpenSans-SemiBold",
                    fontSize: 14,
                    color: colors.blue,
                  }}
                >
                  Please Wait..
                </Text>
                <ActivityIndicator
                  animating={getmodal}
                  size="large"
                  color="black"
                />
              </View>
            </View>
          </Modal>
          {
            //WhiteContainer
          }
          <View style={styles.secondcontainer}>
            {
              //Book Icon
            }
            <View style={styles.flatList}>
              <View style={styles.ScrollView}>
                <View
                  style={{
                    ...styles.ScrollViewItem,
                  }}
                >
                  {
                    //div for Image
                  }
                  <View style={styles.imgDiv}>
                    {route.params.BookDetails.image != undefined ? (
                      <Image
                        source={{
                          uri: route.params.BookDetails.image,
                        }}
                        style={styles.imgCon}
                      />
                    ) : (
                      <Image
                        source={{
                          //uri: getUrl(route.params.BookDetails.image),
                          uri: route.params.BookDetails.img,
                        }}
                        style={styles.imgCon}
                      />
                    )}
                  </View>

                  {
                    //div for Image close
                  }
                  {
                    //div for Text close
                  }
                  <View
                    style={{
                      flexDirection: "column",
                      //marginLeft: -40,
                      //backgroundColor: "cyan",
                      width: 160,
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.ScrollViewText,
                        fontSize: 14,
                        color: colors.blue,
                        fontFamily: "OpenSans-SemiBold",
                        height: 75,
                        textAlign: "justify",
                      }}
                    >
                      {route.params.BookDetails.name}
                    </Text>
                    <Text
                      style={{
                        ...styles.ScrollViewText,
                        marginTop: 15,
                        textAlign: "justify",
                        width: "100%",
                        height: "55%",
                      }}
                    >
                      {route.params.BookDetails.description}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                height: Dimensions.get("window").height * 0.45,
                //backgroundColor: "red",
                width: "90%",
              }}
            >
              <FlatList
                data={route.params.audioParts}
                showsVerticalScrollIndicator={false}
                refreshing={getref}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.faltlistMain}>
                      <View
                        style={{
                          ...styles.InputTextCon,
                          width:
                            getb.toString().indexOf(item.key) > -1
                              ? "68%"
                              : "80%",
                        }}
                      >
                        <Text style={styles.textInputs}>
                          Part {index + 1} # {item.key}{" "}
                        </Text>
                      </View>

                      {getb.toString().indexOf(item.key) > -1 ? (
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                              console.log("Play");
                              console.log(item);
                              console.log(route.params.BookDetails.name);
                              setbookname(route.params.BookDetails.name);
                              setPartName(item.key);
                              playSound(
                                item.key,
                                route.params.BookDetails.name
                              );
                              setPlayModal(true);
                            }}
                            style={styles.playButtonCon}
                          >
                            <Entypo
                              name="controller-play"
                              size={30}
                              color="black"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                              console.log("delete");
                              deleteAudio(item.key);

                              var newVal = getb;
                              function arrayRemove(arr, value) {
                                return arr.filter(function (ele) {
                                  return ele != value;
                                });
                              }
                              var nna = item.key + ".wav";
                              // console.log(newVal);
                              var result = arrayRemove(newVal, nna);
                              //console.log(result);
                              setb(result);
                              setref(true);
                              setTimeout(() => {
                                setref(false);
                              }, 500);
                            }}
                            style={styles.deleteBuCon}
                          >
                            <MaterialIcons
                              name="delete"
                              size={30}
                              color="black"
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setModal(true);
                            getpart(item, route.params.BookDetails);
                          }}
                          style={styles.dowloadButCon}
                        >
                          <Feather name="download" size={28} color="black" />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backGroungImage: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
  secondcontainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    marginTop: 60,
    borderRadius: 40,
    borderBottomEndRadius: 0,
    paddingTop: 20,
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: 20,
    //justifyContent: "space-between",
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
  flatList: {
    alignSelf: "center",
    justifyContent: "space-between",
    width: "85%",
    paddingTop: 5,
    //backgroundColor: "red",
  },
  ScrollViewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    //backgroundColor: "yellow",
    alignSelf: "center",
    //margin: 5,
    width: "90%",
    borderRadius: 5,
    //paddingLeft: 5,
    //paddingRight: 5,
    //height: 130,
    height: 185,
    //backgroundColor: "yellow",
  },
  ScrollViewText: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    color: colors.gray,
    height: 65,
    width: 155,
    marginTop: 2,
    //backgroundColor: "white",
  },
  ScrollView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    //height: 150,
    height: 200,
    //backgroundColor: "red",
    borderRadius: 10,
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
    height: 100,
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  backText: {
    alignSelf: "center",
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    color: colors.gray,
  },
  mainText: {
    fontFamily: "Roboto-Regular",
    fontSize: 20,
    color: colors.gray,
    marginTop: "10%",
  },
  imgDiv: {
    //backgroundColor: "blue",
    height: 180,
    width: 100,
    //margin: 5,
    marginRight: 5,
    marginTop: 2,
    borderRadius: 5,
  },
  imgCon: {
    height: 175,
    width: 100,
    borderRadius: 5,
  },
  InputTextCon: {
    //  backgroundColor: "red",
    justifyContent: "space-between",
    // height: 50,
    width: "80%",
    margin: 10,
    borderRadius: 10,
    padding: 7,
    backgroundColor: "#F1E7FF",
    //  marginLeft: 5,
    flexDirection: "row",
    elevation: 5,
  },
  textInputs: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 12,
    color: colors.blue,
    justifyContent: "center",
  },
  faltlistMain: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    //  backgroundColor: "red",
  },
  playButtonCon: {
    // marginLeft: 5,
    alignSelf: "center",
    backgroundColor: "#F1E7FF",
    borderRadius: 50,
    width: 40,
    height: 40,
    paddingLeft: 3,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBuCon: {
    // marginLeft: 5,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#F1E7FF",
    marginLeft: 5,
    borderRadius: 50,
    width: 40,
    height: 40,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    //padding: 2,
  },
  dowloadButCon: {
    //marginLeft: ,
    alignSelf: "center",
    backgroundColor: "#F1E7FF",
    borderRadius: 50,
    width: 40,
    height: 40,
    elevation: 5,

    justifyContent: "center",
    alignItems: "center",
  },
});
export default audioDetails;
