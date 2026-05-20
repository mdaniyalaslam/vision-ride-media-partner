import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { fonts } from '../../config/Constants';

const PleaseWait = () => {
  const [isSuccess, setIsSuccess] = useState('wait');
  useEffect(() => {
    setTimeout(() => {
      setIsSuccess('success');
    }, 3000);
  });

  return (
    <View style={styles.container}>
      {isSuccess === 'wait' ? (
        <>
          <Image
            source={Images.please_wait}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>Please Wait!</Text>
          <Text style={styles.subTitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </>
      ) : isSuccess === 'success' ? (
        <>
          <Image
            source={Images.license_verified}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>License Verified Successful</Text>
          <Text style={styles.subTitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <View
            style={{
              marginTop: Metrix.VerticalSize(62),
              marginHorizontal: Metrix.HorizontalSize(20),
            }}
          >
            <Button
              title={'Go To Home'}
              onPress={() => {
                NavigationService.resetStack('UserStack', { screen: 'Home' });
              }}
              btnStyle={{ backgroundColor: Colors.white }}
              textStyle={{ color: Colors.primary }}
            />
          </View>
        </>
      ) : (
        <>
          <Image
            source={Images.license_failed}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>License Verification Failed</Text>
          <Text style={styles.subTitle}>
            We couldn’t verify your driving license. Please double-check your
            details and try again. For assistance, contact our support team:
            contact@starcarinsurance.com
          </Text>
          <View
            style={{
              marginTop: Metrix.VerticalSize(62),
              marginHorizontal: Metrix.HorizontalSize(20),
            }}
          >
            <Button
              title={'Resubmit Your License'}
              onPress={() => {
                NavigationService.resetStack('LicenseUploading');
              }}
              btnStyle={{ backgroundColor: Colors.white }}
              textStyle={{ color: Colors.primary }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default PleaseWait;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  logo: {
    height: Metrix.VerticalSize(153),
    width: Metrix.VerticalSize(259),
    alignSelf: 'center',
    marginTop: Metrix.VerticalSize(110),
  },
  title: {
    marginHorizontal: Metrix.HorizontalSize(40),
    fontSize: Metrix.customFontSize(32),
    fontFamily: fonts.Bold,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(22),
  },
  subTitle: {
    // flex: 1,
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(12),
    marginHorizontal: Metrix.HorizontalSize(20),
    color: Colors.background,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(22),
  },
});
