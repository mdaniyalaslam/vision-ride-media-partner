import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from '../../components';
import Octicons from 'react-native-vector-icons/Octicons';
import { fonts } from '../../config/Constants';

const PleaseWaitUnderReview = () => {
  return (
    <View
      style={{
        ...styles.container,
        paddingHorizontal: Metrix.HorizontalSize(30),
      }}
    >
      <Image
        source={Images.body_shop}
        style={styles.loadingImage}
        resizeMode="contain"
      />
      <Text style={styles.titleBig}>
        Please Wait! Your Application Is Under Review
      </Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </Text>

      <Button
        title={'Nearby Body Shop'}
        onPress={() => {
          NavigationService.replaceScreen('BodyShop');
        }}
        preIcon={
          <Octicons
            name={'search'}
            color={Colors.primary}
            size={Metrix.customFontSize(22)}
          />
        }
        btnStyle={{
          backgroundColor: Colors.white,
          marginTop: Metrix.VerticalSize(50),
        }}
        textStyle={{
          color: Colors.primary,
          marginLeft: Metrix.HorizontalSize(10),
          fontFamily: fonts.Bold,
          fontSize: Metrix.customFontSize(15),
        }}
      />
    </View>
  );
};

export default PleaseWaitUnderReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  loadingImage: {
    width: '90%',
    height: Metrix.VerticalSize(270),
    marginTop: Metrix.HorizontalSize(80),
    alignSelf: 'center',
  },
  titleBig: {
    fontSize: Metrix.customFontSize(30),
    fontFamily: fonts.Bold,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(20),
  },
  description: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Regular,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(10),
  },
  eyeIconStyle: {
    position: 'absolute',
    zIndex: 100,
    top: 14,
    padding: 10,
    left: 0,
  },
});
