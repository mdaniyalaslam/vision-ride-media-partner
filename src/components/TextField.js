import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Colors, Images, Metrix } from '../config';
import { fonts } from '../config/Constants';
import TextComponent from './TextComponent';

function TextField({
  isZeroAllowed = false,
  isPrice = false,
  value = '',
  placeholder = 'Type here',
  leftIcon,
  rightIcon = null,
  inputStyle,
  multiline,
  keyboardType,
  editable = true,
  inputContainerStyle,
  autoCapitalize = '',
  maxLength = 1000,
  secureTextEntry = false,
  iconContainerStyle,
  leftIconContainer = {},
  onChangeText = null,
  onFocus = () => {},
  onBlur = () => {},
  label = '',
  placeholderTextColor = Colors.textColor,
}) {
  return (
    <>
      {label && <TextComponent customStyles={styles.labelText} text={label} />}
      <View style={{ ...styles.inputContainer, ...inputContainerStyle }}>
        {leftIcon && (
          <View
            style={{
              ...leftIconContainer,
            }}
          >
            {leftIcon}
          </View>
        )}
        <TextInput
          editable={editable}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={text => {
            const validate = isZeroAllowed
              ? text.match(/^$|^0$|^0\.\d{0,2}$|^[1-9]\d*(\.\d{0,2})?$/)
              : text.match(/^(?!0$)(\d*\.{0,1}\d{0,2})$/);
            if (isPrice) {
              if (validate) {
                onChangeText(text);
                return;
              }
            } else {
              onChangeText(text);
            }
          }}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={{
            ...styles.input,
            ...inputStyle,
            width: rightIcon ? '90%' : '100%',
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <View style={{ justifyContent: 'center', ...iconContainerStyle }}>
          {rightIcon}
        </View>
      </View>
    </>
  );
}

export default TextField;

const styles = StyleSheet.create({
  iconStyle: {
    // right:true,
    position: 'absolute',
    zIndex: 100,
    top: Metrix.VerticalSize(22),
  },
  input: {
    // marginTop: Metrix.VerticalSize(10),
    // width: '90%',
    // height: Metrix.VerticalSize(48),
    fontSize: Metrix.customFontSize(12),
    padding: 5,
    paddingLeft: Metrix.HorizontalSize(10),
    color: Colors.black,
    // backgroundColor: Colors.textFiledBG,
    borderRadius: 10,
    fontFamily: fonts.Regular,
  },
  labelText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(11),
    color: Colors.labelColor,
    marginVertical: 12,
  },

  inputContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: Colors.textFiledBG,
    height: Metrix.VerticalSize(48),
    width: '100%',
  },
});
