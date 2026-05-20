import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {  Metrix } from '../config';
import { fonts } from '../config/Constants';
import { useTheme } from '@react-navigation/native';

const CheckboxComp = ({checked=false, onPress=()=>{}, title}) => {
  const Colors = useTheme().colors
  const styles = createStyles(Colors)
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <FontAwesome name={checked ? 'check-circle' : 'circle-thin'} size={Metrix.customFontSize(14)} color={Colors.primary} />
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CheckboxComp;

const createStyles = Colors => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontFamily: fonts.RobotoLight,
        color: Colors.primary,
        fontSize: Metrix.customFontSize(10),
        marginLeft: Metrix.HorizontalSize(5)
    }
})