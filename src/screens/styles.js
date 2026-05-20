import { StyleSheet } from 'react-native';
import { Colors, Metrix } from '../config';
import { fonts } from '../config/Constants';
import { useTheme } from '@react-navigation/native';
const useStyle = () => {
  return StyleSheet.create({
    title: {
      fontFamily: fonts.Bold,
      marginVertical: Metrix.VerticalSize(20),
      fontSize: Metrix.customFontSize(20),
      color: Colors.primary,
    },
    description: {
      fontFamily: fonts.Regular,
      lineHeight: Metrix.VerticalSize(20),
      color: Colors.textColor,
      marginBottom: Metrix.VerticalSize(20),
      fontSize: Metrix.customFontSize(13),
    },
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    statusCardStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      paddingHorizontal: Metrix.HorizontalSize(10),
      paddingVertical: Metrix.VerticalSize(5),
      marginTop: Metrix.VerticalSize(5),
      backgroundColor: Colors.successBg,
      borderRadius: 2,
    },
    status: {
      color: Colors.successColor,
      fontFamily: fonts.Bold,
      fontSize: Metrix.customFontSize(10),
    },
    selectable: {
      marginVertical: Metrix.VerticalSize(5),
      width: '100%',
      justifyContent: 'center',
      height: Metrix.VerticalSize(44),
      paddingHorizontal: Metrix.HorizontalSize(10),
      color: Colors.black,
      borderRadius: 8,
      backgroundColor: Colors.textFiledBG,
      // borderColor: Colors.lighGray,
      // borderWidth: 1,
    },
    selectableText: {
      fontSize: Metrix.customFontSize(12),
      color: Colors.secondary,
    },
    inputLabel: {
      fontFamily: fonts.Regular,
      fontSize: Metrix.customFontSize(12),
      color: Colors.darkGray,
      marginTop: 8,
      alignItems: 'center',
    },
    shadowContainer: {
      padding: 10,
      shadowColor: Colors.primary,
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
      backgroundColor: Colors.white,
      marginVertical: Metrix.VerticalSize(5),
      borderRadius: 12,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
    shadow: {
      shadowColor: Colors.primary,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.17,
      shadowRadius: 3.05,
      elevation: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    smallButton: {
      width: '40%',
      height: 38,
      paddingVertical: 0,
      marginVertical: 6,
      borderRadius: 10,
    },
    dropdownContainer: {
      flex: 1,
      marginTop: Metrix.VerticalSize(10),
      width: '100%',
      fontSize: Metrix.customFontSize(12),
      padding: Metrix.customFontSize(12),
      paddingLeft: Metrix.HorizontalSize(10),
      color: Colors.black,
      borderRadius: 10,
      backgroundColor: Colors.textFiledBG,
      borderWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dropdownList: {
      marginTop: Metrix.VerticalSize(10),
      width: '100%',
      fontSize: Metrix.customFontSize(10),
      padding: Metrix.customFontSize(4),
      paddingLeft: Metrix.HorizontalSize(0),
      color: Colors.black,
      borderRadius: 10,
      borderWidth: 0,
      backgroundColor: Colors.textFiledBG,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
};

export default useStyle;
