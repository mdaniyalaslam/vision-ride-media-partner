import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { fonts } from '../../config/Constants';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { Button } from '../../components';

const LogoutSuccess = () => {
  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: Metrix.HorizontalSize(30) }}>
        <Image
          source={Images.ic_logout}
          resizeMode="contain"
          style={styles.logo}
        />

        <Text style={styles.title}>You Have Been Logged Out</Text>
        <Text style={styles.subTitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </Text>

        <Button
          title="Back To Login"
          onPress={() => {
            NavigationService.resetStack('AuthStack', { screen: 'Welcome' });
          }}
          btnStyle={{ marginTop: Metrix.VerticalSize(47) }}
        />
      </View>
    </View>
  );
};

export default LogoutSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.background,
  },
  logo: {
    height: Metrix.VerticalSize(130),
    width: Metrix.VerticalSize(130),
    alignSelf: 'center',
  },
  title: {
    width: '100%',
    fontSize: Metrix.customFontSize(32),
    marginTop: Metrix.VerticalSize(15),
    fontFamily: fonts.Bold,
    color: Colors.primary,
    textAlign: 'center',
  },
  subTitle: {
    width: '100%',
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(15),
    marginTop: Metrix.VerticalSize(21),
    color: Colors.textColor,
    textAlign: 'center',
  },
});
