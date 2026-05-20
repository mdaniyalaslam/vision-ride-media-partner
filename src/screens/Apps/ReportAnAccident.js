import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  FlatList,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Button, CustomModal, Header, TextField } from '../../components';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts, ToastError } from '../../config/Constants';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const ReportAnAccident = ({ route }) => {
  const { screen } = route?.params;
  const [show, setShow] = useState(false);
  const showPicker = useCallback(value => setShow(value), []);
  const [showTime, setShowTime] = useState(false);
  const showTimePicker = useCallback(value => setShowTime(value), []);
  const [location, setLocation] = useState('');
  const [accidentDate, setAccidentDate] = useState('');
  const [accidentTime, setAccidentTime] = useState('');
  const [description, setDescription] = useState('');
  const [expectedDamage, setExpectedDamage] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberPlat, setNumberPlat] = useState('');

  const [registrationNumber, setRegistrationNumber] = useState('');
  const [insuranceCompanyName, setInsuranceCompanyName] = useState('');
  const [insuranceID, setInsuranceID] = useState('');

  const [ownFaultcheck, setOwnFaultCheck] = useState(true);
  const [otherParty, setOtherParty] = useState(false);
  const [policeDialog, setPoliceDialog] = useState(false);
  const [policeReport, setPoliceReport] = useState(true);

  const closeDialog = () => {
    setPoliceDialog(false);
  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [uploadedImages, setUploadedImages] = useState([]);
  const MAX_IMAGES = 5; // Set max image limit

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
        `You can only select up to ${MAX_IMAGES} images/Videos.`,
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
  return (
    <ScrollView bounces={false} onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header
          backIcon={true}
          title={screen == 'Report' ? 'Report An Accident' : 'Your Claim'}
          notificationIcon={false}
        />
        <View style={styles.subContainer}>
          <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
            <TouchableOpacity
              style={styles.eyeIconStyle}
              onPress={() => {}}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={'my-location'}
                color={Colors.lightBlue}
                size={Metrix.customFontSize(20)}
              />
            </TouchableOpacity>
            <Text style={styles.labelText}> Accident Location </Text>
            <TextField
              value={location}
              onChangeText={text => setLocation(text)}
              placeholder="Location here"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: Metrix.VerticalSize(10),
              justifyContent: 'space-between',
            }}
          >
            <View style={{ width: '48%' }}>
              <TouchableOpacity
                style={styles.eyeIconStyle}
                onPress={() => showPicker(true)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={'calendar-clear'}
                  color={Colors.lightBlue}
                  size={Metrix.customFontSize(20)}
                />
              </TouchableOpacity>
              <Text style={styles.labelText}> Accident Date </Text>
              <TextField
                value={
                  accidentDate ? moment(accidentDate).format('YYYY-MM-DD') : ''
                }
                placeholder="Select Date"
                disable={false}
              />
            </View>
            <View style={{ width: '48%' }}>
              <TouchableOpacity
                style={styles.eyeIconStyle}
                onPress={() => {
                  showTimePicker(true);
                }}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={'clock-time-five'}
                  color={Colors.lightBlue}
                  size={Metrix.customFontSize(20)}
                />
              </TouchableOpacity>
              <Text style={styles.labelText}> Accident Time </Text>
              <TextField
                disable={false}
                value={
                  accidentTime ? moment(accidentTime).format('hh:mm A') : ''
                }
                placeholder="Select Time"
              />
            </View>
          </View>

          <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
            <Text style={styles.labelText}> Description </Text>
            <TextField
              value={description}
              onChangeText={text => setDescription(text)}
              placeholder=""
              multiline={true}
              style={{
                height: Metrix.VerticalSize(112),
                textAlignVertical: 'top',
              }}
            />
          </View>

          <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
            <Text style={styles.labelText}> Expected Damage </Text>
            <TextField
              value={expectedDamage}
              onChangeText={text => setExpectedDamage(text)}
              placeholder="$00"
            />
          </View>

          <Text style={styles.titleBig}> Who is at fault? </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: Metrix.VerticalSize(10),
              // justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setOtherParty(false);
                setOwnFaultCheck(true);
              }}
              style={{
                //   marginLeft: Metrix.HorizontalSize(20),
                marginTop: Metrix.HorizontalSize(20),
                flexDirection: 'row',
              }}
            >
              {ownFaultcheck ? (
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
                  color: Colors.labelColor,
                  fontFamily: fonts.Regular,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginLeft: Metrix.HorizontalSize(5),
                }}
              >
                My Own
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setOtherParty(true);
                setOwnFaultCheck(false);
              }}
              style={{
                marginLeft: Metrix.HorizontalSize(20),
                marginTop: Metrix.HorizontalSize(20),
                flexDirection: 'row',
              }}
            >
              {otherParty ? (
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
                  color: Colors.labelColor,
                  fontFamily: fonts.Regular,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginLeft: Metrix.HorizontalSize(5),
                }}
              >
                Other Party
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.titleBig}> Party Involved </Text>

          <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
            <Text style={styles.labelText}> Name </Text>
            <TextField
              value={name}
              onChangeText={text => setName(text)}
              placeholder=""
            />
          </View>

          <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
            <Text style={styles.labelText}> Phone Number</Text>
            <TextField
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              placeholder=""
            />
          </View>
          {screen == 'Claim' ? (
            <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
              <Text style={styles.labelText}> Plate Number</Text>
              <TextField
                value={numberPlat}
                onChangeText={text => setNumberPlat(text)}
                placeholder=""
              />
            </View>
          ) : null}

          {otherParty ? (
            <>
              <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
                <Text style={styles.labelText}> Registration Number </Text>
                <TextField
                  value={registrationNumber}
                  onChangeText={text => setRegistrationNumber(text)}
                  placeholder=""
                />
              </View>

              <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
                <Text style={styles.labelText}> Insurance Company Name </Text>
                <TextField
                  value={insuranceCompanyName}
                  onChangeText={text => setInsuranceCompanyName(text)}
                  placeholder=""
                />
              </View>

              <View style={{ marginVertical: Metrix.VerticalSize(10) }}>
                <Text style={styles.labelText}> Insurance ID </Text>
                <TextField
                  value={insuranceID}
                  onChangeText={text => setInsuranceID(text)}
                  placeholder=""
                />
              </View>
            </>
          ) : null}

          <Button
            title={'Upload Accident Image(s) and Video(s)'}
            onPress={() => {
              // openModal();
              openImagePicker();
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
            textStyle={{
              color: Colors.white,
              marginLeft: Metrix.HorizontalSize(10),
              fontFamily: fonts.Regular,
              fontSize: Metrix.customFontSize(12),
            }}
          />
          <FlatList
            horizontal={true}
            showsVerticalScrollIndicator={false}
            data={uploadedImages}
            onEndReached={() => {}}
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
                      width: Metrix.HorizontalSize(42),
                      height: Metrix.VerticalSize(42),
                      borderRadius: Metrix.HorizontalSize(12),
                    }}
                    resizeMode="cover"
                  />

                  <TouchableOpacity
                    onPress={() => {
                      removeImageByIndex(index);
                    }}
                    style={{
                      // alignSelf: 'flex-end',
                      marginTop: -5,
                      marginLeft: 40,
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
          {screen == 'Claim' ? (
            <View
              style={{ marginTop: policeReport ? 0 : Metrix.VerticalSize(20) }}
            >
              {policeReport ? (
                <View>
                  <Text style={styles.titleBig}> Police Report </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: Metrix.VerticalSize(18),
                    }}
                  >
                    <Image source={Images.pdf_icon} style={styles.pdfIcon} />
                    <Text style={styles.labelText}> Police Report.pdf </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={{ ...styles.labelText, color: Colors.redDark }}>
                    Please upload police report*{' '}
                  </Text>
                  <Button
                    title={'Upload Police Report'}
                    onPress={() => {
                      //   setBackImage('image');
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
                    textStyle={{
                      color: Colors.white,
                      marginLeft: Metrix.HorizontalSize(10),
                      fontFamily: fonts.Regular,
                      fontSize: Metrix.customFontSize(12),
                    }}
                  />
                </View>
              )}
            </View>
          ) : null}
          <Button
            title={screen == 'Report' ? 'Submit' : 'Proceed'}
            // disabled ={policeReport}
            btnStyle={{
              backgroundColor: policeReport
                ? Colors.primary
                : Colors.buttonGray,
              marginTop: Metrix.VerticalSize(12),
            }}
            onPress={() => {
              {
                screen == 'Report'
                  ? setPoliceDialog(true)
                  : NavigationService.navigate('PleaseWaitUnderReview');
              }
            }}
          />
        </View>
        <CustomModal
          title={'Police Report Required'}
          show={policeDialog}
          onCloseModal={closeDialog}
        >
          <Text style={styles.subTitle}>
            To proceed with your claim, submission of a police report is
            mandatory. Please provide the required document to continue with the
            process.
          </Text>
          <Button
            title="Okay"
            btnStyle={{
              // backgroundColor: Colors.lightBlue,
              marginTop: Metrix.VerticalSize(35),
            }}
            onPress={() => {
              setPoliceDialog(false);
            }}
          />
        </CustomModal>

        <CustomModal
          title={'Upload accident images/videos'}
          show={showModal}
          onCloseModal={closeModal}
        >
          <View style={styles.modalStyle}>
            {
              <View style={styles.modalBtnContainer}>
                {/* <View style={{width: '48%'}}>
                  <Button
                    title={'Open Camera'}
                    textStyle={{marginLeft: Metrix.HorizontalSize(5)}}
                    btnStyle={{paddingVertical: Metrix.VerticalSize(10)}}
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
                </View> */}
                <View style={{ width: '98%' }}>
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
        {show && (
          <DatePicker
            modal
            open={show}
            mode="date"
            date={new Date()}
            maximumDate={new Date()}
            onConfirm={date => {
              setShow(false);
              setAccidentDate(date);
            }}
            onCancel={() => {
              setShow(false);
              setAccidentDate('');
            }}
          />
        )}

        {showTime && (
          <DatePicker
            modal
            open={showTime}
            mode="time"
            is24hourSource="local"
            date={new Date()}
            maximumDate={new Date()}
            onConfirm={date => {
              setShowTime(false);
              setAccidentTime(date);
            }}
            onCancel={() => {
              setShowTime(false);
              setAccidentTime('');
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default ReportAnAccident;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  subContainer: {
    marginHorizontal: Metrix.HorizontalSize(30),
    marginVertical: Metrix.HorizontalSize(20),
    // backgroundColor: 'red'
  },
  eyeIconStyle: {
    position: 'absolute',
    zIndex: 100,
    top: Metrix.VerticalSize(30),
    right: Metrix.HorizontalSize(5),
    padding: 10,
  },
  title: {
    fontSize: Metrix.customFontSize(25),
    fontFamily: fonts.Bold,
    color: Colors.white,
    textAlign: 'left',
  },
  titleBig: {
    fontSize: Metrix.customFontSize(20),
    fontFamily: fonts.Bold,
    color: Colors.primary,
    marginTop: Metrix.VerticalSize(30),
  },
  subTitle: {
    // flex: 1,
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(13),
    // marginHorizontal: Metrix.HorizontalSize(30),
    color: Colors.textColor,
    // textAlign: 'center',
    marginTop: Metrix.VerticalSize(14),
  },
  labelText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(11),
    color: Colors.labelColor,
  },
  pdfIcon: {
    width: Metrix.HorizontalSize(30),
    height: Metrix.HorizontalSize(30),
    alignSelf: 'center',
    marginRight: Metrix.HorizontalSize(10),
  },
  logo: {
    width: Metrix.HorizontalSize(55),
    height: Metrix.VerticalSize(52),
    marginTop: Metrix.VerticalSize(10),
    marginLeft: Metrix.HorizontalSize(12),
  },
});
