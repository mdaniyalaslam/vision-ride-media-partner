import {
  View,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Colors, Images, Metrix } from "../../config";
import {
  HeroHeader,
  OrderItemComponent,
  TextComponent,
} from "../../components";
import { HomeMiddleware } from "../../redux/Middlewares";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const MyOrders = () => {
  const { user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(() => {
    dispatch(HomeMiddleware.GetOrders(user?.token))
      .then((res) => {
        console.log("GetOrders (MyOrders):", res?.data);
        setOrders(res?.data.orders ?? []);
      })
      .catch((err) => console.warn("GetOrders Error:", err))
      .finally(() => setRefreshing(false));
  }, [user?.token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchOrders);
    return unsubscribe;
  }, [navigation, fetchOrders]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  return (
    <View style={styles.container}>
      <HeroHeader title={"Orders"} />
      <FlatList
        data={orders}
        style={{ flex: 1 }}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
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
          <View style={{ height: Metrix.HorizontalSize(120) }} />
        )}
        renderItem={({ item, index }) => (
          <OrderItemComponent item={item} index={index} />
        )}
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
  emptyContainer: {
    alignItems: "center",
    marginTop: Metrix.VerticalSize(30),
  },
  avatar: {
    width: 380,
    resizeMode: "contain",
    height: 280,
    alignSelf: "center",
    marginTop: Metrix.VerticalSize(25),
  },
});
