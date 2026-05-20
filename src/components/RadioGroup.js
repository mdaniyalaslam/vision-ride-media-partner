import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import { Metrix} from '../config';
import {fonts} from '../config/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import useStyle from '../screens/styles';

function RadioGroup({title, onPress, value, text1, text2, paddingTop = 10}) {
  const Colors = useTheme().colors
  const gStyle = useStyle()
  

  return (
    <>
      <Text
        style={{
          fontFamily: fonts.Bold,
          fontSize: Metrix.customFontSize(12),
        }}>
        {title}
      </Text>
      <View
        style={{
          ...gStyle.row,
          // paddingVertical: 10
          paddingTop: paddingTop
        }}>
        <View style={{width: '47%'}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onPress(true)}
            style={{
              ...gStyle.row,
              // marginBottom: 10,
            }}>
            <MaterialIcons
              color={value ? Colors.primary : Colors.primary}
              name={value ? 'radio-button-on' : 'radio-button-off'}
              size={18}
            />
            <Text
              style={{
                fontFamily: fonts.Regular,
                color: Colors.primary,
                fontSize: 12,
              }}>
              {text1}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onPress(false)}
          style={{
            ...gStyle.row,
            // marginBottom: 10,
          }}>
          <MaterialIcons
            color={!value ? Colors.primary : Colors.primary}
            name={!value ? 'radio-button-on' : 'radio-button-off'}
            size={18}
          />
          <Text
            style={{
              fontFamily: fonts.Regular,
              color: Colors.primary,
              fontSize: 12,
            }}>
            {text2}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default RadioGroup;

const styles = StyleSheet.create({});
