import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { fonts, ToastError } from '../../config/Constants';
import { Button, CustomModal, Header, TextField } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeItemComponent from '../../components/HomeItemComponent';
import DropDownPicker from 'react-native-dropdown-picker';
import useStyle from '../styles';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

const AddCar = ({ route }) => {
  const { cardAdded } = route?.params;

  const [carName, setCarName] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vehicleNum, setVehicleNum] = useState('');
  const [RegistrationNum, setRegistrationNum] = useState('');
  const [apiAccountList, setapiAccountList] = useState([{}, {}]);
  const gStyle = useStyle();

  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '3 SERIES', value: 4, id: 4 },
    { label: '4 SERIES', value: 3, id: 3 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [uploadedImages, setUploadedImages] = useState([]);
  const MAX_IMAGES = 10; // Set max image limit

  const openCamera = () => {
    if (uploadedImages.length >= MAX_IMAGES) {
      Alert.alert(
        'Limit Reached',
        `You can only select up to ${MAX_IMAGES} images.`,
      );
      return;
    }
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    })
      .then(image => {
        console.log('camera image', image);

        const img = {
          name:
            Math.floor(Math.random() * 100) +
            image?.modificationDate +
            Math.floor(Math.random() * 100) +
            '.jpg',
          uri: image.path,
          type: 'image/png',
        };
        closeModal();
        setUploadedImages([...uploadedImages, ...img]);
      })
      .catch(err => {
        Toast.show(ToastError(err.message));
      });
  };
  const openImagePicker = () => {
    if (uploadedImages.length >= MAX_IMAGES) {
      Alert.alert(
        'Limit Reached',
        `You can only select up to ${MAX_IMAGES} images.`,
      );
      return;
    }

    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: false,
      multiple: true,
      maxFiles: MAX_IMAGES - uploadedImages.length,
    })
      .then(selectedImages => {
        const imageArray = selectedImages.map(image => ({
          id: Math.random().toString(), // Unique ID for each image
          name:
            Math.floor(Math.random() * 100) +
            image?.modificationDate +
            Math.floor(Math.random() * 100) +
            '.jpg',
          uri: image.path,
          mime: image.mime,
        }));
        closeModal();
        // uploadImages([...uploadedImages, ...imageArray]);
        setUploadedImages([...uploadedImages, ...imageArray]);
      })
      .catch(err => {
        console.log(err, 'error');
      });
  };

  const removeImageByIndex = index => {
    setUploadedImages(prevImages => prevImages.filter((_, i) => i !== index));
  };
  const uploadImages = imagesarr => {
    const formData = new FormData();
    imagesarr.forEach((image, index) => {
      console.log('Image ===>', image);

      formData.append('images', {
        uri: image.uri.startsWith('file://')
          ? image.uri
          : `file://${image.uri}`, // Ensure correct URI format
        name: image.name || `image_${index}.jpg`, // Set a proper name with an extension
        type: image.mime || 'image/jpeg', // Set the MIME type correctly
      });
    });

    if (formData._parts.length > 0) {
      //   dispatch(
      //     HomeMiddleware.UploadNewsfeedMedia({
      //       formData, // Pass the FormData object
      //     }),
      //   )
      //     .then(res => {
      //       console.log('UploadNewsfeedMedia ==>>', res);
      //       setUploadedImages(res?.data);
      //     })
      //     .catch(error => {
      //       console.error('UploadNewsfeedMedia Error ==>>', error);
      //     });
      // } else {
      //   console.error('No images to upload.');
    }
  };
  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      <View>
        <Header
          backIcon={true}
          title={cardAdded ? 'Your Car Details' : 'Add Your Car'}
          notificationIcon={false}
        />

        <View>
          <Text style={styles.subTitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                // openModal();
                openImagePicker();
              }}
            >
              <ImageBackground
                source={Images.camera_img}
                style={{
                  ...styles.logo,
                  marginLeft: Metrix.HorizontalSize(25),
                }}
              >
                <Ionicons
                  name={'add'}
                  size={Metrix.customFontSize(16)}
                  color={Colors.primary}
                  style={{
                    alignSelf: 'flex-end',
                    marginTop: 10,
                    marginRight: 7,
                    borderRadius: 100,
                    backgroundColor: Colors.white,
                  }}
                />
              </ImageBackground>
            </TouchableOpacity>
            <FlatList
              horizontal={true}
              showsVerticalScrollIndicator={false}
              data={uploadedImages}
              onEndReached={() => {
                // if (apiAccountList.length < recordCount) {
                //   onEndReached();
                // }
              }}
              onEndReachedThreshold={0.7}
              ListEmptyComponent={() => <></>}
              ListFooterComponent={() => (
                <View style={{ height: Metrix.HorizontalSize(20) }}></View>
              )}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.logo}>
                    <Image
                      source={item ? item : Images.dummy_car}
                      style={{
                        width: Metrix.HorizontalSize(93),
                        height: Metrix.VerticalSize(93),
                        borderRadius: Metrix.HorizontalSize(12),
                      }}
                    />

                    <TouchableOpacity
                      onPress={() => {
                        removeImageByIndex(index);
                      }}
                      style={{
                        // alignSelf: 'flex-end',
                        marginTop: 10,
                        marginLeft: 75,
                        borderRadius: 100,
                        position: 'absolute',
                        backgroundColor: Colors.lightBlue,
                      }}
                    >
                      <Ionicons
                        name={'close'}
                        size={Metrix.customFontSize(16)}
                        color={Colors.white}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>

          <View
            style={{
              marginHorizontal: Metrix.HorizontalSize(25),
              marginTop: Metrix.VerticalSize(6),
            }}
          >
            <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
              <Text style={styles.labelText}> Car Name </Text>
              <TextField
                value={carName}
                onChangeText={text => setCarName(text)}
                placeholder=""
              />
            </View>

            <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
              <Text style={styles.labelText}> Model </Text>

              <DropDownPicker
                placeholder="Select model"
                style={styles.dropdownContainer}
                dropDownContainerStyle={styles.dropdownList}
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

            <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
              <Text style={styles.labelText}> Year </Text>
              <TextField
                value={year}
                onChangeText={text => setYear(text)}
                placeholder=""
              />
            </View>

            <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
              <Text style={styles.labelText}>
                {' '}
                Vehicle Identification Number{' '}
              </Text>
              <TextField
                value={vehicleNum}
                onChangeText={text => setVehicleNum(text)}
                placeholder=""
              />
            </View>

            <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
              <Text style={styles.labelText}> Registration Number </Text>
              <TextField
                value={RegistrationNum}
                onChangeText={text => setRegistrationNum(text)}
                placeholder=""
              />
            </View>
            {cardAdded ? (
              <>
                <Button
                  title={'  Download Insurance Proof'}
                  onPress={() => {}}
                  btnStyle={{
                    backgroundColor: Colors.background,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: Colors.primary,
                  }}
                  textStyle={{
                    color: Colors.primary,
                    fontFamily: fonts.SemiBold,
                    textDecorationLine: 'underline',
                  }}
                  preIcon={
                    <AntDesign
                      name={'download'}
                      size={Metrix.customFontSize(16)}
                      color={Colors.primary}
                    />
                  }
                />
                <Button
                  title={'Report An Accident'}
                  onPress={() => {
                    NavigationService.navigate('ReportAnAccident', {
                      screen: 'Report',
                    });
                  }}
                  btnStyle={{
                    backgroundColor: Colors.redDark,
                    marginTop: Metrix.VerticalSize(10),
                  }}
                />
                <Button
                  title={'Purchase a Comprehensive Plan'}
                  onPress={() => {
                    NavigationService.navigate('Evaluating', {
                      screen: 'comprehensive',
                    });
                  }}
                  btnStyle={{
                    marginTop: Metrix.VerticalSize(10),
                  }}
                />

                <View style={{ height: 40 }}></View>
              </>
            ) : (
              <View style={{ marginVertical: Metrix.VerticalSize(20) }}>
                <Button
                  title={'Next'}
                  onPress={() => {
                    NavigationService.navigate('Evaluating', {
                      screen: 'evaluating',
                    });
                  }}
                />
              </View>
            )}
          </View>
        </View>
        <CustomModal
          title={'Add you Car Images'}
          show={showModal}
          onCloseModal={closeModal}
        >
          <View style={styles.modalStyle}>
            {
              <View style={styles.modalBtnContainer}>
                <View style={{ width: '48%' }}>
                  <Button
                    title={'Open Camera'}
                    textStyle={{ marginLeft: Metrix.HorizontalSize(5) }}
                    btnStyle={{ paddingVertical: Metrix.VerticalSize(10) }}
                    preIcon={
                      <MaterialCommunityIcons
                        name="camera"
                        size={Metrix.customFontSize(18)}
                        color={Colors.white}
                      />
                    }
                    onPress={openCamera}
                    shadow
                  />
                </View>
                <View style={{ width: '48%' }}>
                  <Button
                    title={'Open Gallery'}
                    textStyle={{
                      marginLeft: Metrix.HorizontalSize(5),
                      color: Colors.primary,
                    }}
                    preIcon={
                      <MaterialCommunityIcons
                        name="folder-multiple-image"
                        size={Metrix.customFontSize(18)}
                        color={Colors.primary}
                      />
                    }
                    btnStyle={{
                      paddingVertical: Metrix.VerticalSize(10),
                      backgroundColor: Colors.white,
                      borderWidth: 1,
                      borderColor: Colors.primary,
                    }}
                    onPress={openImagePicker}
                    shadow
                  />
                </View>
              </View>
            }
          </View>
        </CustomModal>
      </View>
    </ScrollView>
  );
};

