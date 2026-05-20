import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { fonts } from '../../config/Constants';
import { Button, CustomModal, Header, TextField } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import BodyShopComponent from '../../components/BodyShopComponent';
// import MapView, {Marker} from 'react-native-maps';

const BodyShop = () => {
  const [search, setSearch] = useState('');
  const [buttonSelect, setButtonSelect] = useState('list');
  const [apiList, setApiList] = useState([{}]);
  const [showCarShopDialog, setShowCarShopDialog] = useState(false);
  const closeDialog = () => {
    setShowCarShopDialog(false);
  };
  return (
    <View style={styles.container}>
      <>
        <Header backIcon={true} title={'2000 BMW 3-Series'} />
        <View style={styles.loadingContainer}>
          <View
            style={{
              marginHorizontal: Metrix.HorizontalSize(20),
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity style={styles.eyeIconStyle} activeOpacity={0.7}>
              <Octicons
                name={'search'}
                color={Colors.textColor}
                size={Metrix.customFontSize(22)}
              />
            </TouchableOpacity>
            <TextField
              value={search}
              onChangeText={text => setSearch(text)}
              placeholder="search here"
              style={{
                paddingLeft: Metrix.HorizontalSize(35),
              }}
            />
          </View>

          <View style={styles.row}>
            <Button
              title={'Show List View'}
              onPress={() => {
                setShowCarShopDialog(false);
                setButtonSelect('list');
              }}
              btnStyle={{
                ...styles.button,
                backgroundColor:
                  buttonSelect == 'list' ? Colors.lightBlue : Colors.background,
                //   borderC:buttonSelect == 'list' ? Colors.lightBlue : Colors.background,
                borderColor: Colors.grayText,
                borderWidth: buttonSelect == 'list' ? 0 : 1,
              }}
              textStyle={{
                color: buttonSelect == 'list' ? Colors.white : Colors.textColor,
                fontSize: Metrix.customFontSize(12),
              }}
            />
            <Button
              title={'Show Map View'}
              onPress={() => {
                setShowCarShopDialog(false);
                setButtonSelect('map');
              }}
              btnStyle={{
                ...styles.button,
                backgroundColor:
                  buttonSelect == 'map' ? Colors.lightBlue : Colors.background,
                borderColor: Colors.grayText,
                borderWidth: buttonSelect == 'map' ? 0 : 1,
              }}
              textStyle={{
                color: buttonSelect == 'map' ? Colors.white : Colors.textColor,
                fontSize: Metrix.customFontSize(12),
              }}
            />
          </View>
          {buttonSelect == 'list' ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={apiList}
              style={{ marginHorizontal: Metrix.HorizontalSize(30) }}
              onEndReached={() => {
                // if (apiAccountList.length < recordCount) {
                //   onEndReached();
                // }
              }}
              onEndReachedThreshold={0.7}
              ListEmptyComponent={() => (
                <View
                  style={{
                    // flex: 1,
                    height: 500,
                    // marginHorizontal: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.titleNoDataFount}>No Data Found</Text>
                </View>
              )}
              ListFooterComponent={() => (
                <View style={{ height: Metrix.HorizontalSize(20) }}></View>
              )}
              renderItem={({ item, index }) => {
                return <BodyShopComponent item={item} index={index} />;
              }}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={{ flex: 1, marginTop: Metrix.VerticalSize(30) }}>
              {/* <MapView
                style={{flex: 1}}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <Marker coordinate={{latitude: 37.78825, longitude: -122.4324}}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowCarShopDialog(true);
                    }}>
                    <Image
                      source={Images.custom_pin}
                      style={{width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                </Marker>
              </MapView> */}
            </View>
          )}
        </View>
      </>

      {showCarShopDialog ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTopLeftRadius: Metrix.HorizontalSize(23),
            borderTopRightRadius: Metrix.HorizontalSize(23),
            backgroundColor: Colors.white,
            paddingVertical: Metrix.HorizontalSize(30),
            paddingHorizontal: Metrix.HorizontalSize(30),
          }}
        >
          <Text
            style={{
              ...styles.description,
              fontFamily: fonts.Bold,
              color: Colors.primary,
              textAlign: 'left',
            }}
          >
            Q Car Garage
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: Metrix.VerticalSize(20),
            }}
          >
            <Text
              style={{
                ...styles.description,
                fontFamily: fonts.Regular,
                color: Colors.textColor,
                textAlign: 'left',
                width: '60%',
              }}
            >
              Address: 861 Saxton St.Burlington, MA 01803
            </Text>
            <View>
              <Text
                style={{
                  ...styles.description,
                  fontFamily: fonts.Regular,
                  color: Colors.textColor,
                  textAlign: 'right',
                }}
              >
                30 Mins
              </Text>
              <Text
                style={{
                  ...styles.description,
                  fontFamily: fonts.Regular,
                  color: Colors.textColor,
                  textAlign: 'right',
                }}
              >
                10 Km away
              </Text>
            </View>
          </View>
          <Button
            title="Car Delivered"
            onPress={() => {
              NavigationService.navigate('CarDelivered');
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default BodyShop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  loadingContainer: {
    flex: 1,
    // marginHorizontal: Metrix.HorizontalSize(30),
  },

  description: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Regular,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(10),
  },
  eyeIconStyle: {
    position: 'absolute',
    zIndex: 100,
    top: 14,
    padding: 10,
    left: 0,
  },
  row: {
    marginTop: Metrix.VerticalSize(23),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Metrix.HorizontalSize(20),
  },
  button: {
    flex: 1, // Each button takes equal space
    marginHorizontal: 5, // Optional: Add spacing between buttons
  },
  titleNoDataFount: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Bold,
    color: Colors.darkGray,
    textAlign: 'center',
  },
});
