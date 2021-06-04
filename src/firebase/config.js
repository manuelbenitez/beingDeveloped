import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'



// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-HcdwuGy51hGuLxsGc5FlaVtt2TkAufg",
  authDomain: "beingdeveloped-8c8d9.firebaseapp.com",
  projectId: "beingdeveloped-8c8d9",
  storageBucket: "beingdeveloped-8c8d9.appspot.com",
  messagingSenderId: "621247932155",
  appId: "1:621247932155:web:f23a387986aa14145a325e"
};

firebase.initializeApp(firebaseConfig)

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

const timestamp = firebase.firestore.FieldValue.serverTimestamp


// class Firebase {

//   constructor() {
//     this.auth = firebase.auth()
//     this.db = firebase.firestore()
//   }

//   /**
//    * 
//    * Function to register, login and logout users
//    */

//   login(email, password) {
//     return this.auth.signInWithEmailAndPassword(email, password)
//   }
//   logout() {
//     return this.auth.signOut()
//   }

//   getCurrentUserName() {
//     return this.auth.currentUser && this.auth.currentUser.displayName
//   }
// }

// export default new Firebase()


export { projectStorage, projectFirestore, timestamp, firebase }
