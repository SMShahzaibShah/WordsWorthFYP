import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Pdf from "react-native-pdf";
export default function reades({ navigation, route }) {
  const [currentPage, setcurrentPage] = useState(0);
  const [currentPage1, setcurrentPage1] = useState(0);
  const [totalPage, settotalPage] = useState(0);
  const [pdf, setPdf] = useState();

  return (
    <View style={styles.container}>
      {console.log(route.params.BookDetails.name + route.params.ext)}
      {route.name == "readerCol" ? (
        <Pdf
          source={{
            uri:
              "file:///storage/emulated/0/WordsWorthDownload/" +
              route.params.BookDetails,
            cache: true,
          }}
          style={styles.pdf}
        />
      ) : (
        <View>
          <View
            style={{
              backgroundColor: "#101010",
              justifyContent: "center",
              //  height: 20,
              alignItems: "center",
              flexDirection: "row",
              //    width: "100%",
              //  height: 20,
            }}
            opacity={0.5}
            //  onPress={() => pdf.setPage(20)}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: 20,
                width: 20,
                borderRadius: 50,
                position: "absolute",
                left: 10,
              }}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TextInput
              value={currentPage1.toString()}
              keyboardType="numeric"
              onChangeText={(text) => {
                if (text.includes(".") && text.includes(",")) {
                } else {
                  var num = Number(text);
                  console.log(num);
                  if (num < 0) {
                    setcurrentPage1(0);
                  } else if (num > totalPage) {
                    setcurrentPage1(totalPage);
                  } else {
                    setcurrentPage1(num);
                  }
                }
              }}
              style={{
                fontSize: 20,
                color: "white",
              }}
            ></TextInput>
            <Text
              style={{
                fontSize: 20,
                color: "white",
              }}
            >
              / {totalPage}
            </Text>
            <TouchableOpacity
              style={{
                height: 20,
                width: 20,
                borderRadius: 50,
                position: "absolute",
                right: 10,
              }}
              onPress={() => {
                Keyboard.dismiss();
                pdf.setPage(currentPage1);
              }}
            >
              <Fontisto name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Pdf
            ref={(pdf) => {
              setPdf(pdf);
            }}
            source={{
              uri:
                "file:///storage/emulated/0/WordsWorthDownload/" +
                route.params.BookDetails.name +
                route.params.ext,
              cache: true,
            }}
            style={styles.pdf}
            onLoadComplete={(numberOfPages, filePath) => {
              settotalPage(numberOfPages);
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              setcurrentPage(page);
              setcurrentPage1(page);
              console.log(`current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link presse: ${uri}`);
            }}
            //scale={1.2}
            //fitPolicy={1}
            onPageSingleTap={() => Keyboard.dismiss()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    //marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
