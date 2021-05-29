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
  PermissionsAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";
import "firebase/firestore";
const getUrl = (img) => {
  //console.log(img.split("url:")[1]);
  return img.split("url:")[1];
};
var RNFS = require("react-native-fs");

const bookDetails = ({ navigation, route }) => {
  const [getModal, setModal] = useState(false);
  const [getText, setText] = useState(false);

  const Arrays = [{ key: "0", data: "Search A Book", backColor: "red" }];

  const SaveData = async (item) => {
    var user = firebase.auth().currentUser;
    //console.log(user);
    AsyncStorage.getItem(user.uid + "/BooksInfo").then((favs) => {
      favs = favs == null ? [] : JSON.parse(favs);

      favs.push(item);
      return AsyncStorage.setItem(
        user.uid + "/BooksInfo",
        JSON.stringify(favs)
      );
    });
  };

  const outputData = async () => {
    const allBooks = await AsyncStorage.getItem("BooksInfo");
    // console.log("sad");
    //console.log(JSON.parse(allBooks));
  };

  const [status, setStatus] = useState(true);

  const check = async (bookName) => {
    await AsyncStorage.getItem("BooksInfo").then((favs) => {
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

  const downloadFile = (bookName) => {
    console.log("yes");
    setText(false);
    //  console.log(bookName);
    const uri = bookName.file;
    var exten = uri.split("/").pop();
    console.log("exten", exten);
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
      FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
          console.log("Download ho gya");
          saveFile(uri);
          console.log(uri);
          console.log("done");
          setText(true);
          SaveData(bookName);
          setModal(false);
          outputData();
          displayButton();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setModal(false);

      alert("book already there");
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
        const album = await MediaLibrary.getAlbumAsync("WordsWorthDownload");
        await MediaLibrary.createAlbumAsync("WordsWorthDownload", asset, false);
      }
    }
  };
  const [getb, setb] = useState([]);
  const displayButton = async () => {
    try {
      const data = await FileSystem.readDirectoryAsync(
        "file:///storage/emulated/0/WordsWorthDownload/"
      );

      var arr = [];
      for (var i = 0; i < data.length; i++) {
        arr.push(data[i]);
      }
      // console.log(arr);
      setb(arr);
      //setb(data);
      //console.log(arr);
    } catch {
      console.log("here");
    }
  };
  useEffect(() => {
    displayButton();
    //console.log(typeof getb);
  }, [getb]);

  return (
    <View style={styles.container}>
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
        <Text style={styles.mainText}>BOOK DETAIL</Text>
      </View>
      {
        //bookDetail Close
      }
      <Modal animationType="none" transparent={true} visible={getModal}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            {getText === false ? (
              <Text
                style={{
                  fontFamily: "OpenSans-SemiBold",
                  fontSize: 14,
                  color: colors.blue,
                }}
              >
                Please Wait Book is Downloading
              </Text>
            ) : (
              <Text>Book Download Successfully</Text>
            )}

            <ActivityIndicator size="small" color="#0000ff" />
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
        <FlatList
          data={Arrays}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.imagesCon}>
                  {route.params.BookDetails.image != undefined ? (
                    <Image
                      source={{
                        //uri: getUrl(route.params.BookDetails.image),
                        uri: route.params.BookDetails.image,
                      }}
                      style={styles.imagesCon}
                    />
                  ) : (
                    <Image
                      source={{
                        //uri: getUrl(route.params.BookDetails.image),
                        uri: route.params.BookDetails.img,
                      }}
                      style={styles.imagesCon}
                    />
                  )}
                </View>
                {
                  //Text
                }
                <View style={styles.textConst}>
                  {
                    //Book Name
                  }
                  <View style={styles.nameCon}>
                    <Text style={styles.naamText}>Name: </Text>
                    <Text style={styles.naamText1}>
                      {route.params.BookDetails.name}
                    </Text>
                  </View>
                  {
                    //Book Name Close
                  }
                  {
                    //Author Name
                  }
                  <View style={styles.authorCon}>
                    <Text style={styles.naamText}>Author:</Text>
                    <Text style={styles.naamText1}>
                      {route.params.BookDetails.author}
                    </Text>
                  </View>
                  {
                    //Author Name close
                  }
                </View>
                {
                  //Book Icon close
                }
                {
                  //Discrioption
                }
                <View style={styles.disCon}>
                  <Text style={{ fontSize: 16, fontFamily: "OpenSans-Bold" }}>
                    Discription:
                  </Text>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.disText}>
                      {route.params.BookDetails.description}
                    </Text>
                  </ScrollView>
                </View>
                {
                  //For Button
                }
                {getb.toString().indexOf(route.params.BookDetails.name) > -1 ? (
                  <>
                    <View style={styles.bookExists}>
                      <Text
                        style={{
                          alignSelf: "center",
                        }}
                      >
                        Book Already Exits In Download
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setModal(true);
                        downloadFile(route.params.BookDetails);
                        // outputData();
                      }}
                    >
                      <View style={styles.bookDown}>
                        <Text style={{ alignSelf: "center" }}>Download</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-around",
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
    marginTop: 80,
    borderRadius: 40,
    borderBottomEndRadius: 0,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
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
  imagesCon: {
    height: 270,
    width: 170,
    borderRadius: 10,
  },
  textConst: {
    marginTop: 10,
    height: 60,
    //  backgroundColor: "red",
    width: "100%",
  },
  nameCon: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
    //backgroundColor: "red",
  },
  naamText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 15,
    width: "20%",
    //   backgroundColor: "red",
  },
  naamText1: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 12,
    color: colors.gray,
    alignSelf: "center",
    textAlign: "justify",
    // width: 260,
    width: "80%",
    //backgroundColor: "yellow",
  },
  authorCon: {
    flexDirection: "row",
    // paddingLeft: 5
    width: "90%",
    // backgroundColor: "yellow",
    alignSelf: "center",
  },
  disCon: {
    flexDirection: "column",
    marginTop: 1,
    height: "25%",
    width: 320,
    //backgroundColor: "red",
  },
  disText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
    color: colors.gray,
    textAlign: "justify",
  },
  bookExists: {
    height: 40,
    width: "80%",
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#F1E7FF",
    elevation: 5,
    marginBottom: 15,
  },
  bookDown: {
    height: 40,
    width: 120,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#F1E7FF",
    elevation: 5,
    marginBottom: 15,
  },
});
export default bookDetails;
