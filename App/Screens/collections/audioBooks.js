import React, { useState, useEffect } from "react";
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
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { LinearGradient } from "expo-linear-gradient";
export default function audiobook({ navigation, route }) {
  const [getModal, setModal] = useState(false);
  const [allbooks, setbooks] = useState([]);
  const [getselectedItem, setselectedItem] = useState([]);
  const [allCollections, setallCollections] = useState();
  const [CollectionsName, setCollectionsName] = useState();
  const [CollectionsDis, setCollectionsDis] = useState();
  const [Coll, setColl] = useState([]);

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
    // console.log(tobe1);
  };

  const outputCollections = async () => {
    var allcoll = await AsyncStorage.getItem("audioCollections");
    if (allcoll != null) {
      allcoll = JSON.parse(allcoll);
      //console.log("here");
      //console.log(allcoll);

      //    console.log("audiobook", allcoll);
      //  if (allcoll.length > 0) {
      setColl(allcoll);
      //}
    }
  };

  var selectItem = (item) => {
    var color = false;
    //console.log(item);
    //console.log(getselectedItem);

    for (var i = 0; i < getselectedItem.length; i++) {
      //console.log(getselectedItem[i]);
      if (getselectedItem[i] == item) {
        //found = true;
        color = true;
        break;
      }
    }
    // console.log(color);
    return color;
  };
  const Loading = (
    <View
      style={{
        justifyContent: "center",
        marginTop: 50,
        //alignSelf: "center",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: "OpenSans-Bold",
          textAlign: "center",
        }}
      >
        There is No Collection Right now Click in "+" button to create one
      </Text>
    </View>
  );
  const FlatLists = (
    <FlatList
      data={Coll}
      //keyExtractor={(item) => Math.random().toString(36).substring(7)}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      style={{
        marginTop: 5,
        width: "90%",
        //   backgroundColor: "red",
        alignSelf: "center",
        //justifyContent: "space-between",
      }}
      renderItem={({ item }) => {
        return (
          <>
            {Coll.length > 0 ? (
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  //  backgroundColor: "red",
                  // justifyContent: "space-between",
                  height: 190,
                  width: 160,
                  margin: 10,
                  borderRadius: 10,
                  padding: 7,
                  // justifyContent: "space-between",

                  //backgroundColor:
                  //selectItem(item) == true ? "green" : "lightgray",
                  //justifyContent: "center",
                  //marginLeft: 5,
                  //flexDirection: "row",
                  //  backgroundColor: "yellow",
                }}
                onPress={() => {
                  //  console.log(item);
                  navigation.navigate("audioCollections", {
                    collectionInfo: item,
                  });
                }}
              >
                <Image
                  source={require("./booksAssets/Rectangle34.png")}
                  style={{
                    height: 190,
                    width: 160,
                    borderRadius: 10,
                    position: "absolute",
                  }}
                />
                {/**Name Text */}
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 14,
                      color: "#1C215D",
                      width: 150,
                      textAlign: "justify",
                      //  marginTop: 10,
                    }}
                  >
                    {" "}
                    Name:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "OpenSans-Regular",
                      fontSize: 14,
                      color: "#8D8FAD",
                      width: 150,
                      textAlign: "left",
                      //  marginTop: 10,
                    }}
                  >
                    {" "}
                    {item.name}
                  </Text>
                </View>
                {/**Name Text CLose */}
                {/**Name Text */}
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 14,
                      color: "#1C215D",
                      width: 150,
                      textAlign: "justify",
                      //  marginTop: 10,
                    }}
                  >
                    {" "}
                    Discription:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "OpenSans-Regular",
                      fontSize: 14,
                      color: "#8D8FAD",
                      width: 150,
                      height: 58,
                      textAlign: "left",
                      //textAlign: "justify",
                      //  marginTop: 10,
                    }}
                  >
                    {" "}
                    {item.dis}
                  </Text>
                </View>
                {/**Name Text CLose */}
                {/**Name Text */}
                <View
                  style={{
                    flexDirection: "column",
                    position: "absolute",
                    bottom: 5,
                    left: 5,

                    // backgroundColor: "red",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "OpenSans-SemiBold",
                      fontSize: 14,
                      color: "#1C215D",
                      marginTop: 1,
                      width: 160,
                      //  marginTop: 10,
                    }}
                  >
                    {" "}
                    See More...
                  </Text>
                </View>
                {/**Name Text CLose */}
              </TouchableOpacity>
            ) : (
              Loading
            )}
          </>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );

  const SaveData = async (item) => {
    AsyncStorage.getItem("audioCollections").then((favs) => {
      favs = favs == null ? [] : JSON.parse(favs);

      favs.push(item);
      return AsyncStorage.setItem("audioCollections", JSON.stringify(favs));
    });
  };
  useEffect(() => {
    outputData();
    // setselectedItem([]);
    outputCollections();
  }, [Coll]);
  useEffect(() => {
    outputData();
    // setselectedItem([]);
    outputCollections();
  }, []);
  return (
    <View style={styles.container}>
      {Coll.length > 0 ? FlatLists : Loading}

      {/* {FlatLists} */}
      {
        //Modal
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
                width: 50,
                height: 50,
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
                marginTop: 80,
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
              Select AudioBooks{" "}
            </Text>
            <FlatList
              data={allbooks}
              //keyExtractor={(item) => Math.random().toString(36).substring(7)}
              //showsVerticalScrollIndicator={false}
              //numColumns={2}
              style={{
                marginTop: 5,
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      //  backgroundColor: "red",
                      // justifyContent: "space-between",
                      height: 50,
                      width: 265,
                      margin: 10,
                      borderRadius: 50,
                      padding: 7,
                      backgroundColor:
                        selectItem(item) == true ? "green" : "lightgray",
                      justifyContent: "center",
                      //marginLeft: 5,
                      //flexDirection: "row",
                    }}
                    onPress={() => {
                      if (getselectedItem.indexOf(item) == -1) {
                        setselectedItem([...getselectedItem, item]);
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
                setallCollections({
                  name: CollectionsName,
                  dis: CollectionsDis,
                  items: getselectedItem,
                });
                SaveData({
                  name: CollectionsName,
                  dis: CollectionsDis,
                  items: getselectedItem,
                });
                var datas = Coll;
                // console.log("dats", datas);
                datas.push({
                  name: CollectionsName,
                  dis: CollectionsDis,
                  items: getselectedItem,
                });
                setColl(datas);
                setModal(false);
              }}
            >
              <Text style={{ margin: 15 }}>
                <LinearGradient
                  colors={["#6E3AA7", "#23286B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.doneButtonWrapper}
                >
                  <Text style={styles.doneButtonText}>CREATE</Text>
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
        //Add Button
      }
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          height: 70,
          width: 70,
          borderRadius: 50,
          backgroundColor: "#C4C4C4",
          bottom: "4%",
          position: "absolute",
          right: "5%",
          justifyContent: "center",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "grey",
        }}
        onPress={() => {
          setselectedItem([]);
          setCollectionsName("");
          setCollectionsDis("");
          setModal(true);
        }}
      >
        <Feather
          name="plus"
          size={40}
          color="white"
          style={{
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
      {
        //Add Button close
      }
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
    height: "70%",
    width: "80%",
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
