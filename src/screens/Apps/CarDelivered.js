import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { Button, Header } from '../../components';
import { fonts } from '../../config/Constants';
import Toast from 'react-native-toast-message';

const CarDelivered = () => {
  const [time, setTime] = useState(10);
  const [resendAlert, setResendAlert] = useState(true);

  const [isRunning, setIsRunning] = useState(time); // Controls the timer state

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevCount => {
          if (prevCount <= 1) {
            clearInterval(interval);
            setIsRunning(false); // Stop the timer when it reaches 0
            setResendAlert(false);
            return 0;
          } else {
            return prevCount - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isRunning]);

  // Restart the timer
  const handleRestart = () => {
    setTime(10); // Reset time to 3 minutes
    setIsRunning(true); // Start the timer
    setResendAlert(true);
  };

  // Convert time to MM:SS format
  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };
  return (
    <View style={styles.container}>
      <Header backIcon={true} title={'2000 BMW 3-Series'} />
      <View style={{ marginHorizontal: Metrix.HorizontalSize(30) }}>
        <View>
          <Image
            source={Images.car_delivered}
            style={styles.car}
            resizeMode="contain"
          />
          {!resendAlert ? (
            <Image
              source={Images.car_delivered_success}
              style={styles.eyeIconStyle}
              resizeMode="contain"
            />
          ) : null}
        </View>
        <Text style={styles.itemTitle}>
          {resendAlert ? 'Please Wait!' : 'Thank You! Car Received'}
        </Text>
        <Text style={styles.itemDescription}>
          {resendAlert
            ? ' While we receive confirmation from the body shop.'
            : 'Our team is working on it. We will let you know. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'}
        </Text>
        {resendAlert ? (
          <Button
            onPress={() => {
              handleRestart();
            }}
            title={'Resend Alert: ' + formatTime(time)}
            disabled={resendAlert}
            btnStyle={{
              backgroundColor: resendAlert ? Colors.textColor : Colors.primary,
              marginTop: Metrix.VerticalSize(20),
            }}
          />
        ) : (
          <Button
            onPress={() => {
              NavigationService.resetStack('UserStack', { screen: 'Home' });
            }}
            title={'Back To Home'}
            btnStyle={{
              backgroundColor: Colors.primary,
              marginTop: Metrix.VerticalSize(20),
            }}
          />
        )}
      </View>
    </View>
  );
};

export default CarDelivered;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  car: {
    width: '100%',
    height: Metrix.VerticalSize(200),
    marginTop: Metrix.VerticalSize(42),
    alignSelf: 'center',
  },
  eyeIconStyle: {
    width: 100,
    height: 100,
    position: 'absolute',
    zIndex: 100,
    top: Metrix.VerticalSize(15),
    left: Metrix.HorizontalSize(15),
    // padding: 10,
  },
  itemTitle: {
    fontSize: Metrix.customFontSize(20),
    fontFamily: fonts.Bold,
    color: Colors.primary,
    textAlign: 'left',
  },
  itemDescription: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Regular,
    color: Colors.grayText,
    marginTop: Metrix.VerticalSize(5),
  },
});
