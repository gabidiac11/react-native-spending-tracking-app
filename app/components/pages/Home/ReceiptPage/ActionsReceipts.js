import { actions } from "../../../../store/reducers/builderReducer";
import { useDispatch, useSelector } from "react-redux";
import { database() } from "firebase";

const dispatch = useDispatch();
const { uid } = useSelector(
  ({
    auth: {
      user: { uid }
    },
    builder: {
      app_data: { receipts, stores }
    }
  }) => {
    return {
      uid,
      receipts,
      stores
    };
  }
);
const userReceiptPath = `receipts/${uid}`;
export default {
  on_update_receipt_price: ({ id_receipt, id_product, price }) => {
    database()
      .ref(`${userReceiptPath}/${id_receipt}/products/${id_product}`)
      .update({ price })
      .then(error => {
        if (!error) {
          receipts[id_receipt].products[id_product].price = price;
          dispatch(
            actions.updateReceipt({
              id_receipt,
              receipt: receipts[id_receipt]
            })
          );
        } else {
          console.log(
            `Error updating price=${price}, uid=${uid}, id_receipt=${id_receipt}, id_product=${id_product} `
          );
        }
      });
  },
  on_delete_receipt_product: ({ id_receipt, id_product }) => {
    database()
      .ref(`${userReceiptPath}/${id_receipt}`)
      .update({ id_product: null })
      .then(error => {
        if (!error) {
          delete receipts[id_receipt].products[id_product];
          dispatch(
            actions.updateReceipt({
              id_receipt,
              receipt: receipts[id_receipt]
            })
          );
        } else {
          console.log(
            `Error deleting receipt product, uid=${uid}, id_receipt=${id_receipt}, id_product=${id_product} `
          );
        }
      });
  },
  on_change_quantity: ({ id_receipt, id_product, quantity }) => {
    database()
      .ref(`${userReceiptPath}/${id_receipt}/${id_product}`)
      .update({ quantity })
      .then(error => {
        if (!error) {
          delete receipts[id_receipt].products[id_product];
          dispatch(
            actions.updateReceipt({
              id_receipt,
              receipt: receipts[id_receipt]
            })
          );
        } else {
          console.log(
            `Error updating receipt product quantity=${quantity}, uid=${uid}, id_receipt=${id_receipt}, id_product=${id_product} `
          );
        }
      });
  },
  on_submit_group_of_products: ({ id_receipt, store_products }) => {
    const quantity_updates = {};
    const products_to_add = [];
    const refenceIdIndexing = {};

    store_products.forEach(
      ({ refenceId, category, name, tva, price, utility }) => {
        const id_product_existent = Object.keys(
          receipts[id_receipt].products
        ).find(id_rec_product => {
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
          quantity_updates[path_product] = quantity_updates[
            path_product
          ]
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
              utility
            });
            products_to_add[refenceId] = products_to_add.length - 1;
          }
        }
      }
    );
    const products_to_add_obj = {};
    for(let i = 0; i < products_to_add.length; i++){
        const id_product = firebase
                        .database()
                        .ref()
                        .push().key;
        products_to_add_obj[id_product] = products_to_add;
    }
    database()
    .ref(`${userReceiptPath}/${id_receipt}/products`)
    .update({
       ...products_to_add_obj, ...quantity_updates
    }).then(error => {
        if(error){
            console.log(
                `Error pushing products: uid=${uid}, id_receipt=${id_receipt}`
              );
        }
    });
  }
};
