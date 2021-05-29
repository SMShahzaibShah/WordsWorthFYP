import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  PermissionsAndroid,
  Modal,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../context";
import Tts from "react-native-tts";
import Voice from "@react-native-community/voice";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
const firebaseBooksData = require("firebase");
import * as firebase from "firebase";
import "firebase/firestore";
const soundObject = new Audio.Sound();

const Blind = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [getbook, setbooks] = useState();
  const [getF, setF] = useState({});
  const [pitch, setPitch] = useState("");
  const [getModal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [end, setEnd] = useState("");
  const [started, setStarted] = useState("");
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [disables, setdisable] = useState(true);
  var config = {
    apiKey: "AIzaSyBLwWyP1YuWZrqvpo_zsNJIyEf8Xi_Lpco",
    authDomain: "gyradosvpn.firebaseapp.com",
    databaseURL: "https://gyradosvpn.firebaseio.com",
    projectId: "gyradosvpn",
    storageBucket: "gyradosvpn.appspot.com",
    messagingSenderId: "50961203679",
    appId: "1:50961203679:web:5889613169c3eeb168c46a",
  };
  var sec;
  var temp = [];
  var list = {};
  var partsData;
  var audioUrl;
  var ip = "192.168.0.15";
  const databasesConnect = async () => {
    // try {
    //   sec = await firebaseBooksData.initializeApp(config, "Secondary");
    //   // setSec(secon)
    //   console.log("Sa");
    // } catch (exception) {
    //   //console.log(exception)
    //   sec = await firebaseBooksData.apps[firebaseBooksData.apps.length - 1];
    // }
    var firebaseConfig = {
      apiKey: "AIzaSyBLwWyP1YuWZrqvpo_zsNJIyEf8Xi_Lpco",
      authDomain: "gyradosvpn.firebaseapp.com",
      databaseURL: "https://gyradosvpn.firebaseio.com",
      projectId: "gyradosvpn",
      storageBucket: "gyradosvpn.appspot.com",
      messagingSenderId: "50961203679",
      appId: "1:50961203679:web:5889613169c3eeb168c46a",
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    See("Please Wait");
    await firebase
      .database()
      .ref("Books")
      .once("value", (snapshot) => {
        console.log("as");

        var data = "";
        //var temp = [];
        snapshot.forEach((childSnapshot) => {
          data = childSnapshot.val();
          temp.push(data);
          //console.log(temp);
        });
        //console.log(temp);
        setbooks(temp);
      })
      .then(() => {
        setdisable(false);
        See("Database Connected");
      });
  };
  useEffect(() => {
    databasesConnect();
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    //Invoked when .start() is called without error
    console.log("onSpeechStart: ", e);
    setStarted("√");
  };

  const onSpeechEnd = (e) => {
    //Invoked when SpeechRecognizer stops recognition
    console.log("onSpeechEnd: ", e);
    setEnd("√");
  };

  const onSpeechError = (e) => {
    //Invoked when an error occurs.
    console.log("onSpeechError: ", e);
    See(JSON.stringify(e.error));
    setError(JSON.stringify(e.error));
  };

  var localBooks = [];
  const getBooksFromLocalDevice = async () => {
    localBooks = await FileSystem.readDirectoryAsync(
      "file:///storage/emulated/0/WordsWorthDownload/Blind/"
    );
    console.log(localBooks);
  };

  var bookNumber;

  const onSpeechResults = async (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log("onSpeechResults: ", e);
    //Search Wala
    if (e.value[0].includes("search")) {
      var toBeSearch = e.value[0].split("search");
      See("Searching for" + toBeSearch[1]);
      //See("Searching for");
      filterList(toBeSearch[1]);
    }
    // if open wala select karey book
    else if (getF != undefined && e.value[0].includes("open")) {
      var toBeSearch1 = e.value[0].split("open ");
      console.log(toBeSearch1[1]);
      console.log(list.length);
      console.log(typeof toBeSearch1[1]);
      var num = Number(toBeSearch1[1]);
      if (list.length != undefined) {
        if (isNaN(num)) {
          See("Try again");
        } else {
          bookNumber = num;
          if (num > list.length) {
            See("We Have only Found " + partsData.length + " book for you");
          } else {
            var msg = "Downloading " + num + " number Book";

            See(msg);
            console.log(list[num - 1]);

            // downloadFile(list[num - 1]);
            FetchData(list[num - 1]);
          }
        }
      } else {
        See("No results available please search");
      }
    } else if (e.value[0].includes("play")) {
      var toBe = e.value[0].split("play");
      //   console.log(toBe[1]);
      //  console.log(typeof toBe[1]);
      var num = Number(toBe[1]);
      // console.log(num);
      // console.log(typeof num);
      // console.log(partsData[num - 1]);
      if (partsData != undefined) {
        if (num > partsData.length) {
          See("Book has only " + partsData.length + " parts");
        } else {
          getpart(partsData[num - 1], list[bookNumber - 1], num);
        }
      } else {
        See("No results available please search");
      }

      //console.log(partsData[num - 1]);
    } else if (e.value[0].includes("stop")) {
      if (soundObject._loaded) {
        soundObject.pauseAsync();
      } else {
        See("Nothing to Play. Please search and play");
      }
    } else if (e.value[0].includes("resume")) {
      if (soundObject._loaded) {
        soundObject.playAsync();
      } else {
        See("Nothing to resume. Please search and play");
      }
    }

    setResults(e.value);
  };

  {
    //download audio part File saving them
  }
  const getpart = async (bookName, link, partNum) => {
    let booknamess = link.name.split(" ").join("-");

    var links =
      firebase.auth().currentUser.uid + "/BlindAudioBooks/" + booknamess;

    var chec = await AsyncStorage.getItem(links);
    chec = JSON.parse(chec);
    if (chec[partNum - 1].downloaded == "true") {
      await soundObject.loadAsync({
        uri: chec[partNum - 1].uri,
      });
      /**
   soundObject = await Audio.Sound.createAsync({
      uri:uri
        
        
    });
  */

      await soundObject.playAsync();
    } else {
      // let booknameForFolder = link.name.split(" ").join("-");
      let data = link.file;
      See("please Wait");
      data = data.split("/").join("$");
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
        bookName.end;
      return await fetch(uri)
        .then((response) => response.text())
        .then((responseJson) => {
          console.log(responseJson);
          See("part Converted Successfully Now downloading that part");
          downloadFiles(bookName, responseJson, link, partNum);
        })
        .catch((error) => {
          // console.error(error);
          See(error);
          // setModal(false);
        });
    }
  };
  const downloadFiles = (bookName, send, link, partNum) => {
    //  console.log(bookName + "download");
    console.log("yes");
    //setText(false);
    See("Please Wait ");
    let booknameForFolder = link.name.split(" ").join("-");
    const uri = "http://" + ip + ":8080/files/get/" + send;
    let fileUri = FileSystem.documentDirectory + bookName.key + ".wav";
    FileSystem.downloadAsync(uri, fileUri)
      .then(async ({ uri }) => {
        console.log("Download ho gya");
        saveAudioFile(uri, booknameForFolder);
        console.log("uri is", uri);
        console.log("done");
        let booknamess = link.name.split(" ").join("-");

        var links =
          firebase.auth().currentUser.uid + "/BlindAudioBooks/" + booknamess;

        var chec = await AsyncStorage.getItem(links);
        chec = JSON.parse(chec);
        chec[partNum - 1].downloaded = "true";
        chec[partNum - 1].uri = uri;
        await AsyncStorage.setItem(links, JSON.stringify(chec));

        audioUrl = uri;
        See("Downloading Complete");
        await soundObject.loadAsync({
          uri: uri,
        });
        /**
   soundObject = await Audio.Sound.createAsync({
      uri:uri
        
        
    });
  */

        await soundObject.playAsync();
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
        "WordsWorthDownload" + "/" + bookName
      );
      await MediaLibrary.createAlbumAsync(
        "WordsWorthDownload" + "/" + bookName,
        asset,
        false
      );
    }
  };
  {
    //download audio part File and saving them Close
  }

  const FetchData = async (book) => {
    {
      /**

    await AsyncStorage.setItem(firebase.auth().currentUser+"/BlindAudioBooks", JSON.stringify(book.name)).then(()=>{
      console.log("done")
    })
     */
    }

    let booknames = book.name.split(" ").join("-");
    var link =
      firebase.auth().currentUser.uid + "/BlindAudioBooks/" + booknames;

    const allBooks = await AsyncStorage.getItem(link);
    console.log("allboos" + allBooks);
    if (allBooks != null) {
      console.log("Found in Storage");
      var all = JSON.parse(allBooks);
      console.log("All", all);
      var msg = "This book has " + all.length + " part";
      See(msg);
      partsData = all;
      See("Which part you want to play");
      See("Select one by Just Saying Play and part Number");
    } else {
      See("downloading Book");
      let data = book.file;
      data = data.split("/").join("$");
      let bookname = book.name.split(" ").join("-");
      data = "http://" + ip + ":8080/files/details/" + data + "||" + bookname;
      console.log(data);
      See("Converting book");
      //setModal(true);
      fetch(data)
        .then((res) => res.json())
        .then((jsonData) => {
          //      setModal(false);
          // setParts(jsonData);
          console.log(jsonData);
          partsData = jsonData;
          SaveAudioParts(jsonData, bookname);
          var msg = "This book has " + jsonData.length + " part";
          See(msg);
          See("Which part you want to play");
          See("Select one by Just Saying Play and part Number");
        })
        .catch((error) => {
          See(error);
        });
    }
  };
  const SaveAudioParts = async (item, bookName) => {
    for (var i = 0; i < item.length; i++) {
      item[i].downloaded = "false";
    }
    var link = firebase.auth().currentUser.uid + "/BlindAudioBooks/" + bookName;
    await AsyncStorage.setItem(link, JSON.stringify(item));
  };

  const [status, setStatus] = useState(true);
  const check = async (bookName) => {
    await AsyncStorage.getItem("BooksInfoBlind").then((favs) => {
      favs = favs == null ? [] : JSON.parse(favs);
      var i = 0;
      while (i < favs.length) {
        //console.log(favs[i].name);
        if (favs[i].name == bookName.name) {
          setStatus(false);
        }
        i = i + 1;
      }
    });
  };
  const SaveData = async (item) => {
    var user = firebase.auth().currentUser;
    //console.log(user);
    AsyncStorage.getItem(user.uid + "/BooksInfoBlind").then((favs) => {
      favs = favs == null ? [] : JSON.parse(favs);

      favs.push(item);
      return AsyncStorage.setItem(
        user.uid + "/BooksInfo",
        JSON.stringify(favs)
      );
    });
  };

  const downloadFile = (bookName) => {
    console.log("yes");
    //  console.log(bookName);
    const uri = bookName.file;
    var exten = uri.split("/").pop();
    //console.log("exten", exten);
    var exten1;
    if (exten.includes(".pdf") == false) {
      exten1 = exten.split(".");
    }

    //console.log(bookName.file);
    //  let fileUri = FileSystem.documentDirectory + bookName.name + ".pdf";
    let fileUri;
    if (exten.includes(".pdf")) {
      fileUri = FileSystem.documentDirectory + bookName.name + ".pdf";
    } else {
      fileUri = FileSystem.documentDirectory + bookName.name + "." + exten1[1];
    }

    check(bookName);
    console.log(status);
    if (status == true) {
      See("Downloading is started Please Wait");
      FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
          See("Book Download Successfully");
          saveFile(uri);
          console.log(uri);
          console.log("done");
          SaveData(bookName);
          setModal(false);
          //outputData();
        })
        .catch((error) => {
          See(error);
          console.error(error);
        });
    } else {
      setModal(false);

      See("book is already in Your Library. Do you want me to open it?");
    }
  };
  const saveFile = async (fileUri) => {
    if (Platform.OS === "android") {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permissions for write access",
          message: "Give permission to your storage to write a file",
          buttonPositive: "ok",
        }
      );
      console.log(status);
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync(
          "WordsWorthDownload/Blind"
        );
        await MediaLibrary.createAlbumAsync(
          "WordsWorthDownload/Blind",
          asset,
          false
        );
      }
    }
  };

  const filterList = (res) => {
    // AsyncStorage.clear();
    //console.log(text);
    list = temp.filter((item) => item.name.toLowerCase().includes(res));
    console.log(list);
    //setF(list);
    if (list.length < 1) {
      See("No Such Book Found!");
    } else {
      var message = "We found " + list.length + " book";
      See(message);
      if (list.length > 5) {
        See("I am reading first Five for you");
        for (var i = 0; i < 5; i++) {
          var j = i + 1;
          var message = j + list[i].name;
          See(message);
        }
      } else {
        for (var i = 0; i < list.length; i++) {
          var j = i + 1;
          var message = j + list[i].name;
          See(message);
        }
      }

      See("Select one by Just Saying Open and Book Number");
    }
  };

  const onSpeechPartialResults = (e) => {
    //Invoked when any results are computed
    console.log("onSpeechPartialResults: ", e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    //Invoked when pitch that is recognized changed
    console.log("onSpeechVolumeChanged: ", e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start("en-US");
      setPitch("");
      setError("");
      setStarted("");
      setResults([]);
      setPartialResults([]);
      setEnd("");
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch("");
      setError("");
      setStarted("");
      setResults([]);
      setPartialResults([]);
      setEnd("");
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const { SignInco } = React.useContext(AuthContext);
  const toggleSwitch = (previousState) => {
    setIsEnabled((previousState) => !previousState);
    if (previousState == false) {
      SignInco();
    }
  };
  const See = (words) => {
    Tts.speak(words, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: "STREAM_MUSIC",
      },
    });
  };
  return (
    <View style={styles.container}>
      <Modal animationType="none" transparent={true} visible={getModal}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Text
              style={{
                fontFamily: "OpenSans-SemiBold",
                fontSize: 14,
                color: colors.blue,
              }}
            >
              Please Wait Book is Downloading
            </Text>

            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        </View>
      </Modal>
      <View style={styles.SwitchCon}>
        <Text style={{ alignSelf: "center", color: "gray" }}>
          Enhanced Mode {isEnabled == true ? "on" : "off"}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {/**
      <Text style={styles.textStyle}>Press mike to start Recognition</Text>
      <View style={styles.headerContainer}>
        <Text style={styles.textWithSpaceStyle}>{`Started: ${started}`}</Text>
        <Text style={styles.textWithSpaceStyle}>{`End: ${end}`}</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.textWithSpaceStyle}>{`Pitch: \n ${pitch}`}</Text>
        <Text style={styles.textWithSpaceStyle}>{`Error: \n ${error}`}</Text>
      </View>
       */}
      <TouchableOpacity
        style={styles.MicButton}
        onPress={() => startRecognizing()}
        disabled={disables}
      >
        <Entypo name="mic" size={150} color="#653CA0" />
      </TouchableOpacity>
      {/**
      <Text style={styles.textStyle}>Partial Results</Text>
       
      <ScrollView>
        {partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={styles.textStyle}>
              {result}
            </Text>
          );
        })}
      </ScrollView>
      <Text style={styles.textStyle}>Results</Text>
      <ScrollView style={{ marginBottom: 42 }}>
        {results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.textStyle}>
              {result}
            </Text>
          );
        })}
      </ScrollView>
      <View style={styles.horizontalView}>
        <TouchableHighlight
          onPress={stopRecognizing}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>Stop</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={cancelRecognizing}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={destroyRecognizer}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>Destroy</Text>
        </TouchableHighlight>
      </View>
      */}
    </View>
  );
};
export default Blind;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  SwitchCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    position: "absolute",
    top: 5,
    //marginLeft: 10,
  },
  MicButton: {
    //  top: Dimensions.get("screen").height / 5,
    height: "40%",
    width: "85%",
    borderRadius: 350,
    backgroundColor: "#F1E7FF",
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    marginTop: 15,
    padding: 10,
    backgroundColor: "#8ad24e",
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
  },
  horizontalView: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  textStyle: {
    textAlign: "center",
    padding: 12,
    marginTop: 20,
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  textWithSpaceStyle: {
    flex: 1,
    textAlign: "center",
    color: "#B0171F",
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
    height: "20%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
