import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Platform,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { Colors, Images, Metrix, NavigationService } from "../../config";
import {
  Button,
  CustomModal,
  DropdownField,
  TextComponent,
  TextField,
} from "../../components";

import {
  emailValidityCheck,
  fonts,
  isPasswordAlphaNumeric,
  isPasswordLengthCorrect,
  numbersRegex,
  ToastError,
  ToastSuccess,
} from "../../config/Constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { baseUrl, imageBaseUrl } from "../../config/ApiCaller";
import { LoaderAction } from "../../redux/Actions";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useDispatch } from "react-redux";
import { AuthMiddleware, HomeMiddleware } from "../../redux/Middlewares";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import useStyle from "../styles";
import MaskInput, { Masks } from "react-native-mask-input";
import ApiCaller, { endPoints } from "../../config/EndPoints";
const SignUp = ({ route }) => {
  const dispatch = useDispatch();
  // MOBILITY PARTNER
  const [fullName, setFullName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  // ADVERTISER
  const [representativeName, setRepresentativeName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [representativeContact, setRepresentativeContact] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  const [headOfficeAddress, setHeadOfficeAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [representativeEmail, setRepresentativeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    dispatch(AuthMiddleware.GetCountries())
      .then((res) => {
        console.log("Countries response:", res);
        setCountries(res?.data?.countries || []);
      })
      .catch((err) => {
        console.log("Error fetching countries:", err);
      });
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const toggleSeePassword = () => {
    setSeePassword(!seePassword);
  };
  const toggleSeeConfirmPassword = () => {
    setSeeConfirmPassword(!seeConfirmPassword);
  };

  const closeModal = () => setShowModal(false);

  const isTrueString = (str) => {
    return str.match(/[a-zA-Z0-9]/);
  };

  const registerUser = (file) => {
    if (!representativeName) {
      return Toast.show(ToastError("Please enter your name."));
    }
    if (!isTrueString(representativeName)) {
      return Toast.show(ToastError("Please enter a valid name."));
    }
    if (!companyName) {
      return Toast.show(ToastError("Please provide your company name."));
    }
    if (!isTrueString(companyName)) {
      return Toast.show(ToastError("Please enter a valid company name."));
    }
    if (!email) {
      Toast.show(ToastError("Please input an email address."));
      return;
    }
    if (!emailValidityCheck(email)) {
      Toast.show(ToastError("Please enter a valid email address."));
      return;
    }

    if (!email) {
      Toast.show(ToastError("Please input an email address."));
      return;
    }
    if (!emailValidityCheck(email)) {
      Toast.show(ToastError("Please enter a valid email address."));
      return;
    }
    if (!representativeContact) {
      return Toast.show(ToastError("Please input your phone number."));
    }
    if (!numbersRegex.test(representativeContact)) {
      return Toast.show(ToastError("Only numbers are allowed in phone number"));
    }
    if (!numbersRegex.test(companyContact)) {
      return Toast.show(ToastError("Only numbers are allowed in phone number"));
    }
    if (!state) {
      return Toast.show(ToastError("Please select your state."));
    }
    if (!city) {
      return Toast.show(ToastError("Please select your city."));
    }
    if (!password) {
      Toast.show(ToastError("Please input a password."));
      return;
    }
    if (!isPasswordAlphaNumeric(password)) {
      Toast.show(
        ToastError("Password must contain at least one letter and one number."),
      );
      return;
    }
    if (!isPasswordLengthCorrect(password)) {
      Toast.show(ToastError("Password must be at least 6 characters long."));
      return;
    }
    if (password !== confirmPassword) {
      Toast.show(ToastError("Passwords do not match."));
      return;
    }

    dispatch(
      AuthMiddleware.Register({
        company_name: companyName,
        representative_name: representativeName,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        representative_contact_number: representativeContact,
        company_contact_number: companyContact,
        head_office_address: headOfficeAddress,
        city: city,
        state: state,
        postal_code: postalCode,
      }),
    )
      .then((data) => {
        NavigationService.resetStack("UserStack");
        // NavigationService.navigate('Verification', {
        //   emailAddress: email,
        //   commingFromScreen: 'register',
        // });
      })
      .catch((err) => console.warn(err));
  };

  return (
    // <View style={styles.container}>
    <ScrollView
      bounces={false}
      // contentContainerStyle={{ flex: 1 }}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={{
        paddingHorizontal: Metrix.HorizontalSize(20),
        marginTop: Metrix.VerticalSize(50),
        backgroundColor: Colors.white,
      }}
    >
      <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
      <View
        style={{
          //   marginVertical: Metrix.VerticalSize(20),
          alignItems: "center",
        }}
      >
        <TextComponent
          text={"Signup as Mobility Partner"}
          customStyles={styles.title}
        />

        <TextComponent
          text="Fill in your details to begin"
          customStyles={styles.subTitle}
        />
      </View>

      <View style={{ marginTop: Metrix.VerticalSize(10) }}>
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
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />

        <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
          <Text style={styles.labelText}> Contact Number* </Text>
          <MaskInput
            value={contactNumber}
            keyboardType="number-pad"
            style={{
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
            }}
            placeholderTextColor={Colors.textColor}
            onChangeText={(masked, unmasked) => {
              setContactNumber(masked);
            }}
            mask={[
              `(`,
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
              "",
              /\d/,
              /\d/,
            ]}
          />
        </View>

        <TextField
          label="Address*"
          multiline
          inputContainerStyle={{ height: 100 }}
          value={headOfficeAddress}
          onChangeText={(text) => setHeadOfficeAddress(text)}
        />
        <DropdownField
          isSearch
          label="State*"
          placeholder={country ? country.name : "Select State"}
          updateValue={(obj) => setState(obj)}
          data={
            countries.length > 0
              ? countries
              : [
                  { name: "United States" },
                  { name: "Canada" },
                  { name: "Pakistan" },
                  { name: "Other" },
                ]
          }
        />
        <DropdownField
          isSearch
          label="City*"
          placeholder={country ? country.name : "Select City"}
          updateValue={(obj) => setCity(obj)}
          data={
            countries.length > 0
              ? countries
              : [
                  { name: "United States" },
                  { name: "Canada" },
                  { name: "Pakistan" },
                  { name: "Other" },
                ]
          }
        />
        <TextField
          label="Postal Code*"
          value={postalCode}
          onChangeText={(text) => setPostalCode(text.toLowerCase())}
        />
        <TextField
          label="Password*"
          value={password}
          onChangeText={(text) => setPassword(text.toLowerCase())}
          secureTextEntry={!seePassword}
          rightIcon={
            <TouchableOpacity onPress={toggleSeePassword}>
              <Ionicons
                name={seePassword ? "eye-outline" : "eye-off-outline"}
                color={Colors.darkGray}
                size={Metrix.customFontSize(20)}
              />
            </TouchableOpacity>
          }
        />
        <TextField
          label="Confirm Password*"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text.toLowerCase())}
          secureTextEntry={!seeConfirmPassword}
          rightIcon={
            <TouchableOpacity onPress={toggleSeeConfirmPassword}>
              <Ionicons
                name={seeConfirmPassword ? "eye-outline" : "eye-off-outline"}
                color={Colors.darkGray}
                size={Metrix.customFontSize(20)}
              />
            </TouchableOpacity>
          }
        />
      </View>

      <View style={{ marginVertical: Metrix.VerticalSize(20) }}>
        <Button title={"Signup"} onPress={registerUser} />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={styles.linkContainer}>
          <TextComponent
            text="Already have an account? "
            customStyle={{
              textAlign: "center",
              color: Colors.textColor,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              NavigationService.goBack();
            }}
          >
            <TextComponent
              text="Sign In"
              customStyles={{
                color: Colors.primary,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    // </View>
  );
};
export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: Colors.white,
  },
  imageContainer: {
    width: Metrix.VerticalSize(90),
    height: Metrix.VerticalSize(90),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: Metrix.VerticalSize(90),
  },
  title: {
    width: "100%",
    fontSize: Metrix.customFontSize(30),
    fontFamily: fonts.Bold,
    color: Colors.primary,
    textAlign: "center",
    paddingTop: 10,
  },
  subTitle: {
    width: "100%",
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(14),
    color: Colors.textColor,
    textAlign: "center",
    marginTop: 10,
  },
  labelText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(11),
    color: Colors.labelColor,
    marginTop: 12,
  },

  eyeIconStyle: {
    position: "absolute",
    zIndex: 100,
    top: Metrix.VerticalSize(30),
    right: Metrix.HorizontalSize(5),
    padding: 10,
  },

  linkContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: Metrix.VerticalSize(40),
  },
  input: {
    marginTop: Metrix.VerticalSize(10),
    width: "100%",
    height: Metrix.VerticalSize(44),
    fontSize: Metrix.customFontSize(12),
    padding: 5,
    paddingLeft: Metrix.HorizontalSize(10),
    color: Colors.black,
    borderRadius: 14,
    borderColor: Colors.lighGray,
    borderWidth: 1,
  },

  logo: {
    height: Metrix.VerticalSize(110),
    width: Metrix.VerticalSize(186),
    alignSelf: "center",
  },
});
