import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Colors, Metrix} from '../../config';
import {Header, OrderInvoiceComponent, TextComponent} from '../../components';
import {HomeMiddleware} from '../../redux/Middlewares';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Orders = () => {
  const {user} = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(() => {
    dispatch(HomeMiddleware.GetOrders(user?.token, 50))
      .then(res => {
        console.log('GetOrders (Orders):', res?.data);
        setOrders(res?.data ?? []);
      })
      .catch(err => console.warn('GetOrders Error:', err))
      .finally(() => setRefreshing(false));
  }, [user?.token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchOrders);
    return unsubscribe;
  }, [navigation, fetchOrders]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  return (
    <View style={styles.container}>
      <Header title={'Orders'} isBack={false} />
      <FlatList
        data={orders}
        style={{flex: 1, padding: 6}}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <TextComponent
              text="No orders found."
              customStyles={{color: Colors.darkGray, textAlign: 'center'}}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{height: Metrix.HorizontalSize(120)}} />
        )}
        renderItem={({item, index}) => (
          <OrderInvoiceComponent item={item} index={index} isOrder={true} />
        )}
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
  emptyContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
