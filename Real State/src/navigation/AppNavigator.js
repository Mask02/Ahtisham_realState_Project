import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Frontend Screens
import Home from '../screens/Frontend/Home';
import AddItem from '../screens/Frontend/AddItem'

// Auth Screens
import Register from '../screens/Auth/Register';
import Login from '../screens/Auth/Login';
import Forgot from '../screens/Auth/Forgot';

//AuthContext
import {useAuthContext} from '../contexts/AuthContext';
import Loader from '../components/Loader';
import PropertyDetails from '../components/PropertyDetails';

export default function AppNavigator() {
  const screenOptions = {
    headerShown: false,
  };
  const {isAuthenticated, isProcessing} = useAuthContext();
  const Stack = createStackNavigator();

  if (isProcessing) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
          <Stack.Screen name="AddItem" component={AddItem} />

          {/* Auth Screens */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Forgot" component={Forgot} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
