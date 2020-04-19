import { put, takeLatest } from "redux-saga/effects";
import objectPath from "object-path";
import { persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';
export const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT"
};
const initialAuthState = {
  user: {},
  token: undefined
};
export const selectors = {
  getAuthInfo: (store, path) => {
    return objectPath.get(store, path);
  }
};
export const reducer = 
persistReducer({storage: AsyncStorage, key: "auth_spending_app1" }, 
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.LOGIN: {
        const { email, token, uid } = action.payload;
        return { ...state, token, user: {email, uid} };
      }
      case actionTypes.LOGOUT: {
        return initialAuthState;
      }
      default:
        return state;
    }
  }
);
export const actions = {
  login: data => ({ type: actionTypes.LOGIN, payload: data }),
  logout: data => ({ type: actionTypes.LOGOUT, payload: data })
};
