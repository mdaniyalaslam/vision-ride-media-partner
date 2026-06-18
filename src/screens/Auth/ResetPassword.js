import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, Metrix, NavigationService} from '../../config';
import {Button, Header, TextField} from '../../components';
import {fonts, ToastError, ToastSuccess} from '../../config/Constants';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthMiddleware} from '../../redux/Middlewares';
import {useDispatch} from 'react-redux';

export default function ResetPassword({route}) {
  const dispatch = useDispatch();
  const {emailAddress, otp} = route?.params ?? {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirm, setSeeConfirm] = useState(false);

  const submit = () => {
    if (!password) {
      return Toast.show(ToastError('Please create a new password.'));
    }
    if (!confirmPassword) {
      return Toast.show(ToastError('Please confirm your password.'));
    }
    if (password !== confirmPassword) {
      return Toast.show(ToastError('Passwords do not match.'));
    }

    const body = {
      email: emailAddress,
      otp: otp,
      password: password,
      password_confirmation: confirmPassword,
    };

    dispatch(AuthMiddleware.ResetPassword(body))
      .then(data => {
        console.log('ResetPassword Success:', data);
        Toast.show(ToastSuccess('Password reset successfully. Please login.'));
        NavigationService.resetStack('AuthStack');
      })
      .catch(err => console.warn('ResetPassword Error:', err));
  };

  return (
    <View style={styles.container}>
      <Header backIcon={true} title="Reset Password" />
      <ScrollView style={styles.main_View} bounces={false}>
        <Text style={styles.description}>
          Create a new password for your account.
        </Text>

        <TextField
          label="New Password*"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={!seePassword}
          rightIcon={
            <TouchableOpacity onPress={() => setSeePassword(p => !p)}>
              <Ionicons
                name={seePassword ? 'eye-outline' : 'eye-off-outline'}
                color={Colors.darkGray}
                size={Metrix.customFontSize(20)}
              />
            </TouchableOpacity>
          }
        />
        <TextField
          label="Confirm Password*"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={!seeConfirm}
          rightIcon={
            <TouchableOpacity onPress={() => setSeeConfirm(p => !p)}>
              <Ionicons
                name={seeConfirm ? 'eye-outline' : 'eye-off-outline'}
                color={Colors.darkGray}
                size={Metrix.customFontSize(20)}
              />
            </TouchableOpacity>
          }
        />

        <View style={{marginTop: Metrix.VerticalSize(20)}}>
          <Button title={'Reset Password'} onPress={submit} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  main_View: {
    marginTop: Metrix.VerticalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  description: {
    fontFamily: fonts.Regular,
    marginVertical: Metrix.VerticalSize(20),
    fontSize: Metrix.customFontSize(14),
    color: Colors.textColor,
  },
});
