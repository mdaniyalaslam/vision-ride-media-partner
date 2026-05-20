import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';
import { Colors, Images, Metrix } from '../../config';
import { Header } from '../../components';
import { fonts } from '../../config/Constants';

const AboutTheApp = () => {
  return (
    <ScrollView style={styles.container} bounces={false}>
      <View>
        <Header backIcon={true} title={'About The App'} />
        <View
          style={{
            marginTop: Metrix.HorizontalSize(30),
          }}
        >
          <Image
            source={Images.about_the_app_group}
            style={{
              width: '100%',
              height: Metrix.VerticalSize(314),
              position: 'absolute',
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              ...styles.description,
              width: '50%',
              marginLeft: Metrix.HorizontalSize(30),
              // marginTop: Metrix.VerticalSize(30)
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Text
            style={{
              ...styles.description,
              width: '50%',
              color: Colors.white,
              marginLeft: Metrix.HorizontalSize(30),
              marginTop: Metrix.VerticalSize(80),
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={Images.about_the_app_group_1}
            style={{
              width: Metrix.HorizontalSize(129),
              marginLeft: Metrix.HorizontalSize(30),
              height: Metrix.VerticalSize(263),
              marginTop: Metrix.VerticalSize(90),
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              ...styles.description,
              // width: '50%',
              flex: 1, // Take up remaining space
              // color: Colors.white,
              marginHorizontal: Metrix.HorizontalSize(20),
              marginTop: Metrix.VerticalSize(80),
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>
        </View>

        <Text
          style={{
            ...styles.description,
            marginHorizontal: Metrix.HorizontalSize(30),
            marginTop: Metrix.VerticalSize(30),
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </Text>

        {/* <Text style={styles.title}>Heading 1</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam.
          </Text>
          <Text style={styles.title}>Heading 2</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam.
          </Text>
          <Text style={styles.title}>Heading 3</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam.
          </Text>
          <Text style={styles.title}>Heading 4</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam.
          </Text> */}
        <View style={{ height: Metrix.VerticalSize(40) }}></View>
      </View>
    </ScrollView>
  );
};

export default AboutTheApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(16),
    marginTop: Metrix.VerticalSize(40),

    color: Colors.primary,
  },
  description: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
    marginTop: Metrix.VerticalSize(13),
  },
});
