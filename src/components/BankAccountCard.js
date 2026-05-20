import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, Metrix } from '../config';
import { fonts } from '../config/Constants';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextComponent from './TextComponent';

export default function BankAccountCard({
  account,
  onSetDefault,
  onPressDelete,
}) {
  const isDefault = account?.is_default;

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.eyeIconStyle}
        onPress={!isDefault ? onPressDelete : undefined}
        activeOpacity={1}
      >
        <Feather
          name="trash"
          size={Metrix.customFontSize(22)}
          color={Colors.primary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rowRadioBtn}
        activeOpacity={0.7}
        onPress={onSetDefault}
      >
        <Ionicons
          name={
            isDefault ? 'radio-button-on-outline' : 'radio-button-off-sharp'
          }
          size={Metrix.customFontSize(18)}
          color={isDefault ? Colors.primary : Colors.textLightColor}
        />

        <TextComponent
          customStyles={{
            ...styles.headingName,
            marginLeft: Metrix.HorizontalSize(5),
            fontFamily: fonts.SemiBold,
            color: isDefault ? Colors.primary : Colors.textLightColor,
            marginTop: 2,
          }}
          text={isDefault ? 'Default' : 'Set as default'}
        />
      </TouchableOpacity>

      <View
        style={{
          marginTop: Metrix.VerticalSize(20),
          marginBottom: Metrix.VerticalSize(10),
        }}
      >
        <View style={styles.rowContainer}>
          <View style={{ width: '40%' }}>
            <TextComponent text="Account Number:" />
          </View>
          <View style={{ width: '30%' }}>
            <TextComponent text="Expiry Date" />
          </View>
          <View style={{ width: '25%' }}>
            <TextComponent text="Card Brand" />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={{ width: '40%' }}>
            <TextComponent
              customStyles={styles.headingName}
              text={`**** **** **** ${account?.last_4}`}
              isTitle={true}
            />
          </View>

          <View style={{ width: '30%' }}>
            <TextComponent
              customStyles={styles.headingName}
              text={account?.exp_month + '/' + account?.exp_year}
              isTitle={true}
            />
          </View>
          <View style={{ width: '25%' }}>
            <TextComponent
              customStyles={styles.headingName}
              text={account?.card_brand}
              isTitle={true}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: Metrix.VerticalSize(10),
    shadowColor: Colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 8,
    padding: 10,
    borderColor: Colors.primary,
    borderWidth: 0.5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center'
  },
  headingName: {
    color: Colors.textLightColor,
    // textAlign: 'left',
    // fontSize: Metrix.customFontSize(11),
    // fontFamily: fonts.Regular,
    marginTop: 5,
  },
  eyeIconStyle: {
    position: 'absolute',
    zIndex: 100,
    top: Metrix.VerticalSize(10),
    right: Metrix.HorizontalSize(10),
  },
  rowRadioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },
});
