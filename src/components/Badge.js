import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeMiddleware } from '../redux/Middlewares/HomeMiddleWare';
import { AuthAction } from '../redux/Actions';
import { useTheme } from '@react-navigation/native';
import { Colors } from '../config';

const Badge = () => {
  const notificationCount = useSelector(
    state => state?.AuthReducer?.notificationCount,
  );

  if (notificationCount === 0) {
    return null;
  } else
    return (
      <View
        style={{
          backgroundColor: Colors.redDark,
          height: 20,
          minWidth: 20,
          position: 'absolute',
          top: -16,
          // left: -8,
          right: -8,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 10 }}>
          {notificationCount < 100 ? notificationCount : '99+'}
        </Text>
      </View>
      // <View
      //   style={{
      //     position: 'absolute',
      //     top: -5,
      //     right: -5,
      //     backgroundColor:Colors.primary,
      //     borderRadius: 10,
      //     paddingHorizontal: 5,
      //     paddingVertical: 2,
      //   }}>
      //   <Text style={{color: 'white', fontSize: 12}}>{notificationCount}</Text>
      // </View>
    );
};

export default Badge;

const styles = StyleSheet.create({});
