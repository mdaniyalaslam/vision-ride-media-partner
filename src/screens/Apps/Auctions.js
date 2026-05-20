import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { Colors, Images, Metrix } from '../../config';
import {
  AuctionItemComponent,
  Button,
  DropdownField,
  Header,
  HeroHeader,
  TextComponent,
} from '../../components';
import { fonts } from '../../config/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeMiddleware } from '../../redux/Middlewares';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const ALL = 'All';

const PER_PAGE = 15;

const SORT_OPTIONS = [
  { name: 'Default Sorting', value: '' },
  { name: 'Price: Low to High', value: 'price_low' },
  { name: 'Price: High to Low', value: 'price_high' },
];

const Auctions = () => {
  const { user } = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [auctions, setAuctions] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    current_page: 1,
    last_page: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getCategories();
    });
  }, []);

  useEffect(() => {
    fetchAuctions(1, true);
  }, [selectedCategory, sortBy]);

  const getCategories = () => {
    dispatch(HomeMiddleware.GetCategories(user.token)).then(response => {
      console.log('CATEGORIES', response);
      setCategories([{ name: ALL, id: ALL }, ...response?.categories] || []);
      setSelectedCategory(ALL);
      // setAuctions([]);
      fetchAuctions(1, true);
    });
  };

  const fetchAuctions = useCallback(
    async (page = 1, reset = false) => {
      if (isLoading || isLoadingMore) return;

      reset ? setIsLoading(true) : setIsLoadingMore(true);

      try {
        const categoryId = selectedCategory === ALL ? '' : selectedCategory;

        // Build query string
        const params = new URLSearchParams({
          per_page: PER_PAGE,
          search: '',
          category_id: categoryId,
          status: 'all',
          featured: '',
          sort_by: sortBy,
          page,
        }).toString();

        const response = await dispatch(
          HomeMiddleware.GetAuctions(user.token, params),
        );
        console.log('AUCTIONS', response);
        const newAuctions = response?.auctions ?? [];
        const newPagination = response?.pagination ?? pagination;
        setAuctions(prev => (reset ? newAuctions : [...prev, ...newAuctions]));
        setPagination(newPagination);
      } catch (error) {
        console.error('Failed to fetch auctions:', error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
        setIsRefreshing(false);
      }
    },
    [selectedCategory, sortBy, isLoading, isLoadingMore],
  );

  // ─── Pull-to-refresh ──────────────────────────────────────────────────────
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchAuctions(1, true);
  };

  // ─── Infinite scroll ──────────────────────────────────────────────────────
  const handleLoadMore = () => {
    const { current_page, last_page } = pagination;
    if (!isLoadingMore && current_page < last_page) {
      fetchAuctions(current_page + 1, false);
    }
  };

  // ─── Category select ──────────────────────────────────────────────────────
  const handleCategorySelect = categoryId => {
    if (categoryId === selectedCategory) return;
    setSelectedCategory(categoryId);
  };

  const { total, current_page, last_page } = pagination;
  const showingFrom = total === 0 ? 0 : (current_page - 1) * PER_PAGE + 1;
  const showingTo = Math.min(current_page * PER_PAGE, total);
  const resultLabel =
    total === 0
      ? 'No results'
      : `Showing ${showingFrom}–${showingTo} of ${total} results`;

  return (
    <View style={styles.container}>
      <Header title={'Auctions'} isBack={false} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingBottom: 10 }}
      >
        {categories?.length > 0 &&
          categories.map((category, index) => (
            <Button
              key={index}
              title={category.name}
              onPress={() => handleCategorySelect(category.id)}
              buttonStyle={{
                height: 38,
                marginHorizontal: 4,
                marginTop: 12,
                paddingHorizontal: 12,
              }}
              isOutline={selectedCategory != category.id}
            />
          ))}
      </ScrollView>

      <View
        style={{
          ...styles.row,
        }}
      >
        <TextComponent customStyles={{ width: '60%' }} text={resultLabel} />

        <DropdownField
          modalTitle="Sorting options"
          data={SORT_OPTIONS}
          value={sortBy}
          updateValue={item => setSortBy(item.value)}
          placeholder={
            sortBy === ''
              ? 'Default Sorting'
              : SORT_OPTIONS.find(opt => opt.value === sortBy)?.name
          }
          isSearchable={false}
          customFieldStyles={{
            height: 38,
            // width: '60%',
            borderRadius: 100,
            // alignSelf: 'flex-end',
          }}
        />

        {/* 
        <Button
          title={'Default Sorting'}
          // onPress={() => setButtonSelect('All')}
          buttonStyle={{
            height: 38,
            width: '38%',
            borderRadius: 100,
          }}
          isOutline
          postIcon={
            <Ionicons
              name={'chevron-down-sharp'}
              color={Colors.primary}
              // size={18}
            />
          }
        /> */}
      </View>

      <FlatList
        contentContainerStyle={{
          // backgroundColor: 'yellow',
          height: Metrix.VerticalSize(450),
        }}
        showsVerticalScrollIndicator={false}
        data={auctions}
        numColumns={2}
        ListEmptyComponent={() => (
          <View
            style={{
              // flex: 1,
              height: 500,
              // marginHorizontal: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.titleNoDataFount}>No Data Found</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ height: Metrix.HorizontalSize(20) }}></View>
        )}
        renderItem={({ item, index }) => {
          return <AuctionItemComponent item={item} />;
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Auctions;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.background,
  },
  row: {
    marginHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1, // Each button takes equal space
    marginHorizontal: 2, // Optional: Add spacing between buttons
  },
  logo: {
    width: Metrix.HorizontalSize(300),
    height: Metrix.VerticalSize(140),
    alignSelf: 'center',
    marginTop: Metrix.VerticalSize(25),
    // marginHorizontal: Metrix.HorizontalSize(15),
  },
  titleBig: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Regular,
    color: Colors.textColor,
    textAlign: 'center',

    // marginHorizontal: Metrix.HorizontalSize(45),
    // marginTop: Metrix.VerticalSize(30),
  },
  titleNoDataFount: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Bold,
    color: Colors.darkGray,
    textAlign: 'center',
  },
});
