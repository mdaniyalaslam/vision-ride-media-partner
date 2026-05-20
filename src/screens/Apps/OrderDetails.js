import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  Share,
  Image,
} from 'react-native';
import React from 'react';
import { Colors, Metrix, NavigationService } from '../../config';
import TextComponent from '../../components/TextComponent';
import Button from '../../components/Button';

import Tag from '../../components/Tag';
import { priceFormatter } from '../../config/Constants';
import { HomeMiddleware } from '../../redux/Middlewares';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import RNBlobUtil from 'react-native-blob-util';
import { Header } from '../../components';
import { imageBaseUrl } from '../../config/ApiCaller';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import Share from 'react-native-share';

const formatDate = dateString => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatAmount = amount => {
  return priceFormatter(amount);
};

const OrderDetails = ({ route }) => {
  const { item } = route?.params;
  console.log('item', item);

  const { user } = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const downloadPDF = async base64PDF => {
    try {
      // Define file path based on the platform
      const filePath =
        Platform.OS === 'android'
          ? `${RNBlobUtil.fs.dirs.DownloadDir}/AuctionInvoice.pdf`
          : `${RNBlobUtil.fs.dirs.DocumentDir}/AuctionInvoice.pdf`;

      // Write the Base64 string to a file
      await RNBlobUtil.fs.writeFile(filePath, base64PDF, 'base64');

      if (Platform.OS === 'android') {
        // For Android, open the file directly
        await RNBlobUtil.android.actionViewIntent(filePath, 'application/pdf');
        Alert.alert('Success', 'PDF saved to Downloads folder.');
      } else {
        // For iOS, show the save-to-file bottom sheet
        await Share.share({
          url: `file://${filePath}`,
          title: 'Save PDF',
        });
      }
    } catch (error) {
      console.error('Error downloading the PDF:', error);
      Alert.alert('Error', 'Failed to download the PDF.');
    }
  };

  const downloadInvoice = () => {
    dispatch(
      HomeMiddleware.DownloadInvoice(user?.token, item?.invoice_id || item?.id),
    )
      .then(res => {
        console.log('DOWNLOAD RES', res);
        if (res?.data?.pdf_base64) {
          downloadPDF(res?.data?.pdf_base64);
        } else {
          Alert.alert('Error', 'Invalid PDF data received.');
        }
      })
      .catch(error => {
        console.error('Error downloading invoice:', error);
        Alert.alert('Error', 'Failed to download the invoice.');
      });
  };

  const processPayment = () => {
    dispatch(HomeMiddleware.ProcessPayment(user?.token, item?.id)).then(res => {
      console.log('PAY NOW RES', res);
      Toast.show(Toast.success('Payment processed successfully!'));
      NavigationService.resetStack('UserStack');
    });
  };
  return (
    <>
      <Header title={'Order Details'} />
      <Image
        source={{ uri: imageBaseUrl + item?.product?.thumbnail }}
        style={styles.itemImage}
      />
      <TextComponent
        text="Order Information"
        customStyles={styles.title}
        isSubTitle
      />
      <View style={styles.card}>
        {/* Status Tag */}
        <View style={styles.tagContainer}>
          <Tag
            text={
              item?.status?.toUpperCase() ||
              item?.payment_status?.toUpperCase() ||
              'N/A'
            }
            id={
              item?.payment_status == 'pending' ||
              item?.payment_status == 'unpaid'
                ? 1
                : item?.payment_status == 'paid'
                ? 2
                : 3
            }
          />
        </View>

        <View style={styles.row}>
          <TextComponent
            text="Order# "
            customStyles={styles.label}
            isSubTitle
          />
          <TextComponent text={item?.invoice_number || item?.order_number} />
        </View>

        <View style={styles.row}>
          <TextComponent text="Item: " customStyles={styles.label} isSubTitle />
          <TextComponent
            customStyles={{
              width: Metrix.HorizontalSize(140),
            }}
            text={item?.product?.title + item?.product?.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          />
        </View>

        <View style={styles.row}>
          <TextComponent
            text="Order Date:"
            customStyles={styles.label}
            isSubTitle
          />
          <TextComponent text={formatDate(item?.created_at)} />
        </View>
        <View style={styles.row}>
          <TextComponent
            text="Payment Method:"
            customStyles={styles.label}
            isSubTitle
          />
          <TextComponent text={item?.payment_method} />
        </View>
        <View style={styles.row}>
          <TextComponent
            text="Transaction ID:"
            customStyles={styles.label}
            isSubTitle
          />
          <TextComponent text={item?.transaction_id} />
        </View>
        <View
          style={{
            backgroundColor: Colors.primaryLight,
            padding: 4,
          }}
        >
          <View style={{ ...styles.rowSpaceBetween, marginTop: 10 }}>
            <TextComponent
              text="Winning Bid: "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent isSubTitle text={formatAmount(item?.amount)} />
          </View>
          <View style={styles.rowSpaceBetween}>
            <TextComponent
              text="Tax: "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent isSubTitle text={formatAmount(item?.tax)} />
          </View>

          <View style={styles.rowSpaceBetween}>
            <TextComponent
              text="Total Amount: "
              customStyles={styles.label}
              isSubTitle
            />
            <TextComponent isSubTitle text={formatAmount(item?.total_amount)} />
          </View>
        </View>
      </View>
      <TextComponent
        text="Order Timeline"
        customStyles={styles.title}
        isSubTitle
      />
      <View style={styles.card}>
        <View style={{ ...styles.row }}>
          <Ionicons name="radio-button-on" size={20} color={Colors.primary} />
          <View style={{ marginLeft: 10 }}>
            <TextComponent
              isSubTitle
              text={'Order Placed'}
              customStyles={{ marginBottom: 5 }}
            />
            <TextComponent text={formatDate(item?.created_at)} />
          </View>
        </View>
        <View
          style={{
            height: 40,
            width: 0.5,
            backgroundColor: Colors.black,
            marginLeft: 10,
            marginTop: -5,
          }}
        />
        <View style={{ ...styles.row }}>
          <Ionicons name="radio-button-on" size={20} color={Colors.primary} />
          <View style={{ marginLeft: 10 }}>
            <TextComponent
              isSubTitle
              text={'Payment Received'}
              customStyles={{ marginBottom: 5 }}
            />
            <TextComponent text={formatDate(item?.created_at)} />
          </View>
        </View>
      </View>
      <Button
        title="Download Invoice"
        buttonStyle={{ margin: 6 }}
        onPress={downloadInvoice}
      />
    </>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 8,
    padding: 10,
    borderColor: Colors.primary,
    borderWidth: 0.5,
    backgroundColor: Colors.white,
  },
  tagContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'center',
  },
  label: {
    width: Metrix.HorizontalSize(100),
  },
  title: { margin: 5, color: Colors.primary, fontSize: 14 },

  itemImage: {
    width: '98%',
    height: Metrix.VerticalSize(200),
    borderRadius: 20,
    margin: 5,
  },
});
