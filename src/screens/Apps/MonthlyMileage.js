import {View, Text, Image, StyleSheet, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Colors, Images, Metrix, NavigationService} from '../../config';
import {Button, Header, MileageItemComponent} from '../../components';
import {fonts} from '../../config/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {HomeMiddleware} from '../../redux/Middlewares';

const MonthlyMileage = ({route}) => {
  const orderId = route?.params?.orderId;
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.AuthReducer);

  const [reports, setReports] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReports = useCallback(() => {
    if (!orderId) return;
    dispatch(HomeMiddleware.GetMonthlyReports(user?.token, orderId))
      .then(res => {
        console.log('GetMonthlyReports Response:', res?.data);
        setReports(res?.data ?? []);
      })
      .catch(err => console.warn('GetMonthlyReports Error:', err))
      .finally(() => setRefreshing(false));
  }, [orderId, user?.token]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleAdd = () => {
    NavigationService.navigate('AddMonthlyMileage', {orderId});
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchReports();
  };

  return (
    <>
      <Header backIcon={true} title="Monthly Mileage" notificationIcon={false} />

      <View style={styles.container}>
        {reports.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={Images.noData}
              style={styles.noDataImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>
              You don't have{'\n'}monthly data.
            </Text>
            <Button
              title="Add Monthly Mileage"
              onPress={handleAdd}
              buttonStyle={styles.addBtn}
              preIcon={
                <Ionicons
                  name="add-circle-outline"
                  size={Metrix.customFontSize(20)}
                  color={Colors.white}
                  style={{marginRight: 6}}
                />
              }
            />
          </View>
        ) : (
          <FlatList
            data={reports}
            keyExtractor={(item, index) =>
              item?.id ? String(item.id) : String(index)
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.primary]}
              />
            }
            ListHeaderComponent={
              <Button
                title="Add Monthly Mileage"
                onPress={handleAdd}
                buttonStyle={styles.addBtn}
                preIcon={
                  <Ionicons
                    name="add-circle-outline"
                    size={Metrix.customFontSize(20)}
                    color={Colors.white}
                    style={{marginRight: 6}}
                  />
                }
              />
            }
            renderItem={({item}) => <MileageItemComponent item={item} />}
          />
        )}
      </View>
    </>
  );
};

export default MonthlyMileage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Metrix.HorizontalSize(24),
  },
  noDataImage: {
    width: Metrix.HorizontalSize(280),
    height: Metrix.VerticalSize(260),
    marginBottom: Metrix.VerticalSize(24),
  },
  emptyText: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(26),
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: Metrix.customFontSize(36),
    marginBottom: Metrix.VerticalSize(28),
  },
  listContent: {
    padding: Metrix.HorizontalSize(16),
    paddingBottom: Metrix.VerticalSize(40),
  },
  addBtn: {
    width: '100%',
    height: Metrix.VerticalSize(52),
    borderRadius: 10,
    marginBottom: Metrix.VerticalSize(16),
  },
});
