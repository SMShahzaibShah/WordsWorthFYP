import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../assets/colors/colors";

const DashBoard = ({ navigation, route }) => {
  const Arrays = [{ key: "0", data: "Search A Book", backColor: "red" }];

  return (
    <View style={styles.container}>
      {
        //Image for background
      }
      <Image
        source={require("../assets/dashboardBackground.png")}
        style={{ position: "absolute", marginTop: 80 }}
      />
      {
        //DIV for Menu and Edit
      }
      <View style={styles.menuandEditDiv}>
        <TouchableOpacity
          activeOpacity={0.5}
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
        //DIV for Menu and Edit close
      }
      {
        //Text on Dashboard
      }
      <View style={{ width: "100%", marginLeft: 76 }}>
        <Text style={styles.DashText}>DASHBOARD</Text>
      </View>
      {
        //Elements on Dashboard
      }
      <FlatList
        data={Arrays}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: "row", width: "92%" }}>
              <View style={{ flexDirection: "column" }}>
                {
                  //Search A book
                }
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Search")}
                >
                  <View style={styles.SearchDiv}>
                    <Image
                      source={require("../assets/serachBook.png")}
                      style={styles.imageAllcon}
                    />
                    <Text style={styles.SearchDivText}>Search Book</Text>
                  </View>
                </TouchableOpacity>
                {
                  //Audio Libray
                }
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("audioLibray")}
                >
                  <View style={styles.AudioDiv}>
                    <Image
                      source={require("../assets/audioLibrary.png")}
                      style={styles.imageAllcon}
                    />
                    <Text style={styles.AudioDivText}>Audio Libray</Text>
                  </View>
                </TouchableOpacity>
                {
                  //Books Suggestion
                }
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("bookSuggestions")}
                >
                  <View style={styles.bookSugg}>
                    <Image
                      source={require("../assets/Suggestions.png")}
                      style={styles.imageAllcon}
                    />
                    <Text style={styles.bookSuggText}>Book Suggestion</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "column" }}>
                {
                  //book Library
                }
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("bookslibrary")}
                >
                  <View style={styles.bookLib}>
                    <Image
                      source={require("../assets/BookLibrary.png")}
                      style={styles.imageAllcon}
                    />
                    <Text style={styles.bookLibText}>Book Libray</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("socailSegment")}
                >
                  {
                    //Socail
                  }
                  <View style={styles.socail}>
                    <Image
                      source={require("../assets/Friends.png")}
                      style={styles.imageAllcon}
                    />
                    <Text style={styles.socailText}>Socail Segment</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("collections")}
                >
                  {
                    //Collection
                  }
                  <View style={styles.colle}>
                    <Image
                      source={require("../assets/collection.png")}
                      style={styles.imageAllcon}
                    />
                    <Text style={styles.colleText}>Collections</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  internalContents: {
    width: "85%",
  },
  ImagesSty: {
    width: 250,
    height: 60,
    marginTop: 100,
    marginBottom: 50,
    //justifyContent: "center"
  },
  crossScrollViewText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  scrollViewText: {
    fontSize: 22,
    color: "white",
  },
  scrollView: {
    width: "80%",
  },
  scrollViewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor:"grey",
    alignSelf: "center",
    padding: 10,
    margin: 5,
    width: "97%",
    height: 60,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
    //paddingTop: 40,
  },
  text: {
    fontSize: 30,
    color: "black",
  },
  divContainer: {
    width: "90%",
    height: 80,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 5,
  },
  divText: {
    fontSize: 16,
    color: "white",
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
  DashText: {
    fontFamily: "Roboto-Regular",
    fontSize: 20,
    color: colors.gray,
    marginTop: 20,
  },
  SearchDiv: {
    height: 210,
    width: 176.43,
    marginTop: 65,
    borderRadius: 10,
  },
  SearchDivText: {
    //marginTop: 175,
    // left: 18,
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: "#FFECCC",
    alignSelf: "center",
    bottom: 10,
    position: "absolute",
  },
  AudioDiv: {
    height: 169,
    width: 177.43,

    marginTop: 20,
    borderRadius: 10,
  },
  AudioDivText: {
    //  marginTop: 130,
    // left: 18,
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: "#3F414E",
    alignSelf: "center",
    bottom: 10,
    position: "absolute",
  },
  bookSugg: {
    height: 210,
    width: 177.43,
    marginTop: 20,
    borderRadius: 10,
  },
  bookSuggText: {
    // marginTop: 170,
    //  left: 18,
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: "#FFECCC",
    alignSelf: "center",
    bottom: 10,
    position: "absolute",
  },
  bookLib: {
    height: 167,
    width: 176.43,

    marginTop: 65,
    marginLeft: 10,
    borderRadius: 10,
  },
  bookLibText: {
    // marginTop: 135,
    // left: 18,
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: "#FEF9F3",
    alignSelf: "center",
    bottom: 9,
    position: "absolute",
  },
  socail: {
    height: 210,
    width: 177.43,

    marginTop: 20,
    marginLeft: 10,
    borderRadius: 10,
  },
  socailText: {
    // marginTop: 170,
    //   left: 18,
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: "#3F414E",
    alignSelf: "center",
    bottom: 10,
    position: "absolute",
  },
  colle: {
    height: 167,
    width: 177.43,

    marginTop: 20,
    marginLeft: 10,
    borderRadius: 10,
  },
  colleText: {
    // left: 18,
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: "#FEF9F3",
    alignSelf: "center",
    bottom: 10,
    position: "absolute",
  },
  imageAllcon: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashBoard;
