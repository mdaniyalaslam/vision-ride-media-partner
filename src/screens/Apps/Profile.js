import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Images, Metrix, NavigationService } from "../../config";
import {
  Button,
  CustomModal,
  DropdownField,
  Header,
  TextComponent,
  TextField,
} from "../../components";
import {
  citiesData,
  fonts,
  statesData,
  ToastError,
  ToastSuccess,
} from "../../config/Constants";
import ImageCropPicker from "react-native-image-crop-picker";
import Toast from "react-native-toast-message";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaskInput from "react-native-mask-input";
import { useDispatch, useSelector } from "react-redux";
import { AuthMiddleware } from "../../redux/Middlewares";
import { AuthAction } from "../../redux/Actions";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.AuthReducer);
  const token = user?.token;

  const [fullName, setFullName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [uploadedImage, setUploadedImage] = useState(null);

  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 400,
      height: 400,
      cropping: false,
    })
      .then((image) => {
        const img = {
          name:
            Math.floor(Math.random() * 100) +
            image?.modificationDate +
            Math.floor(Math.random() * 100) +
            ".jpg",
          uri: image.path,
          type: "image/png",
        };
        closeModal();
        setUploadedImage(img);
      })
      .catch((err) => {
        Toast.show(ToastError(err.message));
      });
  };

  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: false,
      multiple: false,
    })
      .then((image) => {
        const img = {
          name:
            Math.floor(Math.random() * 100) +
            image?.modificationDate +
            Math.floor(Math.random() * 100) +
            ".jpg",
          uri: image.path,
          mime: "jpg",
          type: "image/jpg",
        };
        closeModal();
        setUploadedImage(img);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    dispatch(AuthMiddleware.GetSettings(token))
      .then((res) => {
        console.log("GetSettings Response:", res);
        const partner = res?.partner ?? {};
        setFullName(partner?.full_name || "");
        setOccupation(partner?.occupation || "");
        setEmailAddress(partner?.email || "");
        setContactNumber(partner?.contact_number || partner?.phone || "");
        setAddress(partner?.address || "");
        setCity(partner?.city || "");
        setState(partner?.state || "");
        setPostalCode(partner?.postal_code || "");
        dispatch(AuthAction.Signin({ ...user, ...partner }));
      })
      .catch((error) => {
        console.error("GetSettings Error:", error);
      });
  };

  const updateProfile = () => {
    const payload = {
      full_name: fullName,
      occupation: occupation,
      contact_number: contactNumber,
      address: address,
      city: city,
      state: state,
      postal_code: postalCode,
      email: emailAddress,
      phone: contactNumber,
    };
    console.log("UpdateProfile payload:", payload);
    dispatch(AuthMiddleware.UpdateProfile(token, payload))
      .then((res) => {
        console.log("UpdateProfile Response:", res);
        Toast.show(ToastSuccess("Profile updated successfully"));
        NavigationService.goBack();
      })
      .catch((error) => {
        console.error("UpdateProfile Error:", error);
        Toast.show(ToastError("Failed to update profile"));
      });
  };

  return (
    <>
      <Header title={"Profile"} />

      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ ...styles.row }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={openModal}
              style={styles.carImage}
            >
              <Image
                source={uploadedImage ? uploadedImage : Images.logo}
                style={styles.carImage}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                marginHorizontal: Metrix.HorizontalSize(10),
                justifyContent: "center",
              }}
            >
              <TextComponent
                text={fullName}
                isTitle
                customStyles={{ fontSize: 14 }}
              />
              <TextComponent text={emailAddress} />
            </View>
          </View>

          <View
            style={{ marginTop: Metrix.VerticalSize(10), paddingBottom: 50 }}
          >
            <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
              <TextField
                label="Full Name*"
                value={fullName}
                onChangeText={(text) => setFullName(text)}
              />
              <TextField
                label="Occupation*"
                value={occupation}
                onChangeText={(text) => setOccupation(text)}
              />
              <TextField
                label="Email*"
                value={emailAddress}
                editable={false}
                keyboardType="email-address"
              />

              <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
                <Text style={styles.labelText}> Contact Number* </Text>
                <MaskInput
                  value={contactNumber}
                  keyboardType="number-pad"
                  style={styles.maskInput}
                  placeholderTextColor={Colors.textColor}
                  onChangeText={(masked) => setContactNumber(masked)}
                  mask={[
                    "(",
                    /[1-9]/,
                    /\d/,
                    /\d/,
                    ")",
                    " ",
                    /[1-9]/,
                    /\d/,
                    /\d/,
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                />
              </View>

              <TextField
                label="Address*"
                multiline
                inputContainerStyle={{ height: 100 }}
                value={address}
                onChangeText={(text) => setAddress(text)}
              />

              <DropdownField
                isSearch
                label="State*"
                placeholder={state || "Select State"}
                updateValue={(obj) => setState(obj?.name ?? obj)}
                modalTitle="Select State"
                data={statesData}
              />
              <DropdownField
                isSearch
                label="City*"
                placeholder={city || "Select City"}
                updateValue={(obj) => setCity(obj?.name ?? obj)}
                modalTitle="Select City"
                data={citiesData}
              />

              <TextField
                label="Postal Code"
                value={postalCode}
                onChangeText={(text) => setPostalCode(text)}
                keyboardType="number-pad"
              />
            </View>

            <Button
              title="Update"
              buttonStyle={{ marginBottom: 6 }}
              onPress={updateProfile}
            />
            <Button
              title="Change Password"
              buttonStyle={{ marginTop: 6 }}
              onPress={() => {
                NavigationService.navigate("ChangePassword");
              }}
              isOutline
            />
          </View>
        </View>
      </ScrollView>

      <CustomModal
        title={"Change profile image"}
        show={showModal}
        onCloseModal={closeModal}
      >
        <View style={styles.modalStyle}>
          <View style={styles.modalBtnContainer}>
            <View style={{ width: "48%" }}>
              <Button
                title={"Open Camera"}
                textStyle={{ marginLeft: Metrix.HorizontalSize(5) }}
                btnStyle={{ paddingVertical: Metrix.VerticalSize(10) }}
                preIcon={
                  <MaterialCommunityIcons
                    name="camera"
                    size={Metrix.customFontSize(18)}
                    color={Colors.white}
                  />
                }
                onPress={openCamera}
                shadow
              />
            </View>
            <View style={{ width: "48%" }}>
              <Button
                title={"Open Gallery"}
                textStyle={{
                  marginLeft: Metrix.HorizontalSize(5),
                  color: Colors.primary,
                }}
                preIcon={
                  <MaterialCommunityIcons
                    name="folder-multiple-image"
                    size={Metrix.customFontSize(18)}
                    color={Colors.primary}
                  />
                }
                btnStyle={{
                  paddingVertical: Metrix.VerticalSize(10),
                  backgroundColor: Colors.white,
                  borderWidth: 1,
                  borderColor: Colors.primary,
                }}
                onPress={openImagePicker}
                shadow
              />
            </View>
          </View>
        </View>
      </CustomModal>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Metrix.VerticalSize(20),
  },
  carImage: {
    width: Metrix.HorizontalSize(59),
    height: Metrix.HorizontalSize(59),
    borderRadius: Metrix.HorizontalSize(100),
  },
  labelText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(11),
    color: Colors.labelColor,
    marginTop: 12,
  },
  maskInput: {
    marginTop: Metrix.VerticalSize(10),
    width: "100%",
    height: Metrix.VerticalSize(48),
    fontSize: Metrix.customFontSize(12),
    padding: 5,
    paddingLeft: Metrix.HorizontalSize(10),
    color: Colors.black,
    backgroundColor: Colors.textFiledBG,
    borderRadius: 10,
    fontFamily: fonts.Regular,
  },
  modalStyle: {
    backgroundColor: Colors.white,
  },
  modalBtnContainer: {
    marginTop: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
