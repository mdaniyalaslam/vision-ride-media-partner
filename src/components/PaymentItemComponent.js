import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix, NavigationService} from '../config';
import {fonts} from '../config/Constants';
import Button from './Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

const PaymentItemComponent = ({item, index}) => {
  return (
    <View>
      <View
        style={{
          ...styles.itemContainer,
          paddingHorizontal: Metrix.HorizontalSize(20),
        }}>
        <View
          style={{
            // marginHorizontal: Metrix.HorizontalSize(20),
            marginTop: Metrix.VerticalSize(10),
            justifyContent: 'center',
          }}>
          <Text style={styles.itemName}>2000 BMW 3-Series</Text>
          <Text style={styles.itemDescription}>AFV-7567</Text>
        </View>
        <View
          style={{
            marginTop: Metrix.VerticalSize(10),
            backgroundColor: Colors.white,
            paddingHorizontal: Metrix.HorizontalSize(16),
            paddingVertical: Metrix.VerticalSize(10),
            borderRadius: Metrix.HorizontalSize(16),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{...styles.itemName, flex: 1, color: Colors.primary}}>
              Collision Coverage
            </Text>
            <Text
              style={{
                fontSize: Metrix.customFontSize(21),
                fontFamily: fonts.Bold,
                color: Colors.primary,
              }}>
              $30
              <Text style={styles.itemDescription1}> /month</Text>
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: Metrix.VerticalSize(10),
            }}>
            <Text
              style={{
                ...styles.itemDescription1,
                flex: 1, // Take up remaining space
                marginRight: Metrix.HorizontalSize(10), // Add spacing
              }}>
              Last Pay Date: 02 Nov
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: Metrix.HorizontalSize(-5),
              }}>
              <Text style={styles.itemDescription1}>View Details</Text>
              <TouchableOpacity
                onPress={() => {
                  NavigationService.navigate('Payments', {
                    screen: 'Collision',
                  });
                }}>
                <Image
                  source={Images.right_arrow}
                  style={{
                    width: Metrix.HorizontalSize(30),
                    height: Metrix.HorizontalSize(30),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: Metrix.VerticalSize(20),
            marginBottom: Metrix.VerticalSize(10),
            backgroundColor: Colors.white,
            paddingHorizontal: Metrix.HorizontalSize(16),
            paddingVertical: Metrix.VerticalSize(10),
            borderRadius: Metrix.HorizontalSize(16),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{...styles.itemName, flex: 1, color: Colors.primary}}>
              Comprehensive Coverage
            </Text>
            <Text
              style={{
                fontSize: Metrix.customFontSize(21),
                fontFamily: fonts.Bold,
                color: Colors.primary,
              }}>
              $30
              <Text style={styles.itemDescription1}> /month</Text>
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: Metrix.VerticalSize(10),
            }}>
            <Text
              style={{
                ...styles.itemDescription1,
                flex: 1, // Take up remaining space
                marginRight: Metrix.HorizontalSize(10), // Add spacing
              }}>
              Last Pay Date: 02 Nov
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: Metrix.HorizontalSize(-5),
              }}>
              <Text style={styles.itemDescription1}>View Details</Text>
              <TouchableOpacity
                onPress={() => {
                  NavigationService.navigate('Payments', {
                    screen: 'comprehensive',
                  });
                }}>
                <Image
                  source={Images.right_arrow}
                  style={{
                    width: Metrix.HorizontalSize(30),
                    height: Metrix.HorizontalSize(30),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentItemComponent;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 16,
    marginTop: Metrix.VerticalSize(16),
    // overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,
    paddingVertical: Metrix.VerticalSize(10),
  },

  itemName: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Bold,
    color: Colors.white,
    textAlign: 'left',
  },

  status: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Regular,
    color: Colors.darkGray,
  },
  itemDescription: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Regular,
    color: Colors.white,
  },
  itemDescription1: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Medium,
    color: Colors.grayText,
  },
});
