import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  View,
  Text,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colors, Metrix, NavigationService } from '../config';
import { fonts } from '../config/Constants';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-web-swiper';
import { imageBaseUrl } from '../config/ApiCaller';

// Items may be plain path strings or objects carrying an image_type label
const getPath = item =>
  typeof item === 'string'
    ? item
    : item?.path ??
      item?.image_path ??
      item?.image_url ??
      item?.url ??
      item?.image ??
      '';

const getType = item =>
  typeof item === 'string' ? '' : item?.image_type ?? item?.type ?? '';

const formatType = type =>
  type
    ? String(type)
        .replace(/[_-]+/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
    : '';

export default function ImageSwiperComponent({ data = [] }) {
  const scrollRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    swiperRef?.current?.goTo(activeImageIndex);
  }, [activeImageIndex]);

  const renderImages = ({ item, index }) => {
    const label = formatType(getType(item));
    return (
      <TouchableOpacity
        onPress={() => setActiveImageIndex(index)}
        style={{
          marginLeft: index === 0 ? 0 : 6,
          borderWidth: 5,
          borderColor:
            activeImageIndex === index ? Colors.primary : Colors.white,
          borderRadius: 14,
          overflow: 'hidden',
        }}
      >
        <FastImage
          style={styles.smallImage}
          source={{
            uri: imageBaseUrl + getPath(item),
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        {label ? (
          <View style={styles.thumbTag}>
            <Text numberOfLines={1} style={styles.thumbTagText}>
              {label}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    scrollRef.current.scrollToIndex({
      animated: true,
      index: activeImageIndex,
      viewPosition: 0.85,
    });
  }, [activeImageIndex]);

  return (
    <View>
      <View style={{ height: 280, width: '100%' }}>
        <Swiper
          controlsEnabled={false}
          ref={swiperRef}
          loadMinimal
          loadMinimalSize={1}
          horizontal
          showsPagination={false}
          onIndexChanged={index => {
            scrollRef.current.scrollToIndex({
              animated: true,
              index: index,
              viewOffset: 60,
            });
            setActiveImageIndex(index);
          }}
        >
          {data.length
            ? data?.map((item, index) => {
                const slideLabel = formatType(getType(item));
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: '100%',
                      borderRadius: 16,
                      overflow: 'hidden',
                    }}
                    activeOpacity={1}
                    onPress={() =>
                      NavigationService.navigate('ImageSlider', {
                        data: data,
                      })
                    }
                  >
                    <FastImage
                      style={{
                        width: '100%',
                        height: Metrix.VerticalSize(240),
                      }}
                      source={{
                        uri: imageBaseUrl + getPath(item),
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                    {slideLabel ? (
                      <View style={styles.mainTag}>
                        <Text style={styles.mainTagText}>{slideLabel}</Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
                );
              })
            : null}
        </Swiper>
      </View>
      <FlatList
        horizontal
        data={data}
        ref={scrollRef}
        initialScrollIndex={activeImageIndex}
        renderItem={renderImages}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  smallImage: {
    width: 75,
    height: 75,
  },
  mainTag: {
    position: 'absolute',
    top: Metrix.VerticalSize(10),
    left: Metrix.HorizontalSize(10),
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: Metrix.HorizontalSize(10),
    paddingVertical: Metrix.VerticalSize(4),
    borderRadius: 12,
  },
  mainTagText: {
    color: Colors.white,
    fontFamily: fonts.SemiBold,
    fontSize: Metrix.customFontSize(11),
  },
  thumbTag: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  thumbTagText: {
    color: Colors.white,
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(8),
    textAlign: 'center',
  },
});
