import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Button, CustomModal } from '../../components';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { fonts, ToastError } from '../../config/Constants';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

const LicenseUploading = () => {
  const [frontImage, setFrontImage] = useState('');
  const [backImage, setBackImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isFront, setIsFront] = useState(false);
  const openModal = isFront => {
    setIsFront(isFront);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const openCamera = () => {
    ImageCropPicker.openCamera({
      width: 400,
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
        if (isFront) {
          setFrontImage(img);
        } else {
          setBackImage(img);
        }
      })
      .catch(err => {
        Toast.show(ToastError(err.message));
      });
  };
  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: false,
      multiple: false,
      // maxFiles: MAX_IMAGES - uploadedImages.length,
    })
      .then(image => {
        console.log('image', image);
        const img = {
          name:
            Math.floor(Math.random() * 100) +
            image?.modificationDate +
            Math.floor(Math.random() * 100) +
            '.jpg',
          uri: image.path,
          mime: 'jpg',
          type: 'image/jpg',
        };
        closeModal();
        if (isFront) {
          setFrontImage(img);
        } else {
          setBackImage(img);
        }
      })
      .catch(err => {
        console.log(err, 'error');
      });
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
    <ScrollView bounces={false} style={styles.container}>
      <View>
        <Image
          source={Images.driver_license}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>
          We'll Need Your Driver's License To Get Started.
        </Text>
        <Text style={styles.subTitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <View
          style={{
            marginTop: Metrix.VerticalSize(62),
            marginHorizontal: Metrix.HorizontalSize(20),
            backgroundColor: Colors.white,
            padding: Metrix.VerticalSize(20),
            borderRadius: Metrix.VerticalSize(13),
          }}
        >
          {frontImage ? (
            <View>
              <TouchableOpacity
                style={styles.eyeIconStyle}
                onPress={() => {
                  setFrontImage('');
                }}
                activeOpacity={0.7}
              >
                <Image
                  source={Images.close}
                  style={{
                    height: Metrix.VerticalSize(24),
                    width: Metrix.VerticalSize(24),
                  }}
                />
              </TouchableOpacity>
              <Image
                source={frontImage}
                resizeMode="contain"
                style={styles.uploadImage}
              />
            </View>
          ) : (
            <Button
              title={' Upload Front Side'}
              onPress={() => {
                openModal(true);
                // setFrontImage('image');
              }}
              preIcon={
                <Octicons
                  name={'upload'}
                  color={Colors.white}
                  size={Metrix.customFontSize(22)}
                />
              }
              btnStyle={{ backgroundColor: Colors.lightBlue }}
              textStyle={{ color: Colors.white, fontFamily: fonts.Regular }}
            />
          )}

          {backImage ? (
            <View style={{ marginTop: Metrix.VerticalSize(12) }}>
              <TouchableOpacity
                style={styles.eyeIconStyle}
                onPress={() => {
                  setBackImage('');
                }}
                activeOpacity={0.7}
              >
                <Image
                  source={Images.close}
                  style={{
                    height: Metrix.VerticalSize(24),
                    width: Metrix.VerticalSize(24),
                  }}
                />
              </TouchableOpacity>
              <Image
                source={backImage}
                resizeMode="contain"
                style={styles.uploadImage}
              />
            </View>
          ) : (
            <Button
              title={' Upload Back Side'}
              onPress={() => {
                openModal(false);
                // setBackImage('image');
              }}
              preIcon={
                <Octicons
                  name={'upload'}
                  color={Colors.white}
                  size={Metrix.customFontSize(22)}
                />
              }
              btnStyle={{
                backgroundColor: Colors.lightBlue,
                marginTop: Metrix.VerticalSize(12),
              }}
              textStyle={{ color: Colors.white, fontFamily: fonts.Regular }}
            />
          )}

          <Button
            title={'Submit For Review'}
            onPress={() => {
              NavigationService.resetStack('PleaseWait');
            }}
            btnStyle={{ marginTop: Metrix.VerticalSize(29) }}
          />
        </View>

        <CustomModal
          title={isFront ? 'Upload Front Side' : 'Upload Back Side'}
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

export default LicenseUploading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  logo: {
    height: Metrix.VerticalSize(153),
    width: Metrix.VerticalSize(259),
    alignSelf: 'center',
    marginTop: Metrix.VerticalSize(110),
  },
  title: {
    width: '100%',
    fontSize: Metrix.customFontSize(32),
    fontFamily: fonts.Bold,
    color: Colors.white,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(22),
  },
  subTitle: {
    // flex: 1,
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    marginHorizontal: Metrix.HorizontalSize(20),
    color: Colors.background,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(22),
  },

  uploadImage: {
    height: Metrix.VerticalSize(75),
    width: Metrix.VerticalSize(119),
    borderRadius: Metrix.HorizontalSize(5),
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  eyeIconStyle: {
    position: 'absolute',
    zIndex: 999,
    bottom: Metrix.VerticalSize(50),
    right: Metrix.HorizontalSize(70),
    padding: 10,
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
