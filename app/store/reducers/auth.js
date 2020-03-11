import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import objectPath from "object-path";

export const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
  FULFILL_USER: "FULFILL_USER"
};
const initialAuthState = {
  user: undefined,
  token: undefined
};
export const selectors = {
  getAuthInfo: (store, path) => {
    return objectPath.get(store, path);
  }
};
export const reducer = persistReducer(
  { storage, key: "spending_tracking_auth", whitelistst: ["user", "token"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.LOGIN: {
        const { token } = action.payload;
        return { token, user: undefined };
      }
      case actionTypes.REGISTER: {
        return { ...state, user: undefined };
      }
      case actionTypes.FULFILL_USER: {
        return { ...state, user: payload.user };
      }
      case actionTypes.LOGOUT: {
        // routerHelpers.forgotLastLocation();
        return initialAuthState;
      }
      default:
        return state;
    }
  }
);
export const actions = {
  login: data => ({ type: actionTypes.LOGIN, payload: data }),
  register: data => ({ type: actionTypes.REGISTER, payload: data }),
  logout: data => ({ type: actionTypes.LOGOUT, payload: data }),
  fulfillUser: data => ({ type: actionTypes.FULFILL_USER, payload: data })
};
export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga(action) {
    const user = {
      ...action.payload
    };
    yield put(actions.fulfillUser(user));
  });
}
