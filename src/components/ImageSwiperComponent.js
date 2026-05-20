import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colors, Metrix, NavigationService } from '../config';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-web-swiper';
import { imageBaseUrl } from '../config/ApiCaller';

export default function ImageSwiperComponent({ data = [] }) {
  const scrollRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    swiperRef?.current?.goTo(activeImageIndex);
  }, [activeImageIndex]);

  const renderImages = ({ item, index }) => {
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
            uri: imageBaseUrl + item,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
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
            ? data?.length &&
              data?.map((item, index) => {
                return (
                  <TouchableOpacity
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
                        uri: imageBaseUrl + data[activeImageIndex],
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
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
});
