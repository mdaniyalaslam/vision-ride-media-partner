import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Platform,
  useColorScheme,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Images, Metrix, NavigationService } from "../../config";
import {
  Button,
  CustomModal,
  TextComponent,
  TextField,
} from "../../components";
import { emailValidityCheck, fonts, ToastError } from "../../config/Constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { AuthMiddleware } from "../../redux/Middlewares";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function Login() {
  const dispatch = useDispatch();
  const AD = "advertiser";
  const MP = "mobility_partner";
  const [emailAddress, setEmailAddress] = useState(
    __DEV__ ? "devp@yopmail.com" : "",
  );
  const [password, setPassword] = useState(__DEV__ ? "Abcd@1234" : "");
  const [seePassword, setSeePassword] = useState(false);
  const [isAd, set_isAd] = useState(true);

  const toggleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  const loginUser = async () => {
    if (!emailAddress) {
      Toast.show(ToastError("Please input an email address."));
      return;
    }
    if (!emailValidityCheck(emailAddress)) {
      Toast.show(ToastError("Please enter a valid email address."));
      return;
    }

    const payload = {
      email: emailAddress,
      password: password,
    };
    console.log("Payload:", payload);

    dispatch(AuthMiddleware.Login(payload))
      .then((data) => {
        console.log("Login Success:", data);
        NavigationService.resetStack("UserStack");
        //  setCode(data?.data || '');
        //  setIsLoginSuccess(true);
        //  connectAndFetchMessages({ emailAddress });
        //  dispatch(AuthAction.SaveEmail(emailAddress));
        //  _timer();
      })
      .catch((err) => console.warn(err));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{ flex: 1 }}
        style={{
          paddingHorizontal: Metrix.HorizontalSize(20),
          ...Platform.select({
            android: {
              marginTop: Metrix.VerticalSize(50),
            },
            ios: {
              marginTop: Metrix.VerticalSize(80),
            },
          }),
        }}
      >
        <Image source={Images.logo} resizeMode="contain" style={styles.logo} />

        <View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TextComponent text={"Welcome Back!"} customStyles={styles.title} />
            <TextComponent
              text=" Enter your credentials to access your account"
              customStyles={styles.subTitle}
            />
          </View>

          <View
            style={{
              marginTop: Metrix.VerticalSize(20),
            }}
          >
            <TextField
              label="Email Address"
              value={emailAddress}
              onChangeText={(text) => setEmailAddress(text.toLowerCase())}
            />
            <TextField
              label="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={seePassword ? true : false}
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
            <TextComponent
              onPress={() => NavigationService.navigate("ForgotPassword")}
              text="Forgot Password"
              customStyles={styles.forgetText}
            />
          </View>

          <View style={{ marginTop: Metrix.VerticalSize(20) }}>
            <Button title={"Login"} onPress={loginUser} />
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View style={styles.linkContainer}>
            <TextComponent
              text="Don't have an account? "
              customStyles={{
                textAlign: "center",
                color: Colors.textColor,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                NavigationService.navigate("SignUp");
              }}
            >
              <TextComponent
                text="Signup"
                customStyles={{
                  color: Colors.primary,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: Colors.background,
  },

  title: {
    width: "100%",
    fontSize: Metrix.customFontSize(30),
    fontFamily: fonts.Bold,
    color: Colors.primary,
    // textAlign: 'center',
    paddingTop: 10,
  },
  subTitle: {
    width: "100%",
    fontFamily: fonts.Regular,
    color: Colors.textColor,
    paddingTop: 10,
    // textAlign: 'center',
  },

  eyeIconStyle: {
    position: "absolute",
    zIndex: 100,
    top: Metrix.VerticalSize(30),
    right: Metrix.HorizontalSize(5),
    padding: 10,
  },
  forgetText: {
    fontSize: Metrix.customFontSize(13),
    color: Colors.primary,
    fontFamily: fonts.Medium,
    marginTop: 14,
  },
  forgetPassword: {
    flexDirection: "row",
    marginTop: Metrix.VerticalSize(5),
    justifyContent: "flex-end",
  },

  linkContainer: {
    flexDirection: "row",
    marginBottom: Metrix.VerticalSize(50),
    // position: 'absolute',
    // bottom: Metrix.VerticalSize(50),
    alignSelf: "center",
  },
  logo: {
    height: Metrix.VerticalSize(153),
    width: Metrix.VerticalSize(259),
    // alignSelf: 'center',
  },
  underlineStyleHighLighted: {
    borderColor: Colors.primary,
    color: Colors.primary,
    fontFamily: fonts.Bold,
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    color: Colors.black,
    fontFamily: fonts.Bold,
  },
  dialogIcon: {
    height: Metrix.VerticalSize(42),
    width: Metrix.VerticalSize(42),
    marginTop: Metrix.VerticalSize(20),
    alignSelf: "center",
  },
  circle: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 100,
    width: Metrix.HorizontalSize(20),
    height: Metrix.VerticalSize(20),
    justifyContent: "center",
    alignItems: "center",
    marginRight: Metrix.HorizontalSize(5),
  },
  circleText: {
    color: Colors.white,
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(14),
  },
  dialogTitle: {
    color: Colors.black,
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Bold,
    textAlign: "center",
  },
  dialogHeadingRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
