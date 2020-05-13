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
  INIT_DATA: "INIT_DATA",
  UPDATE_RECEIPT_WITH_ID: "UPDATE_RECEIPT_WITH_ID",
  UPDATE_RECEIPT_PRODUCT_PROPERTY: "UPDATE_RECEIPT_PRODUCT_PROPERTY",
  DELETE_RECEIPT_PRODUCT: "DELETE_RECEIPT_PRODUCT",
  SET_INC_Q: "SET_INC_Q",
  SET_ALL_PRODUCTS_RECEIPT: "SET_ALL_PRODUCTS_RECEIPT",
  ADD_NEW_PRODUCT_TO_STORE: "ADD_NEW_PRODUCT_TO_STORE",
  ADD_NEW_RECEIPT: "ADD_NEW_RECEIPT",
  ASSIGN_STORE_TO_RECEIPT: "ASSIGN_STORE_TO_RECEIPT"
};
export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.RESET_CONFIG: {
      return initialState;
    }
    case actionTypes.INIT_DATA: {
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
    case actionTypes.SET_INC_Q: {
      return {
        ...state,
        incQ: payload.incQ
      }
    }
    case actionTypes.SET_ALL_PRODUCTS_RECEIPT: {
      return {
        ...state,
        app_data: {
          ...state.app_data,
          receipts: {
            ...state.app_data.receipts,
            [payload.id_receipt]: {
              ...state.app_data.receipts[payload.id_receipt],
              products: payload.products
            }
          }
        }
      }
    }
    case actionTypes.ADD_NEW_PRODUCT_TO_STORE: {
      return {
        ...state,
        app_data: {
          ...state.app_data,
          stores: {
            ...state.app_data.stores,
            [payload.id_store]: {
              ...state.app_data.stores[payload.id_store],
              products: {
                ...(state.app_data.stores[payload.id_store].products || {}),
                [payload.referenceId]: payload.product
              }
            }
          }
        }
      }
    }
    case actionTypes.ADD_NEW_RECEIPT: {
      return {
        ...state,
        app_data: {
          ...state.app_data,
          receipts: {
            ...state.app_data.receipts,
            [payload.id_receipt]: payload.receipt
          }
        }
      }
    }
    case actionTypes.ASSIGN_STORE_TO_RECEIPT: {
      return {
        ...state,
        app_data: {
          ...state.app_data,
          receipt: {
            ...state.app_data.receipts,
            [payload.id_receipt]: {
              ...state.app_data.receipts[payload.id_receipt],
              products: {},
              storeId: payload.id_store
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
  init_data: payload => ({payload, type: actionTypes.INIT_DATA}),
  updateReceipt: payload => ({payload, type: actionTypes.UPDATE_RECEIPT_WITH_ID}),
  updateReceiptProductProperty: payload => ({payload, type: actionTypes.UPDATE_RECEIPT_PRODUCT_PROPERTY}),
  deleteReceiptProduct: payload => ({payload, type: actionTypes.DELETE_RECEIPT_PRODUCT}),
  setIncQ: payload => ({payload, type: actionTypes.SET_INC_Q}),
  setAllProductsReceipt: payload => ({payload, type: actionTypes.SET_ALL_PRODUCTS_RECEIPT}),
  addNewProductToStore: payload => ({payload, type: actionTypes.ADD_NEW_PRODUCT_TO_STORE}),
  addNewReceipt: payload => ({payload, type: actionTypes.ADD_NEW_RECEIPT}),
  assignStoreToReceipt: payload => ({payload, type: actionTypes.ASSIGN_STORE_TO_RECEIPT})
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
