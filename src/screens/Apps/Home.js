import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, Images, Metrix, NavigationService } from '../../config';
import { fonts } from '../../config/Constants';
import {
  Button,
  HeroHeader,
  HomeWidget,
  TextComponent,
} from '../../components';
import useStyle from '../styles';
import HomeItemComponent from '../../components/HomeItemComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { HomeMiddleware } from '../../redux/Middlewares';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AuthAction } from '../../redux/Actions';

const Home = () => {
  const ALL = 'all';
  const WINNING = 'winning';
  const LOST = 'lost';
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.AuthReducer);
  const [filter, setfilter] = useState(ALL);
  const [stats, setStats] = useState({});
  const [bids, setBids] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getStats();
      setfilter(ALL);
      getNotificationsCount();
    });
  }, []);
  useEffect(() => {
    getBids();
  }, [filter]);

  const getNotificationsCount = () => {
    dispatch(HomeMiddleware.GetNotificationsCount(user?.token)).then(res => {
      console.log('NOTIFICATIONS COUNT', res);
      dispatch(AuthAction.SaveNotificationCount(res?.data?.unread_count || 0));
    });
  };

  const getStats = () => {
    dispatch(HomeMiddleware.GetBidStats(user?.token)).then(res => {
      console.log('STATS', res);
      setStats(res);
    });
  };
  const getBids = () => {
    dispatch(HomeMiddleware.GetBids(filter, user?.token)).then(res => {
      console.log('BIDS', res?.data);
      setBids(res?.data);
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <HeroHeader />

        <View
          style={{
            marginTop: -40,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <HomeWidget
            text={'ACTIVE BIDS'}
            count={stats?.active_bids || 0}
            icon={() => (
              <Ionicons name={'hammer'} color={Colors.primary} size={22} />
            )}
          />
          <HomeWidget
            text={'WINNING BIDS'}
            count={stats?.winning_bids || 0}
            icon={() => (
              <Ionicons
                name={'trophy-sharp'}
                color={Colors.primary}
                size={22}
              />
            )}
          />
          <HomeWidget
            text={'ACTIVE ORDERS'}
            count={stats?.active_orders || 0}
            icon={() => (
              <Entypo
                name={'text-document-inverted'}
                color={Colors.primary}
                size={22}
              />
            )}
          />
          <HomeWidget
            text={'TOTAL SPENT'}
            count={stats?.total_spent || 0}
            icon={() => (
              <Entypo name={'message'} color={Colors.primary} size={22} />
            )}
          />
        </View>
        {/* tabs */}
        <View style={{ ...styles.row }}>
          <Button
            // title={`All (${stats?.active_bids || 0})`}
            title={`All`}
            onPress={() => setfilter(ALL)}
            buttonStyle={{
              height: 38,
              width: '25%',
              marginHorizontal: 4,
              marginTop: 12,
            }}
            isOutline={filter != ALL}
          />
          <Button
            // title={`Winning (${stats?.winning_bids || 0})`}
            title={`Winning`}
            onPress={() => setfilter(WINNING)}
            buttonStyle={{
              height: 38,
              width: '36%',
              marginHorizontal: 4,
              marginTop: 12,
            }}
            isOutline={filter != WINNING}
          />
          <Button
            // title={`Lost (${stats?.lost || 0})`}
            title={`Lost`}
            onPress={() => setfilter(LOST)}
            buttonStyle={{
              height: 38,
              width: '33%',
              marginHorizontal: 4,
              marginTop: 12,
            }}
            isOutline={filter != LOST}
          />
        </View>
        <FlatList
          data={bids}
          style={{
            height: Metrix.VerticalSize(440),
          }}
          ListEmptyComponent={() => (
            <View style={{ margin: 25 }}>
              <TextComponent
                customStyles={{ textAlign: 'center' }}
                text="No bids placed yet. Browse auctions to start bidding!"
              />

              <View
                style={{
                  marginTop: Metrix.VerticalSize(16),
                  marginHorizontal: Metrix.HorizontalSize(20),
                }}
              >
                <Button
                  title={'Browse Auctions'}
                  onPress={() => {
                    NavigationService.navigate('Auctions');
                  }}
                />
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={{ height: Metrix.HorizontalSize(120) }}></View>
          )}
          renderItem={({ item, index }) => {
            return <HomeItemComponent item={item} index={index} />;
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
  },

  titleBig: {
    fontSize: Metrix.customFontSize(32),
    fontFamily: fonts.SemiBold,
    color: Colors.white,
    textAlign: 'center',
    marginHorizontal: Metrix.HorizontalSize(45),
    marginTop: Metrix.VerticalSize(30),
  },
  subTitle: {
    // flex: 1,
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    marginHorizontal: Metrix.HorizontalSize(55),
    color: Colors.background,
    textAlign: 'center',
    marginTop: Metrix.VerticalSize(14),
  },
  tabIcon: {
    width: Metrix.HorizontalSize(24),
    height: Metrix.VerticalSize(24),
    alignItems: 'center',
    tintColor: Colors.primary,
  },
  containerEmpty: {
    width: '100%',
    height: Metrix.VerticalSize(400),

    // marginHorizontal: Metrix.HorizontalSize(25),
    // backgroundColor: Colors.lightBlue,
    borderRadius: Metrix.HorizontalSize(12),
  },
  logo: {
    width: Metrix.HorizontalSize(300),
    height: Metrix.VerticalSize(140),
    alignSelf: 'center',
    marginTop: Metrix.VerticalSize(25),
    // marginHorizontal: Metrix.HorizontalSize(15),
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: Metrix.HorizontalSize(100),
  },
});
