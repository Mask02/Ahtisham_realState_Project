import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAuthContext} from '../contexts/AuthContext';
import {Avatar} from 'react-native-paper';
import profile from '../assets/images/avatar.jpg';

export default function BottomTabs({navigation}) {
  const {isAuthenticated, user} = useAuthContext();

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        marginHorizontal: 30,
        justifyContent: 'space-between',
      }}>
      <Icon icon="home" text="Home" />
      <Icon icon="search" text="Browse" />
      <Icon icon="heart" text="Favourite" />
      {isAuthenticated ? (
        <TouchableOpacity onPress={() => navigation.navigate('AddItem')}>
          <View>
            <Avatar.Image
              source={profile}
              size={23}
              style={{alignSelf: 'center'}}
            />
            <Text style={{fontSize: 12}}>{user.name}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View>
            <FontAwesome5
              name={'user'}
              size={30}
              style={{alignSelf: 'center'}}
            />
            <Text style={{fontSize: 12}}>Login</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const Icon = ({icon, text}) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5 name={icon} size={23} style={{alignSelf: 'center'}} />
      <Text style={{fontSize: 12}}>{text}</Text>
    </View>
  </TouchableOpacity>
);
