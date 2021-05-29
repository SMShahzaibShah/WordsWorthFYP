import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";

import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

require("firebase/firestore");
require("firebase/firebase-storage");
import colors from "../../assets/colors/colors";

export default function newsFeed() {
  const [getref, setref] = useState(false);
  const [getUsersInfo, setUsersInfo] = useState([]);
  const [getUsersPost, setUsersPost] = useState([]);
  const [getFeedData, setFeedData] = useState([]);
  const [getLikesData, setLikesData] = useState([]);
  const [getTime, setTime] = useState(0);
  const [getModal, setModal] = useState(false);
  const [getHasData, setHasData] = useState(false);
  //  const [getfollowinngs, setfollowinngs] = useState();
  //  var getfollowinngs = [];
  const fetchFeedData = async () => {
    console.log("here1");
    var arr1d = [].concat(...getUsersPost);
    if (arr1d.length == 0) {
      setModal(false);
    } else {
      for (var i = 0; i < getUsersInfo.length; i++) {
        var j = 0;
        for (j; j < arr1d.length; j++) {
          if (getUsersInfo[i].id == arr1d[j].id) {
            const feeData = {
              userInformation: getUsersInfo[i],
              userPosts: arr1d[j],
            };
            var feedDataa = getFeedData;
            // console.log(getfollowinngs);
            //  console.log(getfollowinngs.indexOf(feeData.userInformation.id));
            //  console.log(getfollowinngs.indexOf(feeData.userInformation.id));
            if (userExists(feeData.userPosts.downloadURL) == false) {
              feedDataa.push(feeData);
              setFeedData(feedDataa);
            }
            //  //console.log(feedDataa);
            // console.log(feedDataa);
            setModal(false);
            console.log("here2");
          }
        }
      }
    }
  };
  function userExists(username) {
    return getFeedData.some(function (el) {
      return el.userPosts.downloadURL === username;
    });
  }
  const fetchUsersInfo = async (following) => {
    // console.log(following);
    for (var i = 0; i < following.length; i++) {
      await firebase
        .firestore()
        .collection("users")
        .doc(following[i])
        .get()
        .then((snapshot) => {
          const usedata = snapshot.data();
          const id = snapshot.id;
          const uData = {
            info: usedata,
            id: id,
          };
          var usersData = getUsersInfo;

          usersData.push(uData);
          setUsersInfo(usersData);
          // console.log(getUsersInfo);
        });
    }
  };

  const fectchUserposts = async (following) => {
    //  console.log(following);
    for (var i = 0; i < following.length; i++) {
      const id = following[i];
      await firebase
        .firestore()
        .collection("posts")
        .doc(following[i])
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then(async (snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            // const id = idd;
            const postId = doc.id;
            return { postId, id, ...data };
          });
          // console.log(posts);
          // var po = posts;
          if (posts.length > 0) {
            for (var j = 0; j < posts.length; j++) {
              //  console.log(posts[j].postId);
              const daaa = await getComments(id, posts[j].postId);
              // console.log("daa", daaa);
              // console.log("posts ", posts[j]);
              posts[j].Likes = daaa;
              //  console.log("posts after", posts[j]);
            }

            var usepost = getUsersPost;
            usepost.push(posts);
            setUsersPost(usepost);
          }
        });
    }
  };
  const onFollow = async (id, postId) => {
    await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .set({})
      .then(() => {
        var feed = getFeedData;

        for (var i = 0; i < feed.length; i++) {
          if (feed[i].userInformation.id == id) {
            //console.log("Before", feed[i]);
            feed[i].userPosts.Likes.push(firebase.auth().currentUser.uid);
            // console.log("after", feed[i]);
          }
        }
        setFeedData(feed);
        setModal(true);
        setModal(false);
      });
  };

  const onUnFollow = async (id, postId) => {
    await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete()
      .then(() => {
        var feed = getFeedData;

        for (var i = 0; i < feed.length; i++) {
          if (feed[i].userInformation.id == id) {
            //console.log("Before", feed[i]);
            var index = feed[i].userPosts.Likes.indexOf(
              firebase.auth().currentUser.uid
            ); // <-- Not supported in <IE9
            if (index !== -1) {
              feed[i].userPosts.Likes.splice(index, 1);
            }
            // feed[i].userPosts.Likes.push(firebase.auth().currentUser.uid);
            // console.log("after", feed[i]);
          }
        }
        setFeedData(feed);
        setModal(true);
        setModal(false);
      });
  };

  const getComments = async (id, id1) => {
    var Likes = [];
    await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .collection("userPosts")
      .doc(id1)
      .collection("likes")
      .get()
      .then(async (Snapshot) => {
        let comm = await Snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data };
        });
        for (var i = 0; i < comm.length; i++) {
          Likes.push(comm[i].id);
        }

        //var Likes = getLikesData;
        //Likes.push(comm);
        //setLikesData(Likes);

        {
          /**
          if (comm.length > 0) {
            var totalrateSum = 0;
            for (var i = 0; i < comm.length; i++) {
              totalrateSum = totalrateSum + comm[i].rating;
            }
            const rattt = rat;
            rattt.push({ rating: totalrateSum / comm.length, productID: id });
            setrat(rattt);

            //  console.log(rat);
          }
           */
        }
      });
    return Likes;
  };
  useEffect(() => {
    // setUsersInfo([]);
    // setUsersPost([]);
    //console.log('hyyyyyyy')
    setModal(true);
    //if (getTime == 0) {
    fetchUserFollowing();
    //}
  }, [getFeedData]);
  useEffect(() => {
    // setUsersInfo([]);
    // setUsersPost([]);
    //console.log('hyyyyyyy')
    setModal(true);
    //if (getTime == 0) {
    fetchUserFollowing();
    //}
  }, []);
  const fetchUserFollowing = async () => {
    //setTime(1);
    await firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot(async (Snapshot) => {
        let following = Snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });

        if (following.length > 0) {
          //setfollowinngs(following.toString);

          await fetchUsersInfo(following);

          await fectchUserposts(following);
          //  console.log(getUsersPost);
          //setTimeout(() => {
          //  console.log("here");
          await fetchFeedData();
          setHasData(true);
          // }, 2000);
        } else {
          setModal(false);
          setHasData(false);
        }

        // console.log(getUsersPost);
      });
  };

  const Date = (TimeStamp) => {
    return TimeStamp.toDate().toString();
  };
  return (
    <View style={styles.container}>
      <Modal animationType="none" transparent={true} visible={getModal}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Text>Please Wait...</Text>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        </View>
      </Modal>
      {getFeedData.length > 0 ? (
        <FlatList
          data={getFeedData}
          keyExtractor={(item) => Math.random().toString(36).substring(7)}
          showsVerticalScrollIndicator={false}
          refreshing={getref}
          onRefresh={async () => {
            setref(true);
            setModal(true);
            await fetchUserFollowing();
            setref(false);
          }}
          renderItem={({ item }) => {
            return (
              <>
                {getFeedData.length > 0 ? (
                  <View style={styles.mainCon}>
                    <View style={styles.nameandPicCon}>
                      {
                        //Picture
                      }
                      <View style={styles.picCon}>
                        <EvilIcons
                          name="user"
                          size={70}
                          color="black"
                          style={{ margin: -15 }}
                        />
                      </View>
                      {
                        //Picture Close
                      }
                      {
                        //Name and Time
                      }
                      <View
                        style={{
                          //  backgroundColor: "yellow",
                          height: 50,
                          width: "83%",
                        }}
                      >
                        {
                          //Name
                        }
                        <Text style={styles.nameText}>
                          {item.userInformation.info.name}
                        </Text>
                        {
                          //Name close
                        }
                        {
                          //Time
                        }
                        <Text style={styles.timeText}>
                          {Date(item.userPosts.creation)}
                        </Text>
                        {
                          //Time close
                        }
                      </View>
                      {
                        //Name and Time Close
                      }
                    </View>
                    {
                      //Image
                    }
                    <View style={styles.imagesCon}>
                      {
                        //Caption
                      }
                      <Text style={styles.textCon}>
                        {item.userPosts.getcaption}
                      </Text>
                      {
                        //Caption Close
                      }
                      {
                        //Image
                      }
                      <View
                        style={{
                          height: 320,
                          //     backgroundColor: "blue",
                        }}
                      >
                        <Image
                          source={{
                            uri: item.userPosts.downloadURL,
                          }}
                          style={styles.imagesSec}
                        />
                      </View>
                      {
                        //Image Close
                      }
                      {
                        //like Comment
                      }
                      <View style={styles.likeCons}>
                        <Text>Likes: {item.userPosts.Likes.length} </Text>
                        {item.userPosts.Likes.includes(
                          firebase.auth().currentUser.uid
                        ) ? (
                          <TouchableOpacity
                            onPress={() => {
                              onUnFollow(
                                item.userInformation.id,
                                item.userPosts.postId
                              );
                              //console.log(item);
                            }}
                          >
                            <AntDesign name="heart" size={24} color="#653CA0" />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              onFollow(
                                item.userInformation.id,
                                item.userPosts.postId
                              );
                              //console.log(item);
                            }}
                          >
                            <AntDesign name="hearto" size={24} color="black" />
                          </TouchableOpacity>
                        )}
                      </View>
                      {
                        //like Comment
                      }
                    </View>

                    {
                      //Image Close
                    }
                  </View>
                ) : (
                  <View style={styles.followCon}>
                    <Text>Please Follow Someone</Text>
                  </View>
                )}
              </>
            );
          }}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Regular",
              fontSize: 16,
              color: "red",
            }}
          >
            Please Follow Some!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: "20%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  mainCon: {
    height: 455,
    width: "95%",
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
  nameandPicCon: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  picCon: {
    // backgroundColor: "cyan",
    height: 40,
    width: 40,
    borderRadius: 50,
    //justifyContent: "center",
    //alignItems: "center",
    //alignSelf: "center",
    paddingTop: 10,
    paddingLeft: 8,
  },
  nameText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
    color: colors.blue,
    marginTop: 5,
  },
  timeText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  imagesCon: {
    height: 370,
    width: 345,
    //     backgroundColor: "cyan",
    margin: 10,
    alignSelf: "center",
  },
  textCon: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    color: colors.blue,
    marginTop: 2,
    marginBottom: 3,
    //marginTop: 5,
  },
  imagesSec: {
    height: 320,
    width: 200,
    borderRadius: 10,
    alignSelf: "center",
  },
  likeCons: {
    flexDirection: "row",
    //   backgroundColor: "yellow",
    width: 70,
    justifyContent: "space-between",
    marginTop: 2,
    alignItems: "center",
  },
  followCon: {
    height: 455,
    //width: "100%",
    // backgroundColor: "red",
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 15,
    //Shadow
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
});
