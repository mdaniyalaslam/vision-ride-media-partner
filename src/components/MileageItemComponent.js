import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors, Images, Metrix, NavigationService } from "../config";
import { fonts } from "../config/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextComponent from "./TextComponent";

const MileageItemComponent = ({ item }) => {
  const mileage = item?.mileage ?? "";
  const month = item?.month ?? "";
  const image = item?.image ? { uri: item.image } : Images.dummy_car;

  const handlePress = () => {
    NavigationService.navigate("MonthlyDetail", { item });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <Image source={image} style={styles.carImage} resizeMode="cover" />

      <View style={styles.info}>
        <TextComponent text="Mileage" customStyles={styles.label} />
        <TextComponent text={`${mileage}km`} customStyles={styles.value} />
        <TextComponent text="Month of" customStyles={styles.label} />
        <TextComponent text={month} customStyles={styles.monthValue} />
      </View>

      <Ionicons
        name="chevron-forward-circle"
        size={Metrix.customFontSize(36)}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

export default MileageItemComponent;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: Metrix.VerticalSize(12),
    padding: Metrix.HorizontalSize(12),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  carImage: {
    width: 100,
    height: 60,
    borderRadius: 12,
    marginRight: Metrix.HorizontalSize(14),
  },
  info: {
    flex: 1,
  },
  label: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
  },
  value: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(18),
    color: Colors.primary,
    marginBottom: Metrix.VerticalSize(4),
  },
  monthValue: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(14),
    color: Colors.primary,
  },
});
