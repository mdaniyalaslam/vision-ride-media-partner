import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Metrix, NavigationService } from '../../config';
import { emailValidityCheck, fonts, ToastError } from '../../config/Constants';
import { Button, Header, TextComponent, TextField } from '../../components';
import useStyle from '../styles';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthMiddleware } from '../../redux/Middlewares';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const gStyle = useStyle();
  const { user } = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const Submit = () => {
    if (!emailAddress) {
      Toast.show(ToastError('Please provide an email.'));
      return;
    }
    if (!emailValidityCheck(emailAddress)) {
      Toast.show(ToastError('Please enter a valid email address.'));
      return;
    }
    dispatch(
      AuthMiddleware.ForgetPassword({
        email: emailAddress,
        token: user?.token,
      }),
    )
      .then(data => {
        NavigationService.navigate('Verification', {
          emailAddress: emailAddress,
        });
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.container}>
      <Header title={'Forgot Password'} />
      <ScrollView bounces={false} style={styles.main_View}>
        <TextComponent
          text="Please enter the email address associated with your account and We
          will email you a OTP to reset your password."
          customStyles={gStyle.description}
        />

        <TextField
          label="Email Address"
          value={emailAddress}
          onChangeText={text => setEmailAddress(text)}
        />

        <View style={{ marginTop: Metrix.VerticalSize(20) }}>
          <Button title={'Next'} onPress={Submit} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: fonts.Bold,
    marginVertical: Metrix.VerticalSize(20),
    fontSize: Metrix.customFontSize(28),
    color: Colors.textColor,
  },

  description: {
    fontFamily: fonts.Light,
    marginVertical: Metrix.VerticalSize(20),
    fontSize: Metrix.customFontSize(14),
    color: Colors.textColor,
  },
  main_View: {
    marginTop: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  subTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: Metrix.customFontSize(14),
    color: Colors.labelColor,
  },
});
