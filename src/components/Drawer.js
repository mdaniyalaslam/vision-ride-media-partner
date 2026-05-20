import React from 'react';

import CustomDrawer from '../components/CustomDrawer';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import {Dimensions} from 'react-native/types';
import {Metrix} from '../config';

const DrawerScreen = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '85%',
          borderTopEndRadius: Metrix.HorizontalSize(10),
          borderBottomEndRadius: Metrix.HorizontalSize(10),
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="BottomTabs" component={BottomTabs} />
    </Drawer.Navigator>
  );
};

export default DrawerScreen;
