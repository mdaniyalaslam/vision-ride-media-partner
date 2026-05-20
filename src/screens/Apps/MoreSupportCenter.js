import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { Header, TextComponent } from '../../components';
import { fonts } from '../../config/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';

const MoreSupportCenter = props => {
  const arr = [
    {
      title: 'How to Bid',
      icon: (
        <Feather
          name="info"
          size={Metrix.customFontSize(22)}
          color={Colors.primary}
        />
      ),
      goto: () => {
        props.navigation.navigate('WebViewScreen', {
          title: 'How to Bid',
          url: 'https://favorauction.com/page/how-to-bid',
        });
      },
    },

    {
      title: 'How to Sell',
      icon: (
        <Feather
          name="info"
          size={Metrix.customFontSize(22)}
          color={Colors.primary}
        />
      ),
      goto: () => {
        props.navigation.navigate('WebViewScreen', {
          title: 'How to Sell',
          url: 'https://favorauction.com/page/how-to-sell',
        });
      },
    },
    {
      title: 'Privacy Policy',
      icon: (
        <Feather
          name="file-text"
          size={Metrix.customFontSize(22)}
          color={Colors.primary}
        />
      ),
      goto: () => {
        props.navigation.navigate('WebViewScreen', {
          title: 'Privacy Policy',
          url: 'https://favorauction.com/page/privacy-policy',
        });
      },
    },
    {
      title: 'Contact Us',
      icon: (
        <Feather
          name="file-text"
          size={Metrix.customFontSize(22)}
          color={Colors.primary}
        />
      ),
      goto: () => {
        props.navigation.navigate('WebViewScreen', {
          title: 'Contact Us',
          url: 'https://favorauction.com/contact-us',
        });
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Header title={'Support Center'} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{
          flexGrow: 1,
          paddingHorizontal: 10,
          marginTop: Metrix.VerticalSize(34),
        }}
      >
        <View>
          {arr.map((ele, index) => {
            return (
              <View key={index.toString()}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index.toString()}
                  onPress={ele.goto}
                >
                  <View
                    style={{
                      padding: Metrix.HorizontalSize(5),
                      margin: Metrix.HorizontalSize(10),
                      flexDirection: 'row',
                      // backgroundColor: 'red',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {ele.icon}
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      <TextComponent text={ele.title} />
                    </View>

                    <AntDesign name="right" size={18} color={Colors.darkGray} />
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: Colors.lineColor,
                      width: '100%',
                    }}
                  ></View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default MoreSupportCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalStyle: {
    backgroundColor: Colors.white,
  },
  modalTitleContainer: {
    marginVertical: Metrix.VerticalSize(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBtnContainer: {
    marginTop: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTitle: {
    // flex: 1,
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
    textAlign: 'left',
    marginTop: Metrix.VerticalSize(22),
  },
});
