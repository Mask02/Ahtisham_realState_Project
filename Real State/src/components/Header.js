import {View, Text, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
// Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
//Logo
import Logo from '../assets/images/images.png';

// firebase imports
import auth from '@react-native-firebase/auth';
import {useAuthContext} from '../contexts/AuthContext';

export default function Header({navigation}) {
  const {isAuthenticated, dispatch} = useAuthContext();

  const handleSignout = () => {
    console.log('clicked on signout');
    auth()
      .signOut()
      .then(() => {
        alert('User signed out!');
        dispatch({
          type: 'LOGOUT',
        });
      })
      .catch(() => alert('There is some error Please try again later!'));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: 'white',
      }}>
      <TouchableOpacity>
        <FontAwesome5 name={'bars'} size={25} />
      </TouchableOpacity>
      <Image
        source={Logo}
        style={{
          height: 80,
          width: 80,
          backgroundColor: 'black',
          alignSelf: 'center',
        }}
      />
      {isAuthenticated ? (
        <TouchableOpacity onPress={() => handleSignout()}>
          <FontAwesome5 name={'sign-out'} size={25} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <FontAwesome5 name={'sign-in'} size={25} />
        </TouchableOpacity>
      )}
    </View>
  );
}
