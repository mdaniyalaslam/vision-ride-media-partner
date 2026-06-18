import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors, Metrix} from '../../config';
import {Button, DropdownField, Header, TextComponent} from '../../components';
import {fonts, ToastError} from '../../config/Constants';
import {imageBaseUrl} from '../../config/ApiCaller';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {HomeMiddleware} from '../../redux/Middlewares';

const IMAGE_TYPES = [
  {name: 'Front'},
  {name: 'Rear'},
  {name: 'Left'},
  {name: 'Right'},
  {name: 'Mileage'},
  {name: 'Top'},
  {name: 'General'},
];

const pickImage = onSelect => {
  ImageCropPicker.openPicker({width: 600, height: 600, cropping: false})
    .then(img =>
      onSelect({
        uri: img.path,
        mime: img.mime,
        name: img.filename ?? `img_${Date.now()}.jpg`,
      }),
    )
    .catch(err => console.log('ImagePicker Error:', err));
};

// Normalize a GetVehicleImages response item to {id, type, uri}
const normalizeImage = it => {
  if (!it) return null;
  const id = it?.id ?? it?.image_id;
  const type = it?.image_type ?? it?.type ?? '';
  const path =
    it?.image_url ?? it?.image_path ?? it?.path ?? it?.image ?? it?.url;
  if (!id || !path) return null;
  const uri = /^https?:\/\//i.test(path) ? path : imageBaseUrl + path;
  return {id, type, uri};
};

