import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import {
  Button,
  CustomModal,
  DropdownField,
  Header,
  TextComponent,
  TextField,
} from '../../components';
import {
  citiesData,
  fonts,
  statesData,
  ToastError,
  ToastSuccess,
} from '../../config/Constants';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaskInput from 'react-native-mask-input';
import { useDispatch, useSelector } from 'react-redux';
import { AuthMiddleware } from '../../redux/Middlewares';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.AuthReducer);
  const token = user?.token;

  const [uploadedImage, setUploadedImage] = useState(null);
  const [countries, setCountries] = useState([]);

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
        // UploadProfilePic(img);
        setUploadedImage(img);
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
        setUploadedImage(img);
      })
      .catch(err => {
        console.log(err, 'error');
      });
  };

  const removeImageByIndex = index => {
    setUploadedImage(prevImages => prevImages.filter((_, i) => i !== index));
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
  useEffect(() => {
    getProfile();
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    dispatch(AuthMiddleware.GetCountries())
      .then(res => {
        console.log('Countries response:', res);
        setCountries(res?.data?.countries || []);
      })
      .catch(err => {
        console.log('Error fetching countries:', err);
      });
  };

  const getProfile = () => {
    dispatch(AuthMiddleware.GetProfile(token))
      .then(res => {
        console.log('GetProfile ==>>', res);
        let user = res?.user;
        setFirstName(user?.first_name || '');
        setLastName(user?.last_name || '');
        setEmailAddress(user?.email || '');
        setPhoneNumber(user?.phone || '');
        setCity(user?.city || '');
        setState(user?.state || '');
        // setCountry(
        //   user?.country == 'US' || 'us'
        //     ? { name: 'United States' }
        //     : user?.country == 'CAN'
        //     ? { name: 'Canada' }
        //     : user?.country == 'PAK'
        //     ? { name: 'Pakistan' }
        //     : user?.country == 'OTHER'
        //     ? { name: 'Other' }
        //     : '',
        // );
        setCountry(user?.country ? { name: user.country } : '');
      })
      .catch(error => {
        console.error('GetProfile Error ==>>', error);
      });
  };

  const updateProfile = () => {
    console.log({
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
      country: country?.name || '',
    });
    dispatch(
      AuthMiddleware.UpdateProfile(token, {
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        country: country?.name || '',
      }),
    )
      .then(res => {
        console.log('UpdateProfile ==>>', res);
        Toast.show(ToastSuccess('Profile updated successfully'));
        // getProfile();
        NavigationService.goBack();
      })
      .catch(error => {
        console.error('UpdateProfile Error ==>>', error);
        Toast.show(ToastError('Failed to update profile'));
      });
  };

  return (
    <>
      <Header title={'Profile'} />

      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ ...styles.row }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                // openModal();
              }}
              style={styles.carImage}
            >
              <Image
                source={uploadedImage ? uploadedImage : Images.logo}
                style={styles.carImage}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                marginHorizontal: Metrix.HorizontalSize(10),
                justifyContent: 'center',
              }}
            >
              <TextComponent
                text={firstName + ' ' + lastName}
                isTitle
                customStyles={{ fontSize: 14 }}
              />
              <TextComponent text={emailAddress} />
            </View>
          </View>

          <View
            style={{ marginTop: Metrix.VerticalSize(10), paddingBottom: 50 }}
          >
            <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
              <TextField
                label="First Name*"
                value={firstName}
                onChangeText={text => setFirstName(text)}
              />
              <TextField
                label="Last Name*"
                value={lastName}
                onChangeText={text => setLastName(text)}
              />

              <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
                <Text style={styles.labelText}> Contact Number </Text>
                <MaskInput
                  value={phoneNumber}
                  keyboardType="number-pad"
                  style={{
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
                  placeholderTextColor={Colors.textColor}
                  onChangeText={(masked, unmasked) => {
                    setPhoneNumber(masked);
                  }}
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

              {/* <TextField
                label="Occupation*"
                // value={emailAddress}
                onChangeText={text => setEmailAddress(text.toLowerCase())}
              /> */}
              {/* <TextField
                label="Address"
                multiline
                inputContainerStyle={{ height: 100 }}
                value={address}
                onChangeText={text => setAddress(text)}
              /> */}
              <DropdownField
                isSearch
                label="Country*"
                placeholder={country ? country.name : 'Select Country'}
                updateValue={obj => setCountry(obj)}
                modalTitle="Select Country"
                data={
                  countries.length > 0
                    ? countries
                    : [
                        { name: 'United States' },
                        { name: 'Canada' },
                        { name: 'Pakistan' },
                        { name: 'Other' },
                      ]
                }
              />
              {/* <DropdownField
                modalTitle="Select City"
                label="City*"
                placeholder={city ? city.name : 'Select City'}
                updateValue={obj => setCity(obj)}
                data={citiesData}
              />
              <DropdownField
                modalTitle="Select State"
                label="State*"
                placeholder={state ? state.name : 'Select State'}
                updateValue={obj => setState(obj)}
                data={statesData}
              />
              <TextField
                label="Postal Code*"
                value={postalCode}
                onChangeText={text => setPostalCode(text)}
              /> */}
            </View>
            <Button
              title="Update"
              buttonStyle={{ marginBottom: 6 }}
              onPress={updateProfile}
            />
            <Button
              title="Change Password"
              buttonStyle={{ marginTop: 6 }}
              onPress={() => {
                NavigationService.navigate('ChangePassword');
              }}
              isOutline
            />
          </View>
        </View>
      </ScrollView>
      <CustomModal
        title={'Change profile image'}
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
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.background,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrix.VerticalSize(20),
  },
  carImage: {
    width: Metrix.HorizontalSize(59),
    height: Metrix.HorizontalSize(59),
    borderRadius: Metrix.HorizontalSize(100),
  },
  itemName: {
    fontSize: Metrix.customFontSize(20),
    fontFamily: fonts.Bold,
    color: Colors.darkGray,
    textAlign: 'left',
  },
  itemDescription: {
    fontSize: Metrix.customFontSize(11),
    fontFamily: fonts.Medium,
    color: Colors.darkGray,
  },
  labelText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(12),
    color: Colors.labelColor,
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
