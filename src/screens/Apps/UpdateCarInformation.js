import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Colors, Metrix, NavigationService} from '../../config';
import {fonts, ToastError} from '../../config/Constants';
import {Button, DropdownField, Header, TextField} from '../../components';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {HomeMiddleware} from '../../redux/Middlewares';

const UpdateCarInformation = ({route}) => {
  const vehicle = route?.params?.vehicle ?? {};
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.AuthReducer);

  const initialType = vehicle?.type ?? null;
  const initialYear = vehicle?.year ?? null;

  const [make, setMake] = useState(vehicle?.make ?? '');
  const [model, setModel] = useState(vehicle?.model ?? '');
  const [modelCode, setModelCode] = useState(
    vehicle?.modelCode ?? vehicle?.model_code ?? '',
  );
  const [type, setType] = useState(initialType ? {name: initialType} : null);
  const [year, setYear] = useState(
    initialYear ? {name: String(initialYear)} : null,
  );
  const [registrationNum, setRegistrationNum] = useState(
    vehicle?.regNumber ?? vehicle?.registration_number ?? '',
  );
  const [vinNumber, setVinNumber] = useState(vehicle?.vin ?? '');
  const [mileage, setMileage] = useState(
    String(vehicle?.mileage ?? vehicle?.avg_monthly_mileage ?? ''),
  );

  const handleSubmit = () => {
    if (!vehicle?.id) return Toast.show(ToastError('Vehicle ID is missing.'));
    if (!make) return Toast.show(ToastError('Please enter vehicle make.'));
    if (!model) return Toast.show(ToastError('Please enter vehicle model.'));
    if (!type) return Toast.show(ToastError('Please select vehicle type.'));
    if (!year) return Toast.show(ToastError('Please select vehicle year.'));
    if (!registrationNum)
      return Toast.show(ToastError('Please enter registration number.'));
    if (!vinNumber) return Toast.show(ToastError('Please enter VIN number.'));
    if (!mileage)
      return Toast.show(ToastError('Please enter average monthly mileage.'));

    const body = {
      make,
      model,
      modelCode,
      type: type?.name ?? type,
      year: Number(year?.name ?? year),
      regNumber: registrationNum,
      vin: vinNumber,
      mileage: Number(mileage),
    };

    dispatch(HomeMiddleware.UpdateVehicle(user?.token, vehicle?.id, body))
      .then(res => {
        console.log('UpdateVehicle Success:', res);
        NavigationService.goBack();
      })
      .catch(err => console.warn('UpdateVehicle Error:', err));
  };

  return (
    <>
      <Header
        backIcon={true}
        title="Update Vehicle Information"
        notificationIcon={false}
      />
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        <View style={styles.formContainer}>
          <Text style={styles.note}>
            Changes are submitted for admin approval before they take effect.
          </Text>

          {/* Row 1: Make | Model */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <TextField
                label="Make"
                value={make}
                placeholder="e.g., Toyota"
                onChangeText={setMake}
              />
            </View>
            <View style={styles.halfField}>
              <TextField
                label="Model"
                value={model}
                placeholder="e.g., Corolla"
                onChangeText={setModel}
              />
            </View>
          </View>

          {/* Row 2: Model Code | Type */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <TextField
                label="Model Code"
                value={modelCode}
                placeholder="e.g., TCR-2025"
                onChangeText={setModelCode}
              />
            </View>
            <View style={styles.halfField}>
              <DropdownField
                label="Type"
                placeholder={type ? type.name : 'Select Type'}
                updateValue={obj => setType(obj)}
                modalTitle="Select Type"
                data={[
                  {name: 'Sedan'},
                  {name: 'SUV'},
                  {name: 'Truck'},
                  {name: 'Hatchback'},
                  {name: 'Other'},
                ]}
              />
            </View>
          </View>

          {/* Row 3: Year | Registration Number */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <DropdownField
                label="Year"
                placeholder={year ? year.name : 'Select Year'}
                updateValue={obj => setYear(obj)}
                modalTitle="Select Year"
                data={Array.from({length: 36}, (_, i) => ({
                  name: String(2025 - i),
                }))}
              />
            </View>
            <View style={styles.halfField}>
              <TextField
                label="Registration Number"
                value={registrationNum}
                placeholder="e.g., ABC-321"
                onChangeText={setRegistrationNum}
              />
            </View>
          </View>

          {/* VIN Number */}
          <TextField
            label="VIN Number"
            value={vinNumber}
            placeholder="e.g., 1HGBH41JXMN109186"
            onChangeText={setVinNumber}
            maxLength={17}
          />

          {/* Mileage */}
          <TextField
            label="Avg Monthly Mileage (mi)"
            value={mileage}
            placeholder="e.g., 1500"
            onChangeText={setMileage}
            keyboardType="numeric"
          />

          <View style={{height: Metrix.VerticalSize(30)}} />
          <Button title="Update Vehicle" onPress={handleSubmit} />
          <View style={{height: Metrix.VerticalSize(30)}} />
        </View>
      </ScrollView>
    </>
  );
};

export default UpdateCarInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  formContainer: {
    marginHorizontal: Metrix.HorizontalSize(20),
    marginTop: Metrix.VerticalSize(10),
  },
  note: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.grayText,
    marginBottom: Metrix.VerticalSize(6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    width: '48%',
  },
});
