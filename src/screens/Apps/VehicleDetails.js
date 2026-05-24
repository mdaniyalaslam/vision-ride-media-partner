import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React from "react";
import { Colors, Metrix } from "../../config";
import { Button, Header, ImageSwiperComponent } from "../../components";
import { fonts } from "../../config/Constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const InfoRow = ({ label, value, isLast = false }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value ?? "—"}</Text>
  </View>
);

const VehicleDetails = ({ route }) => {
  const vehicle = route?.params?.vehicle ?? {};

  const images = vehicle?.images ?? [];
  const status = vehicle?.status ?? "Active";
  const make = vehicle?.make ?? "";
  const model = vehicle?.model ?? "";
  const modelCode = vehicle?.modelCode ?? "";
  const type = vehicle?.type ?? "";
  const year = vehicle?.year ?? "";
  const registrationNumber = vehicle?.registrationNumber ?? "";
  const avgMonthlyMileage = vehicle?.avgMonthlyMileage ?? "";
  const monthlyAmount = vehicle?.monthlyAmount ?? "";

  const handleUpdate = () => {
    // navigate to edit/update screen
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Vehicle",
      "Are you sure you want to delete this vehicle?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => {} },
      ],
    );
  };

  return (
    <>
      <Header
        backIcon={true}
        title={make ? `${make} ${model}` : "Vehicle Details"}
        notificationIcon={false}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* <ImageSwiperComponent data={images} /> */}

        <Text style={styles.sectionTitle}>Vehicle Information</Text>

        <View style={styles.card}>
          {/* Status row — badge instead of plain text */}
          <View style={[styles.infoRow, styles.infoRowBorder]}>
            <Text style={styles.infoLabel}>Status</Text>
            <View
              style={[
                styles.statusBadge,
                status?.toLowerCase() === "active"
                  ? styles.statusActive
                  : styles.statusInactive,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  status?.toLowerCase() === "active"
                    ? styles.statusTextActive
                    : styles.statusTextInactive,
                ]}
              >
                {status}
              </Text>
            </View>
          </View>

          <InfoRow label="Make" value={make} />
          <InfoRow label="Model" value={model} />
          <InfoRow label="Model code" value={modelCode} />
          <InfoRow label="Type" value={type} />
          <InfoRow label="Year" value={year} />
          <InfoRow label="Registration Number" value={registrationNumber} />
          <InfoRow
            label="Avg. Monthly Mileage"
            value={avgMonthlyMileage ? `${avgMonthlyMileage} km` : "—"}
          />
          <InfoRow
            label="Monthly Amount"
            value={monthlyAmount ? `$${monthlyAmount}` : "—"}
            isLast
          />
        </View>

        <Button
          title="Update"
          onPress={handleUpdate}
          buttonStyle={styles.updateBtn}
          preIcon={
            <MaterialCommunityIcons
              name="pencil-outline"
              size={Metrix.customFontSize(18)}
              color={Colors.white}
              style={{ marginRight: 6 }}
            />
          }
        />

        <Button
          title="Delete"
          onPress={handleDelete}
          isOutline
          buttonStyle={styles.deleteBtn}
          titleStyle={styles.deleteBtnText}
          preIcon={
            <MaterialCommunityIcons
              name="delete-outline"
              size={Metrix.customFontSize(18)}
              color={Colors.redDark}
              style={{ marginRight: 6 }}
            />
          }
        />
      </ScrollView>
    </>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: Metrix.HorizontalSize(16),
    paddingBottom: Metrix.VerticalSize(40),
  },
  sectionTitle: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(16),
    color: Colors.primary,
    marginTop: Metrix.VerticalSize(20),
    marginBottom: Metrix.VerticalSize(12),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: Metrix.HorizontalSize(16),
    marginBottom: Metrix.VerticalSize(24),
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Metrix.VerticalSize(14),
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundGray,
  },
  infoLabel: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(13),
    color: Colors.textColor,
    flex: 1,
  },
  infoValue: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(13),
    color: Colors.primary,
    flex: 1,
    textAlign: "right",
  },
  statusBadge: {
    paddingHorizontal: Metrix.HorizontalSize(14),
    paddingVertical: Metrix.VerticalSize(4),
    borderRadius: 20,
  },
  statusActive: {
    backgroundColor: Colors.primary,
  },
  statusInactive: {
    backgroundColor: Colors.backgroundGray,
  },
  statusText: {
    fontFamily: fonts.SemiBold,
    fontSize: Metrix.customFontSize(12),
  },
  statusTextActive: {
    color: Colors.white,
  },
  statusTextInactive: {
    color: Colors.textColor,
  },
  updateBtn: {
    width: "100%",
    marginBottom: Metrix.VerticalSize(12),
    height: Metrix.VerticalSize(50),
    borderRadius: 10,
  },
  deleteBtn: {
    width: "100%",
    height: Metrix.VerticalSize(50),
    borderRadius: 10,
    borderColor: Colors.redDark,
  },
  deleteBtnText: {
    color: Colors.redDark,
  },
});
