import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Colors, Images, Metrix } from "../../config";
import {
  AuctionItemComponent,
  Button,
  DropdownField,
  Header,
  HeroHeader,
  OrderItemComponent,
  TextComponent,
} from "../../components";
import { fonts } from "../../config/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HomeMiddleware } from "../../redux/Middlewares";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import HomeItemComponent from "../../components/HomeItemComponent";

const MyOrders = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <HeroHeader title={"Orders"} />

      <FlatList
        data={[1]}
        style={{
          height: Metrix.VerticalSize(440),
        }}
        ListEmptyComponent={() => (
          <View style={{ margin: 25 }}>
            <Image source={Images.noData} style={styles.avatar} />

            <TextComponent
              customStyles={{
                textAlign: "center",
                fontSize: 30,
                color: Colors.primary,
              }}
              isTitle
              text="You don't have any orders yet."
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ height: Metrix.HorizontalSize(120) }}></View>
        )}
        renderItem={({ item, index }) => {
          return <OrderItemComponent item={item} index={index} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatar: {
    width: 380,
    resizeMode: "contain",
    height: 280,
    alignSelf: "center",
    marginTop: Metrix.VerticalSize(25),
    // marginHorizontal: Metrix.HorizontalSize(15),
    // height: 40,
    // borderRadius: Metrix.HorizontalSize(100),
  },
});
