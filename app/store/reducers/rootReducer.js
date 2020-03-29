import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./auth";
import * as  builder from "./builder"

export const rootReducer = combineReducers({
  auth: auth.reducer,
  builder: builder.reducer
});

export function* rootSaga() {
  yield( 
    builder.saga());
}
