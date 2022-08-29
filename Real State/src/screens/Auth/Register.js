import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import avatarIcon from '../../assets/images/login.png';

// Firebase imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import {useAuthContext} from '../../contexts/AuthContext';

export default function Register({navigation}) {
  const {dispatch} = useAuthContext();

  const [passwordShown, setPasswordShown] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setRegisterData(s => ({
      ...s,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    const {firstName, lastName, mobile, name, email, password} = registerData;
    if (!name || !email || !password || !firstName || !lastName || !mobile) {
      alert('Please fill all the fields!');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    setIsProcessing(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCred => {
        const user = userCred.user;
        console.log(user);
        createUserProfile(user);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }

        if (error.code === 'auth/network-request-failed') {
          alert('Please check your internet connection!');
        }
        setIsProcessing(false);
      });
  };

  // Function to store user data into firebase
  const createUserProfile = user => {
    const userData = {
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      mobile: registerData.mobile,
      name: registerData.name,
      email: user.email,
      uid: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    firestore()
      .collection('users')
      .doc(user.uid)
      .set(userData)
      .then(() => {
        alert('User has been registered successfully!');
        dispatch({type: 'LOGIN', paylod: {user}});
      })
      .catch(err => {
        console.log('firestore error => ', err);
        alert('There is some problem try again later!');
      })
      .finally(() => {
        setIsProcessing(false);
        setRegisterData({
          name: '',
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          mobile: '',
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={avatarIcon} style={styles.avatar} />
        <Text style={{fontSize: 35}}>Register</Text>
      </View>

      <View>
        <TextInput
          label="First Name"
          value={registerData.firstName}
          style={{marginBottom: 10}}
          onChangeText={val => handleChange('firstName', val)}
        />
        <TextInput
          label="Last Name"
          value={registerData.lastName}
          style={{marginBottom: 10}}
          onChangeText={val => handleChange('lastName', val)}
        />
        <TextInput
          label="Mobile"
          value={registerData.mobile}
          style={{marginBottom: 10}}
          keyboardType="numeric"
          onChangeText={val => handleChange('mobile', val)}
        />
        <TextInput
          label="Username"
          value={registerData.name}
          style={{marginBottom: 10}}
          onChangeText={val => handleChange('name', val)}
        />
        <TextInput
          label="Email"
          value={registerData.email}
          keyboardType="email-address"
          style={{marginBottom: 10}}
          onChangeText={val => handleChange('email', val)}
        />
        <TextInput
          label="Password"
          value={registerData.password}
          onChangeText={val => handleChange('password', val)}
          secureTextEntry={passwordShown ? false : true}
          right={
            <TextInput.Icon
              icon={passwordShown ? 'eye-off' : 'eye'}
              onPress={() => setPasswordShown(!passwordShown)}
            />
          }
        />
        <Button
          mode="contained"
          style={styles.loginBtn}
          onPress={handleRegister}
          loading={isProcessing ? true : false}
          disabled={isProcessing ? true : false}>
          Register
        </Button>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button mode="text" onPress={() => navigation.navigate('Login')}>
          Back to Login
        </Button>
        <Button mode="text" onPress={() => navigation.navigate('Forgot')}>
          Forget Password
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#add8e6',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    height: 160,
    width: 160,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBtn: {
    borderRadius: 7,
    marginVertical: 10,
  },
});
