import { put, takeLatest } from "redux-saga/effects";
import languagePack from "../../staticData/languagePack";
import objectPath from "object-path";
import _ from 'lodash';

import static_app_data from "../../staticData/static_data";
const initialState = {
  app_data: static_app_data,
  loading: false,
  statics: {
    languagePack: languagePack,
    defaultLang: 'en'
  },
  incQ: 1
};
const actionTypes = {
  RESET_CONFIG: "RESET_CONFIG",
  INIT_BUILD_DATA: "INIT_BUILD_DATA",
  UPDATE_RECEIPT_WITH_ID: "UPDATE_RECEIPT_WITH_ID",
  UPDATE_RECEIPT_PRODUCT_PROPERTY: "UPDATE_RECEIPT_PRODUCT_PROPERTY",
  DELETE_RECEIPT_PRODUCT: "DELETE_RECEIPT_PRODUCT"
};
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.RESET_CONFIG: {
      return initialState;
    }
    case actionTypes.INIT_BUILD_DATA: {
      return {
        ...state,
        app_data: {...state.app_data, ...payload}
      }
    }
    case actionTypes.UPDATE_RECEIPT_WITH_ID: {
      return {
        ...state,
        app_data: {...state.app_data, [payload.id_receipt]: payload.payload}
      }
    }
    case actionTypes.UPDATE_RECEIPT_PRODUCT_PROPERTY: {
      return {
        ...state,
        app_data: {
          ...state.app_data,
          receipts: {
            ...state.app_data.receipts,
            [payload.id_receipt]: {
              ...state.app_data.receipts[payload.id_receipt],
              products: {
                ...state.app_data.receipts[payload.id_receipt].products,
                [payload.id_product]: {
                  ...state.app_data.receipts[payload.id_receipt].products[payload.id_product],
                  [payload.property]: payload.value
                }
              }
            }
          }
        }
      }
    }
    case actionTypes.DELETE_RECEIPT_PRODUCT: {
      return {
        ...state,
        app_data: {
          ...state.app_data,
          receipts: {
            ...state.app_data.receipts,
            [payload.id_receipt]: {
              ...state.app_data.receipts[payload.id_receipt],
              products: _.omit(state.app_data.receipts[payload.id_receipt].products, [payload.id_product])
            }
          }
        }
      }
    }
    default:
      return state;
  }
};
export const actions = {
  reset_saga: payload => ({ payload, type: actionTypes.RESET_CONFIG }),
  init_build_data: payload => ({payload, type: actionTypes.INIT_BUILD_DATA}),
  updateReceipt: payload => ({payload, type: actionTypes.UPDATE_RECEIPT_WITH_ID}),
  updateReceiptProductProperty: payload => ({payload, type: actionTypes.UPDATE_RECEIPT_PRODUCT_PROPERTY}),
  deleteReceiptProduct: payload => ({payload, type: actionTypes.DELETE_RECEIPT_PRODUCT}),
};
export function* saga() {
  yield takeLatest(actionTypes.RESET_CONFIG, function* reset_saga(action) {
    yield put(actions.reset_saga(initialState));
  });
}
export const selectors = {
  getValue: (builder, path) => {
    return objectPath.get(builder, path);
  },
  getLanguage: (builder, type, properties) => {
    const languages = Object.keys(builder.statics.languagePack);
    const translations =
      !type || type === "default" || languages.indexOf(type) === -1 ?
         builder.statics.languagePack[builder.statics.defaultLang]
        : builder.statics.languagePack[type];

    if(!Array.isArray(properties)){
        return translations;
    }
    const filteredTranslations = {};
    properties.forEach(name => {
        filteredTranslations[name] = translations[name];
    });
    return filteredTranslations;
  }
};
