import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Metrix, NavigationService } from '../../config';
import { Button, Header, TextField } from '../../components';
import { emailValidityCheck, fonts, ToastError } from '../../config/Constants';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import MaskInput from 'react-native-mask-input';

const ContactUs = () => {
  const user = useSelector(state => state?.AuthReducer?.user);

  const [name, setName] = useState(user?.user?.fullName || '');
  const [email, setEmail] = useState(user?.user?.emailAddress || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.user?.phoneNumber || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const isTrueString = str => {
    return str.match(/[a-zA-Z]/);
  };

  const ContactUs = () => {
    if (!name) {
      Toast.show(ToastError('Please input a name.'));
      return;
    }
    if (!isTrueString(name)) {
      return Toast.show(ToastError('Please enter a valid name.'));
    }
    if (!email) {
      Toast.show(ToastError('Please provide an email address.'));
      return;
    }
    if (!emailValidityCheck(email)) {
      Toast.show(ToastError('Please enter a valid email address.'));
      return;
    }
    if (!phoneNumber) {
      Toast.show(ToastError('Please input your phone number.'));
      return;
    }
    if (!subject) {
      return Toast.show(ToastError('Please provide a subject.'));
    }
    if (!isTrueString(subject)) {
      return Toast.show(ToastError('Please enter a valid subject.'));
    }
    if (!message) {
      return Toast.show(ToastError('Please type your message.'));
    }
    if (!isTrueString(message)) {
      return Toast.show(ToastError('Please enter a valid message.'));
    }

    // dispatch(
    //   HomeMiddleware.ContactUs({
    //     email: email,
    //     name: name,
    //     subject: subject,
    //     message: message,
    //     phone: phoneNumber,
    //   }),
    // )
    //   .then(data => {
    //     NavigationService.goBack();
    //   })
    //   .catch(err => console.warn(err));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header backIcon={true} title={'Contact Us'} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginHorizontal: Metrix.HorizontalSize(30),
        }}
      >
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <View style={styles.mainContainer}>
          <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
            <Text style={styles.subTitle}> Name </Text>
            <TextField
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Enter your full name here"
            />
          </View>

          <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
            <Text style={styles.subTitle}> Email </Text>
            <TextField
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter your email address"
            />
          </View>
          <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
            <Text style={styles.subTitle}> Phone </Text>

            <MaskInput
              value={phoneNumber}
              keyboardType="number-pad"
              style={{
                // width: '100%',
                // borderWidth: 1,
                // borderColor: Colors.gray,
                // borderRadius: 12,
                // paddingVertical: Metrix.VerticalSize(14),
                // paddingHorizontal: Metrix.HorizontalSize(6),
                marginTop: Metrix.VerticalSize(10),
                width: '100%',
                height: Metrix.VerticalSize(48),
                fontSize: Metrix.customFontSize(12),
                padding: 5,
                paddingLeft: Metrix.HorizontalSize(10),
                color: Colors.black,
                backgroundColor: Colors.textFiledBG,
                borderRadius: 10,
                fontFamily: fonts.Regular,
              }}
              onChangeText={(masked, unmasked) => {
                setPhoneNumber(masked);
              }}
              placeholderTextColor={Colors.textColor}
              mask={[
                `(`,
                /[1-9]/,
                /\d/,
                /\d/,
                ')',
                ' ',
                /[1-9]/,
                /\d/,
                /\d/,
                ' ',
                /\d/,
                /\d/,
                '',
                /\d/,
                /\d/,
              ]}
            />
          </View>
          <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
            <Text style={styles.subTitle}> Subject </Text>
            <TextField
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Enter your subject"
            />
          </View>
          <View
            style={{
              marginVertical: Metrix.VerticalSize(10),
            }}
          >
            <Text style={styles.subTitle}> Message </Text>
            <TextField
              multiline
              style={{
                height: Metrix.HorizontalSize(120),
                textAlignVertical: 'top',
                width: '100%',
              }}
              value={message}
              onChangeText={text => setMessage(text)}
              placeholder="Your message here...."
            />
          </View>
          <Button
            btnStyle={{ width: '100%', backgroundColor: Colors.primary }}
            title={'Submit'}
            onPress={ContactUs}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  title: {
    color: Colors.textColor,
    fontSize: Metrix.customFontSize(25),
    fontFamily: fonts.Bold,
  },
  mainContainer: {
    marginTop: Metrix.HorizontalSize(20),
    backgroundColor: Colors.white,
    // padding: Metrix.HorizontalSize(20),
    // .shadow,
    borderRadius: Metrix.HorizontalSize(10),
    marginBottom: Metrix.HorizontalSize(20),
  },
  subTitle: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.labelColor,
  },
  btnContainer: {
    marginTop: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginTop: Metrix.VerticalSize(10),
    width: '100%',
    height: Metrix.VerticalSize(48),
    fontSize: Metrix.customFontSize(12),
    padding: 5,
    paddingLeft: Metrix.HorizontalSize(10),
    color: Colors.black,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  description: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
    marginTop: Metrix.VerticalSize(10),
  },
});
