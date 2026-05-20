// CustomThemeSwitch.js
import {useTheme} from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {AuthAction} from '../redux/Actions';

const CustomThemeSwitch = () => {
  const Colors = useTheme().colors;
  const dispatch = useDispatch();
  const theme = useSelector(state => state?.AuthReducer?.theme);

  console.log('user>>>>>>>>>>>', theme);
  const [isDarkMode, setIsDarkTheme] = useState(theme);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkMode);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        toggleTheme()
        console.log('toggleTheme ', !isDarkMode);
        dispatch(AuthAction.SaveTheme(!isDarkMode));
      }}>
      <View style={[styles.container, {backgroundColor: Colors.primary}]}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: Colors.gray,
              alignSelf: isDarkMode ? 'flex-start' : 'flex-end',
            },
          ]}>
          <Icon
            name={isDarkMode ? 'moon-o' : 'sun-o'}
            size={20}
            color={'#fff'}
          />
        </View>
        <Icon
          name={!isDarkMode ? 'moon-o' : 'sun-o'}
          size={20}
          color={Colors.black}
          style={{position: 'absolute', left: isDarkMode ? 50 : 10}}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 5,
    position: 'relative',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomThemeSwitch;
