import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors, Metrix} from '../../config';
import {Header, PaymentItemComponent} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {HomeMiddleware} from '../../redux/Middlewares';

const PER_PAGE = 20;

const Invoices = () => {
  const {user} = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const fetchPayments = useCallback(async (reset = false) => {
    try {
      const res = await dispatch(
        HomeMiddleware.GetPayments(user?.token, PER_PAGE),
      );
      console.log('GetPayments Response:', res?.data);
      const list = res?.data?.payments ?? res?.data ?? [];
      const summary = res?.data?.stats ?? res?.data?.summary ?? {};
      setPayments(reset ? list : list);
      setStats(summary);
    } catch (error) {
      console.warn('GetPayments Error:', error);
    } finally {
      setRefreshing(false);
    }
  }, [user?.token]);

  useEffect(() => {
    fetchPayments(true);
  }, [fetchPayments]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPayments(true);
  };

  return (
    <View style={styles.container}>
      <Header title={'Payments'} />

      {/* Summary card */}
      {Object.keys(stats).length > 0 && (
        <View style={styles.statsCard}>
          {stats.total_payments !== undefined && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.total_payments ?? 0}</Text>
              <Text style={styles.statLabel}>Total Payments</Text>
            </View>
          )}
          {stats.total_amount !== undefined && (
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${stats.total_amount ?? 0}</Text>
              <Text style={styles.statLabel}>Total Earned</Text>
            </View>
          )}
        </View>
      )}

      <FlatList
        data={payments}
        style={styles.list}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        }
        renderItem={({item}) => <PaymentItemComponent item={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No payments found.</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{height: Metrix.HorizontalSize(120)}} />
        )}
      />
    </View>
  );
};

export default Invoices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Gilroy-Bold',
    fontSize: Metrix.customFontSize(20),
    color: Colors.primary,
  },
  statLabel: {
    fontFamily: 'Gilroy-Regular',
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
    marginTop: 4,
  },
  list: {
    flex: 1,
    padding: 6,
  },
  emptyContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.darkGray,
  },
});
