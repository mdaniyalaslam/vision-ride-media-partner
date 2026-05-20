import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images, Metrix} from '../config';
import {fonts} from '../config/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useStyle from '../screens/styles';
import {useTheme} from '@react-navigation/native';

const HomeCard = ({data}) => {
  const Colors = useTheme().colors;
  const gStyle = useStyle();
  return (
    <View style={{marginTop: Metrix.HorizontalSize(10)}}>
      <FlatList
        horizontal={false}
        numColumns={2}
        data={data}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.white,
              borderRadius: 10,
              justifyContent: 'center',
              margin: Metrix.HorizontalSize(8),
              ...gStyle.shadow,
              padding: Metrix.HorizontalSize(10),
            }}>
            <View style={{height: Metrix.VerticalSize(20)}}>
              {item?.time ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    {item?.percentage < 0 ? (
                      <AntDesign name="arrowdown" size={16} color={'red'} />
                    ) : (
                      <AntDesign name="arrowup" size={16} color={'#00C292'} />
                    )}
                    <Text
                      style={{
                        color: Colors.primary,
                        marginHorizontal: Metrix.HorizontalSize(5),
                        fontSize: Metrix.customFontSize(12),
                      }}>
                      {item.percentage}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: Colors.textColor,
                      fontSize: 10,
                      // justifyContent: 'flex-end',
                      // alignItems: 'flex-end',
                      // alignContent: 'flex-end',
                      textAlign:'right'
                    }}>
                    {item.time}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={{marginTop: Metrix.VerticalSize(6),flexDirection: 'row',justifyContent: 'space-between'}}>
              <View>
              <Image
                source={item.image}
                resizeMode="contain"
                // tintColor={item.color}
                style={{
                  height: Metrix.VerticalSize(45),
                  width: Metrix.VerticalSize(45),
                }}
              />
              <Text
                style={{
                  color: Colors.primary,
                  fontFamily: fonts.ExtraBold,
                  fontSize: Metrix.customFontSize(22),
                }}>
                {item.price}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: Colors.textColor,
                  fontFamily: fonts.Medium,
                  fontSize: 11,
                  width: '100%',
                }}>
                {item.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: Colors.textColor,
                  fontFamily: fonts.Medium,
                  fontSize: 10,
                  width: '100%',
                }}>
                {item.Secondtitle}
              </Text>
            </View>
            {item.id == 4 ? <View style={{justifyContent: 'flex-end',
                      alignItems: 'center',}}>
              <Image
                source={Images.portfolio_growth}
                resizeMode="contain"
                // tintColor={item.color}
                style={{
                  height: Metrix.VerticalSize(110),
                  width: Metrix.VerticalSize(145),
                }}
              />
            </View> : null}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({});
