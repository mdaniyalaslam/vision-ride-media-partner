import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, Images, Metrix, NavigationService } from "../config";
import { fonts } from "../config/Constants";
import { useTheme } from "@react-navigation/native";
import Home from "../screens/Apps/Home";
import Profile from "../screens/Apps/Profile";
import More from "../screens/Apps/More";
import AddCar from "../screens/Apps/AddCar";
import Ionicons from "react-native-vector-icons/Ionicons";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { Support, Auctions, Orders, SupportMain, MyOrders } from "../screens";
import TextComponent from "./TextComponent";
import Badge from "./Badge";
const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          marginBottom: isKeyboardVisible ? -350 : 0,
          height: Metrix.VerticalSize(70),
          paddingTop: 16,

          backgroundColor: Colors.white,
          ...Platform.select({
            ios: {
              shadowColor: Colors.black,
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            },
            android: {
              elevation: 5,
            },
          }),
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <View style={styles.tabContainer}>
                <Image
                  source={Images.home}
                  resizeMode="contain"
                  style={[
                    styles.tabIcon,
                    { tintColor: focused ? Colors.primary : Colors.textColor },
                  ]}
                />
              </View>
              <TextComponent
                text="Vehicles"
                customStyles={styles.tabLabel(focused)}
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <View style={styles.tabContainer}>
                <Ionicons
                  name={"file-tray"}
                  color={focused ? Colors.primary : Colors.textColor}
                  size={22}
                />
              </View>
              <TextComponent
                text="Orders"
                customStyles={styles.tabLabel(focused)}
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="_AddCar"
        component={AddCar}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              style={{ ...styles.fabContainer }}
              onPress={() =>
                NavigationService.navigate("AddCar", { cardAdded: false })
              }
            >
              <View style={styles.fabButton}>
                <Image
                  source={Images.add}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="SupportMain"
        component={SupportMain}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <View style={styles.tabContainer}>
                <Entypo
                  name={"message"}
                  color={focused ? Colors.primary : Colors.textColor}
                  size={22}
                />
              </View>
              <TextComponent
                text="Support"
                customStyles={styles.tabLabel(focused)}
              />
              <Badge />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ focused }) => (
            <>
              <View style={styles.tabContainer}>
                <Image
                  source={Images.more}
                  resizeMode="contain"
                  style={[
                    styles.tabIcon,
                    { tintColor: focused ? Colors.primary : Colors.textColor },
                  ]}
                />
              </View>
              <TextComponent
                text="More"
                customStyles={styles.tabLabel(focused)}
              />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 18,
    height: 18,
    alignItems: "center",
  },
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
    // marginTop: 40,
  },
  tabLabel: (focused) => ({
    color: focused ? Colors.primary : Colors.textColor,
    fontFamily: focused ? fonts.SemiBold : fonts.Regular,
    // fontSize: Metrix.customFontSize(12),
    marginTop: 10,
    width: 70,
    textAlign: "center",
  }),
  fabContainer: {
    top: -30, // Adjust as needed to position the FAB
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  fabButton: {
    backgroundColor: Colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fabText: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default BottomTabs;
