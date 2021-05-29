import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
const firebaseBooksData = require("firebase");

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Octicons } from "@expo/vector-icons";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
import { MaterialIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";
import * as MediaLibrary from "expo-media-library";
import colors from "../assets/colors/colors";
const audiobrary = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [getF, setF] = useState([]);
  const [getText, setText] = useState(false);
  //const [book, setbook] = useState();
  const [parts, setParts] = useState();
  const [getmodal, setModal] = useState(false);
  const [showDelete, setshowDelete] = useState(false);

  const Arrays = [{ key: "0", data: "Search A Book", backColor: "red" }];
  var config = {
    apiKey: "AIzaSyC_zg-7N_LpvkhLAymvksM7Y9lrcA0AkjY",
    authDomain: "dogtag-e36b1.firebaseapp.com",
    databaseURL: "https://dogtag-e36b1.firebaseio.com/",
  };
  var sec;

  const outputData = async () => {
    var user = firebase.auth().currentUser;
    var allBooks;
    // console.log("here");
    // if (user == null) {
    //    var userId = await AsyncStorage.getItem("userId");
    //    allBooks = await AsyncStorage.getItem(userId + "/AudioBooks");
    // } else {
    allBooks = await AsyncStorage.getItem(user.uid + "/AudioBooks");
    // }
    //console.log("sad");
    allBooks = JSON.parse(allBooks);
    // console.log(allBooks);
    if (allBooks != null) {
      setF(allBooks);
    }
    //console.log(JSON.parse(allBooks));
  };
  const getUrl = (img) => {
    //console.log(img.split("url:")[1]);
    return img.split("url:")[1];
  };

  useEffect(() => {
    outputData();
  }, [getF]);

  useEffect(() => {
    //   console.log("here1");
    outputData();
  }, []);
  const Loading = (
    <View style={{ flex: 1, padding: 20 }}>
      <ActivityIndicator size="large" />
      <Text>Loading Books From database...</Text>
    </View>
  );

  const SaveData = async (item) => {
    AsyncStorage.getItem("AudioBooks").then((favs) => {
      favs = favs == null ? [] : JSON.parse(favs);

      favs.push(item);
      return AsyncStorage.setItem("AudioBooks", JSON.stringify(favs));
    });
  };

  const SavesData = async (bookName, item) => {
    AsyncStorage.getItem(bookName).then((favs) => {
      favs = favs == null ? [] : JSON.parse(favs);

      favs.push(item);
      return AsyncStorage.setItem(bookName, JSON.stringify(favs));
    });
  };
  const DeleteData = async (item) => {
    var user = firebase.auth().currentUser;
    await AsyncStorage.getItem(user.uid + "/AudioBooks").then((favs) => {
      favs = favs == null ? [] : JSON.parse(favs);
      console.log(favs.length);
      favs = favs.filter((book) => book.name != item.name);
      console.log("after");
      console.log(favs.length);
      setF(favs);
      return AsyncStorage.setItem(
        user.uid + "/AudioBooks",
        JSON.stringify(favs)
      );
    });
  };
  const FetchData = (book) => {
    try {
      let data = book.file;
      data = data.split("/").join("$");
      let bookname = book.name.split(" ").join("-");
      data =
        "http://192.168.100.106:8080/files/details/" + data + "||" + bookname;
      // console.log(data);
      setModal(true);
      AsyncStorage.getItem(bookname).then((favs) => {
        //console.log(bookname);
        if (favs == null) {
          fetch(data)
            .then((res) => res.json())
            .then((jsonData) => {
              setModal(false);
              setParts(jsonData);
              console.log(jsonData);
              SavesData(bookname, jsonData);
              navigation.navigate("audioDetails", {
                BookDetails: book,
                audioParts: jsonData,
              });
            })
            .catch((err) => {
              setModal(false);
              alert(err);
            });
        } else {
          setModal(false);
          navigation.navigate("audioDetails", {
            BookDetails: book,
            audioParts: JSON.parse(favs)[0],
          });
        }
      });
    } catch (err) {
      setModal(false);
      alert(err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {
        //FIrst Two Images
      }
      <Image
        source={require("../assets/forSearch.png")}
        style={{
          width: "100%",
          position: "absolute",
        }}
      />
      <Image
        source={require("../assets/dashboardBackground.png")}
        style={{
          position: "absolute",
          marginTop: 80,
        }}
      />
      {
        //Last Image
      }
      {
        //Navigation Menu
      }
      <View style={styles.menuandEditDiv}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.openDrawer()}
          style={styles.menuDiv}
        >
          <Ionicons name="ios-menu" size={35} color={colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("audioSettings")}
          style={styles.profileDiv}
        >
          <Octicons name="gear" size={30} color={colors.gray} />
        </TouchableOpacity>
      </View>
      {
        //Text
      }

      <View style={{ width: "100%", marginLeft: "10%" }}>
        <Text style={styles.mainText}>AUDIO LIBRARY</Text>
      </View>
      {
        //2nd Conatiner
      }
      <Modal
        transparent={true}
        animationType={"none"}
        visible={getmodal}
        onDismiss={() => console.log("close modal")}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Text
              style={{
                fontFamily: "Roboto-Bold",
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
      <View style={styles.secondcontainer}>
        {
          //flatlist
        }
        {getF.length == 0 ? (
          <>
            <Text
              style={{
                fontFamily: "Roboto-Regular",
                fontSize: 20,
                color: colors.gray,
              }}
            >
              AudioLibrary is Empty
            </Text>
          </>
        ) : (
          <FlatList
            data={getF}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            style={{
              //alignItems: "center",
              width: "80%",
              //justifyContent: "center",
              //backgroundColor: "red",
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    FetchData(item);
                  }}
                  onLongPress={() => setshowDelete(!showDelete)}
                >
                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        width: 170,
                      }}
                    >
                      {showDelete == false ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={styles.deleteButtonCon}
                          onPress={async () => {
                            await DeleteData(item);
                            setshowDelete(false);
                          }}
                        >
                          <MaterialIcons
                            name="delete"
                            size={25}
                            color="#653CA0"
                            style={{
                              alignSelf: "center",
                            }}
                          />
                        </TouchableOpacity>
                      )}
                      <View
                        style={
                          {
                            //height: 200,
                            //width: 125,
                            //borderRadius: 10,
                            //backgroundColor: "red",
                          }
                        }
                      >
                        {"image" in item ? (
                          <Image
                            source={{
                              // uri: getUrl(item.image),
                              uri: item.image,
                            }}
                            style={styles.imageConas}
                          />
                        ) : (
                          <Image
                            source={{
                              // uri: getUrl(item.image),
                              uri: item.img,
                            }}
                            style={styles.imageConas}
                          />
                        )}
                      </View>
                      {
                        //Text
                      }
                      {
                        //Book Name
                      }
                      <View style={styles.naamCon}>
                        <Text style={styles.nameText}>{item.name}</Text>
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
        )}
        {
          //flatlistEnd
        }
      </View>
      {
        //second conatiner end
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  textInput: {
    paddingTop: 10,
    color: "black",
    borderColor: "red",
    //borderWidth: 2,
    borderBottomWidth: 2,
    width: "80%",
    fontSize: 24,
    //borderRadius: 40,
    fontSize: 16,
    padding: 10,
  },
  flatList: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "space-between",
    width: "90%",
    paddingTop: 5,
    marginTop: "16%",
    backgroundColor: "red",
  },
  ScrollViewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "yellow",
    alignSelf: "center",
    //margin: 5,
    width: "80%",
    borderRadius: 5,
    //paddingLeft: 5,
    //paddingRight: 5,
    //height: 130,
    height: 180,
  },
  ScrollViewText: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    color: colors.gray,
    height: 60,
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
    //backgroundColor: "yellow",
    borderRadius: 10,
  },
  secondcontainer: {
    //  backgroundColor: "white",
    flex: 1,
    marginTop: 30,
    paddingTop: 30,
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
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
  menuandEditDiv: {
    flexDirection: "row",
    marginTop: 35,
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  menuDiv: {
    height: 45,
    width: 45,
    borderRadius: 50,
    elevation: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  profileDiv: {
    height: 45,
    width: 45,
    borderRadius: 50,
    elevation: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontFamily: "Roboto-Regular",
    fontSize: 20,
    color: colors.gray,
    marginTop: 20,
  },
  deleteButtonCon: {
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderRadius: 50,
    elevation: 5,
    justifyContent: "center",
    alignContent: "center",
  },
  imageConas: {
    height: 210,
    width: 130,
    borderRadius: 10,
  },
  naamCon: {
    marginTop: 5,
    width: 120,
    height: 70,
    //   backgroundColor: "red",
  },
  nameText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 12,
    color: colors.gray,
    justifyContent: "center",
  },
});

export default audiobrary;
