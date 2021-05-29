import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

import * as firebase from "firebase";
export default function message() {
  const [getAllMsg, setAllMsg] = useState([]);

  useEffect(() => {
    getMsg();
  }, []);
  const getMsg = async () => {
    await firebase
      .firestore()
      .collection("Messages")
      .doc(firebase.auth().currentUser.uid)
      .collection("allMsg")
      .orderBy("time")
      .onSnapshot(async (Snapshot) => {
        let msgs = Snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setAllMsg(msgs);
        //console.log(msgs);
        // console.log(getUsersPost);
      });
  };

  return (
    <View style={styles.container}>
      {getAllMsg.length <= 0 ? (
        <Text>No Message Yet...</Text>
      ) : (
        <FlatList
          data={getAllMsg}
          style={{
            //   margin: 10,
            width: "95%",
          }}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity style={styles.touchStyle}>
                  {
                    //Sender Name
                  }
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.SenderName}>Sender Name : </Text>
                    <Text>{item.SenderName}</Text>
                  </View>
                  {
                    //Sender Name
                  }
                  <Text style={{ ...styles.SenderName, fontSize: 16 }}>
                    Recommendation
                  </Text>
                  {
                    //Info
                  }
                  <View>
                    {
                      //Book Name
                    }
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.SenderName}>Book Name : </Text>
                      <Text>{item.info.name}</Text>
                    </View>
                    {
                      //Book Name Close
                    }
                    {
                      //Book Author
                    }
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.SenderName}>Book Author : </Text>
                      <Text>{item.info.author}</Text>
                    </View>
                    {
                      //Book Author Close
                    }
                    {
                      //Book Icon
                    }
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.SenderName}>Book Cover : </Text>
                      <Image
                        source={{ uri: item.info.image }}
                        style={{
                          height: 80,
                          width: 50,
                          resizeMode: "contain",
                        }}
                      />
                    </View>
                    {
                      //Book Icon Close
                    }
                  </View>
                  {
                    //Info
                  }
                </TouchableOpacity>
              </>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf8f5",
  },
  SenderName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  touchStyle: {
    //backgroundColor: 'red',
    height: 200,
    width: "90%",
    alignSelf: "center",
    margin: 5,
    borderRadius: 10,
    elevation: 4,

    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 8, // Android
    justifyContent: "space-around",
    padding: 12,
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
