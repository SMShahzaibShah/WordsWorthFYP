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
} from "react-native";
import CustomButton from "../component/ButtonComponent";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../assets/colors/colors";
const firebaseBooksData = require("firebase");

import * as firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

const Search = ({ navigation, route }) => {
  const [getsearch, setSearch] = useState("loading");
  const [getbookInfo, setbookInfo] = useState("");
  const [noRes, setRes] = useState(true);
  const [getbook, setbooks] = useState();
  const [getF, setF] = useState({});

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    // Initialize Firebase
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
    // try {
    //   sec = firebaseBooksData.initializeApp(config, "Secondary");
    //   // setSec(secon)
    //   console.log("Sa");
    // } catch (exception) {
    //   //console.log(exception)
    //   sec = firebaseBooksData.apps[firebaseBooksData.apps.length - 1];
    // }
    firebase
      .database()
      .ref("Books")
      .on("value", function (snapshot) {
        console.log("as");
        var data = "";
        var temp = [];
        snapshot.forEach(function (childSnapshot) {
          data = childSnapshot.val();
          temp.push(data);
          //console.log(temp);
        });
        //console.log(temp);
        setbooks(temp);
        setSearch("none");
      });
    //console.log(getbook);
  }, []);

  /**
  var config = {
    apiKey: "AIzaSyC_zg-7N_LpvkhLAymvksM7Y9lrcA0AkjY",
    authDomain: "dogtag-e36b1.firebaseapp.com",
    databaseURL: "https://dogtag-e36b1.firebaseio.com/",
  };

  */
  // var config = {
  //   apiKey: "AIzaSyBLwWyP1YuWZrqvpo_zsNJIyEf8Xi_Lpco",
  //   authDomain: "gyradosvpn.firebaseapp.com",
  //   databaseURL: "https://gyradosvpn.firebaseio.com",
  //   projectId: "gyradosvpn",
  //   storageBucket: "gyradosvpn.appspot.com",
  //   messagingSenderId: "50961203679",
  //   appId: "1:50961203679:web:5889613169c3eeb168c46a",
  // };
  // var sec;

  const getUrl = (img) => {
    //console.log(img.split("url:")[1]);
    return img.split("url:")[1];
  };

  const FlatListData = (
    <View style={styles.flatList}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={getF}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate("bookDetails", { BookDetails: item })
            }
            style={{
              width: "95%",
              padding: 1,
            }}
          >
            <View style={styles.ScrollView}>
              <View
                style={{
                  ...styles.ScrollViewItem,
                }}
              >
                {
                  //div for Image
                }
                <View style={styles.imgCons}>
                  {"image" in item ? (
                    <Image
                      source={{
                        //uri: getUrl(item.image),
                        uri: item.image,
                      }}
                      style={styles.imgs}
                    />
                  ) : (
                    <Image
                      source={{
                        //uri: getUrl(item.image),
                        uri: item.img,
                      }}
                      style={styles.imgs}
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
                    //  backgroundColor: "cyan",
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
                      // height: 65,
                      textAlign: "justify",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      ...styles.ScrollViewText,
                      marginTop: 15,
                      height: 95,
                      textAlign: "justify",
                    }}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  // backgroundColor: "#fff",
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  // elevation: 5,
                }}
              >
                <Feather name="download" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
  function filterList() {
    if (getbookInfo.length <= 0) {
      alert("Please Enter Something");
    } else {
      var list = getbook.filter((item) => item.name.includes(getbookInfo));
      setSearch("Yes");
      //    console.log(list)
      setF(list);
      if (list.length < 1) {
        setRes(false);
      } else {
        setRes(true);
      }
    }
  }

  const Loading = (
    <View style={{ justifyContent: "center", alignSelf: "center" }}>
      <Text style={{ fontSize: 18, fontFamily: "OpenSans-Bold" }}>
        Sorry We were unable to Find Book
      </Text>
      <ActivityIndicator size="large" color="#653CA0" />
    </View>
  );
  if (getsearch == "loading") {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontFamily: "OpenSans-Bold" }}>
            Loading Please Wait
          </Text>
          <ActivityIndicator size="large" color="#653CA0" />
        </View>
      </>
    );
  } else if (getsearch === "none") {
    return (
      <View style={styles.container}>
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
        <Image
          source={require("../assets/main_bottom2.png")}
          style={{ bottom: 0, position: "absolute" }}
        />
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

        <View style={{ width: "100%", marginLeft: 76 }}>
          <Text style={styles.serText}>SEARCH</Text>
        </View>
        {
          //Search Image
        }
        <View style={styles.imgCon}>
          <Image
            source={require("../assets/ForSearchScreen.png")}
            style={{ position: "absolute" }}
          />
        </View>
        {
          //Text Input
        }
        <View style={styles.InputTextCon}>
          <Octicons
            name="search"
            size={24}
            style={{
              alignSelf: "center",
              // marginRight: 5
            }}
            color="#653CA0"
          />
          <TextInput
            placeholder="Enter Book Name To Search"
            onChangeText={(text) => setbookInfo(text)}
            style={styles.textInputs}
          ></TextInput>
        </View>
        {
          //Button
        }

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => filterList()}
          style={styles.buttonCon}
        >
          <LinearGradient
            colors={["#6E3AA7", "#23286B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.doneButtonWrapper}
          >
            <Text style={styles.doneButtonText}>Search</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
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
        <Image
          source={require("../assets/main_bottom2.png")}
          style={{ bottom: 0, position: "absolute" }}
        />
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

        <View style={{ width: "100%", marginLeft: 76 }}>
          <Text style={styles.serText}>SEARCH</Text>
        </View>
        {
          //Search DIVE
        }
        <View style={styles.ssecCon}>
          {
            //Back Button and Dislaying Text
          }
          <View style={styles.backCons}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setSearch("none");
                setbookInfo("");
              }}
              style={styles.bacCons1}
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
              //Text Part
            }
            <View>
              <Text style={{ color: colors.blue, fontSize: 16 }}>
                Displaying Result for
              </Text>
              <Text style={{ color: colors.gray, fontSize: 14 }}>
                {getbookInfo}{" "}
              </Text>
            </View>
          </View>
        </View>
        {
          //Books Displaying Part
        }
        <View style={styles.flatList}>
          {noRes === true ? FlatListData : Loading}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  ImagesSty: {
    width: 250,
    height: 60,
    marginTop: 100,
    marginBottom: 50,
    //justifyContent: "center"
  },
  SecondText: {
    fontSize: 16,
    paddingTop: 20,
    width: "90%",
  },
  textInput: {
    borderColor: "red",
    //borderWidth: 2,
    borderBottomWidth: 2,
    width: "78%",
    //borderRadius: 50,
    fontSize: 16,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    width: "75%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 40,
  },
  iconStyle: {
    alignSelf: "auto",
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
  flatList: {
    flex: 1,
    alignSelf: "center",
    // justifyContent: "space-between",
    width: "93%",
    justifyContent: "center",
    paddingTop: 5,
    alignItems: "center",
  },
  ScrollViewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    //backgroundColor: "yellow",
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
    //backgroundColor: "red",
    borderRadius: 10,
  },
  menuandEditDiv: {
    flexDirection: "row",
    marginTop: 35,
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
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
  serText: {
    fontFamily: "Roboto-Regular",
    fontSize: 20,
    color: colors.gray,
    marginTop: 20,
  },
  imgCon: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 180,
  },
  InputTextCon: {
    flexDirection: "row",
    width: "70%",
    height: 45,
    backgroundColor: "#F1E7FF",
    borderRadius: 10,
    paddingHorizontal: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 130,
  },
  textInputs: {
    width: "90%",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 5,
    fontFamily: "OpenSans-Regular",
  },
  ssecCon: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 60,
    width: "90%",
    alignItems: "center",
  },
  backCons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  bacCons1: {
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
  imgCons: {
    height: 180,
    width: 110,
    //margin: 5,
    marginRight: 5,
    marginTop: 2,
    borderRadius: 5,
  },
  imgs: {
    height: 180,
    width: 110,

    borderRadius: 5,
    resizeMode: "stretch",
  },
});

export default Search;
