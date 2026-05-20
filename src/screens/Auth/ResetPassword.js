import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Colors, Metrix, NavigationService } from '../../config';
import { Button, Header, TextField } from '../../components';
import { fonts, ToastError } from '../../config/Constants';
import useStyle from '../styles';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ResetPassword({ route }) {
  const gStyle = useStyle();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const { emailAddress } = route?.params;

  const submit = () => {
    return;
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
      AuthMiddleware.ChangePassword({
        userEmail: emailAddress,
        newPassword: password1,
        confirmPassword: password2,
      }),
    )
      .then(data => {
        NavigationService.navigate('AuthStack', { screen: 'Login' });
      })
      .catch(err => console.warn(err));
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <ScrollView style={styles.main_View} bounces={false}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={gStyle.description}>
          Create a new password for your account.
        </Text>
        <View>
          <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
            <Text style={styles.subTitle}> New Password </Text>
            <TextField
              value={password1}
              placeholder="New Password*"
              onChangeText={text => setPassword1(text)}
              secureTextEntry={true}
            />
          </View>

          <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
            <Text style={styles.subTitle}> Confirm Password </Text>
            <TextField
              value={password2}
              placeholder="Confirm Password*"
              onChangeText={text => setPassword2(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={{ marginTop: Metrix.VerticalSize(20) }}>
            <Button title={'Reset Password'} onPress={submit} />
          </View>
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
  title: {
    fontFamily: fonts.Bold,
    marginTop: Metrix.VerticalSize(140),
    fontSize: Metrix.customFontSize(28),
    color: Colors.primary,
  },
  main_View: {
    marginTop: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  subTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: Metrix.customFontSize(14),
    color: Colors.primary,
  },
});
