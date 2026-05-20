import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { Colors, Metrix, NavigationService } from '../../config';
import {
  Button,
  Header,
  ImageSwiperComponent,
  TextComponent,
  TextField,
} from '../../components';
import { fonts, priceFormatter, ToastSuccess } from '../../config/Constants';
import CountDown from 'react-native-countdown-fixed';
import RenderHTML from 'react-native-render-html';
import moment from 'moment';
import { SQIPCore, SQIPCardEntry } from 'react-native-square-in-app-payments';
import { SQUARE_APP_ID } from '../../config/ApiCaller';
import { HomeMiddleware } from '../../redux/Middlewares';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const AuctionDetails = ({ route }) => {
  const dispatch = useDispatch();
  const { auctionId, details } = route.params;
  const { user } = useSelector(state => state.AuthReducer);
  const auctionDetails = details?.auction || {};
  const MINIMUMPRICE =
    parseFloat(auctionDetails.current_price) +
    parseFloat(auctionDetails.bid_increment);

  console.log('AUCTION DETAILS', auctionDetails);
  const endDate = new Date(auctionDetails.end_date);
  const secondsLeft = Math.floor((endDate - new Date()) / 1000);

  const [bidPrice, setBidPrice] = React.useState(MINIMUMPRICE.toString());

  useEffect(() => {
    // Initialize the SDK once when the component mounts
    const initSquare = async () => {
      await SQIPCore.setSquareApplicationId(SQUARE_APP_ID);
    };
    initSquare();
  }, []);
  const addCard = nonce => {
    let body = {
      card_nonce: nonce,
      cardholder_name: user?.first_name + ' ' + user?.last_name,
      address_line_1: '',
      postal_code: '',
      country: '',
    };
    dispatch(HomeMiddleware.AddCard(user?.token, body)).then(res => {
      console.log('add card res::', res);
      if (res?.statusCode === 200) {
        placeBid();
      } else {
        Alert.alert('Error', 'Failed to add card. Please try again.');
      }
    });
  };
  const onCardNonceRequestSuccess = useCallback(async cardDetails => {
    try {
      // 1. Send cardDetails.nonce to your backend server to process the payment
      // Example: await myBackend.processPayment(cardDetails.nonce);

      console.log('Nonce received:', cardDetails);

      // 2. If backend payment succeeds, close the card entry form
      await SQIPCardEntry.completeCardEntry(() => {
        // Alert.alert('Success', 'Payment processed successfully!');
        addCard(cardDetails.nonce);
      });
    } catch (error) {
      // 3. If payment fails, show error in the Square form so user can try again
      await SQIPCardEntry.showCardNonceProcessingError(error.message);
    }
  }, []);

  const onCardEntryCancel = useCallback(() => {
    console.log('User cancelled the payment flow');
  }, []);

  const startPaymentFlow = async () => {
    const cardEntryConfig = {
      collectPostalCode: false, // Recommended for security
    };

    // Optional: Customize iOS appearance if needed
    // if (Platform.OS === 'ios') {
    //   await SQIPCardEntry.setIOSCardEntryTheme({
    //     saveButtonTitle: 'Pay Now',
    //     keyboardAppearance: 'Light',
    //   });
    // }

    // Launch the native Square card entry form
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      onCardNonceRequestSuccess,
      onCardEntryCancel,
    );
  };

  const placeBid = () => {
    let payload = {
      product_id: auctionId,
      bid_amount: bidPrice,
    };
    dispatch(HomeMiddleware.PlaceBid(payload, user?.token)).then(res => {
      console.log('place bid res::', res);
      if (res?.statusCode === 201) {
        Alert.alert('Payment Method Required', res?.message, [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Add Payment Method',
            onPress: () => startPaymentFlow(),
          },
        ]);
      } else {
        Toast.show(ToastSuccess('Your bid has been placed successfully!'));
        NavigationService.resetStack('UserStack');
      }
    });
  };

  return (
    <>
      <Header backIcon={true} title={'Details'} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 35 }}
      >
        <ImageSwiperComponent data={auctionDetails.images || []} />
        <TextComponent
          customStyles={{ color: Colors.primary, paddingTop: 10, fontSize: 16 }}
          isTitle
          text={auctionDetails.title || 'N/A'}
        />
        {/* <TextComponent
          text="Aptent tacit sociosq litor torquen per conubia nostra, per incep placerat felis non aliquam.Mauris nec justo vitae ante auctor."
          customStyles={{ marginTop: 10 }}
        /> */}
        <RenderHTML
          contentWidth={Metrix.screenWidth - 20}
          source={{ html: auctionDetails.description || 'N/A' }}
          baseStyle={{
            fontFamily: fonts.Regular,
            fontSize: 12,
            color: Colors.textColor,
            marginTop: 10,
          }}
        />

        {auctionDetails?.current_invoice?.payment_status == 'paid' ? (
          <Button
            buttonStyle={{ marginTop: 20 }}
            title={'View Order'}
            onPress={() =>
              NavigationService.navigate('OrderDetails', {
                item: {
                  ...auctionDetails?.current_invoice,
                  product: auctionDetails,
                },
              })
            }
          />
        ) : auctionDetails?.current_invoice?.payment_status == 'pending' ? (
          <Button
            buttonStyle={{ marginTop: 20 }}
            title={'View Invoice'}
            onPress={() => NavigationService.navigate('Invoices')}
          />
        ) : (
          <>
            <TextComponent
              text="Current Bid at:"
              customStyles={{ marginTop: 24, marginBottom: 6 }}
            />
            <TextComponent
              text={priceFormatter(auctionDetails.current_price) || 'N/A'}
              isSubTitle
              customStyles={{
                color: Colors.primary,
                fontSize: 18,
              }}
            />
            <TextComponent
              text="Auction will be end:"
              customStyles={{ marginTop: 20, marginBottom: 6 }}
            />
            <View
              style={{
                backgroundColor: Colors.primaryLight,
                height: 60,
                borderRadius: 20,
                justifyContent: 'center',
              }}
            >
              <CountDown
                until={secondsLeft > 0 ? secondsLeft : 0}
                // onFinish={() => alert('finished')}
                // onPress={() => alert('hello')}
                size={14}
                digitStyle={{
                  backgroundColor: '#FFF',
                }}
                digitTxtStyle={{ color: Colors.primary }}
                timeLabelStyle={{
                  color: Colors.grayText,
                  fontWeight: 'bold',
                }}
                timeLabels={{ d: 'Day', h: 'Hour', m: 'Mint', s: 'Sec' }}
                showSeparator
                separatorStyle={{ color: Colors.primary, marginTop: -16 }}
              />
            </View>
            <TextComponent
              text={`Ending on: ${
                moment(auctionDetails.end_date).format(
                  'MMMM DD YYYY, h:mm a',
                ) || 'N/A'
              }`}
              customStyles={{ marginTop: 10, marginBottom: 6 }}
            />
            <TextField
              keyboardType={'decimal-pad'}
              label={`Your Max Bid: (Minimum: ${priceFormatter(MINIMUMPRICE)})`}
              value={bidPrice}
              onChangeText={text => setBidPrice(text)}
            />
            <View style={{ marginVertical: 25 }}>
              <Button
                title={
                  route?.params?.comingFrom == 'home'
                    ? 'Update Bid'
                    : 'Place Bid'
                }
                onPress={placeBid}
              />
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default AuctionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(16),
    marginTop: Metrix.VerticalSize(40),

    color: Colors.primary,
  },
  description: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
    marginTop: Metrix.VerticalSize(13),
  },
});
