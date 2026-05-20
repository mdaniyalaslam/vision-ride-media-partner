import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fonts } from '../config/Constants';
import { Colors, Metrix } from '../config';

const FAQItemComponent = ({ item, index }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.questionContainer}
        onPress={() => toggleExpand(index)}
      >
        <Text style={styles.questionText}>{item?.question}</Text>
        <View style={{ justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
          <Icon
            name={expandedIndex === index ? 'expand-less' : 'expand-more'}
            size={Metrix.customFontSize(18)}
            color={Colors.darkGray}
          />
        </View>
      </TouchableOpacity>
      {expandedIndex === index && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{item?.answer}</Text>
          <View style={styles.answerContainer}></View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  maintitle: {
    color: Colors.textColor,
    fontSize: Metrix.customFontSize(24),
    fontFamily: fonts.Bold,
    marginVertical: Metrix.VerticalSize(10),
  },

  itemContainer: {
    backgroundColor: Colors.background,
    marginTop: Metrix.VerticalSize(10),
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.backgroundGray,
    padding: Metrix.HorizontalSize(16),
    borderRadius: Metrix.VerticalSize(8),
  },
  questionText: {
    fontSize: Metrix.customFontSize(16),
    fontFamily: fonts.Bold,
    color: Colors.primary,
    marginRight: Metrix.HorizontalSize(10),
  },
  answerContainer: {
    paddingHorizontal: Metrix.HorizontalSize(16),
    paddingBottom: Metrix.VerticalSize(10),
    borderTopWidth: 0,
    borderTopColor: '#EEEEEE',
  },
  answerText: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Regular,
    color: Colors.textColor,
    marginVertical: Metrix.VerticalSize(8),
  },
});

export default FAQItemComponent;
