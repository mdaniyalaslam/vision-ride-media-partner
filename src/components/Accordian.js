import React, {Component, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
// import {Colors} from '';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Metrix} from '../config';
import {fonts} from '../config/Constants';
import { useTheme } from '@react-navigation/native';

const Accordian = props => {
  const Colors = useTheme().colors
  const styles = createStyles(Colors)
  const [expanded, setExpanded] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity
        ref={this.accordian}
        style={styles.row}
        onPress={toggleExpand}>
        <Text style={[styles.title]}>{props.title}</Text>
        <Icon
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={Metrix.customFontSize(20)}
          style={{alignSelf: 'flex-start'}}
          color={Colors.blackText}
        />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && (
        <View style={styles.child}>
          <Text
            style={{
              fontFamily: fonts.Regular,
              fontSize: Metrix.customFontSize(12),
            }}>
            {props.data}
          </Text>
        </View>
      )}
    </View>
  );
};

const createStyles =(Colors) => StyleSheet.create({
  title: {
    fontSize: Metrix.customFontSize(13),
    fontFamily: fonts.Medium,
    color: Colors.black,
  },
  row: {
    flexDirection: 'row',
    paddingRight: Metrix.HorizontalSize(24),
    padding: Metrix.VerticalSize(10),
    alignItems: 'center',
    backgroundColor: Colors.gray,
    borderRadius: 10,
  },
  parentHr: {
    marginVertical: Metrix.VerticalSize(5),
    color: Colors.white,
    width: '100%',
  },
  child: {
    marginTop: -Metrix.VerticalSize(10),
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: Metrix.VerticalSize(20),
    // marginVertical: Metrix.VerticalSize(10),
    // backgroundColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.3,
    elevation: 1.8,
  },
});
export default Accordian;
