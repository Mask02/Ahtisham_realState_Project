import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import avatarIcon from '../../assets/images/login.png';

// Auth Context
import {useAuthContext} from '../../contexts/AuthContext';

// Firebase imports
import auth from '@react-native-firebase/auth';

export default function Login({navigation}) {
  const {dispatch} = useAuthContext();

  const [isProcessing, setIsProcessing] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setLoginData(s => ({
      ...s,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    const {email, password} = loginData;
    if (!email || !password) {
      alert('Please fill all the fields!');
      return;
    }
    setIsProcessing(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCred => {
        const user = userCred.user;
        dispatch({type: 'LOGIN', payload: {user}});
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          alert('That email address is invalid!');
        }

        if (error.code === 'auth/network-request-failed') {
          alert('Please check your internet connection!');
        }
      })
      .finally(() => {
        setIsProcessing(false);
        setLoginData({
          name: '',
          password: '',
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={avatarIcon} style={styles.avatarIcon} />
        <Text style={{fontSize: 35, marginVertical: 10}}>Login</Text>
      </View>

      <View>
        <TextInput
          label="Email"
          value={loginData.email}
          keyboardType="email-address"
          style={{marginBottom: 10}}
          onChangeText={val => handleChange('email', val)}
        />
        <TextInput
          label="Password"
          value={loginData.password}
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
          onPress={handleLogin}
          loading={isProcessing && true}
          disabled={isProcessing && true}>
          Login
        </Button>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button mode="text" onPress={() => navigation.navigate('Register')}>
          Create an account
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
