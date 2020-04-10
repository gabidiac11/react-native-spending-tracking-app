import * as firebase from "firebase";

export default class FirebaseDataBase {
    constructor(uid) {
        this.uid = uid
    }
    init = () => {
        return new Promise((resolve, reject) => {
            const data = {};
            const promise = this.getReceipts();
            promise.then(
                (receipts) => {
                    data["receipts"] = receipts;
                    this.getStores().then((stores) => {
                        data["stores"] = stores;
                        resolve(data);
                    },
                    (err) => {
                        reject(err);
                    })
                },
                (err) => {
                    reject(err);
                }
            );
        });

    }
    getReceipts = () => {
        return new Promise((resolve, reject)=>{
            firebase.database().ref(`/receipts/${this.uid}`)
            .on("value", snapshot => {
                let receipts = snapshot.val() || {};
                resolve(receipts);
            })
        });
    }
    getStores = () => {
        return new Promise((resolve, reject) => {
            firebase.database().ref(`/stores`)
            .on("value", snapshot => {
                const stores = snapshot.val() || {};
                resolve(stores);
            })
        });
    }
} 