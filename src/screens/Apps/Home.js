import {
  View,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Colors, Images, Metrix} from '../../config';
import {HeroHeader, TextComponent} from '../../components';
import HomeItemComponent from '../../components/HomeItemComponent';
import {HomeMiddleware} from '../../redux/Middlewares';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.AuthReducer);
  const navigation = useNavigation();
  const [vehicles, setVehicles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchVehicles = useCallback(() => {
    dispatch(HomeMiddleware.GetVehicles(user?.token))
      .then(res => {
        console.log('Vehicles List:', res?.data);
        setVehicles(res?.data ?? []);
      })
      .catch(err => console.warn('GetVehicles Error:', err))
      .finally(() => setRefreshing(false));
  }, [user?.token]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchVehicles);
    return unsubscribe;
  }, [navigation, fetchVehicles]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchVehicles();
  };

  return (
    <View style={styles.container}>
      <HeroHeader />
      <FlatList
        data={vehicles}
        style={{flex: 1}}
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
            <Image source={Images.car} style={styles.emptyImage} />
            <TextComponent
              customStyles={{textAlign: 'center', marginHorizontal: 20}}
              text='Press the "+" button below to add your first vehicle. Once added, it will be visible to potential advertisers.'
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{height: Metrix.HorizontalSize(120)}} />
        )}
        renderItem={({item, index}) => (
          <HomeItemComponent item={item} index={index} />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(30),
  },
  emptyImage: {
    width: 380,
    resizeMode: 'contain',
    height: 280,
    alignSelf: 'center',
  },
});
