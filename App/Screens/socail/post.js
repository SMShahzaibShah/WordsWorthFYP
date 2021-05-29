import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
require("firebase/firestore");
require("firebase/firebase-storage");
import colors from "../../assets/colors/colors";
import { Picker } from "@react-native-community/picker";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
export default function post() {
  const [getcaption, setcaption] = useState("");
  const [getF, setF] = useState([]);
  const [getquestion, setquestion] = useState({
    quest: "Reading",
  });
  const [book, setbook] = useState({
    author: "",
    book: "",
    categories: "",
    description: "",
    file: "",
    image: "",
    name: "",
  });
  const [getModal, setModal] = useState(false);

  const getUrl = (img) => {
    //console.log(img.split("url:")[1]);
    return img.split("url:")[1];
  };

  const outputData = async () => {
    var user = firebase.auth().currentUser;
    var allBooks = await AsyncStorage.getItem(user.uid + "/BooksInfo");
    if (allBooks != null) {
      allBooks = JSON.parse(allBooks);
      setF(allBooks);
    }
  };

  useEffect(() => {
    outputData();
  }, []);

  const UploadImage = async () => {
    //const uri = getUrl(book.image);
    try {
      const uri = book.image;
      const childPath = `post/${
        firebase.auth().currentUser.uid
      }/${Math.random().toString(36)}`;
      const response = await fetch(uri);
      const blob = await response.blob();
      const task = firebase.storage().ref().child(childPath).put(blob);

      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };
      const TaskCompleted = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot) => {
          savePostData(snapshot);
          console.log(snapshot);
        });
      };
      const taskError = (snapshot) => {
        setModal(false);
        console.log(snapshot);
      };
      task.on("state_changed", taskProgress, taskError, TaskCompleted);
    } catch (err) {
      setModal(false);
      alert(err);
    }
  };

  const savePostData = async (downloadURL) => {
    console.log("here sss");
    await firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        getcaption,
        getquestion,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        alert("Post Added");
        setcaption("");
        setbook({
          author: "",
          book: "",
          categories: "",
          description: "",
          file: "",
          image: "",
          name: "",
        });
        setModal(false);
      })
      .catch((err) => {
        setModal(false);
        alert(err);
      });
  };
  return (
    <View style={styles.container}>
      <Modal animationType="none" transparent={true} visible={getModal}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Text>Please Wait...</Text>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        </View>
      </Modal>
      {
        //List Of books
      }
      <View style={styles.bookCon}>
        <Text style={styles.bookText}> Select A Book </Text>
        {getF.length > 0 ? (
          <FlatList
            data={getF}
            keyExtractor={(item) => Math.random().toString(36).substring(7)}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            style={{
              height: 300,
              width: "100%",
              // backgroundColor: "red",
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    //if (book == undefined) {
                    setbook(item);
                    //  console.log(item);
                    //} else {
                    // alert(
                    //  "You Can only Select one Book which is selected Already"
                    //  );
                    //}
                    //  console.log(book);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        //backgroundColor: "cyan",
                        width: 180,
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        {"image" in item ? (
                          <Image
                            source={{
                              // uri: getUrl(item.image),
                              uri: item.image,
                            }}
                            style={styles.imsgCon}
                          />
                        ) : (
                          <Image
                            source={{
                              // uri: getUrl(item.image),
                              uri: item.img,
                            }}
                            style={styles.imsgCon}
                          />
                        )}
                        {book.name == item.name ? (
                          <AntDesign
                            name="checkcircle"
                            size={24}
                            color="green"
                            style={{ marginLeft: 2 }}
                          />
                        ) : (
                          <></>
                        )}
                      </View>
                      {
                        //Text
                      }
                      {
                        //Book Name
                      }
                      <View style={{ marginTop: 5, width: 130, height: 80 }}>
                        <Text style={styles.naaamText}>{item.name}</Text>
                      </View>

                      {
                        //Book Name Close
                      }
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text
            style={{
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Roboto-Regular",
              fontSize: 14,
              color: "red",
            }}
          >
            Please Download Some Books First
          </Text>
        )}
      </View>
      {
        //List of Books Close
      }
      {
        //TExtInput Container
      }
      <View style={styles.captionCon}>
        <Text style={styles.cptionText}> Caption </Text>
        <TextInput
          placeholder="Type Here..."
          disableFullscreenUI={true}
          multiline={true}
          numberOfLines={2}
          onChangeText={(text) => {
            setcaption(text);
          }}
          value={getcaption}
          style={styles.textinpputField}
        ></TextInput>
      </View>
      {
        //TExtInput Container close
      }
      {
        //Picker
      }
      <View style={styles.pickCon}>
        <Text style={styles.cptionText}> Book Status ? </Text>
        <Picker
          selectedValue={getquestion}
          style={{
            height: 50,
            width: 270,
            elevation: 5,
          }}
          onValueChange={(itemValue, itemIndex) =>
            setquestion({ quest: itemValue })
          }
          mode="dropdown"
        >
          <Picker.Item label="Reading" value="Reading" />
          <Picker.Item label="Compeletd Reading" value="Finish" />
        </Picker>
        {
          //Button
        }
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonCon}
          onPress={() => {
            if (book.name == "") {
              alert("Please Select A book");
            } else if (getcaption == "") {
              alert("Please Inset A Caption");
            } else {
              setModal(true);

              UploadImage();
            }
          }}
        >
          <LinearGradient
            colors={["#6E3AA7", "#23286B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.doneButtonWrapper}
          >
            <Text style={styles.doneButtonText}>Post</Text>
          </LinearGradient>
        </TouchableOpacity>
        {
          //Button close
        }
      </View>
      {
        //picker Close
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //   alignItems: "center",
    backgroundColor: "#faf8f5",
  },
  textinpputField: {
    width: "100%",
    borderRadius: 15,
    padding: 10,
    fontFamily: "OpenSans-Regular",
    backgroundColor: "#F1E7FF",
    elevation: 5,
  },
  buttonCon: {
    width: "20%",
    margin: 10,
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
  bookCon: {
    width: "90%",
    //alignContent: "center",
    alignSelf: "center",
    //  backgroundColor: "red",
    height: "53%",
  },
  bookText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 17,
    color: colors.blue,
    marginBottom: 10,
    marginTop: 10,
  },
  imsgCon: {
    height: 210,
    width: 130,
    borderRadius: 10,
  },
  naaamText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 12,
    color: colors.gray,
    justifyContent: "center",
    textAlign: "justify",
  },
  captionCon: {
    width: "90%",
    //alignContent: "center",
    alignSelf: "center",
    margin: 5,
    //backgroundColor: "red",
  },
  cptionText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 17,
    color: colors.blue,
    marginBottom: 5,
    //    marginTop: 10,
  },
  pickCon: {
    width: "90%",
    //alignContent: "center",
    alignSelf: "center",
    //backgroundColor: "red",
    margin: 5,
  },
});
