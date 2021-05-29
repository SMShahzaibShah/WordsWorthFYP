import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  Octicons,
  Entypo,
} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../assets/colors/colors";

import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context";
import "firebase/firestore";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Facebook from "expo-facebook";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";

try {
  // var firebaseConfig = {
  //   apiKey: "AIzaSyBwEie5MWQm07oxnAoqIRV_LvSdvhzEMsM",
  //   authDomain: "wordsworth-3566c.firebaseapp.com",
  //   databaseURL: "https://wordsworth-3566c.firebaseio.com",
  //   projectId: "wordsworth-3566c",
  //   storageBucket: "wordsworth-3566c.appspot.com",
  //   messagingSenderId: "754217307534",
  //   appId: "1:754217307534:web:0b2df3b1faa91f1856a8df",
  // };
  var firebaseConfig = {
    apiKey: "AIzaSyBLwWyP1YuWZrqvpo_zsNJIyEf8Xi_Lpco",
    authDomain: "gyradosvpn.firebaseapp.com",
    databaseURL: "https://gyradosvpn.firebaseio.com",
    projectId: "gyradosvpn",
    storageBucket: "gyradosvpn.appspot.com",
    messagingSenderId: "50961203679",
    appId: "1:50961203679:web:5889613169c3eeb168c46a",
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);
} catch (err) {
  // ignore app already initialized error in snack
}

