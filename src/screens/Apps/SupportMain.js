import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Colors, Metrix, NavigationService } from '../../config';
import { Button, Header, HeroHeader, TextComponent } from '../../components';
import { fonts } from '../../config/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { HomeMiddleware } from '../../redux/Middlewares';

const SupportMain = () => {
  const { user } = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const readMsg = () => {
    dispatch(
      HomeMiddleware.MarkMessagesRead(user?.token, {
        mark_all: true,
      }),
    );
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View>
        <Header title={'Support'} isBack={false} />

        <View style={{ margin: 25 }}>
          <TextComponent
            customStyles={{ textAlign: 'center' }}
            text="Start a conversation with admin!"
          />

          <Button
            buttonStyle={{ marginVertical: 20 }}
            title={'Start a conversation'}
            onPress={() => {
              readMsg();
              NavigationService.navigate('Support');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SupportMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(16),
    marginTop: Metrix.VerticalSize(40),

    color: Colors.primary,
  },
  description: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
    marginTop: Metrix.VerticalSize(13),
  },
});
