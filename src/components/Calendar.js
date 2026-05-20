import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import { Images, Metrix} from '../config';
import moment from 'moment';
import {forceTouchGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';
import {fonts} from '../config/Constants';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import { useTheme } from '@react-navigation/native';

function CalendarModal({
  title = "Select Date Of Birth*",
  show = false,
  currentDate = new Date(),
  onSelectDate,
  selectedDate,
  blockDates,
  onDayPress,
  initialDate,
  markedDates=() => {},
  closeModal = () => {},
}) {
  // let todayDate = moment(currentDate).format('YYYY-MM-DD');

  // let markedDay = {};

  // blockDates.map(item => {
  //   markedDay[item] = {
  //     selectedColor: Colors.primary,
  //     marked: true,
  //     selected: true,
  //     dotColor: Colors.primary,
  //     selectedTextColor: Colors.white
  //   };
  // });

  const Colors = useTheme().colors
  const styles = createStyles(Colors)

  return (
    <Modal
      visible={show}
      onRequestClose={closeModal}
      transparent={true}
      animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalStyle}>
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: Metrix.VerticalSize(20),
              paddingBottom: Metrix.VerticalSize(10),
            }}>
            <Text
              style={{
                fontSize: Metrix.customFontSize(16),
                fontFamily: fonts.Bold,
                color: Colors.primary,
              }}>
              {title}
            </Text>

            <TouchableOpacity onPress={closeModal}>
              <Image source={Images.cross} style={{height: 30, width: 30}} />
            </TouchableOpacity>
          </View>

          <Calendar
            // minDate={new Date()}
            disable
            initialDate={initialDate}
            date={currentDate ? currentDate : new Date()}
            enableSwipeMonths={true}
            hideArrows={false}
            maxDate={currentDate}
            theme={{
              textSectionTitleColor: Colors.primary,
              todayTextColor: Colors.primary,
              dayTextColor: 'black',
              arrowColor: Colors.primary,
              monthTextColor: Colors.primary,
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
              // selectedDayBackgroundColor: Colors.white,
              // selectedDayTextColor: Colors.black
            }}
            hideExtraDays={true}
            showSixWeeks={true}
            // onDayPress={date => console.warn(date?.dateString)}
            onDayPress={onDayPress}
            disableAllTouchEventsForDisabledDays={true}
        markedDates={markedDates}
          />
        </View>
      </View>
    </Modal>
  );
}

export default CalendarModal;

const createStyles = Colors => StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalStyle: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: Colors.background,
    padding: 10,
    paddingTop: 0,
    flex: 0.52,
  },
});
