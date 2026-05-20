import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, { useMemo } from 'react';
import { Colors, Images, Metrix, NavigationService } from '../config';
import { fonts } from '../config/Constants';
import CountDown from 'react-native-countdown-fixed';
import TextComponent from './TextComponent';
import Button from './Button';
import { imageBaseUrl } from '../config/ApiCaller';
import { HomeMiddleware } from '../redux/Middlewares';
import { useDispatch, useSelector } from 'react-redux';

// Calculate seconds remaining from an ISO end_date string
const getSecondsUntil = endDate => {
  if (!endDate) return 0;
  const diff = Math.floor((new Date(endDate) - new Date()) / 1000);
  return diff > 0 ? diff : 0;
};

const AuctionItemComponent = ({ item = {} }) => {
  const {
    title,
    current_price,
    starting_price,
    thumbnail,
    end_date,
    status,
    category,
  } = item;

  const secondsUntil = useMemo(() => getSecondsUntil(end_date), [end_date]);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.AuthReducer);

  const imageSource = thumbnail
    ? { uri: imageBaseUrl + thumbnail }
    : Images.dummy_car_dp;

  const displayPrice = current_price ?? starting_price ?? '0.00';
  const isActive = status === 'active';

  const getAuctionDetails = () => {
    dispatch(HomeMiddleware.GetAuctionDetails(item.id, user?.token)).then(
      res => {
        NavigationService.navigate('AuctionDetails', {
          auctionId: item.id,
          details: res,
        });
      },
    );
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.85}
      onPress={getAuctionDetails}
    >
      <ImageBackground source={imageSource} style={styles.heroImage}>
        {/* Status Badge */}
        {/* {status && (
          <View
            style={[
              styles.badge,
              { backgroundColor: isActive ? Colors.primary : Colors.darkGray },
            ]}
          >
            <Text style={styles.badgeText}>{status.toUpperCase()}</Text>
          </View>
        )} */}

        {/* Countdown Timer */}
        <View style={styles.timerContainer}>
          <CountDown
            until={secondsUntil}
            size={10}
            digitStyle={{ backgroundColor: '#FFF' }}
            digitTxtStyle={{ color: Colors.primary }}
            timeLabelStyle={{ color: Colors.grayText, fontWeight: 'bold' }}
            timeLabels={{ d: 'Day', h: 'Hour', m: 'Min', s: 'Sec' }}
            showSeparator
            separatorStyle={{ color: Colors.primary, marginTop: -16 }}
          />
        </View>
      </ImageBackground>

      <View style={styles.infoContainer}>
        {/* Title */}
        <TextComponent
          customStyles={{ color: Colors.primary, fontSize: 12 }}
          isSubTitle
          text={title ?? 'Untitled Auction'}
          numberOfLines={2}
        />

        {/* Price + Bid Button */}
        <TextComponent
          text="Current Bid:"
          customStyles={{ marginTop: 8, fontSize: 11 }}
        />
        <View style={styles.priceRow}>
          <TextComponent
            text={`$${parseFloat(displayPrice).toLocaleString()}`}
            isSubTitle
            customStyles={{ color: Colors.primary, fontSize: 18 }}
          />
          <Button
            title={'Bid Now'}
            buttonStyle={{ height: 32, width: '48%', borderRadius: 10 }}
            disabled={!isActive}
            onPress={getAuctionDetails}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AuctionItemComponent;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginTop: Metrix.VerticalSize(16),
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 10,
    borderColor: Colors.primary,
    borderWidth: 0.5,
    margin: 8,
    width: '46%',
  },
  heroImage: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 9,
    fontFamily: fonts.Bold,
    letterSpacing: 0.5,
  },
  timerContainer: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 18,
    justifyContent: 'center',
    margin: 6,
    paddingVertical: 4,
  },
  infoContainer: {
    padding: 6,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: fonts.Medium,
    color: Colors.grayText,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
});
