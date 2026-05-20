import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Metrix } from '../../config';
import { Header } from '../../components';
import { fonts } from '../../config/Constants';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import { LoaderAction } from '../../redux/Actions';

const WebViewScreen = ({ route }) => {
  const { title, url } = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoaderAction.LoaderTrue());
  }, []);

  return (
    <View style={styles.container}>
      <Header title={title} />
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        <WebView
          onLoadEnd={() => dispatch(LoaderAction.LoaderFalse())}
          source={{ uri: url }}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
});
