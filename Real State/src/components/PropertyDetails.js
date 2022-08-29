import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

export default function PropertyDetails(props) {
  const {imageUri, title, price, location, propertyType, rooms, area, mobile} =
    props.route.params;

  return (
    <View>
      <TouchableOpacity
        style={{position: 'absolute', left: 10, top: 10, zIndex: 12}}
        onPress={() => props.navigation.navigate('Home')}>
        <FontAwesome5 name={'arrow-left'} size={30} color={'purple'} />
      </TouchableOpacity>
      <Image source={{uri: imageUri}} style={{width: '100%', height: 180}} />
      <View style={{paddingHorizontal: 10}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            marginVertical: 5,
            color: 'black',
          }}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            backgroundColor: 'white',
            paddingVertical: 12,
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <Ionicons name={'call'} size={20} color={'purple'} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginHorizontal: 10,
              color: 'black',
            }}>
            {mobile}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            backgroundColor: 'white',
            paddingVertical: 12,
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <Entypo name={'price-tag'} size={20} color={'purple'} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginHorizontal: 10,
              color: 'black',
            }}>
            {price}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            backgroundColor: 'white',
            paddingVertical: 12,
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <FontAwesome5 name={'map-marker-alt'} size={20} color={'purple'} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginHorizontal: 10,
              color: 'black',
            }}>
            {location}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            backgroundColor: 'white',
            paddingVertical: 12,
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <FontAwesome5 name={'home'} size={20} color={'purple'} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginHorizontal: 10,
              color: 'black',
            }}>
            {propertyType}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            backgroundColor: 'white',
            paddingVertical: 12,
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <Entypo name={'layers'} size={20} color={'purple'} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginHorizontal: 10,
              color: 'black',
            }}>
            {rooms}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            backgroundColor: 'white',
            paddingVertical: 12,
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <Entypo name={'inbox'} size={20} color={'purple'} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginHorizontal: 10,
              color: 'black',
            }}>
            {area}
          </Text>
        </View>
      </View>
    </View>
  );
}

const Detail = ({icon, text}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    }}>
    <FontAwesome5 name={icon} size={20} color={'purple'} />
    <Text
      style={{
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 10,
        color: 'black',
      }}>
      {text}
    </Text>
  </View>
);
