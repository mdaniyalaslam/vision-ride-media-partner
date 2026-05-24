import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Colors, Metrix } from "../../config";
import { fonts } from "../../config/Constants";
import { Button, DropdownField, Header, TextField } from "../../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImageCropPicker from "react-native-image-crop-picker";

const pickSingleImage = (onSelect) => {
  ImageCropPicker.openPicker({ width: 400, height: 400, cropping: false })
    .then((image) => onSelect({ uri: image.path, mime: image.mime }))
    .catch((err) => console.log(err));
};

const ImagePickerField = ({ label, value, onPress }) => (
  <View style={styles.imagePickerWrapper}>
    <Text style={styles.imagePickerLabel}>{label}</Text>
    <TouchableOpacity
      style={styles.imagePickerBtn}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {value ? (
        <Image source={{ uri: value.uri }} style={styles.imagePickerThumb} />
      ) : (
        <View style={styles.imagePickerPlaceholder}>
          <Ionicons
            name="cloud-upload-outline"
            size={Metrix.customFontSize(18)}
            color={Colors.primary}
          />
          <Text style={styles.imagePickerText}>Choose file</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
);

const AddCar = ({ route }) => {
  const { cardAdded } = route?.params;

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [modelCode, setModelCode] = useState("");
  const [type, setType] = useState(null);
  const [year, setYear] = useState(null);
  const [registrationNum, setRegistrationNum] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [mileage, setMileage] = useState("");
  const [insuranceImage, setInsuranceImage] = useState(null);
  const [vehicleImages, setVehicleImages] = useState({
    front: null,
    rear: null,
    leftSide: null,
    rightSide: null,
    mileageDashboard: null,
    topView: null,
  });

  return (
    <>
      <Header
        backIcon={true}
        title={cardAdded ? "Your Car Details" : "Add New Vehicle"}
        notificationIcon={false}
      />
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.formContainer}>
          {/* Row 1: Make | Model */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <TextField
                label="Make"
                value={make}
                placeholder="e.g., Toyota"
                onChangeText={setMake}
              />
            </View>
            <View style={styles.halfField}>
              <TextField
                label="Model"
                value={model}
                placeholder="e.g., Corolla"
                onChangeText={setModel}
              />
            </View>
          </View>

          {/* Row 2: Model Code | Type */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <TextField
                label="Model Code"
                value={modelCode}
                placeholder="e.g., TCR-2025"
                onChangeText={setModelCode}
              />
            </View>
            <View style={styles.halfField}>
              <DropdownField
                label="Type"
                placeholder={type ? type.name : "Select Type"}
                updateValue={(obj) => setType(obj)}
                modalTitle="Select Type"
                data={[
                  { name: "Sedan" },
                  { name: "SUV" },
                  { name: "Truck" },
                  { name: "Hatchback" },
                  { name: "Other" },
                ]}
              />
            </View>
          </View>

          {/* Row 3: Year | Registration Number */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <DropdownField
                label="Year"
                placeholder={year ? year.name : "Select Year"}
                updateValue={(obj) => setYear(obj)}
                modalTitle="Select Year"
                data={Array.from({ length: 36 }, (_, i) => ({
                  name: String(2025 - i),
                }))}
              />
            </View>
            <View style={styles.halfField}>
              <TextField
                label="Registration Number"
                value={registrationNum}
                placeholder="e.g., ABC-321"
                onChangeText={setRegistrationNum}
              />
            </View>
          </View>

          {/* Row 4: VIN Number full width */}
          <TextField
            label="VIN Number"
            value={vinNumber}
            placeholder="e.g., 1HGBH41JXMN109186"
            onChangeText={setVinNumber}
            maxLength={17}
          />

          {/* Row 5: Average Monthly Mileage | Insurance Confirmation */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <TextField
                label="Average Monthly Mileage (mi)"
                value={mileage}
                placeholder="e.g., 1500"
                onChangeText={setMileage}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfField}>
              <ImagePickerField
                label="Insurance Confirmation"
                value={insuranceImage}
                onPress={() => pickSingleImage(setInsuranceImage)}
              />
            </View>
          </View>

          {/* Vehicle Images Section */}
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="camera"
              size={Metrix.customFontSize(18)}
              color={Colors.primary}
            />
            <Text style={styles.sectionTitle}>
              {" "}
              Vehicle Images (By Position)
            </Text>
          </View>

          {/* Row 6: Front View | Rear View */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <ImagePickerField
                label="↑ Front View"
                value={vehicleImages.front}
                onPress={() =>
                  pickSingleImage((img) =>
                    setVehicleImages((prev) => ({ ...prev, front: img })),
                  )
                }
              />
            </View>
            <View style={styles.halfField}>
              <ImagePickerField
                label="↓ Rear View"
                value={vehicleImages.rear}
                onPress={() =>
                  pickSingleImage((img) =>
                    setVehicleImages((prev) => ({ ...prev, rear: img })),
                  )
                }
              />
            </View>
          </View>

          {/* Row 7: Left Side View | Right Side View */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <ImagePickerField
                label="← Left Side View"
                value={vehicleImages.leftSide}
                onPress={() =>
                  pickSingleImage((img) =>
                    setVehicleImages((prev) => ({ ...prev, leftSide: img })),
                  )
                }
              />
            </View>
            <View style={styles.halfField}>
              <ImagePickerField
                label="→ Right Side View"
                value={vehicleImages.rightSide}
                onPress={() =>
                  pickSingleImage((img) =>
                    setVehicleImages((prev) => ({ ...prev, rightSide: img })),
                  )
                }
              />
            </View>
          </View>

          {/* Row 8: Mileage/Dashboard | Top View */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <ImagePickerField
                label="Mileage/Dashboard"
                value={vehicleImages.mileageDashboard}
                onPress={() =>
                  pickSingleImage((img) =>
                    setVehicleImages((prev) => ({
                      ...prev,
                      mileageDashboard: img,
                    })),
                  )
                }
              />
            </View>
            <View style={styles.halfField}>
              <ImagePickerField
                label="Top View"
                value={vehicleImages.topView}
                onPress={() =>
                  pickSingleImage((img) =>
                    setVehicleImages((prev) => ({ ...prev, topView: img })),
                  )
                }
              />
            </View>
          </View>

          <View style={{ height: Metrix.VerticalSize(30) }} />
          <Button
            title="Add Vehicle"
            // onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default AddCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  formContainer: {
    marginHorizontal: Metrix.HorizontalSize(20),
    marginTop: Metrix.VerticalSize(10),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfField: {
    width: "48%",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Metrix.VerticalSize(20),
    marginBottom: Metrix.VerticalSize(6),
  },
  sectionTitle: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(14),
    color: Colors.primary,
  },
  imagePickerWrapper: {
    marginTop: Metrix.VerticalSize(10),
  },
  imagePickerLabel: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(11),
    color: Colors.labelColor,
    marginBottom: Metrix.VerticalSize(10),
  },
  imagePickerBtn: {
    borderRadius: 12,
    backgroundColor: Colors.textFiledBG,
    height: Metrix.VerticalSize(48),
    justifyContent: "center",
    overflow: "hidden",
  },
  imagePickerPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Metrix.HorizontalSize(10),
    gap: 6,
  },
  imagePickerText: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.darkGray,
  },
  imagePickerThumb: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
