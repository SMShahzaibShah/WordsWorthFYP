import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomButton from "../component/ButtonComponent";
import * as firebase from "firebase";

import RadioGroup from "react-native-custom-radio-group";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-community/picker";

const EditProfile = ({ navigation, route }) => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [pass1, setpass1] = useState("");
  const [pass2, setpass2] = useState("");
  const [name, setname] = useState({ fName: "", LName: "" });
  const [name1, setname1] = useState({ fName: "", LName: "" });
  const [showPass, setshowPass] = useState(false);
  const [showPass1, setshowPass1] = useState(false);
  const [changed, setchanged] = useState(true);
  const [getRadioState, setRadioState] = useState({
    activeBgColor: "white",
    activeTxtColor: "black",
    inActiveBgColor: "white",
    inActiveTxtColor: "black",
  });
  const [getRadioState1, setRadioState1] = useState({
    activeBgColor: "white",
    activeTxtColor: "black",
    inActiveBgColor: "white",
    inActiveTxtColor: "black",
  });
  const [getquestion, setquestion] = useState({
    quest: "What is the name of your first pet?",
  });

  const changeStyle1 = (value) => {
    if (value == "transport_car") {
      setRadioState1({
        activeBgColor: "red",
        activeTxtColor: "white",
        inActiveBgColor: "white",
        inActiveTxtColor: "black",
      });
    } else if (value == "transport_bike") {
      setRadioState1({
        activeBgColor: "blue",
        activeTxtColor: "white",
        inActiveBgColor: "white",
        inActiveTxtColor: "black",
      });
    } else if (value == "transport_bus") {
      setRadioState1({
        activeBgColor: "green",
        activeTxtColor: "white",
        inActiveBgColor: "white",
        inActiveTxtColor: "black",
      });
    }
  };
  const changeStyle = (value) => {
    if (value == "transport_car") {
      setRadioState({
        activeBgColor: "red",
        activeTxtColor: "white",
        inActiveBgColor: "white",
        inActiveTxtColor: "black",
      });
    } else if (value == "transport_bike") {
      setRadioState({
        activeBgColor: "blue",
        activeTxtColor: "white",
        inActiveBgColor: "white",
        inActiveTxtColor: "black",
      });
    } else if (value == "transport_bus") {
      setRadioState({
        activeBgColor: "green",
        activeTxtColor: "white",
        inActiveBgColor: "white",
        inActiveTxtColor: "black",
      });
    }
  };
  const Arrays = [{ key: "0", data: "Search A Book", backColor: "red" }];

  const radioGroupList = [
    {
      label: "Only Me",
      value: "transport_car",
    },
    {
      label: "Friends",
      value: "transport_bike",
    },
    {
      label: "Public",
      value: "transport_bus",
    },
  ];
  const onUpdateProfile = () => {
    var user = firebase.auth().currentUser;

    if (pass.length > 0 && pass1.length > 0 && pass == pass1) {
      user
        .updatePassword(pass)
        .then(function () {
          // Update successful.
          alert("Password Updated Successfully");
        })
        .catch(function (error) {
          // An error happened.
        });
    } else {
      alert("Please check your password details");
    }
  };

  const onUpdateName = () => {
    var user = firebase.auth().currentUser;
    if (name1.fName.length > 0 && name1.LName.length > 0) {
      user
        .updateProfile({
          displayName: name.fName + " " + name.LName,
        })
        .then(function () {
          alert("Information Updated");
          var userName = user.displayName;
          var disNamear = userName.split(" ");
          setname({ fName: disNamear[0], LName: disNamear[1] });
          setname1({ fName: disNamear[0], LName: disNamear[1] });
        })
        .catch(function (error) {
          // An error happened.
        });
    } else {
      alert("Please Enter Name");
    }
  };
  useEffect(() => {
    var user = firebase.auth().currentUser;
    //  console.log(user);
    //  console.log(user);
    var disName = user.displayName;
    console.log(disName);
    var disNamear;
    if (disName.includes(",")) {
      disNamear = disName.split(",");
    } else {
      disNamear = disName.split(" ");
    }
    setname({ fName: disNamear[0], LName: disNamear[1] });
    setname1({ fName: disNamear[0], LName: disNamear[1] });
    //setemail()
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/main_top.png")}
        style={{ position: "absolute", left: -140 }}
      />
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
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.proText}>
        <Text style={styles.prroText}>Edit Profile</Text>
      </View>

      <View style={styles.secCon}>
        <Image source={require("../assets/defaultUser.png")} />
        <View style={styles.nameAndpicCon}>
          <Text style={styles.naamText}>{name.fName} </Text>
          <Text style={styles.naamText}>{name.LName}</Text>
        </View>
      </View>

      <FlatList
        data={Arrays}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.SecondContain}>
              {
                //Input Fields
              }
              <View style={styles.InputTextCon}>
                <FontAwesome5
                  name="lock"
                  size={24}
                  style={{
                    alignSelf: "center",
                    //marginRight: 5
                  }}
                  color="#653CA0"
                />

                <TextInput
                  placeholder="Enter new Password"
                  value={pass}
                  onChangeText={(text) => setpass(text)}
                  secureTextEntry={showPass}
                  style={{ ...styles.textInputs, width: "78%" }}
                ></TextInput>
                <TouchableOpacity
                  onPress={() => setshowPass(!showPass)}
                  style={{}}
                >
                  <FontAwesome
                    name="eye"
                    size={20}
                    style={{
                      alignSelf: "center",
                      //  marginLeft: 3,
                      // marginRight: 5,
                    }}
                    color="#653CA0"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ ...styles.InputTextCon, marginVertical: 15 }}>
                <FontAwesome5
                  name="lock"
                  size={24}
                  style={{
                    alignSelf: "center",
                    // marginRight: 5
                  }}
                  color="#653CA0"
                />
                <TextInput
                  placeholder="Confirm new Password"
                  value={pass1}
                  onChangeText={(text) => setpass1(text)}
                  secureTextEntry={showPass1}
                  style={{ ...styles.textInputs, width: "78%" }}
                ></TextInput>

                <TouchableOpacity onPress={() => setshowPass1(!showPass1)}>
                  <FontAwesome
                    name="eye"
                    size={20}
                    style={{
                      alignSelf: "center",
                      //marginLeft: 3,
                      ///marginRight: 5,
                    }}
                    color="#653CA0"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onUpdateProfile()}
                style={styles.buttonCon}
              >
                <LinearGradient
                  colors={["#6E3AA7", "#23286B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.doneButtonWrapper}
                >
                  <Text style={styles.doneButtonText}>UPDATE PASSWORD</Text>
                </LinearGradient>
              </TouchableOpacity>
              {
                //Or LIne
              }
              <View style={styles.orCon}>
                <View style={styles.orLine} />
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "OpenSans-SemiBold",
                      width: 100,
                    }}
                  >
                    Update Name
                  </Text>
                </View>
                <View style={styles.orLine} />
              </View>
              {
                //Privacy Section Start
              }
              {/** 
                 * <View style={{ marginTop: 5 }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: "OpenSans-Regular",
                        fontSize: 16,
                        color: colors.gray,
                      }}
                    >
                      {" "}
                      Who can see your Profile ?{" "}
                    </Text>
                    <RadioGroup
                      radioGroupList={radioGroupList}
                      buttonContainerActiveStyle={{
                        backgroundColor: getRadioState.activeBgColor,
                      }}
                      buttonTextActiveStyle={{
                        color: getRadioState.activeTxtColor,
                      }}
                      buttonContainerInactiveStyle={{
                        backgroundColor: getRadioState.inActiveBgColor,
                      }}
                      buttonTextInactiveStyle={{
                        color: getRadioState.inActiveTxtColor,
                      }}
                      onChange={(value) => {
                        changeStyle(value);
                      }}
                      buttonTextStyle={{
                        fontSize: 10,
                        fontFamily: "OpenSans-Bold",
                      }}
                      buttonContainerStyle={{
                        borderRadius: 20,
                        margin: 10,
                      }}
                      containerStyle={{
                        width: "80%",
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: "OpenSans-Regular",
                      fontSize: 16,
                      color: colors.gray,
                    }}
                  >
                    Who can view your Collections ?
                  </Text>
                  <RadioGroup
                    radioGroupList={radioGroupList}
                    buttonContainerActiveStyle={{
                      backgroundColor: getRadioState1.activeBgColor,
                    }}
                    buttonTextActiveStyle={{
                      color: getRadioState1.activeTxtColor,
                    }}
                    buttonContainerInactiveStyle={{
                      backgroundColor: getRadioState1.inActiveBgColor,
                    }}
                    buttonTextInactiveStyle={{
                      color: getRadioState1.inActiveTxtColor,
                    }}
                    onChange={(value) => {
                      changeStyle1(value);
                    }}
                    buttonTextStyle={{
                      fontSize: 10,
                      fontFamily: "OpenSans-Bold",
                    }}
                    buttonContainerStyle={{
                      borderRadius: 20,
                      margin: 10,
                    }}
                    containerStyle={{
                      width: "80%",
                    }}
                  />
                </View>
                   
                {
                  //Or LIne
                }
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "78%",
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: "black",
                      alignSelf: "center",
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "OpenSans-SemiBold",
                      }}
                    >
                      Security Setting
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: "black",
                      alignSelf: "center",
                    }}
                  />
                </View>
                
                {
                  //Security Settings
                }
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontFamily: "OpenSans-Regular",
                      fontSize: 16,
                      color: colors.gray,
                    }}
                  >
                    {" "}
                    Select A security Question ?{" "}
                  </Text>
                  <Picker
                    style={{
                      height: 50,
                      width: 270,
                    }}
                    onValueChange={(itemValue, itemPosition) => {
                      console.log(itemPosition);
                      if (itemPosition == 0) {
                        setquestion("What is the name of your first pet?");
                      } else if (itemPosition == 1) {
                        setquestion("What is the middle name of your Mother?");
                      } else if (itemPosition == 2) {
                        setquestion("What is the name of your high School?");
                      } else if (itemPosition == 3) {
                        setquestion("In which City you were born?");
                      }
                    }}
                    selectedValue={getquestion}
                    mode="dropdown"
                  >
                    <Picker.Item
                      label="What is the name of your first pet?"
                      value="pet"
                    />
                    <Picker.Item
                      label="What is the middle name of your Mother?"
                      value="mothMid"
                    />
                    <Picker.Item
                      label="What is the name of your high School?"
                      value="high"
                    />
                    <Picker.Item
                      label="In which City you were born?"
                      value="born"
                    />
                  </Picker>
                  <Text
                    style={{
                      fontFamily: "OpenSans-Regular",
                      fontSize: 16,
                      color: colors.gray,
                      marginTop: -3,
                    }}
                  >
                    {" "}
                    Enter Recovery Email ?{" "}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: 265,
                      height: 45,
                      backgroundColor: "#F1E7FF",
                      borderRadius: 50,
                      paddingLeft: 10,
                      marginTop: 10,
                    }}
                  >
                    <Fontisto
                      name="email"
                      size={24}
                      style={{ alignSelf: "center", marginRight: 5 }}
                      color="#653CA0"
                    />
                    <TextInput
                      placeholder="Enter Email"
                      value={email}
                      onChangeText={(text) => setemail(text)}
                      style={{
                        width: 232,
                        height: 45,
                        borderRadius: 50,
                        paddingLeft: 10,
                        fontFamily: "OpenSans-Regular",
                      }}
                    ></TextInput>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => onSignUp()}
                  >
                    <Text style={{ marginTop: 15 }}>
                      <LinearGradient
                        colors={["#6E3AA7", "#23286B"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.doneButtonWrapper}
                      >
                        <Text style={styles.doneButtonText}>UPDATE INFO</Text>
                      </LinearGradient>
                    </Text>
                  </TouchableOpacity>
                  <Image
                    source={require("../assets/EditProfile1.png")}
                    style={{
                      marginTop: 20,
                      marginBottom: 50,
                      left: 30,
                    }}
                  />
                </View>
                  */}
              {/** 
      <View style={styles.container}>
        <Image
          style={styles.ImagesSty}
          source={require("../Images/WelcomePageLogo.png")}
        />
        <View style={styles.internalContents}>
          <Text style={styles.text}>Edit Profile</Text>
          <Text style={{ ...styles.label, marginBottom: -5 }}>First Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={name.fName}
              onChangeText={(text) =>
                setname({ fName: text, LName: name.LName })
              }
            />
          </View>
          <Text style={{ ...styles.label, marginBottom: -5 }}>Last Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Last Name"
              value={name.LName}
              onChangeText={(text) =>
                setname({ fName: name.fName, LName: text })
              }
            />
          </View>
          <Text style={{ ...styles.label, marginBottom: -5 }}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder=" Password"
              value={pass}
              onChangeText={(text) => setpass(text)}
              secureTextEntry
            />
          </View>
        </View>

        <View
          style={{
            ...styles.button,
            marginBottom: -5,
            flexDirection: "row",
            marginLeft: 5,
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <CustomButton
            text="Update"
            color="green"
            onPressEvent={() => onUpdateProfile()}
          />
          <CustomButton
            text="Cancel"
            color="red"
            onPressEvent={() => navigation.navigate("Dashboard")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: 20,
            justifyContent: "space-between",
            width: "50%",
            alignSelf: "center",
          }}
        >
          <Text style={styles.Hitext}>Have an Account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <Text style={{ ...styles.label, alignSelf: "center", margin: 9 }}>
              SignIn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      */}
              <View style={styles.InputTextCon}>
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
                  placeholder="Enter First Name"
                  value={name1.fName}
                  onChangeText={(text) => {
                    setname1({ fName: text, LName: name1.LName });
                    setchanged(false);
                  }}
                  style={styles.textInputs}
                ></TextInput>
              </View>
              <View style={{ ...styles.InputTextCon, marginVertical: 15 }}>
                <FontAwesome5
                  name="lock"
                  size={24}
                  style={{
                    alignSelf: "center",
                    // marginRight: 5
                  }}
                  color="#653CA0"
                />
                <TextInput
                  placeholder="Enter Last Name"
                  value={name1.LName}
                  onChangeText={(text) => {
                    setname1({ fName: name1.fName, LName: text });
                    setchanged(false);
                  }}
                  style={styles.textInputs}
                ></TextInput>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onUpdateName()}
                disabled={changed}
                style={styles.buttonCon}
              >
                <LinearGradient
                  colors={["#6E3AA7", "#23286B"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.doneButtonWrapper}
                >
                  <Text style={styles.doneButtonText}>UPDATE NAME</Text>
                </LinearGradient>
              </TouchableOpacity>
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
    //  backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: 'center',
    //paddingTop: 40,
  },
  buttonCon: {
    width: "70%",
    // marginTop: 15,
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
  backButton: {
    marginTop: "8%",
    marginLeft: "5%",
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
  backText: {
    alignSelf: "center",
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    color: colors.gray,
  },
  proText: {
    // flexDirection: "column",
    //   marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  prroText: {
    //   marginTop: 50,
    //    marginLeft: 45,
    fontSize: 24,
    fontFamily: "OpenSans-Bold",
  },
  secCon: {
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  nameAndpicCon: {
    flexDirection: "row",
    // marginLeft: 5,
    marginTop: 3,
    // backgroundColor: "red",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  naamText: {
    // marginLeft: 5,
    fontFamily: "OpenSans-Bold",
    color: colors.gray,
  },
  SecondContain: {
    flexDirection: "column",
    marginTop: 15,
    justifyContent: "center",
    // alignItems: "center",
    //  marginLeft: 65,alignSelf: "center",
  },
  InputTextCon: {
    flexDirection: "row",
    width: "70%",
    height: 45,
    backgroundColor: "#F1E7FF",
    borderRadius: 10,
    paddingHorizontal: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textInputs: {
    width: "90%",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 5,
    fontFamily: "OpenSans-Regular",
    alignSelf: "center",
  },
  orCon: {
    flexDirection: "row",
    alignItems: "center",
    width: "78%",
    marginVertical: 15,
    alignSelf: "center",
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
    alignSelf: "center",
  },
});

export default EditProfile;
