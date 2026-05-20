import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Header } from '../../components';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { fonts } from '../../config/Constants';

const Payments = ({ route }) => {
  const { screen } = route?.params;
  return (
    <View style={styles.container}>
      <Header backIcon={true} title={'Payments'} />
      <View
        style={{
          marginHorizontal: Metrix.HorizontalSize(30),
          marginTop: Metrix.VerticalSize(30),
        }}
      >
        <Text style={styles.title}>
          {screen == 'comprehensive'
            ? 'Comprehensive Coverage Plan'
            : 'Collision Coverage Plan'}
        </Text>

        <View style={styles.itemContainer}>
          <View
            style={{
              marginHorizontal: Metrix.HorizontalSize(20),
              // marginTop: Metrix.VerticalSize(20),
              justifyContent: 'center',
            }}
          >
            <Text style={styles.itemName}>2000 BMW 3-Series</Text>
            <Text style={styles.itemDescription}>AFV-7567</Text>
          </View>

          <View
            style={{
              // flex: 1,
              width: '100%',
              marginTop: Metrix.VerticalSize(10),
              height: Metrix.VerticalSize(1),
              backgroundColor: Colors.lineColor,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: Metrix.VerticalSize(16),
              marginHorizontal: Metrix.HorizontalSize(20),
            }}
          >
            <View
              style={{
                width: Metrix.HorizontalSize(124),
                height: Metrix.VerticalSize(82),
                backgroundColor: Colors.lightBlue,
                zIndex: -2,
                borderRadius: 12,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  ...styles.itemName,
                  fontSize: Metrix.customFontSize(48),
                  fontFamily: fonts.Bold,
                  color: Colors.white,
                  textAlign: 'center',
                  //   alignSelf: 'center'
                }}
              >
                {screen == 'comprehensive' ? '$30' : '$30'}
              </Text>
            </View>
            {screen == 'comprehensive' ? (
              <Text
                style={{
                  ...styles.itemDescription,
                  width: '46%',
                  marginHorizontal: 10,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  // textAlign: 'left'
                }}
              >
                You have to pay{' '}
                <Text style={{ color: Colors.primary, fontFamily: fonts.Bold }}>
                  $30/month
                </Text>{' '}
                , for a Comprehensive Coverage regardless of the vehicle's
                value.{' '}
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.itemDescription,
                  width: '45%',
                  marginHorizontal: 20,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              >
                Your car worth is{' '}
                <Text style={{ color: Colors.primary, fontFamily: fonts.Bold }}>
                  $23,000
                </Text>{' '}
                This is your one month billing. You have to pay{' '}
                <Text style={{ color: Colors.primary, fontFamily: fonts.Bold }}>
                  $1 per day.
                </Text>
              </Text>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: Metrix.HorizontalSize(20),
              marginTop: Metrix.VerticalSize(10),
            }}
          >
            <Text
              style={{
                ...styles.itemDescription,
              }}
            >
              Last Pay Date:
              <Text style={{ color: Colors.darkGray }}> 02 Nov</Text>
            </Text>
            <Text
              style={{
                ...styles.itemDescription,
              }}
            >
              Payment Due:
              <Text style={{ color: Colors.darkGray }}> 02 Dec</Text>
            </Text>
          </View>
          {screen == 'comprehensive' ? (
            <Text
              style={{
                ...styles.itemDescription,

                fontFamily: fonts.Regular,
                color: Colors.primary,
                textAlign: 'center',
                backgroundColor: '#08209A1A',
                marginHorizontal: Metrix.HorizontalSize(20),
                marginTop: Metrix.VerticalSize(20),
                borderRadius: 12,
                padding: 10,
              }}
            >
              Note: Claims will only be available once SCI has{' '}
              <Text style={{ color: Colors.primary, fontFamily: fonts.Bold }}>
                50K customers
              </Text>{' '}
              for comprehensive coverage.
            </Text>
          ) : (
            <Text
              style={{
                ...styles.itemDescription,

                fontFamily: fonts.Regular,
                color: Colors.primary,
                textAlign: 'center',
                backgroundColor: '#08209A1A',
                marginHorizontal: Metrix.HorizontalSize(20),
                marginTop: Metrix.VerticalSize(20),
                borderRadius: 12,
                padding: 10,
              }}
            >
              Note: You must pay 1 month upfront, and claims will only be
              available once SCI has{' '}
              <Text style={{ color: Colors.primary, fontFamily: fonts.Bold }}>
                100K customers
              </Text>{' '}
              for collision coverage.
            </Text>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            NavigationService.resetStack('UserStack', { screen: 'Home' });
          }}
          style={{
            // marginHorizontal: Metrix.HorizontalSize(20),
            marginTop: Metrix.HorizontalSize(20),
            paddingVertical: 10,
            flexDirection: 'row',
            backgroundColor: '#F6C557',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={Images.paypal} style={{ width: 137, height: 34 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: Metrix.customFontSize(20),
    fontFamily: fonts.Bold,
    color: Colors.primary,
  },
  titleNoDataFount: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Bold,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  itemContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginTop: Metrix.VerticalSize(16),
    // overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,

    paddingVertical: Metrix.VerticalSize(20),
    // marginHorizontal: Metrix.HorizontalSize(20),
  },
  itemName: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Bold,
    color: Colors.primary,
    textAlign: 'left',
  },
  itemDescription: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Medium,
    color: Colors.grayText,
  },
  itemDescription2: {
    fontSize: Metrix.customFontSize(9),
    fontFamily: fonts.Regular,
    color: Colors.background,
    marginLeft: 5,
  },
  labelText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(11),
    color: Colors.labelColor,
  },
});
