import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ToastSuccess } from './src/config/Constants';
import { Provider } from 'react-redux';
import { Persistor, Store } from './src/redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast, { BaseToast } from 'react-native-toast-message';
import AppNavigation from './AppNavigation';
import SplashScreen from 'react-native-splash-screen';
import { Colors } from './src/config';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  useEffect(() => {
    if (Platform.OS == 'android') {
      setTimeout(() => {
        SplashScreen.hide();
      }, 3000);
    }
  });

  let toastConfig = {
    ToastSuccess: props => {
      return (
        <BaseToast
          {...props}
          style={{
            backgroundColor: Colors.background,
            borderLeftColor: 'green',
            height: 'auto',
            paddingVertical: 12,
          }}
          text1Style={{ color: Colors.textColor }}
          text1NumberOfLines={0}
        />
      );
    },
    ToastError: props => (
      <BaseToast
        {...props}
        style={{
          backgroundColor: Colors.background,
          borderLeftColor: 'red',
          height: 'auto',
          paddingVertical: 12,
        }}
        text1Style={{ color: Colors.textColor }}
        text1NumberOfLines={0}
      />
    ),
  };
  return (
    <>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: Colors.white }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 0}
          >
            <SafeAreaView style={styles.container} edges={['bottom']}>
              <AppNavigation />
            </SafeAreaView>
          </KeyboardAvoidingView>
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flex: {
    flex: 1,
  },
});
