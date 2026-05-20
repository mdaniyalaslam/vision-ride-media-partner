import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Metrix } from '../../config';
import { Header, HeroHeader, TextComponent, TextField } from '../../components';
import NotificationItemComponent from '../../components/NotificationItemComponent';
import { fonts } from '../../config/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { HomeMiddleware } from '../../redux/Middlewares';

const Notification = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.AuthReducer);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getMessages();
    }, 20000); // Poll every 20 seconds

    return () => clearInterval(interval);
  }, [user?.token]); // Include token in dependencies to restart polling if token changes

  const getMessages = () => {
    dispatch(HomeMiddleware.GetMessages(user?.token)).then(res => {
      console.log('MESSAGES', res);
      setMessages(res?.data?.messages.reverse() || []);
    });
  };
  const sendMessage = () => {
    let body = {
      message: message,
    };
    dispatch(HomeMiddleware.SendMessage(user?.token, body)).then(res => {
      console.log('MESSAGE', res);
      setMessage('');
      getMessages();
    });
  };

  return (
    <View style={styles.container}>
      <Header backIcon={true} title={'Conservation'} />

      <FlatList
        inverted
        showsVerticalScrollIndicator={false}
        data={messages}
        onEndReachedThreshold={0.7}
        ListEmptyComponent={() => (
          <View
            style={{
              transform: [{ scaleY: -1 }],
              height: 500,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextComponent
              customStyles={{
                ...styles.titleNoDataFount,
                transform: [{ scaleX: Platform.OS === 'ios' ? 1 : -1 }],
              }}
              text="No messages"
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ height: Metrix.HorizontalSize(20) }}></View>
        )}
        renderItem={({ item, index }) => {
          return (
            <NotificationItemComponent
              item={item}
              index={index}
              customStyles={{
                maxWidth: '80%',
                alignSelf:
                  item?.sender_type == 'user' ? 'flex-end' : 'flex-start',
              }}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
      <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TextField
          value={message}
          inputContainerStyle={{ width: '90%' }}
          inputStyle={{ paddingTop: 10 }}
          multiline={true}
          onChangeText={t => setMessage(t)}
        />
        <TouchableOpacity onPress={sendMessage}>
          <MaterialIcons
            name={'send'}
            color={Colors.primary}
            size={26}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleNoDataFount: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Bold,
    color: Colors.darkGray,
    textAlign: 'center',
  },
});
