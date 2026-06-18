import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Metrix, NavigationService } from '../../config';
import { fonts, ToastError, ToastSuccess } from '../../config/Constants';
import { Button, Header, TextField } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthMiddleware } from '../../redux/Middlewares';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [seeOldPassword, setSeeOldPassword] = useState(false);
  const [seeNewPassword, setNewSeePassword] = useState(false);
  const [seeConfirmPassword, setConfrimSeePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user } = useSelector(state => state.AuthReducer);

  const toggleSeeOldPassword = () => {
    setSeeOldPassword(!seeOldPassword);
  };
  const toggleSeeNewPassword = () => {
    setNewSeePassword(!seeNewPassword);
  };
  const toggleSeeConfirmPassword = () => {
    setConfrimSeePassword(!seeConfirmPassword);
  };

  const onConfirmChange = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Toast.show(ToastError('Please fill all fields'));
      return;
    }
    if (newPassword !== confirmPassword) {
      Toast.show(ToastError('New password and confirm password do not match'));
      return;
    }
    const body = {
      current_password: oldPassword,
      new_password: newPassword,
      new_password_confirmation: confirmPassword,
    };
    dispatch(AuthMiddleware.ChangePassword(user?.token, body)).then(res => {
      console.log('ChangePassword Response:', res);
      NavigationService.goBack();
    });
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      <View>
        <Header backIcon={true} title={'Change Password'} />

        <View
          style={{
            paddingHorizontal: 20,
            marginTop: Metrix.VerticalSize(20),
          }}
        >
          <TextField
            secureTextEntry={!seeOldPassword}
            label="Old Password*"
            value={oldPassword}
            onChangeText={text => setOldPassword(text)}
            rightIcon={
              <TouchableOpacity onPress={toggleSeeOldPassword}>
                <Ionicons
                  name={seeOldPassword ? 'eye-outline' : 'eye-off-outline'}
                  color={Colors.darkGray}
                  size={Metrix.customFontSize(20)}
                />
              </TouchableOpacity>
            }
          />
          <TextField
            secureTextEntry={!seeNewPassword}
            label="New Password*"
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
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
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
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
              onConfirmChange();
            }}
            buttonStyle={{ marginTop: Metrix.VerticalSize(40) }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  labelText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(15),
    color: Colors.labelColor,
  },
  itemDescription: {
    fontSize: Metrix.customFontSize(11),
    fontFamily: fonts.Medium,
    color: Colors.textColor,
  },

  eyeIconStyle: {
    position: 'absolute',
    zIndex: 100,
    top: Metrix.VerticalSize(30),
    right: Metrix.HorizontalSize(5),
    padding: 10,
  },
});
