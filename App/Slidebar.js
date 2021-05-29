import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Drawer } from "react-native-paper";

import { AuthContext } from "./context";
import * as firebase from "firebase";

export default function Slidebar({ ...props }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = (previousState) => {
    setIsEnabled((previousState) => !previousState);
    if (previousState == true) {
      SignInBlind();
    }
  };
  const { Signoutco } = React.useContext(AuthContext);
  const { SignInBlind } = React.useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Image
        source={require("./assets/Drawer.png")}
        style={{
          marginTop: 5,
          alignSelf: "center",
        }}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Preferences" style={{ marginTop: -5 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            alignSelf: "center",
            marginLeft: 10,
            //  backgroundColor: "red",
          }}
        >
          <Text style={{ alignSelf: "center", color: "gray" }}>
            Enhanced Mode {isEnabled == true ? "on" : "off"}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity
        style={{
          height: 60,
          // backgroundColor: "red",
          width: "90%",
          margin: 10,
          borderRadius: 10,
          //justifyContent: "space-between",
          flexDirection: "row",
          //  marginBottom: 15,
          borderTopColor: "#f4f4f4",
          borderTopWidth: 1,
        }}
        onPress={() => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              // Sign-out successful.
              Signoutco();
            })
            .catch((error) => {
              alert(error);
            });
        }}
      >
        <MaterialCommunityIcons
          name="exit-to-app"
          size={24}
          color="#653CA0"
          label="Sign Out"
          style={{ alignSelf: "center", marginLeft: 8, width: 50 }}
        />

        <Text
          style={{
            alignSelf: "center",
            //alignItems: "center",
            //marginLeft: 20,
          }}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
