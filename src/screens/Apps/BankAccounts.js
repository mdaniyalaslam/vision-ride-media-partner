import { Alert, View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Colors, Metrix } from '../../config';
import {
  BankAccountCard,
  Button,
  Header,
  TextComponent,
} from '../../components';
import { fonts } from '../../config/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { HomeMiddleware } from '../../redux/Middlewares';
import { SQIPCore, SQIPCardEntry } from 'react-native-square-in-app-payments';
import { SQUARE_APP_ID } from '../../config/ApiCaller';

const BankAccounts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.AuthReducer);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts();
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
        getAccounts();
      } else {
        Alert.alert('Error', 'Failed to add card. Please try again.');
      }
    });
  };
  const onCardNonceRequestSuccess = useCallback(async cardDetails => {
    try {
      console.log('Nonce received:', cardDetails);
      await SQIPCardEntry.completeCardEntry(() => {
        addCard(cardDetails.nonce);
      });
    } catch (error) {
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

    // Launch the native Square card entry form
    await SQIPCardEntry.startCardEntryFlow(
      cardEntryConfig,
      onCardNonceRequestSuccess,
      onCardEntryCancel,
    );
  };

  const getAccounts = () => {
    dispatch(HomeMiddleware.GetBankAccounts(user?.token)).then(res => {
      console.log('ACCOUNTS', res);
      setAccounts(res?.data);
    });
  };

  const handleSetDefault = id => {
    // return;
    setAccounts(prev =>
      prev.map(account => ({
        ...account,
        is_default: account.id === id,
      })),
    );
    dispatch(HomeMiddleware.SetDefaultCard(user?.token, id)).then(res => {
      console.log('Set default card response:', res);
    });
  };

  const handleUpdate = id => {
    const account = accounts.find(item => item.id === id);
    Alert.alert('Update Bank Account', `Edit details for ${account?.last_4}`);
  };

  const handleDelete = id => {
    // const account = accounts.find(item => item.id === id);
    Alert.alert('Delete Payment Method', `Are you sure you want to delete ?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          // setAccounts(prev => prev.filter(account => account.id !== id)),
          dispatch(HomeMiddleware.DeleteCard(user?.token, id)).then(res => {
            console.log('Delete card response:', res);
            setAccounts(prev => prev.filter(account => account.id !== id));
            getAccounts();
          }),
      },
    ]);
  };

  const handleMenuPress = account => {
    Alert.alert('Actions', 'Choose an option', [
      { text: 'Update', onPress: () => handleUpdate(account.id) },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => handleDelete(account.id),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View>
        <Header title={'Payment Methods'} />
        {accounts.length === 0 ? (
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <TextComponent text="No payment methods available." isSubTitle />
          </View>
        ) : (
          accounts.map(account => (
            <BankAccountCard
              key={account.id}
              account={account}
              onSetDefault={() => handleSetDefault(account.id)}
              onPressDelete={() => handleDelete(account?.id)}
            />
          ))
        )}
        {accounts.length < 2 && (
          <Button
            onPress={startPaymentFlow}
            buttonStyle={{ margin: 10 }}
            title="Add Payment Method"
          />
        )}
      </View>
    </ScrollView>
  );
};

export default BankAccounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
