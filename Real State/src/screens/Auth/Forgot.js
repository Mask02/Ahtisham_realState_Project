import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import avatarIcon from '../../assets/images/login.png';

// Firebase imports
import auth from '@react-native-firebase/auth';
// Auth Context
import {useAuthContext} from '../../contexts/AuthContext';

export default function Forgot({navigation}) {
  const {dispatch} = useAuthContext();

  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleForgot = () => {
    console.log(email);
    if (!email) {
      alert('Please enter your email!');
      return;
    }
    setIsProcessing(true);
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Reset Code has been sent to your email');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          alert('Invalid Email!');
        }
        if (error.code === 'auth/network-request-failed') {
          alert('Please check your internet connection!');
        } else {
          alert('There is some error try again later!');
        }
      })
      .finally(() => {
        setEmail('');
        setIsProcessing(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={avatarIcon} style={styles.avatarIcon} />
        <Text style={{fontSize: 30, marginVertical: 10}}>Forgot Password</Text>
      </View>

      <View>
        <TextInput
          label="Email"
          value={email}
          keyboardType="email-address"
          style={{marginBottom: 10}}
          onChangeText={val => setEmail(val)}
        />
        <Button
          mode="contained"
          style={styles.loginBtn}
          onPress={handleForgot}
          loading={isProcessing ? true : false}
          disabled={isProcessing ? true : false}>
          Send Password
        </Button>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button mode="text" onPress={() => navigation.navigate('Login')}>
          Back to Login
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
    marginTop: -100,
  },
  avatarIcon: {
    height: 160,
    width: 160,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  loginBtn: {
    borderRadius: 7,
    marginVertical: 10,
  },
});
