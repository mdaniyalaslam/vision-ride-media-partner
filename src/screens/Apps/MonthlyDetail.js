import { View, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { Colors, Images, Metrix } from "../../config";
import { Header, TextComponent } from "../../components";
import { fonts } from "../../config/Constants";

const POSITION_IMAGES = [
  { label: "Front View", key: "front" },
  { label: "Rear View", key: "rear" },
  { label: "Left Side View", key: "leftSide" },
  { label: "Right Side View", key: "rightSide" },
];

const MonthlyDetail = ({ route }) => {
  const item = route?.params?.item ?? {};

  const mileage = item?.mileage ?? "—";
  const dashboardImage = item?.dashboardImage
    ? { uri: item.dashboardImage }
    : Images.dummy_car;
  const vehicleImages = item?.images ?? {};

  return (
    <>
      <Header
        backIcon={true}
        title="Monthly details"
        notificationIcon={false}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Dashboard / mileage card ── */}
        <View style={styles.mileageCard}>
          <Image
            source={dashboardImage}
            style={styles.dashboardImage}
            resizeMode="cover"
          />
          <TextComponent
            text="Avg. Monthly Mileage"
            customStyles={styles.avgLabel}
          />
          <TextComponent
            text={`${mileage}km`}
            customStyles={styles.mileageValue}
          />
        </View>

        {/* ── Vehicle position images grid ── */}
        <View style={styles.grid}>
          {POSITION_IMAGES.map(({ label, key }) => {
            const uri = vehicleImages[key];
            return (
              <View key={key} style={styles.gridCard}>
                <Image
                  source={uri ? { uri } : Images.dummy_car}
                  style={styles.gridImage}
                  resizeMode="cover"
                />
                <TextComponent text={label} customStyles={styles.gridLabel} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default MonthlyDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: Metrix.HorizontalSize(16),
    paddingBottom: Metrix.VerticalSize(40),
  },

  // ── Mileage card ──
  mileageCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: Metrix.VerticalSize(20),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  dashboardImage: {
    width: "100%",
    height: Metrix.VerticalSize(200),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  avgLabel: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(13),
    color: Colors.textColor,
    textAlign: "center",
    marginTop: Metrix.VerticalSize(12),
  },
  mileageValue: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(22),
    color: Colors.primary,
    textAlign: "center",
    marginVertical: Metrix.VerticalSize(8),
  },

  // ── Position image grid ──
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridCard: {
    width: "48%",
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: Metrix.VerticalSize(16),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  gridImage: {
    width: "100%",
    height: Metrix.VerticalSize(120),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  gridLabel: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(13),
    color: Colors.textColor,
    textAlign: "center",
    paddingVertical: Metrix.VerticalSize(10),
  },
});
