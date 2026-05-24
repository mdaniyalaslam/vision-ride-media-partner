import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Colors, Images, Metrix, NavigationService } from "../../config";
import { Button, Header, MileageItemComponent } from "../../components";
import { fonts } from "../../config/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";

const MonthlyMileage = ({ route }) => {
  const data = route?.params?.data ?? [1];

  const handleAdd = () => {
    NavigationService.navigate("AddMonthlyMileage");
  };


  return (
    <>
      <Header
        backIcon={true}
        title="Monthly mileage"
        notificationIcon={false}
      />

      <View style={styles.container}>
        {data.length === 0 ? (
          /* ── Empty state ── */
          <View style={styles.emptyContainer}>
            <Image
              source={Images.noData}
              style={styles.noDataImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>
              You don't have{"\n"}monthly data.
            </Text>
            <Button
              title="Add Monthly Mileage"
              onPress={handleAdd}
              buttonStyle={styles.addBtn}
              preIcon={
                <Ionicons
                  name="add-circle-outline"
                  size={Metrix.customFontSize(20)}
                  color={Colors.white}
                  style={{ marginRight: 6 }}
                />
              }
            />
          </View>
        ) : (
          /* ── Data state ── */
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={
              <Button
                title="Add Monthly Mileage"
                onPress={handleAdd}
                buttonStyle={styles.addBtn}
                preIcon={
                  <Ionicons
                    name="add-circle-outline"
                    size={Metrix.customFontSize(20)}
                    color={Colors.white}
                    style={{ marginRight: 6 }}
                  />
                }
              />
            }
            renderItem={({ item }) => (
              <MileageItemComponent item={item} />
            )}
          />
        )}
      </View>
    </>
  );
};

export default MonthlyMileage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // ── Empty state ──
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Metrix.HorizontalSize(24),
  },
  noDataImage: {
    width: Metrix.HorizontalSize(280),
    height: Metrix.VerticalSize(260),
    marginBottom: Metrix.VerticalSize(24),
  },
  emptyText: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(26),
    color: Colors.primary,
    textAlign: "center",
    lineHeight: Metrix.customFontSize(36),
    marginBottom: Metrix.VerticalSize(28),
  },
  // ── List state ──
  listContent: {
    padding: Metrix.HorizontalSize(16),
    paddingBottom: Metrix.VerticalSize(40),
  },
  addBtn: {
    width: "100%",
    height: Metrix.VerticalSize(52),
    borderRadius: 10,
    marginBottom: Metrix.VerticalSize(16),
  },
});
