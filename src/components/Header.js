import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import { Colors, Images, Metrix, NavigationService, is } from '../config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation, useTheme } from '@react-navigation/native';
import Badge from './Badge';
import { fonts } from '../config/Constants';
import TextComponent from './TextComponent';
export default function Header({ title = null, isBack = true }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {isBack ? (
        <TouchableOpacity
          style={{
            backgroundColor: Colors.lightGray,
          }}
          activeOpacity={0.6}
          onPress={() => NavigationService.goBack()}
        >
          <AntDesign
            name={'arrowleft'}
            size={22}
            color={Colors.white}
            style={{ paddingRight: 16 }}
          />
        </TouchableOpacity>
      ) : null}

      <TextComponent
        text={title}
        isSubTitle
        customStyles={{ color: Colors.white, fontSize: 18, marginTop: 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Metrix.isApi35 ? 100 : Metrix.isIOS ? 100 : 60,
    backgroundColor: Colors.primary,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Metrix.isApi35 ? 40 : Metrix.isIOS ? 40 : 0,
    // ...Platform.select({
    //   ios: {
    //     paddingTop: 65,
    //   },
    //   android: {
    //     paddingTop: 65,
    //   },
    // }),
  },
  imageContainer: {
    // width: Metrix.HorizontalSize(120),
    // height: Metrix.HorizontalSize(120),
  },
  image: {
    width: 120,
    height: 120,
  },
  tabIcon: {
    width: Metrix.HorizontalSize(24),
    height: Metrix.VerticalSize(24),
    alignItems: 'center',
  },
  bellIcon: {},
  redDot: {
    position: 'absolute',
    borderRadius: 5,
    height: 10,
    width: 10,
    right: Metrix.HorizontalSize(0),
    top: Metrix.VerticalSize(0),
    zIndex: 100,
    backgroundColor: Colors.redDark,
  },
});
