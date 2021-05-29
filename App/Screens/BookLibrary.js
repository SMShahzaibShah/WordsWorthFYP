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
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import colors from "../assets/colors/colors";
var RNFS = require("react-native-fs");
const BookLibrary = ({ navigation, route }) => {
  const [getF, setF] = useState([]);
  const [getModal, setModal] = useState(false);
  const [getModal2, setModal2] = useState(false);
  const [getModal1, setModal1] = useState(false);
  const [showDelete, setshowDelete] = useState(false);
  const [book, setbook] = useState();

  const [getUsersInfo, setUsersInfo] = useState([]);
  const Arrays = [{ key: "0", data: "Search A Book", backColor: "red" }];

  const outputData = async () => {
    var user = firebase.auth().currentUser;
    var allBooks;
    // if (user == null) {
    //   var userId = await AsyncStorage.getItem("userId");
    //   allBooks = await AsyncStorage.getItem(userId + "/BooksInfo");
    // } else {
    allBooks = await AsyncStorage.getItem(user.uid + "/BooksInfo");
    //}
    // console.log(allBooks);
    allBooks = JSON.parse(allBooks);
    var Books = await FileSystem.readDirectoryAsync(
      "file:///storage/emulated/0/WordsWorthDownload/"
    );
    var tobe = [];
    for (var i = 0; i < allBooks.length; i++) {
      for (var j = 0; j < Books.length; j++) {
        var bookNames = Books[j];
        if (bookNames.includes(".pdf")) {
          bookNames = bookNames.split(".pdf");
        } else if (bookNames.includes(".txt")) {
          bookNames = bookNames.split(".txt");
        }
        if (bookNames[0] == allBooks[i].name) {
          tobe.push(allBooks[i]);
        }
      }
    }
    //console.log(Books);
    setF(tobe);
  };
  const getUrl = (img) => {
    //console.log(img.split("url:")[1]);
    return img.split("url:")[1];
  };

  useEffect(() => {
    outputData();
    //getUsers();
    //  getUsers();
  }, [getF]);

  useEffect(() => {
    //  setModal2(true);
    outputData();
    // getUsers();
  }, []);
  const Loading = (
    <View style={{ flex: 1, padding: 20 }}>
      <ActivityIndicator size="large" />
      <Text>Loading Books From database...</Text>
    </View>
  );
  //const [status, setStatus] = useState(true);
  var status = true;
  const check = async (bookName) => {
    //setStatus(true);
    status = true;
    console.log("Book is", bookName);
    await AsyncStorage.getItem(
      firebase.auth().currentUser.uid + "/AudioBooks"
    ).then((favs) => {
      favs = favs == null ? [] : JSON.parse(favs);
      var i = 0;
      console.log("fav is" + favs);
      while (i < favs.length) {
        //console.log(favs[i].name);
        if (favs[i].name == bookName.name) {
          status = false;
          console.log("exits");
        }
        i = i + 1;
      }
    });
  };

  const getUsers = async () => {
    console.log(firebase.auth().currentUser.uid);
    await firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .get()
      .then(async (Snapshot) => {
        let following = Snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        await fetchUsersInfo(following);
      })
      .catch((errors) => {
        setModal2(false);
        alert(errors);
      });
  };
  const fetchUsersInfo = async (following) => {
    // console.log(following);
    for (var i = 0; i < following.length; i++) {
      await firebase
        .firestore()
        .collection("users")
        .doc(following[i])
        .get()
        .then((snapshot) => {
          const usedata = snapshot.data();
          const id = snapshot.id;
          const uData = {
            info: usedata,
            id: id,
          };

          var usersData = getUsersInfo;
          //  console.log(usersData);
          usersData.push(uData);
          var tobePush = [];
          for (var i = 0; i < usersData.length; i++) {
            var j = 0;
            var toadd = true;
            for (var j = 0; j < tobePush.length; j++) {
              if (tobePush[j].id == usersData[i].id) {
                toadd = false;
                break;
              }
            }
            if (toadd == true) {
              tobePush.push(usersData[i]);
            }
          }

          setUsersInfo(tobePush);
        })
        .catch((errors) => {
          setModal2(false);
          alert(errors);
        });
    }
    setModal2(false);
    setModal1(true);
  };
  const SaveData = async (item) => {
    var user = firebase.auth().currentUser;
    await AsyncStorage.getItem(user.uid + "/AudioBooks").then((favs) => {
      favs = favs == null ? [] : JSON.parse(favs);

      favs.push(item);
      return AsyncStorage.setItem(
        user.uid + "/AudioBooks",
        JSON.stringify(favs)
      );
    });
  };

  const DeleteData = async (item) => {
    var naamOfFoldere = item.name;
    var ext = item.file;
    var exten;
    if (ext.includes(".pdf")) {
      exten = ".pdf";
    } else {
      exten = ".txt";
    }
    let fileUri =
      "file:///storage/emulated/0/WordsWorthDownload/" + naamOfFoldere + exten;
    //console.log(fileUri);
    var path = RNFS.DocumentDirectoryPath + naamOfFoldere + exten;
    //console.log(path);
    return (
      RNFS.unlink(fileUri)
        .then(async () => {
          console.log("FILE DELETED");
          var user = firebase.auth().currentUser;
          await AsyncStorage.getItem(user.uid + "/BooksInfo").then((favs) => {
            favs = favs == null ? [] : JSON.parse(favs);
            console.log(favs.length);
            favs = favs.filter((book) => book.name != item.name);
            console.log("after");
            console.log(favs.length);
            setF(favs);
            return AsyncStorage.setItem(
              user.uid + "/BooksInfo",
              JSON.stringify(favs)
            );
          });
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch((err) => {
          console.log(err.message);
        })
    );
  };

  const sendMessage = async (item, id, naam) => {
    await firebase
      .firestore()
      .collection("Messages")
      .doc(id)
      .collection("allMsg")
      .add({
        info: item,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        SenderName: naam,
        SenderID: firebase.auth().currentUser.uid,
      })
      .then(() => {
        setModal1(false);
        alert("Recommendation Send to " + naam);
      })
      .catch((err) => {
        setModal1(false);
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="none" transparent={true} visible={getModal2}>
        <View style={styles.modalBackground2}>
          <View style={styles.activityIndicatorWrapper2}>
            <Text>Please Wait...</Text>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        </View>
      </Modal>
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
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.profileDiv}
        >
          <FontAwesome5
            name="user-edit"
            size={22}
            color={colors.gray}
            style={{
              marginLeft: 5,
            }}
          />
        </TouchableOpacity>
      </View>
      {
        //Text
      }

      <View style={{ width: "100%", marginLeft: "10%" }}>
        <Text style={styles.mainText}>BOOK LIBRARY</Text>
      </View>
      {
        //Modal
      }
      <Modal animationType="none" transparent={true} visible={getModal}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            {
              //Cross Button
            }
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={styles.crossButton}
            >
              <Entypo name="cross" size={30} color="#FF5B62" />
            </TouchableOpacity>
            {
              //Cross Button close
            }
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setModal(false);
                console.log(book);
                var ext = book.file;
                var exten = ext.split("/").pop();
                console.log(exten);
                if (exten.includes("txt")) {
                  navigation.navigate("TextReader", {
                    BookDetails: book,
                    ext: ".txt",
                  });
                } else {
                  navigation.navigate("reader", {
                    BookDetails: book,
                    ext: ".pdf",
                  });
                }
              }}
              style={{ ...styles.InputTextCon, marginTop: 55 }}
            >
              <View style={styles.modelInternal}>
                <Text style={styles.modalText}>Preview</Text>
                <FontAwesome5
                  name="book-reader"
                  size={20}
                  color="#653CA0"
                  style={{ alignSelf: "center" }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={async () => {
                await check(book);
                console.log(status);
                if (status == true) {
                  SaveData(book);
                } else {
                  alert("Book Already Exits In Audio Library");
                }

                setModal(false);
              }}
              style={{ ...styles.InputTextCon, marginTop: 20 }}
            >
              <View style={styles.modelInternal}>
                <Text style={styles.modalText}>Add to Audio Library</Text>
                <AntDesign
                  name="addfile"
                  size={20}
                  color="#653CA0"
                  style={{
                    //marginLeft: 5,
                    width: "10%",
                    alignSelf: "center",
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setModal(false);
                setModal2(true);
                getUsers();
              }}
              style={{ ...styles.InputTextCon, marginTop: 20 }}
            >
              <View style={styles.modelInternal}>
                <Text style={styles.modalText}>Recommend to Friend</Text>
                <FontAwesome
                  name="send"
                  size={20}
                  color="#653CA0"
                  style={{
                    //marginLeft: 5,
                    width: "10%",
                    alignSelf: "center",
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {
        //MOdal Close
      }
      {
        //Modal
      }
      <Modal
        animationType="none"
        transparent={true}
        visible={getModal1}
        onRequestClose={() => setModal1(false)}
      >
        <View style={styles.modalBackground1}>
          <View style={styles.activityIndicatorWrapper1}>
            {
              //Cross Button
            }
            <TouchableOpacity
              onPress={() => setModal1(false)}
              style={styles.crossButton}
            >
              <Entypo name="cross" size={30} color="#FF5B62" />
            </TouchableOpacity>
            {
              //Cross Button close
            }
            {
              //FlatList
            }
            <View style={styles.seconModal}>
              <Text style={styles.modalText}> List of Fiends</Text>
              <FlatList
                data={getUsersInfo}
                style={styles.seconModalFlatlist}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.seconModalFlatlist1}>
                      {getUsersInfo.length < 1 ? (
                        <>
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text>Your Follow List is Empty</Text>
                          </View>
                        </>
                      ) : (
                        <>
                          {
                            //FlatList conatiner for each Item
                          }
                          <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                              ...styles.InputTextCon,
                              backgroundColor: "#e9e5df",
                              width: "95%",
                              height: 50,
                            }}
                          >
                            <View style={{ flexDirection: "row" }}>
                              {
                                //Picture
                              }
                              <View style={styles.secondModalpicCon}>
                                <EvilIcons
                                  name="user"
                                  size={50}
                                  color="black"
                                  style={{
                                    margin: -15,
                                  }}
                                />
                              </View>
                              {
                                //Picture Close
                              }
                              {
                                //Name Conatiner
                              }
                              <View style={styles.nameandsendCon}>
                                {
                                  //Name
                                }
                                <Text style={styles.naamText}>
                                  {item.info.name}
                                </Text>
                                {
                                  //Name close
                                }
                                <TouchableOpacity
                                  style={styles.sendButtonCOn}
                                  activeOpacity={0.7}
                                  onPress={() => {
                                    console.log(item.info.name);
                                    sendMessage(book, item.id, item.info.name);
                                  }}
                                >
                                  <FontAwesome
                                    name="send"
                                    size={25}
                                    color="#653CA0"
                                  />
                                </TouchableOpacity>
                              </View>
                              {
                                //Name Conatiner close
                              }
                            </View>
                          </TouchableOpacity>
                          {
                            //FlatList conatiner for each Item close
                          }
                        </>
                      )}
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            {
              //FlatList Close
            }
          </View>
        </View>
      </Modal>
      {
        //MOdal Close
      }
      {
        //2nd Conatiner
      }
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
              Book Library is Empty
            </Text>
          </>
        ) : (
          <FlatList
            data={getF}
            keyExtractor={(item) => Math.random().toString(36).substring(7)}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            style={{
              //alignItems: "center",
              width: "80%",
              // alignSelf: "center",
              //justifyContent: "center",
              // backgroundColor: "red",
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    setbook(item);
                    setModal(true);
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
                        width: 185,
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
                      <View>
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
    //backgroundColor: "white",
    flex: 1,
    marginTop: 30,
    paddingTop: 30,
    alignItems: "center",
    marginBottom: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
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
    height: "33%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    display: "flex",
    alignItems: "center",

    //  justifyContent: "space-around",
  },
  modalBackground1: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000080",
  },
  activityIndicatorWrapper1: {
    backgroundColor: "white",
    height: "35%",
    width: "85%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    display: "flex",
    alignItems: "center",

    //  justifyContent: "space-around",
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
  modalBackground2: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000080",
  },
  activityIndicatorWrapper2: {
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
  mainText: {
    fontFamily: "Roboto-Regular",
    fontSize: 20,
    color: colors.gray,
    marginTop: 20,
  },
  crossButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 10,
    elevation: 5,
  },
  InputTextCon: {
    flexDirection: "row",
    width: "80%",
    height: 45,
    backgroundColor: "#F1E7FF",
    borderRadius: 10,
    paddingHorizontal: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputs: {
    width: "95%",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 5,
    fontFamily: "OpenSans-Regular",
  },
  modelInternal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
    color: colors.blue,
    alignSelf: "center",
    width: "90%",
  },
  seconModal: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  seconModalFlatlist: {
    margin: 10,
    width: "95%",
    height: "25%",
    alignSelf: "center",
  },
  seconModalFlatlist1: {
    //   backgroundColor: "red",
    width: "100%",
    //  padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  secondModalpicCon: {
    //backgroundColor: "cyan",
    height: 30,
    width: 30,
    borderRadius: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  nameandsendCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
  },
  naamText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    color: colors.blue,
    // marginTop: 15,
    marginLeft: 5,
  },
  sendButtonCOn: {
    height: 40,
    width: 40,
    backgroundColor: "#F1E7FF",
    borderRadius: 50,
    //  alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
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

export default BookLibrary;
