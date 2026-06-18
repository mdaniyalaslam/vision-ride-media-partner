import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Images, Metrix, NavigationService} from '../../config';
import {
  Button,
  DropdownField,
  TextComponent,
  TextField,
} from '../../components';
import {
  emailValidityCheck,
  fonts,
  isPasswordAlphaNumeric,
  isPasswordLengthCorrect,
  numbersRegex,
  statesData,
  citiesData,
  ToastError,
  ToastSuccess,
} from '../../config/Constants';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useDispatch} from 'react-redux';
import {AuthMiddleware} from '../../redux/Middlewares';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaskInput from 'react-native-mask-input';

const SignUp = () => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);

  const isTrueString = str => !!str.match(/[a-zA-Z0-9]/);

  const registerUser = () => {
    if (!fullName) {
      return Toast.show(ToastError('Please enter your full name.'));
    }
    if (!isTrueString(fullName)) {
      return Toast.show(ToastError('Please enter a valid name.'));
    }
    if (!email) {
      return Toast.show(ToastError('Please input an email address.'));
    }
    if (!emailValidityCheck(email)) {
      return Toast.show(ToastError('Please enter a valid email address.'));
    }
    if (!contactNumber) {
      return Toast.show(ToastError('Please input your phone number.'));
    }
    if (!numbersRegex.test(contactNumber)) {
      return Toast.show(ToastError('Only numbers are allowed in phone number'));
    }
    if (!address) {
      return Toast.show(ToastError('Please enter your address.'));
    }
    if (!state) {
      return Toast.show(ToastError('Please select your state.'));
    }
    if (!city) {
      return Toast.show(ToastError('Please select your city.'));
    }
    if (!password) {
      return Toast.show(ToastError('Please input a password.'));
    }
    if (!isPasswordAlphaNumeric(password)) {
      return Toast.show(
        ToastError('Password must contain at least one letter and one number.'),
      );
    }
    if (!isPasswordLengthCorrect(password)) {
      return Toast.show(
        ToastError('Password must be at least 6 characters long.'),
      );
    }
    if (password !== confirmPassword) {
      return Toast.show(ToastError('Passwords do not match.'));
    }

    const payload = {
      full_name: fullName,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
      contact_number: contactNumber,
      occupation: occupation,
      address: address,
      city: city,
      state: state,
      postal_code: postalCode,
    };

    dispatch(AuthMiddleware.Register(payload))
      .then(data => {
        console.log('Register Success:', data);
        NavigationService.resetStack('UserStack');
      })
      .catch(err => console.warn('Register Error:', err));
  };

  return (
    <ScrollView
      bounces={false}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={{
        paddingHorizontal: Metrix.HorizontalSize(20),
        marginTop: Metrix.VerticalSize(50),
        backgroundColor: Colors.white,
      }}>
      <Image source={Images.logo} resizeMode="contain" style={styles.logo} />
      <View style={{alignItems: 'center'}}>
        <TextComponent
          text={'Signup as Mobility Partner'}
          customStyles={styles.title}
        />
        <TextComponent
          text="Fill in your details to begin"
          customStyles={styles.subTitle}
        />
      </View>

      <View style={{marginTop: Metrix.VerticalSize(10)}}>
        <TextField
          label="Full Name*"
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
        <TextField
          label="Occupation*"
          value={occupation}
          onChangeText={text => setOccupation(text)}
        />
        <TextField
          label="Email*"
          value={email}
          onChangeText={text => setEmail(text.toLowerCase())}
          keyboardType="email-address"
        />

        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <Text style={styles.labelText}> Contact Number* </Text>
          <MaskInput
            value={contactNumber}
            keyboardType="number-pad"
            style={styles.maskInput}
            placeholderTextColor={Colors.textColor}
            onChangeText={masked => setContactNumber(masked)}
            mask={[
              '(',
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
              /\d/,
              /\d/,
            ]}
          />
        </View>

        <TextField
          label="Address*"
          multiline
          inputContainerStyle={{height: 100}}
          value={address}
          onChangeText={text => setAddress(text)}
        />

        <DropdownField
          isSearch
          label="State*"
          placeholder={state || 'Select State'}
          updateValue={obj => setState(obj?.name ?? obj)}
          modalTitle="Select State"
          data={statesData}
        />
        <DropdownField
          isSearch
          label="City*"
          placeholder={city || 'Select City'}
          updateValue={obj => setCity(obj?.name ?? obj)}
          modalTitle="Select City"
          data={citiesData}
        />

        <TextField
          label="Postal Code"
          value={postalCode}
          onChangeText={text => setPostalCode(text)}
          keyboardType="number-pad"
        />

        <TextField
          label="Password*"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={!seePassword}
          rightIcon={
            <TouchableOpacity onPress={() => setSeePassword(p => !p)}>
              <Ionicons
                name={seePassword ? 'eye-outline' : 'eye-off-outline'}
                color={Colors.darkGray}
                size={Metrix.customFontSize(20)}
              />
            </TouchableOpacity>
          }
        />
        <TextField
          label="Confirm Password*"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={!seeConfirmPassword}
          rightIcon={
            <TouchableOpacity onPress={() => setSeeConfirmPassword(p => !p)}>
              <Ionicons
                name={seeConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                color={Colors.darkGray}
                size={Metrix.customFontSize(20)}
              />
            </TouchableOpacity>
          }
        />
      </View>

      <View style={{marginVertical: Metrix.VerticalSize(20)}}>
        <Button title={'Signup'} onPress={registerUser} />
      </View>

      <View style={styles.linkContainer}>
        <TextComponent
          text="Already have an account? "
          customStyles={{textAlign: 'center', color: Colors.textColor}}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => NavigationService.goBack()}>
          <TextComponent text="Sign In" customStyles={{color: Colors.primary}} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  logo: {
    height: Metrix.VerticalSize(110),
    width: Metrix.VerticalSize(186),
    alignSelf: 'center',
  },
  title: {
    width: '100%',
    fontSize: Metrix.customFontSize(30),
    fontFamily: fonts.Bold,
    color: Colors.primary,
    textAlign: 'center',
    paddingTop: 10,
  },
  subTitle: {
    width: '100%',
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(14),
    color: Colors.textColor,
    textAlign: 'center',
    marginTop: 10,
  },
  labelText: {
    fontFamily: fonts.Medium,
    fontSize: Metrix.customFontSize(11),
    color: Colors.labelColor,
    marginTop: 12,
  },
  maskInput: {
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
  },
  linkContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: Metrix.VerticalSize(40),
  },
});
