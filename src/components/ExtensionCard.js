import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../config/Constants';
import { Metrix } from '../config';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Button from './Button';
import { useTheme } from '@react-navigation/native';

const ExtensionCard = ({
  image,
  title,
  durationDateFrom,
  durationDateTo,
  numberOfDays,
  bookingId,
  ownerName,
  extensionDays,
  totalAmount,
  onPressRemarks,
  status,
}) => {
  const Colors = useTheme().colors;
  const styles = createStyles(Colors);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          resizeMode="contain"
          source={image}
          style={{
            width: Metrix.HorizontalSize(82),
            height: Metrix.VerticalSize(75),
            borderRadius: 16,
          }}
        />

        <View style={styles.cardTopContainer}>
          <View style={{ flex: 1.6 }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: Metrix.customFontSize(15),
                fontFamily: fonts.SemiBold,
              }}
            >
              {title}
            </Text>
            <Text style={styles.date}>Duration Date:</Text>
            <Text
              style={{
                fontSize: Metrix.customFontSize(10),
                fontFamily: fonts.Regular,
              }}
            >
              From {durationDateFrom} to {durationDateTo} ({numberOfDays} Days)
            </Text>

            {/* <View style={styles.cardTopStatus}>
              <Text style={styles.statusText}>{deliveryStatus}</Text>
            </View> */}
          </View>

          <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
            <TouchableOpacity>
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
          <Text style={styles.bottomHeading}>Owner: </Text>
          <Text style={styles.headingDetail}>{ownerName}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.bottomHeading}>Extension Days </Text>
          <Text style={styles.headingDetail}>{extensionDays}</Text>
        </View>
      </View>

      <View style={styles.cardBottomContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bottomHeading}>Additional Charges:</Text>
          <Text style={styles.headingDetail}>{totalAmount}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.bottomHeading}>Status </Text>
          <View style={styles.cardTopStatus}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Button
            title="Remarks"
            onPress={onPressRemarks}
            textStyle={{ fontSize: Metrix.customFontSize(12) }}
          />
        </View>
      </View>
    </View>
  );
};
const createStyles = Colors =>
  StyleSheet.create({
    container: {
      marginTop: Metrix.VerticalSize(15),
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
      backgroundColor: Colors.warningBg,
      borderRadius: 8,
    },
    statusText: {
      textAlign: 'center',
      color: Colors.warningColor,
      fontFamily: fonts.Bold,
      fontSize: Metrix.customFontSize(11),
    },
    cardBottomContainer: {
      paddingVertical: Metrix.VerticalSize(8),
      flexDirection: 'row',
    },
    bottomHeading: {
      fontSize: Metrix.customFontSize(11),
      fontFamily: fonts.Medium,
      color: Colors.darkGray,
    },
    headingDetail: {
      fontFamily: fonts.Regular,
      fontSize: Metrix.customFontSize(12),
    },
  });

export default ExtensionCard;