export default AddCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  title: {
    fontSize: Metrix.customFontSize(25),
    fontFamily: fonts.Bold,
    color: Colors.white,
    textAlign: 'left',
  },
  titleBig: {
    fontSize: Metrix.customFontSize(32),
    fontFamily: fonts.Bold,
    color: Colors.white,
    textAlign: 'center',
    marginHorizontal: Metrix.HorizontalSize(45),
    marginTop: Metrix.VerticalSize(30),
  },
  subTitle: {
    // flex: 1,
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    marginHorizontal: Metrix.HorizontalSize(30),
    color: Colors.textColor,
    // textAlign: 'center',
    marginTop: Metrix.VerticalSize(14),
  },
  labelText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(11),
    color: Colors.labelColor,
  },
  tabIcon: {
    width: Metrix.HorizontalSize(24),
    height: Metrix.VerticalSize(24),
    alignItems: 'center',
    tintColor: Colors.primary,
  },
  containerEmpty: {
    width: '100%',
    height: Metrix.VerticalSize(400),

    // marginHorizontal: Metrix.HorizontalSize(25),
    // backgroundColor: Colors.lightBlue,
    borderRadius: Metrix.HorizontalSize(12),
  },
  logo: {
    width: Metrix.HorizontalSize(93),
    height: Metrix.VerticalSize(93),
    marginTop: Metrix.VerticalSize(10),
    marginLeft: Metrix.HorizontalSize(12),
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
  modalStyle: {
    backgroundColor: Colors.white,
  },
  modalTitleContainer: {
    marginVertical: Metrix.VerticalSize(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBtnContainer: {
    marginTop: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
