import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {Images, Metrix, NavigationService} from '../config';
import {fonts} from '../config/Constants';
import Button from './Button';
import {useDispatch, useSelector} from 'react-redux';
import {imageBaseUrl} from '../config/ApiCaller';
import {AuthAction} from '../redux/Actions';
import {HomeMiddleware} from '../redux/Middlewares';
import CustomModal from './CustomModal';
import {useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomThemeSwitch from './CustomSwitch';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import capitalizeFirstLetter from '../config/capitalizeFirstLetter';

export default function CustomDrawer(props) {
  const Colors = useTheme().colors;
  const styles = createStyles(Colors);
  const [LogoutModal, setLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state?.AuthReducer?.user);

  const arr = [
    {
      title: 'Home',
      icon: Images.home,
      goto: () => {
        props.navigation.closeDrawer(), props.navigation.navigate('Home');
      },
    },
    
    {
      title: 'Withdrawal',
      icon: Images.withdraw,
      goto: () => {
        props.navigation.closeDrawer(), props.navigation.navigate('Withdraw');
      },
    },
    {
      title: 'Monthly Statement',
      icon: Images.monthly,
      goto: () => {
        props.navigation.closeDrawer(),
          props.navigation.navigate('MonthlyStatement');
      },
    },
    {
      title: 'My Accounts',
      icon: Images.my_accounts,
      goto: () => {
        props.navigation.closeDrawer(), props.navigation.navigate('Account');
      },
    },
    {
      title: 'Budget',
      icon: Images.budget,
      goto: () => {
        props.navigation.closeDrawer(), props.navigation.navigate('Budget');
      },
    },
    {
      title: 'Documents Vault',
      icon: Images.document_vault,
      goto: () => {
        props.navigation.closeDrawer()
        props.navigation.navigate('DocumentValut');
      },
    },

    {
      title: 'Expense',
      icon: Images.expense,
      goto: () => {
        props.navigation.closeDrawer()
        props.navigation.navigate('Expense');
      },
    },
    // {
    //   title: 'Goal-Based Planning',
    //   icon: Images.businessplan,
    //   goto: () => {
    //     props.navigation.closeDrawer()
    //     // props.navigation.navigate('Withdraw');
    //   },
    // },
    {
      title: 'Chat',
      icon: Images.chat,
      goto: () => {
        // props.navigation.closeDrawer();
        // props.navigation.navigate('MonthlyStatement');
      },
    },
    {
      title: 'Deposit Requests',
      icon: Images.banknote,
      goto: () => {
        props.navigation.closeDrawer();
        props.navigation.navigate('DepositRequestList');
      },
    },
    {
      title: 'Newsfeed',
      icon: Images.news,
      goto: () => {
        props.navigation.closeDrawer();
        props.navigation.navigate('NewsFeed');
      },
    },
    {
      title: 'Taxation',
      icon: Images.receipt_tax,
      goto: () => {
        props.navigation.closeDrawer()
          props.navigation.navigate('Taxation');
      },
    },
  ];
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        marginTop: Metrix.HorizontalSize(30),
        width: '100%',
      }}>
      <TouchableOpacity
        onPress={() => props.navigation.closeDrawer()}
        style={{marginTop: Metrix.VerticalSize(10)}}>
        {/* <Image
          source={Images.cross}
          style={{
            height: Metrix.HorizontalSize(30),
            width: Metrix.HorizontalSize(30),
            alignSelf: 'flex-end',
            marginRight: Metrix.HorizontalSize(15),
          }}
        /> */}
        <AntDesign
          name="close"
          size={30}
          color={Colors.black}
          style={{
            height: Metrix.HorizontalSize(30),
            width: Metrix.HorizontalSize(30),
            alignSelf: 'flex-end',
            marginRight: Metrix.HorizontalSize(15),
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          paddingVertical: Metrix.HorizontalSize(30),
          paddingHorizontal: Metrix.HorizontalSize(30),
          flexDirection: 'row',
          alignItems: 'center',
          //  backgroundColor : 'red'
        }}>
        <Image
          style={{
            height: Metrix.HorizontalSize(80),
            width: Metrix.HorizontalSize(80),
            borderRadius: 80,
          }}
          source={
            user?.user?.profilePictureFileName
              ? {
                  uri: imageBaseUrl + user.user?.profilePictureFileName,
                }
              : Images.thumbnail
          }
        />
        <View style={{marginTop: 5}}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              color: Colors.textColor,
              fontFamily: fonts.Bold,
              fontSize: Metrix.customFontSize(20),
              marginHorizontal: Metrix.HorizontalSize(10),
              width: Metrix.HorizontalSize(100),
            }}>
            {capitalizeFirstLetter(user?.user?.fullName)}
          </Text>
          <View
            style={{
              backgroundColor: Colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              width: 100,
              marginLeft: 8,
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: Metrix.customFontSize(12),
                fontFamily: fonts.Medium,
              }}>
              {user?.user?.userTypeId == 4 ? 'Individual' : 'Company'}
            </Text>
          </View>
        </View>
        {/* <CustomThemeSwitch /> */}
        {/* <TouchableOpacity
          onPress={() => toggleSwitch()}
          style={{
            flexDirection: 'row',
            flex: 1,
            width: 80,
            height: 35,
            borderRadius: 100,
            backgroundColor: '#E3E4EC',
            justifyContent: 'space-between',
          }}>
          {!isEnabled ? (
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: Colors.white,
                  alignSelf: 'flex-start',
                  // flex : 1
                },
              ]}>
              <FontAwesome name={'sun-o'} size={20} color={'#E3E4EC'} />
            </View>
          ) : (
            <>
              <View></View>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: Colors.white,
                    alignSelf: 'flex-end',
                    // flex : 1
                  },
                ]}>
                <FontAwesome name={'moon-o'} size={20} color={'#E3E4EC'} />
              </View>
            </>
          )}
        </TouchableOpacity> */}
      </View>

      <ScrollView
          bounces={false}

        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: Metrix.HorizontalSize(20),
          marginBottom: 20,
        }}>
        {arr.map((ele, index) => {
          return (
            <>
              <TouchableOpacity
                activeOpacity={0.8}
                key={index.toString()}
                onPress={ele.goto}>
                <View
                  style={{
                    padding: Metrix.HorizontalSize(5),
                    margin: Metrix.HorizontalSize(10),
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={ele.icon}
                    style={{
                      height: Metrix.HorizontalSize(20),
                      width: Metrix.HorizontalSize(20),
                      resizeMode: 'contain',
                    }}
                    tintColor={Colors.textColor}
                  />
                  <View style={{marginLeft: 20}}>
                    <Text
                      style={{
                        color: Colors.textColor,
                        fontSize: Metrix.customFontSize(16),
                        fontFamily: fonts.Regular,
                      }}>
                      {ele.title}{' '}
                      {index > 2 ? <Text style={{
                        color: Colors.green,
                        fontSize: Metrix.customFontSize(12),
                        fontFamily: fonts.Regular,
                      }}>(Coming Soon)</Text> : null}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        })}
      </ScrollView>
    </View>
  );
}

const createStyles = Colors =>
  StyleSheet.create({
    btnContainer: {
      marginTop: Metrix.VerticalSize(20),
      marginBottom: Metrix.VerticalSize(80),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    circle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
      marginVertical: 2,
    },
  });
