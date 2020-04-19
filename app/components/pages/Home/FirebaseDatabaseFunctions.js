import * as firebase from "firebase";

export default class FirebaseDataBase {
    constructor(uid) {
        this.uid = uid
    }
    init = () => {
        const data = {};
        return new Promise((resolve, reject) => {
            this.getReceipts().then((receipts) => resolve(receipts));
          }).then((receipts) => {
            data['receipts'] = receipts;
            return this.getStores();
          }).then((stores) => {
            data['stores'] = stores;
            return this.getTvas();
          }).then(tvas => {
            data['tvas'] = tvas;
            return new Promise((resolve, reject) => resolve(data));
          });
    }
    // init = () => {
    //     return new Promise((resolve, reject) => {
    //         const data = {};
    //         this.getReceipts().then((receipts) => resolve(receipts))
    //         this.getReceipts().then(
    //             (receipts) => {
    //                 data["receipts"] = receipts;
                    
    //                 this.getStores().then((stores) => {
    //                     data["stores"] = stores;
    //                     return this.getTvas().then((tvas) => {
    //                         data['tvas'] = tvas;
    //                         console.log(data);
    //                         resolve(data);
    //                     }, 
    //                     (err) => {
    //                         reject(err)
    //                     })
    //                 },
    //                 (err) => {
    //                     reject(err);
    //                 })
    //             },
    //             (err) => {
    //                 reject(err);
    //             }
    //         );
    //     });

    // }
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
    getTvas = () => {
        return new Promise((resolve, reject) => {
            firebase.database().ref(`/tvas`)
            .on("value", snapshot => {
                const tvas = snapshot.val() || {};
                console.log(tvas);
                resolve(tvas);
                
            })
        });
    }
    
} 