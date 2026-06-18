import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Colors, Metrix} from '../../config';
import {Button, Header, TextField} from '../../components';
import {fonts, ToastError, ToastSuccess} from '../../config/Constants';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {AuthMiddleware} from '../../redux/Middlewares';

const BankAccounts = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.AuthReducer);

  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAddress, setBankAddress] = useState('');

  const handleSave = () => {
    if (!accountName.trim()) {
      return Toast.show(ToastError('Please enter account holder name.'));
    }
    if (!accountNumber.trim()) {
      return Toast.show(ToastError('Please enter account number.'));
    }
    if (!routingNumber.trim()) {
      return Toast.show(ToastError('Please enter routing number.'));
    }
    if (!bankName.trim()) {
      return Toast.show(ToastError('Please enter bank name.'));
    }

    const body = {
      account_name: accountName,
      account_number: accountNumber,
      routing_number: routingNumber,
      bank_name: bankName,
      bank_address: bankAddress,
    };

    dispatch(AuthMiddleware.UpdateBankDetails(user?.token, body))
      .then(res => {
        console.log('UpdateBankDetails Success:', res);
        Toast.show(ToastSuccess('Bank details saved successfully.'));
      })
      .catch(err => console.warn('UpdateBankDetails Error:', err));
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header title={'Bank Account'} />

      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <Text style={styles.sectionDesc}>
          Add your bank account details to receive payments from campaigns.
        </Text>

        <TextField
          label="Account Holder Name*"
          value={accountName}
          onChangeText={setAccountName}
          placeholder="e.g., John Smith"
        />
        <TextField
          label="Account Number*"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="number-pad"
          placeholder="e.g., 1234567890"
        />
        <TextField
          label="Routing Number*"
          value={routingNumber}
          onChangeText={setRoutingNumber}
          keyboardType="number-pad"
          placeholder="e.g., 021000021"
        />
        <TextField
          label="Bank Name*"
          value={bankName}
          onChangeText={setBankName}
          placeholder="e.g., Chase Bank"
        />
        <TextField
          label="Bank Address"
          value={bankAddress}
          onChangeText={setBankAddress}
          placeholder="e.g., 123 Bank St, New York, NY"
          multiline
          inputContainerStyle={{height: 80}}
        />

        <Button
          title="Save Bank Details"
          onPress={handleSave}
          buttonStyle={{marginTop: Metrix.VerticalSize(20), marginBottom: 40}}
        />
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
  form: {
    paddingHorizontal: Metrix.HorizontalSize(20),
    paddingTop: Metrix.VerticalSize(10),
  },
  sectionTitle: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(18),
    color: Colors.primary,
    marginTop: Metrix.VerticalSize(10),
  },
  sectionDesc: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(13),
    color: Colors.textColor,
    marginTop: Metrix.VerticalSize(6),
    marginBottom: Metrix.VerticalSize(10),
  },
});
