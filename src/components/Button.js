import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Colors, Metrix } from '../config';
import { fonts } from '../config/Constants';

function Button({
  title = '',
  onPress = () => {},
  buttonStyle = {},
  titleStyle,
  isDisabled,
  isOutline = false,
  preIcon = null,
  postIcon = null,
}) {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.7}
      onPress={onPress}
      style={
        isOutline
          ? { ...styles.outline, ...buttonStyle }
          : {
              ...styles.container,
              ...buttonStyle,
            }
      }
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {preIcon}
        <Text
          style={
            isOutline
              ? {
                  ...styles.title,
                  color: Colors.primary,
                  ...titleStyle,
                }
              : {
                  ...styles.title,
                  ...titleStyle,
                }
          }
        >
          {title}
        </Text>
        {postIcon}
      </View>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: Metrix.HorizontalSize(45),
    // width: '100%',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: fonts.SemiBold,
    // fontSize: Metrix.FontExtraSmall,
    color: Colors.white,
    marginHorizontal: 5,
  },
  outline: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    height: Metrix.HorizontalSize(45),
    // width: '100%',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
