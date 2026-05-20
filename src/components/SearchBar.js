import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Images, Metrix} from '../config';
import { useTheme } from '@react-navigation/native';

const SearchBar = ({
  secureTextEntry = false,
  onChangeText = () => {},
  value = '',
  placeholderTextColor ,
  style = {},
  multiline = false,
  keyboardType = 'default',
  noOfLines = 1,
  placeholder = '',
  disable = true,
  onPress = onPress,
  onSubmitEditing = onSubmitEditing
}) => {
  const Colors = useTheme().colors
  const styles = createStyles(Colors)
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Metrix.HorizontalSize(10),
      }}>
      <TextInput
        style={{...styles.input, ...style}}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        numberOfLine={noOfLines}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.textColor}
        editable={disable}
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity style={styles.searchBtn} onPress={onPress}>
        <Image
          source={Images.search}
          style={{
            height: Metrix.HorizontalSize(20),
            width: Metrix.HorizontalSize(20),
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const createStyles = Colors => StyleSheet.create({
  input: {
    marginTop: Metrix.VerticalSize(10),
    width: '85%',
    height: Metrix.VerticalSize(40),
    fontSize: Metrix.customFontSize(12),
    // padding: 5,
    paddingLeft: Metrix.HorizontalSize(10),
    color: Colors.primary,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  searchBtn: {
    height: Metrix.HorizontalSize(42),
    width: Metrix.HorizontalSize(40),
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: Metrix.VerticalSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
