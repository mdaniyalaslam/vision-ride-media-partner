import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, Images, Metrix, NavigationService } from '../config';
import { fonts } from '../config/Constants';
import Button from './Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import TextComponent from './TextComponent';
import moment from 'moment';

const NotificationItemComponent = ({ item, index, customStyles }) => {
  return (
    <View>
      <View
        style={{
          ...styles.itemContainer,
          paddingHorizontal: 10,
          ...customStyles,
        }}
      >
        <TextComponent
          customStyles={styles.itemName}
          text={item?.message || 'N/A'}
        />
        <TextComponent
          customStyles={styles.status}
          text={moment(item?.created_at).format('DD MMM, hh:mm A') || 'N/A'}
        />
      </View>

      {/* <View
        style={{
          alignItems: 'flex-end',
          marginTop: 10,
          paddingRight: Metrix.HorizontalSize(20),
        }}
      >
        <TextComponent customStyles={styles.status} text={'12 Feb, 11:00 PM'} />
      </View> */}
    </View>
  );
};

export default NotificationItemComponent;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.grayBackground,
    borderRadius: 16,
    marginTop: Metrix.VerticalSize(16),
    paddingVertical: Metrix.VerticalSize(10),
    marginHorizontal: Metrix.HorizontalSize(20),
  },

  itemName: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Medium,
    color: Colors.black,
  },

  status: {
    color: Colors.darkGray,
    paddingTop: 10,
    textAlign: 'right',
  },
});
