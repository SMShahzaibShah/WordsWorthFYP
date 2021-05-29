import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import book from "./collections/book";
import audioBooks from "./collections/audioBooks";

import Reader from "./pdfReader";
import TxtReader from "./TextReader";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

import bookCollections from "./collections/collectionsBooksDetails";
import audioCollections from "./collections/collectionAudioDetails";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      swipeEnabled={true}
      initialRouteName="Books"
      // tabBarOptions={{ showIcon: true }}

      tabBarOptions={{
        activeTintColor: "#6E3AA7",
        inactiveTintColor: "lightgray",

        showIcon: true,
        pressColor: "cyan",
        labelStyle: {
          fontSize: 16,
          fontWeight: "bold",
          //backgroundColor: "red",
          flexDirection: "row",
        },
        style: {
          // marginTop: 20,
          position: "relative",
          //          backgroundColor: "red",
          width: "100%",
          //justifyContent: "center",
          alignSelf: "center",
        },
        tabStyle: {
          // position: "relative",
          // width: "100%",
          //justifyContent: "space-between",
          //borderWidth: 5,
          //margin: 5,
          //          borderWidth: 5,
          // borderBottomColor: "white",
          // borderRightColor: "black",
          // borderTopColor: "white",
          // borderLeftColor: "white",
          //borderColor: "white",
          //backgroundColor: "red",
          //backgroundColor: "red",
          //margin: 1,
        },
      }}
      //     tabBarPosition="top"
    >
      <Tab.Screen
        name="Books"
        component={book}
        options={{
          //  tabBarLabel: "Home",

          tabBarIcon: ({ focused }) =>
            focused == true ? (
              <MaterialCommunityIcons
                name="book-multiple"
                size={24}
                color="#6E3AA7"
              />
            ) : (
              <MaterialCommunityIcons
                name="book-multiple"
                size={24}
                color="lightgray"
              />
            ),
        }}
      />
      <Tab.Screen
        name="AudioBooks"
        component={audioBooks}
        options={{
          //  tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused == true ? (
              <MaterialCommunityIcons
                name="audiobook"
                size={24}
                color="#6E3AA7"
              />
            ) : (
              <MaterialCommunityIcons
                name="audiobook"
                size={24}
                color="lightgray"
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
export default function collections({ navigation, route }) {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
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
          <Text
            style={{
              alignSelf: "center",
              fontFamily: "OpenSans-SemiBold",
              fontSize: 16,
              color: colors.gray,
            }}
          >
            Back
          </Text>
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
          COLLECTIONS
        </Text>
      </View>
      {
        //Search DIVE
      }
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName={"allCollections"}
          screenOptions={{
            headerShown: false,
            //  headerTitleAlign: "center",
            // headerTintColor: "black", // change header color
            // headerStyle: {
            //  backgroundColor: "lightblue",
            //},
            // headerRight: () => <Button title="Edit"></Button>,
          }}
        >
          <Stack.Screen name="allCollections" component={MyTabs} />
          <Stack.Screen name="bookCollections" component={bookCollections} />
          <Stack.Screen name="audioCollections" component={audioCollections} />
          <Stack.Screen name="readerCol" component={Reader} />
          <Stack.Screen name="TxtReaderCol" component={TxtReader} />
        </Stack.Navigator>
      </NavigationContainer>
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
  backButton: {
    //marginTop: "8%",
    //marginLeft: "5%",
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
});
