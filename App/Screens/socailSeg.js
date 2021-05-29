import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../assets/colors/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

import newsFeed from "./socail/newsFeed";
import searchFriends from "./socail/searchFriends";
import message from "./socail/messages";
import profile from "./socail/profile";
import post from "./socail/post";

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="grey"
      shifting={true}
      barStyle={{
        backgroundColor: "white",
        //paddingTop: 5,
        //marginBottom: 0,
      }}
    >
      <Tab.Screen
        name="Home"
        component={newsFeed}
        options={{
          tabBarColor: "#10002b",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={searchFriends}
        options={{
          tabBarColor: "#240046",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={post}
        options={{
          tabBarColor: "#3c096c",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={message}
        options={{
          tabBarColor: "#5a189a",
          tabBarIcon: ({ color }) => (
            <Feather name="message-square" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={profile}
        options={{
          tabBarColor: "#7b2cbf",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function socailSeg({ navigation, route }) {
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
          SOCIAL SEGMENT
        </Text>
      </View>
      {
        //Search DIVE
      }
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName={"newsFeed"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="newsFeed" component={MyTabs} />
          <Stack.Screen name="Search" component={searchFriends} />
          <Stack.Screen name="Post" component={post} />
          <Stack.Screen name="Message" component={message} />
          <Stack.Screen name="Profile" component={profile} />
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
