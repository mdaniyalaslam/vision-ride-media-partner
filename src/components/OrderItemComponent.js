import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors, Metrix, NavigationService } from "../config";
import { fonts } from "../config/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextComponent from "./TextComponent";

const monthYear = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const OrderItemComponent = ({ item }) => {
  // The list item is a campaign-vehicle; the actual order (if any) is nested
  const orders = Array.isArray(item?.orders) ? item.orders : [];
  const order = orders[orders.length - 1] ?? null;
  const hasOrder = !!order;

  // No order yet → pending; an existing order means the report was submitted
  const orderNumber = order?.order_number ?? String(item?.id ?? "—");
  const period = monthYear(order?.order_date ?? item?.created_at);
  const subtitle = `${hasOrder ? "Submitted" : "Pending"}${
    period ? ` for ${period}` : ""
  }`;

  const getOrderDetails = () => {
    NavigationService.navigate("OrderDetails", { order: item });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={getOrderDetails}
      style={styles.itemContainer}
    >
      <View style={{ ...styles.row, padding: 14, alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <TextComponent text="Order Number" customStyles={styles.label} />
          <TextComponent text={String(orderNumber)} customStyles={styles.orderNumber} />
          {subtitle ? (
            <TextComponent text={subtitle} customStyles={styles.subtitle} />
          ) : null}
        </View>
        <Ionicons
          name={"chevron-forward-circle"}
          color={Colors.primary}
          size={36}
        />
      </View>
    </TouchableOpacity>
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
  label: {
    fontSize: Metrix.customFontSize(13),
    fontFamily: fonts.Bold,
    color: Colors.primary,
    marginBottom: Metrix.VerticalSize(8),
  },
  orderNumber: {
    fontSize: Metrix.customFontSize(16),
    fontFamily: fonts.Bold,
    color: Colors.textColor,
    marginBottom: Metrix.VerticalSize(4),
  },
  subtitle: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Regular,
    color: Colors.grayText,
  },
});
