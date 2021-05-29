import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import {
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";

import { AuthContext } from "./context";
import WelcomeScreen from "./Screens/WelcomePage";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";
import Prefrences from "./Screens/Prefrences";
import Search from "./Screens/Search";
import DashBoard from "./Screens/Dashboard";
import ListDisplay from "./Screens/ListDisplay";
import EditProfile from "./Screens/EditProfile";
import BookLibrary from "./Screens/BookLibrary";
import Onboard from "./component/onboard";
import ForgotPassword from "./Screens/ForgotPassword";
import bookDetails from "./Screens/bookDetails";
import Reader from "./Screens/pdfReader";
import AudioLibray from "./Screens/audioLibray";
import audioDetails from "./Screens/audioDetails";
import audioSettings from "./Screens/audioSettings";
import audioPlayer from "./Screens/audioPlayer";
import collections from "./Screens/collestions";
import TextReader from "./Screens/TextReader";
import bookSuggestions from "./Screens/bookSuggestions";
import socailSegment from "./Screens/socailSeg";
import Blind from "./Screens/Blind";
import Slidebar from "./Slidebar";

import * as firebase from "firebase";
import * as firebaseBooksData from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();
export default function App() {
  const [showOnboard, setShowonBoard] = useState(true);
  const [fontLoading, setfontLoading] = useState(false);
  const [userToken, setuserToken] = useState(null);

  const authContext = React.useMemo(() => {
    return {
      SignInco: async () => {
        await AsyncStorage.setItem("status", "notBlind");
        await AsyncStorage.setItem("userId", firebase.auth().currentUser.uid);
        setuserToken("notBlind");
      },
      Signoutco: async () => {
        await AsyncStorage.setItem("status", "null");
        await AsyncStorage.removeItem("userId");
        setuserToken(null);
      },
      SignInBlind: async () => {
        await AsyncStorage.setItem("status", "blind");
        await AsyncStorage.setItem("userId", firebase.auth().currentUser.uid);
        setuserToken("blind");
      },
    };
  }, []);

  const DrawerScreen = () => (
    <Drawer.Navigator
      drawerType="slide"
      drawerStyle={{
        //backgroundColor: 'lightblue',
        width: "60%",
      }}
      drawerContent={(props) => <Slidebar {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerLabel: "Dashboard",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={24}
              color="#653CA0"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchScreen}
        options={{
          drawerLabel: "Search",
          drawerIcon: () => <Feather name="search" size={24} color="#653CA0" />,
        }}
      />
      <Drawer.Screen
        name="bookslibrary"
        component={BooksLibraryScreen}
        options={{
          drawerLabel: "Books Library",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="library-shelves"
              size={24}
              color="#653CA0"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="audioLibray"
        component={audioLibrayScreen}
        options={{
          drawerLabel: "Audio Library",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="audiobook"
              size={24}
              color="#653CA0"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="collections"
        component={collectionsScreen}
        options={{
          drawerLabel: "Collection",
          drawerIcon: () => (
            <MaterialIcons name="collections" size={24} color="#653CA0" />
          ),
        }}
      />
      <Drawer.Screen
        name="bookSuggestions"
        component={bookSuggestionsScreen}
        options={{
          drawerLabel: "Suggestion",
          drawerIcon: () => <Feather name="sun" size={24} color="#653CA0" />,
        }}
      />
      <Drawer.Screen
        name="socailSegment"
        component={socailSegmentScreen}
        options={{
          drawerLabel: "Socail",
          drawerIcon: () => (
            <Fontisto name="world-o" size={24} color="#653CA0" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
  const DrawerScreen1 = () => (
    <Drawer.Navigator
      drawerType="slide"
      drawerStyle={{
        //backgroundColor: 'lightblue',
        width: "60%",
      }}
      drawerContent={(props) => <Slidebar {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Blind}
        options={{
          drawerLabel: "Dashboard",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={24}
              color="#653CA0"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
  const RootStackScreen = ({ userToken }) => {
    return (
      <RootStack.Navigator headerMode="none">
        {userToken == "notBlind" ? (
          <RootStack.Screen name="App" component={DrawerScreen} />
        ) : userToken == null ? (
          <RootStack.Screen name="Auth" component={AuthStackScreen} />
        ) : (
          <RootStack.Screen name="App1" component={DrawerScreen1} />
        )}
      </RootStack.Navigator>
    );
  };
  const AuthStackScreen = () => (
    <AuthStack.Navigator
      initialRouteName={"Signin"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Signin" component={SignIn} />
      <AuthStack.Screen name="Signup" component={SignUp} />
      <AuthStack.Screen name="ForgotPass" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
  useEffect(() => {
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
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    ChechStates();
  }, []);

  const ChechStates = async () => {
    //await AsyncStorage.clear();
    const slid = await AsyncStorage.getItem("onboard");
    if (slid != undefined) {
      if (slid == "false") {
        setShowonBoard(false);
      } else {
        setShowonBoard(true);
      }
    } else {
      setShowonBoard(true);
    }
    const stat = await AsyncStorage.getItem("status");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (stat != undefined) {
          if (stat == "notBlind") {
            setuserToken("notBlind");
          } else if (stat == "null") {
            setuserToken(null);
          } else if (stat == "blind") {
            setuserToken("blind");
          }
        } else {
          setuserToken(null);
        }
      } else {
        console.log("here");
      }
    });
  };

  const fetchFont = () =>
    Font.loadAsync({
      "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
      "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
      "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
      "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    });

  const SearchScreen = () => {
    return (
      <Stack.Navigator
        initialRouteName={"Search"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="bookDetails" component={bookDetails} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    );
  };

  const BooksLibraryScreen = () => {
    return (
      <Stack.Navigator
        initialRouteName={"bookslibrary"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="bookslibrary" component={BookLibrary} />
        <Stack.Screen name="reader" component={Reader} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="TextReader" component={TextReader} />
      </Stack.Navigator>
    );
  };
  const audioLibrayScreen = () => {
    return (
      <Stack.Navigator
        initialRouteName={"audioLibray"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="audioLibray" component={AudioLibray} />
        <Stack.Screen name="audioDetails" component={audioDetails} />
        <Stack.Screen name="audioSettings" component={audioSettings} />
        <Stack.Screen name="audioPlayer" component={audioPlayer} />
      </Stack.Navigator>
    );
  };
  const bookSuggestionsScreen = () => {
    return (
      <Stack.Navigator
        initialRouteName={"bookSuggestions"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="bookSuggestions" component={bookSuggestions} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="bookDetails" component={bookDetails} />
      </Stack.Navigator>
    );
  };
  const socailSegmentScreen = () => {
    return (
      <Stack.Navigator
        initialRouteName={"socailSegment"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="socailSegment" component={socailSegment} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    );
  };

  const collectionsScreen = () => {
    return (
      <Stack.Navigator
        initialRouteName={"collections"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="collections" component={collections} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    );
  };
  const DashboardScreen = () => {
    return (
      <Stack.Navigator
        initialRouteName={"Dashboard"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Dashboard" component={DashBoard} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    );
  };
  const stacknavigator = (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />

        {/**
      <Stack.Navigator
        initialRouteName={"welcome"}
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "center",
          headerTintColor: "black", // change header color
          headerStyle: {
            backgroundColor: "lightblue",
          },
          headerRight: () => <Button title="Edit"></Button>,
        }}
      >
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="Signin"
          component={SignIn}
          options={{
            //title:
            //headerShown: false,
            // headerTitleAlign: "center",
            // headerTintColor: 'black', // change header color
            // headerStyle:{
            //   backgroundColor: 'lightblue',
            // }
            headerRight: () => {},
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={
            {
              //headerShown: true,
            }
          }
        />
        <Stack.Screen name="Dashboard" component={DashBoard} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="list" component={List} />
        <Stack.Screen name="bookslibrary" component={BookLibrary} />
        <Stack.Screen name="ForgotPass" component={ForgotPassword} />
        <Stack.Screen name="bookDetails" component={bookDetails} />
        <Stack.Screen name="reader" component={Reader} />
        <Stack.Screen name="audioLibray" component={AudioLibray} />
        <Stack.Screen name="audioDetails" component={audioDetails} />
        <Stack.Screen name="audioSettings" component={audioSettings} />
        <Stack.Screen name="audioPlayer" component={audioPlayer} />
        <Stack.Screen name="collections" component={collections} />
        <Stack.Screen name="bookSuggestions" component={bookSuggestions} />
        <Stack.Screen name="socailSegment" component={socailSegment} />
      </Stack.Navigator>
     */}
      </NavigationContainer>
    </AuthContext.Provider>
  );

  const handleOnboardFinish = () => {
    setShowonBoard(false);
  };
  if (fontLoading) {
    return (
      <>
        {showOnboard && <Onboard handleDone={handleOnboardFinish} />}
        {!showOnboard && stacknavigator}
      </>
    );
  } else {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setfontLoading(true)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
