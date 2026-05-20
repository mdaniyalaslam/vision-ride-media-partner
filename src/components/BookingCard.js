import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../config/Constants';
import {   Metrix } from '../config';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';

const BookingCard = ({
  image,
  title,
  durationDateFrom,
  durationDateTo,
  numberOfDays,
  bookingId,
  renterName,
  depositAmount,
  totalAmount,
  payoutAmount,
  deliveryStatus,
  onPress,
  onPressOption
}) => {
  const Colors = useTheme().colors
  const styles = createStyles(Colors)
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          resizeMode="contain"
          source={image}
          style={{ width: Metrix.HorizontalSize(82), height: Metrix.VerticalSize(75), borderRadius: 16 }}
        />

        <View style={styles.cardTopContainer}>
          <View style={{ flex: 1.6 }}>
            <Text
              numberOfLines={2}
              style={{ fontSize: Metrix.customFontSize(14), fontFamily: fonts.SemiBold }}>
              {title}
            </Text>
            <Text style={styles.date}>Duration Date:</Text>
            <Text style={{ fontSize: Metrix.customFontSize(10), fontFamily: fonts.Regular }}>
              From {durationDateFrom} to {durationDateTo} ({numberOfDays} Days)
            </Text>

            <View style={styles.cardTopStatus}>
              <Text style={styles.statusText}>{deliveryStatus}</Text>
            </View>
          </View>

          <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={onPressOption}>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.cardBottomContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bottomHeading}>Booking ID</Text>
          <Text style={styles.headingDetail}>{bookingId}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.bottomHeading}>Renter: </Text>
          <Text style={styles.headingDetail}>{renterName}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.bottomHeading}>Deposit: </Text>
          <Text style={styles.headingDetail}>{depositAmount}</Text>
        </View>
      </View>

      <View style={styles.cardBottomContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bottomHeading}>Amount:</Text>
          <Text style={styles.headingDetail}>{totalAmount}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.bottomHeading}>Payout </Text>
          <Text style={styles.headingDetail}>{payoutAmount}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.bottomHeading}>Delivery </Text>
          <AntDesign name="checkcircle" size={18} color={'#44C05F'} style={{ marginTop: Metrix.VerticalSize(4) }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const createStyles = Colors => StyleSheet.create({
  container: {
    margin: Metrix.VerticalSize(3),
    marginVertical: Metrix.VerticalSize(6),
    padding: Metrix.HorizontalSize(10),
    shadowColor: Colors.primary,
    borderRadius: 12,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  cardTopContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: Metrix.HorizontalSize(8),
    paddingTop: Metrix.VerticalSize(8),
  },
  date: {
    fontSize: Metrix.customFontSize(12),
    color: Colors.darkGray,
    fontFamily: fonts.Regular,
    paddingVertical: Metrix.VerticalSize(3),
  },
  cardTopStatus: {
    width: Metrix.HorizontalSize(80),
    marginTop: Metrix.VerticalSize(3),
    paddingVertical: Metrix.VerticalSize(5),
    backgroundColor: Colors.successBg,
    borderRadius: 8,
  },
  statusText: {
    textAlign: 'center',
    color: Colors.successColor,
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(11)
  },
  cardBottomContainer: {
    marginTop: Metrix.VerticalSize(2),
    paddingVertical: Metrix.VerticalSize(5),
    flexDirection: 'row',
  },
  bottomHeading: {
    fontSize: Metrix.customFontSize(11),
    fontFamily: fonts.Medium,
    color: Colors.textLightColor,
  },
  headingDetail: { fontFamily: fonts.Regular, fontSize: Metrix.customFontSize(12) },
});

export default BookingCard;
