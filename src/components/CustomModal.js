import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';

import { Colors, Images, Metrix } from '../config';
import useStyle from '../screens/styles';
import { fonts } from '../config/Constants';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TextComponent from './TextComponent';

function CustomModal({
  show,
  onCloseModal,
  children,
  customStyles,
  customBackdropStyle,
  backDropPress,
  title,
}) {
  const gStyle = useStyle();
  let toastConfig = {
    ToastSuccess: props => {
      return (
        <BaseToast
          {...props}
          style={{
            backgroundColor: Colors.background,
            borderLeftColor: 'green',
          }}
          text1Style={{ color: Colors.textColor }}
        />
      );
    },
    ToastError: props => (
      <BaseToast
        {...props}
        style={{ backgroundColor: Colors.background, borderLeftColor: 'red' }}
        text1Style={{ color: Colors.textColor }}
      />
    ),
  };
  return (
    <Modal
      visible={show}
      onRequestClose={onCloseModal}
      transparent={true}
      animationType="fade"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <View
          onTouchEnd={backDropPress}
          style={{ ...styles.modalContainer, ...customBackdropStyle }}
        >
          <View style={[styles.modalStyle, customStyles]}>
            <View style={{ ...gStyle.row, justifyContent: 'space-between' }}>
              <TextComponent
                isSubTitle
                customStyles={{ fontSize: 22, color: Colors.primary }}
                text={title}
              />

              <TouchableOpacity onPress={onCloseModal}>
                <Fontisto name="close" size={22} color={Colors.primary} />
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast config={toastConfig} />
    </Modal>
  );
}

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalStyle: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
});