const SignIn = ({ navigation, route }) => {
  const [email, setemail] = useState("smshahzaibshah@gmail.com");
  const [pass, setpass] = useState("test123");
  const [showPass, setShowPass] = useState(true);
  const [getModal, setModal] = useState(false);
  const [getModal1, setModal1] = useState(false);

  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("+92 3431793029");
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );
  const sendVerification = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      if (verificationId != undefined) {
        alert("Verification code has been sent to your phone.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const confirmCode = async () => {
    console.log(verificationId);
    console.log(code);
    const credential = firebase
      .auth()
      .PhoneAuthProvider.getCredential(verificationId, code);

    console.log(credential);

    await firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        console.log(result);
        SignInco();
      });
  };
  const { SignInco } = React.useContext(AuthContext);

  {
    //Facebook Signin
  }
  async function fblogIn() {
    // try {
    //   const result = await LoginManager.logInWithPermissions([
    //     "public_profile",
    //     "email",
    //   ]);

    //   if (result.isCancelled) {
    //     throw "User cancelled the login process";
    //   }

    //   // Once signed in, get the users AccesToken
    //   const data = await AccessToken.getCurrentAccessToken();

    //   if (!data) {
    //     throw "Something went wrong obtaining access token";
    //   }

    //   // Create a Firebase credential with the AccessToken
    //   const facebookCredential = auth.FacebookAuthProvider.credential(
    //     data.accessToken
    //   );

    //   // Sign-in the user with the credential
    //   // await auth().signInWithCredential(facebookCredential)
    //   firebase
    //     .auth()
    //     .signInWithCredential(facebookCredential)
    //     .then(function () {
    //       firebase.auth().onAuthStateChanged((user) => {
    //         if (user != null) {
    //           //console.log(user);
    //           firebase
    //             .firestore()
    //             .collection("users")
    //             .where("name", "==", user.displayName)
    //             .get()
    //             .then((Snapshot) => {
    //               let users = Snapshot.docs.map((doc) => {
    //                 const data = doc.data();
    //                 const id = doc.id;
    //                 return { id, ...data };
    //               });
    //               console.log(users);
    //               if (users.length == 0) {
    //                 console.log("not Found");
    //                 const dbh = firebase.firestore();
    //                 dbh.collection("users").doc(user.uid).set({
    //                   name: user.displayName,
    //                   email: user.email,
    //                   photo: user.photoURL,
    //                 });
    //               } else {
    //                 console.log("Found");
    //               }
    //             });

    //           SignInco();
    //           //
    //         }
    //       });
    //     })
    //     .catch((error) => {
    //       // Handle Errors here.
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       // The email of the user's account used.
    //       var email = error.email;
    //       // The firebase.auth.AuthCredential type that was used.
    //       var credential = error.credential;
    //       // ...
    //     });
    //   //checkLoginState(userInfo);
    //   //Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    // } catch ({ message }) {
    //   console.log(message);
    //   alert(`Facebook Login Error: ${message}`);
    // }

    try {
      await Facebook.initializeAsync({
        appId: "470426764025847",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        // console.log(credential);
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function () {
            firebase.auth().onAuthStateChanged((user) => {
              if (user != null) {
                //console.log(user);
                firebase
                  .firestore()
                  .collection("users")
                  .where("name", "==", user.displayName)
                  .get()
                  .then((Snapshot) => {
                    let users = Snapshot.docs.map((doc) => {
                      const data = doc.data();
                      const id = doc.id;
                      return { id, ...data };
                    });
                    console.log(users);
                    if (users.length == 0) {
                      console.log("not Found");
                      const dbh = firebase.firestore();
                      dbh.collection("users").doc(user.uid).set({
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL,
                      });
                    } else {
                      console.log("Found");
                    }
                  });

                SignInco();
                //
              }
            });
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
        //checkLoginState(userInfo);
        //Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(message);
    }
  }

  {
    //Facebook SignIN Close
  }

  {
    //SignIn With Google
  }
  async function signInWithGoogleAsync() {
    try {
      // const result = await Google.logInAsync({
      //   androidClientId:
      //     "754217307534-30cni1uu8eb7cv54lmkluisr0jsfvrlg.apps.googleusercontent.com",
      //   //iosClientId: YOUR_CLIENT_ID_HERE,
      //   behavior: "web",
      //   scopes: ["profile", "email"],
      // });
      await GoogleSignIn.initAsync({
        // You may ommit the clientId when the firebase `googleServicesFile` is configured
        webClientId:
          "50961203679-b2v2qcvkqulbfchh76cao10nvuu65mlb.apps.googleusercontent.com",
      });
      try {
        await GoogleSignIn.askForPlayServicesAsync();
        const { type, user } = await GoogleSignIn.signInAsync();
        if (type === "success") {
          ///this._syncUserWithStateAsync();
          //console.log(user.auth.);

          onSignInGoo(user);
        }
      } catch ({ message }) {
        alert(message);
      }
      // if (result.type === "success") {
      //   onSignInGoo(result);
      //   return result.accessToken;
      // } else {
      //   return { cancelled: true };
      // }
    } catch (e) {
      alert(e);
    }
  }

  function onSignInGoo(googleUser) {
    //console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.auth.idToken,
          googleUser.auth.accessToken
        );
        // console.log(googleUser)
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((user) => {
            //  console.log(user.user.uid);
            //console.log(user.user.uid);

            console.log("User is Signed");
            // console.log(user.user);
            const dbh = firebase.firestore();
            dbh.collection("users").doc(user.user.uid).set({
              name: user.user.displayName,
              email: user.user.email,
              photo: user.user.photoURL,
              // givenName: googleUser.user.givenName,
              // familyName: googleUser.user.familyName,
            });
            SignInco();
          })
          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  }

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  {
    //SignIn With Google Close
  }

  const setUser = async (value) => {
    try {
      await AsyncStorage.setItem("user", value);
    } catch (e) {
      // save error
    }

    console.log("Done.");
  };

  const forgotByEmail = () => {
    var auth = firebase.auth();
    var emailAddress = email;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function () {
        alert("Email Varification Sent to", email);
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const onSignIn = () => {
    Keyboard.dismiss();
    if (email.length <= 0) {
      alert("Email/Phone Number is empty");
    } else if (pass.length <= 0) {
      alert("Password Field is required");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then((user) => {
          //console.log(user.emailVerified);

          if (user.user.emailVerified == true) {
            setModal(false);
            SignInco();
          } else {
            setModal(false);
            user.user.sendEmailVerification();
            alert("Please Verify your Email via a link sent");
          }
          // navigation.navigate("Dashboard");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setModal(false);
          alert(errorCode);
          // navigation.navigate('SignIn')
        });
    }
  };

  const passSettings = () => {
    if (showPass == true) {
      setShowPass(false);
    } else {
      setShowPass(true);
    }
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
      {
        //Modal for Phone Number
      }
      <Modal
        animationType="none"
        transparent={true}
        visible={getModal1}
        onRequestClose={() => setModal1(false)}
      >
        <View style={styles.modalBackground1}>
          <View style={styles.activityIndicatorWrapper1}>
            {
              //Cross Button
            }
            <TouchableOpacity
              onPress={() => setModal1(false)}
              style={styles.crossButton}
            >
              <Entypo name="cross" size={30} color="red" />
            </TouchableOpacity>
            {
              //Cross Button close
            }
            <View
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
              />
              <View style={styles.textInputCon}>
                <FontAwesome
                  name="phone"
                  size={24}
                  color="black"
                  style={{ alignSelf: "center", marginRight: 5 }}
                  color="#653CA0"
                />
                <TextInput
                  placeholder="Enter Phone Number"
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  style={styles.textInputi}
                ></TextInput>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={async () => {
                  // The FirebaseRecaptchaVerifierModal ref implements the
                  // FirebaseAuthApplicationVerifier interface and can be
                  // passed directly to `verifyPhoneNumber`.
                  try {
                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                    const verificationId =
                      await phoneProvider.verifyPhoneNumber(
                        phoneNumber,
                        recaptchaVerifier.current
                      );
                    setVerificationId(verificationId);
                    showMessage({
                      text: "Verification code has been sent to your phone.",
                    });
                  } catch (err) {
                    showMessage({
                      text: `Error: ${err.message}`,
                      color: "red",
                    });
                  }
                }}
                style={styles.buttonCon1}
              >
                <LinearGradient
                  colors={["#6E3AA7", "#23286B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.doneButtonWrapper}
                >
                  <Text style={styles.doneButtonText}>SEND CODE</Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={{ ...styles.textInputCon, marginTop: 15 }}>
                <Octicons
                  name="key"
                  size={24}
                  color="black"
                  style={{ alignSelf: "center", marginRight: 5 }}
                  color="#653CA0"
                />
                <TextInput
                  placeholder="Enter OTP Code"
                  keyboardType="phone-pad"
                  value={verificationCode}
                  onChangeText={(text) => setVerificationCode(text)}
                  style={styles.textInputi}
                ></TextInput>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={async () => {
                  try {
                    const credential =
                      firebase.auth.PhoneAuthProvider.credential(
                        verificationId,
                        verificationCode
                      );
                    await firebase
                      .auth()
                      .signInWithCredential(credential)
                      .then(function () {
                        SignInco();
                      });
                    showMessage({
                      text: "Phone authentication successful 👍",
                    });
                  } catch (err) {
                    showMessage({
                      text: `Error: ${err.message}`,
                      color: "red",
                    });
                  }
                }}
                style={styles.buttonCon1}
              >
                <LinearGradient
                  colors={["#6E3AA7", "#23286B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.doneButtonWrapper}
                >
                  <Text style={styles.doneButtonText}>VERIFY</Text>
                </LinearGradient>
              </TouchableOpacity>
              {message ? (
                <TouchableOpacity
                  style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 0xffffffee, justifyContent: "center" },
                  ]}
                  onPress={() => showMessage(undefined)}
                >
                  <Text
                    style={{
                      color: message.color || "blue",
                      fontSize: 17,
                      textAlign: "center",
                      margin: 20,
                    }}
                  >
                    {message.text}
                  </Text>
                </TouchableOpacity>
              ) : undefined}
            </View>
          </View>
        </View>
      </Modal>
      {
        //Modal for Phone Number close
      }
      <View style={styles.LoginTextCon}>
        <Image
          source={require("../assets/main_top2.png")}
          style={{
            position: "absolute",
            left: 0,
          }}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.loginText}>LOGIN</Text>
        </View>
      </View>
      <View style={styles.loginImageCon}>
        <Image
          source={require("../assets/Login.png")}
          style={styles.loginImage}
        />
      </View>
      <View style={styles.secondCon}>
        <View style={styles.textInputCon}>
          <FontAwesome
            name="user"
            size={24}
            style={{ alignSelf: "center", marginRight: 5 }}
            color="#653CA0"
          />
          <TextInput
            placeholder="Enter Email / Phone Number"
            value={email}
            onChangeText={(text) => setemail(text)}
            style={styles.textInputi}
          ></TextInput>
        </View>
        <View style={{ ...styles.textInputCon, marginTop: 15 }}>
          <FontAwesome5
            name="lock"
            size={24}
            style={{
              alignSelf: "center",
              //  marginRight: 5
            }}
            color="#653CA0"
          />
          <TextInput
            placeholder="Enter Password"
            secureTextEntry={showPass}
            value={pass}
            onChangeText={(text) => setpass(text)}
            style={{ ...styles.textInputi, width: 200 }}
          ></TextInput>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => passSettings()}
            style={{ justifyContent: "center" }}
          >
            <FontAwesome name="eye" size={22} color="#653CA0" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setModal(true);
            onSignIn();
          }}
          style={styles.buttonCon}
        >
          <LinearGradient
            colors={["#6E3AA7", "#23286B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.doneButtonWrapper}
          >
            <Text style={styles.doneButtonText}>LOGIN</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "78%",
            marginVertical: 15,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text
              style={{
                width: 25,
                textAlign: "center",
                fontFamily: "OpenSans-SemiBold",
              }}
            >
              or
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>
        {
          //DIV for google and Facebook and Twitter
        }
        <View style={styles.SocailCon}>
          {
            //Facebook
          }
          <TouchableOpacity
            style={styles.fbGooTwiCon}
            onPress={() => fblogIn()}
          >
            <FontAwesome
              name="facebook"
              size={30}
              color="#653CA0"
              style={{
                position: "absolute",
              }}
            />
          </TouchableOpacity>
          {
            //Facebook close
          }

          {
            //Google
          }
          <TouchableOpacity
            style={styles.fbGooTwiCon}
            onPress={() => signInWithGoogleAsync()}
          >
            <FontAwesome
              name="google"
              size={30}
              color="#653CA0"
              style={{
                position: "absolute",
              }}
            />
          </TouchableOpacity>
          {
            //Google close
          }
          {
            //Twitter
          }
          <TouchableOpacity
            style={styles.fbGooTwiCon}
            onPress={() => setModal1(true)}
          >
            <FontAwesome
              name="phone"
              size={30}
              color="#653CA0"
              style={{
                position: "absolute",
              }}
            />
          </TouchableOpacity>
          {
            //Twitter close
          }
        </View>
        <View style={styles.signupCon}>
          <Text style={{ fontFamily: "OpenSans-SemiBold" }}>
            Don’t Have an Account ?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ fontFamily: "OpenSans-Bold" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
          <Text
            style={{
              marginTop: 15,
              //  marginLeft: 65,
              fontFamily: "OpenSans-Bold",
            }}
          >
            Forgot Password ?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", backgroundColor: "red" }}>
        <Image
          style={{
            position: "absolute",
            right: 0,
          }}
          source={require("../assets/login_bottom1.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: "red",
  },
  internalContents: {
    width: "85%",
  },
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    //  alignContent: "center",
  },
  ImagesSty: {
    width: 250,
    height: 60,
    marginTop: 100,
    marginBottom: 50,
    //justifyContent: "center"
  },
  textInput: {
    borderColor: "grey",
    //borderWidth: 2,
    borderBottomWidth: 2,
    width: "95%",
    //borderRadius: 50,
    fontSize: 16,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 20,
    paddingTop: 0,
  },
  text: {
    fontSize: 30,
    color: "black",
  },
  button: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  Hitext: {
    fontStyle: "italic",
    color: "lightgrey",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonCon: {
    width: "70%",
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    //  elevation: 5,
  },
  buttonCon1: {
    width: "70%",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    alignSelf: "center",
  },
  doneButtonWrapper: {
    //flex: 1,
    // paddingLeft: 50,
    // paddingRight: 50,
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    height: 45,
    alignItems: "center",
    elevation: 5,
  },
  doneButtonText: {
    fontSize: 14,
    fontFamily: "OpenSans-SemiBold",
    color: colors.white,
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
  modalBackground1: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000080",
  },
  activityIndicatorWrapper1: {
    backgroundColor: "white",
    height: "40%",
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    display: "flex",
    //alignItems: "center",
    justifyContent: "space-around",
    padding: 5,
  },
  LoginTextCon: {
    flexDirection: "row",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    // marginTop: 50,
    top: 15,
    fontSize: 24,
    fontFamily: "OpenSans-Bold",
  },
  loginImageCon: {
    //marginLeft: 50,
    height: 272,
    justifyContent: "center",
    alignItems: "center",
  },
  loginImage: {
    height: 270,
    width: 300,
  },
  secondCon: {
    //flexDirection: "column",
    marginTop: 10,
    justifyContent: "center",
    //   alignSelf: "center",
    alignItems: "center",
  },
  textInputCon: {
    flexDirection: "row",
    width: "70%",
    height: 45,
    backgroundColor: "#F1E7FF",
    borderRadius: 10,
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 10,
  },
  textInputi: {
    width: "90%",
    height: 45,
    borderRadius: 10,
    paddingLeft: 10,
    fontFamily: "OpenSans-Regular",
  },
  SocailCon: {
    flexDirection: "row",
    width: "65%",
    justifyContent: "space-between",
    // alignItems: "center",
    //  marginTop: 15,
  },
  fbGooTwiCon: {
    backgroundColor: "#F1E7FF",
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    elevation: 5,
    alignItems: "center",
  },
  signupCon: {
    marginTop: 15,
    //marginLeft: 25,
    flexDirection: "row",
  },
  crossButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 10,
    elevation: 5,
  },
});

export default SignIn;
