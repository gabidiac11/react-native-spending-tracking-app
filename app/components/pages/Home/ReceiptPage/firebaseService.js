import { actions } from "../../../../store/reducers/builderReducer";
import { database } from "firebase";
import _ from 'lodash';

export default class FirebaseService {
  constructor(props) {
    this.uid = props.uid;
    this.dispatch = props.dispatch;
    this.receiptsUserPath = `receipts/${this.uid}`;
  }
  onUpdateReceiptProductPrice = ({ id_receipt, id_product, price }) => {
    database()
      .ref(`${this.receiptsUserPath}/${id_receipt}/products/${id_product}`)
      .update({ price })
      .then((error) => {
        if (!error) {
          this.dispatch(
            actions.updateReceiptProductProperty({
              id_receipt,
              id_product,
              property: "price",
              value: price
            })
          );
        } else {
          console.log(
            `Error updating price=${price}, uid=${this.uid}, id_receipt=${id_receipt}, id_product=${id_product} `
          );
        }
      });
  };
  onChangeReceiptProductQuantity = ({ id_receipt, id_product, quantity }) => {
    if(quantity < 1){
      database()
      .ref(`${this.receiptsUserPath}/${id_receipt}/products`)
      .update({ [id_receipt]: null })
      .then((error) => {
        if (!error) {
          this.dispatch(
            actions.deleteReceiptProduct({
              id_receipt,
              id_product
            })
          );
        } else {
          console.log(
            `Error updating deleting product, quantity=${quantity}, uid=${this.uid}, id_receipt=${id_receipt}, id_product=${id_product} `
          );
        }
      });
    }else{
      database()
      .ref(`${this.receiptsUserPath}/${id_receipt}/products/${id_product}`)
      .update({ quantity })
      .then((error) => {
        if (!error) {
          this.dispatch(
            actions.updateReceiptProductProperty({
              id_receipt,
              id_product,
              property: "quantity",
              value: quantity
            })
          );
        } else {
          console.log(
            `Error updating receipt product, quantity=${quantity}, uid=${this.uid}, id_receipt=${id_receipt}, id_product=${id_product} `
          );
        }
      });
    }

  };
  on_submit_group_of_products = ({ id_receipt, store_products }) => {
    const quantity_updates = {};
    const products_to_add = [];
    const refenceIdIndexing = {};

    store_products.forEach(
      ({ refenceId, category, name, tva, price, utility }) => {
        const id_product_existent = Object.keys(
          receipts[id_receipt].products
        ).find((id_rec_product) => {
          if (
            receipts[id_receipt].products[id_rec_product].refenceId ===
            refenceId
          ) {
            return true;
          }
          return false;
        });
        if (id_product_existent) {
          const path_product = `${id_product_existent}/quantity`;
          quantity_updates[path_product] = quantity_updates[path_product]
            ? quantity_updates[path_product] + 1
            : receipts[id_receipt].products[id_rec_product].quantity + 1;
        } else {
          const refenceIdIndex = refenceIdIndexing[refenceId];
          if (refenceIdIndex) {
            products_to_add[refenceIdIndex].quantity += 1;
          } else {
            products_to_add.push({
              quantity: 1,
              refenceId,
              category,
              name,
              tva,
              price,
              utility,
            });
            products_to_add[refenceId] = products_to_add.length - 1;
          }
        }
      }
    );
    const products_to_add_obj = {};
    for (let i = 0; i < products_to_add.length; i++) {
      const id_product = firebase.database().ref().push().key;
      products_to_add_obj[id_product] = products_to_add;
    }
    database()
      .ref(`${this.receiptsUserPath}/${id_receipt}/products`)
      .update({
        ...products_to_add_obj,
        ...quantity_updates,
      })
      .then((error) => {
        if (error) {
          console.log(
            `Error pushing products: uid=${this.uid}, id_receipt=${id_receipt}`
          );
        }
      });
  };
}