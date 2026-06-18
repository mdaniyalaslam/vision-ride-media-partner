import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors, Images, Metrix, NavigationService } from "../config";
import { fonts } from "../config/Constants";
import { imageBaseUrl } from "../config/ApiCaller";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextComponent from "./TextComponent";
import Tag from "./Tag";

// Normalize a single image entry (string | object) to a usable URI
const toImageUri = (img) => {
  if (!img) return null;
  const path =
    typeof img === "string"
      ? img
      : img?.image_url ??
        img?.image_path ??
        img?.path ??
        img?.url ??
        img?.image;
  if (!path) return null;
  return /^https?:\/\//i.test(path) ? path : imageBaseUrl + path;
};

// Pull the first available image for the thumbnail
const getThumbnail = (item) => {
  const list = Array.isArray(item?.images) ? item.images : [];
  for (const img of list) {
    const uri = toImageUri(img);
    if (uri) return uri;
  }
  const singles = [
    item?.image_front,
    item?.front_view,
    item?.image_rear,
    item?.image,
    item?.thumbnail,
  ];
  for (const s of singles) {
    const uri = toImageUri(s);
    if (uri) return uri;
  }
  return null;
};

const HomeItemComponent = ({ item }) => {
  const make = item?.make ?? "";
  const model = item?.model ?? "";
  const title = `${make} ${model}`.trim() || "Vehicle";
  const regNumber = item?.registration_number ?? "—";
  const year = item?.year ?? "—";
  const mileage = item?.avg_monthly_mileage ?? null;
  const monthlyAmount = item?.monthlyAmount ?? null;
  const status = (item?.status ?? "").toString().toLowerCase();

  const statusId =
    status === "active" || status === "approved"
      ? 2
      : status === "pending"
      ? 1
      : status === "inactive" || status === "rejected"
      ? 3
      : 1;

  const thumbnail = getThumbnail(item);

  const goToDetails = () => {
    NavigationService.navigate("VehicleDetails", { vehicle: item });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={goToDetails}
      style={styles.itemContainer}
    >
      <View style={{ ...styles.row, padding: 10 }}>
        <Image
          source={thumbnail ? { uri: thumbnail } : Images.car}
          style={styles.carImage}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            width: Metrix.HorizontalSize(140),
          }}
        >
          <TextComponent text={title} isTitle customStyles={{ fontSize: 14 }} />
          <TextComponent
            text={`Reg. No. ${regNumber}`}
            customStyles={{ fontSize: 14, marginVertical: 5 }}
          />
          <TextComponent
            text={`Year ${year}`}
            customStyles={{ fontSize: 14 }}
          />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity onPress={goToDetails}>
            <Ionicons
              name={"chevron-forward-circle"}
              color={Colors.primary}
              size={36}
              style={{ marginBottom: 5 }}
            />
          </TouchableOpacity>
          <Tag
            text={status.charAt(0).toUpperCase() + status.slice(1)}
            id={statusId}
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
            Avg. Monthly Mileage
          </Text>
          <TextComponent
            text={mileage ? `${mileage} mi` : "—"}
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
            Monthly Amount
          </Text>
          <TextComponent
            text={monthlyAmount ? `$${monthlyAmount}` : "—"}
            customStyles={styles.itemName}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeItemComponent;

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
