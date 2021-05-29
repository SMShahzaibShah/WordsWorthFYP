import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
require("firebase/firestore");
require("firebase/firebase-storage");
import { EvilIcons } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";

export default function Profile() {
  const [getData, setData] = useState([]);
  const [getModal, setModal] = useState(false);
  const [getModal1, setModal1] = useState(false);
  const [getSelected, setSelected] = useState(null);
  const [getname, setname] = useState("");
  const [getfollowinId, setfollowingId] = useState([]);
  const [getfollowin, setfollowing] = useState(0);
  const [getref, setref] = useState(false);
  useEffect(() => {
    setModal1(true);
    fectchUserposts();
    var disName = firebase.auth().currentUser.displayName;
    var disNamear = disName.split(",");
    setname({ fName: disNamear[0], LName: disNamear[1] });
    fetchUserFollowing();
    fetchUserFollowing1();
  }, []);

  const fetchUserFollowing = async () => {
    await firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((Snapshot) => {
        let following = Snapshot.docs.map((doc) => {
          const id = doc.id;
          return { id };
        });
        setfollowingId(following);
      });
  };

  const fetchUserFollowing11 = async (follow) => {
    var ids;
    await firebase
      .firestore()
      .collection("following")
      .doc(follow)
      .collection("userFollowing")
      .get()
      .then((Snapshot) => {
        let following = Snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        ids = following;
      });
    return ids;
  };
  const fetchUserFollowing1 = async () => {
    await firebase
      .firestore()
      .collection("following")
      .get()
      .then(async (snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          //  const data = doc.data();
          // const id = idd;
          const postId = doc.id;
          return postId;
        });
        console.log("posts is" + posts);
        var following = 0;
        for (var i = 0; i < posts.length; i++) {
          const vals = await fetchUserFollowing11(posts[i]);
          console.log("vals is" + vals);
          if (vals.includes(firebase.auth().currentUser.uid)) {
            following = following + 1;
          }
        }

        setfollowing(following);
      });
  };

  const DateConvert = (TimeStamp) => {
    //console.log(TimeStamp.toDate().toString());
    //const da = new Date(TimeStamp);
    console.log(TimeStamp);
    //console.log(da);
    return 5;
  };

  const fectchUserposts = async () => {
    await firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "desc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data };
        });
        //    console.log(posts[0].creation.toDate());
        setData(posts);

        //  setTimeout(() => {
        setModal1(false);
        //  }, 2000);
      });
  };

  return (
    <View style={styles.container}>
      <Modal animationType="none" transparent={true} visible={getModal1}>
        <View style={styles.modalBackground1}>
          <View style={styles.activityIndicatorWrapper1}>
            <Text>Please Wait...</Text>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={getModal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        {getSelected == null ? (
          <> </>
        ) : (
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setModal(false)}
          >
            <View style={styles.activityIndicatorWrapper}>
              <Image
                source={{
                  uri: getSelected.downloadURL,
                }}
                style={styles.imgCon}
              />
              {
                //caption
              }
              <View style={styles.captionCon}>
                <Text style={styles.capText}>Caption :</Text>
                <Text style={styles.capIts}>{getSelected.getcaption}</Text>
              </View>
              {
                //caption close
              }
              {
                //Status
              }
              <View style={styles.statuscon}>
                <Text style={styles.capText}>Status :</Text>
                <Text style={styles.capIts}>
                  {getSelected.getquestion.quest}
                </Text>
              </View>
              {
                //Status CLose
              }
              {
                //Time
              }
              <View style={styles.statuscon}>
                <Text style={styles.capText}>Time :</Text>
                <Text style={styles.capIts}>
                  {getSelected.creation.toDate().toString()}
                </Text>
              </View>
              {
                //Time CLose
              }
            </View>
          </TouchableOpacity>
        )}
      </Modal>
      {
        //Main Top That Conatins Photo And Following Info
      }
      <View style={styles.picAndFollowCon}>
        {
          //Picture
        }
        <View style={styles.picsCons}>
          <EvilIcons
            name="user"
            size={100}
            color="black"
            style={{ margin: -15 }}
          />
        </View>
        {
          //Picture Close
        }
        <View style={styles.postCons}>
          {
            //post
          }
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: colors.gray,
              }}
            >
              {getData != undefined ? getData.length : 0}
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans-SemiBold",
                color: colors.blue,
              }}
            >
              Posts
            </Text>
          </View>
          {
            //post Close
          }
          {
            //Followers
          }
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: colors.gray,
              }}
            >
              {getfollowin}
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans-SemiBold",
                color: colors.blue,
              }}
            >
              Followers
            </Text>
          </View>

          {
            //Followers Close
          }

          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: colors.gray,
              }}
            >
              {getfollowinId.length}
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans-SemiBold",
                color: colors.blue,
              }}
            >
              Following
            </Text>
          </View>
          {
            //Following
          }
          {
            //Followng Close
          }
        </View>
      </View>
      {
        //Main Top That Conatins Photo And Following Info
      }
      {
        //Naam and Bio start
      }
      <View style={styles.naameAndBio}>
        <Text
          style={{
            fontFamily: "OpenSans-SemiBold",
            color: colors.blue,
          }}
        >
          {getname.fName} {getname.LName}
        </Text>
        <Text
          style={{
            fontFamily: "Roboto-Regular",
            color: colors.gray,
          }}
        >
          Time to Fly!
        </Text>
      </View>
      {
        //Naam and Bio close
      }
      {
        //Post Section Start
      }
      <View>
        <Text style={styles.postText}>Posts</Text>
        <View style={styles.poctCon}>
          <FlatList
            data={getData}
            keyExtractor={(item) => Math.random().toString(36).substring(7)}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            refreshing={getref}
            onRefresh={async () => {
              setref(true);
              await fectchUserposts();
              setref(false);
            }}
            renderItem={({ item }) => {
              return (
                <>
                  {getData == undefined ? (
                    <View
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{ fontSize: 18, fontFamily: "OpenSans-Bold" }}
                      >
                        Please Wait ...
                      </Text>
                      <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.postConss}
                      activeOpacity={0.7}
                      onPress={() => {
                        setSelected(item);
                        setModal(true);
                      }}
                    >
                      <Image
                        source={{
                          uri: item.downloadURL,
                        }}
                        style={{
                          height: 200,
                          width: 120,
                          borderRadius: 10,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </>
              );
            }}
          />
        </View>
      </View>
      {
        //Post Section Close
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  justifyContent: "center",
    //  alignItems: "center",
    backgroundColor: "#faf8f5",
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
    height: "40%",
    width: "100%",
    borderTopStartRadius: 50,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    display: "flex",
    // alignItems: "center",
    //justifyContent: "space-around",
    bottom: 0,
    position: "absolute",
    borderTopRightRadius: 50,
  },

  modalBackground1: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000080",
  },
  activityIndicatorWrapper1: {
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
  imgCon: {
    height: 200,
    width: 120,
    borderRadius: 10,
    top: 20,
    marginBottom: 25,
    alignSelf: "center",
  },
  captionCon: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
  },
  capText: {
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
    color: colors.blue,
    marginRight: 5,
  },
  capIts: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    alignSelf: "center",
    color: colors.gray,
  },
  statuscon: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
    marginTop: 3,
  },
  picAndFollowCon: {
    height: 80,
    //  backgroundColor: "red",
    alignSelf: "center",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  picsCons: {
    // backgroundColor: "cyan",
    height: 70,
    width: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  postCons: {
    width: "70%",
    //  backgroundColor: "yellow",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
  },
  naameAndBio: {
    height: 80,
    // backgroundColor: "yellow",
    alignSelf: "center",
    flexDirection: "column",
    width: "100%",
    marginLeft: 10,
  },
  postText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    marginLeft: 10,
    color: colors.blue,
  },
  poctCon: {
    width: "100%",
    //backgroundColor: "yellow",
    alignItems: "center",
    height: 410,
    paddingBottom: 10,
  },
  postConss: {
    height: 200,
    width: 120,
    borderRadius: 10,
    // backgroundColor: "red",
    margin: 4,
  },
});
