import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Metrix, NavigationService } from '../../config';
import { Button, Header, TextComponent, TextField } from '../../components';
import { fonts, ToastError } from '../../config/Constants';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AuthMiddleware } from '../../redux/Middlewares';
import { useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useStyle from '../styles';

export default function ChangePassword({ route }) {
  const gStyle = useStyle();
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [seeNewPassword, setNewSeePassword] = useState(false);
  const [seeConfirmPassword, setConfrimSeePassword] = useState(false);
  const { emailAddress, otp } = route?.params;

  const toggleSeeNewPassword = () => {
    setNewSeePassword(!seeNewPassword);
  };
  const toggleSeeConfirmPassword = () => {
    setConfrimSeePassword(!seeConfirmPassword);
  };

  const submit = () => {
    if (!password1) {
      Toast.show(ToastError('Please create a new password.'));
      return;
    }
    if (!password2) {
      Toast.show(ToastError('Please confirm your password.'));
      return;
    }
    if (password1 != password2) {
      Toast.show(ToastError('Passwords do not match.'));
      return;
    }
    if (!password1.trimLeft() || !password2.trimLeft()) {
      Toast.show(ToastError('Please enter a valid password.'));
      return;
    }

    dispatch(
      AuthMiddleware.ResetPassword({
        otp: otp,
        email: emailAddress,
        password: password1,
        password_confirmation: password2,
      }),
    )
      .then(data => {
        NavigationService.navigate('AuthStack', { screen: 'Login' });
      })
      .catch(err => console.warn(err));
  };

  return (
    <View style={styles.container}>
      <Header title={'Reset Password'} />
      <ScrollView bounces={false} style={styles.main_View}>
        <TextComponent
          text="Create a new password for your account."
          customStyles={styles.subTitle}
        />

        <TextField
          secureTextEntry={!seeNewPassword}
          label="New Password*"
          value={password1}
          onChangeText={text => setPassword1(text)}
          rightIcon={
            <TouchableOpacity onPress={toggleSeeNewPassword}>
              <Ionicons
                name={seeNewPassword ? 'eye-outline' : 'eye-off-outline'}
                color={Colors.darkGray}
                size={Metrix.customFontSize(20)}
              />
            </TouchableOpacity>
          }
        />
        <TextField
          secureTextEntry={!seeConfirmPassword}
          label="Confirm Password*"
          value={password2}
          onChangeText={text => setPassword2(text)}
          rightIcon={
            <TouchableOpacity onPress={toggleSeeConfirmPassword}>
              <Ionicons
                name={seeConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                color={Colors.darkGray}
                size={Metrix.customFontSize(20)}
              />
            </TouchableOpacity>
          }
        />

        <Button
          title="Confirm"
          onPress={() => {
            submit();
          }}
          buttonStyle={{ marginTop: Metrix.VerticalSize(40) }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    width: '100%',
    fontSize: Metrix.customFontSize(35),
    fontFamily: fonts.Bold,
    color: Colors.primary,

    paddingTop: 10,
  },
  subTitle: {
    width: '100%',
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(14),
    color: Colors.textColor,
    marginTop: Metrix.VerticalSize(10),
  },
  main_View: {
    marginTop: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
});
