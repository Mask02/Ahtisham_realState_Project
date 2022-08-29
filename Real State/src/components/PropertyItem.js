import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import {useAuthContext} from '../contexts/AuthContext';

export default function PropertyItem(props) {
  const {isAuthenticated} = useAuthContext();

  const [liked, setLiked] = useState(false);
  const details = {
    title: props.title,
    imageUri: props.imageUri,
    location: props.location,
    propertyType: props.propertyType,
    rooms: props.rooms,
    area: props.area,
    price: props.price,
    mobile: props.mobile,
  };

  const handleAddFav = details => {
    console.log('add');
    setLiked(true);
  };

  const handleRemoveFav = details => {
    console.log('remove');
    setLiked(false);
  };

  return (
    <TouchableOpacity activeOpacity={1}>
      <View style={{backgroundColor: '#fff', padding: 15, marginTop: 10}}>
        <PropertyImage
          imageUri={props.imageUri}
          liked={liked}
          setLiked={setLiked}
          details={details}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {props.title}
            </Text>
            <Text style={{fontSize: 15, color: 'gray'}}>{props.location}</Text>
            <Text style={{fontSize: 15, color: 'gray'}}>{props.price}</Text>
          </View>
          <Button
            mode="contained"
            onPress={() => {
              isAuthenticated
                ? props.navigation.navigate('PropertyDetails', details)
                : props.navigation.navigate('Login', details);
            }}>
            View
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const PropertyImage = ({imageUri, liked, setLiked}) => (
  <>
    <Image
      source={{
        uri: imageUri,
      }}
      style={{
        width: '100%',
        height: 180,
      }}
    />

    <TouchableOpacity
      style={{position: 'absolute', right: 20, top: 20}}
      onPress={() => setLiked(!liked)}>
      {liked ? (
        <MaterialCommunityIcon name={'heart'} size={25} color="red" />
      ) : (
        <MaterialCommunityIcon name={'heart-outline'} size={25} color="#fff" />
      )}
    </TouchableOpacity>
  </>
);
