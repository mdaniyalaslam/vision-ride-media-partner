import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Metrix, NavigationService} from '../../config';
import {Button, Header, TextField, TextComponent} from '../../components';
import {fonts, ToastError} from '../../config/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {HomeMiddleware} from '../../redux/Middlewares';

const POSITIONS = [
  {key: 'front', uploadLabel: 'Upload Front View Image', label: 'Front View'},
  {key: 'rear', uploadLabel: 'Upload Rear View Image', label: 'Rear View'},
  {key: 'leftSide', uploadLabel: 'Upload Left View Image', label: 'Left Side View'},
  {key: 'rightSide', uploadLabel: 'Upload Right View Image', label: 'Right Side View'},
];

const pickImage = onSelect => {
  ImageCropPicker.openPicker({width: 400, height: 400, cropping: false})
    .then(img =>
      onSelect({uri: img.path, mime: img.mime, name: img.filename ?? `img_${Date.now()}.jpg`}),
    )
    .catch(err => console.log('ImagePicker Error:', err));
};

const AddMonthlyMileage = ({route}) => {
  const orderId = route?.params?.orderId;
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.AuthReducer);

  const [mileage, setMileage] = useState('');
  const [mileageImage, setMileageImage] = useState(null);
  const [images, setImages] = useState({
    front: null,
    rear: null,
    leftSide: null,
    rightSide: null,
  });

  const handleSubmit = () => {
    if (!orderId) {
      return Toast.show(ToastError('Order ID is missing.'));
    }
    if (!mileage) {
      return Toast.show(ToastError('Please enter monthly mileage.'));
    }
    if (!mileageImage) {
      return Toast.show(ToastError('Please upload mileage/odometer image.'));
    }
    if (!images.front) {
      return Toast.show(ToastError('Please upload front view image.'));
    }
    if (!images.rear) {
      return Toast.show(ToastError('Please upload rear view image.'));
    }
    if (!images.leftSide) {
      return Toast.show(ToastError('Please upload left side view image.'));
    }
    if (!images.rightSide) {
      return Toast.show(ToastError('Please upload right side view image.'));
    }

    const formData = new FormData();
    formData.append('order_id', orderId);
    formData.append('monthly_mileage', mileage);

    formData.append('mileage_image', {
      uri: mileageImage.uri,
      name: mileageImage.name ?? `mileage_${Date.now()}.jpg`,
      type: mileageImage.mime ?? 'image/jpeg',
    });

    const viewMap = {
      front_view: images.front,
      rear_view: images.rear,
      left_view: images.leftSide,
      right_view: images.rightSide,
    };

    Object.entries(viewMap).forEach(([key, img]) => {
      formData.append(key, {
        uri: img.uri,
        name: img.name ?? `${key}_${Date.now()}.jpg`,
        type: img.mime ?? 'image/jpeg',
      });
    });

    dispatch(HomeMiddleware.SubmitMonthlyReport(user?.token, formData))
      .then(res => {
        console.log('SubmitMonthlyReport Success:', res);
        route?.params?.onSubmitted?.();
        NavigationService.goBack();
      })
      .catch(err => console.warn('SubmitMonthlyReport Error:', err));
  };

  return (
    <>
      <Header
        backIcon={true}
        title="Add Monthly Mileage"
        notificationIcon={false}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* Mileage input */}
        <TextField
          label="Mileage (km)"
          value={mileage}
          placeholder="Type here"
          onChangeText={setMileage}
          keyboardType="numeric"
        />

        {/* Mileage image picker */}
        {mileageImage ? (
          <View style={styles.mileageImageCard}>
            <Image
              source={{uri: mileageImage.uri}}
              style={styles.mileageImage}
              resizeMode="cover"
            />
            <TextComponent
              text="Mileage image"
              customStyles={styles.mileageImageLabel}
            />
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => setMileageImage(null)}>
              <Ionicons
                name="close-circle"
                size={Metrix.customFontSize(28)}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Button
            title="Upload mileage image"
            onPress={() => pickImage(setMileageImage)}
            isOutline
            buttonStyle={styles.uploadMileageBtn}
            preIcon={
              <Ionicons
                name="arrow-up-outline"
                size={Metrix.customFontSize(18)}
                color={Colors.primary}
                style={{marginRight: 6}}
              />
            }
          />
        )}

        {/* Position images grid */}
        <View style={styles.grid}>
          {POSITIONS.map(({key, uploadLabel, label}) => {
            const img = images[key];
            return img ? (
              <View key={key} style={styles.gridCardFilled}>
                <Image
                  source={{uri: img.uri}}
                  style={styles.gridImageFilled}
                  resizeMode="cover"
                />
                <TextComponent text={label} customStyles={styles.gridLabel} />
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() =>
                    setImages(prev => ({...prev, [key]: null}))
                  }>
                  <Ionicons
                    name="close-circle"
                    size={Metrix.customFontSize(28)}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                key={key}
                style={styles.gridCardEmpty}
                onPress={() =>
                  pickImage(selected =>
                    setImages(prev => ({...prev, [key]: selected})),
                  )
                }
                activeOpacity={0.7}>
                <Ionicons
                  name="arrow-up-outline"
                  size={Metrix.customFontSize(28)}
                  color={Colors.black}
                />
                <TextComponent
                  text={uploadLabel}
                  customStyles={styles.uploadLabel}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          title="Submit"
          onPress={handleSubmit}
          buttonStyle={styles.submitBtn}
        />
      </ScrollView>
    </>
  );
};

export default AddMonthlyMileage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: Metrix.HorizontalSize(16),
    paddingBottom: Metrix.VerticalSize(40),
  },
  uploadMileageBtn: {
    width: '100%',
    height: Metrix.VerticalSize(52),
    borderRadius: 10,
    marginTop: Metrix.VerticalSize(16),
    borderColor: Colors.primary,
  },
  mileageImageCard: {
    marginTop: Metrix.VerticalSize(16),
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  mileageImage: {
    width: '100%',
    height: Metrix.VerticalSize(220),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  mileageImageLabel: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(13),
    color: Colors.textColor,
    textAlign: 'center',
    paddingVertical: Metrix.VerticalSize(10),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Metrix.VerticalSize(20),
  },
  gridCardEmpty: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: Metrix.VerticalSize(16),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  gridCardFilled: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: Metrix.VerticalSize(16),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  gridImageFilled: {
    width: '100%',
    height: Metrix.VerticalSize(130),
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  gridLabel: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
    textAlign: 'center',
    paddingVertical: Metrix.VerticalSize(8),
  },
  uploadLabel: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.black,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(8),
  },
  removeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  submitBtn: {
    width: '100%',
    height: Metrix.VerticalSize(52),
    borderRadius: 10,
    marginTop: Metrix.VerticalSize(8),
  },
});
