import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors, Images, Metrix, NavigationService } from "../config";
import { fonts, priceFormatter } from "../config/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextComponent from "./TextComponent";
import { HomeMiddleware } from "../redux/Middlewares";
import { useDispatch, useSelector } from "react-redux";
import Tag from "./Tag";

const OrderItemComponent = ({ item, index }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const product = item?.product || {};
  const STATUS =
    item?.status == "active"
      ? "Winning"
      : item?.status === "outbid"
      ? "Outbid"
      : item?.status === "won"
      ? "Won"
      : item?.status === "lost"
      ? "Lost"
      : "Unknown";
  const secondsLeft = Math.floor(
    (new Date(product?.end_date) - new Date()) / 1000,
  );

  const getAuctionDetails = () => {
    NavigationService.navigate("OrderDetails");
    return;
    dispatch(HomeMiddleware.GetAuctionDetails(product.id, user?.token)).then(
      (res) => {
        NavigationService.navigate("AuctionDetails", {
          auctionId: product.id,
          details: res,
          comingFrom: "home",
        });
      },
    );
  };

  return (
    <View style={styles.itemContainer}>
      <View style={{ ...styles.row, padding: 10 }}>
        {/* <Image source={{ uri: product?.thumbnail }} style={styles.carImage} /> */}
        <Image source={Images.car} style={styles.carImage} />
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            width: Metrix.HorizontalSize(140),
          }}
        >
          <TextComponent
            text={"product?.title"}
            isTitle
            customStyles={{ fontSize: 14 }}
          />
          <TextComponent
            text={"Reg. No. ABC-321"}
            customStyles={{ fontSize: 14, marginVertical: 5 }}
          />
          <TextComponent text={"Year 2026"} customStyles={{ fontSize: 14 }} />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity onPress={getAuctionDetails}>
            <Ionicons
              name={"chevron-forward-circle"}
              color={Colors.primary}
              size={36}
              style={{ marginBottom: 5 }}
            />
          </TouchableOpacity>
          <Tag
            text={STATUS}
            id={
              item?.status == "active"
                ? 2
                : item?.status == "outbid"
                ? 1
                : item?.status == "won"
                ? 2
                : item?.status == "lost"
                ? 3
                : 0
            }
          />
        </View>
      </View>

      <View
        style={{
          height: 1,
          width: "100%",
          marginTop: Metrix.VerticalSize(10),
          backgroundColor: Colors.lineColor,
        }}
      />

      <View
        style={{
          ...styles.row,
          paddingHorizontal: 10,
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...styles.itemDescription,
              fontSize: Metrix.customFontSize(10),
            }}
          >
            Order ID
          </Text>
          {/* <Text style={styles.itemName}>$1</Text> */}
          <TextComponent
            text={priceFormatter(product?.current_price)}
            customStyles={styles.itemName}
          />
        </View>
        {/*  */}
        <View
          style={{
            height: Metrix.VerticalSize(55),
            marginLeft: 5,
            width: 1,
            backgroundColor: Colors.lineColor,
          }}
        />
        {/*  */}
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...styles.itemDescription,
              fontSize: Metrix.customFontSize(10),
            }}
          >
            Order Date
          </Text>
          {/* <Text style={styles.itemName}>12 Jan 24</Text> */}
          <TextComponent
            text={priceFormatter(item?.bid_amount)}
            customStyles={styles.itemName}
          />
        </View>
      </View>
      {/* TIMER */}
    </View>
  );
};

export default OrderItemComponent;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginTop: Metrix.VerticalSize(16),
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,
    borderColor: Colors.primary,
    borderWidth: 0.5,

    paddingTop: Metrix.VerticalSize(10),
    marginHorizontal: Metrix.HorizontalSize(20),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  carImage: {
    width: 70,
    height: 50,
    borderRadius: 20,
    marginRight: 10,
  },

  rightArrow: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  itemName: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.SemiBold,
    color: Colors.primary,
    marginBottom: 4,
    textAlign: "center",
  },
  itemDescription: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Medium,
    color: Colors.grayText,
    textAlign: "center",
    marginBottom: 7,
  },
  itemDescription2: {
    fontSize: Metrix.customFontSize(9),
    fontFamily: fonts.Regular,
    color: Colors.background,
    marginLeft: 5,
  },
});
