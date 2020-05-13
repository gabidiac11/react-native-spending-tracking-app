import React from "react";
import { actions } from "../store/reducers/builderReducer";
import firebase, { database } from "firebase";
import _ from "lodash";

export default class FirebaseService {
  constructor(props) {
      // Your web app's Firebase configuration
      const firebaseConfig = (props || {}).firebaseConfig || {
        apiKey: "AIzaSyDje_cSCG6UABvJEAp_oj68D3O6FrNeQ5Y",
        authDomain: "spending-tracking-native.firebaseapp.com",
        databaseURL: "https://spending-tracking-native.firebaseio.com",
        projectId: "spending-tracking-native",
        storageBucket: "spending-tracking-native.appspot.com",
        messagingSenderId: "829705608622",
        appId: "1:829705608622:web:0c85b7921a1609a4193c3f",
      };
      // Initialize Firebase
      try {
        firebase.initializeApp(firebaseConfig);
      } catch (err) {
        console.log("firebase initialization error", err);
      }
    
  }
  setUid = (uid) => {
    this.uid = uid;
    this.receiptsUserPath = `receipts/${uid}`;
  };
  initializeData = () => {
    const data = {};
    return new Promise((resolve, reject) => {
      this.getReceipts().then((receipts) => resolve(receipts));
    })
      .then((receipts) => {
        data["receipts"] = receipts;
        return this.getStores();
      })
      .then((stores) => {
        data["stores"] = stores;
        return this.getPublicData();
      })
      .then((publicData) => {
        data["tvas"] = publicData["tvas"];
        data["productCategory"] = publicData["productCategory"];
        return new Promise((resolve, reject) => resolve(data));
      });
  };
  getReceipts = () => {
    return new Promise((resolve, reject) => {
      database()
        .ref(`/receipts/${this.uid}`)
        .once("value", (snapshot) => {
          let receipts = snapshot.val() || {};
          resolve(receipts);
        });
    });
  };
  getStores = () => {
    return new Promise((resolve, reject) => {
      database()
        .ref(`/stores`)
        .once("value", (snapshot) => {
          const stores = snapshot.val() || {};
          resolve(stores);
        });
    });
  };
  getPublicData = () => {
    return new Promise((resolve, reject) => {
      database()
        .ref(`/public`)
        .once("value", (snapshot) => {
          const publicData = snapshot.val() || {};
          const productCategory = publicData["productCategory"] || {};
          const tvas = publicData["tvas"] || {};
          resolve({ productCategory, tvas });
        });
    });
  };
  updateAndDispatch = (dispatch) => ({
    onUpdateReceiptProductPrice: ({ id_receipt, id_product, price }) => {
      database()
        .ref(`${this.receiptsUserPath}/${id_receipt}/products/${id_product}`)
        .update({ price })
        .then((error) => {
          if (!error) {
            dispatch(
              actions.updateReceiptProductProperty({
                id_receipt,
                id_product,
                property: "price",
                value: price,
              })
            );
          } else {
            console.log(
              `Error updating price=${price}, uid=${this.uid}, id_receipt=${id_receipt}, id_product=${id_product} `
            );
          }
        });
    },
    onChangeReceiptProductQuantity: ({ id_receipt, id_product, quantity }) => {
      if (quantity <= 0) {
        database()
          .ref(`${this.receiptsUserPath}/${id_receipt}/products`)
          .update({ [id_receipt]: null })
          .then((error) => {
            if (!error) {
              dispatch(
                actions.deleteReceiptProduct({
                  id_receipt,
                  id_product,
                })
              );
            } else {
              console.log(
                `Error updating deleting product, quantity=${quantity}, uid=${this.uid}, id_receipt=${id_receipt}, id_product=${id_product} `
              );
            }
          });
      } else {
        database()
          .ref(`${this.receiptsUserPath}/${id_receipt}/products/${id_product}`)
          .update({ quantity })
          .then((error) => {
            if (!error) {
              dispatch(
                actions.updateReceiptProductProperty({
                  id_receipt,
                  id_product,
                  property: "quantity",
                  value: quantity,
                })
              );
            } else {
              console.log(
                `Error updating receipt product, quantity=${quantity}, uid=${this.uid}, id_receipt=${id_receipt}, id_product=${id_product} `
              );
            }
          });
      }
    },
    onSubmitProductsToReceipt: ({
      id_receipt,
      selectedProducts,
      update_quantity_paths,
    }) => {
      console.log({ id_receipt, selectedProducts, update_quantity_paths });
      // return;
      const products_to_push = {};
      for (let i = 0; i < selectedProducts.length; i++) {
        const path = database().ref().push().key;
        products_to_push[path] = selectedProducts[i];
      }
      console.log(
        "fen2",
        JSON.stringify({
          ...products_to_push,
          ...update_quantity_paths,
        })
      );
      // return;
      database()
        .ref(`${this.receiptsUserPath}/${id_receipt}/products`)
        .update({
          ...products_to_push,
          ...update_quantity_paths,
        })
        .then((error) => {
          if (error) {
            console.log(
              `Error pushing products: uid=${this.uid}, id_receipt=${id_receipt}`
            );
          }
          database()
            .ref(`${this.receiptsUserPath}/${id_receipt}/products`)
            .once("value", (snapshot) => {
              try {
                const products = snapshot.val() || {};
                dispatch(
                  actions.setAllProductsReceipt({ id_receipt, products })
                );
              } catch (error) {
                console.log("Error while adding products", error);
              }
            });
        });
    },

    onSubmitNewProductToStore: ({
      id_store,
      product: { category, name, price, tva, utility },
    }) => {
      const referenceId = database().ref().push().key;
      database()
        .ref(`stores/${id_store}/products`)
        .update({
          [referenceId]: {
            category,
            name,
            price,
            tva,
            utility,
          },
        })
        .then(
          () => {
            dispatch(
              actions.addNewProductToStore({
                id_store,
                referenceId,
                product: { category, name, price, tva, utility },
              })
            );
          },
          (err) => {
            console.log("error while creating new product to store", err);
          }
        );
    },
    onSubmitNewReceipt: ({ id_store, date }) => {
      const id_receipt = database().ref().push().key;
      database()
        .ref(`${this.receiptsUserPath}/${id_receipt}`)
        .set({ storeId, date })
        .then(
          () => {
            dispatch(
              actions.addNewReceipt({ id_receipt, receipt: { id_store, date } })
            );
          },
          (err) => {
            console.log("error while submiting new receipt", err);
          }
        );
    },
    onAssignStoreToReceipt: ({ id_store, id_receipt }) => {
      database()
        .ref(`${this.receiptsUserPath}/${id_receipt}`)
        .update({ storeId: id_store, products: null })
        .then(
          () => {
            dispatch(actions.assignStoreToReceipt({ id_receipt, id_store }));
          },
          (err) => {
            console.log("error while changin store", err);
          }
        );
    },
    
  });
}
export const firebaseInstance = new FirebaseService();
export const FirebaseServiceContext = React.createContext({ firebaseInstance });