const formatType = t =>
  t
    ? String(t)
        .replace(/[_-]+/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
    : 'Image';

const UpdateCarImages = ({route}) => {
  const vehicle = route?.params?.vehicle ?? {};
  const vehicleId = vehicle?.id;
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.AuthReducer);

  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newType, setNewType] = useState(null);

  const loadImages = useCallback(() => {
    if (!vehicleId) return;
    dispatch(HomeMiddleware.GetVehicleImages(user?.token, vehicleId))
      .then(res => {
        const raw = res?.data;
        const arr = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.images)
          ? raw.images
          : [];
        setImages(arr.map(normalizeImage).filter(Boolean));
      })
      .catch(err => console.warn('GetVehicleImages Error:', err));
  }, [vehicleId, user?.token]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleReplace = image => {
    pickImage(selected => {
      const formData = new FormData();
      formData.append('image', {
        uri: selected.uri,
        name: selected.name ?? `image_${Date.now()}.jpg`,
        type: selected.mime ?? 'image/jpeg',
      });
      if (image.type) formData.append('image_type', image.type);

      dispatch(
        HomeMiddleware.UpdateVehicleImage(
          user?.token,
          vehicleId,
          image.id,
          formData,
        ),
      )
        .then(() => loadImages())
        .catch(err => console.warn('UpdateVehicleImage Error:', err));
    });
  };

  const handleDelete = image => {
    Alert.alert('Delete Image', 'Are you sure you want to delete this image?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(
            HomeMiddleware.DeleteVehicleImage(user?.token, vehicleId, image.id),
          )
            .then(() => loadImages())
            .catch(err => console.warn('DeleteVehicleImage Error:', err));
        },
      },
    ]);
  };

  const handleUploadNew = () => {
    if (!newImage) return Toast.show(ToastError('Please select an image.'));
    if (!newType) return Toast.show(ToastError('Please select an image type.'));

    const formData = new FormData();
    formData.append('images[]', {
      uri: newImage.uri,
      name: newImage.name ?? `image_${Date.now()}.jpg`,
      type: newImage.mime ?? 'image/jpeg',
    });
    formData.append('image_type', newType.name.toLowerCase());

    dispatch(
      HomeMiddleware.UploadVehicleImages(user?.token, vehicleId, formData),
    )
      .then(() => {
        setNewImage(null);
        setNewType(null);
        loadImages();
      })
      .catch(err => console.warn('UploadVehicleImages Error:', err));
  };

  return (
    <>
      <Header
        backIcon={true}
        title="Update Vehicle Images"
        notificationIcon={false}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <TextComponent text="Current Images" customStyles={styles.sectionTitle} />

        {images.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons
              name="images-outline"
              size={Metrix.customFontSize(36)}
              color={Colors.grayText}
            />
            <TextComponent
              text="No images yet. Add one below."
              customStyles={styles.emptyText}
            />
          </View>
        ) : (
          <View style={styles.grid}>
            {images.map(image => (
              <View key={String(image.id)} style={styles.card}>
                <Image
                  source={{uri: image.uri}}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <TextComponent
                  text={formatType(image.type)}
                  customStyles={styles.cardLabel}
                />
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleReplace(image)}>
                    <Ionicons
                      name="swap-horizontal"
                      size={Metrix.customFontSize(18)}
                      color={Colors.primary}
                    />
                    <TextComponent
                      text="Replace"
                      customStyles={styles.actionText}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleDelete(image)}>
                    <Ionicons
                      name="trash-outline"
                      size={Metrix.customFontSize(18)}
                      color={Colors.redDark}
                    />
                    <TextComponent
                      text="Delete"
                      customStyles={{...styles.actionText, color: Colors.redDark}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <TextComponent
          text="Add New Image"
          customStyles={{
            ...styles.sectionTitle,
            marginTop: Metrix.VerticalSize(24),
          }}
        />

        {newImage ? (
          <View style={styles.newPreviewCard}>
            <Image
              source={{uri: newImage.uri}}
              style={styles.newPreviewImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => setNewImage(null)}>
              <Ionicons
                name="close-circle"
                size={Metrix.customFontSize(28)}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Button
            title="Choose Image"
            onPress={() => pickImage(setNewImage)}
            isOutline
            buttonStyle={styles.chooseBtn}
            preIcon={
              <Ionicons
                name="cloud-upload-outline"
                size={Metrix.customFontSize(18)}
                color={Colors.primary}
                style={{marginRight: 6}}
              />
            }
          />
        )}

        <DropdownField
          label="Image Type"
          placeholder={newType ? newType.name : 'Select Type'}
          updateValue={obj => setNewType(obj)}
          modalTitle="Select Image Type"
          data={IMAGE_TYPES}
        />

        <Button
          title="Upload Image"
          onPress={handleUploadNew}
          buttonStyle={styles.uploadBtn}
        />
      </ScrollView>
    </>
  );
};

export default UpdateCarImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: Metrix.HorizontalSize(16),
    paddingBottom: Metrix.VerticalSize(40),
  },
  sectionTitle: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(16),
    color: Colors.primary,
    marginBottom: Metrix.VerticalSize(12),
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrix.VerticalSize(30),
  },
  emptyText: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(13),
    color: Colors.grayText,
    marginTop: Metrix.VerticalSize(8),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 14,
    marginBottom: Metrix.VerticalSize(16),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 12,
  },
  cardImage: {
    width: '100%',
    height: Metrix.VerticalSize(120),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  cardLabel: {
    fontFamily: fonts.SemiBold,
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
    textAlign: 'center',
    paddingVertical: Metrix.VerticalSize(6),
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.backgroundGray,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrix.VerticalSize(8),
    gap: 4,
  },
  actionText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(11),
    color: Colors.primary,
  },
  newPreviewCard: {
    borderRadius: 12,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    marginBottom: Metrix.VerticalSize(6),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  newPreviewImage: {
    width: '100%',
    height: Metrix.VerticalSize(200),
  },
  removeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  chooseBtn: {
    width: '100%',
    height: Metrix.VerticalSize(52),
    borderRadius: 10,
    borderColor: Colors.primary,
  },
  uploadBtn: {
    width: '100%',
    height: Metrix.VerticalSize(52),
    borderRadius: 10,
    marginTop: Metrix.VerticalSize(16),
  },
});
