import { put, takeLatest } from "redux-saga/effects";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
    app_data: {
        products: [],
        receipts: [],
        stores: [],
    },
    loading: false
};
const actionTypes = {
    RESET_CONFIG: "RESET_CONFIG"
};
export const reducer = persistReducer({
    storage,
    key: "spending_tracking-app-data"
}, (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.RESET_CONFIG:{
            return initialState;
        }
        default: 
        return state;
    }
});
export const actions = {
    reset_saga: (payload) => ({payload, type: actionTypes.RESET_CONFIG})
};
export function* saga(){
    yield takeLatest(actionTypes.RESET_CONFIG, function* reset_saga(action) {
        yield put(actions.reset_saga(initialState));
      });
}