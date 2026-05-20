import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Images, Metrix } from '../../config';
import { fonts } from '../../config/Constants';
import {
  Button,
  Header,
  HeroHeader,
  OrderInvoiceComponent,
  Tag,
  TextComponent,
} from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HomeMiddleware } from '../../redux/Middlewares';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Orders = ({}) => {
  const { user } = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const [buttonSelect, setButtonSelect] = useState('all'); // all
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getOrders();
    });
  }, [buttonSelect]);

  const getOrders = () => {
    dispatch(HomeMiddleware.GetOrders(user?.token, buttonSelect)).then(res => {
      console.log('ORDERS RES', res);
      setOrders(res?.data ?? []);
    });
  };

  return (
    <View style={styles.container}>
      <Header title={'Orders'} isBack={false} />
      {/* tabs */}
      <View style={{ ...styles.row }}>
        <Button
          title={'All '}
          onPress={() => setButtonSelect('all')}
          buttonStyle={{
            height: 38,
            width: '18%',
            marginHorizontal: 4,
            marginTop: 12,
          }}
          isOutline={buttonSelect != 'all'}
        />
        <Button
          title={'Confirmed '}
          onPress={() => setButtonSelect('confirmed')}
          buttonStyle={{
            height: 38,
            width: '34%',
            marginHorizontal: 4,
            marginTop: 12,
          }}
          isOutline={buttonSelect != 'confirmed'}
        />
        <Button
          title={'Completed '}
          onPress={() => setButtonSelect('completed')}
          buttonStyle={{
            height: 38,
            width: '42%',
            marginHorizontal: 4,
            marginTop: 12,
          }}
          isOutline={buttonSelect != 'completed'}
        />
      </View>
      {/* card */}
      <FlatList
        data={orders}
        style={{
          height: Metrix.VerticalSize(440),
          padding: 6,
        }}
        ListEmptyComponent={() => (
          <View style={{ height: 200, marginHorizontal: 25 }}></View>
        )}
        ListFooterComponent={() => (
          <View style={{ height: Metrix.HorizontalSize(120) }}></View>
        )}
        renderItem={({ item, index }) => {
          return (
            <OrderInvoiceComponent item={item} index={index} isOrder={true} />
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
});
