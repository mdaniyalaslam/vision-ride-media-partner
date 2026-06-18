import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Colors, Images, Metrix, NavigationService } from "../../config";
import {
  Button,
  CustomModal,
  Header,
  HeroHeader,
  TextComponent,
} from "../../components";
import { fonts } from "../../config/Constants";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthAction } from "../../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import ApiCaller, { endPoints } from "../../config/EndPoints";
import { AuthMiddleware } from "../../redux/Middlewares";

const More = (props) => {
  const arr = [
    {
      title: "My Profile",
      icon: (
        <FontAwesome
          name="user-o"
          size={Metrix.customFontSize(22)}
          color={Colors.primary}
        />
      ),
      goto: () => {
        props.navigation.navigate("Profile");
      },
    },

    {
      title: "Payments",
      icon: (
        <Entypo
          name="documents"
          size={Metrix.customFontSize(22)}
          color={Colors.primary}
        />
      ),
      goto: () => {
        props.navigation.navigate("Invoices");
      },
    },
    {
      title: "Bank Account Details",
      icon: (
        <Feather
          name="credit-card"
          size={Metrix.customFontSize(22)}
          color={Colors.primary}
        />
      ),
      goto: () => {
        props.navigation.navigate("BankAccounts");
      },
    },
    // {
    //   title: "Company",
    //   icon: (
    //     <FontAwesome
    //       name="building-o"
    //       size={Metrix.customFontSize(22)}
    //       color={Colors.primary}
    //     />
    //   ),
    //   goto: () => {
    //     props.navigation.navigate("MoreCompany");
    //   },
    // },
    {
      title: "Support Center",
      icon: (
        <Feather
          name="help-circle"
          size={Metrix.customFontSize(22)}
          color={Colors.primary}
        />
      ),
      goto: () => {
        props.navigation.navigate("MoreSupportCenter");
      },
    },
    {
      title: "Delete My Account",
      icon: (
        <Feather
          name="trash"
          size={Metrix.customFontSize(22)}
          color={Colors.primary}
        />
      ),
      goto: () => {
        setDeleteAccountDialogShow(true);
      },
    },
    {
      title: "Logout",
      icon: (
        <MaterialIcons
          name="logout"
          size={Metrix.customFontSize(22)}
          color={Colors.primary}
        />
      ),
      goto: () => {
        setLogoutDialogShow(true);
      },
    },
  ];

  const [logoutDialogShow, setLogoutDialogShow] = useState(false);
  const [deleteAccountDialogShow, setDeleteAccountDialogShow] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer.user);

  const LogoutBtn = () => {
    dispatch(AuthAction.Signout());
    NavigationService.resetStack("AuthStack", { screen: "Login" });
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await dispatch(AuthMiddleware.DeleteAccount(user?.token));
      setDeleteAccountDialogShow(false);
      Alert.alert(
        "Account Deleted",
        "Your account has been successfully deleted.",
        [
          {
            text: "OK",
            onPress: () => {
              dispatch(AuthAction.Signout());
              NavigationService.resetStack("AuthStack", { screen: "Login" });
            },
          },
        ],
      );
    } catch (error) {
      console.log("Delete account error:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <View style={styles.container}>
      <Header title={"More"} isBack={false} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{
          flexGrow: 1,
          paddingHorizontal: 10,
          marginTop: Metrix.VerticalSize(34),
        }}
      >
        <View>
          {arr.map((ele, index) => {
            return (
              <View key={index.toString()}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index.toString()}
                  onPress={ele.goto}
                >
                  <View
                    style={{
                      padding: Metrix.HorizontalSize(5),
                      margin: Metrix.HorizontalSize(10),
                      flexDirection: "row",
                      // backgroundColor: 'red',
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {ele.icon}
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      <TextComponent text={ele.title} />
                    </View>

                    <AntDesign name="right" size={18} color={Colors.darkGray} />
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: Colors.lineColor,
                      width: "100%",
                    }}
                  ></View>
                </TouchableOpacity>
              </View>
            );
          })}

          {/* <Button
            title="Log Out"
            onPress={() => {
              setLogoutDialogShow(true);
            }}
            btnStyle={{ marginTop: Metrix.VerticalSize(50) }}
          /> */}
        </View>
      </ScrollView>

      <CustomModal
        title={"Are you sure?"}
        show={logoutDialogShow}
        onCloseModal={() => {
          setLogoutDialogShow(false);
        }}
      >
        <View style={styles.modalStyle}>
          <View style={styles.modalBtnContainer}>
            <View style={{ width: "48%" }}>
              <Button
                title={"Yes, Log Out"}
                textStyle={{ marginLeft: Metrix.HorizontalSize(5) }}
                btnStyle={{
                  height: Metrix.VerticalSize(54),
                  backgroundColor: Colors.lightBlue,
                }}
                onPress={() => {
                  setLogoutDialogShow(false);
                  LogoutBtn();
                }}
                shadow
              />
            </View>
            <View style={{ width: "48%" }}>
              <Button
                title={"Cancel"}
                textStyle={{
                  marginLeft: Metrix.HorizontalSize(5),
                  color: Colors.white,
                }}
                btnStyle={{
                  height: Metrix.VerticalSize(54),
                  backgroundColor: Colors.redDarkShade,
                }}
                onPress={() => {
                  setLogoutDialogShow(false);
                }}
                shadow
              />
            </View>
          </View>
        </View>
      </CustomModal>

      <CustomModal
        title={"Delete Account?"}
        show={deleteAccountDialogShow}
        onCloseModal={() => {
          setDeleteAccountDialogShow(false);
        }}
      >
        <View style={styles.modalStyle}>
          <TextComponent
            text={
              "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
            }
            style={styles.subTitle}
          />
          <View style={styles.modalBtnContainer}>
            <View style={{ width: "48%" }}>
              <Button
                title={isDeleting ? "Deleting..." : "Yes, Delete"}
                textStyle={{ marginLeft: Metrix.HorizontalSize(5) }}
                btnStyle={{
                  height: Metrix.VerticalSize(54),
                  backgroundColor: Colors.redDarkShade,
                }}
                onPress={handleDeleteAccount}
                disabled={isDeleting}
                shadow
              />
            </View>
            <View style={{ width: "48%" }}>
              <Button
                title={"Cancel"}
                textStyle={{
                  marginLeft: Metrix.HorizontalSize(5),
                  color: Colors.white,
                }}
                btnStyle={{
                  height: Metrix.VerticalSize(54),
                  backgroundColor: Colors.lightBlue,
                }}
                onPress={() => {
                  setDeleteAccountDialogShow(false);
                }}
                shadow
              />
            </View>
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalStyle: {
    backgroundColor: Colors.white,
  },
  modalTitleContainer: {
    marginVertical: Metrix.VerticalSize(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalBtnContainer: {
    marginTop: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subTitle: {
    // flex: 1,
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
    textAlign: "left",
    marginTop: Metrix.VerticalSize(22),
  },
});
