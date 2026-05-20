import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Images, Metrix, NavigationService } from '../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../config/Constants';
export default function HomeWidget({
  text = null,
  icon = () => {},
  count = 0,
}) {
  return (
    <View
      style={{
        width: Metrix.HorizontalSize(88),
        height: Metrix.VerticalSize(94),
        marginHorizontal: Metrix.HorizontalSize(2),
        backgroundColor: Colors.primaryLight,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 16,
        borderColor: Colors.primary,
        borderWidth: 0.5,
      }}
    >
      {icon()}
      <Text
        style={{
          fontFamily: fonts.SemiBold,
          color: Colors.primary,
          padding: 10,
        }}
      >
        {count}
      </Text>
      <Text
        style={{
          fontFamily: fonts.Regular,
          color: Colors.primary,
          fontSize: 9,
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: Metrix.HorizontalSize(100),
  },
  containerTopRound: {
    height: Metrix.VerticalSize(200),
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: Metrix.customFontSize(22),
    fontFamily: fonts.SemiBold,
    color: Colors.white,
    marginTop: 10,
  },
});
