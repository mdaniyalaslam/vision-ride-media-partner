import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { Colors, Images, Metrix } from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../config/Constants';
import useStyle from '../screens/styles';

import CustomModal from './CustomModal';
import TextField from './TextField';
import TextComponent from './TextComponent';

function DropdownField({
  // showModal = false,
  // set_showModal = () => {},
  updateValue = () => {},
  data = [],
  label = '',
  placeholder = '',
  value,
  leftIcon = null,
  isSearch = false,
  isTitleCentered = false,
  customFieldStyles,
  modalTitle = '',
}) {
  const gStyle = useStyle();

  const [showModal, set_showModal] = useState(false);
  const [search, set_search] = useState('');
  const [searched_data, set_searched_cities] = useState([]);
  return (
    <>
      <View style={{ flex: 1, marginTop: 10 }}>
        {label ? (
          <TextComponent customStyles={styles.labelText} text={label} />
        ) : null}
        <TouchableOpacity
          onPress={() => set_showModal(true)}
          activeOpacity={0.7}
          style={{
            ...gStyle.selectable,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: label ? 10 : 0,
            ...customFieldStyles,
          }}
        >
          {leftIcon}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <TextComponent
              customStyles={{
                marginLeft: Metrix.HorizontalSize(5),
                fontFamily: fonts.Regular,
              }}
              text={placeholder}
            />
            <Ionicons
              name={'caret-down-outline'}
              color={Colors.secondary}
              size={Metrix.customFontSize(14)}
            />
          </View>
        </TouchableOpacity>
      </View>
      <CustomModal
        title={modalTitle || placeholder}
        show={showModal}
        onCloseModal={() => set_showModal(!showModal)}
        customStyles={{
          paddingHorizontal: 10,
          width: '90%',
          // maxHeight: Metrix.VerticalSize(300),
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={styles.modalStyle}>
          {isSearch ? (
            <TextField
              inputContainerStyle={{ marginTop: 14 }}
              value={search}
              maxLength={30}
              placeholder={'Search'}
              onChangeText={search => {
                set_search(search);
                let keyword = search.toLowerCase();
                let filtered = data.filter(
                  city =>
                    city?.name?.toLowerCase().indexOf(keyword) > -1 ||
                    city?.state?.toLowerCase().indexOf(keyword) > -1,
                );
                console.log(filtered);
                set_searched_cities(filtered);
              }}
              inputStyle={{
                color: Colors.darkGray,
              }}
            />
          ) : null}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
          >
            {search.length
              ? searched_data?.map((val, index) => {
                  return (
                    <>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            updateValue(val), set_showModal(false);
                            // console.warn(val);
                          }}
                          style={{
                            ...styles.durationContainer,
                            borderTopWidth: 0,
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: isTitleCentered
                              ? 'center'
                              : 'flex-start',
                            paddingVertical: 14,
                          }}
                        >
                          <TextComponent
                            customStyles={{
                              // top: 10,
                              padding: 10,
                              textAlign: 'center',
                              fontSize: 14,
                              color: Colors.textDarkColor,
                              fontFamily: fonts.SemiBold,
                            }}
                            text={
                              val?.source || val.title || val.state || val.name
                            }
                          />
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          // flex: 1,
                          height: 0.5,
                          backgroundColor: Colors.lighGray,
                        }}
                      />
                    </>
                  );
                })
              : data?.map((val, index) => {
                  return (
                    <>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 10,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            updateValue(val), set_showModal(false);
                            // console.warn(val);
                          }}
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.backgroundGray,
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: isTitleCentered
                              ? 'center'
                              : 'flex-start',
                          }}
                        >
                          <TextComponent
                            customStyles={{
                              // top: 10,
                              padding: 10,
                              textAlign: 'center',
                              fontSize: 14,
                              color: Colors.textDarkColor,
                              fontFamily: fonts.SemiBold,
                            }}
                            text={
                              val?.source || val.title || val.state || val.name
                            }
                          />
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          // flex: 1,
                          height: 0.5,
                          backgroundColor: Colors.lighGray,
                        }}
                      />
                    </>
                  );
                })}
          </ScrollView>
        </View>
      </CustomModal>
    </>
  );
}

export default DropdownField;

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    borderRadius: 12,
    maxHeight: Metrix.VerticalSize(600),
  },
  titleStyle: {
    marginTop: Metrix.VerticalSize(10),
    fontSize: Metrix.customFontSize(20),
    fontFamily: fonts.PoppinsBold,
    color: Colors.textDarkColor,
  },
  modalTitleContainer: {
    marginVertical: Metrix.VerticalSize(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBody: {
    // flex: 1,
    paddingHorizontal: Metrix.VerticalSize(5),
    // paddingBottom: Metrix.VerticalSize(100),
    // height: '90%'
  },
  labelText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(11),
    color: Colors.labelColor,
  },
});
