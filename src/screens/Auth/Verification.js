import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Metrix, NavigationService } from '../../config';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header } from '../../components';
import useStyle from '../styles';
import { fonts, ToastError, ToastSuccess } from '../../config/Constants';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AuthMiddleware } from '../../redux/Middlewares';

const Verification = ({ route }) => {
  const gStyle = useStyle();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.AuthReducer);

  // const [prevItem, set_prevItem] = useState(route.params.data);
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState('');
  const [timerText, setTimerText] = useState('Resend OTP');
  const [isTimer, setIsTimer] = useState(true);
  const { emailAddress, commingFromScreen } = route?.params;
  // console.log('param user===>', route.params.data);

  const _timer = () => {
    setTimerText('Resend Code ');
    setIsTimer(true);

    var countDownDate = new Date();

    countDownDate.setSeconds(countDownDate.getSeconds() + 120);

    var x = setInterval(function () {
      var now = new Date().getTime();

      var distance = countDownDate - now;

      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

      setTimer(`${formattedMinutes}:${formattedSeconds}`);

      if (distance < 0) {
        clearInterval(x);
        setTimerText('Resend Code');
        setTimer('');
        setIsTimer(false);
      }
    }, 1000);
  };

  const ResendOtp = () => {
    // dispatch(AuthMiddleware.ForgetPassword({emailAddress: emailAddress}))
    //   .then(data => {
    //     _timer();
    //   })
    //   .catch(err => console.log(err));
  };

  const submitVerification = ({ route }) => {
    // if (commingFromScreen === 'register') {
    //   Toast.show(ToastSuccess('Verified Successfully'));
    //   NavigationService.navigate('EmailVerified');
    // } else {
    //   console.log('else');
    //   Toast.show(ToastSuccess('Verified Successfully, please set password.'));
    //   NavigationService.navigate('ResetPassword', {
    //     emailAddress: emailAddress,
    //   });
    // }
    // NavigationService.navigate('EmailVerified');
    if (!code) {
      return Toast.show(ToastError('OTP is required.'));
    }
    dispatch(
      AuthMiddleware.VerifyOtp(user?.token, {
        email: emailAddress,
        otp: code,
      }),
    )
      .then(data => {
        console.log('verify otp data', data);
        // if (commingFromScreen === 'register') {
        //   console.log('if');
        //   Toast.show(ToastSuccess('Verified Successfully, Please Login.'));
        //   NavigationService.navigate('Login');
        // } else {
        //   console.log('else');
        Toast.show(ToastSuccess('Verified Successfully, please set password.'));
        NavigationService.navigate('ChangePasswordAuth', {
          emailAddress: emailAddress,
          otp: code,
        });
        // }
        console.log('bahar');
        setCode('');
      })
      .catch(err => console.warn(err));
  };

  useEffect(() => {
    _timer();
  }, []);
  return (
    <View style={gStyle.container}>
      <Header title={'Verification'} />
      <ScrollView
        bounces={false}
        style={{
          marginTop: Metrix.VerticalSize(10),
          marginBottom: Metrix.VerticalSize(10),
          paddingHorizontal: Metrix.HorizontalSize(20),
        }}
      >
        <Text style={gStyle.description}>
          A verification code has been sent to{' '}
          <Text style={{ ...styles.description, color: Colors.black }}>
            {emailAddress}
          </Text>
        </Text>
        <Text style={gStyle.description}>
          Please check your inbox and enter the verification code below to
          verify your email address.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: -10,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.Medium,
              color: Colors.black,
              fontSize: Metrix.customFontSize(11),
            }}
          >
            Enter Code
          </Text>
          <TouchableOpacity
            activeOpacity={isTimer ? 1 : 0.6}
            onPress={() => (isTimer ? null : ResendOtp())}
          >
            <Text
              style={{
                fontFamily: fonts.Regular,
                fontSize: Metrix.FontExtraSmall,
                color: Colors.textColor,
              }}
            >
              {timerText}
              <Text style={{ color: Colors.lightBlue }}>{timer}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* otp */}

        <OTPInputView
          style={{ width: '100%', height: 100 }}
          pinCount={6}
          code={code}
          selectionColor={Colors.black}
          onCodeChanged={code => setCode(code)}
          autoFocusOnLoad={true}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          // onCodeFilled={submitVerification}
        />

        {/* VERIFY */}
        <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
          <Button title={'Confirm'} onPress={submitVerification} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    margin: Metrix.VerticalSize(3),
    marginVertical: Metrix.VerticalSize(6),
    padding: Metrix.HorizontalSize(10),
    shadowColor: Colors.primary,
    borderRadius: 12,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  underlineStyleHighLighted: {
    borderColor: Colors.primary,
    color: Colors.primary,
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 10,
    color: Colors.black,
    fontFamily: fonts.Bold,
  },
});
