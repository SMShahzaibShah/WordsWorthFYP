import React, { useEffect, useState } from "react";
import {
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { FontAwesome5 } from "@expo/vector-icons";
import Highlighter from "react-native-highlight-words";
const fileUri = "file:///storage/emulated/0/WordsWorthDownload/";
import { useRef } from "react";
export default function TextReader({ navigation, route }) {
  const [bookData, setBookData] = useState("");
  const scrollRef = useRef();
  const [size, setSize] = useState(16);
  const [pg, setPg] = useState(0);
  const [find, setFind] = useState("");
  const [total, setTotal] = useState(0);
  const [toggleFind, setToggleFind] = useState(false);
  const [getScroll, setScroll] = useState(false);
  useEffect(() => {
    async function readData() {
      if (route.name == "TxtReaderCol") {
        var book = await FileSystem.readAsStringAsync(
          fileUri + route.params.BookDetails
        );
      } else {
        var book = await FileSystem.readAsStringAsync(
          fileUri + route.params.BookDetails.name + route.params.ext
        );
      }
      var pageData = "";
      setTotal(book.trim().split("\n").length);
      book
        .trim()
        .split("\n")
        .forEach((line, index) => {
          if (index == 30 * pg + (index % 30)) {
            pageData = pageData + "\n" + line;
          }
        });
      setBookData(pageData);
    }
    console.log();
    readData();
  }, [pg]);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
    },
    nameBar: {
      width: "100%",
      paddingVertical: 10,
      borderBottomWidth: 1,
    },
    toolBar: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
      paddingVertical: 10,
      borderBottomWidth: 1,
    },
    pageControl: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingVertical: 10,
      borderBottomWidth: 1,
      alignItems: "center",
    },
    pageInfoText: {
      fontSize: 16,
      paddingVertical: 5,
      color: "gray",
    },
    setPageStyle: {
      fontSize: 16,
      paddingVertical: 5,
      color: "gray",
      textAlign: "center",
      //backgroundColor: "red",
    },
    pageControlButton: {
      flexDirection: "row",
      borderRadius: 10,
      //borderWidth: 1,
      borderColor: "black",
      marginHorizontal: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: "white",
      elevation: 5,
      //justifyContent: "center",
      //alignItems: "center",
      //    width: 100,
      // justifyContent: "space-between",
    },
    pageControlButtonText: {
      fontSize: 16,
      color: "#341234",
    },
    title: {
      textAlign: "center",
      fontSize: 24,
      fontWeight: "900",
      fontFamily: "OpenSans-Bold",
    },
    Text: {
      paddingVertical: 20,
      //fontFamily: "OpenSans-Bold",
      paddingHorizontal: 10,
      height: Dimensions.get("window").height * 0.85,
    },
    bookData: {
      textAlign: "justify",
      fontSize: size,
      fontFamily: "OpenSans-SemiBold",
    },
    pageSearch: {
      flexDirection: "row",
      justifyContent: "center",
      width: "100%",
      paddingVertical: 10,
      borderBottomWidth: 1,
      alignItems: "center",
    },
    inputText: {
      borderColor: "black",
      borderWidth: 1,
      width: Dimensions.get("window").width * 0.7,
      borderRadius: 5,
      paddingHorizontal: 5,
      marginRight: 10,
    },
    zoomButton: {
      elevation: 5,
      justifyContent: "center",
      width: 30,
      height: 30,
      borderRadius: 50,
      backgroundColor: "white",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.nameBar}>
        <Text
          style={{
            ...styles.title,
            fontSize:
              route.name == "TxtReaderCol"
                ? route.params.BookDetails.length > 30
                  ? 18
                  : 24
                : route.params.BookDetails.name.length > 30
                ? 18
                : 24,
          }}
        >
          {route.name == "TxtReaderCol"
            ? route.params.BookDetails
            : route.params.BookDetails.name}
        </Text>
      </View>
      <View style={styles.toolBar}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setSize(size + 2);
          }}
          style={styles.zoomButton}
        >
          {/**
          <Icon name="add-circle" size={40} />
           */}
          <Ionicons name="ios-add-circle" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setFind("");
            setToggleFind(toggleFind ? false : true);
          }}
          style={styles.zoomButton}
        >
          {toggleFind ? (
            <Entypo name="circle-with-cross" size={24} color="red" />
          ) : (
            <Ionicons name="md-search" size={24} color="black" />
          )}
          {/**
          <Icon
            name={toggleFind ? "close-circle" : "search-circle"}
            size={40}
          />
           */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setSize(size - 2);
          }}
          style={styles.zoomButton}
        >
          <Entypo name="circle-with-minus" size={24} color="black" />
          {/**
          <Icon name="remove-circle" size={40} />
           */}
        </TouchableOpacity>
      </View>
      {toggleFind ? (
        <View style={styles.pageSearch}>
          <TextInput
            style={styles.inputText}
            value={find}
            onChangeText={(txt) => {
              setFind(txt);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setToggleFind(toggleFind ? false : true);
            }}
            style={styles.zoomButton}
          >
            {/**
            <Icon name="search-circle" size={40} />
             */}
            <Ionicons name="md-search" size={24} color="green" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.pageControl}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setPg(pg > 0 ? pg - 1 : pg);
            }}
            style={styles.pageControlButton}
          >
            <Ionicons
              name="ios-arrow-back"
              size={22}
              color={"#341234"}
              style={{ marginHorizontal: 5 }}
            />
            {/**
            <Icon name="arrow-back-outline" size={20} />
             */}
            <Text style={styles.pageControlButtonText}>Previous</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              value={pg.toString()}
              keyboardType="numeric"
              onChangeText={(text) => {
                if (text.includes(".") && text.includes(".")) {
                  //  setPg(pg)
                } else {
                  var num = Number(text);
                  if (num < 0) {
                    setPg(0);
                  } else if (num > parseInt(total / 30)) {
                    setPg(parseInt(total / 30));
                  } else {
                    setPg(num);
                  }
                }
              }}
              style={styles.setPageStyle}
            ></TextInput>
            <Text style={styles.pageInfoText}>/ {parseInt(total / 30)}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setPg(pg + 1 < parseInt(total / 30) ? pg + 1 : pg);
              scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
              });
            }}
            style={styles.pageControlButton}
          >
            <Text style={styles.pageControlButtonText}>Next</Text>
            <Ionicons
              name="ios-arrow-forward"
              size={22}
              color={"#341234"}
              style={{ marginHorizontal: 5 }}
            />
            {/**
            <Icon name="arrow-forward-outline" size={20} />
             */}
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.Text}
        ref={scrollRef}
      >
        <Highlighter
          highlightStyle={{ backgroundColor: "yellow" }}
          searchWords={[find]}
          textToHighlight={bookData}
          style={styles.bookData}
        />
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}
