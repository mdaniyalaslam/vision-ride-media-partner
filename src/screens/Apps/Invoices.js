import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Colors, Metrix } from '../../config';
import { Button, Header, OrderInvoiceComponent } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { HomeMiddleware } from '../../redux/Middlewares';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
  // { label: 'Expired', value: 'expired' },
];

const PER_PAGE = 15;

const Invoices = () => {
  const { user } = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const [activeFilter, setActiveFilter] = useState('all');
  const [invoices, setInvoices] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    current_page: 1,
    last_page: 1,
  });

  useEffect(() => {
    fetchInvoices(1, true);
  }, [activeFilter]);

  const fetchInvoices = useCallback(
    async (page = 1, reset = false) => {
      try {
        const params = new URLSearchParams({
          filter: activeFilter,
          per_page: PER_PAGE,
          page,
        }).toString();

        const response = await dispatch(
          HomeMiddleware.GetInvoices(user.token, params),
        );
        console.log('INVOICES', response);

        const newInvoices = response?.data ?? [];
        const newPagination = {
          total: response?.total ?? 0,
          current_page: response?.current_page ?? 1,
          last_page: response?.last_page ?? 1,
        };

        setInvoices(prev => (reset ? newInvoices : [...prev, ...newInvoices]));
        setPagination(newPagination);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
      }
    },
    [activeFilter],
  );

  // ─── Infinite scroll ──────────────────────────────────────────────────────
  const handleLoadMore = () => {
    const { current_page, last_page } = pagination;
    if (current_page < last_page) {
      fetchInvoices(current_page + 1, false);
    }
  };

  // ─── Filter press ─────────────────────────────────────────────────────────
  const handleFilterPress = filter => {
    if (filter === activeFilter) return;
    setActiveFilter(filter);
  };

  const { total } = pagination;

  return (
    <View style={styles.container}>
      <Header title={'Invoices'} />

      {/* Filter tabs */}
      <View style={styles.row}>
        {FILTERS.map(filter => (
          <Button
            key={filter.value}
            title={
              filter.label
              // filter.value === activeFilter
              //   ? `${filter.label} (${total})`
              //   : filter.label
            }
            onPress={() => handleFilterPress(filter.value)}
            buttonStyle={styles.tabButton}
            isOutline={activeFilter !== filter.value}
          />
        ))}
      </View>

      {/* List */}
      <FlatList
        data={invoices}
        style={styles.list}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        renderItem={({ item, index }) => (
          <OrderInvoiceComponent item={item} index={index} />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Data Found</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ height: Metrix.HorizontalSize(120) }} />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 12,
    gap: 8,
  },
  tabButton: {
    height: 38,
    paddingHorizontal: 12,
    width: '31.7%',
  },
  list: {
    flex: 1,
    padding: 6,
  },
  emptyContainer: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.darkGray,
  },
});
