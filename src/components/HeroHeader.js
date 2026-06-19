import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React from "react";
import { Colors, Images, Metrix, NavigationService } from "../config";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useTheme } from "@react-navigation/native";
import { fonts } from "../config/Constants";
import { useSelector } from "react-redux";
import TextComponent from "./TextComponent";
export default function HeroHeader({ title = null }) {
  const navigation = useNavigation();
  const user = useSelector((state) => state.AuthReducer?.user?.user);
  return (
    <View style={styles.containerTopRound}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image source={Images.logo} style={styles.avatar} />
        <Text numberOfLines={1} style={styles.title}>
          Hi, {user?.full_name}
        </Text>
      </View>
      {/* <TouchableOpacity
        style={{
          backgroundColor: Colors.white,
          borderRadius: 100,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        activeOpacity={0.6}
        onPress={() => NavigationService.navigate('Notification')}
      >
        <FontAwesome name={'bell'} color={Colors.primary} size={20} />
      </TouchableOpacity> */}
      {/* <Badge /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 50,
    // borderRadius: Metrix.HorizontalSize(100),
    resizeMode: "contain",
  },
  containerTopRound: {
    height: Metrix.isApi35 ? 110 : Metrix.isIOS ? 110 : 70,
    backgroundColor: Colors.primary,
    padding: 18,
    paddingTop: Metrix.isApi35 ? 50 : Metrix.isIOS ? 50 : 10,
  },
  title: {
    fontSize: Metrix.customFontSize(21),
    fontFamily: fonts.SemiBold,
    color: Colors.white,
    marginTop: 10,
    width: "55%",
    textAlign: "right",
  },
});
