import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { fonts } from '../../config/Constants';
import * as Progress from 'react-native-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import useStyle from '../styles';

const Evaluating = ({ route }) => {
  const { screen } = route?.params;

  const [isSuccess, setIsSuccess] = useState(screen);
  const [count, setCount] = useState(0);
  const [check, setCheck] = useState(false);
  const gStyle = useStyle();

  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Monthly', value: 4, id: 4 },
    { label: 'Yearly', value: 3, id: 3 },
  ]);

  useEffect(() => {
    // setTimeout(() => {
    //   setIsSuccess('success');
    // }, 3000);
  });

  useEffect(() => {
    // Implementing the setInterval method
    const interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount >= 40) {
          setIsSuccess('success');
          clearInterval(interval); // Clear the interval immediately
          return prevCount; // Return the current count to prevent further updates
        } else {
          return prevCount + 2.5; // Update the count
        }
      });
    }, 1000);

    // Clearing the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container(isSuccess)}>
      {isSuccess === 'evaluating' ? (
        <>
          <Image
            source={Images.evaluating}
            resizeMode="contain"
            style={styles.logo}
          />
          <View
            style={{
              width: '100%',
              marginTop: Metrix.VerticalSize(20),
              alignItems: 'center',
            }}
          >
            <Progress.Bar progress={count / 40} width={300} />
          </View>
          <Text
            style={{ ...styles.title, marginRight: Metrix.HorizontalSize(33) }}
          >
            Give Us A Moment, We Are Evaluating Your Car...
          </Text>
          <Text style={styles.subTitle}>
            Note: You must pay 1 month upfront, and claims will only be
            available once SCI has 100K customers for collision coverage.
          </Text>
          <View
            style={{
              marginTop: Metrix.VerticalSize(62),
              marginHorizontal: Metrix.HorizontalSize(20),
            }}
          ></View>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={{
              marginLeft: Metrix.HorizontalSize(33),
              ...Platform.select({
                ios: {
                  marginTop: Metrix.HorizontalSize(65),
                },
                android: {
                  marginTop: Metrix.HorizontalSize(20),
                },
              }),
            }}
            activeOpacity={0.6}
            onPress={() => NavigationService.goBack()}
          >
            <AntDesign
              name={'arrowleft'}
              size={Metrix.customFontSize(25)}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...styles.title,
              color: Colors.primary,
              textAlign: 'left',
            }}
          >
            {screen == 'comprehensive'
              ? 'Comprehensive Plan'
              : 'Collision Coverage Plan'}
          </Text>

          <View style={styles.itemContainer}>
            <View
              style={{
                marginHorizontal: Metrix.HorizontalSize(20),
                // marginTop: Metrix.VerticalSize(20),
                justifyContent: 'center',
              }}
            >
              <Text style={styles.itemName}>2000 BMW 3-Series</Text>
              <Text style={styles.itemDescription}>AFV-7567</Text>
            </View>

            <View
              style={{
                width: '100%',
                height: Metrix.VerticalSize(2),

                width: 1,
                backgroundColor: Colors.lineColor,
              }}
            />

            <View
              style={{
                marginVertical: Metrix.VerticalSize(10),
                marginHorizontal: Metrix.HorizontalSize(20),
              }}
            >
              <Text style={styles.labelText}> Set Payment Frequency </Text>

              <DropDownPicker
                placeholder="Select"
                style={gStyle.dropdownContainer}
                dropDownContainerStyle={gStyle.dropdownList}
                labelStyle={{
                  color: Colors.labelColor,
                  fontSize: Metrix.customFontSize(12),
                  fontFamily: fonts.Regular,
                }}
                textStyle={{
                  color: Colors.black,
                  fontSize: Metrix.customFontSize(12),
                  fontFamily: fonts.Regular,
                }}
                arrowIconStyle={{
                  tintColor: Colors.lightBlue,
                }}
                tickIconStyle={{
                  tintColor: Colors.lightBlue,
                }}
                open={open}
                value={value}
                items={items}
                id={id}
                setId={setId}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: Metrix.VerticalSize(50),
                marginHorizontal: Metrix.HorizontalSize(20),
              }}
            >
              <View
                style={{
                  width: Metrix.HorizontalSize(124),
                  height: Metrix.VerticalSize(82),
                  backgroundColor: Colors.lightBlue,
                  zIndex: -2,
                  borderRadius: 12,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    ...styles.itemName,
                    fontSize: Metrix.customFontSize(48),
                    fontFamily: fonts.Bold,
                    color: Colors.white,
                    textAlign: 'center',
                    //   alignSelf: 'center'
                  }}
                >
                  {screen == 'comprehensive' ? '$30' : '$30'}
                </Text>
              </View>
              {screen == 'comprehensive' ? (
                <Text
                  style={{
                    ...styles.itemDescription,
                    width: '45%',
                    marginHorizontal: 20,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                >
                  You have to pay{' '}
                  <Text
                    style={{ color: Colors.primary, fontFamily: fonts.Bold }}
                  >
                    $30/month
                  </Text>{' '}
                  , for a Comprehensive Coverage regardless of the vehicle's
                  value.{' '}
                </Text>
              ) : (
                <Text
                  style={{
                    ...styles.itemDescription,
                    width: '45%',
                    marginHorizontal: 20,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                >
                  Your car worth is{' '}
                  <Text
                    style={{ color: Colors.primary, fontFamily: fonts.Bold }}
                  >
                    $23,000
                  </Text>{' '}
                  This is your one month billing. You have to pay{' '}
                  <Text
                    style={{ color: Colors.primary, fontFamily: fonts.Bold }}
                  >
                    $1 per day.
                  </Text>
                </Text>
              )}
            </View>
          </View>
          {screen == 'comprehensive' ? (
            <Text
              style={{
                ...styles.itemDescription,

                fontFamily: fonts.Regular,
                color: Colors.primary,
                textAlign: 'center',
                backgroundColor: '#08209A1A',
                marginHorizontal: Metrix.HorizontalSize(20),
                marginTop: Metrix.VerticalSize(20),
                borderRadius: 12,
                padding: 10,
              }}
            >
              Note: Claims will only be available once SCI has{' '}
              <Text style={{ color: Colors.primary, fontFamily: fonts.Bold }}>
                50K customers
              </Text>{' '}
              for comprehensive coverage.
            </Text>
          ) : (
            <Text
              style={{
                ...styles.itemDescription,

                fontFamily: fonts.Regular,
                color: Colors.primary,
                textAlign: 'center',
                backgroundColor: '#08209A1A',
                marginHorizontal: Metrix.HorizontalSize(20),
                marginTop: Metrix.VerticalSize(20),
                borderRadius: 12,
                padding: 10,
              }}
            >
              Note: You must pay 1 month upfront, and claims will only be
              available once SCI has{' '}
              <Text style={{ color: Colors.primary, fontFamily: fonts.Bold }}>
                100K customers
              </Text>{' '}
              for collision coverage.
            </Text>
          )}

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setCheck(!check)}
            style={{
              width: '46%',
              marginLeft: Metrix.HorizontalSize(20),
              marginTop: Metrix.HorizontalSize(20),
              flexDirection: 'row',
            }}
          >
            {check ? (
              <Ionicons
                name={'checkbox'}
                size={Metrix.customFontSize(22)}
                color={Colors.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name={'checkbox-blank'}
                size={Metrix.customFontSize(22)}
                color={Colors.backgroundGray}
              />
            )}
            <Text
              style={{
                color: Colors.textColor,
                fontFamily: fonts.Regular,
                justifyContent: 'center',
                alignSelf: 'center',
                marginLeft: Metrix.HorizontalSize(5),
              }}
            >
              Do you wish to proceed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              NavigationService.resetStack('UserStack', { screen: 'Home' });
            }}
            style={{
              marginHorizontal: Metrix.HorizontalSize(20),
              marginTop: Metrix.HorizontalSize(20),
              paddingVertical: 10,
              flexDirection: 'row',
              backgroundColor: '#F6C557',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={Images.paypal} style={{ width: 137, height: 34 }} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Evaluating;

const styles = StyleSheet.create({
  container: isSuccess => ({
    flex: 1,
    backgroundColor:
      isSuccess === 'evaluating' ? Colors.primary : Colors.background,
  }),
  logo: {
    height: Metrix.VerticalSize(296),
    width: '100%',
    alignSelf: 'center',
    marginTop: Metrix.VerticalSize(110),
  },
  title: {
    marginLeft: Metrix.HorizontalSize(33),
    fontSize: Metrix.customFontSize(32),
    fontFamily: fonts.Bold,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(22),
  },
  subTitle: {
    // flex: 1,
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(12),
    marginHorizontal: Metrix.HorizontalSize(20),
    color: Colors.background,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(22),
  },
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginTop: Metrix.VerticalSize(16),
    // overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,

    paddingVertical: Metrix.VerticalSize(20),
    marginHorizontal: Metrix.HorizontalSize(20),
  },
  itemName: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Bold,
    color: Colors.primary,
    textAlign: 'left',
  },
  itemDescription: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Medium,
    color: Colors.grayText,
  },
  itemDescription2: {
    fontSize: Metrix.customFontSize(9),
    fontFamily: fonts.Regular,
    color: Colors.background,
    marginLeft: 5,
  },
  labelText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(11),
    color: Colors.labelColor,
  },

  dropdownContainer: {
    flex: 1,
    marginTop: Metrix.VerticalSize(10),
    width: '100%',
    fontSize: Metrix.customFontSize(12),
    padding: Metrix.customFontSize(12),
    paddingLeft: Metrix.HorizontalSize(10),
    color: Colors.black,
    borderRadius: 10,
    backgroundColor: Colors.textFiledBG,
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownList: {
    marginTop: Metrix.VerticalSize(10),
    width: '100%',
    fontSize: Metrix.customFontSize(10),
    padding: Metrix.customFontSize(4),
    paddingLeft: Metrix.HorizontalSize(0),
    color: Colors.black,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: Colors.textFiledBG,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
