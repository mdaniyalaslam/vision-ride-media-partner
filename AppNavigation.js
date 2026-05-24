import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Login from "./src/screens/Auth/Login";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./src/screens/Auth/SignUp";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Colors, Metrix, NavigationService } from "./src/config";
import Verification from "./src/screens/Auth/Verification";
import EmailVerified from "./src/screens/Auth/EmailVerified";
import LicenseUploading from "./src/screens/Auth/LicenseUploading";
import PleaseWait from "./src/screens/Auth/PleaseWait";
import BottomTabScreen from "./src/screens/Apps/BottomTabScreen";
import AddCar from "./src/screens/Apps/AddCar";
import Notification from "./src/screens/Apps/Notification";
import Evaluating from "./src/screens/Apps/Evaluating";
import ReportAnAccident from "./src/screens/Apps/ReportAnAccident";
import BodyShop from "./src/screens/Apps/BodyShop";
import CarDelivered from "./src/screens/Apps/CarDelivered";
import ChangePassword from "./src/screens/Apps/ChangePassword";
import ChangePasswordAuth from "./src/screens/Auth/ChangePassword";
import WebViewScreen from "./src/screens/Apps/WebViewScreen";

import Payments from "./src/screens/Apps/Payments";
import TermsConditions from "./src/screens/Apps/TermsConditions";
import PrivacyPolicy from "./src/screens/Apps/SupportMain";
import AboutTheApp from "./src/screens/Apps/AboutTheApp";
import FAQs from "./src/screens/Apps/FAQs";
import ContactUs from "./src/screens/Apps/ContactUs";
import ForgotPassword from "./src/screens/Auth/ForgotPassword";
import ResetPassword from "./src/screens/Auth/ResetPassword";
import LogoutSuccess from "./src/screens/Apps/LogoutSuccess";
import PleaseWaitUnderReview from "./src/screens/Apps/PleaseWaitUnderReview";
import VehicleDetails from "./src/screens/Apps/VehicleDetails";
import Orders from "./src/screens/Apps/Orders";
import {
  Profile,
  Invoices,
  Support,
  BankAccounts,
  MoreCompany,
  MoreSupportCenter,
  OrderDetails,
  MonthlyMileage,
  MonthlyDetail,
  AddMonthlyMileage,
} from "./src/screens";

const Stack = createStackNavigator();

//Auth Stack
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="EmailVerified" component={EmailVerified} />
      <Stack.Screen name="LicenseUploading" component={LicenseUploading} />
      <Stack.Screen name="PleaseWait" component={PleaseWait} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ChangePasswordAuth" component={ChangePasswordAuth} />

      {/* <Stack.Screen name="AccountReview" component={AccountReview} /> */}
    </Stack.Navigator>
  );
};

//User Stack
const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabScreen" component={BottomTabScreen} />
      <Stack.Screen name="AddCar" component={AddCar} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Invoices" component={Invoices} />
      <Stack.Screen name="BankAccounts" component={BankAccounts} />
      <Stack.Screen
        name="Evaluating"
        component={Evaluating}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="ReportAnAccident" component={ReportAnAccident} />
      <Stack.Screen name="BodyShop" component={BodyShop} />
      <Stack.Screen name="CarDelivered" component={CarDelivered} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />

      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="AboutTheApp" component={AboutTheApp} />
      <Stack.Screen name="FAQs" component={FAQs} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="LogoutSuccess" component={LogoutSuccess} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="MoreCompany" component={MoreCompany} />
      <Stack.Screen name="MoreSupportCenter" component={MoreSupportCenter} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="MonthlyMileage" component={MonthlyMileage} />
      <Stack.Screen name="MonthlyDetail" component={MonthlyDetail} />
      <Stack.Screen name="AddMonthlyMileage" component={AddMonthlyMileage} />
      <Stack.Screen
        name="PleaseWaitUnderReview"
        component={PleaseWaitUnderReview}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
const AppNavigation = () => {
  const loading = useSelector((state) => state.LoaderReducer.loading);
  const user = useSelector((state) => state.AuthReducer.user);
  console.log("User in AppNavigation:", user);
  return (
    <>
      <NavigationContainer
        ref={(ref) => NavigationService.setTopLevelNavigator(ref)}
      >
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={!user ? "AuthStack" : "UserStack"}
        >
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="UserStack" component={UserStack} />
        </Stack.Navigator>
      </NavigationContainer>
      {loading && (
        <View
          style={{
            height: Metrix.VerticalSize(),
            width: Metrix.HorizontalSize(),
            position: "absolute",
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              paddingHorizontal: Metrix.VerticalSize(30),
              paddingVertical: Metrix.VerticalSize(30),
              borderRadius: Metrix.VerticalSize(10),
              backgroundColor: Colors.primary,
              borderWidth: 1,
              borderColor: Colors.primary,
            }}
          >
            <ActivityIndicator size="large" color={Colors.white} />
          </View>
        </View>
      )}
    </>
  );
};

export default AppNavigation;
