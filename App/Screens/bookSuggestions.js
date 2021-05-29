import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
const firebaseBooksData = require("firebase");
import { FontAwesome5 } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";
export default function collections({ navigation, route }) {
  const Arrays = [
    { key: "0", data: "Book 1", backColor: "red" },
    { key: "0", data: "Book 2", backColor: "red" },
    { key: "0", data: "Book 3", backColor: "red" },
    { key: "0", data: "Book 4", backColor: "red" },
    { key: "0", data: "Book 5", backColor: "red" },
    { key: "0", data: "Book 6", backColor: "red" },
    { key: "0", data: "Book 7", backColor: "red" },
  ];
  const Arrays1 = [{ key: "0", data: "Search A Book", backColor: "red" }];
  const [getF, setF] = useState([]);
  const [bookNames, setbookNames] = useState();
  const [RecobookNames, setRecobookNames] = useState();
  const [toDis, settoDis] = useState();
  const [getModal, setModal] = useState(false);
  var sec;
  const outputData = async () => {
    setModal(true);
    var user = firebase.auth().currentUser;
    var allBooks = await AsyncStorage.getItem(user.uid + "/BooksInfo");
    //console.log(JSON.parse(allBooks));
    //console.log("sad");
    //console.log(JSON.parse(allBooks));
    allBooks = JSON.parse(allBooks);
    // console.log(allBooks);
    if (allBooks != null) {
      setF(allBooks);
      if (allBooks.length > 0) {
        booKsArray(allBooks);
      }
    } else {
      alert("error");
      setModal(false);
    }
  };

  const booKsArray = async (allBooks) => {
    var BooksName = [];
    for (var i = 0; i < allBooks.length; i++) {
      //console.log(i)
      BooksName.push(allBooks[i].name);
    }
    //console.log(BooksName);
    setbookNames(BooksName);
    const uri =
      "http://192.168.100.106:8080/files/recommendation/" +
      JSON.stringify(BooksName);
    return await fetch(uri)
      .then((response) => response.text())
      .then((responseJson) => {
        // console.log(responseJson);

        setRecobookNames(responseJson);
        simP(responseJson);
      })
      .catch((error) => {
        setModal(false);
        alert(error);
        console.error(error);
        // setModal(false);
      });
  };
  var config = {
    apiKey: "AIzaSyBLwWyP1YuWZrqvpo_zsNJIyEf8Xi_Lpco",
    authDomain: "gyradosvpn.firebaseapp.com",
    databaseURL: "https://gyradosvpn.firebaseio.com",
    projectId: "gyradosvpn",
    storageBucket: "gyradosvpn.appspot.com",
    messagingSenderId: "50961203679",
    appId: "1:50961203679:web:5889613169c3eeb168c46a",
  };

  const simP = (reco) => {
    reco = JSON.parse(reco);
    console.log("Reco Length" + reco.length);
    // Initialize Firebase
    try {
      sec = firebaseBooksData.initializeApp(config, "Secondary");
      // setSec(secon)
      console.log("Sa");
    } catch (exception) {
      //console.log(exception)
      sec = firebaseBooksData.apps[firebaseBooksData.apps.length - 1];
    }
    sec
      .database()
      .ref("Books")
      .on("value", function (snapshot) {
        console.log("as");
        var data = "";
        var temp = [];
        snapshot.forEach(function (childSnapshot) {
          data = childSnapshot.val();
          // console.log(data);
          temp.push(data);
          //console.log(temp);
        });
        console.log("tempo Length" + temp.length);
        var recoData = [];
        for (var k = 0; k < reco.length; k++) {
          for (var q = 0; q < temp.length; q++) {
            if (reco[k] == temp[q].name) {
              recoData.push(temp[q]);
            }
          }
        }
        recoData = recoData.slice(0, 10);
        // console.log(recoData);
        settoDis(recoData);
        setModal(false);
      });
    //console.log(getbook);
  };
  {
    /**
  const getpart = async () => {
    console.log(bookNames);
    const uri = "http://192.168.0.105:8080/files/recommendation/" + bookNames;
    return await fetch(uri)
      .then((response) => response.text())
      .then((responseJson) => {
        // console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
        // setModal(false);
      });
  };
  const getUrl = (img) => {
    //console.log(img.split("url:")[1]);
    return img.split("url:")[1];
  };
   */
  }
  useEffect(() => {
    outputData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Modal
        animationType="none"
        transparent={true}
        visible={getModal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Text>Please Wait...</Text>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        </View>
      </Modal>

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
          marginTop: 68,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          marginTop: 35,
          width: "80%",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.openDrawer()}
          style={{
            height: 45,
            width: 45,
            borderRadius: 50,
            elevation: 5,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="ios-menu" size={35} color={colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("EditProfile")}
          style={{
            height: 45,
            width: 45,
            borderRadius: 50,
            elevation: 5,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
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
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 20,
            color: colors.gray,
            marginTop: 20,
            marginBottom: 60,
          }}
        >
          RECOMMENDATION
        </Text>
      </View>
      {
        //Search DIVE
      }
      {
        //Suggestion Screen Start from here
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
              BookSuggestions is Empty
            </Text>
          </>
        ) : (
          <FlatList
            data={toDis}
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
                  onPress={() =>
                    navigation.navigate("bookDetails", { BookDetails: item })
                  }
                >
                  <View
                    style={{
                      flexDirection: "column",
                      //backgroundColor: "yellow",
                      //height: 250,
                      // marginTop: 5,
                      //  marginBottom: 5,
                    }}
                  >
                    <View
                      style={{
                        //backgroundColor: "cyan",
                        width: 185,
                      }}
                    >
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
                            style={{
                              height: 210,
                              width: 130,
                              borderRadius: 10,
                            }}
                          />
                        ) : (
                          <Image
                            source={{
                              // uri: getUrl(item.image),
                              uri: item.img,
                            }}
                            style={{
                              height: 210,
                              width: 130,
                              borderRadius: 10,
                            }}
                          />
                        )}
                      </View>
                      {
                        //Text
                      }
                      {
                        //Book Name
                      }
                      <View style={{ marginTop: 5, width: 120, height: 80 }}>
                        <Text
                          style={{
                            fontFamily: "OpenSans-SemiBold",
                            fontSize: 12,
                            color: colors.gray,
                            justifyContent: "center",
                          }}
                        >
                          {item.name}
                        </Text>
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
      {
        //suggestion Main Conatiner close
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf8f5",
    alignItems: "center",
    justifyContent: "center",
  },
  secondcontainer: {
    //backgroundColor: "white",
    flex: 1,
    marginTop: 20,
    paddingTop: 5,
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
