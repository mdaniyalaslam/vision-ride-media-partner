import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Colors, Metrix } from '../../config';
import { Header } from '../../components';
import NotificationItemComponent from '../../components/NotificationItemComponent';
import { fonts } from '../../config/Constants';

const Notification = () => {
  const [apiList, setapiList] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

  return (
    <View style={styles.container}>
      <Header backIcon={true} title={'Notifications'} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={apiList}
        onEndReached={() => {
          // if (apiAccountList.length < recordCount) {
          //   onEndReached();
          // }
        }}
        onEndReachedThreshold={0.7}
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
          return <NotificationItemComponent item={item} index={index} />;
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleNoDataFount: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Bold,
    color: Colors.darkGray,
    textAlign: 'center',
  },
});
