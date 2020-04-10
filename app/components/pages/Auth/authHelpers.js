import * as firebase from "firebase";

export function onSignUp(email, password) {
  return new Promise((resolve, reject) => {
    const promise = firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    promise.then(
      ({ user: { uid } }) => {
        pushUserToDatabase({
          userId: uid,
          email
        }).then(() => {
          resolve({ success: 1 });
        });
      },
      err => {
        console.log(err);
        reject(err);
      }
    );
  });
}
function pushUserToDatabase({ userId, email }) {
  return firebase
    .database()
    .ref("users")
    .child(userId)
    .update({ email });
}
function getUserInfo(id) {
  return firebase
    .database()
    .ref("users")
    .child(id)
    .once("value", snapshot => {
      return snapshot.val();
    });
}
export function onSignIn(email, password) {
  return new Promise((resolve, reject) => {
    const promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise.then(({ user }) => {
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(function(token) {
          getUserInfo(user.uid).then(
            () => {
              resolve({ token, uid: user.uid });
            },
            err => {
              console.log(err);
              reject(err);
            }
          );
        })
        .catch(function(err) {
          console.log(err,"isus e viu");
          reject(err);
        });
    },
    (err) =>{
    reject(err);}
    );
  });
}
