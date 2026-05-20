import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Colors, Metrix } from '../../config';
import { fonts } from '../../config/Constants';
import { Header } from '../../components';
import FAQItemComponent from '../../components/FAQItemComponent';

const FAQs = () => {
  const [faqsApiList, setFaqsApiList] = useState([
    {
      id: 1,
      question: 'How Star Car Insurance Work?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    },
    {
      id: 2,
      question: 'What we do?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    },
    {
      id: 3,
      question: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    },
    {
      id: 4,
      question: 'Lorem ipsum dolor sit amet',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    },
  ]);

  return (
    <View style={styles.container}>
      <Header backIcon={true} title={'FAQs'} />
      <View
        style={{
          marginHorizontal: Metrix.HorizontalSize(30),
          marginVertical: Metrix.VerticalSize(30),
        }}
      >
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={faqsApiList}
          onEndReached={() => {}}
          onEndReachedThreshold={0.7}
          ListEmptyComponent={() => (
            <View
              style={{
                // flex: 1,
                height: Metrix.VerticalSize(400),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.titleNoDataFount}>No Data Found</Text>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={{ height: Metrix.HorizontalSize(220) }}></View>
          )}
          renderItem={({ item, index }) => {
            return <FAQItemComponent item={item} index={index} />;
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: fonts.Bold,
    fontSize: Metrix.customFontSize(16),
    marginTop: Metrix.VerticalSize(40),

    color: Colors.primary,
  },
  description: {
    fontFamily: fonts.Regular,
    fontSize: Metrix.customFontSize(12),
    color: Colors.textColor,
    marginTop: Metrix.VerticalSize(10),
  },
  titleNoDataFount: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Bold,
    color: Colors.darkGray,
    textAlign: 'center',
  },
});
