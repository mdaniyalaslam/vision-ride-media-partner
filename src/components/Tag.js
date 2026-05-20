import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Colors, Metrix } from '../config';
import {
  fonts,
  getTagBackgroundColor,
  getTagTextColor,
} from '../config/Constants';

function Tag({ text = '', id = 0, type = 'default' || 'round' }) {
  // text = text.toUpperCase();
  // id = text == 'WINNING' ? 2 : text == 'PENDING' ? 1 : text == 'FAILED' ? 3 : 0;
  var backgroundColor = getTagBackgroundColor(id);
  var Textcolor = getTagTextColor(id);
  if (type === 'round') {
    return (
      <View style={{}}>
        <Text style={{ ...styles.statusText, color: Textcolor }}>
          {' '}
          ({text})
        </Text>
      </View>
    );
  }
  if (type === 'default') {
    return (
      <View
        style={{
          ...styles.cardTopStatus,
          backgroundColor: backgroundColor,
        }}
      >
        <Text style={{ ...styles.statusText, color: Textcolor }}>{text}</Text>
      </View>
    );
  }
}

export default Tag;

const styles = StyleSheet.create({
  cardTopStatus: {
    width: Metrix.HorizontalSize(100),
    height: Metrix.VerticalSize(25),
    // marginTop: Metrix.VerticalSize(3),
    padding: 5,
    backgroundColor: Colors.successBg,
    borderRadius: 14,
    // paddingHorizontal: 8
  },
  statusText: {
    textAlign: 'center',
    color: Colors.successColor,
    // fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(11),
  },
});
