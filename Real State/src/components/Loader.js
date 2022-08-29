import React from 'react';
import {View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default function Loader() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row'}}>
        <ActivityIndicator animating={true} size={35} color={'white'} />
        <Text style={{color: 'white', fontSize: 25, marginLeft: 7}}>
          Loading...
        </Text>
      </View>
    </View>
  );
}
