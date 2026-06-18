import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Colors, Metrix, NavigationService } from "../../config";
import { Button, Header, Tag } from "../../components";
import ImageSwiperComponent from "../../components/ImageSwiperComponent";
import { imageBaseUrl } from "../../config/ApiCaller";
import { fonts, ToastError } from "../../config/Constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { HomeMiddleware } from "../../redux/Middlewares";
import Toast from "react-native-toast-message";

// ImageSwiperComponent prepends imageBaseUrl, so we hand it relative paths
const toRelativePath = (img) => {
  const raw =
    typeof img === "string"
      ? img
      : img?.image_url ??
        img?.image_path ??
        img?.path ??
        img?.url ??
        img?.image;
  if (!raw) return null;
  let p = String(raw);
  if (p.startsWith(imageBaseUrl)) p = p.slice(imageBaseUrl.length);
  p = p.replace(/^https?:\/\/[^/]+\//i, "");
  return p.replace(/^\/+/, "");
};

// Collect every available vehicle image as {path, image_type}
const collectImages = (vehicle) => {
  const out = [];
  const seen = new Set();
  const push = (img, fallbackType) => {
    const p = toRelativePath(img);
    if (!p || seen.has(p)) return;
    seen.add(p);
    const image_type =
      (typeof img === "object" && (img?.image_type ?? img?.type)) ||
      fallbackType ||
      "";
    out.push({ path: p, image_type });
  };
  if (Array.isArray(vehicle?.images)) vehicle.images.forEach((i) => push(i));
  [
    [vehicle?.image_front, "front"],
    [vehicle?.image_rear, "rear"],
    [vehicle?.image_left, "left"],
    [vehicle?.image_right, "right"],
    [vehicle?.image_mileage, "mileage"],
    [vehicle?.image_top, "top"],
    [vehicle?.front_view, "front"],
    [vehicle?.rear_view, "rear"],
    [vehicle?.left_view, "left"],
    [vehicle?.right_view, "right"],
    [vehicle?.mileage_image, "mileage"],
  ].forEach(([img, type]) => push(img, type));
  return out;
};

const InfoRow = ({ label, value, isLast = false }) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value ?? "—"}</Text>
  </View>
);

const VehicleDetails = ({ route }) => {
  const vehicle = route?.params?.vehicle ?? {};
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.AuthReducer);

  const [images, setImages] = useState(() => collectImages(vehicle));
  const [status] = useState(vehicle?.status ?? "Active");

  const fetchImages = useCallback(() => {
    if (!vehicle?.id) return;
    dispatch(HomeMiddleware.GetVehicleImages(user?.token, vehicle.id))
      .then((res) => {
        const raw = res?.data;
        const arr = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.images)
          ? raw.images
          : [];
        const next = collectImages({ images: arr });
        if (next.length > 0) setImages(next);
      })
      .catch((err) => console.warn("GetVehicleImages Error:", err));
  }, [vehicle?.id, user?.token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchImages);
    return unsubscribe;
  }, [navigation, fetchImages]);
  const statusKey = String(status).toLowerCase();
  const statusId =
    statusKey === "active" || statusKey === "approved"
      ? 2
      : statusKey === "pending"
      ? 1
      : 3;
  const statusLabel = status
    ? String(status).charAt(0).toUpperCase() + String(status).slice(1)
    : "—";
  const make = vehicle?.make ?? "";
  const model = vehicle?.model ?? "";
  const modelCode = vehicle?.modelCode ?? "";
  const type = vehicle?.type ?? "";
  const year = vehicle?.year ?? "";
  const registrationNumber = vehicle?.registration_number ?? "";
  const vin = vehicle?.vin ?? "";
  const mileage = vehicle?.mileage ?? vehicle?.avg_monthly_mileage ?? "";
  const monthlyAmount = vehicle?.monthly_amount ?? "";

  const handleUpdate = () => {
    NavigationService.navigate("UpdateCarInformation", {
      cardAdded: true,
      vehicle,
    });
  };
  const handleUpdateImages = () => {
    NavigationService.navigate("UpdateCarImages", { vehicle });
  };
  const handleDelete = () => {
    Alert.alert(
      "Delete Vehicle",
      "Are you sure you want to delete this vehicle? This will submit a removal request for admin approval.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.prompt(
              "Reason for Removal",
              "Please provide a reason:",
              (reason) => {
                if (!reason?.trim()) {
                  Toast.show(
                    ToastError("Please provide a reason for removal."),
                  );
                  return;
                }
                dispatch(
                  HomeMiddleware.DeleteVehicle(
                    user?.token,
                    vehicle?.id,
                    reason,
                  ),
                )
                  .then((res) => {
                    console.log("DeleteVehicle Success:", res);
                    NavigationService.goBack();
                  })
                  .catch((err) => console.warn("DeleteVehicle Error:", err));
              },
              "plain-text",
            );
          },
        },
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
        {images.length > 0 && (
          <View style={styles.swiperWrapper}>
            <ImageSwiperComponent data={images} />
          </View>
        )}

        <Text style={styles.sectionTitle}>Vehicle Information</Text>

        <View style={styles.card}>
          {/* Status badge */}
          <View style={[styles.infoRow, styles.infoRowBorder]}>
            <Text style={styles.infoLabel}>Status</Text>
            <Tag text={statusLabel} id={statusId} />
          </View>

          <InfoRow label="Make" value={make} />
          <InfoRow label="Model" value={model} />
          <InfoRow label="Model Code" value={modelCode} />
          <InfoRow label="Type" value={type} />
          <InfoRow label="Year" value={year} />
          <InfoRow label="Registration Number" value={registrationNumber} />
          <InfoRow label="VIN" value={vin} />
          <InfoRow
            label="Avg. Monthly Mileage"
            value={mileage ? `${mileage} mi` : "—"}
          />
          <InfoRow
            label="Monthly Amount"
            value={monthlyAmount ? `$${monthlyAmount}` : "—"}
            isLast
          />
        </View>

        <Button
          title="Edit Vehicle Information"
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
          title="Update Vehicle Images"
          onPress={handleUpdateImages}
          isOutline
          buttonStyle={styles.imagesBtn}
          titleStyle={styles.imagesBtnText}
          preIcon={
            <MaterialCommunityIcons
              name="pencil-outline"
              size={Metrix.customFontSize(18)}
              color={Colors.primary}
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
  swiperWrapper: {
    marginTop: Metrix.VerticalSize(10),
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
  deleteBtnText: { color: Colors.redDark },
  imagesBtn: {
    width: "100%",
    height: Metrix.VerticalSize(50),
    borderRadius: 10,
    borderColor: Colors.primary,
    marginBottom: 16,
  },
  imagesBtnText: { color: Colors.primary },
});
