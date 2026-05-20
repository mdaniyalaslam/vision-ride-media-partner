import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button } from '../../components';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { fonts } from '../../config/Constants';

const EmailVerified = () => {
  return (
    <View style={styles.container}>
      <Image
        source={Images.email_verified}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text style={styles.title}>Email Verified</Text>
      <Text style={styles.subTitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>

      <View
        style={{
          marginTop: Metrix.VerticalSize(62),
          marginHorizontal: Metrix.HorizontalSize(20),
        }}
      >
        <Button
          title={'Continue'}
          onPress={() => {
            NavigationService.resetStack('LicenseUploading');
          }}
          btnStyle={{ backgroundColor: Colors.white }}
          textStyle={{ color: Colors.primary }}
        />
      </View>
    </View>
  );
};

export default EmailVerified;

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
    width: '100%',
    fontSize: Metrix.customFontSize(35),
    fontFamily: fonts.Bold,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(22),
  },
  subTitle: {
    // flex: 1,
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(14),
    marginHorizontal: Metrix.HorizontalSize(20),
    color: Colors.background,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(22),
  },
});
