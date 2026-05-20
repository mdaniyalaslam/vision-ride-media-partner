import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { fonts } from '../config/Constants';
import { Colors } from '../config';

const TextComponent = ({
  text = '',
  customStyles = {},
  isTitle = false,
  isSubTitle = false,
  isLabel = false,
  onPress = null,
  ...rest
}) => {
  return (
    <Text
      onPress={onPress}
      style={{
        fontFamily: isTitle
          ? fonts.Bold
          : isSubTitle
          ? fonts.SemiBold
          : fonts.Regular,
        fontSize: 12,
        // color: isLabel ? Colors.commonBlack : Colors.grayText,
        ...customStyles,
      }}
      {...rest}
    >
      {text}
    </Text>
  );
};

export default TextComponent;

const styles = StyleSheet.create({});
