import React, {useEffect, createContext, useContext, useReducer} from 'react';

//Firebase imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext();

const initialState = {
  isProcessing: true,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        isProcessing: false,
        user: action.payload.user,
        favouriteItems: action.payload.favouriteItems
      };

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        isProcessing: false,
        user: null,
        favouriteItems:[]
      };

    default:
      return state;
  }
};

export default function ({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    auth().onAuthStateChanged(async user => {
      if (user) {
        const userData = (
          await firestore().collection('users').doc(user.uid).get()
        ).data();
        // const favouriteList = (
        //   await firestore().collection('users').doc(user.uid).collection('favourites').get()
        // ).data();
        dispatch({type: 'LOGIN', payload: {user: userData}});
      } else {
        dispatch({type: 'LOGOUT'});
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
